var G_hier = 'm';

var oldnikaya = 0;


var G_XMLFileArray = []; // [nik+book] = [m,a,t]
G_XMLFileArray["v1"] = [1,1,1];
G_XMLFileArray['v2'] = [1,1,1];
G_XMLFileArray['v3'] = [1,1,1];
G_XMLFileArray['v4'] = [1,1,1];
G_XMLFileArray['v5'] = [1,1,1];
G_XMLFileArray['v6'] = [1,1,1];
G_XMLFileArray['v7'] = [0,0,1];
G_XMLFileArray['v8'] = [0,0,1];
G_XMLFileArray['v9'] = [0,0,1];
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

G_listTitles = ['meta','volume','vagga','sutta','section'];

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
nikvoladi['vm'] = ['Pārā','Pāci','BhīV','Mv','Cv','Pariv'];
nikvoladi['va'] = ['Pārā','Pāci','BhīV','Mv','Cv','Pariv'];
nikvoladi['vt'] = ['Pārā','Pāci','BhīV','Mv','Cv','Pariv','Dvem','VinS-A','VajB-T'];
nikvoladi['ym'] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];
nikvoladi['ya'] = [0,1,2,3,4,5,8];
nikvoladi['yt'] = [0,1,2,3,4,5,8];
nikvoladi['x'] = [1,2];
nikvoladi['b'] = ['Mūla','Ṭīkā'];
nikvoladi['gm'] = ['Mog','Kac','SPM','SDhM','PRS'];
nikvoladi['ga'] = [];
nikvoladi['gt'] = [];

var G_nikFullNames = [];
G_nikFullNames['v'] = 'Vinaya';
G_nikFullNames['d'] = 'Dīgha';
G_nikFullNames['m'] = 'Majjhima';
G_nikFullNames['s'] = 'Saṃyutta';
G_nikFullNames['a'] = 'Aṅguttara';
G_nikFullNames['k'] = 'Khuddaka';
G_nikFullNames['y'] = 'Abhidhamma';
G_nikFullNames['x'] = 'Vism';
G_nikFullNames['b'] = 'Abhidh-s';
G_nikFullNames['g'] = 'Byākaraṇa';

var G_kVaggas = []

function makekVaggas() {
	G_kVaggas[1] = [[],[9],-1]; // don't show in indexes
	G_kVaggas[2] = [[],[26],-1]; 
	G_kVaggas[3] = [[10,10,10,10,10,10,10,10],[],6];
	G_kVaggas[4] = [[10,10,7,10,12,10,10,10,10,10,13],[3,5,10],6];
	G_kVaggas[5] = [[12,14,12,16,19],[],6];
	G_kVaggas[6] = [[17,11,10,12,14,10,11],[4],6];
	G_kVaggas[7] = [[12,13,10,16],[],6];
	G_kVaggas[8] = [[0,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,9,16,12,12,14,5,3,1,7,1,2,1,2,2,10,3,1,1,1,1],[1,13,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38],6];
	G_kVaggas[9] = [[18,10,8,1,12,8,3,1,1,1,1,1,5,1,1,1],[],6];
	G_kVaggas[10] = [[12],[42,56],6];
	for(var i=0;i<54;i++)
		G_kVaggas[10][0].push(10);
	G_kVaggas[10][0].push(11);
	G_kVaggas[11] = [[10,10,10,10],[],6,true]; // true means shift from vagga to sutta
	G_kVaggas[12] = [[],[29],-1];
	G_kVaggas[13] = [[10,10,15],[],6];
	G_kVaggas[14] = [[],[15,25,30,35,38,40,42,43,44,45,46,47,48,49,50,51],-1];
	for(var i=0;i<37;i++)
		G_kVaggas[14][0].push(10);
	G_kVaggas[14][0] = G_kVaggas[14][0].concat([5,10,10,10,11,10,12,16,9,10,10,13,14,10]);
	G_kVaggas[15] = [[],[5,8,10,12,17,27],-1,false,520];
	for(var i=0;i<27;i++)
		G_kVaggas[15][0].push(1);
}
makekVaggas();



function getSuttaNumber(nik,book,meta,volume,vagga,sutta,section,hier,sectlength,which) { // book, meta, etc. should be -1 (0,1,2...)
	
	var no;
	book = parseInt(book);
	meta = parseInt(meta);
	volume = parseInt(volume);
	vagga = parseInt(vagga);
	sutta = parseInt(sutta);
	section = parseInt(section);
	sectlength = parseInt(sectlength);
	
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
			switch (true) {
				case (book > 3):
					vagga += 10;
				case (book > 2):
					vagga += 13;
				case (book > 1):
					vagga += 10;
				case (book > 0):
					vagga += 11;
				break;
			}
			if(!smlist[vagga] || !smlist[vagga][sutta] || !smlist[vagga][sutta][section]) break;
			no = (vagga+1) + '.' + smlist[vagga][sutta][section];
		break;
		case 'k':
			var kv = G_kVaggas[book+1];
			if(hier != 'm' || !kv || (which && kv[2] != which)) return;
			var osec = 0;
			var osut = 0;

			if(!kv[0].length) { // vaggas only
				section = vagga;
			}
			else if(kv[1].length) {
				if(vagga > 0) {
					sutta+=kv[1][vagga-1];
				}
				for(var i = 0; i < sutta; i++) {
					section+=kv[0][i];
				}
			}
			else {
				if(kv[3] == 1)
					vagga = sutta;
				for(var i = 0; i < vagga; i++) {
					section+=kv[0][i];
				}
			}
			if(kv[4]) // jataka 2
				section+=kv[4];
			no = (book+1) +'.' + (section+1);
		break;
	}
	return no;
}

function getSuttaFromNumber(is) { // should be in array format SN,1,1
	var nik,book,meta,volume,vagga,sutta,section,hiert;

	// get att, tik
	
	if(/-[at]$/.exec(is[0])) {
		hiert = is[0].split('-')[1];
		is[0] = is[0].split('-')[0];
	}
	else hiert = 'm';
	is[0] = is[0].toUpperCase();
	
	if(is[0].length == 1)
		is[0] = is[0]+'N';

	nik = G_nikShortName[is[0]]; // letter
	
	var a1 = parseInt(is[1]); // number first part
	var a2 = (is[2] ? parseInt(is[2]) : 1); // second part, if exists
	
	book = 0;
	
	switch (nik) {
		case 'd': // sutta.section to book.vagga.section
			if(a1 > 34) return;
			vagga = a1 - 1;
			switch (true) {
				case (a1 > 23):
					vagga -= 10;
					book++;
				case (a1 > 13):
					vagga -= 13;
					book++;
				break;
			}
			section = a2-1;
		break;
		case 'm': // sutta.section to book.vagga.sutta.section
			if(a1 > 152) return;
			sutta = a1 - 1;
			vagga = Math.floor((sutta > 139 ? sutta-2 : sutta)/10);
			sutta -= (vagga*10)
			if (a1 > 142) sutta -= 2;
			
			book = Math.floor(vagga/5);
			vagga -= book*5
			
			section = a2-1;
		break;
		case 'a':  // book.sutta to book.vagga.sutta.section
			if(a1 > 11) return;
			if(hiert != 'm') return;
			book = a1 - 1;
			var found = 0;
			out:
			for (vagga in amlist[book]) {
				for(sutta in amlist[book][vagga]) {
					for(section in amlist[book][vagga][sutta]) {
						if (parseInt(amlist[book][vagga][sutta][section][0]) == a2 || (parseInt(amlist[book][vagga][sutta][section][0]) < a2 && parseInt(amlist[book][vagga][sutta][section][amlist[book][vagga][sutta][section].length-1]) > a2)) {
							found = 1;
							break out;
						}
					}
				}
			}
			if(found == 0) return;
		break;
		case 's':
			if(a1 > 56) return;
			if(hiert != 'm') return;
			a1--;
			vagga = a1;
			switch (true) {
				case (a1 > 43):
					vagga -= 10;
					book++;
				case (a1 > 33):
					vagga -= 13;
					book++;
				case (a1 > 20):
					vagga -= 10;
					book++;
				case (a1 > 10):
					vagga -= 11;
					book++;
				break;
			}
			var found = 0;
			out:
			for(sutta in smlist[a1]) {
				for(section in smlist[a1][sutta]) {
					if (parseInt(smlist[a1][sutta][section]) == a2) {
						found = 1;
						break out;
					}
				}
			}
		break;
		case 'k':
			if(hiert != 'm') return;
			book = a1-1;
			switch(a1) {
				case 1:
					if(a2 <0 || a2 > 9)
						return;
					vagga = a2-1;
				break;
				case 2:
					if(a2 <0 || a2 > 26)
						return;
					vagga = a2-1;
				break;
				default:
					var vss = vssCalc(a1,a2);
					if(!vss)
						return;
					vagga = vss[0];
					sutta = vss[1];
					section = vss[2];
				break;
			}
		break;
		default:
			return;
		break;
	}
	return [nik,book,meta?meta:0,volume?volume:0,vagga?vagga:0,sutta?sutta:0,section?section:0,hiert];
}

function vssCalc(a1,a2) { // calculate a three dimensional hierarchy
	var vss = G_kVaggas[a1];
	if(!vss)
		return;
	var ss = vss[0];
	var vs = vss[1];

	if(!ss.length) { // vaggas only
		return (a2 > vs[0]?null:[a2-1,0,0]);
	}	
	var cnt = 0;
	for (i in ss) {
		cnt+=ss[i];
	}
	if(vss[4])
		a2-=vss[4];
	if(a2>cnt)
		return;

	
	cnt = 0;
	var cnt2 = 0;
	var vagga = 0;
	var sutta = 0;
	var section = 0;

	for (i in ss) {
		cnt+=ss[i];
		if(a2 > cnt) {
			cnt2++;
			sutta++;
			if(vs.length && cnt2 >= vs[vagga]) {
				sutta = 0;
				vagga++;
			}
		}
		else {
			section = a2 - 1;
			for(j=0;j<cnt2; j++) {
				section -= ss[j];
			}
			break;
		}
			
	}

	if(vs.length || vss[3])
		return [vagga,sutta,section];
	else
		return [sutta,0,section];
}


function convertShortLink(place) {
	
	place = place.toLowerCase();
	
	if(!/^[A-Za-z]{1,4}-{0,1}[atAT]{0,1} {0,1}[\d]{1,}\.{0,1}[\d]*$/.test(place)) return [false,'Syntax Error','yellow'];  // loose syntax

	if(/^dhpv[ .]*[0-9]+$/.test(place)) { // dhp verses
		var dhpno = parseInt(place.replace(/[^0-9]/g,''));
		var dp = dhpv[dhpno];
		return ['k',1,0,0,dp[0],0,0,'m',dp[1]+1];
	}
	
	if(/^[A-Za-z]+ {0,1}([\d]+)$/.test(place)) {

		// kn subs
		var arr = [];
		arr['khp'] = 1;
		arr['dhp'] = 2;
		arr['ud'] = 3;
		arr['it'] = 4;
		arr['snp'] = 5;
		arr['vv'] = 6;
		arr['pv'] = 7;
		arr['th'] = 8;
		arr['thi'] = 9;
		arr['apa'] = 10;
		arr['api'] = 11;
		arr['bv'] = 12;
		arr['cp'] = 13;
		arr['ja'] = [14,520];

		for(var i in arr) {
			if(place.indexOf(i) === 0) {
				//alert(i);
				var no = place.replace(/^[A-Za-z]+ *([\d]+)$/,"$1");
				if(typeof(arr[i]) == 'object') { // multiple
					if(parseInt(no) > arr[i][1]) {
						no = parseInt(no) - arr[i][1];
					}
					place = 'kn'+arr[i][0]+'.'+no;
				}
				else
					place = 'kn'+arr[i]+'.'+no;
			}
		}
	}
	if(!/^[DMASKdmask][Nn]{0,1}-{0,1}[atAT]{0,1} {0,1}[0-9]+\.{0,1}[0-9]*$/.test(place)) 
		return [false,'Syntax Error','yellow'];

	place = place.replace(/^([DMASKdmask][Nn]{0,1}-{0,1}[atAT]{0,1})([0-9])/,"$1,$2").replace(/[ .]/g,',');
	
	var outplace = getSuttaFromNumber(place.split(','));
	if(!outplace) return [false,'Link not found','yellow'];
	return outplace;
}
