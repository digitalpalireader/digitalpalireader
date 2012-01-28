var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
				   .getInterface(Components.interfaces.nsIWebNavigation)
				   .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
				   .rootTreeItem
				   .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
				   .getInterface(Components.interfaces.nsIDOMWindow); 
function onDocLoadx() {
	//getconfig();
	//openDPRSidebar();

	var link = document.location.href.split('?')[1];
	if (link) {
		var opts = link.split('&');
		var linkt = '';
		var linkb = '';
		for (i in opts) {
			switch(opts[i].split('=')[0]) {
				case 'analysis':
				case 'ped':
				case 'dppn':
				case 'frombox':
					opts[i] = decodeURIComponent(opts[i]);
					linkb+=(linkb == ''?'?':'&')+opts[i]
					break;
			}
		}
		document.getElementById('dict').contentDocument.location.href = 'chrome://digitalpalireader/content/bottom.htm'+linkb;
	}
	else {
		moveFrame(6);
		document.getElementById('dict').contentDocument.location.href = 'chrome://digitalpalireader/content/bottom.htm';
	}
	document.onkeypress = function(e){
		if(document.activeElement.tagName == "html:textarea" || e.altKey || e.ctrlKey) { return; }
		keyPressed(e);
	};
}
function getconfigx() {
	document.getElementById('dict').contentWindow.getconfig();
}

function moveFrame(e) {
	document.getElementById('f1').setAttribute('collapsed','true');
	document.getElementById('f2').setAttribute('collapsed','true');
	document.getElementById('f3').setAttribute('collapsed','true');
	document.getElementById('f4').setAttribute('collapsed','true');
	document.getElementById('f5').setAttribute('collapsed','true');
	document.getElementById('f6').setAttribute('collapsed','true');
	document.getElementById('f'+e).removeAttribute('collapsed');
}			

function openBottomMenu() {
	document.getElementById('menu').openPopup(document.getElementById('bottom-box'));
}

// transfer functions

function outputAnalysis(opt) {
	moveFrame(1);
	return document.getElementById('dict').contentWindow.outputAnalysis(opt);
}
function DPPNXML(opt) {
	moveFrame(1);
	return document.getElementById('dict').contentWindow.DPPNXML(opt);
}
function paliXML(opt) {
	moveFrame(1);
	return document.getElementById('dict').contentWindow.paliXML(opt);
}
function getAtthXML(opt,opt2,opt3) {
	moveFrame(1);
	return document.getElementById('dict').contentWindow.getAtthXML(opt,opt2,opt3);
}

function sendAlertFlash(opt,opt2) {
	return document.getElementById('dpr-index-top').contentWindow.alertFlash(opt,opt2);
}
