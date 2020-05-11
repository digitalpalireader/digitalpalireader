'use strict';

var DPR_prefsInfo = {
  DictH: {
    type: Number.name,
    defaultValue: 250,
  },

  translits: {
    type: Boolean.name,
    defaultValue: false,
  },
  textmag: {
    type: Number.name,
    defaultValue: 100,
  },

  coltext: {
    type: String.name,
    defaultValue: '#111111',
  },
  colsel: {
    type: String.name,
    defaultValue: '#555500',
  },
  coldppn: {
    type: String.name,
    defaultValue: '#00BB00',
  },
  colped: {
    type: String.name,
    defaultValue: '#CC4400',
  },
  colcpd: {
    type: String.name,
    defaultValue: '#4444DD',
  },

  colfont: {
    type: String.name,
    defaultValue: 'Verdana',
  },
  colsize: {
    type: Number.name,
    defaultValue: 16,
  },

  bktype: {
    type: String.name,
    defaultValue: 'colimg',
  },
  pcolbk: {
    type: Boolean.name,
    defaultValue: true,
  },
  colbk: {
    type: String.name,
    defaultValue: '#FFFFDD',
  },
  pimgbk: {
    type: Boolean.name,
    defaultValue: true,
  },
  imgbk: {
    type: String.name,
    defaultValue: 'url(/_dprhtml/images/imgbk.png)',
  },

  bkcptype: {
    type: String.name,
    defaultValue: 'col',
  },
  pcolbkcp: {
    type: Boolean.name,
    defaultValue: true,
  },
  colbkcp: {
    type: String.name,
    defaultValue: '#F4F4F4',
  },
  pimgbkcp: {
    type: Boolean.name,
    defaultValue: false,
  },
  imgbkcp: {
    type: String.name,
    defaultValue: '-moz-linear-gradient(left,#DDC,#FFF,#DDC,#DDC)',
  },

  colInput: {
    type: String.name,
    defaultValue: '#FFFFFF',
  },
  colButton: {
    type: String.name,
    defaultValue: 'RGBa(200,200,200,0.1)',
  },
  imgButton: {
    type: String.name,
    defaultValue: '-moz-linear-gradient(left,#DDC,#FFF,#DDC,#DDC)',
  },
  colButtonSel: {
    type: String.name,
    defaultValue: '#FFFFFF',
  },
  colbk1: {
    type: String.name,
    defaultValue: 'yellow',
  },
  colbk2: {
    type: String.name,
    defaultValue: 'aqua',
  },
  colbk3: {
    type: String.name,
    defaultValue: 'green',
  },

  colsearch0: {
    type: String.name,
    defaultValue: 'yellow',
  },
  colsearch1: {
    type: String.name,
    defaultValue: 'blue',
  },
  colsearch2: {
    type: String.name,
    defaultValue: 'green',
  },

  green: {
    type: String.name,
    defaultValue: '#00B900',
  },
  blue: {
    type: String.name,
    defaultValue: '#5353D5',
  },
  brown: {
    type: String.name,
    defaultValue: '#000000',
  },
  grey: {
    type: String.name,
    defaultValue: 'grey',
  },
  red: {
    type: String.name,
    defaultValue: 'red',
  },

  blueh: {
    type: String.name,
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
    type: Number.name,
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
    type: Number.name,
    defaultValue: 20,
  },
}

const getPrefStorageKey = n => `DPR.Prefsv2_${n}`;
const getPrefTypeStorageKey = n => `DPR.Prefsv2.${n}.Type`;

// default prefs

var DPR_prefsD = Object.entries(DPR_prefsInfo).reduce((acc, [k, v]) => { acc[k] = v.defaultValue; return acc; }, []);
var DPR_prefTypesD = Object.entries(DPR_prefsInfo).reduce((acc, [k, v]) => { acc[k] = v.type; return acc; }, []);

var DPR_prefs = [];

loadPreference();

function loadPreference() {
  Object
    .entries(DPR_prefsInfo)
    .reduce((acc, [k, _]) => (acc[k] = getPref(k), acc), DPR_prefs);

  if (localStorage[getPrefTypeStorageKey('SendTelemetry')] === 'true') {
    logTelemetry();
    localStorage.removeItem(getPrefTypeStorageKey('SendTelemetry'));
  }
}

function savePreferences(getPrefFn) {
  Object
  .entries(DPR_prefsInfo)
  .forEach(([k, v]) => {
      localStorage[getPrefTypeStorageKey(k)] = v.type;
      localStorage[getPrefStorageKey(k)] = DPR_prefs[k] = getPrefFn(k);
    });

  // NOTE: This calisthenic is required otherwise call to window reload kills telemetry upload call.
  localStorage[getPrefTypeStorageKey('SendTelemetry')] = 'true';
}

function getPref(name) {
  let pref = DPR_prefsD[name];
  let prefType = DPR_prefTypesD[name];

  const prefStorageKey = getPrefStorageKey(name);
  if (!(localStorage[prefStorageKey] === undefined)){
    switch (prefType){
      case Number.name:
        pref = parseInt(localStorage[prefStorageKey]);
        break;
      case String.name:
        pref = localStorage[prefStorageKey];
        pref = pref && pref.trim().replace(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i, '#$1$1$2$2$3$3')
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

function logTelemetry() {
  const modifiedPrefs = Object
    .entries(DPR_prefsInfo)
    .filter(([k, _]) => DPR_prefsD[k] !== DPR_prefs[k])
    .reduce((acc, [k, _]) => (acc[k] = DPR_prefs[k], acc), {});

  appInsights.trackEvent({ name: `Preferences updated`,  properties: modifiedPrefs, });
}

function resetAllDprSettings() {
  Object.entries(localStorage).forEach(([k, _]) => localStorage.removeItem(k));
  window.location.reload();
}
