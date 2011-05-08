var G_prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                        .getService(Components.interfaces.nsIPromptService);

function aboutPrompt() {

	var items = ["View Help File", "Open DPR Homepage", "Send Feedback"]; // list items

	var selected = {};

	var result = G_prompts.select(null, 'Digital Pali Reader v. ' + version, 'For more information:', items.length, items, selected);

	// result is true if OK was pressed, false if cancel. selected is the index of the item array
	// that was selected. Get the item using items[selected].value.
	switch(selected.value) {
		case 0:
			helpXML();
		break;
		case 1:
			openDPRTab('http://pali.sirimangalo.org/');
		break;
		case 2:
			openDPRTab('chrome://digitalpalireader/content/contact.htm','DPRc');
		break;
	}
}

function promptConfirm(title, question) {
	return G_prompts.confirm(null, title, question);

// returns true if OK was clicked, and false if cancel was clicked
}

function promptData(title,data) {
	G_prompts.alert(null, title, data);
}

function promptDataEx(title,data) {
	var check = {value: false};                  // default the checkbox to false
	var flags = G_prompts.BUTTON_POS_0 * G_prompts.BUTTON_TITLE_SAVE +
            G_prompts.BUTTON_POS_1 * G_prompts.BUTTON_TITLE_IS_STRING  +
            G_prompts.BUTTON_POS_2 * G_prompts.BUTTON_TITLE_CANCEL;
	G_prompts.confirmEx(null, title, data,flags,"","Ok","",null,check);
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


var G_keysList = [];

G_keysList.push('The following is a current list of all shortcut keys available to the DPR.  Note that these keys will not function if the cursor is located in an input field.'); 

G_keysList.push(''); 

G_keysList.push('p\tdisplay previous section'); 
G_keysList.push('g\tdisplay current section'); 
G_keysList.push('n\tdisplay next section'); 
G_keysList.push('q\tenter quick reference (DN, MN, SN, & AN only)'); 

G_keysList.push(''); 

G_keysList.push('d\tshow dictionary'); 
G_keysList.push('c\tshow convertor'); 
G_keysList.push('t\tshow textpad'); 

G_keysList.push(''); 

G_keysList.push('s\tsend selected text to convertor'); 
G_keysList.push('e\tsend selected text to textpad'); 

G_keysList.push(''); 

G_keysList.push(',\tdisplay previous PED or DPPN entry'); 
G_keysList.push('.\tdisplay next PED or DPPN entry'); 

G_keysList.push(''); 

G_keysList.push('%\tdisplay options configuration'); 
G_keysList.push('!\treset options'); 
G_keysList.push('#\tdisplay Pali quiz'); 
G_keysList.push('*\tdisplay Pali quote'); 
G_keysList.push('?\tdisplay help'); 
G_keysList.push('@\tdisplay feedback form'); 

G_keysList.push(''); 

G_keysList.push('r\treload the reader'); 

G_keysList.push(''); 

G_keysList.push('k\tshow this list of shortcuts'); 
