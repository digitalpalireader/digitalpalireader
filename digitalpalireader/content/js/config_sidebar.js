var DPRConfig = {
	sidebarConfig:function() {
		for (i in DPR_prefs) {
			DPR_prefs[i] = getPref(i);
		}
		DPRNav.historyBox();
		DPRNav.bookmarkBox();
		DPRNav.searchHistoryBox();
				
		var x = 0;
		
		document.styleSheets[2]['cssRules'][x].style.fontFamily = DPR_prefs['colfont']; 

		document.styleSheets[2]['cssRules'][++x].style.color = DPR_prefs['coltext']; 
		document.styleSheets[2]['cssRules'][x].style.fontSize = DPR_prefs['colsize'] + 'px'; 
		
		document.styleSheets[2]['cssRules'][++x].style.fontSize = Math.round(parseInt(DPR_prefs['colsize'])*.8) + 'px';  // select, etc.

		document.styleSheets[2]['cssRules'][++x].style.backgroundColor = DPR_prefs['colInput'];  // select, etc.

		document.styleSheets[2]['cssRules'][++x].style.fontSize = Math.round(parseInt(DPR_prefs['colsize'])*.8) + 'px';  // buttons
		
		
		document.styleSheets[2]['cssRules'][++x].style.fontSize = Math.round(parseInt(DPR_prefs['colsize'])*.7) + 'px';  // small
		
		document.styleSheets[2]['cssRules'][++x].style.fontSize = Math.round(parseInt(DPR_prefs['colsize'])*.6) + 'px';  // tiny
		
		document.styleSheets[2]['cssRules'][++x].style.fontSize = Math.round(parseInt(DPR_prefs['colsize'])*1) + 'px';  // large
		
		document.styleSheets[2]['cssRules'][++x].style.fontSize = Math.round(parseInt(DPR_prefs['colsize'])*1.2) + 'px';  // huge
		
		
		var sbk = DPR_prefs['bkcptype'];

		if(/col/.exec(sbk)) {
			document.styleSheets[2]['cssRules'][++x].style.backgroundColor = DPR_prefs['colbkcp'];  // chromeback
		}
		else {
			document.styleSheets[2]['cssRules'][++x].style.backgroundColor = '';  // chromeback
		}
		if(/img/.exec(sbk)) {
			document.styleSheets[2]['cssRules'][x].style.backgroundImage = DPR_prefs['imgbkcp'];  // chromeback
		}
		else {
			document.styleSheets[2]['cssRules'][x].style.backgroundImage = '';  // chromeback
		}
	},
}


