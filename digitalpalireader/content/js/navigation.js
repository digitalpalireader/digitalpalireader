
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


function getSuttaNumber(nik,book,meta,volume,vagga,sutta,section,hier,sectlength) { // book, meta, etc. should be -1 (0,1,2...)
	
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
	
	nik = G_nikShortName[is[0]];
	
	var a1 = parseInt(is[1]);
	var a2 = (is[2] ? parseInt(is[2]) : 1);
	
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
			meta = 0;
			volume = 0;
			sutta = 0;
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
			
			meta = 0;
			volume = 0;
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
			meta = 0;
			volume = 0;
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
			if(found == 0) return;
			meta = 0;
			volume = 0;
		break;
		default:
			return;
		break;
	}
	return [nik,book,meta,volume,vagga,sutta,section,hiert];
}
