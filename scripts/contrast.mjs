// Pixel-measured text contrast. axe cannot judge text over gradients and glass, so this
// renders the page with every glyph made transparent, samples the real background pixels
// under each text box, and computes the WCAG ratio of the real text colour against them.
import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://127.0.0.1:4321";
const edge = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const targets = [
  ["/en/", 360],
  ["/en/", 768],
  ["/en/", 1280],
  ["/en/", 1920],
  ["/tr/", 360],
  ["/tr/", 1280],
];

const browser = await chromium.launch({ executablePath: edge, headless: true });
let failures = 0;
for (const [path, width] of targets) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  const items = await page.evaluate(() => {
    const out = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const text = (node.textContent ?? "").trim();
      const el = node.parentElement;
      if (!text || !el || ["SCRIPT", "STYLE", "TITLE"].includes(el.tagName)) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.display === "none") continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      const svg = el instanceof SVGElement;
      const rects = [...range.getClientRects()].filter((r) => r.width >= 2 && r.height >= 2);
      if (!rects.length) continue;
      out.push({
        tag: el.tagName.toLowerCase(),
        text: text.replace(/\s+/g, " ").slice(0, 34),
        rects: rects.map((r) => ({ x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height })),
        color: svg ? cs.fill : cs.color,
        size: parseFloat(cs.fontSize),
        weight: parseInt(cs.fontWeight, 10),
      });
    }
    return out;
  });

  await page.addStyleTag({
    content:
      "*{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important;text-decoration-color:transparent!important} text{fill:transparent!important}",
  });
  const png = await page.screenshot({ fullPage: true });
  const probe = await ctx.newPage();
  const result = await probe.evaluate(
    async ({ b64, items }) => {
      const blob = await (await fetch("data:image/png;base64," + b64)).blob();
      const bmp = await createImageBitmap(blob);
      const c = new OffscreenCanvas(bmp.width, bmp.height);
      const g = c.getContext("2d", { willReadFrequently: true });
      g.drawImage(bmp, 0, 0);
      const lin = (v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      };
      const lum = (r, gg, b) => 0.2126 * lin(r) + 0.7152 * lin(gg) + 0.0722 * lin(b);
      const parse = (s) => {
        const m = s.match(/rgba?\(([^)]+)\)/);
        if (!m) return null;
        const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
        return { r: p[0], g: p[1], b: p[2], a: p[3] ?? 1 };
      };
      const rows = [];
      for (const it of items) {
        const col = parse(it.color);
        if (!col) continue;
        const ratios = [];
        for (const rc of it.rects) {
          const x0 = Math.max(0, Math.floor(rc.x)),
            y0 = Math.max(0, Math.floor(rc.y));
          const w = Math.min(bmp.width - x0, Math.ceil(rc.w)),
            h = Math.min(bmp.height - y0, Math.ceil(rc.h));
          if (w < 1 || h < 1) continue;
          const d = g.getImageData(x0, y0, w, h).data;
          for (let i = 0; i < d.length; i += 4 * 3) {
            const br = d[i], bg = d[i + 1], bb = d[i + 2];
            const fr = col.r * col.a + br * (1 - col.a),
              fg = col.g * col.a + bg * (1 - col.a),
              fb = col.b * col.a + bb * (1 - col.a);
            const l1 = lum(fr, fg, fb),
              l2 = lum(br, bg, bb);
            ratios.push((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05));
          }
        }
        if (!ratios.length) continue;
        ratios.sort((a, b) => a - b);
        const worst = ratios[Math.floor(ratios.length * 0.02)] ?? ratios[0];
        const large = it.size >= 24 || (it.size >= 18.66 && it.weight >= 700);
        rows.push({ ...it, worst, need: large ? 3 : 4.5 });
      }
      return rows;
    },
    { b64: png.toString("base64"), items },
  );

  const bad = result.filter((r) => r.worst < r.need);
  const min = result.reduce((m, r) => Math.min(m, r.worst), 99);
  failures += bad.length;
  process.stdout.write(`${path} @${width}  checked=${result.length}  failing=${bad.length}  lowest=${min.toFixed(2)}\n`);
  for (const r of bad.slice(0, 12)) {
    process.stdout.write(`   ${r.worst.toFixed(2)} < ${r.need}  <${r.tag}> ${r.size}px "${r.text}"  color=${r.color}\n`);
  }
  await ctx.close();
}
await browser.close();
if (failures > 0) process.exitCode = 1;
