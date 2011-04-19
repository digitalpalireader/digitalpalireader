
var DPRChrome = {
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
		var newTab = mainWindow.gBrowser.addTab(permalink);
		if(id) newTab.setAttribute('id', id);
		mainWindow.gBrowser.moveTabTo(newTab, newIdx)
		mainWindow.gBrowser.selectedTab = newTab;

	},
	openFirstDPRTab:function() {
		if(!this.findDPRTab('DPR-main')) this.openDPRTab('chrome://digitalpalireader/content/index.xul','DPR-main');
	},

	findDPRTab:function(id) {
		for (var found = false, index = 0, tabbrowser = mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length && !found; index++) {

			// Get the next tab
			var currentTab = tabbrowser.tabContainer.childNodes[index];
			var ctloc = mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;

			// Does this tab contain our custom attribute?
			if (currentTab.getAttribute('id') == id && /chrome:\/\/digitalpalireader\/content\//.exec(ctloc)) {

				return currentTab;
			}
		}
		return false;
	},
	isThisDPRTab:function(id) {
		if(mainWindow.gBrowser.selectedTab.id == id) return mainWindow.gBrowser.selectedTab;
		else return false;
	},
	DPRTab:function(id) {
		for (var found = false, index = 0, tabbrowser = mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length && !found; index++) {

			// Get the next tab
			var currentTab = tabbrowser.tabContainer.childNodes[index];
			var ctloc = mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;

			// Does this tab contain our custom attribute?
			if (currentTab.getAttribute('id') == id && /chrome:\/\/digitalpalireader\/content\//.exec(ctloc)) {

				return currentTab;
			}
		}
		return false;
	},
}

mainWindow.gBrowser.addEventListener("load", digitalpalireader.onPageLoad, true);
mainWindow.gBrowser.tabContainer.addEventListener("TabClose", digitalpalireader.onPageUnload, true);



