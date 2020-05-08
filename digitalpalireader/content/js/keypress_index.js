document.onkeypress = keyPressed;

function keyPressed(e) {
  if(document.activeElement.tagName == "html:textarea" || e.altKey || e.ctrlKey) { return; }
  var dTop = document.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentDocument;
  var dBot = document;

  var wTop = document.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow;
  var wBot = window;
  if(document.activeElement.type == "text" || document.activeElement.tagName == "TEXTAREA" || document.activeElement.tagName == "html:textarea" || e.altKey || e.ctrlKey) { return; }


  if(e.charCode > 48 && e.charCode < 55) { // 1-6
    wBot.moveFrame(e.charCode - 48); return;
  }

  if (e.charCode == 37) {  window.open(DPR_PAL.toWebUrl('chrome://digitalpalireader/content/prefs.xul'), 'DPR_prefs', 'chrome'); return; } // %
  if (e.charCode == 118) { wBot.showBv(); return; } // v
  if (e.charCode == 63) { openDPRTab(DPR_PAL.toWebUrl('chrome://digitalpalireader/content/help.htm'),'DPR-help',1); return; } // ?
  if (e.charCode == 98) { dTop.getElementById('bkButton').onmousedown(); return; } // b


  if (e.charCode == 107) { // k
    promptData("DPR Keyboard Shortcuts", DPR_G.G_keysList.join('\n'));
    return;
  }

  if (e.charCode == 114) { if(confirm('Reload the reader?')) document.location.href=DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul'); return;} // r

  if(document.getElementById('dpr-tops').getElementsByTagName('browser').length == 1) {
    if (e.charCode == 112) { if(dTop.getElementById('pSect')) dTop.getElementById('pSect').onmouseup(e); return }  // p
    if (e.charCode == 110) { if(dTop.getElementById('nSect')) dTop.getElementById('nSect').onmouseup(e); return } // n
  }

}

DPR_G.G_keysList = [];

DPR_G.G_keysList.push('The following is a current list of all shortcut keys available to the DPR.  Note that these keys will not function if the cursor is located in an input field.');

DPR_G.G_keysList.push('');

DPR_G.G_keysList.push('p\tdisplay previous section');
DPR_G.G_keysList.push('g\tdisplay current section');
DPR_G.G_keysList.push('n\tdisplay next section');

DPR_G.G_keysList.push('');

DPR_G.G_keysList.push('q\tenter quick reference (DN, MN, SN, & AN only)');

DPR_G.G_keysList.push('');

DPR_G.G_keysList.push('1-6\tswitch between bottom frames');

DPR_G.G_keysList.push('');

DPR_G.G_keysList.push('s\tsend selected text to convertor');
DPR_G.G_keysList.push('e\tsend selected text to textpad');
DPR_G.G_keysList.push('E\tappend selected text to textpad');

DPR_G.G_keysList.push('');

DPR_G.G_keysList.push(',\tdisplay previous PED or DPPN entry');
DPR_G.G_keysList.push('.\tdisplay next PED or DPPN entry');

DPR_G.G_keysList.push('');

DPR_G.G_keysList.push('%\tdisplay options configuration');
DPR_G.G_keysList.push('!\treset options');
DPR_G.G_keysList.push('#\tdisplay Pali quiz');
DPR_G.G_keysList.push('*\tdisplay Pali quote');
DPR_G.G_keysList.push('?\tdisplay help');
DPR_G.G_keysList.push('@\tdisplay feedback form');

DPR_G.G_keysList.push('');

DPR_G.G_keysList.push('r\treload the reader');

DPR_G.G_keysList.push('');

DPR_G.G_keysList.push('k\tshow this list of shortcuts');

