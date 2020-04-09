'use strict';

class DprViewModel {
  constructor() {
    this.loadingFeatureVisible = ko.observable(true)
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
      cmdVM[1]({...cmdVM[1](), ...cmd})
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

const emptyFn = () => {};

const dprCommandList = [
  {
    id: DPR_CMD_GOTO_PREV,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Go to previous section (Keyboard shortcut: p)",
    matchKey: e => e.charCode === 112,
  },
  {
    id: DPR_CMD_GOTO_INDEX,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Open book index (Keyboard shortcut: i)",
    matchKey: e => e.charCode === 105,
  },
  {
    id: DPR_CMD_GOTO_NEXT,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Go to next section (Keyboard shortcut: n)",
    matchKey: e => e.charCode === 110,
  },
  {
    id: DPR_CMD_GOTO_MYANMAR,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Switch to Myanmar tipitika (Keyboard shortcut: m)",
    matchKey: e => e.charCode === 109,
  },
  {
    id: DPR_CMD_GOTO_THAI,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Switch to Thai tipitika (Keyboard shortcut: t)",
    matchKey: e => e.charCode === 116,
  },
  {
    id: DPR_CMD_GOTO_RELM,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Go to relative section in Mūla (Keyboard shortcut: u)",
    matchKey: e => e.charCode === 117,
  },
  {
    id: DPR_CMD_GOTO_RELA,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Go to relative section in Aṭṭhakathā (Keyboard shortcut: a)",
    matchKey: e => e.charCode === 97,
  },
  {
    id: DPR_CMD_GOTO_RELT,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Go to relative section in Ṭīkā (Keyboard shortcut: k)",
    matchKey: e => e.charCode === 107,
  },
  {
    id: DPR_CMD_COPY_PERMALINK,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    title: "Copy permalink to clipboard (Keyboard shortcut: c)",
    matchKey: e => e.charCode === 99,
  },
];

function createCommands() {
  const cmds = {};
  dprCommandList.forEach(x => cmds[x.id] = ko.observable(x));
  Object.freeze(cmds);

  return cmds;
}
