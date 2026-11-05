// /publications/ filter: free-text search + one chip filter (all · journal ·
// conference · first author), combined. Markup: _includes/bib_search.liquid,
// _pages/publications.md and _layouts/bib.liquid (li > .row[data-pub-type]
// [data-first-author]).
//
// - Hidden entries, emptied year groups (h2/h3.bibliography + ol) and emptied
//   type sections ([data-pub-section]) get .unloaded (display:none).
// - State lives in the hash: #q=<text>&filter=<chip>. A hash that names an
//   element on the page (#wei2024improving, #journal-articles) is a plain
//   anchor: the filter resets so the target is visible. Any other bare hash is
//   read as a search term (the old al-folio format).
// - Matches inside a collapsed author list expand it, so a hit is never hidden.
import { highlightSearchTerm } from "./highlight-search-term.js";

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("bibsearch");
  if (!input) return;

  const ENTRY = ".publications .bibliography > li";
  const entries = Array.from(document.querySelectorAll(ENTRY));
  const chips = Array.from(document.querySelectorAll(".pub-chip[data-filter]"));
  const status = document.getElementById("pub-status");
  const empty = document.getElementById("pub-empty");
  const filters = ["all", "journal", "conference", "first-author"];
  let filter = "all";

  const matchesFilter = (li) => {
    if (filter === "all") return true;
    const row = li.querySelector(":scope > .row");
    if (!row) return true;
    if (filter === "first-author") return row.dataset.firstAuthor === "true";
    return row.dataset.pubType === filter;
  };

  const revealAuthors = (li, term) => {
    const list = li.querySelector(".more-authors-list[hidden]");
    if (list && list.textContent.toLowerCase().includes(term)) {
      const button = li.querySelector(".more-authors[aria-expanded='false']");
      if (button) button.click();
    }
  };

  const apply = () => {
    const term = input.value.trim().toLowerCase();

    let nonMatching = new Set();
    if (term) {
      if (window.CSS && CSS.highlights) {
        nonMatching = new Set(highlightSearchTerm({ search: term, selector: ENTRY }) || []);
      } else {
        entries.forEach((li) => {
          if (!li.textContent.toLowerCase().includes(term)) nonMatching.add(li);
        });
      }
    } else if (window.CSS && CSS.highlights) {
      CSS.highlights.delete("search");
    }

    let shown = 0;
    entries.forEach((li) => {
      const visible = !nonMatching.has(li) && matchesFilter(li);
      li.classList.toggle("unloaded", !visible);
      if (visible) {
        shown += 1;
        if (term) revealAuthors(li, term);
      }
    });

    // year groups: a heading and its list go when the list is empty
    document.querySelectorAll(".publications ol.bibliography").forEach((ol) => {
      const any = ol.querySelector(":scope > li:not(.unloaded)") !== null;
      ol.classList.toggle("unloaded", !any);
      const heading = ol.previousElementSibling;
      if (heading && heading.classList.contains("bibliography")) heading.classList.toggle("unloaded", !any);
    });
    // a top-level heading (e.g. jekyll-scholar's own h2 type groups) with nothing visible after it
    document.querySelectorAll(".publications h2.bibliography").forEach((h2) => {
      let node = h2.nextElementSibling;
      let any = false;
      while (node && node.tagName !== "H2") {
        if (node.tagName === "OL" && !node.classList.contains("unloaded")) any = true;
        node = node.nextElementSibling;
      }
      h2.classList.toggle("unloaded", !any);
    });
    document.querySelectorAll("[data-pub-section]").forEach((section) => {
      section.classList.toggle("unloaded", section.querySelector(".bibliography > li:not(.unloaded)") === null);
    });

    const filtered = term !== "" || filter !== "all";
    if (empty) empty.hidden = shown !== 0;
    if (status) {
      status.textContent = filtered ? `Showing ${shown} of ${entries.length} entries` : `${entries.length} entries`;
    }
    chips.forEach((chip) => chip.setAttribute("aria-pressed", chip.dataset.filter === filter ? "true" : "false"));
  };

  const writeHash = () => {
    const params = new URLSearchParams();
    const term = input.value.trim();
    if (term) params.set("q", term);
    if (filter !== "all") params.set("filter", filter);
    const hash = params.toString();
    const url = hash ? `#${hash}` : window.location.pathname + window.location.search;
    history.replaceState(null, "", url);
  };

  const readHash = () => {
    const raw = window.location.hash.slice(1);
    let term = "";
    let next = "all";
    let target = null;
    if (raw.includes("=")) {
      const params = new URLSearchParams(raw);
      term = params.get("q") || "";
      next = params.get("filter") || "all";
    } else if (raw) {
      // a stray "%" (e.g. #100%) is not valid percent-encoding: use the raw text
      let decoded = raw;
      try {
        decoded = decodeURIComponent(raw);
      } catch (e) {
        decoded = raw;
      }
      target = document.getElementById(decoded);
      if (!target) term = decoded;
    }
    filter = filters.includes(next) ? next : "all";
    input.value = term;
    apply();
    if (target) target.scrollIntoView();
  };

  let timer;
  input.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      apply();
      writeHash();
    }, 200);
  });

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      filter = chip.dataset.filter;
      apply();
      writeHash();
    });
  });

  document.querySelectorAll(".pub-empty__reset").forEach((button) => {
    button.addEventListener("click", () => {
      filter = "all";
      input.value = "";
      apply();
      writeHash();
      input.focus();
    });
  });

  window.addEventListener("hashchange", readHash);
  readHash();
});
