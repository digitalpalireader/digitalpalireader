
function getBookName(nik, ht, no) { // nik is nikaya, ht is a G_hier, no will be xml no - 1


	if (nik == 'k' || nik == 'y') {
		no = G_kynames[nik][no];
		if(ht != 'm') no = no.replace(/([^a]) 1$/,'$1');
	}
	else no++;
	return no.toString();
}


function getDppnEntry(term) {
	var dppnEntry = [];
	if(typeof(D[term]) == 'object') {
		dppnEntry = D[term];
	}
	else {
		if(typeof(D[term.replace(/\.m$/,'')]) == 'object') {
			dppnEntry = D[term.replace(/\.m$/,'')];
		}
		else if(typeof(D[term.replace(/o$/,'a')]) == 'object') {
			dppnEntry = D[term.replace(/o$/,'a')];
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
				for(i = 0; i < sutta; i++) {
					section+=kv[0][i];
				}
			}
			else {
				if(kv[3] == 1)
					vagga = sutta;
				for(i = 0; i < vagga; i++) {
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

var G_kVaggas = []
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
for(i=0;i<54;i++)
	G_kVaggas[10][0].push(10);
G_kVaggas[10][0].push(11);
G_kVaggas[11] = [[10,10,10,10],[],6,true]; // true means shift from vagga to sutta
G_kVaggas[12] = [[],[29],-1];
G_kVaggas[13] = [[10,10,15],[],6];
G_kVaggas[14] = [[],[15,25,30,35,38,40,42,43,44,45,46,47,48,49,50,51],-1];
for(i=0;i<37;i++)
	G_kVaggas[14][0].push(10);
G_kVaggas[14][0] = G_kVaggas[14][0].concat([5,10,10,10,11,10,12,16,9,10,10,13,14,10]);
G_kVaggas[15] = [[],[5,8,10,12,17,27],-1,false,520];
for(i=0;i<27;i++)
	G_kVaggas[15][0].push(1);

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

//~ function vsCalc(a1,a2) { // calculate a two dimensional hierarchy
	//~ var cnt = 0;
	//~ var vagga = 0;
	//~ var section = 0;
	//~ for (i in ss) {
		//~ cnt+=ss[i];
	//~ }
	//~ if(a2>cnt)
		//~ return;
		//~ 
	//~ cnt =0;
//~ 
	//~ for (i in ss) {
		//~ cnt+=ss[i];
		//~ if(a2 > cnt) {
			//~ vagga++;
		//~ }
		//~ else {
			//~ section = a2 - 1;
			//~ for(j=0;j<vagga; j++) {
				//~ section -= ss[j];
			//~ }
			//~ break;
		//~ }
			//~ 
	//~ }
	//~ return [vagga,section];
//~ }

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
