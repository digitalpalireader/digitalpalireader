
function eventSend(event,internal) {
	
	if(!event) return;
	if(event.ctrlKey || event.which == 2) return true;
	if(event.shiftKey) return 'shift';
	if((event.which == 1 || event.charCode) && internal) return 'internal';
	if (event.which == 1) return false;
	return 'right';
}

	
function openPlace([nikaya,book,meta,volume,vagga,sutta,section,hiert,alt],para,stringra,add)
{
	if(add == 'right') return;

	if(!add) { // reuse old tab
		var thisTab = isDPRTab('DPRm');
		if(thisTab) {  
			var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
			thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.loadXMLSection(stringra,para,[nikaya,book,meta,volume,vagga,sutta,section,hiert,alt]);
			return;
		}
		var oldTab = findDPRTab('DPR-main');
		if (!oldTab) {		
			var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + stringra : '')+(para ? '&para=' + para : '')+(alt ? '&alt='+alt : '');
			openDPRTab(permalink,'DPR-main');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.loadXMLSection(stringra,para,[nikaya,book,meta,volume,vagga,sutta,section,hiert,alt]);
		}
	}
	else if (add == 'internal') {
		loadXMLSection(stringra,para,[nikaya,book,meta,volume,vagga,sutta,section,hiert,alt],null,null);
	}
	else if (add == 'shift') {
		if (window.getSelection)
			window.getSelection().removeAllRanges();
		var thisTab = isDPRTab('DPRm');
		if(thisTab) { 
			var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
			var elem = thisTabBrowser.contentDocument.getElementById('dpr-tops');
			var count = getBrowserCount()+1;
			var permalink = 'chrome://digitalpalireader/content/top.htm' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + stringra : '')+(para ? '&para=' + para : '')+(alt ? '&alt='+alt : '');
			
			var node = createBrowser(thisTabBrowser.contentDocument,permalink,count);

			elem.appendChild(node);
			return;
		}
		var oldTab = findDPRTab('DPR-main');
		if (!oldTab) {		
			var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + stringra : '')+(para ? '&para=' + para : '')+(alt ? '&alt='+alt : '');
			openDPRTab(permalink,'DPR-main');
			return;
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			var elem = oldTabBrowser.contentDocument.getElementById('dpr-tops');
			var count = getBrowserCount()+1;
			var permalink = 'chrome://digitalpalireader/content/top.htm' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + stringra : '')+(para ? '&para=' + para : '')+(alt ? '&alt='+alt : '');

			var node = createBrowser(oldTabBrowser.contentDocument,permalink,count);
			var splitter = createSplitter(oldTabBrowser.contentDocument,count);

			elem.appendChild(splitter);
			elem.appendChild(node);
			return;
		}
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + stringra : '')+(para ? '&para=' + para : '')+(alt ? '&alt='+alt : '');
		openDPRTab(permalink,'DPRm');
	}
}


function openXMLindex(nikaya,bookno,hier,add) {

	if(!add) { // reuse old tab
		var thisTab = isDPRTab('DPRm');
		if(thisTab) {  
			var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
			thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.loadXMLindex([nikaya,bookno,hier]);
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
			oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.loadXMLindex([nikaya,bookno,hier]);
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
			var count = getBrowserCount()+1;
			var permalink = 'chrome://digitalpalireader/content/top.htm?loc='+nikaya+'.'+bookno+'.'+hier;
			
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
			var count = getBrowserCount()+1;
			var permalink = 'chrome://digitalpalireader/content/top.htm?loc='+nikaya+'.'+bookno+'.'+hier;

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
			thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.loadXMLindex([nikaya,bookno,G_hier]);
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
			oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.loadXMLindex([nikaya,bookno,G_hier]);
		}
	}
	else if(add != 'right') {
		var permalink = 'chrome://digitalpalireader/content/index.xul?loc='+nikaya+'.'+bookno+'.'+G_hier;
		openDPRTab(permalink,'DPRm');
	}
}

function sendPaliXML(link,add) {
	if(!add) { // reuse old tab
		var thisTab = isDPRTab('DPRm');
		if(thisTab) {  
			mainWindow.gBrowser.getBrowserForTab(thisTab).contentWindow.paliXML(link);
			return;
		}
		var oldTab = findDPRTab('DPR-main');

		if (!oldTab) {
            var permalink = 'chrome://digitalpalireader/content/dict.htm?type=PED&opts=xv,xd,xm,xs,xa,xk,xy,mm,ma,mt,sw,hd&query='+link;
			openDPRTab(permalink,'DPRd');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			oldTabBrowser.contentWindow.paliXML(link);
		}
	}
	else if(add!='right') {
        var permalink = 'chrome://digitalpalireader/content/dict.htm?type=PED&opts=xv,xd,xm,xs,xa,xk,xy,mm,ma,mt,sw,hd&query='+link;
		openDPRTab(permalink,'DPRd');
	}	
}

function sendDPPNXML(link,add) {
	if(!add) { // reuse old tab
		var thisTab = isDPRTab('DPRm');
		if(thisTab) {  
			mainWindow.gBrowser.getBrowserForTab(thisTab).contentWindow.DPPNXML(link);
			return;
		}
		var oldTab = findDPRTab('DPR-main');

		if (!oldTab) {
            var permalink = 'chrome://digitalpalireader/content/dict.htm?type=DPPN&opts=xv,xd,xm,xs,xa,xk,xy,mm,ma,mt,sw,hd&query='+toVel(link);
			openDPRTab(permalink,'DPRd');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			mainWindow.gBrowser.getBrowserForTab(oldTab).contentWindow.DPPNXML(link);
		}
	}
	else if(add!='right') {
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
			mainWindow.gBrowser.getBrowserForTab(oldTab).contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.getAtthXML(x,type,nik);
		}
	}
	else if(add!='right'){
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
			oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.getTitleXML(x,m,a,t,nik);
		}
	}
	else if(add!='right') {
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
	if(window.getSelection().toString()) 
		return;
	
	if(divclicked) {
		divclicked = 'W'+divclicked;
		var cdiv = document.getElementById(divclicked);

		if (cdiv)
		{
			var ldiv = document.getElementById(G_lastcolour);
			if (ldiv)
			{
				var lcn = ldiv.className;
				if(/varc/.test(lcn))
					ldiv.style.color = DPR_prefs['grey'];
				else
					ldiv.style.color = DPR_prefs['coltext'];
				ldiv.style.textDecoration = 'none';
			}
			cdiv.style.color = DPR_prefs['colsel'];
			cdiv.style.textDecoration = 'underline';
			G_lastcolour = divclicked;
		}
	}
	if(add != true) { // reuse old tab
		var thisTab = isDPRTab('DPRm');
		if(thisTab) {  
			var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
			thisTabBrowser.contentWindow.outputAnalysis(input,frombox);
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
			oldTabBrowser.contentWindow.outputAnalysis(input,frombox);
		}
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/bottom.htm' + '?analysis='+toVel(input)+'&frombox='+frombox;
		openDPRTab(permalink,'DPRx');
	}	
}

function sendTranslate(input, add){
	
	if(add == 'right') return;

	if(add != true) { // reuse old tab
		var thisTab = isDPRTab('DPRm');
		if(thisTab) {  
			var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
			thisTabBrowser.contentWindow.getTranslate(input);
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
			oldTabBrowser.contentWindow.getTranslate(input);
		}
	}
	else {
		var permalink = 'chrome://digitalpalireader/content/translate.htm' + '?phrase='+toVel(input);
		openDPRTab(permalink,'DPRx');
	}	
}


function openTranslation(url,add) {
	if(add == 'right') return;
	
	if (add == 'shift') {
		url = 'chrome://digitalpalireader/content/ati.xul?ati='+url;
		if (window.getSelection)
			window.getSelection().removeAllRanges();
		var thisTab = isDPRTab('DPRm');
		if(thisTab) {  
			var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
			var doc = thisTabBrowser.contentDocument;
			var elem = doc.getElementById('dpr-tops');
			var count = getBrowserCount()+1;
			var node = createBrowser(doc,url,count);
			elem.appendChild(node);
			return;
		}
		var oldTab = findDPRTab('DPR-main');
		if (!oldTab) {		
			openDPRTab(url,'DPRx');
		}
		else {
			mainWindow.gBrowser.selectedTab = oldTab;
			var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
			var doc = oldTabBrowser.contentDocument;
			var elem = doc.getElementById('dpr-tops');
			var count = getBrowserCount()+1;
			var node = createBrowser(doc,url,count);
			var splitter = createSplitter(doc,count);

			elem.appendChild(splitter);
			elem.appendChild(node);
			
			return;
		}
	}
	else {
		if(!/^http/.test(url))
			url = (DPR_prefs['catioff'] ? 'file://'+DPR_prefs['catiloc'].replace(/\\/g,'/')+'/html/tipitaka/' : 'http://www.accesstoinsight.org/tipitaka/')+url;

		openDPRTab(url,'DPRx');
	}
}

function createBrowser(thisDocument,url,count){
	
	var browser = thisDocument.createElement('browser');
	browser.setAttribute('disablehistory','true');
	browser.setAttribute('type','content');
	browser.setAttribute('src',url);
	browser.setAttribute('style','max-height:99%');
	browser.setAttribute('flex','1');
	browser.setAttribute('persist','height');
		
	return browser;
}

function createSplitter(thisDocument,count){
	var splitter = thisDocument.createElement('splitter');
	return splitter;
}


function getBrowserCount() {
	return mainWindow.gBrowser.selectedTab.linkedBrowser.contentWindow.getBrowserCount();
}
function reindexPanels() {
	return mainWindow.gBrowser.selectedTab.linkedBrowser.contentWindow.reindexPanels();
}

function closePanel() {
	var cW = mainWindow.gBrowser.selectedTab.linkedBrowser.contentWindow;
	var cD = mainWindow.gBrowser.selectedTab.linkedBrowser.contentDocument;
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
	var params = url[1];
	
	var bottom = [];
	
	if(/analysis=/.test(params)) {
		bottom.push(/(analysis=[^&]+)/.exec(params)[0]);
	}
	if(/ped=/.test(params)) {
		bottom.push(/(ped=[^&]+)/.exec(params)[0]);
	}
	if(/dppn=/.test(params)) {
		bottom.push(/(dppn=[^&]+)/.exec(params)[0]);
	}
	if(/frombox=/.test(params)) {
		bottom.push(/(frombox=[^&]+)/.exec(params)[0]);
	}
	params = params.replace(/\&*(analysis|ped|dppn|frombox)=[^&]+/g,'').replace(/^\&/g,'');

	
	var panels = params.split('|');
	panels.splice(G_compare-1,1);
	panels = panels.join('|');
	url[1] = panels;
	var newurl = url.join('?').replace(/\?$/,'') + (bottom?'&' + bottom.join('&'):'');
	cW.history.replaceState({}, 'Title', newurl);

	elem.removeChild(elem.getElementsByTagName('splitter')[G_compare-1]);
	elem.removeChild(browsers[G_compare-1]);
	
	// collapse first splitter
	
	elem.getElementsByTagName('splitter')[0].setAttribute('collapsed','true');
}