document.onkeypress = keyPressed1;

function keyPressed1(e) {
  if (document.activeElement.type == "text" || document.activeElement.tagName == "TEXTAREA" || e.altKey || e.ctrlKey) {
    return;
  }

  if (e.charCode == 109) { // m
    openDPRTab(DPR_PAL.dprHomePage, 'DPR-main', 1);
    return;
  }

  // p

  // g

  // n

  if (e.charCode > 48 && e.charCode < 54) { // 1-6
    DPRShowBottomPane(BottomPaneTabsViewModel.TabIds[e.charCode - 49]);
    return;
  }

  if (e.charCode == 37) { // %
    $('#settingsDialog').modal('show');
    return;
  }

  if (e.charCode == 104) { // h
    openDPRTab('help.html', 'DPR-help', 0);
    return;
  }

  // @

  if (e.charCode == 63) { // ?
    $('#helpDialog').modal('show');
    return;
  }

  // var Main = mainWindow.gBrowser.selectedTab.linkedBrowser;
  // var wBot, dBot, wMain, dMain;
  // if(Main.contentDocument.getElementById('dict').contentDocument) {
  //   wBot = Main.contentDocument.getElementById('dict').contentWindow;
  //   dBot = Main.contentDocument.getElementById('dict').contentDocument;
  // }
  // wMain = Main.contentWindow;
  // dMain = Main.contentDocument;


  if (e.charCode == 112) { if (document.getElementById('pSect')) document.getElementById('pSect').onmouseup(e); return }  // p
  if (e.charCode == 110) { if (document.getElementById('nSect')) document.getElementById('nSect').onmouseup(e); return } // n

  if (e.charCode == 115) {  // s
    if (window.getSelection().toString() != '') {
      wMain.sendtoconvert(window.getSelection().toString() + '');
    }
    else if (wBot.getSelection().toString() != '') {
      wMain.sendtoconvert(wBot.getSelection().toString() + '');
    }
    else if (document.getElementById('convi')) { wMain.sendtoconvert(document.getElementById('convi').innerHTML); }
    else alertFlash('You must select some text to send to the convertor', 'yellow');
    return;
  }

  if (e.charCode == 101) {  // e
    if (window.getSelection().toString() != '') {
      wMain.sendtoPad(window.getSelection().toString() + '');
    }
    else if (wBot.getSelection().toString() != '') {
      wMain.sendtoPad(wBot.getSelection().toString() + '');
    }
    else if (document.getElementById('convi')) { wMain.sendtoPad(document.getElementById('convi').innerHTML); }
    else alertFlash('You must select some text to send to the textpad', 'yellow');
    return;
  }
  if (e.charCode == 69) {  // E
    if (window.getSelection().toString() != '') {
      wMain.sendtoPad(window.getSelection().toString() + '', true);
    }
    else if (wBot.getSelection().toString() != '') {
      wMain.sendtoPad(wBot.getSelection().toString() + '', true);
    }
    else if (document.getElementById('convi')) { wMain.sendtoPad(document.getElementById('convi').innerHTML, true); }
    else alertFlash('You must select some text to send to the textpad', 'yellow');
    return;
  }

  if (e.charCode == 44) { // ,
    if (dBot.getElementById('tout')) { dBot.getElementById('tout').onclick(); }
    else if (document.getElementById('pSect')) document.getElementById('pSect').onmouseup();
    return;
  }

  if (e.charCode == 46) { // .
    if (dBot.getElementById('bout')) dBot.getElementById('bout').onclick();
    else if (document.getElementById('nSect')) document.getElementById('nSect').onmouseup();
    return;
  }
  if (e.charCode == 113) { // q

    var check = { value: false };                  // default the checkbox to false

    var input = { value: "" };

    var result = G_prompts.prompt(null, "Shorthand Link", "Enter link (DN 1.1, etc.)", input, 'open in new tab', check);

    // result is true if OK is pressed, false if Cancel. input.value holds the value of the edit field if "OK" was pressed.

    if (!result) return;

    var place = input.value;

    var outplace = convertShortLink(place);
    if (outplace[0] === false) return alertFlash(outplace[1], outplace[2]);
    //dalert(outplace);

    var para = outplace.pop();
    openPlace(outplace, para);
  }

  keyPressed2(e);
}

function keyPressed2(e) {
  if (document.activeElement.tagName == "html:textarea" || e.altKey || e.ctrlKey) { return; }
  var dTop = null; //document.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentDocument;
  var dBot = document;

  var wTop = null; //document.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow;
  var wBot = window;
  if (document.activeElement.type == "text" || document.activeElement.tagName == "TEXTAREA" || document.activeElement.tagName == "html:textarea" || e.altKey || e.ctrlKey) { return; }



  // if(document.getElementById('dpr-tops').getElementsByTagName('browser').length == 1) {
  //   if (e.charCode == 112) { if(dTop.getElementById('pSect')) dTop.getElementById('pSect').onmouseup(e); return }  // p
  //   if (e.charCode == 110) { if(dTop.getElementById('nSect')) dTop.getElementById('nSect').onmouseup(e); return } // n
  // }



  if (e.charCode == 118) { wBot.showBv(); return; } // v
  if (e.charCode == 98) { dTop.getElementById('bkButton').onmousedown(); return; } // b


}
