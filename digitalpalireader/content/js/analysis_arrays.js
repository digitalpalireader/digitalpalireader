
// for conjugations

var G_altStem = []; //[i][0][j] is a replacement ending, [i][1] tells us it was a verb, [i][1] tells us it is now a verb, [i][2] tells us we have to shorten long vowels, [i][3] tells us what sort of ending to expect from the original word (for compounds)

// n to n
G_altStem['iy'] = [['a'],0,0,0,'a'];
G_altStem['iik'] = [['aka','a'],0,0,0,'a'];
G_altStem['in'] = [['i'],0,0,0,'ii'];

// v to v
G_altStem['aap'] = [['ati','aati','eti'],1,1,0,'eti'];
G_altStem['aapess'] = [['ati','aati','eti'],1,1,0,'eti'];
G_altStem['iiy'] = [['ati','aati','oti','eti'],1,1,0,'ati'];
G_altStem['iiyiss'] = [['ati','aati','oti','eti'],1,1,0,'ati'];
G_altStem['iss'] = [['ati','aati','oti'],1,1,0,'ati'];
G_altStem['ess'] = [['ati','eti'],1,1,0,'ati'];

// n to v
G_altStem['iiyamaan'] = [['ati','aati','oti','eti'],0,1,0,'a'];
G_altStem['iyamaan'] = [['ati','aati','oti','eti'],0,1,0,'a'];
G_altStem['maan'] = [['ti','ati'],0,1,0,'a'];
G_altStem['ant'] = [['ati','aati'],0,1,0,'a'];
G_altStem['ent'] = [['eti','ati'],0,1,0,'a'];
G_altStem['ont'] = [['oti'],0,1,0,'a'];
G_altStem['itabb'] = [['ati','aati'],0,1,0,'a'];
G_altStem['etabb'] = [['eti','ati'],0,1,0,'a'];
G_altStem['atabb'] = [['ati','aati'],0,1,0,'a'];
G_altStem['abb'] = [['ati'],0,1,0,'a'];
G_altStem['.niiy'] = [['ti'],0,1,1,'a'];
G_altStem['niiy'] = [['ti'],0,1,1,'a'];

// for compounds

var G_altStemComp = []; //[i][0] is the replacement ending, [i][1] tells us it's a verb, [i][2] tells us we have to shorten long vowels
G_altStemComp['.niiya'] = ['.niya',0,0];
G_altStemComp['niiya'] = ['niya',0,0];
G_altStemComp['aa'] = ['',0,0];
G_altStemComp['ii'] = ['a',0,0];

var G_altInnerStem = [];  // inner replacements i = existing part, [i][0] = replacement, [i][1] = Noun, Verb 
G_altInnerStem['gaah'] = ['gah','N'];
G_altInnerStem['.mk'] = ['"nk','N'];
G_altInnerStem['.mg'] = ['"ng','N'];


// match blocking

var G_uncompoundable = []; // disallowed compound words - 1 means totally, 2 means allowed only at the beginning, 3 means allowed only at the end, 4 means not allowed at the beginning, 5 means not allowed at the end - not implemented;
G_uncompoundable['a'] = 2;
G_uncompoundable['asa'] = 2;
G_uncompoundable['aa'] = 2;
G_uncompoundable['i'] = 1;
G_uncompoundable['ii'] = 1;
G_uncompoundable['u'] = 1;
G_uncompoundable['uu'] = 1;
G_uncompoundable['ko'] = 1;
G_uncompoundable['ka'] = 2;
G_uncompoundable['kha'] = 1;
G_uncompoundable['ga'] = 3;
G_uncompoundable['gha'] = 1;
G_uncompoundable['ja'] = 3;
G_uncompoundable['jha'] = 1;
G_uncompoundable['~na'] = 1;
G_uncompoundable['ta'] = 2;
G_uncompoundable['tha'] = 1;
G_uncompoundable['da'] = 1;
//G_uncompoundable['na'] = 2;
G_uncompoundable['na.m'] = 1;
G_uncompoundable['nu'] = 3;
G_uncompoundable['ne'] = 1;
G_uncompoundable['pha'] = 1;
G_uncompoundable['pi'] = 4;
G_uncompoundable['ba'] = 1;
G_uncompoundable['bha'] = 1;
G_uncompoundable['ma'] = 1;
G_uncompoundable['maa'] = 2;
G_uncompoundable['ya'] = 2;
G_uncompoundable['va'] = 1;
G_uncompoundable['ve'] = 1;
G_uncompoundable['vaa'] = 1;
G_uncompoundable['ra'] = 1;
G_uncompoundable['la'] = 1;
G_uncompoundable['ha'] = 3;
G_uncompoundable['se'] = 1;
G_uncompoundable['saa'] = 1;
G_uncompoundable['saz1'] = 1;
G_uncompoundable['saz2'] = 1;
G_uncompoundable['saz4'] = 1;
G_uncompoundable['suz1'] = 1;
G_uncompoundable['suz2'] = 2;
G_uncompoundable['suz3'] = 2;
G_uncompoundable['hi'] = 1;
//G_uncompoundable['ca'] = 2;
G_uncompoundable['a.na'] = 1;
//G_uncompoundable['aadi'] = 3;

var G_indeclinableEnding = new Array(); 
/* endings
 * [0][x][0]=suffix to add, [1]=suf in dictionary
 * [1][0] =ending to add for analysis, [1] = ending to add for output
 */
G_indeclinableEnding["nti"] = [[['ti','ti']],['.m','n']]; 
G_indeclinableEnding["iiti"] = [[['ti','ti']],['i','ii']];  // these won't work with verb conjugations...
G_indeclinableEnding["aati"] = [[['ti','ti']],['a','aa']];
G_indeclinableEnding["uuti"] = [[['ti','ti']],['u','uu']];
G_indeclinableEnding["oti"] = [[['ti','ti']],['o','o']];
G_indeclinableEnding["pi"] = [[['pi','pi']]];
G_indeclinableEnding["api"] = [[['api','api']]];
G_indeclinableEnding["~nhi"] = [[['hi','hi']],['.m','~n']];
G_indeclinableEnding["va"] = [[['va','va']]];
G_indeclinableEnding["~n~neva"] = [[['eva','eva']],['.m','~n~n']];
G_indeclinableEnding["~n~nevettha"] = [[['ev','eva'],['ettha','ettha']],['.m','~n~n']];
G_indeclinableEnding["eva"] = [[['eva','eva']]];
G_indeclinableEnding["idha"] = [[['idha','idha']]];
G_indeclinableEnding["yeva"] = [[['y','ya'],['eva','eva']]];
G_indeclinableEnding["ya.m"] = [[['ya.m','aya.m']]];
G_indeclinableEnding["me"] = [[['me','aya.m']]];
G_indeclinableEnding["maa"] = [[['maa','aya.m']]];
G_indeclinableEnding["osi"] = [[['si','atthi']],['a','o']];
G_indeclinableEnding["aavuso"] = [[['aavuso','aavuso']]];
G_indeclinableEnding["aavuso"] = [[['aavuso','aavuso']],['i','']];
G_indeclinableEnding["aavuso"] = [[['aavuso','aavuso']],['a','']];
G_indeclinableEnding["tveva"] = [[['tv','tu'],['eva','eva']]];
G_indeclinableEnding["vevassa"] = [[['ev','eva'],['assa','assa4']],['u','v']];
G_indeclinableEnding["paaha.m"] = [[['p','pi'],['aha.m','aaha.m']]];
G_indeclinableEnding["oha.m"] = [[['ha.m','aha.m']],['o','o']];
G_indeclinableEnding["~nca"] = [[['ca','ca']],['.m','~n']];
G_indeclinableEnding["~ncida.m"] = [[['c','ca'],['ida.m','aya.m']],['.m','~n']];
G_indeclinableEnding["pissa"] = [[['pi','pi'],['ssa','assa4']]];
G_indeclinableEnding["mpi"] = [[['pi','pi']],['.m','m']];
G_indeclinableEnding["mpeta.m"] = [[['p','pi'],['eta.m','eta']],['.m','m']];
G_indeclinableEnding["hamasmi"] = [[['ham','aha.m'],['asmi','atthi']]];
G_indeclinableEnding["aha.m"] = [[['aha.m','aha.m']]];
G_indeclinableEnding["ha.m"] = [[['ha.m','aha.m']]];
G_indeclinableEnding["asmi"] = [[['asmi','atthi']]];
G_indeclinableEnding["mhi"] = [[['mhi','atthi']]];


var G_manualCompoundInd = [];

G_manualCompoundInd['meta.m'] = [['m','me'],['eta.m','eta']];
G_manualCompoundInd['paneta.m'] = [['pan','pana'],['eta.m','eta']];
G_manualCompoundInd['sabbeheva'] = [['sabbeh','sabba'],['eva','eva']];
G_manualCompoundInd['esohamasmi'] = [['eso','eta'],['ham','aha.m'],['asmi','atthi']];
G_manualCompoundInd['nesohamasmi'] = [['n','na'],['eso','eta'],['ham','aha.m'],['asmi','atthi']];
G_manualCompoundInd['mayha.mpatthi'] = [['mayha.m','aha.m'],['p','pi'],['atthi','atthi']];
G_manualCompoundInd['yampida.m'] = [['yam','ya'],['p','pi'],['ida.m','aya.m']];
G_manualCompoundInd['idhevima.m'] = [['idh','idha'],['ev','eva'],['ima.m','aya.m']];
G_manualCompoundInd['tvamasi'] = [['tvam','tuva.m'],['asi','atthi']];
G_manualCompoundInd['kutettha'] = [['kut','ku'],['ettha','ettha']];
G_manualCompoundInd['cevida.m'] = [['c','ca'],['ev','eva'],['ida.m','aya.m']];
G_manualCompoundInd['natveva'] = [['na','na'],['tv','tu'],['eva','eva']];
G_manualCompoundInd['tu.nhassa'] = [['tu.nh','tu.nhii'],['assa','assa4']];
G_manualCompoundInd['svassa'] = [['sv','su'],['assa','assa4']];

var G_manualCompoundDec = [];
G_manualCompoundDec['vi~n~naa.na~ncaayatana'] = [['vi~n~naa.na','vi~n~naa.na'],['~nca','aana~nca'],['ayatana','aayatana']];
G_manualCompoundDec['samanvaaneti'] = [['sam','sa.m`'],['anv','anu0'],['aaneti','aaneti']];
