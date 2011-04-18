var atiIns = 0;

function changeStyleByName(name,attrib,value) {
		var tags = document.getElementsByName(name);
		for(var i=0;i < tags.length;i++)
		{
			eval('tags[i].style.'+attrib+'="'+value+'";');
		} 
}

function sidebarConfig() {
	for (i in G_prefs) {
		G_prefs[i] = getPref(i);
	}

	// update backgrounds
		
	//checkbackground();

}

function changecss(myclass,element,value) {
	var CSSRules
	if (document.all) {
		CSSRules = 'rules'
	}
	else if (document.getElementById) {
		CSSRules = 'cssRules'
	}
	for (var i = 0; i < document.styleSheets[0][CSSRules].length; i++) {
		if (document.styleSheets[0][CSSRules][i].selectorText == myclass) {
			document.styleSheets[0][CSSRules][i].style[element] = value
		}
	}	
}

function checkbackground() {
	var wbk = G_prefs['bktype'];
	
	if(/col/.exec(wbk)) {
		document.styleSheets[0]['cssRules'][7].style.backgroundColor = G_prefs['colbk'];  // paperback
		document.body.style.backgroundColor = G_prefs['colbk'];
	}
	else {
		document.styleSheets[0]['cssRules'][7].style.backgroundColor = '';  // paperback
		document.body.style.backgroundColor = '';
	}
	if(/img/.exec(wbk)) {
		document.styleSheets[0]['cssRules'][7].style.backgroundImage = G_prefs['imgbk'];  // paperback
		document.body.style.backgroundImage = G_prefs['imgbk'];
	}
	else {
		document.styleSheets[0]['cssRules'][7].style.backgroundImage = '';  // paperback
		document.body.style.backgroundImage = '';
	}

	var sbk = G_prefs['bkcptype'];

	if(/col/.exec(sbk)) {
		document.styleSheets[0]['cssRules'][8].style.backgroundColor = G_prefs['colbkcp'];  // chromeback
	}
	else {
		document.styleSheets[0]['cssRules'][8].style.backgroundColor = '';  // chromeback
	}
	if(/img/.exec(sbk)) {
		document.styleSheets[0]['cssRules'][8].style.backgroundImage = G_prefs['imgbkcp'];  // chromeback
	}
	else {
		document.styleSheets[0]['cssRules'][8].style.backgroundImage = '';  // chromeback
	}
}

