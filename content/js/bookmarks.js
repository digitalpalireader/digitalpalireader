
function showmeallthecookies()
{
	var ca = readDir();
		var name = '';
		var outputList = '<form name="bkform"><h1>DPR Bookmarks</h1><table>';
	
		var numberb = 0;
		var cookietotalno = 0;
		for(var i=0;i < ca.length;i++) 
		{
			if (ca[i].substring(0,3) == 'DPB')
			{
				cookietotalno++;
				outputList +=  '<tr><td>' + ca[i];
				
			}

		}
	if (cookietotalno == 1)  outputList += '<hr><b>' + cookietotalno + ' Bookmark Stored</b>';
	else outputList += '<hr><b>' + cookietotalno + ' Bookmarks Stored</b>';
	document.getElementById('mafbc').innerHTML = outputList;
}

function updatecookielist()
{
    var ca = readDir('DPR');
    
    var outputList = '<option>none</option>';
	for(var i=0;i < ca.length;i++) 
	{
		if (i == 0 && ca.length > 1) outputList = '<option>select one</option>';
		
//        alert(ca[i].substring(ca[i].length-4,ca[i].length-1));
		if (ca[i].substring(0,3) == 'DPB')
		{
			
			name = ca[i].substring(3);
			if (name.length > 13) name2 = name.substring(0,10) + '...';
			else name2 = name;
			outputList +=  '<option value="' + name + '">' + name2 + '</option>';
		}
	}
	//document.form.bmlist.innerHTML = outputList;	
}

function erasecookie(name)
{
	if (name)
	{
		var refreshbms = true;
	}
	else
	{
		var nno = document.form.bmlist.selectedIndex;
		name = document.form.bmlist.getElementsByTagName('option')[nno].value;
	}	
	var answer = confirm('Are you sure you want to erase the bookmark "' + name + '"?')
	if(answer) 
	{	
        eraseItem(name);
        updatecookielist();
		
		if (refreshbms)
		{
			bookmarkframe('refresh');
		}
	}
}

function erasecookies(gofrom)
{
	var answer = confirm('Are you sure you want to erase all of the stored bookmarks?')
	if(answer) 
	{	
        eraseAll();
		updatecookielist();
		if (gofrom) bookmarkframe('refresh');
	}
}

function bookmarkframe(refresh)
{

	convertOldBookmarks();

	// get history

	var theHistory = getHistory();
	var hout = '';
	var isclear = '';
	for (i in theHistory) {
		var thist = theHistory[i].split('@');
		var tt1 = thist[1].length-1;
		thist[1] = thist[1].substring(0,tt1) + "'" + thist[1].charAt(tt1) + "'";
		hout += '<a style="color:red" href="javascript:void(0)" title="delete item" onclick="removeHistory(\'' + theHistory[i] + '\');">x</a>&nbsp<a href="javascript:void(0)" title="Load Section" onclick="getplace([' + thist[1] + ']);importXML();">' + shortenTitle(thist[0],30).replace(/ /g, '&nbsp;') + '</a><br />';
	}
	if(!hout) { hout = '<b style="color:'+G_prefs['colsel']+'">no&nbsp;history</b>'; }
	else { isclear = '&nbsp;<a style="color:'+G_prefs['colsel']+'" href="javascript:void(0)" title="Clear History" onclick="clearHistory()"><b>clear</b></a>'; }

	var cont = readFile('DPR_Bookmarks');
	cont = (cont ? cont.join('\n') : '<?xml version="1.0" encoding="UTF-8"?>\n<xml></xml>');
	var parser=new DOMParser();
	var xmlDoc = parser.parseFromString(cont,'text/xml');
	
	var bNodes = xmlDoc.getElementsByTagName('bookmark');
    
	if (bNodes.length == 0)
	{
		document.getElementById('mafbc').innerHTML='<table width="100%"><tr><td width=25%><font size=5>Bookmarks</font></td><td>&nbsp;</td><td><font size=5>History</font> '+isclear+'</td></tr><tr><td valign=top>No Bookmarks Stored</td><td></td><td width="1" valign=top><div class="round">'+hout+'</div></td></tr></table>';
	}
	else
	{
		var outputList = '<form name="bkform"><table width=100% border=0>';
	
		for(var i=0; i < bNodes.length; i++) 
		{
			var name = bNodes[i].getElementsByTagName('name')[0].textContent;
			var loc = bNodes[i].getElementsByTagName('location')[0].textContent.split('#');
			
			var sname = getSuttaNumber(loc);
			if(sname) name += '('+sname+')';
			
			loc[0] = "'"+loc[0]+"'";
			loc[7] = "'"+loc[7]+"'";
			
			var scroll = bNodes[i].getElementsByTagName('scroll')[0].textContent;
			var desc = bNodes[i].getElementsByTagName('description')[0].textContent;
						
			outputList +=  '<tr><td><div class="round">';
				outputList += '<table width=100%><tr><td><span class="pointer" href="javascript:void(0)" onclick="openPlace([\''+loc.join('')+'],null,null,null,'+scroll+')"><b>' + (i+1) + '.&nbsp;' + name.replace(/ +/g,'&nbsp;') + '</b></span></td><td><span class="abut obut" title="click here to edit this bookmark" id="hiderbutton' + i + '" onClick="hiddenout(\'' + i + '\')">+</span></td><td><span class="abut obut" onClick="erasecookie(\'' + i + '\')">x</span></td></tr><tr><td><i><font id="title' + i + '">'+desc+'</font></i></td></tr></table>';
				
				outputList +=  '<div class="hide" id="'+ i + '"><hr>';
					outputList +=  '<table width=100%><tr><td><b>Old Name</b></td><td align=center><b>New Name</b></td><td></td></tr><tr><td align=center>' + name + '</td><td align=center><input type=text value="" id="newname' + i + '" title="Enter a new name for this bookmark (max. 10 chars)" size=12></td><td align=center><span class="abut obut" onClick="bookmarkxn(\'' + i + '\')" title="Change Name">change</span></td></tr></table><hr>';
				outputList += '<table width=100%><tr><td align=center><div class="hide" id="html' + i + '"><table width=100%><tr><td><b>Old Description</b><td align=center><b>New Description</b><td><tr><td align=center id="olddesc' + i + '">' + desc + '<td align=center><textarea id="newdesc' + i + '" title="Enter a new description for this bookmark" value="' + desc + '"></textarea><td><span class="abut obut" onClick="bookmarkxd(\'' + i + '\')" title="Change Description">change</span></td></tr></table></td></tr></table></div>';
			outputList += '</div></td></tr>';
				
		}
		outputList += '</table></form>';
		outputList += '<hr><div class="obutc"><b>' + bNodes.length + ' Bookmark'+(bNodes.length == 1?'':'s')+' Stored</b>';
		outputList += ' - <span class="abut obut" title="erase all stored bookmarks" onclick="erasecookies(\'go\')">erase&nbsp;all</span></div>';
		
		document.getElementById('mafbc').innerHTML='<table width="100%"><tr><td width=25%><font size=5>Bookmarks</font></td><td>&nbsp;</td><td><font size=5>History</font> '+isclear+'</td></tr><tr><td valign=top>'+outputList+'</td><td></td><td width="1" valign=top><div class="round">'+hout+'</div></td></tr></table>';
	}
	if (!refresh) document.getElementById('maf').scrollTop = 0;

}


function bookmarkxd(name)
{
	var descloc = 'newdesc' + name;
	var desc = document.getElementById(descloc).value;
	desc = desc.replace(/\n/g, ' | ');
	writeFile("DPD"+name, desc, "UTF-8");
	bookmarkframe();
}
function bookmarkxn(name)
{
	var namloc = 'newname' + name;
	var nam = document.getElementById(namloc).value;

    changeName(name,nam);

	bookmarkframe();
	updatecookielist();
}

function bookmarksite(title, url){
if (document.all)
window.external.AddFavorite(url, title);
else if (window.sidebar)
window.sidebar.addPanel(title, url, "")
}


function convertOldBookmarks() {
	   
    var ca = readDir();
    ca = ca.sort();
    
    var ba = [];
    
	for(var i=0;i < ca.length;i++) 
	{
		if (/^DPB/.exec(ca[i])) {
			var name = toUni(ca[i].substring(3))
			ba[name] = [];
			ba[name]['loc'] = readFile(ca[i])[0];
			var nik = ba[name]['loc'].match(/^[0-9]+/)[0];
			ba[name]['loc'] = ba[name]['loc'].replace(/^([0-9]+)/,G_numberToNik[nik]);

			return;
			
			eraseFile(ca[i]);
		}
		else if (/^DPD/.exec(ca[i])) {
			if(!ba[toUni(ca[i].substring(3))]) continue;
			ba[toUni(ca[i].substring(3))]['desc'] = readFile(ca[i])[0];
			eraseFile(ca[i]);
		}
		else if (/^DPS/.exec(ca[i])) {
			if(!ba[toUni(ca[i].substring(3))]) continue;
			ba[toUni(ca[i].substring(3))]['scroll'] = readFile(ca[i])[0];
			eraseFile(ca[i]);
		}
	}
	
	for (i in ba) {
		saveBookmark(i,ba[i]['loc'],ba[i]['desc'],ba[i]['scroll'],1);
	}
}

function saveBookmark(name,loc,desc,scroll,supress) {
	
	var cont = readFile('DPR_Bookmarks');
	cont = (cont ? cont.join('\n') : '<?xml version="1.0" encoding="UTF-8"?>\n<xml></xml>');
	var parser=new DOMParser();
	var xmlDoc = parser.parseFromString(cont,'text/xml');

	var newNode = xmlDoc.createElement('bookmark');
	var newNodeName = xmlDoc.createElement('name');
	var newNodeLoc = xmlDoc.createElement('location');
	var newNodeScroll = xmlDoc.createElement('scroll');
	var newNodeDesc = xmlDoc.createElement('description');

	
	//document.form.nik.selectedIndex + '#' + document.form.book.selectedIndex  + '#' + document.form.meta.selectedIndex  + '#' + document.form.volume.selectedIndex  + '#' + document.form.vagga.selectedIndex  + '#' + document.form.sutta.selectedIndex + '#' + document.form.section.selectedIndex + '#' + hier;

	var tLoc = xmlDoc.createTextNode(loc);

	newNodeLoc.appendChild(tLoc);
	newNode.appendChild(newNodeLoc);
	
	var tName = xmlDoc.createTextNode(name);
	newNodeName.appendChild(tName);
	newNode.appendChild(newNodeName);

	var tScroll = xmlDoc.createTextNode(scroll);
	newNodeScroll.appendChild(tScroll);
	newNode.appendChild(newNodeScroll);

	var tDesc = xmlDoc.createTextNode(desc);
	newNodeDesc.appendChild(tDesc);
	newNode.appendChild(newNodeDesc);
	
	xmlDoc.documentElement.appendChild(newNode);
	
	var outfile = (new XMLSerializer()).serializeToString(xmlDoc);

	if(writeFile('DPR_Bookmarks', outfile)) {
		if(!supress) alertFlash('Bookmark Saved','green');
	}
}
