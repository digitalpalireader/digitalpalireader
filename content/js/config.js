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
colorcfg['colbkcp'] = getColPref('colbkcp');
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
cfg['toolbar'] = getMiscPref('toolbar');

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
	colorcfg['colbkcp'] = getColPref('colbkcp');
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
	cfg['toolbar'] = getMiscPref('toolbar');
	
    // Add ATI translations if preferred
    if (cfg['ctrans'] == "checked" && typeof(atiD) == 'undefined') {
        var headID = document.getElementsByTagName("head")[0];         
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.src = 'http://www.accesstoinsight.org/tech/digital_pali_reader_suttas.php';
        headID.appendChild(newScript);
    }

	checkbackground();
	checkcpbkg();
	
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
		document.getElementById('searchb').style.backgroundImage = 'url(images/background.gif)';
		document.body.style.backgroundImage = 'url(images/background.gif)';
    }
    else {
		if (x==1) { var colort = document.getElementById('colbk').value }
		else { var colort = colorcfg['colbk'] }
		document.getElementById('dif').style.backgroundImage = '';
		document.getElementById('cof').style.backgroundImage = '';
		document.getElementById('scf').style.backgroundImage = '';
		document.getElementById('searchb').style.backgroundImage = '';
		document.body.style.backgroundImage = '';
		document.getElementById('dif').style.backgroundColor = colort;
		document.getElementById('cof').style.backgroundColor = colort;
		document.getElementById('scf').style.backgroundColor = colort;
		document.getElementById('searchb').style.backgroundColor = colort;
		document.body.style.backgroundColor = colort;
	}
}

function checkcpbkg(x) {
	if (x==1) { 
		var colort = document.getElementById('colbkcp').value 
		document.getElementById('confanf').style.backgroundColor = colort;
		document.getElementById('confcpf').style.backgroundColor = colort;
	}
	else { var colort = colorcfg['colbkcp'] }
	document.getElementById('searcht').style.backgroundColor = colort;
	document.getElementById('brmid').style.backgroundColor = colort;
	document.getElementById('brleft').style.backgroundColor = colort;
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

	colorcfg['colbkcp'] = getColPref('colbkcp');
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
	cfg['toolbar'] = getMiscPref('toolbar');

    var winW = window.innerWidth;
    var winH = window.innerHeight;

    document.getElementById('mafa').innerHTML = '';
    var mafaout = '<table style="width:' + (winW-confmove[2]-100) + 'px">';
    mafaout += '<tr><td colspan=2><font size=4><b>DPR Configuration</b></font></td></tr>';
    mafaout += '<tr><td><p align=center><b>Size</b></p><p><form id="sizeform">';
		mafaout += '<table align=center border=1 height="' + (winH/2.5) + '">';
		mafaout += '<tr>';
			mafaout += '<td width="' + ((winW-confmove[2])/2.5) + '" align=center>(<i>auto</i>)</td>';
			mafaout += '<td id="confanf" bgcolor="'+colorcfg['colbkcp']+'" align=center rowspan=3 width="' + (confmove[2]/2.5) + '">W<br><input onBlur="confmove[2] = checksizes(\'ControlW\',this.value); this.value = confmove[2]; moveframex(2,1);" id="ControlW" value="'+confmove[2]+'" type=input maxlength=4 size=4 title="Enter desired width"></td>';
		mafaout += '</tr>';
		mafaout += '<tr>';
			mafaout += '<td id="confcpf" bgcolor="'+colorcfg['colbkcp']+'" align=center height="' + (confmove[0]/2.5) + '">H <input onBlur="confmove[0] = checksizes(\'AnalyzeH\',this.value); this.value = confmove[0]; moveframex(2,1);" id="AnalyzeH" value="'+confmove[0]+'" type=input maxlength=4 size=4 title="Enter desired height"></td>';
		mafaout += '</tr>';
		mafaout += '<tr>';
			mafaout += '<td align=center height="' + (confmove[1]/2.5) + '">H <input onBlur="confmove[1] = checksizes(\'DictH\',this.value); this.value = confmove[1]; moveframex(2,1);" id="DictH" value="'+confmove[1]+'" type=input maxlength=4 size=4 title="Enter desired height"></td>';
		mafaout += '</tr>';
		mafaout += '</table>';
    mafaout += '</p></form></td>';
    mafaout += '<td align=center><form id="colorform">';
    mafaout += '<p align=center><b>Color</b></p>';
    mafaout += '<p style="color:'+colorcfg['coltext']+'" id="col1">Text: <input name="color" id="coltext" value="'+colorcfg['coltext']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col1\').style.color=this.value;"><br>';
    mafaout += '<p style="color:'+colorcfg['colsel']+'" id="col2"><b>Selected: </b><input name="color" id="colsel" value="'+colorcfg['colsel']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col2\').style.color=this.value;"><br>';
    mafaout += '<p style="color:'+colorcfg['colped']+'" id="col3"><b>PED: </b><input name="color" id="colped" value="'+colorcfg['colped']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col3\').style.color=this.value;">';
    mafaout += '<p style="color:'+colorcfg['coldppn']+'" id="col4"><b>DPPN: </b><input name="color" id="coldppn" value="'+colorcfg['coldppn']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col4\').style.color=this.value;">';
    mafaout += '<p style="color:'+colorcfg['colcpd']+'" id="col5"><b>CPD: </b><input name="color" id="colcpd" value="'+colorcfg['colcpd']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col5\').style.color=this.value;">';
    mafaout += '<p style="color:'+colorcfg['coltext']+'"><b id="col6" style="background-color:'+colorcfg['colbkcp']+'">BKGD: </b><input name="color" id="colbkcp" value="'+colorcfg['colbkcp']+'" type=input size=7 title="Enter desired control panel color" onkeyup="document.getElementById(\'col6\').style.backgroundColor=this.value; checkcpbkg(1)">';
    mafaout += '<p style="color:'+colorcfg['coltext']+'"><b id="col7" style="background-color:'+colorcfg['colbk']+'">BKGD: </b><input name="color" id="colbk" ' + (cfg['bkgimg']=='checked' ? 'disabled':'') + ' value="'+colorcfg['colbk']+'" type=input size=7 title="Enter desired background color" onkeyup="document.getElementById(\'col7\').style.backgroundColor=this.value; checkbackground(1)"><br /><input type="checkbox" id="bkgimg" ' + (cfg['bkgimg']=='checked' ? 'checked':'') + ' onclick="checkbackground(1); this.checked ? document.getElementById(\'colbk\').disabled=true : document.getElementById(\'colbk\').disabled=false" '+cfg['bkgimg']+'>Use image instead</input></form></td></tr><tr><td><p><b>Misc. Options:</b></p>';
    mafaout += '<p>Show translations <input type=checkbox id="ctrans" '+cfg['ctrans']+'>';
    mafaout += '<p>Dictionary search as you type <input type=checkbox id="autodict" '+cfg['autodict']+'>';
    mafaout += '</td></tr></table>';
    mafaout += '<p align=center>';
		mafaout += '<button class="btn" onclick="saveOptions()">Save</button>';
		mafaout += '<button class="btn" onclick="moveframex(2); refreshit()">Cancel</button>';
		mafaout += '<button class="btn" onclick="eraseOptions(1)">Restore defaults</button><b style="color:'+colorcfg['colsel']+'" id=message> </b>';
    mafaout += '</p>';
    document.getElementById('mafb').innerHTML = mafaout;
}

function saveOptions() {
    var Val;
    var Pref;
    for (i = 0; i < cPrefs.length; i++) {
        Pref = cPrefs[i];
        if (document.getElementById(Pref)) {
            Val = document.getElementById(Pref).value;
            if (Val) {
				setColPref(Pref,Val);
			}
        }
    }
    for (i = 0; i < sPrefs.length; i++) {
        Pref = sPrefs[i];
        if (document.getElementById(Pref)) {
            Val = document.getElementById(Pref).value;
            if (Val) {
				Val = checksizes(Pref,Val);
				setSizePref(Pref,Val);
			}
        }
    }
    for (i = 0; i < mPrefs.length; i++) {
        Pref = mPrefs[i];
        if (document.getElementById(Pref)) {
            Val = document.getElementById(Pref).checked;
            if (Val == true) Val = 'checked';
            else Val = '';
            setMiscPref(Pref,Val);
        }
    }
    document.getElementById('message').innerHTML = " Options saved."
    moveframex(2);
    getconfig();
}

function checksizes(pref,size) {

    var winW = window.innerWidth;
    var winH = window.innerHeight;
	switch (pref) {
		case 'ControlW':
			if (size < 80) { return 80; }
			if (size > (winW - 200)) { return (winW-200); }
			break;
		case 'AnalyzeH':
			if (size < 20) { return 20; }
			if (size > (winH - parseInt(confmove[1])-200)) { return (winH - parseInt(confmove[1]) - 200); }
			break;
		case 'DictH':
			if (size < 40) { return 40; }
			if (size > (winH - parseInt(confmove[0])-200)) { return (winH - parseInt(confmove[0]) - 200); }
			break;
		}
	return parseInt(size);
}

function eraseOptions(which) {
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
    getconfig();
	if (which) {
		loadOptions();
		document.getElementById('message').innerHTML = " Options reset."
		moveframex(2);
	}
	else { refreshit(1); }
}
