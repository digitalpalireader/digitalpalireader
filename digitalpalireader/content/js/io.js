function setI() {
	i = 1;
}

ioCheck = true;


function readFile(aFileKey)
{
	var DIR = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
	var dir = DIR.get("ProfD", Components.interfaces.nsIFile);
	dir.append("DPR");
	if ( !dir.exists() )
	{
		return false;
	}
	var file = dir.clone();
	file.append(aFileKey);
	try {
		var charset = "UTF-8";
		var data = [];
		var fstream = Components.classes["@mozilla.org/network/file-input-stream;1"].
					  createInstance(Components.interfaces.nsIFileInputStream);
		var is = Components.classes["@mozilla.org/intl/converter-input-stream;1"]
						   .createInstance(Components.interfaces.nsIConverterInputStream);
		fstream.init(file, -1, 0, 0);
		is.init(fstream, charset, 1024, 0xFFFD);
		is.QueryInterface(Components.interfaces.nsIUnicharLineInputStream);

		if (is instanceof Components.interfaces.nsIUnicharLineInputStream) {
		  var line = {};
		  var cont;
		  do {
			cont = is.readLine(line);

			data.push(line.value);
		  } while (cont);
		}
		is.close(); // this closes fstream
		return (data);

	}
	catch(ex)
	{
		return false;
	}
}

function writeFile(aFileKey, aContent)
{
	var DIR = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
	var dir = DIR.get("ProfD", Components.interfaces.nsIFile);
	dir.append("DPR");
	if ( !dir.exists() )
	{
		dir.create(dir.DIRECTORY_TYPE, 0700);
	}

	var aFile = dir.clone();
	aFile.append(aFileKey);
	if ( aFile.exists() ) aFile.remove(false);

	try {
		// file is nsIFile, data is a string
		var foStream = Components.classes["@mozilla.org/network/file-output-stream;1"].
					   createInstance(Components.interfaces.nsIFileOutputStream);

		// use 0x02 | 0x10 to open file for appending.
		foStream.init(aFile, 0x02 | 0x08 | 0x20, 0666, 0); 
		// write, create, truncate
		// In a c file operation, we have no need to set file mode with or operation,
		// directly using "r" or "w" usually.

		var charset = "UTF-8"; // Can be any character encoding name that Mozilla supports

		var os = Components.classes["@mozilla.org/intl/converter-output-stream;1"]
						   .createInstance(Components.interfaces.nsIConverterOutputStream);

		// This assumes that fos is the Interface("nsIOutputStream") you want to write to
		os.init(foStream, charset, 0, 0x0000);

		os.writeString(aContent);

		os.close();
		return true;
	}
	catch(ex)
	{
		dalert("ERROR: Failed to write file: " + aFile.leafName);
	}
}

function readExtFile(fileLoc)
{
	if(/\\/.exec(fileLoc)) fileLoc = fileLoc.replace(/\//g,'\\');
	
	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
	file.initWithPath(fileLoc);
	if ( !file.exists() )
	{
		dalert("ERROR: Failed to read file: " + file.leafName);
		return false;
	}
	try {
		var charset = "UTF-8";
		var data = [];
		var fstream = Components.classes["@mozilla.org/network/file-input-stream;1"].
					  createInstance(Components.interfaces.nsIFileInputStream);
		var is = Components.classes["@mozilla.org/intl/converter-input-stream;1"]
						   .createInstance(Components.interfaces.nsIConverterInputStream);
		fstream.init(file, -1, 0, 0);
		is.init(fstream, charset, 1024, 0xFFFD);
		is.QueryInterface(Components.interfaces.nsIUnicharLineInputStream);

		if (is instanceof Components.interfaces.nsIUnicharLineInputStream) {
		  var line = {};
		  var cont;
		  do {
			cont = is.readLine(line);

			data.push(line.value);
		  } while (cont);
		}
		is.close(); // this closes fstream
		return (data);
	}
	catch(ex)
	{
		dalert("ERROR: Failed to read file: " + file.leafName);
		return false;
	}
}
function writeExtFile(fileLoc, aContent) 
{
	var aFile = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
	aFile.initWithPath(fileLoc);
	if ( aFile.exists() ) aFile.remove(false);

	try {
		// file is nsIFile, data is a string
		var foStream = Components.classes["@mozilla.org/network/file-output-stream;1"].
					   createInstance(Components.interfaces.nsIFileOutputStream);

		// use 0x02 | 0x10 to open file for appending.
		foStream.init(aFile, 0x02 | 0x08 | 0x20, 0666, 0); 
		// write, create, truncate
		// In a c file operation, we have no need to set file mode with or operation,
		// directly using "r" or "w" usually.

		var charset = "UTF-8"; // Can be any character encoding name that Mozilla supports

		var os = Components.classes["@mozilla.org/intl/converter-output-stream;1"]
						   .createInstance(Components.interfaces.nsIConverterOutputStream);

		// This assumes that fos is the Interface("nsIOutputStream") you want to write to
		os.init(foStream, charset, 0, 0x0000);

		os.writeString(aContent);

		os.close();
		return true;
	}
	catch(ex)
	{
		dalert("ERROR: Failed to write file: " + aFile.leafName);
		return false;
	}
}


function getHomePath() {
	var DIR = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
	var dir = DIR.get("Home", Components.interfaces.nsIFile);
	return dir.path;
}
function fileExists(aFileKey)
{
	var DIR = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
	var dir = DIR.get("ProfD", Components.interfaces.nsIFile);
	dir.append("DPR");
	dir.append(aFileKey);
	if ( dir.exists() ) return true;
	return false;
}

function profFileExists(file)
{
	var DIR = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
	var dir = DIR.get("ProfD", Components.interfaces.nsIFile);
	
	var dirs = file.split('/');
	for (i in dirs) {
		dir.append(dirs[i]);
		if (!dir.exists()) return false;
	}
	return true;
}

function extFileExists(fileLoc)
{
	var osString = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).OS;
	if(osString == "WINNT") {
		fileLoc = fileLoc.replace(/\//g,'\\');
	}
	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
	try {
		file.initWithPath(fileLoc);
		if(!file.exists()) return false;
	}
	catch(ex) {
		return false;
	}
	return true;
} 

function chromeFileExists(fileLoc) // in extension package
{
	var xmlhttp = new window.XMLHttpRequest();
	try {
		xmlhttp.open("GET", "chrome://"+fileLoc, false);
		xmlhttp.onreadystatechange=function() {
			xmlhttp.abort();
		}
		xmlhttp.send(null);
	}
	catch(ex) {
		return false;
	}
	return true;
} 

function readDir() {
	var DIR = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
	var dir = DIR.get("ProfD", Components.interfaces.nsIFile);
	dir.append("DPR");
	if ( !dir.exists() )
	{
		dir.create(dir.DIRECTORY_TYPE, 0700);
	}
	
	var entries = dir.directoryEntries;
	var ca = [];
	
	while (entries.hasMoreElements()) {
	  var file        = entries.getNext().QueryInterface(Components.interfaces.nsILocalFile);
	  var isException = false;

	  if (file.exists()) {
		ca.push(file.leafName);
	  }
	}
	return ca;
}

function eraseFile(name) {
		var DIR = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
		var dir = DIR.get("ProfD", Components.interfaces.nsIFile);
		dir.append("DPR");
		if ( !dir.exists() )
		{
			dir.create(dir.DIRECTORY_TYPE, 0700);
		}

		var aFile = dir.clone();
		aFile.append(name);
		if ( aFile.exists() ) aFile.remove(false);
		
		return true;
}

function fileSaveDialog(title) {
	
	const nsIFilePicker = Components.interfaces.nsIFilePicker;
	const nsILocalFile = Components.interfaces.nsILocalFile;
	var fp = Components.classes["@mozilla.org/filepicker;1"]
	                 .createInstance(nsIFilePicker);

	fp.init(window, title, nsIFilePicker.modeSave);
	var result = fp.show();

	if (result != nsIFilePicker.returnCancel) {
		var fileOut = fp.file.QueryInterface(nsILocalFile);
		var fileName = fp.file.path;
		return(fileName);
	}
	else if (result == nsIFilePicker.returnCancel) {
		return false;
	}
}

function writeFileToDesk(file, data) {
	file = file.replace(/\\/g,'/');

	var DIR = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
	var dir = DIR.get("Desk", Components.interfaces.nsIFile);
	
	if(writeExtFile(dir.path+'/'+file,data)) return true;
	return false
}

function writeToDesktop(aFileKey, aContent)
{
	var DIR = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
	var dir = DIR.get("Desk", Components.interfaces.nsIFile);
	dir.append("DPR_dev");
	if ( !dir.exists() )
	{
		dir.create(dir.DIRECTORY_TYPE, 0700);
	}

	var aFile = dir.clone();
	aFile.append(aFileKey);
	if ( aFile.exists() ) aFile.remove(false);

	try {
		// file is nsIFile, data is a string
		var foStream = Components.classes["@mozilla.org/network/file-output-stream;1"].
					   createInstance(Components.interfaces.nsIFileOutputStream);

		// use 0x02 | 0x10 to open file for appending.
		foStream.init(aFile, 0x02 | 0x08 | 0x20, 0666, 0); 
		// write, create, truncate
		// In a c file operation, we have no need to set file mode with or operation,
		// directly using "r" or "w" usually.

		var charset = "UTF-8"; // Can be any character encoding name that Mozilla supports

		var os = Components.classes["@mozilla.org/intl/converter-output-stream;1"]
						   .createInstance(Components.interfaces.nsIConverterOutputStream);

		// This assumes that fos is the Interface("nsIOutputStream") you want to write to
		os.init(foStream, charset, 0, 0x0000);

		os.writeString(aContent);

		os.close();
		return true;
	}
	catch(ex)
	{
		dalert("ERROR: Failed to write file: " + aFile.leafName);
	}
}



function eraseItem(name) {
		var DIR = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
		var dir = DIR.get("ProfD", Components.interfaces.nsIFile);
		dir.append("DPR");
		if ( !dir.exists() )
		{
			dir.create(dir.DIRECTORY_TYPE, 0700);
		}

		var aFile = dir.clone();
		aFile.append("DPB"+name);
		if ( aFile.exists() ) aFile.remove(false);
		
		aFile = dir.clone();
		aFile.append("DPS"+name);
		if ( aFile.exists() ) aFile.remove(false);
		
		aFile = dir.clone();
		aFile.append("DPD"+name);
		if ( aFile.exists() ) aFile.remove(false);
		return false;
}

function eraseAll() {
		var DIR = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
		var dir = DIR.get("ProfD", Components.interfaces.nsIFile);
		dir.append("DPR");
		var entries = dir.directoryEntries;
		var ca = [];
		
		while (entries.hasMoreElements()) {
		  var file = entries.getNext().QueryInterface(Components.interfaces.nsILocalFile);
		  var isException = false;

		  if (file.exists() && /^DP[BSD]/.exec(file.leafName)) {
			file.remove(false);
		  }
		}
}

function changeName(name, nam) {
	var DIR = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
	var dir = DIR.get("ProfD", Components.interfaces.nsIFile);
	dir.append("DPR");

	var aFile = dir.clone();
	aFile.append("DPB"+name);
	if ( aFile.exists() ) aFile.moveTo(null, "DPB"+nam); 

	var bFile = dir.clone();
	bFile.append("DPS"+name);
	if ( bFile.exists() ) bFile.moveTo(null, "DPS"+nam);
	
	var cFile = dir.clone();
	cFile.append("DPD"+name);
	if ( cFile.exists() ) cFile.moveTo(null, "DPD"+nam);
	return false;
}

