// Run after PurgeCSS: it checks rules that a successful Jekyll build alone does
// not prove survive the purge.
//  - The image zoom layers: the CDN-loaded zoom library creates these classes at
//    runtime, so they rely on the safelist in purgecss.config.js.
//  - The universal focus ring (_sass/ds/_base.scss): PurgeCSS drops a selector
//    made of a lone pseudo-class (`:focus-visible {`), so it is written
//    `*:focus-visible`; without it, scroll regions, MathJax and video lose the ring.
// Usage: node _scripts/check-zoom-css.cjs [path/to/main.css]
const assert = require("node:assert/strict");
const fs = require("node:fs");

const css = fs.readFileSync(process.argv[2] || "_site/assets/css/main.css", "utf8");

for (const [selector, zIndex] of [
  ["medium-zoom-overlay", 1100],
  ["medium-zoom-image--opened", 1101],
]) {
  assert.match(
    css,
    new RegExp(`\\.${selector}\\s*\\{[^}]*z-index:\\s*${zIndex}\\s*(?:!important\\s*)?[;}]`),
    `Production CSS must retain .${selector} at z-index ${zIndex}. Check the PurgeCSS safelist.`
  );
}

assert.match(
  css,
  /(?:^|[{},\s])\*:focus-visible\s*\{[^}]*outline:\s*2px solid var\(--xw-focus\)/,
  "Production CSS must retain the universal `*:focus-visible` focus ring (_sass/ds/_base.scss)."
);

console.log("Production CSS retains both image zoom layers and the universal focus ring.");
