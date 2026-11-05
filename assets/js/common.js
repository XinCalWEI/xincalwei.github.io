$(document).ready(function () {
  // add toggle functionality to abstract, award and bibtex buttons
  // (_layouts/bib.liquid renders them as <button>s two levels below the entry;
  // a.* kept for older markup). aria-expanded mirrors each panel's state.
  const syncExpanded = function (entry) {
    ["abstract", "award", "bibtex"].forEach(function (kind) {
      const open = entry.find("." + kind + ".hidden").hasClass("open");
      entry.find(".links ." + kind).attr("aria-expanded", open ? "true" : "false");
    });
  };
  $("a.abstract, button.abstract").click(function () {
    const entry = $(this).parent().parent();
    entry.find(".abstract.hidden").toggleClass("open");
    entry.find(".award.hidden.open").toggleClass("open");
    entry.find(".bibtex.hidden.open").toggleClass("open");
    syncExpanded(entry);
  });
  $("a.award, button.award").click(function () {
    const entry = $(this).parent().parent();
    entry.find(".abstract.hidden.open").toggleClass("open");
    entry.find(".award.hidden").toggleClass("open");
    entry.find(".bibtex.hidden.open").toggleClass("open");
    syncExpanded(entry);
  });
  $("a.bibtex, button.bibtex").click(function () {
    const entry = $(this).parent().parent();
    entry.find(".abstract.hidden.open").toggleClass("open");
    entry.find(".award.hidden.open").toggleClass("open");
    entry.find(".bibtex.hidden").toggleClass("open");
    syncExpanded(entry);
  });

  // Escape closes the open mobile menu and returns focus to the toggler
  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && $("#navbarNav").hasClass("show")) {
      $("#navbarNav").collapse("hide");
      $(".navbar-toggler").trigger("focus");
    }
  });

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
      offset: 100,
    });
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href = "../css/jupyter.css";
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  let jupyterTheme = determineComputedTheme();

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    $(this).contents().find("head").append(cssLink);

    if (jupyterTheme == "dark") {
      $(this).bind("load", function () {
        $(this).contents().find("body").attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark",
        });
      });
    }
  });

  // trigger popovers
  $('[data-toggle="popover"]').popover({
    trigger: "hover",
  });
});
