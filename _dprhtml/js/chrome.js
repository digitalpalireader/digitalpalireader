'use strict';

function openFirstDPRTab() {
  if(!findDPRTab('DPR-main')) openDPRMain('DPR-main',DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul'),'');
}

function openDPRTab(permalink, id, reuse) {
  permalink = DPR_PAL.toWebUrl(permalink);

  if(reuse) { // reuse old tab
    var oldTab = findDPRTab(id);

    if (!oldTab) {
      openDPRTab(permalink,id);
      return true;
    }
    DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
    DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab).contentDocument.location.href = permalink;
  }
  else {
    // get last DPR tab

    var start = 0;  // no DPR tabs yet
    var newIdx = 0;

    for (var index = 0, tabbrowser = DPR_PAL.mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length; index++) {

      // Get the next tab
      var currentTab = tabbrowser.tabContainer.childNodes[index];
      var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;
      if (!/^DPR/.exec(currentTab.getAttribute('id')) || !DPR_PAL.dprUrlMatcher.exec(ctloc)) { // not a dpr tab
        if (start == 1) { // prev was a DPR tab
          newIdx = index;
          break;
        }
      }
      else {
        start = 1; // got a DPR tab
        newIdx = index+1;
      }
    }
    var newTab = DPR_PAL.mainWindow.gBrowser.addTab(permalink);
    if(id) newTab.setAttribute('id', id);
    DPR_PAL.mainWindow.gBrowser.moveTabTo(newTab, newIdx)
    DPR_PAL.mainWindow.gBrowser.selectedTab = newTab;
  }

}


function findDPRTab(id,loc) {
  for (var found = false, index = 0, tabbrowser = DPR_PAL.mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length && !found; index++) {

    // Get the next tab
    var currentTab = tabbrowser.tabContainer.childNodes[index];
    var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;

    // Does this tab contain our custom attribute?
    if (currentTab.getAttribute('id') == id && DPR_PAL.dprUrlMatcher.exec(ctloc)) {

      return currentTab;
    }
  }
  return false;
}

function findDPRTabs(id,loc) {
  var tabs = [];
  for (var found = false, index = 0, tabbrowser = DPR_PAL.mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length && !found; index++) {

    // Get the next tab
    var currentTab = tabbrowser.tabContainer.childNodes[index];
    var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;

    // Does this tab contain our custom attribute?
    if (currentTab.getAttribute('id') == id && DPR_PAL.dprUrlMatcher.exec(ctloc)) {

      tabs.push(currentTab);
    }
  }
  return tabs;
}

function findDPRTabByLoc(loc) {
  loc = new RegExp(loc);
  for (var found = false, index = 0, tabbrowser = DPR_PAL.mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length && !found; index++) {

    // Get the next tab
    var currentTab = tabbrowser.tabContainer.childNodes[index];
    var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;

    // Does this tab contain our custom attribute?
    if (DPR_PAL.dprUrlMatcher.exec(ctloc) && loc.exec(ctloc)) {

      return currentTab;
    }
  }
  return false;
}

function updatePrefs() {
  if (!DPR_PAL.isXUL) {
    return;
  }

  DPR_config_mod.getconfig();
  changeSet(1);
  for (var index = 0, tabbrowser = DPR_PAL.mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length; index++) {
    // Get the next tab
    var currentTab = tabbrowser.tabContainer.childNodes[index];
    var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;
    if (/^DPR/.exec(currentTab.getAttribute('id')) && DPR_PAL.dprUrlMatcher.exec(ctloc)) { // a dpr tab
      currentTab.linkedBrowser.contentWindow.DPR_config_mod.getconfig();
    }
  }
}

function isDPRTab(id) {
  if(DPR_PAL.mainWindow.gBrowser.selectedTab.id == id) return DPR_PAL.mainWindow.gBrowser.selectedTab;
  else return false;
}

function giveIDtoTabs() { // startup function, give ids to
  if (!DPR_PAL.isXUL) {
    return false;
  }

  var main = 0; //no main dpr tabs
  var dict = 0; // no dict tabs
  var search = 0; // no dict tabs
  var etc = 0;
  for (var index = 0, tb = DPR_PAL.mainWindow.gBrowser; index < tb.tabContainer.childNodes.length; index++) {

    // Get the next tab
    var currentTab = tb.tabContainer.childNodes[index];
    var ctloc = tb.getBrowserForTab(currentTab).contentDocument.location.href;
    if (DPR_PAL.dprUrlMatcher.exec(ctloc)) { // a dpr tab
      tb.setIcon(currentTab, "chrome://digitalpalireader/skin/icons/logo.png");
      if(/index\.xul/.exec(ctloc)) currentTab.setAttribute('id',(main++==0?'DPR-main':'DPRm'));
      else if(/dict\.htm/.exec(ctloc)) currentTab.setAttribute('id',(dict++==0?'DPR-dict':'DPRd'));
      else if(/search\.xul/.exec(ctloc)) currentTab.setAttribute('id',(search++==0?'DPR-search':'DPRs'));
      else currentTab.setAttribute('id',(etc++==0?'DPR-x':'DPRx'));
    }
  }
  if(main > 0) return true;
  return false;
}

function checkLastTab() {
  if (!DPR_PAL.isXUL) {
    return false;
  }

  for (var index = 0, tabbrowser = DPR_PAL.mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length; index++) {
    // Get the next tab
    var currentTab = tabbrowser.tabContainer.childNodes[index];
    var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentWindow.location.href;
    if (/^DPR/.exec(currentTab.getAttribute('id')) && DPR_PAL.dprUrlMatcher.exec(ctloc)) { // a dpr tab
      return false; // still one open tab
    }
  }
  //closeDPRSidebar();
  return false;
}

function DPRSidebarWindow() {
  if (!DPR_PAL.isXUL) {
    return {DPRNav};
  }

  var sidebar = DPR_PAL.mainWindow.document.getElementById("sidebar");

  if (sidebar.contentDocument.location.href == DPR_PAL.toWebUrl("chrome://digitalpalireader/content/digitalpalireader.xul")) {
    return sidebar.contentWindow;
  }
  else return false
}

function DPRSidebarDocument() {
  if (!DPR_PAL.isXUL) {
    return false;
  }

  var sidebar = DPR_PAL.mainWindow.document.getElementById("sidebar").contentDocument;

  if (sidebar.location.href == DPR_PAL.toWebUrl("chrome://digitalpalireader/content/digitalpalireader.xul")) {
    return sidebar;
  }
  else return false
}

function closeDPRSidebar() {
  if (DPR_PAL.isWeb) {
    __dprViewModel.sidebarVisible(false);
  } else {
    var sidebarWindow = DPR_PAL.mainWindow.document.getElementById("sidebar").contentDocument;

    if (sidebarWindow.location.href == "chrome://digitalpalireader/content/digitalpalireader.xul") {
      return DPR_PAL.mainWindow.toggleSidebar();
    }
  }
}

function openDPRSidebar() {
  if (DPR_PAL.isWeb) {
    __dprViewModel.sidebarVisible(true);
  } else {
    var sidebarWindow = DPR_PAL.mainWindow.document.getElementById("sidebar").contentDocument;
    if (sidebarWindow.location.href != "chrome://digitalpalireader/content/digitalpalireader.xul") {
      return DPR_PAL.mainWindow.toggleSidebar('viewDPR');
    }
  }
}

function toggleDPRSidebar() {
  __dprViewModel.sidebarVisible(!__dprViewModel.sidebarVisible());
}

function setCurrentTitle(title) {
  if (DPR_PAL.isWeb) {
    document.title = title;
  } else {
    DPR_PAL.mainWindow.gBrowser.selectedTab.setAttribute('label',title);
  }
}

function closeBrowser(id) {
  if (!DPR_PAL.isXUL) {
    return;
  }

  var thisTab = DPR_PAL.mainWindow.gBrowser.selectedTab;
  var thisDocument = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab).contentDocument;
  thisDocument.getElementById(id).parentNode.removeChild(thisDocument.getElementById(id+'-splitter'));
  thisDocument.getElementById(id).parentNode.removeChild(thisDocument.getElementById(id));
}

function DPRBottomPaneUpdateStyle() {
  if (!DPR_PAL.isXUL) {
    return;
  }

  document.getElementById('bottom').style.top = (document.getElementById('anf').offsetHeight - 4) + 'px';
}

function DPRShowBottomPane(tabIdToActivate = 'D') {
  __bottomPaneTabsViewModel.updateActiveTabId(tabIdToActivate);
  openBottomFrame();
}

const initializeMainPaneOutput = () => {
  $('#mafbc').html('');
}

const writeNavigationHeader = (tabT) => {
  $('#main-pane-container-section-0-header').html(tabT);
}

const writeNavigationHeaderForSection = (titleout0, modt, range, place8) => {
  $('#main-pane-container-section-0-header').html(modt + '&nbsp' + titleout0 + (range ? ' <span class="tiny">para. ' + range.join('-')+'</span>' : '') + (place8 ? '<span class="tiny">(Thai)</span>' : '') + `</nav>`);
}

const scrollMainPane = (scrollTop) => {
  $('#main-pane-container-section-0').scrollTop(scrollTop);
}

const openBottomFrame = () => {
  // NOTE: #main-bottom-pane takes up the remaining space.
  if ($("#main-pane").height() / $("#main-pane").parent().height() > 0.85){
    $("#main-pane").height("75%");
  }

  updateBottomFrameDimensions();
}

const updateBottomFrameDimensions = () => {
  // NOTE: This is a hack to get the scroll bar to show in the bottom pane D tab.
  const h = $("#main-bottom-pane-root").height();
  $("#main-bottom-pane-tabs").height(h);
  $("#main-bottom-pane-tab-panes").height(h);
}

const closeBottomFrame = () => {
  // NOTE: #main-bottom-pane takes up the remaining space.
  $("#main-pane").height("100%");
}

var DPR_Chrome = (function () {
  let sectionElements = {}
  function createSectionElementsCache() {
    sectionElements = {}

    sectionElements.splitters = []
    $('.main-pane-container-splitter').each(function () {
      sectionElements.splitters.push($(this))
    })

    sectionElements.sections = []
    $('.main-pane-container-section').each(function () {
      sectionElements.sections.push($(this))
    })

    return sectionElements
  }

  const reattachSplitters = () => {
    for (let i = 0; i < sectionElements.sections.length - 1; i++) {
      sectionElements.sections[i].resizable('destroy')
      sectionElements.sections[i].resizable({
        handleSelector: `#${sectionElements.splitters[i].attr('id')}`,
        resizeHeight: false,
        onDrag: splitterDragHandler(i),
      });
    }
  }

  const fixupUrlAndMainPanelSectionsLayout = () => {
    createSectionElementsCache()

    reattachSplitters()

    const availableWidth = $('#main-pane-container').width()
    const totalSplitterWidth = sectionElements.splitters.reduce((acc, e) => acc + e.width(), 0)
    sectionElements.sections.forEach(x => x.width((availableWidth - totalSplitterWidth) / sectionElements.sections.length));

    const uris = sectionElements.sections.map(x => x.attr('data-dpruri')).filter(x => x);
    const locMutator = loc => {
      const [first, ..._] = loc.split('|');
      return `${[first, ...uris].join('|')}`;
    };

    const oldUrl = DPR_PAL.contentDocument.location.href;
    const newUrl = DPR_PAL.modifyUrlPart(oldUrl, 'loc', locMutator);
    if (oldUrl !== newUrl) {
      DPR_PAL.contentWindow.history.pushState({}, 'Title', newUrl);
    } else {
      // URLs are same. Not updating!
    }
  }

  const splitterDragHandler = sPos => (_, element, newWidth, __, ___) => {
    const delta = newWidth - element.width()
    const newCurrentSectionWidth = newWidth
    const newNextSectionWidth = sectionElements.sections[sPos + 1].width() - delta

    if (newCurrentSectionWidth >= 0 && newNextSectionWidth >= 0) {
      sectionElements.sections[sPos].width(newCurrentSectionWidth)
      sectionElements.sections[sPos + 1].width(newNextSectionWidth)
    }

    return false
  }

  const addMainPanelSection = (sInfo, fixupUrlAndLayout = true) => {
    if (sInfo.type === 'dpr') {
      return;
    }

    let sPos = $('#main-pane-container').attr('data-nextspos');
    sPos = parseInt(sPos ? sPos : '1');

    const html = `
  <div class="main-pane-container-splitter" id="main-pane-container-splitter-${sPos}"></div>
  <div class="main-pane-container-section" id="main-pane-container-section-${sPos}" data-dpruri="${DPR_Translations.makeUri(sInfo)}" style="background: ${DPR_Translations.trProps[sInfo.type].background}">
    <button class="btn btn-light main-pane-container-section-close" id="main-pane-container-section-close-${sPos}" title="Close panel section" onclick="DPR_Chrome.closeContainerSection(${sPos})">
      <i class="fa fa-times" aria-hidden="true"></i>
    </button>
    <iframe class="main-pane-container-section-iframe" id="main-pane-container-section-iframe-${sPos}" src="${DPR_Translations.resolveUri(sInfo)}">
    </iframe>
  </div>`;

    $('#main-pane-container').append(`${html}`);
    $('#main-pane-container').attr('data-nextspos', sPos + 1);

    if (fixupUrlAndLayout) {
      fixupUrlAndMainPanelSectionsLayout();
    }
  }

  const addMainPanelSections = places => {
    places.forEach(p => addMainPanelSection(p, false));
    fixupUrlAndMainPanelSectionsLayout();
  }

  const closeContainerSection = position => {
    $(`#main-pane-container-section-${position}`).resizable('destroy')
    $(`#main-pane-container-splitter-${position}`).remove()
    $(`#main-pane-container-section-${position}`).remove()
    fixupUrlAndMainPanelSectionsLayout()
  }

  const ToastTypeError = 'Error';
  const ToastTypeWarning = 'Warning';
  const ToastTypeSuccess = 'Success';
  const ToastTypeInfo = 'Information';
  const createToast = (type, message, delay, uniqueId, {toastCommandName, toastCommandHandler, toastCommandLink}) => {
    const containerId = "#main-container-toast-container";
    if ($(containerId).find(`#${uniqueId}`).length) {
      console.log('Notification with id:', uniqueId, 'already exists. Not creating another.');
      // NOTE: Singleton notifications.
      return;
    }

    let typeClasses = '';
    let style = ''
    if (type === ToastTypeError) {
      typeClasses = 'bg-danger text-light';
    } else if (type === ToastTypeWarning) {
      typeClasses = 'bg-warning text-dark';
    } else if (type === ToastTypeSuccess) {
      typeClasses = 'bg-success text-light';
    } else if (type === ToastTypeInfo) {
      style = 'color: #004085; background-color: #cce5ff;';
    } else {
      console.error('Unknown type', type);
    }

    const toastHtml = $.parseHTML(`
      <div id="${uniqueId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="${delay}">
        <div class="toast-body d-flex flex-row align-items-center ${typeClasses}" style="${style}">
          <div class="${typeClasses} mr-auto">
            ${message}
            <a id="toastCommandLink" type="button" class="btn btn-sm ${typeClasses} m-0 text-uppercase font-weight-bold text-nowrap"
              style="display: none" href="${toastCommandLink}" target="_blank" rel="noreferrer">More details</a>
          </div>
          <div id="toastCommandContainer" class="${typeClasses} mr-1" style="display: none">
            <button id="toastCommand" type="button" class="btn btn-sm ${typeClasses} m-0 text-uppercase font-weight-bold" data-dismiss="toast">${toastCommandName}</button>
          </div>
          <div class="${typeClasses}">
            <button type="button" class="btn btn-sm ${typeClasses} m-0" data-dismiss="toast"><i class="fa fa-times"></i></button>
          </div>
        </div>
      </div>
    `);

    const toastElement = $(toastHtml);
    if (toastCommandHandler) {
      toastElement.find('#toastCommandContainer').show();
      toastElement.find('#toastCommand').click(toastCommandHandler);
    }

    if (toastCommandLink) {
      toastElement.find('#toastCommandLink').show();
    }

    $(containerId).append(toastElement);

    $(".toast").toast("show");

    $(".toast").on("hidden.bs.toast", e => $(e.currentTarget).remove());
  }

  const toastVisibleForMilliseconds = 4000;
  const showErrorToast = (message) => createToast(ToastTypeError, message, toastVisibleForMilliseconds, null, {});
  const showWarningToast = (message) => createToast(ToastTypeWarning, message, toastVisibleForMilliseconds, null, {});
  const showSuccessToast = (message) => createToast(ToastTypeSuccess, message, toastVisibleForMilliseconds, null, {});
  const showSingletonInformationToast =
    (message, uniqueId, toastVisibleForSeconds, toastCommandInfo) => createToast(ToastTypeInfo, message, toastVisibleForSeconds * 1000, uniqueId, toastCommandInfo);

  return {
    toggleDPRSidebar: toggleDPRSidebar,
    openDPRSidebar: openDPRSidebar,
    closeDPRSidebar: openDPRSidebar,
    addMainPanelSection: addMainPanelSection,
    addMainPanelSections: addMainPanelSections,
    closeContainerSection: closeContainerSection,
    showErrorToast: showErrorToast,
    showWarningToast: showWarningToast,
    showSuccessToast: showSuccessToast,
    showSingletonInformationToast: showSingletonInformationToast,
    ToastTypeInfo: ToastTypeInfo,
  };
})();
