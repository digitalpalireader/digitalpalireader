/* Start: Legacy stuff - Don't mess with it! */
var devCheck = 0;
window.dump = window.dump || devCheck ? console.log : () => { };
function moveFrame() { }
function devO() { }
function dalert(a) { }
function ddump(a) { }
/* End: Legacy stuff. */

const navigationFeatureName = "navigation";
const dictionaryFeatureName = "dictionary";
const searchFeatureName = "search";

const __dprViewModel = new DprViewModel();
ko.applyBindings(__dprViewModel);

$(window).resize(() => {
  setPrefs();
  initMainPane();
});

onpopstate = DPRChrome.historyPopstateHandler;

function mainInitialize() {
  setPrefs();
  initSplitters();
  initFooter();
  loadSidebarTabs();
  initFeatureTabs();
  ensureHidePopoversWithClickTriggers();

  if (DPR_PAL.isLandingPageFeature()) {
    $("#main-content-landing-page")
      .load(
          `features/landing-page/main-pane.html`,
          () => {
            __dprViewModel.showLandingFeature();
            initFeedbackFormParameters();
          });
    return;
  }

  if (DPR_PAL.isNavigationFeature()) {
    loadFeature(navigationFeatureName, initializeNavigationFeature);
  } else if (DPR_PAL.isSearchFeature()) {
    loadFeature(searchFeatureName, initializeSearchFeature);
  } else if (DPR_PAL.isDictionaryFeature()) {
    loadFeature(dictionaryFeatureName, initializeDictionaryFeature);
  } else {
    console.error('Unsupported feature', document.location.href);
  }

  initMainPane();
  checkAnalysis();
}

const loadFeature = (name, initFn) => {
  $("#mafbc")
  .load(
    `features/${name}/main-pane.html`,
    () => {
      initFn();
      __dprViewModel.showMainFeatures();
      initFeedbackFormParameters();
    });
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

const initFooter = () => {
  $("#main-footer-timestamp").text(`Deployed: ${window.createdTimestamp.toLocaleString()}`);
  $("#main-footer-version").text(`Version: ${window.releaseNumber}`);
}

const loadSidebarTabs = () => {
  $("#navigationTabPane").load("features/navigation/tab.html", initializeNavigationSidebarTab);
  $("#searchTabPane").load("features/search/tab.html", initializeSearchSidebarTab);
  $("#dictionaryTabPane").load("features/dictionary/tab.html", initializeDictionarySidebarTab);
}

const initFeatureTabs = () => {
  $("#navigationTabPane").hide();
  $("#searchTabPane").hide();
  $("#dictionaryTabPane").hide();

  const activeTab = __dprViewModel.activeTab();
  $(`#${activeTab}TabPane`).show();
  $(".nav-link").removeClass('active');
  $(`#${activeTab}Tab`).addClass('active');
  localStorage.setItem('activeTab', `${__dprViewModel.activeTab()}Tab`);

  $(".nav-link").on("click", function (e) {
    e.preventDefault();
    $(".featureTabContent").hide();
    let tabId = this.id.substring(0, this.id.length - 3);
    $(`#${tabId}TabPane`).show();
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      localStorage.setItem('activeTab', $(e.target).attr('id'));
    });
  });
}

const checkAnalysis = () => {
  const location = document.location.href;
  if(location.indexOf('analysis')>-1) {
    const x = new URL(location);
    outputAnalysis(x.searchParams.get("analysis"), x.searchParams.get("frombox"));
  }
} //TODO: handle most parameters in a single function after Beta.

const ensureHidePopoversWithClickTriggers = () => {
  // NOTE: This hides all popover that have click as trigger;
  $('html').on('click', function (e) {
    if ($(e.target).data('toggle') !== 'popover') {
      $('[data-toggle="popover"]').popover('hide');
    }
  });
}

const initFeedbackFormParameters = () => {
  const env = `${environmentName}.${releaseNumber}`;
  const url = encodeURIComponent(document.location.href);
  const userAgent = encodeURIComponent(navigator.userAgent);
  $(".feedback-form-link").attr("href", `https://docs.google.com/forms/d/e/1FAIpQLSfkpd2GEExiez9q2s87KyGEwIe2Gqh_IWcVAWgyiF3HlFvZpg/viewform?entry.1186851452=${env}&entry.1256879647=${url}&entry.1719542298=${userAgent}`);
}
