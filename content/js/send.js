
	
function openPlace([nikaya,book,meta,volume,vagga,sutta,section,hiert],para,stringra,add)
{
	if (stringra) {
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
			thisTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.loadXMLSection(stringra,para,[nikaya,book,meta,volume,vagga,sutta,section,hiert]);
			return;
		}
		var oldTab = findDPRTab('DPR-main');
		if (!oldTab) {		
			var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + toVel(stringra.join('+')).replace(/ /g, '_') : '')+(para ? '&para=' + (para+1) : '');
			openDPRTab(permalink,'DPR-main');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.loadXMLSection(stringra,para,[nikaya,book,meta,volume,vagga,sutta,section,hiert]);
		}
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + toVel(stringra.join('+')).replace(/ /g, '_') : '')+(para ? '&para=' + (para+1) : '');
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
		var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+bookno+'.'+G_hier;
		openDPRTab(permalink,'DPRm');
	}
}

function sendPaliXML(link,add) {
	if(!add) { // reuse old tab
		var oldTab = findDPRTab('DPR-main');

		if (!oldTab) {
			var permalink = 'chrome://digitalpalireader/content/bottom.htm' + '?ped='+link.join(',');
			openDPRTab('DPR-main',permalink);
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentDocument.getElementById('dpr-index-bottom').contentWindow.wrappedJSObject.paliXML(link[0]+'/'+link[1]+'/'+link[2]+','+link[3]);
		}
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/bottom.htm' + '?ped='+link.join(',');
		openDPRTab('DPRm',permalink);
	}	
}

function sendDPPNXML(link,add) {
	if(!add) { // reuse old tab
		var oldTab = findDPRTab('DPR-main');

		if (!oldTab) {
			var permalink = 'chrome://digitalpalireader/content/bottom.htm' + '?dppn='+link.join(',');
			openDPRTab('DPR-main',permalink);
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentDocument.getElementById('dpr-index-bottom').contentWindow.wrappedJSObject.DPPNXML(link[0]+'/'+link[1]+'/'+link[2]+','+link[3]);
		}
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/bottom.htm' + '?dppn='+link.join(',');
		openDPRTab('DPRm',permalink);
	}	
}

function sendAtt(x,type,nik,add) {
	if(!add) { // reuse old tab
		var oldTab = findDPRTab('DPR-main');

		if (!oldTab) {
			var permalink = 'chrome://digitalpalireader/content/bottom.htm' + '?atth='+x+','+type+','+nik;
			openDPRTab('DPR-main',permalink);
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentDocument.getElementById('dpr-index-bottom').contentWindow.wrappedJSObject.getAtthXML(x,type,nik);
		}
	}
	else {
			var permalink = 'chrome://digitalpalireader/content/bottom.htm' + '?atth='+x+','+type+','+nik;
		openDPRTab('DPRm',permalink);
	}	
}


function sendTitle(x,m,a,t,nik,add) {
	if(!add) { // reuse old tab
		var oldTab = findDPRTab('DPR-main');

		if (!oldTab) {
			var permalink = 'chrome://digitalpalireader/content/bottom.htm' + '?title='+x+','+m+','+a+','+t+','+nik;
			openDPRTab('DPR-main',permalink);
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentDocument.getElementById('dpr-index-bottom').contentWindow.wrappedJSObject.getTitleXML(x,m,a,t,nik);
		}
	}
	else {
			var permalink = 'chrome://digitalpalireader/content/bottom.htm' + '?title='+x+','+m+','+a+','+t+','+nik;
		openDPRTab('DPRm',permalink);
	}	
}





function sendUpdateBookmarks() {
	var oldTab = findDPRTab('DPR-bm');
	if (oldTab) {
		var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
		oldTabBrowser.contentWindow.bookmarkframe();
	}
}

var G_lastcolour = 0;

function sendAnalysisToOutput(input, divclicked, frombox, add){

	if(divclicked) divclicked = 'W'+divclicked;
	if (divclicked && document.getElementById(divclicked))
	{
		if (document.getElementById(G_lastcolour))
		{
			document.getElementById(G_lastcolour).style.color = G_prefs['coltext'];
			document.getElementById(G_lastcolour).style.fontWeight = 'normal';
		}
		document.getElementById(divclicked).style.color = G_prefs['colsel'];
		document.getElementById(divclicked).style.fontWeight = 'bold';
		G_lastcolour = divclicked;
	}
	if(!add) { // reuse old tab
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
		var permalink = 'chrome://digitalpalireader/content/index.xul' + '?analysis='+toVel(input)+'&frombox='+frombox;
		openDPRTab(permalink,'DPRm');
	}	
}
