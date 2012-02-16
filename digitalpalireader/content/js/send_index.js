
function sendTextPad(input, add){

	if(!add) { // reuse old tab
		var thisTab = mainWindow.gBrowser.selectedTab;
		var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
		thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.wrappedJSObject.analyzeTextPad(input);
		return;
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/bottom.htm' + '?analysis='+toVel(input)+'&frombox='+frombox;
		openDPRMain('DPRm',permalink,'bottom');
	}	
}


