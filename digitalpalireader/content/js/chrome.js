function openFirstDPRTab() {
	if (!DPR_PAL.isXUL) {
		return;
	}

	if(!findDPRTab('DPR-main')) openDPRMain('DPR-main','chrome://digitalpalireader/content/index.xul','');
}

function openDPRTab(permalink,id,reuse) {
	if (!DPR_PAL.isXUL) {
		return false;
	}


	if(reuse) { // reuse old tab
		var oldTab = findDPRTab(id);

		if (!oldTab) {
			openDPRTab(permalink,id);
			return true;
		}
		DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
		DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab).contentDocument.location.href = permalink;
	}
	else {
		// get last DPR tab

		var start = 0;  // no DPR tabs yet
		var newIdx = 0;
		
		for (index = 0, tabbrowser = DPR_PAL.mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length; index++) {

			// Get the next tab
			var currentTab = tabbrowser.tabContainer.childNodes[index];
			var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;
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
		var newTab = DPR_PAL.mainWindow.gBrowser.addTab(permalink);
		if(id) newTab.setAttribute('id', id);
		DPR_PAL.mainWindow.gBrowser.moveTabTo(newTab, newIdx)
		DPR_PAL.mainWindow.gBrowser.selectedTab = newTab;
	}

}


function findDPRTab(id,loc) {
	if (!DPR_PAL.isXUL) {
		return false;
	}

	for (var found = false, index = 0, tabbrowser = DPR_PAL.mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length && !found; index++) {

		// Get the next tab
		var currentTab = tabbrowser.tabContainer.childNodes[index];
		var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;

		// Does this tab contain our custom attribute?
		if (currentTab.getAttribute('id') == id && /chrome:\/\/digitalpalireader\/content\//.exec(ctloc)) {

			return currentTab;
		}
	}
	return false;
}

function findDPRTabs(id,loc) {
	if (!DPR_PAL.isXUL) {
		return [];
	}

	var tabs = [];
	for (var found = false, index = 0, tabbrowser = DPR_PAL.mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length && !found; index++) {

		// Get the next tab
		var currentTab = tabbrowser.tabContainer.childNodes[index];
		var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;

		// Does this tab contain our custom attribute?
		if (currentTab.getAttribute('id') == id && /chrome:\/\/digitalpalireader\/content\//.exec(ctloc)) {

			tabs.push(currentTab);
		}
	}
	return tabs;
}

function findDPRTabByLoc(loc) {
	if (!DPR_PAL.isXUL) {
		return false;
	}

	loc = new RegExp(loc);
	for (var found = false, index = 0, tabbrowser = DPR_PAL.mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length && !found; index++) {

		// Get the next tab
		var currentTab = tabbrowser.tabContainer.childNodes[index];
		var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;

		// Does this tab contain our custom attribute?
		if (/chrome:\/\/digitalpalireader\/content\//.exec(ctloc) && loc.exec(ctloc)) {

			return currentTab;
		}
	}
	return false;
}

function updatePrefs() {
	if (!DPR_PAL.isXUL) {
		return;
	}

	getconfig();
	changeSet(1);
	for (index = 0, tabbrowser = DPR_PAL.mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length; index++) {
		// Get the next tab
		var currentTab = tabbrowser.tabContainer.childNodes[index];
		var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;
		if (/^DPR/.exec(currentTab.getAttribute('id')) && /chrome:\/\/digitalpalireader\/content\//.exec(ctloc)) { // a dpr tab
			currentTab.linkedBrowser.contentWindow.getconfig();
		}
	}
}

function isDPRTab(id) {
	if (!DPR_PAL.isXUL) {
		return false;
	}

	if(DPR_PAL.mainWindow.gBrowser.selectedTab.id == id) return DPR_PAL.mainWindow.gBrowser.selectedTab;
	else return false;
}

function giveIDtoTabs() { // startup function, give ids to 
	if (!DPR_PAL.isXUL) {
		return;
	}
	
	var main = 0; //no main dpr tabs
	var dict = 0; // no dict tabs
	var search = 0; // no dict tabs
	var etc = 0;
	for (index = 0, tb = DPR_PAL.mainWindow.gBrowser; index < tb.tabContainer.childNodes.length; index++) {

		// Get the next tab
		var currentTab = tb.tabContainer.childNodes[index];
		var ctloc = tb.getBrowserForTab(currentTab).contentDocument.location.href;
		if (/chrome:\/\/digitalpalireader\/content\//.exec(ctloc)) { // a dpr tab
			tb.setIcon(currentTab, "chrome://digitalpalireader/skin/icons/logo.png");
			if(/index\.xul/.exec(ctloc)) currentTab.setAttribute('id',(main++==0?'DPR-main':'DPRm'));
			else if(/dict\.htm/.exec(ctloc)) currentTab.setAttribute('id',(dict++==0?'DPR-dict':'DPRd'));
			else if(/search\.xul/.exec(ctloc)) currentTab.setAttribute('id',(search++==0?'DPR-search':'DPRs'));
			else currentTab.setAttribute('id',(etc++==0?'DPR-x':'DPRx'));
		}
	}	
	if(main > 0) return true;
	return false;	
}

function checkLastTab() {
	if (!DPR_PAL.isXUL) {
		return;
	}

	for (index = 0, tabbrowser = DPR_PAL.mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length; index++) {
		// Get the next tab
		var currentTab = tabbrowser.tabContainer.childNodes[index];
		var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentWindow.location.href;
		if (/^DPR/.exec(currentTab.getAttribute('id')) && /chrome:\/\/digitalpalireader\/content\//.exec(ctloc)) { // a dpr tab
			return false; // still one open tab
		}
	}
	//closeDPRSidebar();
	return false;
}

function DPRSidebarWindow() {
	if (!DPR_PAL.isXUL) {
		return;
	}

	var sidebar = DPR_PAL.mainWindow.document.getElementById("sidebar");

	if (sidebar.contentDocument.location.href == "chrome://digitalpalireader/content/digitalpalireader.xul") {
		return sidebar.contentWindow;
	} 
	else return false
}

function DPRSidebarDocument() {
	if (!DPR_PAL.isXUL) {
		return;
	}

	var sidebar = DPR_PAL.mainWindow.document.getElementById("sidebar").contentDocument;

	if (sidebar.location.href == "chrome://digitalpalireader/content/digitalpalireader.xul") {
		return sidebar;
	} 
	else return false
}

function closeDPRSidebar() {
	if (!DPR_PAL.isXUL) {
		return;
	}

	var sidebarWindow = DPR_PAL.mainWindow.document.getElementById("sidebar").contentDocument;

	if (sidebarWindow.location.href == "chrome://digitalpalireader/content/digitalpalireader.xul") {
		return DPR_PAL.mainWindow.toggleSidebar();
	} 
}
function openDPRSidebar() {
	if (!DPR_PAL.isXUL) {
		return;
	}

	var sidebarWindow = DPR_PAL.mainWindow.document.getElementById("sidebar").contentDocument;
	if (sidebarWindow.location.href != "chrome://digitalpalireader/content/digitalpalireader.xul") {
		return DPR_PAL.mainWindow.toggleSidebar('viewDPR');
	} 
}

function setCurrentTitle(title) {
    if (DPR_PAL.isXUL) {
		DPR_PAL.mainWindow.gBrowser.selectedTab.setAttribute('label',title);
	  } else {
		document.title = title;
	  }
  }

function closeBrowser(id) {
	if (!DPR_PAL.isXUL) {
		return;
	}

	var thisTab = DPR_PAL.mainWindow.gBrowser.selectedTab;
	var thisDocument = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab).contentDocument;
	thisDocument.getElementById(id).parentNode.removeChild(thisDocument.getElementById(id+'-splitter'));
	thisDocument.getElementById(id).parentNode.removeChild(thisDocument.getElementById(id));
}

function eventSend(event,internal) {
	if(!event) return;
	if(event.ctrlKey || event.which == 2) return true;
	if(event.shiftKey) return 'shift';
	if(event.which == 1 && internal) return 'internal';
	if (event.which == 1) return false;
	if(event.keyCode) return false;
	return 'right';
}