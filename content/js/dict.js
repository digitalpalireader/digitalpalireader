var yut = 0;
var remote = true;

function pedsearchstart()
{
	var getstring = document.form.manual.value;
      
	if(!/[^0-9\/]/.exec(getstring) && devCheck == 1) { // dev link
		paliXML('dev/'+getstring+',dev');
		return;
	}
	
	if(document.form.sofulltext.checked) { // full text search
		
		pedFullTextSearch(getstring);
		return;
	}

	if(document.form.sofuzzy.checked) {
		getstring = toFuzzy(getstring);
	}

	var finouta = new Array();
	var y = 0;
	var finout = '';

	for (pedt in mainda)
	{
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
			for (z = 0; z < mainda[pedt].length; z++) {
			
				var loc = mainda[pedt][z];
				
				uniout = pedt;
				
				uniout = toUni(uniout).replace(/`/g,'˚');
				
				finouta[y] = '<a href="javascript:void(0)" style="color:'+colorcfg['coltext']+'" onclick="paliXML(\'PED/' + loc + ','+uniout+'\')">' + uniout + (mainda[pedt].length > 1 ? ' ' + (z+1) : '') + '</a><br>';

				y++;
			}
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
	
	for (i = 0; i < 5; i++) {
		
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

var G_dppn = [];

function dppnsearchstart()
{
	var getstring = document.form.manual.value;

	if(!/[^0-9\/]/.exec(getstring) && devCheck == 1) { // dev link
		DPPNXML('dppn/'+getstring);
		return;
	}

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
	var loc = '';	
	
	var gletter = getstring.charAt(0);

	var foldersw = new Array();
	var f0 = 0;
	var f1 = 0;

	var dict = '../DPPN/';
	
	var finouta = new Array();
	var finout = '';

    for (x in nameda)
	{

		var dppnt = x;
		
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
			for (z = 0; z < nameda[x].length; z++) {
			
				loc = nameda[x][z];
				
				uniout = toUni(dppnt);
					
				finouta.push('<a href="javascript:void(0)" style="color:'+colorcfg['coltext']+'" onClick="moveframey(\'dif\'); DPPNXML(\''+dppnt+'/' + loc + ',' + uniout + '\')">' + uniout + (nameda[x].length > 1 ? ' ' + (z+1) : '') + '</a><br>');
			}
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
	for (i = 1; i < 10; i++) {
		
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", 'etc/XML2/'+i+'.xml', false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		
		var allp = xmlDoc.getElementsByTagName('entry');
		
		for (j =0; j < allp.length; j++) {
			var addend = ''; 
			
			var texttomatch = allp[j].textContent;
			if(texttomatch.indexOf('Pali Proper Names') >=0) continue;
			if(texttomatch.indexOf('"huge"]') > -1) var ttitle = texttomatch.substring(texttomatch.indexOf('"huge"]')+7,texttomatch.indexOf('[/div]'));
			else if(texttomatch.indexOf('[b]') > -1) {
				var ttitle = texttomatch.substring(texttomatch.indexOf('[b]')+3,texttomatch.indexOf('[/b]'));
			}
			else continue;
			texttomatch = texttomatch.replace(/\[\/*a[^]]*\]/g, '');
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
				
				finalouta.push(ttitle+'###<hr class="thick"><a name="dppno'+i+'/'+j+'"><div style="position:relative"><div style="position:absolute;top:0px; left:0px;"><a href="javascript:void(0)" onclick="document.getElementById(\'cdif\').scrollTop = 0;" class="small" style="color:'+colorcfg['colped']+'">top</a></div><br/>' + postpara.replace(/\[/g, '<').replace(/\]/g, '>') + addend + '</b></div>');
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

	var finout = sortaz(finalouta).join('\n');


	var outDiv = document.createElement('div');
	outDiv.innerHTML = '<div><a name="diftop"><br />DPPN full-text search for <b style="color:'+colorcfg['colped']+'">'+getstring+'</b>:</div>'+ listoutf + '</table><hr />' + finout;
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
	
	finout = '<p>CPED search for <b style="color:'+colorcfg['colped']+'">'+getstring+'</b>:<hr /><table width=100%><tr><td valign="top">';
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
	
	finout = '<p>CEPD search for <b style="color:'+colorcfg['colped']+'">'+getstring+'</b>:<hr /><table width=100%><tr><td valign="top">';
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
				if(!document.getElementById('soMAT'+entries[a].charAt(entries[a].length-3)).checked) {
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
			var dppnEntry = [];
			if(nameda[gsplit]) {
				dppnEntry = nameda[gsplit];
			}
			else {
				if(typeof(nameda[gsplit.replace(/\.m$/,'')]) == 'object') {
					dppnEntry = nameda[gsplit.replace(/\.m$/,'')];
				}
				else if(typeof(nameda[gsplit.replace(/o$/,'a')]) == 'object') {
					dppnEntry = nameda[gsplit.replace(/o$/,'a')];
				}
			}
			var dEI = '';
			var dEO = '';
			if(dppnEntry.length > 0) {
				for(d in dppnEntry) {

					var dppnf = 'etc/XML2/'+dppnEntry[d].split('/')[0]+'.xml';

					var xmlhttp = new window.XMLHttpRequest();
					xmlhttp.open("GET", dppnf, false);
					xmlhttp.send(null);
					var xmlDoc = xmlhttp.responseXML.documentElement;

					var data = ' ' + xmlDoc.getElementsByTagName('entry')[parseInt(dppnEntry[d].split('/')[1])].textContent.replace(/\[/g, '<').replace(/\]/g, '>').replace(/href/g, 'style="color:blue" href').replace(/\.  /g, '.&nbsp; ');
			
					dEI += '&nbsp;<span class="pointer" style="color:'+colorcfg['coldppn']+'" title="DPPN entry" onclick="showHideId(\'titleS'+x+'^'+d+'\');">n</span>';
					dEO += '<div class="hide round" id="titleS'+x+'^'+d+'">'+data+'</div>'
				}
			}

			finouta[y] = '<a href="javascript:void(0)" style="color:'+colorcfg['coltext']+'" onclick="gettitle('+ x +','+document.getElementById('soMATm').checked+','+document.getElementById('soMATa').checked+','+document.getElementById('soMATt').checked+',\''+outnik+'\')">' + uniout + ' (' + entries.length + ')</a>' + dEI + '<br>' + dEO;
			y++;
		}
	}
	y = finouta.length;

	var findiv = Math.ceil(y/2);
	
	var listoutf = '<p>Title search for <b style="color:'+colorcfg['colped']+'">'+getstring+'</b>:<hr />';
	if(y == 0) {
		var outDiv = document.createElement('div');
		outDiv.innerHTML = listoutf + '<tr><td>No results</td></tr></table><hr />';
		document.getElementById('difb').innerHTML = '';
		document.getElementById('difb').appendChild(outDiv);
		document.getElementById('cdif').scrollTop=0;
		return;
	}	
	var finol = '';
	var finor = '';
	
	for (z = 0; z < findiv; z++)
	{
		finol +=finouta[z]
		finor += (finouta[findiv+z]?finouta[findiv+z]:''); 
	}
	listoutf += '<table width="100%"><tr><td>'+finol+'</td><td>'+finor+'</td></tr></table>';
	
	var outDiv = document.createElement('div');
	outDiv.innerHTML = listoutf;
	document.getElementById('difb').innerHTML = '';
	document.getElementById('difb').appendChild(outDiv);
	document.getElementById('cdif').scrollTop=0;
	yut = 0;
}

var G_peda = [];

var G_pedhist = [];
var G_phmark = 0;

var pedfileget = '';
function paliXML(file,which)
{
	
	clearDivs('dif');

	
	if(!which) { // not from select
		var G_pedhistt = [];
		G_pedhist = G_pedhist.slice(0,G_phmark+1); // cut old future
		for (i in G_pedhist) {
			if (G_pedhist[i] != file) { G_pedhistt.push(G_pedhist[i]); }
		}
		G_pedhist = G_pedhistt.concat([file]); // add latest 
		G_phmark = G_pedhist.length; // set mark to latest
	}
	
	var filea = file.split(',');
	var ttit = filea[1];
	var file = filea[0];

	if(!mainda[toVel(ttit)]) {
		if(irregda[toVel(ttit)]) {
			ttit = irregda[toVel(ttit)];
		}
	}
	
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

	// add links
	var dataa = data.split(' ');
	var datat = '';
	for (i = 0; i < dataa.length; i++) {
		if(/<[^>]*$/.exec(dataa[i])) {
			while(dataa[i] && !/^[^<>]*>/.exec(dataa[i])) {
				datat += ' ' + dataa[i++];
			}
			if(!data[i]) break;
			datat += ' ' + dataa[i].match(/^[^<>]*>/)[0];
			dataa[i] = dataa[i].replace(/^[^<>]*>/,'');
		}
		if(!data[i]) break;
		var tda = toVel(dataa[i].replace(/^[^<>]*>/, '').replace(/<[^>]*>/g, '').toLowerCase().replace(/[^āīūṭḍṅṇṃṃñḷĀĪŪṬḌṄṆṂÑḶa-z]/g,''));
		if(tda.length == 1) {
			datat += ' ' + dataa[i];
		}
		else if(typeof(mainda[tda]) == 'object' && tda != toVel(ttit)) datat += dataa[i].replace(toUni(tda), ' <a style="color:'+colorcfg['colsel']+'" href="javascript:void(0)" onclick="paliXML(\'PED/' + mainda[tda][0] + ','+toUni(tda)+'\')">'+toUni(tda)+'</a>');
		else { datat += ' ' + dataa[i]; }
	}
	data = datat.substring(1);


	var dataNode = document.createElement('div');
	dataNode.innerHTML = '<p>'+data.replace(/\[([^\]]*)\]/g, "[<em style=\"color:grey\">$1</em>]");
	document.getElementById('difb').setAttribute('align','left');
	document.getElementById('difb').appendChild(dataNode);
    document.getElementById('cdif').scrollTop=0;

	var tout = '';


	// get number
	var tname, lname, nname;

	if(mainda[toVel(ttit)]) {
		
		if(G_peda.length == 0) {
			for (i in mainda) {
				for (j in mainda[i]) {
					G_peda.push([i,mainda[i][j]]);
				}
			}
		}
		for (i in G_peda) {
			if(tname) {
				nname = G_peda[i][1]+","+toUni(G_peda[i][0]);
				break;
			}
			if (G_peda[i][0] == toVel(ttit) && G_peda[i][1] == pedfileget) {
				tname = G_peda[i][1]+","+toUni(G_peda[i][0]);
			}
			else lname = G_peda[i][1]+","+toUni(G_peda[i][0]);
		}
	}

	if (lname) tout += '<span class="abut lbut tiny" onclick="paliXML(\'PED/'+lname+'\')" />&lt;</span>';
	if (nname) tout += '<span class="abut rbut tiny" onclick="paliXML(\'PED/'+nname+'\')" />&gt;</span>';


	
	if (G_pedhist.length > 1) { // show select
		var showing = '<select title="go to history" onchange="if(this.selectedIndex != 0) { G_phmark=this.length-1-this.selectedIndex; paliXML(this.options[this.selectedIndex].value,1);}"><option>- history -</option>';
		for (i = G_pedhist.length-1; i >= 0; i--) {
			showing += '<option value="'+G_pedhist[i]+'"';
			if (i == G_phmark) { showing += ' selected'; }
			var dhs = G_pedhist[i].split(',');
			showing += '>' + (dhs[1] ? dhs[1] : dhs[0]) + '</option>';
		}
		showing += '</select>';
		tout += (tout.length > 0 ? ' ' : '') + showing;
	}


	document.getElementById('difhist').innerHTML = '<table><tr><td>' + tout + '</td></tr></table>';
    document.getElementById('cdif').scrollTop=0;
}


var G_dppnhist = [];
var G_dhmark = 0;

function DPPNXML(file,which)
{
	var filea = file.split(',');
	var tloc = filea[0].split('/');
	if (nameno[tloc[2]+'^'+filea[1]]) { // fudge
		var tt = nameno[tloc[2]+'^'+filea[1]];
		if (tt == '' || !nameda[tt]) {
			alert('Link not found');
			return;
		}
		tloc = [tt].concat(nameda[tt][0].split('/'));
	}
	
	tloc[0] = toVel(tloc[0]);
	
	clearDivs('dif');
	
	if(!which) { // not from select
		var dppnhistt = [];
		G_dppnhist = G_dppnhist.slice(0,G_dhmark+1); // cut old future
		for (i in G_dppnhist) {
			if (G_dppnhist[i] != file) { dppnhistt.push(G_dppnhist[i]); }
		}
		G_dppnhist = dppnhistt.concat([file]); // add latest 
		G_dhmark = G_dppnhist.length; // set mark to latest
	}
	
	

	
	// xml
	
	var dppnf = 'etc/XML2/'+tloc[1]+'.xml';

	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", dppnf, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;

	var data = ' ' + xmlDoc.getElementsByTagName('entry')[tloc[2]].textContent.replace(/\[/g, '<').replace(/\]/g, '>').replace(/href/g, 'style="color:blue" href').replace(/\.  /g, '.&nbsp; ');
	
	// output

	var dataNode = document.createElement('div');
	dataNode.innerHTML = '<p>'+data;
	document.getElementById('difb').setAttribute('align','left');
	document.getElementById('difb').appendChild(dataNode);
    document.getElementById('cdif').scrollTop=0;

	// get number
	var tname, lname, nname;
	
	if(G_dppn.length == 0) {
		for (i in nameda) {
			for (j in nameda[i]) {
				G_dppn.push([i,nameda[i][j]]);
			}
		}
	}
	for (i in G_dppn) {
		if(tname) {
			nname = "'"+toUni(G_dppn[i][0])+'/'+G_dppn[i][1]+"','"+toUni(G_dppn[i][0])+"'";
			break;
		}
		if (G_dppn[i][0] == tloc[0] && G_dppn[i][1] == tloc[1]+'/'+tloc[2]) {
			tname = "'"+toUni(G_dppn[i][0])+'/'+G_dppn[i][1]+"','"+toUni(G_dppn[i][0])+"'";
		}
		else lname = "'"+toUni(G_dppn[i][0])+'/'+G_dppn[i][1]+"','"+toUni(G_dppn[i][0])+"'";
	}
	if (!tname) lname = null;
	// buttons
	
	var tout = '';
	if (lname) tout += '<span class="abut lbut tiny" onclick="DPPNXML('+lname+')" />&lt;</span>';
	if (nname) tout += '<span class="abut rbut tiny" onclick="DPPNXML('+nname+')" />&gt;</span>';
	
	
	if (G_dppnhist.length > 1) { // show select
		var showing = '<select title="go to history" onchange="if(this.selectedIndex != 0) { G_dhmark=this.length-1-this.selectedIndex; DPPNXML(this.options[this.selectedIndex].value,1);}"><option>- history -</option>';
		for (i = G_dppnhist.length-1; i >= 0; i--) {
			showing += '<option value="'+G_dppnhist[i]+'"';
			if (i == G_dhmark) { showing += ' selected'; }
			var dhs = G_dppnhist[i].split(',');
			showing += '>' + (dhs[1] ? dhs[1] : dhs[0]) + '</option>';
		}
		showing += '</select>';
		tout += (tout.length > 0 ? ' ' : '') + showing;

	}

	document.getElementById('difhist').innerHTML = '<table><tr><td>' + tout + '</td></tr></table>';
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

	var which = document.form.sped.selectedIndex;
	
	if(which != 0) {
		clearDivs('dif');
		document.getElementById('difb').appendChild(pleasewait);
	}
	
	var getstring = document.form.dictin.value;
	document.form.manual.value = toVel(document.form.dictin.value);

	if (which != 0) {
		moveframey('dif');
		moveframex(3);
	}

	switch (which) {
		case 0:
			var TheData = document.form.manual.value;
			postout(TheData,0,1);
			break;
		case 1:
			pedsearchstart();
			break;
		case 2:
			dppnsearchstart();
			break;
		case 3:
			mlsearchstart();
			break;
		case 4:
			epdsearchstart();
			break;
		case 5:
			attsearchstart();
			break;
		case 6:
			tiksearchstart();
			break;
		case 7:
			titlesearchstart();
			break;
	}
}
