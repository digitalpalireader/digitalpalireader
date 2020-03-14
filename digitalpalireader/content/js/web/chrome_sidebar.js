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
    for (var index = 0, tb = mainWindow.gBrowser; index < tb.tabContainer.childNodes.length; index++) {

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
  openDPRTab: function (permalink, id, reuse) {

      if (window.matchMedia('(display-mode: standalone)').matches && (
        permalink.indexOf('?feature=search') > -1 || permalink.indexOf('?feature=dictionary') > -1)) {
        window.open(permalink, id).focus();
      }
      else {
        window.location.href = permalink;
        window.history.pushState("string", id, permalink);
      }

  },
  openFirstDPRTab: function () {
    if (!this.findDPRTab()) this.openDPRTab('chrome://digitalpalireader/content/index.xul', 'DPR-main');
  },

  findDPRTab: function (id) {
    for (var found = false, index = 0, tabbrowser = mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length && !found; index++) {

      // Get the next tab
      var currentTab = tabbrowser.tabContainer.childNodes[index];
      var ctloc = mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;
      if (currentTab.getAttribute('id') == id && /chrome:\/\/digitalpalireader\/content\//.test(ctloc) && (!DPR_tabs[id] || DPR_tabs[id].test(ctloc))) {

        return currentTab;
      }
    }
    return false;
  },
  isThisDPRTab: function (id) {
    var currentTab = mainWindow.gBrowser.selectedTab;
    var ctloc = mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;
    if (mainWindow.gBrowser.selectedTab.id == id && /chrome:\/\/digitalpalireader\/content\//.test(ctloc) && (!DPR_tabs[id] || DPR_tabs[id].test(ctloc))) return mainWindow.gBrowser.selectedTab;
    else return false;
  },
  DPRTab: function (id) {
    for (var found = false, index = 0, tabbrowser = mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length && !found; index++) {

      // Get the next tab
      var currentTab = tabbrowser.tabContainer.childNodes[index];
      var ctloc = mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;

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
    var sidebar = mainWindow.document.getElementById("sidebar").contentDocument;

    if (sidebar.location.href == "chrome://digitalpalireader/content/digitalpalireader.xul") {
      return sidebar;
    }
    else return false
  },
  openSidebar: function () {
    toggleSidebar('viewDPR');
  },
  historyPopstateHandler: function() {
    var location = document.location.href;
    if (location.indexOf('?feature=search') > -1) {
      $("#mafbc").load("search-results.html");
    } else if (location.indexOf('?feature=dictionary') > -1 &&
      location.indexOf('#') == -1) {
      $("#mafbc").load("dictionary-results.html");
    } else {
      $("#navigationDiv").load("navigation.html");
    }
  }
}

