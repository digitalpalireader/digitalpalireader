/*
 TODO
 - Bring back start page
 - Bring back feedback button
 - Bring back context menu
 - 2 x navigation Info icons to show popups
 */

function initialize() {
  initSplitters();
  initMainPane();
  initFooter();

  initPage();

  loadSidebarDivs();

  onpopstate = DPRChrome.historyPopstateHandler;
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

const toggleSidebarVisibility = () => {
  if ($('#main-sidebar').css('margin-left').startsWith("-")) {
    $("#main-sidebar").animate({ marginLeft: '0px' }, 300);
    $("#main-panel-splitter").css("display", "block");
  } else {
    $("#main-sidebar").animate({ marginLeft: "-" + $('#main-sidebar').css('width') }, 300);
    $("#main-panel-splitter").css("display", "none");
  }
}

const initFooter = () => {
  $("#main-footer-timestamp").text(`Deployed: ${window.createdTimestamp.toLocaleString()}`);
  $("#main-footer-version").text(`Version: ${window.releaseNumber}`);
}

const initPage = () => {
  $("#navigationDiv").show();
  $("#searchDiv").hide();
  $("#dictionaryDiv").hide();

  var location = document.location.href;
  if (location.indexOf('?') > -1) {
    loadSidebarDivs();
    if (location.indexOf('?feature=search') > -1) {
      $("#mafbc").load("search-results.html");
    } else if (location.indexOf('?feature=dictionary') > -1) {
      $("#mafbc").load("dictionary-results.html");
    }
    checkAnalysis();
  }
  $(".nav-link").on("click",function(e) {
    e.preventDefault();
    let tabId = this.id.substring(0, this.id.length - 3);
    $(".mainContent").hide();
    $("#"+tabId+"Div").show();
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      localStorage.setItem('activeTab', $(e.target).attr('id'));
    });
  });

  // NOTE: This hides all popover that have click as trigger;
  $('html').on('click', function (e) {
    if ($(e.target).data('toggle') !== 'popover') {
      $('[data-toggle="popover"]').popover('hide');
    }
  });

  const env = `${environmentName}.${releaseNumber}`;
  const url = encodeURIComponent(document.location.href);
  const userAgent = encodeURIComponent(navigator.userAgent);
  $("#feedbackFormLink").attr("href", `https://docs.google.com/forms/d/e/1FAIpQLSfkpd2GEExiez9q2s87KyGEwIe2Gqh_IWcVAWgyiF3HlFvZpg/viewform?entry.1186851452=${env}&entry.1256879647=${url}&entry.1719542298=${userAgent}`);
}

const loadSidebarDivs = () => {
  $("#navigationDiv").load("navigation.html");
  $("#searchDiv").load("search.html");
  $("#dictionaryDiv").load("dictionary.html");
}

checkAnalysis = () => {
  let location=document.location.href;
  if(location.indexOf('analysis')>-1) {
    let x= new URL(location);
    outputAnalysis(x.searchParams.get("analysis"), x.searchParams.get("frombox"));
  }
} //TODO: handle most parameters in a single function after Beta.
