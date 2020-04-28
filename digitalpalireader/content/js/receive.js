'use strict';

function getLinkPlace() { // permalinks

  var options = document.location.href.split('?')[1].split('#')[0];
  makeLinkPlace(options,true);
}
function makeLinkPlace(options,PL) {
  options = options.split('&');

  var place,index,para,query,scroll,compare,outplace;

  // parse options
  if(/^thai/.test(options[0])) {
    DgetThaiBook(options[0].split('=')[1]);
    return;
  }

  for (var i=0; i<options.length;i++) {

    var option = options[i].split('=');
    if(option[0] == 'text') {
      analyzeTextPad(decodeURIComponent(option[1]));
      return;
    }
    if(option[0] == 'ped') {
      var link = option[1].split(',');
      paliXML(link[0]+'/'+link[1]+'/'+link[2]+','+link[3]);
      return;
    }
    if(option[0] == 'dppn') {
      var link = option[1].split(',');
      DPPNXML(link[0]+'/'+link[1]+'/'+link[2]+','+link[3]);
      return;
    }
    if(option[0] == 'atth') {
      var link = option[1].split(',');
      getAtthXML(link[0],link[1],link[2]);
      return;
    }
    if (option.length == 1 || option[0] == 'loc') {
      place = (option[1] ? option[1]: option[0]);
      if (/[^-a-zA-Z0-9,.]/.test(place)) return;
      var tplace = makeLocPlace(place);
      if(tplace.length == 3)
        index = tplace;
      else
        outplace = tplace;
    }
    else if (option[0] == 'query') {
      if(/^\//.test(option[1])) query = toUni(option[1]);
      else query = toUni(decodeURIComponent(option[1]));
    }
    else if (option[0] == 'para') para = option[1];
    else if (option[0] == 'scroll') scroll = parseInt(option[1]);
    else if (option[0] == 'alt') outplace.push(1);
    else if (option[0] == 'compare') compare = option[1];
  }
  reindexPanels();
  if(index) loadXMLindex(index);
  else if(typeof(outplace) == 'object')
    loadXMLSection(query,para,outplace,PL,scroll);
}

function makeLocPlace(inplace) {
  var outplace;
  var place = inplace.split('.');

  if (place.length == 8 || /[vdmaskyxbgn]\.[0-9]+\.[mat]/.test(inplace)) {
    outplace = place;
  }
  else if (place.length == 9) {
    outplace = place;
    outplace[8] = parseInt(outplace[8]);
  }
  else { // shorthand
    outplace = convertShortLink(inplace);
    if(outplace[0] === false)
      outplace = null;
  }
  return outplace;
}

function makeNewPanelPlace([nikaya,book,meta,volume,vagga,sutta,section,hiert],count) {
  if(count == 1)
    return loadXMLSection(null,null,[nikaya,book,meta,volume,vagga,sutta,section,hiert],null,null,1);

  var tab = mainWindow.gBrowser.selectedTab.linkedBrowser;
  var elem = tab.contentDocument.getElementById('dpr-tops');
  var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/top.htm' + '?loc='+nikaya+'.'+book+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hiert+'&compare='+count);

  var node = createBrowser(tab.contentDocument,permalink,count);
  var splitter = createSplitter(tab.contentDocument,count);

  elem.appendChild(splitter);
  elem.appendChild(node);
}
function makeNewPanelIndex([nikaya,book,hiert],count) {
  if(count == 1)
    return loadXMLindex([nikaya,book,hiert],1);

  var tab = mainWindow.gBrowser.selectedTab.linkedBrowser;
  var elem = tab.contentDocument.getElementById('dpr-tops');
  var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/top.htm' + '?loc='+nikaya+'.'+book+'.'+hiert+'&compare='+count);

  var node = createBrowser(tab.contentDocument,permalink,count);
  var splitter = createSplitter(tab.contentDocument,count);

  elem.appendChild(splitter);
  elem.appendChild(node);
}

function createBrowser(thisDocument,url,count){
  var browser = thisDocument.createElement('browser');
  browser.setAttribute('disablehistory','true');
  browser.setAttribute('type','content');
  browser.setAttribute('src',url);
  browser.setAttribute('style','max-height:99%');
  browser.setAttribute('flex','1');
  browser.setAttribute('persist','height');
  browser.setAttribute('id','dpr-index-top-'+count);

  return browser;
}

function createSplitter(thisDocument,count){
  var splitter = thisDocument.createElement('splitter');
  splitter.setAttribute('id','dpr-index-top-'+count+'-splitter');

  return splitter;
}

var DPR_Receive = (function () {
  return {
  };
})();
