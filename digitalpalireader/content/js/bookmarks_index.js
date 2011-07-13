function bookmarkSavePrompt(loc,name,desc){

	var check = {value: false};                  // default the checkbox to false

	var input = {value: name};           

	var result = G_prompts.prompt(null, "Save Bookmark", "Enter Bookmark Name", input, null, check);

	// result is true if OK is pressed, false if Cancel. input.value holds the value of the edit field if "OK" was pressed.
	
	if(!result) return;

	name = input.value;
	
	var scroll = document.getElementById('maf').scrollTop;

	var cont = readFile('DPR_Bookmarks');
	cont = (cont ? cont.join('\n') : '<?xml version="1.0" encoding="UTF-8"?>\n<xml></xml>');
	var parser=new DOMParser();
	var xmlDoc = parser.parseFromString(cont,'text/xml');

	var newNode = xmlDoc.createElement('bookmark');
	var newNodeName = xmlDoc.createElement('name');
	var newNodeLoc = xmlDoc.createElement('location');
	var newNodeScroll = xmlDoc.createElement('scroll');
	var newNodeDesc = xmlDoc.createElement('description');

	
	//document.form.nik.selectedIndex + '#' + document.form.book.selectedIndex  + '#' + document.form.meta.selectedIndex  + '#' + document.form.volume.selectedIndex  + '#' + document.form.vagga.selectedIndex  + '#' + document.form.sutta.selectedIndex + '#' + document.form.section.selectedIndex + '#' + hier;

	var tLoc = xmlDoc.createTextNode(loc);
	newNodeLoc.appendChild(tLoc);
	newNode.appendChild(newNodeLoc);
	
	var tName = xmlDoc.createTextNode(name);
	newNodeName.appendChild(tName);
	newNode.appendChild(newNodeName);

	var tScroll = xmlDoc.createTextNode(scroll);
	newNodeScroll.appendChild(tScroll);
	newNode.appendChild(newNodeScroll);

	var tDesc = xmlDoc.createTextNode(desc);
	newNodeDesc.appendChild(tDesc);
	newNode.appendChild(newNodeDesc);
	
	xmlDoc.documentElement.appendChild(newNode);
	
	var outfile = (new XMLSerializer()).serializeToString(xmlDoc);
	if(writeFile('DPR_Bookmarks', outfile)) alertFlash('Bookmark Saved','green');

	sendUpdateBookmarks();
}
