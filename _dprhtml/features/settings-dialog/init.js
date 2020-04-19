'use strict';

const fontFamilyDefault = 'Verdana';
const textSizeDefault = '16';
const textScriptDefault = '0';

const preferenceFontFamily = 'preferenceFontFamily';
const preferenceTextSize = 'preferenceTextSize';
const preferenceTextScript = 'preferenceTextScript';


class SettingsDialogTabsViewModel {
  constructor() {
    this.isGeneralSettingsTabSelected = ko.observable(true);
    this.isLayoutSettingsTabSelected = ko.observable(false);
    this.isTextSettingsTabSelected = ko.observable(false);

    this.fontFamily = ko.observable(getPref('colfont'));
    this.textSize = ko.observable(getPref('colsize'));
    this.textScript = ko.observable(getPref('translits'));
  }

  savePreferences() {
    localStorage['DPR_Prefs_colfont'] = this.fontFamily();
    localStorage['DPR_Prefs_colsize'] = this.textSize();
    localStorage['DPR_Prefs_translits'] = this.textScript();
    localStorage['DPR_Prefs_type_translits'] = 'int';
    DPR_prefs['colfont'] = this.fontFamily();
    DPR_prefs['colsize'] = this.textSize();
    DPR_prefs['translits'] = this.textScript();
    //reload in order to update window with changed preferences - ideally there should be a more elegant way of doing this
    location.reload();
  }

  defaultPreferences() {
    this.fontFamily(fontFamilyDefault);
    this.textSize(textSizeDefault);
    this.textScript(textScriptDefault);
  }

  cancelPreferences()
  {
    this.fontFamily(DPR_prefs['colfont']);
    this.textSize(DPR_prefs['colsize']);
    this.textScript(DPR_prefs['translits']);
  }

  updateActiveSettingsTabId(tabId) {
    Object
      .entries(this)
      .filter(([n, _]) => n.indexOf("TabSelected") !== -1)
      .forEach(([_, fn]) => fn(false));

    this[`is${tabId}SettingsTabSelected`](true);
  }

  updateActiveSettingsTab(_, event) {
    this.updateActiveSettingsTabId($(event.currentTarget).data("tabid"));
  }
}
