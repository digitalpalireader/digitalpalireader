
var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.digitalpalireader.");

function loadDefaults() {
		var cks = ['showPages', 'showVariants', 'showPermalinks', 'showNames', 'showPedLinks','ctrans','autodict','catioff']; 
		for (var i = 0; i < cks.length; ++i) {
			var ck = document.getElementById(cks[i]);
			ck.checked = D_prefs[cks[i]];
		}
		var ints = ['altlimit'];
		for (var i = 0; i < ints.length; ++i) {
			var box = document.getElementById(ints[i]);
			box.value = D_prefs[ints[i]];
		}
		var strings = ['catiloc','colbk','imgbk','colbkcp','imgbkcp','colinput','colbutton','colped','coldppn','colcpd','coltext','colsel','colfont','colsize'];
		for (var i = 0; i < strings.length; ++i) {
			var box = document.getElementById(strings[i]);
			box.value = D_prefs[strings[i]];
		}
		
		// backgrounds
		
		var wbk = D_prefs['bktype'];
		
		if(/col/.exec(wbk)) {
			document.getElementById('pcolbk').checked = true;
			document.getElementById('colbk').setAttribute('disabled', 'false');
		}
		else {
			document.getElementById('pcolbk').checked = false;
			document.getElementById('colbk').setAttribute('disabled', 'true');
		}
		if(/img/.exec(wbk)) {
			document.getElementById('pimgbk').checked = true;
			document.getElementById('imgbk').setAttribute('disabled', 'false');
		}
		else {
			document.getElementById('pimgbk').checked = false;
			document.getElementById('imgbk').setAttribute('disabled', 'true');
		}

		var sbk = D_prefs['bkcptype'];

		if(/col/.exec(sbk)) {
			document.getElementById('pcolbkcp').checked = true;
			document.getElementById('colbkcp').setAttribute('disabled', 'false');
		}
		else {
			document.getElementById('pcolbkcp').checked = false;
			document.getElementById('colbkcp').setAttribute('disabled', 'true');
		}
		if(/img/.exec(sbk)) {
			document.getElementById('pimgbkcp').checked = true;
			document.getElementById('imgbkcp').setAttribute('disabled', 'false');
		}
		else { 
			document.getElementById('pimgbkcp').checked = false;
			document.getElementById('imgbkcp').setAttribute('disabled', 'true');
		}

		if(!D_prefs['catioff']) document.getElementById('catiloc').setAttribute('disabled', 'true');

		document.getElementById('translits').selectedIndex = D_prefs['translits'];
		
}

function loadPrefs() {
		var cks = ['showPages', 'showVariants', 'showPermalinks', 'showNames', 'showPedLinks','ctrans','autodict','catioff']; 
		for (var i = 0; i < cks.length; ++i) {
			var ck = document.getElementById(cks[i]);
			ck.checked = prefs.getBoolPref(ck.getAttribute("prefstring"));
		}
		var ints = ['altlimit'];
		for (var i = 0; i < ints.length; ++i) {
			var box = document.getElementById(ints[i]);
			var prefstring = box.getAttribute("prefstring");
			box.value = prefs.getIntPref(prefstring);
		}
		var strings = ['catiloc','colbk','imgbk','colbkcp','imgbkcp','colinput','colbutton','colped','coldppn','colcpd','coltext','colsel','colfont','colsize'];
		for (var i = 0; i < strings.length; ++i) {
			var box = document.getElementById(strings[i]);
			var prefstring = box.getAttribute("prefstring");
			box.value = prefs.getCharPref(prefstring);
		}
		
		// backgrounds
		
		var wbk = prefs.getCharPref('Char.bktype');
		
		if(/col/.exec(wbk)) document.getElementById('pcolbk').setAttribute('checked',true);
		else {
			document.getElementById('colbk').setAttribute('disabled', 'true');
		}
		if(/img/.exec(wbk)) document.getElementById('pimgbk').checked = true;
		else {
			document.getElementById('imgbk').setAttribute('disabled', 'true');
		}

		var sbk = D_prefs['bkcptype'];

		if(/col/.exec(sbk)) document.getElementById('pcolbkcp').checked = true;
		else document.getElementById('colbkcp').setAttribute('disabled', 'true');
		if(/img/.exec(sbk)) document.getElementById('pimgbkcp').checked = true;
		else document.getElementById('imgbkcp').setAttribute('disabled', 'true');
	
		
		if(!prefs.getBoolPref('Bool.catioff')) document.getElementById('catiloc').setAttribute('disabled', 'true');

		
		document.getElementById('translits').selectedIndex = prefs.getIntPref('Int.translits');
		
}



function savePrefs(close) {
	var atiloc = document.getElementById('catiloc').value.replace(/start\.html$/,'');
	if(document.getElementById('catioff').checked && !extFileExists(atiloc+'html/_dpr/digital_pali_reader_suttas.js')) {
		alert('Unable to find file: "'+atiloc+'html/_dpr/digital_pali_reader_suttas.js".  Please disable offline translations before saving preferences.'); 
		return false; 
	}
	else {
		prefs.setCharPref('Char.catiloc',atiloc.replace(/\\/g,'/').replace(/start\.html$/,''));
	}

	var cks = ['showPages', 'showVariants', 'showPermalinks', 'showNames', 'showPedLinks','ctrans','autodict','catioff']; 

	for (var i = 0; i < cks.length; ++i) {
		var ck = document.getElementById(cks[i]);
		prefs.setBoolPref(ck.getAttribute("prefstring"), ck.checked);
	}
	
	var ints = ['altlimit'];

	for (var i = 0; i < ints.length; ++i) {
		var box = document.getElementById(ints[i]);
		prefs.setIntPref(box.getAttribute("prefstring"), box.value);
	}

	var bktype = (document.getElementById('pcolbk').checked?'col':'');
	bktype += (document.getElementById('pimgbk').checked?'img':'');
	
	prefs.setCharPref('Char.bktype', bktype);

	var bkcptype = (document.getElementById('pcolbkcp').checked?'col':'');
	bkcptype += (document.getElementById('pimgbkcp').checked?'img':'');
	
	prefs.setCharPref('Char.bkcptype', bkcptype);
	
	var strings = ['colbk','imgbk','colbkcp','imgbkcp','colinput','colbutton','colped','coldppn','colcpd','coltext','colsel','colfont','colsize'];
	
	for (var i = 0; i < strings.length; ++i) {
		if(strings[i] == 'colbk' && !document.getElementById('pcolbk').checked || strings[i] == 'imgbk' && !document.getElementById('pimgbk').checked || strings[i] == 'colbkcp' && !document.getElementById('pcolbkcp').checked || strings[i] == 'imgbkcp' && !document.getElementById('pimgbkcp').checked) continue; 
		var box = document.getElementById(strings[i]);
		prefs.setCharPref(box.getAttribute("prefstring"), box.value);
	}

	// translit
	
	prefs.setIntPref('Int.translits',document.getElementById('translits').selectedIndex);

	var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
	var e = wm.getEnumerator("navigator:browser");
	var win;

	while (e.hasMoreElements()) {
		win = e.getNext();
		var mainWindow = win.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
					   .getInterface(Components.interfaces.nsIWebNavigation)
					   .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
					   .rootTreeItem
					   .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
					   .getInterface(Components.interfaces.nsIDOMWindow); 
		var sidebarWindow = mainWindow.document.getElementById("sidebar").contentDocument;

		if (sidebarWindow.location.href == "chrome://digitalpalireader/content/digitalpalireader.xul") {
			sidebarWindow.getElementById('dpr-browser').contentWindow.updatePrefs();
		} 
	}

	if (close == 1) window.close();
}


function fileDialog(id, titleIn) {
	
	var stringBundle = document.getElementById("digitalpalireader-strings");
	
	var output = document.getElementById(id);
	var title = stringBundle.getString(titleIn);
	
	const nsIFilePicker = Components.interfaces.nsIFilePicker;
	const nsILocalFile = Components.interfaces.nsILocalFile;
	var fp = Components.classes["@mozilla.org/filepicker;1"]
	                 .createInstance(nsIFilePicker);

	fp.init(window, title, nsIFilePicker.modeOpen);
	fp.appendFilters(nsIFilePicker.filterAll);
	var result = fp.show();

	if (result == nsIFilePicker.returnOK) {
		var fileOut = fp.file.QueryInterface(nsILocalFile);
		var fileName = fp.file.path.replace(/\\/g,'/').replace(/start\.html$/,'');
		if(!extFileExists(fileName)) {
			alert('Unable to find directory: "'+fileName+'".  Please confirm that you have selected the correct directory and that you have an up to date copy of the ATI archive.'); 
			return false; 
		}
		prefs.setCharPref('Char.catiloc',fileName);
		output.value = fileName;
	}
	else if (result == nsIFilePicker.returnCancel) {
		return false;
	}
}
