var DPRConfig = {
	sidebarConfig:function() {
		for (i in DPR_prefs) {
			DPR_prefs[i] = getPref(i);
		}
		DPRNav.historyBox();
		
		checkbackground();
		
		document.styleSheets[2]['cssRules'][0].style.color = DPR_prefs['coltext']; 
		document.styleSheets[2]['cssRules'][0].style.fontFamily = DPR_prefs['colfont']; 
		document.styleSheets[2]['cssRules'][1].style.fontSize = DPR_prefs['colsize'] + 'px'; 
		
		document.styleSheets[2]['cssRules'][2].style.fontSize = Math.round(parseInt(DPR_prefs['colsize'])*.8) + 'px';  // select, etc.
		document.styleSheets[2]['cssRules'][2].style.backgroundColor = DPR_prefs['colInput'];  // select, etc.

		document.styleSheets[2]['cssRules'][3].style.fontSize = Math.round(parseInt(DPR_prefs['colsize'])*.9) + 'px';  // buttons
		
		
		document.styleSheets[2]['cssRules'][4].style.fontSize = Math.round(parseInt(DPR_prefs['colsize'])*.7) + 'px';  // small
		document.styleSheets[2]['cssRules'][5].style.fontSize = Math.round(parseInt(DPR_prefs['colsize'])*.6) + 'px';  // tiny
		document.styleSheets[2]['cssRules'][6].style.fontSize = Math.round(parseInt(DPR_prefs['colsize'])*1) + 'px';  // large
		document.styleSheets[2]['cssRules'][7].style.fontSize = Math.round(parseInt(DPR_prefs['colsize'])*1.2) + 'px';  // huge
		
	},
}

function checkbackground() {
	
	var sbk = DPR_prefs['bkcptype'];

	if(/col/.exec(sbk)) {
		document.styleSheets[2]['cssRules'][8].style.backgroundColor = DPR_prefs['colbkcp'];  // chromeback
	}
	else {
		document.styleSheets[2]['cssRules'][8].style.backgroundColor = '';  // chromeback
	}
	if(/img/.exec(sbk)) {
		document.styleSheets[2]['cssRules'][8].style.backgroundImage = DPR_prefs['imgbkcp'];  // chromeback
	}
	else {
		document.styleSheets[2]['cssRules'][8].style.backgroundImage = '';  // chromeback
	}
}

