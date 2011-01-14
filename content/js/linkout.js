function convoutput(spell) {
	spell = spell.replace(/aa/g, '&#257;');
	spell = spell.replace(/ii/g, '&#299;');
	spell = spell.replace(/uu/g, '&#363;');
	spell = spell.replace(/\,t/g, '&#7789;');
	spell = spell.replace(/\,d/g, '&#7693;');
	spell = spell.replace(/\`n/g, '&#7749;');
	spell = spell.replace(/\,n/g, '&#7751;');
	spell = spell.replace(/\,m/g, '&#7747;');
	spell = spell.replace(/\~n/g, '&ntilde;');
	spell = spell.replace(/\,l/g, '&#7735;');
	spell = spell.replace(/AA/g, '&#256;');
	spell = spell.replace(/II/g, '&#298;');
	spell = spell.replace(/UU/g, '&#362;');
	spell = spell.replace(/\,T/g, '&#7788;');
	spell = spell.replace(/\,D/g, '&#7692;');
	spell = spell.replace(/\,N/g, '&#7750;');
	spell = spell.replace(/\,M/g, '&#7746;');
	spell = spell.replace(/\~N/g, '&Ntilde;');
	spell = spell.replace(/\,L/g, '&#7734;');

	// periods are regular expressions
	// so we changed them to commas
	// for velthius match - here we change them back
	
	spell = spell.replace(/,/g, '.');
	spell = spell.replace(/q/g, ',');
	return spell;
}

function output(which,first)
{

	//alert(outwords);

// create option dropdown
	
	var osout = '<table cellspacing="0" cellpadding="0" width=100%><tr><td align=left valign="top"><table cellspacing="0" cellpadding="0"><tr>';
	//document.getElementById('difb').innerHTML = sdp.join(' | ') + '<br>' + outwords.join(' | ');

	var hotlink;
	
	
	if (outwords.length > 1 && first) {
		document.getElementById('anfs').innerHTML = '<form name="forma"><select size="1" id="anfout" name="out" style="font-family: sans; font-size:12px" onmouseover="if(this.length < 20) { this.size = this.length; }" onmouseout="this.size=1;" onclick="this.size=1;" onchange="this.size=1; output(this.selectedIndex);" title="Select alternative interpretations here"></select></form>';

		for (var b = 0; b < outwords.length; b++)  // get the word names
		{	
			var outword = outwords[b].split('$');
			document.forma.out.innerHTML += '<option>' + replaceunistandard(outword[0].replace(/,/g, '.').replace(/`n/g, '"n')) + '</option>'; 
		}
	}
	
	var owparts = outwords[which].split('$')[1].split('@');
		
	for (c in owparts) { // per part (with many variants)
		
		var partvars = owparts[c].split('#');
		if (c > 0) {
			osout += '<td>-<br><font size=2>&nbsp;</font></td>';	
		}	

		osout += '<td align="center">';
		
		for (var d = 0; d < partvars.length; d++) { // per variant for each part
			var data = partvars[d].split('^');
				// data[0] = reference
				// data[1] = pali word
				// data[2] = category
				// data[3] = concise definition (if any)
				// for data[2]: 0 = main, 1 = name, 2 = concise, 3 = none

			if (d == 0) { // first match (will go on top)
				switch (data[2]) {
				case '0':
					if (!hotlink) { hotlink = 'PED/' + data[0]; } // opens link in lower frame
					osout += '<a href="javascript:void(0)" onClick="moveframey(\'dif\'); paliXML(\'PED/' + data[0] + '\')" ' + '><b style="color:' + colorcfg['colped'] + '">' + convoutput(data[1]) + '</b></a>';
					break;
				case '1':
					if (!hotlink) { hotlink = 'dppn/' + data[0] +','+ data[1]; } // opens link in lower frame
					osout += '<a href="javascript:void(0)" onClick="moveframey(\'dif\'); DPPNXML(\'dppn/' + data[0] +','+ data[1] + '\')"><b style="color:' + colorcfg['coldppn'] + '">' + convoutput(data[1]) + '</b></a>';
					break;
				case '2':
					osout += '<b>' + convoutput(data[1]) + '</b>';
					break;
				case '3':
					osout += '<b style="color:' + colorcfg['coltext'] + '">' + convoutput(data[1]) + '</b>';
					break;
				}
			}
			else { // lower match
				if (d == 1) {
					osout += '<br><font size="2">';
				}
				switch (data[2]) {
				case '0':
					osout += '<a href="javascript:void(0)" onClick="moveframey(\'dif\'); paliXML(\'PED/' + data[0] + '\')" ' + '><b style="color:' + colorcfg['colped'] + '">' + (parseInt(d)+1) + '</b></a>&nbsp;';
					break;
				case '1':
					osout += '<a href="javascript:void(0)" onClick="moveframey(\'dif\'); DPPNXML(\'dppn/' + data[0]+','+ data[1] + '\')"><b style="color:' + colorcfg['coldppn'] + '">' + 'n' + '</b></a>&nbsp;';
					break;
				}
			}
		}
		if (partvars.length > 1) {
			osout = osout.substring(0,osout.length-6);
			osout += '</font>';
		}
		else {
			osout += '<br><font size=2>&nbsp;</font>';
		}		
		osout += '</td>';
		
	}
	osout += '</tr></table>';
	
	osout += '</td><td align=center id=c></td><td align=right>';

// add concise definitions
	
	var thisconcise = [];
	var conciseoutput = '';

	if (shortdefpost[which]) {
		thisconcise = shortdefpost[which].split('$'); 
		
		if (thisconcise.length > 1) conciseoutput += '<select size="1" style="font-size:12px" onmouseover="this.size=this.length;" onmouseout="this.size=1;" onclick="this.size=1; var spdouts = this.value;  var spdcol = spdouts.split(\':\'); document.getElementById(\'spdout\').innerHTML = \'<b style=\&quot;color:' + colorcfg['colcpd'] + '\&quot;>\' + spdcol[0] + \':</b> \' + spdcol[1];">';
				
		var concisedups = [];
		for (x = 0; x < thisconcise.length; x++)
		{
			if (thisconcise[x].length == 0) { continue; }
			
			var conciseword = thisconcise[x];
			conciseword = conciseword.replace(/aa/g, '&#257;');
			conciseword = conciseword.replace(/ii/g, '&#299;');
			conciseword = conciseword.replace(/uu/g, '&#363;');
			conciseword = conciseword.replace(/\,t/g, '&#7789;');
			conciseword = conciseword.replace(/\,d/g, '&#7693;');
			conciseword = conciseword.replace(/\`n/g, '&#7749;');
			conciseword = conciseword.replace(/\,n/g, '&#7751;');
			conciseword = conciseword.replace(/\,m/g, '&#7747;');
			conciseword = conciseword.replace(/\~n/g, '&ntilde;');
			conciseword = conciseword.replace(/\,l/g, '&#7735;');
			conciseword = conciseword.replace(/AA/g, '&#256;');
			conciseword = conciseword.replace(/II/g, '&#298;');
			conciseword = conciseword.replace(/UU/g, '&#362;');
			conciseword = conciseword.replace(/\,T/g, '&#7788;');
			conciseword = conciseword.replace(/\,D/g, '&#7692;');
			conciseword = conciseword.replace(/\,N/g, '&#7750;');
			conciseword = conciseword.replace(/\,M/g, '&#7746;');
			conciseword = conciseword.replace(/\~N/g, '&Ntilde;');
			conciseword = conciseword.replace(/\,L/g, '&#7734;');
			conciseword = conciseword.replace(/`$/g, '-');

			var concisedefa = yt[thisconcise[x]];
			concisedefa = concisedefa.replace(/,/g, '.');
			concisedefa = concisedefa.replace(/\&comma;/g, ',');
			concisedefa = replaceunistandard(concisedefa);
			
			var concisedef = concisedefa.split('#');
			if (!concisedups[conciseword]) {
				if (x == 0) { var sdfirst = '<b>' + conciseword + ': </b>' + concisedef[0] + ' (' + concisedef[1] + ')'; } 
				if (thisconcise.length > 1) {
					var condefnotype = concisedef[0];
					if (concisedef[0].length > 100) {
							condefnotype = condefnotype.substring(0,100);
						condefnotype += '...'
					}
					
					conciseoutput += '<option value="' + conciseword + ': ' + concisedef[0] + ' (' + concisedef[1] + ')">' + conciseword + ': ' + condefnotype + ' (' + concisedef[1] + ')</option>'; 
						
				}
				concisedups[conciseword] = 1;
			}		
		}
		
	}
	//document.getElementById('difb').innerHTML += '<br>|' + thisconcise + '|';
	if (thisconcise.length > 1) conciseoutput += '</select>';
	if (thisconcise.length > 1 || (thisconcise[0] && thisconcise[0].length > 0)) osout += '<span id=spdout>'+sdfirst+'</span>';

	osout += '</td></tr></table>';
	document.getElementById('anfb').innerHTML = osout;
	document.getElementById('anfsd').innerHTML = conciseoutput;
	
	if (hotlink) {
		if (hotlink.search('PED') >= 0) paliXML(hotlink);
		else if (hotlink.search('dppn') >= 0) DPPNXML(hotlink);
		if(moveat == 2) { moveframey('dif'); }
	}
	return;
}

function noah()
{
	var dataout = '';
	for (i = 0; i <= 4; i++) {
	
		var pedp = 'etc/XML1/'+ i +'/ped.xml';

		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", pedp, false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		var cntx = xmlDoc.getElementsByTagName('data').length;
		var noc = ''; 
		var nocd = 'x';
		var nocdo;
		for (e = 0; e < cntx; e++) {
			noc = i+'/'+e;
			if ( noahda[noc]) {
				if ( noahda[noc].charAt(0) != nocd.charAt(0)) { dataout += '<h1>' + noahda[noc].charAt(0) + '</h1>\n'; }
				nocd = noahda[noc];
				var dataa = xmlDoc.getElementsByTagName('data')[e].getElementsByTagName('sdata');
				var data = '';
				for (j=0; j<dataa.length; j++) {
					data += dataa[j].childNodes[0].nodeValue;
				}
				nocdo = nocd.replace(/aa/g, 'ā');
				nocdo = nocdo.replace(/ii/g, 'ī');
				nocdo = nocdo.replace(/uu/g, 'ū');
				nocdo = nocdo.replace(/,t/g, 'ṭ');
				nocdo = nocdo.replace(/,d/g, 'ḍ');
				nocdo = nocdo.replace(/`n/g, 'ṅ');
				nocdo = nocdo.replace(/,n/g, 'ṇ');
				nocdo = nocdo.replace(/,m/g, 'ṃ');
				nocdo = nocdo.replace(/\~n/g, 'ñ');
				nocdo = nocdo.replace(/,l/g, 'ḷ');				
				nocdo = nocdo.replace(/`/g, '-');
				nocdo = nocdo.replace(/z/g, ' ');
				dataout	+= '<h2>' + nocdo + '</h2>\n<p>' + data + '\n';
			}
		}
	}
	
	writeFile('PEDdata.html', dataout, 'UTF-8')
}

function noah2()
{
	var dataout = '';
	for (i = 1; i <= 8; i++) {
	
		var dn = 'etc/XML2/'+ i +'.xml';

		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", dn, false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		var en = xmlDoc.getElementsByTagName('entry');
		for (j = 0; j < en.length; j++) { 
			var out = '';
			var da = en[j].getElementsByTagName('data');
			for (k = 0; k < da.length; k++) {
				if(da[k].childNodes[0]) {
					var data = da[k].childNodes[0].nodeValue;
					out += data;
				}
			}
			writeFile(i+'.'+j+'.html', out, 'UTF-8')
		}
		out = out.replace(/\&lt;/g, '\n<');
		out = out.replace(/\&gt;/g, '>');
	}
}
