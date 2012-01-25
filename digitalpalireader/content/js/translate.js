function translateTextx() {
	var a,b,c,d;
	var cc = [],dd = [],ee = [];
	var x = '';
	var y = '';
	var z = '';
	var cnt = 0;
	for (i in yt) {
		window.dump(cnt+' of 20926 - '+ Math.floor((cnt++)/20926*100)+'% finished\n');
		var aa = [],bb = [];
		var a = new RegExp('(^|[ .,;])'+toUni(i)+'($|[ .,;])');
		for(j in epd) {
			b = epd[j].split('^');
			if(a.test(b[1])) {
				c = yt[i][2].search(b[0]);
				if(c > -1) {
					window.dump(i+' in '+b[0]+'\n');
					aa[c] = b[0];
				}
				//else
					//bb.push(b[0]);
			}
		}
		if(aa.length)
			for(j in aa) {
				cc[i] = aa[j];
				break;
			}
		//~ else if(bb.length)
			//~ for(j in bb) {
				//~ cc[i] = bb[j];
				//~ break;
			//~ }
		else
			dd[i] = 'unknown';
	}
	
	for (i in cc)
		x+='eg["'+i+'"] = "'+cc[i]+'";<br/>';
	for (i in dd)
		y+='eg["'+i+'"] = "'+dd[i]+'";<br/>';
	
	$('#translation').html(x+'<hr/><hr/><hr/>'+y);
}
function translateText() {
	if(/^zzz/.test($('#input').val()))
		return translateTextx();
	var words = [];
	var subject = '';
	var outparts = [];
	var input = toUni($('#input').val().toLowerCase()).replace(G_uniRegExpNSG,'');

	history.pushState({}, 'Title', 'chrome://digitalpalireader/content/translate.htm?phrase='+toVel(input));

	$('#input').val(input);
	input=input.split(' ');
	for (i in input) {
		var trans = translateWord(input[i]);
		words.push(trans);
	}
	var out = arrangeWords(words);

	if(!out.subject.length) {
		if(G_verbDecl.length)
			subject = G_subjects[G_verbDecl[1]-1][G_verbDecl[2]-1];
	}
	else {
		subject = out.subject.join('&nbsp;').replace(/^ *(.+) */,"$1");
		var fL = subject.replace(/<[^>]+>/g,'').charAt(0);
		subject = subject.replace('>'+fL,'>'+fL.toUpperCase());
	}
	var verb = (out.verb.join()?out.verb.join('&nbsp;'):'');
	
	var obj = (out.object.join()?out.object.join('&nbsp;'):'');
	var other = (out.other.join()?out.other.join('&nbsp;'):'');
	if(subject)
		outparts.push(makeTable([[subject],['subject']],'sub'));
	if(verb)
		outparts.push(makeTable([[verb],['verb']],'verb'));
	if(obj)
		outparts.push(makeTable([[obj],['object']],'obj'));
	if(other)
		outparts.push(makeTable([[other],['other']],'other'));
	
	$('#translation').html(makeTable([outparts.concat([(G_verbDecl[0]==2?'!':'.')])],'trans'));
}

function arrangeWords(wordst) {
	G_subDecl = [];
	G_verbDecl = [];
	G_objDecl = [];

	var pendG = [];
	var pendI = [];
	
	var altChoices = []; // this is for later, when we offer alternatives
	
	var out = {
		subject:[],
		bverb:[],
		verb:[],
		object:[],
		other:[]
	};

	var outer = [];
	outer[0] = [];
	outer[1] = [];
	outer[2] = [];
	outer[3] = [];
	outer[4] = [];
	outer[5] = [];
	outer[6] = [];
	outer[7] = [];
	outer['bv'] = [];
	outer['v'] = [];
	outer['o'] = [];

	var inter = [];
	inter[0] = [];
	inter[1] = [];
	inter[2] = [];
	inter[3] = [];
	inter[4] = [];
	inter[5] = [];
	inter[6] = [];
	inter[7] = [];
	inter['bv'] = [];
	inter['v'] = [];
	inter['o'] = [];

	var chosen = []; // array of chosen, not to use twice.
	
	var tint = -1;
	
	var ca = 0,va = 0;
	
	var words = [];
	
	for(i in wordst) {
		// remove second ca, vaa
		if(wordst[i][0][3] == 'ca' && ca++) {
			ca = 0;
			continue;
		}
		else if(wordst[i][0][3] == 'vaa' && va++) {
			va = 0;
			continue;
		}
		words.push(wordst[i]);	
	}
	for(i in words) {
		for (j in words[i]) {
			if(!words[i][j][1] && !words[i][j][2])
				tint = 'o';
			else if(words[i][j][1] == 'bv')
				tint = 'bv';
			else if(words[i][j][1] == 'v')
				tint = 'v';
			else if(words[i][j][2])
				tint = words[i][j][2][1]-1;
			else
				tint = 'o';
			
			if(words[i].length == 1) { // force place if necessary
				if(tint == 'v')
					G_verbDecl = words[i][j][2];
				else if(tint == 0)
					G_subDecl = words[i][j][2];
				else if(tint == 1)
					G_objDecl = words[i][j][2];

				chosen[i] = [tint,j];
			}
			else // collect
				inter[tint].push([i,j]);
		}
	}
	
	
	
	//~ var g = [];
	//~ g[1] = [];
	//~ g[2] = [];
	//~ g[3] = [];

	var compat = [];
	
	// now prioritize subj, obj and verb
	
	if(inter[0].length) { // subjects
		compat = checkCompatibleNoun(inter[0],chosen,words);
		if(compat[1]) { // decided
			for(i in compat[0]) {
				if(!chosen[compat[0][i][0]])
					chosen[compat[0][i][0]] = [0,compat[0][i][1]];
			}
			G_subDecl = words[compat[0][0][0]][chosen[compat[0][0][0]][1]][2];
			inter[0] = [];
		}
		else { // punting
			inter[0] = [];
			inter[0] = inter[0].concat(compat[0]);
		}
	}
	
	if(inter[1].length) { // objects
		// remove chosen;
		var choices1 = [];
		
		for (i in inter[1])
			if(!chosen[inter[1][i][0]])
				choices1.push(inter[1][i]);
		
		compat = checkCompatibleNoun(choices1,chosen,words);
		if(compat[1]) {
			for(i in compat[0]) {
				if(!chosen[compat[0][i][0]])
					chosen[compat[0][i][0]] = [1,compat[0][i][1]];
			}
			G_objDecl = words[compat[0][0][0]][chosen[compat[0][0][0]][1]][2];
			inter[1] = [];
		}
		else { // punting
			inter[1] = [];
			for(i in compat[0]) {
				inter[1].push(compat[0][i]);
			}
		}
	}

	if(inter['v'].length) { // verbs
		// remove chosen;
		var choicesV = [];
		
		for (i in inter['v'])
			if(!chosen[inter['v'][i][0]])
				choicesV.push(inter['v'][i]);
		
		compat = checkCompatibleVerb(choicesV,chosen,words);
		if(compat[1]) {
			for(i in compat[0]) {
				if(!chosen[compat[0][i][0]])
					chosen[compat[0][i][0]] = ['v',compat[0][i][1]];
			}
			inter['v'] = [];
			G_verbDecl = words[compat[0][0][0]][compat[0][0][1]][2];
		}
		else { // punting
			inter['v'] = [];
			for(i in compat[0]) {
				inter['v'].push(compat[0][i]);
			}
		}
	}

	// if punted, recheck subjects, and choose
	
	if(inter[0].length && G_verbDecl) {
		// remove chosen;
		var choices0 = [];
		for (i in inter[0]) {
			if(!chosen[inter[0][i][0]])
				choices0.push(inter[0][i]);
		}
		if(choices0.length) {
			compat = checkCompatibleNoun(choices0,chosen,words);
			if(compat[1]) {
				for(i in compat[0]) {
					if(!chosen[compat[0][i][0]])
						chosen[compat[0][i][0]] = [0,compat[0][i][1]];
				}
				G_subDecl = words[compat[0][0][0]][chosen[compat[0][0][0]][1]][2];
				inter[0] = [];
			}
		}
	}
	// if still none, choose first
	if (inter[0].length && !G_subDecl) {
		chosen[inter[0][0][0]] = [0,inter[0][0][1]];
		G_subDecl = words[inter[0][0][0]][inter[0][0][1]];
		inter[0] = [];
	}

	// now, just fill them in, noting where we've forced. (this may have to change)

	for(i in words) {
		if(chosen[i]) {
			if(words[i][chosen[i][1]][2] && words[i][chosen[i][1]][2][1] == 6) { // genitive, keep with next
				pendG.push(words[i][chosen[i][1]]);
				continue;
			}	
			if(words[i][chosen[i][1]][1] == 'i') { // indec, keep with next
				pendI.push(words[i][chosen[i][1]]);
				continue;
			}	
			if(pendI.length) {
				for (k in pendI) {
					outer[chosen[i][0]].push(pendI[k]);
				}
				pendI = [];
			}
			outer[chosen[i][0]].push(words[i][chosen[i][1]]);
			altChoices.push([words[i],chosen[i][0]]);
			if(pendG.length) {
				outer[chosen[i][0]].push(G_joints['n'][5]);
				for (k in pendG) {
					outer[chosen[i][0]].push(pendG[k]);
				}
				pendG = [];
			}
			continue;
		}
		for(j in words[i]) {  // for the rest, choose first, then alt the rest
			var w = words[i][j];
			var vib = w[2]?w[2][1]:null;
			var type = w[1];

			if(vib == 1 || vib == 2 || type == 'v') // we've chosen them already;
				continue;

			if(w[2] && vib == 6) { // genitive, keep with next
				pendG.push(w);
				altChoices.push([words[i],j]);
				break;
			}	
			if(w[1] == 'i') { // indec, keep with next
				pendI.push(w);
				altChoices.push([words[i],j]);
				break;
			}	
			if(!w[1] && !w[2])
				tint = 'o';
			else if(w[2])
				tint = w[2][1]-1;
			else
				tint = 'o';
			if (pendI.length) { // add genatives
				for (k in pendI)
					outer[tint].push(pendI[k]);
				pendI = [];
			}
			if (pendG.length) { // add genatives
				for (k in pendG)
					outer[tint].push(pendG[k]);
				pendG = [];
			}
			outer[tint].push(w);
			altChoices.push([words[i],j]);
			break;
		}
	}
	
	for (i in outer) {
		if(outer[i].length > 1 || (outer[i].length == 1 && outer[i][0].length > 1)) {
			var joined = '';
			if(i != 'v' && i != 'o') // nominal, add prepositions, plural
				joined = addPhrasePreps(outer[i],i,'n');
			else if(i == 'v') // verbal, add prepositions
				joined = addPhrasePreps(outer[i],G_verbDecl[0]-1,'v');
			else
				for(j=0;j<outer[i].length;j++) {
					joined += (j>0?' ':'')+makeWord(outer[i][j]);
				}
				
			if(i == 0)
				out.subject.push(joined);
			else if(i == 1)
				out.object.push(joined);
			else if(i == 'bv')
				out.bverb.push(joined);
			else if(i == 'v')
				out.verb.push(joined);
			else
				out.other.push(joined);
		}
	}
	return out;	
}

function checkCompatibleNoun(input,chosen,words) {
	var outerb = [];
	if(input.length > 1) {
		
		var choices = [];
		
		var og = 7;
		// first, check for words that are already chosen for this array, use their gender
		for(i in chosen) {
			var ww = words[i];
			if(ww[0][2][0]!=7) {
				var og = ww[0][2][0];
			}
		}

		// second, if verb, coordinate with verb
		if(G_verbDecl) {
			var vv = G_verbDecl[1];
			var vn = G_verbDecl[2];
		}
		
		// filter out other genders, tenses and numbers (TODO tenses)
		for (i in input) {
			var g = words[input[i][0]][input[i][1]][2];
			if(g[0] & og && (!vn || g[2] == vn)) // okay
				choices.push(input[i]);
		}
		
		// if still multi, check and see if compatible
		if((og > 4 || og == 3) && choices.length > 1) {
			var gg = [0,0,0];
			for(i in choices) {
				g = words[choices[i][0]][choices[i][1]][2][0];
				for(j in gg){
					if(j & g)
						gg[j]++;
				}
			}
			// check compat
			for(j in gg){
				if(gg[j] == choices.length) { // all compatible
					for(i in choices) {
						outerb.push(choices[i]);
					}
					choices = [];
					break;
				}
			}
			// if still choices, punt
			input = [];
			for(i in choices) {
				input.push(choices[i]);
			}
		}
		else {
			for(i in choices) {
				outerb.push(choices[i]);
			}
			input = [];
		}
		
	}
	else {
		outerb.push(input[0]);
		input = [];
	}
	if(input.length || !outerb.length)
		return [input,false];
	else
		return [outerb,true];

}

function checkCompatibleVerb(input,chosen,words) {
	if(input.length > 1) {
		var choices = [];
		var outerb = [];
		
		// tense
		
		// first, check for words that are only this array, use their tense
		for(i in chosen) {
			var ww = words[i][0][2][0];
			break; // only one verb per sentence...
		}
		
		// if forced tense, filter out other tenses
		for (i in input) {
			var t = words[input[i][0]][input[i][1]][2][0];
			if(!ww || ww == t) // okay
				choices.push(input[i]);
		}
		
		// if still multi, check and see if compatible, multiple verbs (this IS rare...)
		if(choices.length > 1) {
			var tt = [];
			for(i in choices) {
				t = words[choices[i][0]][choices[i][1]][2][0];
				if(!tt[t])
					tt[t] = 1;
				else
					tt[t]++;
			}
			// check compat
			for(j in tt){
				if(tt[j] == choices.length) { // all compatible
					for(i in choices) {
						outerb.push(choices[i]);
					}
					choices = [];
					break;
				}
			}
			// if still choices, punt
			input = [];
			for(i in choices) {
				input.push(choices[i]);
			}
		}
		else {
			for(i in choices) {
				outerb.push(choices[i]);
			}
			input = [];
		}
		
	}
	else {
		outerb.push(input[0]);
		input = [];
	}
	if(input.length)
		return [input,false];
	else
		return [outerb,true];

}

function makeWord(word,pl) {
	return '<a class="green underline" href="dpr:index?analysis='+toVel(word[3])+'" title="'+(word[0] == word[3]?'lookup ':'translation of ')+word[3]+'">'+(pl?addPlural(word[0]):word[0])+'</a>';
}

function translateWord(word) {
	G_thisWord = word;
	var decls = [];
	var yto = [];
	var deca = [];
	var meta = []; // anything
	var vword = toVel(word);
	var type = '';
	var trans = '';
	var wtr = [];
	var outs = [];
	if(G_specWords[word]) {
		type = G_specWords[word][0];
		trans = G_specWords[word][1];
		deca = G_specWords[word][2];
		meta = [];
		meta['orig'] = word;
		outs.push([trans,type,deca,word,meta]);
	}
	if(eg[vword]) {
		meta = [];
		type = yt[vword][4].toLowerCase();
		trans = eg[vword];
		if(type == 'i' || type == 'p') {
			meta['orig'] = word;
			deca = null;
			outs.push([trans,type,deca,word,meta]);
		}
		else{
			for(i in G_defDecl[type]) {
				if(G_defDecl[type][i][0].test(vword)){
					deca = G_defDecl[type][i][1][0];
					meta = [];
					meta['orig'] = word;
					outs.push([trans,type,deca,word,meta]);
				}
			}
		}
	}
	else if(engVerbs[word]) {
		type = 'v';
		trans = engVerbs[word];
		for(i in G_defDecl['v']) {
			if(G_defDecl['v'][i][0].test(vword)){
				deca = G_defDecl['v'][i][1][0];
				meta = [];
				meta['orig'] = word;
				outs.push([trans,type,deca,word,meta]);
			}
		}
	}
	else {
		
		if(yt[vword]) {
			type = yt[vword][4].toLowerCase();
			if(type == 'i' || type == 'p') {
				trans = stripEnglish(yt[vword][2]);
				deca = null;
				meta = [];
				meta['orig'] = word;
				outs.push([trans,type,deca,word,meta]);
			}
			else {
				first:
				for(i in G_defDecl[type]) {
					if(G_defDecl[type][i][0].test(vword)){
						decls = G_defDecl[type][i][1];
						for(c in decls) { // just get the first one for now
							trans = stripEnglish(yt[vword][2]);
							deca = decls[c];
							meta = [];
							meta['orig'] = word;
							outs.push([trans,type,deca,word,meta]);
						}
					}
				}
			}
		}

		if(!trans) {
			type = '';
			var endings = makeDeclensions(vword);
			wtr = endings[0].concat(endings[1]);
			wtr = wtr.sort(sortLongerDec);
			second:
			for (a in wtr) {
				type = G_endings[wtr[a][1]][4];
				var temp = wtr[a][0];
				var declt = G_endings[wtr[a][1]][5];
				decls = [];
				if(yt[temp] && yt[temp][4] != 'I') {
					var gender = yt[temp][1];
					for(c in declt) {
						if(type=='v' || (1 & declt[c][0] && G_nTx[0].test(gender)) || (2 & declt[c][0] && G_nTx[1].test(gender)) || (4 & declt[c][0] && G_nTx[2].test(gender))) {
							decls.push(declt[c]);
						}
					}

					if(yt[temp][4] == 'P' || yt[temp][1] == 'adj.')
						type = 'p';
					if(eg[temp]) {
						for(c in decls) {
							trans = eg[temp];
							deca = decls[c];
							meta = [];
							meta['orig'] = temp;
							outs.push([trans,type,deca,word,meta]);
						}
					}
					if (engVerbs[toUni(temp)]) {
						for(c in decls) {
							trans = engVerbs[toUni(temp)];
							deca = decls[c];
							meta = [];
							meta['orig'] = temp;
							outs.push([trans,type,deca,word,meta]);
						}
					}	
					for(c in decls) {
						trans = stripEnglish(yt[temp][2]);
						deca = decls[c];
						meta = [];
						meta['orig'] = temp;
						outs.push([trans,type,deca,word,meta]);
					}
				}
				else if (G_irregDec[temp] && typeof(yt[G_irregDec[temp][0]]) == 'object') {
					if(yt[G_irregDec[temp][0]][4] == 'P' || yt[G_irregDec[temp][0]][1] == 'adj.')
						type = 'p';
					for(c in decls) {
						trans = stripEnglish(yt[G_irregDec[temp][0]][2]);
						deca = decls[c];
						meta = [];
						meta['orig'] = temp;
						outs.push([trans,type,deca,word,meta]);
					}
				}
			}
		}
		if(!trans) {
			meta['orig'] = word;
			outs.push([word,null,null,word,meta]);
		}
	}
		
	var dups = [];
	var outfin = [];
	//alert(outs);
	dupsl:
	for (i=0;i<outs.length;i++) {
		if(outs[i][0] != outs[i][3]) {
			outs[i][0] = transMod(outs[i]);
		}
		//alert(dups);
		for(j=0;j<dups.length;j++) { 
			if(dups[j][1] == outs[i][1] && dups[j][2][0] == outs[i][2][0] && dups[j][2][1] == outs[i][2][1] && dups[j][2][2] == outs[i][2][2]) {
				continue dupsl;
			}
		}
		dups.push(outs[i]);
		outfin.push(outs[i]);
	}
	return outfin;
}

function transMod([trans,type,deca,word,meta]) {
	if(type == 'n')
		trans = trans.replace(/^(an*|the) /,'');
	if(type == 'n' && deca[1] == 1) // noun subject
		G_subDecl = deca;
	if(type == 'v' && deca) {
		G_verbDecl = deca;
		if(!(1 & deca[0]))
			trans = trans.replace(/\bis\b/,'be');
		else {
			trans = trans.replace(/\bbe\b/,'is');
			trans = trans.replace(/\bis\b/,G_ises[deca[1]-1][deca[2]-1]);
		}
		if(!(deca[0] & 1) || (deca[1]+deca[2] != 2)) { // verb endings, not present or not 3rd sing
			trans = trans.replace(/^(\S\S+)ies\b/,"$1y");
			trans = trans.replace(/^(\S+)(ss|[sc]h|zz|[xo])es\b/,"$1$2");
			trans = trans.replace(/^(\S+)s\b/,"$1");
		}
		else if(deca[1]+deca[2] == 2 && !/s\b/.test(trans))
			trans = addPlural(trans,type);
	}
	return trans;
}

function addPlural(word,type) {
	if(/\bone\b/.test(word))
		return word.replace(/\bone\b/,'ones');
	else if(/man\b/.test(word))
		word = word.replace(/man\b/,"men");
	else if(/(\S\S+)y$/.test(word))
		word = word.replace(/y$/,"ies");
	else if(/(\S\S+)f$/.test(word))
		word = word.replace(/f$/,"ves");
	else if(/(\S+)(ss|[sc]h|zz|[xo])$/.test(word))
		word += 'es';
	else
		word += 's';
	return word;
}

function addPhrasePreps(words,i,type) {
	if(!type)
		var type = words[0][1];
	if(!i)
		var i = words[0][2][1]-1;
	var joined = '';
	for(j in words) {
		if(j == 0) {
			joined += (G_joints[type][i]?G_joints[type][i]+' ':'');
		}
		if(j > 0)
			joined += ' ';
		if(words[j+1])
			joined += makeWord(words[j]);
		else // last word, check plural
			joined += makeWord(words[j],(type == 'n' && words[j][2] && words[j][2][2] == 2));
	}
	return joined;
}

function sortLongerDec(a,b) {
	if(G_endings[a[1]][4] == 'v')
		return -1;
	if(G_endings[b[1]][4] == 'v')
		return 1;
	var x = G_endings[a[1]][0];
	var y = G_endings[b[1]][0];
	return( x.length - y.length );
}

function stripEnglish(input) {

	var out = input.replace(/^[0-9]+\./,'').replace(/[;.,].*/,'');
	return out;
}

function simpleWordTranslation(word) {
	words = translateWord(word);
	for(i in words) {
		words[i] = addPhrasePreps(words[i]);
	}
	return words;
}

var G_subDecl = [];
var G_verbDecl = [];
var G_objDecl = [];
var G_thisWord = '';

var G_joints = [];
G_joints['n'] = ['','','with','for','from','of','at','O'];
G_joints['v'] = ['','should','may','will','did','causes to'];

var G_defDecl = [];
G_defDecl['v'] = [];
G_defDecl['v'].push([/ati$/,[[1,1,1]]]);
G_defDecl['v'].push([/eti$/,[[1,1,1]]]);
G_defDecl['v'].push([/oti$/,[[1,1,1]]]);
G_defDecl['n'] = [];
G_defDecl['n'].push([/aa$/,[[4,1,1]]]);
G_defDecl['n'].push([/a$/,[[3,8,1]]]);
G_defDecl['n'].push([/i$/,[[7,1,1],[7,8,1]]]);
G_defDecl['n'].push([/u$/,[[7,1,1],[7,8,1]]]);

var G_specWords = [];
G_specWords['na'] = ['i','not',null];
G_specWords['mā'] = ['i','not',null];

var G_ises = [];
G_ises.push(['is','are']);
G_ises.push(['are','are']);
G_ises.push(['am','are']);

var G_subjects = [['He/She/It','They'],['You','You all'],['I','We']];

var G_nTx = [/\bm\./,/\bnt\./,/\bf\./]; //rx
var G_vTypes = ['pres','imp','opt','fut','past','caus']; // binary