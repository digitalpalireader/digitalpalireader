'use strict';

function openFirstDPRTab() {
  if (!DPR_PAL.isXUL) {
    return;
  }

  if(!findDPRTab('DPR-main')) openDPRMain('DPR-main','chrome://digitalpalireader/content/index.xul','');
}

function openDPRTab(permalink, id, reuse) {
  if (DPR_PAL.isWeb) {
    if (reuse) {
      window.location.href = permalink;
    } else {
      window.open(permalink, '_blank');
    }
    return false;
  }

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
      if (!/^DPR/.exec(currentTab.getAttribute('id')) || !/chrome:\/\/digitalpalireader\/content\//.exec(ctloc)) { // not a dpr tab
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
  if (!DPR_PAL.isXUL) {
    return false;
  }

  for (var found = false, index = 0, tabbrowser = DPR_PAL.mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length && !found; index++) {

    // Get the next tab
    var currentTab = tabbrowser.tabContainer.childNodes[index];
    var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;

    // Does this tab contain our custom attribute?
    if (currentTab.getAttribute('id') == id && /chrome:\/\/digitalpalireader\/content\//.exec(ctloc)) {

      return currentTab;
    }
  }
  return false;
}

function findDPRTabs(id,loc) {
  if (!DPR_PAL.isXUL) {
    return [];
  }

  var tabs = [];
  for (var found = false, index = 0, tabbrowser = DPR_PAL.mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length && !found; index++) {

    // Get the next tab
    var currentTab = tabbrowser.tabContainer.childNodes[index];
    var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;

    // Does this tab contain our custom attribute?
    if (currentTab.getAttribute('id') == id && /chrome:\/\/digitalpalireader\/content\//.exec(ctloc)) {

      tabs.push(currentTab);
    }
  }
  return tabs;
}

function findDPRTabByLoc(loc) {
  if (!DPR_PAL.isXUL) {
    return false;
  }

  loc = new RegExp(loc);
  for (var found = false, index = 0, tabbrowser = DPR_PAL.mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length && !found; index++) {

    // Get the next tab
    var currentTab = tabbrowser.tabContainer.childNodes[index];
    var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;

    // Does this tab contain our custom attribute?
    if (/chrome:\/\/digitalpalireader\/content\//.exec(ctloc) && loc.exec(ctloc)) {

      return currentTab;
    }
  }
  return false;
}

function updatePrefs() {
  if (!DPR_PAL.isXUL) {
    return;
  }

  getconfig();
  changeSet(1);
  for (var index = 0, tabbrowser = DPR_PAL.mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length; index++) {
    // Get the next tab
    var currentTab = tabbrowser.tabContainer.childNodes[index];
    var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;
    if (/^DPR/.exec(currentTab.getAttribute('id')) && /chrome:\/\/digitalpalireader\/content\//.exec(ctloc)) { // a dpr tab
      currentTab.linkedBrowser.contentWindow.getconfig();
    }
  }
}

function isDPRTab(id) {
  if (!DPR_PAL.isXUL) {
    return false;
  }

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
    if (/chrome:\/\/digitalpalireader\/content\//.exec(ctloc)) { // a dpr tab
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
    if (/^DPR/.exec(currentTab.getAttribute('id')) && /chrome:\/\/digitalpalireader\/content\//.exec(ctloc)) { // a dpr tab
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

  if (sidebar.contentDocument.location.href == "chrome://digitalpalireader/content/digitalpalireader.xul") {
    return sidebar.contentWindow;
  }
  else return false
}

function DPRSidebarDocument() {
  if (!DPR_PAL.isXUL) {
    return false;
  }

  var sidebar = DPR_PAL.mainWindow.document.getElementById("sidebar").contentDocument;

  if (sidebar.location.href == "chrome://digitalpalireader/content/digitalpalireader.xul") {
    return sidebar;
  }
  else return false
}

function closeDPRSidebar() {
  if (!DPR_PAL.isXUL) {
    return;
  }

  var sidebarWindow = DPR_PAL.mainWindow.document.getElementById("sidebar").contentDocument;

  if (sidebarWindow.location.href == "chrome://digitalpalireader/content/digitalpalireader.xul") {
    return DPR_PAL.mainWindow.toggleSidebar();
  }
}
function openDPRSidebar() {
  if (!DPR_PAL.isXUL) {
    return;
  }

  var sidebarWindow = DPR_PAL.mainWindow.document.getElementById("sidebar").contentDocument;
  if (sidebarWindow.location.href != "chrome://digitalpalireader/content/digitalpalireader.xul") {
    return DPR_PAL.mainWindow.toggleSidebar('viewDPR');
  }
}

function setCurrentTitle(title) {
    if (DPR_PAL.isXUL) {
    DPR_PAL.mainWindow.gBrowser.selectedTab.setAttribute('label',title);
    } else {
    document.title = title;
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
  $('#main-content-header-contents').html(tabT);
}

const writeNavigationHeaderForSection = (titleout0, modt, range, place8) => {
  $('#main-content-header-contents').html(modt + '&nbsp' + titleout0 + (range ? ' <span class="tiny">para. ' + range.join('-')+'</span>' : '') + (place8 ? '<span class="tiny">(Thai)</span>' : '') + `</nav>`);
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
  const toggleNewSidebarVisibility = () => {
    if ($('#main-sidebar').is(":visible")) {
      closeNewSidebar();
    } else {
      openNewSidebar();
    }
  }

  const closeNewSidebar = () => {
    $("#main-sidebar").hide();
    $("#main-panel-splitter").hide();
  }

  const openNewSidebar = () => {
    $("#main-sidebar").show();
    $("#main-panel-splitter").show();
  }

  const fixupUrlAndMainPanelSectionsLayout = () => {
    const availableWidth = $('#main-pane-container').width();
    const totalSplitterWidth = $('.main-pane-container-splitter')
      .toArray()
      .reduce((acc, e) => acc + $(e).width(), 0);
    const sections = $('.main-pane-container-section').toArray();
    sections.forEach(x => $(x).width((availableWidth - totalSplitterWidth) / sections.length));

    const uris = $('.main-pane-container-section').toArray().map(x => $(x).attr('data-dpruri')).filter(x => x);
    const locMutator = loc => {
      const [first, ..._] = loc.split('|');
      return `${[first, ...uris].join('|')}`;
    };

    const oldUrl = DPR_PAL.contentDocument.location.href;
    const newUrl = DPR_PAL.modifyUrlPart(oldUrl, 'loc', locMutator);
    if (oldUrl !== newUrl) {
      console.log('URLs are not same. Updating...');
      DPR_PAL.contentWindow.history.pushState({}, 'Title', newUrl);
    } else {
      console.log('URLs are same. Not updating!');
    }
  }

  const addMainPanelSection = (sInfo, fixupUrlAndLayout = true) => {
    if (sInfo.type === 'dpr') {
      return;
    }

    const sPos = parseInt($('#main-pane-container').attr('data-nextspos') ?? '1');

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

    $(`#main-pane-container-section-${sPos - 1}`).resizable({
      handleSelector: `#main-pane-container-splitter-${sPos}`,
      resizeHeight: false,
    });

    if (fixupUrlAndLayout) {
      fixupUrlAndMainPanelSectionsLayout();
    }
  }

  const addMainPanelSections = places => {
    places.forEach(p => addMainPanelSection(p, false));
    fixupUrlAndMainPanelSectionsLayout();
  }

  const closeContainerSection = position => {
    $(`#main-pane-container-splitter-${position}`).remove();
    $(`#main-pane-container-section-${position}`).remove();
    fixupUrlAndMainPanelSectionsLayout();
  }

  return {
    toggleNewSidebarVisibility: toggleNewSidebarVisibility,
    openNewSidebar: openNewSidebar,
    addMainPanelSection: addMainPanelSection,
    addMainPanelSections: addMainPanelSections,
    closeContainerSection: closeContainerSection,
  };
})();
