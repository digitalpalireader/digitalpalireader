
var unnamed = '[unnamed]';

var hier = 'm'; // m = mula, a = atthakatha, t = tika

var matButton = 0; // tells us we've clicked an in-section mat button.
var matValue = []; // for storing values from section after clicking mat button in section
matValue['m'] = '';
matValue['a'] = '';
matValue['t'] = '';

function importXML(labelsearch,para)
{
	if (hier == 't' && limitt()) { 
		alertFlash('Ṭīkā not available for ' + nikname[document.form.nik.value]+'.','RGBa(255,0,0,0.8)');
		return; 
	}
	if (hier == 'a' && document.form.nik.value == 'g') {
		alertFlash('Atthakatha not available for grammar.','RGBa(255,0,0,0.8)');
		return;
	}		
	if (hier == 'a' && document.form.nik.value == 'b') {
		alertFlash('Atthakatha not available for Abhidh-s.','RGBa(255,0,0,0.8)');
		return;
	}		

	clearDivs('maf');
	document.activeElement.blur();

	moves(0); // close search
	

	document.getElementById('mafbc').appendChild(pleasewait);

	var nikaya = document.form.nik.value;
	var book = document.form.book.value;
	var bookload = 'xml/' + nikaya + book + hier + '.xml';

	document.getElementById('manrem').value = 0;

	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", bookload, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;


	var bookno = document.form.book.selectedIndex;
	var meta = document.form.meta.selectedIndex;
	var volume = document.form.volume.selectedIndex;
	var vagga = document.form.vagga.selectedIndex;
	var sutta = document.form.sutta.selectedIndex;
	var section = document.form.section.selectedIndex;	

	
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
					relout+='<span class="abut obut small" onclick="matButton = 1; getplace(['+niknumber[relherea[0]]+","+relherea[1]+","+relherea[2]+","+relherea[3]+","+relherea[4]+","+relherea[5]+","+relherea[6]+",'"+hi[ht]+'\']);importXML()" title="Relative section in '+hTitle[ht]+'">'+hi[ht]+'</span> ';
					matButton = 0;

				}
				hic++;
			}
			break;
		}
	}
	relout = relout.slice(0,-1);
	
	// permalink
	
	var permalink = 'chrome://digitalpalireader/content/index.htm' + '?loc='+nikaya+'.'+bookno+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hier+(labelsearch ? '&query=' + labelsearch.join('+').replace(/ /g, '_') : '');
	
	try {
		window.history.replaceState('Object', 'Title', permalink+(para ? '&para=' + (para+1) : ''));
	}
	catch(ex) {
	}
	
	// titles
	
	var nikaya = document.form.nik.value;
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
	if(hier == 'm') {
		var modno = getSuttaNumber(nikaya,bookno,meta,volume,vagga,sutta,section,y.length);	
		var modt = 	(modno ? ' (<b class="small" style="color:'+colorcfg['colsel']+'">' + nikname[nikaya] + (hier == 'm' ? '' : '-'+hier) + '&nbsp;' + modno + '</b>)' : '');
	}

	// output header
	
	var titleout = convtitle(nikaya,book,una,vna,wna,xna,yna,zna,hier);

	document.getElementById('mafbc').innerHTML = '<table width=100%><tr><td align=left>'+relout+'</td><td align=center>'+titleout+modt+(cfg['showPermalinks'] == 'checked' ? ' <span class="pointer hoverShow" onclick="permalinkClick(\''+permalink+'\');" title="Click to copy permalink to clipboard">☸&nbsp;</span>' :'')+'</td><td id="maftrans" align="right"></td></tr></table>';
		
	if (zna.length > 1) { var bknameme = zna }
	else if (yna.length > 1) { var bknameme  = yna }
	else if (xna.length > 1) { var bknameme  = xna }
	else if (wna.length > 1) { var bknameme  = wna }
	else if (vna.length > 1) { var bknameme  = vna }
	else bknameme = '';
	
	bknameme = bknameme.replace(/^ +/, '').replace(/ +$/, '');
	
	document.form.bmname.value = bknameme;
	var hierb = hier;
	
	// add to history
	
	if(ioCheck) {
		addHistory(nikname[nikaya]+(hier!='m'?'-'+hier:'')+' '+book+' - '+bknameme+"@"+document.form.nik.selectedIndex+','+document.form.book.selectedIndex+','+meta+','+volume+','+vagga+','+sutta+','+section+','+hierb);
		historyBox();
	}

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
	preout(theData);
	//document.textpad.pad.value=theData;
	if(para) { 
        document.getElementById('maf').scrollTop = document.getElementById('para'+para).offsetTop;
	}

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
	document.getElementById('title').innerHTML = '<span class="abut obut small" title="click to return to index of '+toUni(name)+'" onclick="this.blur; importXMLindex();">'+outname+'</span>';
		
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


function importXMLindex() {
	
	
	var DshowH = false; // dev tool
	//DshowH = true; // dev tool
	
	document.activeElement.blur();

	if (hier == 't' && limitt()) { 
		alertFlash('Ṭīkā not available for ' + nikname[document.form.nik.value]+'.','RGBa(255,0,0,0.8)');
		return; 
	}	
	document.getElementById('mafbc').innerHTML = '';
	document.getElementById('mafbc').appendChild(pleasewait);

	var nikaya = document.form.nik.value;
	var book = document.form.book.value;
	var bookload = 'xml/' + nikaya + book + hier + '.xml';
	var bookno = document.form.book.selectedIndex;

	// permalink
	
	var permalink = 'chrome://digitalpalireader/content/index.htm?';
	
	try {
		window.history.replaceState('Object', 'Title', permalink + 'loc='+niknumber[nikaya]+'.'+bookno+'.'+hier);
	}
	catch(ex) {
	}


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

	bookfile = nikaya + book;
		
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
	for (tmp = 0; tmp < z.length; tmp++)
	{
		if (z[tmp].getElementsByTagName("han")[0].childNodes[0]) theData = z[tmp].getElementsByTagName("han")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+colorcfg['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
		if (z.length > 1 && theData == '') { theData = unnamed; } 
		if (theData != '') {
			
			// dppn title 'n'
			
			tt = theData.replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
			if(tt.length < 2) continue;
			dEI = getDppnEntry(tt);
			namen = '';
			if (dEI.length > 0) {
				namen = '<span class="super tiny pointer" style="color:'+colorcfg['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/'+dEI.join(','+toUni(tt)+'\');">&nbsp;n</span><span class="super tiny pointer" style="color:'+colorcfg['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/')+','+toUni(tt)+'\');">&nbsp;n</span>';
			}
			
			whichcol[0] = 1; // bump up to let the second color know

			theDatao += (devCheck == 1 && DshowH ? '[a]':'')+(cfg['showPermalinks'] == 'checked' ? '<span class="pointer hoverShow" onclick="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.0.0.0.0.0.'+hier+'\');" title="Click to copy permalink to clipboard">☸&nbsp;</span>&nbsp;' :'')+'<a href="javascript:void(0)" onclick="searchgo(\''+hier+'\',\''+nikaya+'\','+bookno+',0,0,0,0,0);"/><font style="color:'+colorcfg[col[wcs]]+'"><b>' + translit(toUni(theData)) + '</b></font></a>'+namen+'<br />';
		}
		y = z[tmp].getElementsByTagName("h0");
		for (tmp2 = 0; tmp2 < y.length; tmp2++)
		{
			if (y[tmp2].getElementsByTagName("h0n")[0].childNodes[0]) theData = y[tmp2].getElementsByTagName("h0n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+colorcfg['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
			if (y.length > 1 && theData == '') { theData = unnamed; }
			if (theData != '') {

				// dppn title 'n'
				
				tt = theData.replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
				if(tt.length < 2) continue;
				dEI = getDppnEntry(tt);
				namen = '';
				if (dEI.length > 0) {
					namen = '<span class="super tiny pointer" style="color:'+colorcfg['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/'+dEI.join(','+toUni(tt)+'\');">&nbsp;n</span><span class="super tiny pointer" style="color:'+colorcfg['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/')+','+toUni(tt)+'\');">&nbsp;n</span>';
				}
								
				wcs = whichcol[0]; // either 0 or 1
				whichcol[1] = 1; // bump up for the next color, if no data, this will still be 0, next color will get 0
				var spaces = '';
				for(f = 0; f < wcs; f++) {
					spaces += '&nbsp;&nbsp;';
				}
				
				theDatao += spaces+(devCheck == 1 && DshowH ? '[0]':'')+(cfg['showPermalinks'] == 'checked' ? '<span class="pointer hoverShow" onclick="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.'+tmp2+'.0.0.0.0.'+hier+'\');" title="Click to copy permalink to clipboard">☸&nbsp;</span>&nbsp;' :'')+'<a href="javascript:void(0)" onclick="searchgo(\''+hier+'\',\''+nikaya+'\','+bookno+','+tmp2+',0,0,0,0);"/><font style="color:'+colorcfg[col[wcs]]+'">' + translit(toUni(theData)) + '</font></a>'+namen;

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
				if (x[tmp3].getElementsByTagName("h1n")[0].childNodes[0]) theData = x[tmp3].getElementsByTagName("h1n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+colorcfg['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
				if (x.length > 1 && theData == '') { theData = unnamed; }
				if (theData != '') {

					// dppn title 'n'
					
					tt = theData.replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
					if(tt.length < 2) continue;
					dEI = getDppnEntry(tt);
					namen = '';
					if (dEI.length > 0) {
						namen = '<span class="super tiny pointer" style="color:'+colorcfg['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/'+dEI.join(','+toUni(tt)+'\');">&nbsp;n</span><span class="super tiny pointer" style="color:'+colorcfg['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/')+','+toUni(tt)+'\');">&nbsp;n</span>';
					}
									
						
					wcs = whichcol[0] + whichcol[1]; // 0, 1 or 2 - if 0,1 are still 0, this will get 0
					whichcol[2] = 1; // bump up for the next color, if no data, this will still be -1, next color will get 0
				
					spaces = '';
					for(f = 0; f < wcs; f++) {
						spaces += '&nbsp;&nbsp;';
					}

					theDatao += spaces+(devCheck == 1 && DshowH ? '[1]':'')+(cfg['showPermalinks'] == 'checked' ? '<span class="pointer hoverShow" onclick="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.'+tmp2+'.'+tmp3+'.0.0.0.'+hier+'\');" title="Click to copy permalink to clipboard">☸&nbsp;</span>&nbsp;' :'')+'<a href="javascript:void(0)" onclick="searchgo(\''+hier+'\',\''+nikaya+'\','+bookno+','+tmp2+','+tmp3+',0,0,0);"/><font style="color:'+colorcfg[col[wcs]]+'">' + translit(toUni(theData)) + '</font></a>'+namen;

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
					if (w[tmp4].getElementsByTagName("h2n")[0].childNodes[0]) theData = w[tmp4].getElementsByTagName("h2n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+colorcfg['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
					if (w.length > 1 && theData == '') { theData = unnamed; }
					if (theData != '') {

						// dppn title 'n'
						
						tt = theData.replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
						if(tt.length < 2) continue;
						dEI = getDppnEntry(tt);
						namen = '';
						if (dEI.length > 0) {
							namen = '<span class="super tiny pointer" style="color:'+colorcfg['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/'+dEI.join(','+toUni(tt)+'\');">&nbsp;n</span><span class="super tiny pointer" style="color:'+colorcfg['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/')+','+toUni(tt)+'\');">&nbsp;n</span>';
						}
										
							
							
						wcs = whichcol[0] + whichcol[1] + whichcol[2]; // 0, 1, 2, or 3
						whichcol[3] = 1; // bump
						
						spaces = '';
						for(f = 0; f < wcs; f++) {
							spaces += '&nbsp;&nbsp;';
						}

						theDatao += spaces+(devCheck == 1 && DshowH ? '[2]':'')+(cfg['showPermalinks'] == 'checked' ? '<span class="pointer hoverShow" onclick="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.'+tmp2+'.'+tmp3+'.'+tmp4+'.0.0.'+hier+'\');" title="Click to copy permalink to clipboard">☸&nbsp;</span>&nbsp;' :'')+'<a href="javascript:void(0)" onclick="searchgo(\''+hier+'\',\''+nikaya+'\','+bookno+','+tmp2+','+tmp3+','+tmp4+',0,0);"/><font style="color:'+colorcfg[col[wcs]]+'">' + translit(toUni(theData))+(nikaya == 'd' && hier == 'm' ? '&nbsp;<d class="small">(DN&nbsp;'+getSuttaNumber(nikaya,bookno,tmp2,tmp3,tmp4,0,0,0) + ')' : '') + '</d></font></a>'+namen;
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
						if (v[tmp5].getElementsByTagName("h3n")[0].childNodes[0]) theData = v[tmp5].getElementsByTagName("h3n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+colorcfg['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
						if (v.length > 1 && theData == '') { theData = unnamed; }
						if (theData != '') {

							// dppn title 'n'
							
							tt = theData.replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
							if(tt.length < 2) continue;
							dEI = getDppnEntry(tt);
							namen = '';
							if (dEI.length > 0) {
								namen = '<span class="super tiny pointer" style="color:'+colorcfg['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/'+dEI.join(','+toUni(tt)+'\');">&nbsp;n</span><span class="super tiny pointer" style="color:'+colorcfg['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/')+','+toUni(tt)+'\');">&nbsp;n</span>';
							}
											
								

							wcs = whichcol[0] + whichcol[1] + whichcol[2] + whichcol[3]; // 0, 1, 2, 3, or 4
							whichcol[4] = 1; // bump

							spaces = '';
							for(f = 0; f < wcs; f++) {
								spaces += '&nbsp;&nbsp;';
							}

							theDatao += spaces+(devCheck == 1 && DshowH ? '[3]':'')+(cfg['showPermalinks'] == 'checked' ? '<span class="pointer hoverShow" onclick="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.'+tmp2+'.'+tmp3+'.'+tmp4+'.'+tmp5+'.0.'+hier+'\');" title="Click to copy permalink to clipboard">☸&nbsp;</span>&nbsp;' :'')+'<a href="javascript:void(0)" onclick="searchgo(\''+hier+'\',\''+nikaya+'\','+bookno+','+tmp2+','+tmp3+','+tmp4+','+tmp5+',0);"/><font style="color:'+colorcfg[col[wcs]]+'">' + translit(toUni(theData)) + (nikaya == 'm' && hier == 'm' ? '&nbsp;<d class="small">(MN&nbsp;'+getSuttaNumber(nikaya,bookno,tmp2,tmp3,tmp4,tmp5,0,0) + ')' : '') + '</d></font></a>'+namen;
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
							if (u[tmp6].getElementsByTagName("h4n")[0].childNodes[0]) theData = u[tmp6].getElementsByTagName("h4n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+colorcfg['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
							if (u.length > 1 && theData == '') { theData = unnamed; }
							if (theData != '') {

								// dppn title 'n'
								
								tt = theData.replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
								if(tt.length < 2) continue;
								dEI = getDppnEntry(tt);
								namen = '';
								if (dEI.length > 0) {
									namen = '<span class="super tiny pointer" style="color:'+colorcfg['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/'+dEI.join(','+toUni(tt)+'\');">&nbsp;n</span><span class="super tiny pointer" style="color:'+colorcfg['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/')+','+toUni(tt)+'\');">&nbsp;n</span>';
								}
												
									

								wcs = whichcol[0] + whichcol[1] + whichcol[2] + whichcol[3] + whichcol[4]; // 0, 1, 2, 3, 4 or 5
								spaces = '';
								for(f = 0; f < wcs; f++) {
									spaces += '&nbsp;&nbsp;';
								}

								theDatao += spaces+(devCheck == 1 && DshowH ? '[4]':'')+(cfg['showPermalinks'] == 'checked' ? '<span class="pointer hoverShow" onclick="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.'+tmp2+'.'+tmp3+'.'+tmp4+'.'+tmp5+'.'+tmp6+'.'+hier+'\');" title="Click to copy permalink to clipboard">☸&nbsp;</span>&nbsp;' :'')+'<a href="javascript:void(0)" onclick="searchgo(\''+hier+'\',\''+nikaya+'\','+bookno+','+tmp2+','+tmp3+','+tmp4+','+tmp5+','+tmp6+');"/><font style="color:'+colorcfg[col[(wcs == 5 ? 0 : wcs)]]+'">' + translit(toUni(theData)) + (/[sa]/.exec(nikaya) && hier == 'm' ? '&nbsp;<d class="small">('+nikname[nikaya]+'&nbsp;'+getSuttaNumber(nikaya,bookno,tmp2,tmp3,tmp4,tmp5,tmp6) + ')' : '') + '</d></font></a>'+namen;
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
	}
	var theDataDiv = document.createElement('div');
	theDataDiv.innerHTML = theDatao;
	document.getElementById('mafbc').innerHTML = '';
	document.getElementById('mafbc').appendChild(theDataDiv);  // ---------- return output ----------

	document.getElementById('maf').scrollTop = 0;
	if(moveat == 3) { moveframex(2); }
}

function importXMLraw()
{
	document.activeElement.blur();
	if (hier == 't' && limitt()) { 
		alertFlash('Ṭīkā not available for ' + nikname[document.form.nik.value]+'.','RGBa(255,0,0,0.8)');
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
			setplace[0] = niknumber[setplace[0]];
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
	document.getElementById('title').innerHTML = '<span class="abut obut small" title="click to return to index of '+titlen+'" onclick="this.blur; importXMLindex();">'+tnamea+'</span>';
		
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
	moves(0);
	if(moveat == 3) { moveframex(2); }
	
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


function getatt(num,type,niklist) { // get atthakatha or tika word 
    moveframex(2);
    if(type == 'a') {
		var loca = attlist[num].split('#');
		var word = loca.shift();
	}
	else {
		var loca = tiklist[num].split('#');
		var word = loca.shift();
	}
	document.getElementById('mafbc').innerHTML = '';
	document.getElementById('mafbc').appendChild(pleasewait);
    var finout = '';
    
    location:
    for (i in loca) {
        var pca = loca[i].split('^');
        var nikaya = pca[0];
        
        // specify nikayas 
        
		if(niklist.indexOf(nikaya) == -1) continue;

        var book = pca[1];
        
        var bookload = 'xml/' + nikaya + book + type + '.xml';

        var xmlhttp = new window.XMLHttpRequest();
        xmlhttp.open("GET", bookload, false);
        xmlhttp.send(null);
        var xmlDoc = xmlhttp.responseXML.documentElement;

		if (nikaya == 'k') {
			var bookno = kudvala[pca[1]];
		}
		else if(nikaya == 'y') {
			var bookno = abhivala[pca[1]];
		}
		else var bookno = parseInt(pca[1])-1;

        var meta = pca[2];
        var volume = pca[3];
        var vagga = pca[4];
        var sutta = pca[5];	
        var section = pca[6];	
        var para = pca[7];	

        var metalist = '';
        var volumelist = '';
        var vaggalist = '';
        var suttalist = '';
        var sectionlist = '';

        var placen = nikname[nikaya] + '-'+type+' ' + book;

        var u = xmlDoc.getElementsByTagName("h0");
        if (u.length > 1) placen += '.' + (parseInt(meta)+1);
        var v = u[meta].getElementsByTagName("h1");
        if (v.length > 1) placen += '.' + (parseInt(volume)+1);
        var w = v[volume].getElementsByTagName("h2");
        if (w.length > 1) placen += '.' + (parseInt(vagga)+1);
        var x = w[vagga].getElementsByTagName("h3");
        if (x.length > 1) placen += '.' + (parseInt(sutta)+1);
        var y = x[sutta].getElementsByTagName("h4");
        if (y.length > 1) placen += '.' + (parseInt(section)+1);
        var z = y[section].getElementsByTagName("p")[para].textContent.substring(4);
        
        var wordr = new RegExp('\\^b\\^\([^a-zA-Z\\.~^]*' + word + '[^a-zA-Z^]*\)\\^eb\\^','gi');
        var wordr2 = new RegExp('\\^b\\^[^a-zA-Z\\.~^]*' + word + '[^a-zA-Z^]*\\^eb\\^','gi');
        z = z.replace(wordr, "<c0><@>"+word.replace(/ /g,'</@><xc> <c0><@>')+"</@><xc>");
        
        placen += ' Para. ' + (parseInt(para)+1);
        finout += '<p><span class="abut obut" onclick="getplace([\''+niknumber[nikaya]+'\',\''+bookno+'\',\''+pca[2]+'\',\''+pca[3]+'\',\''+pca[4]+'\',\''+pca[5]+'\',\''+pca[6]+'\',\''+type+'\']); importXML(['+wordr2+'],'+pca[7]+')">'+placen+'</span> '+preparepali(z,1)[0]+'</p>';
    }
    document.getElementById('mafbc').innerHTML = '<b style="text-size:'+(parseInt(colorcfg['colsize'])*2)+'px">'+toUni(word)+'</b> in the '+(type == 'a' ? 'aṭṭhakathā:' : 'ṭīka:');
    document.getElementById('mafbc').innerHTML += finout;
    document.getElementById('maf').scrollTop = 0;
}
 
function gettitle(num,mul,att,tik,niklist) { // get titles 

    moveframex(2);

	var loca = titlelist[num].split('#');
	var word = loca.shift();
	
	document.getElementById('mafbc').innerHTML = '';
	document.getElementById('mafbc').appendChild(pleasewait);
    
    var finout = '';
    
    location:
    for (i in loca) {
        var pca = loca[i].split('^');

		// separate mat
		if((pca[7] == 'm' && !mul) || (pca[7] == 'a' && !att) || (pca[7] == 't' && !tik)) continue;
        
        // specify nikayas 
        var nikaya = pca[0];
        
		if(niklist.indexOf(nikaya) == -1) continue;


        var book = pca[1];
        var type = pca[7];
        var bookload = 'xml/' + nikaya + book + type + '.xml';

        var xmlhttp = new window.XMLHttpRequest();
        xmlhttp.open("GET", bookload, false);
        xmlhttp.send(null);
        var xmlDoc = xmlhttp.responseXML.documentElement;

		if (type != 'm' && nikaya == 'k') {
			var bookno = kudvala[pca[1]];
		}
		else if (type != 'm' && nikaya == 'k') {
			var bookno = abhivala[pca[1]];
		}
		else var bookno = parseInt(pca[1])-1;

        var meta = pca[2];
        var volume = pca[3];
        var vagga = pca[4];
        var sutta = pca[5];	
        var section = pca[6];
        var depth = pca[8];	

        var metalist = '';
        var volumelist = '';
        var vaggalist = '';
        var suttalist = '';
        var sectionlist = '';

		var vna = ' ';
		var wna = ' ';
		var xna = ' ';
		var yna = ' ';
		var zna = ' ';
		
		if(depth > 0) {
			var u = xmlDoc.getElementsByTagName("h0");
			if (u.length > 1) {
				var vn = u[meta].getElementsByTagName("h0n");
				vna = (vn[0].childNodes[0] ? vn[0].textContent : ' ');
			}
			if(depth > 1) {
				var v = u[meta].getElementsByTagName("h1");
				if (v.length > 1) {
					var wn = v[volume].getElementsByTagName("h1n");
					wna = (wn[0].childNodes[0] ? wn[0].textContent : ' ');
				}
				if(depth > 2) {
					var w = v[volume].getElementsByTagName("h2");
					if (w.length > 1) {
						var xn = w[vagga].getElementsByTagName("h2n");
						xna = (xn[0].childNodes[0] ? xn[0].textContent : ' ');
					}
					if(depth > 3) {
						var x = w[vagga].getElementsByTagName("h3");
						if (x.length > 1) {
							var yn = x[sutta].getElementsByTagName("h3n");
							yna = (yn[0].childNodes[0] ? yn[0].textContent : ' ');
						}
						if(depth > 4) {
							var y = x[sutta].getElementsByTagName("h4");
							if (y.length > 1) {
								var zn = y[section].getElementsByTagName("h4n");
								zna = (zn[0].childNodes[0] ? zn[0].textContent : ' ');
							}
						}
					}
				}
			}
		}

		var placen = convtitle(nikaya,book,vna,wna,xna,yna,zna,type);

        finout += '<p>'+placen+' <span class="abut obut" onclick="getplace([\''+niknumber[nikaya]+'\',\''+bookno+'\',\''+pca[2]+'\',\''+pca[3]+'\',\''+pca[4]+'\',\''+pca[5]+'\',\''+pca[6]+'\',\''+type+'\']); importXML()">go</span></p>';
    }
    document.getElementById('mafbc').innerHTML = '<p>Title Search for <b>'+toUni(word)+'</b></p><hr />';
    document.getElementById('mafbc').innerHTML += finout;
    document.getElementById('maf').scrollTop = 0;
}
 
function getDppnData(link){
	var dppnf = 'etc/XML2/'+link.split('/')[0]+'.xml';

	var xmlhttp = new window.XMLHttpRequest();
	xmlhttp.open("GET", dppnf, false);
	xmlhttp.send(null);
	var xmlDoc = xmlhttp.responseXML.documentElement;

	var data = ' ' + xmlDoc.getElementsByTagName('entry')[parseInt(link.split('/')[1])].textContent.replace(/\[/g, '<').replace(/\]/g, '>').replace(/href/g, 'style="color:blue" href').replace(/\.  /g, '.&nbsp; ');
	return data;
}
