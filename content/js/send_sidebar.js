
var DPRSend = {

	eventSend: function (event) {
		if(event.ctrlKey || event.button == 1) return true;
		return false;
	},

	importXML:function(labelsearch,para,isPL,add,scroll) {

		var nikaya = document.getElementById('set').value;
		var bookno = document.getElementById('book').selectedIndex;
		var meta = document.getElementById('meta').selectedIndex;
		var volume = document.getElementById('volume').selectedIndex;
		var vagga = document.getElementById('vagga').selectedIndex;
		var sutta = document.getElementById('sutta').selectedIndex;
		var section = document.getElementById('section').selectedIndex;	

		if (G_hier == 't' && DPRNav.limitt()) { 
			alertFlash('Ṭīkā not available for ' + G_nikLongName[document.getElementById('set').value]+'.','RGBa(255,0,0,0.8)');
			return; 
		}
		if (G_hier == 'a' && nikaya == 'g') {
			alertFlash('Atthakatha not available for grammar.','RGBa(255,0,0,0.8)');
			return;
		}		
		if (G_hier == 'a' && nikaya == 'b') {
			alertFlash('Atthakatha not available for Abhidh-s.','RGBa(255,0,0,0.8)');
			return;
		}		



		if(!add) { // reuse old tab
			var thisTab = DPRChrome.isThisDPRTab('DPRm');
			if(thisTab) {  
				var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
				thisTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.loadXMLSection(labelsearch,para,[nikaya,bookno,meta,volume,vagga,sutta,section,G_hier]);
				return;
			}
			var oldTab = DPRChrome.findDPRTab('DPR-main');
			if (!oldTab) {
				var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+bookno+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+G_hier+(labelsearch ? '&query=' + toVel(labelsearch.join('+')).replace(/ /g, '_') : '')+(para ? '&para=' + para : '')+(scroll ? '&scroll=' + scroll : '');
				DPRChrome.openDPRTab(permalink,'DPR-main');
			}
			else {
				mainWindow.gBrowser.selectedTab = oldTab;
				var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
				oldTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.loadXMLSection(labelsearch,para,[nikaya,bookno,meta,volume,vagga,sutta,section,G_hier]);
			}
		}
		else {
			var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+bookno+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+G_hier+(labelsearch ? '&query=' + toVel(labelsearch.join('+')).replace(/ /g, '_') : '')+(para ? '&para=' + para : '')+(scroll ? '&scroll=' + scroll : '');
			DPRChrome.openDPRTab(permalink,'DPRm');
		}

	},

	importXMLindex:function(add) {

		var nikaya = document.getElementById('set').value;
		var bookno = document.getElementById('book').selectedIndex;

		if(!add) { // reuse old tab
			var thisTab = DPRChrome.isThisDPRTab('DPRm');
			if(thisTab) {  
				var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
				thisTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.loadXMLindex([nikaya,bookno,G_hier]);
				return;
			}
			var oldTab = DPRChrome.findDPRTab('DPR-main');

			if (!oldTab) {
				var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+bookno+'.'+G_hier;
				DPRChrome.openDPRTab(permalink,'DPR-main');
			}
			else {
				mainWindow.gBrowser.selectedTab = oldTab;
				var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
				oldTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.loadXMLindex([nikaya,bookno,G_hier]);
			}
		}
		else {
			var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+bookno+'.'+G_hier;
			DPRChrome.openDPRTab(permalink,'DPRm');
		}
	},

	openPlace:function([nikaya,book,meta,volume,vagga,sutta,section,hiert],para,stringra,add) {

		if (stringra) {
			stringra = stringra.replace(/`/g, '"');
			stringra = stringra.split('#');
			if(G_searchRX == 'true') {
				for (i in stringra) { stringra[i] = new RegExp(stringra[i]); }
			}
		}

		if(!add) { // reuse old tab
			var thisTab = DPRChrome.isThisDPRTab('DPRm');
			if(thisTab) {  
				var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
				thisTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.loadXMLSection(stringra,para,[nikaya,book,meta,volume,vagga,sutta,section,hiert]);
				return;
			}
			var oldTab = DPRChrome.findDPRTab('DPR-main');
			if (!oldTab) {		
				var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + toVel(stringra.join('+')).replace(/ /g, '_') : '')+(para ? '&para=' + (para+1) : '');
				DPRChrome.openDPRTab(permalink,'DPR-main');
			}
			else {
				mainWindow.gBrowser.selectedTab = oldTab;
				var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
				oldTabBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.wrappedJSObject.loadXMLSection(stringra,para,[nikaya,book,meta,volume,vagga,sutta,section,hiert]);
			}
		}
		else {
			var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + toVel(stringra.join('+')).replace(/ /g, '_') : '')+(para ? '&para=' + (para+1) : '');
			DPRChrome.openDPRTab(permalink,'DPRm');
		}
	},


	sendAnalysisToOutput: function (input, frombox, add) {

		if(!add) { // reuse old tab
			var thisTab = DPRChrome.isThisDPRTab('DPRm');
			if(thisTab) {  
				var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
				thisTabBrowser.contentDocument.getElementById('dpr-index-bottom').contentWindow.wrappedJSObject.outputAnalysis(input,frombox);
				return;
			}
			var oldTab = DPRChrome.findDPRTab('DPR-main');
			if (!oldTab) {
				var permalink = 'chrome://digitalpalireader/content/index.xul' + '?analysis='+toVel(input)+'&options='+frombox;
				DPRChrome.openDPRTab(permalink,'DPR-main');
			}
			else {
				mainWindow.gBrowser.selectedTab = oldTab;
				var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
				oldTabBrowser.contentDocument.getElementById('dpr-index-bottom').contentWindow.wrappedJSObject.outputAnalysis(input,frombox);
			}
		}
		else {
			var permalink = 'chrome://digitalpalireader/content/index.xul' + '?analysis='+toVel(input)+'&frombox='+frombox;
			DPRChrome.openDPRTab(permalink,'DPRm');
		}	
	},


	sendDict: function (hard,add) {
		var getstring = document.getElementById('dictin').value;

		if(!hard) {
			if (getstring == this.G_lastsearch || getstring == '' || !DPR_prefs['autodict'] || document.getElementById('soregexp').checked || document.getElementById('sofulltext').checked) return;
		}
		
		this.G_lastsearch = this.value;

		var which = document.getElementById('dictType').value;
		if (which == 'DPR') {
			var text = toVel(getstring);
			this.sendAnalysisToOutput(text,(hard ? 1 : 2),add);
			return;
		}
		
		var opts = []; 
		
		for (i in G_nikToNumber) {
			if(document.getElementById('soNS'+i) && document.getElementById('soNS'+i).checked) opts.push('x'+i);
		} 
		for (i in G_hNumbers) {
			if(document.getElementById('soMAT'+i).checked) opts.push('m'+i);
		} 

		if(document.getElementById('soregexp').checked) opts.push('rx');
		if(document.getElementById('sofuzzy').checked) opts.push('fz');
		if(document.getElementById('sofulltext').checked) opts.push('ft');
		if(document.getElementById('sostartword').checked) opts.push('sw');
		if(hard) opts.push('hd');

		if(!add) { // reuse old tab
			var oldTab = DPRChrome.findDPRTab('DPR-dict');
			if (!oldTab) {
			var permalink = 'chrome://digitalpalireader/content/dict.htm' + '?type='+ which + '&query=' + toVel(getstring) + '&opts=' + opts.join(',');
				DPRChrome.openDPRTab(permalink,'DPR-dict');
			}
			else {
				mainWindow.gBrowser.selectedTab = oldTab;
				var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
				oldTabBrowser.contentWindow.wrappedJSObject.startDictLookup(which,toVel(getstring),opts);
			}
		}
		else {
			var permalink = 'chrome://digitalpalireader/content/dict.htm' + '?type='+ which + '&query=' + toVel(getstring) + '&opts=' + opts.join(',');
			DPRChrome.openDPRTab(permalink,'DPRd');
		}

	},

	sendSearch: function (add) {
		var getstring = document.getElementById('isearch').value;
		if(!this.checkGetstring(getstring)) return;
		
		var which = document.getElementById('tipType').selectedIndex;
		if(getstring == '_dev' && devCheck) { // Dev
			DPRChrome.openDPRTab('chrome://digitalpalireader/content/dev.xul','DPRd');
			return;
		}


		// get options
		
		if(which > 6) {
			var MAT = (document.getElementById('tsoMATm').checked ? 'm' : '') + (document.getElementById('tsoMATa').checked ? 'a' : '') + (document.getElementById('tsoMATt').checked ? 't' : '');
		}
		else var MAT = G_hier;

		if(which == 4 || which == 11 || which == 14) { // get sets
			var set = ''
			for (i in G_nikToNumber) {
				if(document.getElementById('tsoCO'+i).checked) set += i;
			}
		}
		else if (which == 0 || which == 7) { // tipitaka
			var set = 'vdmsaky';
		}
		else var set = document.getElementById('set').value;
		
		if(which == 5 || which == 12) { // get books
			var book = [];
			for (i = 1; i <= nikvoladi[document.getElementById('set').value].length; i++) {
				if(document.getElementById('tsoBObook' + i).checked) book.push(i);
			}
			book = book.join(',');
		}
		else book = document.getElementById('book').value;

		var rx = document.getElementById('tsoRx').checked;

		if(!add) { // reuse old tab
			var oldTab = DPRChrome.findDPRTab('DPR-search');

			if (!oldTab) {
				var permalink = 'chrome://digitalpalireader/content/search.htm' + '?type='+which+'&query=' + toVel(getstring).replace(/ /g,'_').toLowerCase() + '&MAT=' + MAT + '&set=' + set + '&book=' + book + '&rx=' + rx;
				DPRChrome.openDPRTab(permalink,'DPR-search');
			}
			else {
				mainWindow.gBrowser.selectedTab = oldTab;
				var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
				oldTabBrowser.contentWindow.wrappedJSObject.searchTipitaka(which,toVel(getstring).toLowerCase(),MAT,set,book,rx);
			}
		}
		else {
		var permalink = 'chrome://digitalpalireader/content/search.htm' + '?type='+which+'&query=' + toVel(getstring).replace(/ /g,'_').toLowerCase() + '&MAT=' + MAT + '&set=' + set + '&book=' + book + '&rx=' + rx;
			DPRChrome.openDPRTab(permalink,'DPRs');
		}



	},
	
	checkGetstring: function (getstring) {

		var stringra = [];
		
		var yesplus = getstring.indexOf('+');
		if (yesplus >= 0)
		{
			stringra = getstring.split('+');
		}
		if (getstring.length < 3)
		{
			alertFlash("Minimum three letter search length",'yellow');
			document.getElementById('sbfb').innerHTML='<div align = center><br><br><br><br><br><h1 id = "c">ready</h1></div>';
			document.getElementById('sbfa').innerHTML='';
			document.getElementById('sbfab').innerHTML='';
			return false;
		}
		if (stringra.length > 3)
		{
			alertFlash("Maximum three strings per search",'yellow');
			document.getElementById('sbfb').innerHTML='<div align = center><br><br><br><br><br><h1 id = "c">ready</h1></div>';
			document.getElementById('sbfa').innerHTML='';
			return false;
		}
		for (var s = 0; s < stringra.length; s++)
		{
			if (stringra[s].length < 3 && stringra.length > 0)
			{
				alertFlash("Minimum three letter search length",'yellow');
				document.getElementById('sbfb').innerHTML='<div align = center><br><br><br><br><br><h1 id = "c">ready</h1></div>';
				document.getElementById('sbfa').innerHTML='';
				document.getElementById('sbfab').innerHTML='';
				return false;
			}
		}
		return true;
	},

	bvAlert:function() {
		var abv = bv();DPRChrome.promptData('Buddhavacana Quote', abv[0]+(abv[1]?'\n\n'+abv[1]:''));
	}
};
