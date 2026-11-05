// Search and combined filtering for the Blog index.
//
// Categories are exposed through a compact native select; tags are presented
// as topic chips. The state is shareable through the URL hash, while typing in
// search replaces (rather than floods) browser history.

(function () {
  "use strict";

  const root = document.querySelector(".tm-blog[data-blog-index]");
  if (!root) return;

  const grid = root.querySelector(".blog-grid");
  const cards = Array.from(root.querySelectorAll(".blog-card"));
  const chips = Array.from(root.querySelectorAll(".chip[data-kind='tag']"));
  const typeSelect = root.querySelector("#blog-type");
  const searchInput = root.querySelector("#blog-search");
  const searchClear = root.querySelector(".blog-search__clear");
  const status = root.querySelector(".blog-filters__status");
  const empty = root.querySelector(".blog-empty");
  const resetButtons = Array.from(root.querySelectorAll(".blog-reset, .blog-empty__reset"));

  if (!grid || !cards.length || !chips.length || !typeSelect || !searchInput) return;

  const state = { cat: "", tag: "", q: "" };
  const validCategories = new Set(Array.from(typeSelect.options, (option) => option.value));
  const validTags = new Set(chips.map((chip) => chip.dataset.filter || ""));
  const categoryAliases = new Map([
    ["machine-learning", ""],
    ["platforms", "research"],
  ]);

  const normalize = (value) =>
    String(value || "")
      .toLocaleLowerCase()
      .trim()
      .replace(/\s+/g, " ");
  const hasToken = (value, token) =>
    !token ||
    String(value || "")
      .split(/\s+/)
      .includes(token);

  function cardMatches(card) {
    if (!hasToken(card.dataset.cats, state.cat) || !hasToken(card.dataset.tags, state.tag)) return false;
    if (!normalize(state.q)) return true;

    const haystack = normalize(card.dataset.search);
    return normalize(state.q)
      .split(" ")
      .filter(Boolean)
      .every((term) => haystack.includes(term));
  }

  function filterLabel() {
    const details = [];

    if (normalize(state.q)) details.push(`matching “${state.q.trim()}”`);

    if (state.cat) {
      const selected = typeSelect.selectedOptions[0];
      details.push(`in ${selected ? selected.textContent.trim() : state.cat}`);
    }

    if (state.tag) {
      const activeTag = chips.find((chip) => (chip.dataset.filter || "") === state.tag);
      details.push(`tagged ${activeTag ? activeTag.dataset.label : state.tag}`);
    }

    return details;
  }

  function urlForState() {
    const params = new URLSearchParams();
    if (state.cat) params.set("cat", state.cat);
    if (state.tag) params.set("tag", state.tag);
    if (normalize(state.q)) params.set("q", state.q.trim());

    const hash = params.toString();
    return `${window.location.pathname}${window.location.search}${hash ? `#${hash}` : ""}`;
  }

  function revealActiveTopic() {
    if (!state.tag) return;
    const activeTag = chips.find((chip) => (chip.dataset.filter || "") === state.tag);
    const rail = activeTag?.parentElement;
    if (!activeTag || !rail || rail.scrollWidth <= rail.clientWidth) return;

    const railBox = rail.getBoundingClientRect();
    const chipBox = activeTag.getBoundingClientRect();
    if (chipBox.left >= railBox.left && chipBox.right <= railBox.right) return;

    rail.scrollBy({
      left: chipBox.left - railBox.left - (railBox.width - chipBox.width) / 2,
      behavior: "auto",
    });
  }

  function syncUrl(mode) {
    if (!mode) return;
    const nextUrl = urlForState();
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (nextUrl === currentUrl) return;
    window.history[mode === "push" ? "pushState" : "replaceState"](null, "", nextUrl);
  }

  function render({ historyMode = null } = {}) {
    let shown = 0;
    const isDefaultView = !state.cat && !state.tag && !normalize(state.q);

    cards.forEach((card, index) => {
      const matches = cardMatches(card);
      card.hidden = !matches;
      card.classList.toggle("blog-card--featured", isDefaultView && index === 0);
      card.classList.toggle("blog-card--tail", isDefaultView && card.dataset.tail === "true");
      card.classList.remove("blog-card--solo");
      if (matches) shown += 1;
    });

    if (!isDefaultView && shown === 1) {
      const singleResult = cards.find((card) => !card.hidden);
      if (singleResult) singleResult.classList.add("blog-card--solo");
    } else if (!isDefaultView && shown > 1 && shown % 2 === 1) {
      const visibleCards = cards.filter((card) => !card.hidden);
      visibleCards[visibleCards.length - 1]?.classList.add("blog-card--tail");
    }

    chips.forEach((chip) => {
      const active = (chip.dataset.filter || "") === state.tag;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-pressed", active ? "true" : "false");
    });

    typeSelect.value = state.cat;
    if (searchInput.value !== state.q) searchInput.value = state.q;
    if (searchClear) searchClear.hidden = !normalize(state.q);

    const hasFilters = !isDefaultView;
    resetButtons.forEach((button) => {
      button.hidden = !hasFilters;
    });

    if (empty) empty.hidden = shown !== 0;

    if (status) {
      const total = cards.length;
      const details = filterLabel();
      status.textContent = isDefaultView
        ? `Showing all ${total} post${total === 1 ? "" : "s"}`
        : `Showing ${shown} of ${total} post${total === 1 ? "" : "s"}${details.length ? ` ${details.join(" · ")}` : ""}`;
    }

    syncUrl(historyMode);
  }

  function resetAll({ historyMode = "push" } = {}) {
    state.cat = "";
    state.tag = "";
    state.q = "";
    render({ historyMode });
  }

  function restoreFromUrl() {
    const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const requestedCategory = params.get("cat") || "";
    const requestedTag = params.get("tag") || "";
    const resolvedCategory = validCategories.has(requestedCategory) ? requestedCategory : categoryAliases.get(requestedCategory) || "";
    const resolvedTag = validTags.has(requestedTag) ? requestedTag : "";
    const needsCanonicalUrl = requestedCategory !== resolvedCategory || requestedTag !== resolvedTag;

    state.cat = validCategories.has(resolvedCategory) ? resolvedCategory : "";
    state.tag = resolvedTag;
    state.q = params.get("q") || "";
    render({ historyMode: needsCanonicalUrl ? "replace" : null });
    window.requestAnimationFrame(revealActiveTopic);
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const tag = chip.dataset.filter || "";
      state.tag = tag === state.tag && tag ? "" : tag;
      render({ historyMode: "push" });
    });
  });

  typeSelect.addEventListener("change", () => {
    state.cat = validCategories.has(typeSelect.value) ? typeSelect.value : "";
    render({ historyMode: "push" });
  });

  searchInput.addEventListener("input", () => {
    state.q = searchInput.value;
    render({ historyMode: "replace" });
  });

  searchInput.addEventListener("search", () => {
    state.q = searchInput.value;
    render({ historyMode: "replace" });
  });

  if (searchClear) {
    searchClear.addEventListener("click", () => {
      state.q = "";
      render({ historyMode: "replace" });
      searchInput.focus();
    });
  }

  resetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      resetAll();
      searchInput.focus();
    });
  });

  document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isEditable = target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));

    if (event.key === "/" && !isEditable && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      searchInput.focus();
    }

    if (event.key === "Escape" && document.activeElement === searchInput) {
      if (state.q) {
        state.q = "";
        render({ historyMode: "replace" });
      } else {
        searchInput.blur();
      }
    }
  });

  window.addEventListener("popstate", restoreFromUrl);
  restoreFromUrl();
})();
