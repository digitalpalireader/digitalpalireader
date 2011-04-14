
function outputDef(which,first,frombox)
{
	//dalert(G_outwords + ' ' + G_shortdefpost);

// create option dropdown
	
	var osout = '<table cellspacing="0" cellpadding="0" width=100%><tr><td align=left valign="top"><table cellspacing="0" cellpadding="0"><tr>';
	//document.getElementById('difb').innerHTML = sdp.join(' | ') + '<br>' + G_outwords.join(' | ');

	var hotlink;
	
	var conjWord = [] // word to pass to conjugate
	
	if (G_outwords.length > 1 && first) {

		document.getElementById('anfs').innerHTML = '<form name="forma"><select id="anfout" name="out" class="tiny" onchange="outputDef(this.selectedIndex);" title="Select alternative interpretations here"></select></form>';

		// sort compounds, first by number of parts (ascending), then by number of tricks (ascending), then by size of first part (descending) 

		var sorta = [];
		var sortb = [];
		for (var b = 0; b < G_outwords.length; b++) 
		{	
			var lg = '0' + G_outwords[b][0].split('-').length;
			var left = '0' + G_outwords[b][0].length - G_outwords[b][0].split('-')[0].length;
			while(lg.length < 5) lg = '0' + lg;
			while(left.length < 5) left = '0' + left;
			sorta.push(lg + ' ' + G_outwords[b][2] + ' ' + left + ' ' + G_outwords[b][0]+'$'+G_outwords[b][1]+'!'+G_shortdefpost[b]);
		}

		sorta.sort();
		for (var b = 0; b < sorta.length; b++)
		{	
			var s = sorta[b].split(' ');
			s.splice(0,3);
			G_outwords[b] = s.join(' ').split('!')[0].split('$');
			G_shortdefpost[b] = s.join(' ').split('!')[1]
		}
		
		// get the word names

		for (var b = 0; b < G_outwords.length; b++)
		{	
			var outword = G_outwords[b][0];
			document.forma.out.innerHTML += '<option>' + toUni(outword) + '</option>'; 
		}
	}
	
	var owparts = G_outwords[which][1].split('@');
	
	var myConj = owparts[owparts.length-1].split('#')[0].split('^');
	if(myConj[3]) { // if root form is found, set up conjugation
		if(yt[myConj[3]][4] != 'I') {
			conjWord.form = G_outwords[which][0].split('-').pop().replace(/"/g, 'x');
			conjWord.root = myConj[3].replace(/"/g, 'x');
		}
	}
	
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
				// for data[2]: 0 = main, 1 = name, 2 = concise, 3 = none
			var dataout = toUni(G_outwords[which][0].split('-')[c]); // get the part name from the names part :)
			if (d == 0) { // first match (will go on top)		
				switch (data[2]) {
				case '0':
					if (!frombox && !hotlink) { hotlink = 'PED/' + data[0]+','+toUni(data[1]) } // opens link in lower frame
					osout += '<a href="javascript:void(0)" onClick="moveframey(\'dif\'); paliXML(\'PED/' + data[0] + ','+toUni(data[1])+'\')" ' + '><b style="color:' + G_prefs['colped'] + '">' + dataout + '</b></a>';
					break;
				case '1':
					if (!frombox && !hotlink) { hotlink = toUni(data[1])+'/' + data[0] +','+ toUni(data[1]); } // opens link in lower frame
					osout += '<a href="javascript:void(0)" onClick="moveframey(\'dif\'); DPPNXML(\''+toUni(data[1])+'/' + data[0] +','+ toUni(data[1]) + '\')"><b style="color:' + G_prefs['coldppn'] + '">' + dataout + '</b></a>';
					break;
				case '2':
					osout += '<b style="color:' + G_prefs['colcpd'] + '">' + dataout + '</b>';
					break;
				case '3':
					osout += '<b style="color:' + G_prefs['coltext'] + '">' + dataout + '</b>';
					break;
				}
			}
			else { // lower match
				if (d == 1) {
					osout += '<br><font size="2">';
				}
				switch (data[2]) {
				case '0':
					osout += '<a href="javascript:void(0)" onClick="moveframey(\'dif\'); paliXML(\'PED/' + data[0] + ','+toUni(data[1])+'\')" ' + '><b style="color:' + G_prefs['colped'] + '">' + (parseInt(d)+1) + '</b></a>&nbsp;';
					break;
				case '1':
					osout += '<a href="javascript:void(0)" onClick="moveframey(\'dif\'); DPPNXML(\''+toUni(data[1])+'/' + data[0]+','+ toUni(data[1]) + '\')"><b style="color:' + G_prefs['coldppn'] + '">' + 'n' + '</b></a>&nbsp;';
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
	osout += (conjWord.root?'<td class="conjc" valign="top">&nbsp;<a href="javascript:void(0);" onclick="conjugate(\''+conjWord.root+'\',\'dif\',\''+conjWord.form+'\')" title="conjugate this word" class="small" style="color:green"><sup>c</sup></a></td>':'')+'</tr></table>';
	
	osout += '</td><td valign=top align=center id="anfcenter"></td><td valign=top align=right>';

// add concise definitions
	
	var thisconcise = [];
	var conciseoutput = '';
	
	if (G_shortdefpost[which]) {
		thisconcise = G_shortdefpost[which].replace(/\$\$+/,'$').replace(/^\$/,'').replace(/\$$/,'').split('$'); 
		//dalert(thisconcise);
		if (thisconcise.length > 1) conciseoutput += '<select class="tiny" onchange="conciseChange(this.value)">';
				
		var concisedups = [];
		for (x = 0; x < thisconcise.length; x++)
		{
			if (thisconcise[x].length == 0) { continue; }
			
			var concisedefa = yt[thisconcise[x]];

			var condefnotype = concisedefa[2];
			if (condefnotype.length > 100) {
					condefnotype = condefnotype.substring(0,100);
				condefnotype += '...'
			}

			var concisedef = concisedefa[2] + ' (' + concisedefa[1] + ')';

			concisedef = concisedef.replace(/,/g, '.');
			concisedef = concisedef.replace(/\&comma;/g, ',');
			concisedef = toUni(concisedef);

			var conciseword = thisconcise[x];
			conciseword = conciseword.replace(/\`/g, '"');
			conciseword = conciseword.replace(/,/g, '.');
			conciseword = toUni(conciseword);
			
			
			if (!concisedups[conciseword]) {
				if (x == 0) { var sdfirst = '<b style="color:' + G_prefs['colcpd'] + '";>' + conciseword + '</b>: ' + concisedef; } 
				if (thisconcise.length > 1) {
					
					conciseoutput += '<option value="' + thisconcise[x] + ':' + conciseword + ':' + concisedef + '">' + conciseword + ': ' + condefnotype + ' (' + concisedefa[1] + ')</option>'; 
						
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
	moveframex(moveat);
	if (hotlink) {
		if (hotlink.search('PED') >= 0) paliXML(hotlink);
		else DPPNXML(hotlink);
		//if(moveat == 2) { moveframey('dif'); }
	}
}

function conciseChange(value) {
	var spdouts = value;  
	var spdcol = spdouts.split(':'); 
	document.getElementById('spdout').innerHTML = '<b style="color:' + G_prefs['colcpd'] + '";>' + spdcol[1] + ':</b> ' + spdcol[2];
	moveframex(moveat);
}
