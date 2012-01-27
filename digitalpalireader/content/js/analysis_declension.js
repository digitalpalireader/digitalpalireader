var G_endings = new Array();

// in the following: 0=to be found, 1=cut offset, 2=length of stem must be greater than this, 3=whattoadd, 4= noun, verb, participle, 5=type&declension

// original endings, for stem recog.

G_endings.push(['a',1,0,'','n']);
G_endings.push(['i',1,0,'','n']);
G_endings.push(['u',1,0,'','n']);

G_endings.push(['ati',2,0,'','v']);
G_endings.push(['aati',2,0,'','v']);
G_endings.push(['eti',2,0,'','v']);
G_endings.push(['oti',2,0,'','v']);

// masc a
G_endings.push(['o',0,0,'a','n',[[1,1,1]]]);
G_endings.push(['aa',1,0,'','n',[[4,1,1],[7,1,2],[4,2,2],[3,5,1]]]);
G_endings.push(['a.m',1,0,'','n',[[2,1,1],[7,2,1]]]);
G_endings.push(['.m',0,0,'','n',[[2,1,1],[7,2,1]]]);
G_endings.push(['e',0,0,'a','n',[[1,2,2],[3,7,1],[4,8,1]]]);
G_endings.push(['ena',0,0,'a','n',[[3,3,1]]]);
G_endings.push(['ehi',0,0,'a','n',[[3,3,2],[3,5,2]]]);
G_endings.push(['ebhi',0,0,'a','n',[[3,3,2],[3,5,2]]]);
G_endings.push(['aaya',1,0,'','n',[[4,3,1],[7,4,1],[4,5,1],[4,6,1],[4,7,1]]]);
G_endings.push(['ssa',0,0,'','n',[[3,4,1],[3,6,1]]]);
G_endings.push(['aana.m',1,0,'','n',[[3,4,2],[3,6,2]]]);
G_endings.push(['smaa',0,0,'','n',[[3,5,1]]]);
G_endings.push(['mhaa',0,0,'','n',[[3,5,1]]]);
G_endings.push(['smi.m',0,0,'','n',[[3,7,1]]]);
G_endings.push(['mhi',0,1,'','n',[[3,7,1]]]);
G_endings.push(['esu',0,0,'a','n',[[3,7,2]]]);

// masc i
G_endings.push(['ayo',0,1,'i','n',[[1,1,2],[1,2,2],[1,8,2]]]);
G_endings.push(['ii',1,1,'','n',[[5,1,1],[7,1,2],[7,2,2]]]);
G_endings.push(['inaa',1,1,'','n',[[3,3,1],[3,5,1]]]);
G_endings.push(['iihi',1,1,'','n',[[7,3,2],[7,5,2]]]);
G_endings.push(['hi',0,2,'','n',[[7,3,2],[7,5,2]]]);
G_endings.push(['iibhi',1,1,'','n',[[7,3,2],[7,5,2]]]);
G_endings.push(['bhi',0,1,'','n',[[7,3,2],[7,5,2]]]);
G_endings.push(['ino',1,1,'','n',[[3,4,1],[3,6,1]]]);
G_endings.push(['iina.m',1,1,'','n',[[ 7,4,2,7,6,2]]]);
G_endings.push(['iisu',1,1,'','n',[[7,7,2]]]);

// masc ii

G_endings.push(['i',1,2,'i','n',[[7,1,1],[7,8,1]]]);
G_endings.push(['ina.m',1,0,'','n',[[3,2,1]]]);

// masc u

G_endings.push(['avo',0,1,'u','n',[[1,1,2],[1,2,2]]]);
G_endings.push(['ave',0,1,'u','n',[[1,8,2]]]);
G_endings.push(['uu',1,1,'','n',[[5,1,1],[5,1,2],[5,2,2],[5,8,2]]]);
G_endings.push(['unaa',1,1,'','n',[[3,3,1],[3,5,1]]]);
G_endings.push(['uuhi',1,1,'','n',[[3,3,2],[3,5,2]]]);
G_endings.push(['uubhi',1,1,'','n',[[3,3,2],[3,5,2]]]);
G_endings.push(['uno',1,1,'','n',[[3,4,1],[3,6,1]]]);
G_endings.push(['uuna.m',1,1,'','n',[[7,4,2],[7,6,2]]]);
G_endings.push(['uusu',1,1,'','n',[[7,7,2]]]);

// masc uu

G_endings.push(['u',1,2,'u','n',[[5,8,1]]]);

// nt. a
G_endings.push(['aani',1,2,'','n',[[2,1,2],[2,2,2]]]);
// nt. i
G_endings.push(['iini',1,2,'','n',[[2,1,2],[2,2,2]]]);
// nt. u
G_endings.push(['uuni',1,2,'','n',[[2,1,2],[2,2,2]]]);

// f. aa
G_endings.push(['a',1,2,'a','n']);
G_endings.push(['aayo',1,0,'','n',[[4,1,2],[4,2,2],[4,8,2]]]);
G_endings.push(['aahi',1,0,'','n',[[4,3,2],[4,5,2]]]);
G_endings.push(['aabhi',1,0,'','n',[[4,3,2],[4,5,2]]]);
G_endings.push(['aaya.m',1,0,'','n',[[4,7,1]]]);
G_endings.push(['aasu',1,0,'','n',[[4,7,2]]]);
// f. i
G_endings.push(['iyo',1,0,'','n',[[4,1,2],[4,2,2]]]);
G_endings.push(['iyaa',1,0,'','n',[[4,3,1],[4,4,1],[4,5,1],[4,6,1],[4,7,1]]]);
G_endings.push(['iya.m',1,0,'','n',[[4,7,1]]]);
// f. ii
G_endings.push(['ii',0,0,'a','n',[[4,1,1]]]);
G_endings.push(['inii',0,0,'a','n',[[4,1,1]]]);
// f. u
G_endings.push(['uyo',1,0,'','n',[[4,1,2],[4,2,2]]]);
G_endings.push(['uyaa',1,0,'','n',[[4,3,1],[4,4,1],[4,5,1],[4,6,1],[4,7,1]]]);
G_endings.push(['uya.m',1,0,'','n',[[4,7,1]]]);
// f. uu


//	// irreg nouns

// vant, mant
G_endings.push(['aa',1,3,'nt','n',[[3,1,1]]]);
G_endings.push(['a',1,3,'nt','n',[[3,8,1]]]);
G_endings.push(['ata.m',1,3,'nt','n',[[3,2,1]]]);
G_endings.push(['anta.m',1,3,'nt','n',[[3,2,1]]]);
G_endings.push(['anto',1,3,'nt','n',[[3,1,2],[3,2,2],[3,8,2]]]);
G_endings.push(['antaa',1,3,'nt','n',[[3,1,2],[3,2,2]]]);
G_endings.push(['ante',1,3,'nt','n'],[[3,8,2]]);
G_endings.push(['ataa',1,3,'nt','n',[[3,3,1],[3,5,1]]]);
G_endings.push(['antehi',1,3,'nt','n',[[3,3,2],[3,5,2]]]);
G_endings.push(['ato',1,3,'nt','n',[[3,4,1],[3,6,1]]]);
G_endings.push(['antaana.m',1,3,'nt','n',[[3,4,2],[3,6,2]]]);
G_endings.push(['ati',1,3,'nt','n',[[3,7,1]]]);
G_endings.push(['antesu',1,3,'nt','n',[[3,7,2]]]);

// anta (CPED)
G_endings.push(['aa',1,3,'nta','n',[[3,1,1]]]);
G_endings.push(['a',1,3,'nta','n',[[3,8,1]]]);
G_endings.push(['ata.m',1,3,'nta','n',[[3,2,1]]]);
G_endings.push(['ata.m',1,3,'ti','n']);
G_endings.push(['anta.m',1,3,'nta','n',[[3,2,1]]]);
G_endings.push(['anto',1,3,'nta','n',[[3,1,2],[3,2,2],[3,8,2]]]);
G_endings.push(['antaa',1,3,'nta','n',[[3,1,2],[3,2,2]]]);
G_endings.push(['ante',1,3,'nta','n'],[[3,8,2]]);
G_endings.push(['ataa',1,3,'nta','n',[[3,3,1],[3,5,1]]]);
G_endings.push(['antehi',1,3,'nta','n',[[3,3,2],[3,5,2]]]);
G_endings.push(['ato',1,3,'nta','n',[[3,4,1],[3,6,1]]]);
G_endings.push(['antaana.m',1,3,'nta','n',[[3,4,2],[3,6,2]]]);
G_endings.push(['ati',1,3,'nta','n',[[3,7,1]]]);
G_endings.push(['antesu',1,3,'nta','n',[[3,7,2]]]);


// kattar

G_endings.push(['aa',0,2,'ar','n']);
G_endings.push(['aara.m',0,2,'ar','n']);
G_endings.push(['aaraa',0,2,'ar','n']);
G_endings.push(['u',0,2,'ar','n']);
G_endings.push(['uno',0,2,'ar','n']);
G_endings.push(['ari',0,2,'ar','n']);
G_endings.push(['aaro',0,2,'ar','n']);
G_endings.push(['uuhi',0,2,'ar','n']);
G_endings.push(['uubhi',0,2,'ar','n']);
G_endings.push(['uuna.m',0,2,'ar','n']);
G_endings.push(['aaraana.m',0,2,'ar','n']);
G_endings.push(['uusu',0,2,'ar','n']);
G_endings.push(['aa',0,2,'ar','n']);
G_endings.push(['a',0,2,'ar','n']);
G_endings.push(['ara.m',0,2,'ar','n']);
G_endings.push(['araa',0,2,'ar','n']);

// pitar

G_endings.push(['aro',0,2,'ar','n']);
G_endings.push(['unaa',0,2,'ar','n']);
G_endings.push(['arehi',0,2,'ar','n']);
G_endings.push(['arebhi',0,2,'ar','n']);
G_endings.push(['aana.m',0,2,'ar','n']);
G_endings.push(['araana.m',0,2,'ar','n']);
G_endings.push(['unna.m',0,2,'ar','n']);
G_endings.push(['ito',0,2,'ar','n']);

// matar

G_endings.push(['uyaa',0,2,'ar','n']);
G_endings.push(['yaa',0,2,'ar','n']);
G_endings.push(['ya.m',0,2,'ar','n']);
G_endings.push(['uya.m',0,2,'ar','n']);


// mano

G_endings.push(['asaa',0,0,'o','n']);
G_endings.push(['aso',0,0,'o','n']);
G_endings.push(['asaa',0,0,'o','n']);
G_endings.push(['aso',0,0,'o','n']);
G_endings.push(['asi',0,0,'o','n']);

G_endings.push(['aa',0,0,'o','n']);
G_endings.push(['a.m',0,0,'o','n']);
G_endings.push(['e',0,0,'o','n']);
G_endings.push(['ena',0,0,'o','n']);
G_endings.push(['ehi',0,0,'o','n']);
G_endings.push(['ebhi',0,0,'o','n']);
G_endings.push(['aaya',0,0,'o','n']);
G_endings.push(['assa',0,0,'o','n']);
G_endings.push(['aana.m',0,0,'o','n']);
G_endings.push(['asmaa',0,0,'o','n']);
G_endings.push(['amhaa',0,0,'o','n']);
G_endings.push(['asmi.m',0,0,'o','n']);
G_endings.push(['amhi',0,0,'o','n']);
G_endings.push(['esu',0,0,'o','n']);

// a verb participles

G_endings.push(['ato',1,2,'ti','n']);
G_endings.push(['ataa',1,2,'ti','n']);


// aa verb participles

G_endings.push(['ato',1,2,'ati','n']);
G_endings.push(['ataa',1,2,'ati','n']);


// e verb participles

G_endings.push(['eto',1,2,'ti','n']);
G_endings.push(['etaa',1,2,'ti','n']);


// o verb participles

G_endings.push(['oto',1,2,'ti','n']);
G_endings.push(['otaa',1,2,'ti','n']);


// unsorted

G_endings.push(['ahi',1,1,'','n']);
G_endings.push(['to',0,2,'','n']);
G_endings.push(['anna.m',1,1,'','n']);
G_endings.push(['unna.m',1,1,'','n']);
G_endings.push(['inna.m',1,1,'','n']);
G_endings.push(['ataa',2,1,'i','n']);
G_endings.push(['iya',0,2,'a','n']);
G_endings.push(['uya.m',0,0,'','n']);

//G_endings.push(['abba.m',1,1,'']);



// verbs	

G_endings.push(['ati',3,0,'','v',[[1,1,1]]]);
G_endings.push(['aati',4,0,'','v',[[1,1,1]]]);
G_endings.push(['eti',3,0,'','v',[[1,1,1]]]);
G_endings.push(['oti',3,0,'','v',[[1,1,1]]]);

	// a stem pres.

G_endings.push(['anti',1,0,'ti','v',[[1,1,2]]]);
G_endings.push(['si',0,3,'ti','v',[[1,2,1]]]);
G_endings.push(['asi',1,0,'ti','v',[[1,2,1]]]);
G_endings.push(['atha',1,0,'ti','v',[[1,2,2]]]);
G_endings.push(['aami',1,0,'ti','v',[[1,3,1],[2,3,1]]]);
G_endings.push(['aama',1,0,'ti','v',[[1,3,2],[2,3,2]]]);

	// aa stem pres.

G_endings.push(['aami',2,0,'ti','v',[[1,3,1],[2,3,1]]]);
G_endings.push(['aama',2,0,'ti','v',[[1,3,2],[2,3,2]]]);

	// o stem pres.

G_endings.push(['onti',1,0,'ti','v',[[1,1,2]]]);
G_endings.push(['osi',1,0,'ti','v',[[1,2,1]]]);
G_endings.push(['otha',1,0,'ti','v',[[1,2,2]]]);
G_endings.push(['omi',1,0,'ti','v',[[1,3,1],[2,3,1]]]);
G_endings.push(['oma',1,0,'ti','v',[[1,3,2],[2,3,2]]]);

	// e stem pres.

G_endings.push(['enti',1,0,'ti','v',[[1,1,2]]]);
G_endings.push(['esi',1,0,'ti','v',[[1,2,1]]]);
G_endings.push(['etha',1,0,'ti','v',[[1,2,2]]]);
G_endings.push(['emi',1,0,'ti','v',[[1,3,1],[2,3,1]]]);
G_endings.push(['ema',1,0,'ti','v',[[1,3,2],[2,3,2]]]);


	// a stem impv.

G_endings.push(['hi',0,3,'ti','v',[[2,2,1]]]);
G_endings.push(['atu',1,2,'ti','v',[[2,1,1]]]);
G_endings.push(['antu',1,1,'ti','v',[[2,1,2]]]);

	// o stem impv.

G_endings.push(['ohi',1,0,'ti','v',[[2,2,1]]]);
G_endings.push(['otu',1,0,'ti','v',[[2,1,1]]]);
G_endings.push(['ontu',1,0,'ti','v',[[2,1,2]]]);


	// e stem impv.

G_endings.push(['etu',1,0,'ti','v',[[2,1,1]]]);
G_endings.push(['entu',1,0,'ti','v',[[2,1,2]]]);
G_endings.push(['ehi',1,0,'ti','v',[[2,2,1]]]);

	// a stem caus.

G_endings.push(['eti',0,2,'ati','v']);
G_endings.push(['enti',0,2,'ati','v']);
G_endings.push(['esi',0,2,'ati','v']);
G_endings.push(['etha',0,2,'ati','v']);
G_endings.push(['emi',0,2,'ati','v']);
G_endings.push(['ema',0,2,'ati','v']);

	// aa stem caus.

G_endings.push(['eti',0,2,'aati','v']);
G_endings.push(['enti',0,2,'aati','v']);
G_endings.push(['esi',0,2,'aati','v']);
G_endings.push(['etha',0,2,'aati','v']);
G_endings.push(['emi',0,2,'aati','v']);
G_endings.push(['ema',0,2,'aati','v']);

	// not sure...

G_endings.push(['entu',0,2,'ati','v']);


// verb participles

G_endings.push(['ayitvaa',0,2,'eti','v']);
G_endings.push(['ayitvaana',0,2,'eti','v']);
G_endings.push(['vaana',0,2,'i','v']);
G_endings.push(['aapetvaa',1,0,'ti','v']);
G_endings.push(['itvaana',0,0,'ati','v']);
G_endings.push(['itvaana',0,0,'aati','v']);
G_endings.push(['itvaana',0,0,'eti','v']);
G_endings.push(['etvaana',0,0,'ati','v']);
G_endings.push(['tvaana',0,0,'ti','v']);
G_endings.push(['itvaa',0,0,'ati','v']);
G_endings.push(['itvaa',0,0,'aati','v']);
G_endings.push(['itvaa',0,0,'eti','v']);
G_endings.push(['etvaa',0,0,'ati','v']);
G_endings.push(['tvaa',0,0,'ti','v']);
G_endings.push(['aaya',1,0,'ti','v']);
G_endings.push(['aaya',1,0,'ati','v']);
G_endings.push(['aaya',1,0,'aati','v']);
G_endings.push(['aaya',1,0,'eti','v']);
G_endings.push(['tu.m',0,0,'ti','v']);
G_endings.push(['itu.m',0,0,'ati','v']);
G_endings.push(['itu.m',0,0,'aati','v']);

// past a

G_endings.push(['a',0,3,'ati','v']);
G_endings.push(['i',0,3,'ati','v']);
G_endings.push(['imha',0,0,'ati','v']);
G_endings.push(['imhaa',0,0,'ati','v']);
G_endings.push(['i.msu',0,1,'ati','v']);
G_endings.push(['ittha',0,0,'ati','v']);
G_endings.push(['u.m',0,0,'ati','v']);
G_endings.push(['su.m',0,0,'ti','v']);
G_endings.push(['si.m',0,0,'ti','v']);
G_endings.push(['i.m',0,0,'ati','v']);

// past aa

G_endings.push(['a',0,3,'aati','v']);
G_endings.push(['i',0,3,'aati','v']);
G_endings.push(['imha',0,0,'aati','v']);
G_endings.push(['imhaa',0,0,'aati','v']);
G_endings.push(['i.msu',0,1,'aati','v']);
G_endings.push(['ittha',0,0,'aati','v']);
G_endings.push(['u.m',0,0,'aati','v']);
G_endings.push(['i.m',0,0,'aati','v']);

// past e

G_endings.push(['a',0,3,'eti','v']);
G_endings.push(['i',0,3,'eti','v']);
G_endings.push(['imha',0,0,'eti','v']);
G_endings.push(['imhaa',0,0,'eti','v']);
G_endings.push(['i.msu',0,1,'eti','v']);
G_endings.push(['ayi.msu',0,1,'eti','v']);
G_endings.push(['ittha',0,0,'eti','v']);
G_endings.push(['u.m',0,0,'eti','v']);
G_endings.push(['i.m',0,0,'eti','v']);

// optative a

G_endings.push(['eyya',0,0,'ati','v',[[3,1,1]]]);
G_endings.push(['eyya.m',0,0,'ati','v',[[3,3,1]]]);
G_endings.push(['eyyu.m',0,0,'ati','v',[[3,1,2]]]);
G_endings.push(['eyyati',0,0,'ati','v',[[3,1,1]]]);
G_endings.push(['eyyasi',0,0,'ati','v',[[3,2,2]]]);
G_endings.push(['eyyaatha',0,0,'ati','v',[[3,1,1]]]);
G_endings.push(['eyyaami',0,0,'ati','v',[[3,3,1]]]);
G_endings.push(['eyyaasi',0,0,'ati','v',[[3,2,1]]]);
G_endings.push(['eyyaama',0,0,'ati','v',[[3,3,1]]]);
G_endings.push(['eyyanti',0,0,'ati','v',[[3,1,2]]]);

// optative aa

G_endings.push(['eyya',0,0,'aati','v']);
G_endings.push(['eyya.m',0,0,'aati','v']);
G_endings.push(['eyyu.m',0,0,'aati','v']);
G_endings.push(['eyyati',0,0,'aati','v']);
G_endings.push(['eyyasi',0,0,'aati','v']);
G_endings.push(['eyyaatha',0,0,'aati','v']);
G_endings.push(['eyyaami',0,0,'aati','v']);
G_endings.push(['eyyaasi',0,0,'aati','v']);
G_endings.push(['eyyaama',0,0,'aati','v']);
G_endings.push(['eyyanti',0,0,'aati','v']);

// optative e

G_endings.push(['eyya',1,0,'ti','v']);
G_endings.push(['eyya.m',1,0,'ti','v']);
G_endings.push(['eyyu.m',1,0,'ti','v']);
G_endings.push(['eyyati',1,0,'ti','v']);
G_endings.push(['eyyasi',1,0,'ti','v']);
G_endings.push(['eyyaatha',1,0,'ti','v']);
G_endings.push(['eyyaami',1,0,'ti','v']);
G_endings.push(['eyyaasi',1,0,'ti','v']);
G_endings.push(['eyyaama',1,0,'ti','v']);
G_endings.push(['eyyanti',1,0,'ti','v']);

// optative o

G_endings.push(['eyya',0,0,'oti','v']);
G_endings.push(['eyya.m',0,0,'oti','v']);
G_endings.push(['eyyu.m',0,0,'oti','v']);
G_endings.push(['eyyati',0,0,'oti','v']);
G_endings.push(['eyyasi',0,0,'oti','v']);
G_endings.push(['eyyaatha',0,0,'oti','v']);
G_endings.push(['eyyaami',0,0,'oti','v']);
G_endings.push(['eyyaasi',0,0,'oti','v']);
G_endings.push(['eyyaama',0,0,'oti','v']);
G_endings.push(['eyyanti',0,0,'oti','v']);


// conditional

G_endings.push(['issa',0,2,'ati','v']);
G_endings.push(['issaa',0,2,'ati','v']);
G_endings.push(['issa.msu',0,2,'ati','v']);
G_endings.push(['issatha',0,2,'ati','v']);
G_endings.push(['issa.m',0,2,'ati','v']);
G_endings.push(['issaama',0,2,'ati','v']);

G_endings.push(['issa',0,2,'aati','v']);
G_endings.push(['issaa',0,2,'aati','v']);
G_endings.push(['issa.msu',0,2,'aati','v']);
G_endings.push(['issa',0,2,'aati','v']);
G_endings.push(['issatha',0,2,'aati','v']);
G_endings.push(['issa.m',0,2,'aati','v']);
G_endings.push(['issaama',0,2,'aati','v']);

G_endings.push(['essa',1,2,'ti','v']);
G_endings.push(['essaa',1,2,'ti','v']);
G_endings.push(['essa.msu',1,2,'ti','v']);
G_endings.push(['essa',1,2,'ti','v']);
G_endings.push(['essatha',1,2,'ti','v']);
G_endings.push(['essa.m',1,2,'ti','v']);
G_endings.push(['essaama',1,2,'ti','v']);


// ---------- stem matching and converting ----------
function makeDeclensions(oneword,lastpart,nextpart) {
	// this stuff is defined in declension.js
	
	var wtrN = []; // nouns, can be in compound
	var wtrV = []; // verbs, can't
	
	var wtrDup = []; // sort duplicates
	
	var endings = [];
	
	for (var k = 1; k < oneword.length; k++) //define sub-cut for analysis (length-k,oneword.length) and remaining string (0,length-k)
	{		
		endings[oneword.substring(k)] = k;
	}
	
	for(i in G_endings) {
		var gend = G_endings[i];  // gend[0] is ending, [1] is offset, [2] is min length of stem, [3] is new ending to add, [4] says is a verb	
		if(endings[gend[0]] && endings[gend[0]] > gend[2]) {
			var dec = oneword.substring(0, endings[gend[0]]+gend[1]) + gend[3];
			
			if (!isUncomp(oneword,lastpart,nextpart) && !wtrDup[dec]) {
				//wtrDup[dec] = 1;

				if (gend[4] == 'v') { 
					wtrV.push([dec,i]);
				}
				else { 
					wtrN.push([dec,i]);
					if(/[aiu]/.exec(dec.charAt(dec.length-1))) { // long vowels
						wtrN.push([dec+dec.charAt(dec.length-1),i]);
					}
				}
			}					
		}
		for (stem in G_altStem) {
			//if(/^ga/.exec(oneword)) ddump('-- try ' + oneword +  ' ' +stem+ ' ' + gend[0]);
			if (endings[stem + gend[0]] && endings[stem + gend[0]] > gend[2] && (G_altStem[stem][1] && gend[4] == 'v' || !G_altStem[stem][1] && gend[4] == 'n')) 
			{
				for(gas0 in G_altStem[stem][0]) {
					var dec = oneword.substring(0, endings[stem + gend[0]]) + G_altStem[stem][0][gas0];
					//if(/^ga/.exec(oneword)) ddump('-- got ' + dec + ' ' +stem+ ' ' + gend[0]);
					if(G_altStem[stem][2]) {
					}
					if (isUncomp(oneword,lastpart,nextpart)) { continue; }

					if(wtrDup[dec]) continue;
					//else wtrDup[dec] = 1;

					if (G_altStem[stem][2]) { wtrV.push([dec,i]); }
					else { 
						wtrN.push([dec,i]);
						if(/[aiu]/.exec(dec.charAt(dec.length-1))) { // long vowels
							wtrN.push([dec+dec.charAt(dec.length-1),i]);
						}
					}	
				}
			}
		}
	}
	return [wtrN,wtrV];
}