// āīūṭḍṅṇṃṃñḷĀĪŪṬḌṄṆṂÑḶ  aiueokgcjtdnpbmyrlvsh


function preout(data,which) // calls text prep, then outputs it to preFrame
{

	G_lastcolour = 0; // reset colour changing

	var inarray = preparepali(data,which);
		
	var finout = inarray[0];
	var convout = inarray[1].replace(/  *,/g, ',');

	var nikaya = document.form.nik.value;
	var book = document.form.book.selectedIndex;
	var meta = document.form.meta.selectedIndex;
	var volume = document.form.volume.selectedIndex;
	var vagga = document.form.vagga.selectedIndex;
	var sutta = document.form.sutta.selectedIndex;
	var section = document.form.section.selectedIndex;
	
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
	var outDiv =  document.createElement('div');
	outDiv.innerHTML = finout;
	document.getElementById('mafbc').appendChild(convDiv);
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
	else data = data.replace(/\}/g, '} ');
	
	data = data.replace(/   */g, ' ');
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
				finout += '<a id="W' + b + '" href="javascript:void(0)" onclick="postout(&#39;' + fullwordout[0] +  '&#39;,' + b + ')">' +  fullwordout[1] + '</a>'; b++;
			}
			finout += space;
			convout += space;
		}		

		else if (wb.substring(0,2) == '<f') {
			finout += wb + space;
		}		
		else if (wb.indexOf('<p') == 0) {
			var permalink = wb.substring(2,wb.length-1);
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
			finout += '<a id="W' + b + '" href="javascript:void(0)" onclick="postout(&#39;' + wb.replace(/"/g,'x').replace(/<[^>]*>/g, '') + '&#39;,' + b + ')">' +  unioutb + '</a>' + space;
			b++;
		}
	}
	finout = finout.replace(/<@>/g, '<b>');
	finout = finout.replace(/<\/@>/g, '</b>');
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

function convtitle(nikaya,book,una,vna,wna,xna,yna,zna,hiert)
{
	var lmt = 60;
	var lgt = una.length;
	
	book = getBookName(nikaya,hiert,book-1);
	if (nikname[nikaya]) { nikaya = nikname[nikaya]; }
	var col = ['colped','coldppn','colcpd','colped','coldppn','colcpd','colped','coldppn','colcpd'];
	var w = 0;
	
	// dppn title links
	
	var namea = [una,vna,wna,xna,yna,zna];
	var namen = [null,null,null,null,null,null];
	for (i in namea) {
		var tt = namea[i].replace(/^[ 0-9.]+ /,'').replace(/[- ]/g,'');
		if(tt.length < 2) continue;
		var dEI = getDppnEntry(tt);
		if (dEI.length > 0) {
			namen[i] = '<span class="super tiny pointer" style="color:'+colorcfg['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/'+dEI.join(','+toUni(tt)+'\');">&nbsp;n</span><span class="super tiny pointer" style="color:'+colorcfg['coldppn']+'" title="DPPN entry" onclick="DPPNXML(\''+toUni(tt)+'/')+','+toUni(tt)+'\');">&nbsp;n</span>';
		}
	}
	
	
	var title='<b style="color:'+colorcfg[col[w++]]+'">' + translit(toUni(namea[0])).replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+colorcfg['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,'').replace(/ /g,'&nbsp;') + '</b>' + (namen[0] ? namen[0] :'');


	if (namea[1] != ' ') {
		namea[1] = translit(toUni(namea[1]));
		if(lgt > lmt) {
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
		if(lgt > lmt) {
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
		if(lgt > lmt) {
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
		if(lgt > lmt) {
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
		if(lgt > lmt) {
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


var nikname = new Array();
nikname['v'] = "Vin";
nikname['d'] = "DN";
nikname['m'] = "MN";
nikname['s'] = "SN";
nikname['a'] = "AN";
nikname['k'] = "KN";
nikname['y'] = "Abhi";
nikname['x'] = "Vism";
nikname['b'] = "AbhiS";
nikname['g'] = "Gram";

var niknumber = new Array();
niknumber['v'] = "0";
niknumber['d'] = "1";
niknumber['m'] = "2";
niknumber['s'] = "3";
niknumber['a'] = "4";
niknumber['k'] = "5";
niknumber['y'] = "6";
niknumber['x'] = "7";
niknumber['b'] = "8";
niknumber['g'] = "9";

var numbernik = new Array();
numbernik.push('v');
numbernik.push('d');
numbernik.push('m');
numbernik.push('s');
numbernik.push('a');
numbernik.push('k');
numbernik.push('y');
numbernik.push('x');
numbernik.push('b');
numbernik.push('g');



var kudvala = [];

kudvala['1'] = 0;
kudvala['2'] = 1;
kudvala['3'] = 2;
kudvala['4'] = 3;
kudvala['5'] = 4;
kudvala['6'] = 5;
kudvala['7'] = 6;
kudvala['8'] = 7;
kudvala['9'] = 8;
kudvala['10'] = 9;
kudvala['12'] = 10;
kudvala['13'] = 11;
kudvala['14'] = 12;
kudvala['15'] = 13;

var abhivala = [];

abhivala['1'] = 0;
abhivala['2'] = 1;
abhivala['3'] = 2;
abhivala['4'] = 3;
abhivala['5'] = 4;
abhivala['6'] = 5;
abhivala['7'] = 5;
abhivala['8'] = 5;
abhivala['9'] = 6;
abhivala['10'] = 6;
abhivala['11'] = 6;
abhivala['12'] = 6;
abhivala['13'] = 6;
abhivala['14'] = 6;

var knames = [];

knames.push('Khp');
knames.push('Dhp');
knames.push('Ud');
knames.push('It');
knames.push('Sn');
knames.push('Vv');
knames.push('Pv');
knames.push('Th');
knames.push('Thī');
knames.push('Ap.1');
knames.push('Ap.2');
knames.push('Bv');
knames.push('Cp');
knames.push('Ja 1');
knames.push('Ja 2');
knames.push('Nidd I');
knames.push('Nidd II');
knames.push('Paṭis');
knames.push('Mil');
knames.push('Nett');
knames.push('Peṭ');

var ynames = []; // abhi names

ynames.push('Dhs');
ynames.push('Vibh');
ynames.push('Dhātuk');
ynames.push('Pp');
ynames.push('Kv');
ynames.push('Yam');
ynames.push('Yam 2');
ynames.push('Yam 3');
ynames.push('Paṭṭh');
ynames.push('Paṭṭh 2');
ynames.push('Paṭṭh 3');
ynames.push('Paṭṭh 4');
ynames.push('Paṭṭh 5');
ynames.push('Paṭṭh 6');

var nikvoladi = new Array();
nikvoladi['d'] = [1,2,3];
nikvoladi['m'] = [1,2,3];
nikvoladi['s'] = [1,2,3,4,5];
nikvoladi['a'] = [1,2,3,4,5,6,7,8,9,10,11];
nikvoladi['km'] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
nikvoladi['ka'] = [0,1,2,3,4,5,6,7,8,9,11,12,13,14];
nikvoladi['kt'] = [];
nikvoladi['v'] = ['Pārā','Pāci','BhīV','Mv','Cv','Pariv'];
nikvoladi['ym'] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];
nikvoladi['ya'] = [0,1,2,3,4,5,8];
nikvoladi['yt'] = [0,1,2,3,4,5,8];
nikvoladi['x'] = [1,2];
nikvoladi['b'] = ['Mūla','Ṭīkā'];
nikvoladi['gm'] = ['Mog','Kac','SPM','SDhM','PRS'];
nikvoladi['ga'] = [];
nikvoladi['gt'] = [];

function getBookName(nik, ht, no) { // nik is nikaya, ht is a hier, no will be xml no - 1


	if (nik == 'k' || nik == 'y') {
		eval('no = '+nik+'names[\''+no+'\'];');
		if(ht != 'm') no = no.replace(/([^a]) 1$/,'$1');
	}
	else no++;
	return no.toString();
}

function setBookList(nik) {
	var selectNikaya = '';
	var checkNikaya = '<table><tr><td valign="top">';
	
	if (nikvoladi[nik]) var titles = nikvoladi[nik];
	else var titles = nikvoladi[nik+hier];
	for (i = 0; i < titles.length; i++) {
		selectNikaya += '<option value="'+((nik == 'k' || nik == 'y') ? (titles[i]+1) : (i+1)) +'" '+(i==0?'selected':'')+'>'+((nik == 'k' || nik == 'y') ? eval(nik+'names['+titles[i]+']') : titles[i])+'</option>';
		if(i == Math.ceil(titles.length/2)) checkNikaya += '</td><td valign="top">';
		checkNikaya += '<input type="checkbox" id="tsoBObook'+((nik == 'k' || nik == 'y') ? (titles[i]+1) : (i+1)) +'" title="Include in search" checked> <span class="tiny">'+((nik == 'k' || nik == 'y') ? eval(nik+'names['+titles[i]+']') : (typeof(titles[i]) == 'number' ? 'Book ' : '') + titles[i])+'</span><br/>';
	}
	checkNikaya += '</td></tr></table>';
	document.getElementById('bookSel').innerHTML = selectNikaya;
	document.getElementById('tsoBO').innerHTML = checkNikaya;
	
}


var oldnikaya = 0;

function changenikaya(noget)
{
	var nik = document.form.nik.value;
	if (nik != '') 
	{
		if (hier == 't' && limitt()) { 
			alertFlash('Ṭīkā not available for '+nikname[document.form.nik.value]+'.','RGBa(255,0,0,0.8)');
			document.form.nik.selectedIndex = oldnikaya;
			return; 
		} 
		if (hier == 'a' && document.form.nik.value == 'g') {
			alertFlash('Atthakatha not available for Gram.','RGBa(255,0,0,0.8)');
			document.form.nik.selectedIndex = oldnikaya;
			return;
		}
		if (hier == 'a' && document.form.nik.value == 'b') {
			alertFlash('Atthakatha not available for Abhidh-s.','RGBa(255,0,0,0.8)');
			document.form.nik.selectedIndex = oldnikaya;
			return;
		}
		oldnikaya = document.form.nik.selectedIndex;
		
		setBookList(nik);

		if (noget) gettitles(0,1); // don't load the passage
		else gettitles(0,2);
	}
}


function createTablen()
{
	var section = document.form.section.selectedIndex + 1;
	if (section < document.form.section.options.length)
	{
		document.form.section.selectedIndex++;
		importXML();			
	}
	else 
	{
		var sutta = document.form.sutta.selectedIndex + 1;
		if (sutta < document.form.sutta.options.length)
		{
			document.form.sutta.selectedIndex++;
			gettitles(3);					
		}
		else {
			var vagga = document.form.vagga.selectedIndex + 1;
			if (vagga < document.form.vagga.options.length)
			{
				document.form.vagga.selectedIndex++;
				gettitles(4);	
			}
			else 
			{
				var volume = document.form.volume.selectedIndex + 1;
				if (volume < document.form.volume.options.length)
				{
					document.form.volume.selectedIndex++;
					gettitles(5);	
				}
				else {
					var meta = document.form.meta.selectedIndex + 1;
					if (meta < document.form.meta.options.length)
					{
						document.form.meta.selectedIndex++;
						gettitles(6);	
					}
					else
					{
						window.alert('End of Book');
						return;
					}
				}
			}
		}
	}
}

function createTablep()
{
//	alert(section + ' ' + sutta + ' ' + vagga + ' ' + volume + ' ' + meta);
	var section = document.form.section.selectedIndex - 1;
	if (section >= 0)
	{
		document.form.section.selectedIndex--;
		importXML();			
	}
	else 
	{
		var sutta = document.form.sutta.selectedIndex - 1;
		if (sutta >= 0)
		{
			document.form.sutta.selectedIndex--;
			gettitles(3,1);	
			document.form.section.selectedIndex = document.form.section.options.length - 1;
			importXML();			
		}
		else {
			var vagga = document.form.vagga.selectedIndex - 1;
			if (vagga >= 0) {
				document.form.vagga.selectedIndex--;
				gettitles(4,1);	
				document.form.sutta.selectedIndex = document.form.sutta.options.length - 1;
				gettitles(3,1);	
				document.form.section.selectedIndex = document.form.section.options.length - 1;
				importXML();
			}
			else 
			{
				var volume = document.form.volume.selectedIndex - 1;
				if (volume >= 0)
				{
					document.form.volume.selectedIndex--;
					gettitles(5,1);	
					document.form.vagga.selectedIndex = document.form.vagga.options.length - 1;
					gettitles(4,1);	
					document.form.sutta.selectedIndex = document.form.sutta.options.length - 1;
					gettitles(3,1);	
					document.form.section.selectedIndex = document.form.section.options.length - 1;
					importXML();

				}
				else {
					var meta = document.form.meta.selectedIndex - 1;
					if (meta >= 0)
					{
						document.form.meta.selectedIndex--;
						gettitles(6,1);	
						document.form.volume.selectedIndex = document.form.volume.options.length - 1;
						gettitles(5,1);	
						document.form.vagga.selectedIndex = document.form.vagga.options.length - 1;
						gettitles(4,1);	
						document.form.sutta.selectedIndex = document.form.sutta.options.length - 1;
						gettitles(3,1);	
						document.form.section.selectedIndex = document.form.section.options.length - 1;
						importXML();
					}
					else
					{
						window.alert('Beginning of Book');
					}
				}
			}
		}
	}

}

function transLink(which,auth,url,title) {
	if(which == 0) {
		if(auth == 'Anandajoti') {
			var images = 'images/abt.gif';
			var imaget = 'Translations courtesy of http://www.ancient-buddhist-texts.net/';
			var imageu = 'http://www.ancient-buddhist-texts.net/';
		}
		return (auth == 'Anandajoti' ? '&nbsp;<img width="16" style="vertical-align:middle" src="'+images+'" title="'+imaget+'" onclick="window.open(\''+imageu+'\')">&nbsp;' : '') + '<span class="abut obut tiny" onclick="window.open(\''+url+'\');" title="'+title+'">'+auth+'</span>';
	}
	return '&nbsp;<span class="hoverShow"><img width="16" style="vertical-align:middle" src="' + (auth == 'Anandajoti' ? 'images/abt.gif' : 'images/ati.ico') +'" title="'+title+'" onclick="window.open(\''+url+'\')"></span>';
}

function addtrans(which,nikaya,book,meta,volume,vagga,sutta,section) {
	if (cfg["ctrans"] != "checked" || typeof(atiD) == 'undefined') return;
	
	var atiurl = (cfg['catioff'] == 'checked' ? 'file://'+getHomePath().replace(/\\/g, '/')+'/'+cfg['catiloc']+'/html/' : 'http://www.accesstoinsight.org/');
	
	var cnt = 0;
	var output = [];
	var a,b,c,d,e,j,k,l,m,w,x,y,z;
	
	var autha = [];
	autha['amar'] = "Amaravati";
	autha['bodh'] = "Bodhi";
	autha['bpit'] = "Burma&nbsp;Pitaka&nbsp;Assoc.";
	autha['budd'] = "Buddharakkhita";
	autha['harv'] = "Harvey";
	autha['hekh'] = "Hecker&nbsp;and&nbsp;Khema";
	autha['horn'] = "Horner";
	autha['irel'] = "Ireland";
	autha['kell'] = "Kelly";
	autha['khan'] = "Khantipalo";
	autha['ksw0'] = "Kelly,&nbsp;et&nbsp;al";
	autha['kuma'] = "Kumara";
	autha['mend'] = "Mendis";
	autha['nana'] = "Ñanananda";
	autha['nara'] = "Narada";
	autha['norm'] = "Norman";
	autha['ntbb'] = "Ñanamoli&nbsp;&&nbsp;Bodhi";
	autha['nymo'] = "Ñanamoli";
	autha['nypo'] = "Nyanaponika";
	autha['nysa'] = "Nyanasatta";
	autha['olen'] = "Olendzki";
	autha['piya'] = "Piyadassi";
	autha['rhyc'] = "C.&nbsp;Rhys-Davids";
	autha['soma'] = "Soma";
	autha['soni'] = "Soni";
	autha['than'] = "Thanissaro";
	autha['vaji'] = "Vajira&nbsp;&&nbsp;Story";
	autha['vaka'] = "Ñanavara&nbsp;and&nbsp;Kantasilo";
	autha['wlsh'] = "Walshe";
	autha['wood'] = "Woodward";
	autha['yaho'] = "Yahoo!&nbsp;Pali";

	switch (nikaya) {
		case 'v':
			switch (book) {
				case 3:
					if (which == 3 && vagga == 0) {
						var surl = 'index.htm';
						var ssect = '';
					}
					else if (which == 0){
						switch (section) {
							case 0:
								var surl="01-Awakening-Tree.htm";
								break;
							case 1:
								var surl="02-Grumbling-Brahmana.htm";
								break;
							case 2:
								var surl="03-Mucalinda.htm";
								break;
							case 3:
								var surl="04-Tapussa-Bhallika.htm";
								break;
							case 4:
								var surl="05-Brahmas-Request.htm";
								break;
							case 5:
								var surl="06-Deciding.htm";
								break;
							case 6:
								var surl="12-Yasas-Going-Forth.htm";
								break;
							case 7:
								var surl="17-Mara.htm";
								break;
							case 8:
								var surl="18-Ordination-Three-Refuges.htm";
								break;
							case 9:
								var surl="19-Second-Mara.htm";
								break;
							case 10:
								var surl="20-Good-Group.htm";
								break;
							case 11:
								var surl="21-First-Miracle-Prose.htm";
								break;
							case 12:
								var surl="39-King-Bimbisara.htm";
								break;
							case 13:
								var surl="41-Sariputta-Moggallana.htm";
								break;
							case 14:
								var surl="42-Sons.htm";
								break;
						}
					}
					if (surl) {	
						output.push(transLink(which,'Anandajoti','http://www.ancient-buddhist-texts.net/Texts-and-Translations/Mahakhandhako/'+surl,'Translation of Mahakhandhako by Anandajoti'));
						cnt++; 
					}
					break;			
				break;
			}
		break;
		case 'd':
			if (which == 1) return null;
			switch (book) {
				case 0:
					book = 1;
					break;
				case 1:
					book = 14;
					break;
				case 2:
					book = 24;
					break;
			}
			var mysn = book+vagga;
			mys = mysn + "";
			if (mys.length < 2) { mys = '0'+mys; }
			var atid = 'dn/dn.'+mys;
			for (var x = 0;x < atiD.length; x++) {
				if (atiD[x].indexOf(atid)==0) {
					var auth = atiD[x].split('.')[3];
					if (autha[auth]) {auth = autha[auth];}
					output.push(transLink(which,auth,atiurl+'tipitaka/'+atiD[x],'Translation of DN '+mysn+' by '+auth));
					cnt++;
				}
			}
			if (mysn == 16) {
				if (which > 0) {
						var surl = 'index.htm';
						var ssect = '';
					}
				else {
					var ssect = '.' + (section+1);
					switch (section) {
						case 0: case 1:
							var surl = '01-King-Ajatasattu.htm';
							break;
						case 2:
							var surl = '02-Prevent-Vajji-Decline.htm';
							break;
						case 3:
							var surl = '03-Prevent-Community-Decline-1.htm\'); window.open(\'http://www.ancient-buddhist-texts.net/Texts-and-Translations/Mahaparinibbanasuttam/04-Prevent-Community-Decline-2.htm\'); window.open(\'http://www.ancient-buddhist-texts.net/Texts-and-Translations/Mahaparinibbanasuttam/05-Prevent-Community-Decline-3.htm\'); window.open(\'http://www.ancient-buddhist-texts.net/Texts-and-Translations/Mahaparinibbanasuttam/06-Prevent-Community-Decline-4.htm\'); window.open(\'http://www.ancient-buddhist-texts.net/Texts-and-Translations/Mahaparinibbanasuttam/07-Prevent-Community-Decline-5.htm\'); window.open(\'http://www.ancient-buddhist-texts.net/Texts-and-Translations/Mahaparinibbanasuttam/08-Prevent-Community-Decline-6.htm\'); window.open(\'http://www.ancient-buddhist-texts.net/Texts-and-Translations/Mahaparinibbanasuttam/09-Ambalatthika.htm';
							break;
						case 4:
							var surl = '10-Sariputta.htm';
							break;
						case 5:
							var surl = '11-Virtue.htm';
							break;
						case 6:
							var surl = '11-Virtue.htm';
							break;
						case 7:
							var surl = '12-Building.htm';
							break;
						case 8:
							var surl = '13-Truths.htm';
							break;
						case 9:
							var surl = '14-Mirror.htm';
							break;
						case 10:
							var surl = '14-Mirror.htm\'); window.open(\'http://www.ancient-buddhist-texts.net/Texts-and-Translations/Mahaparinibbanasuttam/15-Ambapali.htm';
							break;
						case 11:
							var surl = '15-Ambapali.htm';
							break;
						case 12:
							var surl = '16-Sickness.htm';
							break;
						case 13:
							var surl = '17-Ananda\'s-Failure.htm';
							break;
						case 14: case 15:
							var surl = '18-Relinquishment.htm';
							break;
						case 16:
							var surl = '19-Earthquakes.htm';
							break;
						case 17:
							var surl = '20-Assemblies.htm';
							break;
						case 18:
							var surl = '21-Mind-Mastery.htm';
							break;
						case 19:
							var surl = '22-Liberations.htm\'); window.open(\'http://www.ancient-buddhist-texts.net/Texts-and-Translations/Mahaparinibbanasuttam/23-Ananda\\\'s-Fault.htm';
							break;
						case 20:
							var surl = '23-Ananda\\\'s-Fault.htm\'); window.open(\'http://www.ancient-buddhist-texts.net/Texts-and-Translations/Mahaparinibbanasuttam/24-Ananda-at-Rajagaha.htm\'); window.open(\'http://www.ancient-buddhist-texts.net/Texts-and-Translations/Mahaparinibbanasuttam/25-Ananda-at-Vesali.htm\'); window.open(\'http://www.ancient-buddhist-texts.net/Texts-and-Translations/Mahaparinibbanasuttam/26-Thirty-Seven-Things.htm';
							break;
						case 21:
							var surl = '27-Noble-Things.htm';
							break;
						case 22:
							var surl = '28-References.htm';
							break;
						case 23:
							var surl = '29-Last-Meal.htm';
							break;
						case 24:
							var surl = '30-Drinking-Water.htm';
							break;
						case 25:
							var surl = '31-Pukkusa.htm\'); window.open(\'http://www.ancient-buddhist-texts.net/Texts-and-Translations/Mahaparinibbanasuttam/32-Cunda.htm';
							break;
						case 26:
							var surl = '33-Worshipping.htm';
							break;
						case 27:
							var surl = '34-Divinities.htm';
							break;
						case 28: case 29: case 30:
							var surl = '35-Four-Places.htm';
							break;
						case 31:
							var surl = '36-Ananda\\\'s-Qualities.htm';
							break;
						case 32:
							var surl = '37-Kusinara.htm';
							break;
						case 33:
							var surl = '38-Mallas.htm';
							break;
						case 34:
							var surl = '39-Subhadda.htm';
							break;
						case 35:
							var surl = '40-Last-Instructions.htm';
							break;
						case 36: 
							var surl = '41-Final-Emancipation.htm\'); window.open(\'http://www.ancient-buddhist-texts.net/Texts-and-Translations/Mahaparinibbanasuttam/42-Preperation-of-Body.htm';
							break;
						case 37:
							var surl = '42-Preperation-of-Body.htm';
							break;
						case 38:
							var surl = '43-Mahakassapa.htm';
							break;
						case 39: case 40:
							var surl = '44-Distribution.htm';
							break;
					}
				}
				output.push(transLink(which,'Anandajoti','http://www.ancient-buddhist-texts.net/Texts-and-Translations/Mahaparinibbanasuttam/'+surl,'Translation of DN 16'+ssect+' by Anandajoti'));
				cnt++;
			}
			if (mysn == 22) {
				if (which > 0) {
						var surl = 'index.htm';
						var ssect = '';
					}
				else {
					var ssect = '.' + (section+1);
					var surl = 'Satipatthana-';
					var sect0;
					switch (true) {
						case (section <= 6):
							sect0 = '0' + (section+1);
							break;
						case (section > 6):
							sect0 = section + 9;
							break;
					}
					surl += sect0 + '.htm'; 
				}
				output.push(transLink(which,'Anandajoti','http://www.ancient-buddhist-texts.net/Texts-and-Translations/Satipatthana/'+surl,'Translation of DN 22'+ssect+' by Anandajoti'));
				cnt++;
			}
			break;
		case 'm':
			if (which == 3 || which == 1) return null;
			var mysn = ((book)*50)+(vagga*10)+(sutta+1)
			if (mysn > 141 && vagga == 4) mysn += 2;
			mys = mysn + "";
			while (mys.length < 3) { mys = '0'+mys; }
			var atim = 'mn/mn.'+mys;
			for (var x = 0;x < atiM.length; x++) {
				var auth = atiM[x].split('.')[2];
				if (autha[auth]) {auth = autha[auth];}
				if (atiM[x].indexOf(atim)==0) {
					output.push(transLink(which,auth,atiurl+'tipitaka/'+atiM[x],'Translation of MN '+mysn+' by '+auth));
					cnt++;
				}
			}
		break;
		case 'a':
			var bookn = book+1;
			if (which > 1) return null;
			if (!section) section = 0;
			//document.getElementById('difb').innerHTML+=book+' ' +vagga+' ' +sutta+' ' +section+' <br>';
			var z = amlist[book][vagga][sutta][section];
			out:
			for (a = 0;a < atiA.length; a++) {
				if(parseInt(atiA[a].split('/')[1].substring(2),10) == bookn) {
					var atiAs = atiA[a].split('.');
					if(atiAs[1].indexOf('-')>=0) b=atiAs[1].split('-');
					else {b=null;}
					for (var aa = 0;aa < z.length; aa++) {
						
						var bb = z[aa];
						
						var atiNo = atiAs[1];
						
						c=parseInt(bb,10);
						d=''+bb;
						while (d.length < 3) { d = '0'+d; }

						// fudges
						
						if (bookn == 3) {
							atiNo = parseInt(atiNo,10);
							if(atiNo >= 48) { // asankhata sutta
								atiNo++; 
							} 
							if (atiNo >= 81) { // gadrabha sutta
								atiNo++; 
							} 
							if (atiNo == 102 && atiAs[2] == '11-15' || atiNo > 102) { // nimitta sutta
								atiNo++; 
							}

							atiNo = atiNo+'';
							while(atiNo.length < 3) { atiNo='0'+atiNo; }
						}
						else if (bookn == 4) {
							atiNo = parseInt(atiNo,10);
							atiNo = atiNo+'';
							while(atiNo.length < 3) { atiNo='0'+atiNo; }
						}
						else if (bookn == 7) {
							atiNo = parseInt(atiNo,10);
							if(atiNo >= 31) { // parābhava sutta
								atiNo++; 
							} 
							if(atiNo >= 41) { // paṭhamaniddasasuttaṃ
								atiNo++; 
							} 
							if(atiNo >= 42) { // dutiyaniddasasuttaṃ 
								atiNo++; 
							} 
							if (atiNo == 62 && atiAs[2] == 'b' || atiNo > 62) { // bhariyā sutta
								atiNo++; 
							}

							atiNo = atiNo+'';
							while(atiNo.length < 3) { atiNo='0'+atiNo; }
						}
						else if (bookn == 11) {
							atiNo = parseInt(atiNo,10);
							if(atiNo == 7 || atiNo == 8) { // saññāsutta - DPR has both in one sutta, ATI (PTS) split them
								atiNo = 7;
							} 
							if(atiNo > 8) { // saññāsutta
								atiNo--;
							} 

							atiNo = atiNo+'';
							while(atiNo.length < 3) { atiNo='0'+atiNo; }
						}
						
						if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || (!b && atiNo.indexOf(d)==0)) {
							if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
							else {var sno = c;}
							if(atiAs[4] == 'html') { var auth = atiAs[3]; }
							else { var auth = atiAs[2]; }
							if (autha[auth]) {auth = autha[auth];}
							output.push(transLink(which,auth,atiurl+'tipitaka/'+atiA[a],'Translation of AN '+ (book+1) +'.'+bb+' by '+auth));
							cnt++;
							continue out;
						}
					}
				}
			}		
		break;
		case 's':
			if (which > 1) return null;

			var bookn = book+1;
			
			
			if (bookn > 1) {vagga+=11;}
			if (bookn > 2) {vagga+=10;}
			if (bookn > 3) {vagga+=13;}
			if (bookn > 4) {vagga+=10;}
			var countc = smlist[vagga][sutta][section];
			
			//if(bookn == 5) document.getElementById('mafbc').innerHTML += vagga+' '+sutta+'|';
			
			//document.getElementById('difb').innerHTML += countc;

			out:
			for (a = 0;a < atiS.length; a++) {
				if(parseInt(atiS[a].split('/')[1].substring(2),10) == (vagga+1)) {
					if(atiS[a].split('.')[1].indexOf('-')>=0) b=atiS[a].split('.')[1].split('-');
					else {b=null;}
					var bb = countc;
					c=parseInt(bb,10);
					d=bb+"";
					while (d.length < 3) { d = '0'+d; }
					if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || (!b && atiS[a].split('.')[1].indexOf(d)==0)) {
						if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
						else {var sno = c;}
						var auth = atiS[a].split('.')[2];
						if (autha[auth]) {auth = autha[auth];}
						output.push(transLink(which,auth,atiurl+'tipitaka/'+atiS[a],'Translation of SN '+ (book+1) +'.'+bb+' by '+auth));
						cnt++;
						continue out;
					}
				}
			}		
		break;
		case 'k':
			if (which > 0) return null;
			var bookn = book+1;
			
			switch (bookn) {
				case 1: // kp
				// kn/khp/khp.1-9.than.html
					out:
					for (a = 0;a < atiK.length; a++) {
						if(atiK[a].split('/')[1] == 'khp') {
							if(atiK[a].split('.')[1].indexOf('-')>=0) b=atiK[a].split('.')[1].split('-');
							else {b=null;}
							c=section+1;
							if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || (!b && atiK[a].split('.')[1].indexOf(c)==0)) {
								if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
								else {var sno = c;}
								var auth = atiK[a].split('.')[2];
								if (autha[auth]) {auth = autha[auth];}
								output.push(transLink(which,auth,atiurl+'tipitaka/'+atiK[a],'Translation of Khp '+sno+' by '+auth));
								cnt++;
								continue out;
							}
						}
					}
					output.push(transLink(which,'Anandajoti','http://www.ancient-buddhist-texts.net/Texts-and-Translations/Khuddakapatha/Khuddakapatha.htm','Translation of KhP by Anandajoti'));
					cnt++;		 
				break;
				case 2: // dhp
				// kn/dhp/dhp.24.budd.html
					//alert(vagga + ' ' + sutta + ' ' + section);
					out:
					for (a = 0;a < atiK.length; a++) {
						if(atiK[a].split('/')[1] == 'dhp') {
							d=(vagga+1)+"";
							if (d.length < 2) { d = '0'+d; }
							if(atiK[a].split('.')[1].indexOf(d)==0) {
								var sno = vagga+1;
								var auth = atiK[a].split('.')[2];
								if (autha[auth]) {auth = autha[auth];}
								output.push(transLink(which,auth,atiurl+'tipitaka/'+atiK[a],'Translation of Dhp '+sno+' by '+auth));
								cnt++;
								continue out;
							}
						}
					}
				break;
				case 3: // uda
					// kn/ud/ud.2.01.irel.html
					out:
					for (a = 0;a < atiK.length; a++) {
						if(atiK[a].split('/')[1] == 'ud' && (vagga+1) == atiK[a].split('.')[1]) {
							if(atiK[a].split('.')[2].indexOf('-')>=0) {b=atiK[a].split('.')[2].split('-');}
							else {b=null;}
							c=section+1;
							d=c+"";
							if (d.length < 2) { d = '0'+d; }
							if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || (!b && atiK[a].split('.')[2].indexOf(d)==0)) {
								if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
								else {var sno = c;}
								var auth = atiK[a].split('.')[3];
								if (autha[auth]) {auth = autha[auth];}
								if (atiK[a] == 'kn/ud/ud.6.09.olen.html') { atiK[a] = 'kn/ud/ud.6.09-olen.html';}
								output.push(transLink(which,auth,atiurl+'tipitaka/'+atiK[a],'Translation of Uda '+(vagga+1)+'.'+sno+' by '+auth));
								cnt++;
								continue out;
							}
						}
					}
					
					// Anandajoti
					
					if (which > 0) {
							var surl = 'index.htm';
							var ssect = '';
						}
					else {
						var ssect = (vagga+1) + '.' + (section+1);
						switch (vagga) {
							case 0:
							var surl = '1-Bodhivaggo-';
							break;
							case 1:
							var surl = '2-Mucalindavaggo-';
							break;
							case 2:
							var surl = '3-Nandavaggo-';
							break;
							case 3:
							var surl = '4-Meghiyavaggo-';
							break;
							case 4:
							var surl = '5-Sonavaggo-';
							break;
							case 5:
							var surl = '6-Jaccandhavaggo-';
							break;
							case 6:
							var surl = '7-Cullavaggo-';
							break;
							case 7:
							var surl = '8-Pataligamiyavaggo-';
							break;
						}
						var sect0 = (section+1);
						if (sect0 < 10) { sect0 = '0'+sect0; }
						surl += sect0 + '.htm';
					}
					output.push(transLink(which,'Anandajoti','http://www.ancient-buddhist-texts.net/Texts-and-Translations/Udana/'+surl,'Translation of Udana '+ssect+' by Anandajoti'));
					cnt++;		 
				break;
				case 4: // iti
					// kn/iti/iti.1.001-027.than.html
					section += (sutta*10);
					switch (vagga) {
						case 1:
							section += 27;
							break;
						case 2:
							section += 49;
							break;
						case 3:
							section += 99;
							break;
					}
					out:
					for (a = 0;a < atiK.length; a++) {
						if(atiK[a].split('/')[1] == 'iti' && (vagga+1) == atiK[a].split('.')[1]) {
							if(atiK[a].split('.')[2].indexOf('-')>=0) {b=atiK[a].split('.')[2].split('-');}
							else {b=null;}
							c=section+1;
							d=c+"";
							if (d.length < 3) { d = '0'+d; }
							if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || (!b && atiK[a].split('.')[2].indexOf(d)==0)) {
								if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
								else {var sno = c;}
								var auth = atiK[a].split('.')[3];
								if (autha[auth]) {auth = autha[auth];}
								output.push(transLink(which,auth,atiurl+'tipitaka/'+atiK[a],'Translation of Iti '+sno+' by '+auth));
								cnt++;
								continue out;
							}
						}
					}
				break;
				case 5: // sn
					// kn/snp/snp.4.16.than.html
					//alert(meta + ' ' + volume + ' ' + vagga + ' ' + sutta + ' ' + section);
					if (vagga == 4) section--;
					
					out:
					for (a = 0;a < atiK.length; a++) {
						if(atiK[a].split('/')[1] == 'snp' && (vagga+1) == atiK[a].split('.')[1]) {
							if(atiK[a].split('.')[2].indexOf('-')>=0) b=atiK[a].split('.')[2].split('-');
							else {b=null;}
							c=section+1;
							d=c+"";
							if (d.length < 2) { d = '0'+d; }
							if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || (!b && atiK[a].split('.')[2].indexOf(d)==0)) {
								if (b) {var sno = b[0].replace(/^0/g,'') +"-"+ b[1].replace(/^0/g,'');}
								else {var sno = c;}
								var auth = atiK[a].split('.')[3];
								if (autha[auth]) {auth = autha[auth];}
								output.push(transLink(which,auth,atiurl+'tipitaka/'+atiK[a],'Translation of Sn '+(vagga+1)+'.'+sno+' by '+auth));
								cnt++;
								continue out;
							}
						}
					}
					if (vagga == 4) {
						output.push(transLink(which,'Anandajoti','http://www.ancient-buddhist-texts.net/Texts-and-Translations/Parayanavagga/index.htm','Translation of Sn 5 by Anandajoti'));
						cnt++;
					}
				break;
				case 6: // Vv
					// kn/ud/ud.2.01.irel.html
					if (vagga == 1) {sutta +=4;}
					out:
					for (a = 0;a < atiK.length; a++) {
						if(atiK[a].split('/')[1] == 'vv' && (sutta+1) == atiK[a].split('.')[1]) {
							if(atiK[a].split('.')[2].indexOf('-')>=0) {b=atiK[a].split('.')[2].split('-');}
							else {b=null;}
							c=section+1;
							d=c+"";
							if (d.length < 2) { d = '0'+d; }
							if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || (!b && atiK[a].split('.')[2].indexOf(d)==0)) {
								if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
								else {var sno = c;}
								var auth = atiK[a].split('.')[3];
								if (autha[auth]) {auth = autha[auth];}
								if (atiK[a] == 'kn/ud/ud.6.09.olen.html') { atiK[a] = 'kn/ud/ud.6.09-olen.html';}
								output.push(transLink(which,auth,atiurl+'tipitaka/'+atiK[a],'Translation of Vv '+(sutta+1)+'.'+sno+' by '+auth));
								cnt++;
								continue out;
							}
						}
					}
				break;
				case 7: // Pv
					// kn/ud/ud.2.01.irel.html
					out:
					for (a = 0;a < atiK.length; a++) {
						if(atiK[a].split('/')[1] == 'pv' && (vagga+1) == atiK[a].split('.')[1]) {
							if(atiK[a].split('.')[2].indexOf('-')>=0) {b=atiK[a].split('.')[2].split('-');}
							else {b=null;}
							c=section+1;
							d=c+"";
							if (d.length < 2) { d = '0'+d; }
							if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || (!b && atiK[a].split('.')[2].indexOf(d)==0)) {
								if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
								else {var sno = c;}
								var auth = atiK[a].split('.')[3];
								if (autha[auth]) {auth = autha[auth];}
								if (atiK[a] == 'kn/ud/ud.6.09.olen.html') { atiK[a] = 'kn/ud/ud.6.09-olen.html';}
								output.push(transLink(which,auth,atiurl+'tipitaka/'+atiK[a],'Translation of Pv '+(vagga+1)+'.'+sno+' by '+auth));
								cnt++;
								continue out;
							}
						}
					}
				break;
				case 8: // Tha
					// kn/ud/ud.2.01.irel.html
					section += (sutta*10);
					//alert(vagga + ' ' + sutta + ' ' + section);
					out:
					for (a = 0;a < atiK.length; a++) {
						if(atiK[a].split('/')[1] == 'thag' && vagga == atiK[a].split('.')[1]) {
							if(atiK[a].split('.')[2].indexOf('-')>=0) {b=atiK[a].split('.')[2].split('-');}
							else {b=null;}
							c=section+1;
							d=c+"";
							if (d.length < 2) { d = '0'+d; }
							if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || (!b && atiK[a].split('.')[2].indexOf(d)==0)) {
								if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
								else {var sno = c;}
								var auth = atiK[a].split('.')[3];
								if (autha[auth]) {auth = autha[auth];}
								if (atiK[a] == 'kn/ud/ud.6.09.olen.html') { atiK[a] = 'kn/ud/ud.6.09-olen.html';}
								output.push(transLink(which,auth,atiurl+'tipitaka/'+atiK[a],'Translation of Thag '+vagga+'.'+sno+' by '+auth));
								cnt++;
								continue out;
							}
						}
					}
				break;
				case 9: // Thi
					// kn/ud/ud.2.01.irel.html
					//alert(vagga + ' ' + sutta + ' ' + section);
					out:
					for (a = 0;a < atiK.length; a++) {
						if(atiK[a].split('/')[1] == 'thig' && (vagga+1) == atiK[a].split('.')[1]) {
							if(atiK[a].split('.')[2].indexOf('-')>=0) {b=atiK[a].split('.')[2].split('-');}
							else {b=null;}
							c=section+1;
							d=c+"";
							if (d.length < 2) { d = '0'+d; }
							if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || (!b && atiK[a].split('.')[2].indexOf(d)==0)) {
								if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
								else {var sno = c;}
								var auth = atiK[a].split('.')[3];
								if (autha[auth]) {auth = autha[auth];}
								if (atiK[a] == 'kn/ud/ud.6.09.olen.html') { atiK[a] = 'kn/ud/ud.6.09-olen.html';}
								output.push(transLink(which,auth,atiurl+'tipitaka/'+atiK[a],'Translation of Thig '+(vagga+1)+'.'+sno+' by '+auth));
								cnt++;
								continue out;
							}
						}
					}
				break;
				case 16: // MNi
				break;
				case 19: // Mil
				break;
			}
		break;
	}
	if (cnt > 0) { return output; }
}


function xmlrefer()
{
	var nik = document.form.nik.selectedIndex;
	var book = document.form.book.selectedIndex;
	var sutta = document.form.sutta.selectedIndex;
	var sect = document.form.section.selectedIndex;
	var ref = '<xml>' + nik + ',' + book + ',' + sutta + ',' + sect + '</xml>'
	document.form.xmlref.value = ref;
}

function limitt() {
	if (document.form.nik.selectedIndex == 5 || document.form.nik.selectedIndex > 6) { return true; }
	else { return false };
}

var hNumbers = [];
hNumbers['m'] = 0;
hNumbers['a'] = 1;
hNumbers['t'] = 2;
var hTitle = ['Mūla', 'Aṭṭhakathā', 'Ṭīkā'];

var hLetters = ['m','a','t'];


function switchhier(htmp,stop) {

	if(hier == htmp) return;
	
	var himg = ['l','m','r'];
		

	if (htmp == 't' && limitt()) { 
		alertFlash('Ṭīkā not available for ' + nikname[document.form.nik.value]+'.','RGBa(255,0,0,0.8)');
		return; 
	}
	if (htmp == 'a' && document.form.nik.selectedIndex > 7) {
		alertFlash('Aṭṭhakathā not available for ' + nikname[document.form.nik.value]+'.','RGBa(255,0,0,0.8)');
		return;
	}
	if (document.form.nik.value == 'k' && htmp == 'a' && kudvala[document.form.book.value] == undefined) {
			alertFlash(hTitle[hNumbers[htmp]] + ' not available for '+getBookName(document.form.nik.value,htmp,document.form.book.selectedIndex)+'.','RGBa(255,0,0,0.8)');
		return;
	}

	hier = htmp;

	// style

	ha = hLetters;

	for(i=0; i<ha.length; i++) {
		if (ha[i] == htmp) {
			document.getElementById('dhier'+ha[i]).title = 'Currently viewing '+hTitle[i];

			document.getElementById('dhier'+ha[i]).className = 'abut sbut '+himg[i]+'but';
		}
		else {
			document.getElementById('dhier'+ha[i]).title = 'Change to '+hTitle[i];
			document.getElementById('dhier'+ha[i]).className = 'abut '+himg[i]+'but';
		}
	}

	if (document.form.nik.value == 'k') {
		var book = document.form.book.value;
		if (htmp == 'm') {
			book = parseInt(book) - 1;
			changenikaya(1);
			document.form.book.selectedIndex = book;
		}
		else {
			book = kudvala[book];
			changenikaya(1);
			document.form.book.selectedIndex = book;
		}
	}
	else if (document.form.nik.value == 'y') {
		var book = document.form.book.value;
		if (htmp == 'm') {
			book = parseInt(book) - 1;
			changenikaya(1);
			document.form.book.selectedIndex = book;
		}
		else {
			book = abhivala[book];
			changenikaya(1);
			document.form.book.selectedIndex = book;
		}
	}
	gettitles(0,stop);
}	

function historyBox() {
	
	// history
	
	var hout = '';
	var theHistory = getHistory();
	if (theHistory) {
		hout = '<a style="visibility:hidden">x&nbsp;</a><select title="History" onchange="var thisv = this.options[this.selectedIndex].value.replace(/\'/g,\'\').split(\',\'); if (thisv != \'0\'){ getplace(thisv); importXML() }">';
		hout += '<option value="0">History</option>';
		var isclear = '';
		for (i in theHistory) {
			var thist = theHistory[i].split('@');
			var thist0 = toUni(thist[0]);
			if (thist0.length > (maxlength - 3)) thist0 = thist0.substring(0,(maxlength-3)) + '...';
			hout += '<option value="'+thist[1]+'">' + thist0  + '</option>';
		}
		hout += '</select>&nbsp;<span class="abut obut tiny" title="Clear History" onclick="clearHistory(1);">x</span>';
	}
		
	document.getElementById('history').innerHTML = hout;
	
}

var pleasewait =  document.createElement('div');
pleasewait.setAttribute('align','center');
pleasewait.innerHTML = '<br><br><br><br><h1><img src="images/ajax-loader.gif" /> please wait...</h1>';

function getSuttaNumber(nik,book,meta,volume,vagga,sutta,section,sectlength) { // book, vagga, sutta should be -1 (0,1,2...)
	
	var no;
	
	switch (nik) {
		case 'd':
			no = vagga + 1;
			switch (true) {
				case (book == 2):
					no += 10;
				case (book > 0):
					no += 13;
				break;
			}
			if(sectlength > 1) no += '.' + (section+1)
		break;
		case 'm':
			no = (sutta + 1) + (book*50) + (vagga*10);
			if (book == 2 && vagga == 4) no += 2;
			if(sectlength > 1) no += '.' + (section+1)
		break;
		case 'a':
			if(hier != 'm') return;
			no = (book+1) + '.' + amlist[book][vagga][sutta][section][0] + (amlist[book][vagga][sutta][section].length > 1 ? '-' + amlist[book][vagga][sutta][section][amlist[book][vagga][sutta][section].length-1]:'');
		break;
		case 's':
			if(hier != 'm') return;
			no = (book+1) + '.' + smlist[vagga][sutta][section];
		break;
	}
	return no;
}

function getDppnEntry(term) {
	var dppnEntry = [];
	if(typeof(nameda[term]) == 'object') {
		dppnEntry = nameda[term];
	}
	else {
		if(typeof(nameda[term.replace(/\.m$/,'')]) == 'object') {
			dppnEntry = nameda[term.replace(/\.m$/,'')];
		}
		else if(typeof(nameda[term.replace(/o$/,'a')]) == 'object') {
			dppnEntry = nameda[term.replace(/o$/,'a')];
		}
	}
	var dEI = [];
	if(dppnEntry.length > 0) {
		for(d in dppnEntry) {
			dEI.push(dppnEntry[d]);
		}
	}
	return dEI;
}

function permalinkClick(link,url) {
	copyToClipboard(link);
	if(url) {
		try {
			window.history.replaceState('Object', 'Title', link);
		}
		catch(ex) {
		}
	}
	alertFlash("Permalink copied to clipboard.",'RGBa(0,255,0,0.8)');
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
			color = 'RGBa(255,0,0,0.8)';
			break;
			case 'green':
			color = 'RGBa(0,255,0,0.8)';
			break;
			case 'yellow':
			color = 'RGBa(255,255,0,0.8)';
			break;
		}
		document.getElementById('alert').style.backgroundColor = color;
	
	}
	document.getElementById('alert').innerHTML = text;
	document.getElementById('alert').style.opacity = '0';
	document.getElementById('alert').style.display='block';
	fadeInOut(G_alertFlashStart,'alert',10,Math.sqrt(text.length)*500,100);
}

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


function getLinkPlace() {

	var options = document.location.href.split('?')[1].split('#')[0].split('&');

	var place = null;
	var para = null;
	var query = null;
	
	// parse options
	if(/^thai/.exec(options[0])) {
		DgetThaiBook(options[0].split('=')[1]);
		return;
	}
	
	for (i in options) {

		var option = options[i].split('=');
		if (option.length == 1 || option[0] == 'loc') {
			place = (option[1] ? option[1]: option[0]);
			if (place.search(/[^a-z0-9.]/) > -1) return;
			
			place = place.split('.');

			place[0] = niknumber[place[0]];

			if (place.length == 8) getplace(place);
		}
		else if (option[0] == 'index')	{
			var index = option[1].split('.');
			if (index.length == 2) {
				getplace([index[0],parseInt(index[1]),0,0,0,0,0,index[2]]);
			}
			importXMLindex();
			
		}
		else if (option[0] == 'para') para = parseInt(option[1])-1;
		else if (option[0] == 'query') query = option[1].replace(/_/g,' ').split('+');
	}
	if(!place) return;
	importXML(query,para);
}

function onDocLoad() {
	if(document.location.href.indexOf('?') > -1) getLinkPlace();		
}
