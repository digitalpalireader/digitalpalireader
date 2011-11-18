function loadXMLFile(file,setNo) {
	var setName;
	switch(setNo) {
		case 0:
			var setPack = 'dprmyanmar';
			var setName = 'Myanmar';
			break;
		case 1:
			var setPack = 'dprthai';
			var setName = 'Thai';
			break;
	}
	try {
		var bookload = 'chrome://'+setPack+'/content/xml/' + file + '.xml';
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", bookload, false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;

		return xmlDoc;
	}
	catch(ex) {
		alert('XML file '+file+'.xml not found.  Do you have the ' + setName + ' Tipitaka extension installed?');
		return null;
	}
}

