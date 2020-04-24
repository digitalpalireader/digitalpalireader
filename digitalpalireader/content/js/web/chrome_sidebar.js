'use strict';

if (DPR_PAL.isWeb) {
  console.log('Loading DPR_PAL_Chrome_Sidebar...');
} else {
  console.log('Cannot DPR_PAL_Chrome_Sidebar for the wrong platform', DPR_PAL);
}

var DPRChrome = {
  giveIDtoTabs: function () { // startup function, give ids to

    var main = 0; //no main dpr tabs
    var dict = 0; // no dict tabs
    var search = 0; // no dict tabs
    var etc = 0;
    for (var index = 0, tb = DPR_PAL.mainWindow.gBrowser; index < tb.tabContainer.childNodes.length; index++) {

      // Get the next tab
      var currentTab = tb.tabContainer.childNodes[index];
      var ctloc = tb.getBrowserForTab(currentTab).contentDocument.location.href;
      if (/chrome:\/\/digitalpalireader\/content\//.test(ctloc)) { // a dpr tab
        tb.setIcon(currentTab, "chrome://digitalpalireader/skin/icons/logo.png");
        if (/^DPR/.test(currentTab.id)) continue;
        if (/index\.xul/.test(ctloc)) currentTab.setAttribute('id', (main++ == 0 ? 'DPR-main' : 'DPRm'));
        else if (/dict\.htm/.test(ctloc)) currentTab.setAttribute('id', (dict++ == 0 ? 'DPR-dict' : 'DPRd'));
        else if (/search\.xul/.test(ctloc)) currentTab.setAttribute('id', (search++ == 0 ? 'DPR-search' : 'DPRs'));
        else currentTab.setAttribute('id', (etc++ == 0 ? 'DPR-x' : 'DPRx'));
      }
    }
    if (main > 0) return true;
    return false;
  },
  openDPRTab:function(permalink,id,reuse) {
    permalink = DPR_PAL.convertXulUrl(permalink);

    if(reuse) { // reuse old tab
      var oldTab = this.findDPRTab(id);

      if (!oldTab) {
        DPRChrome.openDPRTab(permalink,id);
        return true;
      }
    }

    // get last DPR tab

    var start = 0;  // no DPR tabs yet
    var newIdx = 0;

    for (var index = 0, tabbrowser = DPR_PAL.mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length; index++) {

      // Get the next tab
      var currentTab = tabbrowser.tabContainer.childNodes[index];
      var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;
      if (!/^DPR/.test(currentTab.getAttribute('id')) || !DPR_PAL.dprUrlMatcher.test(ctloc)) { // not a dpr tab
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

  },
  openFirstDPRTab: function () {
    if (!this.findDPRTab()) this.openDPRTab('chrome://digitalpalireader/content/index.xul', 'DPR-main');
  },

  findDPRTab: function (id) {
    for (var found = false, index = 0, tabbrowser = DPR_PAL.mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length && !found; index++) {

      // Get the next tab
      var currentTab = tabbrowser.tabContainer.childNodes[index];
      var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;
      if (currentTab.getAttribute('id') == id && DPR_PAL.dprUrlMatcher.test(ctloc) && (!DPR_PAL.DPR_tabs[id] || DPR_PAL.DPR_tabs[id].test(ctloc))) {

        return currentTab;
      }
    }
    return false;
  },
  isThisDPRTab: function (id) {
    var currentTab = DPR_PAL.mainWindow.gBrowser.selectedTab;
    var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;
    if (DPR_PAL.mainWindow.gBrowser.selectedTab.id == id && DPR_PAL.dprUrlMatcher.test(ctloc) && (!DPR_PAL.DPR_tabs[id] || DPR_PAL.DPR_tabs[id].test(ctloc))) return DPR_PAL.mainWindow.gBrowser.selectedTab;
    else return false;
  },
  DPRTab: function (id) {
    for (var found = false, index = 0, tabbrowser = DPR_PAL.mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length && !found; index++) {

      // Get the next tab
      var currentTab = tabbrowser.tabContainer.childNodes[index];
      var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;

      // Does this tab contain our custom attribute?
      if (/chrome:\/\/digitalpalireader\/content\//.test(ctloc)) {

        return currentTab;
      }
    }
    return false;
  },
  promptData: function (title, data) {
    this.G_prompts.alert(null, title, data);
  },
  DPRSidebarDocument: function () {
    var sidebar = DPR_PAL.mainWindow.document.getElementById("sidebar").contentDocument;

    if (sidebar.location.href == "chrome://digitalpalireader/content/digitalpalireader.xul") {
      return sidebar;
    }
    else return false
  },
  openSidebar: function () {
    toggleSidebar('viewDPR');
  },
}

