function translateText() {
	var input = toUni($('#input').val()).replace(G_uniRegExpNSG,'');
	$('#input').val(input);
	input=input.split(' ');
	var words = [];
	for (i in input) {
		var trans = translateWord(input[i]);
		words.push(trans);
	}
	var out = arrangeWords(words);
	var subject = out.subject.join(' ').replace(/^ *(.+) */,"$1");
	var fL = subject.replace(/<[^>]+>/g,'').charAt(0);
	subject = subject.replace('>'+fL,'>'+fL.toUpperCase());
	$('#translation').html(subject+' '+(G_verbDecl.length?G_joints['v'][G_verbDecl[0]-1]+' ':'')+out.bverb.join(' ')+' '+out.verb.join(' ')+' '+out.object.join(' ')+' '+out.other.join(' ')+(G_verbDecl[0]==2?'!':'.'));
}

var G_thisWord = '';
var G_subDecl = [];
var G_verbDecl = [];

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
	if(G_specWords[word]) {
		type = G_specWords[word][0];
		trans = G_specWords[word][1];
		deca = G_specWords[word][2];
	}
	else if(engVerbs[word]) {
		type = 'v';
		trans = engVerbs[word];
		for(i in G_defDecl['v']) {
			if(G_defDecl['v'][i][0].test(vword)){
				deca = G_defDecl['v'][i][1][0];
				break;
			}
		}
	}
	else {
		
		if(yt[vword]) {
			type = yt[vword][4].toLowerCase();
			if(type == 'i' || type == 'p') {
				trans = stripEnglish(yt[vword][2]);
				deca = null;
			}
			else {
				first:
				for(i in G_defDecl[type]) {
					if(G_defDecl[type][i][0].test(vword)){
						decls = G_defDecl[type][i][1];
						for(c in decls) { // just get the first one for now
							trans = stripEnglish(yt[vword][2]);
							deca = decls[c];
							break first;
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
				decls = G_endings[wtr[a][1]][5];
				if (engVerbs[toUni(temp)]) {
					for(c in decls) {
						trans = engVerbs[toUni(temp)];
						deca = decls[c];
						break second;
					}
				}	
				if (yt[temp] && yt[temp][4] != 'I') {
					if(yt[temp][4] == 'P' || yt[temp][1] == 'adj.')
						type = 'p';
					for(c in decls) {
						trans = stripEnglish(yt[temp][2]);
						deca = decls[c];
						break second;
					}
				}	
				else if (G_irregDec[temp] && typeof(yt[G_irregDec[temp][0]]) == 'object') {
					if(yt[G_irregDec[temp][0]][4] == 'P' || yt[G_irregDec[temp][0]][1] == 'adj.')
						type = 'p';
					for(c in decls) {
						trans = stripEnglish(yt[G_irregDec[temp][0]][2]);
						deca = decls[c];
						break second;
					}
				}
			}
		}
		if(!trans)
			return [word,null,null,word,meta];
		if(type == 'n')
			trans = trans.replace(/^(an*|the) /,'');
	}
	if(type == 'n' && deca[1] == 1) // noun subject
		G_subDecl = deca;
	if(type == 'n' && deca[2] == 2) // noun endings
		trans = addPlural(trans);
	if(type == 'v' && deca) {
		G_verbDecl = deca;
		if(!(deca[0] & 1))
			trans = trans.replace(/\bis\b/,'be');
		else 
			trans = trans.replace(/\bis\b/,ises[deca[1]-1][deca[2]-1]);
		if(!(deca[0] & 1) || (deca[1]+deca[2] != 2)) { // verb endings, not present or not 3rd sing
			trans = trans.replace(/^(\S\S+)ies\b/,"$1y");
			trans = trans.replace(/^(\S+)(ss|[sc]h|zz|[xo])es\b/,"$1$2");
			trans = trans.replace(/^(\S+)s\b/,"$1");
		}
	}
	return [trans,type,deca,word,meta];
}

function addPlural(word) {
	if(/\bone\b/.test(word))
		return word.replace(/\bone\b/,'ones');
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

function arrangeWords(words) {
	var out = {
		subject:[],
		bverb:[],
		verb:[],
		object:[],
		other:[]
	};

	var inter = [];
	inter[0] = [];
	inter[1] = [];
	inter[2] = [];
	inter[3] = [];
	inter[4] = [];
	inter[5] = [];
	inter[6] = [];
	inter[7] = [];

	
	for(i in words) {
		mW = makeWord(words[i]);
		if(!words[i][1] && !words[i][2])
			out.other.push(mW);
		else if(words[i][1] == 'bv')
			out.bverb.push(mW);
		else if(words[i][1] == 'v')
			out.verb.push(mW);
		else if(words[i][2])
			inter[words[i][2][1]-1].push(mW);
		else
			out.other.push(mW);
	}
	
	for (i in inter) {
		if(inter[i].length) {
			var thisi = G_joints['n'][i] + ' ' + inter[i].join(' ');
			if(i == 0)
				out.subject.push(thisi);
			else if(i == 1)
				out.object.push(thisi);
			else 
				out.other.push(thisi);
		}
	}
	
	return out;	
}

function makeWord(word) {
	return '<a class="green underline" href="dpr:index?analysis='+toVel(word[3])+'" title="translation of '+word[3]+'">'+word[0]+'</a>';
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
G_specWords['na'] = ['bv','not',null];
G_specWords['mā'] = ['bv','not',null];

var ises = [];
ises.push(['is','are']);
ises.push(['are','are']);
ises.push(['am','are']);
