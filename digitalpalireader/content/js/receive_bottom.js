function getLinkPlaceBottom() { // permalinks
	var options = document.location.href.split('?')[1].split('#')[0].split('&');

	var place;
	var para;
	var query;
	var outplace;
	for (i in options) {

		var option = options[i].split('=');
		option[1] = option[1].replace(/\%22/g,'"');
		 
		if(option[0] == 'analysis') {
			outputAnalysis(option[1]);
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
	}
}
