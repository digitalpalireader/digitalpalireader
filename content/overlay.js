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
		openFirstDPRTab();
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
				return false; // still one open tab
			}
		}
		closeDPRSidebar();
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
		closeDPRSidebar();
		return true;
	},
	updatePrefs: function() {
		sidebarConfig();
		changeSet(1);
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

	openDPRTab: function (permalink,id,reuse) {

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

};
mainWindow.gBrowser.addEventListener("load", digitalpalireader.onPageLoad, true);
mainWindow.gBrowser.tabContainer.addEventListener("TabClose", digitalpalireader.onPageUnload, true);



function closeDPRSidebar() {
	var sidebarWindow = mainWindow.document.getElementById("sidebar").contentDocument;

	if (sidebarWindow.location.href == "chrome://digitalpalireader/content/digitalpalireader.xul") {
		mainWindow.toggleSidebar();
	} 
}

function findDPRSidebar() {
	var sidebarWindow = mainWindow.document.getElementById("sidebar").contentDocument;

	if (sidebarWindow.location.href == "chrome://digitalpalireader/content/digitalpalireader.xul") {
		return sidebarWindow.getElementById('dpr-browser').contentWindow;
	} 
	else return false
}
function findDPRTab(id) {
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
}
