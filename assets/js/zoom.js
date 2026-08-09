// Initialize medium zoom.
//
// Two things the stock al-folio setup gets wrong for a gallery:
//
// 1) `margin: 0` means the zoomed image grows to its *natural* size. Because
//    figure.liquid serves a responsive srcset, the browser has usually only
//    downloaded a small variant, so "zooming" produced an image the same size
//    as the thumbnail. A viewport-proportional margin makes the zoomed image
//    fill ~80% of the screen instead.
//
// 2) medium-zoom zooms whatever `src`/`currentSrc` the <img> already has. We
//    point it at the largest available variant via `data-zoom-src` so the
//    enlarged view is actually high-resolution.

$(document).ready(function () {
  // The homepage marquee renders every photo twice for its seamless loop, and
  // the two copies are visually identical. They must BOTH stay zoomable —
  // whichever copy happens to be under the cursor is the one the visitor
  // clicks, so disabling either half makes roughly half the strip dead.
  // The duplicates are only marked decorative so screen readers announce each
  // photo once; that does not affect the click.
  document.querySelectorAll("img.slider__dup").forEach((img) => {
    img.setAttribute("alt", "");
    img.setAttribute("role", "presentation");
  });

  // hand medium-zoom a high-res source for each zoomable image
  document.querySelectorAll("[data-zoomable]").forEach((img) => {
    if (img.dataset.zoomSrc) return;
    const picture = img.closest("picture");
    let best = "";
    let bestW = 0;
    if (picture) {
      picture.querySelectorAll("source[srcset]").forEach((source) => {
        source.srcset.split(",").forEach((candidate) => {
          const [url, descriptor] = candidate.trim().split(/\s+/);
          const w = descriptor && descriptor.endsWith("w") ? parseInt(descriptor, 10) : 0;
          if (url && w > bestW) {
            bestW = w;
            best = url;
          }
        });
      });
    }
    // Prefer the widest generated variant (1400w webp, plenty for an ~80vh
    // lightbox) over the raw original: some originals in this repo are 10 MB+
    // camera files, and zooming should not trigger those downloads.
    img.dataset.zoomSrc = best || img.getAttribute("src") || "";
  });

  const margin = () => Math.round(Math.min(window.innerWidth, window.innerHeight) * 0.1);

  medium_zoom = mediumZoom("[data-zoomable]", {
    background: getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color") + "ee", // + 'ee' for trasparency.
    margin: margin(), // leaves the zoomed image at roughly 80% of the viewport
  });

  // NOTE: no <picture>/srcset juggling is needed here. medium-zoom fetches
  // `data-zoom-src` into its own high-resolution clone and lays that over the
  // thumbnail, so the enlarged view is the full-size original even though the
  // in-page <img> still reports a small `currentSrc`. (Verified: the topmost
  // zoomed element renders the 2000px JPEG.)

  // keep the 80% relationship when the window is resized
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (medium_zoom) medium_zoom.update({ margin: margin() });
    }, 150);
  });
});
