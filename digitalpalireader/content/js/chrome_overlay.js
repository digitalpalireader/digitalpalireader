var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
			   .getInterface(Components.interfaces.nsIWebNavigation)
			   .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
			   .rootTreeItem
			   .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
			   .getInterface(Components.interfaces.nsIDOMWindow); 

var DPROverlay = {
	giveIDtoTabs:function() { // startup function, give ids to 
		
		var main = 0; //no main dpr tabs
		var dict = 0; // no dict tabs
		var search = 0; // no dict tabs
		var etc = 0;
		for (index = 0, tb = mainWindow.gBrowser; index < tb.tabContainer.childNodes.length; index++) {

			// Get the next tab
			var currentTab = tb.tabContainer.childNodes[index];
			var ctloc = tb.getBrowserForTab(currentTab).contentDocument.location.href;
			if (/chrome:\/\/digitalpalireader\/content\//.exec(ctloc)) { // a dpr tab
				tb.setIcon(currentTab, "chrome://digitalpalireader/skin/icons/logo.png");
				if(/index\.xul/.exec(ctloc)) currentTab.setAttribute('id',(main++==0?'DPR-main':'DPRm'));
				else if(/dict\.htm/.exec(ctloc)) currentTab.setAttribute('id',(dict++==0?'DPR-dict':'DPRd'));
				else if(/search\.htm/.exec(ctloc)) currentTab.setAttribute('id',(search++==0?'DPR-search':'DPRs'));
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
		if(!this.findDPRTab()) this.openDPRTab('chrome://digitalpalireader/content/index.xul','DPR-main');
	},

	findDPRTab:function(id) {
		for (var found = false, index = 0, tabbrowser = mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length && !found; index++) {

			// Get the next tab
			var currentTab = tabbrowser.tabContainer.childNodes[index];
			var ctloc = mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;

			// Does this tab contain our custom attribute?
			if ((id && currentTab.getAttribute('id') == id || !id && /^DPR/.exec(currentTab.getAttribute('id'))) && /chrome:\/\/digitalpalireader\/content\//.exec(ctloc)) {

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
	rightClick:function(input) {
		if(!input || input == '') return;
		input = input.replace(/<[^>]*>/g,'');
		input = input.replace(/\u0101/g, 'aa').replace(/\u012B/g, 'ii').replace(/\u016B/g, 'uu').replace(/\u1E6D/g, '\.t').replace(/\u1E0D/g, '\.d').replace(/\u1E45/g, '\"n').replace(/\u1E47/g, '\.n').replace(/\u1E43/g, '\.m').replace(/\u1E41/g, '\.m').replace(/\u00F1/g, '\~n').replace(/\u1E37/g, '\.l').replace(/\u0100/g, 'AA').replace(/\u012A/g, 'II').replace(/\u016A/g, 'UU').replace(/\u1E6C/g, '\.T').replace(/\u1E0C/g, '\.D').replace(/\u1E44/g, '\"N').replace(/\u1E46/g, '\.N').replace(/\u1E42/g, '\.M').replace(/\u00D1/g, '\~N').replace(/\u1E36/g, '\.L');
		var thisTab = this.isThisDPRTab('DPRm');
		if(/ /.test(input)) { // multiple words 
			if(thisTab) {  
				var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
				thisTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.analyzeTextPad(input);
				return;
			}
			var oldTab = this.findDPRTab('DPR-main');
			if (!oldTab) {
				var permalink = 'chrome://digitalpalireader/content/index.xul' + '?text='+input;
				this.openDPRTab(permalink,'DPR-main');
			}
			else {
				mainWindow.gBrowser.selectedTab = oldTab;
				var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
				oldTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.analyzeTextPad(input);
			}
		}
		else { // single word
			if(thisTab) {  
				var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
				thisTabBrowser.contentDocument.getElementById('dpr-index-bottom').contentWindow.wrappedJSObject.outputAnalysis(input);
				return;
			}
			var oldTab = this.findDPRTab('DPR-main');
			if (!oldTab) {
				var permalink = 'chrome://digitalpalireader/content/index.xul' + '?analysis='+input;
				this.openDPRTab(permalink,'DPR-main');
			}
			else {
				mainWindow.gBrowser.selectedTab = oldTab;
				var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
				oldTabBrowser.contentDocument.getElementById('dpr-index-bottom').contentWindow.wrappedJSObject.outputAnalysis(input);
			}
		}
	},
}


