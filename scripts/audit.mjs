// Accessibility (axe), keyboard focus, CLS and page weight at 360 and 1280 px.
// Needs the built site served on :4321 (pnpm preview). Exit code 1 if axe finds violations.
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";

const base = process.argv[2] ?? "http://127.0.0.1:4321";
const edge = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const pages = ["/en/", "/tr/", "/en/cv/work/", "/en/cv/academic/", "/tr/cv/work/", "/tr/cv/academic/"];
const widths = [360, 1280];

const browser = await chromium.launch({ executablePath: edge, headless: true });
let violations = 0;
for (const path of pages) {
  for (const w of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    const page = await ctx.newPage();
    const sizes = [];
    page.on("response", async (r) => {
      try {
        const body = await r.body();
        sizes.push({ url: r.url(), type: r.request().resourceType(), bytes: body.length });
      } catch {
        /* redirects have no body */
      }
    });
    await page.addInitScript(() => {
      window.__cls = 0;
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
      }).observe({ type: "layout-shift", buffered: true });
    });
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(300);

    const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    violations += axe.violations.length;

    // keyboard: tab through every stop, require a visible focus indicator
    let stops = 0;
    let invisible = [];
    await page.keyboard.press("Tab");
    for (let i = 0; i < 80; i++) {
      const info = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const cs = getComputedStyle(el);
        const visible = (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== "none";
        return { tag: el.tagName, text: (el.textContent ?? "").trim().slice(0, 24), visible };
      });
      if (!info) break;
      stops += 1;
      if (!info.visible) invisible.push(`${info.tag}:${info.text}`);
      await page.keyboard.press("Tab");
    }

    const cls = await page.evaluate(() => window.__cls);
    const nonFont = sizes.filter((s) => s.type !== "font" && s.url.startsWith(base));
    const total = nonFont.reduce((a, s) => a + s.bytes, 0);
    process.stdout.write(
      `${path} @${w}  axe=${axe.violations.length} (incomplete ${axe.incomplete.length})  tabStops=${stops} noFocusRing=${invisible.length}  CLS=${cls.toFixed(4)}  weight(non-font)=${(total / 1024).toFixed(1)} KB\n`,
    );
    for (const v of axe.violations) {
      process.stdout.write(`   VIOLATION ${v.id} (${v.impact}): ${v.nodes.length} nodes, e.g. ${v.nodes[0]?.target.join(" ")}\n`);
    }
    for (const v of axe.incomplete) {
      process.stdout.write(`   to-check ${v.id}: ${v.nodes.length} nodes\n`);
    }
    if (invisible.length) process.stdout.write(`   no focus ring on: ${invisible.join(", ")}\n`);
    await ctx.close();
  }
}
await browser.close();
if (violations > 0) process.exitCode = 1;
