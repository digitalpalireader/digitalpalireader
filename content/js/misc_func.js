function aboutPrompt() {

	var items = ["View Help File", "Open DPR Homepage", "Send Feedback"]; // list items

	var selected = {};

	var result = G_prompts.select(null, 'About the Digital Pali Reader v. ' + version, 'For more information:', items.length, items, selected);

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
			openDPRTab('chrome://digitalpalireader/content/contact.htm');
		break;
	}
}
