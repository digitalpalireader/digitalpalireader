document.onkeypress = keyPressed1;

function keyPressed1(e) {
  if (document.activeElement.type == "text" || document.activeElement.tagName == "TEXTAREA" || e.altKey || e.ctrlKey) {
    return;
  }

  if (e.charCode == 118) { // v
    openDPRTab(DPR_PAL.dprHomePage, 'DPR-main', 1);
    return;
  }

  if (e.charCode > 48 && e.charCode < 54) { // 1-5
    DPRShowBottomPane(BottomPaneTabsViewModel.TabIds[e.charCode - 49]);
    return;
  }


  const cmd = Object.entries(__dprViewModel.commands).find(([_, x]) => x().matchKey(e));
  if (cmd && cmd[1]().canExecute && cmd[1]().visible) {
    cmd[1]().execute();
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

  if (e.charCode == 37) { // %
    $('#settings-dialog-root').modal('show');
    return;
  }

  if (e.charCode == 33) { // !
    eraseOptions();
    return;
  }

  if (e.charCode == 35) { // #
    newquiz();
    return;
  }

  if (e.charCode == 42) { // *
    bvAlert(bv()); return;
  }

  if (e.charCode == 98) { // b
    dTop.getElementById('bkButton').onmousedown();
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
}
