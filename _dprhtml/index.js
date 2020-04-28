'use strict';

// NOTE: Ensure this is the very first line.
installGlobalHandlers();

/* Start: Legacy stuff - Don't mess with it! */
var devCheck = 0;
window.dump = window.dump || devCheck ? console.log : () => { };
function moveFrame() { }
function devO() { }
function dalert(a) { }
function ddump(a) { }
/* End: Legacy stuff. */

const navigationFeatureName = "navigation";
const searchFeatureName = "search";
const dictionaryFeatureName = "dictionary";
const paliFeatureName = "pali"

const __dprViewModel = new DprViewModel();
ko.applyBindings(__dprViewModel);
const __bottomPaneTabsViewModel = new BottomPaneTabsViewModel();
const __settingsDialogViewModel = new SettingsDialogTabsViewModel();

async function mainInitialize() {
  setPrefs();
  initSplitters();
  initFooter();
  await loadPanesAsync();
  ensureHidePopoversWithClickTriggers();

  if (DPR_PAL.isNavigationFeature()) {
    await loadFeatureAsync(navigationFeatureName, initializeNavigationFeature);
  } else if (DPR_PAL.isSearchFeature()) {
    await loadFeatureAsync(searchFeatureName, initializeSearchFeature);
  } else if (DPR_PAL.isDictionaryFeature()) {
    await loadFeatureAsync(dictionaryFeatureName, initializeDictionaryFeature);
  } else if (DPR_PAL.isPaliFeature()) {
    await loadFeatureAsync(paliFeatureName, initializePaliFeature);
  }
    else {
    await loadHtmlFragmentAsync("#main-content-landing-page", 'features/landing-page/main-pane.html');
    __dprViewModel.showLandingFeature();
    initFeedbackFormParameters();
    showBv();
  }

  initMainPane();
  checkAnalysis();
}

function installGlobalHandlers() {
  window.addEventListener('resize', () => {
    setPrefs();
    initMainPane();
  });

  window.addEventListener('popstate', e => historyPopstateHandler(e));
}

const loadFeatureAsync = async (name, initFn) => {
  await loadHtmlFragmentAsync("#mafbc", `features/${name}/main-pane.html`);
  initFn();
  __dprViewModel.showMainFeatures();
  initFeedbackFormParameters();
}

const initSplitters = () => {
  $("#main-sidebar").resizable({
    handleSelector: "#main-panel-splitter",
    resizeHeight: false
  });

  $("#main-pane").resizable({
    handleSelector: "#main-content-panel-splitter",
    onDrag: (event, $el, passed) => {
      updateBottomFrameDimensions();
    },
    resizeWidth: false
  });
}

const initMainPane = () => {
  $("#main-pane").css("max-height", $("#main-content-panel").height() - $("#main-content-panel-splitter").height());
}

const initFooter = () => {
  const padNum = n => ("0" + n).slice(-2);
  const formatDate = d => `${d.getFullYear()}-${padNum(d.getMonth() + 1)}-${padNum(d.getDate())} ${padNum(d.getHours())}:${padNum(d.getMinutes())}:${padNum(d.getSeconds())}`;

  $("#main-footer-timestamp").text(`${formatDate(new Date(window.createdTimestamp))}`);
  $("#main-footer-version").text(`${window.releaseNumber}`);
}

const loadPanesAsync = async () => {
  const allTabs = [
    ['navigation', initializeNavigationSidebarTab],
    ['search', initializeSearchSidebarTab],
    ['dictionary', initializeDictionarySidebarTab],
    ['pali', initializePaliSidebarTab]
  ];

  const all = [
    ...allTabs.map(([x, xFn]) => loadHtmlFragmentAsync(`#${x}TabPane`, `features/${x}/tab.html`).then(xFn)),
    loadHtmlFragmentAsync(`#main-bottom-pane`, `features/bottom-pane/main-pane.html`, __bottomPaneTabsViewModel),
    loadHtmlFragmentAsync(`#settings-dialog`, `features/settings-dialog/main-pane.html`, __settingsDialogViewModel),
  ];

  await Promise.all(all);

  initFeatureTabs();
}

const initFeatureTabs = () => {
  $("#navigationTabPane").hide();
  $("#searchTabPane").hide();
  $("#dictionaryTabPane").hide();
  $("#paliTabPane").hide();


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

const loadHtmlFragmentAsync = (id, src, vm = null) =>
  new Promise((resolve, reject) => {
    $(id).load(src, (_, status, xhr) => {
      if (status === "success" || status === "notmodified") {
        if (vm) {
          ko.applyBindings(vm, $(`${id}-root`)[0]);
        }

        resolve(status);
      } else {
        reject(new Error(`Error loading html status: ${status}, xhrStatus: ${xhr.status}, xhrStatusText: ${xhr.statusText}`));
      }
    });
  })

const  historyPopstateHandler = e => {
  console.warn('>>>> historyPopstateHandler', e);
  if (DPR_PAL.isNavigationFeature()) {
    $("#navigationDiv").load("navigation.html");
  } else if (DPR_PAL.isSearchFeature()) {
    $("#mafbc").load("search-results.html");
  } else if (DPR_PAL.isDictionaryFeature() && location.indexOf('#') == -1) {
    $("#mafbc").load("dictionary-results.html");
  } else {
    console.error('Unknown feature');
  }
}
