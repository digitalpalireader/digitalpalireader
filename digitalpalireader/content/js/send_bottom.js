
function sendTextPad(add){
	var input = document.getElementById('pad').value;

	if(!add) { // reuse old tab
		var thisTab = mainWindow.gBrowser.selectedTab;
		var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
		thisTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.analyzeTextPad(input);
		return;
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/index.xul?text='+toVel(input);
		openDPRTab(permalink,'DPRm');
	}	
}

