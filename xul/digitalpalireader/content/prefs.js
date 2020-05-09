
var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.digitalpalireader.");

var cks = ['showPages','showPagesFull', 'showVariants', 'showVariantsInline', 'showPermalinks', 'showNames', 'showPedLinks','ctrans','autodict','catioff','buddhist_texts','nigahita','copyWord'];
var radio = ['noContext','contextSelected','allContext'];
var strings = ['catiloc','btloc','colbk','imgbk','colbkcp','imgbkcp','colInput','colButton','colButtonSel','colped','coldppn','colcpd','coltext','colsel','colfont','colsize'];
var ints = ['setRows','altlimit'];
var colors = ['colbk','colbkcp','colInput','colButton','colButtonSel','colped','coldppn','colcpd','coltext','colsel'];

function loadDefaults() {
  for (var i = 0; i < cks.length; ++i) {
    var ck = document.getElementById(cks[i]);
    ck.checked = DPR_prefsD[cks[i]];
  }
  for (var i = 0; i < radio.length; ++i) {
    var ck = document.getElementById(radio[i]);
    if(DPR_prefsD[radio[i]])
      ck.setAttribute('selected','true');
    else
      ck.removeAttribute('selected');
  }
  for (var i = 0; i < ints.length; ++i) {
    var box = document.getElementById(ints[i]);
    box.value = DPR_prefsD[ints[i]];
  }
  for (var i = 0; i < strings.length; ++i) {
    var box = document.getElementById(strings[i]);
    box.value = DPR_prefsD[strings[i]];
  }

  // backgrounds

  var wbk = DPR_prefsD['bktype'];

  if(/col/.exec(wbk)) {
    document.getElementById('pcolbk').checked = true;
    document.getElementById('colbk').removeAttribute('disabled');
  }
  else {
    document.getElementById('pcolbk').checked = false;
    document.getElementById('colbk').setAttribute('disabled', true);
  }
  if(/img/.exec(wbk)) {
    document.getElementById('pimgbk').checked = true;
    document.getElementById('imgbk').removeAttribute('disabled');
  }
  else {
    document.getElementById('pimgbk').checked = false;
    document.getElementById('imgbk').setAttribute('disabled', true);
  }

  var sbk = DPR_prefsD['bkcptype'];

  if(/col/.exec(sbk)) {
    document.getElementById('pcolbkcp').checked = true;
    document.getElementById('colbkcp').removeAttribute('disabled');
  }
  else {
    document.getElementById('pcolbkcp').checked = false;
    document.getElementById('colbkcp').setAttribute('disabled', true);
  }
  if(/img/.exec(sbk)) {
    document.getElementById('pimgbkcp').checked = true;
    document.getElementById('imgbkcp').removeAttribute('disabled');
  }
  else {
    document.getElementById('pimgbkcp').checked = false;
    document.getElementById('imgbkcp').setAttribute('disabled', true);
  }

  if(!DPR_prefsD['catioff']) document.getElementById('catiloc').setAttribute('disabled', true);
  if(!DPR_prefsD['buddhist_texts']) document.getElementById('btloc').setAttribute('disabled', true);

  document.getElementById('translits').selectedIndex = DPR_prefsD['translits'];

}

function loadPrefs() {
    for (var i = 0; i < cks.length; ++i) {
      var ck = document.getElementById(cks[i]);
      ck.checked = prefs.getBoolPref(ck.getAttribute("prefstring"));
    }
    for (var i = 0; i < ints.length; ++i) {
      var box = document.getElementById(ints[i]);
      var prefstring = box.getAttribute("prefstring");
      box.value = prefs.getIntPref(prefstring);
    }
    for (var i = 0; i < strings.length; ++i) {
      var box = document.getElementById(strings[i]);
      var prefstring = box.getAttribute("prefstring");
      box.value = prefs.getCharPref(prefstring);
    }
    for (var i = 0; i < radio.length; ++i) {
      var ck = document.getElementById(radio[i]);
      if(prefs.getBoolPref(ck.getAttribute("prefstring"))) {
        ck.setAttribute('selected','true');
      }
      else
        ck.removeAttribute('selected');
    }

    // variants

    if(!document.getElementById('showVariants').checked) document.getElementById('showVariantsInline').disabled = true;  else document.getElementById('showVariantsInline').disabled = false;

    // backgrounds

    var wbk = prefs.getCharPref('Char.bktype');

    if(/col/.exec(wbk)) document.getElementById('pcolbk').setAttribute('checked',true);
    else {
      document.getElementById('colbk').setAttribute('disabled', 'true');
    }
    if(/img/.exec(wbk)) document.getElementById('pimgbk').checked = true;
    else {
      document.getElementById('imgbk').setAttribute('disabled', 'true');
    }

    var sbk = DPR_prefsD['bkcptype'];

    if(/col/.exec(sbk)) document.getElementById('pcolbkcp').checked = true;
    else document.getElementById('colbkcp').setAttribute('disabled', 'true');
    if(/img/.exec(sbk)) document.getElementById('pimgbkcp').checked = true;
    else document.getElementById('imgbkcp').setAttribute('disabled', 'true');


    if(!prefs.getBoolPref('Bool.catioff')) document.getElementById('catiloc').setAttribute('disabled', 'true');
    if(!prefs.getBoolPref('Bool.buddhist_texts')) document.getElementById('btloc').setAttribute('disabled', 'true');


    document.getElementById('translits').selectedIndex = prefs.getIntPref('Int.translits');

    // sets

    if(chromeFileExists('DPRMyanmar/content/exists')) {
      document.getElementById('myanmarInstalled').className="installed";
      document.getElementById('myanmarInstalled').value=document.getElementById('installed').value;
    }
    else if(profFileExists('extensions/staged/DPRMyanmar@noah.yuttadhammo.xpi')) {
      document.getElementById('myanmarInstalled').className="restart";
      document.getElementById('myanmarInstalled').value=document.getElementById('restart').value;
      document.getElementById('myanmarInstalled').onmousedown = function (){confirmRestart('Are you sure you want to restart?')};
    }
    else {
      document.getElementById('myanmarInstalled').onmousedown = function() {installSetPref('DPRMyanmar','Myanmar Tipitaka','setBrowser')};
    }

    if(chromeFileExists('DPRThai/content/exists')) {
      document.getElementById('thaiInstalled').className="installed";
      document.getElementById('thaiInstalled').value=document.getElementById('installed').value;
    }
    else if(profFileExists('extensions/staged/DPRThai@noah.yuttadhammo.xpi')) {
      document.getElementById('thaiInstalled').className="restart";
      document.getElementById('thaiInstalled').value=document.getElementById('restart').value;
      document.getElementById('thaiInstalled').onmousedown = function (){confirmRestart('Are you sure you want to restart?')};
    }
    else {
      document.getElementById('thaiInstalled').onmousedown = function() {installSetPref('DPRThai','Thai Tipitaka','setBrowser')};
    }

    // color pickers

    for(var i = 1; i < colors.length;i++) {
      document.getElementById(colors[i]+'c').color = document.getElementById(colors[i]).value;
    }

}

function savePrefs(close) {
  var atiloc = document.getElementById('catiloc').value;
  var atiFile;
  if(/\\/.exec(atiloc)) { // windows
    atiFile = atiloc;
  }
  else {
    atiFile = atiloc;
  }

  if(document.getElementById('catioff').checked) {
    if(!extFileExists(atiFile)) {
      alert('Unable to find file: "'+atiFile+'".  Please disable offline translations before saving preferences.');
      return false;
    }
    else {
      prefs.setCharPref('Char.catiloc',atiloc);
    }
  }

  var btloc = document.getElementById('btloc').value;
  var btFile;
  if(/\\/.exec(btloc)) { // windows
    btFile = btloc + '\\index.html';
  }
  else {
    btFile = btloc + '/index.html';
  }


  if(document.getElementById('buddhist_texts').checked) {
    if(!extFileExists(btFile)) {
      alert('Unable to find file: "'+btFile+'".  Please disable BuddhistTexts translations before saving preferences.');
      return false;
    }
    else {
      prefs.setCharPref('Char.btloc',btloc);
    }
  }



  for (var i = 0; i < cks.length; ++i) {
    var ck = document.getElementById(cks[i]);
    prefs.setBoolPref(ck.getAttribute("prefstring"), ck.checked);
  }
  for (var i = 0; i < radio.length; ++i) {
    var ck = document.getElementById(radio[i]);
    prefs.setBoolPref(ck.getAttribute("prefstring"), ck.getAttribute('selected'));
  }

  for (var i = 0; i < ints.length; ++i) {
    var box = document.getElementById(ints[i]);
    prefs.setIntPref(box.getAttribute("prefstring"), box.value);
  }

  var bktype = (document.getElementById('pcolbk').checked?'col':'');
  bktype += (document.getElementById('pimgbk').checked?'img':'');

  prefs.setCharPref('Char.bktype', bktype);

  var bkcptype = (document.getElementById('pcolbkcp').checked?'col':'');
  bkcptype += (document.getElementById('pimgbkcp').checked?'img':'');

  prefs.setCharPref('Char.bkcptype', bkcptype);


  for (var i = 0; i < strings.length; ++i) {
    if(strings[i] == 'colbk' && !document.getElementById('pcolbk').checked || strings[i] == 'imgbk' && !document.getElementById('pimgbk').checked || strings[i] == 'colbkcp' && !document.getElementById('pcolbkcp').checked || strings[i] == 'imgbkcp' && !document.getElementById('pimgbkcp').checked) continue;
    var box = document.getElementById(strings[i]);
    prefs.setCharPref(box.getAttribute("prefstring"), box.value);
  }

  // translit

  prefs.setIntPref('Int.translits',document.getElementById('translits').selectedIndex);

  updatePrefs(close);
}


function resetPrefs() {

}

function updatePrefs(close) {
  var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
  var e = wm.getEnumerator("navigator:browser");
  var win;

  while (e.hasMoreElements()) {
    win = e.getNext();
    var mainWindow = win.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
             .getInterface(Components.interfaces.nsIWebNavigation)
             .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
             .rootTreeItem
             .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
             .getInterface(Components.interfaces.nsIDOMWindow);
    var sidebarWindow = mainWindow.document.getElementById("sidebar").contentWindow;

    if (sidebarWindow.location.href == DPR_PAL.toWebUrl("chrome://digitalpalireader/content/digitalpalireader.xul")) {
      sidebarWindow.digitalpalireader.updatePrefs();
    }
  }

  if (close == 1) window.close();
}

function fileDialog(id, titleIn) {

  var stringBundle = document.getElementById("digitalpalireader-strings");

  var output = document.getElementById(id);
  var title = stringBundle.getString(titleIn);

  const nsIFilePicker = Components.interfaces.nsIFilePicker;
  const nsILocalFile = Components.interfaces.nsILocalFile;
  var fp = Components.classes["@mozilla.org/filepicker;1"]
                   .createInstance(nsIFilePicker);

  fp.init(window, title, nsIFilePicker.modeGetFolder);
  var result = fp.show();

  if (result == nsIFilePicker.returnOK) {
    var fileOut = fp.file.QueryInterface(nsILocalFile);
    var fileName = fp.file.path;
    if(!extFileExists(fileName)) {
      alert('Unable to find directory: "'+fileName+'".  Please confirm that you have selected the correct directory for the the archive.');
      return false;
    }
    output.value = fileName;
  }
  else if (result == nsIFilePicker.returnCancel) {
    return false;
  }
}

DPR_G.G_interval = [];

function installSetPref(set,setName,id) {
  if(!installSetPrompt(set,setName,id)) return;
  var loadNode = document.createElement('image');
  loadNode.setAttribute('src',"/digitalpalireader/content/images/dwheel.png");
  loadNode.setAttribute('class', 'spin-img-infinitely');
  document.getElementById(set).removeChild(document.getElementById(set).firstChild);
  document.getElementById(set).appendChild(loadNode);
  DPR_G.G_interval[set] = window.setInterval(function(){ checkInstalled(set) },1000);
}

function checkInstalled(set) {
  if(!profFileExists('extensions/staged/'+set+'@noah.yuttadhammo.xpi')) return;
  window.clearInterval(DPR_G.G_interval[set]);
  var loadNode = document.createElement('label');
  loadNode.setAttribute('value', document.getElementById('restart').value);
  loadNode.setAttribute('id', set+'Restart');
  loadNode.setAttribute('class', 'restart');
  document.getElementById(set).removeChild(document.getElementById(set).firstChild);
  document.getElementById(set).appendChild(loadNode);
  document.getElementById(set+'Restart').onmousedown = function (){confirmRestart('Are you sure you want to restart?')};
}
