// āīūṭḍṅṇṃṃñḷĀĪŪṬḌṄṆṂÑḶ  aiueokgcjtdnpbmyrlvsh


function outputFormattedData(data,which,place) // calls text prep, then outputs it to preFrame
{

	G_lastcolour = 0; // reset colour changing

	var inarray = preparepali(data);
		
	var finout = inarray[0];

	if(!which) { // not from textpad
		var convout = inarray[1].replace(/  *,/g, ',');

		var nikaya = place[0];
		var book = place[1];
		var meta = place[2];
		var volume = place[3];
		var vagga = place[4];
		var sutta = place[5];
		var section = place[6]

		var transin;
		var transout='';
		if (hier == "m") { 
			transin = addtrans(0,nikaya,book,meta,volume,vagga,sutta,section);
			if (transin) {
				var atiurl = (cfg['catioff'] == 'checked' ? 'file://' + getHomePath().replace(/\\/g, '/') +'/'+cfg['catiloc']+'/html/' : 'http://www.accesstoinsight.org/');
				if (transin[0].indexOf('Anandajoti') == -1) transout += '<img style="vertical-align:middle" src="'+atiurl+'favicon.ico" title="Translations courtesy of http://www.accesstoinsight.org/" onclick="window.open(\'http://www.accesstoinsight.org/\')">&nbsp;';
				transout += transin.join('&nbsp;');
				document.getElementById('maftrans').innerHTML += transout; 
			}
		}
		
		var convDiv = document.createElement('div');
		convDiv.setAttribute('id','convi');
		convDiv.innerHTML = convout;
		document.getElementById('mafbc').appendChild(convDiv);
	}
	
	var outDiv =  document.createElement('div');
	outDiv.innerHTML = finout;
	document.getElementById('mafbc').appendChild(document.createElement('hr'));
	document.getElementById('mafbc').appendChild(outDiv);
	
	document.getElementById('maf').scrollTop = 0; 
	if (moveat == 3) {moveframex(2);}
	moves(0);
	
}


function formatuniout(data,which) { // prepare without links
	
	var convout = '';
	
	var indexpage = '';
	var pageno = '';
	var pagetitle = '';
	var volandpage = '';
	
	var altread = 0;
	var altplus = '';	
	var endpt = 0;
	var unioutb = '';
	var finout = '';
	var outarray = new Array();
	
	data = data.replace(/\.\.\.pe0\.\.\./g, ' ... pe ...');
	data = data.replace(/``/g, '“');
	data = data.replace(/`/g, '‘');
	data = data.replace(/'''/g, '’”');
	data = data.replace(/''/g, '”');
	data = data.replace(/'/g, '’');
	data = data.replace(/[”"]ti/g, '” ”ti');
	data = data.replace(/['’]+ti/g, '’ ’ti');
	data = data.replace(/['’][”"]nti/g, 'n’” ”ti');
	data = data.replace(/[”"]nti/g, 'n” ”ti');
	data = data.replace(/['’]+nti/g, 'n’ ’ti');
	data = data.replace(/\^b\^/g, '<@>');
	data = data.replace(/\^eb\^/g, '</@>');
	data = data.replace(/["]+<\/@>nti/g, 'n”</@> ”ti');
	data = data.replace(/['’]+<\/@>nti/g, 'n’</@> ’ti');
	data = data.replace(/["]+<\/@>ti/g, '”</@> ”ti');
	data = data.replace(/['’]+<\/@>ti/g, '’</@> ’ti');
	
	if(cfg['showPages'] == 'unchecked') data = data.replace(/ *\^a\^[^^]*\^ea\^ */g,' ');
	else {
		data = data.replace(/\^a\^\"/g, ' z');
		data = data.replace(/\"\^ea\^/g, 'z ');
		data = data.replace(/\^a\^/g, ' z');
		data = data.replace(/\^ea\^/g, 'z ');
	}
	
	//data = data.replace(/\^v/g, '');
	//data = data.replace(/v\^/g, '');

	if(cfg['showVariants'] == 'unchecked') data = data.replace(/ *\{[^}]*\} */g,' ');
	else data = data.replace(/\}/g, '} ').replace(/\{/g, ' {');
	
	data = data.replace(/   */g, ' ');

	data = data.replace(/([^.])\.\.(?!\.)/g, "$1."); // double periods

	var uniouta = toUni(data).replace(/[”’] ([”’])/g, " $1").split(' ');
	//data = data.replace(/\"/g, '\u00B4');
	var wordbyword = data.split(' ');
	var addpre = '';
	var paran=0;
	//document.getElementById('mafa').innerHTML = data;	
	var wb;
	var b = 0;
	var space = ' ';
   //alert(data);
	
	
	for (var a = 0; a < wordbyword.length; a++)
	{
		wb = wordbyword[a];
		
		// remove space where extra quotes were
		space = ' ';
		if(/[”’]/.exec(wb.charAt(wb.length-1)) && wb.charAt(wb.length-1) == wordbyword[a+1].charAt(0)) {
			space = '';
		}

		
		// VAR readings
		
		if (altread == 1) {
			endpt = wb.length-1;
			if (wb.charAt(endpt) == '}') {
				altplus += wb.substring(0,endpt);
				altread = 0;
				altplus = translit(toUni(altplus));
				altplus = altplus.replace(/0/g, '.');
				finout += ' <a href="javascript:void(0)" class="tiny" style="color:'+colorcfg['grey']+'" title="' + altplus + '">VAR</a>' + space;
			}
			else altplus += wb + ' ';
		}
		else if (wb.charAt(0) == '{') {
			if (wb.charAt(wb.length-1) == '}') {
				altplus = wb.substring(1,wb.length-1) + ' ';
				altplus = translit(toUni(altplus));
				altplus = altplus.replace(/0/g, '.');
				finout += ' <a href="javascript:void(0)" class="tiny" style="color:'+colorcfg['grey']+'" title="' + altplus + '">VAR</a>' + space;
			}
			else {
				altread = 1;
				altplus = wb.substring(1) + space;
			}
		}

		// search term coloured text

		else if (wb.indexOf('<c') >= 0) {
			var fullwordout = [];
			fullwordout[0] = '';
			fullwordout[1] = '';
			while (wb.indexOf('<c') >= 0) {
				cp = wb.indexOf('<c');
				if(cp > 0) { // something before
					if (which) {  
						finout += translit(toUni(wb.substring(0,cp))); b++;
					}
					else {
						fullwordout[0] += wb.substring(0,cp).replace(/"/g, 'x').replace(/<[^>]*>/g, '');
						fullwordout[1] += translit(toUni(wb.substring(0,cp)));
					}
					convout += wb.substring(0,cp).replace(/<[^>]*>/g, '');
				}

				var cno = wb.substring(cp,cp+4); // <c1>
				
				wb = wb.substring(cp+4);
				
				var cm = wb.search('<xc>');

				if (which) {  
					finout += cno + translit(toUni(wb.substring(0,cm)))+'<xc>'; b++;
				}
				else {
					fullwordout[0] += wb.substring(0,cm).replace(/"/g, 'x').replace(/<[^>]*>/g, '');
					fullwordout[1] += cno + translit(toUni(wb.substring(0,cm))) + '<xc>';
				}

				convout += wb.substring(0,cm).replace(/<[^>]*>/g, '');

				wb = wb.substring(cm+4);
			}
			if(wb.length > 0) { // anything left?
				if (which) {  
					finout += translit(toUni(wb)); b++;
				}
				else {
					fullwordout[0] += wb.replace(/"/g, 'x').replace(/<[^>]*>/g, '');
					fullwordout[1] += translit(toUni(wb));
				}
				convout += wb.replace(/<[^>]*>/g, '');
			}
			if(!which) {// put it together as one link
				finout += '<a id="W' + b + '" href="javascript:void(0)" onclick="sendAnalysisToOutput(&#39;' + fullwordout[0] +  '&#39;,' + b + ')">' +  fullwordout[1] + '</a>'; b++;
			}
			finout += space;
			convout += space;
		}		

		else if (/^<f/.exec(wb)) {
			finout += wb + space;
		}		
		else if (/^<p/.exec(wb)) {
			var permalink = wb.substring(2,wb.length-1);
			convout += '\n\n';
			finout += '<p id="para'+paran+'">'+(cfg['showPermalinks'] == 'checked' ? '<span class="pointer hoverShow" onclick="permalinkClick(\''+permalink+'\',1);" title="Click to copy permalink to clipboard">☸&nbsp;</span>' :'');
			paran++;
		}		
		else if (wb.charAt(0) == 'z') // pesky page numbers
		{
			indexpage = wb.charAt(1);
			pageno = wb.substring(2,8);
			switch (indexpage) {
				case 'M':
					pagetitle = 'Myanmar';
					break;
				case 'V':
					pagetitle = 'VRI';
					break;
				case 'P':
					pagetitle = 'PTS';
					break;
				case 'T':
					pagetitle = 'Thai';
					break;
			}
			
			volandpage = pageno.split('.');
			
			pagetitle += ': vol. ' + volandpage[0] + ', p. ' + volandpage[1].replace(/^0*/,"");
			finout += ' <a class="tiny" style="color:blue" href="javascript:void(0)" title="' + pagetitle + '">' + indexpage + '</a>' + space;
		}
		else if (which)
		{
			convout += wb + space;
			unioutb = uniouta[a];
			unioutb = unioutb.replace(/0/g, '.');
			unioutb = translit(unioutb);
			finout += unioutb + space;
		}
		else
		{
			convout += wb.replace(/<[^>]*>/g, '') + space;
			unioutb = uniouta[a];
			//unioutb = unioutb.replace(/0/g, '.');
			unioutb = translit(unioutb);
			finout += '<a id="W' + b + '" href="javascript:void(0)" onclick="sendAnalysisToOutput(&#39;' + wb.replace(/"/g,'x').replace(/<[^>]*>/g, '') + '&#39;,' + b + ')">' +  unioutb + '</a>' + space;
			b++;
		}
	}
	finout = finout.replace(/<@>/g, '<b>');
	finout = finout.replace(/<\/@>/g, '</b>');
	finout = finout.replace(/ +([,;])/g, "$1");
	outarray[0] = finout;
	outarray[1] = toUni(convout);
	return outarray;
}

function preparepali(data,which) { // standard text prep for algorithm
	
	var finout = formatuniout(data,which);
	
	
	// add search markers

	finout[0] = finout[0].replace(/<c0>/g, '<span style="color:'+colorcfg['colped']+'">');
	finout[0] = finout[0].replace(/<c1>/g, '<span style="color:'+colorcfg['coldppn']+'">');
	finout[0] = finout[0].replace(/<c2>/g, '<span style="color:'+colorcfg['colcpd']+'">');
	finout[0] = finout[0].replace(/<xc>/g, '</span>');
	
	
	return finout;

}

function convtitle(nikaya,book,una,vna,wna,xna,yna,zna,hiert,oneline)
{
	var lmt = 60;
	var lgt = una.length;
	
	book = getBookName(nikaya,hiert,book-1);
	if (G_nikLongName[nikaya]) { nikaya = G_nikLongName[nikaya]; }
	var col = ['colped','coldppn','colcpd','colped','coldppn','colcpd','colped','coldppn','colcpd'];
	var w = 0;
	
	// dppn title links
	
	var namea = [una,vna,wna,xna,yna,zna];
	var namen = [null,null,null,null,null,null];
	if (cfg['showNames'] == 'checked') {
		for (i in namea) {
			var tt = toVel(namea[i]).replace(/^[ 0-9.]+ /,'').replace(/[- ]/g,'');
			if(tt.length < 2) continue;
			var dEI = getDppnEntry(tt);
			if (dEI.length > 0) {
				namen[i] = '<span class="super tiny pointer" style="color:'+colorcfg['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/'+dEI.join(','+toUni(tt)+'\');">&nbsp;n</span><span class="super tiny pointer" style="color:'+colorcfg['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/')+','+toUni(tt)+'\');">&nbsp;n</span>';
			}
		}
	}
	
	
	var title='<b style="color:'+colorcfg[col[w++]]+'">' + translit(toUni(namea[0])).replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+colorcfg['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,'').replace(/ /g,'&nbsp;') + '</b>' + (namen[0] ? namen[0] :'');


	if (namea[1] != ' ') {
		namea[1] = translit(toUni(namea[1]));
		if(lgt > lmt && !oneline) {
			title += ',<br/>';
			lgt = 0;
		}
		else {
			title += ', ';
			lgt += namea[1].length;
		}
		title += '<b style="color:'+colorcfg[col[w++]]+'">' + namea[1].replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+colorcfg['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,'').replace(/ /g,'&nbsp;') + '</b>' + (namen[1] ? namen[1] :'');
	}
	if (namea[2] != ' ') {
		namea[2] = translit(toUni(namea[2]));
		if(lgt > lmt && !oneline) {
			title += ',<br/>';
			lgt = 0;
		}
		else {
			title += ', ';
			lgt += namea[2].length;
		}
		title += '<b style="color:'+colorcfg[col[w++]]+'">' + namea[2].replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+colorcfg['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,'').replace(/ /g,'&nbsp;') + '</b>' + (namen[2] ? namen[2] :'');
	}
	if (namea[3] != ' ') {
		namea[3] = translit(toUni(namea[3]));
		if(lgt > lmt && !oneline) {
			title += ',<br/>';
			lgt = 0;
		}
		else {
			title += ', ';
			lgt += namea[3].length;
		}
		title += '<b style="color:'+colorcfg[col[w++]]+'">' +  namea[3].replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+colorcfg['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,'').replace(/ /g,'&nbsp;') + '</b>' + (namen[3] ? namen[3] :'');
	}
	if (namea[4] != ' ') {
		namea[4] = translit(toUni(namea[4]));
		if(lgt > lmt && !oneline) {
			title += ',<br/>';
			lgt = 0;
		}
		else {
			title += ', ';
			lgt += namea[4].length;
		}
		title += '<b style="color:'+colorcfg[col[w++]]+'">' +  namea[4].replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+colorcfg['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,'').replace(/ /g,'&nbsp;') + '</b>' + (namen[4] ? namen[4] :'');
	}
	if (namea[5] != ' ') {
		namea[5] = translit(toUni(namea[5]));
		if(lgt > lmt && !oneline) {
			title += ',<br/>';
			lgt = 0;
		}
		else {
			title += ', ';
			lgt += namea[5].length;
		}
		title += '<b style="color:'+colorcfg[col[w++]]+'">' +  namea[5].replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+colorcfg['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,'').replace(/ /g,'&nbsp;') + '</b>' + (namen[5] ? namen[5] :'');
	}
	
	title = toUni(title);
	return title;
}


var maxlength = 21;  // change for display purposes, will affect history as well.

function makeTitleSelect(xml,tag) { // output select tag with titles in options
	var name, namea;
	var outlist = [];
	for (var a = 0; a < xml.length; a++)
	{
		name = xml[a].getElementsByTagName(tag);
		if (name[0].childNodes[0] && name[0].textContent.replace(/ /g,'').length > 0) namea = name[0].textContent.replace(/\{.*\}/,'').replace(/^  */, '').replace(/  *$/,'');
		else {
			namea = '>'+ unnamed;
			outlist.push(namea);
			continue;
		}
		
		namea = ' title="'+toUni(namea)+'">'+ translit(shortenTitle(namea));

		outlist.push(namea);
	}
	return outlist;
}

function shortenTitle(name,no) {
	var lth = (no ? no : maxlength)
	name = toUni(name);
	if(name.length <= lth) return name;
	name = name.substring(0,lth);
	name += '...';
	return name;
}

function analyzeTextPad() {
	var titleout = convtitle('Input From Scratchpad',' ',' ',' ',' ',' ',' ',' '); 
	document.getElementById('mafbc').innerHTML = '<table width=100%><tr><td align=left></td><td align=center>'+titleout+'</td><td id="maftrans" align="right"></td></tr></table>';
	outputFormattedData('<p> '+document.getElementById('pad').value.replace(/(\n|\t)/g,' ') + ' </p>',1); 
}

var pleasewait =  document.createElement('div');
pleasewait.setAttribute('align','center');
pleasewait.innerHTML = '<br><br><br><br><h1><img src="images/ajax-loader.gif" /> please wait...</h1>';


function permalinkClick(link,url) {
	copyToClipboard(link);
	if(url) {
		try {
			window.history.replaceState('Object', 'Title', link);
		}
		catch(ex) {
		}
	}
	alertFlash("Permalink copied to clipboard.",'green');
}
	
function copyToClipboard(text) {
	const clipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);  
	clipboardHelper.copyString(text);
}

var G_alertFlashStart = 0;

function alertFlash(text,color) {
	G_alertFlashStart++; // give us an alert Id 
	if(color) {
		
		switch (color) {
			case 'red':
			color = 'RGBa(255,64,64,1)';
			break;
			case 'green':
			color = 'RGBa(64,255,64,1)';
			break;
			case 'yellow':
			color = 'RGBa(255,255,64,1)';
			break;
		}
		document.getElementById('alert').style.backgroundColor = color;
	
	}
	document.getElementById('alert').innerHTML = text;
	document.getElementById('alertc').style.opacity = '0';
	document.getElementById('alertc').style.display='block';
	fadeInOut(G_alertFlashStart,'alertc',10,Math.sqrt(text.length)*500,100);
}

var G_prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                        .getService(Components.interfaces.nsIPromptService);

function fadeInOut(AID,id, sIn, L, sOut) {
	if(AID != G_alertFlashStart) return;
	fadeIn(AID,id,sIn,L,sOut);
}
function fadeIn(AID,id,speed,L,sOut) {
	if(AID != G_alertFlashStart) return;
	if(parseFloat(document.getElementById(id).style.opacity) < 1) {
		document.getElementById(id).style.opacity = parseFloat(document.getElementById(id).style.opacity)+0.1;  
		setTimeout(function() { fadeIn(AID,id,speed*0.9,L,sOut); }, speed*0.9);
	}
	else {
		document.getElementById(id).style.display='block'; 
		if(L) setTimeout(function() { fadeOut(AID,id,sOut); }, L);
	}
}

function fadeOut(AID,id,speed) {
	if(AID != G_alertFlashStart) return;
	if(parseFloat(document.getElementById(id).style.opacity) > 0.1) {
		document.getElementById(id).style.opacity = parseFloat(document.getElementById(id).style.opacity)-0.1;  
		setTimeout(function() { fadeOut(AID,id,speed*0.9); }, speed*0.9);
	}
	else document.getElementById(id).style.display='none'; 
}

