var remote = true;

function output(sdp)
{
	var checksumout = new Array();
	var fff = 0;
	var shortdefpre = sdp;
	var hotlink = 0;
	var ttcheck = 0;
	var upcheck = 0;
	
	var shortdef = new Array();
	var sddup = [];
	var sdv = 0;
	
	var alex = "";
	var spacestop = 0;
	var punccheck = 0;
	
	// link entries with reference number more than
	// 0 to pages on our computer - change for online linking 
	var ped1 = 'etc/';
	var ped2 = '.xml';
	var dict = '../DPPN/';	

	var foldersw = new Array();
	var f0 = 0;
	var f1 = 0;
	
	var remotewhat = "";
	var folderno = 0;

	if (remote == true) ped2 =  '.pali';
	if (remote == true) dict = 'http://www.palikanon.com/english/pali_names/';
	
	var puncstop = 0;

	
	
	var velcount = 0;
	var trpunc = new Array();
	var lastword = 0;


	var osout = "";
	var curly = "";

  // lct is going to be our end-of-Line CounTer,
  // defined here as 100 characters (approximately)
  
	var lct = 0; //count letters
	var lctend = 0;
	var lctlimit = 40;
	
// create option dropdown
	
	var firstcheck = 1; // check for first complete output
	var trslice = 0;
	osout = osout + '<table cellspacing="0" cellpadding="0" width=100%><tr><td align=left valign="top"><table cellspacing="0" cellpadding="0"><tr><td>';
	//document.getElementById('difb').innerHTML = sdp.join(' | ') + '<br>' + tr.join(' | ');

	var outputs = []; // tr output
	var outputsd = []; // sdp output
	var outputshow = []; // displayed in option
	
	var onetword = [];
	var showword = [];
	var onesword = [];
	var altsel = '<select size="1" id="anfout" style="font-size:12px" onmouseover="this.size=this.length;" onmouseout="this.size=1;" onchange="tr=this.options[this.selectedIndex].value.split(\'#\'); output(document.getElementById(\'anfouts\').options[this.selectedIndex].value.split(\'#\'));" title="Select alternative interpretations here"></select><select id="anfouts" style="visibility:hidden" title="Select alternative interpretations here"></select>';
	
	for (var b = 0; b < tr.length; b++)
	{
			//alert(tr[b]);
			if (tr[b] == 'in')
			{
				if (firstcheck == 1) {
					document.getElementById('anfs').innerHTML = altsel;
					trslice = b;
					firstcheck = 0;
					outputs.push(onetword.join('#'));
					outputshow.push(showword.join(''));
					onetword = [];
					showword = [];
				}
			}
			else if (tr[b] == 'out')
			{
				outputs.push(onetword.join('#'));
				outputshow.push(showword.join(''));
				onetword = [];
				showword = [];
			}
			else if (tr[b] == 'newrow')
			{
				if (b == tr.length-1) { document.getElementById('anfs').innerHTML = ''; break; }  // only one match
				if (firstcheck == 1) {  // to slice tr
					document.getElementById('anfs').innerHTML = altsel;
					trslice = b;
					firstcheck = 0;
				} 
				outputs.push(onetword.join('#'));
				outputshow.push(showword.join(''));
				onetword = [];
				showword = [];
			}
			else if (tr[b]){
				onetword.push(tr[b]);
				if (tr[b].split('^')[1].length > 1) { showword.push(tr[b].split('^')[1]) }
				if (b == tr.length-1 && firstcheck == 0) { // last entry
					outputs.push(onetword.join('#'));
					outputshow.push(showword.join(''));
					onetword = [];
					showword = [];
				}

			}
	}

	if (trslice > 0) {
		tr = tr.slice(0,trslice);
	}
	trslice = 0;
	firstcheck = 1;
	//alert(shortdefpre);
	for (var b = 0; b < shortdefpre.length; b++)
	{
			if (shortdefpre[b] == 'q')
			{
				if (firstcheck == 1) {  // to slice sdp
					trslice = b;
					firstcheck = 0;
					if (b == shortdefpre.length-1) { break; }  // only one match
				} 
				outputsd.push(onesword.join('#'));
				onesword = [];
			}
			else {
				onesword.push(shortdefpre[b]);
			}
			//alert(onesword);
	}
	//document.getElementById('difb').innerHTML += '<br>' + outputs.length + ' ' + outputsd.length + ' ' + outputshow.length + '<br>' + outputs + ' | ' + outputsd + ' | ' + outputshow;
	//return;
	if (firstcheck == 0) {
		shortdefpre = shortdefpre.slice(0,trslice);
		for (i in outputs) { 
			document.getElementById('anfout').innerHTML += '<option value="' + outputs[i] + '">' + replaceunistandard(outputshow[i].replace(/,/g, '.')) + '</option>'; 
			document.getElementById('anfouts').innerHTML +='<option value="' + outputsd[i] + '">' + replaceunistandard(outputshow[i].replace(/,/g, '.')) + '</option>';
		}
	}
	
// display first output

	for (var a = 0; a < tr.length; a++)
	{		
		if(tr[a])
		{
			//osout += '<td>' + lct + '</td>';
			//alert(tr[a]);
			
			
			
			if (tr[a] == 'in')
			{
				osout += '</td><td>&nbsp;<br>&nbsp;</td></tr></table><br><table cellspacing="0" cellpadding="0"><tr><td width="1" valign="top" align="center">&nbsp;( <i>';
				tr[a] = '0^in^0^0';
				//alert(osout);
				lastword = 0;
				checksum2--;
			}
			else if (tr[a] == 'out')
			{
				osout += '</i> )';
				tr[a] = '0^out^0^0';
				//alert('out');
				lastword = 1;
			}
			else if (tr[a] == 'newrow')
			{
				osout += '</td><td>&nbsp;<br>&nbsp;</td></tr></table><br><table cellspacing="0" cellpadding="0"><tr><td width="1" valign="top" align="center"><i>';
				tr[a] = '0^newrow^0^0';
				checksum1++;
			}
			else
			{
			//if (a == 0) document.getElementById('debug').innerHTML= '<p>' + tr[a];
				
				var os = tr[a].split('^');
				
	
				var paliword = new PaliWord(os[0],os[1],os[2],os[3],os[4],os[5]);
				
				// os[0] = hyperlink
				// os[1] = pali word
				// os[2] = category
				// os[3] = proper name or not
				// os[4] = tooltip or not
				// os[5] = tooltip definition
				// for os[2]: 0 = first match (top), 1 = below, 2 = single digit, 3 = special suffix, 4 = new row
				// for os[4]: 1 = tooltip only, 2 = tooltip + match
			//if (os[1].length == 1 && os[2]
			//alert(tr[a]);		
	
				velcount = paliword.spell.replace(/\&....\;/g, 'x');
				velcount = velcount.replace(/\&.....\;/g, 'x');
				velcount = velcount.replace(/\&......\;/g, 'x');
				velcount = velcount.replace(/\&.......\;/g, 'x');
				
				//if (velcount.length != paliword.spell.length) alert (velcount + paliword.spell);
				
				if (os[2] != 1 && (os[1].charAt(os[1].length-1) != '-' || os[1].length == 1) && os[2] != 3)
				{
					checksum2++;
					checksumout[fff] = os[1];
					fff++;
				}
			
		
					// ---------- variables for checking last and next entry ----------
					var oss = new Array();
					if (a > 0) oss = tr[a-1].split('^');
					var osss = new Array();
					if (tr[a+1]) osss = tr[a+1].split('^');
						
			
					
					//alex += oss[2] +' -- ';
					
					// tooltip split
					if (paliword.toolTipDef)
					{
						paliword.toolTipDef = paliword.toolTipDef.replace(/,/g, '.');
						paliword.toolTipDef = paliword.toolTipDef.replace(/\&comma\;/g, ',');
						paliword.toolTipDef = paliword.toolTipDef.replace(/xxx/g, '^');
						var os5 = new Array;
						os5 = paliword.toolTipDef.split('^');
					}
				  
	
				  
					if (paliword.category != 1)
					{
						lct += velcount.length + 1;
						
					}
				  
				  
				  // internal table making
				  
					if (paliword.category != 1)
					{
						if (oss[2] == 1) 
						{
							osout = osout + '</font>';
						}
						
						osout = osout + '</td><td width="1" valign="top" align="center">';
						
						if (lct >= lctlimit && oss[1] != '\'')      // end of line
						{
							lctend = 1;
						}
					}	
					
					if (oss[2] == 0 && paliword.category == 1) //create the lower line
					{
						osout = osout + '<br><font size="2">';
					}
					if (puncstop != true || os[2] != 2) // check whether to include punctuation
					{
	
						if (paliword.category != 2)  // ---------- don't bother for nonword entries  ----------
						{
							
							
							if (paliword.category != 1) // not a subnote, either a non-match or a upper match
							{
								upcheck++; // add the upper word marker
								if (lastword == 1) osout += '&nbsp;';  // ---------- add spaces ----------
								if (oss[1] == '-' && puncstop != true) osout += '&nbsp;';  // ---------- add spaces ----------
		
								if (paliword.isToolTip > 0) // if tooltip
								{
									ttcheck++; // check whether to add the inline definition
									if (paliword.isToolTip == 1)
									{
										osout += '<b style="color:' + colorcfg['colcpd'] + '">' + paliword.spell + '</b>';
									}
									else if (paliword.isProperName == 1)  // dppn match
									{
										osout += '<a href="javascript:void(0)" onClick="moveframey(\'dif\'); DPPNXML(\'dppn/' + os[0] + '\')"><b style="color:' + colorcfg['coldppn'] + '">' + paliword.spell + '</b></a>';
										hotlink = dict + os[0] + '.htm'; // opens link in lower frame
									}
									else
									{
										osout += '<a href="javascript:void(0)" onClick="moveframey(\'dif\'); paliXML(\'PED/' + os[0] + '\')" ' + '><b style="color:' + colorcfg['colped'] + '">' + paliword.spell + '</b></a>';
										hotlink = 'PED/' + os[0]; // opens link in lower frame
									}
									shortdef[sdv] = os5[0] + '^' + os5[1];
									sdv++;
									
								} 
								else if (os[0] == 0) // no match
								{
								  osout += '<b style="color:' + colorcfg['coltext'] + '">' + paliword.spell + '</b>';
								}
								else if (paliword.isProperName == 1)  // dppn match
								{
								  osout += '<a href="javascript:void(0)" onClick="moveframey(\'dif\'); DPPNXML(\'dppn/' + os[0] + '\')"><b style="color:' + colorcfg['coldppn'] + '">' + paliword.spell + '</b></a>';
								  hotlink = 'dppn/' + os[0]; // opens link in lower frame
								}
								else
								{
								  osout += '<a href="javascript:void(0)" onClick="moveframey(\'dif\'); paliXML(\'PED/' + os[0] + '\')"><b style="color:' + colorcfg['colped'] + '">' + paliword.spell + '</b></a>';
								  hotlink = 'PED/' + os[0]; // opens link in lower frame
								}
					
							   /* add punctuation
								   noneedpunc = 0;
								   for (var lookpunc = a+1; lookpunc < tr.length; lookpunc++) 
								   {
										trpunc = tr[lookpunc].split('^');
										if (trpunc[2] == 0) noneedpunc = 1; // no punctuation in between words
										if (noneedpunc != 1) 
										{
					
											if (trpunc[2] == 2)		// ---------- punctuation in between ----------
						
											{
									
												if (trpunc[1] == '.')
												{
													osout = osout + '. &nbsp;';
												}
												else if (trpunc[1] == 'q')
												{
													osout = osout + ', ';
												}
												else if (trpunc[1] == '-')
												{
													osout = osout + '-- ';
												}
												else
												{
													osout = osout + trpunc[1];
												}
											}
										}
								   }
								   */
								if (osss[1])
								{
									//alert(os + ' ' + osss);
									//if (paliword.spell.charAt(paliword.spell.length-1) != '-' && osss[1].charAt(0) != '-' && osss[2] != 3 && osss[1].length != 1 && os[1] != '\'') osout += '&nbsp;';  // ---------- add spaces ----------
									//if (osss[1] == '-' && puncstop != true) osout += '&nbsp;';  // ---------- add spaces ----------
									
								}
							 
							 }
							 else // yes a below match
							 {
								if (paliword.isProperName == 1)  // name match
								{      
								   if (oss[2] != 1) // no space
								   {
									  if (os[0] == 0)
									  {
										 osout = osout + paliword.spell;
									  }
									  else
									  {
										 osout = osout + '<a style="color:' + colorcfg['coldppn'] + '" href="javascript:void(0)" onClick="moveframey(\'dif\'); DPPNXML(\'dppn/' + os[0] + '\')">' + paliword.spell + '</a>';
									  }
								   }
								   else if (os[0] == 0)
								   {
										 osout += ' ' + paliword.spell;
								   }
								   else
								   {
										 osout += ' <a style="color:' + colorcfg['coldppn'] + '" href="javascript:void(0)" onClick="moveframey(\'dif\'); DPPNXML(\'dppn/' + os[0] + '\')">' + paliword.spell + '</a>'; // add space
								   }
								}
								else  // dictionary alt match
								{
								   if (oss[2] != 1) // no space
								   {
									  if (os[0] == 0)
									  {
										 osout = osout + paliword.spell;
									  }
									  else
									  {
										 osout = osout + '<a style="color:' + colorcfg['colped'] + '" href="javascript:void(0)" onClick="moveframey(\'dif\'); paliXML(\'PED/' + os[0] + '\')">' + paliword.spell + '</a>';
									  }
								   }
								   else if (os[0] == 0)
								   {
										 osout = osout + ' ' + paliword.spell;
								   }
								   else
								   {
										 osout += ' <a style="color:' + colorcfg['colped'] + '" href="javascript:void(0)" onClick="moveframey(\'dif\'); paliXML(\'PED/' + os[0] + '\')">' +
														  paliword.spell + '</a>';
								   }
								}
							}
						
						}
						else // punctuation rules
						{
							if (os[1] == '\\')
							{
								osout += '&nbsp;';
								
								osout += '\'';
								
								//if (osss[2] != 0 && osss[2] != 2) osout += '&nbsp;';
							}
							else if (os[1] == ';' || os[1] == 'q' || os[1] == '-' && osss[2] == 2)
							{
								//alert(os[1]);
								osout = osout + paliword.spell + '&nbsp;';
							}
							else if (os[1] == ',' || os[1] == '?')
							{
								osout = osout + paliword.spell + '&nbsp;&nbsp;';
							}					
							else osout = osout + paliword.spell;
						}
						spacestop = 0;
					}
					else if (puncstop == 1 && spacestop != 1)
					{
						
						osout = osout + '&nbsp;';
						spacestop = 1;
					}
				}
				if (os[2] != 1)
				{
					if (os[1].charAt(os[1].length-1) != '-' && os[1].length > 1 && osss[2] != 3) 
					{ 
						lastword = 1; // add a space
						
					}
					else lastword = 0;
				}
				lctend = 0; // cancel next if
				if (lctend == 1 && osss[2] != 1)
				{
					if (osss[1])
					{
						if (osss[1].length > 1)
						{
							osout = osout + '</td><td>&nbsp;<br>&nbsp;</td></tr></table><br><table cellspacing="0" cellpadding="0"><tr><td width="1" valign="top" align="center"><i>';
							lct = 0;
							lctend = 0;
						}
					}
				}
			}
			else tr[a] = '';
		}
	
	
	osout += '</tr></table></td><td align=center id=c></td><td align=right style="">';
	var ootmp = '';
	if (shortdefpre.length > 1) ootmp += '<select size="1" style="font-size:12px" onmouseover="this.size=this.length;" onmouseout="this.size=1;" onclick="var spdouts = this.value;  var spdcol = spdouts.search(\':\'); document.getElementById(\'spdout\').innerHTML = \'<b style=\&quot;color:' + colorcfg['colcpd'] + '\&quot;>\' + spdouts.substring(0,spdcol) + \':</b> \' + spdouts.substring(spdcol+1,spdouts.length);">';
	if (ttcheck > 0)
	{
		var os5array = new Array();
		var sdpone;
		for (sdt = 0; sdt < shortdefpre.length; sdt++)
		{
			sdpone = shortdefpre[sdt];
			sdsone = shortdef[sdt];
			sdpone = sdpone.replace(/aa/g, '&#257;');
			sdpone = sdpone.replace(/ii/g, '&#299;');
			sdpone = sdpone.replace(/uu/g, '&#363;');
			sdpone = sdpone.replace(/\,t/g, '&#7789;');
			sdpone = sdpone.replace(/\,d/g, '&#7693;');
			sdpone = sdpone.replace(/\`n/g, '&#7749;');
			sdpone = sdpone.replace(/\,n/g, '&#7751;');
			sdpone = sdpone.replace(/\,m/g, '&#7747;');
			sdpone = sdpone.replace(/\~n/g, '&ntilde;');
			sdpone = sdpone.replace(/\,l/g, '&#7735;');
			sdpone = sdpone.replace(/AA/g, '&#256;');
			sdpone = sdpone.replace(/II/g, '&#298;');
			sdpone = sdpone.replace(/UU/g, '&#362;');
			sdpone = sdpone.replace(/\,T/g, '&#7788;');
			sdpone = sdpone.replace(/\,D/g, '&#7692;');
			sdpone = sdpone.replace(/\,N/g, '&#7750;');
			sdpone = sdpone.replace(/\,M/g, '&#7746;');
			sdpone = sdpone.replace(/\~N/g, '&Ntilde;');
			sdpone = sdpone.replace(/\,L/g, '&#7734;');

			os5array = sdsone.split('^');
			if (!sddup[sdpone]) {
				if (sdt == 0) { var sdfirst = '<b style="color:' + colorcfg['colcpd'] + '">' + sdpone + ': </b>' + os5array[0] + ' (' + os5array[1] + ')'; } 
				if (shortdefpre.length > 1) {
					var os5a0 = os5array[0];
					if (os5array[0].length > 100) {
						while (os5a0.length > 100) {
							os5a0 = os5a0.substring(0,os5a0.length-1);
						}
						os5a0 += '...'
					}
					
					ootmp += '<option value="' + sdpone + ': ' + os5array[0] + ' (' + os5array[1] + ')">' + sdpone + ': ' + os5a0 + ' (' + os5array[1] + ')</option>'; 
						
				}
				sddup[sdpone] = sdsone;
			}		
		}
		
	}
	//document.getElementById('difb').innerHTML += '<br>|' + shortdefpre + '|';
	if (shortdefpre.length > 1) ootmp += '</select>';
	if (shortdefpre.length > 1 || (shortdefpre[0] && shortdefpre[0].length > 0)) osout += '<span id=spdout>'+sdfirst+'</span></td></tr></table>';

	document.getElementById('anfsd').innerHTML = ootmp;
	document.getElementById('anfb').innerHTML = osout;
	//document.getElementById('maf').scrollTop = 0; // horizontal and vertical scroll targets
	if (hotlink != 0) {
		if (hotlink.search('PED') >= 0) paliXML(hotlink);
		else if (hotlink.search('dppn') >= 0) DPPNXML(hotlink);
		//else location = hotlink;
	}
	//else document.getElementById('difb').innerHTML = 'No PED Match';
	
	tr = new Array();
	multiple = 0;
	
	//if (checksum1 != checksum2) document.getElementById('anfb').innerHTML += '<p>(' + checksum1 + ' ' + checksum2 + ')</p>';
	checksum1 = 0;
	checksum2 = 0;
	//alert(alex);
}
var pedfileget = '';
function paliXML(file)
{
	var tloc = file.split('/');
	pedfileget = tloc[1] + '/' + tloc[2];
	var pedp = 'etc/XML1/'+ tloc[1]+'/ped.xml';

	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", pedp, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;


	var tloc = pedfileget.split('/');
	var tloc1 = tloc[0];	
	var tloc2 = tloc[1];	
	var dataa = xmlDoc.getElementsByTagName('data')[tloc2].getElementsByTagName('sdata');
	var data = '';
	for (j=0; j<dataa.length; j++) {
		data += dataa[j].childNodes[0].nodeValue;
	}		
	
	document.getElementById('difb').setAttribute('align','left');
	document.getElementById('difb').innerHTML = data;
    document.getElementById('cdif').scrollTop=0;

	var pedln = [];
	pedln.push(4446);
	pedln.push(2932);
	pedln.push(3907);
	pedln.push(3687);
	pedln.push(1304);
	
	var tnum = parseFloat(tloc2);
	var tout = '';
	var bout = '';

	if (tnum != 0) tout += '<input type="button" class="btn" value="<" onclick="paliXML(\'PED/' + tloc1 + '/' + (tnum - 1) + '\')">';
	if (tnum != pedln[tloc2]) bout += '<input type="button" class="btn" value=">" onclick="paliXML(\'PED/' + tloc1 + '/' + (tnum + 1) + '\')">';
	document.getElementById('lt').innerHTML = tout;
	document.getElementById('lb').innerHTML = bout;
}

function DPPNXML(file)
{
	var tloc = file.split('/')[1]+'/'+file.split('/')[2];
	pedfileget = nameno[tloc].split('/')[1];
	var pedp = 'etc/XML2/'+nameno[tloc].split('/')[0]+'.xml';

	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", pedp, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;


	var dataa = xmlDoc.getElementsByTagName('entry')[pedfileget].getElementsByTagName('data');
	var data = '';
	for (j=0; j<dataa.length; j++) {
		data += dataa[j].childNodes[0].nodeValue;
	}		
	
	document.getElementById('difb').setAttribute('align','left');
	document.getElementById('difb').innerHTML = data;
    document.getElementById('cdif').scrollTop=0;

	var tout = '';
	var bout = '';

/*
	var pedln = [];
	pedln.push(4446);
	pedln.push(2932);
	pedln.push(3907);
	pedln.push(3687);
	pedln.push(1304);
	
	var tnum = parseFloat(tloc2);

	if (tnum != 0) tout += '<input type="button" class="btn" value="<" onclick="paliXML(\'etc/' + tloc1 + '/' + (tnum - 1) + '.xml\')">';
	if (tnum != pedln[tloc2]) bout += '<input type="button" class="btn" value=">" onclick="paliXML(\'etc/' + tloc1 + '/' + (tnum + 1) + '.xml\')">';
*/

	document.getElementById('lt').innerHTML = tout;
	document.getElementById('lb').innerHTML = bout;

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