function loadXMLFile(file,set) {
	var setName;
	switch(set) {
		case 0:
			setName = 'dprmyanmar';
			break;
		case 1:
			setName = 'dprthai';
			break;
	}
	try {
		var bookload = 'chrome://'+setName+'/content/xml/' + file + '.xml';
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", bookload, false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;

		return xmlDoc;
	}
	catch(ex) {
		if(promptConfirm('Tipitaka Archive Not Found', "You don't have the required tipitaka archive installed.  As of DPR 2.0, the tipitaka files are in a seperate extension package that must be downloaded seperately.  This is done in order to save you from having to re-download the tipitaka every time you upgrade the DPR.  With your permission, you will now be directed to the tipitaka extension URL.  Once it is downloaded, restart Firefox, and the DPR should work properly.  After that, you shouldn't see this dialogue again.")) {
			window.open('http://pali.sirimangalo.org/'+setName+'.xpi');
		}
		return null;
	}
}

