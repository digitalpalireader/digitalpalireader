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
        for (a in mainda) {
                ped.push(a + '^' + mainda[a]);
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
					
			finouta[y] = '<a href="#" class="white" onclick="paliXML(\'PED/' + gsplit[1] + '\')">' + uniout + '</a><br>';
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

function epdsearchstart()
{
	document.getElementById('difb').innerHTML='';
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
			
			finouta[y] = '<a href="javascript:void(0)" class="white" onclick="document.getElementById(\'anfc\').innerHTML = \'<font class=white>' + gsplit[0] + '</font> = <font class=brown>' + gsplit[1] +'</font>\'" onmouseover="document.getElementById(\'anfd\').innerHTML = \'' + gsplit[1] +'\'" onmouseout="document.getElementById(\'anfd\').innerHTML = \'\'">' + gsplit[0] + '</a><br>';
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
			
			
			finouta[y] = '<a href="javascript:void(0)" class="white" onClick="moveframey(\'dif\'); DPPNXML(\'dppn/' + gsplit[1] + ',' + uniout + '\')">' + uniout + '</a><br>';
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
	document.getElementById('anfb').innerHTML='<div align=left id="anfc"></div><div align=right id="anfd"></div>';
	
	var getstring = document.form.manual.value;
	
	var gslength = getstring.length;
	var gsplit = new Array();
	
	
	var gletter = getstring.charAt(0);
	var finouta = new Array();
	var y = 0;
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
			
			finouta[y] = '<a href="javascript:void(0)" class="white" onclick="document.getElementById(\'anfc\').innerHTML = \'<font class=white>' + us + '</font> = <font class=brown>' + ud +'</font>\'" onmouseover="document.getElementById(\'anfd\').innerHTML = \'' + ud +'\'" onmouseout="document.getElementById(\'anfd\').innerHTML = \'\'">' + us + '</a><br>';
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

function attsearchstart()
{
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
                        
			finouta[y] = '<a href="javascript:void(0)" class="white" onclick="getatt('+ x +')">' + uniout + ' (' + (attlist[x].split('#').length-1) + ')</a><br>';
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
	
	var dataa = xmlDoc.getElementsByTagName('data')[t2].getElementsByTagName('sdata');
	var data = '';
	for (j=0; j<dataa.length; j++) {
		data += dataa[j].childNodes[0].nodeValue;
	}		
	
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

	if (tnum != 0) tout += '<div style="background-color:'+colorcfg['colbkcp']+'"><img src="images/toolsin.png" onclick="paliXML(\'PED/' + t1 + '/' + (tnum - 1) + '\')" /></div>';
	if (tnum != pedln[t2]) bout += '<div style="background-color:'+colorcfg['colbkcp']+'"><img src="images/tools.png"  onclick="paliXML(\'PED/' + t1 + '/' + (tnum + 1) + '\')"></div>';
	document.getElementById('lt').innerHTML = tout;
	document.getElementById('lb').innerHTML = bout;
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
	
	
	var tloc = file.split('/')[1]+'/'+file.split('/')[2].split(',')[0];
	dppnfileget = nameno[tloc].split('/')[1];
	var dppnf = 'etc/XML2/'+nameno[tloc].split('/')[0]+'.xml';

	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", dppnf, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;


	var dataa = xmlDoc.getElementsByTagName('entry')[dppnfileget].getElementsByTagName('data');
	var data = '';
	for (j=0; j<dataa.length; j++) {
		data += ' ' + dataa[j].childNodes[0].nodeValue.replace(/\.  /g, '.&nbsp; ');
	}		
	
	document.getElementById('difb').setAttribute('align','left');
	document.getElementById('difb').innerHTML = data;
    document.getElementById('cdif').scrollTop=0;
	var tout = '<select title="show history" onchange="dhmark=this.length-1-this.selectedIndex; DPPNXML(this.options[this.selectedIndex].value,1);">';
	var bout = '';

	if (dppnhist.length > 1) { // show select
		for (i = dppnhist.length-1; i >= 0; i--) {
			tout += '<option value="'+dppnhist[i]+'"';
			if (i == dhmark) { tout += ' selected'; }
			var dhs = dppnhist[i].split(',');
			tout += '>' + (dhs[1] ? dhs[1] : dhs[0]) + '</option>';
		}
		tout += '</select>';
		document.getElementById('lt').innerHTML = tout;
	}

}
