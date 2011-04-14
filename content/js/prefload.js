var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);

var G_BoolPrefs = prefs.getBranch("extensions.digitalpalireader.Bool.");
var G_CharPrefs = prefs.getBranch("extensions.digitalpalireader.Char.");
var G_IntPrefs = prefs.getBranch("extensions.digitalpalireader.Int.");

var G_prefTypes = [];
G_prefTypes['number'] = 'Int';
G_prefTypes['string'] = 'Char';
G_prefTypes['boolean'] = 'Bool';

function getPref(name) {
	var type = G_prefTypes[typeof(name)];
	var ret; 
	try{
		eval('ret = G_'+type+'Prefs.get'+type+'Pref(\''+name+'\');');
	}
	catch(ex) {
	}
	return ret;
}

function setPref(name,val) {
	var type = G_prefTypes[typeof(name)];
	var ret; 
	try{
		eval('ret = G_'+type+'Prefs.set'+type+'Pref(\''+name+'\',\''+val+'\');');
	}
	catch(ex) {
	}
	return ret;
	
}


var G_prefs = [];

G_prefs['DictH'] = 250;

G_prefs['coltext'] = '#111';
G_prefs['colsel'] = '#550';

G_prefs['coldppn'] = '#0B0';
G_prefs['colped'] = '#C40';
G_prefs['colcpd'] = '#44D';

G_prefs['colfont'] = 'Sans';
G_prefs['colsize'] = '16';

G_prefs['bktype'] = 'colbk';
G_prefs['colbk'] = '#FFB';
G_prefs['imgbk'] = '#FFB';

G_prefs['bkcptype'] = 'imgbkcp';
G_prefs['colbkcp'] = '#DDC';
G_prefs['imgbkcp'] = '-moz-linear-gradient(left,#DDC,#FFF,#DDC)';

G_prefs['colinput'] = '#FFF';
G_prefs['colbutton'] = '#FFF';
G_prefs['colbk1'] = 'yellow';
G_prefs['colbk2'] = 'aqua';
G_prefs['colbk3'] = 'green';

G_prefs['colsearch0'] = 'yellow';
G_prefs['colsearch1'] = 'blue';
G_prefs['colsearch2'] = 'green';

G_prefs['green'] = '#00B900';
G_prefs['blue'] = '#5353D5';
G_prefs['brown'] = '#000000';
G_prefs['grey'] = 'grey';
G_prefs['red'] = 'red';

G_prefs['blueh'] = 'powderblue';

G_prefs['ctrans'] = false;
G_prefs['catioff'] = false;
G_prefs['catiloc'] = '<none>';
G_prefs['autodict'] = false;
G_prefs['bkgimg'] = true;
G_prefs['translits'] = 0;

G_prefs['showPages'] = false;
G_prefs['showVariants'] = true;
G_prefs['showPermalinks'] = true;
G_prefs['showNames'] = true;
G_prefs['showPedLinks'] = true;

G_prefs['altlimit'] = 20;


for (i in G_prefs) {
	if (!getPref(i)) { setPref(i,G_prefs[i]); }
	else G_prefs[i] = getPref(i);
}
