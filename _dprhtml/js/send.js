'use strict';

var DPR1_send_mod = ( function () {

function eventSend(event,internal) {
  if(!event) return;
  if(internal == 1) return 'search';
  if(event.ctrlKey || event.metaKey || event.which == 2) return true;
  if(event.shiftKey) return 'shift';
  if((event.which == 1 || event.charCode || event.gesture) && internal) return 'internal';
  if (event.which == 1) return false;
  return 'right';
}

function openPlaceMATContextMenu(sectionId,hier,para,stringra,add) {
  let addNew = add

  if (add === 'internal') {
    addNew = 'shift'
  } else if (add === 'shift') {
    addNew = 'internal'
  }

  return openPlace(sectionId,hier,para,stringra,addNew)
}

async function openPlace(sectionId,[nikaya,book,meta,volume,vagga,sutta,section,hiert,alt],para,stringra,add) {
  appInsights.trackEvent({ name: 'Open place',  properties: { params: [nikaya,book,meta,volume,vagga,sutta,section,hiert,alt], para, stringra, add, }});

  if(add == 'right') return;

  if(!add) { // reuse old tab
    var thisTab = DPR1_chrome_mod.isDPRTab('DPRm');
    if(thisTab) {
      var thisTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab);
      await thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace([nikaya,book,meta,volume,vagga,sutta,section,hiert,alt]), false, sectionId, stringra, para);
      return;
    }
    var oldTab = DPR1_chrome_mod.findDPRTab('DPR-main');
    if (!oldTab) {
      var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + stringra : '')+(para ? '&para=' + para : '')+(alt ? '&alt='+alt : ''));
      DPR1_chrome_mod.openDPRTab(permalink,'DPR-main');
    }
    else {
      DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
      var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
      await oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace([nikaya,book,meta,volume,vagga,sutta,section,hiert,alt]), false, sectionId, stringra, para);
    }
  }
  else if (add == 'search') {
    var oldTab = DPR1_chrome_mod.findDPRTab('DPR-search-results');
    if (!oldTab) {
      var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + stringra : '')+(para ? '&para=' + para : '')+(alt ? '&alt='+alt : ''));
      DPR1_chrome_mod.openDPRTab(permalink,'DPR-search-results');
      return;
    }
    else {
      DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
      var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
      await oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace([nikaya,book,meta,volume,vagga,sutta,section,hiert,alt]), false, sectionId, stringra, para);
    }
  }
  else if (add == 'internal') {
    await DPR_xml_mod.loadXMLSection(sectionId,stringra,para,[nikaya,book,meta,volume,vagga,sutta,section,hiert,alt],null,null);
  }
  else if (add == 'shift') {
    if (window.getSelection)
      window.getSelection().removeAllRanges();
    var thisTab = DPR1_chrome_mod.isDPRTab('DPRm');
    if(thisTab) {
      var thisTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab);
      await thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace([nikaya,book,meta,volume,vagga,sutta,section,hiert,alt]));
      return;
    }
    var oldTab = DPR1_chrome_mod.findDPRTab('DPR-main');
    if (!oldTab) {
      var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + stringra : '')+(para ? '&para=' + para : '')+(alt ? '&alt='+alt : ''));
      DPR1_chrome_mod.openDPRTab(permalink,'DPR-main');
      return;
    }
    else {
      DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
      var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
      await oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace([nikaya,book,meta,volume,vagga,sutta,section,hiert,alt]));
    }
  }
  else {
    var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+(stringra ? '&query=' + stringra : '')+(para ? '&para=' + para : '')+(alt ? '&alt='+alt : ''));
    DPR1_chrome_mod.openDPRTab(permalink,'DPRm');
  }
}


async function openXMLindex(sectionId,nikaya,bookno,hier,add) {
  appInsights.trackEvent({ name: 'Open XML Index',  properties: { nikaya, bookno, hier, add, }});

  if(!add) { // reuse old tab
    var thisTab = DPR1_chrome_mod.isDPRTab('DPRm');
    if(thisTab) {
      var thisTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab);
      await thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace([nikaya,bookno,hier]), false, sectionId);
      return;
    }
    var oldTab = DPR1_chrome_mod.findDPRTab('DPR-main');

    if (!oldTab) {
      var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+bookno+'.'+DPR_G.G_hier);
      DPR1_chrome_mod.openDPRTab(permalink,'DPR-main');
    }
    else {
      DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
      var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
      await oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace([nikaya,bookno,hier]), false, sectionId);
    }
  }
  else if (add == 'internal') {
    await DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace([nikaya,bookno,hier]), false, sectionId);
  }
  else if (add == 'shift') {
    if (window.getSelection)
      window.getSelection().removeAllRanges();

    var thisTab = DPR1_chrome_mod.isDPRTab('DPRm');
    if(thisTab) {
      var thisTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab);
      await thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace([nikaya,bookno,hier]));
      return;
    }
    var oldTab = DPR1_chrome_mod.findDPRTab('DPR-main');
    if (!oldTab) {
      var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul?loc='+nikaya+'.'+bookno+'.'+hier);
      DPR1_chrome_mod.openDPRTab(permalink,'DPR-main');
      return;
    }
    else {
      DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
      var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
      await oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace([nikaya,bookno,hier]));
    }
  }
  else if(add != 'right'){
    var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul?loc='+nikaya+'.'+bookno+'.'+hier);
    DPR1_chrome_mod.openDPRTab(permalink,'DPRm');
  }
}

async function importXMLindex(sectionId, add) {

  var nikaya = document.getElementById('nav-set').value;
  var bookno = document.getElementById('nav-book').value-1;

  if(!add) { // reuse old tab
    var thisTab = DPR1_chrome_mod.isDPRTab('DPRm');
    if(thisTab) {
      var thisTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab);
      await thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace([nikaya,bookno,DPR_G.G_hier]), false, sectionId);
      return;
    }
    var oldTab = DPR1_chrome_mod.findDPRTab('DPR-main');

    if (!oldTab) {
      var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?loc='+nikaya+'.'+bookno+'.'+DPR_G.G_hier);
      DPR1_chrome_mod.openDPRTab(permalink,'DPR-main');
    }
    else {
      DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
      var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
      await oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR_Chrome.addOrOpenMainPanelSection(DPR_Translations.makeDprPlace([nikaya,bookno,DPR_G.G_hier]), false, sectionId);
    }
  }
  else if(add != 'right') {
    var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul?loc='+nikaya+'.'+bookno+'.'+DPR_G.G_hier);
    DPR1_chrome_mod.openDPRTab(permalink,'DPRm');
  }
  else {
    await openXMLindex(sectionId,nikaya,bookno,DPR_G.G_hier,add);
  }
}

async function sendPaliXML(link,add) {
  if(!add) { // reuse old tab
    var thisTab = DPR1_chrome_mod.isDPRTab('DPRm');
    if(thisTab) {
      await DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab).contentWindow.DPR1_dict_xml_mod.paliXML(link);
      return;
    }
    var oldTab = DPR1_chrome_mod.findDPRTab('DPR-main');

    if (!oldTab) {
            var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/dict.htm?type=PED&opts=xv,xd,xm,xs,xa,xk,xy,mm,ma,mt,sw,hd&query='+link);
      DPR1_chrome_mod.openDPRTab(permalink,'DPRd');
    }
    else {
      DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
      var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
      await oldTabBrowser.contentWindow.DPR1_dict_xml_mod.paliXML(link);
    }
  }
  else if(add!='right') {
        var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/dict.htm?type=PED&opts=xv,xd,xm,xs,xa,xk,xy,mm,ma,mt,sw,hd&query='+link);
    DPR1_chrome_mod.openDPRTab(permalink,'DPRd');
  }
}

async function sendDPPNXML(link,add) {
  if(!add) { // reuse old tab
    var thisTab = DPR1_chrome_mod.isDPRTab('DPRm');
    if(thisTab) {
      await DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab).contentWindow.DPR1_dict_xml_mod.DPPNXML(link);
      return;
    }
    var oldTab = DPR1_chrome_mod.findDPRTab('DPR-main');

    if (!oldTab) {
            var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/dict.htm?type=DPPN&opts=xv,xd,xm,xs,xa,xk,xy,mm,ma,mt,sw,hd&query='+DPR_translit_mod.toVel(link));
      DPR1_chrome_mod.openDPRTab(permalink,'DPRd');
    }
    else {
      DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
      await DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab).contentWindow.DPR1_dict_xml_mod.DPPNXML(link);
    }
  }
  else if(add!='right') {
        var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/dict.htm?type=DPPN&opts=xv,xd,xm,xs,xa,xk,xy,mm,ma,mt,sw,hd&query='+DPR_translit_mod.toVel(link));
    DPR1_chrome_mod.openDPRTab(permalink,'DPRd');
  }
}


async function sendAtt(x,type,nik,add) {
  if(!add) { // reuse old tab
    var oldTab = DPR1_chrome_mod.findDPRTab('DPR-main');

    if (!oldTab) {
      var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?atth='+x+','+type+','+nik);
      DPR1_chrome_mod.openDPRTab(permalink,'DPR-main');
    }
    else {
      DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
      await DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab).contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR1_dict_xml_mod.getAtthXML(x,type,nik);
    }
  }
  else if(add!='right'){
    var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?atth='+x+','+type+','+nik);
    DPR1_chrome_mod.openDPRTab(permalink,'DPRm');
  }
}


async function sendTitle(x,m,a,t,nik,add) {
  if(!add) { // reuse old tab
    var oldTab = DPR1_chrome_mod.findDPRTab('DPR-main');

    if (!oldTab) {
      var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?title='+x+','+m+','+a+','+t+','+nik);
      DPR1_chrome_mod.openDPRTab(permalink,'DPR-main');
    }
    else {
      DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
      var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
      await oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.DPR1_dict_xml_mod.getTitleXML(x,m,a,t,nik);
    }
  }
  else if(add!='right') {
    var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?title='+x+','+m+','+a+','+t+','+nik);
    DPR1_chrome_mod.openDPRTab(permalink,'DPRm');
  }
}





function sendPlace(place) {
  appInsights.trackEvent({ name: 'Sync sidebar',  properties: { place }});

  var sidebar = DPR1_chrome_mod.DPRSidebarWindow();
  if (sidebar) {
    sidebar.DPRNav.gotoPlace(place);
  }
  else{
    DPRNav.gotoPlace(place);
  }
}

async function sendUpdateBookmarks() {
  var oldTabs = DPR1_chrome_mod.findDPRTabs('DPR-bm');
  for (var i = 0; i < oldTabs.length; i++) {
    var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTabs[i]);
    await oldTabBrowser.contentWindow.DPR_bookmarks_mod.bookmarkframe();
  }

  var sidebar = DPR1_chrome_mod.DPRSidebarWindow();
  if (sidebar) {
    sidebar.DPRNav.bookmarkBox();
  }

}

DPR_G.G_lastcolour = 0;

async function sendAnalysisToOutput(sectionId, input, divclicked, frombox, add){
  appInsights.trackEvent({ name: 'Reading - DPR Analysis',  properties: { input, divclicked, frombox, add, }});

  const sectionElementId = DPR_Chrome.getSectionElementId(sectionId)

  if(add == 'right') return;
  if(window.getSelection().toString())
    return;
  if(divclicked) {
    divclicked = `${sectionElementId} #W${divclicked}`
    var cdiv = $(divclicked)[0]
    if (cdiv)
    {
      var ldiv = $(DPR_G.G_lastcolour)[0]
      if (ldiv)
      {
        var lcn = ldiv.className;
        if(/varc/.test(lcn))
          ldiv.style.color = DPR_G.DPR_prefs['grey'];
        else
          ldiv.style.color = DPR_G.DPR_prefs['coltext'];
        ldiv.style.border = 'none';
      }
      const colsel = DPR_G.DPR_prefs['colsel'];
      cdiv.style.color = colsel;
      cdiv.style.border = `2px inset ${colsel}`;
      DPR_G.G_lastcolour = divclicked;
    }
    if(DPR_G.DPR_prefs['copyWord'])
      DPR_PAL.copyToClipboard(input);
  }
  if(add != true) { // reuse old tab
    var thisTab = DPR1_chrome_mod.isDPRTab('DPRm');
    if(thisTab) {
      var thisTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab);
      await thisTabBrowser.contentWindow.DPR1_analysis_function_mod.outputAnalysis(sectionId, input,frombox);
      return;
    }
    var oldTab = DPR1_chrome_mod.findDPRTab('DPR-main');
    if (!oldTab) {
      var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?analysis='+DPR_translit_mod.toVel(input)+'&options='+frombox);
      DPR1_chrome_mod.openDPRTab(permalink,'DPR-main');
    }
    else {
      DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
      var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
      await oldTabBrowser.contentWindow.DPR1_analysis_function_mod.outputAnalysis(sectionId, input,frombox);
    }
  }
  else {
    var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/bottom.htm' + '?analysis='+DPR_translit_mod.toVel(input)+'&frombox='+frombox);
    DPR1_chrome_mod.openDPRTab(permalink,'DPRx');
  }
}

function sendTranslate(input, add){

  if(add == 'right') return;

  if(add != true) { // reuse old tab
    var thisTab = DPR1_chrome_mod.isDPRTab('DPRm');
    if(thisTab) {
      var thisTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab);
      thisTabBrowser.contentWindow.getTranslate(input);
      return;
    }
    var oldTab = DPR1_chrome_mod.findDPRTab('DPR-main');
    if (!oldTab) {
      var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul' + '?analysis='+DPR_translit_mod.toVel(input)+'&options='+frombox);
      DPR1_chrome_mod.openDPRTab(permalink,'DPR-main');
    }
    else {
      DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
      var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
      oldTabBrowser.contentWindow.getTranslate(input);
    }
  }
  else {
    var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/translate.htm' + '?phrase='+DPR_translit_mod.toVel(input));
    DPR1_chrome_mod.openDPRTab(permalink,'DPRx');
  }
}

async function openTranslation(url,add) {
  appInsights.trackEvent({ name: 'Open Translation',  properties: { url, add, }});

  if(add == 'right') return;

  const sInfo = DPR_Translations.parsePlace(url);
  if (add == 'shift') {
    DPR1_chrome_mod.openDPRTab(`${DPR_Translations.resolveUri(sInfo)}`, 'DPRx');
  }
  else {
    var thisTab = DPR1_chrome_mod.isDPRTab('DPRm');
    if(thisTab) {
      var thisTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(thisTab);
      var doc = thisTabBrowser.contentDocument;
      var elem = doc.getElementById('dpr-tops');
      await DPR_Chrome.addOrOpenMainPanelSection(sInfo);
      return;
    }
    var oldTab = DPR1_chrome_mod.findDPRTab('DPR-main');
    if (!oldTab) {
      DPR1_chrome_mod.openDPRTab(url,'DPRx');
    }
    else {
      DPR_PAL.mainWindow.gBrowser.selectedTab = oldTab;
      var oldTabBrowser = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(oldTab);
      var doc = oldTabBrowser.contentDocument;
      var elem = doc.getElementById('dpr-tops');
      await DPR_Chrome.addOrOpenMainPanelSection(sInfo);
      return;
    }
  }
}

function createBrowser(thisDocument,url,count){

  var browser = thisDocument.createElement('browser');
  browser.setAttribute('disablehistory','true');
  browser.setAttribute('type','content');
  browser.setAttribute('src',url);
  browser.setAttribute('style','max-height:99%');
  browser.setAttribute('flex','1');
  browser.setAttribute('persist','height');

  return browser;
}

function createSplitter(thisDocument,count){
  var splitter = thisDocument.createElement('splitter');
  return splitter;
}


function getBrowserCount() {
  return DPR_PAL.mainWindow.gBrowser.selectedTab.linkedBrowser.contentWindow.DPR1_send_mod.getBrowserCount();
}
function reindexPanels() {
  return DPR_PAL.mainWindow.gBrowser.selectedTab.linkedBrowser.contentWindow.DPR1_send_mod.reindexPanels();
}

function closePanel() {
  var cW = DPR_PAL.mainWindow.gBrowser.selectedTab.linkedBrowser.contentWindow;
  var cD = DPR_PAL.mainWindow.gBrowser.selectedTab.linkedBrowser.contentDocument;
  var elem = cD.getElementById('dpr-tops');
  var browsers = elem.getElementsByTagName('browser');

  // if last browser

  if(browsers.length == 1) {
    reindexPanels();
    browsers[0].contentWindow.refreshit();
    browsers[0].contentWindow.DPR1_format_mod.makeToolbox(false);
    cW.history.replaceState({}, 'Title', DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul'));
    return;
  }

  window.addEventListener('unload', function(){ cW.DPR1_send_mod.reindexPanels() });
  var url = cD.location.href.split('?');
  var params = url[1];

  var bottom = [];

  if(/analysis=/.test(params)) {
    bottom.push(/(analysis=[^&]+)/.exec(params)[0]);
  }
  if(/ped=/.test(params)) {
    bottom.push(/(ped=[^&]+)/.exec(params)[0]);
  }
  if(/dppn=/.test(params)) {
    bottom.push(/(dppn=[^&]+)/.exec(params)[0]);
  }
  if(/frombox=/.test(params)) {
    bottom.push(/(frombox=[^&]+)/.exec(params)[0]);
  }
  params = params.replace(/\&*(analysis|ped|dppn|frombox)=[^&]+/g,'').replace(/^\&/g,'');


  var panels = params.split('|');
  panels.splice(DPR_G.G_compare-1,1);
  panels = panels.join('|');
  url[1] = panels;
  var newurl = url.join('?').replace(/\?$/,'') + (bottom?'&' + bottom.join('&'):'');
  cW.history.replaceState({}, 'Title', newurl);

  elem.removeChild(elem.getElementsByTagName('splitter')[DPR_G.G_compare-1]);
  elem.removeChild(browsers[DPR_G.G_compare-1]);

  // collapse first splitter

  elem.getElementsByTagName('splitter')[0].setAttribute('collapsed','true');
}

async function sidebarSearch(nik,book,hiert) {
  var sidebar = DPR1_chrome_mod.DPRSidebarWindow();
  if (sidebar) {
    await sidebar.DPRNav.searchBook(nik,book,hiert);
    return;
  }
  DPR1_chrome_mod.openDPRSidebar();
  await DPR_PAL.delay(1000);
  sidebar = DPR1_chrome_mod.DPRSidebarWindow();
  if (sidebar) {
    await sidebar.DPRNav.searchBook(nik,book,hiert);
  }
}

return {
eventSend : eventSend,
getBrowserCount : getBrowserCount,
importXMLindex : importXMLindex,
openPlace : openPlace,
openPlaceMATContextMenu : openPlaceMATContextMenu,
openTranslation : openTranslation,
openXMLindex : openXMLindex,
reindexPanels : reindexPanels,
sendAnalysisToOutput : sendAnalysisToOutput,
sendAtt : sendAtt,
sendDPPNXML : sendDPPNXML,
sendPaliXML : sendPaliXML,
sendPlace : sendPlace,
sendTitle : sendTitle,
sendTranslate : sendTranslate,
sendUpdateBookmarks : sendUpdateBookmarks,
sidebarSearch : sidebarSearch,
}
})()


var DPR_Send = (function () {
  return {
    openTranslation: DPR1_send_mod.openTranslation,
  };
})();
