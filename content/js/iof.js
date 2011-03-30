
if(document.location.href.search(/^chrome/) != 0) {
	ioCheck = false;
}
else {
	ioCheck = true;

	var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);

	var sizeprefs = prefs.getBranch("extensions.digitalpalireader.sizes.");
	var colorprefs = prefs.getBranch("extensions.digitalpalireader.colors.");
	var miscprefs = prefs.getBranch("extensions.digitalpalireader.misc.");

	function getColPref(name) {
		return colorprefs.getCharPref(name);
	}
	function getSizePref(name) {
		return sizeprefs.getIntPref(name);
	}
	function getMiscPref(name) {
		return miscprefs.getCharPref(name);
	}
	function setColPref(name,val) {
		return colorprefs.setCharPref(name,val);
	}
	function setSizePref(name,val) {
		return sizeprefs.setIntPref(name,val);
	}
	function setMiscPref(name,val) {
		return miscprefs.setCharPref(name,val);
	}

	function readFile(aFileKey)
	{
		var DIR = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
		var dir = DIR.get("ProfD", Components.interfaces.nsIFile);
		dir.append("DPR");
		if ( !dir.exists() )
		{
			return false;
		}
		var aFile = dir.clone();
		aFile.append(aFileKey);
		try {
			var istream = Components.classes['@mozilla.org/network/file-input-stream;1'].createInstance(Components.interfaces.nsIFileInputStream);
			istream.init(aFile, 1, 0, false);
			var sstream = Components.classes['@mozilla.org/scriptableinputstream;1'].createInstance(Components.interfaces.nsIScriptableInputStream);
			sstream.init(istream);
			var content = sstream.read(sstream.available());
			sstream.close();
			istream.close();
			return content;
		}
		catch(ex)
		{
			return false;
		}
	}

	function writeFile(aFileKey, aContent, aChars) // aChars isn't used
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

			// if you are sure there will never ever be any non-ascii text in data you can 
			// also call foStream.writeData directly
			var converter = Components.classes["@mozilla.org/intl/converter-output-stream;1"].
							createInstance(Components.interfaces.nsIConverterOutputStream);
			converter.init(foStream, "UTF-8", 0, 0);
			converter.writeString(aContent);
			converter.close(); // this closes foStream
		}
		catch(ex)
		{
			alert("ERROR: Failed to write file: " + aFile.leafName);
		}
	}

	function writeExtFile(aLoc, aFileKey, aContent) // aChars isn't used
	{
		var DIR = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
		var dir = DIR.get("Home", Components.interfaces.nsIFile);
		var dirs = aLoc.split('/');
		for (i in dirs) {
			dir.append(dirs[i]);
			if ( !dir.exists() )
			{
				return false;
			}
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

			// if you are sure there will never ever be any non-ascii text in data you can 
			// also call foStream.writeData directly
			var converter = Components.classes["@mozilla.org/intl/converter-output-stream;1"].
							createInstance(Components.interfaces.nsIConverterOutputStream);
			converter.init(foStream, "UTF-8", 0, 0);
			converter.writeString(aContent);
			converter.close(); // this closes foStream
			return true;
		}
		catch(ex)
		{
			alert("ERROR: Failed to write file: " + aFile.leafName);
			return false;
		}
	}


	function readExtFile(myDir)
	{
		var DIR = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
		var dir = DIR.get("Home", Components.interfaces.nsIFile);
		var dirs = myDir.split('/');
		for (i in dirs) {
			dir.append(dirs[i]);
			if ( !dir.exists() )
			{
				return false;
			}
		}
		var aFile = dir.clone();
		try {
			var istream = Components.classes['@mozilla.org/network/file-input-stream;1'].createInstance(Components.interfaces.nsIFileInputStream);
			istream.init(aFile, 1, 0, false);
			var sstream = Components.classes['@mozilla.org/scriptableinputstream;1'].createInstance(Components.interfaces.nsIScriptableInputStream);
			sstream.init(istream);
			var content = sstream.read(sstream.available());
			sstream.close();
			istream.close();
			return content;
		}
		catch(ex)
		{
			return false;
		}
	}


	function getHomePath() {
		var DIR = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
		var dir = DIR.get("Home", Components.interfaces.nsIFile);
		return dir.path;
	}
	function fileExists(aDir,aFileKey)
	{
		var DIR = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
		var dir = DIR.get("Home", Components.interfaces.nsIFile);
		aDir = aDir.replace(/\\/g,'/');
		var dirs = aDir.split('/');
		for (i in dirs) {
			dir.append(dirs[i]);
			if ( !dir.exists() )
			{
				return false;
			}
		}
		dir.append(aFileKey);
		if ( dir.exists() ) return true;
		return false;
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

	function removeHistory(value) {
		
		var storeHistory = [];
		var content = '';
		
		var DIR = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
		var dir = DIR.get("ProfD", Components.interfaces.nsIFile);
		dir.append("DPR");
		if ( !dir.exists() )
		{
			dir.create(dir.DIRECTORY_TYPE, 0700);
		}
		else {
			var aFile = dir.clone();
			aFile.append('History_List_DPR');
			try {
				var istream = Components.classes['@mozilla.org/network/file-input-stream;1'].createInstance(Components.interfaces.nsIFileInputStream);
				istream.init(aFile, 1, 0, false);
				var sstream = Components.classes['@mozilla.org/scriptableinputstream;1'].createInstance(Components.interfaces.nsIScriptableInputStream);
				sstream.init(istream);
				content = sstream.read(sstream.available());
				sstream.close();
				istream.close();
			}
			catch(ex)
			{
			}
		}
		var oldHistory = content.split('#');
		for (j in oldHistory) {
			if (oldHistory[j] != value) { storeHistory.push(oldHistory[j]); }
			if (j > 99) { break; }
		}
		if (storeHistory.length != 0 ) { writeFile('History_List_DPR',storeHistory.join('#'),'UTF-8'); }
		else { clearHistory(); }
		bookmarkframe(1);
	}
	//clearHistory();

	function clearHistory(cp) {
		var answer = confirm('Are you sure you want to erase the history?');
		if(!answer) { return; }

		var DIR = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
		var dir = DIR.get("ProfD", Components.interfaces.nsIFile);
		dir.append("DPR");
		if ( !dir.exists() )
		{
			dir.create(dir.DIRECTORY_TYPE, 0700);
		}

		var aFile = dir.clone();
		aFile.append("History_List_DPR");
		if ( aFile.exists() ) aFile.remove(false);
		if(!cp) { bookmarkframe(1); }
		historyBox();
	}	

	function getHistory() {
		var content = '';
		var DIR = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
		var dir = DIR.get("ProfD", Components.interfaces.nsIFile);
		dir.append("DPR");
		if ( !dir.exists() )
		{
			return false;
		}
		var aFile = dir.clone();
		aFile.append('History_List_DPR');
		try {
			var istream = Components.classes['@mozilla.org/network/file-input-stream;1'].createInstance(Components.interfaces.nsIFileInputStream);
			istream.init(aFile, 1, 0, false);
			var sstream = Components.classes['@mozilla.org/scriptableinputstream;1'].createInstance(Components.interfaces.nsIScriptableInputStream);
			sstream.init(istream);
			content = sstream.read(sstream.available());
			sstream.close();
			istream.close();
		}
		catch(ex)
		{
			return false;
		}
		sendHistory = content.split('#');
		return sendHistory;
	}

	function addHistory(value) {
		
		var storeHistory = [value];
		var content = '';
		
		var DIR = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties);
		var dir = DIR.get("ProfD", Components.interfaces.nsIFile);
		dir.append("DPR");
		if ( !dir.exists() )
		{
			dir.create(dir.DIRECTORY_TYPE, 0700);
		}
		else {
			var aFile = dir.clone();
			aFile.append('History_List_DPR');
			try {
				var istream = Components.classes['@mozilla.org/network/file-input-stream;1'].createInstance(Components.interfaces.nsIFileInputStream);
				istream.init(aFile, 1, 0, false);
				var sstream = Components.classes['@mozilla.org/scriptableinputstream;1'].createInstance(Components.interfaces.nsIScriptableInputStream);
				sstream.init(istream);
				content = sstream.read(sstream.available());
				sstream.close();
				istream.close();
			}
			catch(ex)
			{
				writeFile('History_List_DPR',value,'UTF-8');
				return;
			}
		}
		var oldHistory = content.split('#');
		for (j in oldHistory) {
			if (oldHistory[j] != value) { storeHistory.push(oldHistory[j]); }
			if (j > 99) { break; }
		}
		writeFile('History_List_DPR',storeHistory.join('#'),'UTF-8');
	}	
}
