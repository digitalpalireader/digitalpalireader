/*

TODO
- Bring back start page
- Bring back feedback button
- Bring back context menu
- 2 x navigation Info icons to show popups
- correct tab is not selected in sidebar
- test onpopstatehandler
*/

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
  ensureHidePopoversWithClickTriggers();
  initFeedbackFormParameters();

  if (DPR_PAL.isLandingPageFeature()) {
    __dprViewModel.showLandingFeature();
  } else if (DPR_PAL.isNavigationFeature()) {
    $("#navigationDiv")
      .load("navigation.html", (r, s, x) => {
        __dprViewModel.showNavigationFeature();
        initializeNavigationFeature();
        checkAnalysis();
        initMainPane();
      });
  }

  initPage();
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

const initPage = () => {
  // $("#navigationDiv").show();
  // $("#searchDiv").hide();
  // $("#dictionaryDiv").hide();

  // var location = document.location.href;
  // if (location.indexOf('?') > -1) {
  //   loadSidebarDivs();
  //   if (location.indexOf('?feature=search') > -1) {
  //     $("#mafbc").load("search-results.html");
  //   } else if (location.indexOf('?feature=dictionary') > -1) {
  //     $("#mafbc").load("dictionary-results.html");
  //   }
  //   checkAnalysis();
  // }

  // $(".nav-link").on("click",function(e) {
  //   e.preventDefault();
  //   let tabId = this.id.substring(0, this.id.length - 3);
  //   $(".mainContent").hide();
  //   $("#"+tabId+"Div").show();
  //   $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  //     localStorage.setItem('activeTab', $(e.target).attr('id'));
  //   });
  // });

}

const loadSidebarDivs = () => {
  $("#navigationDiv").load("navigation.html");
  $("#searchDiv").load("search.html");
  $("#dictionaryDiv").load("dictionary.html");
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
  $("#feedbackFormLink").attr("href", `https://docs.google.com/forms/d/e/1FAIpQLSfkpd2GEExiez9q2s87KyGEwIe2Gqh_IWcVAWgyiF3HlFvZpg/viewform?entry.1186851452=${env}&entry.1256879647=${url}&entry.1719542298=${userAgent}`);
}

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
  // update navigation

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

  DPR_PAL.enablePopover('#quicklinks-info', 'hover');

  DPR_PAL.enablePopover('#navigate-book-hierarchy-info', 'hover');

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

