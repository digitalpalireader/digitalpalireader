function getColPref(name) {
    return localStorage[name];
}
function getSizePref(name) {
    return localStorage[name];
}
function getMiscPref(name) {
    return localStorage[name];
}
function setColPref(name,val) {
    localStorage.setItem(name,val);
}
function setSizePref(name,val) {
    localStorage.setItem(name,val);
}
function setMiscPref(name,val) {
    localStorage.setItem(name,val);
}

function readFile(aFileKey)
{
    return localStorage[aFileKey];
}

function writeFile(aFileKey, aContent, aChars)
{
    localStorage.setItem(aFileKey,aContent);
}

function readDir() {
    var ca = [];
    for (var i = 0; i < localStorage.length; i++) {
         if (localStorage.key(i).substring(0,3) == "DPB" || localStorage.key(i).substring(0,3) == "DPD" || localStorage.key(i).substring(0,3) == "DPS") ca.push(localStorage.key(i));
    }
    return ca;
}

function eraseItem(name) {
        delete localStorage["DPB"+name];
        delete localStorage["DPD"+name];
        delete localStorage["DPS"+name];
        return false;
}

function eraseAll() {
        var aKey = [];
        var Key;
        var aVar = [];
        for (var i = 0; i < localStorage.length; i++) {
            Key = localStorage.key(i);
            if (Key.substring(0,3) == "DPB" || Key.substring(0,3) == "DPD" || Key.substring(0,3) == "DPS") delete localStorage[Key];
        }
        return false;
}

function changeName(name, nam) {

    var Name = "DPB"+name;
    var Des = "DPD"+name;
    var Scroll = "DPS"+name;

    var nName = "DPB"+nam;
    var nDes = "DPD"+nam;
    var nScroll = "DPS"+nam;
    
    localStorage.setItem(nName, localStorage[Name]);
    localStorage.setItem(nDes, localStorage[Des]);
    localStorage.setItem(nScroll, localStorage[Scroll]);
    delete localStorage[Name];
    delete localStorage[Des];
    delete localStorage[Scroll];
}

function removeHistory(value) {
	var storeHistory = [];
	for (var i = 0; i < 100; i++) {
		if (localStorage['DPR_History_'+i]) { 
			if (localStorage['DPR_History_'+i] == value) { continue; }
			storeHistory.push(localStorage['DPR_History_'+i]); 
		}
		else break;
	}
	var k = 0;
	for (j in storeHistory) {
		k++;
		localStorage['DPR_History_'+j] = storeHistory[j];
	}
	delete localStorage['DPR_History_'+k];
	bookmarkframe(1);
}

function clearHistory(cp) {
	var answer = confirm('Are you sure you want to erase the history?');
	if(!answer) { return; }
	for (var i = 0; i < 100; i++) {
		if (localStorage['DPR_History_'+i]) { delete localStorage['DPR_History_'+i]; }
		else break;
	}	
	if(!cp) { bookmarkframe(1); }
	historyBox();
}	

function getHistory() {
	var sendHistory = [];
	for (var i = 0; i < 100; i++) {
		if (localStorage['DPR_History_'+i]) { sendHistory.push(localStorage['DPR_History_'+i]); }
		else break;
	}
	return sendHistory;
}

function addHistory(value) {
	var storeHistory = [value];
	for (var i = 0; i < 100; i++) {
		if (localStorage['DPR_History_'+i]) { 
			if (localStorage['DPR_History_'+i] == value) { continue; }
			storeHistory.push(localStorage['DPR_History_'+i]); 
		}
		else break;
	}
	for (j in storeHistory) {
		localStorage['DPR_History_'+j] = storeHistory[j];
	}
}
