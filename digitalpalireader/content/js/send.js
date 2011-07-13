function eventSend(event) {
	if(event.ctrlKey || event.which == 2) return true;
	else if (event.which == 1) return false;
	return 'right';
}

	
function openPlace([nikaya,book,meta,volume,vagga,sutta,section,hiert,alt],para,stringra,add)
{
	if(add == 'right') return;
	if (typeof(stringra) == 'string') {
		stringra = stringra.replace(/`/g, '"');
		stringra = stringra.split('#');
		if(G_searchRX == 'true') {
			for (i in stringra) { stringra[i] = new RegExp(stringra[i]); }
		}
	}

	if(!add) { // reuse old tab
		var thisTab = isDPRTab('DPRm');
		if(thisTab) {  
			var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
			thisTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.loadXMLSection(stringra,para,[nikaya,book,meta,volume,vagga,sutta,section,hiert,alt]);
			return;
		}
		var oldTab = findDPRTab('DPR-main');
		if (!oldTab) {		
			var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + toVel(stringra.join('+')).replace(/ /g, '_') : '')+(para ? '&para=' + (para+1) : '')+(alt ? '&alt='+alt : '');
			openDPRTab(permalink,'DPR-main');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.loadXMLSection(stringra,para,[nikaya,book,meta,volume,vagga,sutta,section,hiert,alt]);
		}
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + toVel(stringra.join('+')).replace(/ /g, '_') : '')+(para ? '&para=' + (para+1) : '')+(alt ? '&alt='+alt : '');
		openDPRTab(permalink,'DPRm');
	}
}


function importXMLindex(add) {

	var nikaya = document.getElementById('set').value;
	var bookno = document.getElementById('book').selectedIndex;

	if(!add) { // reuse old tab
		var thisTab = isDPRTab('DPRm');
		if(thisTab) {  
			var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
			thisTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.loadXMLindex([nikaya,bookno,G_hier]);
			return;
		}
		var oldTab = findDPRTab('DPR-main');

		if (!oldTab) {
			var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+bookno+'.'+G_hier;
			openDPRTab(permalink,'DPR-main');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.loadXMLindex([nikaya,bookno,G_hier]);
		}
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/index.xul?loc='+nikaya+'.'+bookno+'.'+G_hier;
		openDPRTab(permalink,'DPRm');
	}
}

function sendPaliXML(link,add) {
	if(!add) { // reuse old tab
		var oldTab = findDPRTab('DPR-main');

		if (!oldTab) {
            var permalink = 'chrome://digitalpalireader/content/dict.htm?type=PED&opts=xv,xd,xm,xs,xa,xk,xy,mm,ma,mt,sw,hd&entry='+link;
			openDPRTab(permalink,'DPR-main');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentDocument.getElementById('dpr-index-bottom').contentWindow.wrappedJSObject.paliXML(link);
		}
	}
	else {
        var permalink = 'chrome://digitalpalireader/content/dict.htm?type=PED&opts=xv,xd,xm,xs,xa,xk,xy,mm,ma,mt,sw,hd&entry='+link;
		openDPRTab(permalink,'DPRd');
	}	
}

function sendDPPNXML(link,add) {
	if(!add) { // reuse old tab
		var oldTab = findDPRTab('DPR-main');

		if (!oldTab) {
            var permalink = 'chrome://digitalpalireader/content/dict.htm?type=DPPN&opts=xv,xd,xm,xs,xa,xk,xy,mm,ma,mt,sw,hd&entry='+link;
			openDPRTab(permalink,'DPR-main');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentDocument.getElementById('dpr-index-bottom').contentWindow.wrappedJSObject.DPPNXML(link);
		}
	}
	else {
        var permalink = 'chrome://digitalpalireader/content/dict.htm?type=DPPN&opts=xv,xd,xm,xs,xa,xk,xy,mm,ma,mt,sw,hd&entry='+link;
		openDPRTab(permalink,'DPRd');
	}	
}

function sendAtt(x,type,nik,add) {
	if(!add) { // reuse old tab
		var oldTab = findDPRTab('DPR-main');

		if (!oldTab) {
			var permalink = 'chrome://digitalpalireader/content/index.xul' + '?atth='+x+','+type+','+nik;
			openDPRTab(permalink,'DPR-main');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.getAtthXML(x,type,nik);
		}
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/index.xul' + '?atth='+x+','+type+','+nik;
		openDPRTab(permalink,'DPRm');
	}	
}


function sendTitle(x,m,a,t,nik,add) {
	if(!add) { // reuse old tab
		var oldTab = findDPRTab('DPR-main');

		if (!oldTab) {
			var permalink = 'chrome://digitalpalireader/content/index.xul' + '?title='+x+','+m+','+a+','+t+','+nik;
			openDPRTab(permalink,'DPR-main');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.getTitleXML(x,m,a,t,nik);
		}
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/index.xul' + '?title='+x+','+m+','+a+','+t+','+nik;
		openDPRTab(permalink,'DPRm');
	}	
}





function sendUpdateBookmarks() {
	var oldTabs = findDPRTabs('DPR-bm');
	for (i = 0; i < oldTabs.length; i++) {
		var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTabs[i]);
		oldTabBrowser.contentWindow.bookmarkframe();
	}

	var sidebar = DPRSidebarWindow();
	if (sidebar) {
		sidebar.DPRNav.bookmarkBox();
	}
	
}

var G_lastcolour = 0;

function sendAnalysisToOutput(input, divclicked, frombox, add){
	
	if(add == 'right') return;
	
	if(divclicked) divclicked = 'W'+divclicked;
	if (divclicked && document.getElementById(divclicked))
	{
		if (document.getElementById(G_lastcolour))
		{
			document.getElementById(G_lastcolour).style.color = DPR_prefs['coltext'];
			document.getElementById(G_lastcolour).style.fontWeight = 'normal';
		}
		document.getElementById(divclicked).style.color = DPR_prefs['colsel'];
		document.getElementById(divclicked).style.fontWeight = 'bold';
		G_lastcolour = divclicked;
	}
	if(add != true) { // reuse old tab
		var thisTab = isDPRTab('DPRm');
		if(thisTab) {  
			var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
			thisTabBrowser.contentDocument.getElementById('dpr-index-bottom').contentWindow.wrappedJSObject.outputAnalysis(input,frombox);
			return;
		}
		var oldTab = findDPRTab('DPR-main');
		if (!oldTab) {
			var permalink = 'chrome://digitalpalireader/content/index.xul' + '?analysis='+toVel(input)+'&options='+frombox;
			openDPRTab(permalink,'DPR-main');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentDocument.getElementById('dpr-index-bottom').contentWindow.wrappedJSObject.outputAnalysis(input,frombox);
		}
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/bottom.htm' + '?analysis='+toVel(input)+'&frombox='+frombox;
		openDPRTab(permalink,'DPRm');
	}	
}
