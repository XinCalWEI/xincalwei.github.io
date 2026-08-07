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

  const entries = document.querySelectorAll(".publications a.abstract.btn");
  if (!entries.length || !window.HTMLDialogElement) return;

  let dialog = document.getElementById("abstract-dialog");
  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.id = "abstract-dialog";
    dialog.className = "abs-modal";
    dialog.innerHTML = [
      '<form method="dialog" class="abs-modal__close-form">',
      '  <button class="abs-modal__close" aria-label="Close abstract" value="close">',
      '    <i class="fa-solid fa-xmark" aria-hidden="true"></i>',
      "  </button>",
      "</form>",
      '<p class="abs-modal__eyebrow">Abstract</p>',
      '<h2 class="abs-modal__title"></h2>',
      '<p class="abs-modal__meta"></p>',
      '<div class="abs-modal__body"></div>',
      '<div class="abs-modal__actions"></div>',
    ].join("");
    document.body.appendChild(dialog);
  }

  const titleEl = dialog.querySelector(".abs-modal__title");
  const metaEl = dialog.querySelector(".abs-modal__meta");
  const bodyEl = dialog.querySelector(".abs-modal__body");
  const actionsEl = dialog.querySelector(".abs-modal__actions");

  const text = (root, sel) => {
    const el = root.querySelector(sel);
    return el ? el.textContent.replace(/\s+/g, " ").trim() : "";
  };

  entries.forEach((btn) => {
    btn.setAttribute("role", "button");
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
        metaEl.textContent = [text(entry, ".author"), text(entry, ".periodical")].filter(Boolean).join(" · ");
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
      },
      true // capture phase — runs before the jQuery handler bound on bubble
    );
  });

  // click the backdrop to dismiss
  dialog.addEventListener("click", (ev) => {
    if (ev.target === dialog) dialog.close();
  });
})();
