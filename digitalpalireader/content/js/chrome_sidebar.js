var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
			   .getInterface(Components.interfaces.nsIWebNavigation)
			   .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
			   .rootTreeItem
			   .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
			   .getInterface(Components.interfaces.nsIDOMWindow); 

var DPRChrome = {
	giveIDtoTabs:function() { // startup function, give ids to 
		
		var main = 0; //no main dpr tabs
		var dict = 0; // no dict tabs
		var search = 0; // no dict tabs
		var etc = 0;
		for (index = 0, tb = mainWindow.gBrowser; index < tb.tabContainer.childNodes.length; index++) {

			// Get the next tab
			var currentTab = tb.tabContainer.childNodes[index];
			var ctloc = tb.getBrowserForTab(currentTab).contentDocument.location.href;
			if (/chrome:\/\/digitalpalireader\/content\//.test(ctloc)) { // a dpr tab
				tb.setIcon(currentTab, "chrome://digitalpalireader/skin/icons/logo.png");
				if(/^DPR/.test(currentTab.id)) continue;
				if(/index\.xul/.test(ctloc)) currentTab.setAttribute('id',(main++==0?'DPR-main':'DPRm'));
				else if(/dict\.htm/.test(ctloc)) currentTab.setAttribute('id',(dict++==0?'DPR-dict':'DPRd'));
				else if(/search\.xul/.test(ctloc)) currentTab.setAttribute('id',(search++==0?'DPR-search':'DPRs'));
				else currentTab.setAttribute('id',(etc++==0?'DPR-x':'DPRx'));
			}
		}	
		if(main > 0) return true;
		return false;	
	},
	openDPRTab:function(permalink,id,reuse) {


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
		
		for (index = 0, tabbrowser = mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length; index++) {

			// Get the next tab
			var currentTab = tabbrowser.tabContainer.childNodes[index];
			var ctloc = mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;
			if (!/^DPR/.test(currentTab.getAttribute('id')) || !/chrome:\/\/digitalpalireader\/content\//.test(ctloc)) { // not a dpr tab
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
		var newTab = mainWindow.gBrowser.addTab(permalink);
		if(id) newTab.setAttribute('id', id);
		mainWindow.gBrowser.moveTabTo(newTab, newIdx)
		mainWindow.gBrowser.selectedTab = newTab;

	},
	openFirstDPRTab:function() {
		if(!this.findDPRTab()) this.openDPRTab('chrome://digitalpalireader/content/index.xul','DPR-main');
	},

	findDPRTab:function(id) {
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
	isThisDPRTab:function(id) {
		var currentTab = mainWindow.gBrowser.selectedTab;
		var ctloc = mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;
		if(mainWindow.gBrowser.selectedTab.id == id && /chrome:\/\/digitalpalireader\/content\//.test(ctloc) && (!DPR_tabs[id] || DPR_tabs[id].test(ctloc))) return mainWindow.gBrowser.selectedTab;
		else return false;
	},
	DPRTab:function(id) {
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
	G_prompts: Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService),
	promptData:function(title,data) {
		this.G_prompts.alert(null, title, data);
	},
	DPRSidebarDocument: function() {
		var sidebar = mainWindow.document.getElementById("sidebar").contentDocument;

		if (sidebar.location.href == "chrome://digitalpalireader/content/digitalpalireader.xul") {
			return sidebar;
		} 
		else return false
	},
	openSidebar: function() {
		toggleSidebar('viewDPR');
	},
}
var DPR_tabs = [];
DPR_tabs['DPRm'] = /index/;
DPR_tabs['DPR-main'] = /index/;
DPR_tabs['DPRs'] = /search/;
DPR_tabs['DPRd'] = /dict/;

