var DPRConfig = {
	sidebarConfig:function() {
		for (i in G_prefs) {
			G_prefs[i] = getPref(i);
		}
		DPRNav.historyBox();
		document.styleSheets[0]['cssRules'][0].style.color = G_prefs['coltext']; 
		document.styleSheets[0]['cssRules'][0].style.fontFamily = G_prefs['colfont']; 
		document.styleSheets[0]['cssRules'][1].style.fontSize = G_prefs['colsize'] + 'px'; 
		
		document.styleSheets[0]['cssRules'][2].style.fontSize = Math.round(parseInt(G_prefs['colsize'])*.9) + 'px';  // select, etc.
		document.styleSheets[0]['cssRules'][2].style.backgroundColor = G_prefs['colInput'];  // select, etc.
		
		document.styleSheets[0]['cssRules'][3].style.fontSize = Math.round(parseInt(G_prefs['colsize'])*.8) + 'px';  // small
		document.styleSheets[0]['cssRules'][4].style.fontSize = Math.round(parseInt(G_prefs['colsize'])*.7) + 'px';  // tiny
		document.styleSheets[0]['cssRules'][5].style.fontSize = Math.round(parseInt(G_prefs['colsize'])*1.25) + 'px';  // large
		document.styleSheets[0]['cssRules'][6].style.fontSize = Math.round(parseInt(G_prefs['colsize'])*1.5) + 'px';  // huge
		
		document.styleSheets[0]['cssRules'][9].style.backgroundColor = G_prefs['colButton'];  // buttons
		document.styleSheets[0]['cssRules'][10].style.backgroundImage = '-moz-radial-gradient('+G_prefs['colButtonSel']+','+G_prefs['colbkcp']+')';  // buttons
		document.styleSheets[0]['cssRules'][11].style.backgroundImage = '-moz-radial-gradient('+G_prefs['colButtonSel']+','+G_prefs['colbkcp']+')';  // buttons
	},
}

