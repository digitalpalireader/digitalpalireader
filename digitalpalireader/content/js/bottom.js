var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
           .getInterface(Components.interfaces.nsIWebNavigation)
           .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
           .rootTreeItem
           .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
           .getInterface(Components.interfaces.nsIDOMWindow);

function abcd(a,b,c) {
  alert([a,b,c]);
}


function onDocLoadx() {
  //getconfig();
  //openDPRSidebar();

  var link = document.location.href.split('?')[1];
  if (link) {
    var opts = link.split('&');
    var linkt = '';
    var linkb = '';
    for (i in opts) {
      switch(opts[i].split('=')[0]) {
        case 'analysis':
        case 'ped':
        case 'dppn':
        case 'frombox':
          opts[i] = decodeURIComponent(opts[i]);
          linkb+=(linkb == ''?'?':'&')+opts[i]
          break;
      }
    }
    document.getElementById('dict').contentDocument.location.href = 'chrome://digitalpalireader/content/bottom.htm'+linkb;
  }
  else {
    moveFrame(6);
    document.getElementById('dict').contentDocument.location.href = 'chrome://digitalpalireader/content/bottom.htm';
  }
}
function getconfigx() {
  document.getElementById('dict').contentWindow.getconfig();
}

function moveFrame(e) {

  document.getElementById('tabs').selectedIndex = (parseInt(e)-1);
}

function openBottomMenu() {
  document.getElementById('menu').openPopup(document.getElementById('bottom-box'),'start_before',20,20);
}

// transfer functions

function outputAnalysis(opt1,opt2) {
  moveFrame(1);
  return document.getElementById('dict').contentWindow.outputAnalysis(opt1,opt2);
}
function DPPNXML(opt) {
  moveFrame(1);
  return document.getElementById('dict').contentWindow.DPPNXML(opt);
}
function paliXML(opt) {
  moveFrame(1);
  return document.getElementById('dict').contentWindow.paliXML(opt);
}
function getAtthXML(opt,opt2,opt3) {
  moveFrame(1);
  return document.getElementById('dict').contentWindow.getAtthXML(opt,opt2,opt3);
}

function sendAlertFlash(opt,opt2) {
  return document.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.alertFlash(opt,opt2);
}
function getSuttaFromNumber(opt) {
  return document.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.getSuttaFromNumber(opt);
}
