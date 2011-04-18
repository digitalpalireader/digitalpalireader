var G_hier = 'm';

var oldnikaya = 0;

function changeSet(noget)
{
	var nik = document.getElementById('set').value;
	if (nik != '') 
	{
		if (G_hier == 't' && limitt(document.getElementById('set').selectedIndex)) { 
			alert('Ṭīkā not available for '+G_nikLongName[document.getElementById('set').value]+'.');
			document.getElementById('set').selectedIndex = oldnikaya;
			return; 
		} 
		if (G_hier == 'a' && document.getElementById('set').value == 'g') {
			alert('Atthakatha not available for Gram.');
			document.getElementById('set').selectedIndex = oldnikaya;
			return;
		}
		if (G_hier == 'a' && document.getElementById('set').value == 'b') {
			alert('Atthakatha not available for Abhidh-s.');
			document.getElementById('set').selectedIndex = oldnikaya;
			return;
		}
		oldnikaya = document.getElementById('set').selectedIndex;
		
		setBookList(nik);
		updateHierarchy(0,1);
		//if (noget) gettitles(0,1); // don't load the passage
		//else gettitles(0,2);
	}
}



var G_XMLFileArray = []; // [nik+book] = [m,a,t]
G_XMLFileArray["v1"] = [1,1,1];
G_XMLFileArray['v2'] = [1,1,1];
G_XMLFileArray['v3'] = [1,1,1];
G_XMLFileArray['v4'] = [1,1,1];
G_XMLFileArray['v5'] = [1,1,1];
G_XMLFileArray['v6'] = [1,1,1];
G_XMLFileArray['d1'] = [1,1,1];
G_XMLFileArray['d2'] = [1,1,1];
G_XMLFileArray['d3'] = [1,1,1];
G_XMLFileArray['m1'] = [1,1,1];
G_XMLFileArray['m2'] = [1,1,1];
G_XMLFileArray['m3'] = [1,1,1];
G_XMLFileArray['s1'] = [1,1,1];
G_XMLFileArray['s2'] = [1,1,1];
G_XMLFileArray['s3'] = [1,1,1];
G_XMLFileArray['s4'] = [1,1,1];
G_XMLFileArray['s5'] = [1,1,1];
G_XMLFileArray['a1'] = [1,1,1];
G_XMLFileArray['a2'] = [1,1,1];
G_XMLFileArray['a3'] = [1,1,1];
G_XMLFileArray['a4'] = [1,1,1];
G_XMLFileArray['a5'] = [1,1,1];
G_XMLFileArray['a6'] = [1,1,1];
G_XMLFileArray['a7'] = [1,1,1];
G_XMLFileArray['a8'] = [1,1,1];
G_XMLFileArray['a9'] = [1,1,1];
G_XMLFileArray['a10'] = [1,1,1];
G_XMLFileArray['a11'] = [1,1,1];
G_XMLFileArray['k1'] = [1,1,0];
G_XMLFileArray['k2'] = [1,1,0];
G_XMLFileArray['k3'] = [1,1,0];
G_XMLFileArray['k4'] = [1,1,0];
G_XMLFileArray['k5'] = [1,1,0];
G_XMLFileArray['k6'] = [1,1,0];
G_XMLFileArray['k7'] = [1,1,0];
G_XMLFileArray['k8'] = [1,1,0];
G_XMLFileArray['k9'] = [1,1,0];
G_XMLFileArray['k10'] = [1,1,0];
G_XMLFileArray['k11'] = [1,0,0];
G_XMLFileArray['k12'] = [1,1,0];
G_XMLFileArray['k13'] = [1,1,0];
G_XMLFileArray['k14'] = [1,1,0];
G_XMLFileArray['k15'] = [1,1,0];
G_XMLFileArray['k16'] = [1,0,0];
G_XMLFileArray['k17'] = [1,0,0];
G_XMLFileArray['k18'] = [1,0,0];
G_XMLFileArray['k19'] = [1,0,0];
G_XMLFileArray['k20'] = [1,0,0];
G_XMLFileArray['k21'] = [1,0,0];
G_XMLFileArray['y1'] = [1,1,1];
G_XMLFileArray['y2'] = [1,1,1];
G_XMLFileArray['y3'] = [1,1,1];
G_XMLFileArray['y4'] = [1,1,1];
G_XMLFileArray['y5'] = [1,1,1];
G_XMLFileArray['y6'] = [1,1,1];
G_XMLFileArray['y7'] = [1,0,0];
G_XMLFileArray['y8'] = [1,0,0];
G_XMLFileArray['y9'] = [1,1,1];
G_XMLFileArray['y10'] = [1,0,0];
G_XMLFileArray['y11'] = [1,0,0];
G_XMLFileArray['y12'] = [1,0,0];
G_XMLFileArray['y13'] = [1,0,0];
G_XMLFileArray['y14'] = [1,0,0];
G_XMLFileArray['x1'] = [1,1,0];
G_XMLFileArray['x2'] = [1,1,0];
G_XMLFileArray['b1'] = [1,0,0];
G_XMLFileArray['b2'] = [1,0,0];
G_XMLFileArray['g1'] = [1,0,0];
G_XMLFileArray['g2'] = [1,0,0];
G_XMLFileArray['g3'] = [1,0,0];
G_XMLFileArray['g4'] = [1,0,0];
G_XMLFileArray['g5'] = [1,0,0];


var G_hNumbers = [];
G_hNumbers['m'] = 0;
G_hNumbers['a'] = 1;
G_hNumbers['t'] = 2;

var G_hTitles = ['Mūla', 'Aṭṭhakathā', 'Ṭīkā'];

var G_hLetters = ['m','a','t'];


var G_nikLongName = new Array();
G_nikLongName['v'] = "Vin";
G_nikLongName['d'] = "DN";
G_nikLongName['m'] = "MN";
G_nikLongName['s'] = "SN";
G_nikLongName['a'] = "AN";
G_nikLongName['k'] = "KN";
G_nikLongName['y'] = "Abhi";
G_nikLongName['x'] = "Vism";
G_nikLongName['b'] = "AbhiS";
G_nikLongName['g'] = "Gram";


var G_nikShortName = [];
G_nikShortName['DN'] = "d";
G_nikShortName['MN'] = "m";
G_nikShortName['SN'] = "s";
G_nikShortName['AN'] = "a";
G_nikShortName['KN'] = "k";

var G_nikToNumber = new Array();
G_nikToNumber['v'] = "0";
G_nikToNumber['d'] = "1";
G_nikToNumber['m'] = "2";
G_nikToNumber['s'] = "3";
G_nikToNumber['a'] = "4";
G_nikToNumber['k'] = "5";
G_nikToNumber['y'] = "6";
G_nikToNumber['x'] = "7";
G_nikToNumber['b'] = "8";
G_nikToNumber['g'] = "9";

var G_numberToNik = [];
G_numberToNik.push('v');
G_numberToNik.push('d');
G_numberToNik.push('m');
G_numberToNik.push('s');
G_numberToNik.push('a');
G_numberToNik.push('k');
G_numberToNik.push('y');
G_numberToNik.push('x');
G_numberToNik.push('b');
G_numberToNik.push('g');



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

function getBookName(nik, ht, no) { // nik is nikaya, ht is a G_hier, no will be xml no - 1


	if (nik == 'k' || nik == 'y') {
		eval('no = '+nik+'names[\''+no+'\'];');
		if(ht != 'm') no = no.replace(/([^a]) 1$/,'$1');
	}
	else no++;
	return no.toString();
}

function setBookList(nik) {
	var checkNikaya = '<table><tr><td valign="top">';
	
	if (nikvoladi[nik]) var titles = nikvoladi[nik];
	else var titles = nikvoladi[nik+G_hier];
	
	var bookNode = document.getElementById('book');
	while(bookNode.itemCount > 0) bookNode.removeItemAt(0);
	
	for (i = 0; i < titles.length; i++) {
		bookNode.appendItem(((nik == 'k' || nik == 'y') ? eval(nik+'names['+titles[i]+']') : titles[i]),((nik == 'k' || nik == 'y') ? (titles[i]+1) : (i+1)));
		if(i == Math.ceil(titles.length/2)) checkNikaya += '</td><td valign="top">';
		checkNikaya += '<input type="checkbox" id="tsoBObook'+((nik == 'k' || nik == 'y') ? (titles[i]+1) : (i+1)) +'" title="Include in search" checked> <span class="tiny">'+((nik == 'k' || nik == 'y') ? eval(nik+'names['+titles[i]+']') : (typeof(titles[i]) == 'number' ? 'Book ' : '') + titles[i])+'</span><br/>';
	}
	bookNode.selectedIndex = 0;
	checkNikaya += '</td></tr></table>';
//	document.getElementById('tsoBO').innerHTML = checkNikaya;
	
}




function xmlrefer()
{
	var nik = document.getElementById('set').selectedIndex;
	var book = document.getElementById('book').selectedIndex;
	var sutta = document.form.sutta.selectedIndex;
	var sect = document.form.section.selectedIndex;
	var ref = '<xml>' + nik + ',' + book + ',' + sutta + ',' + sect + '</xml>'
	document.form.xmlref.value = ref;
}

function limitt(nikn) {
	if (nikn == 5 || nikn > 6) { return true; }
	else { return false };
}

function switchhier(htmp,stop) {

	if(G_hier == htmp) return;
	
	var himg = ['l','m','r'];
		

	if (htmp == 't' && limitt(document.getElementById('set').selectedIndex)) { 
		alert('Ṭīkā not available for ' + G_nikLongName[document.getElementById('set').value]+'.');
		document.getElementById((G_hier=='m'?'mul':'att')).checked=true;
		document.getElementById((G_hier=='m'?'mul':'att')).disabled=true;
		document.getElementById('tik').removeAttribute('checked');
		document.getElementById('tik').removeAttribute('disabled');
		return; 
	}
	if (htmp == 'a' && document.getElementById('set').selectedIndex > 7) {
		alert('Aṭṭhakathā not available for ' + G_nikLongName[document.getElementById('set').value]+'.');
		document.getElementById('mul').checked=true;
		document.getElementById('mul').disabled=true;
		document.getElementById('att').removeAttribute('checked');
		document.getElementById('att').removeAttribute('disabled');
		return;
	}
	if (document.getElementById('set').value == 'k' && htmp == 'a' && kudvala[document.getElementById('book').value] == undefined) {
			alert('Aṭṭhakathā not available for '+getBookName(document.getElementById('set').value,htmp,document.getElementById('book').selectedIndex)+'.');
			document.getElementById('mul').checked=true;
			document.getElementById('mul').disabled=true;
			document.getElementById('att').removeAttribute('checked');
			document.getElementById('att').removeAttribute('disabled');
		return;
	}

	G_hier = htmp;

	// style
	
	var himg = ['t','c','b'];
	
	ha = G_hLetters;

	if (document.getElementById('set').value == 'k') {
		var book = document.getElementById('book').value;
		if (htmp == 'm') {
			book = parseInt(book) - 1;
			changeSet(1);
			document.getElementById('book').selectedIndex = book;
		}
		else {
			book = kudvala[book];
			changeSet(1);
			document.getElementById('book').selectedIndex = book;
		}
	}
	else if (document.getElementById('set').value == 'y') {
		var book = document.getElementById('book').value;
		if (htmp == 'm') {
			book = parseInt(book) - 1;
			changeSet(1);
			document.getElementById('book').selectedIndex = book;
		}
		else {
			book = abhivala[book];
			changeSet(1);
			document.getElementById('book').selectedIndex = book;
		}
	}
	updateHierarchy(0,stop);
	return true;
}	
