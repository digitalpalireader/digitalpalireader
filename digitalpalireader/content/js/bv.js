function bv(rnd) {
	var xmlhttp = new window.XMLHttpRequest();
	xmlhttp.open("GET", 'chrome://digitalpalireader/content/dbv.html', false);
	xmlhttp.send(null);
	var xmlDoc = xmlhttp.responseXML.documentElement;
	var divs = xmlDoc.getElementsByTagName('div');
	if(rnd) {
		var no = Math.floor(Math.random()*divs.length);
	}
	else {
		var today = new Date();
		var first = new Date(today.getFullYear(), 0, 1);
		var theDay = Math.round(((today - first) / 1000 / 60 / 60 / 24) + .5, 0);
		var no = theDay-1;
	}
	var verse = divs[no].textContent;
	return [verse];
}