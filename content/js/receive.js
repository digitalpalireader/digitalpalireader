function getLinkPlace() { // permalinks

	var options = document.location.href.split('?')[1].split('#')[0].split('&');

	var place;
	var para;
	var query;
	
	// parse options
	if(/^thai/.exec(options[0])) {
		DgetThaiBook(options[0].split('=')[1]);
		return;
	}
	var outplace;
	for (i in options) {

		var option = options[i].split('=');
		if(option[0] == 'parse') {
			sendAnalysisToOutput(option[1]);
			return;
		}
		if(option[0] == 'ped') {
			var link = option[1].split(',');
			paliXML(link[0]+'/'+link[1]+'/'+link[2]+','+link[3]);
			return;
		}
		if(option[0] == 'dppn') {
			var link = option[1].split(',');
			DPPNXML(link[0]+'/'+link[1]+'/'+link[2]+','+link[3]);
			return;
		}
		if(option[0] == 'atth') {
			var link = option[1].split(',');
			getAtthXML(link[0],link[1],link[2]);
			return;
		}
		if (option.length == 1 || option[0] == 'loc') {
			place = (option[1] ? option[1]: option[0]);
			if (/[^-a-zA-Z0-9.]/.exec(place)) return;

			if(option[1] == 'help') {
				helpXML();
				return;
			}

			
			place = place.split('.');
			
			if (place.length == 8) {
				outplace = place;
			}
			else if (/[vdmaskyxbg]\.[0-9]+\.[mat]/.exec(option[1])) { // index
				loadXMLindex(option[1].split('.'));
				return;
			}
			else if (/^[DMASKdmask][Nn]-{0,1}[atAT]{0,1}\.[0-9]+\.{0,1}[0-9]*$/.exec(option[1])) { // shorthand
				outplace = getSuttaFromNumber(place);
				if(!outplace) return;
			}
		}
		else if (option[0] == 'para') para = parseInt(option[1])-1;
		else if (option[0] == 'query') query = toUni(option[1]).replace(/_/g,' ').split('+');
	}
	if(place) loadXMLSection(query,para,outplace,true);
}
