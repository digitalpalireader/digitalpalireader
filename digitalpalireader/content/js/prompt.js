DPR_G.G_prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                        .getService(Components.interfaces.nsIPromptService);

function aboutPrompt() {

  var items = ["View Help File", "Open DPR Homepage", "Send Feedback"]; // list items

  var selected = {};

  var result = DPR_G.G_prompts.select(null, 'Digital Pali Reader v. ' + version, 'For more information:', items.length, items, selected);

  // result is true if OK was pressed, false if cancel. selected is the index of the item array
  // that was selected. Get the item using items[selected].value.
  switch(selected.value) {
    case 0:
      openDPRTab(DPR_PAL.toWebUrl('chrome://digitalpalireader/content/help.htm'),'DPR-help',1);
    break;
    case 1:
      openDPRTab('http://pali.sirimangalo.org/');
    break;
    case 2:
      openDPRTab(DPR_PAL.toWebUrl('chrome://digitalpalireader/content/contact.htm'),'DPRc');
    break;
  }
}

function promptConfirm(title, question) {
  return DPR_G.G_prompts.confirm(null, title, question);

// returns true if OK was clicked, and false if cancel was clicked
}

function promptData(title,data) {
  DPR_G.G_prompts.alert(null, title, data);
}

function promptThreeButton(title,data,one,two,three) {
  var check = {value: false};                  // default the checkbox to false
  var flags = DPR_G.G_prompts.BUTTON_POS_0 * DPR_G.G_prompts.BUTTON_TITLE_IS_STRING +
            DPR_G.G_prompts.BUTTON_POS_1 * DPR_G.G_prompts.BUTTON_TITLE_IS_STRING  +
            DPR_G.G_prompts.BUTTON_POS_2 * DPR_G.G_prompts.BUTTON_TITLE_IS_STRING;
  return DPR_G.G_prompts.confirmEx(null, title, data,flags,one,two,three,null,check);
}

function DPR_restartFirefox() {
  var Application = Components.classes["@mozilla.org/fuel/application;1"].getService(Components.interfaces.fuelIApplication);
  Application.restart();
}

function confirmRestart(message) {
  if(promptConfirm('Restart Firefox', message)) {
    DPR_restartFirefox()
  }
}
function installSetPrompt(set, setName,id) {
  if(promptConfirm('Install ' + setName, "Please confirm that you would like to install the "+ setName +" extension.\n\nWith your permission, you will now be directed to the extension URL.  Once it is downloaded, restart Firefox, and the set will be available as an alternative via a button in the toolbar in the main window.")) {
    if(!id) document.location.href = 'http://pali.sirimangalo.org/'+set+'.xpi';
    else document.getElementById(id).contentDocument.location.href = 'http://pali.sirimangalo.org/'+set+'.xpi';
    return true;
  }
  else return false;
}


DPR_G.G_keysList = [];

DPR_G.G_keysList.push('The following is a current list of all shortcut keys available to the DPR.  Note that these keys will not function if the cursor is located in an input field.');

DPR_G.G_keysList.push('');

DPR_G.G_keysList.push('p\tdisplay previous section');
DPR_G.G_keysList.push('g\tdisplay current section');
DPR_G.G_keysList.push('n\tdisplay next section');
DPR_G.G_keysList.push('q\tenter quick reference (DN, MN, SN, & AN only)');

DPR_G.G_keysList.push('');

DPR_G.G_keysList.push('d\tshow dictionary');
DPR_G.G_keysList.push('c\tshow convertor');
DPR_G.G_keysList.push('t\tshow textpad');

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
