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

function outputDef(which,first)
{

	//alert(outwords);

// create option dropdown
	
	var osout = '<table cellspacing="0" cellpadding="0" width=100%><tr><td align=left valign="top"><table cellspacing="0" cellpadding="0"><tr>';
	//document.getElementById('difb').innerHTML = sdp.join(' | ') + '<br>' + outwords.join(' | ');

	var hotlink;
	
	
	if (outwords.length > 1 && first) {
		document.getElementById('anfs').innerHTML = '<form name="forma"><select id="anfout" name="out" class="tiny" onchange="outputDef(this.selectedIndex);" title="Select alternative interpretations here"></select></form>';

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
			osout += '<td valign="top"><b>-</b></td>';	
		}	

		osout += '<td valign="top" align="center">';
		
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
					osout += '<b style="color:' + colorcfg['colcpd'] + '">' + convoutput(data[1]) + '</b>';
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
			//osout += '<br><font size=2>&nbsp;</font>';
		}		
		osout += '</td>';
		
	}
	osout += '</tr></table>';
	
	osout += '</td><td valign=top align=center id=c></td><td valign=top align=right>';

// add concise definitions
	
	var thisconcise = [];
	var conciseoutput = '';

	if (shortdefpost[which]) {
		thisconcise = shortdefpost[which].split('$'); 
		
		if (thisconcise.length > 1) conciseoutput += '<select class="tiny" onchange="var spdouts = this.value;  var spdcol = spdouts.split(\':\'); document.getElementById(\'spdout\').innerHTML = \'<b style=\&quot;color:' + colorcfg['colcpd'] + '\&quot;>\' + spdcol[0] + \':</b> \' + spdcol[1];">';
				
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

			var condefnotype = concisedefa[3];
			if (condefnotype.length > 100) {
					condefnotype = condefnotype.substring(0,100);
				condefnotype += '...'
			}

			var concisedef = concisedefa[3] + ' (' + concisedefa[2] + ')';


						
			concisedef = concisedef.replace(/,/g, '.');
			concisedef = concisedef.replace(/\&comma;/g, ',');
			concisedef = replaceunistandard(concisedef);
			
			
			if (!concisedups[conciseword]) {
				if (x == 0) { var sdfirst = '<b style="color:'+colorcfg['colcpd']+'">' + conciseword + ': </b> ' + concisedef; } 
				if (thisconcise.length > 1) {
					
					conciseoutput += '<option value="' + conciseword + ': ' + concisedef + '">' + conciseword + ': ' + condefnotype + ' (' + concisedefa[2] + ')</option>'; 
						
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
	moveframex(moveat);
}
