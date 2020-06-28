async function eraseBookmark(i) {
  if (__navigationTabViewModel.isStorageSupportedByBrowser) {
    let bookmarksArrayFromStorage = localStorage.getItem("bookmarksArray");
    let data = [];
    if (bookmarksArrayFromStorage) {
      data = JSON.parse(bookmarksArrayFromStorage).slice();
      data.splice(i, 1);
      localStorage.setItem("bookmarksArray", JSON.stringify(data));
      __navigationTabViewModel.updateBookmarks();
      await bookmarkframe(0);
    }
  }
}

async function clearBookmarks(gofrom) {
  if (__navigationTabViewModel.isStorageSupportedByBrowser) {
    var answer = confirm('Are you sure you want to erase all of the stored bookmarks?');
    if(!answer) { return; }
    let bookmarksArrayFromStorage = localStorage.getItem("bookmarksArray");
    if (bookmarksArrayFromStorage) {
      localStorage.removeItem("bookmarksArray");
      __navigationTabViewModel.updateBookmarks();
      await bookmarkframe(0);
    }
  }
}

function getBookmarks() {
  if (__navigationTabViewModel.isStorageSupportedByBrowser) {
    let bookmarksArrayFromStorage = localStorage.getItem("bookmarksArray");
    let content = [];
    if (bookmarksArrayFromStorage) {
      let data = JSON.parse(bookmarksArrayFromStorage);
      for (var i in data) {
        content.push(data[i]);
      }
    }
    return content;
  }
}

async function addBookmark() {
  if (__navigationTabViewModel.isStorageSupportedByBrowser) {
    let bookmarksArrayFromStorage = localStorage.getItem("bookmarksArray");
    if (bookmarksArrayFromStorage) {
      let value = `${__otherDialogsViewModel.bookmarkName()}@${__navigationTabViewModel.sectionPlace}`;
      let data = JSON.parse(bookmarksArrayFromStorage);
      for (var i in data) {
        if (data[i].toString().localeCompare(value) === 0 || i > 99) return;
      }
      data.push(value);
      localStorage.setItem("bookmarksArray", JSON.stringify(data));
      await __navigationTabViewModel.updateBookmarks();
    }
  }
}

async function bookmarkframe(refresh) {
  var bookmList = getBookmarks();
  var histList = DPR_history_mod.getHistory();
  var bookmOut = '';
  var histOut = '';
  var isClearBm = '';
  var isclearHist = '';

  for (var i in bookmList) {
    if (bookmList[i].indexOf('@') > -1) {
      var tbookm = bookmList[i].split('@');

      if(DPR_G.DPR_prefs['nigahita']) {
        tbookm[0] = tbookm[0].replace(/ṃ/g, 'ṁ');
        tbookm[0] = tbookm[0].replace(/Ṃ/g, 'Ṁ');
      }

      var ttbm1 = tbookm[1].length-1;
      tbookm[1] = "'"+tbookm[1].charAt(0)+"'"+tbookm[1].substring(1,ttbm1) + "'" + tbookm[1].charAt(ttbm1) + "'";
      bookmOut += '<a style="color:red" href="javascript:void(0)" title="delete item" onclick="eraseBookmark(\'' + i + '\');">x</a>&nbsp<a href="javascript:void(0)" title="Load Section" onmouseup="openPlace(['+tbookm[1]+'],null,null,eventSend(event))">' + tbookm[0].replace(/ /g, '&nbsp;') + '</a><br />';
    }
  }
  if(!bookmOut) { bookmOut = '<b style="color:'+DPR_G.DPR_prefs['colsel']+'">no&nbsp;bookmarks</b>'; }
  else { isClearBm = '&nbsp;<a style="color:'+DPR_G.DPR_prefs['colsel']+'" href="javascript:void(0)" title="Clear Bookmarks" onclick="clearBookmarks()"><b>clear</b></a>'; }

  for (var i in histList) {
    if (histList[i].indexOf('@') > -1) {
      var thist = histList[i].split('@');

      if(DPR_G.DPR_prefs['nigahita']) {
        thist[0] = thist[0].replace(/ṃ/g, 'ṁ');
        thist[0] = thist[0].replace(/Ṃ/g, 'Ṁ');
      }

      var tt1 = thist[1].length-1;
      thist[1] = "'"+thist[1].charAt(0)+"'"+thist[1].substring(1,tt1) + "'" + thist[1].charAt(tt1) + "'";
      histOut += '<a style="color:red" href="javascript:void(0)" title="delete item" onclick="DPR_history_mod.removeHistory(\'' + i + '\');">x</a>&nbsp<a href="javascript:void(0)" title="Load Section" onmouseup="openPlace(['+thist[1]+'],null,null,eventSend(event))">' + thist[0].replace(/ /g, '&nbsp;') + '</a><br />';
    }
  }
  if(!histOut) { histOut = '<b style="color:'+DPR_G.DPR_prefs['colsel']+'">no&nbsp;history</b>'; }
  else { isclearHist = '&nbsp;<a style="color:'+DPR_G.DPR_prefs['colsel']+'" href="javascript:void(0)" title="Clear History" onclick="DPR_history_mod.clearHistory()"><b>clear</b></a>'; }

  if (refresh === 1) {
    await DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event));
  }
  $('#paliTextContent').html('<table width="100%"><tr><td><span class="huge">Bookmarks</span>'+isClearBm+'</td><td width="1"></td><td><span class="huge">History</span> '+isclearHist+'</td></tr><tr><td valign=top><div class="round">'+bookmOut+'</div></td><td></td><td width="1" valign=top><div class="round">'+histOut+'</div></td></tr></table>');

  if (!refresh) document.getElementById('maf').scrollTop = 0;
}

async function bookmarkxd(desc,idx) {
  var xmlDoc = getBookmarks();
  var bk = xmlDoc.getElementsByTagName('bookmark')[idx].getElementsByTagName('description')[0];
  bk.textContent = desc;

  var outfile = (new XMLSerializer()).serializeToString(xmlDoc);

  writeFile('DPR_Bookmarks', outfile);
  await bookmarkframe();
}

async function bookmarkxn(name,idx) {
  var xmlDoc = getBookmarks();
  var bk = xmlDoc.getElementsByTagName('bookmark')[idx].getElementsByTagName('name')[0];
  bk.textContent = name;

  var outfile = (new XMLSerializer()).serializeToString(xmlDoc);

  writeFile('DPR_Bookmarks', outfile);
  await bookmarkframe();
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
      ba[name]['loc'] = ba[name]['loc'].replace(/^([0-9]+)/,DPR_G.G_numberToNik[nik]);

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

  for (var i in ba) {
    saveBookmark(i,ba[i]['loc'],ba[i]['desc'],ba[i]['scroll'],1);
  }
}

function saveBookmark(name,loc,desc,scroll,supress) {
  var xmlDoc = getBookmarks();
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
  var sidebar = DPRSidebarWindow();
  if (sidebar) {
    sidebar.DPRNav.bookmarkBox();
  }
}
