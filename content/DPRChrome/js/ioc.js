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
