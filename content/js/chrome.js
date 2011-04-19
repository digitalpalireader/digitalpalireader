	
var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
			   .getInterface(Components.interfaces.nsIWebNavigation)
			   .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
			   .rootTreeItem
			   .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
			   .getInterface(Components.interfaces.nsIDOMWindow); 


function openDPRMain(id,link) {
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
	var opts = link.match(/\?.+/);
	var newTab = mainWindow.gBrowser.addTab('chrome://digitalpalireader/content/index.xul'+(opts?opts[0]:''));
	newTab.setAttribute('id', id);
	mainWindow.gBrowser.moveTabTo(newTab, newIdx)
	mainWindow.gBrowser.selectedTab = newTab;
}


function openFirstDPRTab() {
	if(!findDPRTab('DPR-main')) openDPRMain('DPR-main','chrome://digitalpalireader/content/index.xul','');
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

function checkLastTab() {
	for (index = 0, tabbrowser = mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length; index++) {
		// Get the next tab
		var currentTab = tabbrowser.tabContainer.childNodes[index];
		var ctloc = mainWindow.gBrowser.getBrowserForTab(currentTab).contentWindow.location.href;
		if (/^DPR/.exec(currentTab.getAttribute('id')) && /chrome:\/\/digitalpalireader\/content\//.exec(ctloc)) { // a dpr tab
			return false; // still one open tab
		}
	}
	closeDPRSidebar();
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

