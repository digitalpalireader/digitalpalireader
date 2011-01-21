
function preout(data,notrans) // calls text prep, then outputs it to preFrame
{

	lastcolour = 0; // reset colour changing

	var inarray = preparepali(data);
		
	var finout = inarray[0];
	var convout = replaceunistandard(inarray[1]).replace(/  *,/g, ',');

	var nikaya = document.form.nik.value;
	var book = document.form.book.selectedIndex;
	var meta = document.form.meta.selectedIndex;
	var volume = document.form.volume.selectedIndex;
	var vagga = document.form.vagga.selectedIndex;
	var sutta = document.form.sutta.selectedIndex;
	var section = document.form.section.selectedIndex;
	
	var transin;
	var transout='';
	if (hier == "m" && !notrans) { 
		transin = addtrans(0,nikaya,book,meta,volume,vagga,sutta,section);
		if (transin) {
			if (transin[0].charAt(0) != '&') transout += '<img style="vertical-align:middle" src="http://www.accesstoinsight.org/favicon.ico" title="Translations courtesy of http://www.accesstoinsight.org/" onclick="window.open(\'http://www.accesstoinsight.org/\')">&nbsp;'
			transout += transin.join('');
			document.getElementById('maftrans').innerHTML += transout; 
		}
	}
	
	document.getElementById('mafb').innerHTML += '<div id="convi">'+replaceunistandard(inarray[1])+'</div><hr />' + finout; // convi contains text for convertor
    
	document.getElementById('mafb').scrollTop = 0; 
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
	data = data.replace(/"ti/g, '” ”ti');
	data = data.replace(/''ti/g, '” ”ti');
	data = data.replace(/"nti/g, '” ”nti');
	data = data.replace(/''nti/g, '” ”nti');
	data = data.replace(/'nti/g, '’ ’nti');
	data = data.replace(/’ti/g, '’ ’ti');
	data = data.replace(/``/g, '“');
	data = data.replace(/`/g, '‘');
	data = data.replace(/''/g, '”');
	data = data.replace(/'/g, '’');
	data = data.replace(/\^b\^/g, ' <b> ');
	data = data.replace(/\^eb\^/g, ' </b> ');
	data = data.replace(/\^a\^\"/g, ' z');
	data = data.replace(/\"\^ea\^/g, 'z ');
	data = data.replace(/\^a\^/g, ' z');
	data = data.replace(/\^ea\^/g, 'z ');
	data = data.replace(/\^v/g, '');
	data = data.replace(/v\^/g, '');
	data = data.replace(/\}/g, '} ');
	data = data.replace(/ +/g, ' ');
	var uniouta = replaceunistandard(data).split(' ');
	//data = data.replace(/\"/g, '\u00B4');
	var wordbyword = data.split(' ');
	var addpre = '';
	var paran=0;
    
	//document.getElementById('mafa').innerHTML = data;	

	for (var b = 0; b < wordbyword.length; b++)
	{
		if (altread == 1) {
			endpt = wordbyword[b].length-1;
			if (wordbyword[b].charAt(endpt) == '}') {
				altplus += wordbyword[b].substring(0,endpt);
				altread = 0;
				altplus = replaceunistandard(altplus);
				altplus = altplus.replace(/0/g, '.');
				finout += ' <a href="javascript:void(0)" class="small" style="color:'+colorcfg['grey']+'" title="' + altplus + '">VAR</a> ';
			}
			else altplus += wordbyword[b] + ' ';
		}
		else if (wordbyword[b].charAt(0) == '{') {
			if (wordbyword[b].charAt(wordbyword[b].length-1) == '}') { 
				altplus = wordbyword[b].substring(1,wordbyword[b].length-1) + ' ';
				altplus = replaceunistandard(altplus);
				altplus = altplus.replace(/0/g, '.');
				finout += ' <a href="javascript:void(0)" class="small" style="color:'+colorcfg['grey']+'" title="' + altplus + '">VAR</a> ';
			}
			else {
				altread = 1;
				altplus = wordbyword[b].substring(1) + ' ';
			}
		}
		else if (wordbyword[b+1] == '-') { // connect first part to search
			if (wordbyword[b+5] == '_') { // single word search embedded on both sides
				addpre = wordbyword[b];
				b++;
			}
			else { // word search embedded left side
				convout += wordbyword[b] + wordbyword[b+3] + ' ';
				unioutb = (replaceunistandard(wordbyword[b]) + ' - <' + wordbyword[b+2].substring(1,3) + '>' + uniouta[b+3]) + '<xc>';
				if (script != 0) unioutb = translit(unioutb);
				finout += '<a id="' + b + '" href="javascript:postout(&#39;' + wordbyword[b] + wordbyword[b+3] +  '&#39;,' + b + ')">' +  unioutb + '</a> ';
				b = b + 4;
			}				
		}
		else if (wordbyword[b].substring(0,2) == '<c' && wordbyword[b+3] == '_') { // word search embedded right side
			convout += addpre + wordbyword[b+1] +  wordbyword[b+4] + ' ';
			unioutb = (replaceunistandard(addpre) + ' - <' + wordbyword[b].substring(1,3) + '>' + uniouta[b+1] + '<xc> - ' + uniouta[b+4]);
			if (script != 0) unioutb = translit(unioutb);
			finout += '<a id="' + b + '" href="javascript:postout(&#39;' + addpre + wordbyword[b+1] +  wordbyword[b+4] +  '&#39;,' + b + ')">' +  unioutb + '</a> ';
			b = b + 4;
			addpre = '';
		}		

		else if (wordbyword[b].substring(0,2) == '<f') {
			finout += wordbyword[b] + ' ';
		}		
		else if (wordbyword[b] == '<p>') {
			finout += '<p id="para'+paran+'">' + ' ';
            paran++;
		}		
		else if (wordbyword[b].charAt(0) == '<')		{
			finout += wordbyword[b];
		}
		else if (wordbyword[b].charAt(0) == 'z') // pesky page numbers
		{
			indexpage = wordbyword[b].charAt(1);
			pageno = wordbyword[b].substring(2,8);
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
			finout += ' <a class="small" style="color:blue" href="javascript:void(0)" title="' + pagetitle + '">' + indexpage + '</a> ';
		}
		else if (which)
		{
			convout += wordbyword[b] + ' ';
			unioutb = uniouta[b];
			unioutb = unioutb.replace(/0/g, '.');
			if (script != 0) unioutb = translit(unioutb);
			finout += unioutb + ' ';
		}
		else
		{
			convout += wordbyword[b] + ' ';
			unioutb = uniouta[b];
			//unioutb = unioutb.replace(/0/g, '.');
			if (script != 0) unioutb = translit(unioutb);
			finout += '<a id="' + b + '" href="javascript:void(0)" onclick="postout(&#39;' + wordbyword[b].replace(/"n/g,'xn') + '&#39;,' + b + ')">' +  unioutb + '</a> ';
		}
	}
	finout = finout.replace(/ <b> /g, '<b>');
	finout = finout.replace(/ <\/b> /g, '</b>');
	finout = finout.replace(/<b1>/g, '<b style="color:'+colorcfg['colped']+'">');
	finout = finout.replace(/<b2>/g, '<b style="color:'+colorcfg['coldppn']+'">');
	finout = finout.replace(/<b3>/g, '<b style="color:'+colorcfg['colcpd']+'">');
	if (!which) {
		outarray[0] = finout;
		outarray[1] = convout;
		return outarray;
	}
	return finout;
}

function preparepali(data) { // standard text prep for algorithm
	
	var finout = formatuniout(data);
	
	// add search markers
	
	finout[0] = finout[0].replace(/<c0> */g, ' <span style="BACKGROUND-COLOR: '+colorcfg['colbk1']+'">');
	finout[0] = finout[0].replace(/<c1> */g, ' <span style="BACKGROUND-COLOR: '+colorcfg['colbk2']+'">');
	finout[0] = finout[0].replace(/<c2> */g, ' <span style="BACKGROUND-COLOR: '+colorcfg['colbk3']+'">');
	finout[0] = finout[0].replace(/ *<xc>/g, '</span> ');
	finout[0] = finout[0].replace(/ *- */g, '');
	finout[0] = finout[0].replace(/BACKGROUNDCOLOR/g, 'BACKGROUND-COLOR');

	return finout;
}

function convtitle(nikaya,book,vna,wna,xna,yna,zna)
{
	if (nikaya == 'k') book = knames[book-1];
    if (nikname[nikaya]) { nikaya = nikname[nikaya]; }
	var col = ['colped','coldppn','colcpd'];
	var w = 1;
	var title='<table width=100%><tr><td align=center><b style="color:'+colorcfg['colped']+'">' + nikaya + '&nbsp;' + book + '</b>';
	if (vna != ' ') {
		vna = translit(vna);
		title += '&nbsp;-&nbsp;<b style="color:'+colorcfg[col[w]]+'">' + vna.replace(/^ */, '').replace(/ *$/,'') + '</b>';
		w++;
		if(w == 3) { w = 0; }
	}
	if (wna != ' ') {
		wna = translit(wna);
		title += '&nbsp;-&nbsp;<b style="color:'+colorcfg[col[w]]+'">' + wna.replace(/^ */, '').replace(/ *$/,'') + '</b>';
		w++;
		if(w == 3) { w = 0; }
	}
	if (xna != ' ') {
		xna = translit(xna);
		title += '&nbsp;-&nbsp;<b style="color:'+colorcfg[col[w]]+'">' +  xna.replace(/^ */, '').replace(/ *$/,'') + '</b>';
		w++;
		if(w == 3) { w = 0; }
	}
	if (yna != ' ') {
		yna = translit(yna);
		title += '&nbsp;-&nbsp;<b style="color:'+colorcfg[col[w]]+'">' +  yna.replace(/^ */, '').replace(/ *$/,'') + '</b>';
		w++;
		if(w == 3) { w = 0; }
	}
	if (zna != ' ') {
		zna = translit(zna);
				title += '&nbsp;-&nbsp;<b style="color:'+colorcfg[col[w]]+'">' +  zna.replace(/^ */, '').replace(/ *$/,'') + '</b>';
	}
	title += '</td><td id="maftrans" align="right"></td></tr></table>';
	
	title = replaceunistandard(title);
	document.getElementById('mafb').innerHTML=title;
}


var nikname = new Array();
nikname['d'] = "DN";
nikname['m'] = "MN";
nikname['s'] = "SN";
nikname['a'] = "AN";
nikname['k'] = "KN";
nikname['v'] = "Vin";
nikname['x'] = "Vism";
nikname['y'] = "Abhi";
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
niknumber['g'] = "8";

var numbernik = new Array();
numbernik.push('v');
numbernik.push('d');
numbernik.push('m');
numbernik.push('s');
numbernik.push('a');
numbernik.push('k');
numbernik.push('y');
numbernik.push('x');
numbernik.push('g');


var nikvoladi = new Array();
nikvoladi['d'] = '<select size="7" name="book" onclick="gettitles(0,2)"><option selected>1</option><option>2</option><option>3</option></select>';
nikvoladi['m'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option selected>1</option><option>2</option><option>3</option></select>';
nikvoladi['s'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option selected>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select>';
nikvoladi['a'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option selected>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option></select>';
nikvoladi['km'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option selected value="1">KhP</option><option value="2">Dhp</option><option value="3">Uda</option><option value="4">Iti</option><option value="5">SN</option><option value="6">ViV</option><option value="7">PeV</option><option value="8">Thera</option><option value="9">Theri</option><option value="10">Ap.1</option><option value="11">Ap.2</option><option value="12">BdV</option><option value="13">Car</option><option value="14">Jat.1</option><option value="15">Jat.2</option><option value="16">MNid</option><option value="17">CNid</option><option value="18">PsM</option><option value="19">Mil</option><option value="20">Net</option><option value="21">Pet</option></select>';
nikvoladi['ka'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option selected value="1">KhP</option><option value="2">Dhp</option><option value="3">Uda</option><option value="4">Iti</option><option value="5">SN</option><option value="6">ViV</option><option value="7">PeV</option><option value="8">Thera</option><option value="9">Theri</option><option value="10">Apa</option><option value="12">BdV</option><option value="13">Car</option><option value="14">Jat.1</option><option value="15">Jat.2</option></select>';
nikvoladi['kt'] = '<select size="7" name="book"></select>';
nikvoladi['v'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option value="1" selected>Para</option><option value="2">Paci</option><option value="3">BhV</option><option value="4">MV</option><option value="5">CV</option><option value="6">Pari</option></select>';
nikvoladi['ym'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option value=1 selected>DhS</option><option value=2>Vibh</option><option value=3>DhK</option><option value=4>Pugg</option><option value=5>KV</option><option value=6>Yam1</option><option value=7>Yam2</option><option value=8>Yam3</option><option value=9>Paṭ1</option><option value=10>Paṭ2</option><option value=11>Paṭ3</option><option value=12>Paṭ4</option><option value=13>Paṭ5</option><option value=14>Paṭ6</option></select>';
nikvoladi['ya'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option value=1 selected>DhS</option><option value=2>Vibh</option><option value=3>DhK</option><option value=4>Pugg</option><option value=5>KV</option><option value=6>Yam</option><option value=7>Paṭ</option></select>';
nikvoladi['yt'] = '<select size="7" name="book"></select>';
nikvoladi['x'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option value="1" selected>1</option><option value="2">2</option></select>';
nikvoladi['gm'] = '<select size="7" name="book"  onclick="gettitles(0,2)"><option selected value="1">Mog</option><option value="2">Kac</option><option value="3">SPM</option><option value="4">SDhM</option><option value="5">PRS</option></select>';
nikvoladi['ga'] = '<select size="7" name="book"></select>';
nikvoladi['gt'] = '<select size="7" name="book"></select>';

var knames = [];

knames.push('KhP');
knames.push('Dhp');
knames.push('Uda');
knames.push('Iti');
knames.push('SN');
knames.push('ViV');
knames.push('PeV');
knames.push('Thera');
knames.push('Theri');
knames.push('Ap.1');
knames.push('Ap.2');
knames.push('BdV');
knames.push('Car');
knames.push('Jat.1');
knames.push('Jat.2');
knames.push('MNid');
knames.push('CNid');
knames.push('PsM');
knames.push('Mil');
knames.push('Net');
knames.push('Pet');

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

function replaceunistandard(input) {
	input = input.replace(/aa/g, 'ā');
	input = input.replace(/ii/g, 'ī');
	input = input.replace(/uu/g, 'ū');
	input = input.replace(/\.t/g, 'ṭ');
	input = input.replace(/\.d/g, 'ḍ');
	input = input.replace(/\"n/g, 'ṅ');
	input = input.replace(/\.n/g, 'ṇ');
	input = input.replace(/\.m/g, 'ṃ');
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
			gettitles(1);					
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
			gettitles(1,1);	
			document.form.section.selectedIndex = document.form.section.options.length - 1;
			importXML();			
		}
		else {
			var vagga = document.form.vagga.selectedIndex - 1;
			if (vagga >= 0) {
				document.form.vagga.selectedIndex--;
				gettitles(4,1);	
				document.form.sutta.selectedIndex = document.form.sutta.options.length - 1;
				gettitles(1,1);	
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
					gettitles(1,1);	
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
						gettitles(1,1);	
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
    if (getMiscPref("ctrans") != "checked" || typeof(atiD) == 'undefined') return;
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
            while (mys.length < 2) { mys = '0'+mys; }
            var atid = 'dn/dn.'+mys;
            for (var x = 0;x < atiD.length; x++) {
                var auth = atiD[x].split('.')[3];
                if (autha[auth]) {auth = autha[auth];}
                if (atiD[x].indexOf(atid)==0) {output.push('<input type=button class="btn" onclick="window.open(\'http://www.accesstoinsight.org/tipitaka/'+atiD[x]+'\');" value="'+auth+'" title="Translation of DN '+mysn+' by '+auth+'">');cnt++;}
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
                if (atiM[x].indexOf(atim)==0) {output.push('<input type=button class="btn" onclick="window.open(\'http://www.accesstoinsight.org/tipitaka/'+atiM[x]+'\');" value="'+auth+'" title="Translation of MN '+mysn+' by '+auth+'">');cnt++;}
            }
        break;
        case 'a':
            var file = 'xml/listam.xml';
            var bookn = book+1;
            if (which > 0) return null;
            if (!section) section = 0;
            var xmlhttp = new window.XMLHttpRequest();
            xmlhttp.open("GET", file, false);
            xmlhttp.send(null);
            var xmlDoc = xmlhttp.responseXML.documentElement;
            w = xmlDoc.getElementsByTagName('a'+bookn+'v');
            x = w[vagga].getElementsByTagName('a'+bookn+'s');
            y = x[sutta].getElementsByTagName('a'+bookn+'c');
            z = y[section].getElementsByTagName('a'+bookn+'p');
            //alert(z[0].childNodes[0].nodeValue);
            out:
            for (a = 0;a < atiA.length; a++) {
                if(parseInt(atiA[a].split('/')[1].substring(2),10) == bookn) {
                    if(atiA[a].split('.')[1].indexOf('-')>=0) b=atiA[a].split('.')[1].split('-');
                    else {b=null;}
                    for (var aa = 0;aa < z.length; aa++) {
                        var bb = z[aa].childNodes[0].nodeValue;
                        c=parseInt(bb,10);
                        d=''+bb;
                        while (d.length < 3) { d = '0'+d; }
                        if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || atiA[a].split('.')[1].indexOf(d)==0) {
                            if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
                            else {var sno = c;}
                            var auth = atiA[a].split('.')[2];
                            if (autha[auth]) {auth = autha[auth];}
                            output.push('<input type=button class="btn" onclick="window.open(\'http://www.accesstoinsight.org/tipitaka/'+atiA[a]+'\');" value="'+auth+'" title="Translation of AN '+bookn+'.'+sno+' by '+auth+'">');cnt++;
                            continue out;
                        }
                    }
                }
            }		
        break;
        case 's':
            if (which > 0) return null;
            var file = 'xml/listsm.xml';
            var bookn = book+1;
            
            if (bookn > 1) {vagga+=11;}
            if (bookn > 2) {vagga+=10;}
            if (bookn > 3) {vagga+=13;}
            if (bookn > 4) {vagga+=10;}
            
            var xmlhttp = new window.XMLHttpRequest();
            xmlhttp.open("GET", file, false);
            xmlhttp.send(null);
            var xmlDoc = xmlhttp.responseXML.documentElement;
            w = xmlDoc.getElementsByTagName('sv');
            x = w[vagga].getElementsByTagName('s'+bookn+'s');

            var cnt2 = 0;

            for (b = 0;b < sutta; b++) {
                y = x[b].getElementsByTagName('s'+bookn+'c');
                cnt2+=y.length;
            }
            cnt2+=section;
            y = x[sutta].getElementsByTagName('s'+bookn+'c');
            z = y[section].getElementsByTagName('s'+bookn+'p');
            //alert (cnt2);
            out:
            for (a = 0;a < atiS.length; a++) {
                if(parseInt(atiS[a].split('/')[1].substring(2),10) == (vagga+1)) {
                    if(atiS[a].split('.')[1].indexOf('-')>=0) b=atiS[a].split('.')[1].split('-');
                    else {b=null;}
                    for (var aa = 0;aa < z.length; aa++) {
                        var bb = cnt2+1;
                        c=parseInt(bb,10);
                        d=bb+"";
                        while (d.length < 3) { d = '0'+d; }
                        if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || atiS[a].split('.')[1].indexOf(d)==0) {
                            if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
                            else {var sno = c;}
                            var auth = atiS[a].split('.')[2];
                            if (autha[auth]) {auth = autha[auth];}
                            output.push('<input type=button class="btn" onclick="window.open(\'http://www.accesstoinsight.org/tipitaka/'+atiS[a]+'\');" value="'+auth+'" title="Translation of SN '+(vagga+1)+'.'+sno+' by '+auth+'">');cnt++;
                            continue out;
                        }
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
                            if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || atiK[a].split('.')[1].indexOf(c)==0) {
                                if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
                                else {var sno = c;}
                                var auth = atiK[a].split('.')[2];
                                if (autha[auth]) {auth = autha[auth];}
                                output.push('<input type=button class="btn" onclick="window.open(\'http://www.accesstoinsight.org/tipitaka/'+atiK[a]+'\');" value="'+auth+'" title="Translation of KhP '+sno+' by '+auth+'">');cnt++;
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
                                output.push('<input type=button class="btn" onclick="window.open(\'http://www.accesstoinsight.org/tipitaka/'+atiK[a]+'\');" value="'+auth+'" title="Translation of Dhp. '+sno+' by '+auth+'">');cnt++;
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
                            if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || atiK[a].split('.')[2].indexOf(d)==0) {
                                if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
                                else {var sno = c;}
                                var auth = atiK[a].split('.')[3];
                                if (autha[auth]) {auth = autha[auth];}
                                if (atiK[a] == 'kn/ud/ud.6.09.olen.html') { atiK[a] = 'kn/ud/ud.6.09-olen.html';}
                                output.push('<input type=button class="btn" onclick="window.open(\'http://www.accesstoinsight.org/tipitaka/'+atiK[a]+'\');" value="'+auth+'" title="Translation of Uda '+(vagga+1)+'.'+sno+' by '+auth+'">');cnt++;
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
                            if (d.length < 2) { d = '0'+d; }
                            if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || atiK[a].split('.')[2].indexOf(d)==0) {
                                if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
                                else {var sno = c;}
                                var auth = atiK[a].split('.')[3];
                                if (autha[auth]) {auth = autha[auth];}
                                output.push('<input type=button class="btn" onclick="window.open(\'http://www.accesstoinsight.org/tipitaka/'+atiK[a]+'\');" value="'+auth+'" title="Translation of KhP '+sno+' by '+auth+'">');cnt++;
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
                            if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || atiK[a].split('.')[2].indexOf(d)==0) {
                                if (b) {var sno = b[0].replace(/^0/g,'') +"-"+ b[1].replace(/^0/g,'');}
                                else {var sno = c;}
                                var auth = atiK[a].split('.')[3];
                                if (autha[auth]) {auth = autha[auth];}
                                output.push('<input type=button class="btn" onclick="window.open(\'http://www.accesstoinsight.org/tipitaka/'+atiK[a]+'\');" value="'+auth+'" title="Translation of SN '+(vagga+1)+'.'+sno+' by '+auth+'">');cnt++;
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
                            if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || atiK[a].split('.')[2].indexOf(d)==0) {
                                if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
                                else {var sno = c;}
                                var auth = atiK[a].split('.')[3];
                                if (autha[auth]) {auth = autha[auth];}
                                if (atiK[a] == 'kn/ud/ud.6.09.olen.html') { atiK[a] = 'kn/ud/ud.6.09-olen.html';}
                                output.push('<input type=button class="btn" onclick="window.open(\'http://www.accesstoinsight.org/tipitaka/'+atiK[a]+'\');" value="'+auth+'" title="Translation of Vv '+(sutta+1)+'.'+sno+' by '+auth+'">');cnt++;
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
                            if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || atiK[a].split('.')[2].indexOf(d)==0) {
                                if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
                                else {var sno = c;}
                                var auth = atiK[a].split('.')[3];
                                if (autha[auth]) {auth = autha[auth];}
                                if (atiK[a] == 'kn/ud/ud.6.09.olen.html') { atiK[a] = 'kn/ud/ud.6.09-olen.html';}
                                output.push('<input type=button class="btn" onclick="window.open(\'http://www.accesstoinsight.org/tipitaka/'+atiK[a]+'\');" value="'+auth+'" title="Translation of Pv '+(vagga+1)+'.'+sno+' by '+auth+'">');cnt++;
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
                            if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || atiK[a].split('.')[2].indexOf(d)==0) {
                                if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
                                else {var sno = c;}
                                var auth = atiK[a].split('.')[3];
                                if (autha[auth]) {auth = autha[auth];}
                                if (atiK[a] == 'kn/ud/ud.6.09.olen.html') { atiK[a] = 'kn/ud/ud.6.09-olen.html';}
                                output.push('<input type=button class="btn" onclick="window.open(\'http://www.accesstoinsight.org/tipitaka/'+atiK[a]+'\');" value="'+auth+'" title="Translation of Thag '+vagga+'.'+sno+' by '+auth+'">');cnt++;
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
                            if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || atiK[a].split('.')[2].indexOf(d)==0) {
                                if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
                                else {var sno = c;}
                                var auth = atiK[a].split('.')[3];
                                if (autha[auth]) {auth = autha[auth];}
                                if (atiK[a] == 'kn/ud/ud.6.09.olen.html') { atiK[a] = 'kn/ud/ud.6.09-olen.html';}
                                output.push('<input type=button class="btn" onclick="window.open(\'http://www.accesstoinsight.org/tipitaka/'+atiK[a]+'\');" value="'+auth+'" title="Translation of Thig '+(vagga+1)+'.'+sno+' by '+auth+'">');cnt++;
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
    if (cnt > 0) {     return output; }
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
	if (document.form.nik.selectedIndex > 4) { return true; }
	else { return false };
}

function switchhier(htmp,stop) {

	var himg = ['l','m','r'];
	
	var htitle = [];
	htitle = ['Change to Mūla', 'Change to Aṭṭhakathā', 'Change to Ṭīkā'];
	

	if (htmp == 't' && limitt()) { 
		alert('Ṭīkā not available for '+nikname[document.form.nik.value]+'.');
		return; 
	}
	if (htmp == 'a' && document.form.nik.value == 'g') {
		alert('Atthakatha not available for Gram.');
		return;
	}
	hier = htmp;
	

	var ha = ['m','a','t'];

	for(i=0; i<ha.length; i++) {
		if (ha[i] == hier) {
			document.getElementById('dhier'+ha[i]).onmouseover=function() {
				return;
			};
			document.getElementById('dhier'+ha[i]).onmouseout=function() {
				return;
			};
			document.getElementById('dhier'+ha[i]).title = '';

			document.getElementById('dhier'+ha[i]).style.backgroundImage = 'url(images/'+himg[i]+'b1.png)';
		}
		else {
			document.getElementById('dhier'+ha[i]).onmouseover=function() {
				document.body.style.cursor='pointer';
			};
			document.getElementById('dhier'+ha[i]).onmouseout=function() {
				document.body.style.cursor='auto';
			};

			document.getElementById('dhier'+ha[i]).style.backgroundImage = 'url(images/'+himg[i]+'b0.png)';
		}
	}
		
	changenikaya(stop);
}	

function historyBox() {
	
	// history
	
	var hout = '';
	var theHistory = getHistory();
	if (theHistory) {
		hout = '<select title="History" onchange="var thisv = this.options[this.selectedIndex].value.replace(/\'/g,\'\').split(\',\'); if (thisv != \'0\'){ getplace(thisv); importXML() }">';
		hout += '<option value="0">History</option>';
		var isclear = '';
		for (i in theHistory) {
			var thist = theHistory[i].split('@');
			var thist0 = replaceunistandard(thist[0]);
			if (thist0.length > (maxlength - 3)) thist0 = thist0.substring(0,(maxlength-3)) + '...';
			hout += '<option value="'+thist[1]+'">' + thist0  + '</option>';
		}
		hout += '</select> <a href="javascript:void(0)" title="Clear History" onclick="clearHistory(1);">x</a>';
	}
		
	document.getElementById('history').innerHTML = hout;
	
}
