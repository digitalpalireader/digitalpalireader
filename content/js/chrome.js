	
var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
			   .getInterface(Components.interfaces.nsIWebNavigation)
			   .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
			   .rootTreeItem
			   .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
			   .getInterface(Components.interfaces.nsIDOMWindow); 

function openDPRTab(permalink,id,reuse) {

	// get last DPR tab

	var start = 0;  // no DPR tabs yet
	var newIdx = 0;
	
	for (index = 0, tabbrowser = mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length; index++) {

		// Get the next tab
		var currentTab = tabbrowser.tabContainer.childNodes[index];
		if (!/^DPR/.exec(currentTab.getAttribute('id'))) { // not a dpr tab
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

}

function findDPRTab(id) {
	for (var found = false, index = 0, tabbrowser = mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length && !found; index++) {

		// Get the next tab
		var currentTab = tabbrowser.tabContainer.childNodes[index];

		// Does this tab contain our custom attribute?
		if (currentTab.getAttribute('id') == id) {

			return currentTab;
		}
	}
	return false;
}

function findDPRSidebar() {
	var sidebarWindow = mainWindow.document.getElementById("sidebar").contentDocument;

	if (sidebarWindow.location.href == "chrome://digitalpalireader/content/digitalpalireader.xul") {
		return sidebarWindow.getElementById('dpr-browser').contentWindow;
	} 
	else return false
}

function updatePrefs() {
	getconfig();
	for (index = 0, tabbrowser = mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length; index++) {

		// Get the next tab
		var currentTab = tabbrowser.tabContainer.childNodes[index];
		if (/^DPR/.exec(currentTab.getAttribute('id'))) { // a dpr tab
			currentTab.linkedBrowser.contentWindow.getconfig();
		}
	}
}
