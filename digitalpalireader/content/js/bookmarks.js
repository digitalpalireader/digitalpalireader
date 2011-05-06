function bookmarkXML(){
	var cont = readFile('DPR_Bookmarks');
	cont = (cont ? cont.join('\n') : '<?xml version="1.0" encoding="UTF-8"?>\n<xml></xml>');
	var parser=new DOMParser();
	var xmlDoc = parser.parseFromString(cont,'text/xml');
	return xmlDoc;
}

function eraseBookmark(idx)
{
	var xmlDoc = bookmarkXML();
	var thisNode = xmlDoc.getElementsByTagName('bookmark')[idx];
	var answer = confirm('Are you sure you want to erase the bookmark "' + thisNode.getElementsByTagName('name')[0].textContent + '"?')
	if(answer) 
	{	
        xmlDoc.documentElement.removeChild(thisNode);

		var outfile = (new XMLSerializer()).serializeToString(xmlDoc);
		writeFile('DPR_Bookmarks', outfile);        

        bookmarkframe(1);
	}
}

function eraseBookmarks(gofrom)
{
	var answer = confirm('Are you sure you want to erase all of the stored bookmarks?')
	if(answer) 
	{	
        eraseFile('DPR_Bookmarks');
		bookmarkframe();
	}
}

function bookmarkframe(refresh)
{

	if(!fileExists('DPR_Bookmarks')) convertOldBookmarks();

	// get history

	var theHistory = getHistory();
	var hout = '';
	var isclear = '';
	for (i in theHistory) {
		var thist = theHistory[i].split('@');
		var tt1 = thist[1].length-1;
		thist[1] = "'"+thist[1].charAt(0)+"'"+thist[1].substring(1,tt1) + "'" + thist[1].charAt(tt1) + "'";
		hout += '<a style="color:red" href="javascript:void(0)" title="delete item" onclick="removeHistory(\'' + theHistory[i] + '\');">x</a>&nbsp<a href="javascript:void(0)" title="Load Section" onmousedown="openPlace(['+thist[1]+'],null,null,eventSend(event))">' + thist[0].replace(/ /g, '&nbsp;') + '</a><br />';
	}
	if(!hout) { hout = '<b style="color:'+DPR_prefs['colsel']+'">no&nbsp;history</b>'; }
	else { isclear = '&nbsp;<a style="color:'+DPR_prefs['colsel']+'" href="javascript:void(0)" title="Clear History" onclick="clearHistory()"><b>clear</b></a>'; }

	var xmlDoc = bookmarkXML();
	
	var bNodes = xmlDoc.getElementsByTagName('bookmark');
    
	if (bNodes.length == 0)
	{
		document.getElementById('mafbc').innerHTML='<table width="100%"><tr><td><span class="huge">Bookmarks</span></td><td width="1">&nbsp;</td><td><span class="huge">History</span> '+isclear+'</td></tr><tr><td valign=top>No Bookmarks Stored</td><td></td><td width="1" valign=top><div class="round">'+hout+'</div></td></tr></table>';
	}
	else
	{
		var outputList = '<form name="bkform"><table width=100% border=0>';
	
		for(var i=0; i < bNodes.length; i++) 
		{
			var name = bNodes[i].getElementsByTagName('name')[0].textContent;
			var loc = bNodes[i].getElementsByTagName('location')[0].textContent.split('#');
			
			if(loc[7] = 'm') {
				var sname = getSuttaNumber(loc[0],loc[1],loc[2],loc[3],loc[4],loc[5],loc[6],loc[7],0);
				if(sname) sname = ' ('+G_nikLongName[loc[0]]+' '+sname+')';
				else sname = '';
			}
			else var sname = ' ('+G_nikLongName[loc[0]]+')';
			loc[0] = "'"+loc[0]+"'";
			loc[7] = "'"+loc[7]+"'";
			
			var scroll = bNodes[i].getElementsByTagName('scroll')[0].textContent;
			var desc = bNodes[i].getElementsByTagName('description')[0].textContent;
						
			outputList +=  '<tr><td><div class="round">';
				outputList += '<table width=100%><tr><td width="100%"><span class="pointer" href="javascript:void(0)" onclick="openPlace(['+loc.join(',')+'],null,null,null,'+scroll+')"><b>' + (i+1) + '.&nbsp;' + name.replace(/ +/g,'&nbsp;') + sname + '</b></span></td><td width="1"><span class="abut obut" title="click here to edit this bookmark" id="hiderbutton' + i + '" onClick="hiddenout(\'' + i + '\')">+</span></td><td width="1"><span class="abut obut" onClick="eraseBookmark(\'' + i + '\')">x</span></td></tr><tr><td colspan=3><i><font id="title' + i + '">'+desc+'</font></i></td></tr></table>';
				
				outputList +=  '<div class="hide" id="'+ i + '"><hr>';
					outputList +=  '<table width=100%><tr><td><b>Edit Name</b></td></tr><tr><td align=center><input type=text value="'+name+'" id="newname' + i + '" title="Enter a new name for this bookmark" size=12></td><td align=center><span class="abut obut" onClick="bookmarkxn(document.getElementById(\'newname'+i+'\').value,\'' + i + '\')" title="Change Name">change</span></td></tr></table><hr>';
				outputList += '<table width=100%><tr><td align=center><div class="hide" id="html' + i + '"><table width=100%><tr><td><b>Edit Text</b></td></tr><tr><td align=center><textarea id="newdesc' + i + '" title="Enter new text for this bookmark" value="' + desc + '">' + desc + '</textarea></td><td><span class="abut obut" onClick="bookmarkxd(document.getElementById(\'newdesc'+i+'\').value,\'' + i + '\')" title="Change Description">change</span></td></tr></table></td></tr></table></div>';
			outputList += '</div></td></tr>';
				
		}
		outputList += '</table></form>';
		outputList += '<hr><div class="obutc"><b>' + bNodes.length + ' Bookmark'+(bNodes.length == 1?'':'s')+' Stored</b>';
		outputList += ' - <span class="abut obut" title="erase all stored bookmarks" onclick="erasecookies(\'go\')">erase&nbsp;all</span></div>';
		
		document.getElementById('mafbc').innerHTML='<table width="100%"><tr><td><span class="huge">Bookmarks</span></td><td width=100>&nbsp;</td><td><span class="huge">History</span> '+isclear+'</td></tr><tr><td valign=top>'+outputList+'</td><td></td><td width="1" valign=top><div class="round">'+hout+'</div></td></tr></table>';
	}
	if (!refresh) document.getElementById('maf').scrollTop = 0;

}


function bookmarkxd(desc,idx)
{
	var xmlDoc = bookmarkXML();
	var bk = xmlDoc.getElementsByTagName('bookmark')[idx].getElementsByTagName('description')[0];
	bk.textContent = desc;

	var outfile = (new XMLSerializer()).serializeToString(xmlDoc);

	writeFile('DPR_Bookmarks', outfile);
	bookmarkframe();
}
function bookmarkxn(name,idx)
{
	var xmlDoc = bookmarkXML();
	var bk = xmlDoc.getElementsByTagName('bookmark')[idx].getElementsByTagName('name')[0];
	bk.textContent = name;

	var outfile = (new XMLSerializer()).serializeToString(xmlDoc);

	writeFile('DPR_Bookmarks', outfile);
	bookmarkframe();
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

		}
		else if (/^DPD/.exec(ca[i])) {
			if(!ba[toUni(ca[i].substring(3))]) continue;
			ba[toUni(ca[i].substring(3))]['desc'] = readFile(ca[i])[0];
		}
		else if (/^DPS/.exec(ca[i])) {
			if(!ba[toUni(ca[i].substring(3))]) continue;
			ba[toUni(ca[i].substring(3))]['scroll'] = readFile(ca[i])[0];
		}
	}
	
	for (i in ba) {
		saveBookmark(i,ba[i]['loc'],ba[i]['desc'],ba[i]['scroll'],1);
	}
}

function saveBookmark(name,loc,desc,scroll,supress) {

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
