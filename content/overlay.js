var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
			   .getInterface(Components.interfaces.nsIWebNavigation)
			   .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
			   .rootTreeItem
			   .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
			   .getInterface(Components.interfaces.nsIDOMWindow); 
var digitalpalireader =
{

    onLoad: function()
    {
		window.dump("Load\n");
		if(!DPRChrome.giveIDtoTabs()) DPRChrome.openFirstDPRTab();
		this.updatePrefs();
		mainWindow.document.getElementById('sidebar-header').hidden = true;
	},
   
    onUnload: function()
    {
        window.dump("unLoad\n");
		mainWindow.gBrowser.removeEventListener("load", this.onPageLoad, true);
		mainWindow.document.getElementById('sidebar-header').hidden = false;
	},
	
	onPageLoad: function(e)
	{
        window.dump("onLoad\n");
		

		var tab = e.target;

		for (index = 0, tabbrowser = mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length; index++) {
			// Get the next tab
			var currentTab = tabbrowser.tabContainer.childNodes[index];

			var ctloc = mainWindow.gBrowser.getBrowserForTab(currentTab).contentWindow.location.href;
			if (/^DPR/.exec(currentTab.getAttribute('id')) && /chrome:\/\/digitalpalireader\/content\//.exec(ctloc)) { // a dpr tab
				if(currentTab == tab) mainWindow.gBrowser.setIcon(tab, "chrome://digitalpalireader/skin/icons/logo.png");
				return false; // still one open tab
			}
		}
		mainWindow.toggleSidebar();
		return true;		
	},
	onPageUnload: function(e)
	{
        window.dump('onUnload\n');
		var tab = e.target;

		for (index = 0, tabbrowser = mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length; index++) {
			// Get the next tab
			var currentTab = tabbrowser.tabContainer.childNodes[index];
			if(currentTab == tab) {
				dump('match');
				continue;
			}
			var ctloc = mainWindow.gBrowser.getBrowserForTab(currentTab).contentWindow.location.href;
			if (/^DPR/.exec(currentTab.getAttribute('id')) && /chrome:\/\/digitalpalireader\/content\//.exec(ctloc)) { // a dpr tab
				return false; // still one open tab
			}
		}
		mainWindow.toggleSidebar();
		return true;
	},
	updatePrefs: function() {
		this.sidebarConfig();
		DPRNav.changeSet(1);
		for (index = 0, tabbrowser = mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length; index++) {
			// Get the next tab
			var currentTab = tabbrowser.tabContainer.childNodes[index];
			var ctloc = mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;
			if (/^DPR/.exec(currentTab.getAttribute('id')) && /chrome:\/\/digitalpalireader\/content\//.exec(ctloc)) { // a dpr tab
				try{currentTab.linkedBrowser.contentWindow.getconfig();}
				catch(ex){}
			}
		}
	},
	sidebarConfig:function() {
		for (i in G_prefs) {
			G_prefs[i] = getPref(i);
		}
		DPRNav.historyBox();
		// update backgrounds
			
		//checkbackground();
	},

};
