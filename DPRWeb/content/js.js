
function profFileExists(file)
{
	var DIR = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
	var dir = DIR.get("ProfD", Components.interfaces.nsIFile);
	
	var dirs = file.split('/');
	for (i in dirs) {
		dir.append(dirs[i]);
		if (!dir.exists()) return false;
	}
	return true;
}

function chromeFileExists(fileLoc) // in extension package
{
	var xmlhttp = new window.XMLHttpRequest();
	try {
		xmlhttp.open("GET", "chrome://"+fileLoc, false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
	}
	catch(ex) {
		return false;
	}
	return true;
} 


function checkInstalled() {
	var inst = [];
	inst.push(['digitalpalireader','Digital Pali Reader Extension']);
	inst.push(['DPRMyanmar','Myanmar Tipitaka']);
	inst.push(['DPRThai','Thai Tipitaka']);
	var k = 0;
	for (var i = 0; i < inst.length; i++) {
		if (profFileExists('extensions/staged/'+inst[i][0]+'@noah.yuttadhammo.xpi') || chromeFileExists(inst[i][0]+'/content/exists')) {
			document.getElementById(inst[i][0]).className="normal";
			document.getElementById(inst[i][0]).value=document.getElementById('installed').value;
			k++;
		}
		else {
			document.getElementById(inst[i][0]).onmousedown = new Function("document.location.href='http://pali.sirimangalo.org/"+inst[i][0]+".xpi';");
		}
	}
	if (k==3) {
		clearInterval(intId);
	};
}
