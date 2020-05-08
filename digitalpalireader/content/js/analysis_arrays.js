'use strict';


// for conjugations

glblObj.G_altStem = []; //[i][0][j] is a replacement ending, [i][1] tells us it was a verb, [i][1] tells us it is now a verb, [i][2] tells us we have to shorten long vowels, [i][3] tells us what sort of ending to expect from the original word (for compounds)

// n to n
glblObj.G_altStem['iy'] = [['a'],0,0,0,'a'];
glblObj.G_altStem['iik'] = [['aka','a'],0,0,0,'a'];
glblObj.G_altStem['in'] = [['i'],0,0,0,'ii'];
glblObj.G_altStem['tt'] = [[''],0,0,0,'a'];

// v to v
glblObj.G_altStem['aap'] = [['ati','aati','eti'],1,1,0,'eti'];
glblObj.G_altStem['aapess'] = [['ati','aati','eti'],1,1,0,'eti'];
glblObj.G_altStem['iiy'] = [['ati','aati','oti','eti'],1,1,0,'ati'];
glblObj.G_altStem['iiyiss'] = [['ati','aati','oti','eti'],1,1,0,'ati'];
glblObj.G_altStem['iss'] = [['ati','aati','oti'],1,1,0,'ati'];
glblObj.G_altStem['ess'] = [['ati','eti'],1,1,0,'ati'];
glblObj.G_altStem['ay'] = [['eti'],1,1,0,'ati'];

// n to v
glblObj.G_altStem['iiyamaan'] = [['ati','aati','oti','eti'],0,1,0,'a'];
glblObj.G_altStem['iyamaan'] = [['ati','aati','oti','eti'],0,1,0,'a'];
glblObj.G_altStem['maan'] = [['ti','ati'],0,1,0,'a'];
glblObj.G_altStem['ant'] = [['ati','aati'],0,1,0,'a'];
glblObj.G_altStem['ent'] = [['eti','ati'],0,1,0,'a'];
glblObj.G_altStem['ont'] = [['oti'],0,1,0,'a'];
glblObj.G_altStem['itabb'] = [['ati','aati'],0,1,0,'a'];
glblObj.G_altStem['etabb'] = [['eti','ati'],0,1,0,'a'];
glblObj.G_altStem['atabb'] = [['ati','aati'],0,1,0,'a'];
glblObj.G_altStem['abb'] = [['ati'],0,1,0,'a'];
glblObj.G_altStem['.niiy'] = [['ti'],0,1,1,'a'];
glblObj.G_altStem['niiy'] = [['ti'],0,1,1,'a'];

// for compounds

glblObj.G_altStemComp = []; //[i][0] is the replacement ending, [i][1] tells us it's a verb, [i][2] tells us we have to shorten long vowels
glblObj.G_altStemComp['.niiya'] = ['.niya',0,0];
glblObj.G_altStemComp['niiya'] = ['niya',0,0];
glblObj.G_altStemComp['aa'] = ['',0,0];
glblObj.G_altStemComp['ii'] = ['a',0,0];

glblObj.G_altInnerStem = [];  // inner replacements i = existing part, [i][0] = replacement, [i][1] = Noun, Verb
//glblObj.G_altInnerStem['gaah'] = ['gah','N'];
glblObj.G_altInnerStem['.mk'] = ['"nk','N'];
glblObj.G_altInnerStem['.mg'] = ['"ng','N'];
glblObj.G_altInnerStem['nn'] = ['.n.n','N'];


// match blocking

glblObj.G_uncompoundable = []; // disallowed compound words - 1 means totally, 2 means allowed only at the beginning, 3 means allowed only at the end, 4 means not allowed at the beginning, 5 means not allowed at the end - not implemented;
glblObj.G_uncompoundable['a'] = 2;
glblObj.G_uncompoundable['asa'] = 2;
glblObj.G_uncompoundable['aa'] = 2;
glblObj.G_uncompoundable['i'] = 1;
glblObj.G_uncompoundable['ii'] = 1;
glblObj.G_uncompoundable['u'] = 1;
glblObj.G_uncompoundable['uu'] = 1;
glblObj.G_uncompoundable['ena'] = 5;
glblObj.G_uncompoundable['ko'] = 1;
glblObj.G_uncompoundable['ka'] = 2;
glblObj.G_uncompoundable['kha'] = 1;
glblObj.G_uncompoundable['ga'] = 3;
glblObj.G_uncompoundable['gha'] = 1;
glblObj.G_uncompoundable['ja'] = 3;
glblObj.G_uncompoundable['jha'] = 1;
glblObj.G_uncompoundable['~na'] = 1;
glblObj.G_uncompoundable['ta'] = 2;
glblObj.G_uncompoundable['te'] = 2;
glblObj.G_uncompoundable['tha'] = 1;
glblObj.G_uncompoundable['da'] = 1;
//glblObj.G_uncompoundable['na'] = 2;
glblObj.G_uncompoundable['na.m'] = 1;
glblObj.G_uncompoundable['nu'] = 3;
glblObj.G_uncompoundable['ne'] = 1;
glblObj.G_uncompoundable['pha'] = 1;
glblObj.G_uncompoundable['pi'] = 4;
glblObj.G_uncompoundable['ba'] = 1;
glblObj.G_uncompoundable['bha'] = 1;
glblObj.G_uncompoundable['ma'] = 1;
glblObj.G_uncompoundable['maa'] = 2;
glblObj.G_uncompoundable['ya'] = 2;
glblObj.G_uncompoundable['va'] = 1;
glblObj.G_uncompoundable['ve'] = 1;
glblObj.G_uncompoundable['vaa'] = 1;
glblObj.G_uncompoundable['ra'] = 1;
glblObj.G_uncompoundable['la'] = 1;
glblObj.G_uncompoundable['ha'] = 3;
glblObj.G_uncompoundable['so'] = 1;
glblObj.G_uncompoundable['se'] = 1;
glblObj.G_uncompoundable['sii'] = 5;
glblObj.G_uncompoundable['saa'] = 1;
glblObj.G_uncompoundable['saz1'] = 1;
glblObj.G_uncompoundable['saz2'] = 1;
glblObj.G_uncompoundable['saz4'] = 1;
glblObj.G_uncompoundable['suz1'] = 1;
glblObj.G_uncompoundable['suz2'] = 2;
glblObj.G_uncompoundable['suz3'] = 2;
glblObj.G_uncompoundable['hi'] = 1;
//glblObj.G_uncompoundable['ca'] = 2;
glblObj.G_uncompoundable['a.na'] = 1;
//glblObj.G_uncompoundable['aadi'] = 3;

glblObj.G_indeclinableEnding = new Array();
/* endings
 * [0][x][0]=suffix to add, [1]=suf in dictionary
 * [1][0] =ending to add for analysis, [1] = ending to add for output
 */
glblObj.G_indeclinableEnding["nti"] = [[['ti','ti']],['.m','n']];
glblObj.G_indeclinableEnding["iiti"] = [[['ti','ti']],['i','ii']];  // these won't work with verb conjugations...
glblObj.G_indeclinableEnding["aati"] = [[['ti','ti']],['a','aa']];
glblObj.G_indeclinableEnding["uuti"] = [[['ti','ti']],['u','uu']];
glblObj.G_indeclinableEnding["oti"] = [[['ti','ti']],['o','o']];
glblObj.G_indeclinableEnding["pi"] = [[['pi','pi']]];
glblObj.G_indeclinableEnding["api"] = [[['api','api']]];
glblObj.G_indeclinableEnding[".msuudha"] = [[['su','su'],['dha','idha']],['.m','.m']];
glblObj.G_indeclinableEnding["~nhi"] = [[['hi','hi']],['.m','~n']];
glblObj.G_indeclinableEnding["va"] = [[['va','va']]];
glblObj.G_indeclinableEnding["~n~neva"] = [[['~n','~n'],['eva','eva']],['.m','~n']];
glblObj.G_indeclinableEnding["~n~neveko"] = [[['~n','~n'],['ev','eva'],['eko','eka']],['.m','~n']];
glblObj.G_indeclinableEnding["~n~nevettha"] = [[['~n','~n'],['ev','eva'],['ettha','ettha']],['.m','~n']];
glblObj.G_indeclinableEnding["eva"] = [[['eva','eva']]];
glblObj.G_indeclinableEnding["idha"] = [[['idha','idha']]];
glblObj.G_indeclinableEnding["yeva"] = [[['y','y'],['eva','eva']]];
glblObj.G_indeclinableEnding["yeva"] = [[['y','ya'],['eva','eva']]];
glblObj.G_indeclinableEnding["ya.m"] = [[['ya.m','aya.m']]];
glblObj.G_indeclinableEnding["me"] = [[['me','aya.m']]];
glblObj.G_indeclinableEnding["maa"] = [[['maa','aya.m']]];
glblObj.G_indeclinableEnding["osi"] = [[['si','atthi']],['a','o']];
glblObj.G_indeclinableEnding["aavuso"] = [[['aavuso','aavuso']]];
glblObj.G_indeclinableEnding["aavuso"] = [[['aavuso','aavuso']],['i','']];
glblObj.G_indeclinableEnding["aavuso"] = [[['aavuso','aavuso']],['a','']];
glblObj.G_indeclinableEnding["tveva"] = [[['tv','tu'],['eva','eva']]];
glblObj.G_indeclinableEnding["vevassa"] = [[['ev','eva'],['assa','assa4']],['u','v']];
glblObj.G_indeclinableEnding["paaha.m"] = [[['p','pi'],['aha.m','aaha.m']]];
glblObj.G_indeclinableEnding["oha.m"] = [[['ha.m','aha.m']],['o','o']];
glblObj.G_indeclinableEnding["~nca"] = [[['ca','ca']],['.m','~n']];
glblObj.G_indeclinableEnding["~ncideva"] = [[['ci','ci'],['d','d'],['eva','eva']],['.m','~n']];
glblObj.G_indeclinableEnding["~ncida.m"] = [[['c','ca'],['ida.m','aya.m']],['.m','~n']];
glblObj.G_indeclinableEnding["~nceta.m"] = [[['c','ca'],['eta.m','aya.m']],['.m','~n']];
glblObj.G_indeclinableEnding["pissa"] = [[['pi','pi'],['ssa','assa4']]];
glblObj.G_indeclinableEnding["mpi"] = [[['pi','pi']],['.m','m']];
glblObj.G_indeclinableEnding["mpeta.m"] = [[['p','pi'],['eta.m','eta']],['.m','m']];
glblObj.G_indeclinableEnding["hamasmi"] = [[['ham','aha.m'],['asmi','atthi']]];
glblObj.G_indeclinableEnding["aha.m"] = [[['aha.m','aha.m']]];
glblObj.G_indeclinableEnding["ha.m"] = [[['ha.m','aha.m']]];
glblObj.G_indeclinableEnding["asmi"] = [[['asmi','atthi']]];
glblObj.G_indeclinableEnding["mhi"] = [[['mhi','atthi']]];
glblObj.G_indeclinableEnding["yime"] = [[['y','y'],['ime','aya.m']]];


glblObj.G_manualCompoundInd = [];

glblObj.G_manualCompoundInd['meta.m'] = [['m','me'],['eta.m','eta']];
glblObj.G_manualCompoundInd['paneta.m'] = [['pan','pana'],['eta.m','eta']];
glblObj.G_manualCompoundInd['sabbeheva'] = [['sabbeh','sabba'],['eva','eva']];
glblObj.G_manualCompoundInd['esohamasmi'] = [['eso','eta'],['ham','aha.m'],['asmi','atthi']];
glblObj.G_manualCompoundInd['nesohamasmi'] = [['n','na'],['eso','eta'],['ham','aha.m'],['asmi','atthi']];
glblObj.G_manualCompoundInd['mayha.mpatthi'] = [['mayha.m','aha.m'],['p','pi'],['atthi','atthi']];
glblObj.G_manualCompoundInd['yampida.m'] = [['yam','ya'],['p','pi'],['ida.m','aya.m']];
glblObj.G_manualCompoundInd['idhevima.m'] = [['idh','idha'],['ev','eva'],['ima.m','aya.m']];
glblObj.G_manualCompoundInd['tvamasi'] = [['tvam','tuva.m'],['asi','atthi']];
glblObj.G_manualCompoundInd['kutettha'] = [['kut','ku'],['ettha','ettha']];
glblObj.G_manualCompoundInd['cevida.m'] = [['c','ca'],['ev','eva'],['ida.m','aya.m']];
glblObj.G_manualCompoundInd['natveva'] = [['na','na'],['tv','tu'],['eva','eva']];
glblObj.G_manualCompoundInd['tu.nhassa'] = [['tu.nh','tu.nhii'],['assa','assa4']];
glblObj.G_manualCompoundInd['svassa'] = [['sv','su'],['assa','assa4']];
glblObj.G_manualCompoundInd['ya~n~nadeva'] = [['ya~n','ya'],['~nad','ya'],['eva','eva']];

glblObj.G_manualCompoundDec = [];
glblObj.G_manualCompoundDec['vi~n~naa.na~ncaayatana'] = [['vi~n~naa.na','vi~n~naa.na'],['~nca','aana~nca'],['ayatana','aayatana']];
glblObj.G_manualCompoundDec['samanvaaneti'] = [['sam','sa.m`'],['anv','anu0'],['aaneti','aaneti']];
