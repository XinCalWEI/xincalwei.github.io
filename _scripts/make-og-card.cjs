// Render the brand PNGs with Playwright (Chromium):
//   assets/img/brand/og-card.png           1200x630 social card (_scripts/make-og-card.html)
//   assets/img/brand/apple-touch-icon.png  180x180 home-screen icon (from favicon.svg)
//
// Usage (from the repo root; needs the `playwright` package and its Chromium):
//   node _scripts/make-og-card.cjs
// Run _scripts/make-contours.py first if the contour or favicon SVGs changed.
// The card template loads Google Fonts; behind a proxy, HTTPS_PROXY is passed on.

const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const brand = path.join(root, "assets", "img", "brand");

(async () => {
  const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
  const browser = await chromium.launch({ proxy, args: ["--ignore-certificate-errors"] });

  const card = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await card.goto("file://" + path.join(__dirname, "make-og-card.html"), { waitUntil: "networkidle" });
  const contours = fs.readFileSync(path.join(brand, "contours.svg")).toString("base64");
  await card.evaluate((b64) => {
    document.documentElement.style.setProperty("--contours", `url("data:image/svg+xml;base64,${b64}")`);
  }, contours);
  await card.evaluate(() => document.fonts.ready);
  const fonts = await card.evaluate(() => ["Newsreader", "Inter", "JetBrains Mono"].map((f) => document.fonts.check(`16px "${f}"`)));
  if (fonts.includes(false)) console.warn("warning: a web font did not load; the card will use a fallback face");
  await card.screenshot({ path: path.join(brand, "og-card.png") });

  const icon = await browser.newPage({ viewport: { width: 180, height: 180 }, deviceScaleFactor: 1 });
  // full-bleed paper tile (iOS applies its own rounding); the mark inset ~10%
  const mark = fs.readFileSync(path.join(brand, "favicon.svg"), "utf8").replace("<svg ", '<svg width="148" height="148" ');
  await icon.setContent(`<body style="margin:0;background:#f7f6f1;display:grid;place-items:center;height:180px">${mark}</body>`);
  await icon.screenshot({ path: path.join(brand, "apple-touch-icon.png") });

  await browser.close();
  console.log("wrote og-card.png and apple-touch-icon.png");
})();
