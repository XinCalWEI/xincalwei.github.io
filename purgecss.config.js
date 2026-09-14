module.exports = {
  content: ["_site/**/*.html", "_site/**/*.js"],
  css: ["_site/assets/css/*.css"],
  output: "_site/assets/css/",
  skippedContentGlobs: ["_site/assets/**/*.html"],
  // The CDN-loaded zoom library adds these classes only after an image opens.
  // They are absent from the generated HTML/JS that PurgeCSS scans.
  safelist: [/^medium-zoom/],
};
