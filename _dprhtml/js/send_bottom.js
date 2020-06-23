'use strict';

var DPR_send_bottom_mod = (function(){

function sendTextPad(add){
  var input = document.getElementById('pad').value;

  if(!add) { // reuse old tab
    var thisTab = DPRChrome.isThisDPRTab('DPRm');
    if (thisTab) {
      var thisTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab);
      thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.analyzeTextPad(input);
      return;
    }
    var oldTab = DPRChrome.findDPRTab('DPR-main');

    if (!oldTab) {
      var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul?text='+toVel(input));
      openDPRTab(permalink,'DPR-main');
    }
    else {
      DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
      var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
      oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.analyzeTextPad(input);
    }
  } else {
    var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul?text='+toVel(input));
    openDPRTab(permalink,'DPRm');
  }
}
return{
  sendTextPad:sendTextPad
}
}())
