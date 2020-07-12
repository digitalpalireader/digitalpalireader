'use strict';

class DprViewModel {
  constructor() {
    this.sidebarVisible = ko.observable(false);
    this.loadingFeatureVisible = ko.observable(true);
    this.landingFeatureVisible = ko.observable(false);
    this.activeTab = ko.observable(navigationFeatureName);
    this.mainFeaturesVisible = ko.observable(false);
    this.navigationFeatureVisible = ko.computed(function() {
        return this.mainFeaturesVisible() && this.activeTab() === navigationFeatureName
    }, this);
    this.searchFeatureVisible = ko.computed(function() {
        return this.mainFeaturesVisible() && this.activeTab() === searchFeatureName
    }, this);
    this.dictionaryFeatureVisible = ko.computed(function() {
        return this.mainFeaturesVisible() && this.activeTab() === dictionaryFeatureName
    }, this);
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
const DPR_CMD_APPEND_TO_TEXTPAD = 'appendToTextpad';
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
const DPR_CMD_ENTER_QUICK_REFERENCE = 'enterQuickReference';
const DPR_CMD_OPEN_SETTINGS = 'openSettings';
const DPR_CMD_GOTO_HOME = 'gotoHome';
const DPR_CMD_GOTO_PREV_DICT_ENTRY = 'gotoPrevDictEntry';
const DPR_CMD_GOTO_NEXT_DICT_ENTRY = 'gotoNextDictEntry';
const DPR_CMD_TOGGLE_DPR_SIDEBAR = 'toggleDPRSidebar';
const DPR_CMD_SHOW_BOTTOM_PANE = 'showBottomPane';
const DPR_CMD_SHOW_PALI_QUOTE = 'showPaliQuote';
const DPR_CMD_RESET_SETTINGS = 'resetSettings';
const DPR_CMD_OPEN_NEW_QUIZZ = 'openNewQuizz';
const DPR_CMD_OPEN_HELP = 'openHelp';
const DPR_CMD_OPEN_HELP_VIDEO = 'openHelpVideo';
const DPR_CMD_LAUNCH_FEEDBACK_FORM = 'launchFeedbackForm';
const DPR_CMD_INSTALL_OFFLINE_APP = 'installOfflineApp';

const emptyFn = () => {};

const dprCommandList = [
  {
    id: DPR_CMD_GOTO_PREV,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Go to previous section (Keyboard shortcut: p)",
    matchKey: e => e.key === 'p',
  },
  {
    id: DPR_CMD_GOTO_INDEX,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Open book index (Keyboard shortcut: i)",
    matchKey: e => e.key === 'i',
  },
  {
    id: DPR_CMD_GOTO_NEXT,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Go to next section (Keyboard shortcut: n)",
    matchKey: e => e.key === 'n',
  },
  {
    id: DPR_CMD_GOTO_MYANMAR,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Switch to Myanmar tipitika",
    matchKey: _ => false,
  },
  {
    id: DPR_CMD_GOTO_THAI,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Switch to Thai tipitika",
    matchKey: _ => false,
  },
  {
    id: DPR_CMD_GOTO_RELM,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Go to relative section in Mūla (Keyboard shortcut: m)",
    matchKey: e => e.key === 'm',
  },
  {
    id: DPR_CMD_GOTO_RELA,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Go to relative section in Aṭṭhakathā (Keyboard shortcut: a)",
    matchKey: e => e.key === 'a',
  },
  {
    id: DPR_CMD_GOTO_RELT,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Go to relative section in Ṭīkā (Keyboard shortcut: t)",
    matchKey: e => e.key === 't',
  },
  {
    id: DPR_CMD_COPY_PERMALINK,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Copy permalink to clipboard (Keyboard shortcut: c)",
    matchKey: e => e.key === 'c',
  },
  {
    id: DPR_CMD_SEND_TO_CONVERTER,
    notImplemented: false,
    canExecute: true,
    execute: () => __otherDialogsViewModel && __otherDialogsViewModel.sendToConvert(),
    visible: true,
    isDynamic: false,
    title: "Send text to converter (Keyboard shortcut: s)",
    matchKey: e => e.key === 's',
  },
  {
    id: DPR_CMD_SEND_TO_TEXTPAD,
    notImplemented: false,
    canExecute: true,
    execute: () => __otherDialogsViewModel && __otherDialogsViewModel.sendToTextpad(),
    visible: true,
    isDynamic: false,
    title: "Send text to textpad (Keyboard shortcut: e)",
    matchKey: e => e.key === 'e',
  },
  {
    id: DPR_CMD_APPEND_TO_TEXTPAD,
    notImplemented: false,
    canExecute: true,
    execute: () => __otherDialogsViewModel.appendToTextpad(),
    visible: true,
    isDynamic: false,
    title: "Append selection to textpad (Keyboard shortcut: E)",
    matchKey: e => e.key === 'E',
  },
  {
    id: DPR_CMD_SAVE_TO_DESKTOP,
    notImplemented: true,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Save text to desktop",
    matchKey: e => false,
  },
  {
    id: DPR_CMD_SEARCH_IN_BOOK,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Search in book",
    matchKey: e => false,
  },
  {
    id: DPR_CMD_COPY_PLACE_TO_SIDEBAR,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Copy place to sidebar",
    matchKey: e => false,
  },
  {
    id: DPR_CMD_BOOKMARK_SECTION,
    notImplemented: false,
    canExecute: false,
    execute: () => __otherDialogsViewModel && __otherDialogsViewModel.showBookmarksDialog(),
    visible: true,
    isDynamic: true,
    title: "Bookmark section (Keyboard shortcut: b)",
    matchKey: e => e.key === 'b',
  },
  {
    id: DPR_CMD_TRANSLATE_0,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
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
    isDynamic: true,
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
    isDynamic: true,
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
    isDynamic: true,
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
    isDynamic: true,
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
    isDynamic: true,
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
    isDynamic: true,
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
    isDynamic: true,
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
    isDynamic: true,
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
    isDynamic: true,
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
    isDynamic: true,
    title: '',
    icon: null,
    matchKey: e => false,
  },
  {
    id: DPR_CMD_OPEN_SETTINGS,
    notImplemented: false,
    canExecute: true,
    execute: () => __settingsDialogViewModel.showSettingsDialog(),
    visible: true,
    isDynamic: false,
    title: "Open settings dialog (Keyboard shortcut: %)",
    matchKey: e => e.key === '%',
  },
  {
    id: DPR_CMD_ENTER_QUICK_REFERENCE,
    notImplemented: false,
    canExecute: true,
    execute: () => __otherDialogsViewModel.showQuickLinksDialog(),
    visible: true,
    isDynamic: false,
    title: "Enter quick reference (Keyboard shortcut: q)",
    matchKey: e => e.key === 'q',
  },
  {
    id: DPR_CMD_GOTO_HOME,
    notImplemented: false,
    canExecute: true,
    execute: () => __otherDialogsViewModel.gotoHome(),
    visible: true,
    isDynamic: false,
    title: "Go to home page (Keyboard shortcut: v)",
    matchKey: e => e.key === 'v',
  },
  {
    id: DPR_CMD_GOTO_PREV_DICT_ENTRY,
    notImplemented: true,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: false,
    title: "Go to previous dictionary entry (Keyboard shortcut: ,)",
    matchKey: e => e.key === ',',
  },
  {
    id: DPR_CMD_GOTO_NEXT_DICT_ENTRY,
    notImplemented: true,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: false,
    title: "Go to next dictionary entry (Keyboard shortcut: .)",
    matchKey: e => e.key === '.',
  },
  {
    id: DPR_CMD_TOGGLE_DPR_SIDEBAR,
    notImplemented: false,
    canExecute: true,
    execute: () => __otherDialogsViewModel.toggleDPRSidebar(),
    visible: true,
    isDynamic: false,
    title: "Toggle DPR Sidebar (Keyboard shortcut: & or `)",
    matchKey: e => e.key === '&' || e.key === '`',
  },
  {
    id: DPR_CMD_SHOW_BOTTOM_PANE,
    notImplemented: false,
    canExecute: true,
    execute: (e) => __otherDialogsViewModel.showBottomPane(e.key),
    visible: true,
    isDynamic: false,
    title: "Show bottom panes (Keyboard shortcuts: 1, 2, 3, 4, 5)",
    matchKey: e => ['1', '2', '3', '4', '5'].includes(e.key),
  },
  {
    id: DPR_CMD_SHOW_PALI_QUOTE,
    notImplemented: false,
    canExecute: true,
    execute: () => __otherDialogsViewModel.displayPaliQuote(),
    visible: true,
    isDynamic: false,
    title: "Display Pali Quote (Keyboard shortcut: *)",
    matchKey: e => e.key === '*',
  },
  {
    id: DPR_CMD_RESET_SETTINGS,
    notImplemented: false,
    canExecute: true,
    execute: () => __otherDialogsViewModel.resetSettings(),
    visible: true,
    isDynamic: false,
    title: "Reset all settings (Keyboard shortcut: r)",
    matchKey: e => e.key === 'r',
  },
  {
    id: DPR_CMD_OPEN_NEW_QUIZZ,
    notImplemented: true,
    canExecute: false,
    execute: () => __otherDialogsViewModel.openNewQuizz(),
    visible: true,
    isDynamic: false,
    title: "Open new quizz (Keyboard shortcut: #)",
    matchKey: e => e.key === '#',
  },
  {
    id: DPR_CMD_OPEN_HELP,
    notImplemented: false,
    canExecute: true,
    execute: () => __otherDialogsViewModel.openHelp(),
    visible: true,
    isDynamic: false,
    title: "Open help dialog (Keyboard shortcut: ?)",
    matchKey: e => e.key === '?',
  },
  {
    id: DPR_CMD_OPEN_HELP_VIDEO,
    notImplemented: false,
    canExecute: true,
    execute: () => __otherDialogsViewModel.openHelpVideo(),
    visible: true,
    isDynamic: false,
    title: "Open help video (Keyboard shortcut: h)",
    matchKey: e => e.key === 'h',
  },
  {
    id: DPR_CMD_LAUNCH_FEEDBACK_FORM,
    notImplemented: false,
    canExecute: true,
    execute: () => __otherDialogsViewModel.launchFeedbackForm(),
    visible: true,
    isDynamic: false,
    title: "Launch feedback form (Keyboard shortcut: @)",
    matchKey: e => e.key === '@',
  },
  {
    id: DPR_CMD_INSTALL_OFFLINE_APP,
    notImplemented: false,
    canExecute: true,
    execute: () => __installationViewModel.showInstallationDialog(),
    visible: true,
    isDynamic: false,
    title: "Launch installation dialog (Keyboard shortcut: I)",
    matchKey: e => e.key === 'I',
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
