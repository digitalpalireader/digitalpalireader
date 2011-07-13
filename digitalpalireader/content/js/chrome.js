	
var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
			   .getInterface(Components.interfaces.nsIWebNavigation)
			   .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
			   .rootTreeItem
			   .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
			   .getInterface(Components.interfaces.nsIDOMWindow); 

function openFirstDPRTab() {
	if(!findDPRTab('DPR-main')) openDPRMain('DPR-main','chrome://digitalpalireader/content/index.xul','');
}

function openDPRTab(permalink,id,reuse) {


	if(reuse) { // reuse old tab
		var oldTab = findDPRTab(id);

		if (!oldTab) {
			openDPRTab(permalink,id);
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

}


function findDPRTab(id,loc) {
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

function findDPRTabs(id,loc) {
	var tabs = [];
	for (var found = false, index = 0, tabbrowser = mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length && !found; index++) {

		// Get the next tab
		var currentTab = tabbrowser.tabContainer.childNodes[index];
		var ctloc = mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;

		// Does this tab contain our custom attribute?
		if (currentTab.getAttribute('id') == id && /chrome:\/\/digitalpalireader\/content\//.exec(ctloc)) {

			tabs.push(currentTab);
		}
	}
	return tabs;
}

function findDPRTabByLoc(loc) {
	loc = new RegExp(loc);
	for (var found = false, index = 0, tabbrowser = mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length && !found; index++) {

		// Get the next tab
		var currentTab = tabbrowser.tabContainer.childNodes[index];
		var ctloc = mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;

		// Does this tab contain our custom attribute?
		if (/chrome:\/\/digitalpalireader\/content\//.exec(ctloc) && loc.exec(ctloc)) {

			return currentTab;
		}
	}
	return false;
}

function updatePrefs() {
	getconfig();
	changeSet(1);
	for (index = 0, tabbrowser = mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length; index++) {
		// Get the next tab
		var currentTab = tabbrowser.tabContainer.childNodes[index];
		var ctloc = mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;
		if (/^DPR/.exec(currentTab.getAttribute('id')) && /chrome:\/\/digitalpalireader\/content\//.exec(ctloc)) { // a dpr tab
			currentTab.linkedBrowser.contentWindow.getconfig();
		}
	}
}

function isDPRTab(id) {
	if(mainWindow.gBrowser.selectedTab.id == id) return mainWindow.gBrowser.selectedTab;
	else return false;
}

function giveIDtoTabs() { // startup function, give ids to 
	
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
}

function checkLastTab() {
	for (index = 0, tabbrowser = mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length; index++) {
		// Get the next tab
		var currentTab = tabbrowser.tabContainer.childNodes[index];
		var ctloc = mainWindow.gBrowser.getBrowserForTab(currentTab).contentWindow.location.href;
		if (/^DPR/.exec(currentTab.getAttribute('id')) && /chrome:\/\/digitalpalireader\/content\//.exec(ctloc)) { // a dpr tab
			return false; // still one open tab
		}
	}
	//closeDPRSidebar();
	return false;
}

function DPRSidebarWindow() {
	var sidebar = mainWindow.document.getElementById("sidebar");

	if (sidebar.contentDocument.location.href == "chrome://digitalpalireader/content/digitalpalireader.xul") {
		return sidebar.contentWindow;
	} 
	else return false
}

function DPRSidebarDocument() {
	var sidebar = mainWindow.document.getElementById("sidebar").contentDocument;

	if (sidebar.location.href == "chrome://digitalpalireader/content/digitalpalireader.xul") {
		return sidebar;
	} 
	else return false
}

function closeDPRSidebar() {
var sidebarWindow = mainWindow.document.getElementById("sidebar").contentDocument;

	if (sidebarWindow.location.href == "chrome://digitalpalireader/content/digitalpalireader.xul") {
		return mainWindow.toggleSidebar();
	} 
}
function openDPRSidebar() {
	var sidebarWindow = mainWindow.document.getElementById("sidebar").contentDocument;
	if (sidebarWindow.location.href != "chrome://digitalpalireader/content/digitalpalireader.xul") {
		return mainWindow.toggleSidebar('viewDPR');
	} 
}

function setCurrentTitle(title) {
	mainWindow.gBrowser.selectedTab.setAttribute('label',title);
}
