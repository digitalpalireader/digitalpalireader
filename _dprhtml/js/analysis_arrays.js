'use strict';


// for conjugations

DPR_G.G_altStem = []; //[i][0][j] is a replacement ending, [i][1] tells us it was a verb, [i][1] tells us it is now a verb, [i][2] tells us we have to shorten long vowels, [i][3] tells us what sort of ending to expect from the original word (for compounds)

// n to n
DPR_G.G_altStem['iy'] = [['a'],0,0,0,'a'];
DPR_G.G_altStem['iik'] = [['aka','a'],0,0,0,'a'];
DPR_G.G_altStem['in'] = [['i'],0,0,0,'ii'];
DPR_G.G_altStem['tt'] = [[''],0,0,0,'a'];

// v to v
DPR_G.G_altStem['aap'] = [['ati','aati','eti'],1,1,0,'eti'];
DPR_G.G_altStem['aapess'] = [['ati','aati','eti'],1,1,0,'eti'];
DPR_G.G_altStem['iiy'] = [['ati','aati','oti','eti'],1,1,0,'ati'];
DPR_G.G_altStem['iiyiss'] = [['ati','aati','oti','eti'],1,1,0,'ati'];
DPR_G.G_altStem['iss'] = [['ati','aati','oti'],1,1,0,'ati'];
DPR_G.G_altStem['ess'] = [['ati','eti'],1,1,0,'ati'];
DPR_G.G_altStem['ay'] = [['eti'],1,1,0,'ati'];

// n to v
DPR_G.G_altStem['iiyamaan'] = [['ati','aati','oti','eti'],0,1,0,'a'];
DPR_G.G_altStem['iyamaan'] = [['ati','aati','oti','eti'],0,1,0,'a'];
DPR_G.G_altStem['maan'] = [['ti','ati'],0,1,0,'a'];
DPR_G.G_altStem['ant'] = [['ati','aati'],0,1,0,'a'];
DPR_G.G_altStem['ent'] = [['eti','ati'],0,1,0,'a'];
DPR_G.G_altStem['ont'] = [['oti'],0,1,0,'a'];
DPR_G.G_altStem['itabb'] = [['ati','aati'],0,1,0,'a'];
DPR_G.G_altStem['etabb'] = [['eti','ati'],0,1,0,'a'];
DPR_G.G_altStem['atabb'] = [['ati','aati'],0,1,0,'a'];
DPR_G.G_altStem['abb'] = [['ati'],0,1,0,'a'];
DPR_G.G_altStem['.niiy'] = [['ti'],0,1,1,'a'];
DPR_G.G_altStem['niiy'] = [['ti'],0,1,1,'a'];

// for compounds

DPR_G.G_altStemComp = []; //[i][0] is the replacement ending, [i][1] tells us it's a verb, [i][2] tells us we have to shorten long vowels
DPR_G.G_altStemComp['.niiya'] = ['.niya',0,0];
DPR_G.G_altStemComp['niiya'] = ['niya',0,0];
DPR_G.G_altStemComp['aa'] = ['',0,0];
DPR_G.G_altStemComp['ii'] = ['a',0,0];

DPR_G.G_altInnerStem = [];  // inner replacements i = existing part, [i][0] = replacement, [i][1] = Noun, Verb
//DPR_G.G_altInnerStem['gaah'] = ['gah','N'];
DPR_G.G_altInnerStem['.mk'] = ['"nk','N'];
DPR_G.G_altInnerStem['.mg'] = ['"ng','N'];
DPR_G.G_altInnerStem['nn'] = ['.n.n','N'];


// match blocking

DPR_G.G_uncompoundable = []; // disallowed compound words - 1 means totally, 2 means allowed only at the beginning, 3 means allowed only at the end, 4 means not allowed at the beginning, 5 means not allowed at the end - not implemented;
DPR_G.G_uncompoundable['a'] = 2;
DPR_G.G_uncompoundable['asa'] = 2;
DPR_G.G_uncompoundable['aa'] = 2;
DPR_G.G_uncompoundable['i'] = 1;
DPR_G.G_uncompoundable['ii'] = 1;
DPR_G.G_uncompoundable['u'] = 1;
DPR_G.G_uncompoundable['uu'] = 1;
DPR_G.G_uncompoundable['ena'] = 5;
DPR_G.G_uncompoundable['ko'] = 1;
DPR_G.G_uncompoundable['ka'] = 2;
DPR_G.G_uncompoundable['kha'] = 1;
DPR_G.G_uncompoundable['ga'] = 3;
DPR_G.G_uncompoundable['gha'] = 1;
DPR_G.G_uncompoundable['ja'] = 3;
DPR_G.G_uncompoundable['jha'] = 1;
DPR_G.G_uncompoundable['~na'] = 1;
DPR_G.G_uncompoundable['ta'] = 2;
DPR_G.G_uncompoundable['te'] = 2;
DPR_G.G_uncompoundable['tha'] = 1;
DPR_G.G_uncompoundable['da'] = 1;
//DPR_G.G_uncompoundable['na'] = 2;
DPR_G.G_uncompoundable['na.m'] = 1;
DPR_G.G_uncompoundable['nu'] = 3;
DPR_G.G_uncompoundable['ne'] = 1;
DPR_G.G_uncompoundable['pha'] = 1;
DPR_G.G_uncompoundable['pi'] = 4;
DPR_G.G_uncompoundable['ba'] = 1;
DPR_G.G_uncompoundable['bha'] = 1;
DPR_G.G_uncompoundable['ma'] = 1;
DPR_G.G_uncompoundable['maa'] = 2;
DPR_G.G_uncompoundable['ya'] = 2;
DPR_G.G_uncompoundable['va'] = 1;
DPR_G.G_uncompoundable['ve'] = 1;
DPR_G.G_uncompoundable['vaa'] = 1;
DPR_G.G_uncompoundable['ra'] = 1;
DPR_G.G_uncompoundable['la'] = 1;
DPR_G.G_uncompoundable['ha'] = 3;
DPR_G.G_uncompoundable['so'] = 1;
DPR_G.G_uncompoundable['se'] = 1;
DPR_G.G_uncompoundable['sii'] = 5;
DPR_G.G_uncompoundable['saa'] = 1;
DPR_G.G_uncompoundable['saz1'] = 1;
DPR_G.G_uncompoundable['saz2'] = 1;
DPR_G.G_uncompoundable['saz4'] = 1;
DPR_G.G_uncompoundable['suz1'] = 1;
DPR_G.G_uncompoundable['suz2'] = 2;
DPR_G.G_uncompoundable['suz3'] = 2;
DPR_G.G_uncompoundable['hi'] = 1;
//DPR_G.G_uncompoundable['ca'] = 2;
DPR_G.G_uncompoundable['a.na'] = 1;
//DPR_G.G_uncompoundable['aadi'] = 3;

DPR_G.G_indeclinableEnding = new Array();
/* endings
 * [0][x][0]=suffix to add, [1]=suf in dictionary
 * [1][0] =ending to add for analysis, [1] = ending to add for output
 */
DPR_G.G_indeclinableEnding["nti"] = [[['ti','ti']],['.m','n']];
DPR_G.G_indeclinableEnding["iiti"] = [[['ti','ti']],['i','ii']];  // these won't work with verb conjugations...
DPR_G.G_indeclinableEnding["aati"] = [[['ti','ti']],['a','aa']];
DPR_G.G_indeclinableEnding["uuti"] = [[['ti','ti']],['u','uu']];
DPR_G.G_indeclinableEnding["oti"] = [[['ti','ti']],['o','o']];
DPR_G.G_indeclinableEnding["pi"] = [[['pi','pi']]];
DPR_G.G_indeclinableEnding["api"] = [[['api','api']]];
DPR_G.G_indeclinableEnding[".msuudha"] = [[['su','su'],['dha','idha']],['.m','.m']];
DPR_G.G_indeclinableEnding["~nhi"] = [[['hi','hi']],['.m','~n']];
DPR_G.G_indeclinableEnding["va"] = [[['va','va']]];
DPR_G.G_indeclinableEnding["~n~neva"] = [[['~n','~n'],['eva','eva']],['.m','~n']];
DPR_G.G_indeclinableEnding["~n~neveko"] = [[['~n','~n'],['ev','eva'],['eko','eka']],['.m','~n']];
DPR_G.G_indeclinableEnding["~n~nevettha"] = [[['~n','~n'],['ev','eva'],['ettha','ettha']],['.m','~n']];
DPR_G.G_indeclinableEnding["eva"] = [[['eva','eva']]];
DPR_G.G_indeclinableEnding["idha"] = [[['idha','idha']]];
DPR_G.G_indeclinableEnding["yeva"] = [[['y','y'],['eva','eva']]];
DPR_G.G_indeclinableEnding["yeva"] = [[['y','ya'],['eva','eva']]];
DPR_G.G_indeclinableEnding["ya.m"] = [[['ya.m','aya.m']]];
DPR_G.G_indeclinableEnding["me"] = [[['me','aya.m']]];
DPR_G.G_indeclinableEnding["maa"] = [[['maa','aya.m']]];
DPR_G.G_indeclinableEnding["osi"] = [[['si','atthi']],['a','o']];
DPR_G.G_indeclinableEnding["aavuso"] = [[['aavuso','aavuso']]];
DPR_G.G_indeclinableEnding["aavuso"] = [[['aavuso','aavuso']],['i','']];
DPR_G.G_indeclinableEnding["aavuso"] = [[['aavuso','aavuso']],['a','']];
DPR_G.G_indeclinableEnding["tveva"] = [[['tv','tu'],['eva','eva']]];
DPR_G.G_indeclinableEnding["vevassa"] = [[['ev','eva'],['assa','assa4']],['u','v']];
DPR_G.G_indeclinableEnding["paaha.m"] = [[['p','pi'],['aha.m','aaha.m']]];
DPR_G.G_indeclinableEnding["oha.m"] = [[['ha.m','aha.m']],['o','o']];
DPR_G.G_indeclinableEnding["~nca"] = [[['ca','ca']],['.m','~n']];
DPR_G.G_indeclinableEnding["~ncideva"] = [[['ci','ci'],['d','d'],['eva','eva']],['.m','~n']];
DPR_G.G_indeclinableEnding["~ncida.m"] = [[['c','ca'],['ida.m','aya.m']],['.m','~n']];
DPR_G.G_indeclinableEnding["~nceta.m"] = [[['c','ca'],['eta.m','aya.m']],['.m','~n']];
DPR_G.G_indeclinableEnding["pissa"] = [[['pi','pi'],['ssa','assa4']]];
DPR_G.G_indeclinableEnding["mpi"] = [[['pi','pi']],['.m','m']];
DPR_G.G_indeclinableEnding["mpeta.m"] = [[['p','pi'],['eta.m','eta']],['.m','m']];
DPR_G.G_indeclinableEnding["hamasmi"] = [[['ham','aha.m'],['asmi','atthi']]];
DPR_G.G_indeclinableEnding["aha.m"] = [[['aha.m','aha.m']]];
DPR_G.G_indeclinableEnding["ha.m"] = [[['ha.m','aha.m']]];
DPR_G.G_indeclinableEnding["asmi"] = [[['asmi','atthi']]];
DPR_G.G_indeclinableEnding["mhi"] = [[['mhi','atthi']]];
DPR_G.G_indeclinableEnding["yime"] = [[['y','y'],['ime','aya.m']]];


DPR_G.G_manualCompoundInd = [];

DPR_G.G_manualCompoundInd['meta.m'] = [['m','me'],['eta.m','eta']];
DPR_G.G_manualCompoundInd['paneta.m'] = [['pan','pana'],['eta.m','eta']];
DPR_G.G_manualCompoundInd['sabbeheva'] = [['sabbeh','sabba'],['eva','eva']];
DPR_G.G_manualCompoundInd['esohamasmi'] = [['eso','eta'],['ham','aha.m'],['asmi','atthi']];
DPR_G.G_manualCompoundInd['nesohamasmi'] = [['n','na'],['eso','eta'],['ham','aha.m'],['asmi','atthi']];
DPR_G.G_manualCompoundInd['mayha.mpatthi'] = [['mayha.m','aha.m'],['p','pi'],['atthi','atthi']];
DPR_G.G_manualCompoundInd['yampida.m'] = [['yam','ya'],['p','pi'],['ida.m','aya.m']];
DPR_G.G_manualCompoundInd['idhevima.m'] = [['idh','idha'],['ev','eva'],['ima.m','aya.m']];
DPR_G.G_manualCompoundInd['tvamasi'] = [['tvam','tuva.m'],['asi','atthi']];
DPR_G.G_manualCompoundInd['kutettha'] = [['kut','ku'],['ettha','ettha']];
DPR_G.G_manualCompoundInd['cevida.m'] = [['c','ca'],['ev','eva'],['ida.m','aya.m']];
DPR_G.G_manualCompoundInd['natveva'] = [['na','na'],['tv','tu'],['eva','eva']];
DPR_G.G_manualCompoundInd['tu.nhassa'] = [['tu.nh','tu.nhii'],['assa','assa4']];
DPR_G.G_manualCompoundInd['svassa'] = [['sv','su'],['assa','assa4']];
DPR_G.G_manualCompoundInd['ya~n~nadeva'] = [['ya~n','ya'],['~nad','ya'],['eva','eva']];

DPR_G.G_manualCompoundDec = [];
DPR_G.G_manualCompoundDec['vi~n~naa.na~ncaayatana'] = [['vi~n~naa.na','vi~n~naa.na'],['~nca','aana~nca'],['ayatana','aayatana']];
DPR_G.G_manualCompoundDec['samanvaaneti'] = [['sam','sa.m`'],['anv','anu0'],['aaneti','aaneti']];
