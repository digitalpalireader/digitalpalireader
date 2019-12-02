var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
				   .getInterface(Components.interfaces.nsIWebNavigation)
				   .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
				   .rootTreeItem
				   .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
				   .getInterface(Components.interfaces.nsIDOMWindow); 
function onLoad() {
	if(/index\.xul/.test(DPR_PAL.contentDocument.location.href))
		reindexPanels();
	
	var compare,atiurl,etcurl;
	var url = document.location.href;
	var link = url.split('?')[1].substring(4);
	if (link) {
		if(!/^http/.test(link) && !/^file:/.test(link))
			atiurl = (DPR_prefs['catioff'] ? 'file://'+DPR_prefs['catiloc'].replace(/\\/g,'/')+'/html/tipitaka/' : 'http://www.accesstoinsight.org/tipitaka/')+link;
		else {
			etcurl = true;
			atiurl = link;
		}
	}
	
	if(atiurl) {
		document.getElementById('ati').contentDocument.location.href = atiurl;
		
		if(/index\.xul/.test(DPR_PAL.contentDocument.location.href)) { // panels
			document.getElementById('close').removeAttribute('collapsed');

			var oldurl = DPR_PAL.contentDocument.location.href;
			var oldparams = oldurl.split('?')[1];
			oldparams = oldparams.split('|');
			oldparams[G_compare-1] = link;
			newparams = oldparams.join('|');

			var newurl = 'chrome://digitalpalireader/content/index.xul?'+newparams;
			mainWindow.gBrowser.selectedTab.linkedBrowser.contentWindow.history.replaceState({}, 'Title', newurl);

			// ati kungfu
	
			if(!etcurl) {
				setTimeout(function(){
					document.getElementById('ati').contentDocument.getElementById('H_content').style.width = 'auto';
					document.getElementById('ati').contentDocument.getElementById('H_billboard').style.width = 'auto';
					document.getElementById('ati').contentDocument.getElementById('H_container').style.width = 'auto';
				},2000);
			}
		}
		else
			mainWindow.gBrowser.selectedTab.setAttribute('label',document.getElementById('ati').contentDocument.getElementsByTagName('title')[0].textContent);
	}
	
}
function closePanel() {
	var cW = mainWindow.gBrowser.selectedTab.linkedBrowser.contentWindow;
	var cD = DPR_PAL.contentDocument;
	var elem = cD.getElementById('dpr-tops');
	var browsers = elem.getElementsByTagName('browser');
	
	// if last browser
	
	if(browsers.length == 1) {
		reindexPanels();
		browsers[0].contentWindow.refreshit();
		browsers[0].contentWindow.makeToolbox(false);
		cW.history.replaceState({}, 'Title', 'chrome://digitalpalireader/content/index.xul');
		return;
	}

	window.onunload=function(){ cW.reindexPanels() }
	var url = cD.location.href.split('?');
	var panels = url[1].split('|');
	panels.splice(G_compare-1,1);
	panels = panels.join('|');
	url[1] = panels;
	var newurl = url.join('?').replace(/\?$/,'');
	cW.history.replaceState({}, 'Title', newurl);

	elem.removeChild(elem.getElementsByTagName('splitter')[G_compare-1]);
	elem.removeChild(browsers[G_compare-1]);
	
	// collapse first splitter
	
	elem.getElementsByTagName('splitter')[0].setAttribute('collapsed','true');
}
function reindexPanels() {
	return mainWindow.gBrowser.selectedTab.linkedBrowser.contentWindow.reindexPanels();
}
function refreshit() {
	document.location.href="top.htm";
}
