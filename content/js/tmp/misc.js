function preout(data,which) // calls text prep, then outputs it to preFrame
{

	lastcolour = 0; // reset colour changing

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
			if (transin[0].charAt(0) != '&') transout += '<img style="vertical-align:middle" src="'+atiurl+'favicon.ico" title="Translations courtesy of http://www.accesstoinsight.org/" onclick="window.open(\'http://www.accesstoinsight.org/\')">&nbsp;';
			transout += transin.join('');
			document.getElementById('maftrans').innerHTML += transout; 
		}
	}
	
	//document.textpad.pad.value = inarray[0];
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
	data = data.replace(/[”"]nti/g, '.m” ”ti');
	data = data.replace(/['’]+nti/g, '.m’ ’ti');
	data = data.replace(/\^b\^/g, '<@>');
	data = data.replace(/\^eb\^/g, '</@>');
	data = data.replace(/["]+<\/@>nti/g, '.m”</@> ”ti');
	data = data.replace(/['’]+<\/@>nti/g, '.m’</@> ’ti');
	data = data.replace(/["]+<\/@>ti/g, '”</@> ”ti');
	data = data.replace(/['’]+<\/@>ti/g, '’</@> ’ti');
	data = data.replace(/\^a\^\"/g, ' z');
	data = data.replace(/\"\^ea\^/g, 'z ');
	data = data.replace(/\^a\^/g, ' z');
	data = data.replace(/\^ea\^/g, 'z ');
	//data = data.replace(/\^v/g, '');
	//data = data.replace(/v\^/g, '');
	data = data.replace(/\}/g, '} ');
	data = data.replace(/   */g, ' ');
	var uniouta = replaceunistandard(data).replace(/[”’] ([”’])/g, " $1").split(' ');

	//data = data.replace(/\"/g, '\u00B4');
	//document.textpad.pad.value = data;
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
				altplus = translit(replaceunistandard(altplus));
				altplus = altplus.replace(/0/g, '.');
				finout += ' <a href="javascript:void(0)" class="tiny" style="color:'+colorcfg['grey']+'" title="' + altplus + '">VAR</a>' + space;
			}
			else altplus += wb + ' ';
		}
		else if (wb.charAt(0) == '{') {
			if (wb.charAt(wb.length-1) == '}') { 
				altplus = wb.substring(1,wb.length-1) + ' ';
				altplus = translit(replaceunistandard(altplus));
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
						finout += translit(replaceunistandard(wb.substring(0,cp))); b++;
					}
					else {
						fullwordout[0] = wb.substring(0,cp).replace(/"/g, 'x').replace(/<[^>]*>/g, '');
						fullwordout[1] = translit(replaceunistandard(wb.substring(0,cp)));
					}
					convout += wb.substring(0,cp).replace(/<[^>]*>/g, '');
				}

				var cno = wb.substring(cp,cp+4); // <c1>
				
				wb = wb.substring(cp+4);
				
				var cm = wb.search('<xc>');

				if (which) {  
					finout += cno + translit(replaceunistandard(wb.substring(0,cm)))+'<xc>'; b++;
				}
				else {
					fullwordout[0] += wb.substring(0,cm).replace(/"/g, 'x').replace(/<[^>]*>/g, '');
					fullwordout[1] += cno + translit(replaceunistandard(wb.substring(0,cm))) + '<xc>';
				}

				convout += wb.substring(0,cm).replace(/<[^>]*>/g, '');

				wb = wb.substring(cm+4);
			}
			if(wb.length > 0) { // anything left?
				if (which) {  
					finout += translit(replaceunistandard(wb)); b++;
				}
				else {
					fullwordout[0] += wb.substring(0,cm).replace(/"/g, 'x').replace(/<[^>]*>/g, '');
					fullwordout[1] += translit(replaceunistandard(wb));
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
			finout += '<p id="para'+paran+'"><a href="chrome://digitalpalireader/content/index.htm' + '?'+permalink+'" title="Permalink to this place" onmouseover="this.style.backgroundColor=\'white\'" onmouseout="this.style.backgroundColor=\'\'">&nbsp;&nbsp;&nbsp;</a>';
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
	outarray[1] = replaceunistandard(convout);
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

function convtitle(nikaya,book,vna,wna,xna,yna,zna,hiert)
{
	book = getBookName(nikaya,hiert,book-1);
	if (nikname[nikaya]) { nikaya = nikname[nikaya]; }
	var col = ['colped','coldppn','colcpd'];
	var w = 1;
	var title='<b style="color:'+colorcfg['colped']+'">' + nikaya + (hiert == 'm' ? '' : '-'+hiert) + '&nbsp;' + book + '</b>';
	if (vna != ' ') {
		vna = translit(replaceunistandard(vna));
		title += '&nbsp;-&nbsp;<b style="color:'+colorcfg[col[w]]+'">' + vna.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+colorcfg['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,'') + '</b>';
		w++;
		if(w == 3) { w = 0; }
	}
	if (wna != ' ') {
		wna = translit(replaceunistandard(wna));
		title += '&nbsp;-&nbsp;<b style="color:'+colorcfg[col[w]]+'">' + wna.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+colorcfg['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,'') + '</b>';
		w++;
		if(w == 3) { w = 0; }
	}
	if (xna != ' ') {
		xna = translit(replaceunistandard(xna));
		title += '&nbsp;-&nbsp;<b style="color:'+colorcfg[col[w]]+'">' +  xna.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+colorcfg['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,'') + '</b>';
		w++;
		if(w == 3) { w = 0; }
	}
	if (yna != ' ') {
		yna = translit(replaceunistandard(yna));
		title += '&nbsp;-&nbsp;<b style="color:'+colorcfg[col[w]]+'">' +  yna.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+colorcfg['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,'') + '</b>';
		w++;
		if(w == 3) { w = 0; }
	}
	if (zna != ' ') {
		zna = translit(replaceunistandard(zna));
				title += '&nbsp;-&nbsp;<b style="color:'+colorcfg[col[w]]+'">' +  zna.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+colorcfg['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,'') + '</b>';
	}
	
	title = replaceunistandard(title);
	return title;
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
ynames.push('Yam 1');
ynames.push('Yam 2');
ynames.push('Yam 3');
ynames.push('Paṭṭh 1');
ynames.push('Paṭṭh 2');
ynames.push('Paṭṭh 3');
ynames.push('Paṭṭh 4');
ynames.push('Paṭṭh 5');
ynames.push('Paṭṭh 6');

var nikvoladi = new Array();
nikvoladi['d'] = '<select size="7" name="book" onclick="gettitles(0,2)"><option selected>1</option><option>2</option><option>3</option></select>';
nikvoladi['m'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option selected>1</option><option>2</option><option>3</option></select>';
nikvoladi['s'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option selected>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select>';
nikvoladi['a'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option selected>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option></select>';
nikvoladi['km'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option selected value="1">'+knames[0]+'</option><option value="2">'+knames[1]+'</option><option value="3">'+knames[2]+'</option><option value="4">'+knames[3]+'</option><option value="5">'+knames[4]+'</option><option value="6">'+knames[5]+'</option><option value="7">'+knames[6]+'</option><option value="8">'+knames[7]+'</option><option value="9">'+knames[8]+'</option><option value="10">'+knames[9]+'</option><option value="11">'+knames[10]+'</option><option value="12">'+knames[11]+'</option><option value="13">'+knames[12]+'</option><option value="14">'+knames[13]+'</option><option value="15">'+knames[14]+'</option><option value="16">'+knames[15]+'</option><option value="17">'+knames[16]+'</option><option value="18">'+knames[17]+'</option><option value="19">'+knames[18]+'</option><option value="20">'+knames[19]+'</option><option value="21">'+knames[20]+'</option></select>';
nikvoladi['ka'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option selected value="1">'+knames[0]+'</option><option value="2">'+knames[1]+'</option><option value="3">'+knames[2]+'</option><option value="4">'+knames[3]+'</option><option value="5">'+knames[4]+'</option><option value="6">'+knames[5]+'</option><option value="7">'+knames[6]+'</option><option value="8">'+knames[7]+'</option><option value="9">'+knames[8]+'</option><option value="10">'+knames[9]+'</option><option value="12">'+knames[11]+'</option><option value="13">'+knames[12]+'</option><option value="14">'+knames[13]+'</option><option value="15">'+knames[14]+'</option></select>';
nikvoladi['kt'] = '<select size="7" name="book"></select>';
nikvoladi['v'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option value="1" selected>Pārā</option><option value="2">Pāci</option><option value="3">BhīV</option><option value="4">Mv</option><option value="5">Cv</option><option value="6">Pariv</option></select>';
nikvoladi['ym'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option value=1 selected>'+ynames[0]+'</option><option value=2>'+ynames[1]+'</option><option value=3>'+ynames[2]+'</option><option value=4>'+ynames[3]+'</option><option value=5>'+ynames[4]+'</option><option value=6>'+ynames[5]+'</option><option value=7>'+ynames[6]+'</option><option value=8>'+ynames[7]+'</option><option value=9>'+ynames[8]+'</option><option value=10>'+ynames[9]+'</option><option value=11>'+ynames[10]+'</option><option value=12>'+ynames[11]+'</option><option value=13>'+ynames[12]+'</option><option value=14>'+ynames[13]+'</option></select>';
nikvoladi['ya'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option value=1 selected>'+ynames[0]+'</option><option value=2>'+ynames[1]+'</option><option value=3>'+ynames[2]+'</option><option value=4>'+ynames[3]+'</option><option value=5>'+ynames[4]+'</option><option value=6>'+ynames[5].replace(/ 1$/,'')+'</option><option value=9>'+ynames[8].replace(/ 1$/,'')+'</option></select>';
nikvoladi['yt'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option value=1 selected>'+ynames[0]+'</option><option value=2>'+ynames[1]+'</option><option value=3>'+ynames[2]+'</option><option value=4>'+ynames[3]+'</option><option value=5>'+ynames[4]+'</option><option value=6>'+ynames[5].replace(/ 1$/,'')+'</option><option value=9>'+ynames[8].replace(/ 1$/,'')+'</option></select>';
nikvoladi['x'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option value="1" selected>1</option><option value="2">2</option></select>';
nikvoladi['b'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option value="1" selected>Mūla</option><option value="2">Ṭīkā</option></select>';
nikvoladi['gm'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option selected value="1">Mog</option><option value="2">Kac</option><option value="3">SPM</option><option value="4">SDhM</option><option value="5">PRS</option></select>';
nikvoladi['ga'] = '<select size="7" name="book"></select>';
nikvoladi['gt'] = '<select size="7" name="book"></select>';

function getBookName(nik, ht, no) { // no will be xml no - 1


	if (nik == 'k' || nik == 'y') {
		eval('no = '+nik+'names[\''+no+'\'];');
		if(ht != 'm') no = no.replace(/([^a]) 1$/,'$1');
	}
	else no++;
	return no.toString();
}

var oldnikaya = 0;

function changenikaya(noget)
{
	var nik = document.form.nik.value;
	if (nik != '') 
	{
		if (hier == 't' && limitt()) { 
			alert('Ṭīkā not available for '+nikname[document.form.nik.value]+'.');
			document.form.nik.selectedIndex = oldnikaya;
			return; 
		} 
		if (hier == 'a' && document.form.nik.value == 'g') {
			alert('Atthakatha not available for Gram.');
			document.form.nik.selectedIndex = oldnikaya;
			return;
		}
		oldnikaya = document.form.nik.selectedIndex;
		if (nikvoladi[nik]) {
			document.getElementById('book').innerHTML=nikvoladi[nik];
		}
		else { document.getElementById('book').innerHTML=nikvoladi[nik+hier]; }

		
		if (noget) gettitles(0,1); // don't load the passage
		else gettitles(0,2);
	}
}

// āīūṭḍṅṇṃṃñḷĀĪŪṬḌṄṆṂÑḶ

function replaceunistandard(input) {
	input = input.replace(/aa/g, 'ā');
	input = input.replace(/ii/g, 'ī');
	input = input.replace(/uu/g, 'ū');
	input = input.replace(/\.t/g, 'ṭ');
	input = input.replace(/\.d/g, 'ḍ');
	input = input.replace(/\"n/g, 'ṅ');
	input = input.replace(/\.n/g, 'ṇ');
	input = input.replace(/\.m/g, 'ṃ');
	input = input.replace(/\u1E41/g, 'ṃ'); // m with over-dot
	input = input.replace(/\~n/g, 'ñ');
	input = input.replace(/\.l/g, 'ḷ');
	input = input.replace(/AA/g, 'Ā');
	input = input.replace(/II/g, 'Ī');
	input = input.replace(/UU/g, 'Ū');
	input = input.replace(/\.T/g, 'Ṭ');
	input = input.replace(/\.D/g, 'Ḍ');
	input = input.replace(/\"N/g, 'Ṅ');
	input = input.replace(/\.N/g, 'Ṇ');
	input = input.replace(/\.M/g, 'Ṃ');
	input = input.replace(/\~N/g, 'Ñ');
	input = input.replace(/\.L/g, 'Ḷ');
	return input;
}

function replacevelstandard(input) {
	input = input.replace(/\u0101/g, 'aa');
	input = input.replace(/\u012B/g, 'ii');
	input = input.replace(/\u016B/g, 'uu');
	input = input.replace(/\u1E6D/g, '\.t');
	input = input.replace(/\u1E0D/g, '\.d');
	input = input.replace(/\u1E45/g, '\"n');
	input = input.replace(/\u1E47/g, '\.n');
	input = input.replace(/\u1E43/g, '\.m');
	input = input.replace(/\u1E41/g, '\.m'); // m with over-dot
	input = input.replace(/\u00F1/g, '\~n');
	input = input.replace(/\u1E37/g, '\.l');
	input = input.replace(/\u0100/g, 'AA');
	input = input.replace(/\u012A/g, 'II');
	input = input.replace(/\u016A/g, 'UU');
	input = input.replace(/\u1E6C/g, '\.T');
	input = input.replace(/\u1E0C/g, '\.D');
	input = input.replace(/\u1E44/g, '\"N');
	input = input.replace(/\u1E46/g, '\.N');
	input = input.replace(/\u1E42/g, '\.M');
	input = input.replace(/\u00D1/g, '\~N');
	input = input.replace(/\u1E36/g, '\.L');
	return input;
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

function addtrans(which,nikaya,book,meta,volume,vagga,sutta,section) {
	if (cfg["ctrans"] != "checked" || typeof(atiD) == 'undefined') return;
	
	var atiurl = (cfg['catioff'] == 'checked' ? 'file://'+getHomePath().replace(/\\/g, '/')+'/'+cfg['catiloc']+'/html/' : 'http://www.accesstoinsight.org/');
	
	var cnt = 0;
	var output = [];
	var a,b,c,d,e,j,k,l,m,w,x,y,z;
	
	var autha = [];
	autha['amar'] = "Amaravati";
	autha['bodh'] = "Bodhi";
	autha['bpit'] = "Burma Pitaka Assoc.";
	autha['budd'] = "Buddharakkhita";
	autha['harv'] = "Harvey";
	autha['hekh'] = "Hecker and Khema";
	autha['horn'] = "Horner";
	autha['irel'] = "Ireland";
	autha['kell'] = "Kelly";
	autha['khan'] = "Khantipalo";
	autha['ksw0'] = "Kelly, et al";
	autha['kuma'] = "Kumara";
	autha['mend'] = "Mendis";
	autha['nana'] = "Ñanananda";
	autha['nara'] = "Narada";
	autha['norm'] = "Norman";
	autha['ntbb'] = "Ñanamoli & Bodhi";
	autha['nymo'] = "Ñanamoli";
	autha['nypo'] = "Nyanaponika";
	autha['nysa'] = "Nyanasatta";
	autha['olen'] = "Olendzki";
	autha['piya'] = "Piyadassi";
	autha['rhyc'] = "C. Rhys-Davids";
	autha['soma'] = "Soma";
	autha['soni'] = "Soni";
	autha['than'] = "Thanissaro";
	autha['vaji'] = "Vajira & Story";
	autha['vaka'] = "Ñanavara and Kantasilo";
	autha['wlsh'] = "Walshe";
	autha['wood'] = "Woodward";
	autha['yaho'] = "Yahoo! Pali";

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
					if (surl) {	output.push('&nbsp;<img width="16" style="vertical-align:middle" src="http://www.ancient-buddhist-texts.net/favicon.gif" title="Translations courtesy of http://www.ancient-buddhist-texts.net/" onclick="window.open(\'www.ancient-buddhist-texts.net/\')">&nbsp;<input type=button class="btn" onclick="window.open(\'http://www.ancient-buddhist-texts.net/Texts-and-Translations/Mahakhandhako/'+surl+'\');" value="Anandajoti" title="Translation of Mahakhandhako by Anandajoti">');cnt++; }
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
					output.push('<input type=button class="btn" onclick="window.open(\''+atiurl+'tipitaka/'+atiD[x]+'\');" value="'+auth+'" title="Translation of DN '+mysn+' by '+auth+'">');
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
				output.push('&nbsp;<img width="16" style="vertical-align:middle" src="http://www.ancient-buddhist-texts.net/favicon.gif" title="Translations courtesy of http://www.ancient-buddhist-texts.net/" onclick="window.open(\'www.ancient-buddhist-texts.net/\')">&nbsp;<input type=button class="btn" onclick="window.open(\'http://www.ancient-buddhist-texts.net/Texts-and-Translations/Mahaparinibbanasuttam/'+surl+'\');" value="Anandajoti" title="Translation of DN 16'+ssect+' by Anandajoti">');cnt++;
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
				output.push('&nbsp;<img width="16" style="vertical-align:middle" src="http://www.ancient-buddhist-texts.net/favicon.gif" title="Translations courtesy of http://www.ancient-buddhist-texts.net/" onclick="window.open(\'www.ancient-buddhist-texts.net/\')">&nbsp;<input type=button class="btn" onclick="window.open(\'http://www.ancient-buddhist-texts.net/Texts-and-Translations/Satipatthana/'+surl+'\');" value="Anandajoti" title="Translation of DN 22'+ssect+' by Anandajoti">');cnt++;
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
				if (atiM[x].indexOf(atim)==0) {output.push('<input type=button class="btn" onclick="window.open(\''+atiurl+'tipitaka/'+atiM[x]+'\');" value="'+auth+'" title="Translation of MN '+mysn+' by '+auth+'">');cnt++;}
			}
		break;
		case 'a':
			var bookn = book+1;
			if (which > 1) return null;
			if (!section) section = 0;
			//document.getElementById('difb').innerHTML+=book+' ' +vagga+' ' +sutta+' ' +section+' <br>';
			var z = amlist[book][vagga][sutta][section]
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
							output.push('<input type=button class="btn" onclick="window.open(\''+atiurl+'tipitaka/'+atiA[a]+'\');" value="'+auth+'" title="Translation of AN '+bookn+'.'+sno+' by '+auth+'">');cnt++;
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
						output.push('<input type=button class="btn" onclick="window.open(\''+atiurl+'tipitaka/'+atiS[a]+'\');" value="'+auth+'" title="Translation of SN '+(vagga+1)+'.'+sno+' by '+auth+'">');cnt++;
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
								output.push('<input type=button class="btn" onclick="window.open(\''+atiurl+'tipitaka/'+atiK[a]+'\');" value="'+auth+'" title="Translation of KhP '+sno+' by '+auth+'">');cnt++;
								continue out;
							}
						}
					}
					output.push('&nbsp;<img width="16" style="vertical-align:middle" src="http://www.ancient-buddhist-texts.net/favicon.gif" title="Translations courtesy of http://www.ancient-buddhist-texts.net/" onclick="window.open(\'www.ancient-buddhist-texts.net/\')">&nbsp;<input type=button class="btn" onclick="window.open(\'http://www.ancient-buddhist-texts.net/Texts-and-Translations/Khuddakapatha/Khuddakapatha.htm\');" value="Anandajoti" title="Translation of KhP by Anandajoti">');cnt++;		 
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
								output.push('<input type=button class="btn" onclick="window.open(\''+atiurl+'tipitaka/'+atiK[a]+'\');" value="'+auth+'" title="Translation of Dhp. '+sno+' by '+auth+'">');cnt++;
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
								output.push('<input type=button class="btn" onclick="window.open(\''+atiurl+'tipitaka/'+atiK[a]+'\');" value="'+auth+'" title="Translation of Uda '+(vagga+1)+'.'+sno+' by '+auth+'">');cnt++;
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
					output.push('&nbsp;<img width="16" style="vertical-align:middle" src="http://www.ancient-buddhist-texts.net/favicon.gif" title="Translations courtesy of http://www.ancient-buddhist-texts.net/" onclick="window.open(\'www.ancient-buddhist-texts.net/\')">&nbsp;<input type=button class="btn" onclick="window.open(\'http://www.ancient-buddhist-texts.net/Texts-and-Translations/Udana/'+surl+'\');" value="Anandajoti" title="Translation of Udana '+ssect+' by Anandajoti">');cnt++;		 
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
								output.push('<input type=button class="btn" onclick="window.open(\''+atiurl+'tipitaka/'+atiK[a]+'\');" value="'+auth+'" title="Translation of KhP '+sno+' by '+auth+'">');cnt++;
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
								output.push('<input type=button class="btn" onclick="window.open(\''+atiurl+'tipitaka/'+atiK[a]+'\');" value="'+auth+'" title="Translation of SN '+(vagga+1)+'.'+sno+' by '+auth+'">');cnt++;
								continue out;
							}
						}
					}
					if (vagga == 4) {output.push('&nbsp;<img width="16" style="vertical-align:middle" src="http://www.ancient-buddhist-texts.net/favicon.gif" title="Translations courtesy of http://www.ancient-buddhist-texts.net/" onclick="window.open(\'www.ancient-buddhist-texts.net/\')">&nbsp;<input type=button class="btn" onclick="window.open(\'http://www.ancient-buddhist-texts.net/Texts-and-Translations/Parayanavagga/index.htm\');" value="Anandajoti" title="Translation of SN 5 by Anandajoti">');cnt++;}
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
								output.push('<input type=button class="btn" onclick="window.open(\''+atiurl+'tipitaka/'+atiK[a]+'\');" value="'+auth+'" title="Translation of Vv '+(sutta+1)+'.'+sno+' by '+auth+'">');cnt++;
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
								output.push('<input type=button class="btn" onclick="window.open(\''+atiurl+'tipitaka/'+atiK[a]+'\');" value="'+auth+'" title="Translation of Pv '+(vagga+1)+'.'+sno+' by '+auth+'">');cnt++;
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
								output.push('<input type=button class="btn" onclick="window.open(\''+atiurl+'tipitaka/'+atiK[a]+'\');" value="'+auth+'" title="Translation of Thag '+vagga+'.'+sno+' by '+auth+'">');cnt++;
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
								output.push('<input type=button class="btn" onclick="window.open(\''+atiurl+'tipitaka/'+atiK[a]+'\');" value="'+auth+'" title="Translation of Thig '+(vagga+1)+'.'+sno+' by '+auth+'">');cnt++;
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


function switchhier(htmp,stop) {

	if(hier == htmp) return;
	
	var himg = ['l','m','r'];
		

	if (htmp == 't' && limitt()) { 
		alert('Ṭīkā not available for '+nikname[document.form.nik.value]+'.');
		return; 
	}
	if (htmp == 'a' && document.form.nik.selectedIndex > 7) {
		alert('Aṭṭhakathā not available for ' + nikname[document.form.nik.value]+'.');
		return;
	}
	if (document.form.nik.value == 'k' && htmp == 'a' && kudvala[document.form.book.value] == undefined) {
		alert(hTitle[hNumbers[htmp]] + ' not available for '+getBookName(document.form.nik.value,htmp,document.form.book.selectedIndex)+'.');
		return;
	}

	hier = htmp;

	var ha = ['m','a','t'];

	for(i=0; i<ha.length; i++) {
		if (ha[i] == htmp) {
			document.getElementById('dhier'+ha[i]).onmouseover=function() {
				return;
			};
			document.getElementById('dhier'+ha[i]).onmouseout=function() {
				return;
			};
			document.getElementById('dhier'+ha[i]).title = 'Currently viewing '+hTitle[i];

			document.getElementById('dhier'+ha[i]).style.backgroundImage = 'url(images/'+himg[i]+'b1.png)';
		}
		else {
			document.getElementById('dhier'+ha[i]).onmouseover=function() {
				document.body.style.cursor='pointer';
			};
			document.getElementById('dhier'+ha[i]).onmouseout=function() {
				document.body.style.cursor='auto';
			};

			document.getElementById('dhier'+ha[i]).title = 'Change to '+hTitle[i];

			document.getElementById('dhier'+ha[i]).style.backgroundImage = 'url(images/'+himg[i]+'b0.png)';
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
			var thist0 = replaceunistandard(thist[0]);
			if (thist0.length > (maxlength - 3)) thist0 = thist0.substring(0,(maxlength-3)) + '...';
			hout += '<option value="'+thist[1]+'">' + thist0  + '</option>';
		}
		hout += '</select>&nbsp;<a href="javascript:void(0)" title="Clear History" onclick="clearHistory(1);" onmouseover="this.style.color=\'#F5F5F5\'" onmouseout="this.style.color=\'inherit\';">x</a>';
	}
		
	document.getElementById('history').innerHTML = hout;
	
}

var pleasewait =  document.createElement('div');
pleasewait.setAttribute('align','center');
pleasewait.innerHTML = '<br><br><br><br><h1><img src="images/ajax-loader.gif" /> please wait...</h1>';


function getLinkPlace() {
	var place = document.location.href.split('?')[1];
	var para = null;
	if(place.indexOf('&') > -1) {
		para = place.split('&')[1];
		if (para.search(/[^0-9]/) > -1) para = null;
		place = place.split('&')[0];
	}
	if (place.search(/[^a-z0-9.]/) > -1) return;
	
	place = place.split('.');

	var nikaya = place[0];
	place[0] = niknumber[nikaya];

	if (place.length != 8) return;
	getplace(place);
	importXML(null,parseInt(para)-1);
}

function onDocLoad() {
	if(document.location.href.indexOf('?') > -1) getLinkPlace();		
	if(devCheck == 1) dev(); 
}
