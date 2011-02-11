var yut = 0;
var remote = true;

var ped = [];

function pedsearchstart()
{
	document.getElementById('difb').innerHTML='';
	
	var getstring = document.form.manual.value;
	
	getstring = getstring.replace(/"n/g, '`n');
	getstring = getstring.replace(/\./g, ',');

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
        
        if(document.form.sofulltext.checked) { // full text search
			if(typeof(pedFull) == 'undefined') { return; }
			for (a in pedFull) {
				ped.push(pedFull[a].split('#')[0] + '^' + pedFull[a].substring(pedFull[a].indexOf('#')+1));
			}			
		}
		else {
			for (a in mainda) {
				ped.push(a + '^' + mainda[a]);
			}
		}
    }
    var pedl = ped.length;
        
	for (x = 0; x < pedl; x++)
	{
        
        var yesstring = ped[x].substring(0,gslength);
		if(yesstring == getstring || (getstring.charAt(0) == "*" && ped[x].search(getstring.substring(1)) > -1))
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
			
			if(document.form.sofulltext.checked) { 
				finouta[y] = '<span><a href="javascript:void(0)" onclick="paliFullXML(\'' + gsplit[0].replace(/'/g,'`') + '\',\'' + gsplit[1] + '\')">' + uniout + ' ('+gsplit[1].split('#').length + ')</a></span><br>';
			}
			else finouta[y] = '<a href="#" style="color:'+colorcfg['coltext']+'" onclick="paliXML(\'PED/' + gsplit[1] + '\')">' + uniout + '</a><br>';

			y++;
		}
	}
	var findiv = (y/3);
	var ctab = 0;
	var flag1 = 0;
	var flag2 = 0;
	
	finout = '<table width=100%><tr><td valign="top">';
	
	for (z = 0; z < findiv; z++)
	{
		
		finout += finouta[z];
		ctab++;
	}
	finout += '</td><td valign="top">';
	if(y > 1)
	{
		for (z = ctab; z < (ctab*2); z++)
		{
			finout += finouta[z];
		}	
		
		finout += '</td><td valign="top">';
		for (z = (ctab*2); z < y; z++)
		{
			finout += finouta[z];
		}	
	}
	
	document.getElementById('difb').innerHTML += finout + '</td></tr></table>';
	yut = 0;
}

var dppn = new Array();

function dppnsearchstart()
{
	document.getElementById('difb').innerHTML='';
	
	var getstring = document.form.manual.value;
	
	getstring = getstring.replace(/"n/g, '`n');
	getstring = getstring.replace(/\./g, ',');

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
		var yesstring = dppn[x].substring(0,gslength);
	
		if(yesstring == getstring || (getstring.charAt(0) == "*" && dppn[x].search(getstring.substring(1)) > -1))
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
	
	var findiv = (y/3);
	var ctab = 0;
	var flag1 = 0;
	var flag2 = 0;
	
	finout = '<table width=100%><tr><td valign="top">';
	
	for (z = 0; z < findiv; z++)
	{
		
		finout += finouta[z];
		ctab++;
	}
	finout += '</td><td valign="top">';
	if(y > 1)
	{
		for (z = ctab; z < (ctab*2); z++)
		{
			finout += finouta[z];
		}	
		
		finout += '</td><td valign="top">';
		for (z = (ctab*2); z < y; z++)
		{
			finout += finouta[z];
		}	
	}
	
	
	document.getElementById('difb').innerHTML += finout + '</td></tr></table>';
    document.getElementById('difb').scrollTop=0;
	yut = 0;
}

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
	var yg = [];
	
	for (a in yt) yg.push(a);
	
	for (x = 0; x < yg.length; x++)
	{
		var yesstring = yg[x].substring(0,gslength);
		var us = '';
		var ud = '';
		if(yesstring == getstring || (getstring.charAt(0) == "*" && yg[x].search(getstring.substring(1)) > -1))
		{
			us = replaceunistandard(yg[x].replace(/,/g, ".").replace(/`n/g, "\"n"));
			ud = replaceunistandard(yt[yg[x]].replace(/,/g, ".").replace(/`n/g, "\"n").replace(/\&comma;/g, ",").replace(/'/g, "&#92;&#39;"));
			ud = ud.replace(/#(.*)/, " ($1)");
			
			finouta.push('<b><font style="color:'+colorcfg['colsel']+'">' + us + '</font></b> '+ud +'<br>');

		}
	}
	
	finout = '<table width=100%><tr><td valign="top">';
	
	for (var z = 0; z < finouta.length; z++)
	{
		finout += finouta[z];
	}	
	
	document.getElementById('difb').innerHTML += finout + '</td></tr></table>';
    document.getElementById('difb').scrollTop=0;
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
		var yesstring = epd[x].substring(0,gslength);
	
		if(yesstring == getstring || (getstring.charAt(0) == "*" && epd[x].search(getstring.substring(1)) > -1))
		{
			gsplit = epd[x].split('^');
			
			finouta.push('<b><font style="color:'+colorcfg['colsel']+'">' + gsplit[0] + '</font></b> '+gsplit[1] +'<br>');

		}
	}
	
	finout = '<table width=100%><tr><td valign="top">';
	
	for (var z = 0; z < finouta.length; z++)
	{
		finout += finouta[z];
	}	
	
	document.getElementById('difb').innerHTML += finout + '</td></tr></table>';
    document.getElementById('difb').scrollTop=0;
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
        var yesstring = attlist[x].substring(0,gslength);
		if(yesstring == getstring || (getstring.charAt(0) == "*" && attlist[x].search(getstring.substring(1)) > -1))
		{
            gsplit = attlist[x].split('#')[0];
			uniout = replaceunistandard(gsplit);
                        
			finouta[y] = '<a href="javascript:void(0)" style="color:'+colorcfg['coltext']+'" onclick="getatt('+ x +',\'a\')">' + uniout + ' (' + (attlist[x].split('#').length-1) + ')</a><br>';
			y++;
		}
	}
	var findiv = (y/2);
	var ctab = 0;
	var flag1 = 0;
	var flag2 = 0;
	
	finout = '<table width=100%><tr><td valign="top">';
	
	for (z = 0; z < findiv; z++)
	{
		
		finout += finouta[z];
		ctab++;
	}
	finout += '</td><td valign="top">';
	if(y > 1)
	{
		for (z = ctab; z < y; z++)
		{
			finout += finouta[z];
		}	
	}
	
	document.getElementById('difb').innerHTML += finout + '</td></tr></table>';
    document.getElementById('difb').scrollTop=0;
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
        var yesstring = tiklist[x].substring(0,gslength);
		if(yesstring == getstring || (getstring.charAt(0) == "*" && tiklist[x].search(getstring.substring(1)) > -1))
		{
            gsplit = tiklist[x].split('#')[0];
			uniout = replaceunistandard(gsplit);
                        
			finouta[y] = '<a href="javascript:void(0)" style="color:'+colorcfg['coltext']+'" onclick="getatt('+ x +',\'t\')">' + uniout + ' (' + (tiklist[x].split('#').length-1) + ')</a><br>';
			y++;
		}
	}
	var findiv = (y/2);
	var ctab = 0;
	var flag1 = 0;
	var flag2 = 0;
	
	finout = '<table width=100%><tr><td valign="top">';
	
	for (z = 0; z < findiv; z++)
	{
		
		finout += finouta[z];
		ctab++;
	}
	finout += '</td><td valign="top">';
	if(y > 1)
	{
		for (z = ctab; z < y; z++)
		{
			finout += finouta[z];
		}	
	}
	
	document.getElementById('difb').innerHTML += finout + '</td></tr></table>';
    document.getElementById('difb').scrollTop=0;
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
        var yesstring = titlelist[x].substring(0,gslength);
		if(yesstring == getstring || (getstring.charAt(0) == "*" && titlelist[x].search(getstring.substring(1)) > -1))
		{
            gsplit = titlelist[x].split('#')[0];
			uniout = replaceunistandard(gsplit);
                        
			finouta[y] = '<a href="javascript:void(0)" style="color:'+colorcfg['coltext']+'" onclick="gettitle('+ x +')">' + uniout + ' (' + (titlelist[x].split('#').length-1) + ')</a><br>';
			y++;
		}
	}
	var findiv = (y/2);
	var ctab = 0;
	var flag1 = 0;
	var flag2 = 0;
	
	finout = '<table width=100%><tr><td valign="top">';
	
	for (z = 0; z < findiv; z++)
	{
		
		finout += finouta[z];
		ctab++;
	}
	finout += '</td><td valign="top">';
	if(y > 1)
	{
		for (z = ctab; z < y; z++)
		{
			finout += finouta[z];
		}	
	}
	
	document.getElementById('difb').innerHTML += finout + '</td></tr></table>';
    document.getElementById('difb').scrollTop=0;
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
}

function paliFullXML(word,loc)
{
    moveframex(2);

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

        finout +=  v + '<hr />';
    }
    document.getElementById('mafbc').innerHTML = '<p>PED Full Text Search for <b>' + word.replace(/`/g,"'") + '</b></p><hr />';
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
}

namecount = [];

function dictLoad() {
	var which = document.form.sped.selectedIndex;
	document.getElementById('soFT').style.display = 'none';
	switch (which) {
		case 0:
		break;
		case 1:
			document.getElementById('soFT').style.display = 'block';
		break;
		case 2:
		break;
		case 3:
		break;
		case 4:
			if(typeof(epd) == 'undefined') {
				var headID = document.getElementsByTagName("head")[0];         
				var newScript = document.createElement('script');
				newScript.type = 'text/javascript';
				newScript.src = 'js/epd.js';
				headID.appendChild(newScript);
			}
		break;
		case 5:
			if(typeof(attlist) == 'undefined') {
				var headID = document.getElementsByTagName("head")[0];         
				var newScript = document.createElement('script');
				newScript.type = 'text/javascript';
				newScript.src = 'js/attlist.js';
				headID.appendChild(newScript);
			}
		break;
		case 6:
			if(typeof(tiklist) == 'undefined') {
				var headID = document.getElementsByTagName("head")[0];         
				var newScript = document.createElement('script');
				newScript.type = 'text/javascript';
				newScript.src = 'js/tiklist.js';
				headID.appendChild(newScript);
			}
		break;
		case 7:
			if(typeof(titlelist) == 'undefined') {
				var headID = document.getElementsByTagName("head")[0];         
				var newScript = document.createElement('script');
				newScript.type = 'text/javascript';
				newScript.src = 'js/titles.js';
				headID.appendChild(newScript);
			}
		break;
	}
}

function loadFullText() {
	if (document.form.sped.selectedIndex == 1) {
			ped = [];
			if(typeof(pedFull) == 'undefined') {
				var headID = document.getElementsByTagName("head")[0];         
				var newScript = document.createElement('script');
				newScript.type = 'text/javascript';
				newScript.src = 'js/pedfull.js';
				headID.appendChild(newScript);
			}
	}		
}
function dictType() {
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
