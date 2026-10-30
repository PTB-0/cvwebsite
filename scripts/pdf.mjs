// Prints the four CV routes to A4 PDFs and checks that each one is a single page.
// Needs the built site served on :4321 (pnpm preview). Output goes to public/cv/.
import { chromium } from "playwright-core";
import { mkdirSync, writeFileSync } from "node:fs";

const base = process.argv[2] ?? "http://127.0.0.1:4321";
const edge = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";

mkdirSync("public/cv", { recursive: true });
const browser = await chromium.launch({ executablePath: edge, headless: true });
let failed = false;
for (const lang of ["en", "tr"]) {
  for (const kind of ["work", "academic"]) {
    const page = await browser.newPage();
    await page.goto(`${base}/${lang}/cv/${kind}/`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(() => {
      const el = document.querySelector(".sheet");
      return el ? el.scrollHeight - el.clientHeight : -1;
    });
    const buf = await page.pdf({ preferCSSPageSize: true, printBackground: true });
    const pages = (buf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
    const file = `public/cv/ege-yildiz-cv-${kind}-${lang}.pdf`;
    writeFileSync(file, buf);
    if (pages !== 1 || overflow > 0) failed = true;
    process.stdout.write(`${file}  pages=${pages}  contentOverflowPx=${overflow}  ${(buf.length / 1024).toFixed(0)} KB\n`);
    await page.close();
  }
}
await browser.close();
if (failed) process.exitCode = 1;
