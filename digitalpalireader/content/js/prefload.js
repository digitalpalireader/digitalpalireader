'use strict';

// TODO: Needs to be pulled into the PAL.
const setDefPrefs = DPR_PAL.isXUL ? XUL_setDefPrefs : WEB_setDefPrefs;
const setPrefs = DPR_PAL.isXUL ? XUL_setPrefs : WEB_setPrefs;
const savePrefs = DPR_PAL.isXUL ? XUL_savePrefs : WEB_savePrefs;
const setPref = DPR_PAL.isXUL ? XUL_setPref : WEB_setPref;
const getPref = DPR_PAL.isXUL ? XUL_getPref : WEB_getPref;
const erasePref = DPR_PAL.isXUL ? XUL_erasePref : WEB_erasePref;

if (DPR_PAL.isXUL) {
  var prefStem = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);

  var G_BoolPrefs = prefStem.getBranch("extensions.digitalpalireader.Bool.");
  var G_CharPrefs = prefStem.getBranch("extensions.digitalpalireader.Char.");
  var G_IntPrefs = prefStem.getBranch("extensions.digitalpalireader.Int.");
}

var G_prefTypes = [];
G_prefTypes['number'] = 'Int';
G_prefTypes['string'] = 'Char';
G_prefTypes['boolean'] = 'Bool';

function XUL_getPref(name) {
  var type = G_prefTypes[typeof(DPR_prefsD[name])];
  var ret;
  try{
    switch(type) {
      case "Int":
        ret = G_IntPrefs.getIntPref(name);
        break;
      case "Char":
        ret = G_CharPrefs.getCharPref(name);
        break;
      case "Bool":
        ret = G_BoolPrefs.getBoolPref(name);
        break;
    }
  }
  catch(ex) {
  }
  return ret;
}

function XUL_setPref(name,val) {
  var type = G_prefTypes[typeof(val)];
  var ret;
  try{
    switch(type) {
      case "Int":
        ret = G_IntPrefs.setIntPref(name,val);
        break;
      case "Char":
        ret = G_CharPrefs.setCharPref(name,val);
        break;
      case "Bool":
        ret = G_BoolPrefs.setBoolPref(name,val);
        break;
    }
  }
  catch(ex) {
  }
  return ret;

}

function XUL_setPrefs() {
}

function XUL_savePrefs() {
}

function XUL_erasePref() {
}

// default prefs

var DPR_prefsD = [];

DPR_prefsD['DictH'] = 250;

DPR_prefsD['translits'] = 0;
DPR_prefsD['textmag'] = 100;
DPR_prefsD['coltext'] = '#111';
DPR_prefsD['colsel'] = '#550';

DPR_prefsD['coldppn'] = '#0B0';
DPR_prefsD['colped'] = '#C40';
DPR_prefsD['colcpd'] = '#44D';

DPR_prefsD['colfont'] = 'Verdana';
DPR_prefsD['colsize'] = '16';

DPR_prefsD['bktype'] = 'colimg';
DPR_prefsD['colbk'] = '#FFD';
DPR_prefsD['imgbk'] = 'url(/digitalpalireader/content/images/background.png)';

DPR_prefsD['bkcptype'] = 'col';
DPR_prefsD['colbkcp'] = '#F4F4F4';
DPR_prefsD['imgbkcp'] = '-moz-linear-gradient(left,#DDC,#FFF,#DDC,#DDC)';

DPR_prefsD['colInput'] = '#FFF';
DPR_prefsD['colButton'] = 'RGBa(200,200,200,0.1)';
DPR_prefsD['imgButton'] = '-moz-linear-gradient(left,#DDC,#FFF,#DDC,#DDC)';
DPR_prefsD['colButtonSel'] = '#FFF';
DPR_prefsD['colbk1'] = 'yellow';
DPR_prefsD['colbk2'] = 'aqua';
DPR_prefsD['colbk3'] = 'green';

DPR_prefsD['colsearch0'] = 'yellow';
DPR_prefsD['colsearch1'] = 'blue';
DPR_prefsD['colsearch2'] = 'green';

DPR_prefsD['green'] = '#00B900';
DPR_prefsD['blue'] = '#5353D5';
DPR_prefsD['brown'] = '#000000';
DPR_prefsD['grey'] = 'grey';
DPR_prefsD['red'] = 'red';

DPR_prefsD['blueh'] = 'powderblue';

DPR_prefsD['ctrans'] = true;
DPR_prefsD['catioff'] = true;
DPR_prefsD['catiloc'] = 'https://tipitaka.digitalpalireader.online/ati';
DPR_prefsD['autodict'] = false;
DPR_prefsD['bkgimg'] = true;

DPR_prefsD['buddhist_texts'] = true;
DPR_prefsD['btloc'] = 'https://tipitaka.digitalpalireader.online/bt';


DPR_prefsD['allContext'] = true;
DPR_prefsD['contextSelected'] = false;
DPR_prefsD['noContext'] = false;

DPR_prefsD['translits'] = 0;

DPR_prefsD['setRows'] = 7;

DPR_prefsD['showPages'] = false;
DPR_prefsD['showPagesFull'] = false;
DPR_prefsD['showVariants'] = true;
DPR_prefsD['showVariantsInline'] = true;
DPR_prefsD['showPermalinks'] = true;
DPR_prefsD['showNames'] = true;
DPR_prefsD['showPedLinks'] = true;

DPR_prefsD['nigahita'] = false;

DPR_prefsD['copyWord'] = false;

DPR_prefsD['altlimit'] = 20;

var DPR_prefs = [];

function XUL_setDefPrefs() {
  for (var i in DPR_prefsD) {
    DPR_prefs[i] = getPref(i);
  }
}
setDefPrefs();

function WEB_setDefPrefs() {
  for (var i in DPR_prefsD) {
    DPR_prefs[i] = getPref(i);
  }
}

function WEB_setPrefs() {
  for (var i in DPR_prefsD) {
    var pref = WEB_getPref(i);
    if(pref === null)
      pref = DPR_prefsD[i];

    DPR_prefs[i] = pref;
  }
}

function WEB_savePrefs() {
  WEB_setPrefs();
}

function WEB_setPref(name,value) {
  var expires = "";
  var date = new Date();
  date.setTime(date.getTime() + (3650*24*60*60*1000));
  expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + value + expires + "; path=/";
}

function WEB_getPref(name) {
  let pref = DPR_prefsD[name];
  let prefType = localStorage['DPR_Prefs_type_'+name] === undefined ? 'string' : localStorage['DPR_Prefs_type_'+name];

  if (!(localStorage['DPR_Prefs_'+name] === undefined)){
    switch (prefType){
      case 'int':
        pref = parseInt(localStorage['DPR_Prefs_'+name]);
        break;
      default:
        pref = localStorage['DPR_Prefs_'+name];
        break;
    }
  }

  return /(chrome:)/.test(pref) ? '' : pref;
}

function WEB_getPref_FromStore(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function WEB_erasePref(name) {
    createCookie(name,"",-1);
}
