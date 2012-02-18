
function outputDef(which,first,frombox)
{
	$('#anfright').html('');
	//dalert(G_outwords + ' ' + G_shortdefpost);

// create option dropdown
	
	var osout = '<table cellspacing="0" cellpadding="0"><tr>';
	//document.getElementById('difb').innerHTML = sdp.join(' | ') + '<br>' + G_outwords.join(' | ');

	var hotlink;
	
	var conjWord = [] // word to pass to conjugate
	
	if (G_outwords.length > 1 && first) {

		$('#anfs').html('<form name="forma"><select id="anfout" name="out" class="tiny" onchange="outputDef(this.selectedIndex);" title="Select alternative interpretations here"></select></form>');

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
			conjWord.form = toUni(G_outwords[which][0].split('-').pop());
			conjWord.root = toUni(myConj[3]);
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
				// data[3] = short def (if avail)
				// for data[2]: 0 = main, 1 = name, 2 = concise, 3 = none
			var dataout = translit(toUni(G_outwords[which][0].split('-')[c])); // get the part name from the names part :)
			var conciseCode = (data[3]?'onmouseover="showShortDef(\''+toUni(data[3])+'\')" ':'');
			if (d == 0) { // first match (will go on top)		
				switch (data[2]) {
					case '0':
						if (frombox !=2 && !hotlink) { hotlink = 'PED/' + data[0]+','+toUni(data[1]) } // opens link in lower frame
						osout += '<span class="pointer" '+conciseCode+'onmouseup="paliXML(\'PED/' + data[0] + ','+toUni(data[1])+'\',null,eventSend(event))" ' + '><b style="color:' + DPR_prefs['colped'] + '">' + dataout + '</b></span>';
						break;
					case '1':
						if (frombox !=2 && !hotlink) { hotlink = toUni(data[1])+'/' + data[0] +','+ toUni(data[1]); } // opens link in lower frame
						osout += '<span class="pointer" '+conciseCode+'onmousedown="DPPNXML(\''+toUni(data[1])+'/' + data[0] +','+ toUni(data[1]) + '\',null,eventSend(event))"><b style="color:' + DPR_prefs['coldppn'] + '">' + dataout + '</b></span>';
						break;
					case '2':
						osout += '<b '+conciseCode+'style="color:' + DPR_prefs['colcpd'] + '">' + dataout + '</b>';
						break;
					case '3':
						osout += '<b style="color:' + DPR_prefs['coltext'] + '">' + dataout + '</b>';
						break;
				}
			}
			else { // lower match
				if (d == 1) {
					osout += '<br><font size="2">';
				}
				switch (data[2]) {
					case '0':
						osout += '<span class="pointer" onmouseup="paliXML(\'PED/' + data[0] + ','+toUni(data[1])+'\',null,eventSend(event))" ' + '><b style="color:' + DPR_prefs['colped'] + '">' + (parseInt(d)+1) + '</b></span>&nbsp;';
						break;
					case '1':
						osout += '<span class="pointer" onmouseup="DPPNXML(\''+toUni(data[1])+'/' + data[0]+','+ toUni(data[1]) + '\',null,eventSend(event))"><b style="color:' + DPR_prefs['coldppn'] + '">' + 'n' + '</b></span>&nbsp;';
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
	$('#anfleft').html(osout);
	
// add concise definitions
	
	var thisconcise = [];
	var conciseoutput = '';
	
	if (G_shortdefpost[which]) {
		thisconcise = G_shortdefpost[which].replace(/\$\$+/,'$').replace(/^\$/,'').replace(/\$$/,'').split('$'); 

		for (x = 0; x < thisconcise.length; x++)
		{
			if (thisconcise[x].length == 0) { continue; }
			
			var concisedefa = yt[thisconcise[x]];

			var condefnotype = concisedefa[2];
			if (condefnotype.length > 100) {
					condefnotype = condefnotype.substring(0,100);
				condefnotype += '...'
			}

			var concisedef = concisedefa[2];

			concisedef = toUni(concisedef + ' (' + linkToPED(concisedefa[1]) + ')');

			var conciseword = thisconcise[x];
			conciseword = toUni(conciseword);
			
			G_thisConcise[conciseword] = concisedef;
			if(x== 0) 
				var sdfirst = '<b style="color:' + DPR_prefs['colcpd'] + '">' + translit(conciseword) + '</b>: ' + concisedef;	
		}
		
	}
	if (thisconcise.length > 1 || (thisconcise[0] && thisconcise[0].length > 0)) 
		$('#anfright').html(sdfirst);

	//alert(G_thisConcise);
	if (hotlink) {
		if (hotlink.search('PED') >= 0) paliXML(hotlink);
		else DPPNXML(hotlink);
		//if(moveat == 2) { moveFrame(1); }
	}
	else clearDivs('dif');
    document.getElementById('bottom').style.top = (document.getElementById('anf').offsetHeight - 4) + 'px';
}

var G_thisConcise = [];

function showShortDef(word) {
	$('#anfright').html('<b style="color:' + DPR_prefs['colcpd'] + '";>' + translit(word) + '</b>: ' + G_thisConcise[word]);
}

function conciseChange(value) {
	var spdcol = value.split(':'); 
	$('#anfright').html('<b style="color:' + DPR_prefs['colcpd'] + '">' + translit(spdcol[1]) + ':</b> ' + spdcol[2]);
}

function linkToPED(text,word) {
	if(!/ of /.test(text))
		return text;
		
	var base = / of ([^;,. ]+)/.exec(text)[1];

	if(typeof(P[base]) == 'object' && toVel(base) != toVel(word)) {
		text = text.replace(base, '<span style="color:'+DPR_prefs['colsel']+'" class="pointer" onclick="paliXML(\'PED/' + P[base][0] + ','+toUni(base)+'\',true)">'+toUni(base)+'</a>');
	}
	return text;
}