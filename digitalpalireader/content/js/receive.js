function getLinkPlace() { // permalinks

	var options = document.location.href.split('?')[1].split('#')[0]
	makeLinkPlace(options,true);
}
function makeLinkPlace(options,PL) {	
	options = options.split('&');

	var place,index,para,query,scroll,compare;
	
	// parse options
	if(/^thai/.exec(options[0])) {
		DgetThaiBook(options[0].split('=')[1]);
		return;
	}
	var outplace;
	for (i in options) {

		var option = options[i].split('=');
		if(option[0] == 'text') {
			analyzeTextPad(decodeURIComponent(option[1]));
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
				openDPRTab('chrome://digitalpalireader/content/help.htm','DPR-help',1);
				return;
			}

			
			place = place.split('.');
			
			if (place.length == 8) {
				outplace = place;
			}
			else if (/[vdmaskyxbg]\.[0-9]+\.[mat]/.exec(option[1])) { // index
				index = option[1].split('.');
			}
			else if (/^[DMASKdmask][Nn]-{0,1}[atAT]{0,1}\.[0-9]+\.{0,1}[0-9]*$/.exec(option[1])) { // shorthand
				outplace = getSuttaFromNumber(place);
				if(!outplace) return;
			}
		}
		else if (option[0] == 'query') {
			if(/^\//.exec(option[1])) eval('query = ['+toUni(option[1]).replace(/_/g,' ')+']');
			else query = toUni(option[1]).replace(/_/g,' ').split('+');
		}
		else if (option[0] == 'para') para = parseInt(option[1]);
		else if (option[0] == 'scroll') scroll = parseInt(option[1]);
		else if (option[0] == 'alt') outplace.push(1);
		else if (option[0] == 'compare') compare = option[1];
	}
	if(index) loadXMLindex(index,compare);
	else if(place) loadXMLSection(query,para,outplace,PL,scroll,compare);
}
