
function removeHistory(value) {
	
	var storeHistory = [];
	var content = readFile('History_List_DPR');
	
	var oldHistory = content.join('#').split('#'); // legacy support
	for (j in oldHistory) {
		if (oldHistory[j] != value) { storeHistory.push(oldHistory[j]); }
		if (j > 99) { break; }
	}
	if (storeHistory.length != 0 ) { writeFile('History_List_DPR',storeHistory.join('\n'),'UTF-8'); }
	else { clearHistory(); }
	bookmarkframe(1);
}
//clearHistory();
 
function clearHistory(cp) {
	var answer = confirm('Are you sure you want to erase the history?');
	if(!answer) { return; }
	if(!eraseFile('History_List_DPR')) return false;
	if(!cp) { bookmarkframe(1); }
	historyBox();
	alertFlash("History Erased.",'RGBa(255,255,0,0.8)');
}	

function getHistory() {
	if(!fileExists('History_List_DPR')) return [];
	var content = readFile('History_List_DPR');
	return content.join('#').split('#');
}

function addHistory(value) {
	var storeHistory = [value];
	if(!fileExists('History_List_DPR')) var data = [];
	else var data = readFile('History_List_DPR').join('#').split('#');
	for (j in data) {
		if (data[j] != value) { storeHistory.push(data[j]); }
		if (j > 99) { break; }
	}
	writeFile('History_List_DPR',storeHistory.join('\n'),'UTF-8');
}	
