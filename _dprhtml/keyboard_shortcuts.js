document.onkeypress = DPR_keypress;

function DPR_keypress(e) {
  if (document.activeElement.type == "text" || document.activeElement.tagName == "TEXTAREA" || e.altKey || e.ctrlKey) {
    return;
  }

  if (e.key === 'v') {
    openDPRTab(DPR_PAL.dprHomePage, 'DPR-main', 1);
    return;
  }

  if (e.key === '`') {
    DPR_Chrome.toggleDPRSidebar();
    event.preventDefault();
    return;
  }

  if (['1', '2', '3', '4', '5'].includes(e.key)) {
    DPRShowBottomPane(BottomPaneTabsViewModel.TabIds[e.charCode - 49]);
    event.preventDefault();
    return;
  }

  const cmd = Object.entries(__dprViewModel.commands).find(([_, x]) => x().matchKey(e));
  if (cmd && !cmd[1]().notImplemented && cmd[1]().canExecute && cmd[1]().visible) {
    cmd[1]().execute();
    event.preventDefault();
    return;
  }

  if (false && e.key === 'q') { // q

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

  if (false && e.key === 's') {
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

  if (false && e.key === e) {
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

  if (false && e.key === 'E') {
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

  if (false && e.key === ',') {
    if (dBot.getElementById('tout')) { dBot.getElementById('tout').onclick(); }
    else if (document.getElementById('pSect')) document.getElementById('pSect').onmouseup();
    return;
  }

  if (false && e.key === '.') {
    if (dBot.getElementById('bout')) dBot.getElementById('bout').onclick();
    else if (document.getElementById('nSect')) document.getElementById('nSect').onmouseup();
    return;
  }

  if (e.key === '%') {
    $('#settings-dialog-root').modal('show');
    return;
  }

  if (false && e.key === '!') {
    eraseOptions();
    return;
  }

  if (false && e.key === '#') {
    newquiz();
    return;
  }

  if (false && e.key === '*') {
    bvAlert(bv()); return;
  }

  if (false && e.key === 'b') {
    dTop.getElementById('bkButton').onmousedown();
    return;
  }

  if (e.key === 'h') {
    openDPRTab('https://www.youtube.com/watch?v=8n_Tyh2itsQ', 'DPR-help', 0);
    return;
  }

  if (false && e.key === '@') {
    // Launch feedback form.
    return;
  }

  if (e.key === '?') { // ?
    $('#helpDialog').modal('show');
    return;
  }
}
