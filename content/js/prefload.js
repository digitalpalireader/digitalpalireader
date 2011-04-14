var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);

var G_BoolPrefs = prefs.getBranch("extensions.digitalpalireader.boolean.");
var G_CharPrefs = prefs.getBranch("extensions.digitalpalireader.string.");
var G_IntPrefs = prefs.getBranch("extensions.digitalpalireader.number.");

function getPref(type,name) {

	eval('return G_'+type+'Prefs.get'+type+'Pref(\''+name+'\');');

}

function setPref(type,name,val) {

	eval('return G_'+type+'Prefs.set'+type+'Pref(\''+name+'\',\''+val+'\');');

}


var G_prefs = [];

G_prefs['DictH'] = ['Int',250];

G_prefs['coltext'] = ['Char','#111'];
G_prefs['colsel'] = ['Char','#550'];

G_prefs['coldppn'] = ['Char','#0B0'];
G_prefs['colped'] = ['Char','#C40'];
G_prefs['colcpd'] = ['Char','#44D'];

G_prefs['colfont'] = ['Char','Sans'];
G_prefs['colsize'] = ['Char','16'];

G_prefs['colbk'] = ['Char','#FFB'];
G_prefs['colbkcp'] = ['Char','#DDC'];
G_prefs['colinput'] = ['Char','#FFF'];
G_prefs['colbutton'] = ['Char','#FFF'];
G_prefs['colbk1'] = ['Char','yellow'];
G_prefs['colbk2'] = ['Char','aqua'];
G_prefs['colbk3'] = ['Char','green'];

G_prefs['colsearch0'] = ['Char','yellow'];
G_prefs['colsearch1'] = ['Char','blue'];
G_prefs['colsearch2'] = ['Char','green'];

G_prefs['green'] = ['Char','#00B900'];
G_prefs['blue'] = ['Char','#5353D5'];
G_prefs['brown'] = ['Char','#000000'];
G_prefs['grey'] = ['Char','grey'];
G_prefs['red'] = ['Char','red'];

G_prefs['blueh'] = ['Char','powderblue'];

G_prefs['ctrans'] = ['Bool',false];
G_prefs['catioff'] = ['Bool',false];
G_prefs['catiloc'] = ['Char','<none>'];
G_prefs['autodict'] = ['Bool',false];
G_prefs['bkgimg'] = ['Bool',true];
G_prefs['translits'] = ['Int',0];

G_prefs['showPages'] = ['Bool',false];
G_prefs['showVariants'] = ['Bool',true];
G_prefs['showPermalinks'] = ['Bool',true];
G_prefs['showNames'] = ['Bool',true];
G_prefs['showPedLinks'] = ['Bool',true];

G_prefs['altlimit'] = ['Int',20];


for (i in G_prefs) {
	if (!getPref(i,G_prefs[i][0])) { setPref(i,G_prefs[i][0],G_prefs[i][1]); }
	else G_prefs[i][1] = getPref(i,G_prefs[i][0]);
}
