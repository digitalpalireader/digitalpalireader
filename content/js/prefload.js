var sPrefs = [];
var sPrefVals = [];
var cPrefs = [];
var cPrefVals = [];

var mPrefs = [];
var mPrefVals = [];

sPrefs.push("AnalyzeH"); sPrefVals.push(44);
sPrefs.push("DictH"); sPrefVals.push(250);
sPrefs.push("ControlW"); sPrefVals.push(254);
sPrefs.push("SearchH"); sPrefVals.push(50);

cPrefs.push("coltext"); cPrefVals.push("#111");
cPrefs.push("colsel"); cPrefVals.push("#550");

cPrefs.push("coldppn"); cPrefVals.push("#0B0");
cPrefs.push("colped"); cPrefVals.push("#C40");
cPrefs.push("colcpd"); cPrefVals.push("#44D");

cPrefs.push("colfont"); cPrefVals.push("Sans");
cPrefs.push("colsize"); cPrefVals.push("16");

cPrefs.push("colbk"); cPrefVals.push("#FFB");
cPrefs.push("colbkcp"); cPrefVals.push("#DDC");
cPrefs.push("colinput"); cPrefVals.push("#FFF");
cPrefs.push("colbutton"); cPrefVals.push("#FFF");
cPrefs.push("colbk1"); cPrefVals.push("yellow");
cPrefs.push("colbk2"); cPrefVals.push("aqua");
cPrefs.push("colbk3"); cPrefVals.push("green");

cPrefs.push("colsearch0"); cPrefVals.push("yellow");
cPrefs.push("colsearch1"); cPrefVals.push("blue");
cPrefs.push("colsearch2"); cPrefVals.push("green");

cPrefs.push("green"); cPrefVals.push("#00B900");
cPrefs.push("blue"); cPrefVals.push("#5353D5");
cPrefs.push("brown"); cPrefVals.push("#000000");
cPrefs.push("grey"); cPrefVals.push("grey");
cPrefs.push("red"); cPrefVals.push("red");

cPrefs.push("blueh"); cPrefVals.push("powderblue");

mPrefs.push("ctrans"); mPrefVals.push("unchecked");
mPrefs.push("catioff"); mPrefVals.push("unchecked");
mPrefs.push("catiloc"); mPrefVals.push("<none>");
mPrefs.push("autodict"); mPrefVals.push("unchecked");
mPrefs.push("bkgimg"); mPrefVals.push("checked");
mPrefs.push("script"); mPrefVals.push("0");
mPrefs.push("cpanel"); mPrefVals.push("1");

if (ioCheck) {
	for (i in sPrefs) {
		if (!getSizePref(sPrefs[i])) { setSizePref(sPrefs[i],sPrefVals[i]); }
	}

	for (i in cPrefs) {
		if (!getColPref(cPrefs[i])) { setColPref(cPrefs[i],cPrefVals[i]); }
	}

	/*
	for (i in mPrefs) {
		if (!getMiscPref(mPrefs[i])) { setMiscPref(mPrefs[i],mPrefVals[i]); }
	}
	*/
}
