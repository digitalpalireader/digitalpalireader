'use strict';

// xul buttons: accept, cancel, help, open, save, find, clear, yes, no, apply, close, print, add, remove, refresh, go-forward, go-back, properties, select-font, select-color, network

DPR_G.MD = DPR_PAL.contentDocument;
DPR_G.MW = DPR_PAL.contentWindow;

DPR_G.G_searchStartTime;

DPR_G.G_searchType;
DPR_G.G_searchString;
DPR_G.G_searchMAT;
DPR_G.G_searchSet;
DPR_G.G_searchBook;
DPR_G.G_searchPart;
DPR_G.G_searchRX;
DPR_G.G_searchLink;

async function searchTipitaka(sectionId,searchType,searchString,searchMAT,searchSet,searchBook,searchPart,searchRX) {
  DPR_search_mod.showCancelButton();
  DPR_search_mod.showProgressBar();

  DPR_search_mod.initializeSectionLinks();

  DPR_search_mod.removeCopyPermaLinkElement();

  var element = DPR_G.MD.getElementById("finished");
  while(element.hasChildNodes()){
    element.removeChild(element.firstChild);
  }

  clearDivs(sectionId,'search');
  resetvalues();
  if(searchString) { // update url
    DPR_G.G_searchType = searchType;
    DPR_G.G_searchString = searchString;
    DPR_G.G_searchMAT = searchMAT;
    DPR_G.G_searchSet = searchSet;
    DPR_G.G_searchBook = ','+searchBook+',';
    DPR_G.G_searchPart = searchPart;
    DPR_G.G_searchRX = searchRX;

    var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/search.xul' + '?type='+searchType+'&query=' + searchString + '&MAT=' + searchMAT + '&set=' + searchSet + '&book=' + searchBook + '&part=' + searchPart + '&rx=' + searchRX);

    try {
      DPR_G.MW.history.replaceState('Object', 'Title', permalink);
    }
    catch(ex) {
    }
  }
  else {
    // get options from URL

    var options = DPR_G.MD.location.href.split('?')[1].split('#')[0].split('&');

    // parse options
    for (var i in options) {

      var option = options[i].split('=');
      switch(option[0]) {
        case 'type':
          DPR_G.G_searchType = parseInt(option[1]);
        break;
        case 'query':
          DPR_G.G_searchString = decodeURIComponent(option[1]);
        break;
        case 'MAT':
          DPR_G.G_searchMAT = option[1];
        break;
        case 'set':
          DPR_G.G_searchSet = option[1];
        break;
        case 'book':
          DPR_G.G_searchBook = ','+option[1]+','; // add commas so each will be findable with comma at end and beginning
        break;
        case 'part':
          DPR_G.G_searchPart = option[1];
        break;
        case 'rx':
          DPR_G.G_searchRX = (option[1] == 'true');
        break;
      }
    }
  }

  if(!DPR_G.G_searchString) {
    var check = {value: false};                  // default the checkbox to false
    var input = {value: ''};
    var result = DPR_G.G_prompts.prompt(null, "Enter Query", "Enter query for custom search:", input, null, check);
    if(!result)
      return;
    if(!input.value)
      return;
    DPR_G.G_searchString = input.value;
  }

  var st = [];
  var matst = [];
  for (var i in DPR_G.G_searchMAT) matst.push(DPR_G.G_searchMAT[i]);

  st[0] = 'Multiple Sets';
  st[1] = DPR_G.G_nikLongName[DPR_G.G_searchSet] + ' Books';
  st[2] = DPR_G.G_nikLongName[DPR_G.G_searchSet] + ' ' + DPR_G.G_searchBook.slice(1,-1);
  st[3] = DPR_G.G_nikLongName[DPR_G.G_searchSet] + ' ' + DPR_G.G_searchBook.slice(1,-1) + ' (partial)';
  st[5] = 'ATI Translations';

  if(DPR_G.G_searchType == 0 && /\|/.test(DPR_G.G_searchBook)) // custom search
    st[0]+=' (custom)';


  // tab title

  var tabT = 'Search: \'' + (DPR_G.G_searchRX?DPR_translit_mod.toUniRegEx(DPR_G.G_searchString):DPR_translit_mod.toUni(DPR_G.G_searchString)) + '\' in ' + st[DPR_G.G_searchType];

  DPR_search_mod.setTitle(tabT);

  if (/^[TPVMtpvm][0-9]\.[0-9][0-9][0-9][0-9]$/.exec(DPR_G.G_searchString)) {  // page search
    DPR_G.G_searchString = DPR_G.G_searchString.toUpperCase();
  }
  else if(DPR_G.G_searchType != 5) {
    DPR_G.G_searchString = DPR_G.G_searchString.toLowerCase();
  }


  switch(DPR_G.G_searchType) {
    case 0:
      await pausesall();
    break;
    case 1:
      await pausetwo();
    break;
    case 2:
    case 3:
      await pausethree();
    break;
    case 5: // ATI
      await atiSearchStart();
    break;
  }

}

function stopSearch() {
  DPR_G.stopsearch = 1;
}

function scrollSearch(what) {
  return DPR_PAL_Search_ScrollSearch(what);
}

function DPR_PAL_Search_ScrollSearch(what) {
  if (DPR_PAL.isXUL) {
    document.getElementById('search').scrollTop = what?document.getElementById(what).offsetTop:0;
  } else {
    const searchHitsSectionHeight = document.getElementById('sbfab').offsetHeight
    const scrollBy = what ? document.getElementById(what).offsetTop + searchHitsSectionHeight : 0;
    scrollMainPane(scrollBy)
  }
  return false;
}

function resetvalues() {
  DPR_G.G_searchFileArray = [];
  DPR_G.exword.length=0;
  DPR_G.stopsearch = 0;
  DPR_G.bookperm = 1;
  DPR_G.rescount = -1;
  DPR_G.qz = 0;
  DPR_G.nikayaat = '';
  DPR_G.newnikaya = '';
  DPR_G.nikcount = 0;
  DPR_G.thiscount = 0;
  DPR_G.bookfile = '';
  DPR_G.countmatch = 0;
}

function finishSearch() {
  document.getElementById('sbfbc').scrollTop = 0;

  DPR_search_mod.hideProgressBar();
  DPR_search_mod.hideCancelButton();

  const searchLink = 'dpr:search?type='+DPR_G.G_searchType+'&query=' + DPR_translit_mod.toVel(DPR_G.G_searchString) + '&MAT=' + DPR_G.G_searchMAT + '&set=' + DPR_G.G_searchSet + '&book=' + DPR_G.G_searchBook.slice(1,-1) + '&part=' + DPR_G.G_searchPart + '&rx=' + DPR_G.G_searchRX;
  DPR_G.G_searchLink = DPR_PAL.normalizeDprUri(searchLink);

  DPR_search_mod.addCopyPermaLinkElement();

  // fix plural

  if(DPR_G.MD.getElementById('inter')) {
    DPR_search_mod.fixPluralInSearchTermSectionInfo()
  }

}

DPR_G.G_searchFileArray = [];

DPR_G.bookfile = '';
DPR_G.count = 0;
DPR_G.bookload = '';
DPR_G.nikayaat = '';
DPR_G.bookat = '';
DPR_G.first = 0;
DPR_G.buffer = '';
DPR_G.nextbookfile = '';
DPR_G.rescount = -1;
DPR_G.resultcount = [];
DPR_G.thiscount = 0;

DPR_G.stopsearch = 0;

DPR_G.filelistat = 0;

DPR_G.newnikaya = '';
DPR_G.nikcount = 0;
DPR_G.qz = 0;

DPR_G.nikperm = 0;
DPR_G.bookperm = 1;

DPR_G.exword = [];
DPR_G.countmatch = 0;

function DPR_PAL_Search_ClearSearchResults() {
  $('#sbfab').html('');
  if (DPR_PAL.isXUL) {
    $('#sbfb').html('<hr>');
  }
}

async function pausesall()
{
  // make DPR_G.G_searchFileArray
  var which = DPR_G.G_searchType;

  if(/\|/.test(DPR_G.G_searchBook)) { // custom search
    DPR_G.G_searchBook = DPR_G.G_searchBook.replace(/\|/g,',|,');
    var cbooks = DPR_G.G_searchBook.split('|');
    var cniks = [];
    for(var i in DPR_G.G_searchSet) {
      cniks[DPR_G.G_searchSet[i]] = i;
    }
  }

  for(var w in DPR_G.G_XMLFileArray) {
    if (DPR_G.G_searchSet.indexOf(w.charAt(0)) == -1) continue; // don't add unchecked collections

    for (var x = 0; x < 3; x++) {
      if(DPR_G.G_searchMAT.indexOf(DPR_G.G_hLetters[x]) > -1 && DPR_G.G_XMLFileArray[w][x] == 1) { // this hier is checked and the file exists in this hier
        if(cbooks && cbooks[cniks[w.charAt(0)]] && cbooks[cniks[w.charAt(0)]].indexOf(','+w.substring(1)+',') == -1) continue; // skip unspecified books for custom search

        DPR_G.G_searchFileArray.push(w+DPR_G.G_hLetters[x]);
      }
    }
  }

  if(DPR_G.G_searchFileArray.length == 0) {
    alert('No books in selection');
    return;
  }

  var getstring = DPR_G.G_searchString;

  DPR_PAL_Search_ClearSearchResults();

  DPR_search_mod.addSearchTermSectionLink(DPR_G.G_searchRX ? DPR_G.G_searchString : DPR_translit_mod.toUni(DPR_G.G_searchString));

  for (var i = 0; i < DPR_G.G_numberToNik.length; i++) {
    if (DPR_G.G_searchSet.indexOf(DPR_G.G_numberToNik[i]) == -1) continue; // don't add unchecked collections
    DPR_search_mod.addSectionLink(DPR_G.G_numberToNik[i]);
  }

  DPR_search_mod.makeProgressTable(DPR_G.G_searchFileArray.length - 1);

  await importXMLs(1);
}

async function pausetwo() { // init function for single collection

  // make DPR_G.G_searchFileArray
  var which = DPR_G.G_searchType;
  var nikaya = DPR_G.G_searchSet;

  for(var w in DPR_G.G_XMLFileArray) {
    if (w.charAt(0) != nikaya) continue; // only this collection
    if (DPR_G.G_searchBook.indexOf(','+w.substring(1)+',') == -1) continue; // skip unchecked books

    for (var x = 0; x < 3; x++) {
      if(DPR_G.G_searchMAT.indexOf(DPR_G.G_hLetters[x]) > -1 && DPR_G.G_XMLFileArray[w][x] == 1) { // this hier is checked and the file exists in this hier
        DPR_G.G_searchFileArray.push(w+DPR_G.G_hLetters[x]);
      }
    }
  }

  if(DPR_G.G_searchFileArray.length == 0) {
    alert('No books in selection');
    return;
  }

  DPR_search_mod.makeProgressTable(DPR_G.G_searchFileArray.length - 1);

  var getstring = DPR_G.G_searchString;

  DPR_PAL_Search_ClearSearchResults();

  DPR_search_mod.addSearchTermSectionInfo(DPR_G.G_nikLongName[nikaya]);

  await importXMLs(2);
}

async function pausethree() {

  var which = DPR_G.G_searchType;
  var nikaya = DPR_G.G_searchSet;
  var book = DPR_G.G_searchBook.slice(1,-1);

  var nikbook = nikaya+book;
  var getstring = DPR_G.G_searchString;
  if(which == 2) { // single book, multiple hier
    for (var x = 0; x < 3; x++) {
      if(DPR_G.G_searchMAT.indexOf(DPR_G.G_hLetters[x]) > -1 && DPR_G.G_XMLFileArray[nikbook][x] == 1) { // this hier is checked and the file exists in this hier
        DPR_G.G_searchFileArray.push(nikbook+DPR_G.G_hLetters[x]);
      }
    }
  }
  else { // single book (partial)
    DPR_G.G_searchFileArray = [nikbook+DPR_G.G_searchMAT];
  }

  if(DPR_G.G_searchFileArray.length == 0) {
    alert('No books in selection');
    return;
  }

  DPR_search_mod.makeProgressTable(DPR_G.G_searchFileArray.length - 1);

  DPR_search_mod.addSearchTermSectionInfo(DPR_G.G_nikLongName[nikaya]+' '+book + (DPR_G.G_searchPart != '1'?' (partial)':''));

  await importXMLs(3);
}

async function bounce(sct)
{
  DPR_search_mod.updateProgressBar()
  await DPR_PAL.delay(10);
  await importXMLs(sct);
}


async function importXMLs(cnt)
{
  if (DPR_G.stopsearch==1) {
    finishSearch();
    return;
    }

  DPR_G.count = cnt;
  var bookno = 0;
  var endloop = 0;
  var yellowcount = 0;

  var getstring = DPR_G.G_searchString;
  var stringra = new Array();

  if (cnt == 1) // whole tipitaka or multiple collections
  {
    DPR_G.bookfile = DPR_G.G_searchFileArray[DPR_G.qz];
    DPR_G.newnikaya = DPR_G.bookfile.charAt(0);
    if (DPR_G.nikayaat != DPR_G.newnikaya)
    {
      const headingNode = DPR_search_mod.createSectionHeader(DPR_G.newnikaya);
      document.getElementById('sbfb').appendChild(headingNode);
      DPR_G.thiscount = 0;
      DPR_G.rescount++;
    }
    DPR_G.nikayaat = DPR_G.bookfile.charAt(0);
    DPR_G.bookat = DPR_G.bookfile.substring(1,DPR_G.bookfile.length-1);
    DPR_G.bookperm = DPR_G.bookat;
    DPR_G.nikperm = DPR_G.nikayaat;
    var hiert = DPR_G.bookfile.charAt(DPR_G.bookfile.length-1);

    //devO(bookload);

    var xmlDoc = await XML_Load.loadXMLFileAsync(DPR_G.bookfile,0);

    createTables(xmlDoc,hiert);

    DPR_search_mod.updateSectionLink(DPR_G.nikayaat, DPR_G.thiscount);

    if (DPR_G.qz < DPR_G.G_searchFileArray.length-1)
    {
      DPR_G.nextbookfile = DPR_G.G_searchFileArray[DPR_G.qz+1];
      if (DPR_G.nextbookfile.charAt(0) != DPR_G.nikayaat) $('#stfH'+DPR_G.nikayaat).css('color',DPR_G.DPR_prefs['colsel']);
      DPR_G.qz++;
      await bounce(1);
    }
    else {
      DPR_G.qz = 0;
      DPR_G.bookperm = 0;
      $('#stfH'+DPR_G.nikayaat).css('color',DPR_G.DPR_prefs['colsel']);
      finishSearch();
    }
  }
  else if (cnt == 2) // nikaya
  {
    var nikaya = DPR_G.G_searchSet;


    DPR_G.bookfile = DPR_G.G_searchFileArray[DPR_G.qz];
    DPR_G.bookat = DPR_G.bookfile.substring(1,DPR_G.bookfile.length-1);
    DPR_G.bookperm = DPR_G.bookat;
    hiert = DPR_G.bookfile.charAt(DPR_G.bookfile.length-1);

    var xmlDoc = await XML_Load.loadXMLFileAsync(DPR_G.bookfile,0);
    createTables(xmlDoc,hiert);

    DPR_search_mod.updateSearchTermSectionInfo(DPR_G.thiscount);

    if (DPR_G.qz < DPR_G.G_searchFileArray.length-1)
    {
      DPR_G.qz++;
      await bounce(2);
    }
    else {
      DPR_G.qz = 0;
      DPR_G.bookperm = 0;
      DPR_G.thiscount = 0;
      finishSearch();
    }
  }
  else if (cnt == 3) // this book
  {
    var nikaya = DPR_G.G_searchSet;
    var book = DPR_G.G_searchBook.slice(1,-1);

    DPR_G.bookfile = DPR_G.G_searchFileArray[DPR_G.qz];
    hiert = DPR_G.bookfile.charAt(DPR_G.bookfile.length-1);

    var xmlDoc = await XML_Load.loadXMLFileAsync(DPR_G.bookfile,0);

    createTables(xmlDoc,hiert);

    DPR_search_mod.updateSearchTermSectionInfo(DPR_G.thiscount);

    if (DPR_G.qz < DPR_G.G_searchFileArray.length-1)
    {
      DPR_G.qz++;
      await bounce(3);
    }
    else {
      DPR_G.qz = 0;
      DPR_G.thiscount = 0;
      finishSearch();
    }
  }
  document.getElementById('searchb').scrollTop = 0; //vertical scroll
  DPR_G.buffer = '';
  DPR_G.first = 0;
  DPR_G.nikperm = 0;


}

function createTdForMatch(dups, match) {
  if (!match) {
    return '';
  }

  const linkText = normalizeLongSearchResult(match);
  return `<a href="javascript:void(0);" title="${match}" onclick="showonly('${match.replace(/\"/g, 'x')}')">${linkText}</a> (${dups[match]})`;
}

function createTables(xmlDoc,hiert)
{
  //TO DO (comment DO 2020-02-22): This is a temporary fix search for alpha release.
  //This piece of code makes using the RegEx checkbox having the right effect.
  //After removing XUL, this whome file has to be tidied up and refactored.
  if (!DPR_PAL.isXUL) {
    var options = DPR_G.MD.location.href.split('?')[1].split('#')[0].split('&');
    for (var i in options) {
      var option = options[i].split('=');
      switch(option[0]) {
        case 'rx':
          DPR_G.G_searchRX = (option[1] == 'true');
        break;
      }
    }
  }

  //alert(bookload);
  var u = xmlDoc.getElementsByTagName("h0");

  var getstring = DPR_G.G_searchString;

  var gotstring;
  var nikaya = DPR_G.G_searchSet;
  var book = DPR_G.G_searchBook.slice(1,-1);

  if (DPR_G.count == 1 || DPR_G.count == 2) {
    book = DPR_G.bookperm;
  }
  if (DPR_G.count == 1)
  {
    nikaya = DPR_G.nikperm;
  }
  var bookname = DPR_navigation_mod.getBookName(nikaya,hiert,parseInt(book)-1);

  var postpara ='';
  var theData = '';

  var beforem = '';
  var afterm = '';
  var spaceb = 0;
  var spacea = 0;
  var aftermex = '';

  var tempexword = new Array();
  var exwordout = '';
  var kexword = new Array();

  var findiv = 0;
  var findivx = 0;
  var findiva = new Array();
  var ctab = 0;
  var flag1 = 0;
  var flag2 = 0;

  var texttomatch = '';
  var startmatch = 0;
  var endmatch = 0;

  var dups = [];
  var dupsx = '';
  var tagtitle = '';
  var texnodups = [];
  var exnodups = [];
  var l = 0;

  var exwordNode = document.createElement('div');
  exwordNode.setAttribute("id",'searchres');

  var outNode = document.createElement('div');
  var finalout = '';


  var match = 0;
  var nummatch = 0;
  var extranummatch = -1;

  var stringra = new Array();
  var perstring = '';
  var yesall = 0;

  var titlesonly = false;

  var yesplus = getstring.indexOf('+'); // look for multi matches
  if (yesplus >= 0) {
    stringra = (DPR_G.G_searchRX?DPR_translit_mod.toUniRegEx(getstring):DPR_translit_mod.toUni(getstring)).split('+');
  }
  else {
    stringra[0] = getstring;
    if(DPR_G.G_searchRX) getstring = DPR_translit_mod.toUniRegEx(getstring);
    else getstring = DPR_translit_mod.toUni(getstring);
  }

  var sraout = stringra.join('#');
  sraout = sraout.replace(/"/g, '`');
  //if(DPR_G.G_searchRX) sraout = '/'+sraout.replace(/\\/g,'\\\\')+'/';

  var part;
  if(DPR_G.G_searchPart != '1') part = DPR_G.G_searchPart.split('.');

  for (var sx = 0; sx < u.length; sx++) // per h0
  {

    if(DPR_G.G_searchType == 3 && part[0] >= 0 && sx != parseInt(part[1])) continue;

    var v = u[sx].getElementsByTagName("h1");

    for (var sy = 0; sy < v.length; sy++) // per h1
    {

      if(DPR_G.G_searchType == 3 && part[0] >= 1 && sy != parseInt(part[2])) continue;

      var w = v[sy].getElementsByTagName("h2");

      for (var sz = 0; sz < w.length; sz++) // per h2
      {

        if(DPR_G.G_searchType == 3 && part[0] >= 2 && sz != parseInt(part[3])) continue;

        var x = w[sz].getElementsByTagName("h3");


        for (var s = 0; s < x.length; s++) // per h3
        {

          if(DPR_G.G_searchType == 3 && part[0] >= 3 && s != parseInt(part[4])) continue;

          var y = x[s].getElementsByTagName("h4");

          for (var se = 0; se < y.length; se++) // per h4
          {

            if(DPR_G.G_searchType == 3 && part[0] >= 4 && se != parseInt(part[5])) continue;

            var z = y[se].getElementsByTagName("p");

            for (var tmp = 0; tmp < z.length; tmp++) // per paragraph
            {

              texttomatch = z[tmp].textContent.substring(4);

              if(DPR_G.DPR_prefs['nigahita']) {
                texttomatch = texttomatch.replace(/ṃ/g, 'ṁ');
                texttomatch = texttomatch.replace(/Ṃ/g, 'Ṁ');
              }

              if(!DPR_G.DPR_prefs['showVariantsInline'])
				        texttomatch = texttomatch.replace(/\{[^}]+\}/g, '');

              if (!/[0-9]/.exec(DPR_G.G_searchString)) texttomatch = texttomatch.replace(/\^a\^[^^]*\^ea\^/g, ''); // remove pesky page references unless we're searching for them.

              //texttomatch = texttomatch.replace(/\^b\^/g, '');
              //texttomatch = texttomatch.replace(/\^eb\^/g, '');

              texttomatch = texttomatch.replace(/  */g, ' ');
              texttomatch = texttomatch.replace(/''nti/g, 'n”ti');
              texttomatch = texttomatch.replace(/"nti/g, 'n”ti');
              texttomatch = texttomatch.replace(/'nti/g, 'n’ti');
              texttomatch = texttomatch.replace(/"ti/g, '”ti');
              texttomatch = texttomatch.replace(/''ti/g, '”ti');
              texttomatch = texttomatch.replace(/'ti/g, '’ti');
              texttomatch = texttomatch.replace(/``/g, '“');
              texttomatch = texttomatch.replace(/`/g, '‘');
              texttomatch = texttomatch.replace(/''/g, '”');
              texttomatch = texttomatch.replace(/'/g, '’');
              texttomatch = texttomatch.replace(/\.\.\.pe0\.\.\./g, ' ... pe ...');
              texttomatch = texttomatch.replace(/\.\./g, '.');
              if (yesplus >= 0) // multiple search terms
              {
                tagtitle = '';
                tempexword = [];
                for (var d = 0; d < stringra.length; d++)
                {
                  perstring = stringra[d];

                  if(DPR_G.G_searchRX)
                    startmatch = findRegEx(texttomatch,perstring);
                  else
                    startmatch = texttomatch.indexOf(perstring)

                  postpara = '';
                  tempexword[d] = [];
                  if (startmatch >= 0)
                  {
                    yesall++;


                    while (startmatch >= 0)
                    {
                      if(DPR_G.G_searchRX) gotstring = texttomatch.match(getRegExtSearchString(perstring))[0];
                      else gotstring = perstring;


                      endmatch = startmatch + gotstring.length;
                      beforem = texttomatch.substring(0,startmatch);
                      afterm = texttomatch.substring(endmatch);
                      if(gotstring.indexOf('<c') == -1 && gotstring.indexOf('c>') == -1 ) { // make sure we're not doubling
                        //postpara += beforem + '<c'+d+'>' + gotstring + '<xc>';
                        postpara += beforem + (gotstring.charAt(0) == ' ' ? ' ' : '') + '<c'+d+'>' + gotstring.replace(/^ /g, '').replace(/ $/g, '').replace(/(.) (.)/g, "$1<xc> <c"+d+">$2") + '<xc>' + (gotstring.charAt(gotstring.length-1) == ' ' ? ' ' : '');

                        // get words
                        spaceb = beforem.indexOf(' ');
                        while (spaceb > -1) {
                          beforem = beforem.substring(spaceb+1);
                          spaceb = beforem.indexOf(' ');
                        }
                        spacea = afterm.indexOf(' ');
                        aftermex = spacea == -1 ? afterm : afterm.substring(0,spacea);
                        tempexword[d].push ((beforem+gotstring+aftermex).replace(/[‘’“”]/g,'').replace(/<[^>]*>/g,''));
                      }
                      else postpara += beforem+gotstring;

                      texttomatch = texttomatch.substring(endmatch);
                      if(DPR_G.G_searchRX) startmatch = findRegEx(texttomatch,perstring);
                      else startmatch = texttomatch.indexOf(perstring)

                    }

                    postpara += afterm;
                    texttomatch = postpara;
                  }
                  else break; // missed one term
                }
                if (yesall == stringra.length)
                {
                  for(var t=0; t<tempexword.length; t++) {

                    l = tempexword[t].length;
                    for(var i=0; i<l; i++) {
                      if (/^[TPVM][0-9]\.[0-9][0-9][0-9][0-9]$/.exec(getstring)) { // page search
                        while (!/[TPVM]/.exec(tempexword[t][i].charAt(0))) {
                          tempexword[t][i] = tempexword[t][i].substring(1);
                        }
                        while (!/[0-9]/.exec(tempexword[t][i].charAt(tempexword[t][i].length-1))) {
                          tempexword[t][i] = tempexword[t][i].slice(0,-1);
                        }
                      }
                      else {
                        tempexword[t][i] = tempexword[t][i].replace(/\^e*b\^/g,'');
                        while (!DPR_G.G_uniRegExp.exec(tempexword[t][i].charAt(0)) && !/[0-9]/.exec(tempexword[t][i].charAt(0))) {
                          tempexword[t][i] = tempexword[t][i].substring(1);
                        }
                        while (!DPR_G.G_uniRegExp.exec(tempexword[t][i].charAt(tempexword[t][i].length-1)) && !/[0-9]/.exec(tempexword[t][i].charAt(tempexword[t][i].length-1))) {
                          tempexword[t][i] = tempexword[t][i].slice(0,-1);
                        }
                      }
                    }
                  }

                  texnodups = [];
                  for(var t=0; t<tempexword.length; t++) {
                    texnodups[t] = [];
                    l = tempexword[t].length;
                    for(var i=0; i<l; i++) {
                      for(var j=i+1; j<l; j++) {
                        if (tempexword[t][i] === tempexword[t][j])
                          j = ++i;
                        }
                      texnodups[t].push(tempexword[t][i]);
                    }
                    tagtitle += ('q' + texnodups[t].join('q').replace(/\"/g, 'x') + 'q').replace(/ +/g,'_');
                  }
                  for(var t=0; t<texnodups.length; t++) {
                    if(!DPR_G.exword[t]) DPR_G.exword[t] = [];
                    DPR_G.exword[t] = DPR_G.exword[t].concat(texnodups[t]);
                  }

                  finalout += '<div id='+DPR_G.countmatch + tagtitle+'><p><span><b style="color:' + DPR_G.DPR_prefs['colsel'] + '">' + DPR_G.G_nikLongName[nikaya] + (hiert == 'm' ? '' : '-'+hiert) + ' ' + bookname + '</b>';
                  var colt = 0;
                  var cola = ['colped', 'coldppn', 'colsel'];
                  if(u.length>1) {
                     finalout += ', <b style="color:' + DPR_G.DPR_prefs[cola[colt]] + '">' + DPR_translit_mod.toUni(u[sx].getElementsByTagName("h0n")[0].textContent.replace(/ *$/, "")) + '</b>';
                     colt++;
                   }
                  if(v.length>1) {
                     finalout += ', <b style="color:' + DPR_G.DPR_prefs[cola[colt]] + '">' + DPR_translit_mod.toUni(v[sy].getElementsByTagName("h1n")[0].textContent.replace(/ *$/, "")) + '</b>';
                     colt++;
                   }
                  if(w.length>1) {
                     finalout += ', <b style="color:' + DPR_G.DPR_prefs[cola[colt]] + '">' + DPR_translit_mod.toUni(w[sz].getElementsByTagName("h2n")[0].textContent.replace(/ *$/, "")) + '</b>';
                     colt++;
                   }

                  if(x.length>1) {
                    if(colt == 3) colt = 0;
                     finalout += ', <b style="color:' + DPR_G.DPR_prefs[cola[colt]] + '">' + DPR_translit_mod.toUni(x[s].getElementsByTagName("h3n")[0].textContent.replace(/ *$/, "")) + '</b>';
                     colt++;
                   }
                  if(y.length>1) {
                    if(colt == 3) colt = 0;
                    finalout += ', <b style="color:' + DPR_G.DPR_prefs[cola[colt]] + '">' + DPR_translit_mod.toUni(y[se].getElementsByTagName("h4n")[0].textContent.replace(/ *$/, "")) + '</b>';
                     colt++;
                   }
                  finalout += '</span>, para. ' + (tmp + 1) + ' <span class="abut obut" onmouseup="openPlace([\''+nikaya+'\',' + (book - 1) + ',' + sx + ',' + sy + ',' + sz + ',' + s + ',' + se + ',\''+hiert+'\'],' + (tmp+1) + ',\'' + sraout + '\',eventSend(event))">&rArr;</span></span></p><p>' + preparepali(DPR_Chrome.getPrimarySectionId(),postpara,1)[0] + '</p><hr></div>';

                  match = 1;
                  DPR_G.thiscount++;
                  DPR_G.countmatch++;
                }
                yesall = 0;
              }
              else // single search term
              {

                tempexword = [];

                if(DPR_G.G_searchRX) startmatch = findRegEx(texttomatch,getstring);
                else startmatch = texttomatch.indexOf(getstring)

                postpara = '';
                if (startmatch >= 0)
                {
                  while (startmatch >= 0)
                  {
                    match = 1;
                    if(DPR_G.G_searchRX) gotstring = texttomatch.match(getRegExtSearchString(getstring))[0];
                    else gotstring = getstring;
                    endmatch = startmatch + gotstring.length;
                    beforem = texttomatch.substring(0,startmatch);
                    if (/^[TPVM][0-9]\.[0-9][0-9][0-9][0-9]$/.exec(getstring)) {  // page search
                        beforem = beforem.substring(0,beforem.length - 3);
                        endmatch += 4;
                    }
                    afterm = texttomatch.substring(endmatch,texttomatch.length);
                    postpara += beforem + (gotstring.charAt(0) == ' ' ? ' ' : '') + '<c0>' + gotstring.replace(/^ /g, '').replace(/ $/g, '').replace(/(.) (.)/g, "$1<xc> <c0>$2") + '<xc>' + (gotstring.charAt(gotstring.length-1) == ' ' ? ' ' : '');
                    texttomatch = texttomatch.substring(endmatch);

                    if(DPR_G.G_searchRX) startmatch = findRegEx(texttomatch,getstring);
                    else startmatch = texttomatch.indexOf(getstring)

                    // get words
                    spaceb = beforem.indexOf(' ');
                    if (gotstring.charAt(0) != ' ') {
                      while (spaceb > -1) {
                        beforem = beforem.substring(spaceb+1);
                        spaceb = beforem.indexOf(' ');
                      }
                    }
                    else { beforem = ''; }
                    if (gotstring.charAt(gotstring.length-1) != ' ') {
                      spacea = afterm.indexOf(' ');
                      aftermex = spacea == -1 ? afterm : afterm.substring(0,spacea);
                    }
                    else {
                      aftermex = '';
                      postpara += ' ';
                    }
                                      //window.dump(beforem+gotstring+aftermex);
                    tempexword.push((beforem+gotstring+aftermex).replace(/[‘’“”]/g,''));
                  }


                  postpara += afterm;

                  // word add

                  l = tempexword.length;

                  if (/^[TPVM][0-9]\.[0-9][0-9][0-9][0-9]$/.exec(getstring)) { // not page search
                    for(var i=0; i<l; i++) {
                      while (!/[TPVM]/.exec(tempexword[i].charAt(0))) {
                        tempexword[i] = tempexword[i].substring(1);
                      }
                      while (!/[0-9]/.exec(tempexword[i].charAt(tempexword[i].length-1))) {
                        tempexword[i] = tempexword[i].slice(0,-1);
                      }
                    }
                  }
                  else {
                    for(var i=0; i<l; i++) {
                      tempexword[i] = tempexword[i].replace(/\^e*b\^/g,'');
                      while (!DPR_G.G_uniRegExp.exec(tempexword[i].charAt(0)) && !/[0-9]/.exec(tempexword[i].charAt(0))) {
                        tempexword[i] = tempexword[i].substring(1);
                      }
                      while (!DPR_G.G_uniRegExp.exec(tempexword[i].charAt(tempexword[i].length-1)) && !/[0-9]/.exec(tempexword[i].charAt(tempexword[i].length-1))) {
                        tempexword[i] = tempexword[i].slice(0,-1);
                      }
                    }
                  }

                  texnodups = [];
                  for(var i=0; i<l; i++) {
                    for(var j=i+1; j<l; j++) {
                      if (tempexword[i] === tempexword[j]) { j = ++i; }
                    }
                    texnodups.push(tempexword[i]);
                  }
                  tagtitle = 'q' + texnodups.join('q') + 'q';
                  tagtitle = tagtitle.replace(/\"/g, 'x').replace(/ +/g,'_');

                  DPR_G.exword = DPR_G.exword.concat(texnodups);



                  // titles

                  finalout += '<div id='+DPR_G.countmatch + tagtitle+'><p><span><b style="color:' + DPR_G.DPR_prefs['colsel'] + '">' + DPR_G.G_nikLongName[nikaya] + (hiert == 'm' ? '' : '-'+hiert) + ' ' + bookname + '</b>';
                  var colt = 0;
                  var cola = ['colped', 'coldppn', 'colsel'];
                  if(u.length>1) {
                     finalout += ', <b style="color:' + DPR_G.DPR_prefs[cola[colt]] + '">' + DPR_translit_mod.toUni(u[sx].getElementsByTagName("h0n")[0].textContent.replace(/ *$/, "")) + '</b>';
                     colt++;
                   }
                  if(v.length>1) {
                     finalout += ', <b style="color:' + DPR_G.DPR_prefs[cola[colt]] + '">' + DPR_translit_mod.toUni(v[sy].getElementsByTagName("h1n")[0].textContent.replace(/ *$/, "")) + '</b>';
                     colt++;
                   }
                  if(w.length>1) {
                     finalout += ', <b style="color:' + DPR_G.DPR_prefs[cola[colt]] + '">' + DPR_translit_mod.toUni(w[sz].getElementsByTagName("h2n")[0].textContent.replace(/ *$/, "")) + '</b>';
                     colt++;
                   }
                  if(x.length>1) {
                    if(colt == 3) colt = 0;
                     finalout += ', <b style="color:' + DPR_G.DPR_prefs[cola[colt]] + '">' + DPR_translit_mod.toUni(x[s].getElementsByTagName("h3n")[0].textContent.replace(/ *$/, "")) + '</b>';
                     colt++;
                   }
                  if(y.length>1) {
                    if(colt == 3) colt = 0;
                    finalout += ', <b style="color:' + DPR_G.DPR_prefs[cola[colt]] + '">' + DPR_translit_mod.toUni(y[se].getElementsByTagName("h4n")[0].textContent.replace(/ *$/, "")) + '</b>';
                   }
                  if(hiert == 'm') {
                    var modt = '';
                    var modn;
                    var modno = DPR_navigation_common_mod.getSuttaNumber(nikaya,(parseInt(book)-1),sx,sy,sz,s,se,hiert,z.length);
                    finalout +=  (modno ? ' (<b class="small" style="color:'+DPR_G.DPR_prefs['colsel']+'">' + DPR_G.G_nikLongName[nikaya] + (hiert == 'm' ? '' : '-'+hiert) + '&nbsp;' + modno + '</b>)' : '');
                  }


                  // paragraph
                  finalout += ', para. ' + (tmp + 1) + ' <span class="abut obut" onmouseup="openPlace([\''+nikaya+'\',' + (book - 1) + ',' + sx + ',' + sy + ',' + sz + ',' + s + ',' + se + ',\''+hiert+'\'],' + (tmp+1) + ',\'' + sraout + '\',eventSend(event))">&rArr;</span></span></p><p>' + preparepali(DPR_Chrome.getPrimarySectionId(),postpara,1)[0] + '</p><hr></div>';

                  // mumble mumble

                  DPR_G.thiscount++;
                  DPR_G.countmatch++;
                  var cmval = '';

                }
              }
            }
            nummatch = 0;
          }
        }
      }
    }
  }
  if (match == 0) {
  }
  else {
    if (DPR_G.count == 3) {
      document.getElementById('sbfb').appendChild(document.createElement('hr'));
    }
    // make word table

    if(yesplus >= 0) { // multiple words

      exnodups = [];
      dups = [];

      exwordout = '<table width=100%><tr>';

      for(var t=0; t<DPR_G.exword.length; t++) {
        l = DPR_G.exword[t].length;
        exnodups[t] = [];
        for(var i=0; i<l; i++) {
          for(var j=i+1; j<l; j++) {
            if (DPR_G.exword[t][i] === DPR_G.exword[t][j]) {
              dupsx = DPR_G.exword[t][i];
              if (dups[dupsx]) dups[dupsx]++;
              else dups[dupsx] = 1;
              j = ++i;
            }
          }
          exnodups[t].push(DPR_G.exword[t][i]);
          dupsx = DPR_G.exword[t][i];
          if (dups[dupsx]) dups[dupsx]++;
          else dups[dupsx] = 1;
        }
        exnodups[t] = DPR_sortaz_mod.sortaz(exnodups[t]);
        exwordout += '<td valign="top">';
        for (var ex = 0; ex < exnodups[t].length; ex++)
        {
          exwordout += `<div>${createTdForMatch(dups, exnodups[t][ex])}</div>`;
        }
        exwordout += '</td>';
      }
    }
    else { // single search term

      exnodups = [];
      dups = [];
      l = DPR_G.exword.length;
      for(var i=0; i<l; i++) {
        for(var j=i+1; j<l; j++) {
          if (DPR_G.exword[i] === DPR_G.exword[j]) {
            dupsx = DPR_G.exword[i];
            if (dups[dupsx]) dups[dupsx]++;
            else dups[dupsx] = 1;
            j = ++i;
          }
        }
        exnodups.push(DPR_G.exword[i]);
        dupsx = DPR_G.exword[i];
        if (dups[dupsx]) dups[dupsx]++;
        else dups[dupsx] = 1;
      }
      exnodups = DPR_sortaz_mod.sortaz(exnodups);

      findiv = Math.ceil((exnodups.length)/2);

      exwordout = '<table width=100%>';

      for (var ex = 0; ex < findiv; ex++)
      {
        exwordout += `<tr><td>${createTdForMatch(dups, exnodups[ex])}</td><td>${createTdForMatch(dups, exnodups[findiv + ex])}</td></tr>`;
      }
      exwordout += '</table>';
    }

    exwordNode.innerHTML = exwordout;
    $('#sbfab').html('');
    document.getElementById('sbfab').appendChild(exwordNode);
    outNode.innerHTML = finalout;
    document.getElementById('sbfb').appendChild(outNode);
  }
  match = 0;
}

function normalizeLongSearchResult(match) {
  const maxLength = 25;
  return match.length >= maxLength ? `${match.substring(0, maxLength)}...` : match;
}

function showonly(string) {

  var da = document.getElementById('sbfb').getElementsByTagName('div');
  if (string == 'xyz') {
    for (var x = 0; x < da.length; x++) {
      da[x].style.display = "block";
    }
    document.getElementById('showing').style.display = 'none';
    DPR_move_mod.scrollToId('search',0);
  }
  else {
    string = string.replace(/ +/g,'_')
    for (var x = 0; x < da.length; x++) {
      if ((da[x].id.indexOf('q' + string + 'q') > -1 || !da[x].id) && da[x].id!='xyz') da[x].style.display = "block";
      else da[x].style.display = "none";
    }
    const linkText = normalizeLongSearchResult(DPR_translit_mod.toUni(string.replace(/xn/g,'"n').replace(/_/g,' ')));
    $('#showing').html('<b style="color:'+DPR_G.DPR_prefs['colped']+'">' + linkText + '&nbsp;</b><b>x</b>');
    document.getElementById('showing').style.display = 'block';
    DPR_move_mod.scrollToId('search','sbfb');
  }
}

function atiPause(getstring) {
  if(typeof(DPR_G.atiD) != 'undefined') {
    atiSearchOffline(0,getstring);
  }
  else {
    setTimeout(function(){atiPause(getstring)},10);
  }
}

async function atiSearchStart() {

  document.getElementById('sbfb').appendChild(DPR_G.pleasewait);

  var getstring = DPR_G.G_searchString;

  var atiurl = (DPR_G.DPR_prefs['catioff'] ? 'file://' + DPR_G.DPR_prefs['catiloc'].replace(/\\/g,'/')+'/html/' : 'http://www.accesstoinsight.org/');

  if(DPR_G.DPR_prefs['catioff']) {
    //var newScript = 'file://'+ DPR_G.DPR_prefs['catiloc'].replace(/\\/g,'/') + '/html/_dpr/digital_pali_reader_suttas.js';
    //await DPR_PAL.addJS([newScript]);
    await DPR_PAL.addJS(['ati_list']);

//    $('#stfb').html('<table><tr id="atiNiks"><td width=1><a href="javascript:void(0)" onclick="this.blur(); stopsearch = 1" title="click to stop search"><img id="stfstop" src="images/stop.png" width=25></a></td><td><a href="http://www.accesstoinsight.org" title="Access To Insight Website"><img src="'+atiurl+'favicon.ico"> ATI</a> full-text search for <b style="color:'+DPR_G.DPR_prefs['colped']+'">'+getstring+'</b> (off-line): </td></tr></table>');
    DPR_search_mod.makeProgressTable(DPR_G.G_searchSet.length);

    var thisterm = DPR_G.MD.createElement('toolbarbutton');
    thisterm.setAttribute('id','search-term');
    thisterm.setAttribute('onmouseup','scrollSearch()');
    thisterm.setAttribute('class','search-set');

    var setlabel = DPR_G.MD.createElement('label');
    setlabel.setAttribute('value',(DPR_G.G_searchRX?DPR_G.G_searchString:DPR_translit_mod.toUni(DPR_G.G_searchString)));
    setlabel.setAttribute('id','search-term');
    setlabel.setAttribute('crop','center');
    setlabel.setAttribute('class','search-button-label');

    thisterm.appendChild(setlabel);

    var tsep = DPR_G.MD.createElement('toolbarseparator');

    DPR_G.MD.getElementById('search-sets').appendChild(thisterm);
    DPR_G.MD.getElementById('search-sets').appendChild(tsep);
    for (var i = 0; i < DPR_G.G_numberToNik.length; i++) {
      if (DPR_G.G_searchSet.indexOf(DPR_G.G_numberToNik[i]) == -1) continue; // don't add unchecked collections

      var thisset = DPR_G.MD.createElement('toolbarbutton');
      thisset.setAttribute('class','search-set');
      thisset.setAttribute('onmouseup','scrollSearch(\'sbfN'+DPR_G.G_numberToNik[i]+'\')');

      var setlabel = DPR_G.MD.createElement('label');
      setlabel.setAttribute('value',DPR_G.G_nikLongName[DPR_G.G_numberToNik[i]]+': 0');
      setlabel.setAttribute('id','matches'+DPR_G.G_numberToNik[i]);
      setlabel.setAttribute('class','search-button-label');

      thisset.appendChild(setlabel);

      var sep = DPR_G.MD.createElement('toolbarseparator');

      DPR_G.MD.getElementById('search-sets').appendChild(thisset);
      if(i < DPR_G.G_searchSet.length)
        DPR_G.MD.getElementById('search-sets').appendChild(sep);
    }

    $('#stfc').html('');
    $('#sbfab').html('<div id="dictList"><p class="huge">Matched Suttas:</p></div><hr class="thick">');
    $('#sbfb').html('<p class="huge">Detailed Results:</p>');

    atiPause(getstring);
    return;
  }

  var bannerDiv = document.createElement('div');
  bannerDiv.innerHTML = '<img style="vertical-align:middle" src="'+atiurl+'favicon.ico" title="Search courtesy of http://www.accesstoinsight.org/" onclick="window.open(\'http://www.accesstoinsight.org/\')">&nbsp;<a href="http://www.accesstoinsight.org/" target="_blank" style="color:blue">AccessToInsight.org</a> search for <b>'+getstring+'</b>:<br><br>';

  document.getElementById('stfb').appendChild(bannerDiv);

  getstring = getstring.replace(/^  */g, '').replace(/  *$/g, '').replace(/  */g, '%2B');

  var outNode = document.createElement('iframe');
  outNode.setAttribute('frameBorder','0');
  outNode.setAttribute('width','100%');
  outNode.setAttribute('height',document.getElementById('sbfbc').offsetHeight);
  outNode.setAttribute('src','http://www.google.com/cse?cx=015061908441090246348%3Aal1bklhbjbi&cof=FORID%3A9%3BNB%3A1&ie=UTF-8&q='+getstring+'+more:suttas_only&sa=Search&ad=w9&num=10');
  $('#sbfb').html('');
  document.getElementById('sbfb').appendChild(outNode);
}


function atiSearchOffline(d, getstring) {
  DPR_search_mod.updateProgressBar();

  var nikA = ['d','m','s','a','k'];
  while (DPR_G.G_searchSet.indexOf(nikA[d]) == -1) {
    d++;
    if(d == nikA.length) { // end
      DPR_move_mod.scrollToId('search',0);
      return;
    }
  }

  var nik = nikA[d];
  var finalout = '';

  var listout = '';

  var counta = [];


  var finalout = '';
  var listout = '';
  var count = 0;
  var buffer = 30; // number of letters to add before and after the match

  var anik;
  switch(nik) {
    case "d":
      anik = DPR_G.atiD;
      break;
    case "m":
      anik = DPR_G.atiM;
      break;
    case "s":
      anik = DPR_G.atiS;
      break;
    case "a":
      anik = DPR_G.atiA;
      break;
    case "k":
      anik = DPR_G.atiK;
      break;
  }

  for (var c = 0; c < anik.length; c++) {
    var atiloc = DPR_G.DPR_prefs['catiloc'];
    if(/\\/.exec(atiloc)) { // windows
      var atiFile = atiloc + '\\html\\tipitaka\\';
    }
    else { // the rest of us
       var atiFile = atiloc + '/html/tipitaka/';
    }
    var cont = DPR_io_mod.readExtFile(atiFile+anik[c]).join('\n');
    var parser=new DOMParser();
    var xmlDoc = parser.parseFromString(cont,'text/xml');
    var title = DPR_translit_mod.toUni(xmlDoc.getElementsByTagName('title')[0].textContent);
    var data = xmlDoc.getElementsByTagName('div');
    for (var j in data) {
      if(data[j].id == 'H_content') {
      var texttomatch = data[j].textContent;
        if(DPR_G.G_searchRX) startmatch = texttomatch.search(getstring);
        else startmatch = texttomatch.indexOf(getstring)
        postpara = '';
        if (startmatch >= 0)
        {
          listout += '<a href="javascript:void(0)" onclick="DPR_move_mod.scrollToId(\'search\',\'atio'+nik+c+'\')" style="color:'+DPR_G.DPR_prefs['colsel']+'" title="show results in sutta">' + title + '</a>&nbsp;<a class="small green" href="file://'+DPR_G.DPR_prefs['catiloc'].replace(/\\/g,'/')+'/html/tipitaka/'+anik[c]+'" target="_blank" title="open sutta">&rArr;</a><br/>';
          while (startmatch >= 0)
          {
            count++;
            if(DPR_G.G_searchRX) gotstring = texttomatch.match(getstring)[0];
            else gotstring = getstring;
            var endmatch = startmatch + gotstring.length;

            var buffers = buffer;
            var buffere = buffer;

            while(startmatch-buffers > 0) { // get first space before buffer
              if(texttomatch.charAt(startmatch-buffers-1) == ' ') break;
              buffers--;
            }
            while(endmatch+buffere < texttomatch.length) { // get first space before buffer
              if(texttomatch.charAt(endmatch+buffere) == ' ') break;
              buffere++;
            }
            beforem = '... '+texttomatch.substring(startmatch-buffers,startmatch);
            afterm = texttomatch.substring(endmatch,endmatch+buffere) + ' ...';
            postpara += beforem + '<c0>' + gotstring.replace(/(.) (.)/g, "$1<xc> <c0>$2") + '<xc>' + afterm + '<br/>';
            texttomatch = texttomatch.substring(endmatch);
            startmatch = texttomatch.search(getstring);
          }

          postpara = postpara.replace(/<c0>/g, '<span style="color:'+DPR_G.DPR_prefs['colped']+'">').replace(/<xc>/g, '</span>');
          finalout += '<div id=atio'+nik+c+'><p><br><b><a class="green" href="file://'+DPR_G.DPR_prefs['catiloc'].replace(/\\/g,'/')+'/html/tipitaka/'+anik[c]+'" target="_blank" title="open sutta">'+title+'</a></b> <a href="javascript:void(0)" onclick="DPR_move_mod.scrollToId(\'search\',0);" class="small" style="color:'+DPR_G.DPR_prefs['coldppn']+'">top</a></p><p>' + postpara + '</p></div>';
        }
      }
    }
  }

  var titleNode = document.createElement('div');
  titleNode.setAttribute('id','atiT'+nik);
  titleNode.innerHTML = '<hr><span class="huge">'+nik+'</span>';
  document.getElementById('sbfb').appendChild(titleNode);

  var titleNode2 = document.createElement('div');
  titleNode2.setAttribute('id','atiL'+nik);
  titleNode2.innerHTML = '<hr><b>'+nik+'</b>';
  document.getElementById('dictList').appendChild(titleNode2);


  // word list
  var listNode = document.createElement('div');
  listNode.innerHTML = (count > 0 ? listout : '<i>no match</i>');
  document.getElementById('dictList').appendChild(listNode);

  var cellNode = document.createElement('td');
  cellNode.innerHTML = '<a class="green" href="javascript:void(0)"'+(count > 0 ? ' onclick="DPR_move_mod.scrollToId(\'dif\',\'atiL'+nik+'\')"' : '')+'>'+DPR_G.G_nikLongName[nik] + '</a>: ' + count + '; ';

  var val = DPR_G.MD.getElementById('matches'+nikA[d]).getAttribute('value').replace(/: .+/,': ');
  DPR_G.MD.getElementById('matches'+nikA[d]).setAttribute('value',val+count);



  var outNode = document.createElement('div');
  outNode.innerHTML = (count > 0 ? finalout : '<i>no match</i>');
  document.getElementById('atiT'+nik).appendChild(outNode);

  if(DPR_G.stopsearch == 1) {
    DPR_move_mod.scrollToId('search',0);
    return;
  }


  if(++d == nikA.length) {
    DPR_move_mod.scrollToId('search',0);
    return;
  }

  setTimeout(function () { atiSearchOffline(d,getstring) }, 10);
}

function findRegEx(text,string) {
  var rstring = new RegExp(DPR_translit_mod.toUniRegEx(string));
  var bstring = getRegExtSearchString(string);
  //alert(bstring);
  var match = text.search(bstring);

  //if(match > -1 && string.indexOf("\\b") > -1 && (text.search(bstring) == -1 || text.search(bstring) > match)) {
  //  match = -1;
  //}
  return match
}
function getRegExtSearchString(string) {
  return new RegExp(DPR_translit_mod.toUniRegEx(string).replace(/\\b/g,"([^AIUEOKGCJTDNPBMYRLVSHaiueokgcjtdnpbmyrlvshāīūṭḍṅṇṁṃñḷĀĪŪṬḌṄṆṀṂÑḶ]|^|$)"));
}

