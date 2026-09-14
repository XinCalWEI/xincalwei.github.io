// Run after PurgeCSS: these selectors are created by the CDN-loaded zoom library
// at runtime, so a successful Jekyll build alone does not verify they survive.
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

console.log("Production CSS retains both image zoom layers.");
