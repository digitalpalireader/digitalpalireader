function importXML(labelsearch,para,isPL,add) {

	var nikaya = document.form.nik.value;
	var bookno = document.form.book.selectedIndex;
	var meta = document.form.meta.selectedIndex;
	var volume = document.form.volume.selectedIndex;
	var vagga = document.form.vagga.selectedIndex;
	var sutta = document.form.sutta.selectedIndex;
	var section = document.form.section.selectedIndex;	

	if(!add) { // reuse old tab
		var thisTab = isDPRTab('DPRm');
		if(thisTab) {  
			var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
			thisTabBrowser.contentWindow.wrappedJSObject.loadXMLSection(labelsearch,para,[nikaya,bookno,meta,volume,vagga,sutta,section,hier]);
			return;
		}
		var oldTab = findDPRTab('DPR-main');
		if (!oldTab) {
			var permalink = 'chrome://digitalpalireader/content/index.htm' + '?loc='+nikaya+'.'+bookno+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hier+(labelsearch ? '&query=' + toVel(labelsearch.join('+')).replace(/ /g, '_') : '')+(para ? '&para=' + para : '');
			openDPRTab(permalink,'DPR-main');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentWindow.wrappedJSObject.loadXMLSection(labelsearch,para,[nikaya,bookno,meta,volume,vagga,sutta,section,hier]);
		}
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/index.htm' + '?loc='+nikaya+'.'+bookno+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hier+(labelsearch ? '&query=' + toVel(labelsearch.join('+')).replace(/ /g, '_') : '')+(para ? '&para=' + para : '');
		openDPRTab(permalink,'DPRm');
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
			thisTabBrowser.contentWindow.wrappedJSObject.loadXMLSection(stringra,para,[nikaya,book,meta,volume,vagga,sutta,section,hiert]);
			return;
		}
		var oldTab = findDPRTab('DPR-main');
		if (!oldTab) {		
			var permalink = 'chrome://digitalpalireader/content/index.htm' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + toVel(stringra.join('+')).replace(/ /g, '_') : '')+(para ? '&para=' + (para+1) : '');
			openDPRTab(permalink,'DPR-main');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentWindow.wrappedJSObject.loadXMLSection(stringra,para,[nikaya,book,meta,volume,vagga,sutta,section,hiert]);
		}
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/index.htm' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + toVel(stringra.join('+')).replace(/ /g, '_') : '')+(para ? '&para=' + (para+1) : '');
		openDPRTab(permalink,'DPRm');
	}
}


function importXMLindex(add) {

	var nikaya = document.form.nik.value;
	var bookno = document.form.book.selectedIndex;

	if(!add) { // reuse old tab
		var thisTab = isDPRTab('DPRm');
		if(thisTab) {  
			var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
			thisTabBrowser.contentWindow.wrappedJSObject.loadXMLindex([nikaya,bookno,hier]);
			return;
		}
		var oldTab = findDPRTab('DPR-main');

		if (!oldTab) {
			var permalink = 'chrome://digitalpalireader/content/index.htm' + '?loc='+nikaya+'.'+bookno+'.'+hier;
			openDPRTab(permalink,'DPR-main');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentWindow.wrappedJSObject.loadXMLindex([nikaya,bookno,hier]);
		}
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/index.htm' + '?loc='+nikaya+'.'+bookno+'.'+hier;
		openDPRTab(permalink,'DPRm');
	}
}

function sendTextToAnalyze(text,frombox,add) {
	if(!add) { // reuse old tab
		var thisTab = isDPRTab('DPRm');
		if(thisTab) {  
			var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
			thisTabBrowser.contentWindow.wrappedJSObject.sendAnalysisToOutput(text,0,frombox);
			return;
		}
		var oldTab = findDPRTab('DPR-main');

		if (!oldTab) {
			var permalink = 'chrome://digitalpalireader/content/index.htm' + '?parse='+text;
			openDPRTab(permalink,'DPR-main');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentWindow.wrappedJSObject.sendAnalysisToOutput(text,0,frombox);
		}
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/index.htm' + '?parse='+text;
		openDPRTab(permalink,'DPRm');
	}	
}


function sendPaliXML(link,add) {
	if(!add) { // reuse old tab
		var oldTab = findDPRTab('DPR-main');

		if (!oldTab) {
			var permalink = 'chrome://digitalpalireader/content/index.htm' + '?ped='+link.join(',');
			openDPRTab(permalink,'DPR-main');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentWindow.wrappedJSObject.paliXML(link[0]+'/'+link[1]+'/'+link[2]+','+link[3]);
		}
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/index.htm' + '?ped='+link.join(',');
		openDPRTab(permalink,'DPRm');
	}	
}

function sendDPPNXML(link,add) {
	if(!add) { // reuse old tab
		var oldTab = findDPRTab('DPR-main');

		if (!oldTab) {
			var permalink = 'chrome://digitalpalireader/content/index.htm' + '?dppn='+link.join(',');
			openDPRTab(permalink,'DPR-main');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentWindow.wrappedJSObject.DPPNXML(link[0]+'/'+link[1]+'/'+link[2]+','+link[3]);
		}
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/index.htm' + '?dppn='+link.join(',');
		openDPRTab(permalink,'DPRm');
	}	
}

function sendAtt(x,type,nik,add) {
	if(!add) { // reuse old tab
		var oldTab = findDPRTab('DPR-main');

		if (!oldTab) {
			var permalink = 'chrome://digitalpalireader/content/index.htm' + '?atth='+x+','+type+','+nik;
			openDPRTab(permalink,'DPR-main');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentWindow.wrappedJSObject.getAtthXML(x,type,nik);
		}
	}
	else {
			var permalink = 'chrome://digitalpalireader/content/index.htm' + '?atth='+x+','+type+','+nik;
		openDPRTab(permalink,'DPRm');
	}	
}


function sendTitle(x,m,a,t,nik,add) {
	if(!add) { // reuse old tab
		var oldTab = findDPRTab('DPR-main');

		if (!oldTab) {
			var permalink = 'chrome://digitalpalireader/content/index.htm' + '?title='+x+','+m+','+a+','+t+','+nik;
			openDPRTab(permalink,'DPR-main');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentWindow.wrappedJSObject.getTitleXML(x,m,a,t,nik);
		}
	}
	else {
			var permalink = 'chrome://digitalpalireader/content/index.htm' + '?title='+x+','+m+','+a+','+t+','+nik;
		openDPRTab(permalink,'DPRm');
	}	
}


function sendDict(hard,add) {
	var which = document.form.sped.value;
	
	var getstring = document.form.dictin.value;
	document.form.manual.value = toVel(document.form.dictin.value).toLowerCase();

	if (which == 'DPR') {
		var text = document.form.manual.value;
		sendTextToAnalyze(text,(hard ? null : 1));
		return;
	}
	
	var opts = []; 
	
	for (i in G_nikToNumber) {
		if(document.getElementById('soNS'+i) && document.getElementById('soNS'+i).checked) opts.push('x'+i);
	} 
	for (i in G_hNumbers) {
		if(document.getElementById('soMAT'+i).checked) opts.push('m'+i);
	} 

	if(document.form.soregexp.checked) opts.push('rx');
	if(document.form.sofuzzy.checked) opts.push('fz');
	if(document.form.sofulltext.checked) opts.push('ft');
	if(document.form.sostartword.checked) opts.push('sw');
	if(hard) opts.push('hd');

	if(!add) { // reuse old tab
		var oldTab = findDPRTab('DPR-dict');
		if (!oldTab) {
		var permalink = 'chrome://digitalpalireader/content/dict.htm' + '?type='+ which + '&query=' + document.form.manual.value + '&opts=' + opts.join(',');
			openDPRTab(permalink,'DPR-dict');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentWindow.wrappedJSObject.startDictLookup(which,document.form.manual.value,opts);
		}
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/index.htm' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + toVel(stringra.join('+')).replace(/ /g, '_') : '')+(tmp ? '&para=' + (para+1) : '');
		openDPRTab(permalink,'DPRd');
	}

}


function sendSearch(add) {

	if(!checkGetstring(document.form.isearch.value)) return;
	
	var which = document.getElementById('tipType').selectedIndex;
	
	if(which == 3 || which == 6 || which == 10 || which == 13) return;
	
	if(which == 15) { // Dev
		DevInput(document.form.isearch.value);
		return;
	}


	// get options
	
	if(which > 6) {
		var MAT = (document.getElementById('tsoMATm').checked ? 'm' : '') + (document.getElementById('tsoMATa').checked ? 'a' : '') + (document.getElementById('tsoMATt').checked ? 't' : '');
	}
	else var MAT = hier;

	if(which == 0 || which == 4 || which == 7 || which == 11) {
		var set = ''
		for (i in G_nikToNumber) {
			if(document.getElementById('tsoCO'+i).checked) set += i;
		}
	}
	else var set = document.form.nik.value;
	
	if(which == 5 || which == 12) {
		var book = [];
		for (i = 0; i < nikvoladi[document.form.nik.value]; i++) {
			if(document.getElementById('tsoBObook' + i).checked) book.push(i);
		}
		book = book.join(',');
	}
	else book = document.form.book.value;

	document.form.usearch.value = toUni(document.form.isearch.value).toLowerCase(); 

	var rx = document.form.tsoregexp.checked;

	if(!add) { // reuse old tab
		var oldTab = findDPRTab('DPR-search');

		if (!oldTab) {
			var permalink = 'chrome://digitalpalireader/content/search.htm' + '?type='+which+'&query=' + toVel(document.form.isearch.value).toLowerCase() + '&MAT=' + MAT + '&set=' + set + '&book=' + book + '&rx=' + rx;
			openDPRTab(permalink,'DPR-search');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentWindow.wrappedJSObject.searchTipitaka(which,toVel(document.form.isearch.value).toLowerCase(),MAT,set,book,rx,1);
		}
	}
	else {
	var permalink = 'chrome://digitalpalireader/content/search.htm' + '?type='+which+'&query=' + toVel(document.form.isearch.value).toLowerCase() + '&MAT=' + MAT + '&set=' + set + '&book=' + book + '&rx=' + rx;
		openDPRTab(permalink,'DPRs');
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

