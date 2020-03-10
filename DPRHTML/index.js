/*

TODO
v go home from anywhere
v Bring back feedback button
v dwheel for rotating gif
- Bring back context menu
- 2 x navigation Info icons to show popups
- bksubhuti's suggestion on poppers
- test onpopstatehandler
- scollstate is retained in navigation
- random widths in the sidebar tabs
- format search
- format dictionary
- refactor into features
*/

/* Legacy stuff */
var devCheck = 0;
window.dump = window.dump || devCheck ? console.log : () => { };
function moveFrame() { }
function devO() { }
function dalert(a) { }
function ddump(a) { }

/* Application view model */
class DprViewModel {
  constructor() {
    this.loadingFeatureVisible = ko.observable(true)
    this.landingFeatureVisible = ko.observable(false);
    this.navigationFeatureVisible = ko.observable(false);
  }

  showLandingFeature() {
    this.loadingFeatureVisible(false);
    this.landingFeatureVisible(true);
    this.navigationFeatureVisible(false);
  }

  showNavigationFeature() {
    this.loadingFeatureVisible(false);
    this.landingFeatureVisible(false);
    this.navigationFeatureVisible(true);
  }
}

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
  initMainPane();
  initFooter();
  initFeedbackFormParameters();
  loadSidebarTabs();
  initFeatureTabs();
  ensureHidePopoversWithClickTriggers();

  if (DPR_PAL.isLandingPageFeature()) {
    __dprViewModel.showLandingFeature();
    return;
  }

  if (DPR_PAL.isNavigationFeature()) {
    __dprViewModel.showNavigationFeature();
    initializeNavigationFeature();
  } else if (DPR_PAL.isSearchFeature()) {
    __dprViewModel.showNavigationFeature();
    $("#mafbc").load("search-results.html", initializeSearchFeature);
  } else if (DPR_PAL.isDictionaryFeature()) {
    __dprViewModel.showNavigationFeature();
    $("#mafbc").load("dictionary-results.html", initializeDictionaryFeature);
  }

  checkAnalysis();
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
  $("#navigationTabPane").load("navigation.html", initializeNavigationSidebarTab);
  $("#searchTabPane").load("search.html", initializeSearchSidebarTab);
  $("#dictionaryTabPane").load("dictionary.html", initializeDictionarySidebarTab);
}

const initFeatureTabs = () => {
  $("#navigationTabPane").show();
  $("#searchTabPane").hide();
  $("#dictionaryTabPane").hide();

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

/* Start: Navigation stuff */

const initializeNavigationFeature = () => {
  const urlParams = window.location.search.substring(1, window.location.search.length).split('&');
  let bookList = 'd';
  let place = [];
  let query = '';
  let para = '';
  urlParams.forEach(parameter => {
    parameterSections = parameter.split('=');
    switch (parameterSections[0]) {
      case 'loc':
        place = makeLocPlace(parameterSections[1]);
        if (place.length == 8) {
          bookList = place[0];
        }
        break;
      case 'para':
        para = parameterSections[1];
        break;
      case 'query':
        query = parameterSections[1];
        break;
    }
  });

  switch(place.length){
    case 3:
      loadXMLindex(place,false);
      break;
    case 8:
      loadXMLSection(query, para, place);
      break;
    default:
      break;
  }
}

const initializeNavigationSidebarTab = () => {
  let bookList = 'd';
  var navset = $("#nav-set");
  for (var i in G_nikFullNames) {
    navset.append($("<option />").val(i).text(G_nikFullNames[i]));
  }
  navset.val(bookList);
  digitalpalireader.setBookList(bookList);
  digitalpalireader.changeSet();
  navset.change(function () {
    digitalpalireader.changeSet();
  });
  $("#nav-book").change(function () {
    digitalpalireader.updateSubnav(0);
  });

  $('#nav-title').prop('title', 'View index for this book');

  DPR_PAL.enablePopover('#quicklinks-info', 'hover', 'right');

  DPR_PAL.enablePopover('#navigate-book-hierarchy-info', 'hover', 'right');
}

/* End: Navigation stuff */

/* Start: Search stuff */

var searchType = 0;
var searchString = '';
var searchMAT = '';
var searchSet = '';
var searchBook = 0;
var searchPart = 0;
var searchRX = false;

const setSearchParams = () => {
  DPRNav.setSearchBookList();
  DPROpts.tipitakaOptions();
  const urlParams = window.location.search.substring(1, window.location.search.length).split('&');
  urlParams.forEach(parameter => {
    parameterSections = parameter.split('=');
    switch (parameterSections[0]) {
      case 'type':
        searchType = parseInt(parameterSections[1], 10);
        break;
      case 'query':
        searchString = decodeURIComponent(parameterSections[1]);
        break;
      case 'MAT':
        searchMAT = parameterSections[1];
        break;
      case 'set':
        searchSet = parameterSections[1];
        break;
      case 'book':
        searchBook = parameterSections[1];
        break;
      case 'part':
        searchPart = parameterSections[1];
        break;
      case 'rx':
        searchRX = parameterSections[1];
        break;
    }
  });
}

searchHandler = event => {
  DPRSend.sendSearch(DPRSend.eventSend(event));
  setSearchParams();
}

const initializeSearchSidebarTab = () => {
  setSearchParams();

  DPR_PAL.enablePopover('#isearchInfo', 'click', 'bottom');
}

const initializeSearchFeature = () => {
  getconfig();
  searchTipitaka(searchType,searchString,searchMAT,searchSet,searchBook,searchPart,searchRX);
}

/* End: Search stuff */

/* Begin: Dictionary stuff */

const initializeDictionarySidebarTab = () => {
  DPROpts.dictOptions();
  DPR_PAL.enablePopover('#dictinInfo', 'click', 'bottom');
}

const initializeDictionaryFeature = () => {
  getconfig();
  try {
    startDictLookup();
  } catch(ex) {
    console.log('Unexpected exception. Is a bug. Find and fix.', ex);
  }
}

/* End: Dictionary stuff */
