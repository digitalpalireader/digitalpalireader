var niknoname = new Array();
niknoname[0] = "Vin";
niknoname[1] = "DN";
niknoname[2] = "MN";
niknoname[3] = "SN";
niknoname[4] = "AN";
niknoname[5] = "KN";
niknoname[6] = "KN";
niknoname[7] = "Vism";

var bookmarklink = new Array();
bookmarklink[0] = 100; // scroll distance for 1.htm
bookmarklink[1] = 0; // scroll distance for 2.htm
bookmarklink[2] = 3529; // scroll distance for 3.htm

var scrollmuch = 500; // default scroll distance 

var bookmarkwhere = new Array();
bookmarkwhere['a'] = '3#2#4#2';

function bookmarkf(let)
{
	var bmwa = bookmarkwhere[let].split('#');

	getplace(bmwa);
	importXML();
	document.getElementById('maf').scrollTop = bookmarklink[3];
}

function bookmarkc(let)
{
	if(let)
	{
		var name = let;
	}
	else 
	{
		var nno = document.form.bmlist.selectedIndex;
		var name = document.form.bmlist.getElementsByTagName('option')[nno].value;
		if (nno == 0) return;
	}
	document.form.bmname.value = name;
	var bmx = '';
	
	// first move to the file using the DPR file
	
    var dpr = readFile('DPB'+name);
	var bmwa = dpr[0].split('#');
	getplace(bmwa);
	importXML();

	// next scroll using the DSC file
	
    var dsc = readFile('DPS'+name)[0];
	document.getElementById('maf').scrollTop = dsc;
}

function bookmarks(let)
{
	var bookmarktemp = document.form.nik.selectedIndex + '#' + document.form.book.selectedIndex  + '#' + document.form.meta.selectedIndex  + '#' + document.form.volume.selectedIndex  + '#' + document.form.vagga.selectedIndex  + '#' + document.form.sutta.selectedIndex + '#' + document.form.section.selectedIndex + '#' + hier;
	
	// create first cookie for page
	
	var nameadd = document.form.bmname.value;
	nameadd = nameadd.replace(/"/g, '`');
	if (nameadd == 'showcookies') 
	{
		showmeallthecookies();
	}
	else if (nameadd == 'erasecookies') 
	{
		erasecookies();
	}
	else
	{
		//if (nameadd.length > 20) nameadd = nameadd.substring(0,20);
		if (nameadd.length == 0)
		{
			alert('Please enter a name for the bookmark');
			return null;
		}
		writeFile('DPB'+nameadd,bookmarktemp, "UTF-8");
		
		// create second cookie for scroll distance
		
       
		var cookscroll = document.getElementById('maf').scrollTop; // scroll distance for bookmark
		writeFile('DPS'+nameadd, cookscroll+"", "UTF-8");
		
		// create third cookie for description 
		var desquote = toVel(window.getSelection().toString());
		
		desquote = desquote.replace(/;/g, "::");
		if (desquote) writeFile('DPD'+nameadd,desquote, "UTF-8");
		else writeFile('DPD'+nameadd,"no description", "UTF-8");
	
		// update cookie list in javascript.htm
		
		updatecookielist();
	}		
}

function showmeallthecookies()
{
	var ca = readDir();
		var name = '';
		var allcookies = '<form name="bkform"><h1>DPR Bookmarks</h1><table>';
	
		var numberb = 0;
		var cookietotalno = 0;
		for(var i=0;i < ca.length;i++) 
		{
			if (ca[i].substring(0,3) == 'DPB')
			{
				cookietotalno++;
				allcookies +=  '<tr><td>' + ca[i];
				
			}

		}
	if (cookietotalno == 1)  allcookies += '<hr><b>' + cookietotalno + ' Bookmark Stored</b>';
	else allcookies += '<hr><b>' + cookietotalno + ' Bookmarks Stored</b>';
	document.getElementById('mafbc').innerHTML = allcookies;
}

function updatecookielist()
{
    var ca = readDir('DPR');
    
    var allcookies = '<option>none</option>';
	for(var i=0;i < ca.length;i++) 
	{
		if (i == 0 && ca.length > 1) allcookies = '<option>select one</option>';
		
//        alert(ca[i].substring(ca[i].length-4,ca[i].length-1));
		if (ca[i].substring(0,3) == 'DPB')
		{
			
			name = ca[i].substring(3);
			if (name.length > 13) name2 = name.substring(0,10) + '...';
			else name2 = name;
			allcookies +=  '<option value="' + name + '">' + name2 + '</option>';
		}
	}
	document.form.bmlist.innerHTML = allcookies;	
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
	moveframex(2);

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
	if(!hout) { hout = '<b style="color:'+colorcfg['colsel']+'">no&nbsp;history</b>'; }
	else { isclear = '&nbsp;<a style="color:'+colorcfg['colsel']+'" href="javascript:void(0)" title="Clear History" onclick="clearHistory()"><b>clear</b></a>'; }
    
    var ca = readDir();
    ca = ca.sort();
	if (ca.length < 2)
	{
		document.getElementById('mafbc').innerHTML='<table width="100%"><tr><td width=25%><font size=5>Bookmarks</font></td><td>&nbsp;</td><td><font size=5>History</font> '+isclear+'</td></tr><tr><td valign=top>No Bookmarks Stored</td><td></td><td width="1" valign=top><div class="round">'+hout+'</div></td></tr></table>';
	}
	else
	{
		var name = '';
		var cloc = new Array();
		
		var numberb = 0;
		var cookietotalno = 0;	
		
		var allcookies = '<form name="bkform"><table width=100% border=0>';
	
		for(var i=0;i < ca.length;i++) 
		{
			numberb++;
			if (ca[i].substring(0,3) == 'DPB')
			{
				cookietotalno++;
				name = ca[i].substring(3);
				name = name.replace(/"/g, '`');
				cloc = readFile(ca[i])[0].split('#');
				cloc[1]++;
				cloc[2]++;
				cloc[3]++;
				cloc[4]++;
				cloc[5]++;
				cloc[6]++;
				if (cloc[7] == 'm') cloc[7] = 'mul';
				else if (cloc[7] == 'a') cloc[7] = 'att';
				else {cloc[7] = 'ṭīkā';}
				
				allcookies +=  '<tr><td><div class="round">';
					allcookies += '<table width=100%><tr><td><a href="javascript:void(0)" onclick="bookmarkc(\'' + name + '\')"><b>' + cookietotalno + '.&nbsp;' + name.replace(/ +/g,'&nbsp;') + '</b>&nbsp;('+ niknoname[cloc[0]] + '.' + cloc[1] + '.' + cloc[2] + '.' + cloc[3] + '.' + cloc[4] + '.' + cloc[5] + '.' + cloc[6] + '&nbsp;-&nbsp;' + cloc[7] + ')</a></td><td><span class="abut obut" title="click here to edit this bookmark" id="hiderbutton' + name + '" onClick="hiddenout(\'' + name + '\')">+</span></td><td><span class="abut obut" onClick="erasecookie(\'' + name + '\')">x</span></td></tr><tr><td><i><font id="title' + name + '">&nbsp;</font></i></td></tr></table>';
					
					allcookies +=  '<div class="hide" id="'+ name + '"><hr>';
						allcookies +=  '<table width=100%><tr><td><b>Old Name</b></td><td align=center><b>New Name</b></td><td></td></tr><tr><td align=center>' + name + '</td><td align=center><input type=text value="" id="newname' + name + '" title="Enter a new name for this bookmark (max. 10 chars)" size=12></td><td align=center><span class="abut obut" onClick="bookmarkxn(\'' + name + '\')" title="Change Name">change</span></td></tr></table><hr>';
					allcookies += '<table width=100%><tr><td align=center><div class="hide" id="html' + name + '"></td></tr></table></div>';
				allcookies += '</div></td></tr>';
					
			}	
		}
		allcookies += '</table></form>';
		if (cookietotalno == 1)  allcookies += '<hr><b>' + cookietotalno + ' Bookmark Stored</b>';
		else allcookies += '<hr><div class="obutc"><b>' + cookietotalno + ' Bookmarks Stored</b>';
		allcookies += ' - <span class="abut obut" title="erase all stored bookmarks" onclick="erasecookies(\'go\')">erase all</span></div>';
		
		document.getElementById('mafbc').innerHTML='<table width="100%"><tr><td width=25%><font size=5>Bookmarks</font></td><td>&nbsp;</td><td><font size=5>History</font> '+isclear+'</td></tr><tr><td valign=top>'+allcookies+'</td><td></td><td width="1" valign=top><div class="round">'+hout+'</div></td></tr></table>';
		
		// now add the descriptions
		
		var desc = '';
		var title = '';
		var html = '';
				
		for(var i=0;i < ca.length;i++) 
		{
            if (ca[i].substring(0,3) == 'DPD')
            {
				name = ca[i].substring(3);
				desc = toUni(readFile(ca[i])[0]);
				desc = desc.replace(/::/g, ";");

				html = 'html' + name;
				title = 'title' + name;
				
				document.getElementById(html).innerHTML = '<table width=100%><tr><td><b>Old Description</b><td align=center><b>New Description</b><td><tr><td align=center id="olddesc' + name + '">' + desc + '<td align=center><textarea id="newdesc' + name + '" title="Enter a new description for this bookmark" value="' + desc + '"></textarea><td><span class="abut obut" onClick="bookmarkxd(\'' + name + '\')" title="Change Description">change</span></td></tr></table>';
				document.getElementById(title).innerHTML = desc;
			}		
		}
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
