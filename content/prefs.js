
var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.digitalpalireader");

function init() {
		
	try {
		var checkboxes = ["percentDisplay", "speedDisplay", "sizeDisplay", "timeDisplay",
					  "removeOnOpen", "removeOnShow", "askOnDelete", "clearOnClose", 
					  "trimHistory", "shouldScan", "supressAlert", 
					  "gradientsCheck", "launchOnClose", "animateCheck", "keepHistory", 
					  "showMainButton", "showClearButton", "showToMiniButton"]; // "queEnable", 
		for (var i = 0; i < checkboxes.length; ++i) {
			var checkbox = document.getElementById(checkboxes[i]);
			checkbox.checked = pref.getBoolPref(checkbox.getAttribute("prefstring"));
		}
	
		var INTtextboxes = ["clearSec", "trimNum"]; //, "queNum"
		for (var i = 0; i < INTtextboxes.length; ++i) {
			var textbox = document.getElementById(INTtextboxes[i]);
			var prefstring = textbox.getAttribute("prefstring");
			textbox.value = pref.getIntPref(prefstring);
		}
		var STRtextboxes = ["exclude", "AVLoc", "ArgsBox", "clearFiletypes", "ignoreFiletypes", "soundIgnoreFiletypes"];
		for (var i = 0; i < STRtextboxes.length; ++i) {
			var textbox = document.getElementById(STRtextboxes[i]);
			var prefstring = textbox.getAttribute("prefstring");
			textbox.value = pref.getCharPref(prefstring);
		}
		
		var miniMode = pref.getBoolPref("downbar.function.miniMode");
		if(miniMode)
			document.getElementById("selectMode").selectedIndex = 1;
		
		var soundPref = pref.getIntPref("downbar.function.soundOnComplete");
		if(soundPref > 0) {  // default or custom sound
			document.getElementById("playSound").checked = true;
		}
		else {
			document.getElementById("soundSelect").setAttribute("disabled", "true");
			document.getElementById("soundExcludeLabel").setAttribute("disabled", "true");
			document.getElementById("soundIgnoreFiletypes").setAttribute("disabled", "true");
		}
		if(soundPref == 2)  // default 1 is already set
			document.getElementById("soundSelect").selectedIndex = 1;
			
		document.getElementById("customSoundHolder").value = pref.getCharPref("downbar.function.soundCustomComplete").substr(7);	
		
		
	} catch (e) {}
	
	KHistCheck();
	VDispCheck();
	getCustomStyles();
	//QueCheck();
	
}

function saveSettings() {

	var checkboxes = ["percentDisplay", "speedDisplay", "sizeDisplay", "timeDisplay",
					"removeOnOpen", "removeOnShow", "askOnDelete", "clearOnClose", 
					"trimHistory", "shouldScan", "supressAlert", 
					"gradientsCheck", "launchOnClose", "animateCheck", "keepHistory",
					"showMainButton", "showClearButton", "showToMiniButton"]; // "queEnable", 
	
	var db_stringsPref = document.getElementById("prefdownbarbundle");
	
	// only let the user select 2 or less display items
	/* var count = 0;
	for (var j = 0; j < 4; ++j) {
		var checkbox = document.getElementById(checkboxes[j]);
		if (checkbox.checked) ++count;
	}
	if (count > 2) {
		var db_selectAlert = db_stringsPref.getString("selectTwo");
		alert(db_selectAlert);
		return false;
	}*/
	
	for (var i = 0; i < checkboxes.length; ++i) {
		var checkbox = document.getElementById(checkboxes[i]);
		pref.setBoolPref(checkbox.getAttribute("prefstring"), checkbox.checked);
	}
	
	var INTtextboxes = ["clearSec", "trimNum"]; //, "queNum"
	for (var i = 0; i < INTtextboxes.length; ++i) {
		var textbox = document.getElementById(INTtextboxes[i]);
		pref.setIntPref(textbox.getAttribute("prefstring"), textbox.value);
	}
	
	var STRtextboxes = ["exclude", "AVLoc", "ArgsBox", "clearFiletypes", "ignoreFiletypes", "soundIgnoreFiletypes"];
	for (var i = 0; i < STRtextboxes.length; ++i) {
		var textbox = document.getElementById(STRtextboxes[i]);
		pref.setCharPref(textbox.getAttribute("prefstring"), textbox.value);
	}
	
	setCustomStyles();
	
	// Minimode pref
	if(document.getElementById("fullMode").selected)
		pref.setBoolPref("downbar.function.miniMode", false);
	else
		pref.setBoolPref("downbar.function.miniMode", true);
	
	//Style pref
	if(document.getElementById("defaultStyle").selected)
		pref.setBoolPref("downbar.style.default", true);
	else
		pref.setBoolPref("downbar.style.default", false);
	
	// Speed Colors pref
	var scEnabled = document.getElementById("speedColorsCheck").checked;
	pref.setBoolPref("downbar.style.speedColorsEnabled", scEnabled);
	
	// Sound prefs
	if(!document.getElementById("playSound").checked)
		pref.setIntPref("downbar.function.soundOnComplete", 0);
	else {
		if(document.getElementById("defaultSound").getAttribute("selected") == "true")
			pref.setIntPref("downbar.function.soundOnComplete", 1);
		else
			pref.setIntPref("downbar.function.soundOnComplete", 2);
	}
	pref.setCharPref("downbar.function.soundCustomComplete", "file://" + document.getElementById("customSoundHolder").value); 
	
	
	// Now get a reference to the main browser windows and reset the new display
	try {
		var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
		var e = wm.getEnumerator("navigator:browser");
		var win;
	
		while (e.hasMoreElements()) {
			win = e.getNext();
			win._dlbar_readPrefs();
			win._dlbar_setStyles();
			win._dlbar_populateDownloads();
			//win._dlbar_startInProgress();
			win._dlbar_checkMiniMode();
		}
	} catch (e){}

	return true;
}

function confirmAVenable() {

	if(document.getElementById("shouldScan").checked) {
		var db_stringsPref = document.getElementById("prefdownbarbundle");
		var db_enableTxt = db_stringsPref.getString("enableAV");
		var enableConfirm = confirm(db_enableTxt);
		if (!enableConfirm){
			document.getElementById("shouldScan").checked = false;
		}
	}
	VDispCheck();
}

function VDispCheck() {

	if(document.getElementById("shouldScan").checked) {
		document.getElementById("excludeLabel").disabled = false;
		document.getElementById("exclude").disabled = false;
		document.getElementById("AVLocLabel").disabled = false;
		document.getElementById("AVLoc").disabled = false;
		document.getElementById("filePicker").disabled = false;
		document.getElementById("ArgsLabel").disabled = false;
		document.getElementById("ArgsBox").disabled = false;
		document.getElementById("AVargDesc").disabled = false;
	}
	else {
		document.getElementById("excludeLabel").disabled = true;
		document.getElementById("exclude").disabled = true;
		document.getElementById("AVLocLabel").disabled = true;
		document.getElementById("AVLoc").disabled = true;
		document.getElementById("filePicker").disabled = true;
		document.getElementById("ArgsLabel").disabled = true;
		document.getElementById("ArgsBox").disabled = true;
		document.getElementById("AVargDesc").disabled = true;
	}

}

function KHistCheck() {

	if(document.getElementById("keepHistory").checked) {
		document.getElementById("trimHistory").disabled = false;
		document.getElementById("trimNum").disabled = false;
		document.getElementById("itemsDes").disabled = false;
	}
	else {
		document.getElementById("trimHistory").disabled = true;
		document.getElementById("trimNum").disabled = true;
		document.getElementById("itemsDes").disabled = true;
	}
}

function SoundCheck() {
	
	// this happens before the checkbox get finished changing it's state so the booleans are backwards

	if(document.getElementById("playSound").checked) {
		document.getElementById("soundSelect").setAttribute("disabled", "true");
		document.getElementById("soundExcludeLabel").setAttribute("disabled", "true");
		document.getElementById("soundIgnoreFiletypes").setAttribute("disabled", "true");
	}
	else {
		document.getElementById("soundSelect").setAttribute("disabled", "false");
		document.getElementById("soundExcludeLabel").setAttribute("disabled", "false");
		document.getElementById("soundIgnoreFiletypes").removeAttribute("disabled");  // have to remove or it doesn't work
	}
	
	
}

function getCustomStyles() {
	
	try {
		var useDefault = pref.getBoolPref("downbar.style.default");
		var useSpeedColors = pref.getBoolPref("downbar.style.speedColorsEnabled");
	} catch(e){}

	if(!useDefault) {
		document.getElementById("selectStyle").selectedIndex = 1;
		useCustomStyle();
	}
	if(useSpeedColors) {
		var checkbox = document.getElementById("speedColorsCheck");
		setSpeedColorsDis(checkbox);
		checkbox.checked = true;
	}
	
	// COLORS
	// These are the IDs of the color boxes and the pref from which they are derived
	var colorIDArray = ["db_progressbar", "db_progressremainder", "db_finishedHbox", "db_notdoneHbox", "db_pausedHbox", "db_filenameLabel", "db_downbar"];
	try {
		
		var color, stylePref, colorBoxElem;
		for (var i = 0; i < colorIDArray.length; ++i) {
			stylePref = pref.getCharPref("downbar.style." + colorIDArray[i]);
			// color should always be the first in the list (if present)
			var firstRuleName = stylePref.split(";")[0].split(":")[0];
			if(firstRuleName != "color" && firstRuleName != "background-color" && firstRuleName != "border-color")
				color = "";
			else
				color = stylePref.split(";")[0].split(":")[1];
			colorBoxElem = document.getElementById(colorIDArray[i]);
			if(color != "") // it is default
				colorBoxElem.firstChild.setAttribute("style", "background-color:" + color + "; border: 1px solid #000000;");	
			colorBoxElem.setAttribute("currColor", color);
			
		}
	} catch(e){}

	try {
	
		// TEXT SIZE
		var filenamePref = pref.getCharPref("downbar.style.db_filenameLabel");
		// should always be the second in the list
		var filenameSize = parseInt(filenamePref.split(";")[1].split(":")[1]);
		document.getElementById("fileTextSize").value = filenameSize;
		
		var progIndPref = pref.getCharPref("downbar.style.db_progressIndicator");
		// should always be the second in the list
		var progIndSize = parseInt(progIndPref.split(";")[1].split(":")[1]);
		document.getElementById("progTextSize").value = progIndSize;
		
		// DOWNLOAD ITEM SIZE
		var dlItemPref = pref.getCharPref("downbar.style.db_finishedHbox");  // could use any because we set them all the same
		// max-width should be 2nd, max- and min-height should be 3rd and 4th
		var width = parseInt(dlItemPref.split(";")[1].split(":")[1]);
		document.getElementById("DLWidth").value = width;
		var height = parseInt(dlItemPref.split(";")[2].split(":")[1]);
		document.getElementById("DLHeight").value = height;
	} catch(e){}
	
	try {
		// SPEED COLORS
		var speed0 = pref.getCharPref("downbar.style.speedColor0");
		var speed1 = pref.getCharPref("downbar.style.speedColor1");
		var speed2 = pref.getCharPref("downbar.style.speedColor2");
		var speed3 = pref.getCharPref("downbar.style.speedColor3");
		
		speed0 = speed0.split(";");
		speed1 = speed1.split(";");
		speed2 = speed2.split(";");
		speed3 = speed3.split(";");
		
		document.getElementById("speed0Color").firstChild.setAttribute("style", "background-color:" + speed0[1] + "; border: 1px solid #000000;");
		document.getElementById("speed0Color").setAttribute("currColor", speed0[1]);
		document.getElementById("speed1").value = speed1[0];
		document.getElementById("speed1a").value = speed1[0];
		document.getElementById("speed1Color").firstChild.setAttribute("style", "background-color:" + speed1[1] + "; border: 1px solid #000000;");
		document.getElementById("speed1Color").setAttribute("currColor", speed1[1]);
		document.getElementById("speed2").value = speed2[0];
		document.getElementById("speed2a").value = speed2[0];
		document.getElementById("speed2Color").firstChild.setAttribute("style", "background-color:" + speed2[1] + "; border: 1px solid #000000;");
		document.getElementById("speed2Color").setAttribute("currColor", speed2[1]);
		document.getElementById("speed3").value = speed3[0];
		document.getElementById("speed3a").value = speed3[0];
		document.getElementById("speed3Color").firstChild.setAttribute("style", "background-color:" + speed3[1] + "; border: 1px solid #000000;");
		document.getElementById("speed3Color").setAttribute("currColor", speed3[1]);
		
	} catch(e){}
}

function setCustomStyles() {
	
	// Get all the style prefs and convert them to arrays containing the css style rules (split by ;)
	try {
		var olddb_progressbar = pref.getCharPref("downbar.style.db_progressbar");
		olddb_progressbar = olddb_progressbar.split(";");
		var olddb_progressremainder = pref.getCharPref("downbar.style.db_progressremainder");
		olddb_progressremainder = olddb_progressremainder.split(";");
		var olddb_finishedHbox = pref.getCharPref("downbar.style.db_finishedHbox");
		olddb_finishedHbox = olddb_finishedHbox.split(";");
		var olddb_notdoneHbox = pref.getCharPref("downbar.style.db_notdoneHbox");
		olddb_notdoneHbox = olddb_notdoneHbox.split(";");
		var olddb_pausedHbox = pref.getCharPref("downbar.style.db_pausedHbox");
		olddb_pausedHbox = olddb_pausedHbox.split(";");
		var olddb_filenameLabel = pref.getCharPref("downbar.style.db_filenameLabel");
		olddb_filenameLabel = olddb_filenameLabel.split(";");
		var olddb_progressIndicator = pref.getCharPref("downbar.style.db_progressIndicator");
		olddb_progressIndicator = olddb_progressIndicator.split(";");
		var olddb_downbar = pref.getCharPref("downbar.style.db_downbar");
		olddb_downbar = olddb_downbar.split(";");
		var olddb_progressStack = pref.getCharPref("downbar.style.db_progressStack");
		olddb_progressStack = olddb_progressStack.split(";");
	} catch(e) {}
	
	var newWidth = document.getElementById("DLWidth").value;
	var newHeight = document.getElementById("DLHeight").value;
	//var useGradients = document.getElementById("gradientsCheck").checked;
	try {
		var useGradients = pref.getBoolPref("downbar.style.useGradients");
	} catch(e) {}
	
	// Replace the customized bits (must be in correct order!) and join the array into a string (seperated by ;), set pref
	// progressbar: bgcolor + bgimage + others
	// if speed colors is enabled, we want the default color to be the lowest speed grade
	var newProgressColor;
	if(document.getElementById("speedColorsCheck").checked)
		newProgressColor = document.getElementById("speed0Color").getAttribute("currColor");
	else	
		newProgressColor = document.getElementById("db_progressbar").getAttribute("currColor");
	if (newProgressColor == "")
		olddb_progressbar[0] = "";
	else 
		olddb_progressbar[0] = "background-color:" + newProgressColor;
	if(useGradients)
		olddb_progressbar[1] = "background:-moz-linear-gradient(top, rgba(255, 255, 255, .8), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), " + newProgressColor;
	else
		olddb_progressbar[1] = "background-image:url()";
	var newdb_progressbar = olddb_progressbar.join(";");
	pref.setCharPref("downbar.style.db_progressbar", newdb_progressbar);
	
	// progressremainder: bgcolor + others
	if (document.getElementById("db_progressremainder").getAttribute("currColor") == "")
		olddb_progressremainder[0] = "";
	else
		olddb_progressremainder[0] = "background-color:" + document.getElementById("db_progressremainder").getAttribute("currColor");
	var newdb_progressremainder = olddb_progressremainder.join(";");
	pref.setCharPref("downbar.style.db_progressremainder", newdb_progressremainder);
	
	// finishedHbox:  bgcolor + maxWidth + maxHeight + minHeight + bgimage + others
	if (document.getElementById("db_finishedHbox").getAttribute("currColor") == "")
		olddb_finishedHbox[0] = "";
	else
		olddb_finishedHbox[0] = "background-color:" + document.getElementById("db_finishedHbox").getAttribute("currColor");
	olddb_finishedHbox[1] = "max-width:" + newWidth + "px";
	olddb_finishedHbox[2] = "max-height:" + newHeight + "px";
	olddb_finishedHbox[3] = "min-height:" + newHeight + "px";
	if(useGradients)
		olddb_finishedHbox[4] = "background:-moz-linear-gradient(top, rgba(255, 255, 255, .8), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), " + document.getElementById("db_finishedHbox").getAttribute("currColor");
	else
		olddb_finishedHbox[4] = "background-image:url()"
	var newdb_finishedHbox = olddb_finishedHbox.join(";");
	pref.setCharPref("downbar.style.db_finishedHbox", newdb_finishedHbox);
	
	// notdoneHbox:  bgcolor + maxWidth + maxHeight + minHeight + bgimage + others
	if (document.getElementById("db_notdoneHbox").getAttribute("currColor") == "")
		olddb_notdoneHbox[0] = "";
	else
		olddb_notdoneHbox[0] = "background-color:" + document.getElementById("db_notdoneHbox").getAttribute("currColor");
	olddb_notdoneHbox[1] = "max-width:" + newWidth + "px";
	olddb_notdoneHbox[2] = "max-height:" + newHeight + "px";
	olddb_notdoneHbox[3] = "min-height:" + newHeight + "px";
	if(useGradients)
		olddb_notdoneHbox[4] = "background:-moz-linear-gradient(top, rgba(255, 255, 255, .8), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), " + document.getElementById("db_notdoneHbox").getAttribute("currColor");
	else
		olddb_notdoneHbox[4] = "background-image:url()"
	var newdb_notdoneHbox = olddb_notdoneHbox.join(";");
	pref.setCharPref("downbar.style.db_notdoneHbox", newdb_notdoneHbox);
	
	// pausedHbox: border-color + maxWidth + maxHeight + minHeight + others
	if(document.getElementById("db_pausedHbox").getAttribute("currColor") == "")
		olddb_pausedHbox[0] = "";
	else
		olddb_pausedHbox[0] = "border-color:" +  document.getElementById("db_pausedHbox").getAttribute("currColor");
	olddb_pausedHbox[1] = "max-width:" + newWidth + "px";
	olddb_pausedHbox[2] = "max-height:" + newHeight + "px";
	olddb_pausedHbox[3] = "min-height:" + newHeight + "px";
	var newdb_pausedHbox = olddb_pausedHbox.join(";");
	pref.setCharPref("downbar.style.db_pausedHbox", newdb_pausedHbox);
	
	// filenameLabel: color + font-size + others
	if(document.getElementById("db_filenameLabel").getAttribute("currColor") == "")
		olddb_filenameLabel[0] = "";
	else 
		olddb_filenameLabel[0] = "color:" + document.getElementById("db_filenameLabel").getAttribute("currColor");  // This will be "" if it is set to default, that is okay
	olddb_filenameLabel[1] = "font-size:" + document.getElementById("fileTextSize").value + "pt";
	var newdb_filenameLabel = olddb_filenameLabel.join(";");
	pref.setCharPref("downbar.style.db_filenameLabel", newdb_filenameLabel);
	
	// progressIndicator: color + font-size + others
	if(document.getElementById("db_filenameLabel").getAttribute("currColor") == "")
		olddb_progressIndicator[0] = "";
	else
		olddb_progressIndicator[0] = "color:" + document.getElementById("db_filenameLabel").getAttribute("currColor");  // This will be "" if it is set to default, that is okay
	olddb_progressIndicator[1] = "font-size:" + document.getElementById("progTextSize").value + "pt";
	var newdb_progressIndicator = olddb_progressIndicator.join(";");
	pref.setCharPref("downbar.style.db_progressIndicator", newdb_progressIndicator);

	// downbar: bgcolor + others
	if(document.getElementById("db_downbar").getAttribute("currColor") == "")
		olddb_downbar[0] = "";
	else
		olddb_downbar[0] = "background-color:" + document.getElementById("db_downbar").getAttribute("currColor");
	var newdb_downbar = olddb_downbar.join(";");
	pref.setCharPref("downbar.style.db_downbar", newdb_downbar);
	
	// downbarPopup: bgcolor + minwidth
	if(document.getElementById("db_downbar").getAttribute("currColor") == "")
		var newdb_downbarPopup = "";
	else
		var newdb_downbarPopup = "background-color:" + document.getElementById("db_downbar").getAttribute("currColor") + ";";
	pref.setCharPref("downbar.style.db_downbarPopup", newdb_downbarPopup);
	
	// progressStack: maxWidth + maxHeight + minHeight + others
	olddb_progressStack[0] = "max-width:" + newWidth + "px";
	olddb_progressStack[1] = "max-height:" + newHeight + "px";
	olddb_progressStack[2] = "min-height:" + newHeight + "px";
	var newdb_progressStack = olddb_progressStack.join(";");
	pref.setCharPref("downbar.style.db_progressStack", newdb_progressStack);
	
	// save speed colors in the form "speedlevel;hexcolor"
	var speedColor0 = 0 + ";" + document.getElementById("speed0Color").getAttribute("currColor");
	var speedColor1 = document.getElementById("speed1").value + ";" + document.getElementById("speed1Color").getAttribute("currColor");
	var speedColor2 = document.getElementById("speed2").value + ";" + document.getElementById("speed2Color").getAttribute("currColor");
	var speedColor3 = document.getElementById("speed3").value + ";" + document.getElementById("speed3Color").getAttribute("currColor");
	pref.setCharPref("downbar.style.speedColor0", speedColor0);
	pref.setCharPref("downbar.style.speedColor1", speedColor1);
	pref.setCharPref("downbar.style.speedColor2", speedColor2);
	pref.setCharPref("downbar.style.speedColor3", speedColor3);
	
	// Button text color
	if(document.getElementById("db_filenameLabel").getAttribute("currColor") == "")
		newdb_buttonTextColor = "";
	else 
		newdb_buttonTextColor = "color:" + document.getElementById("db_filenameLabel").getAttribute("currColor") + ";";  // This will be "" if it is set to default, that is okay
	pref.setCharPref("downbar.style.db_buttons", newdb_buttonTextColor);
	
}

function QueCheck() {
	
	if(document.getElementById("queEnable").checked) {
		document.getElementById("queDownlbl").disabled = false;
		document.getElementById("queNum").disabled = false;
		document.getElementById("queFileslbl").disabled = false;
	}
	else {
		document.getElementById("queDownlbl").disabled = true;
		document.getElementById("queNum").disabled = true;
		document.getElementById("queFileslbl").disabled = true;
	}

}

function selectFile(id, titleIn) {
	
	var stringBundle = document.getElementById("digitalpalireader-strings");
	
	var output = document.getElementById(id);   // Where the result will be stored
	var title = stringBundle.getString(titleIn);  // title of the picker window
	
	const nsIFilePicker = Components.interfaces.nsIFilePicker;
	const nsILocalFile = Components.interfaces.nsILocalFile;
	var fp = Components.classes["@mozilla.org/filepicker;1"]
	                 .createInstance(nsIFilePicker);

	fp.init(window, db_selectTxt, nsIFilePicker.modeOpen);
	fp.appendFilters(nsIFilePicker.filterAll);
	var result = fp.show();

	if (result == nsIFilePicker.returnOK) {
		var fileOut = fp.file.QueryInterface(nsILocalFile);
		var fileName = fp.file.path;
		output.value = fileName;
	}
	else if (result == nsIFilePicker.returnCancel) {
		return null;
	}
}

var gColorObj = {elemCurrColor:"", cancel:false};

function changeColor(clickedElem) {

	gColorObj.elemCurrColor = clickedElem.getAttribute("currColor");
	window.openDialog("colorPicker/EdColorPicker.xul", "_blank", "chrome,close,titlebar,modal,centerscreen", "", gColorObj);
	if (gColorObj.cancel)
      return;
    clickedElem.setAttribute("currColor", gColorObj.elemCurrColor);
    
    if(gColorObj.elemCurrColor == "") // default theme color
    	clickedElem.firstChild.setAttribute("style", "border: 1px solid #000000;");
    else
    	clickedElem.firstChild.setAttribute("style", "background-color:" + clickedElem.getAttribute("currColor") + "; border: 1px solid #000000;");
}

function useDefaultStyle() {
	document.getElementById("useCustomDisable").setAttribute("disabled","true");
	document.getElementById("useCustomHide").setAttribute("hidden","true");
}

function useCustomStyle() {
	document.getElementById("useCustomDisable").removeAttribute("disabled");
	document.getElementById("useCustomHide").setAttribute("hidden","false");
}

function setSpeedColorsDis(checkbox) {
	
	var enabled = checkbox.checked;  // this happens before the checkbox get finished changing it's state so the enabled is backwards
	
	if(!enabled) {
		document.getElementById("speedColorsDisable").removeAttribute("disabled");
		document.getElementById("speedColorsHidden").setAttribute("hidden","false");
	}
		
	else {
		document.getElementById("speedColorsDisable").setAttribute("disabled","true");
		document.getElementById("speedColorsHidden").setAttribute("hidden","true");
	}
}

function spTextboxChanged(textbox) {
	// this changes the corresponding speed disabled checkbox when you type in the original
	document.getElementById(textbox.id + "a").value = textbox.value;
}

function openAboutWindow() {
	
	// If I open it from my preferences window the "about" window is modal for some reason
	// open it from the browser window, it is not modal
	
	// Open page in new tab
	var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService();
    var wmed = wm.QueryInterface(Components.interfaces.nsIWindowMediator);
    
    var win = wmed.getMostRecentWindow("navigator:browser");
    if (!win)
    	win = window.openDialog("chrome://browser/content/browser.xul", "_blank", "chrome,all,dialog=no", 'chrome://downbar/content/aboutdownbar.xul', null, null);
    else {
    	var content = win.document.getElementById("content");
    	content.selectedTab = content.addTab('chrome://downbar/content/aboutdownbar.xul');	
    }
	
}

function resetCustom() {
	
	var boxIDs =        ["db_progressbar", "db_progressremainder", "db_finishedHbox", "db_notdoneHbox", "db_pausedHbox", "db_filenameLabel", "db_downbar"];
	var defaultColors = ["#89AFDB",        "white",                "#89AFDB",         "#A3A3A3",        "red",           "",                 ""];
	var currElem;
	
	for (var i = 0; i < boxIDs.length; ++i) {
		
		currElem = document.getElementById(boxIDs[i]);
		currElem.setAttribute("currColor", defaultColors[i]);
		
		if(defaultColors[i] == "") // default theme color
    		currElem.firstChild.setAttribute("style", "border: 1px solid #000000;");
    	else
    		currElem.firstChild.setAttribute("style", "background-color:" + defaultColors[i] + "; border: 1px solid #000000;");
	}
	
	document.getElementById("fileTextSize").value = "9";
	document.getElementById("progTextSize").value = "5";
	document.getElementById("DLWidth").value = "135";
	document.getElementById("DLHeight").value = "20";
}

function playCustomSound() {
	
	var sound = Components.classes["@mozilla.org/sound;1"].createInstance(Components.interfaces.nsISound);
	var nsIIOService = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService);
	
	var soundLoc = "file://" + document.getElementById("customSoundHolder").value;
	soundURIformat = nsIIOService.newURI(soundLoc,null,null);
	sound.play(soundURIformat);
	
}
