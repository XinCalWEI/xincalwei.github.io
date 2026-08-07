// Client-side filtering for the blog index.
//
// Chips carry data-filter (a slug) and data-kind ("cat" | "tag" | "all");
// cards carry data-cats and data-tags (space-separated slugs). Because a slug
// can exist as BOTH a category and a tag in this repo (e.g. machine-learning,
// tutorial), the active filter is keyed on "kind:slug", never the slug alone.
//
// The active filter is mirrored into the URL hash (#cat=research) so a filtered
// view is shareable and the back button works.

(function () {
  "use strict";

  const grid = document.querySelector(".tm-blog .blog-grid");
  const chips = Array.from(document.querySelectorAll(".tm-blog .chip"));
  if (!grid || !chips.length) return;

  const cards = Array.from(grid.querySelectorAll(".blog-card"));
  const status = document.querySelector(".tm-blog .blog-filters__status");
  const empty = document.querySelector(".tm-blog .blog-empty");
  const resetBtn = document.querySelector(".tm-blog .blog-empty__reset");

  const matches = (card, kind, slug) => {
    if (!slug) return true;
    const attr = kind === "cat" ? "cats" : "tags";
    return (card.dataset[attr] || "").split(/\s+/).includes(slug);
  };

  function apply(kind, slug, { push = true } = {}) {
    let shown = 0;

    cards.forEach((card) => {
      const hit = matches(card, kind, slug);
      card.hidden = !hit;
      // the first card is the full-width featured lead; that only makes sense
      // for the unfiltered view, where it really is the newest post
      card.classList.toggle("blog-card--featured", slug === "" && card === cards[0]);
      if (hit) shown++;
    });

    chips.forEach((chip) => {
      const on = (chip.dataset.filter || "") === slug && (slug === "" || chip.dataset.kind === kind);
      chip.classList.toggle("is-active", on);
      chip.setAttribute("aria-pressed", on ? "true" : "false");
    });

    if (empty) empty.hidden = shown !== 0;

    if (status) {
      const label = chips.find((c) => c.classList.contains("is-active"));
      const name = label ? label.textContent.replace(/\s*\d+\s*$/, "").trim() : "";
      status.textContent = slug ? `${shown} post${shown === 1 ? "" : "s"} in ${name}` : "";
    }

    if (push) {
      const hash = slug ? `#${kind}=${slug}` : " ";
      history.replaceState(null, "", slug ? hash : window.location.pathname);
    }
  }

  function fromHash() {
    const m = /^#(cat|tag)=([\w-]+)$/.exec(window.location.hash || "");
    if (!m) return apply("all", "", { push: false });
    const [, kind, slug] = m;
    const chip = chips.find((c) => c.dataset.kind === kind && c.dataset.filter === slug);
    apply(kind, chip ? slug : "", { push: false });
  }

  chips.forEach((chip) => {
    chip.setAttribute("aria-pressed", chip.classList.contains("is-active") ? "true" : "false");
    chip.addEventListener("click", () => {
      const slug = chip.dataset.filter || "";
      const kind = chip.dataset.kind;
      // clicking the active chip clears the filter
      const clear = chip.classList.contains("is-active") && slug !== "";
      apply(clear ? "all" : kind, clear ? "" : slug);
    });
  });

  if (resetBtn) resetBtn.addEventListener("click", () => apply("all", ""));
  window.addEventListener("hashchange", fromHash);
  fromHash();
})();
