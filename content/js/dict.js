var yut = 0;
var remote = true;

var ped = [];

function pedsearchstart()
{
	var getstring = document.form.manual.value;
      
	document.getElementById('difb').innerHTML='';
	document.getElementById('difb').appendChild(pleasewait);
	
	if(document.form.sofulltext.checked) { // full text search
		
		pedFullTextSearch(getstring);
		return;
	}

	if(document.form.sofuzzy.checked) {
		getstring = toFuzzy(getstring);
	}

	var gslength = getstring.length;
	var gsplit = new Array();	
	
	var gletter = getstring.charAt(0);
	var foldersw = new Array();
	var f0 = 0;
	var f1 = 0;

	var ped1 = 'etc/';
	var ped2 = '.htm';
	
	var finouta = new Array();
	var y = 0;
	var finout = '';
	if (ped.length == 0) {
		for (a in mainda) {
			ped.push(a + '^' + mainda[a]);
		}
    }
    var pedl = ped.length;
        
	for (x = 0; x < pedl; x++)
	{
		var pedt = ped[x].split('^')[0];
		
		if(document.form.sofuzzy.checked) {
			pedt = toFuzzy(pedt);
		}

        if (document.form.soregexp.checked) { // reg exp
			var yessir = (pedt.search(getstring) == 0 || (!document.form.sostartword.checked && pedt.search(getstring) > -1));
		}
		else { // non reg exp
			var yessir = (pedt.indexOf(getstring) == 0 || (!document.form.sostartword.checked && pedt.indexOf(getstring) > -1));
		}
		if(yessir)
		{
            gsplit = ped[x].split('^');
			
			uniout = gsplit[0];
			
			uniout = toUni(uniout);
			uniout = uniout.replace(/z/g, ' ');
			uniout = uniout.replace(/`/g, '\u00B0');
			
			finouta[y] = '<a href="javascript:void(0)" style="color:'+colorcfg['coltext']+'" onclick="paliXML(\'PED/' + gsplit[1] + '\')">' + uniout + '</a><br>';

			y++;
		}
	}

	var y = finouta.length;


	var findiv = Math.ceil(y/3);
	
	var listoutf = '<p>PED entry search for <b style="color:'+colorcfg['colped']+'">'+getstring+'</b>:<hr /><table width="100%">';
	if(y == 0) {
		var outDiv = document.createElement('div');
		outDiv.innerHTML = listoutf + '<tr><td>No results</td></tr></table><hr />';
		document.getElementById('difb').innerHTML = '';
		document.getElementById('difb').appendChild(outDiv);
		document.getElementById('cdif').scrollTop=0;
		return;
	}	
	for (z = 0; z < findiv; z++)
	{
		listoutf += '<tr><td>'+finouta[z]+'</td><td>'+(finouta[findiv+z]?finouta[findiv+z]:'')+'</td><td>'+(finouta[(findiv*2)+z]?finouta[(findiv*2)+z]:'')+'</td></tr>';
	}

	var outDiv = document.createElement('div');
	outDiv.innerHTML = listoutf + '</table><hr />';
	document.getElementById('difb').innerHTML = '';
	document.getElementById('difb').appendChild(outDiv);
	document.getElementById('cdif').scrollTop=0;
	yut = 0;
}

function pedFullTextSearch(getstring) {
	var finalout = '';
	
	var listouta = [];
	
	for (i = 0; i < 4; i++) {
		
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", 'etc/XML1/'+i+'/ped.xml', false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		
		var allp = xmlDoc.getElementsByTagName('data');
		
		for (j =0; j < allp.length; j++) {
			var texttomatch = allp[j].textContent;
			startmatch = texttomatch.search(getstring);
			postpara = '';
			if (startmatch >= 0)
			{
				listouta.push('<a href="#pedo'+i+'/'+j+'" style="color:'+colorcfg['colped']+'">' + texttomatch.substring(0,texttomatch.search(/\/b/)-1).replace(/<b>/,'') + '</a><br>'); 
				while (startmatch >= 0)
				{				
					gotstring = texttomatch.match(getstring)[0];
					endmatch = startmatch + gotstring.length;
					beforem = texttomatch.substring(0,startmatch);
					afterm = texttomatch.substring(endmatch,texttomatch.length);
					postpara += beforem + '<c0>' + gotstring.replace(/(.) (.)/g, "$1<xc> <c0>$2") + '<xc>';
					texttomatch = texttomatch.substring(endmatch);
					startmatch = texttomatch.search(getstring);
				}
				postpara += afterm;

				postpara = postpara.replace(/<c0>/g, '<span style="color:'+colorcfg['colped']+'">').replace(/<xc>/g, '</span>');
				
				finalout += '<a name="pedo'+i+'/'+j+'"><p><a href="#diftop" class="small" style="color:'+colorcfg['colped']+'">top</a>' + postpara + '</p><hr>';
			}
		}
	}

	// word list

	var y = listouta.length;

	var findiv = Math.ceil(y/3);
	
	var listoutf = '<hr /><table width="100%">';
	if(y == 0) {
		var outDiv = document.createElement('div');
		outDiv.innerHTML = listoutf + '<tr><td>No results</td></tr></table><hr />';
		document.getElementById('difb').innerHTML = '';
		document.getElementById('difb').appendChild(outDiv);
		document.getElementById('cdif').scrollTop=0;
		return;
	}	
	
	for (z = 0; z < findiv; z++)
	{
		listoutf += '<tr><td>'+listouta[z]+'</td><td>'+(listouta[findiv+z]?listouta[findiv+z]:'')+'</td><td>'+(listouta[(findiv*2)+z]?listouta[(findiv*2)+z]:'')+'</td></tr>';
	}
	var outDiv = document.createElement('div');
	outDiv.innerHTML = '<div><a name="diftop"><br />PED full-text search for <b style="color:'+colorcfg['colped']+'">'+getstring+'</b>:</div>'+ listoutf + '</table><hr />' + finalout;
	document.getElementById('difb').innerHTML = '';
	document.getElementById('difb').appendChild(outDiv);
	document.getElementById('cdif').scrollTop=0;
}

var dppn = new Array();

function dppnsearchstart()
{

	var getstring = document.form.manual.value;

	document.getElementById('difb').innerHTML='';
	document.getElementById('difb').appendChild(pleasewait);

	
	if(document.form.sofulltext.checked) { // full text search
		
		dppnFullTextSearch(getstring);
		return;
	}

	if(document.form.sofuzzy.checked) {
		getstring = toFuzzy(getstring);
	}

	var gslength = getstring.length;
	var gsplit = new Array();	
	
	var gletter = getstring.charAt(0);

	var foldersw = new Array();
	var f0 = 0;
	var f1 = 0;

	var dict = '../DPPN/';
	
	var finouta = new Array();
	var y = 0;
	var finout = '';
	if (dppn.length == 0) { for (a in nameda) { dppn.push(a + '^' + nameda[a]); } }

    for (x = 0; x < dppn.length; x++)
	{

		var dppnt = dppn[x].split('^')[0];
		
		if(document.form.sofuzzy.checked) {
			dppnt = toFuzzy(dppnt);
		}

        if (document.form.soregexp.checked) { // reg exp
			var yessir = (dppnt.search(getstring) == 0 || (!document.form.sostartword.checked && dppnt.search(getstring) > -1));
		}
		else { // non reg exp
			var yessir = (dppnt.indexOf(getstring) == 0 || (!document.form.sostartword.checked && dppnt.indexOf(getstring) > -1));
		}
		if(yessir)
		{
			gsplit = dppn[x].split('^');
			
			uniout = gsplit[0];
			
			if (gsplit[0].charAt(gsplit[0].length-1) == '1' && !nameda[gsplit[0].substring(0,gsplit[0].length-1)+'2']) { // no second, so drop the f1
				uniout = uniout.substring(0,uniout.length-2);
			}

			uniout = toUni(uniout);
			uniout = uniout.replace(/f/g, ' ');
			uniout = uniout.replace(/`/g, '\u00B0');
			
			
			finouta[y] = '<a href="javascript:void(0)" style="color:'+colorcfg['coltext']+'" onClick="moveframey(\'dif\'); DPPNXML(\'dppn/' + gsplit[1] + ',' + uniout + '\')">' + uniout + '</a><br>';
			y++;
		}
	}


	
	var y = finouta.length;

	var findiv = Math.ceil(y/3);
	
	var listoutf = '<p>DPPN entry search for <b style="color:'+colorcfg['colped']+'">'+getstring+'</b>:<hr /><table width="100%">';
	if(y == 0) {
		var outDiv = document.createElement('div');
		outDiv.innerHTML = listoutf + '<tr><td>No results</td></tr></table><hr />';
		document.getElementById('difb').innerHTML = '';
		document.getElementById('difb').appendChild(outDiv);
		document.getElementById('cdif').scrollTop=0;
		return;
	}	
	
	for (z = 0; z < findiv; z++)
	{
		listoutf += '<tr><td>'+finouta[z]+'</td><td>'+(finouta[findiv+z]?finouta[findiv+z]:'')+'</td><td>'+(finouta[(findiv*2)+z]?finouta[(findiv*2)+z]:'')+'</td></tr>';
	}
	var outDiv = document.createElement('div');
	outDiv.innerHTML = listoutf + '</table><hr />';
	document.getElementById('difb').innerHTML = '';
	document.getElementById('difb').appendChild(outDiv);
	document.getElementById('cdif').scrollTop=0;
	yut = 0;
}

function dppnFullTextSearch(getstring) {
	
	var finalouta = [];
	
	var listouta = [];
	getstring = toUni(getstring);
	
	for (i = 1; i < 9; i++) {
		
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", 'etc/XML2/'+i+'.xml', false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		
		var allp = xmlDoc.getElementsByTagName('entry');
		
		for (j =0; j < allp.length; j++) {
			var texttomatch = allp[j].textContent;
			if(texttomatch.indexOf('Pali Proper Names') >=0) continue;
			var ttitle = texttomatch.substring(texttomatch.indexOf('<h2>')+4,texttomatch.indexOf('</h2>'));
			texttomatch = texttomatch.replace(/<\/*a[^>]*>/g, '');
			startmatch = texttomatch.search(getstring);
			postpara = '';
			if (startmatch >= 0)
			{
				listouta.push(ttitle+'###<a href="#dppno'+i+'/'+j+'" style="color:'+colorcfg['colped']+'">' + ttitle + '</a><br>');
				while (startmatch >= 0)
				{				
					gotstring = texttomatch.match(getstring)[0];
					endmatch = startmatch + gotstring.length;
					beforem = texttomatch.substring(0,startmatch);
					afterm = texttomatch.substring(endmatch,texttomatch.length);
					postpara += beforem + '<c0>' + gotstring.replace(/(.) (.)/g, "$1<xc> <c0>$2") + '<xc>';
					texttomatch = texttomatch.substring(endmatch);
					startmatch = texttomatch.search(getstring);
				}
				postpara += afterm;

				postpara = postpara.replace(/<c0>/g, '<span style="color:'+colorcfg['colped']+'">').replace(/<xc>/g, '</span>');
				
				finalouta.push(ttitle+'###<a name="dppno'+i+'/'+j+'"><div style="position:relative"><div style="position:absolute;top:0px; left:0px;"><a href="javascript:void(0)" onclick="document.getElementById(\'cdif\').scrollTop = 0;" class="small" style="color:'+colorcfg['colped']+'">top</a></div>' + postpara + '</b></div>');
			}
		}
	}

	// word list

	listouta = sortaz(listouta);

	var y = listouta.length;

	var findiv = Math.ceil(y/3);
	
	var listoutf = '<hr /><table width="100%">';
	if(y == 0) {
		var outDiv = document.createElement('div');
		outDiv.innerHTML = listoutf + '<tr><td>No results</td></tr></table><hr />';
		document.getElementById('difb').innerHTML = '';
		document.getElementById('difb').appendChild(outDiv);
		document.getElementById('cdif').scrollTop=0;
		return;
	}	
	
	for (z = 0; z < findiv; z++)
	{
		listoutf += '<tr><td>'+listouta[z]+'</td><td>'+(listouta[findiv+z]?listouta[findiv+z]:'')+'</td><td>'+(listouta[(findiv*2)+z]?listouta[(findiv*2)+z]:'')+'</td></tr>';
	}
	var outDiv = document.createElement('div');
	outDiv.innerHTML = '<div><a name="diftop"><br />DPPN full-text search for <b style="color:'+colorcfg['colped']+'">'+getstring+'</b>:</div>'+ listoutf + '</table><hr />' + finalout;
	document.getElementById('difb').innerHTML = '';
	document.getElementById('difb').appendChild(outDiv);
	document.getElementById('cdif').scrollTop=0;
}



var yg = [];

function mlsearchstart()
{
	clearDivs('difanf');
	
	var getstring = document.form.manual.value;
	if(document.form.sofuzzy.checked) {
		getstring = toFuzzy(getstring);
	}
	
	var gslength = getstring.length;
	var gsplit = new Array();
	
	
	var gletter = getstring.charAt(0);
	var finouta = new Array();
	var finout = '';
	if( yg = []) {
		for (a in yt) yg.push([a].concat(yt[a]));
	}
		
	var cnt = 0;
	for (x = 0; x < yg.length; x++)
	{
		var us = '';
		var ud = '';

		var gsplit = [yg[x][0],yg[x][3],yg[x][2]];

		if(!document.form.sofulltext.checked) {
			var tosearch = gsplit[0];
		}
		else {
			var tosearch = yg[x][0]+' '+yg[x][3]+' '+yg[x][2];
		}
		
		if(document.form.sofuzzy.checked) {
			tosearch = toFuzzy(tosearch);
		}
        
        if (document.form.soregexp.checked) { // reg exp
			var yessir = (tosearch.search(getstring) == 0 || (!document.form.sostartword.checked && tosearch.search(getstring) > -1));
		}
		else { // non reg exp
			var yessir = (tosearch.indexOf(getstring) == 0 || (!document.form.sostartword.checked && tosearch.indexOf(getstring) > -1));
		}
		if(yessir)
		{
			cnt++;
			us = toUni(gsplit[0]);
			ud = toUni(gsplit[1] + ' (' + gsplit[2] + ')');
			
			finouta.push('<div><b><a style="color:'+colorcfg['colsel']+'" href="javascript:void(0)" onclick="if(document.getElementById(\'cped'+cnt+'\').innerHTML == \'\') { conjugate(\''+gsplit[0]+'\',\'cped'+cnt+'\')} else { document.getElementById(\'cped'+cnt+'\').innerHTML = \'\';}">' + us + '</a></b> '+ud +'<br><div class="conjc" id="cped'+cnt+'"></div></div>');

		}
	}
	
	finout = '<table width=100%><tr><td valign="top">';
	if(finouta.length == 0) {
		var outDiv = document.createElement('div');
		outDiv.innerHTML = finout + 'No results</td></tr></table>';
		document.getElementById('difb').innerHTML = '';
		document.getElementById('difb').appendChild(outDiv);
		document.getElementById('cdif').scrollTop=0;
		return;
	}	
	
	for (var z = 0; z < finouta.length; z++)
	{
		finout += finouta[z];
	}	
	
	var outDiv = document.createElement('div');
	outDiv.innerHTML = finout + '</td></tr></table>';
	document.getElementById('difb').innerHTML = '';
	document.getElementById('difb').appendChild(outDiv);
	document.getElementById('cdif').scrollTop=0;
	yut = 0;
}

function epdsearchstart()
{
	if(typeof(epd) == 'undefined') {
		return;
	}

	clearDivs('difanf');
	
	var getstring = document.form.manual.value;
	if(document.form.sofuzzy.checked) {
		getstring = toFuzzy(getstring);
	}
	
	var gslength = getstring.length;
	var gsplit = new Array();
	
	
	var gletter = getstring.charAt(0);
	var finouta = new Array();
	var y = 0;
	var finout = '';
	
	for (x = 0; x < epd.length; x++)
	{
		gsplit = epd[x].split('^');
		
		if(!document.form.sofulltext.checked) {
			var tosearch = gsplit[0];
		}
		else {
			var tosearch = epd[x];
		}
		if(document.form.sofuzzy.checked) {
			tosearch = toFuzzy(tosearch);
		}
        
        if (document.form.soregexp.checked) { // reg exp
			var yessir = (tosearch.search(getstring) == 0 || (!document.form.sostartword.checked && tosearch.search(getstring) > -1));
		}
		else { // non reg exp
			var yessir = (tosearch.indexOf(getstring) == 0 || (!document.form.sostartword.checked && tosearch.indexOf(getstring) > -1));
		}
		if(yessir)
		{
			
			finouta.push('<b><font style="color:'+colorcfg['colsel']+'">' + gsplit[0] + '</font></b> '+gsplit[1] +'<br>');

		}
	}
	
	finout = '<table width=100%><tr><td valign="top">';
	if(finouta.length == 0) {
		var outDiv = document.createElement('div');
		outDiv.innerHTML = finout + 'No results</td></tr></table>';
		document.getElementById('difb').innerHTML = '';
		document.getElementById('difb').appendChild(outDiv);
		document.getElementById('cdif').scrollTop=0;
		return;
	}		
	for (var z = 0; z < finouta.length; z++)
	{
		finout += finouta[z];
	}	
	var outDiv = document.createElement('div');
	outDiv.innerHTML = finout + '</td></tr></table>';
	document.getElementById('difb').innerHTML = '';
	document.getElementById('difb').appendChild(outDiv);
	document.getElementById('cdif').scrollTop=0;
	yut = 0;
}


function attsearchstart()
{
	if(typeof(attlist) == 'undefined') {
		return;
	}
	clearDivs('dif');
	
	var getstring = document.form.manual.value;
	if(document.form.sofuzzy.checked) {
		getstring = toFuzzy(getstring);
	}
	
	var gslength = getstring.length;
	var gsplit = new Array();	
	var hsplit = [];
	var gletter = getstring.charAt(0);
	var foldersw = new Array();
	var f0 = 0;
	var f1 = 0;

	var finouta = new Array();
	var y = 0;
	var finout = '';
	var outnik = '';

	for (x = 0; x < attlist.length; x++)
	{
		outnik = '';
		var attt = attlist[x].split('#')[0];
		
		if(document.form.sofuzzy.checked) {
			attt = toFuzzy(attt);
		}

        if (document.form.soregexp.checked) { // reg exp
			var yessir = (attt.search(getstring) == 0 || (!document.form.sostartword.checked && attt.search(getstring) > -1));
		}
		else { // non reg exp
			var yessir = (attt.indexOf(getstring) == 0 || (!document.form.sostartword.checked && attt.indexOf(getstring) > -1));
		}
		if(yessir)
		{
			var entries = attlist[x].split('#');
			gsplit = entries.shift();
			uniout = toUni(gsplit);
			
			// nikayas
			for(a = 0; a < entries.length; a++) {
				var tnik = entries[a].charAt(0);
				if(!document.getElementById('soNS'+tnik) || !document.getElementById('soNS'+tnik).checked) entries.splice(a--,1);
				else if(outnik.indexOf(tnik) == -1) outnik+=tnik;
			}
			if (entries.length == 0) continue;
                       
			finouta[y] = '<a href="javascript:void(0)" style="color:'+colorcfg['coltext']+'" onclick="getatt('+ x +',\'a\',\''+outnik+'\')">' + uniout + ' (' + (entries.length) + ')</a><br>';
			y++;
		}
	}
	var y = finouta.length;

	var findiv = Math.ceil(y/3);
	
	var listoutf = '<p>Aṭṭhakathā term search for <b style="color:'+colorcfg['colped']+'">'+getstring+'</b>:<hr /><table width="100%">';
	if(y == 0) {
		var outDiv = document.createElement('div');
		outDiv.innerHTML = listoutf + '<tr><td>No results</td></tr></table><hr />';
		document.getElementById('difb').innerHTML = '';
		document.getElementById('difb').appendChild(outDiv);
		document.getElementById('cdif').scrollTop=0;
		return;
	}	
		
	for (z = 0; z < findiv; z++)
	{
		listoutf += '<tr><td>'+finouta[z]+'</td><td>'+(finouta[findiv+z]?finouta[findiv+z]:'')+'</td><td>'+(finouta[(findiv*2)+z]?finouta[(findiv*2)+z]:'')+'</td></tr>';
	}
	var outDiv = document.createElement('div');
	outDiv.innerHTML = listoutf + '</table>';
	document.getElementById('difb').innerHTML = '';
	document.getElementById('difb').appendChild(outDiv);
	document.getElementById('cdif').scrollTop=0;
	yut = 0;
}


function tiksearchstart()
{
	if(typeof(tiklist) == 'undefined') {
		return;
	}

	clearDivs('dif');
	
	var getstring = document.form.manual.value;
	if(document.form.sofuzzy.checked) {
		getstring = toFuzzy(getstring);
	}
	
	var gslength = getstring.length;
	var gsplit = new Array();	
	var hsplit = [];
	var gletter = getstring.charAt(0);
	var foldersw = new Array();
	var f0 = 0;
	var f1 = 0;

	var finouta = new Array();
	var y = 0;
	var finout = '';
	var outnik = '';

	for (x = 0; x < tiklist.length; x++)
	{
		outnik = '';
		var tikt = tiklist[x].split('#')[0];
		
		if(document.form.sofuzzy.checked) {
			tikt = toFuzzy(tikt);
		}
        if (document.form.soregexp.checked) { // reg exp
			var yessir = (tikt.search(getstring) == 0 || (!document.form.sostartword.checked && tikt.search(getstring) > -1));
		}
		else { // non reg exp
			var yessir = (tikt.indexOf(getstring) == 0 || (!document.form.sostartword.checked && tikt.indexOf(getstring) > -1));
		}
		if(yessir)
		{

			var entries = tiklist[x].split('#');
			gsplit = entries.shift();
			uniout = toUni(gsplit);
			
			// nikayas
			for(a = 0; a < entries.length; a++) {
				var tnik = entries[a].charAt(0);
				if(!document.getElementById('soNS'+tnik) || !document.getElementById('soNS'+tnik).checked) entries.splice(a--,1);
				else if(outnik.indexOf(tnik) == -1) outnik+=tnik;
			}
			if (entries.length == 0) continue;

			finouta[y] = '<a href="javascript:void(0)" style="color:'+colorcfg['coltext']+'" onclick="getatt('+ x +',\'t\',\''+outnik+'\')">' + uniout + ' (' + (entries.length) + ')</a><br>';
			y++;
		}
	}
	var y = finouta.length;

	var findiv = Math.ceil(y/3);
	
	var listoutf = '<p>Ṭīka term search for <b style="color:'+colorcfg['colped']+'">'+getstring+'</b>:<hr /><table width="100%">';
	if(y == 0) {
		var outDiv = document.createElement('div');
		outDiv.innerHTML = listoutf + '<tr><td>No results</td></tr></table><hr />';
		document.getElementById('difb').innerHTML = '';
		document.getElementById('difb').appendChild(outDiv);
		document.getElementById('cdif').scrollTop=0;
		return;
	}	
		
	for (z = 0; z < findiv; z++)
	{
		listoutf += '<tr><td>'+finouta[z]+'</td><td>'+(finouta[findiv+z]?finouta[findiv+z]:'')+'</td><td>'+(finouta[(findiv*2)+z]?finouta[(findiv*2)+z]:'')+'</td></tr>';
	}
	var outDiv = document.createElement('div');
	outDiv.innerHTML = listoutf + '</table>';
	document.getElementById('difb').innerHTML = '';
	document.getElementById('difb').appendChild(outDiv);
	document.getElementById('cdif').scrollTop=0;
	yut = 0;
}


function titlesearchstart()
{
	if(typeof(titlelist) == 'undefined') {
		return;
	}

	clearDivs('dif');
	
	var getstring = document.form.manual.value;
	if(document.form.sofuzzy.checked) {
		getstring = toFuzzy(getstring);
	}
	
	var gslength = getstring.length;
	var gsplit = new Array();	
	var hsplit = [];
	var gletter = getstring.charAt(0);
	var foldersw = new Array();
	var f0 = 0;
	var f1 = 0;

	var finouta = new Array();
	var y = 0;
	var finout = '';

	var outnik = '';

	for (x = 0; x < titlelist.length; x++)
	{
		
		outnik = '';
		
		var titt = titlelist[x].split('#')[0];
		
		if(document.form.sofuzzy.checked) {
			titt = toFuzzy(titt);
		}
        if (document.form.soregexp.checked) { // reg exp
			var yessir = (titt.search(getstring) == 0 || (!document.form.sostartword.checked && titt.search(getstring) > -1));
		}
		else { // non reg exp
			var yessir = (titt.indexOf(getstring) == 0 || (!document.form.sostartword.checked && titt.indexOf(getstring) > -1));
		}
		if(yessir)
		{
			
			// separate mat
			var entries = titlelist[x].split('#');
			gsplit = entries.shift();
			uniout = toUni(gsplit);

			for(a = 0; a < entries.length; a++) {
				if((entries[a].charAt(entries[a].length-3) == 'm' && !document.getElementById('soMATM').checked) || (entries[a].charAt(entries[a].length-3) == 'a' && !document.getElementById('soMATA').checked) || (entries[a].charAt(entries[a].length-3) == 't' && !document.getElementById('soMATT').checked)) {
					entries.splice(a--,1);
				}
			}
			if (entries.length == 0) continue;
			
			// nikayas
			for(a = 0; a < entries.length; a++) {
				var tnik = entries[a].charAt(0);
				if(!document.getElementById('soNS'+tnik) || !document.getElementById('soNS'+tnik).checked) entries.splice(a--,1);
				else if(outnik.indexOf(tnik) == -1) outnik+=tnik;
			}
			if (entries.length == 0) continue;

			finouta[y] = '<a href="javascript:void(0)" style="color:'+colorcfg['coltext']+'" onclick="gettitle('+ x +','+document.getElementById('soMATM').checked+','+document.getElementById('soMATA').checked+','+document.getElementById('soMATT').checked+',\''+outnik+'\')">' + uniout + ' (' + entries.length + ')</a><br>';
			y++;
		}
	}
	y = finouta.length;

	var findiv = Math.ceil(y/2);
	
	var listoutf = '<p>Title search for <b style="color:'+colorcfg['colped']+'">'+getstring+'</b>:<hr /><table width="100%">';
	if(y == 0) {
		var outDiv = document.createElement('div');
		outDiv.innerHTML = listoutf + '<tr><td>No results</td></tr></table><hr />';
		document.getElementById('difb').innerHTML = '';
		document.getElementById('difb').appendChild(outDiv);
		document.getElementById('cdif').scrollTop=0;
		return;
	}	
		
	for (z = 0; z < findiv; z++)
	{
		listoutf += '<tr><td>'+finouta[z]+'</td><td>'+(finouta[findiv+z]?finouta[findiv+z]:'')+'</td></tr>';
	}
	var outDiv = document.createElement('div');
	outDiv.innerHTML = listoutf + '</table>';
	document.getElementById('difb').innerHTML = '';
	document.getElementById('difb').appendChild(outDiv);
	document.getElementById('cdif').scrollTop=0;
	yut = 0;
}



var pedfileget = '';
function paliXML(file)
{
	
	clearDivs('dif');

	var tloc = file.split('/');
	var t1 = tloc[1];	
	var t2 = tloc[2];
	pedfileget = t1 + '/' + t2;
	var pedp = 'etc/XML1/'+ t1+'/ped.xml';

	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", pedp, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;
	
	var data = xmlDoc.getElementsByTagName('data')[t2].textContent;
	
	var dataNode = document.createElement('div');
	dataNode.innerHTML = data.replace(/\[([^\]]*)\]/g, "[<em style=\"color:"+colorcfg['colped']+"\">$1</em>]");
	document.getElementById('difb').setAttribute('align','left');
	document.getElementById('difb').appendChild(dataNode);
    document.getElementById('cdif').scrollTop=0;

	var pedln = []; // limit in folders
	pedln.push(4446);
	pedln.push(2932);
	pedln.push(3907);
	pedln.push(3687);
	pedln.push(1304);
	
	var tnum = parseFloat(t2);
	var tout = '';
	var bout = '';

	if (tnum != 0) tout += '<div style="background-color:'+colorcfg['colbkcp']+'"><img id="tout" src="images/toolsin.png" onclick="paliXML(\'PED/' + t1 + '/' + (tnum - 1) + '\')" /></div>';
	if (tnum != pedln[t2]) bout += '<div style="background-color:'+colorcfg['colbkcp']+'"><img id="bout" src="images/tools.png"  onclick="paliXML(\'PED/' + t1 + '/' + (tnum + 1) + '\')"></div>';
	document.getElementById('lt').innerHTML = tout;
	document.getElementById('lb').innerHTML = bout;
    document.getElementById('cdif').scrollTop=0;
}


var dppnhist = [];
var dhmark = 0;

function DPPNXML(file,which)
{

	clearDivs('dif');
	
	if(!which) { // not from select
		var dppnhistt = [];
		dppnhist = dppnhist.slice(0,dhmark+1); // cut old future
		for (i in dppnhist) {
			if (dppnhist[i] != file) { dppnhistt.push(dppnhist[i]); }
		}
		dppnhist = dppnhistt.concat([file]); // add latest 
		dhmark = dppnhist.length; // set mark to latest
	}
	
	
	var filea = file.split(',');
	var tloc = filea[0].split('/');
	
	if (nameno[tloc[1]+'/'+tloc[2]]) { // fudge
		var ttmp = nameno[tloc[1]+'/'+tloc[2]].split('/');
		tloc[0] = 'dppn';
		tloc[1] = ttmp[0];
		tloc[2] = ttmp[1];
		tloc[3] = ttmp[2];
	}
	
	// xml
	
	var dppnf = 'etc/XML2/'+tloc[1]+'.xml';

	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", dppnf, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;

	var data = ' ' + xmlDoc.getElementsByTagName('entry')[tloc[2]].textContent.replace(/href/g, 'style="color:blue" href').replace(/\.  /g, '.&nbsp; ');
	
	// output

	var dataNode = document.createElement('div');
	dataNode.innerHTML = '<div class="label" id="dppnl"></div><br/>' + data;
	document.getElementById('difb').setAttribute('align','left');
	document.getElementById('difb').appendChild(dataNode);
    document.getElementById('cdif').scrollTop=0;


	var showing = '<select title="show history" onchange="dhmark=this.length-1-this.selectedIndex; DPPNXML(this.options[this.selectedIndex].value,1);">';
	
	if (dppnhist.length > 1) { // show select
		for (i = dppnhist.length-1; i >= 0; i--) {
			showing += '<option value="'+dppnhist[i]+'"';
			if (i == dhmark) { showing += ' selected'; }
			var dhs = dppnhist[i].split(',');
			showing += '>' + (dhs[1] ? dhs[1] : dhs[0]) + '</option>';
		}
		showing += '</select>';
		document.getElementById('dppnl').innerHTML = '<div style="background-color:'+colorcfg['colbkcp']+'">' + showing + '</div>';

	}

	// get number

	var ncfull = 0;
	if (namecount.length != 0) ncfull = 1;  // tell us no to make the array
	
	nnc = 0;
	for (i in nameda) {
		if (nameda[i] == tloc[1]+'/'+tloc[2]) {
			tnum = nnc;
			if (ncfull == 1) break; // no need to make the array
		}
		nnc++;
		if (ncfull == 0) namecount.push([nameda[i],toUni(i.replace("f", " "))]);
	}

	// buttons
	
	var tout = '';
	var bout = '';
	if (tnum != 0) tout += '<div style="background-color:'+colorcfg['colbkcp']+'"><img id="tout" src="images/toolsin.png" onclick="DPPNXML(\'dppn/' + namecount[tnum-1][0] + ',' + namecount[tnum-1][1] + '\')" /></div>';
	if (tnum != namecount.length) bout += '<div style="background-color:'+colorcfg['colbkcp']+'"><img id="bout" src="images/tools.png"  onclick="DPPNXML(\'dppn/' + namecount[tnum+1][0] + ',' + namecount[tnum+1][1] + '\')"></div>';
	document.getElementById('lt').innerHTML = tout;
	document.getElementById('lb').innerHTML = bout;
    document.getElementById('cdif').scrollTop=0;
}

function atiSearchStart() {

	clearDivs('dif');
	
	var getstring = document.form.manual.value;

	if(cfg['catioff'] == 'checked') {
		atiSearchOffline(getstring);
		return;
	}

	var atiurl = (cfg['catioff'] == 'checked' ? 'file://' + getHomePath().replace(/\\/g, '/') +'/'+cfg['catiloc']+'/html/' : 'http://www.accesstoinsight.org/');
	var bannerDiv = document.createElement('div');
	bannerDiv.innerHTML = '<img style="vertical-align:middle" src="'+atiurl+'favicon.ico" title="Search courtesy of http://www.accesstoinsight.org/" onclick="window.open(\'http://www.accesstoinsight.org/\')">&nbsp;<a href="http://www.accesstoinsight.org/" target="_blank" style="color:blue">AccessToInsight.org</a> search for <b>'+getstring+'</b>:<br><br>';
	
	document.getElementById('difb').appendChild(bannerDiv);
	
	getstring = getstring.replace(/^  */g, '').replace(/  *$/g, '').replace(/  */g, '%2B');
	
	var outNode = document.createElement('iframe');
	outNode.setAttribute('frameBorder','0');
	outNode.setAttribute('width','100%');
	outNode.setAttribute('height',document.getElementById('cdif').offsetHeight);
	outNode.setAttribute('src','http://www.google.com/cse?cx=015061908441090246348%3Aal1bklhbjbi&cof=FORID%3A9%3BNB%3A1&ie=UTF-8&q='+getstring+'+more:suttas_only&sa=Search&ad=w9&num=10');
	document.getElementById('difb').appendChild(outNode);
}

function atiSearchOffline(getstring) {
	
	var finalout = '';
	
	var listout = '';
	
	var buffer = 30; // number of letters to add before and after the match

	document.getElementById('difb').innerHTML = '<div><a name="diftop"><br />ATI full-text search for <b style="color:'+colorcfg['colped']+'">'+getstring+'</b> (off-line):<br><br><div id="dictList"></div></div><hr><hr>';
	
	var nik = ['d','m','s','a','k'];
	for (d in nik) {
		if(!document.getElementById('soNS'+nik[d]).checked) continue;
		var titleNode = document.createElement('div');
		titleNode.innerHTML = '<hr><h1>'+nik[d]+'</h1>';
		document.getElementById('difb').appendChild(titleNode);

		var titleNode2 = document.createElement('div');
		titleNode2.innerHTML = '<hr><b>'+nik[d]+'</b><br><br>';
		document.getElementById('dictList').appendChild(titleNode2);
		
		eval('var anik = ati'+nik[d]+';');
		for (var c = 0; c < anik.length; c++) {
			var cont = readExtFile(cfg['catiloc']+'/html/tipitaka/'+anik[c]);
			var parser=new DOMParser();
			var xmlDoc = parser.parseFromString(cont,'text/xml');

			var title = toUni(xmlDoc.getElementsByTagName('title')[0].textContent);
			var data = xmlDoc.getElementsByTagName('div');
			for (j in data) {
				if(data[j].id == 'H_content') {
				var texttomatch = data[j].textContent;
					startmatch = texttomatch.search(getstring);
					postpara = '';
					if (startmatch >= 0)
					{
						var outNode = document.createElement('div');
						outNode.setAttribute('style','position:relative')
						listout = '<a href="#atio'+c+'" style="color:'+colorcfg['colsel']+'">' + title + '</a>'; 
						while (startmatch >= 0)
						{				
							var gotstring = texttomatch.match(getstring)[0];
							var endmatch = startmatch + gotstring.length;

							var buffers = buffer;
							var buffere = buffer;
							
							while(startmatch-buffers > 0) { // get first space before buffer
								if(texttomatch.charAt(startmatch-buffers-1) == ' ') break;
								buffers--;
							}
							while(endmatch+buffere < texttomatch.length) { // get first space before buffer
								if(texttomatch.charAt(endmatch+buffere) == ' ') break;
								buffere++;
							}
							beforem = '... '+texttomatch.substring(startmatch-buffers,startmatch);
							afterm = texttomatch.substring(endmatch,endmatch+buffere) + ' ...';
							postpara += beforem + '<c0>' + gotstring.replace(/(.) (.)/g, "$1<xc> <c0>$2") + '<xc>' + afterm + '<br/>';
							texttomatch = texttomatch.substring(endmatch);
							startmatch = texttomatch.search(getstring);
						}

						postpara = postpara.replace(/<c0>/g, '<span style="color:'+colorcfg['colped']+'">').replace(/<xc>/g, '</span>');
						
						outNode.innerHTML = '<b><a href="file://' + getHomePath().replace(/\\/g, '/') +'/'+cfg['catiloc']+'/html/tipitaka/'+anik[c]+'" target="_blank">'+title+'</a></b> <a name="atio'+c+'" href="javascript:void(0)" onclick="document.getElementById(\'cdif\').scrollTop = 0;" class="small" style="color:'+colorcfg['coldppn']+'">top</a><p>' + postpara + '</p>';

						document.getElementById('difb').appendChild(outNode);

						// word list
						var listNode = document.createElement('div');
						listNode.innerHTML = listout;
						document.getElementById('dictList').appendChild(listNode);
					}
				}
			}
		}		
	}
	document.getElementById('cdif').scrollTop=0;
}
namecount = [];

function clickDictOption() {
	if (document.form.dictin.value != '' && cfg['autodict'] == 'checked') {
		document.form.lastsearch.value = document.form.dictin.value;
		dictType();
	}
}

function dictLoad() {
	var which = document.form.sped.selectedIndex;
	document.getElementById('soNO').style.display = 'none';
	document.getElementById('soFT').style.display = 'none';
	document.getElementById('soSW').style.display = 'none';
	document.getElementById('soRX').style.display = 'none';
	document.getElementById('soFZ').style.display = 'none';
	document.getElementById('soNSV').style.display = 'none';  // Vinaya Select
	document.getElementById('soNS').style.display = 'none';  // Nikaya Select
	document.getElementById('soNSA').style.display = 'none';  // Abhi Select
	document.getElementById('soMAT').style.display = 'none';  // MAT Select
	switch (which) {
		case 0: //dpr
			document.getElementById('soNO').style.display = 'block';
		break;
		case 1: // ped
			document.getElementById('soFZ').style.display = 'block';
			document.getElementById('soRX').style.display = 'block';
			document.getElementById('soFT').style.display = 'block';
			document.getElementById('soSW').style.display = 'block';
		break;
		case 2: // dppn
			document.getElementById('soFZ').style.display = 'block';
			document.getElementById('soRX').style.display = 'block';
			document.getElementById('soFT').style.display = 'block';
			document.getElementById('soSW').style.display = 'block';
		break;
		case 3: // CPED
			document.getElementById('soFZ').style.display = 'block';
			document.getElementById('soFT').style.display = 'block';
			document.getElementById('soRX').style.display = 'block';
			document.getElementById('soSW').style.display = 'block';
		break;
		case 4: // CEPD
			document.getElementById('soFZ').style.display = 'block';
			document.getElementById('soFT').style.display = 'block';
			document.getElementById('soRX').style.display = 'block';
			document.getElementById('soSW').style.display = 'block';
			if(typeof(epd) == 'undefined') {
				var headID = document.getElementsByTagName("head")[0];         
				var newScript = document.createElement('script');
				newScript.type = 'text/javascript';
				newScript.src = 'js/epd.js';
				headID.appendChild(newScript);
			}
		break;
		case 5: // ATTH
			document.getElementById('soFZ').style.display = 'block';
			document.getElementById('soRX').style.display = 'block';
			document.getElementById('soSW').style.display = 'block';
			document.getElementById('soNSV').style.display = 'block';
			document.getElementById('soNS').style.display = 'block';
			document.getElementById('soNSA').style.display = 'block';
			if(typeof(attlist) == 'undefined') {
				var headID = document.getElementsByTagName("head")[0];         
				var newScript = document.createElement('script');
				newScript.type = 'text/javascript';
				newScript.src = 'js/attlist.js';
				headID.appendChild(newScript);
			}
		break;
		case 6: // TIKA
			document.getElementById('soFZ').style.display = 'block';
			document.getElementById('soRX').style.display = 'block';
			document.getElementById('soSW').style.display = 'block';
			document.getElementById('soNSV').style.display = 'block';
			document.getElementById('soNS').style.display = 'block';
			document.getElementById('soNSA').style.display = 'block';
			if(typeof(tiklist) == 'undefined') {
				var headID = document.getElementsByTagName("head")[0];         
				var newScript = document.createElement('script');
				newScript.type = 'text/javascript';
				newScript.src = 'js/tiklist.js';
				headID.appendChild(newScript);
			}
		break;
		case 7: // Title
			document.getElementById('soFZ').style.display = 'block';
			document.getElementById('soRX').style.display = 'block';
			document.getElementById('soSW').style.display = 'block';
			document.getElementById('soMAT').style.display = 'block';
			document.getElementById('soNSV').style.display = 'block';
			document.getElementById('soNS').style.display = 'block';
			document.getElementById('soNSA').style.display = 'block';
			if(typeof(titlelist) == 'undefined') {
				var headID = document.getElementsByTagName("head")[0];         
				var newScript = document.createElement('script');
				newScript.type = 'text/javascript';
				newScript.src = 'js/titles.js';
				headID.appendChild(newScript);
			}
		break;
		case 8: // ATI
			if(cfg['catioff'] == 'checked') document.getElementById('soNS').style.display = 'block';
			else document.getElementById('soNO').style.display = 'block';
		break;
	}
}

function dictType(hard) {
	clearDivs('dif');
	var getstring = document.form.dictin.value;
	document.form.manual.value = toVel(document.form.dictin.value);
	switch (document.form.sped.selectedIndex) {
		case 0:
			var TheData = document.form.manual.value;
			postout(TheData,0,1);
			break;
		case 1:
			moveframey('dif');
			moveframex(3);
			pedsearchstart();
			break;
		case 2:
			moveframey('dif');
			moveframex(3);
			dppnsearchstart();
			break;
		case 3:
			moveframey('dif');
			moveframex(3);
			mlsearchstart();
			break;
		case 4:
			moveframey('dif');
			moveframex(3);
			epdsearchstart();
			break;
		case 5:
			moveframey('dif');
			moveframex(3);
			attsearchstart();
			break;
		case 6:
			moveframey('dif');
			moveframex(3);
			tiksearchstart();
			break;
		case 7:
			moveframey('dif');
			moveframex(3);
			titlesearchstart();
			break;
		case 8: // ATI
			if(!hard) break; // only on button press
			moveframey('dif');
			moveframex(3);
			atiSearchStart();
			break;
	}
}
