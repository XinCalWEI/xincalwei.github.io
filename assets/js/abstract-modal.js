// Turns the bibliography's "Abstract" button into a modal dialog.
//
// al-folio ships an inline accordion (a.abstract toggles .abstract.hidden.open,
// wired in assets/js/common.js). That is left in place as the no-JS / fallback
// path; this script intercepts the click first, lifts the same markup into a
// <dialog>, and stops the inline panel from also opening.
//
// Uses the native <dialog> element: focus trapping, Esc to close, and inertness
// of the page behind come for free.

(function () {
  "use strict";

  const entries = document.querySelectorAll(".publications .links .abstract.btn");
  if (!entries.length || !window.HTMLDialogElement) return;

  let dialog = document.getElementById("abstract-dialog");
  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.id = "abstract-dialog";
    dialog.className = "abs-modal";
    dialog.innerHTML = [
      '<form method="dialog" class="abs-modal__close-form">',
      '  <button class="abs-modal__close" aria-label="Close abstract" value="close">',
      '    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6 6 18"/></svg>',
      "  </button>",
      "</form>",
      '<p class="abs-modal__eyebrow">Abstract</p>',
      // data-toc-skip: on project pages bootstrap-toc would list this empty heading
      '<h2 class="abs-modal__title" id="abs-modal-title" data-toc-skip></h2>',
      '<p class="abs-modal__meta"></p>',
      '<div class="abs-modal__body"></div>',
      '<div class="abs-modal__actions"></div>',
    ].join("");
    document.body.appendChild(dialog);
  }
  // the entry title names the dialog for screen readers
  dialog.setAttribute("aria-labelledby", "abs-modal-title");

  const titleEl = dialog.querySelector(".abs-modal__title");
  const metaEl = dialog.querySelector(".abs-modal__meta");
  const bodyEl = dialog.querySelector(".abs-modal__body");
  const actionsEl = dialog.querySelector(".abs-modal__actions");

  const text = (root, sel) => {
    const el = root.querySelector(sel);
    return el ? el.textContent.replace(/\s+/g, " ").trim() : "";
  };

  // full author list: drop the "and N more authors" button and the mentee
  // marks; the collapsed names are in the DOM (hidden), so they are included
  const authors = (root) => {
    const el = root.querySelector(".author");
    if (!el) return "";
    const copy = el.cloneNode(true);
    copy.querySelectorAll("button.more-authors, .bib-mentee, .sr-only").forEach((n) => n.remove());
    return copy.textContent.replace(/\s+/g, " ").replace(/\s+,/g, ",").trim();
  };

  entries.forEach((btn) => {
    // the button opens a dialog rather than expanding a panel; common.js's
    // syncExpanded writes aria-expanded back after a BibTeX/award toggle (its
    // handler runs on the button itself), so drop it again once that click has
    // bubbled up to .links
    const unsetExpanded = () => btn.removeAttribute("aria-expanded");
    unsetExpanded();
    btn.setAttribute("aria-haspopup", "dialog");
    if (btn.parentElement) btn.parentElement.addEventListener("click", unsetExpanded);
    btn.addEventListener(
      "click",
      (ev) => {
        const entry = btn.closest("li") || btn.closest(".row");
        if (!entry) return;
        const source = entry.querySelector(".abstract.hidden");
        if (!source) return;

        // beat common.js's handler to the punch so the inline panel stays shut
        ev.preventDefault();
        ev.stopImmediatePropagation();
        source.classList.remove("open");

        titleEl.textContent = text(entry, ".title");
        metaEl.textContent = [authors(entry), text(entry, ".periodical")].filter(Boolean).join(" · ");
        const opener = btn;
        bodyEl.innerHTML = "";
        source.querySelectorAll("p").forEach((p) => {
          const copy = document.createElement("p");
          copy.textContent = p.textContent.trim();
          bodyEl.appendChild(copy);
        });

        // carry the entry's real links (Link / PDF / arXiv …) into the dialog
        actionsEl.innerHTML = "";
        entry.querySelectorAll(".links a.btn[href]").forEach((a) => {
          const clone = a.cloneNode(true);
          clone.classList.remove("abstract");
          actionsEl.appendChild(clone);
        });

        dialog.showModal();
        dialog.addEventListener("close", () => opener.focus(), { once: true });
      },
      true // capture phase — runs before the jQuery handler bound on bubble
    );
  });

  // click the backdrop to dismiss. The dialog's own padding is part of the
  // dialog element too, so test the pointer against its box, not just the
  // target; keyboard-made clicks (no coordinates) never land on the dialog itself.
  dialog.addEventListener("click", (ev) => {
    if (ev.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    const outside = ev.clientX < r.left || ev.clientX > r.right || ev.clientY < r.top || ev.clientY > r.bottom;
    if (outside) dialog.close();
  });
})();
