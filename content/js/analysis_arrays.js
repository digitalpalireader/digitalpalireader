
// for conjugations

var G_altStem = []; //[i][0] is the replacement ending, [i][1] tells us it's a verb, [i][2] tells us we have to shorten long vowels, [i][3] tells us what sort of ending to expect from the original word (for compounds)

G_altStem['iy'] = [['a'],0,0,'a'];
G_altStem['itabb'] = [['ati','aati'],1,0,'a'];
G_altStem['etabb'] = [['eti'],1,0,'a'];
G_altStem['atabb'] = [['ati'],1,0,'a'];
G_altStem['abb'] = [['ati'],1,0,'a'];
G_altStem['.niiy'] = [['ti'],1,1,'a'];
G_altStem['.niiy'] = [['ti'],1,1,'a'];

// for compounds

var G_altStemComp = []; //[i][0] is the replacement ending, [i][1] tells us it's a verb, [i][2] tells us we have to shorten long vowels, [i][3] tells us what sort of ending to expect from the original word (for compounds)
G_altStemComp['niiy'] = ['niya',0,0,'a'];
G_altStemComp['niiy'] = ['niya',0,0,'a'];


// match blocking

var G_uncompoundable = []; // disallowed compound words - 1 means totally, 2 means allowed only at the beginning, 3 means allowed only at the end;
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
G_uncompoundable['aadi'] = 3;

var G_indeclinableEnding = new Array(); 
/* endings
 * [0][x][0]=definition info, [1]=suf to add
 * [1][0] =ending to add for analysis, [1] = ending to add for output
 */
G_indeclinableEnding["nti"] = [[['0/3190^ti^0','ti']],['.m','n']]; 
G_indeclinableEnding["iiti"] = [[['0/3190^ti^0','ti']],['i','ii']];  // these won't work with verb conjugations...
G_indeclinableEnding["aati"] = [[['0/3190^ti^0','ti']],['a','aa']];
G_indeclinableEnding["uuti"] = [[['0/3190^ti^0','ti']],['u','uu']];
G_indeclinableEnding["oti"] = [[['0/3190^ti^0','ti']],['o','o']];
G_indeclinableEnding["pi"] = [[['2/2866^pi^0','pi']]];
G_indeclinableEnding["mpi"] = [[['2/2866^pi^0','pi']],['.m','m']];
G_indeclinableEnding["~nhi"] = [[['4/1234^hi^0','hi']],['.m','~n']];
G_indeclinableEnding["va"] = [[['3/1047^va^0','va']]];
G_indeclinableEnding["eva"] = [[['0/4338^eva^0','eva']]];
G_indeclinableEnding["idha"] = [[['0/3208^idha^0','idha']]];
G_indeclinableEnding["yeva"] = [[['0^y^3','y'],['0/4338^eva^0','eva']]];
G_indeclinableEnding["ya.m"] = [[['0/2055^aya.m^0','ya.m']]];
G_indeclinableEnding["me"] = [[['0/2055^aya.m^0','me']]];
G_indeclinableEnding["maa"] = [[['0/2055^aya.m^0','maa']]];
G_indeclinableEnding["osi"] = [[['0/549^atthi^0','si']],['a','o']];
G_indeclinableEnding["vevassa"] = [[['0/4338^eva^0','ev'],['0/2055^aya.m^0','assa']],['u','v']];
//G_indeclinableEnding["~nca"] = [[['1/1501^ca^0','ca']],['.m','~n']];

var G_manualCompoundInd = [];
G_manualCompoundInd["yaava~ncida.m"] = [['yaava~n','yaava'],['c','ca'],['ida.m','ida']]; // first is what appears, second is the dict entry
G_manualCompoundInd['ceva'] = [['c','ca'],['eva','eva']]; 
G_manualCompoundInd['meta.m'] = [['m','me'],['eta.m','eta']];
G_manualCompoundInd['paneta.m'] = [['pan','pana'],['eta.m','eta']];
G_manualCompoundInd['sabbeheva'] = [['sabbeh','sabba'],['eva','eva']];
G_manualCompoundInd['esohamasmi'] = [['eso','eta'],['ham','aha.m'],['asmi','atthi']];
G_manualCompoundInd['nesohamasmi'] = [['n','na'],['eso','eta'],['ham','aha.m'],['asmi','atthi']];
G_manualCompoundInd['mayha.mpatthi'] = [['mayha.m','aha.m'],['p','pi'],['atthi','atthi']];
G_manualCompoundInd['yampida.m'] = [['yam','ya'],['p','pi'],['ida.m','aya.m']];
G_manualCompoundInd['yampissa'] = [['yam','ya'],['pi','pi'],['ssa','assa3']];
G_manualCompoundInd['idhevima.m'] = [['idh','idha'],['ev','eva'],['ima.m','aya.m']];
G_manualCompoundInd['idampissa'] = [['idam','aya.m'],['pi','pi'],['ssa','assa3']];
G_manualCompoundInd['tvamasi'] = [['tvam','tuva.m'],['asi','atthi']];
G_manualCompoundInd['kutettha'] = [['kut','ku'],['ettha','ettha']];

var G_manualCompoundDec = [];
G_manualCompoundDec['vi~n~naa.na~ncaayatana'] = [['vi~n~naa.na','vi~n~naa.na'],['~nca','aana~nca'],['ayatana','aayatana']];
G_manualCompoundDec['samanvaaneti'] = [['sam','sa.m`'],['anv','anu0'],['aaneti','aaneti']];
