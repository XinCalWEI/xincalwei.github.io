// Render the brand PNGs with Playwright (Chromium):
//   assets/img/brand/og-card.png           1200x630 social card (_scripts/make-og-card.html)
//   assets/img/brand/apple-touch-icon.png  180x180 home-screen icon (from favicon.svg)
//
// Usage (from the repo root; needs the `playwright` package and its Chromium):
//   node _scripts/make-og-card.cjs [output-dir]
// output-dir defaults to assets/img/brand. Run _scripts/make-contours.py first if
// the contour or favicon SVGs changed. No network access: the card uses the
// site's self-hosted fonts (assets/fonts/), injected below.

const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const brand = path.join(root, "assets", "img", "brand");
const out = process.argv[2] ? path.resolve(process.argv[2]) : brand;
const fontDir = path.join(root, "assets", "fonts");

// the same faces as _sass/ds/_fonts.scss
const faces = [
  ["Newsreader", "normal", "400 600", "newsreader-v26-latin-wght.woff2"],
  ["Newsreader", "italic", "400", "newsreader-v26-latin-italic.woff2"],
  ["Inter", "normal", "400 600", "inter-v20-latin-wght.woff2"],
  ["JetBrains Mono", "normal", "400 500", "jetbrains-mono-v24-latin-wght.woff2"],
];
const fontCss = faces
  .map(([family, style, weight, file]) => {
    const b64 = fs.readFileSync(path.join(fontDir, file)).toString("base64");
    return `@font-face{font-family:"${family}";font-style:${style};font-weight:${weight};font-display:block;src:url(data:font/woff2;base64,${b64}) format("woff2")}`;
  })
  .join("\n");

(async () => {
  const browser = await chromium.launch();

  const card = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await card.goto("file://" + path.join(__dirname, "make-og-card.html"), { waitUntil: "networkidle" });
  await card.addStyleTag({ content: fontCss });
  const contours = fs.readFileSync(path.join(brand, "contours.svg")).toString("base64");
  await card.evaluate((b64) => {
    document.documentElement.style.setProperty("--contours", `url("data:image/svg+xml;base64,${b64}")`);
  }, contours);
  await card.evaluate(() => document.fonts.ready);
  const fonts = await card.evaluate(() => ["Newsreader", "Inter", "JetBrains Mono"].map((f) => document.fonts.check(`16px "${f}"`)));
  if (fonts.includes(false)) console.warn("warning: a web font did not load; the card will use a fallback face");
  await card.screenshot({ path: path.join(out, "og-card.png") });

  const icon = await browser.newPage({ viewport: { width: 180, height: 180 }, deviceScaleFactor: 1 });
  // full-bleed paper tile (iOS applies its own rounding); the mark inset ~10%
  const mark = fs.readFileSync(path.join(brand, "favicon.svg"), "utf8").replace("<svg ", '<svg width="148" height="148" ');
  await icon.setContent(`<body style="margin:0;background:#f7f6f1;display:grid;place-items:center;height:180px">${mark}</body>`);
  await icon.screenshot({ path: path.join(out, "apple-touch-icon.png") });

  await browser.close();
  console.log(`wrote og-card.png and apple-touch-icon.png to ${out}`);
})();
