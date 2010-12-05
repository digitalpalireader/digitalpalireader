var colorcfg = [];
var confmove = [];
var cfg = [];

confmove[0] = getSizePref('AnalyzeH'); // used for the height of the analysis bar in the middle of the screen
confmove[1] = getSizePref('DictH'); // used for the height of the bottom box containing the dictionary, scratchpad and convertpad
confmove[2] = getSizePref('ControlW'); // used for the width of the control box on the right side of the screen.
confmove[3] = getSizePref('SearchH'); // used for the height of the search box (hidden)

colorcfg['coltext'] = getColPref('coltext');
colorcfg['colsel'] = getColPref('colsel');

colorcfg['coldppn'] = getColPref('coldppn');
colorcfg['colped'] = getColPref('colped');
colorcfg['colcpd'] = getColPref('colcpd');

colorcfg['colsearch0'] = getColPref('colsearch0');
colorcfg['colsearch1'] = getColPref('colsearch1');
colorcfg['colsearch2'] = getColPref('colsearch2');

colorcfg['colbk'] = getColPref('colbk');
colorcfg['colbk1'] = getColPref('colbk1');
colorcfg['colbk2'] = getColPref('colbk2');
colorcfg['colbk3'] = getColPref('colbk3');

colorcfg['green'] = getColPref('green');
colorcfg['blue'] = getColPref('blue');
colorcfg['brown'] = getColPref('brown');
colorcfg['grey'] = getColPref('grey');
colorcfg['red'] = getColPref('red');

colorcfg['blueh'] = getColPref('blueh');

cfg['ctrans'] = getMiscPref('ctrans');
cfg['autodict'] = getMiscPref('autodict');
cfg['bkgimg'] = getMiscPref('bkgimg');

var colchanges = document.getElementsByName('changecolor');
for(var i=0;i < colchanges.length;i++)
{
    colchanges[i].style.color=colorcfg['coltext'];
} 

function getconfig() {
	confmove[0] = getSizePref('AnalyzeH'); // used for the height of the analysis bar in the middle of the screen
	confmove[1] = getSizePref('DictH'); // used for the height of the bottom box containing the dictionary, scratchpad and convertpad
	confmove[2] = getSizePref('ControlW'); // used for the width of the control box on the right side of the screen.
	confmove[3] = getSizePref('SearchH'); // used for the height of the search box (hidden)

	colorcfg['coltext'] = getColPref('coltext');
	colorcfg['colsel'] = getColPref('colsel');

	colorcfg['coldppn'] = getColPref('coldppn');
	colorcfg['colped'] = getColPref('colped');
	colorcfg['colcpd'] = getColPref('colcpd');

	colorcfg['colsearch0'] = getColPref('colsearch0');
	colorcfg['colsearch1'] = getColPref('colsearch1');
	colorcfg['colsearch2'] = getColPref('colsearch2');

	colorcfg['colbk'] = getColPref('colbk');
	colorcfg['colbk1'] = getColPref('colbk1');
	colorcfg['colbk1'] = getColPref('colbk1');
	colorcfg['colbk3'] = getColPref('colbk3');

	colorcfg['green'] = getColPref('green');
	colorcfg['blue'] = getColPref('blue');
	colorcfg['brown'] = getColPref('brown');
	colorcfg['grey'] = getColPref('grey');
	colorcfg['red'] = getColPref('red');

	colorcfg['blueh'] = getColPref('blueh');

    cfg['ctrans'] = getMiscPref("ctrans");
	cfg['autodict'] = getMiscPref('autodict');
	cfg['bkgimg'] = getMiscPref('bkgimg');
	
    // Add ATI translations if preferred
    if (cfg['ctrans'] == "checked" && typeof(atiD) == 'undefined') {
        var headID = document.getElementsByTagName("head")[0];         
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.src = 'http://www.accesstoinsight.org/tech/digital_pali_reader_suttas.php';
        headID.appendChild(newScript);
    }

	checkbackground();

	var colchanges = document.getElementsByName('changecolor');
	for(var i=0;i < colchanges.length;i++)
	{
		colchanges[i].style.color=colorcfg['coltext'];
	} 
}

function checkbackground(x) {
	if ((!x && cfg['bkgimg'] == "checked") || (x == 1 && document.getElementById('bkgimg').checked)) {
		document.getElementById('dif').style.backgroundImage = 'url(images/background.gif)';
		document.getElementById('cof').style.backgroundImage = 'url(images/background.gif)';
		document.getElementById('scf').style.backgroundImage = 'url(images/background.gif)';
		document.body.style.backgroundImage = 'url(images/background.gif)';
    }
    else {
		if (x==1) { var colort = document.getElementById('colbk').value }
		else { var colort = colorcfg['colbk'] }
		document.getElementById('dif').style.backgroundImage = '';
		document.getElementById('cof').style.backgroundImage = '';
		document.getElementById('scf').style.backgroundImage = '';
		document.body.style.backgroundImage = '';
		document.getElementById('dif').style.backgroundColor = colort;
		document.getElementById('cof').style.backgroundColor = colort;
		document.getElementById('scf').style.backgroundColor = colort;
		document.body.style.backgroundColor = colort;
	}
}

function loadOptions() {
    moveframex(2);
    var colorcfg = [];
    var confmove = [];
    var cfg = [];

    confmove[0] = getSizePref("AnalyzeH"); // used for the height of the analysis bar in the middle of the screen
    confmove[1] = getSizePref("DictH"); // used for the height of the bottom box containing the dictionary, scratchpad and convertpad
    confmove[2] = getSizePref("ControlW"); // used for the width of the control box on the right side of the screen.
    confmove[3] = getSizePref("SearchH"); // used for the height of the search box (hidden)

    colorcfg['coltext'] = getColPref("coltext");
    colorcfg['colsel'] = getColPref("colsel");

    colorcfg['coldppn'] = getColPref("coldppn");
    colorcfg['colped'] = getColPref("colped");
    colorcfg['colcpd'] = getColPref("colcpd");

	colorcfg['colsearch0'] = getColPref('colsearch0');
	colorcfg['colsearch1'] = getColPref('colsearch1');
	colorcfg['colsearch2'] = getColPref('colsearch2');

	colorcfg['colbk'] = getColPref('colbk');
    colorcfg['colbk1'] = getColPref("colbk1");
    colorcfg['colbk1'] = getColPref("colbk1");
    colorcfg['colbk3'] = getColPref("colbk3");

    colorcfg['green'] = getColPref("green");
    colorcfg['blue'] = getColPref("blue");
    colorcfg['brown'] = getColPref("brown");
    colorcfg['grey'] = getColPref("grey");
    colorcfg['red'] = getColPref("red");

    colorcfg['blueh'] = getColPref("blueh");

    cfg['ctrans'] = getMiscPref("ctrans");
	cfg['autodict'] = getMiscPref('autodict');
	cfg['bkgimg'] = getMiscPref('bkgimg');

    var winW = window.innerWidth;
    var winH = window.innerHeight;

    document.getElementById('mafa').innerHTML = '';
    document.getElementById('mafb').innerHTML = '<table style="width:' + (winW-confmove[2]-100) + 'px"><tr><td colspan=2 align=center><b>Configuration</b></td></tr><tr><td><p align=center><b>Size</b></p><p><form id="sizeform"><table align=center border=1 height="' + (winH/2.5) + '"><tr><td width="' + ((winW-confmove[2])/2.5) + '" align=center>(<i>auto</i>)</td><td align=center rowspan=3 width="' + (confmove[2]/2.5) + '">W<br><input id="ControlW" value="'+confmove[2]+'" type=input maxlength=4 size=4 title="Enter desired width"></td></tr><tr><td align=center height="' + (confmove[0]/2.5) + '">H <input id="AnalyzeH" value="'+confmove[0]+'" type=input maxlength=4 size=4 title="Enter desired height"></td></tr><tr><td align=center height="' + (confmove[1]/2.5) + '">H <input id="DictH" value="'+confmove[1]+'" type=input maxlength=4 size=4 title="Enter desired height"></td></tr></table></p></form></td><td align=center><form id="colorform"><p align=center><b>Color</b></p><p style="color:'+colorcfg['coltext']+'" id="col1">Text: <input name="color" id="coltext" value="'+colorcfg['coltext']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col1\').style.color=this.value;"><br><p style="color:'+colorcfg['colsel']+'" id="col2"><b>Selected: </b><input name="color" id="colsel" value="'+colorcfg['colsel']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col2\').style.color=this.value;"><br><p style="color:'+colorcfg['colped']+'" id="col3"><b>PED: </b><input name="color" id="colped" value="'+colorcfg['colped']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col3\').style.color=this.value;"><p style="color:'+colorcfg['coldppn']+'" id="col4"><b>DPPN: </b><input name="color" id="coldppn" value="'+colorcfg['coldppn']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col4\').style.color=this.value;"><p style="color:'+colorcfg['colcpd']+'" id="col5"><b>CPD: </b><input name="color" id="colcpd" value="'+colorcfg['colcpd']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col5\').style.color=this.value;"><p style="color:'+colorcfg['coltext']+'"><b id="col6" style="background-color:'+colorcfg['colbk']+'">BKGD: </b><input name="color" id="colbk" ' + (cfg['bkgimg']=='checked' ? 'disabled':'') + ' value="'+colorcfg['colbk']+'" type=input size=7 title="Enter desired background color" onkeyup="document.getElementById(\'col6\').style.backgroundColor=this.value; checkbackground(1)"><br /><input type="checkbox" id="bkgimg" ' + (cfg['bkgimg']=='checked' ? 'checked':'') + ' onclick="checkbackground(1); this.checked ? document.getElementById(\'colbk\').disabled=true : document.getElementById(\'colbk\').disabled=false" '+cfg['bkgimg']+'>Use image instead</input></form></td></tr><tr><td><p><b>Misc. Options:</b></p><p>Show translations <input type=checkbox id="ctrans" '+cfg['ctrans']+'><p>Dictionary search as you type <input type=checkbox id="autodict" '+cfg['autodict']+'></td></tr></table><p align=center><button class="btn" onclick="saveOptions()">Save</button><button class="btn" onclick="eraseOptions()">Restore defaults</button></p><div id="message" align=center></div>';
}

function saveOptions() {
    var Val;
    for (i = 0; i < cPrefs.length; i++) {
        var Pref = cPrefs[i];
        if (document.getElementById(Pref)) {
            Val = document.getElementById(Pref).value;
            if (Val) setColPref(Pref,Val);
        }
    }
    for (i = 0; i < sPrefs.length; i++) {
        var Pref = sPrefs[i];
        if (document.getElementById(Pref)) {
            Val = document.getElementById(Pref).value;
            if (Val) setSizePref(Pref,Val);
        }
    }
    for (i = 0; i < mPrefs.length; i++) {
        var Pref = mPrefs[i];
        if (document.getElementById(Pref)) {
            Val = document.getElementById(Pref).checked;
            if (Val == true) Val = 'checked';
            else Val = '';
            setMiscPref(Pref,Val);
        }
    }
    document.getElementById('message').innerHTML = "Options saved."
    moveframex(2);
    getconfig();
}

function eraseOptions() {
    for (i = 0; i < cPrefs.length; i++) {
        var Pref = cPrefs[i];
        var Val = cPrefVals[i];
        setColPref(Pref,Val);
    }
    for (i = 0; i < sPrefs.length; i++) {
        var Pref = sPrefs[i];
        var Val = sPrefVals[i];
        setSizePref(Pref,Val);
    }
    for (i = 0; i < mPrefs.length; i++) {
        var Pref = mPrefs[i];
        var Val = mPrefVals[i];
        setMiscPref(Pref,Val);
    }
    loadOptions();
    document.getElementById('message').innerHTML = "Options reset."
    moveframex(2);
    getconfig();
}
