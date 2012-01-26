function eventSend(event,internal) {
	
	if(!event) return;
	if(event.ctrlKey || event.which == 2) return true;
	if(event.shiftKey) return 'shift';
	if(event.which == 1 && internal) return 'internal';
	if (event.which == 1) return false;
	return 'right';
}

	
function openPlace([nikaya,book,meta,volume,vagga,sutta,section,hiert,alt],para,stringra,add,compare)
{
	if(add == 'right') return;
	if (typeof(stringra) == 'string') {
		stringra = stringra.replace(/`/g, '"');
		stringra=toUni(stringra);
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
			var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + toVel(stringra.join('+')) : '')+(para ? '&para=' + para : '')+(alt ? '&alt='+alt : '');
			openDPRTab(permalink,'DPR-main');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.loadXMLSection(stringra,para,[nikaya,book,meta,volume,vagga,sutta,section,hiert,alt]);
		}
		return;
	}
	else if (add == 'internal') {
		loadXMLSection(stringra,para,[nikaya,book,meta,volume,vagga,sutta,section,hiert,alt],null,null,compare);
	}
	else if (add == 'shift') {
		if (window.getSelection)
			window.getSelection().removeAllRanges();
		var thisTab = isDPRTab('DPRm');
		if(thisTab) {  
			var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
			var elem = thisTabBrowser.contentDocument.getElementById('dpr-tops');
			var count = getBrowserCount();
			var permalink = 'chrome://digitalpalireader/content/top.htm' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + toVel(stringra.join('+')) : '')+(para ? '&para=' + para : '')+(alt ? '&alt='+alt : '')+'&compare='+count;
			
			var node = createBrowser(thisTabBrowser.contentDocument,permalink,count);

			elem.appendChild(node);
			return;
		}
		var oldTab = findDPRTab('DPR-main');
		if (!oldTab) {		
			var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + toVel(stringra.join('+')) : '')+(para ? '&para=' + para : '')+(alt ? '&alt='+alt : '');
			openDPRTab(permalink,'DPR-main');
			return;
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			var elem = oldTabBrowser.contentDocument.getElementById('dpr-tops');
			var count = getBrowserCount();
			var permalink = 'chrome://digitalpalireader/content/top.htm' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + toVel(stringra.join('+')) : '')+(para ? '&para=' + para : '')+(alt ? '&alt='+alt : '')+'&compare='+count;

			var node = createBrowser(oldTabBrowser.contentDocument,permalink,count);
			var splitter = createSplitter(oldTabBrowser.contentDocument,count);

			elem.appendChild(splitter);
			elem.appendChild(node);
			return;
		}
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + toVel(stringra.join('+')) : '')+(para ? '&para=' + para : '')+(alt ? '&alt='+alt : '');
		openDPRTab(permalink,'DPRm');
	}
}


function openXMLindex(nikaya,bookno,hier,add) {

	if(!add) { // reuse old tab
		var thisTab = isDPRTab('DPRm');
		if(thisTab) {  
			var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
			thisTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.loadXMLindex([nikaya,bookno,hier]);
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
			oldTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.loadXMLindex([nikaya,bookno,hier]);
		}
	}
	else if (add == 'internal') {
		loadXMLindex([nikaya,bookno,hier]);
	}
	else if (add == 'shift') {
		if (window.getSelection)
			window.getSelection().removeAllRanges();

		var thisTab = isDPRTab('DPRm');
		if(thisTab) {  
			var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
			var elem = thisTabBrowser.contentDocument.getElementById('dpr-tops');
			var count = getBrowserCount();
			var permalink = 'chrome://digitalpalireader/content/top.htm?loc='+nikaya+'.'+bookno+'.'+hier+'&compare='+count;
			
			var node = createBrowser(thisTabBrowser.contentDocument,permalink,count);

			elem.appendChild(node);
			return;
		}
		var oldTab = findDPRTab('DPR-main');
		if (!oldTab) {		
			var permalink = 'chrome://digitalpalireader/content/index.xul?loc='+nikaya+'.'+bookno+'.'+hier;
			openDPRTab(permalink,'DPR-main');
			return;
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			var elem = oldTabBrowser.contentDocument.getElementById('dpr-tops');
			var count = getBrowserCount();
			var permalink = 'chrome://digitalpalireader/content/top.htm?loc='+nikaya+'.'+bookno+'.'+hier+'&compare='+count;

			var node = createBrowser(oldTabBrowser.contentDocument,permalink,count);
			var splitter = createSplitter(oldTabBrowser.contentDocument,count);

			elem.appendChild(splitter);
			elem.appendChild(node);
			return;
		}
	}
	else if(add != 'right'){
		var permalink = 'chrome://digitalpalireader/content/index.xul?loc='+nikaya+'.'+bookno+'.'+hier;
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
	else if(add != 'right') {
		var permalink = 'chrome://digitalpalireader/content/index.xul?loc='+nikaya+'.'+bookno+'.'+G_hier;
		openDPRTab(permalink,'DPRm');
	}
}

function sendPaliXML(link,add) {
	if(!add) { // reuse old tab
		var oldTab = findDPRTab('DPR-main');

		if (!oldTab) {
            var permalink = 'chrome://digitalpalireader/content/dict.htm?type=PED&opts=xv,xd,xm,xs,xa,xk,xy,mm,ma,mt,sw,hd&query='+link;
			openDPRTab(permalink,'DPRd');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentDocument.getElementById('dpr-index-bottom').contentWindow.wrappedJSObject.paliXML(link);
		}
	}
	else {
        var permalink = 'chrome://digitalpalireader/content/dict.htm?type=PED&opts=xv,xd,xm,xs,xa,xk,xy,mm,ma,mt,sw,hd&query='+link;
		openDPRTab(permalink,'DPRd');
	}	
}

function sendDPPNXML(link,add) {
	if(!add) { // reuse old tab
		var oldTab = findDPRTab('DPR-main');

		if (!oldTab) {
            var permalink = 'chrome://digitalpalireader/content/dict.htm?type=DPPN&opts=xv,xd,xm,xs,xa,xk,xy,mm,ma,mt,sw,hd&query='+toVel(link);
			openDPRTab(permalink,'DPRd');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentDocument.getElementById('dpr-index-bottom').contentWindow.wrappedJSObject.DPPNXML(link);
		}
	}
	else {
        var permalink = 'chrome://digitalpalireader/content/dict.htm?type=DPPN&opts=xv,xd,xm,xs,xa,xk,xy,mm,ma,mt,sw,hd&query='+toVel(link);
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





function sendPlace(place) {
	var sidebar = DPRSidebarWindow();
	if (sidebar) {
		sidebar.DPRNav.gotoPlace(place);
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
			document.getElementById(G_lastcolour).style.textDecoration = 'none';
		}
		document.getElementById(divclicked).style.color = DPR_prefs['colsel'];
		document.getElementById(divclicked).style.textDecoration = 'underline';
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

function openTranslation(url,add) {
	if(add == 'right') return;
	else if (add == 'shift') {
		if (window.getSelection)
			window.getSelection().removeAllRanges();
		var thisTab = isDPRTab('DPRm');
		if(thisTab) {  
			var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
			var doc = thisTabBrowser.contentDocument;
			var elem = doc.getElementById('dpr-tops');
			var count = getBrowserCount();
			var node = createBrowser(doc,url,count);
			elem.appendChild(node);
			return;
		}
		var oldTab = findDPRTab('DPR-main');
		if (!oldTab) {		
			window.open(url);
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			var doc = oldTabBrowser.contentDocument;
			var elem = doc.getElementById('dpr-tops');
			var count = getBrowserCount();
			var node = createBrowser(doc,url,count,true);
			var splitter = createSplitter(doc,count);

			elem.appendChild(splitter);
			elem.appendChild(node);
			
			return;
		}
	}
	else window.open(url);
}

function createBrowser(thisDocument,url,count,close){
	
	var browser = thisDocument.createElement('browser');
	browser.setAttribute('id','dpr-index-top-'+count);
	browser.setAttribute('disablehistory','true');
	browser.setAttribute('type','content');
	browser.setAttribute('src',url);
	browser.setAttribute('style','max-height:99%');
	browser.setAttribute('flex','1');
	browser.setAttribute('persist','height');
		
	if(close) {
		var subnode = thisDocument.createElement('vbox');
		subnode.setAttribute('id','dpr-index-top-'+count+'-sub');
		subnode.setAttribute('flex','1');
		var tab = thisDocument.createElement('tab');
		tab.setAttribute('label','x');
		tab.setAttribute('tooltiptext','close panel');
		tab.setAttribute('oncommand','this.parentNode.parentNode.removeChild(this.parentNode)');
		subnode.appendChild(tab);
		subnode.appendChild(browser);
		return subnode;
	}
	
	return browser;
}

function createSplitter(thisDocument,count){
	var splitter = thisDocument.createElement('splitter');
	splitter.setAttribute('id','dpr-index-top-'+count+'-splitter');
	return splitter;
}

function addToolbar(doc,count) {
	var bar = doc.createElement('div');
	bar.innerHTML = 'sfad dfas dfas dfas dfas dfasdfas';
	return bar;
}


function getBrowserCount() {
	var count = mainWindow.gBrowser.getBrowserForTab(mainWindow.gBrowser.selectedTab).contentWindow.wrappedJSObject.G_count_browsers++;
	return count;
}
