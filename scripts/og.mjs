// Renders the 1200x630 Open Graph image from the same Dusk look (no external assets).
import { chromium } from "playwright-core";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const edge = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const fonts = resolve("public/fonts").replaceAll("\\", "/");

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
@font-face{font-family:"Instrument Serif";src:url("file:///${fonts}/instrument-serif-latin.woff2") format("woff2")}
@font-face{font-family:"Instrument Sans";font-weight:400 600;src:url("file:///${fonts}/instrument-sans-latin.woff2") format("woff2")}
*{box-sizing:border-box}
body{margin:0;width:1200px;height:630px;position:relative;overflow:hidden;color:#f4f6fb;font-family:"Instrument Sans",sans-serif;background:linear-gradient(180deg,#0b0d14 0%,#0f1640 65%,#1b1450 100%)}
i{position:absolute;display:block}
.fig{left:520px;top:30px;width:240px;height:600px;border-radius:120px;background:linear-gradient(180deg,rgba(150,190,255,0),rgba(150,190,255,.85) 22%,rgba(79,140,255,.8) 62%,rgba(30,50,160,0));filter:blur(46px)}
.c{left:-200px;bottom:-260px;width:800px;height:600px;background:radial-gradient(closest-side,rgba(255,122,89,.8),rgba(255,122,89,0))}
.p{right:-120px;bottom:-200px;width:720px;height:540px;background:radial-gradient(closest-side,rgba(255,95,162,.65),rgba(255,95,162,0))}
.a{left:360px;bottom:-120px;width:480px;height:320px;background:radial-gradient(closest-side,rgba(255,179,107,.75),rgba(255,179,107,0))}
.s{inset:0;background:linear-gradient(90deg,rgba(11,13,20,.65),rgba(11,13,20,0) 62%)}
.r{inset:0;background:repeating-linear-gradient(90deg,rgba(255,255,255,.1) 0,rgba(255,255,255,0) 4px,rgba(0,0,0,.16) 7px,rgba(0,0,0,0) 12px)}
.t{position:absolute;left:64px;right:64px;bottom:64px}
.n{font-size:26px;font-weight:600;margin-bottom:20px}
h1{margin:0;font-family:"Instrument Serif",serif;font-weight:400;font-size:92px;line-height:1.02;letter-spacing:-.02em;max-width:900px}
</style></head><body>
<i class="fig"></i><i class="c"></i><i class="p"></i><i class="a"></i><i class="s"></i><i class="r"></i>
<div class="t"><div class="n">Ege Yıldız</div><h1>Systems I can measure, break, and roll back.</h1></div>
</body></html>`;

mkdirSync("shots", { recursive: true });
writeFileSync("shots/og.html", html);
const browser = await chromium.launch({ executablePath: edge, headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto("file:///" + resolve("shots/og.html").replaceAll("\\", "/"));
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og.png" });
await browser.close();
process.stdout.write("public/og.png written\n");
