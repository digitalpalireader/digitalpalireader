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
	var link = '';
	var ps = verse.getElementsByTagName('p');
	for(i in ps) {
		if (ps[i].className == 'text') {
			text.push(ps[i].textContent);
		}
		else if (ps[i].className == 'citation') {
			if(ps[i].getElementsByTagName('a')[0])
				link = ps[i].getElementsByTagName('a')[0].href;
			cite = ps[i].textContent;
		}
	}
	return [head,text,cite,link];
}

function showBv(rnd) {
	var abv = bv(rnd);
	var today = '';
	if(!rnd) {
		var date = new Date();
		var day = date.getDate().toString();
		switch (day.charAt(day.length-1)) {
			case '1':
				day+='st';
				break;
			case '2':
				day+='nd';
				break;
			case '3':
				day+='rd';
				break;
			default:
				day+='th';
				break;
		}
		var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December' ];
		var today = '<p style="font-style:italic" name="changecolor">'+monthNames[date.getMonth()] + ' ' + day+'</p>';
	}
	
	var rd = '<div style="padding:2px 10px;margin-bottom:2px;" title="get random quote" onclick="showBv(true)" class="green small pointer">Random</div>';
	var dd = '';
	if(rnd)
		dd = '<div style="padding:2px 10px;" title="get today\'s quote" onclick="showBv()" class="green small pointer">Today</div>';
	
	document.getElementById('bvb').innerHTML = '<div style="position:absolute;top:0;right:0;">'+rd+dd+'</div>'+'<p><b class="text">'+(rnd?'Random':'Daily')+' Buddha Vacana</b></p>'+today+'<p name="changecolor">' + abv[1].join('</p><p name="changecolor">').replace(/\n/g,'<br/>') + '</p>'+(abv[2] ? '<p>-- '+(abv[3]?'<span class="green pointer" onclick="citation(\''+abv[3].replace(/^[^?]+\?/,'')+'\',event); return false">' + abv[2] +'</span>':abv[2])+'</p>':'');
}

function citation(cite,event) {
	var paramsa = cite.split('&');
	var param = [];
	for(i in paramsa) {
		var tp = paramsa[i].split('=');
		param[tp[0]] = tp[1];
	}
	var loc = param['loc'].split('.');
	for (i = 1; i < loc.length -1;i++) {
		loc[i] = parseInt(loc[i]);
	}
	mainWindow.gBrowser.selectedTab.linkedBrowser.contentDocument.getElementById('dpr-index-top').contentWindow.openPlace(loc,param['para'],null,eventSend(event));
}
function eventSend(event,internal) {
	
	if(!event) return;
	if(event.ctrlKey || event.which == 2) return true;
	if(event.shiftKey) return 'shift';
	if(event.which == 1 && internal) return 'internal';
	if (event.which == 1) return false;
	return 'right';
}
