
function sendTextPad(add){
	var input = document.getElementById('pad').value;

	if(!add) { // reuse old tab
		mainWindow.gBrowser.selectedTab.linkedBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.analyzeTextPad(input);
		return;
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/index.xul?text='+toVel(input);
		openDPRTab(permalink,'DPRm');
	}	
}
function eventSend(event,internal) {
	
	if(!event) return;
	if(event.ctrlKey || event.which == 2) return true;
	if(event.shiftKey) return 'shift';
	if(event.which == 1 && internal) return 'internal';
	if (event.which == 1) return false;
	return 'right';
}
