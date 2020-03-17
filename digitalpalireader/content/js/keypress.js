document.onkeypress = keyPressed;

function keyPressed(e) {

  if(document.activeElement.type == "text" || document.activeElement.tagName == "TEXTAREA" || e.altKey || e.ctrlKey) { return; }

  if(document.form) { // sidebar
    if (e.charCode == 103) { importXML(); return; } // g
  }

  if (e.charCode == 49) { // 1
    if(document.getElementById('Qa1')) { f = document.getElementById('Qa1').onclick; f(); }
    else if(document.getElementById('QcheckAns')) { f = document.getElementById('QcheckAns').onclick; f(); }
    return;
  }
  if (e.charCode == 50) { // 2
    if(document.getElementById('Qa2')) { f = document.getElementById('Qa2').onclick; f(); }
    else if(document.getElementById('Qclear')) { f = document.getElementById('Qclear').onclick; f(); }
    return;
  }
  if (e.charCode == 51) { // 3
    if(document.getElementById('Qa3')) { f = document.getElementById('Qa3').onclick; f(); }
    else if(document.getElementById('Qshow')) { f = document.getElementById('Qshow').onclick; f(); }
    return;
  }
  if (e.charCode == 52) { // 4
    if(document.getElementById('Qa4')) { f = document.getElementById('Qa4').onclick; f(); }
    else if(document.getElementById('Qnew')) { f = document.getElementById('Qnew').onclick; f(); }
    return;
  }

  //if (e.charCode == 120) { moveframec(); return; } // x

  if (e.charCode == 115) {  // s
    if(getSelected() != '') {
      sendtoconvert(getSelected()+'');
    }
    else if(document.getElementById('convi')) { sendtoconvert(document.getElementById('convi').innerHTML); }
    else alertFlash('You must select some text to send to the convertor','yellow');
    return;
  }

  if (e.charCode == 101) {  // e
    if(getSelected() != '') {
      sendtoPad(getSelected()+'');
    }
    else if(document.getElementById('convi')) { sendtoPad(document.getElementById('convi').innerHTML); }
    else alertFlash('You must select some text to send to the textpad','yellow');
    return;
  }
  if (e.charCode == 69) {  // E
    if(getSelected() != '') {
      sendtoPad(getSelected()+'',true);
    }
    else if(document.getElementById('convi')) { sendtoPad(document.getElementById('convi').innerHTML,true); }
    else alertFlash('You must select some text to send to the textpad','yellow');
    return;
  }


  if (e.charCode == 112) { createTablep(); return; } // p
  if (e.charCode == 110) { createTablen(); return; } // n

  if (e.charCode == 100) { moveFrame(1); return; } // d
  if (e.charCode == 99) { moveFrame(2); return; } // c
  if (e.charCode == 116) { moveFrame(3); return; } // t

  if (e.charCode == 33) { eraseOptions(); return; } // !
  if (e.charCode == 35) { newquiz(); return; } // #
  if (e.charCode == 37) { loadOptions(); return; } // %
  if (e.charCode == 42) { bvAlert(bv()); return; } // *
  if (e.charCode == 63) { helpXML(); return; } // ?

  if (e.charCode == 44) { // ,
    if(document.getElementById('tout') || document.getElementById('bout')) { f = document.getElementById('tout').onclick; f(); }
    else createTablep();
    return;
  }

  if (e.charCode == 46) { // .
    if(document.getElementById('tout') || document.getElementById('bout')) { f = document.getElementById('bout').onclick; f(); }
    else createTablen();
    return;
  }

  if (e.charCode == 107) { // k
    promptData("DPR Keyboard Shortcuts", G_keysList.join('\n'));
    return;
  }

  if (e.charCode == 113) { // q
    var check = {value: false};                  // default the checkbox to false

    var input = {value: ""};

    var result = G_prompts.prompt(null, "Shorthand Link", "Enter link (DN 1.1, etc.)", input, null, check);

    // result is true if OK is pressed, false if Cancel. input.value holds the value of the edit field if "OK" was pressed.

    if(!result) return;

    var place = input.value;

    var outplace = convertShortLink(place);
    if(outplace[0] === false) return alertFlash(outplace[1],outplace[2]);
    var para = outplace.pop();
    openPlace(outplace,para);

    return;
  }

  if (e.charCode == 114) { if(confirm('Reload the reader?')) document.location.href='chrome://digitalpalireader/content/index.htm'; return;} // r

  //devO(e.charCode);
}
