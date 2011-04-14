
var unnamed = '[unnamed]';

var hier = 'm'; // m = mula, a = atthakatha, t = tika

var matButton = 0; // tells us we've clicked an in-section mat button.
var matValue = []; // for storing values from section after clicking mat button in section
matValue['m'] = '';
matValue['a'] = '';
matValue['t'] = '';

function loadXMLSection(labelsearch,para,place,isPL)
{ 
	moveframex(2);
	
	hier = place[7];
	if (hier == 't' && limitt()) { 
		alertFlash('Ṭīkā not available for ' + G_nikLongName[document.form.nik.value]+'.','RGBa(255,0,0,0.8)');
		return; 
	}
	if (hier == 'a' && place[0] == 'g') {
		alertFlash('Atthakatha not available for grammar.','RGBa(255,0,0,0.8)');
		return;
	}		
	if (hier == 'a' && place[0] == 'b') {
		alertFlash('Atthakatha not available for Abhidh-s.','RGBa(255,0,0,0.8)');
		return;
	}		


	document.getElementById('mafbc').appendChild(pleasewait);

	var nikaya = place[0];
	place[1]= parseInt(place[1]);
	place[2]= parseInt(place[2]);
	place[3]= parseInt(place[3]);
	place[4]= parseInt(place[4]);
	place[5]= parseInt(place[5]);
	place[6]= parseInt(place[6]);
	
	var bookno = place[1];
	var book = place[1]+1;
	var meta = place[2];
	var volume = place[3];
	var vagga = place[4];
	var sutta = place[5];
	var section = place[6]

	
	var bookload = 'xml/' + nikaya + book + hier + '.xml';

	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", bookload, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;



	var t = xmlDoc.getElementsByTagName("ha");
	var u = t[0].getElementsByTagName("h0");
	var v = u[meta].getElementsByTagName("h1");
	var w = v[volume].getElementsByTagName("h2");
	var x = w[vagga].getElementsByTagName("h3");
	var y = x[sutta].getElementsByTagName("h4");
	var z = y[section].getElementsByTagName("p");
	
	// relative mat
	
	var matButtonCount = 0;
	if (matButton == 1) {  // mat button pushed already, remember the place
		matButtonCount = '1';
		matButton = 0;
	}
	else {
		matValue['m'] = '';
		matValue['a'] = '';
		matValue['t'] = '';
	}
	var relout = '<input type="hidden" id="matButtonCount" value="'+matButtonCount+'">';
	var relwhere = [nikaya+"^"+bookno+"^"+meta+"^"+volume+"^"+vagga+"^"+sutta+"^"+section,
	nikaya+"^"+bookno+"^"+meta+"^"+volume+"^"+vagga+"^"+sutta+"^*",
	nikaya+"^"+bookno+"^"+meta+"^"+volume+"^"+vagga+"^*^*",
	nikaya+"^"+bookno+"^"+meta+"^"+volume+"^*^*^*",
	nikaya+"^"+bookno+"^"+meta+"^*^*^*^*",
	nikaya+"^"+bookno+"^*^*^*^*^*"];
	for (i in relwhere) {
		var relhere = eval('rel'+hier+"['"+relwhere[i]+"']");
		if (relhere) {
			var hi = ['m','a','t'];
			var hic = 0;
			for (ht = 0; ht < hi.length; ht++) {
				if(hi[ht] == hier) continue;
				if (relhere.split('#')[hic] != '') {
					var relherea = relhere.split('#')[hic].replace(/\*/g,'0').split('^');
					relout+='<span class="abut obut small" onclick="matButton = 1; openPlace(\''+hi[ht] + "','"+relherea[0]+"',"+relherea[1]+","+relherea[2]+","+relherea[3]+","+relherea[4]+","+relherea[5]+","+relherea[6]+',null,null,(event.ctrlKey?1:null));importXML();" title="Relative section in '+G_hTitles[ht]+'">'+hi[ht]+'</span> ';
					matButton = 0;

				}
				hic++;
			}
			break;
		}
	}
	
	
	// prev and next
	var prev, next;
	
	if(section > 0) {
	}
	else if(sutta > 0) var ym = x[sutta-1].getElementsByTagName("h4"); 
	else if(vagga > 0) {
		var xm = w[vagga-1].getElementsByTagName("h3"); 
		var ym = xm[xm.length-1].getElementsByTagName("h4"); 
	}
	else if(volume > 0)  {
		var wm = v[volume-1].getElementsByTagName("h2"); 
		var xm = wm[wm.length-1].getElementsByTagName("h3"); 
		var ym = xm[xm.length-1].getElementsByTagName("h4"); 
	}
	else if(meta > 0) {
		var vm = u[meta-1].getElementsByTagName("h1"); 
		var wm = vm[vm.length-1].getElementsByTagName("h2"); 
		var xm = wm[wm.length-1].getElementsByTagName("h3"); 
		var ym = xm[xm.length-1].getElementsByTagName("h4"); 
	}
	else var prevnext = false;
	
	switch(true) {
		case (prevnext == false):
		break;
		case (section > 0):
			prev = [hier,nikaya,bookno,meta,volume,vagga,sutta,section-1];
		break;
		case (sutta > 0):
			prev = [hier,nikaya,bookno,meta,volume,vagga,sutta-1,ym.length-1];
		break;
		case (vagga > 0):
			prev = [hier,nikaya,bookno,meta,volume,vagga-1,xm.length-1,ym.length-1];
		break;
		case (volume > 0):
			prev = [hier,nikaya,bookno,meta,volume-1,wm.length-1,xm.length-1,ym.length-1];
		break;
		case (meta > 0):
			prev = [hier,nikaya,bookno,meta-1,vm.length-1,wm.length-1,xm.length-1,ym.length-1];
		break;
	}
	
	switch(true) {
		case (section < y.length-1):
			next = [hier,nikaya,bookno,meta,volume,vagga,sutta,section+1];
		break;
		case (sutta < x.length-1):
			next = [hier,nikaya,bookno,meta,volume,vagga,sutta+1,0];
		break;
		case (vagga < w.length-1):
			next = [hier,nikaya,bookno,meta,volume,vagga+1,0,0];
		break;
		case (volume < v.length-1):
			next = [hier,nikaya,bookno,meta,volume+1,0,0,0];
		break;
		case (meta < u.length-1):
			next = [hier,nikaya,bookno,meta+1,0,0,0,0];
		break;
	}
	
	var nextprev = (prev ? '<span class="lbut abut small" onclick="openPlace(\''+prev.join("\',\'")+'\');">«</span>':'<span class="lbut abut small">&nbsp;</span>') + (next ? '<span class="rbut abut small" onclick="openPlace(\''+next.join("\',\'")+'\');">»</span>':'<span class="rbut abut small">&nbsp;</span>');
	
	// permalink
	
	var permalink = 'chrome://digitalpalireader/content/index.htm' + '?loc='+nikaya+'.'+bookno+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hier+(labelsearch ? '&query=' + toVel(labelsearch.join('+')).replace(/ /g, '_') : '');
	if(!isPL) { //not coming from a permalink
		try {
			window.history.replaceState('Object', 'Title', permalink+(para ? '&para=' + (para+1) : ''));
		}
		catch(ex) {
		}
	}
	
	// titles
	
	var un = t[0].getElementsByTagName("han");
	var vn = u[meta].getElementsByTagName("h0n");
	var wn = v[volume].getElementsByTagName("h1n");
	var xn = w[vagga].getElementsByTagName("h2n");
	var yn = x[sutta].getElementsByTagName("h3n");
	var zn = y[section].getElementsByTagName("h4n");
	var una = (un[0].childNodes[0] ? un[0].textContent : ' ');
	var vna = (vn[0].childNodes[0] ? vn[0].textContent : ' ');
	var wna = (wn[0].childNodes[0] ? wn[0].textContent : ' ');
	var xna = (xn[0].childNodes[0] ? xn[0].textContent : ' ');
	var yna = (yn[0].childNodes[0] ? yn[0].textContent : ' ');
	var zna = (zn[0].childNodes[0] ? zn[0].textContent : ' ');

	// "modern" reference
	var modt = '';
	var modn;
	if(hier == 'm') {
		var modno = getSuttaNumber(nikaya,bookno,meta,volume,vagga,sutta,section,y.length);	
		var modt = 	(modno ? ' (<b class="small" style="color:'+G_prefs['colsel']+'">' + G_nikLongName[nikaya] + (hier == 'm' ? '' : '-'+hier) + '&nbsp;' + modno + '</b>)' : '');
	}



	// output header
	
	var titleout = convtitle(nikaya,book,una,vna,wna,xna,yna,zna,hier);

	document.getElementById('mafbc').innerHTML = '<table width=100%><tr><td align=left>'+ nextprev+ ' ' +relout+'</td><td align=center>'+titleout+modt+(G_prefs['showPermalinks'] ? ' <span class="pointer hoverShow" onclick="permalinkClick(\''+permalink+'\',1);" title="Click to copy permalink to clipboard">☸&nbsp;</span>' :'')+'</td><td id="maftrans" align="right"></td></tr></table>';
		
	var hierb = hier;
	
	// add to history

	if (zna.length > 1) { var bknameme = zna }
	else if (yna.length > 1) { var bknameme  = yna }
	else if (xna.length > 1) { var bknameme  = xna }
	else if (wna.length > 1) { var bknameme  = wna }
	else if (vna.length > 1) { var bknameme  = vna }
	else bknameme = '';
	
	bknameme = bknameme.replace(/^ +/, '').replace(/ +$/, '');

	addHistory(G_nikLongName[nikaya]+(hier!='m'?'-'+hier:'')+' '+book+' - '+bknameme+"@"+G_nikToNumber[nikaya]+','+bookno+','+meta+','+volume+','+vagga+','+sutta+','+section+','+hierb);

	var sidebarWindow = mainWindow.document.getElementById("sidebar").contentDocument;
	// Verify that our sidebar is open at this moment:
	if (sidebarWindow.location.href == "chrome://digitalpalireader/content/digitalpalireader.xul") {
		sidebarWindow.getElementById('dpr-browser').contentWindow.historyBox();
	} 
	
	// tab title

	var tabT = 'Pali: ' + G_nikLongName[nikaya] +  (modno ? modno : (hier !='m' ? '-'+hier:'') + ' ' + (bookno+1)) + ' - ' + bknameme  + '';
	
	document.getElementsByTagName('title')[0].innerHTML = tabT;
	

	var theData = '';
	
	// check if there is a search going on and add the labels
	if (labelsearch) {
		var obj = (obj);
		atlabel:
		for (tmp = 0; tmp < z.length; tmp++)
		{
			var quit = 0;
			var onepar = z[tmp].textContent.replace(/^ *\[[0-9]+\] */,'').replace(/  +/g, ' ');
			var onepars = onepar.replace(/ *\{[^}]*\} */g, ' ').replace(/\^a\^[^^]*\^ea\^/g, '').replace(/\^e*b\^/g, '').replace(/  +/g, ' ');
			for (tmpl = 0; tmpl < labelsearch.length; tmpl++)
			{
				if ((obj ? onepars.search(labelsearch[tmpl]) : onepars.indexOf(labelsearch[tmpl])) == -1) { // at least one of the strings was not found -> no match
					theData += ' <p'+permalink+'&para='+(tmp+1)+'> ' + onepar;
					continue atlabel;
				}
			}
			theData += ' <p'+permalink+'&para='+(tmp+1)+'> ';
			var tmpdata = onepar;
			for (var i = 0; i < labelsearch.length; i++)
			{
				var lt = labelsearch[i];
				var ltrg = (obj ? lt : new RegExp(lt, 'g'));
				if (!lt) continue;
				onepar = tmpdata;
				tmpdata = '';
				while ((obj ? onepars.search(lt) : onepars.indexOf(lt)) > -1) {
					var matched = (obj ? onepars.match(lt)[0] : lt);
					var matchat = (obj ? onepars.search(lt) : onepars.indexOf(lt));
					if(!onepar.match(ltrg) || (onepars.match(ltrg).length != onepar.match(ltrg).length && (obj ? onepar.search(lt) : onepar.indexOf(lt)) != matchat)) { // something in the way
						var opp = onepar.search(/[{^]/);
						if(opp <= matchat) { // something before the match
							tmpdata += onepar.substring(0,opp+1); // add before thing and first part of thing
							onepar = onepar.substring(opp+1); 
							tmpdata += onepar.substring(0,onepar.search(/[}^]/)+1); // add rest of thing
							onepar = onepar.substring(onepar.search(/[}^]/)+1); // after rest of thing
						}
						else { // something inside, maybe two...
							tmpdata += onepar.substring(0,matchat); // add before start of match
							
							onepar = onepar.substring(matchat); // from start of match on
							
							var lss = lt.split(' ').length;
							var ops = onepar.replace(/ *\{[^}]*\}/g,'x').replace(/\^e*b\^/g,'x').replace(/ *\^a\^[^^]*\^ea\^/g, 'x').replace(/   */g, ' ').split(' ',lss).join(' '); // same number of words, this one has x's
							var opsm = ops.match(/x/g);
							var xlt = lt;
							var getit;
							for (j = 0; j < opsm.length; j++) {
								var getit1 = onepar.search(/\{/);
								var getit2 = onepar.search(/\^/);
								if(getit1 < 0) getit = onepar.match(/( *\^a\^[^^]*\^ea\^|\^e*b\^)/)[0];
								else if (getit2 < 0) getit = onepar.match(/ *\{[^}]*\} */)[0];
								else getit = (getit1 < getit2 ? onepar.match(/ *\{[^}]*\} */)[0] : onepar.match(/( *\^a\^[^^]*\^ea\^|\^e*b\^)/)[0]);
								tmpdata += '<c' + i  + '>' + onepar.substring(0,(xlt.length < ops.indexOf('x') ? xlt.length : ops.indexOf('x'))).replace(/ /g,'<xc> <c' + i  + '>') + '<xc>' + (xlt.length < ops.indexOf('x') ? onepar.substring(xlt.length,ops.indexOf('x')) : '') + getit;
								onepar = onepar.substring(ops.indexOf('x')+getit.length);
								xlt = (xlt.substring(ops.indexOf('x')).length > 0 ? xlt.substring(ops.indexOf('x')) : '');
								ops = ops.substring(ops.indexOf('x')+1);
							}
							tmpdata += (xlt.length > 0 ? '<c' + i  + '>' + xlt.replace(/ /g,'<xc> <c' + i  + '>') + '<xc>' : '') + ops.substring(xlt.length) + ' ';

							onepar = onepar.substring(ops.length); // after last x
						}
					}
					else { // nothing blocking
						matchat = obj ? onepar.search(lt) : onepar.indexOf(lt);
						tmpdata += onepar.substring(0,matchat);
						tmpdata += '<c' + i  + '>' + matched.replace(/  */g, '<xc> <c' + i  + '>') + '<xc>';
						onepar = onepar.substring(matchat + matched.length);
					}
					onepars = onepar.replace(/ *\{[^}]*\}/g, '').replace(/\^a\^[^^]*\^ea\^/g, '').replace(/\^e*b\^/g, '').replace(/   */g, ' ');
				}
				tmpdata += onepar;
			}
			
			theData += tmpdata;
		}
	}	
	else {
		for (tmp = 0; tmp < z.length; tmp++)
		{
			theData += ' <p'+permalink+'&para='+(tmp+1)+'> ' + z[tmp].textContent.replace(/^ *\[[0-9]+\] */,'').replace(/  +/g, ' ');
		}
	}
	outputFormattedData(theData,place);
	//document.textpad.pad.value=theData;
	if(para) { 
        document.getElementById('maf').scrollTop = document.getElementById('para'+para).offsetTop;
	}

}

function loadXMLindex(place) {
	
	moveframex(1);
	
	var DshowH = false; // dev tool
	DshowH = true; // dev tool
	
	document.activeElement.blur();
	
	if (place[2] == 't' && limitt()) { 
		alertFlash('Ṭīkā not available for ' + G_nikLongName[document.form.nik.value]+'.','RGBa(255,0,0,0.8)');
		return; 
	}	
	
	hier = place[2];
	
	document.getElementById('mafbc').innerHTML = '';
	document.getElementById('mafbc').appendChild(pleasewait);

	var nikaya = place[0];
	var bookno = parseInt(place[1]);
	var book = bookno+1;
	var bookload = 'xml/' + nikaya + book + hier + '.xml';

	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", bookload, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;

	var z = xmlDoc.getElementsByTagName("ha");
	var y = '';
	var x = '';
	var w = '';
	var v = '';
	var u = '';
	
	var tt, dEI,namen;
	
	var theData = "";
	var theDatao = "";
	var tmpData = '';
	
	bookfile = nikaya + book;


	// permalink

	var permalink = 'chrome://digitalpalireader/content/index.htm?';
	
	try {
		window.history.replaceState('Object', 'Title', permalink+'loc='+nikaya+'.'+bookno+'.'+hier);
	}
	catch(ex) {
	}
	
	var tmp = 0;
	var tmp1 = 0;
	var tmp2 = 0;
	var tmp3 = 0;
	var tmp4 = 0;
	var tmp5 = 0;
	var tmp6 = 0;

	var col = ['coltext','colsel','colped','coldppn','colcpd'];
	var whichcol = [0,0,0,0,0];
	var wcs = 0;

	var tabT = G_nikLongName[nikaya] + (hier !='m' ? '-'+hier:'') + ' ' + book + ' index (' + z[tmp].getElementsByTagName("han")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{.*\}/,'').replace(/^  */, '').replace(/  *$/,'') + ')';
	document.getElementsByTagName('title')[0].innerHTML = tabT;

	
	if (z[tmp].getElementsByTagName("han")[0].childNodes[0]) {
		theData = z[tmp].getElementsByTagName("han")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+G_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); 

	}
	else theData = '';
	if (z.length > 1 && theData == '') { theData = unnamed; } 
	if (theData != '') {
		
		namen = '';
		if (G_prefs['showNames']) {
			// dppn title 'n'

			tt = toVel(theData).replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
			if(tt.length > 1) {
				dEI = getDppnEntry(tt);
				if (dEI.length > 0) {
					namen = '<span class="super tiny pointer" style="color:'+G_prefs['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/'+dEI.join(','+toUni(tt)+'\');">&nbsp;n</span><span class="super tiny pointer" style="color:'+G_prefs['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/')+','+toUni(tt)+'\');">&nbsp;n</span>';
				}
			}
		}
		
		whichcol[0] = 1; // bump up to let the second color know

		theDatao += (devCheck == 1 && DshowH ? '[a]':'')+(G_prefs['showPermalinks'] ? '<span class="pointer hoverShow" onclick="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.0.0.0.0.0.'+hier+'\');" title="Click to copy permalink to clipboard">☸&nbsp;</span>&nbsp;' :'')+'<a onclick="openPlace(\''+hier+'\',\''+nikaya+'\','+bookno+',0,0,0,0,0,null,null,(event.ctrlKey?1:\'\'));"/><font style="color:'+G_prefs[col[wcs]]+'"><b>' + translit(toUni(theData)) + '</b></font></a>'+namen+'<br />';
	}
	y = z[tmp].getElementsByTagName("h0");
	for (tmp2 = 0; tmp2 < y.length; tmp2++)
	{
		if (y[tmp2].getElementsByTagName("h0n")[0].childNodes[0]) theData = y[tmp2].getElementsByTagName("h0n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+G_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
		if (y.length > 1 && theData == '') { theData = unnamed; }
		if (theData != '') {

			namen = '';
			if (G_prefs['showNames']) {

				// dppn title 'n'
				
				tt = toVel(theData).replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
				if(tt.length > 1) {
					dEI = getDppnEntry(tt);
					if (dEI.length > 0) {
						namen = '<span class="super tiny pointer" style="color:'+G_prefs['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/'+dEI.join(','+toUni(tt)+'\');">&nbsp;n</span><span class="super tiny pointer" style="color:'+G_prefs['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/')+','+toUni(tt)+'\');">&nbsp;n</span>';
					}
				}
			}
							
			wcs = whichcol[0]; // either 0 or 1
			whichcol[1] = 1; // bump up for the next color, if no data, this will still be 0, next color will get 0
			var spaces = '';
			for(f = 0; f < wcs; f++) {
				spaces += '&nbsp;&nbsp;';
			}
			
			theDatao += spaces+(devCheck == 1 && DshowH ? '[0]':'')+(G_prefs['showPermalinks'] ? '<span class="pointer hoverShow" onclick="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.'+tmp2+'.0.0.0.0.'+hier+'\');" title="Click to copy permalink to clipboard">☸&nbsp;</span>&nbsp;' :'')+'<a onclick="openPlace(\''+hier+'\',\''+nikaya+'\','+bookno+','+tmp2+',0,0,0,0,null,null,(event.ctrlKey?1:\'\'));"/><font style="color:'+G_prefs[col[wcs]]+'">' + translit(toUni(theData)) + '</font></a>'+namen;

			var transin;
			var transout='';
			if (hier == "m") { 
				transin = addtrans(5,nikaya,bookno,tmp2);
				if (transin) {
					theDatao += transin.join('&nbsp;'); 
				}
			}
			theDatao += '<br />';
		}
		x = y[tmp2].getElementsByTagName("h1");
		for (tmp3 = 0; tmp3 < x.length; tmp3++)
		{
			if (x[tmp3].getElementsByTagName("h1n")[0].childNodes[0]) theData = x[tmp3].getElementsByTagName("h1n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+G_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
			if (x.length > 1 && theData == '') { theData = unnamed; }
			if (theData != '') {

				namen = '';
				if (G_prefs['showNames']) {

					// dppn title 'n'
					
					tt = toVel(theData).replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
					if(tt.length > 1) {
						dEI = getDppnEntry(tt);
						if (dEI.length > 0) {
							namen = '<span class="super tiny pointer" style="color:'+G_prefs['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/'+dEI.join(','+toUni(tt)+'\');">&nbsp;n</span><span class="super tiny pointer" style="color:'+G_prefs['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/')+','+toUni(tt)+'\');">&nbsp;n</span>';
						}
					}
				}					
					
				wcs = whichcol[0] + whichcol[1]; // 0, 1 or 2 - if 0,1 are still 0, this will get 0
				whichcol[2] = 1; // bump up for the next color, if no data, this will still be -1, next color will get 0
			
				spaces = '';
				for(f = 0; f < wcs; f++) {
					spaces += '&nbsp;&nbsp;';
				}

				theDatao += spaces+(devCheck == 1 && DshowH ? '[1]':'')+(G_prefs['showPermalinks'] ? '<span class="pointer hoverShow" onclick="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.'+tmp2+'.'+tmp3+'.0.0.0.'+hier+'\');" title="Click to copy permalink to clipboard">☸&nbsp;</span>&nbsp;' :'')+'<a onclick="openPlace(\''+hier+'\',\''+nikaya+'\','+bookno+','+tmp2+','+tmp3+',0,0,0,null,null,(event.ctrlKey?1:\'\'));"/><font style="color:'+G_prefs[col[wcs]]+'">' + translit(toUni(theData)) + '</font></a>'+namen;

				var transin;
				var transout='';
				if (hier == "m") { 
					transin = addtrans(4,nikaya,bookno,tmp2,tmp3);
					if (transin) {
						theDatao += transin.join('&nbsp;'); 
					}
				}
				theDatao += '<br />';
			}
			w = x[tmp3].getElementsByTagName("h2");
			for (tmp4 = 0; tmp4 < w.length; tmp4++)
			{
				if (w[tmp4].getElementsByTagName("h2n")[0].childNodes[0]) theData = w[tmp4].getElementsByTagName("h2n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+G_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
				if (w.length > 1 && theData == '') { theData = unnamed; }
				if (theData != '') {


					namen = '';
					if (G_prefs['showNames']) {
						// dppn title 'n'
						
						tt = toVel(theData).replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
						if(tt.length > 1) {
							dEI = getDppnEntry(tt);
							if (dEI.length > 0) {
								namen = '<span class="super tiny pointer" style="color:'+G_prefs['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/'+dEI.join(','+toUni(tt)+'\');">&nbsp;n</span><span class="super tiny pointer" style="color:'+G_prefs['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/')+','+toUni(tt)+'\');">&nbsp;n</span>';
							}
						}
					}
									
						
						
					wcs = whichcol[0] + whichcol[1] + whichcol[2]; // 0, 1, 2, or 3
					whichcol[3] = 1; // bump
					
					spaces = '';
					for(f = 0; f < wcs; f++) {
						spaces += '&nbsp;&nbsp;';
					}

					theDatao += spaces+(devCheck == 1 && DshowH ? '[2]':'')+(G_prefs['showPermalinks'] ? '<span class="pointer hoverShow" onclick="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.'+tmp2+'.'+tmp3+'.'+tmp4+'.0.0.'+hier+'\');" title="Click to copy permalink to clipboard">☸&nbsp;</span>&nbsp;' :'')+'<a onclick="openPlace(\''+hier+'\',\''+nikaya+'\','+bookno+','+tmp2+','+tmp3+','+tmp4+',0,0,null,null,(event.ctrlKey?1:\'\'));"/><font style="color:'+G_prefs[col[wcs]]+'">' + translit(toUni(theData))+(nikaya == 'd' && hier == 'm' ? '&nbsp;<d class="small">(DN&nbsp;'+getSuttaNumber(nikaya,bookno,tmp2,tmp3,tmp4,0,0,0) + ')' : '') + '</d></font></a>'+namen;
					var transin;
					var transout='';
					if (hier == "m") { 
						transin = addtrans(3,nikaya,bookno,tmp2,tmp3,tmp4);
						if (transin) {
							theDatao += transin.join('&nbsp;'); 
						}
					}
					theDatao += '<br />';
				}

				v = w[tmp4].getElementsByTagName("h3");
				for (tmp5 = 0; tmp5 < v.length; tmp5++)
				{
					if (v[tmp5].getElementsByTagName("h3n")[0].childNodes[0]) theData = v[tmp5].getElementsByTagName("h3n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+G_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
					if (v.length > 1 && theData == '') { theData = unnamed; }
					if (theData != '') {

						namen = '';
						if (G_prefs['showNames']) {
							// dppn title 'n'
							
							tt = toVel(theData).replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
							if(tt.length > 1) {
								dEI = getDppnEntry(tt);
								if (dEI.length > 0) {
									namen = '<span class="super tiny pointer" style="color:'+G_prefs['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/'+dEI.join(','+toUni(tt)+'\');">&nbsp;n</span><span class="super tiny pointer" style="color:'+G_prefs['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/')+','+toUni(tt)+'\');">&nbsp;n</span>';
								}
							}
						}			
							

						wcs = whichcol[0] + whichcol[1] + whichcol[2] + whichcol[3]; // 0, 1, 2, 3, or 4
						whichcol[4] = 1; // bump

						spaces = '';
						for(f = 0; f < wcs; f++) {
							spaces += '&nbsp;&nbsp;';
						}

						theDatao += spaces+(devCheck == 1 && DshowH ? '[3]':'')+(G_prefs['showPermalinks'] ? '<span class="pointer hoverShow" onclick="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.'+tmp2+'.'+tmp3+'.'+tmp4+'.'+tmp5+'.0.'+hier+'\');" title="Click to copy permalink to clipboard">☸&nbsp;</span>&nbsp;' :'')+'<a onclick="openPlace(\''+hier+'\',\''+nikaya+'\','+bookno+','+tmp2+','+tmp3+','+tmp4+','+tmp5+',0,null,null,(event.ctrlKey?1:\'\'));"/><font style="color:'+G_prefs[col[wcs]]+'">' + translit(toUni(theData)) + (nikaya == 'm' && hier == 'm' ? '&nbsp;<d class="small">(MN&nbsp;'+getSuttaNumber(nikaya,bookno,tmp2,tmp3,tmp4,tmp5,0,0) + ')' : '') + '</d></font></a>'+namen;
						var transin;
						var transout='';
						if (hier == "m") { 
							transin = addtrans(2,nikaya,bookno,tmp2,tmp3,tmp4,tmp5);
							if (transin) {
								theDatao += transin.join('&nbsp;');  
							}
						}
						theDatao += '<br />';
					}


					u = v[tmp5].getElementsByTagName("h4");
					for (tmp6 = 0; tmp6 < u.length; tmp6++)
					{
						if (u[tmp6].getElementsByTagName("h4n")[0].childNodes[0]) theData = u[tmp6].getElementsByTagName("h4n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+G_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
						if (u.length > 1 && theData == '') { theData = unnamed; }
						if (theData != '') {

							namen = '';
							if (G_prefs['showNames']) {
								// dppn title 'n'
								
								tt = toVel(theData).replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
								if(tt.length > 1) {
									dEI = getDppnEntry(tt);
									if (dEI.length > 0) {
										namen = '<span class="super tiny pointer" style="color:'+G_prefs['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/'+dEI.join(','+toUni(tt)+'\');">&nbsp;n</span><span class="super tiny pointer" style="color:'+G_prefs['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/')+','+toUni(tt)+'\');">&nbsp;n</span>';
									}
								}
							}
											
								

							wcs = whichcol[0] + whichcol[1] + whichcol[2] + whichcol[3] + whichcol[4]; // 0, 1, 2, 3, 4 or 5
							spaces = '';
							for(f = 0; f < wcs; f++) {
								spaces += '&nbsp;&nbsp;';
							}

							theDatao += spaces+(devCheck == 1 && DshowH ? '[4]':'')+(G_prefs['showPermalinks'] ? '<span class="pointer hoverShow" onclick="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.'+tmp2+'.'+tmp3+'.'+tmp4+'.'+tmp5+'.'+tmp6+'.'+hier+'\');" title="Click to copy permalink to clipboard">☸&nbsp;</span>&nbsp;' :'')+'<a onclick="openPlace(\''+hier+'\',\''+nikaya+'\','+bookno+','+tmp2+','+tmp3+','+tmp4+','+tmp5+','+tmp6+',null,null,(event.ctrlKey?1:\'\'));"/><font style="color:'+G_prefs[col[(wcs == 5 ? 0 : wcs)]]+'">' + translit(toUni(theData)) + (/[sa]/.exec(nikaya) && hier == 'm' ? '&nbsp;<d class="small">('+G_nikLongName[nikaya]+'&nbsp;'+getSuttaNumber(nikaya,bookno,tmp2,tmp3,tmp4,tmp5,tmp6) + ')' : '') + '</d></font></a>'+namen;
							var transin;
							var transout='';
							if (hier == "m") { 
								transin = addtrans(1,nikaya,bookno,tmp2,tmp3,tmp4,tmp5,tmp6);
								//if(bookno == 4) document.getElementById('mafbc').innerHTML += theData;
								if (transin) {
									theDatao += transin.join('&nbsp;');  
								}
							}
							theDatao += '<br />';
						}
					}
				}
			}
		}
	}
	var theDataDiv = document.createElement('div');
	theDataDiv.innerHTML = theDatao;
	document.getElementById('mafbc').innerHTML = '';
	document.getElementById('mafbc').appendChild(theDataDiv);  // ---------- return output ----------

	document.getElementById('maf').scrollTop = 0;
}


function gettitles(altget,stop,prev,ssect)
{

	document.activeElement.blur();
	var getsutta = 0; // fix this...
	var newload = 0;
	
	if (altget == 3) getsutta = 4; // only remake section lists
	if (altget == 4) getsutta = 3; // remake section and sutta lists only, not vagga, volume or meta lists
	if (altget == 5) getsutta = 2; // remake section, sutta and vagga lists only, not volume or meta lists
	if (altget == 6) getsutta = 1; // remake all but meta lists
	if (stop == 0) newload = 0; // load xml data
	if (stop == 1) newload = 1; // don't load xml data
	if (stop == 2) newload = 2; // don't load xml data, load index instead
	if (stop == 3) { switchhier(prev); newload = 2 };
	   
	var nikaya = document.form.nik.value;
	var book = document.form.book.value;
	var bookload = 'xml/' + nikaya + book + hier + '.xml';
	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", bookload, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;

	var meta = (getsutta > 0  ? document.form.meta.selectedIndex : 0);
	var volume = (getsutta > 1 ? document.form.volume.selectedIndex : 0);
	var vagga = (getsutta > 2 ? document.form.vagga.selectedIndex : 0);
	var sutta = (getsutta > 3 ? document.form.sutta.selectedIndex : 0);


	var nik = document.form.nik.value;
	var book = document.form.book.value;

	var xml,axml,lista,list,name,namea;
	
	axml = xmlDoc.getElementsByTagName("ha");
	namea = axml[0].getElementsByTagName("han");
	if (namea[0].childNodes[0] && namea[0].textContent.length > 1) name = namea[0].textContent.replace(/\{.*\}/,'').replace(/^  */, '').replace(/  *$/,''); 
	else name = unnamed;
	var outname = translit(shortenTitle(name));
	document.getElementById('title').innerHTML = '<span class="abut obut small" title="click to return to index of '+toUni(name)+'" onclick="this.blur; importXMLindex((event.ctrlKey?1:\'\'));">'+outname+'</span>';
		
	var u = xmlDoc.getElementsByTagName("h0");
	var v = u[meta].getElementsByTagName("h1");
	var w = v[volume].getElementsByTagName("h2");
	var x = w[vagga].getElementsByTagName("h3");
	var y = x[sutta].getElementsByTagName("h4");
	
	if (getsutta == 0) // remake meta list
	{
		lista = makeTitleSelect(u,'h0n');
		if (lista.length == 1 && lista[0] == '>'+ unnamed ) {
			list = '<select size="1" name="meta" class="hide"><option>' + unnamed + '</option></select>';
		}
		else {
			list = '<select size="1" name="meta" onChange="gettitles(6)"><option' + lista.join('</option><option')+'</option></select>';
		}	
		document.getElementById('meta').innerHTML = list;
	}
	
	if (getsutta < 2) // remake volume list
	{
		lista = makeTitleSelect(v,'h1n');
		if (lista.length == 1 && lista[0] == '>'+ unnamed ) {
			list = '<select size="1" name="volume" class="hide"><option>' + unnamed + '</option></select>';
		}
		else {
			list = '<select size="1" name="volume" onChange="gettitles(5)"><option' + lista.join('</option><option')+'</option></select>';
		}	
		document.getElementById('volume').innerHTML = list;
	}
	if (getsutta < 3) // remake vaggalist
	{
		lista = makeTitleSelect(w,'h2n');
		if (lista.length == 1 && lista[0] == '>'+ unnamed ) {
			list = '<select size="1" name="vagga" class="hide"><option>' + unnamed + '</option></select>';
		}
		else {
			list = '<select size="1" name="vagga" onChange="gettitles(4)"><option' + lista.join('</option><option')+'</option></select>';
		}	
		document.getElementById('vagga').innerHTML = list;
	}

	if (getsutta < 4) // remake sutta list on getsutta = 0, 2, or 3
	{
		lista = makeTitleSelect(x,'h3n');
		if (lista.length == 1 && lista[0] == '>'+ unnamed ) {
			list = '<select size="1" name="sutta" class="hide"><option>' + unnamed + '</option></select>';
		}
		else {
			list = '<select size="1" name="sutta" onChange="gettitles(3)"><option' + lista.join('</option><option')+'</option></select>';
		}	
		document.getElementById('sutta').innerHTML = list;
	}
	lista = makeTitleSelect(y,'h4n');
	if (lista.length == 1 && lista[0] == '>'+ unnamed ) {
		list = '<select size="1" name="section" class="hide"><option>' + unnamed + '</option></select>';
	}
	else {
		list = '<select size="1" name="section" onChange="importXML()"><option' + lista.join('</option><option')+'</option></select>';
	}	
	document.getElementById('section').innerHTML = list;

	if (prev) document.form.section.selectedIndex = y.length - 1;
	if (ssect && ssect > 0) document.form.section.selectedIndex = searchsect;
	if (newload == 0) importXML();
	else if (newload == 2) importXMLindex();
	getsutta = 0;
}



function importXMLraw()
{
	document.activeElement.blur();
	if (hier == 't' && limitt()) { 
		alertFlash('Ṭīkā not available for ' + G_nikLongName[document.form.nik.value]+'.','RGBa(255,0,0,0.8)');
		return; 
	}
	document.getElementById('mafbc').innerHTML = '';
	document.getElementById('mafbc').appendChild(pleasewait);

	var nikaya = document.form.nik.value;
	var book = document.form.book.value;
	var bookload = 'xml/' + nikaya + book + hier + '.xml';
	//alert(bookload);

	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", bookload, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;

	var book = document.form.book.value;
	
	var meta = document.form.meta.selectedIndex;
	var volume = document.form.volume.selectedIndex;
	var vagga = document.form.vagga.selectedIndex;
	var sutta = document.form.sutta.selectedIndex;
	var section = document.form.section.selectedIndex;
	var u = xmlDoc.getElementsByTagName("h0");
	var v = u[meta].getElementsByTagName("h1");
	var w = v[volume].getElementsByTagName("h2");
	var x = w[vagga].getElementsByTagName("h3");
	var y = x[sutta].getElementsByTagName("h4");
	var z = y[section].getElementsByTagName("p");

	//titles

	var nikaya = document.form.nik.value;
	var vn = u[meta].getElementsByTagName("h0n");
	var wn = v[volume].getElementsByTagName("h1n");
	var xn = w[vagga].getElementsByTagName("h2n");
	var yn = x[sutta].getElementsByTagName("h3n");
	var zn = y[section].getElementsByTagName("h4n");
	var vna = vn[0].textContent;
	var wna = wn[0].textContent;
	var xna = xn[0].textContent;
	var yna = yn[0].textContent;
	var zna = zn[0].textContent;

	var titleout = convtitle(nikaya,book,vna,wna,xna,yna,zna,hier);
	
	document.getElementById('mafbc').innerHTML = titleout;

	var theData = "";
	


	for (tmp = 0; tmp < z.length; tmp++)
	{
		theData = z[tmp].textContent;
		theData = theData.replace(/\^b\^/g, ' <b> ');
		theData = theData.replace(/\^eb\^/g, ' </b> ');
		theData = theData.replace(/\^a\^/g, '<!--');
		theData = theData.replace(/\^ea\^/g, '-->');
		document.getElementById('mafbc').innerHTML += '<p>' + theData + '</p>';  // ---------- return output ----------
	}

	document.getElementById('maf').scrollTop = 0; // horizontal and vertical scroll targets

}


function xmlrefget()
{
	var mark = document.form.selref.value;

	var bookload = 'marks/' + mark + '.xml';
	xmlDoc.async = false;
	xmlDoc.load(bookload);

	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", bookload, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;

	var precode = xmlDoc.getElementsByTagName("xml"); 	
	var lumpcode = precode[0].textContent;
	var codea = lumpcode.split(',');
	var nik = codea[0];
	var book = codea[1];
	var sutta = codea[2];
	var sect = codea[3];
	document.form.nik.selectedIndex = nik
	changenikaya(1);
	document.form.book.selectedIndex = book;
	if (document.form.nik.value == 'k') kudpreXML(1);
	else gettitles(0,1);
	document.form.sutta.selectedIndex = sutta;
	gettitles(1,1);
	document.form.section.selectedIndex = sect;
	importXML();
}

var setplace = new Array();

function getplace(temp) { // standard function to get a place from an array 0=nik,1=book,2=meta,3=vol,4=vagga,5=sutta,6=section (all sIndex),7=hier(mat) 
	document.activeElement.blur();
	setplace = temp;

	// for changing mat buttons

	if (matButton == 1) { // mat button pushed (in section)
		var matButtonCount = document.getElementById('matButtonCount').value; // number of times in a row we've pushed the button, if first time, we clear the old values.
		if (matButtonCount > 0 && matValue[setplace[7]] != '') {
			setplace = matValue[setplace[7]].split('^').concat(setplace[7]);
			setplace[0] = G_nikToNumber[setplace[0]];
		}
		else {
			matValue['m'] == '';
			matValue['a'] == '';
			matValue['t'] == '';
		}
		matValue[hier] = document.form.nik.value+'^'+document.form.book.selectedIndex+'^'+document.form.meta.selectedIndex+'^'+document.form.volume.selectedIndex+'^'+document.form.vagga.selectedIndex+'^'+document.form.sutta.selectedIndex+'^'+document.form.section.selectedIndex;
	}
	else { // clear stored values
		matValue['m'] == '';
		matValue['a'] == '';
		matValue['t'] == '';
	}
	
	switchhier(setplace[7],1);

	var sp0 = setplace[0];
	var nikaya = document.form.nik[sp0].value;
	document.form.nik.selectedIndex = sp0;

	var nik = document.form.nik.value;
	var booknumber = setplace[1]; 
	
	setBookList(nik); 
        	
	document.form.book.selectedIndex = booknumber;

	var book = document.form.book.value;

	var bookload = 'xml/' + nikaya + book + hier + '.xml';

	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", bookload, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;

	var uname = new Array();
	var vname = new Array();
	var xname = new Array();
	var yname = new Array();

	var unamea = 0;
	var vnamea = 0;
	var xnamea = 0;
	var ynamea = 0;
	
	var meta = setplace[2];
	var volume = setplace[3];
	var vagga = setplace[4];
	var sutta = setplace[5];	
	var section = setplace[6];	

	var metalist = '';
	var volumelist = '';
	var vaggalist = '';
	var suttalist = '';
	var sectionlist = '';

	var t = xmlDoc.getElementsByTagName("ha");
	var tname = t[0].getElementsByTagName("han");
	if (tname[0].childNodes[0] && tname[0].textContent.length > 1) var tnamea = tname[0].textContent.replace(/\{.*\}/,'').replace(/^  */, '').replace(/  *$/,''); else tnamea = unnamed;
	var countt = tnamea;

	var titlen = toUni(tnamea);

	tnamea = translit(shortenTitle(tnamea));
	document.getElementById('title').innerHTML = '<span class="abut obut small" title="click to return to index of '+titlen+'" onclick="this.blur; importXMLindex((event.ctrlKey?1:\'\'));">'+tnamea+'</span>';
		
	var u = xmlDoc.getElementsByTagName("h0");
	var v = u[meta].getElementsByTagName("h1");
	var w = v[volume].getElementsByTagName("h2");
	var x = w[vagga].getElementsByTagName("h3");
	var y = x[sutta].getElementsByTagName("h4");
	
	var lista = [];
	var list = '';
	
	// meta

	lista = makeTitleSelect(u,'h0n');
	if (lista.length == 1 && lista[0] == '>'+ unnamed ) {
		list = '<select size="1" name="meta" class="hide"><option>' + unnamed + '</option></select>';
	}
	else {
		list = '<select size="1" name="meta" onChange="gettitles(6)">';
		for (a in lista) {
			list += '<option'+(a == meta ? ' selected' : '') + lista[a]+'</option>';
		}
		list += '</select>';
	}	
	document.getElementById('meta').innerHTML = list;

	// volume

	lista = makeTitleSelect(v,'h1n');
	if (lista.length == 1 && lista[0] == '>'+ unnamed ) {
		list = '<select size="1" name="volume" class="hide"><option>' + unnamed + '</option></select>';
	}
	else {
		list = '<select size="1" name="volume" onChange="gettitles(5)">';
		for (a in lista) {
			list += '<option'+(a == volume ? ' selected' : '') + lista[a]+'</option>';
		}
		list += '</select>';
	}	
	document.getElementById('volume').innerHTML = list;

	// vagga

	lista = makeTitleSelect(w,'h2n');
	if (lista.length == 1 && lista[0] == '>'+ unnamed ) {
		list = '<select size="1" name="vagga" class="hide"><option>' + unnamed + '</option></select>';
	}
	else {
		list = '<select size="1" name="vagga" onChange="gettitles(4)">';
		for (a in lista) {
			list += '<option'+(a == vagga ? ' selected' : '') + lista[a]+'</option>';
		}
		list += '</select>';
	}	
	document.getElementById('vagga').innerHTML = list;

	// sutta

	lista = makeTitleSelect(x,'h3n');
	if (lista.length == 1 && lista[0] == '>'+ unnamed ) {
		list = '<select size="1" name="sutta" class="hide"><option>' + unnamed + '</option></select>';
	}
	else {
		list = '<select size="1" name="sutta" onChange="gettitles(3)">';
		for (a in lista) {
			list += '<option'+(a == sutta ? ' selected' : '') + lista[a]+'</option>';
		}
		list += '</select>';
	}	
	document.getElementById('sutta').innerHTML = list;

	// section

	lista = makeTitleSelect(y,'h4n');
	if (lista.length == 1 && lista[0] == '>'+ unnamed ) {
		list = '<select size="1" name="section" class="hide"><option>' + unnamed + '</option></select>';
	}
	else {
		list = '<select size="1" name="section" onChange="importXML()">';
		for (a in lista) {
			list += '<option'+(a == section ? ' selected' : '') + lista[a]+'</option>';
		}
		list += '</select>';
	}	
	document.getElementById('section').innerHTML = list;
       
	setplace = new Array();
	setplace.length = 0;
}


function helpXML(file)
{
	moveframex(1);
	if (!file) file = 'help.xml';
	
	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", file, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;

	var outputit = '';
	document.getElementById('mafbc').setAttribute('align','justify');
	document.getElementById('mafbc').innerHTML = '';
	var data = xmlDoc.getElementsByTagName('data')
	for (ippp in data) {
		if(data[ippp].childNodes) outputit += data[ippp].textContent.replace(/\[/g,'<').replace(/\]/g,'>');
	}		
	document.getElementById('mafbc').innerHTML = outputit;
	document.getElementById('mafbc').innerHTML += '<hr/><div><i>DPR version number: <b>'+version+'</b></i></div>';
    document.getElementById('maf').scrollTop = 0;
}

