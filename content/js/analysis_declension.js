var G_endings = new Array();

// in the following: 0=to be found, 1=cut offset, 2=length of stem must be greater than this, 3=whattoadd, 4= noun, verb, participle

// masc a
G_endings.push(['o',0,0,'a','n']);
G_endings.push(['aa',1,0,'','n']);
G_endings.push(['a.m',1,0,'','n']);
G_endings.push(['.m',0,0,'','n']);
G_endings.push(['e',0,0,'a','n']);
G_endings.push(['ena',0,0,'a','n']);
G_endings.push(['ehi',0,0,'a','n']);
G_endings.push(['ebhi',0,0,'a','n']);
G_endings.push(['aaya',1,0,'','n']); 
G_endings.push(['ssa',0,0,'','n']); 
G_endings.push(['aana.m',1,0,'','n']); 
G_endings.push(['smaa',0,0,'','n']);
G_endings.push(['mhaa',0,0,'','n']);
G_endings.push(['smi.m',0,0,'','n']);
G_endings.push(['mhi',0,1,'','n']);
G_endings.push(['esu',0,0,'a','n']);

// masc i
G_endings.push(['ayo',0,2,'i','n']);
G_endings.push(['ii',1,2,'','n']);
G_endings.push(['inaa',1,2,'','n']);
G_endings.push(['iihi',1,2,'','n']);
G_endings.push(['iibhi',1,2,'','n']);
G_endings.push(['ino',1,2,'','n']);
G_endings.push(['iina.m',1,2,'','n']); 
G_endings.push(['iisu',1,2,'','n']);

// masc ii

G_endings.push(['i',1,2,'i','n']);
G_endings.push(['ina.m',1,0,'','n']);

// masc u

G_endings.push(['avo',0,0,'u','n']);
G_endings.push(['uu',1,0,'','n']);
G_endings.push(['unaa',1,0,'','n']);
G_endings.push(['uuhi',1,0,'','n']);
G_endings.push(['uubhi',1,0,'','n']);
G_endings.push(['uno',1,0,'','n']);
G_endings.push(['uuna.m',1,0,'','n']); 
G_endings.push(['uusu',1,0,'','n']); 

// masc uu

G_endings.push(['u',1,2,'u','n']);

// nt. a
G_endings.push(['aani',1,2,'','n']);
// nt. i
G_endings.push(['iini',1,2,'','n']);
// nt. u
G_endings.push(['uuni',1,2,'','n']);

// f. aa
G_endings.push(['a',1,2,'a','n']);
G_endings.push(['aayo',1,0,'','n']);
G_endings.push(['aahi',1,0,'','n']);
G_endings.push(['aabhi',1,0,'','n']);
G_endings.push(['aaya.m',1,0,'','n']); 
G_endings.push(['aasu',1,0,'','n']);
// f. i
G_endings.push(['iyo',1,0,'','n']);
G_endings.push(['iyaa',1,0,'','n']);
G_endings.push(['iya.m',1,0,'','n']); 
// f. ii
G_endings.push(['ii',0,0,'a','n']);
G_endings.push(['inii',0,0,'a','n']);
// f. u
G_endings.push(['uyo',1,0,'','n']);
G_endings.push(['uyaa',1,0,'','n']);
G_endings.push(['uya.m',1,0,'','n']); 
// f. uu


//	// irreg nouns

// vant, mant
G_endings.push(['aa',1,3,'nt','n']);
G_endings.push(['a',1,3,'nt','n']);
G_endings.push(['anta.m',1,3,'nt','n']);
G_endings.push(['anto',1,3,'nt','n']);
G_endings.push(['antaa',1,3,'nt','n']);
G_endings.push(['ante',1,3,'nt','n']);
G_endings.push(['ataa',1,3,'nt','n']);
G_endings.push(['antehi',1,3,'nt','n']);
G_endings.push(['ato',1,3,'nt','n']);
G_endings.push(['antaana.m',1,3,'nt','n']);
G_endings.push(['ati',1,3,'nt','n']);
G_endings.push(['antesu',1,3,'nt','n']);

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

G_endings.push(['anto',1,2,'ti','n']);
G_endings.push(['antaa',1,2,'ti','n']);
G_endings.push(['anta.m',1,2,'ti','n']);
G_endings.push(['ante',1,2,'ti','n']);
G_endings.push(['antena',1,2,'ti','n']);
G_endings.push(['antehi',1,2,'ti','n']);
G_endings.push(['antassa',1,2,'ti','n']);
G_endings.push(['antaana.m',1,2,'ti','n']);
G_endings.push(['antasmi.m',1,2,'ti','n']);
G_endings.push(['antesu',1,2,'ti','n']);
G_endings.push(['ato',1,2,'ti','n']);
G_endings.push(['ataa',1,2,'ti','n']);


// aa verb participles

G_endings.push(['anto',1,2,'ati','n']);
G_endings.push(['antaa',1,2,'ati','n']);
G_endings.push(['anta.m',1,2,'ati','n']);
G_endings.push(['ante',1,2,'ati','n']);
G_endings.push(['antena',1,2,'ati','n']);
G_endings.push(['antehi',1,2,'ati','n']);
G_endings.push(['antassa',1,2,'ati','n']);
G_endings.push(['antaana.m',1,2,'ati','n']);
G_endings.push(['antasmi.m',1,2,'ati','n']);
G_endings.push(['antesu',1,2,'ati','n']);
G_endings.push(['ato',1,2,'ati','n']);
G_endings.push(['ataa',1,2,'ati','n']);


// e verb participles

G_endings.push(['ento',1,2,'ti','n']);
G_endings.push(['entaa',1,2,'ti','n']);
G_endings.push(['enta.m',1,2,'ti','n']);
G_endings.push(['ente',1,2,'ti','n']);
G_endings.push(['entena',1,2,'ti','n']);
G_endings.push(['entehi',1,2,'ti','n']);
G_endings.push(['entassa',1,2,'ti','n']);
G_endings.push(['entaana.m',1,2,'ti','n']);
G_endings.push(['entasmi.m',1,2,'ti','n']);
G_endings.push(['entesu',1,2,'ti','n']);


// o verb participles

G_endings.push(['onto',1,2,'ti','n']);
G_endings.push(['ontaa',1,2,'ti','n']);
G_endings.push(['onta.m',1,2,'ti','n']);
G_endings.push(['onte',1,2,'ti','n']);
G_endings.push(['ontena',1,2,'ti','n']);
G_endings.push(['ontehi',1,2,'ti','n']);
G_endings.push(['ontassa',1,2,'ti','n']);
G_endings.push(['ontaana.m',1,2,'ti','n']);
G_endings.push(['ontasmi.m',1,2,'ti','n']);
G_endings.push(['ontesu',1,2,'ti','n']);
G_endings.push(['oto',1,2,'ti','n']);
G_endings.push(['otaa',1,2,'ti','n']);

// maano, a,e,o

G_endings.push(['maano',0,2,'ti','n']);
G_endings.push(['maanaa',0,2,'ti','n']);
G_endings.push(['maana.m',0,2,'ti','n']);
G_endings.push(['maane',0,2,'ti','n']);
G_endings.push(['maanena',0,2,'ti','n']);
G_endings.push(['maanehi',0,2,'ti','n']);
G_endings.push(['maanassa',0,2,'ti','n']);
G_endings.push(['maanaana.m',0,2,'ti','n']);
G_endings.push(['maanasmi.m',0,2,'ti','n']);
G_endings.push(['maanesu',0,2,'ti','n']);

// maano, aa verbs

G_endings.push(['maano',0,2,'ati','n']);
G_endings.push(['maanaa',0,2,'ati','n']);
G_endings.push(['maana.m',0,2,'ati','n']);
G_endings.push(['maane',0,2,'ati','n']);
G_endings.push(['maanena',0,2,'ati','n']);
G_endings.push(['maanehi',0,2,'ati','n']);
G_endings.push(['maanassa',0,2,'ati','n']);
G_endings.push(['maanaana.m',0,2,'ati','n']);
G_endings.push(['maanasmi.m',0,2,'ati','n']);
G_endings.push(['maanesu',0,2,'ati','n']);


// unsorted

G_endings.push(['vaana',3,2,'','n']);
G_endings.push(['aapetvaa',1,0,'ti','v']);
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

G_endings.push(['a',0,3,'ati','v']);
G_endings.push(['i',0,3,'ati','v']);
G_endings.push(['tu',0,3,'ti','v']);
G_endings.push(['si',0,3,'ti','v']);
G_endings.push(['ato',1,2,'ti','v']);
G_endings.push(['anto',1,1,'ti','v']);
G_endings.push(['asi',0,0,'ti','v']); 
G_endings.push(['osi',0,0,'ti','v']);
G_endings.push(['omi',0,0,'ti','v']);
G_endings.push(['oma',0,0,'ti','v']);

G_endings.push(['anti',1,0,'ti','v']);
G_endings.push(['aami',1,0,'ti','v']);
G_endings.push(['aama',1,0,'ti','v']);
G_endings.push(['atha',1,0,'ti','v']);
G_endings.push(['antu',1,1,'ti','v']);
G_endings.push(['onti',1,0,'ti','v']);
G_endings.push(['otha',1,0,'ti','v']);
G_endings.push(['ontu',1,0,'ti','v']);

G_endings.push(['esi',1,0,'ti','v']);
G_endings.push(['ema',1,0,'ti','v']);
G_endings.push(['emi',1,0,'ti','v']);
G_endings.push(['enti',1,0,'ti','v']);
G_endings.push(['etha',1,0,'ti','v']);
G_endings.push(['entu',1,0,'ti','v']);

G_endings.push(['esi',0,2,'ati','v']);
G_endings.push(['eti',0,2,'ati','v']);
G_endings.push(['ema',0,2,'ati','v']);
G_endings.push(['emi',0,2,'ati','v']);
G_endings.push(['enti',0,2,'ati','v']);
G_endings.push(['etha',0,2,'ati','v']);
G_endings.push(['entu',0,2,'ati','v']);



G_endings.push(['itvaa',0,0,'ati','v']); 
G_endings.push(['etvaa',0,0,'ati','v']); 
G_endings.push(['tvaa',0,0,'ti','v']); 
G_endings.push(['aaya',1,0,'ti','v']); 
G_endings.push(['aaya',1,0,'ati','v']); 
G_endings.push(['aaya',1,0,'eti','v']); 
G_endings.push(['tu.m',0,0,'ti','v']);
G_endings.push(['itu.m',0,0,'ati','v']);

G_endings.push(['imhaa',0,0,'','v']); // aorist
G_endings.push(['i.msu',0,1,'ati','v']); // aorist
G_endings.push(['ittha',0,0,'','v']); // aorist
G_endings.push(['u.m',0,0,'ati','v']); // aorist
G_endings.push(['su.m',0,0,'ti','v']); // aorist
G_endings.push(['si.m',0,0,'ti','v']); // aorist
G_endings.push(['i.m',0,0,'ati','v']); // aorist

G_endings.push(['eyya',0,0,'ati','v']);
G_endings.push(['eyya.m',0,0,'ati','v']);
G_endings.push(['eyyu.m',0,0,'ati','v']);
G_endings.push(['eyyati',0,0,'ati','v']);
G_endings.push(['eyyasi',0,0,'ati','v']);
G_endings.push(['eyyaatha',0,0,'ati','v']);
G_endings.push(['eyyaami',0,0,'ati','v']);
G_endings.push(['eyyaasi',0,0,'ati','v']);
G_endings.push(['eyyaama',0,0,'ati','v']);
G_endings.push(['eyyanti',0,0,'ati','v']);

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

// future

G_endings.push(['issati',0,0,'ati','v']);
G_endings.push(['issasi',0,0,'ati','v']);
G_endings.push(['issanti',0,0,'ati','v']);
G_endings.push(['issatha',0,0,'ati','v']);
G_endings.push(['issaami',0,0,'ati','v']);
G_endings.push(['issaama',0,0,'ati','v']);
G_endings.push(['issati',0,0,'aati','v']);
G_endings.push(['issasi',0,0,'aati','v']);
G_endings.push(['issanti',0,0,'aati','v']);
G_endings.push(['issatha',0,0,'aati','v']);
G_endings.push(['issaami',0,0,'aati','v']);
G_endings.push(['issaama',0,0,'aati','v']);
G_endings.push(['essasi',1,0,'ti','v']);
G_endings.push(['essati',1,0,'ti','v']);
G_endings.push(['essanti',1,0,'ti','v']);
G_endings.push(['essatha',1,0,'ti','v']);
G_endings.push(['essaami',1,0,'ti','v']);
G_endings.push(['essaama',1,0,'ti','v']);

// conditional

G_endings.push(['issa',1,0,'ati','v']);
G_endings.push(['issaa',1,0,'ati','v']);
G_endings.push(['issa.msu',1,0,'ati','v']);
G_endings.push(['issa',1,0,'ati','v']);
G_endings.push(['issatha',1,0,'ati','v']);
G_endings.push(['issa.m',1,0,'ati','v']);
G_endings.push(['issaama',1,0,'ati','v']);

G_endings.push(['issa',1,0,'aati','v']);
G_endings.push(['issaa',1,0,'aati','v']);
G_endings.push(['issa.msu',1,0,'aati','v']);
G_endings.push(['issa',1,0,'aati','v']);
G_endings.push(['issatha',1,0,'aati','v']);
G_endings.push(['issa.m',1,0,'aati','v']);
G_endings.push(['issaama',1,0,'aati','v']);

G_endings.push(['essa',1,0,'ti','v']);
G_endings.push(['essaa',1,0,'ti','v']);
G_endings.push(['essa.msu',1,0,'ti','v']);
G_endings.push(['essa',1,0,'ti','v']);
G_endings.push(['essatha',1,0,'ti','v']);
G_endings.push(['essa.m',1,0,'ti','v']);
G_endings.push(['essaama',1,0,'ti','v']);

