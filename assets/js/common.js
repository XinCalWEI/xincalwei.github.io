$(document).ready(function () {
  // add toggle functionality to abstract, award and bibtex buttons
  $("a.abstract").click(function () {
    $(this).parent().parent().find(".abstract.hidden").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.award").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.bibtex").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden").toggleClass("open");
  });
  $("a").removeClass("waves-effect waves-light");

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

  // Escape closes the expanded mobile menu and returns focus to its button
  $(document).on("keydown", function (e) {
    if (e.key !== "Escape") return;
    var $menu = $("#navbarNav.show");
    if (!$menu.length) return;
    var active = document.activeElement;
    if (active && active !== document.body && !$(active).closest("#navbar").length) return;
    $menu.collapse("hide");
    $(".navbar-toggler").trigger("focus");
  });

  // Tables (and wide project figures) that scroll sideways inside their wrapper:
  // make the scroll container reachable by keyboard and give it a unique name
  // from the nearest preceding heading. Wrappers that do not scroll are left alone.
  function labelScrollableTables() {
    var used = {};
    $(".table-responsive, .project-detail__figure-scroll").each(function () {
      var scrolls = this.scrollWidth > this.clientWidth + 1;
      if (scrolls && (!this.hasAttribute("tabindex") || this.hasAttribute("data-scroll-region"))) {
        var kind = $(this).hasClass("table-responsive") ? "Table" : "Figure";
        var heading = $(this).prevAll("h1, h2, h3, h4, h5, h6").first().text().trim();
        var label = heading ? kind + ": " + heading : kind;
        used[label] = (used[label] || 0) + 1;
        if (used[label] > 1) label += " (" + used[label] + ")";
        $(this).attr({
          tabindex: "0",
          role: "region",
          "aria-label": label,
          "data-scroll-region": "",
        });
      } else if (!scrolls && this.hasAttribute("data-scroll-region")) {
        $(this).removeAttr("tabindex role aria-label data-scroll-region");
      }
    });
  }
  labelScrollableTables();
  var tableResizeTimer;
  $(window).on("resize", function () {
    clearTimeout(tableResizeTimer);
    tableResizeTimer = setTimeout(labelScrollableTables, 200);
  });
});
