'use strict';

const DPR_Send_Bottom = (function () {
  async function sendTextPad(sectionId,add){
    var input = document.getElementById('pad').value;

    if(!add) { // reuse old tab
      var thisTab = DPRChrome.isThisDPRTab('DPRm');
      if (thisTab) {
        var thisTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab);
        await thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR1_format_mod.analyzeTextPad(sectionId,input);
        return;
      }
      var oldTab = DPRChrome.findDPRTab('DPR-main');

      if (!oldTab) {
        var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul?text='+DPR_translit_mod.toVel(input));
        DPR1_chrome_mod.openDPRTab(permalink,'DPR-main');
      }
      else {
        DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
        await oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR1_format_mod.analyzeTextPad(sectionId,input);
      }
    } else {
      var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul?text='+DPR_translit_mod.toVel(input));
      DPR1_chrome_mod.openDPRTab(permalink,'DPRm');
    }
  }

  return{
    sendTextPad:sendTextPad
  }
}())

window.DPR_send_bottom_mod = DPR_Send_Bottom
