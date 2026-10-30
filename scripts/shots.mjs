// Screenshots + layout sanity checks at the four required widths.
// Uses playwright-core with the installed Edge (no browser download).
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://127.0.0.1:4321/en/";
const edge = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const sizes = [
  { w: 360, h: 800 },
  { w: 768, h: 1024 },
  { w: 1280, h: 800 },
  { w: 1920, h: 1080 },
];

mkdirSync("shots", { recursive: true });
const browser = await chromium.launch({ executablePath: edge, headless: true });
for (const { w, h } of sizes) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForSelector("h1");
  await page.evaluate(() => document.fonts.ready);
  const info = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    innerW: window.innerWidth,
    docH: document.documentElement.scrollHeight,
    h1: getComputedStyle(document.querySelector("h1")).fontFamily,
  }));
  await page.screenshot({ path: `shots/hero-${w}.png` });
  await page.screenshot({ path: `shots/full-${w}.png`, fullPage: true });
  process.stdout.write(`${w}px  overflowX=${info.scrollW > info.innerW}  docH=${info.docH}  h1=${info.h1.slice(0, 30)}\n`);
  await page.close();
}
await browser.close();
