function importXML(labelsearch,para,isPL,add,scroll) {

	var nikaya = document.getElementById('set').value;
	var bookno = document.getElementById('book').selectedIndex;
	var meta = document.getElementById('meta').selectedIndex;
	var volume = document.getElementById('volume').selectedIndex;
	var vagga = document.getElementById('vagga').selectedIndex;
	var sutta = document.getElementById('sutta').selectedIndex;
	var section = document.getElementById('section').selectedIndex;	

	if (G_hier == 't' && limitt()) { 
		alertFlash('Ṭīkā not available for ' + G_nikLongName[document.getElementById('set').value]+'.','RGBa(255,0,0,0.8)');
		return; 
	}
	if (G_hier == 'a' && place[0] == 'g') {
		alertFlash('Atthakatha not available for grammar.','RGBa(255,0,0,0.8)');
		return;
	}		
	if (G_hier == 'a' && place[0] == 'b') {
		alertFlash('Atthakatha not available for Abhidh-s.','RGBa(255,0,0,0.8)');
		return;
	}		



	if(!add) { // reuse old tab
		var thisTab = isDPRTab('DPRm');
		if(thisTab) {  
			var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
			thisTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.loadXMLSection(labelsearch,para,[nikaya,bookno,meta,volume,vagga,sutta,section,G_hier]);
			return;
		}
		var oldTab = findDPRTab('DPR-main');
		if (!oldTab) {
			var permalink = 'chrome://digitalpalireader/content/index.htm' + '?loc='+nikaya+'.'+bookno+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+G_hier+(labelsearch ? '&query=' + toVel(labelsearch.join('+')).replace(/ /g, '_') : '')+(para ? '&para=' + para : '')+(scroll ? '&scroll=' + scroll : '');
			openDPRTab('DPR-main',permalink);
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.loadXMLSection(labelsearch,para,[nikaya,bookno,meta,volume,vagga,sutta,section,G_hier]);
		}
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/index.htm' + '?loc='+nikaya+'.'+bookno+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+G_hier+(labelsearch ? '&query=' + toVel(labelsearch.join('+')).replace(/ /g, '_') : '')+(para ? '&para=' + para : '')+(scroll ? '&scroll=' + scroll : '');
		openDPRTab('DPRm',permalink);
	}

}

	
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
			var permalink = 'chrome://digitalpalireader/content/index.htm' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + toVel(stringra.join('+')).replace(/ /g, '_') : '')+(para ? '&para=' + (para+1) : '');
			openDPRTab('DPR-main',permalink);
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.loadXMLSection(stringra,para,[nikaya,book,meta,volume,vagga,sutta,section,hiert]);
		}
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/index.htm' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + toVel(stringra.join('+')).replace(/ /g, '_') : '')+(para ? '&para=' + (para+1) : '');
		openDPRTab('DPRm',permalink);
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
			var permalink = 'chrome://digitalpalireader/content/index.htm' + '?loc='+nikaya+'.'+bookno+'.'+G_hier;
			openDPRTab('DPR-main',permalink);
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.loadXMLindex([nikaya,bookno,G_hier]);
		}
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/index.htm' + '?loc='+nikaya+'.'+bookno+'.'+G_hier;
		openDPRTab('DPRm',permalink);
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




function openBookmarkFrame() {
	var oldTab = findDPRTab('DPR-bm');
	if (!oldTab) {
	var permalink = 'chrome://digitalpalireader/content/bookmarks.htm';
		openDPRTab(permalink,'DPR-bm');
	}
	else {
		mainWindow.gBrowser.selectedTab = oldTab;
		var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
		oldTabBrowser.contentWindow.bookmarkframe();
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
			var permalink = 'chrome://digitalpalireader/content/bottom.htm' + '?analysis='+toVel(input)+'&options='+frombox;
			openDPRTab('DPR-main',permalink);
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentDocument.getElementById('dpr-index-bottom').contentWindow.wrappedJSObject.outputAnalysis(input,frombox);
		}
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/bottom.htm' + '?analysis='+toVel(input)+'&frombox='+frombox;
		openDPRTab('DPRm',permalink);
	}	
}
