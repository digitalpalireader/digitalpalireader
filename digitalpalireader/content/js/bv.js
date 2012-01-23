function bv(rnd,static) {
	var xmlhttp = new window.XMLHttpRequest();
	xmlhttp.open("GET", 'chrome://digitalpalireader/content/etc/dbv.html', false);
	xmlhttp.send(null);
	var xmlDoc = xmlhttp.responseXML.documentElement;
	var divs = xmlDoc.getElementsByTagName('div');
	if(static) {
		var no = rnd-1;
	}
	else if(rnd) {
		var no = Math.floor(Math.random()*divs.length);
	}
	else {
		var today = new Date();
		var first = new Date(today.getFullYear(), 0, 1);
		var theDay = Math.round(((today - first) / 1000 / 60 / 60 / 24) + .5, 0);
		var no = theDay-1;
	}

	var verse = divs[no];
	var head = verse.getElementsByTagName('h2')[0].textContent;
	var text = [];
	var cite = '';

	var ps = verse.getElementsByTagName('p');
	for(i in ps) {
		if (ps[i].className == 'text') {
			text.push(ps[i].textContent);
		}
		else if (ps[i].className == 'citation') {
			cite = ps[i].textContent;
		}
	}
	return [head,text,cite];
}