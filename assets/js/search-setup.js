let searchTheme = determineComputedTheme();
const ninjaKeys = document.querySelector("ninja-keys");

if (searchTheme === "dark") {
  ninjaKeys.classList.add("dark");
} else {
  ninjaKeys.classList.remove("dark");
}

// Where focus goes back to when the palette closes. Opened from the mobile menu,
// the Search button is about to be hidden with the menu, so use the menu button.
let searchOpener = null;

const openSearchModal = () => {
  // collapse navbarNav if expanded on mobile
  const $navbarNav = $("#navbarNav");
  if ($navbarNav.hasClass("show")) {
    searchOpener = document.querySelector("#navbar .navbar-toggler");
    $navbarNav.collapse("hide");
  }
  ninjaKeys.open();
};

// ninja-keys has no dialog semantics, names nothing, announces nothing and drops
// focus on <body> when it closes. Once the element is defined: wrap open/close
// to return focus to whatever opened it (button, Ctrl/Cmd+K, Escape, backdrop
// click and choosing a result all go through these), name the dialog and its
// input, and report the result count and the highlighted result in the live
// region of our slotted footer (_includes/scripts.liquid).
customElements.whenDefined("ninja-keys").then(() => {
  const proto = Object.getPrototypeOf(ninjaKeys);
  const status = document.getElementById("search-status");
  let announceTimer;

  const announce = (text, delay) => {
    if (!status) return;
    clearTimeout(announceTimer);
    announceTimer = setTimeout(() => {
      status.textContent = text;
    }, delay);
  };

  const label = () => {
    const root = ninjaKeys.shadowRoot;
    const dialog = root && root.querySelector(".modal-content");
    if (dialog && !dialog.hasAttribute("role")) {
      dialog.setAttribute("role", "dialog");
      dialog.setAttribute("aria-modal", "true");
      dialog.setAttribute("aria-label", "Search the site");
    }
    const header = root && root.querySelector("ninja-header");
    const input = header && header.shadowRoot && header.shadowRoot.querySelector("input");
    if (input && !input.hasAttribute("aria-label")) {
      input.setAttribute("aria-label", "Search the site");
    }
  };

  ninjaKeys.open = function (...args) {
    if (!this.visible) {
      searchOpener = searchOpener || document.activeElement;
    }
    proto.open.apply(this, args);
    this.updateComplete.then(label);
  };

  ninjaKeys.close = function (...args) {
    const wasOpen = this.visible;
    proto.close.apply(this, args);
    if (!wasOpen) return;
    clearTimeout(announceTimer);
    if (status) status.textContent = "";
    const target = searchOpener;
    searchOpener = null;
    if (target && target !== document.body && target.isConnected) {
      target.focus();
    }
  };

  // result count after typing (debounced so it is read once typing pauses)
  ninjaKeys.addEventListener("change", (e) => {
    const count = e.detail && e.detail.actions ? e.detail.actions.length : 0;
    const search = e.detail && e.detail.search;
    if (!search) {
      announce("", 0);
      return;
    }
    announce(count === 0 ? "No results" : count === 1 ? "1 result" : `${count} results`, 500);
  });

  // the highlighted result after arrowing (the hotkeys also take Tab). This
  // listener runs before the library's document-level hotkey handler, so read
  // the selection a task later, once that has run and the element re-rendered.
  ninjaKeys.addEventListener("keydown", (e) => {
    if (!ninjaKeys.visible || !["ArrowDown", "ArrowUp", "Tab"].includes(e.key)) return;
    setTimeout(() => {
      ninjaKeys.updateComplete.then(() => {
        const selected = ninjaKeys._selected;
        if (selected && selected.title) {
          announce(selected.section ? `${selected.title}, ${selected.section}` : selected.title, 50);
        }
      });
    }, 0);
  });
});
