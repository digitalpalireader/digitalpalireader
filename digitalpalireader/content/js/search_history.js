function searchHistoryXML(){
	var cont = readFile('DPR_Search_History');
	cont = (cont ? cont.join('\n') : '<?xml version="1.0" encoding="UTF-8"?>\n<xml></xml>');
	var parser=new DOMParser();
	var xmlDoc = parser.parseFromString(cont,'text/xml');
	return xmlDoc;
}

function eraseSearchHistory(gofrom)
{
	var answer = confirm('Are you sure you want to erase the search history?')
	if(answer) 
	{	
        eraseFile('DPR_Search_History');
		DPRNav.searchHistoryBox();
	}
}

function saveSearchHistory(query,searchType,rx,sets,MAT,book,part) {
	var xmlDoc = searchHistoryXML();
	var newNode = xmlDoc.createElement('search');
	
	var subNode = xmlDoc.createElement('query');
	var text = xmlDoc.createTextNode(query);
	subNode.appendChild(text);
	newNode.appendChild(subNode);
	
	subNode = xmlDoc.createElement('searchType');
	text = xmlDoc.createTextNode(searchType);
	subNode.appendChild(text);
	newNode.appendChild(subNode);

	subNode = xmlDoc.createElement('rx');
	text = xmlDoc.createTextNode(rx);
	subNode.appendChild(text);
	newNode.appendChild(subNode);

	subNode = xmlDoc.createElement('sets');
	text = xmlDoc.createTextNode(sets);
	subNode.appendChild(text);
	newNode.appendChild(subNode);

	subNode = xmlDoc.createElement('MAT');
	text = xmlDoc.createTextNode(MAT);
	subNode.appendChild(text);
	newNode.appendChild(subNode);

	subNode = xmlDoc.createElement('book');
	text = xmlDoc.createTextNode(book);
	subNode.appendChild(text);
	newNode.appendChild(subNode);

	subNode = xmlDoc.createElement('part');
	text = xmlDoc.createTextNode(part);
	subNode.appendChild(text);
	newNode.appendChild(subNode);
	
	xmlDoc.documentElement.appendChild(newNode);
	
	var outfile = (new XMLSerializer()).serializeToString(xmlDoc);

	writeFile('DPR_Search_History', outfile);
	DPRNav.searchHistoryBox();
}

function dictHistoryXML(){
	var cont = readFile('DPR_Dict_History');
	cont = (cont ? cont.join('\n') : '<?xml version="1.0" encoding="UTF-8"?>\n<xml></xml>');
	var parser=new DOMParser();
	var xmlDoc = parser.parseFromString(cont,'text/xml');
	return xmlDoc;
}

function eraseDictHistory(gofrom)
{
	var answer = confirm('Are you sure you want to erase the lookup history?')
	if(answer) 
	{	
        eraseFile('DPR_Dict_History');
		DPRNav.dictHistoryBox();
	}
}

function saveDictHistory(query,type,opts) {
	var xmlDoc = dictHistoryXML();
	var newNode = xmlDoc.createElement('dict');
	
	var subNode = xmlDoc.createElement('query');
	var text = xmlDoc.createTextNode(query);
	subNode.appendChild(text);
	newNode.appendChild(subNode);
	
	subNode = xmlDoc.createElement('type');
	text = xmlDoc.createTextNode(type);
	subNode.appendChild(text);
	newNode.appendChild(subNode);

	subNode = xmlDoc.createElement('opts');
	text = xmlDoc.createTextNode(opts);
	subNode.appendChild(text);
	newNode.appendChild(subNode);
	
	xmlDoc.documentElement.appendChild(newNode);
	
	var outfile = (new XMLSerializer()).serializeToString(xmlDoc);

	writeFile('DPR_Dict_History', outfile);
	DPRNav.dictHistoryBox();
}
