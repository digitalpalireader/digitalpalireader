
/*

window.onerror = function(message, file, lineNumber) {
    var error = message + "\n\nFile:"+file+"\n\nLine:"+lineNumber;
	alert('a single hand claps\ncan you hear the sound it makes?\n'+error);
	refreshit();
    return true;
}

*/

var atiIns = 0;

function changeStyleByName(name,attrib,value) {
		var tags = document.getElementsByName(name);
		for(var i=0;i < tags.length;i++)
		{
			eval('tags[i].style.'+attrib+'="'+value+'";');
		} 
}


function getconfig() {
	for (i in DPR_prefs) {
		DPR_prefs[i] = getPref(i);
	}

	if (/top\.htm/.exec(document.location.href) && DPR_prefs["ctrans"] && typeof(atiD) == 'undefined') {
		 addATIJS();
	 }

	// update backgrounds
		
	checkbackground();

	// update fonts, colors

	document.styleSheets[0]['cssRules'][0].style.color = DPR_prefs['coltext']; 
	document.styleSheets[0]['cssRules'][0].style.fontFamily = DPR_prefs['colfont']; 
	document.styleSheets[0]['cssRules'][1].style.fontSize = DPR_prefs['colsize'] + 'px'; 
	
	document.styleSheets[0]['cssRules'][2].style.fontSize = Math.round(parseInt(DPR_prefs['colsize'])*.9) + 'px';  // select, etc.
	document.styleSheets[0]['cssRules'][2].style.backgroundColor = DPR_prefs['colInput'];  // select, etc.
	
	document.styleSheets[0]['cssRules'][3].style.fontSize = Math.round(parseInt(DPR_prefs['colsize'])*.8) + 'px';  // small
	document.styleSheets[0]['cssRules'][4].style.fontSize = Math.round(parseInt(DPR_prefs['colsize'])*.7) + 'px';  // tiny
	document.styleSheets[0]['cssRules'][5].style.fontSize = Math.round(parseInt(DPR_prefs['colsize'])*1.25) + 'px';  // large
	document.styleSheets[0]['cssRules'][6].style.fontSize = Math.round(parseInt(DPR_prefs['colsize'])*1.5) + 'px';  // huge
	
	document.styleSheets[0]['cssRules'][9].style.backgroundColor = DPR_prefs['colButton'];  // buttons
	document.styleSheets[0]['cssRules'][10].style.backgroundImage = '-moz-radial-gradient('+DPR_prefs['colButtonSel']+','+DPR_prefs['colbkcp']+')';  // buttons
	document.styleSheets[0]['cssRules'][11].style.backgroundImage = '-moz-radial-gradient('+DPR_prefs['colButtonSel']+','+DPR_prefs['colbkcp']+')';  // buttons
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
	var wbk = DPR_prefs['bktype'];
	
	if(/col/.exec(wbk)) {
		document.styleSheets[0]['cssRules'][7].style.backgroundColor = DPR_prefs['colbk'];  // paperback
		document.body.style.backgroundColor = DPR_prefs['colbk'];
	}
	else {
		document.styleSheets[0]['cssRules'][7].style.backgroundColor = '';  // paperback
		document.body.style.backgroundColor = '';
	}
	if(/img/.exec(wbk)) {
		document.styleSheets[0]['cssRules'][7].style.backgroundImage = DPR_prefs['imgbk'];  // paperback
		document.body.style.backgroundImage = DPR_prefs['imgbk'];
	}
	else {
		document.styleSheets[0]['cssRules'][7].style.backgroundImage = '';  // paperback
		document.body.style.backgroundImage = '';
	}

	var sbk = DPR_prefs['bkcptype'];

	if(/col/.exec(sbk)) {
		document.styleSheets[0]['cssRules'][8].style.backgroundColor = DPR_prefs['colbkcp'];  // chromeback
	}
	else {
		document.styleSheets[0]['cssRules'][8].style.backgroundColor = '';  // chromeback
	}
	if(/img/.exec(sbk)) {
		document.styleSheets[0]['cssRules'][8].style.backgroundImage = DPR_prefs['imgbkcp'];  // chromeback
	}
	else {
		document.styleSheets[0]['cssRules'][8].style.backgroundImage = '';  // chromeback
	}
}

function addATIJS() {
	if (DPR_prefs['catioff']) { 
		var nsrc = 'file://'+ DPR_prefs['catiloc'].replace(/\\/g,'/') + '/html/_dpr/digital_pali_reader_suttas.js';
	}
	else { var nsrc = 'http://www.accesstoinsight.org/_dpr/digital_pali_reader_suttas.php'; }
	atiIns = 1;
	var headID = document.getElementsByTagName("head")[0];         
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = nsrc;
	headID.appendChild(newScript);	
}

function addJS(files) {
	var loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"].getService(Components.interfaces.mozIJSSubScriptLoader); 
	for (var i = 0; i<files.length; i++) {
		if(!/\.js^/.test(files[i]))
			files[i] = 'chrome://digitalpalireader/content/js/'+files[i]+'.js';
		try {
			loader.loadSubScript(files[i],null,'UTF-8'); 
		}
		catch(ex) {
			return [ex,files[i]];
		}
	}
}
