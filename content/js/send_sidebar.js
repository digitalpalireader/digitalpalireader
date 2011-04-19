
var DPRSend = {

	eventSend: function (event) {
		if(event.ctrlKey || event.button == 1) return true;
		return false;
	},


	sendAnalysisToOutput: function (input, divclicked, frombox, add) {

		if(!add) { // reuse old tab
			var thisTab = DPRChrome.isThisDPRTab('DPRm');
			if(thisTab) {  
				var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
				thisTabBrowser.contentDocument.getElementById('dpr-index-bottom').contentWindow.wrappedJSObject.outputAnalysis(input,frombox);
				return;
			}
			var oldTab = DPRChrome.findDPRTab('DPR-main');
			if (!oldTab) {
				var permalink = 'chrome://digitalpalireader/content/bottom.htm' + '?analysis='+toVel(input)+'&options='+frombox;
				DPRChrome.openDPRTab('DPR-main',permalink);
			}
			else {
				mainWindow.gBrowser.selectedTab = oldTab;
				var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
				oldTabBrowser.contentDocument.getElementById('dpr-index-bottom').contentWindow.wrappedJSObject.outputAnalysis(input,frombox);
			}
		}
		else {
			var permalink = 'chrome://digitalpalireader/content/bottom.htm' + '?analysis='+toVel(input)+'&frombox='+frombox;
			DPRChrome.openDPRTab('DPRm',permalink);
		}	
	},


	sendDict: function (hard,add) {

		var getstring = document.getElementById('dictin').value;

		if(!hard) {
			if (getstring == this.G_lastsearch || getstring == '' || !G_prefs['autodict'] || document.getElementById('soregexp').checked || document.getElementById('sofulltext').checked) return;
		}
		
		this.G_lastsearch = this.value;

		var which = document.getElementById('dictType').value;

		if (which == 'DPR') {
			var text = toVel(getstring);
			this.sendAnalysisToOutput(text,null,(hard ? null : 1),add);
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
			var oldTab = findDPRTab('DPR-dict');
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
		if(!this.checkGetstring(document.getElementById('isearch').value)) return;
		
		var which = document.getElementById('tipType').selectedIndex;
		
		if(which == 3 || which == 6 || which == 10 || which == 13) return;
		
		if(which == 15) { // Dev
			DevInput(document.getElementById('isearch').value);
			return;
		}


		// get options
		
		if(which > 6) {
			var MAT = (document.getElementById('tsoMATm').checked ? 'm' : '') + (document.getElementById('tsoMATa').checked ? 'a' : '') + (document.getElementById('tsoMATt').checked ? 't' : '');
		}
		else var MAT = G_hier;

		if(which == 0 || which == 4 || which == 7 || which == 11 || which == 14) {
			var set = ''
			for (i in G_nikToNumber) {
				if(document.getElementById('tsoCO'+i).checked) set += i;
			}
		}
		else var set = document.getElementById('set').value;
		
		if(which == 5 || which == 12) {
			var book = [];
			for (i = 0; i < nikvoladi[document.getElementById('set').value]; i++) {
				if(document.getElementById('tsoBObook' + i).checked) book.push(i);
			}
			book = book.join(',');
		}
		else book = document.getElementById('book').value;

		var rx = document.getElementById('tsoRx').checked;

		if(!add) { // reuse old tab
			var oldTab = findDPRTab('DPR-search');

			if (!oldTab) {
				var permalink = 'chrome://digitalpalireader/content/search.htm' + '?type='+which+'&query=' + toVel(document.getElementById('isearch').value).toLowerCase() + '&MAT=' + MAT + '&set=' + set + '&book=' + book + '&rx=' + rx;
				DPRChrome.openDPRTab(permalink,'DPR-search');
			}
			else {
				mainWindow.gBrowser.selectedTab = oldTab;
				var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
				oldTabBrowser.contentWindow.wrappedJSObject.searchTipitaka(which,toVel(document.getElementById('isearch').value).toLowerCase(),MAT,set,book,rx,1);
			}
		}
		else {
		var permalink = 'chrome://digitalpalireader/content/search.htm' + '?type='+which+'&query=' + toVel(document.getElementById('isearch').value).toLowerCase() + '&MAT=' + MAT + '&set=' + set + '&book=' + book + '&rx=' + rx;
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

};
