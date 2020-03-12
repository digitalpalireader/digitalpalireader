// xul buttons: accept, cancel, help, open, save, find, clear, yes, no, apply, close, print, add, remove, refresh, go-forward, go-back, properties, select-font, select-color, network

var MD = DPR_PAL.contentDocument;
var MW = DPR_PAL.contentWindow;

var G_searchStartTime;

var G_searchType;
var G_searchString;
var G_searchMAT;
var G_searchSet;
var G_searchBook;
var G_searchPart;
var G_searchRX;
var G_searchLink;

function searchTipitaka(searchType,searchString,searchMAT,searchSet,searchBook,searchPart,searchRX) {
  DPR_PAL_Search_ShowCancelButton();
  DPR_PAL_Search_ShowProgressBar();

  DPR_PAL_Search_InitializeSectionLinks();

  DPR_PAL_Search_RemoveCopyPermaLinkElement();

  var element = MD.getElementById("finished");
  while(element.hasChildNodes()){
    element.removeChild(element.firstChild);
  }

  clearDivs('search');
  resetvalues();
  if(searchString) { // update url
    G_searchType = searchType;
    G_searchString = searchString;
    G_searchMAT = searchMAT;
    G_searchSet = searchSet;
    G_searchBook = ','+searchBook+',';
    G_searchPart = searchPart;
    G_searchRX = searchRX;

    var permalink = 'chrome://digitalpalireader/content/search.xul' + '?type='+searchType+'&query=' + toVel(searchString) + '&MAT=' + searchMAT + '&set=' + searchSet + '&book=' + searchBook + '&part=' + searchPart + '&rx=' + searchRX;

    try {
      MW.history.replaceState('Object', 'Title', permalink);
    }
    catch(ex) {
    }
  }
  else {
    // get options from URL

    var options = MD.location.href.split('?')[1].split('#')[0].split('&');

    // parse options
    for (i in options) {

      var option = options[i].split('=');
      switch(option[0]) {
        case 'type':
          G_searchType = parseInt(option[1]);
        break;
        case 'query':
          G_searchString = decodeURIComponent(option[1]);
        break;
        case 'MAT':
          G_searchMAT = option[1];
        break;
        case 'set':
          G_searchSet = option[1];
        break;
        case 'book':
          G_searchBook = ','+option[1]+','; // add commas so each will be findable with comma at end and beginning
        break;
        case 'part':
          G_searchPart = option[1];
        break;
        case 'rx':
          G_searchRX = (option[1] == 'true');
        break;
      }
    }
  }

  if(!G_searchString) {
    var check = {value: false};                  // default the checkbox to false
    var input = {value: ''};
    var result = G_prompts.prompt(null, "Enter Query", "Enter query for custom search:", input, null, check);
    if(!result)
      return;
    if(!input.value)
      return;
    G_searchString = input.value;
  }

  var st = [];
  var matst = [];
  for (i in G_searchMAT) matst.push(G_searchMAT[i]);

  st[0] = 'Multiple Sets';
  st[1] = G_nikLongName[G_searchSet] + ' Books';
  st[2] = G_nikLongName[G_searchSet] + ' ' + G_searchBook.slice(1,-1);
  st[3] = G_nikLongName[G_searchSet] + ' ' + G_searchBook.slice(1,-1) + ' (partial)';
  st[5] = 'ATI Translations';

  if(G_searchType == 0 && /\|/.test(G_searchBook)) // custom search
    st[0]+=' (custom)';


  // tab title

  var tabT = 'Search: \'' + (G_searchRX?toUniRegEx(G_searchString):toUni(G_searchString)) + '\' in ' + st[G_searchType];

  DPR_PAL_Search_SetTitle(tabT);

  if (/^[TPVMtpvm][0-9]\.[0-9][0-9][0-9][0-9]$/.exec(G_searchString)) {  // page search
    G_searchString = G_searchString.toUpperCase();
  }
  else if(G_searchType != 5) {
    G_searchString = G_searchString.toLowerCase();
  }


  switch(G_searchType) {
    case 0:
      pausesall();
    break;
    case 1:
      pausetwo();
    break;
    case 2:
    case 3:
      pausethree();
    break;
    case 5: // ATI
      atiSearchStart();
    break;
  }

}

function stopSearch() {
  stopsearch = 1;
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
  G_searchFileArray = [];
  exword.length=0;
  stopsearch = 0;
  bookperm = 1;
  rescount = -1;
  qz = 0;
  nikayaat = '';
  newnikaya = '';
  nikcount = 0;
  thiscount = 0;
  bookfile = '';
  countmatch = 0;
}

function finishSearch() {
  document.getElementById('sbfbc').scrollTop = 0;

  DPR_PAL_Search_HideProgressBar();
  DPR_PAL_Search_HideCancelButton();

  const searchLink = 'dpr:search?type='+G_searchType+'&query=' + toVel(G_searchString) + '&MAT=' + G_searchMAT + '&set=' + G_searchSet + '&book=' + G_searchBook.slice(1,-1) + '&part=' + G_searchPart + '&rx=' + G_searchRX;
  G_searchLink = DPR_PAL.normalizeDprSchemeUri(searchLink);

  DPR_PAL_Search_AddCopyPermaLinkElement();

  // fix plural

  if(MD.getElementById('inter')) {
    DPR_PAL_Search_FixPluralInSearchTermSectionInfo()
  }

}

var G_searchFileArray = [];

var bookfile = '';
var count = 0;
var bookload = '';
var nikayaat = '';
var bookat = '';
var first = 0;
var buffer = '';
var nextbookfile = '';
var rescount = -1;
var resultcount = new Array();
var thiscount = 0;

var stopsearch = 0;

var filelistat = 0;

var newnikaya = '';
var nikcount =0;
var qz = 0;

var nikperm = 0;
var bookperm = 1;

var exword = new Array();
var countmatch = 0;

function DPR_PAL_Search_ClearSearchResults() {
  $('#sbfab').html('');
  if (DPR_PAL.isXUL) {
    $('#sbfb').html('<hr>');
  }
}

function pausesall()
{
  // make G_searchFileArray
  var which = G_searchType;

  if(/\|/.test(G_searchBook)) { // custom search
    G_searchBook = G_searchBook.replace(/\|/g,',|,');
    var cbooks = G_searchBook.split('|');
    var cniks = [];
    for(i in G_searchSet) {
      cniks[G_searchSet[i]] = i;
    }
  }

  for(w in G_XMLFileArray) {
    if (G_searchSet.indexOf(w.charAt(0)) == -1) continue; // don't add unchecked collections

    for (x = 0; x < 3; x++) {
      if(G_searchMAT.indexOf(G_hLetters[x]) > -1 && G_XMLFileArray[w][x] == 1) { // this hier is checked and the file exists in this hier
        if(cbooks && cbooks[cniks[w.charAt(0)]] && cbooks[cniks[w.charAt(0)]].indexOf(','+w.substring(1)+',') == -1) continue; // skip unspecified books for custom search

        G_searchFileArray.push(w+G_hLetters[x]);
      }
    }
  }

  if(G_searchFileArray.length == 0) {
    alert('No books in selection');
    return;
  }

  var getstring = G_searchString;

  DPR_PAL_Search_ClearSearchResults();

  DPR_PAL_SearchAddSearchTermSectionLink(G_searchRX ? G_searchString : toUni(G_searchString));

  for (i = 0; i < G_numberToNik.length; i++) {
    if (G_searchSet.indexOf(G_numberToNik[i]) == -1) continue; // don't add unchecked collections
    DPR_PAL_Search_AddSectionLink();
  }

  DPR_PAL_Search_MakeProgressTable(G_searchFileArray.length - 1);

  importXMLs(1);
}

function pausetwo() { // init function for single collection

  // make G_searchFileArray
  var which = G_searchType;
  var nikaya = G_searchSet;

  for(w in G_XMLFileArray) {
    if (w.charAt(0) != nikaya) continue; // only this collection
    if (G_searchBook.indexOf(','+w.substring(1)+',') == -1) continue; // skip unchecked books

    for (x = 0; x < 3; x++) {
      if(G_searchMAT.indexOf(G_hLetters[x]) > -1 && G_XMLFileArray[w][x] == 1) { // this hier is checked and the file exists in this hier
        G_searchFileArray.push(w+G_hLetters[x]);
      }
    }
  }

  if(G_searchFileArray.length == 0) {
    alert('No books in selection');
    return;
  }

  DPR_PAL_Search_MakeProgressTable(G_searchFileArray.length - 1);

  var getstring = G_searchString;

  DPR_PAL_Search_ClearSearchResults();

  DPR_PAL_Search_AddSearchTermSectionInfo(G_nikLongName[nikaya]);

  importXMLs(2);
}

function pausethree() {

  var which = G_searchType;
  var nikaya = G_searchSet;
  var book = G_searchBook.slice(1,-1);

  var nikbook = nikaya+book;
  var getstring = G_searchString;
  if(which == 2) { // single book, multiple hier
    for (x = 0; x < 3; x++) {
      if(G_searchMAT.indexOf(G_hLetters[x]) > -1 && G_XMLFileArray[nikbook][x] == 1) { // this hier is checked and the file exists in this hier
        G_searchFileArray.push(nikbook+G_hLetters[x]);
      }
    }
  }
  else { // single book (partial)
    G_searchFileArray = [nikbook+G_searchMAT];
  }

  if(G_searchFileArray.length == 0) {
    alert('No books in selection');
    return;
  }

  DPR_PAL_Search_MakeProgressTable(G_searchFileArray.length - 1);

  DPR_PAL_Search_AddSearchTermSectionInfo(G_nikLongName[nikaya]+' '+book + (G_searchPart != '1'?' (partial)':''));

  importXMLs(3);
}

function bounce(sct)
{
  DPR_PAL_Search_UpdateProgressBar()
  setTimeout('importXMLs('+sct+')', 10)
}


function importXMLs(cnt)
{
  if (stopsearch==1) {
    finishSearch();
    return;
    }

  count = cnt;
  var bookno = 0;
  var endloop = 0;
  var yellowcount = 0;

  var getstring = G_searchString;
  var stringra = new Array();

  if (cnt == 1) // whole tipitaka or multiple collections
  {
    bookfile = G_searchFileArray[qz];
    newnikaya = bookfile.charAt(0);
    if (nikayaat != newnikaya)
    {
      const headingNode = DPR_PAL_Search_CreateSectionHeader(newnikaya);
      document.getElementById('sbfb').appendChild(headingNode);
      thiscount = 0;
      rescount++;
    }
    nikayaat = bookfile.charAt(0);
    bookat = bookfile.substring(1,bookfile.length-1);
    bookperm = bookat;
    nikperm = nikayaat;
    hiert = bookfile.charAt(bookfile.length-1);

    //devO(bookload);

    var xmlDoc = loadXMLFile(bookfile,0);

    createTables(xmlDoc,hiert);

    DPR_PAL_Search_UpdateSectionLink(nikayaat, thiscount);

    if (qz < G_searchFileArray.length-1)
    {
      nextbookfile = G_searchFileArray[qz+1];
      if (nextbookfile.charAt(0) != nikayaat) $('#stfH'+nikayaat).css('color',DPR_prefs['colsel']);
      qz++;
      bounce(1);
    }
    else {
      qz = 0;
      bookperm = 0;
      $('#stfH'+nikayaat).css('color',DPR_prefs['colsel']);
      finishSearch();
    }
  }
  else if (cnt == 2) // nikaya
  {
    var nikaya = G_searchSet;


    bookfile = G_searchFileArray[qz];
    bookat = bookfile.substring(1,bookfile.length-1);
    bookperm = bookat;
    hiert = bookfile.charAt(bookfile.length-1);

    var xmlDoc = loadXMLFile(bookfile,0);
    createTables(xmlDoc,hiert);

    DPR_PAL_Search_UpdateSearchTermSectionInfo(thiscount);

    if (qz < G_searchFileArray.length-1)
    {
      qz++;
      bounce(2);
    }
    else {
      qz = 0;
      bookperm = 0;
      thiscount = 0;
      finishSearch();
    }
  }
  else if (cnt == 3) // this book
  {
    var nikaya = G_searchSet;
    var book = G_searchBook.slice(1,-1);

    bookfile = G_searchFileArray[qz];
    hiert = bookfile.charAt(bookfile.length-1);

    var xmlDoc = loadXMLFile(bookfile,0);

    createTables(xmlDoc,hiert);

    DPR_PAL_Search_UpdateSearchTermSectionInfo(thiscount);

    if (qz < G_searchFileArray.length-1)
    {
      qz++;
      bounce(3);
    }
    else {
      qz = 0;
      thiscount = 0;
      finishSearch();
    }
  }
  document.getElementById('searchb').scrollTop = 0; //vertical scroll
  buffer = '';
  first = 0;
  nikperm = 0;


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
    var options = MD.location.href.split('?')[1].split('#')[0].split('&');
    for (i in options) {
      var option = options[i].split('=');
      switch(option[0]) {
        case 'rx':
          G_searchRX = (option[1] == 'true');
        break;
      }
    }
  }

  //alert(bookload);
  var u = xmlDoc.getElementsByTagName("h0");

  var getstring = G_searchString;

  var gotstring;
  var nikaya = G_searchSet;
  var book = G_searchBook.slice(1,-1);

  if (count == 1 || count == 2) {
    book = bookperm;
  }
  if (count == 1)
  {
    nikaya = nikperm;
  }
  var bookname = getBookName(nikaya,hiert,parseInt(book)-1);

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
    stringra = (G_searchRX?toUniRegEx(getstring):toUni(getstring)).split('+');
  }
  else {
    stringra[0] = getstring;
    if(G_searchRX) getstring = toUniRegEx(getstring);
    else getstring = toUni(getstring);
  }
  var sraout = stringra.join('#');
  sraout = sraout.replace(/"/g, '`');
  //if(G_searchRX) sraout = '/'+sraout.replace(/\\/g,'\\\\')+'/';

  var part;
  if(G_searchPart != '1') part = G_searchPart.split('.');

  for (var sx = 0; sx < u.length; sx++) // per h0
  {

    if(G_searchType == 3 && part[0] >= 0 && sx != parseInt(part[1])) continue;

    var v = u[sx].getElementsByTagName("h1");

    for (var sy = 0; sy < v.length; sy++) // per h1
    {

      if(G_searchType == 3 && part[0] >= 1 && sy != parseInt(part[2])) continue;

      var w = v[sy].getElementsByTagName("h2");

      for (var sz = 0; sz < w.length; sz++) // per h2
      {

        if(G_searchType == 3 && part[0] >= 2 && sz != parseInt(part[3])) continue;

        var x = w[sz].getElementsByTagName("h3");


        for (var s = 0; s < x.length; s++) // per h3
        {

          if(G_searchType == 3 && part[0] >= 3 && s != parseInt(part[4])) continue;

          var y = x[s].getElementsByTagName("h4");

          for (var se = 0; se < y.length; se++) // per h4
          {

            if(G_searchType == 3 && part[0] >= 4 && se != parseInt(part[5])) continue;

            var z = y[se].getElementsByTagName("p");

            for (var tmp = 0; tmp < z.length; tmp++) // per paragraph
            {

              texttomatch = z[tmp].textContent.substring(4);

              if(DPR_prefs['nigahita']) {
                texttomatch = texttomatch.replace(/ṃ/g, 'ṁ');
                texttomatch = texttomatch.replace(/Ṃ/g, 'Ṁ');
              }

              texttomatch = texttomatch.replace(/\{[^}]+\}/g, '');
              if (!/[0-9]/.exec(G_searchString)) texttomatch = texttomatch.replace(/\^a\^[^^]*\^ea\^/g, ''); // remove pesky page references unless we're searching for them.

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
                for (d = 0; d < stringra.length; d++)
                {
                  perstring = stringra[d];

                  if(G_searchRX)
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
                      if(G_searchRX) gotstring = texttomatch.match(perstring)[0];
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
                      if(G_searchRX) startmatch = findRegEx(texttomatch,perstring);
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
                        while (!G_uniRegExp.exec(tempexword[t][i].charAt(0)) && !/[0-9]/.exec(tempexword[t][i].charAt(0))) {
                          tempexword[t][i] = tempexword[t][i].substring(1);
                        }
                        while (!G_uniRegExp.exec(tempexword[t][i].charAt(tempexword[t][i].length-1)) && !/[0-9]/.exec(tempexword[t][i].charAt(tempexword[t][i].length-1))) {
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
                    if(!exword[t]) exword[t] = [];
                    exword[t] = exword[t].concat(texnodups[t]);
                  }

                  finalout += '<div id='+countmatch + tagtitle+'><p><span><b style="color:' + DPR_prefs['colsel'] + '">' + G_nikLongName[nikaya] + (hiert == 'm' ? '' : '-'+hiert) + ' ' + bookname + '</b>';
                  var colt = 0;
                  var cola = ['colped', 'coldppn', 'colsel'];
                  if(u.length>1) {
                     finalout += ', <b style="color:' + DPR_prefs[cola[colt]] + '">' + toUni(u[sx].getElementsByTagName("h0n")[0].textContent.replace(/ *$/, "")) + '</b>';
                     colt++;
                   }
                  if(v.length>1) {
                     finalout += ', <b style="color:' + DPR_prefs[cola[colt]] + '">' + toUni(v[sy].getElementsByTagName("h1n")[0].textContent.replace(/ *$/, "")) + '</b>';
                     colt++;
                   }
                  if(w.length>1) {
                     finalout += ', <b style="color:' + DPR_prefs[cola[colt]] + '">' + toUni(w[sz].getElementsByTagName("h2n")[0].textContent.replace(/ *$/, "")) + '</b>';
                     colt++;
                   }

                  if(x.length>1) {
                    if(colt == 3) colt = 0;
                     finalout += ', <b style="color:' + DPR_prefs[cola[colt]] + '">' + toUni(x[s].getElementsByTagName("h3n")[0].textContent.replace(/ *$/, "")) + '</b>';
                     colt++;
                   }
                  if(y.length>1) {
                    if(colt == 3) colt = 0;
                    finalout += ', <b style="color:' + DPR_prefs[cola[colt]] + '">' + toUni(y[se].getElementsByTagName("h4n")[0].textContent.replace(/ *$/, "")) + '</b>';
                     colt++;
                   }
                  finalout += '</span>, para. ' + (tmp + 1) + ' <span class="abut obut" onmouseup="openPlace([\''+nikaya+'\',' + (book - 1) + ',' + sx + ',' + sy + ',' + sz + ',' + s + ',' + se + ',\''+hiert+'\'],' + (tmp+1) + ',\'' + sraout + '\',eventSend(event))">&rArr;</span></span></p><p>' + preparepali(postpara,1)[0] + '</p><hr></div>';

                  match = 1;
                  thiscount++;
                  countmatch++;

                }
                yesall = 0;
              }
              else // single search term
              {

                tempexword = [];

                if(G_searchRX) startmatch = findRegEx(texttomatch,getstring);
                else startmatch = texttomatch.indexOf(getstring)
                postpara = '';
                if (startmatch >= 0)
                {
                  while (startmatch >= 0)
                  {
                    match = 1;
                                        if(G_searchRX) gotstring = texttomatch.match(getstring)[0];
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

                    if(G_searchRX) startmatch = findRegEx(texttomatch,getstring);
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
                      while (!G_uniRegExp.exec(tempexword[i].charAt(0)) && !/[0-9]/.exec(tempexword[i].charAt(0))) {
                        tempexword[i] = tempexword[i].substring(1);
                      }
                      while (!G_uniRegExp.exec(tempexword[i].charAt(tempexword[i].length-1)) && !/[0-9]/.exec(tempexword[i].charAt(tempexword[i].length-1))) {
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

                  exword = exword.concat(texnodups);



                  // titles

                  finalout += '<div id='+countmatch + tagtitle+'><p><span><b style="color:' + DPR_prefs['colsel'] + '">' + G_nikLongName[nikaya] + (hiert == 'm' ? '' : '-'+hiert) + ' ' + bookname + '</b>';
                  var colt = 0;
                  var cola = ['colped', 'coldppn', 'colsel'];
                  if(u.length>1) {
                     finalout += ', <b style="color:' + DPR_prefs[cola[colt]] + '">' + toUni(u[sx].getElementsByTagName("h0n")[0].textContent.replace(/ *$/, "")) + '</b>';
                     colt++;
                   }
                  if(v.length>1) {
                     finalout += ', <b style="color:' + DPR_prefs[cola[colt]] + '">' + toUni(v[sy].getElementsByTagName("h1n")[0].textContent.replace(/ *$/, "")) + '</b>';
                     colt++;
                   }
                  if(w.length>1) {
                     finalout += ', <b style="color:' + DPR_prefs[cola[colt]] + '">' + toUni(w[sz].getElementsByTagName("h2n")[0].textContent.replace(/ *$/, "")) + '</b>';
                     colt++;
                   }
                  if(x.length>1) {
                    if(colt == 3) colt = 0;
                     finalout += ', <b style="color:' + DPR_prefs[cola[colt]] + '">' + toUni(x[s].getElementsByTagName("h3n")[0].textContent.replace(/ *$/, "")) + '</b>';
                     colt++;
                   }
                  if(y.length>1) {
                    if(colt == 3) colt = 0;
                    finalout += ', <b style="color:' + DPR_prefs[cola[colt]] + '">' + toUni(y[se].getElementsByTagName("h4n")[0].textContent.replace(/ *$/, "")) + '</b>';
                   }
                  if(hiert == 'm') {
                    var modt = '';
                    var modn;
                    var modno = getSuttaNumber(nikaya,(parseInt(book)-1),sx,sy,sz,s,se,hiert,z.length);
                    finalout +=  (modno ? ' (<b class="small" style="color:'+DPR_prefs['colsel']+'">' + G_nikLongName[nikaya] + (hiert == 'm' ? '' : '-'+hiert) + '&nbsp;' + modno + '</b>)' : '');
                  }


                  // paragraph
                  finalout += ', para. ' + (tmp + 1) + ' <span class="abut obut" onmouseup="openPlace([\''+nikaya+'\',' + (book - 1) + ',' + sx + ',' + sy + ',' + sz + ',' + s + ',' + se + ',\''+hiert+'\'],' + (tmp+1) + ',\'' + sraout + '\',eventSend(event))">&rArr;</span></span></p><p>' + preparepali(postpara,1)[0] + '</p><hr></div>';

                  // mumble mumble

                  thiscount++;
                  countmatch++;
                  cmval = '';

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
    if (count == 3) {
      document.getElementById('sbfb').appendChild(document.createElement('hr'));
    }
    // make word table

    if(yesplus >= 0) { // multiple words

      exnodups = [];
      dups = [];

      exwordout = '<table width=100%><tr>';

      for(var t=0; t<exword.length; t++) {
        l = exword[t].length;
        exnodups[t] = [];
        for(var i=0; i<l; i++) {
          for(var j=i+1; j<l; j++) {
            if (exword[t][i] === exword[t][j]) {
              dupsx = exword[t][i];
              if (dups[dupsx]) dups[dupsx]++;
              else dups[dupsx] = 1;
              j = ++i;
            }
          }
          exnodups[t].push(exword[t][i]);
          dupsx = exword[t][i];
          if (dups[dupsx]) dups[dupsx]++;
          else dups[dupsx] = 1;
        }
        exnodups[t] = sortaz(exnodups[t]);
        exwordout += '<td valign="top">';
        for (ex = 0; ex < exnodups[t].length; ex++)
        {
          exwordout += `<div>${createTdForMatch(dups, exnodups[t][ex])}</div>`;
        }
        exwordout += '</td>';
      }
    }
    else { // single search term

      exnodups = [];
      dups = [];
      l = exword.length;
      for(var i=0; i<l; i++) {
        for(var j=i+1; j<l; j++) {
          if (exword[i] === exword[j]) {
            dupsx = exword[i];
            if (dups[dupsx]) dups[dupsx]++;
            else dups[dupsx] = 1;
            j = ++i;
          }
        }
        exnodups.push(exword[i]);
        dupsx = exword[i];
        if (dups[dupsx]) dups[dupsx]++;
        else dups[dupsx] = 1;
      }
      exnodups = sortaz(exnodups);

      findiv = Math.ceil((exnodups.length)/2);

      exwordout = '<table width=100%>';

      for (ex = 0; ex < findiv; ex++)
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
    for (x = 0; x < da.length; x++) {
      da[x].style.display = "block";
    }
    document.getElementById('showing').style.display = 'none';
    scrollToId('search',0);
  }
  else {
    string = string.replace(/ +/g,'_')
    for (x = 0; x < da.length; x++) {
      if ((da[x].id.indexOf('q' + string + 'q') > -1 || !da[x].id) && da[x].id!='xyz') da[x].style.display = "block";
      else da[x].style.display = "none";
    }
    const linkText = normalizeLongSearchResult(toUni(string.replace(/xn/g,'"n').replace(/_/g,' ')));
    $('#showing').html('<b style="color:'+DPR_prefs['colped']+'">' + linkText + '&nbsp;</b><b>x</b>');
    document.getElementById('showing').style.display = 'block';
    scrollToId('search','sbfb');
  }
}

function atiPause(getstring) {
  if(typeof(atiD) != 'undefined') {
    atiSearchOffline(0,getstring);
  }
  else {
    setTimeout(function(){atiPause(getstring)},10);
  }
}

function atiSearchStart() {

  document.getElementById('sbfb').appendChild(pleasewait);

  var getstring = G_searchString;

  var atiurl = (DPR_prefs['catioff'] ? 'file://' + DPR_prefs['catiloc'].replace(/\\/g,'/')+'/html/' : 'http://www.accesstoinsight.org/');

  if(DPR_prefs['catioff']) {
    //var newScript = 'file://'+ DPR_prefs['catiloc'].replace(/\\/g,'/') + '/html/_dpr/digital_pali_reader_suttas.js';
    //addJS([newScript]);
    addJS(['ati_list']);

//    $('#stfb').html('<table><tr id="atiNiks"><td width=1><a href="javascript:void(0)" onclick="this.blur(); stopsearch = 1" title="click to stop search"><img id="stfstop" src="images/stop.png" width=25></a></td><td><a href="http://www.accesstoinsight.org" title="Access To Insight Website"><img src="'+atiurl+'favicon.ico"> ATI</a> full-text search for <b style="color:'+DPR_prefs['colped']+'">'+getstring+'</b> (off-line): </td></tr></table>');
    DPR_PAL_Search_MakeProgressTable(G_searchSet.length);

    var thisterm = MD.createElement('toolbarbutton');
    thisterm.setAttribute('id','search-term');
    thisterm.setAttribute('onmouseup','scrollSearch()');
    thisterm.setAttribute('class','search-set');

    var setlabel = MD.createElement('label');
    setlabel.setAttribute('value',(G_searchRX?G_searchString:toUni(G_searchString)));
    setlabel.setAttribute('id','search-term');
    setlabel.setAttribute('crop','center');
    setlabel.setAttribute('class','search-button-label');

    thisterm.appendChild(setlabel);

    var tsep = MD.createElement('toolbarseparator');

    MD.getElementById('search-sets').appendChild(thisterm);
    MD.getElementById('search-sets').appendChild(tsep);
    for (i = 0; i < G_numberToNik.length; i++) {
      if (G_searchSet.indexOf(G_numberToNik[i]) == -1) continue; // don't add unchecked collections

      var thisset = MD.createElement('toolbarbutton');
      thisset.setAttribute('class','search-set');
      thisset.setAttribute('onmouseup','scrollSearch(\'sbfN'+G_numberToNik[i]+'\')');

      var setlabel = MD.createElement('label');
      setlabel.setAttribute('value',G_nikLongName[G_numberToNik[i]]+': 0');
      setlabel.setAttribute('id','matches'+G_numberToNik[i]);
      setlabel.setAttribute('class','search-button-label');

      thisset.appendChild(setlabel);

      var sep = MD.createElement('toolbarseparator');

      MD.getElementById('search-sets').appendChild(thisset);
      if(i < G_searchSet.length)
        MD.getElementById('search-sets').appendChild(sep);
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
  DPR_PAL_Search_UpdateProgressBar();

  var nikA = ['d','m','s','a','k'];
  while (G_searchSet.indexOf(nikA[d]) == -1) {
    d++;
    if(d == nikA.length) { // end
      scrollToId('search',0);
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
      anik = atiD;
      break;
    case "m":
      anik = atiM;
      break;
    case "s":
      anik = atiS;
      break;
    case "a":
      anik = atiA;
      break;
    case "k":
      anik = atiK;
      break;
  }

  for (var c = 0; c < anik.length; c++) {
    var atiloc = DPR_prefs['catiloc'];
    if(/\\/.exec(atiloc)) { // windows
      var atiFile = atiloc + '\\html\\tipitaka\\';
    }
    else { // the rest of us
       var atiFile = atiloc + '/html/tipitaka/';
    }
    var cont = readExtFile(atiFile+anik[c]).join('\n');
    var parser=new DOMParser();
    var xmlDoc = parser.parseFromString(cont,'text/xml');
    var title = toUni(xmlDoc.getElementsByTagName('title')[0].textContent);
    var data = xmlDoc.getElementsByTagName('div');
    for (j in data) {
      if(data[j].id == 'H_content') {
      var texttomatch = data[j].textContent;
        if(G_searchRX) startmatch = texttomatch.search(getstring);
        else startmatch = texttomatch.indexOf(getstring)
        postpara = '';
        if (startmatch >= 0)
        {
          listout += '<a href="javascript:void(0)" onclick="scrollToId(\'search\',\'atio'+nik+c+'\')" style="color:'+DPR_prefs['colsel']+'" title="show results in sutta">' + title + '</a>&nbsp;<a class="small green" href="file://'+DPR_prefs['catiloc'].replace(/\\/g,'/')+'/html/tipitaka/'+anik[c]+'" target="_blank" title="open sutta">&rArr;</a><br/>';
          while (startmatch >= 0)
          {
            count++;
            if(G_searchRX) gotstring = texttomatch.match(getstring)[0];
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

          postpara = postpara.replace(/<c0>/g, '<span style="color:'+DPR_prefs['colped']+'">').replace(/<xc>/g, '</span>');
          finalout += '<div id=atio'+nik+c+'><p><br><b><a class="green" href="file://'+DPR_prefs['catiloc'].replace(/\\/g,'/')+'/html/tipitaka/'+anik[c]+'" target="_blank" title="open sutta">'+title+'</a></b> <a href="javascript:void(0)" onclick="scrollToId(\'search\',0);" class="small" style="color:'+DPR_prefs['coldppn']+'">top</a></p><p>' + postpara + '</p></div>';
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
  cellNode.innerHTML = '<a class="green" href="javascript:void(0)"'+(count > 0 ? ' onclick="scrollToId(\'dif\',\'atiL'+nik+'\')"' : '')+'>'+G_nikLongName[nik] + '</a>: ' + count + '; ';

  var val = MD.getElementById('matches'+nikA[d]).getAttribute('value').replace(/: .+/,': ');
  MD.getElementById('matches'+nikA[d]).setAttribute('value',val+count);



  var outNode = document.createElement('div');
  outNode.innerHTML = (count > 0 ? finalout : '<i>no match</i>');
  document.getElementById('atiT'+nik).appendChild(outNode);

  if(stopsearch == 1) {
    scrollToId('search',0);
    return;
  }


  if(++d == nikA.length) {
    scrollToId('search',0);
    return;
  }

  setTimeout(function () { atiSearchOffline(d,getstring) }, 10);
}

function findRegEx(text,string) {
  rstring = new RegExp(toUniRegEx(string));
  bstring = new RegExp(toUniRegEx(string.replace(/\\b/g,"([^AIUEOKGCJTDNPBMYRLVSHaiueokgcjtdnpbmyrlvshāīūṭḍṅṇṁṃñḷĀĪŪṬḌṄṆṀṂÑḶ]|^|$)")));
  match = text.search(rstring);
  if(match > -1 && string.indexOf("\\b") > -1 && (text.search(bstring) == -1 || text.search(bstring) > match)) {
    match = -1;
  }
  return match
}
