var G_hier = 'm';

var oldnikaya = 0;


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
var G_hshort = [];
G_hshort['m'] = 'mul';
G_hshort['a'] = 'att';
G_hshort['t'] = 'tik';


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

var G_kynames = [];
G_kynames['k'] = [];
G_kynames['y'] = [];

G_kynames['k'].push('Khp');
G_kynames['k'].push('Dhp');
G_kynames['k'].push('Ud');
G_kynames['k'].push('It');
G_kynames['k'].push('Sn');
G_kynames['k'].push('Vv');
G_kynames['k'].push('Pv');
G_kynames['k'].push('Th');
G_kynames['k'].push('Thī');
G_kynames['k'].push('Ap.1');
G_kynames['k'].push('Ap.2');
G_kynames['k'].push('Bv');
G_kynames['k'].push('Cp');
G_kynames['k'].push('Ja 1');
G_kynames['k'].push('Ja 2');
G_kynames['k'].push('Nidd I');
G_kynames['k'].push('Nidd II');
G_kynames['k'].push('Paṭis');
G_kynames['k'].push('Mil');
G_kynames['k'].push('Nett');
G_kynames['k'].push('Peṭ');

G_kynames['y'].push('Dhs');
G_kynames['y'].push('Vibh');
G_kynames['y'].push('Dhātuk');
G_kynames['y'].push('Pp');
G_kynames['y'].push('Kv');
G_kynames['y'].push('Yam');
G_kynames['y'].push('Yam 2');
G_kynames['y'].push('Yam 3');
G_kynames['y'].push('Paṭṭh');
G_kynames['y'].push('Paṭṭh 2');
G_kynames['y'].push('Paṭṭh 3');
G_kynames['y'].push('Paṭṭh 4');
G_kynames['y'].push('Paṭṭh 5');
G_kynames['y'].push('Paṭṭh 6');

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

var DPRNav = {
	changeSet:function(noget,book){
		var nik = document.getElementById('set').value;
		if (G_hier == 't' && this.limitt(document.getElementById('set').selectedIndex)) { 
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
		
		this.setBookList(nik,book);
		DPRXML.updateHierarchy(0);
	},


	getBookName:function (nik, ht, no) { // nik is nikaya, ht is a G_hier, no will be xml no - 1


		if (nik == 'k' || nik == 'y') {
			no = G_kynames[nik][no];
			if(ht != 'm') no = no.replace(/([^a]) 1$/,'$1');
		}
		else no++;
		return no.toString();
	},

	setBookList:function(nik,book) {
		var checkNikaya = '<table><tr><td valign="top">';
		
		if (nikvoladi[nik]) var titles = nikvoladi[nik];
		else var titles = nikvoladi[nik+G_hier];
		var bookNode = document.getElementById('book');
		while(bookNode.itemCount > 0) bookNode.removeItemAt(0);
		for (i = 0; i < titles.length; i++) {
			if(nik == 'k' || nik == 'y') {
				var title = G_kynames[nik][titles[i]];
				var val = titles[i]+1;
			}
			else {
				var title = titles[i];
				var val = i+1;
			}
			bookNode.appendItem(title);
			bookNode.getItemAtIndex(i).value = val;
		}
		bookNode.selectedIndex = book?book:0;
	},

	 limitt:function(nikn) {
		if (nikn == 5 || nikn > 6) { return true; }
		else { return false };
	},

	setSearchBookList:function() {
		var nik = document.getElementById('tsoSETm').value;

		if (nikvoladi[nik]) var titles = nikvoladi[nik];
		else var titles = nikvoladi[nik+document.getElementById('tsoMAT2m').value];

		
		var bookNode = document.getElementById('tsoBOOKm');
		bookNode.removeAllItems();	

		var bookNode2 = document.getElementById('tsoBOA');
		while(bookNode2.hasChildNodes()) bookNode2.removeChild(bookNode2.firstChild);

		for (i = 0; i < titles.length; i++) {

			// menu			

			bookNode.appendItem(((nik == 'k' || nik == 'y') ? G_kynames[nik][titles[i]] : G_nikLongName[nik] + ' ' + titles[i]),((nik == 'k' || nik == 'y') ? (titles[i]+1) : (i+1)));
			bookNode.selectedIndex = 0;		

			// check boxes
			
			var newCheck = document.createElement('checkbox');
			newCheck.setAttribute('checked',true);
			newCheck.setAttribute('class','tiny');
			newCheck.setAttribute('label',((nik == 'k' || nik == 'y') ? G_kynames[nik][titles[i]] : (typeof(titles[i]) == 'number' ? 'Book ' : '') + titles[i]));
			newCheck.setAttribute('id','tsoBObook'+(i+1));
			newCheck.setAttribute('value',((nik == 'k' || nik == 'y') ? (titles[i]+1) : (i+1)));
			if(i == Math.ceil(titles.length/2)) {
				bookNode2 = document.getElementById('tsoBOB');
				while(bookNode2.hasChildNodes()) bookNode2.removeChild(bookNode2.firstChild);
			}
			bookNode2.appendChild(newCheck);

		}
		DPRXML.updateSearchHierarchy(0)
	},
	

	switchhier:function(htmp) {

		if(G_hier == htmp) return;
		
		var himg = ['l','m','r'];

		if (htmp == 't' && this.limitt(document.getElementById('set').selectedIndex)) { 
			var MAT = document.getElementById('mul').checked==true?'mul':'att';
			alert('Ṭīkā not available for ' + G_nikLongName[document.getElementById('set').value]+'.');
			setTimeout(function(){document.getElementById(MAT).checked=true},10);
			return; 
		}
		if (htmp == 'a' && document.getElementById('set').selectedIndex > 7) {
			alert('Aṭṭhakathā not available for ' + G_nikLongName[document.getElementById('set').value]+'.');
			setTimeout(function(){document.getElementById('mul').checked=true},10);
			return;
		}
		if (document.getElementById('set').value == 'k' && htmp == 'a' && kudvala[document.getElementById('book').value] == undefined) {
				alert('Aṭṭhakathā not available for '+this.getBookName(document.getElementById('set').value,htmp,document.getElementById('book').selectedIndex)+'.');
			setTimeout(function(){document.getElementById('mul').checked=true},10);
			return;
		}

		G_hier = htmp;


		if (document.getElementById('set').value == 'k') {
			var book = document.getElementById('book').value;
			if (htmp == 'm') {
				book = parseInt(book) - 1;
				this.changeSet(1,book);
			}
			else {
				book = kudvala[book];
				this.changeSet(1,book);
			}
		}
		else if (document.getElementById('set').value == 'y') {
			var book = document.getElementById('book').value;
			if (htmp == 'm') {
				book = parseInt(book) - 1;
				this.changeSet(1,book);
			}
			else {
				book = abhivala[book];
				this.changeSet(1,book);
			}
		}
		else DPRXML.updateHierarchy(0);
	},

	historyBox:function() {

		// history
		
		var hout = '';
		var theHistory = getHistory();
		if (theHistory.length > 0) {
			document.getElementById('hist-box').collapsed = false;
			var histNode = document.getElementById('history');
			while(histNode.itemCount > 0) histNode.removeItemAt(0);
			var isclear = '';
			histNode.appendItem('-- History --','0');
			for (i=0;i<theHistory.length;i++) {
				var thist = theHistory[i].split('@');
				var thist0 = toUni(thist[0]);
				histNode.appendItem(thist0,thist[1]);
				
				var ch = histNode.childNodes[0].childNodes;
				var x=thist[1].split(',');
				ch[i+1].setAttribute('onclick',"DPRSend.openPlace(['"+x[0]+"',"+x[1]+","+x[2]+","+x[3]+","+x[4]+","+x[5]+","+x[6]+",'"+x[7]+"'],null,null,DPRSend.eventSend(event));");
			}
			histNode.selectedIndex = 0;
		}
		else document.getElementById('hist-box').collapsed = true;
	},

	bookmarkXML:function(){
		var cont = readFile('DPR_Bookmarks');
		cont = (cont ? cont.join('\n') : '<?xml version="1.0" encoding="UTF-8"?>\n<xml></xml>');
		var parser=new DOMParser();
		var xmlDoc = parser.parseFromString(cont,'text/xml');
		return xmlDoc;
	},

	bookmarkBox:function() {
		var xmlDoc = this.bookmarkXML();
	
		var bNodes = xmlDoc.getElementsByTagName('bookmark');
		if (bNodes.length > 0) {
			document.getElementById('bm-box').collapsed = false;
			var bList = document.getElementById('bookmarks');
			while(bList.itemCount > 0) bList.removeItemAt(0);
			bList.appendItem('-- Bookmarks --');
			for(var i=0; i < bNodes.length; i++) {

				var name = bNodes[i].getElementsByTagName('name')[0].textContent;
				var loc = bNodes[i].getElementsByTagName('location')[0].textContent.split('#');
				var scroll = bNodes[i].getElementsByTagName('scroll')[0].textContent;
				var desc = bNodes[i].getElementsByTagName('description')[0].textContent;
			
				bList.appendItem(name);

				var ch = bList.childNodes[0].childNodes;
				ch[i+1].setAttribute('onclick',"DPRSend.openPlace(['"+loc[0]+"',"+loc[1]+","+loc[2]+","+loc[3]+","+loc[4]+","+loc[5]+","+loc[6]+",'"+loc[7]+"'],null,null,DPRSend.eventSend(event),"+scroll+");");
				ch[i+1].setAttribute('tooltiptext',desc);
			}
			bList.selectedIndex = 0;
			
		}
		else document.getElementById('bm-box').collapsed = true;
	},
	
	gotoPlace:function([nikaya,book,meta,volume,vagga,sutta,section,hiert]) {
		document.getElementById('set').value = nikaya;
		for(i in G_hshort) {
			if(i == hiert)
				document.getElementById(G_hshort[i]).setAttribute('checked',true);
			else 
				document.getElementById(G_hshort[i]).checked = false;
		}
		this.changeSet(1,book);
		this.switchhier(hiert);
		document.getElementById('book').selectedIndex = book;
		DPRXML.updateHierarchy(0);
		document.getElementById('meta').selectedIndex = meta;
		DPRXML.updateHierarchy(1);
		document.getElementById('volume').selectedIndex = volume;
		DPRXML.updateHierarchy(2);
		document.getElementById('vagga').selectedIndex = vagga;
		DPRXML.updateHierarchy(3);
		document.getElementById('sutta').selectedIndex = sutta;
		DPRXML.updateHierarchy(4);
		document.getElementById('section').selectedIndex = section;
		
	}
}
