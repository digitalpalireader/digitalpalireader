
function getBookName(nik, ht, no) { // nik is nikaya, ht is a G_hier, no will be xml no - 1


	if (nik == 'k' || nik == 'y') {
		no = G_kynames[nik][no];
		if(ht != 'm') no = no.replace(/([^a]) 1$/,'$1');
	}
	else no++;
	return no.toString();
}


function getDppnEntry(term) {
	if(typeof(D) == 'undefined')
		addJS(['dppn']);
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
