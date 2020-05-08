glblObj.G_prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                        .getService(Components.interfaces.nsIPromptService);

function aboutPrompt() {

  var items = ["View Help File", "Open DPR Homepage", "Send Feedback"]; // list items

  var selected = {};

  var result = glblObj.G_prompts.select(null, 'Digital Pali Reader v. ' + version, 'For more information:', items.length, items, selected);

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
  return glblObj.G_prompts.confirm(null, title, question);

// returns true if OK was clicked, and false if cancel was clicked
}

function promptData(title,data) {
  glblObj.G_prompts.alert(null, title, data);
}

function promptThreeButton(title,data,one,two,three) {
  var check = {value: false};                  // default the checkbox to false
  var flags = glblObj.G_prompts.BUTTON_POS_0 * glblObj.G_prompts.BUTTON_TITLE_IS_STRING +
            glblObj.G_prompts.BUTTON_POS_1 * glblObj.G_prompts.BUTTON_TITLE_IS_STRING  +
            glblObj.G_prompts.BUTTON_POS_2 * glblObj.G_prompts.BUTTON_TITLE_IS_STRING;
  return glblObj.G_prompts.confirmEx(null, title, data,flags,one,two,three,null,check);
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


glblObj.G_keysList = [];

glblObj.G_keysList.push('The following is a current list of all shortcut keys available to the DPR.  Note that these keys will not function if the cursor is located in an input field.');

glblObj.G_keysList.push('');

glblObj.G_keysList.push('p\tdisplay previous section');
glblObj.G_keysList.push('g\tdisplay current section');
glblObj.G_keysList.push('n\tdisplay next section');
glblObj.G_keysList.push('q\tenter quick reference (DN, MN, SN, & AN only)');

glblObj.G_keysList.push('');

glblObj.G_keysList.push('d\tshow dictionary');
glblObj.G_keysList.push('c\tshow convertor');
glblObj.G_keysList.push('t\tshow textpad');

glblObj.G_keysList.push('');

glblObj.G_keysList.push('s\tsend selected text to convertor');
glblObj.G_keysList.push('e\tsend selected text to textpad');
glblObj.G_keysList.push('E\tappend selected text to textpad');

glblObj.G_keysList.push('');

glblObj.G_keysList.push(',\tdisplay previous PED or DPPN entry');
glblObj.G_keysList.push('.\tdisplay next PED or DPPN entry');

glblObj.G_keysList.push('');

glblObj.G_keysList.push('%\tdisplay options configuration');
glblObj.G_keysList.push('!\treset options');
glblObj.G_keysList.push('#\tdisplay Pali quiz');
glblObj.G_keysList.push('*\tdisplay Pali quote');
glblObj.G_keysList.push('?\tdisplay help');
glblObj.G_keysList.push('@\tdisplay feedback form');

glblObj.G_keysList.push('');

glblObj.G_keysList.push('r\treload the reader');

glblObj.G_keysList.push('');

glblObj.G_keysList.push('k\tshow this list of shortcuts');
