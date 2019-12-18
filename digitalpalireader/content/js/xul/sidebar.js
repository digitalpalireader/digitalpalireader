if (DPR_PAL.isXUL) {
    console.log('Loading DPR_PAL_Sidebar...');
} else {
    console.log('Cannot DPR_PAL_Sidebar for the wrong platform', DPR_PAL);
}

var digitalpalireader =
{

    onLoad: function()
    {
		window.dump("Load\n");
		
		var url = DPRChrome.DPRSidebarDocument();
		if(url) url = url.location.href;
		
		//var init = /digitalpalireader\.xul\?init=true/.exec(url);
		//alert(url);
		//if(!init) return mainWindow.toggleSidebar();
		
		this.checkTipitaka();

		DPRChrome.giveIDtoTabs();
		this.updatePrefs();

		DPRNav.changeSet(1);
		DPRNav.setSearchBookList();
		
		//mainWindow.document.getElementById('sidebar-header').hidden = true;
		mainWindow.gBrowser.addEventListener("load", this.onPageLoad, true);
		mainWindow.gBrowser.tabContainer.addEventListener("TabClose", this.onPageUnload, true);
	},
	
	checkTipitaka:function() {
		if(!chromeFileExists('DPRMyanmar/content/exists')) {
			if(promptConfirm('Tipitaka Archive Not Found', "It looks like you don't have the DPR tipitaka archive installed.\n\nAs of DPR 2.0, the tipitaka files are in a seperate extension package that must be downloaded in addition to the main archive in order to use the reader.  This is done in order to save you from having to re-download the tipitaka every time you upgrade the DPR.  \n\nWith your permission, you will now be directed to the tipitaka extension URL.  Once it is downloaded, restart Firefox, and the DPR should work properly.  After that, you shouldn't see this dialogue again.")) {
				DPRChrome.openDPRTab('http://pali.sirimangalo.org/DPRMyanmar.xpi', 'DPR-xpi',false);
			}
			return mainWindow.toggleSidebar();
		}
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


