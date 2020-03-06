function initialize() {
  initSplitters();
  initSidebar();
  initMainPane();
  initFooter();
}

const initSplitters = () => {
  $("#main-sidebar").resizable({
    handleSelector: "#main-panel-splitter",
    resizeHeight: false
  });

  $("#main-pane-text-container").resizable({
    handleSelector: "#main-pane-container-splitter",
    resizeHeight: false
  });

  $("#main-pane").resizable({
    handleSelector: "#main-content-panel-splitter",
    resizeWidth: false
  });
}

const initMainPane = () => {
  $("#main-pane").css("max-height", $("#main-content-panel").height() - $("#main-content-panel-splitter").height())
}

const initSidebar = () => {
  $("#sidebar-toggler").on("click", function() {
    if ($('#main-sidebar').css('margin-left').startsWith("-")) {
      $("#main-sidebar").animate({ marginLeft: '0px' }, 300);
      $("#main-panel-splitter").css("display", "block");
    } else {
      $("#main-sidebar").animate({ marginLeft: "-" + $('#main-sidebar').css('width') }, 300);
      $("#main-panel-splitter").css("display", "none");
    }
  });
}

const initFooter = () => {
  $("#main-footer-timestamp").text(`Deployed: ${window.createdTimestamp.toLocaleString()}`);
  $("#main-footer-version").text(`Version: ${window.releaseNumber}`);
}
