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
		alert('You don\'t have the archive installed');
		return null;
	}
}

