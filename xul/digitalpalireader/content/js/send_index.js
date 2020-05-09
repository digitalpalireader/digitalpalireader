
function sendTextPad(input, add){

  if(!add) { // reuse old tab
    var thisTab = DPR_PAL.mainWindow.gBrowser.selectedTab;
    var thisTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab);
    thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.wrappedJSObject.analyzeTextPad(input);
    return;
  }
  else {
    var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/bottom.htm' + '?analysis='+toVel(input)+'&frombox='+frombox);
    openDPRMain('DPRm',permalink,'bottom');
  }
}


