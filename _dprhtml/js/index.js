import * as DprVM from './dprviewmodel.js'
import * as F from '../features/index.js'

// NOTE: Ensure this is the very first line.
installGlobalHandlers();

/* Start: Legacy stuff - Don't mess with it! */
DPR_G.devCheck = 0;
window.dump = window.dump || DPR_G.devCheck ? console.log : () => { };
window.moveFrame = () => { }
window.devO = () => { }
window.dalert = (a) => { }
window.ddump = (a) => { }
/* End: Legacy stuff. */

ko.applyBindings(DprVM.ViewModel);

export async function mainInitialize() {
  const sectionId = DPR_Chrome.getPrimarySectionId()
  await DPR_config_mod.getconfig();
  triggerPrivacyNoticeAcceptanceCheck();
  initSplitters();
  initFooter();
  await loadPanesAsync();
  ensureHidePopoversWithClickTriggers();

  if (DPR_PAL.isNavigationFeature()) {
    await loadFeatureAsync(sectionId, F.Navigation.featureName, F.Navigation.initializeFeature);
  } else if (DPR_PAL.isSearchFeature()) {
    await loadFeatureAsync(sectionId, F.Search.featureName, F.Search.initializeFeature);
  } else if (DPR_PAL.isDictionaryFeature()) {
    await loadFeatureAsync(sectionId, F.Dictionary.featureName, F.Dictionary.initializeFeature);
  } else {
    await loadAndInitializeLandingPage();
  }

  initMainPane();
  await checkAnalysis(sectionId);
}

function installGlobalHandlers() {
  window.addEventListener('resize', () => {
    DPR_prefload_mod.loadPreferences();
    initMainPane();
  });

  window.addEventListener('popstate', e => historyPopstateHandler(e));
}

const loadFeatureAsync = async (sectionId, name, initFn) => {
  await loadHtmlFragmentAsync(`#main-pane-container`, `features/${name}/main-pane.html`);
  DprVM.ViewModel.showMainFeatures();
  await initFn(sectionId);
  initFeedbackFormParameters();
}

const loadAndInitializeLandingPage = async () => {
  await loadHtmlFragmentAsync("#main-content-landing-page", 'features/landing-page/main-pane.html');
  DprVM.ViewModel.showLandingFeature();
  initFeedbackFormParameters();
  await DPR_bv_mod.showBv();
}

const initSplitters = () => {
  $("#main-sidebar").resizable({
    handleSelector: "#main-panel-splitter",
    resizeHeight: false
  });

  $("#main-pane").resizable({
    handleSelector: "#main-content-panel-splitter",
    onDrag: (event, $el, passed) => {
      DPR1_chrome_mod.updateBottomFrameDimensions();
    },
    resizeWidth: false
  });
}

const initMainPane = () => {
  $("#main-pane").css("max-height", $("#main-content-panel").height() - $("#main-content-panel-splitter").height())
  $('#main-pane-container').css("max-width", window.innerWidth)
}

const initFooter = () => {
  const padNum = n => ("0" + n).slice(-2);
  const formatDate = d => `${d.getFullYear()}-${padNum(d.getMonth() + 1)}-${padNum(d.getDate())} ${padNum(d.getHours())}:${padNum(d.getMinutes())}:${padNum(d.getSeconds())}`;

  $("#main-footer-timestamp").text(`${formatDate(new Date(window.createdTimestamp))}`);
  $("#main-footer-version").text(`${window.releaseNumber}`);
}

const loadPanesAsync = async () => {
  const allTabs = [
    [F.Navigation.featureName, F.Navigation.initializeSidebarTab],
    [F.Search.featureName, F.Search.initializeSidebarTab],
    [F.Dictionary.featureName, F.Dictionary.initializeSidebarTab]
  ];

  const all = [
    ...allTabs.map(([x, xFn]) => loadHtmlFragmentAsync(`#${x}TabPane`, `features/${x}/tab.html`).then(xFn)),
    loadHtmlFragmentAsync(`#main-bottom-pane`, `features/bottom-pane/main-pane.html`, F.BottomPane.ViewModel),
    loadHtmlFragmentAsync(`#settings-dialog`, `features/settings-dialog/main-pane.html`, F.SettingsDialog.ViewModel),
    loadHtmlFragmentAsync(`#quicklink-dialog`, `features/other-dialogs/quicklinks.html`, F.OtherDialogs.ViewModel),
    loadHtmlFragmentAsync(`#paliquote-dialog`, `features/other-dialogs/paliquote.html`, F.OtherDialogs.ViewModel),
    loadHtmlFragmentAsync(`#bookmark-dialog`, `features/other-dialogs/bookmarks.html`, F.OtherDialogs.ViewModel),
    loadHtmlFragmentAsync(`#installation-dialog`, `features/installation/main-pane.html`, F.Installation.ViewModel),
  ];

  await Promise.all(all);

  initFeatureTabs();
}

const initFeatureTabs = () => {
  $("#navigationTabPane").hide();
  $("#searchTabPane").hide();
  $("#dictionaryTabPane").hide();
  $("#instProgressDiv").hide();

  const activeTab = DprVM.ViewModel.activeTab();
  $(`#${activeTab}TabPane`).show();
  $(".nav-link").removeClass('active');
  $(`#${activeTab}Tab`).addClass('active');

  $(".nav-link").on("click", function (e) {
    e.preventDefault();
    $(".featureTabContent").hide();
    let tabId = this.id.substring(0, this.id.length - 3);
    $(`#${tabId}TabPane`).show();
  });
}

const checkAnalysis = async (sectionId) => {
  const location = document.location.href;
  if(location.indexOf('analysis')>-1) {
    const x = new URL(location);
    await DPR1_analysis_function_mod.outputAnalysis(sectionId, x.searchParams.get("analysis"), x.searchParams.get("frombox"));
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

const historyPopstateHandler = async e => {
  console.warn('>>>> historyPopstateHandler', e);

  if (e.currentTarget.location.search === '') {
    await loadAndInitializeLandingPage();
  }
}

function triggerPrivacyNoticeAcceptanceCheck() {
  const PrivacyNoticeAccepted = 'privacyNoticeAccepted'
  let setIntervalhandle; // NOTE: This is set below.
  const checker = () => {
    if (localStorage[PrivacyNoticeAccepted]) {
      console.debug('Privacy notice accepted. Not going to check anymore...');
      clearInterval(setIntervalhandle);
      return;
    }

    DPR_Chrome.showSingletonInformationToast(
      'We serve cookies on this site to remember your preferences and optimize your experience.',
      'privacy-notice-toast',
      600,
      {
        toastCommandName: 'Accept',
        toastCommandHandler: () => localStorage[PrivacyNoticeAccepted] = 'True',
        toastCommandLink: 'https://www.sirimangalo.org/info/our-privacy-policy/',
      });
  }

  const [firstCheckIntervalInMins, checkIntervalInHours] =
    /^(localdev|staging)$/i.test(window.environmentName)
    ? [1, 0.5]
    : [1, 0.5];

  setTimeout(checker, firstCheckIntervalInMins * 60 * 1000);
  setIntervalhandle = setInterval(checker, checkIntervalInHours * 60 * 60 * 1000);
}

// NOTE: Ensure these are the very last lines.
document.addEventListener('keypress', DprVM.DprKeyboardHandler)
window.document.addEventListener("DOMContentLoaded", mainInitialize)