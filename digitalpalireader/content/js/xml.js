var unnamed = '[unnamed]';

var matButton = 0; // tells us we've clicked an in-section mat button.
var matValue = []; // for storing values from section after clicking mat button in section
matValue['m'] = '';
matValue['a'] = '';
matValue['t'] = '';


function loadXMLSection(query,para,place,isPL,scroll)
{ 
	
	document.getElementById('mafbc').innerHTML = '';
	document.getElementById('mafbc').appendChild(pleasewait);

	var nikaya = place[0];
	place[1]= parseInt(place[1]);
	place[2]= parseInt(place[2]);
	place[3]= parseInt(place[3]);
	place[4]= parseInt(place[4]);
	place[5]= parseInt(place[5]);
	place[6]= parseInt(place[6]);

	var hier=place[7];
	
	var bookno = place[1];
	var book = place[1]+1;
	var meta = place[2];
	var volume = place[3];
	var vagga = place[4];
	var sutta = place[5];
	var section = place[6]
	var nikbookhier = nikaya + book + hier;
	
    var xmlDoc = loadXMLFile(nikbookhier,place[8]?place[8]:0);
	
	if(xmlDoc == null) return refreshit();
	
	var t = xmlDoc.getElementsByTagName("ha");
	var u = t[0].getElementsByTagName("h0");
	var v = u[meta].getElementsByTagName("h1");
	var w = v[volume].getElementsByTagName("h2");
	var x = w[vagga].getElementsByTagName("h3");
	var y = x[sutta].getElementsByTagName("h4");
	var z = y[section].getElementsByTagName("p");

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
	var relouta = [];
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
					relouta.push('<span class="abut obut small" onclick="matButton = 1; openPlace([\''+relherea[0]+"',"+relherea[1]+","+relherea[2]+","+relherea[3]+","+relherea[4]+","+relherea[5]+","+relherea[6]+',\''+hi[ht] + '\'],null,null,(event.ctrlKey||event.button==1?1:null));" title="Relative section in '+G_hTitles[ht]+'">'+hi[ht]+'</span>');
					matButton = 0;

				}
				hic++;
			}
			break;
		}
	}
	
	relout += relouta.join(' ');
	
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
			prev = [nikaya,bookno,meta,volume,vagga,sutta,section-1,hier];
		break;
		case (sutta > 0):
			prev = [nikaya,bookno,meta,volume,vagga,sutta-1,ym.length-1,hier];
		break;
		case (vagga > 0):
			prev = [nikaya,bookno,meta,volume,vagga-1,xm.length-1,ym.length-1,hier];
		break;
		case (volume > 0):
			prev = [nikaya,bookno,meta,volume-1,wm.length-1,xm.length-1,ym.length-1,hier];
		break;
		case (meta > 0):
			prev = [nikaya,bookno,meta-1,vm.length-1,wm.length-1,xm.length-1,ym.length-1,hier];
		break;
	}
	
	switch(true) {
		case (section < y.length-1):
			next = [nikaya,bookno,meta,volume,vagga,sutta,section+1,hier];
		break;
		case (sutta < x.length-1):
			next = [nikaya,bookno,meta,volume,vagga,sutta+1,0,hier];
		break;
		case (vagga < w.length-1):
			next = [nikaya,bookno,meta,volume,vagga+1,0,0,hier];
		break;
		case (volume < v.length-1):
			next = [nikaya,bookno,meta,volume+1,0,0,0,hier];
		break;
		case (meta < u.length-1):
			next = [nikaya,bookno,meta+1,0,0,0,0,hier];
		break;
	}
	
	var nextprev = (prev ? '<span id="pSect" class="lbut abut small" onclick="openPlace([\''+prev.join("\',\'")+'\''+(place[8]?',1':'')+']);">«</span>':'<span class="lbut abut small">&nbsp;</span>') + (next ? '<span id="nSect" class="rbut abut small" onclick="openPlace([\''+next.join("\',\'")+'\''+(place[8]?',1':'')+']);">»</span>':'<span class="rbut abut small">&nbsp;</span>');

	var hierb = hier;
	
	// add to history

	if (zna.length > 1) { var bknameme = zna }
	else if (yna.length > 1) { var bknameme  = yna }
	else if (xna.length > 1) { var bknameme  = xna }
	else if (wna.length > 1) { var bknameme  = wna }
	else if (vna.length > 1) { var bknameme  = vna }
	else bknameme = '';
	
	bknameme = bknameme.replace(/^ +/, '').replace(/ +$/, '');

	addHistory(G_nikLongName[nikaya]+(hierb!='m'?'-'+hierb:'')+' '+book+' - '+bknameme+"@"+nikaya+','+bookno+','+meta+','+volume+','+vagga+','+sutta+','+section+','+hierb);

	// refresh history box

	var sidebar = DPRSidebarWindow();

	if (sidebar) {
		sidebar.DPRNav.historyBox();
	} 

	// tab title

	var tabT = 'Pali: ' + G_nikLongName[nikaya] +  (modno ? modno : (hierb !='m' ? '-'+hierb:'') + ' ' + (bookno+1)) + ' - ' + bknameme  + '';
	setCurrentTitle(tabT);
	
	
	
	// permalink
	
	var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+bookno+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hier;
	
	if(!isPL) { //not coming from a permalink

		try {

			// update loc

			var oldurl = mainWindow.gBrowser.selectedTab.linkedBrowser.contentDocument.location.href;
			if(/loc=/.exec(oldurl)) var newurl = oldurl.replace(/loc=[^&]+/,'loc='+nikaya+'.'+bookno+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hier);
			else if(/\?./.exec(oldurl)) var newurl = oldurl + '&loc='+nikaya+'.'+bookno+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hier;
			else var newurl = oldurl + '?loc='+nikaya+'.'+bookno+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hier;

			// update query
			
			if(query) {
				if(/query=/.exec(newurl)) newurl = newurl.replace(/query=[^&]+/,'query='+toVel(query.join('+')).replace(/ /g, '_'));
				else var newurl = newurl + '&query='+toVel(query.join('+')).replace(/ /g, '_');
			}
			else newurl = newurl.replace(/\&query=[^&]+/,'');

			// update para

			if(para) {
				if(/para=/.exec(newurl)) newurl = newurl.replace(/para=[^&]+/,'para='+para);
				else var newurl = newurl + '&para='+para;
			}
			else newurl = newurl.replace(/\&para=[^&]+/,'');
			
			// update scroll

			if(scroll) {
				if(/scroll=/.exec(newurl)) newurl = newurl.replace(/scroll=[^&]+/,'scroll='+scroll);
				else var newurl = newurl + '&scroll='+scroll;
			}
			else newurl = newurl.replace(/\&scroll=[^&]+/,'');
			// update alt

			if(place[8]) {
				if(/alt=/.exec(newurl)) newurl = newurl.replace(/alt=[^&]+/,'alt=1');
				else var newurl = newurl + '&alt=1';
			}
			else newurl = newurl.replace(/\&alt=[^&]+/,'');

			mainWindow.gBrowser.selectedTab.linkedBrowser.contentWindow.history.replaceState('Object', 'Title', newurl);
		}
		catch(ex) {
		}

	}
	

	// "modern" reference
	var modt = '';
	var modn;
	if(hier == 'm') {
		var modno = getSuttaNumber(nikaya,bookno,meta,volume,vagga,sutta,section,hier,y.length);	
		var modt = 	(modno ? ' (<b class="small" style="color:'+DPR_prefs['colsel']+'">' + G_nikLongName[nikaya] + (hier == 'm' ? '' : '-'+hier) + '&nbsp;' + modno + '</b>)' : '');
	}

	// bookmark button
	
	var bkbut = '<span id="bkButton" class="abut obut small" onmousedown="bookmarkSavePrompt(\''+nikaya+'#'+bookno+'#'+meta+'#'+volume+'#'+vagga+'#'+sutta+'#'+section+'#'+hier+'\',\''+bknameme+'\',window.getSelection().toString())">☆</span>';

	var thaibut = '';
	/*
	// Thai alt button
	thaibut = (place[8]?' <span id="thaiButton" class="abut obut small" onmouseup="openPlace([\''+nikaya+'\','+bookno+','+meta+','+volume+','+vagga+','+sutta+','+section+',\''+hier+'\'],null,null,(event.ctrlKey||event.button==1?1:\'\'))">VRI</span>':(intFileExists('content/xml/'+nikbookhier+'.t.xml')? ' <span id="thaiButton" class="abut obut small" onmouseup="openPlace([\''+nikaya+'\','+bookno+','+meta+','+volume+','+vagga+','+sutta+','+section+',\''+hier+'\',1],null,null,(event.ctrlKey||event.button==1?1:\'\'))">Thai</span>':''));
	*/

	// output toolbar data

	document.getElementById('auxToolbar').innerHTML = '<table><tr><td>'+nextprev+ ' ' +relout + ' ' + bkbut + thaibut + '</td><td id="maftrans" align="right"></td></tr><table>'
	

	// output header
	
	var titleout = convtitle(nikaya,book,una,vna,wna,xna,yna,zna,hier);

	document.getElementById('mafbc').innerHTML = '<table width=100%><tr><td align=left></td><td align=center>'+titleout+modt+(DPR_prefs['showPermalinks'] ? ' <span class="pointer hoverShow" onclick="permalinkClick(\''+permalink+(query ? '&query=' + toVel(query.join('+')).replace(/ /g, '_') : '')+'\',1);" title="Click to copy permalink to clipboard">☸&nbsp;</span>' :'')+'</td></tr></table>';
		

	var theData = '';
	
	// check if there is a search going on and add the labels
	if (query) {
		atlabel:
		for (tmp = 0; tmp < z.length; tmp++)
		{

			var quit = 0;
			var onepar = z[tmp].textContent.replace(/^ *\[[0-9]+\] */,'').replace(/  +/g, ' ').toLowerCase();
			var onepars = onepar.replace(/ *\{[^}]*\} */g, ' ').replace(/\^a\^[^^]*\^ea\^/g, '').replace(/\^e*b\^/g, '').replace(/  +/g, ' ').toLowerCase();
			for (tmpl = 0; tmpl < query.length; tmpl++)
			{
				var obj = (typeof(query[tmpl]) == 'object');
				if ((obj ? onepars.search(query[tmpl]) : onepars.indexOf(query[tmpl])) == -1) { // at least one of the strings was not found -> no match
					theData += ' <p'+permalink+'&para='+(tmp+1)+'> ' + onepar;
					//alert(theData);
					continue atlabel;
				}
			}
			theData += ' <p'+permalink+'&query=' + toVel(query.join('+')).replace(/ /g, '_')+'&para='+(tmp+1)+'> ';
			var tmpdata = onepar;
			for (var i = 0; i < query.length; i++)
			{
				var obj = (typeof(query[i]) == 'object');
				var lt = query[i];
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
		if(place[8]) { // thai
			for (tmp = 0; tmp < z.length; tmp++){
				if(/^-- \^a\^Thai [0-9.]+\^ea\^ --$/.exec(z[tmp].textContent) && !DPR_prefs['showPages']) {
					continue;
				}
				theData += ' <p> ' + z[tmp].textContent.replace(/^#[0-9]+#/,'').replace(/  +/g, ' ');
			}
		}
		else {
			for (tmp = 0; tmp < z.length; tmp++) {
				theData += ' <p'+permalink+'&para='+(tmp+1)+'> ' + z[tmp].textContent.replace(/^ *\[[0-9]+\] */,'').replace(/  +/g, ' ');
			}
		}
	}
	outputFormattedData(theData,0,place);
	//document.textpad.pad.value=theData;
	if(para) { 
        document.getElementById('maf').scrollTop = document.getElementById('para'+para).offsetTop;
	}
	else if(scroll) {
		document.getElementById('maf').scrollTop = scroll;
	}
}

function loadXMLindex(place) {
	
	var DshowH = false; // dev tool
	DshowH = true; // dev tool
	
	document.activeElement.blur();
	
	if (place[2] == 't' && limitt()) { 
		alertFlash('Ṭīkā not available for ' + G_nikLongName[document.getElementById('set').value]+'.','RGBa(255,0,0,0.8)');
		return; 
	}	
	
	var hier = place[2];
	
	document.getElementById('mafbc').innerHTML = '';
	document.getElementById('mafbc').appendChild(pleasewait);

	var nikaya = place[0];
	var bookno = parseInt(place[1]);
	var book = bookno+1;
	var nikbookhier = nikaya + book + hier;

    var xmlDoc = loadXMLFile(nikbookhier,0);

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

	var permalink = 'chrome://digitalpalireader/content/index.xul?';
	
	try {
		mainWindow.gBrowser.selectedTab.linkedBrowser.contentWindow.history.replaceState('Object', 'Title', permalink+'loc='+nikaya+'.'+bookno+'.'+hier);
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
		theData = z[tmp].getElementsByTagName("han")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); 

	}
	else theData = '';
	if (z.length > 1 && theData == '') { theData = unnamed; } 
	if (theData != '') {
		
		namen = '';
		if (DPR_prefs['showNames']) {
			// dppn title 'n'

			tt = toVel(theData).replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
			if(tt.length > 1) {
				dEI = getDppnEntry(tt);
				if (dEI.length > 0) {
					namen = '<span class="super tiny pointer" style="color:'+DPR_prefs['coldppn']+'" title="DPPN entry" onmouseup="DPPNXML(\''+toUni(tt)+'/'+dEI.join(','+toUni(tt)+'\');">&nbsp;n</span><span class="super tiny pointer" style="color:'+DPR_prefs['coldppn']+'" title="DPPN entry" onmouseup="DPPNXML(\''+toUni(tt)+'/')+','+toUni(tt)+'\');">&nbsp;n</span>';
				}
			}
		}
		
		whichcol[0] = 1; // bump up to let the second color know

		theDatao += (devCheck == 1 && DshowH ? '[a]':'')+(DPR_prefs['showPermalinks'] ? '<span class="pointer hoverShow" onmouseup="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.0.0.0.0.0.'+hier+'\');" title="Click to copy permalink to clipboard">☸&nbsp;</span>&nbsp;' :'')+'<a onmouseup="openPlace([\''+nikaya+'\','+bookno+',0,0,0,0,0,\''+hier+'\'],null,null,(event.ctrlKey||event.button==1?1:\'\'));"/><font style="color:'+DPR_prefs[col[wcs]]+'"><b>' + translit(toUni(theData)) + '</b></font></a>'+namen+'<br />';
	}
	y = z[tmp].getElementsByTagName("h0");
	for (tmp2 = 0; tmp2 < y.length; tmp2++)
	{
		if (y[tmp2].getElementsByTagName("h0n")[0].childNodes[0]) theData = y[tmp2].getElementsByTagName("h0n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
		if (y.length > 1 && theData == '') { theData = unnamed; }
		if (theData != '') {

			namen = '';
			if (DPR_prefs['showNames']) {

				// dppn title 'n'
				
				tt = toVel(theData).replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
				if(tt.length > 1) {
					dEI = getDppnEntry(tt);
					if (dEI.length > 0) {
						namen = '<span class="super tiny pointer" style="color:'+DPR_prefs['coldppn']+'" title="DPPN entry" onmouseup="DPPNXML(\''+toUni(tt)+'/'+dEI.join(','+toUni(tt)+'\');">&nbsp;n</span><span class="super tiny pointer" style="color:'+DPR_prefs['coldppn']+'" title="DPPN entry" onmouseup="DPPNXML(\''+toUni(tt)+'/')+','+toUni(tt)+'\');">&nbsp;n</span>';
					}
				}
			}
							
			wcs = whichcol[0]; // either 0 or 1
			whichcol[1] = 1; // bump up for the next color, if no data, this will still be 0, next color will get 0
			var spaces = '';
			for(f = 0; f < wcs; f++) {
				spaces += '&nbsp;&nbsp;';
			}
			
			theDatao += spaces+(devCheck == 1 && DshowH ? '[0]':'')+(DPR_prefs['showPermalinks'] ? '<span class="pointer hoverShow" onmouseup="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.'+tmp2+'.0.0.0.0.'+hier+'\');" title="Click to copy permalink to clipboard">☸&nbsp;</span>&nbsp;' :'')+'<a onmouseup="openPlace([\''+nikaya+'\','+bookno+','+tmp2+',0,0,0,0,\''+hier+'\'],null,null,(event.ctrlKey||event.button==1?1:\'\'));"/><font style="color:'+DPR_prefs[col[wcs]]+'">' + translit(toUni(theData)) + '</font></a>'+namen;

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
			if (x[tmp3].getElementsByTagName("h1n")[0].childNodes[0]) theData = x[tmp3].getElementsByTagName("h1n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
			if (x.length > 1 && theData == '') { theData = unnamed; }
			if (theData != '') {

				namen = '';
				if (DPR_prefs['showNames']) {

					// dppn title 'n'
					
					tt = toVel(theData).replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
					if(tt.length > 1) {
						dEI = getDppnEntry(tt);
						if (dEI.length > 0) {
							namen = '<span class="super tiny pointer" style="color:'+DPR_prefs['coldppn']+'" title="DPPN entry" onmouseup="DPPNXML(\''+toUni(tt)+'/'+dEI.join(','+toUni(tt)+'\');">&nbsp;n</span><span class="super tiny pointer" style="color:'+DPR_prefs['coldppn']+'" title="DPPN entry" onmouseup="DPPNXML(\''+toUni(tt)+'/')+','+toUni(tt)+'\');">&nbsp;n</span>';
						}
					}
				}					
					
				wcs = whichcol[0] + whichcol[1]; // 0, 1 or 2 - if 0,1 are still 0, this will get 0
				whichcol[2] = 1; // bump up for the next color, if no data, this will still be -1, next color will get 0
			
				spaces = '';
				for(f = 0; f < wcs; f++) {
					spaces += '&nbsp;&nbsp;';
				}

				theDatao += spaces+(devCheck == 1 && DshowH ? '[1]':'')+(DPR_prefs['showPermalinks'] ? '<span class="pointer hoverShow" onmouseup="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.'+tmp2+'.'+tmp3+'.0.0.0.'+hier+'\');" title="Click to copy permalink to clipboard">☸&nbsp;</span>&nbsp;' :'')+'<a onmouseup="openPlace([\''+nikaya+'\','+bookno+','+tmp2+','+tmp3+',0,0,0,\''+hier+'\'],null,null,(event.ctrlKey||event.button==1?1:\'\'));"/><font style="color:'+DPR_prefs[col[wcs]]+'">' + translit(toUni(theData)) + '</font></a>'+namen;

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
				if (w[tmp4].getElementsByTagName("h2n")[0].childNodes[0]) theData = w[tmp4].getElementsByTagName("h2n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
				if (w.length > 1 && theData == '') { theData = unnamed; }
				if (theData != '') {


					namen = '';
					if (DPR_prefs['showNames']) {
						// dppn title 'n'
						
						tt = toVel(theData).replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
						if(tt.length > 1) {
							dEI = getDppnEntry(tt);
							if (dEI.length > 0) {
								namen = '<span class="super tiny pointer" style="color:'+DPR_prefs['coldppn']+'" title="DPPN entry" onmouseup="DPPNXML(\''+toUni(tt)+'/'+dEI.join(','+toUni(tt)+'\');">&nbsp;n</span><span class="super tiny pointer" style="color:'+DPR_prefs['coldppn']+'" title="DPPN entry" onmouseup="DPPNXML(\''+toUni(tt)+'/')+','+toUni(tt)+'\');">&nbsp;n</span>';
							}
						}
					}
									
						
						
					wcs = whichcol[0] + whichcol[1] + whichcol[2]; // 0, 1, 2, or 3
					whichcol[3] = 1; // bump
					
					spaces = '';
					for(f = 0; f < wcs; f++) {
						spaces += '&nbsp;&nbsp;';
					}

					theDatao += spaces+(devCheck == 1 && DshowH ? '[2]':'')+(DPR_prefs['showPermalinks'] ? '<span class="pointer hoverShow" onmouseup="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.'+tmp2+'.'+tmp3+'.'+tmp4+'.0.0.'+hier+'\');" title="Click to copy permalink to clipboard">☸&nbsp;</span>&nbsp;' :'')+'<a onmouseup="openPlace([\''+nikaya+'\','+bookno+','+tmp2+','+tmp3+','+tmp4+',0,0,\''+hier+'\'],null,null,(event.ctrlKey||event.button==1?1:\'\'));"/><font style="color:'+DPR_prefs[col[wcs]]+'">' + translit(toUni(theData))+(nikaya == 'd' && hier == 'm' ? '&nbsp;<d class="small">(DN&nbsp;'+getSuttaNumber(nikaya,bookno,tmp2,tmp3,tmp4,0,0,hier,0) + ')' : '') + '</d></font></a>'+namen;
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
					if (v[tmp5].getElementsByTagName("h3n")[0].childNodes[0]) theData = v[tmp5].getElementsByTagName("h3n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
					if (v.length > 1 && theData == '') { theData = unnamed; }
					if (theData != '') {

						namen = '';
						if (DPR_prefs['showNames']) {
							// dppn title 'n'
							
							tt = toVel(theData).replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
							if(tt.length > 1) {
								dEI = getDppnEntry(tt);
								if (dEI.length > 0) {
									namen = '<span class="super tiny pointer" style="color:'+DPR_prefs['coldppn']+'" title="DPPN entry" onmouseup="DPPNXML(\''+toUni(tt)+'/'+dEI.join(','+toUni(tt)+'\');">&nbsp;n</span><span class="super tiny pointer" style="color:'+DPR_prefs['coldppn']+'" title="DPPN entry" onmouseup="DPPNXML(\''+toUni(tt)+'/')+','+toUni(tt)+'\');">&nbsp;n</span>';
								}
							}
						}			
							

						wcs = whichcol[0] + whichcol[1] + whichcol[2] + whichcol[3]; // 0, 1, 2, 3, or 4
						whichcol[4] = 1; // bump

						spaces = '';
						for(f = 0; f < wcs; f++) {
							spaces += '&nbsp;&nbsp;';
						}

						theDatao += spaces+(devCheck == 1 && DshowH ? '[3]':'')+(DPR_prefs['showPermalinks'] ? '<span class="pointer hoverShow" onmouseup="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.'+tmp2+'.'+tmp3+'.'+tmp4+'.'+tmp5+'.0.'+hier+'\');" title="Click to copy permalink to clipboard">☸&nbsp;</span>&nbsp;' :'')+'<a onmouseup="openPlace([\''+nikaya+'\','+bookno+','+tmp2+','+tmp3+','+tmp4+','+tmp5+',0,\''+hier+'\'],null,null,(event.ctrlKey||event.button==1?1:\'\'));"/><font style="color:'+DPR_prefs[col[wcs]]+'">' + translit(toUni(theData)) + (nikaya == 'm' && hier == 'm' ? '&nbsp;<d class="small">(MN&nbsp;'+getSuttaNumber(nikaya,bookno,tmp2,tmp3,tmp4,tmp5,0,hier,0) + ')' : '') + '</d></font></a>'+namen;
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
						if (u[tmp6].getElementsByTagName("h4n")[0].childNodes[0]) theData = u[tmp6].getElementsByTagName("h4n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
						if (u.length > 1 && theData == '') { theData = unnamed; }
						if (theData != '') {

							namen = '';
							if (DPR_prefs['showNames']) {
								// dppn title 'n'
								
								tt = toVel(theData).replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
								if(tt.length > 1) {
									dEI = getDppnEntry(tt);
									if (dEI.length > 0) {
										namen = '<span class="super tiny pointer" style="color:'+DPR_prefs['coldppn']+'" title="DPPN entry" onmouseup="DPPNXML(\''+toUni(tt)+'/'+dEI.join(','+toUni(tt)+'\');">&nbsp;n</span><span class="super tiny pointer" style="color:'+DPR_prefs['coldppn']+'" title="DPPN entry" onmouseup="DPPNXML(\''+toUni(tt)+'/')+','+toUni(tt)+'\');">&nbsp;n</span>';
									}
								}
							}
											
								

							wcs = whichcol[0] + whichcol[1] + whichcol[2] + whichcol[3] + whichcol[4]; // 0, 1, 2, 3, 4 or 5
							spaces = '';
							for(f = 0; f < wcs; f++) {
								spaces += '&nbsp;&nbsp;';
							}

							theDatao += spaces+(devCheck == 1 && DshowH ? '[4]':'')+(DPR_prefs['showPermalinks'] ? '<span class="pointer hoverShow" onmouseup="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.'+tmp2+'.'+tmp3+'.'+tmp4+'.'+tmp5+'.'+tmp6+'.'+hier+'\');" title="Click to copy permalink to clipboard">☸&nbsp;</span>&nbsp;' :'')+'<a onmouseup="openPlace([\''+nikaya+'\','+bookno+','+tmp2+','+tmp3+','+tmp4+','+tmp5+','+tmp6+',\''+hier+'\'],null,null,(event.ctrlKey||event.button==1?1:\'\'));"/><font style="color:'+DPR_prefs[col[(wcs == 5 ? 0 : wcs)]]+'">' + translit(toUni(theData)) + (/[sa]/.exec(nikaya) && hier == 'm' ? '&nbsp;<d class="small">('+G_nikLongName[nikaya]+'&nbsp;'+getSuttaNumber(nikaya,bookno,tmp2,tmp3,tmp4,tmp5,tmp6,hier,u.length) + ')' : '') + '</d></font></a>'+namen;
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

