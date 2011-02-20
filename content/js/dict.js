var yut = 0;
var remote = true;

var ped = [];

function pedsearchstart()
{
	var getstring = document.form.manual.value;
      
	document.getElementById('difb').innerHTML='<div align=center><br><h1><img src="images/ajax-loader.gif" /> please wait...</h1></div>';
	

	
	getstring = getstring.replace(/"n/g, '`n');
	if (document.form.soregexp.checked) {
		getstring = getstring.replace(/\\\./g, ',');
	}
	else {
		getstring = getstring.replace(/\./g, ',');
	}

	if(document.form.sofulltext.checked) { // full text search
		
		pedFullTextSearch(getstring);
		return;
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
        if (document.form.soregexp.checked) { // reg exp
			var yessir = (ped[x].search(getstring) == 0 || (!document.form.sostartword.checked && ped[x].search(getstring) > -1));
		}
		else { // non reg exp
			var yessir = (ped[x].indexOf(getstring) == 0 || (!document.form.sostartword.checked && ped[x].indexOf(getstring) > -1));
		}
		if(yessir)
		{
            gsplit = ped[x].split('^');
			
			uniout = gsplit[0];
			
			uniout = uniout.replace(/aa/g, '\u0101');
			uniout = uniout.replace(/ii/g, '\u012B');
			uniout = uniout.replace(/uu/g, '\u016B');
			uniout = uniout.replace(/,t/g, '\u1E6D');
			uniout = uniout.replace(/,d/g, '\u1E0D');
			uniout = uniout.replace(/`n/g, '\u1E45');
			uniout = uniout.replace(/,n/g, '\u1E47');
			uniout = uniout.replace(/,m/g, '\u1E43');
			uniout = uniout.replace(/~n/g, '\u00F1');
			uniout = uniout.replace(/,l/g, '\u1E37');
			uniout = uniout.replace(/AA/g, '\u0100');
			uniout = uniout.replace(/II/g, '\u012A');
			uniout = uniout.replace(/UU/g, '\u016A');
			uniout = uniout.replace(/,T/g, '\u1E6C');
			uniout = uniout.replace(/,D/g, '\u1E0C');
			uniout = uniout.replace(/,N/g, '\u1E46');
			uniout = uniout.replace(/,M/g, '\u1E42');
			uniout = uniout.replace(/~N/g, '\u00D1');
			uniout = uniout.replace(/,L/g, '\u1E36');
			uniout = uniout.replace(/z/g, ' ');
			uniout = uniout.replace(/`/g, '\u00B0');
			
			finouta[y] = '<a href="#" style="color:'+colorcfg['coltext']+'" onclick="paliXML(\'PED/' + gsplit[1] + '\')">' + uniout + '</a><br>';

			y++;
		}
	}

	var y = finouta.length;

	var findiv = Math.ceil(y/3);
	
	var listoutf = '<p>PED entry search for <b style="color:'+colorcfg['colped']+'">'+getstring+'</b>:<hr /><table width="100%">';
	
	for (z = 0; z < findiv; z++)
	{
		listoutf += '<tr><td>'+finouta[z]+'</td><td>'+(finouta[findiv+z]?finouta[findiv+z]:'')+'</td><td>'+(finouta[(findiv*2)+z]?finouta[(findiv*2)+z]:'')+'</td></tr>';
	}
	document.getElementById('difb').innerHTML = listoutf + '</table><hr />';

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
		
		document.getElementById('mafbc').innerHTML = '';		
		
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
	
	for (z = 0; z < findiv; z++)
	{
		listoutf += '<tr><td>'+listouta[z]+'</td><td>'+(listouta[findiv+z]?listouta[findiv+z]:'')+'</td><td>'+(listouta[(findiv*2)+z]?listouta[(findiv*2)+z]:'')+'</td></tr>';
	}
	document.getElementById('difb').innerHTML = '<div><a name="diftop"><br />PED full-text search for <b style="color:'+colorcfg['colped']+'">'+getstring+'</b>:</div>';
	document.getElementById('difb').innerHTML += listoutf + '</table><hr />';
	document.getElementById('difb').innerHTML += finalout;
	document.getElementById('cdif').scrollTop=0;
}


var dppn = new Array();

function dppnsearchstart()
{

	var getstring = document.form.manual.value;

	document.getElementById('difb').innerHTML='<div align=center><br><h1><img src="images/ajax-loader.gif" /> please wait...</h1></div>';

	
	
	getstring = getstring.replace(/"n/g, '`n');
	if (document.form.soregexp.checked) {
		getstring = getstring.replace(/\\\./g, ',');
	}
	else {
		getstring = getstring.replace(/\./g, ',');
	}

	if(document.form.sofulltext.checked) { // full text search
		
		dppnFullTextSearch(getstring);
		return;
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
        if (document.form.soregexp.checked) { // reg exp
			var yessir = (dppn[x].search(getstring) == 0 || (!document.form.sostartword.checked && dppn[x].search(getstring) > -1));
		}
		else { // non reg exp
			var yessir = (dppn[x].indexOf(getstring) == 0 || (!document.form.sostartword.checked && dppn[x].indexOf(getstring) > -1));
		}
		if(yessir)
		{
			gsplit = dppn[x].split('^');
			
			uniout = gsplit[0];
			
			if (gsplit[0].charAt(gsplit[0].length-1) == '1' && !nameda[gsplit[0].substring(0,gsplit[0].length-1)+'2']) { // no second, so drop the f1
				uniout = uniout.substring(0,uniout.length-2);
			}

			uniout = uniout.replace(/aa/g, '\u0101');
			uniout = uniout.replace(/ii/g, '\u012B');
			uniout = uniout.replace(/uu/g, '\u016B');
			uniout = uniout.replace(/,t/g, '\u1E6D');
			uniout = uniout.replace(/,d/g, '\u1E0D');
			uniout = uniout.replace(/`n/g, '\u1E45');
			uniout = uniout.replace(/,n/g, '\u1E47');
			uniout = uniout.replace(/,m/g, '\u1E43');
			uniout = uniout.replace(/~n/g, '\u00F1');
			uniout = uniout.replace(/,l/g, '\u1E37');
			uniout = uniout.replace(/AA/g, '\u0100');
			uniout = uniout.replace(/II/g, '\u012A');
			uniout = uniout.replace(/UU/g, '\u016A');
			uniout = uniout.replace(/,T/g, '\u1E6C');
			uniout = uniout.replace(/,D/g, '\u1E0C');
			uniout = uniout.replace(/,N/g, '\u1E46');
			uniout = uniout.replace(/,M/g, '\u1E42');
			uniout = uniout.replace(/~N/g, '\u00D1');
			uniout = uniout.replace(/,L/g, '\u1E36');
			uniout = uniout.replace(/f/g, ' ');
			uniout = uniout.replace(/`/g, '\u00B0');
			
			
			finouta[y] = '<a href="javascript:void(0)" style="color:'+colorcfg['coltext']+'" onClick="moveframey(\'dif\'); DPPNXML(\'dppn/' + gsplit[1] + ',' + uniout + '\')">' + uniout + '</a><br>';
			y++;
		}
	}


	
	var y = finouta.length;

	var findiv = Math.ceil(y/3);
	
	var listoutf = '<p>DPPN entry search for <b style="color:'+colorcfg['colped']+'">'+getstring+'</b>:<hr /><table width="100%">';
	
	for (z = 0; z < findiv; z++)
	{
		listoutf += '<tr><td>'+finouta[z]+'</td><td>'+(finouta[findiv+z]?finouta[findiv+z]:'')+'</td><td>'+(finouta[(findiv*2)+z]?finouta[(findiv*2)+z]:'')+'</td></tr>';
	}
	document.getElementById('difb').innerHTML =  listoutf + '</table><hr />';
    document.getElementById('cdif').scrollTop=0;
	yut = 0;
}

function dppnFullTextSearch(getstring) {
	
	var finalouta = [];
	
	var listouta = [];
	getstring = replaceunistandard(getstring);
	
	for (i = 1; i < 9; i++) {
		
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", 'etc/XML2/'+i+'.xml', false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		document.getElementById('mafbc').innerHTML = '';		
		
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
				
				finalouta.push(ttitle+'###<a name="dppno'+i+'/'+j+'"><div style="position:relative"><div style="position:absolute;top:0px; left:0px;"><a href="#diftop" class="small" style="color:'+colorcfg['colped']+'">top</a></div>' + postpara + '</b></div>');
			}
		}
	}

	// word list

	listouta = sortaz(listouta);

	var y = listouta.length;

	var findiv = Math.ceil(y/3);
	
	var listoutf = '<hr /><table width="100%">';
	
	for (z = 0; z < findiv; z++)
	{
		listoutf += '<tr><td>'+listouta[z]+'</td><td>'+(listouta[findiv+z]?listouta[findiv+z]:'')+'</td><td>'+(listouta[(findiv*2)+z]?listouta[(findiv*2)+z]:'')+'</td></tr>';
	}
	document.getElementById('difb').innerHTML = '<div><a name="diftop"><br />DPPN full-text search for <b style="color:'+colorcfg['colped']+'">'+getstring+'</b>:</div>';
	document.getElementById('difb').innerHTML += listoutf + '</table><hr />';
	
	var finalout = sortaz(finalouta).join('');
	
	document.getElementById('difb').innerHTML += finalout;
	document.getElementById('cdif').scrollTop=0;
}



var yg = [];

function mlsearchstart()
{
	document.getElementById('difb').innerHTML='';
	document.getElementById('anfs').innerHTML='';
	document.getElementById('anfsd').innerHTML='';
	document.getElementById('anfb').innerHTML='<div align=left id="anfc"></div><div align=right id="anfd"></div>';
	
	var getstring = document.form.manual.value;
	
	var gslength = getstring.length;
	var gsplit = new Array();
	
	
	var gletter = getstring.charAt(0);
	var finouta = new Array();
	var finout = '';
	if( yg = []) {
		for (a in yt) yg.push([a].concat(yt[a]));
	}
		
		
	for (x = 0; x < yg.length; x++)
	{
		var us = '';
		var ud = '';

		var gsplit = [yg[x][0],yg[x][4],yg[x][3]];

		if(!document.form.sofulltext.checked) {
			var tosearch = gsplit[0];
		}
		else {
			var tosearch = yg[x][0]+' '+yg[x][4]+' '+yg[x][3];
		}
        
        if (document.form.soregexp.checked) { // reg exp
			var yessir = (tosearch.search(getstring) == 0 || (!document.form.sostartword.checked && tosearch.search(getstring) > -1));
		}
		else { // non reg exp
			var yessir = (tosearch.indexOf(getstring) == 0 || (!document.form.sostartword.checked && tosearch.indexOf(getstring) > -1));
		}
		if(yessir)
		{
			us = replaceunistandard(gsplit[0].replace(/,/g, ".").replace(/`n/g, "\"n"));
			ud = replaceunistandard((gsplit[1] + ' (' + gsplit[2] + ')').replace(/`n/g, "\"n"));
			
			finouta.push('<b><font style="color:'+colorcfg['colsel']+'">' + us + '</font></b> '+ud +'<br>');

		}
	}
	
	finout = '<table width=100%><tr><td valign="top">';
	
	for (var z = 0; z < finouta.length; z++)
	{
		finout += finouta[z];
	}	
	
	document.getElementById('difb').innerHTML += finout + '</td></tr></table>';
    document.getElementById('cdif').scrollTop=0;
	yut = 0;
}


function epdsearchstart()
{
	if(typeof(epd) == 'undefined') {
		return;
	}

	document.getElementById('difb').innerHTML='';
	document.getElementById('anfs').innerHTML='';
	document.getElementById('anfsd').innerHTML='';
	document.getElementById('anfb').innerHTML='<div align=left id="anfc"></div><div align=right id="anfd"></div>';
	
	var getstring = document.form.manual.value;
	
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
	
	for (var z = 0; z < finouta.length; z++)
	{
		finout += finouta[z];
	}	
	
	document.getElementById('difb').innerHTML += finout + '</td></tr></table>';
    document.getElementById('cdif').scrollTop=0;
	yut = 0;
}


function attsearchstart()
{
	if(typeof(attlist) == 'undefined') {
		return;
	}
	document.getElementById('difb').innerHTML='';
	
	var getstring = document.form.manual.value;
	
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

	for (x = 0; x < attlist.length; x++)
	{
        if (document.form.soregexp.checked) { // reg exp
			var yessir = (attlist[x].search(getstring) == 0 || (!document.form.sostartword.checked && attlist[x].search(getstring) > -1));
		}
		else { // non reg exp
			var yessir = (attlist[x].indexOf(getstring) == 0 || (!document.form.sostartword.checked && attlist[x].indexOf(getstring) > -1));
		}
		if(yessir)
		{
            gsplit = attlist[x].split('#')[0];
			uniout = replaceunistandard(gsplit);
                        
			finouta[y] = '<a href="javascript:void(0)" style="color:'+colorcfg['coltext']+'" onclick="getatt('+ x +',\'a\')">' + uniout + ' (' + (attlist[x].split('#').length-1) + ')</a><br>';
			y++;
		}
	}
	var y = finouta.length;

	var findiv = Math.ceil(y/3);
	
	var listoutf = '<p>Aṭṭhakathā term search for <b style="color:'+colorcfg['colped']+'">'+getstring+'</b>:<hr /><table width="100%">';
	
	for (z = 0; z < findiv; z++)
	{
		listoutf += '<tr><td>'+finouta[z]+'</td><td>'+(finouta[findiv+z]?finouta[findiv+z]:'')+'</td><td>'+(finouta[(findiv*2)+z]?finouta[(findiv*2)+z]:'')+'</td></tr>';
	}
	document.getElementById('difb').innerHTML += listoutf + '</table>';
    document.getElementById('cdif').scrollTop=0;
	yut = 0;
}


function tiksearchstart()
{
	if(typeof(tiklist) == 'undefined') {
		return;
	}
	document.getElementById('difb').innerHTML='';
	
	var getstring = document.form.manual.value;
	
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

	for (x = 0; x < tiklist.length; x++)
	{
        if (document.form.soregexp.checked) { // reg exp
			var yessir = (tiklist[x].search(getstring) == 0 || (!document.form.sostartword.checked && tiklist[x].search(getstring) > -1));
		}
		else { // non reg exp
			var yessir = (tiklist[x].indexOf(getstring) == 0 || (!document.form.sostartword.checked && tiklist[x].indexOf(getstring) > -1));
		}
		if(yessir)
		{
            gsplit = tiklist[x].split('#')[0];
			uniout = replaceunistandard(gsplit);
                        
			finouta[y] = '<a href="javascript:void(0)" style="color:'+colorcfg['coltext']+'" onclick="getatt('+ x +',\'t\')">' + uniout + ' (' + (tiklist[x].split('#').length-1) + ')</a><br>';
			y++;
		}
	}
	var y = finouta.length;

	var findiv = Math.ceil(y/3);
	
	var listoutf = '<p>Ṭīka term search for <b style="color:'+colorcfg['colped']+'">'+getstring+'</b>:<hr /><table width="100%">';
	
	for (z = 0; z < findiv; z++)
	{
		listoutf += '<tr><td>'+finouta[z]+'</td><td>'+(finouta[findiv+z]?finouta[findiv+z]:'')+'</td><td>'+(finouta[(findiv*2)+z]?finouta[(findiv*2)+z]:'')+'</td></tr>';
	}
	document.getElementById('difb').innerHTML += listoutf + '</table>';
    document.getElementById('cdif').scrollTop=0;
	yut = 0;
}


function titlesearchstart()
{
	if(typeof(titlelist) == 'undefined') {
		return;
	}
	document.getElementById('difb').innerHTML='';
	
	var getstring = document.form.manual.value;
	
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

	for (x = 0; x < titlelist.length; x++)
	{
        if (document.form.soregexp.checked) { // reg exp
			var yessir = (titlelist[x].search(getstring) == 0 || (!document.form.sostartword.checked && titlelist[x].search(getstring) > -1));
		}
		else { // non reg exp
			var yessir = (titlelist[x].indexOf(getstring) == 0 || (!document.form.sostartword.checked && titlelist[x].indexOf(getstring) > -1));
		}
		if(yessir)
		{
            gsplit = titlelist[x].split('#')[0];
			uniout = replaceunistandard(gsplit);
                        
			finouta[y] = '<a href="javascript:void(0)" style="color:'+colorcfg['coltext']+'" onclick="gettitle('+ x +')">' + uniout + ' (' + (titlelist[x].split('#').length-1) + ')</a><br>';
			y++;
		}
	}
	var y = finouta.length;

	var findiv = Math.ceil(y/2);
	
	var listoutf = '<p>Title search for <b style="color:'+colorcfg['colped']+'">'+getstring+'</b>:<hr /><table width="100%">';
	
	for (z = 0; z < findiv; z++)
	{
		listoutf += '<tr><td>'+finouta[z]+'</td><td>'+(finouta[findiv+z]?finouta[findiv+z]:'')+'</td></tr>';
	}
	document.getElementById('difb').innerHTML += listoutf + '</table>';
    document.getElementById('cdif').scrollTop=0;
	yut = 0;
}



var pedfileget = '';
function paliXML(file)
{
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
	
	document.getElementById('difb').setAttribute('align','left');
	document.getElementById('difb').innerHTML = data.replace(/\[([^\]]*)\]/g, "[<em style=\"color:"+colorcfg['colped']+"\">$1</em>]");
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

function paliFullXML(word,loc)
{
	if (word == '') return;
    moveframex(2);

	word = word.replace(/`/g,"'");

    var loca = loc.split('#');
	
	document.getElementById('mafbc').innerHTML='<div align=center><br><h1><img src="images/ajax-loader.gif" /> please wait...</h1></div>';

    var finout = '';

	for (i = 0; i < loca.length; i++) {
		var pfa = loca[i].split('/');
		
        var xmlget = 'etc/XML1/' + pfa[0] + '/ped.xml';

        var xmlhttp = new window.XMLHttpRequest();
        xmlhttp.open("GET", xmlget, false);
        xmlhttp.send(null);
        var xmlDoc = xmlhttp.responseXML.documentElement;

		var u = xmlDoc.getElementsByTagName("data");
		var v = u[parseInt(pfa[1])].textContent;

		var onepar = v;
		var vv = '';
		while (onepar.toLowerCase().indexOf(word) > -1) {
			var opp = onepar.toLowerCase().indexOf(word);
			vv += onepar.substring(0,opp);
			vv += '<span style="color:'+colorcfg['colped']+'">' + onepar.substring(opp,opp + word.length) + '</span>';
			onepar = onepar.substring(opp + word.length);
		}
		vv += onepar;


        finout +=  vv + '<hr />';
    }
    document.getElementById('mafbc').innerHTML = '<p>PED Full Text Search for <b>' + word + '</b></p><hr />';
    document.getElementById('mafbc').innerHTML += finout;
    document.getElementById('maf').scrollTop = 0;
}

var dppnhist = [];
var dhmark = 0;

function DPPNXML(file,which)
{
	document.getElementById('lt').innerHTML = '';
	document.getElementById('lb').innerHTML = '';
	
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

	document.getElementById('difb').setAttribute('align','left');
	document.getElementById('difb').innerHTML = '<div class="label" id="dppnl"></div><br/>' + data;
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
		if (ncfull == 0) namecount.push([nameda[i],replaceunistandard(i.replace("f", " "))]);
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

namecount = [];

function clickSearchOption() {
	if (document.form.dictin.value != '') {
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
	switch (which) {
		case 0: //dpr
			document.getElementById('soNO').style.display = 'block';
		break;
		case 1: // ped
			document.getElementById('soRX').style.display = 'block';
			document.getElementById('soFT').style.display = 'block';
			document.getElementById('soSW').style.display = 'block';
		break;
		case 2: // dppn
			document.getElementById('soRX').style.display = 'block';
			document.getElementById('soFT').style.display = 'block';
			document.getElementById('soSW').style.display = 'block';
		break;
		case 3: // CPED
			document.getElementById('soFT').style.display = 'block';
			document.getElementById('soRX').style.display = 'block';
			document.getElementById('soSW').style.display = 'block';
		break;
		case 4: // CEPD
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
			document.getElementById('soRX').style.display = 'block';
			document.getElementById('soSW').style.display = 'block';
			if(typeof(attlist) == 'undefined') {
				var headID = document.getElementsByTagName("head")[0];         
				var newScript = document.createElement('script');
				newScript.type = 'text/javascript';
				newScript.src = 'js/attlist.js';
				headID.appendChild(newScript);
			}
		break;
		case 6: // TIKA
			document.getElementById('soRX').style.display = 'block';
			document.getElementById('soSW').style.display = 'block';
			if(typeof(tiklist) == 'undefined') {
				var headID = document.getElementsByTagName("head")[0];         
				var newScript = document.createElement('script');
				newScript.type = 'text/javascript';
				newScript.src = 'js/tiklist.js';
				headID.appendChild(newScript);
			}
		break;
		case 7: // Title
			document.getElementById('soRX').style.display = 'block';
			document.getElementById('soSW').style.display = 'block';
			if(typeof(titlelist) == 'undefined') {
				var headID = document.getElementsByTagName("head")[0];         
				var newScript = document.createElement('script');
				newScript.type = 'text/javascript';
				newScript.src = 'js/titles.js';
				headID.appendChild(newScript);
			}
	}
}

function dictType() {
	var getstring = document.form.manual.value;
 	if ((document.form.sofulltext.checked || !document.form.sostartword.checked) && getstring == '') return;
	document.form.manual.value = replacevelstandard(document.form.dictin.value);
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
	}
}
