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
		DPRChrome.openFirstDPRTab();
		DPRChrome.giveIDtoTabs();
		this.updatePrefs();
		//mainWindow.document.getElementById('sidebar-header').hidden = true;
		mainWindow.gBrowser.addEventListener("load", this.onPageLoad, true);
		mainWindow.gBrowser.tabContainer.addEventListener("TabClose", this.onPageUnload, true);
	},
   
    onUnload: function()
    {
        window.dump("unLoad\n");
		mainWindow.gBrowser.removeEventListener("load", this.onPageLoad, true);
		//mainWindow.document.getElementById('sidebar-header').hidden = false;
	},
	
	onPageLoad: function(e)
	{
        window.dump("onLoad\n");
		
		DPRChrome.giveIDtoTabs();
	
	},
	onPageUnload: function(e)
	{
        window.dump('onUnload\n');
		var tab = e.target;


		return true;
	},
	updatePrefs: function() {
		window.dump('updatePrefs');
		DPRConfig.sidebarConfig();
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
};


