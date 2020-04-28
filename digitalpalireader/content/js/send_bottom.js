
function sendTextPad(add){
  var input = document.getElementById('pad').value;

  if(!add) { // reuse old tab
    mainWindow.gBrowser.selectedTab.linkedBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.analyzeTextPad(input);
    return;
  }
  else {
    var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul?text='+toVel(input));
    openDPRTab(permalink,'DPRm');
  }
}
