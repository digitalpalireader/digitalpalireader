var prefStem = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);

var G_BoolPrefs = prefStem.getBranch("extensions.digitalpalireader.Bool.");
var G_CharPrefs = prefStem.getBranch("extensions.digitalpalireader.Char.");
var G_IntPrefs = prefStem.getBranch("extensions.digitalpalireader.Int.");

var G_prefTypes = [];
G_prefTypes['number'] = 'Int';
G_prefTypes['string'] = 'Char';
G_prefTypes['boolean'] = 'Bool';

function getPref(name) {
	var type = G_prefTypes[typeof(D_prefs[name])];
	var ret; 
	try{
		eval('ret = G_'+type+'Prefs.get'+type+'Pref(\''+name+'\');');
	}
	catch(ex) {
	}
	return ret;
}

function setPref(name,val) {
	var type = G_prefTypes[typeof(val)];
	var ret; 
	try{
		eval('ret = G_'+type+'Prefs.set'+type+'Pref(\''+name+'\',\''+val+'\');');
	}
	catch(ex) {
	}
	return ret;
	
}

// default prefs

var D_prefs = [];

D_prefs['DictH'] = 250;

D_prefs['coltext'] = '#111';
D_prefs['colsel'] = '#550';

D_prefs['coldppn'] = '#0B0';
D_prefs['colped'] = '#C40';
D_prefs['colcpd'] = '#44D';

D_prefs['colfont'] = 'Sans';
D_prefs['colsize'] = '16';

D_prefs['bktype'] = 'colimg';
D_prefs['colbk'] = '#FFB';
D_prefs['imgbk'] = 'url(chrome://digitalpalireader/content/images/background.png)';

D_prefs['bkcptype'] = 'img';
D_prefs['colbkcp'] = '#DDC';
D_prefs['imgbkcp'] = '-moz-linear-gradient(left,#DDC,#FFF,#DDC)';

D_prefs['colInput'] = '#FFF';
D_prefs['colButton'] = 'RGBa(200,200,200,0.1)';
D_prefs['imgButton'] = '-moz-linear-gradient(left,#DDC,#FFF,#DDC)';
D_prefs['colButtonSel'] = '#FFF';
D_prefs['colbk1'] = 'yellow';
D_prefs['colbk2'] = 'aqua';
D_prefs['colbk3'] = 'green';

D_prefs['colsearch0'] = 'yellow';
D_prefs['colsearch1'] = 'blue';
D_prefs['colsearch2'] = 'green';

D_prefs['green'] = '#00B900';
D_prefs['blue'] = '#5353D5';
D_prefs['brown'] = '#000000';
D_prefs['grey'] = 'grey';
D_prefs['red'] = 'red';

D_prefs['blueh'] = 'powderblue';

D_prefs['ctrans'] = false;
D_prefs['catioff'] = false;
D_prefs['catiloc'] = '<none>';
D_prefs['autodict'] = false;
D_prefs['bkgimg'] = true;
D_prefs['translits'] = 0;

D_prefs['showPages'] = false;
D_prefs['showVariants'] = true;
D_prefs['showPermalinks'] = true;
D_prefs['showNames'] = true;
D_prefs['showPedLinks'] = true;

D_prefs['altlimit'] = 20;

var G_prefs = [];
for (i in D_prefs) {
	G_prefs[i] = getPref(i);
}
