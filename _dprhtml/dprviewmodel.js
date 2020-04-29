'use strict';

class DprViewModel {
  constructor() {
    this.sidebarVisible = ko.observable(false);
    this.loadingFeatureVisible = ko.observable(true);
    this.landingFeatureVisible = ko.observable(false);
    this.mainFeaturesVisible = ko.observable(false);
    this.activeTab = ko.observable(navigationFeatureName);
    this.commands = createCommands();
    this.parseURLParameters();
  }

  showLandingFeature() {
    this.loadingFeatureVisible(false);
    this.landingFeatureVisible(true);
    this.mainFeaturesVisible(false);
  }

  showMainFeatures() {
    this.loadingFeatureVisible(false);
    this.landingFeatureVisible(false);
    this.mainFeaturesVisible(true);
  }

  parseURLParameters() {
    if (DPR_PAL.isNavigationFeature()) {
      this.activeTab(navigationFeatureName);
    } else if (DPR_PAL.isSearchFeature()) {
      this.activeTab(searchFeatureName);
    } else if (DPR_PAL.isDictionaryFeature()) {
      this.activeTab(dictionaryFeatureName);
    } else {
      // NOTE: Default is navigation tab.
    }
  }

  updateCommand(id, cmd) {
    const cmdVM =
      Object
        .entries(this.commands)
        .find(([_, x]) => x().id === id);

    if (cmdVM) {
      let c = cmd;
      if (cmdVM[1]().id.startsWith(DPR_CMD_TRANSLATE_)) {
        c = {...c, ...{ title: `${cmd.title} (Shift + click to open in new window)`}};
      }
      cmdVM[1]({...cmdVM[1](), ...c});
    } else {
      console.error('Unable to find command:', id, 'to update with', cmd);
    }
  }
}

const DPR_CMD_GOTO_PREV = 'gotoPrevCmd';
const DPR_CMD_GOTO_INDEX = 'gotoIndexCmd';
const DPR_CMD_GOTO_NEXT = 'gotoNextCmd';
const DPR_CMD_GOTO_MYANMAR = 'gotoMyanmarCmd';
const DPR_CMD_GOTO_THAI = 'gotoThaiCmd';
const DPR_CMD_GOTO_RELM = 'gotoRelmCmd';
const DPR_CMD_GOTO_RELA = 'gotoRelaCmd';
const DPR_CMD_GOTO_RELT = 'gotoReltCmd';
const DPR_CMD_COPY_PERMALINK = 'copyPermalinkCmd';
const DPR_CMD_SEND_TO_CONVERTER = 'sendToConverter';
const DPR_CMD_SEND_TO_TEXTPAD = 'sendToTextPad';
const DPR_CMD_SAVE_TO_DESKTOP = 'saveToDesktop';
const DPR_CMD_SEARCH_IN_BOOK = 'searchInBook';
const DPR_CMD_COPY_PLACE_TO_SIDEBAR = 'copyPlaceToSidebar';
const DPR_CMD_BOOKMARK_SECTION = 'bookmarkSection';
const DPR_CMD_TRANSLATE_ = 'translate';
const DPR_CMD_TRANSLATE_0 = 'translate0';
const DPR_CMD_TRANSLATE_1 = 'translate1';
const DPR_CMD_TRANSLATE_2 = 'translate2';
const DPR_CMD_TRANSLATE_3 = 'translate3';
const DPR_CMD_TRANSLATE_4 = 'translate4';
const DPR_CMD_TRANSLATE_5 = 'translate5';
const DPR_CMD_TRANSLATE_6 = 'translate6';
const DPR_CMD_TRANSLATE_7 = 'translate7';
const DPR_CMD_TRANSLATE_8 = 'translate8';
const DPR_CMD_TRANSLATE_9 = 'translate9';
const DPR_CMD_TRANSLATE_10 = 'translate10';

const emptyFn = () => {};

const dprCommandList = [
  {
    id: DPR_CMD_GOTO_PREV,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Go to previous section (Keyboard shortcut: p)",
    matchKey: e => e.key === 'p',
  },
  {
    id: DPR_CMD_GOTO_INDEX,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Open book index (Keyboard shortcut: i)",
    matchKey: e => e.key === 'i',
  },
  {
    id: DPR_CMD_GOTO_NEXT,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Go to next section (Keyboard shortcut: n)",
    matchKey: e => e.key === 'n',
  },
  {
    id: DPR_CMD_GOTO_MYANMAR,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Switch to Myanmar tipitika",
    matchKey: _ => false,
  },
  {
    id: DPR_CMD_GOTO_THAI,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Switch to Thai tipitika",
    matchKey: _ => false,
  },
  {
    id: DPR_CMD_GOTO_RELM,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Go to relative section in Mūla (Keyboard shortcut: m)",
    matchKey: e => e.key === 'm',
  },
  {
    id: DPR_CMD_GOTO_RELA,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Go to relative section in Aṭṭhakathā (Keyboard shortcut: a)",
    matchKey: e => e.key === 'a',
  },
  {
    id: DPR_CMD_GOTO_RELT,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Go to relative section in Ṭīkā (Keyboard shortcut: t)",
    matchKey: e => e.key === 't',
  },
  {
    id: DPR_CMD_COPY_PERMALINK,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Copy permalink to clipboard (Keyboard shortcut: c)",
    matchKey: e => e.key === 'c',
  },
  {
    id: DPR_CMD_SEND_TO_CONVERTER,
    notImplemented: true,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Send text to converter (Keyboard shortcut: s)",
    matchKey: e => e.key === 's',
  },
  {
    id: DPR_CMD_SEND_TO_TEXTPAD,
    notImplemented: true,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Send text to textpad (Keyboard shortcut: e)",
    matchKey: e => e.key === 'e',
  },
  {
    id: DPR_CMD_SAVE_TO_DESKTOP,
    notImplemented: true,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Save text to desktop",
    matchKey: e => false,
  },
  {
    id: DPR_CMD_SEARCH_IN_BOOK,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Search in book",
    matchKey: e => false,
  },
  {
    id: DPR_CMD_COPY_PLACE_TO_SIDEBAR,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Copy place to sidebar",
    matchKey: e => false,
  },
  {
    id: DPR_CMD_BOOKMARK_SECTION,
    notImplemented: true,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Bookmark section (Keyboard shortcut: b)",
    matchKey: e => e.key === 'b',
  },
  {
    id: DPR_CMD_TRANSLATE_0,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: '',
    icon: null,
    matchKey: e => false,
  },
  {
    id: DPR_CMD_TRANSLATE_1,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: '',
    icon: null,
    matchKey: e => false,
  },
  {
    id: DPR_CMD_TRANSLATE_2,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: '',
    icon: null,
    matchKey: e => false,
  },
  {
    id: DPR_CMD_TRANSLATE_3,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: '',
    icon: null,
    matchKey: e => false,
  },
  {
    id: DPR_CMD_TRANSLATE_4,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: '',
    icon: null,
    matchKey: e => false,
  },
  {
    id: DPR_CMD_TRANSLATE_5,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: '',
    icon: null,
    matchKey: e => false,
  },
  {
    id: DPR_CMD_TRANSLATE_6,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: '',
    icon: null,
    matchKey: e => false,
  },
  {
    id: DPR_CMD_TRANSLATE_7,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: '',
    icon: null,
    matchKey: e => false,
  },
  {
    id: DPR_CMD_TRANSLATE_8,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: '',
    icon: null,
    matchKey: e => false,
  },
  {
    id: DPR_CMD_TRANSLATE_9,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: '',
    icon: null,
    matchKey: e => false,
  },
  {
    id: DPR_CMD_TRANSLATE_10,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: '',
    icon: null,
    matchKey: e => false,
  },
];

const __dprCommandsMap = {};
dprCommandList.forEach(x => __dprCommandsMap[x.id] = x);
Object.freeze(__dprCommandsMap);

function createCommands() {
  const cmds = {};
  dprCommandList.forEach(x => cmds[x.id] = ko.observable(x));
  Object.freeze(cmds);

  return cmds;
}
