'use strict';

var DPR_prefsInfo = {
  DictH: {
    type: Boolean.name,
    defaultValue: 250,
  },

  translits: {
    type: Boolean.name,
    defaultValue: 0,
  },
  textmag: {
    type: Boolean.name,
    defaultValue: 100,
  },
  coltext: {
    type: Boolean.name,
    defaultValue: '#111',
  },
  colsel: {
    type: Boolean.name,
    defaultValue: '#550',
  },

  coldppn: {
    type: Boolean.name,
    defaultValue: '#0B0',
  },
  colped: {
    type: Boolean.name,
    defaultValue: '#C40',
  },
  colcpd: {
    type: Boolean.name,
    defaultValue: '#44D',
  },

  colfont: {
    type: String.name,
    defaultValue: 'Verdana',
  },
  colsize: {
    type: Number.name,
    defaultValue: '16',
  },

  bktype: {
    type: Boolean.name,
    defaultValue: 'colimg',
  },
  colbk: {
    type: Boolean.name,
    defaultValue: '#FFD',
  },
  imgbk: {
    type: Boolean.name,
    defaultValue: 'url(/digitalpalireader/content/images/imgbk.png)',
  },

  bkcptype: {
    type: Boolean.name,
    defaultValue: 'col',
  },
  colbkcp: {
    type: Boolean.name,
    defaultValue: '#F4F4F4',
  },
  imgbkcp: {
    type: Boolean.name,
    defaultValue: '-moz-linear-gradient(left,#DDC,#FFF,#DDC,#DDC)',
  },

  colInput: {
    type: Boolean.name,
    defaultValue: '#FFF',
  },
  colButton: {
    type: Boolean.name,
    defaultValue: 'RGBa(200,200,200,0.1)',
  },
  imgButton: {
    type: Boolean.name,
    defaultValue: '-moz-linear-gradient(left,#DDC,#FFF,#DDC,#DDC)',
  },
  colButtonSel: {
    type: Boolean.name,
    defaultValue: '#FFF',
  },
  colbk1: {
    type: Boolean.name,
    defaultValue: 'yellow',
  },
  colbk2: {
    type: Boolean.name,
    defaultValue: 'aqua',
  },
  colbk3: {
    type: Boolean.name,
    defaultValue: 'green',
  },

  colsearch0: {
    type: Boolean.name,
    defaultValue: 'yellow',
  },
  colsearch1: {
    type: Boolean.name,
    defaultValue: 'blue',
  },
  colsearch2: {
    type: Boolean.name,
    defaultValue: 'green',
  },

  green: {
    type: Boolean.name,
    defaultValue: '#00B900',
  },
  blue: {
    type: Boolean.name,
    defaultValue: '#5353D5',
  },
  brown: {
    type: Boolean.name,
    defaultValue: '#000000',
  },
  grey: {
    type: Boolean.name,
    defaultValue: 'grey',
  },
  red: {
    type: Boolean.name,
    defaultValue: 'red',
  },

  blueh: {
    type: Boolean.name,
    defaultValue: 'powderblue',
  },

  ctrans: {
    type: Boolean.name,
    defaultValue: true,
  },
  catioff: {
    type: Boolean.name,
    defaultValue: true,
  },
  catiloc: {
    type: String.name,
    defaultValue: 'https://tipitaka.digitalpalireader.online/ati',
  },
  autodict: {
    type: Boolean.name,
    defaultValue: false,
  },
  bkgimg: {
    type: Boolean.name,
    defaultValue: true,
  },

  buddhist_texts: {
    type: Boolean.name,
    defaultValue: false,
  },
  btloc: {
    type: String.name,
    defaultValue: '',
  },


  allContext: {
    type: Boolean.name,
    defaultValue: true,
  },
  contextSelected: {
    type: Boolean.name,
    defaultValue: false,
  },
  noContext: {
    type: Boolean.name,
    defaultValue: false,
  },

  translits: {
    type: Number.name,
    defaultValue: 0,
  },

  setRows: {
    type: Boolean.name,
    defaultValue: 7,
  },

  showPages: {
    type: Boolean.name,
    defaultValue: false,
  },
  showPagesFull: {
    type: Boolean.name,
    defaultValue: false,
  },
  showVariants: {
    type: Boolean.name,
    defaultValue: true,
  },
  showVariantsInline: {
    type: Boolean.name,
    defaultValue: true,
  },
  showPermalinks: {
    type: Boolean.name,
    defaultValue: true,
  },
  showNames: {
    type: Boolean.name,
    defaultValue: true,
  },
  showPedLinks: {
    type: Boolean.name,
    defaultValue: true,
  },

  nigahita: {
    type: Boolean.name,
    defaultValue: false,
  },

  copyWord: {
    type: Boolean.name,
    defaultValue: false,
  },

  altlimit: {
    type: Boolean.name,
    defaultValue: 20,
  },
}

const getPrefStorageKey = n => `DPR.Prefs_${n}`;
const getPrefTypeStorageKey = n => `DPR.Prefs.${n}.Type`;

// default prefs

var DPR_prefsD = Object.entries(DPR_prefsInfo).reduce((acc, [k, v]) => { acc[k] = v.defaultValue; return acc; }, []);

var DPR_prefs = [];

setDefPrefs();

function setDefPrefs() {
  for (var i in DPR_prefsD) {
    DPR_prefs[i] = getPref(i);
  }
}

function setPrefs() {
  for (var i in DPR_prefsD) {
    var pref = getPref(i);
    if(pref === null)
      pref = DPR_prefsD[i];

    DPR_prefs[i] = pref;
  }
}

function savePrefs() {
  setPrefs();
}

function setPref(name,value) {
  var expires = "";
  var date = new Date();
  date.setTime(date.getTime() + (3650*24*60*60*1000));
  expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + value + expires + "; path=/";
}

function getPref(name) {
  let pref = DPR_prefsD[name];
  const prefTypeStorageKey = getPrefTypeStorageKey(name);
  const prefType = localStorage[prefTypeStorageKey] === undefined ? Boolean.name : localStorage[prefTypeStorageKey];

  const prefStorageKey = getPrefStorageKey(name);
  if (!(localStorage[prefStorageKey] === undefined)){
    switch (prefType){
      case Number.name:
        pref = parseInt(localStorage[prefStorageKey]);
        break;
      case String.name:
        pref = localStorage[prefStorageKey];
        break;
      case Boolean.name:
        pref = localStorage[prefStorageKey] === 'true';
        break;
      default:
        console.error('Unknown type', prefStem, 'for preference', name);
        break;
    }
  }

  return pref;
}

function getPref_FromStore(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function erasePref(name) {
  createCookie(name,"",-1);
}
