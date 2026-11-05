// On a Mac, show the Command-key shortcut for search (the header renders "Ctrl K").
// Only the <kbd> hint and the button's accessible name change; the SVG icon in
// #search-toggle .nav-link is left alone.
document.addEventListener("readystatechange", () => {
  if (document.readyState === "interactive") {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const toggle = document.getElementById("search-toggle");
    if (!toggle || !isMac) return;
    const kbd = toggle.querySelector(".nav-link kbd");
    if (kbd) kbd.textContent = "⌘K";
    toggle.setAttribute("aria-label", "Search (Command K)");
    toggle.setAttribute("title", "Search (⌘K)");
  }
});
