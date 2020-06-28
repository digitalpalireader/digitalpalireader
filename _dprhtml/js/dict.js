'use strict';

DPR_G.G_dictType = '';
DPR_G.G_dictQuery = '';
DPR_G.G_dictOpts = []; //
DPR_G.G_dictEntry = '';
DPR_G.G_dictUnicode = false;
DPR_G.G_similar_min = 75;

function parseDictURLParameters(){
  if(document.location.href.indexOf('?') > -1){
    var options = document.location.href.split('?')[1].split('#')[0].split('&');
    for(var i = 0; i < options.length; i++) {
      var option = options[i].split('=');
      switch(option[0]) {
          case 'type':
            __dictionaryTabViewModel.type(option[1]);
            DPR_G.G_dictType = option[1];
          break;
          case 'query':
            __dictionaryTabViewModel.query(decodeURIComponent(option[1]));
            DPR_G.G_dictQuery = decodeURIComponent(option[1]);
          break;
          case 'opts':
            __dictionaryTabViewModel.options(option[1].split(','));
            DPR_G.G_dictOpts = option[1].split(',');
          break;
          case 'entry':
            __dictionaryTabViewModel.entry(decodeURIComponent(option[1]));
            DPR_G.G_dictEntry = decodeURIComponent(option[1]);
          break;
      }
    }
  }
}

async function startDictLookup(dictType,dictQuery,dictOpts,dictEntry) {

    DPR_G.G_dictEntry = '';

  if(dictType) {  // replace url
    DPR_G.G_dictType = dictType;
    DPR_G.G_dictQuery = dictQuery;
    DPR_G.G_dictOpts = dictOpts;
    DPR_G.G_dictEntry = dictEntry;

    var permalink = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/dict.htm' + '?type='+DPR_G.G_dictType+(DPR_G.G_dictQuery?'&query=' + DPR_G.G_dictQuery:'') + '&opts=' + DPR_G.G_dictOpts.join(',') + (DPR_G.G_dictEntry?'&entry=' + DPR_G.G_dictEntry:''));
    try {
      window.history.replaceState('Object', 'Title', permalink);
    }
    catch(ex) {
    }
  }

  var js =[];

  js['PED'] = ['ped'];
  js['DPPN'] = ['dppn','nameno'];
  js['CPED'] = ['/en/cped/index.js'];
  js['MULTI'] = ['ped','dppn','nameno','/en/cped/index.js'];
  js['CEPD'] = ['/en/cepd/index.js'];
  js['ATT'] = ['attlist'];
  js['TIK'] = ['tiklist'];
  js['TIT'] = ['titles','dppn','nameno'];
  js['PRT'] = ['roots','roots_link'];
  js['SKT'] = ['/sa/dict/index.js'];
  js['SKR'] = ['/sa/roots/index.js'];

  var error = addJS(js[DPR_G.G_dictType]);

  if(error)
    return alert('error loading resource: '+error[1]+'\n'+error[0]);

  DPR_G.G_dictUnicode = /[āīūṭḍṅṇṃṃñḷĀĪŪṬḌṄṆṂÑḶ]/.test(DPR_G.G_dictQuery);

  var st = [];
  st['PED'] = 'PED';
  st['DPPN'] = 'DPPN';
  st['CPED'] = 'CPED';
  st['MULTI'] = 'Multi';
  st['CEPD'] = 'CEPD';
  st['ATT'] = 'Atth';
  st['TIK'] = 'Tika';
  st['TIT'] = 'Titles';
  st['PRT'] = 'Pali Roots';
  st['SKT'] = 'Skt Dict';
  st['SKR'] = 'Skt Roots';

  // tab title

  var tabT = "Dict: '" + (DPR_G.G_dictQuery != ''?DPR_G.G_dictQuery:DPR_translit_mod.toUni(DPR_G.G_dictEntry.split(',')[1])) + '\' in ' + st[DPR_G.G_dictType];

  document.getElementsByTagName('title')[0].innerHTML = tabT;
  $(`#${DPR_PAL.getDifId()}`).html('');
  $('#dicthead').html('<span style="float:left" title="Click to copy permalink to clipboard" onclick="permalinkClick(\''+`${DPR_PAL.dprHomePage}?feature=dictionary&type=`+DPR_G.G_dictType+(DPR_G.G_dictQuery?'&query=' + DPR_translit_mod.toUni(DPR_G.G_dictQuery.replace(/ /g,'_')):'') + '&opts=' + DPR_G.G_dictOpts.join(',') + (DPR_G.G_dictEntry?'&entry=' + DPR_translit_mod.toUni(DPR_G.G_dictEntry.replace(/ /g,'_')):'')+'\',1);" class="pointer hoverShow">♦&nbsp;</span>');

  DPR_G.G_dictQuery = DPR_G.G_dictQuery.toLowerCase();


  switch (DPR_G.G_dictType) {
    case 'PED':
      await pedsearchstart();
      break;
    case 'DPPN':
      await dppnsearchstart();
      break;
    case 'CPED':
      mlsearchstart();
      break;
    case 'MULTI':
      multisearchstart();
      break;
    case 'CEPD':
      epdsearchstart();
      break;
    case 'ATT':
      attsearchstart();
      break;
    case 'TIK':
      tiksearchstart();
      break;
    case 'TIT':
      titlesearchstart();
      break;
    case 'PRT':
      paliRootsearchstart();
      break;
    case 'SKT':
      await sktsearchstart();
      break;
    case 'SKR':
      await sktRootsearchstart();
      break;
  }
}

async function pedsearchstart(hard)
{
  var getstring = DPR_G.G_dictQuery;

    if(getstring == '') {
        await paliXML(DPR_translit_mod.toUni(DPR_G.G_dictEntry));
        return;
    }

  if(!/[^0-9\/]/.exec(getstring) && DPR_G.devCheck == 1) { // dev link
    await sendPaliXML('dev/'+getstring+',dev');
    return;
  }

  if(/ft/.exec(DPR_G.G_dictOpts)) { // full text search

    await pedFullTextSearch(getstring);
    return;
  }

  if(/fz/.exec(DPR_G.G_dictOpts)) {
    getstring = DPR_translit_mod.toFuzzy(getstring);
  }

  var finouta = new Array();
  var y = 0;
  var finout = '';

  for (var pedt in DPR_G.P)
  {
    var totest = pedt;
    if(/fz/.exec(DPR_G.G_dictOpts)) {
      totest = DPR_translit_mod.toFuzzy(totest);
    }
    if(DPR_G.G_dictUnicode) totest = DPR_translit_mod.toUni(totest);

    if (/rx/.exec(DPR_G.G_dictOpts)) { // reg exp
      var yessir = (totest.search(getstring) == 0 || (!/sw/.test(DPR_G.G_dictOpts) && totest.search(getstring) > -1));
    }
    else { // non reg exp
      var yessir = (totest.indexOf(getstring) == 0 || (!/sw/.test(DPR_G.G_dictOpts) && totest.indexOf(getstring) > -1));
    }
    if(yessir)
    {
      for (var z = 0; z < DPR_G.P[pedt].length; z++) {

        var loc = DPR_G.P[pedt][z];

        var uniout = pedt;

        uniout = DPR_translit_mod.toUni(uniout).replace(/`/g,'˚');

        finouta[y] = '<a href="javascript:void(0)" style="color:'+DPR_G.DPR_prefs['coltext']+'" onclick="paliXML(\'PED/' + loc+','+ uniout + '\');">' + uniout + (DPR_G.P[pedt].length > 1 ? ' ' + (z+1) : '') + '</a><br>';

        y++;
      }
    }
  }

  $('#dicthead').append('<p>PED entry search for <b style="color:'+DPR_G.DPR_prefs['colped']+'">'+(/rx/.exec(DPR_G.G_dictOpts)?DPR_translit_mod.toUniRegEx(getstring):DPR_translit_mod.toUni(getstring))+'</b>:<hr />');

  var outDiv = document.createElement('div');

  if(finouta.length == 0) {
    outDiv.innerHTML += '<table width="100%"><tr><td>No results</td></tr></table><hr />';


    if(/hd/.exec(DPR_G.G_dictOpts) || hard) { // find similar words if hard search
      var simlist = findSimilarWords(DPR_translit_mod.toFuzzy(getstring),DPR_G.P,DPR_G.G_similar_min,1);
      if(simlist) {
        outDiv.innerHTML += '<p>Did you mean:</p>';
        for (var i in simlist) {
          pedt = simlist[i][1];
          for (var z = 0; z < DPR_G.P[pedt].length; z++) {

            var loc = DPR_G.P[pedt][z];

            var uniout = pedt;

            uniout = DPR_translit_mod.toUni(uniout).replace(/`/g,'˚');

            finouta.push('<a href="javascript:void(0)" style="color:'+DPR_G.DPR_prefs['coltext']+'" onclick="paliXML(\'PED/' + loc+','+ uniout + '\')">' + uniout + (DPR_G.P[pedt].length > 1 ? ' ' + (z+1) : '') + '</a><br>');

            y++;
          }
        }
      }
      else outDiv.innerHTML += '<p>No suggestions.</p>';
    }
    else {
      finouta.push('<a href="javascript:void(0)" style="color:'+DPR_G.DPR_prefs['colped']+'" onclick="pedsearchstart(1)">Show Suggestions</a><br>');

    }
  }
  else if(finouta.length == 1)
    await paliXML('PED/' + loc+','+uniout);

  var findiv = Math.ceil(finouta.length/3);
  var listoutf = '<table width="100%">';
  for (var z = 0; z < findiv; z++)
  {
    listoutf += '<tr><td>'+finouta[z]+'</td><td>'+(finouta[findiv+z]?finouta[findiv+z]:'')+'</td><td>'+(finouta[(findiv*2)+z]?finouta[(findiv*2)+z]:'')+'</td></tr>';
  }

  outDiv.innerHTML += listoutf + '</table><hr />';
  $('#dict').html('');
  document.getElementById('dict').appendChild(outDiv);
  document.getElementById('odif').scrollTop=0;

  if(DPR_G.G_dictEntry) paliXML(DPR_translit_mod.toUni(DPR_G.G_dictEntry));

  var yut = 0;
}

async function pedFullTextSearch(getstring) {

  getstring = DPR_translit_mod.toUni(getstring);

  var finalout = '';

  var listouta = [];

  for (var i = 0; i < 5; i++) {

    var xmlDoc = await DPR_DataLoader.loadPXD(i);

    var allp = xmlDoc.getElementsByTagName('d');

    for (var j =0; j < allp.length; j++) {
      var texttomatch = allp[j].textContent;
      var startmatch = texttomatch.search(getstring);
      var postpara = '';
      if (startmatch >= 0)
      {
        listouta.push('<a href="#pedo'+i+'/'+j+'" style="color:'+DPR_G.DPR_prefs['colped']+'">' + texttomatch.substring(0,texttomatch.search(/\/b/)-1).replace(/<b>/,'') + '</a><br>');
        while (startmatch >= 0)
        {
          var gotstring = texttomatch.match(getstring)[0];
          var endmatch = startmatch + gotstring.length;
          var beforem = texttomatch.substring(0,startmatch);
          var afterm = texttomatch.substring(endmatch,texttomatch.length);
          postpara += beforem + '<c0>' + gotstring.replace(/(.) (.)/g, "$1<xc> <c0>$2") + '<xc>';
          texttomatch = texttomatch.substring(endmatch);
          startmatch = texttomatch.search(getstring);
        }
        postpara += afterm;

        postpara = postpara.replace(/<c0>/g, '<span style="color:'+DPR_G.DPR_prefs['colped']+'">').replace(/<xc>/g, '</span>');

        finalout += '<a name="pedo'+i+'/'+j+'"><p><a href="#diftop" class="small" style="color:'+DPR_G.DPR_prefs['colped']+'">top</a></p><p>' + postpara + '</p><hr>';
      }
    }
  }

  $('#dicthead').append('<div><a name="diftop"><br />PED full-text search for <b style="color:'+DPR_G.DPR_prefs['colped']+'">'+(/rx/.exec(DPR_G.G_dictOpts)?DPR_translit_mod.toUniRegEx(getstring):DPR_translit_mod.toUni(getstring))+'</b>:</div>');

  // word list

  var y = listouta.length;

  var findiv = Math.ceil(y/3);

  var listoutf = '<hr /><table width="100%">';
  if(y == 0) {
    var outDiv = document.createElement('div');
    outDiv.innerHTML = listoutf + '<tr><td>No results</td></tr></table><hr />';
    $('#dict').html('');
    document.getElementById('dict').appendChild(outDiv);
    document.getElementById('odif').scrollTop=0;
    return;
  }

  for (var z = 0; z < findiv; z++)
  {
    listoutf += '<tr><td>'+listouta[z]+'</td><td>'+(listouta[findiv+z]?listouta[findiv+z]:'')+'</td><td>'+(listouta[(findiv*2)+z]?listouta[(findiv*2)+z]:'')+'</td></tr>';
  }
  var outDiv = document.createElement('div');
  outDiv.innerHTML = listoutf + '</table><hr />' + finalout;
  $('#dict').html('');
  document.getElementById('dict').appendChild(outDiv);
  document.getElementById('odif').scrollTop=0;
}

DPR_G.G_dppn = [];

async function dppnsearchstart(hard)
{
  var getstring = DPR_G.G_dictQuery;

    if(getstring == '') {
        await DPPNXML(DPR_translit_mod.toUni(DPR_G.G_dictEntry));
        return;
    }

  if(!/[^0-9\/]/.exec(getstring) && DPR_G.devCheck == 1) { // dev link
    await sendDPPNXML('dppn/'+getstring);
    return;
  }

  if(/\//.exec(getstring)) { // direct link
    var link = DPR_translit_mod.toUni(getstring).split(',');
    await DPPNXML(link[0],link[1]);
    return;
  }

  $('#dict').html('');
  document.getElementById('dict').appendChild(DPR_G.pleasewait);


  if(/ft/.exec(DPR_G.G_dictOpts)) { // full text search

    await dppnFullTextSearch(getstring);
    return;
  }

  if(/fz/.exec(DPR_G.G_dictOpts)) {
    getstring = DPR_translit_mod.toFuzzy(getstring);
  }

  var gslength = getstring.length;
  var loc = '';

  var gletter = getstring.charAt(0);

  var foldersw = new Array();
  var f0 = 0;
  var f1 = 0;

  var dict = '../DPPN/';

  var finouta = new Array();
  var finout = '';

    for (var x in DPR_G.D)
  {

    var dppnt = x;

    if(/fz/.exec(DPR_G.G_dictOpts)) {
      dppnt = DPR_translit_mod.toFuzzy(dppnt);
    }

    var totest = dppnt;
    if(DPR_G.G_dictUnicode) totest = DPR_translit_mod.toUni(totest);

        if (/rx/.exec(DPR_G.G_dictOpts)) { // reg exp
      var yessir = (totest.search(getstring) == 0 || (!/sw/.test(DPR_G.G_dictOpts) && totest.search(getstring) > -1));
    }
    else { // non reg exp
      var yessir = (totest.indexOf(getstring) == 0 || (!/sw/.test(DPR_G.G_dictOpts) && totest.indexOf(getstring) > -1));
    }
    if(yessir)
    {
      for (var z = 0; z < DPR_G.D[x].length; z++) {

        loc = DPR_G.D[x][z];

        var uniout = DPR_translit_mod.toUni(dppnt);

        finouta.push('<a href="javascript:void(0)" style="color:'+DPR_G.DPR_prefs['coltext']+'" onClick="DPPNXML(\''+uniout+'/' + loc + ',' + uniout + '\')">' + uniout + (DPR_G.D[x].length > 1 ? ' ' + (z+1) : '') + '</a><br>');
      }
    }
  }


  $('#dicthead').append('<p>DPPN entry search for <b style="color:'+DPR_G.DPR_prefs['coldppn']+'">'+(/rx/.exec(DPR_G.G_dictOpts)?DPR_translit_mod.toUniRegEx(getstring):DPR_translit_mod.toUni(getstring))+'</b>:<hr />');

  var listoutf = '';


  if(finouta.length == 0) {
    listoutf += '<table width="100%"><tr><td>No results</td></tr></table><hr />';


    if(/hd/.exec(DPR_G.G_dictOpts) || hard) { // find similar words if hard search
      var simlist = findSimilarWords(DPR_translit_mod.toFuzzy(getstring),DPR_G.D,DPR_G.G_similar_min,1);
      if(simlist) {
        listoutf += '<p>Did you mean:</p>';
        for (var i in simlist) {
          var pedt = simlist[i][1];
          for (var z = 0; z < DPR_G.D[pedt].length; z++) {

            var loc = DPR_G.D[pedt][z];

            var uniout = pedt;

            uniout = DPR_translit_mod.toUni(uniout).replace(/`/g,'˚');

            finouta.push('<a href="javascript:void(0)" style="color:'+DPR_G.DPR_prefs['coltext']+'" onClick="DPPNXML(\''+uniout+'/' + loc + ',' + uniout + '\')">' + uniout + (DPR_G.D[pedt].length > 1 ? ' ' + (z+1) : '') + '</a><br>');

          }
        }
      }
      else listoutf += '<p>No suggestions.</p>';
    }
    else {
      finouta.push('<a href="javascript:void(0)" style="color:'+DPR_G.DPR_prefs['colped']+'" onclick="dppnsearchstart(1)">Show Suggestions</a><br>');

    }
  }

  var y = finouta.length;

  var findiv = Math.ceil(y/3);

  listoutf += '<table width="100%">';

  for (var z = 0; z < findiv; z++)
  {
    listoutf += '<tr><td>'+finouta[z]+'</td><td>'+(finouta[findiv+z]?finouta[findiv+z]:'')+'</td><td>'+(finouta[(findiv*2)+z]?finouta[(findiv*2)+z]:'')+'</td></tr>';
  }
  var outDiv = document.createElement('div');
  outDiv.innerHTML = listoutf + '</table><hr />';
  $('#dict').html('');
  document.getElementById('dict').appendChild(outDiv);
  document.getElementById('odif').scrollTop=0;
  var yut = 0;

  if(DPR_G.G_dictEntry) await DPPNXML(DPR_translit_mod.toUni(DPR_G.G_dictEntry));


}

async function dppnFullTextSearch(getstring) {

  var finalouta = [];

  var listouta = [];
  getstring = DPR_translit_mod.toUni(getstring);
  for (var i = 1; i < 10; i++) {

    var xmlDoc = await DPR_DataLoader.loadXDPPN(i);;

    var allp = xmlDoc.getElementsByTagName('e');

    for (var j =0; j < allp.length; j++) {
      var addend = '';

      var texttomatch = allp[j].textContent;
      if(texttomatch.indexOf('Pali Proper Names') >=0) continue;
      if(texttomatch.indexOf('"huge"]') > -1) var ttitle = texttomatch.substring(texttomatch.indexOf('"huge"]')+7,texttomatch.indexOf('[/div]'));
      else if(texttomatch.indexOf('[b]') > -1) {
        var ttitle = texttomatch.substring(texttomatch.indexOf('[b]')+3,texttomatch.indexOf('[/b]'));
      }
      else continue;
      texttomatch = texttomatch.replace(/\[\/*a[^]]*\]/g, '');
      var startmatch = texttomatch.search(getstring);
      var postpara = '';
      if (startmatch >= 0)
      {
        listouta.push(ttitle+'###<a href="#dppno'+i+'/'+j+'" style="color:'+DPR_G.DPR_prefs['colped']+'">' + ttitle + '</a><br>');
        while (startmatch >= 0)
        {
          var gotstring = texttomatch.match(getstring)[0];
          var endmatch = startmatch + gotstring.length;
          var beforem = texttomatch.substring(0,startmatch);
          var afterm = texttomatch.substring(endmatch,texttomatch.length);
          postpara += beforem + '<c0>' + gotstring.replace(/(.) (.)/g, "$1<xc> <c0>$2") + '<xc>';
          texttomatch = texttomatch.substring(endmatch);
          startmatch = texttomatch.search(getstring);
        }
        postpara += afterm;

        postpara = postpara.replace(/<c0>/g, '<span style="color:'+DPR_G.DPR_prefs['colped']+'">').replace(/<xc>/g, '</span>');

        let scrollTopElem = DPR_PAL.isXUL ? "dictc" : "paliTextContent";

        finalouta.push(ttitle+'###<hr class="thick"><a name="dppno'+i+'/'+j+'"><div style="position:relative"><div style="position:absolute;top:0px; left:0px;"><a href="javascript:void(0)" onclick="scrollMainPane(0);" class="small" style="color:'+DPR_G.DPR_prefs['colped']+'">top</a></div><br/>' + postpara.replace(/\[/g, '<').replace(/\]/g, '>') + addend + '</b></div>');
      }
    }
  }


  // word list

  listouta = sortaz(listouta);

  var y = listouta.length;

  var findiv = Math.ceil(y/3);

  var listoutf = '<hr /><table width="100%">';
  if(y == 0) {
    var outDiv = document.createElement('div');
    outDiv.innerHTML = listoutf + '<tr><td>No results</td></tr></table><hr />';
    $('#dict').html('');
    document.getElementById('dict').appendChild(outDiv);
    document.getElementById('odif').scrollTop=0;
    return;
  }

  for (var z = 0; z < findiv; z++)
  {
    listoutf += '<tr><td>'+listouta[z]+'</td><td>'+(listouta[findiv+z]?listouta[findiv+z]:'')+'</td><td>'+(listouta[(findiv*2)+z]?listouta[(findiv*2)+z]:'')+'</td></tr>';
  }

  $('#dicthead').append('<div><a name="diftop"><br />DPPN full-text search for <b style="color:'+DPR_G.DPR_prefs['colped']+'">'+getstring+'</b>:</div>'+ listoutf);

  var finout = sortaz(finalouta).join('\n');


  var outDiv = document.createElement('div');
  outDiv.innerHTML = '</table><hr />' + finout;
  $('#dict').html('');
  document.getElementById('dict').appendChild(outDiv);
  document.getElementById('odif').scrollTop=0;
}



DPR_G.G_cpedAlt = [];

function mlsearchstart(hard)
{
  clearDivs('dict');
  var getstring = DPR_G.G_dictQuery;
  if(/fz/.exec(DPR_G.G_dictOpts)) {
    getstring = DPR_translit_mod.toFuzzy(getstring);
  }

  var gslength = getstring.length;
  var gsplit = new Array();


  var gletter = getstring.charAt(0);
  var finouta = new Array();
  var finout = '';
  if( DPR_G.G_cpedAlt = []) {
    for (var a in DPR_G.yt) DPR_G.G_cpedAlt.push([a].concat(DPR_G.yt[a]));
  }

  var cnt = 0;
  for (var x = 0; x < DPR_G.G_cpedAlt.length; x++)
  {
    var us = '';
    var ud = '';

    var gsplit = [DPR_G.G_cpedAlt[x][0],DPR_G.G_cpedAlt[x][3],DPR_G.G_cpedAlt[x][2]];

    if(!/ft/.exec(DPR_G.G_dictOpts)) {
      var tosearch = gsplit[0];
    }
    else {
      var tosearch = DPR_G.G_cpedAlt[x][0]+' '+DPR_G.G_cpedAlt[x][3]+' '+DPR_G.G_cpedAlt[x][2];
    }

    if(/fz/.exec(DPR_G.G_dictOpts)) {
      tosearch = DPR_translit_mod.toFuzzy(tosearch);
    }

    if(DPR_G.G_dictUnicode) tosearch = DPR_translit_mod.toUni(tosearch);

        if (/rx/.exec(DPR_G.G_dictOpts)) { // reg exp
      var yessir = (tosearch.search(getstring) == 0 || (!/sw/.test(DPR_G.G_dictOpts) && tosearch.search(getstring) > -1));
    }
    else { // non reg exp
      var yessir = (tosearch.indexOf(getstring) == 0 || (!/sw/.test(DPR_G.G_dictOpts) && tosearch.indexOf(getstring) > -1));
    }
    if(yessir)
    {
      cnt++;
      us = DPR_translit_mod.toUni(gsplit[0]);
      ud = DPR_translit_mod.toUni(gsplit[1] + ' (' + gsplit[2] + ')');

      finouta.push('<div><b><a style="color:'+DPR_G.DPR_prefs['colsel']+'" href="javascript:void(0)" onclick="if(document.getElementById(\'cped'+cnt+'\').innerHTML == \'\') { conjugate(\''+us+'\',\'cped'+cnt+'\')} else { document.getElementById(\'cped'+cnt+'\').innerHTML = \'\';}">' + us + '</a></b>: '+ud +'<br><div class="conjc" id="cped'+cnt+'"></div></div>');

    }
  }

  $('#dicthead').append('<p>CPED search for <b style="color:'+DPR_G.DPR_prefs['colped']+'">'+(/rx/.exec(DPR_G.G_dictOpts)?DPR_translit_mod.toUniRegEx(getstring):DPR_translit_mod.toUni(getstring))+'</b>:<hr /><table width=100%><tr><td valign="top">');

  if(finouta.length == 0) {
    finout += '<table width="100%"><tr><td>No results</td></tr></table><hr />';


    if(/hd/.exec(DPR_G.G_dictOpts) || hard) { // find similar words if hard search
      var simlist = findSimilarWords(DPR_translit_mod.toFuzzy(getstring),DPR_G.yt,DPR_G.G_similar_min,1);
      if(simlist) {
        finout += '<p>Did you mean:</p>';
        for (var i in simlist) {
          pedt = simlist[i][1];

          var loc = DPR_G.yt[pedt];

          us = DPR_translit_mod.toUni(pedt);
          ud = DPR_translit_mod.toUni(DPR_G.yt[pedt][2] + ' (' + DPR_G.yt[pedt][1] + ')');

          finouta.push('<div><b><a style="color:'+DPR_G.DPR_prefs['colcpd']+'" href="javascript:void(0)" onclick="if(document.getElementById(\'cpedsim'+i+'\').innerHTML == \'\') { conjugate(\''+us+'\',\'cpedsim'+i+'\')} else { document.getElementById(\'cpedsim'+i+'\').innerHTML = \'\';}">' + us + '</a></b>: '+ud +'<br><div class="conjc" id="cpedsim'+i+'"></div></div>');

        }
      }
      else finout += '<p>No suggestions.</p>';
    }
    else {
      finouta.push('<a href="javascript:void(0)" style="color:'+DPR_G.DPR_prefs['colcpd']+'" onclick="mlsearchstart(1)">Show Suggestions</a><br>');

    }
  }

  finout += '<table>'
  for (var z = 0; z < finouta.length; z++)
  {
    finout += '<tr><td>'+finouta[z]+'</td></tr>';
  }
  var outDiv = document.createElement('div');
  outDiv.innerHTML = finout + '</table><hr />';
  $('#dict').html('');
  document.getElementById('dict').appendChild(outDiv);
  document.getElementById('odif').scrollTop=0;
  var yut = 0;
}

// multi dictionary PED, DPPN, CPED


function multisearchstart(hard)
{
  var getstring = DPR_G.G_dictQuery;

  if(/fz/.exec(DPR_G.G_dictOpts)) {
    getstring = DPR_translit_mod.toFuzzy(getstring);
  }

  var finouta = new Array();
  var y = 0;
  var finout = '';

  // get ped

  for (var pedt in DPR_G.P)
  {
    var tosearch = pedt;

    if(/fz/.exec(DPR_G.G_dictOpts)) {
      tosearch = DPR_translit_mod.toFuzzy(tosearch);
    }

    if(DPR_G.G_dictUnicode) tosearch = DPR_translit_mod.toUni(tosearch);

    if (/rx/.exec(DPR_G.G_dictOpts)) { // reg exp
      var yessir = (tosearch.search(getstring) == 0 || (!/sw/.test(DPR_G.G_dictOpts) && tosearch.search(getstring) > -1));
    }
    else { // non reg exp
      var yessir = (tosearch.indexOf(getstring) == 0 || (!/sw/.test(DPR_G.G_dictOpts) && tosearch.indexOf(getstring) > -1));
    }
    if(yessir)
    {
      for (var z = 0; z < DPR_G.P[pedt].length; z++) {

        var loc = DPR_G.P[pedt][z];

        var uniout = pedt;

        uniout = DPR_translit_mod.toUni(uniout).replace(/`/g,'˚');

        finouta.push(uniout+'###<a href="javascript:void(0)" style="color:'+DPR_G.DPR_prefs['colped']+'" onclick="paliXML(\'PED/' + loc+','+ uniout + '\')">' + uniout + (DPR_G.P[pedt].length > 1 ? ' ' + (z+1) : '') + '</a><br>');
      }
    }
  }

    for (var x in DPR_G.D)
  {
    var dppnt = x;
    if(/fz/.exec(DPR_G.G_dictOpts)) {
      dppnt = DPR_translit_mod.toFuzzy(dppnt);
    }
    var tosearch = dppnt;

    if(DPR_G.G_dictUnicode) tosearch = DPR_translit_mod.toUni(tosearch);

        if (/rx/.exec(DPR_G.G_dictOpts)) { // reg exp
      var yessir = (tosearch.search(getstring) == 0 || (!/sw/.test(DPR_G.G_dictOpts) && tosearch.search(getstring) > -1));
    }
    else { // non reg exp
      var yessir = (tosearch.indexOf(getstring) == 0 || (!/sw/.test(DPR_G.G_dictOpts) && tosearch.indexOf(getstring) > -1));
    }
    if(yessir)
    {
      for (var z = 0; z < DPR_G.D[x].length; z++) {

        loc = DPR_G.D[x][z];

        var uniout = DPR_translit_mod.toUni(dppnt);

        finouta.push(uniout+'###<a href="javascript:void(0)" style="color:'+DPR_G.DPR_prefs['coldppn']+'" onClick="DPPNXML(\''+uniout+'/' + loc + ',' + uniout + '\')">' + uniout + (DPR_G.D[x].length > 1 ? ' ' + (z+1) : '') + '</a><br>');
      }
    }
  }

  // get cped

  if( DPR_G.G_cpedAlt = []) {
    for (var a in DPR_G.yt) DPR_G.G_cpedAlt.push([a].concat(DPR_G.yt[a]));
  }

  var cnt = 0;
  for (var x = 0; x < DPR_G.G_cpedAlt.length; x++)
  {
    var us = '';
    var ud = '';

    var gsplit = [DPR_G.G_cpedAlt[x][0],DPR_G.G_cpedAlt[x][3],DPR_G.G_cpedAlt[x][2]];

    if(!/ft/.exec(DPR_G.G_dictOpts)) {
      var tosearch = gsplit[0];
    }
    else {
      var tosearch = DPR_G.G_cpedAlt[x][0]+' '+DPR_G.G_cpedAlt[x][3]+' '+DPR_G.G_cpedAlt[x][2];
    }

    if(/fz/.exec(DPR_G.G_dictOpts)) {
      tosearch = DPR_translit_mod.toFuzzy(tosearch);
    }

     if(DPR_G.G_dictUnicode) tosearch = DPR_translit_mod.toUni(tosearch);

        if (/rx/.exec(DPR_G.G_dictOpts)) { // reg exp
      var yessir = (tosearch.search(getstring) == 0 || (!/sw/.exec(DPR_G.G_dictOpts) && tosearch.search(getstring) > -1));
    }
    else { // non reg exp
      var yessir = (tosearch.indexOf(getstring) == 0 || (!/sw/.exec(DPR_G.G_dictOpts) && tosearch.indexOf(getstring) > -1));
    }
    if(yessir)
    {
      cnt++;
      us = DPR_translit_mod.toUni(gsplit[0]);
      ud = DPR_translit_mod.toUni(gsplit[1] + ' (' + gsplit[2] + ')');

      finouta.push(us+'###<div><a style="color:'+DPR_G.DPR_prefs['colcpd']+'" href="javascript:void(0)" onclick=" conjugate(\''+us+'\',\'dif\')" title="'+ud.replace(/"/g,'&amp;quot;')+'">' + us + '</a><br><div class="conjc" id="cped'+cnt+'"></div></div>');

    }
  }


  var outDiv = document.createElement('div');

  $('#dicthead').append('<p><span style="color:'+DPR_G.DPR_prefs['colped']+'" >PED</span>, <span style="color:'+DPR_G.DPR_prefs['coldppn']+'" >DPPN</span>, &amp; <span style="color:'+DPR_G.DPR_prefs['colcpd']+'" >CPED</span> entry search for <b style="color:'+DPR_G.DPR_prefs['colsel']+'">'+getstring+'</b>:<hr />');

  if(finouta.length == 0) {
    outDiv.innerHTML += '<table width="100%"><tr><td>No results</td></tr></table><hr />';


    if(/hd/.exec(DPR_G.G_dictOpts) || hard) { // find similar words if hard search
      var simlistp = findSimilarWords(DPR_translit_mod.toFuzzy(getstring),DPR_G.P,DPR_G.G_similar_min,1);
      var simlistd = findSimilarWords(DPR_translit_mod.toFuzzy(getstring),DPR_G.D,DPR_G.G_similar_min,1);
      var simlistc = findSimilarWords(DPR_translit_mod.toFuzzy(getstring),DPR_G.yt,DPR_G.G_similar_min,1);

      if(simlistp || simlistd || simlistc) {
        outDiv.innerHTML += '<p>Did you mean:</p>';
        for (var i in simlistp) {
          pedt = simlistp[i][1];
          for (var z = 0; z < DPR_G.P[pedt].length; z++) {

            var loc = DPR_G.P[pedt][z];

            var uniout = pedt;

            uniout = DPR_translit_mod.toUni(uniout).replace(/`/g,'˚');

            finouta.push('<a href="javascript:void(0)" style="color:'+DPR_G.DPR_prefs['colped']+'" onclick="paliXML(\'PED/' + loc+','+ uniout + '\')">' + uniout + (DPR_G.P[pedt].length > 1 ? ' ' + (z+1) : '') + '</a><br>');

            y++;
          }
        }
        for (var i in simlistd) {
          pedt = simlistd[i][1];
          for (var z = 0; z < DPR_G.D[pedt].length; z++) {

            var loc = DPR_G.D[pedt][z];

            var uniout = pedt;

            uniout = DPR_translit_mod.toUni(uniout).replace(/`/g,'˚');

            finouta.push('<a href="javascript:void(0)" style="color:'+DPR_G.DPR_prefs['coldppn']+'" onclick="DPPNXML(\''+uniout+'/' + loc + ',' + uniout + '\')">' + uniout + (DPR_G.D[pedt].length > 1 ? ' ' + (z+1) : '') + '</a><br>');

            y++;
          }
        }
        for (var i in simlistc) {
          pedt = simlistc[i][1];

          var loc = DPR_G.yt[pedt];

          us = DPR_translit_mod.toUni(pedt);
          ud = DPR_translit_mod.toUni(DPR_G.yt[pedt][2] + ' (' + DPR_G.yt[pedt][1] + ')');

          finouta.push('<div><a style="color:'+DPR_G.DPR_prefs['colcpd']+'" href="javascript:void(0)" onclick="if(document.getElementById(\'cpedsim'+i+'\').innerHTML == \'\') { document.getElementById(\'cpedsim'+i+'\').innerHTML = \''+ud +'\'} else { document.getElementById(\'cpedsim'+i+'\').innerHTML = \'\';}">' + us + '</a><br><div class="conjc" id="cpedsim'+i+'"></div></div>');

        }
      }
      else outDiv.innerHTML += '<p>No suggestions.</p>';
    }
    else {
      finouta.push('<a href="javascript:void(0)" style="color:'+DPR_G.DPR_prefs['colped']+'" onclick="pedsearchstart(1)">Show Suggestions</a><br>');

    }
  }
  else finouta = sortaz(finouta);

  var findiv = Math.ceil(finouta.length/3);
  var listoutf = '<table width="100%">';
  for (var z = 0; z < findiv; z++)
  {
    listoutf += '<tr><td>'+finouta[z]+'</td><td>'+(finouta[findiv+z]?finouta[findiv+z]:'')+'</td><td>'+(finouta[(findiv*2)+z]?finouta[(findiv*2)+z]:'')+'</td></tr>';
  }

  outDiv.innerHTML += listoutf + '</table><hr />';
  $('#dict').html('');
  document.getElementById('dict').appendChild(outDiv);
  document.getElementById('odif').scrollTop=0;
  var yut = 0;
}



function epdsearchstart()
{
  if(typeof(DPR_G.epd) == 'undefined') {
    return;
  }

  clearDivs('dict');

  var getstring = DPR_G.G_dictQuery;
  if(/fz/.exec(DPR_G.G_dictOpts)) {
    getstring = DPR_translit_mod.toFuzzy(getstring);
  }

  var gslength = getstring.length;
  var gsplit = new Array();


  var gletter = getstring.charAt(0);
  var finouta = new Array();
  var y = 0;
  var finout = '';

  for (var x = 0; x < DPR_G.epd.length; x++)
  {
    gsplit = DPR_G.epd[x].split('^');

    if(!/ft/.exec(DPR_G.G_dictOpts)) {
      var tosearch = gsplit[0];
    }
    else {
      var tosearch = DPR_G.epd[x];
    }
    if(/fz/.exec(DPR_G.G_dictOpts)) {
      tosearch = DPR_translit_mod.toFuzzy(tosearch);
    }

      if(DPR_G.G_dictUnicode) tosearch = DPR_translit_mod.toUni(tosearch);

        if (/rx/.exec(DPR_G.G_dictOpts)) { // reg exp
      var yessir = (tosearch.search(getstring) == 0 || (!/sw/.exec(DPR_G.G_dictOpts) && tosearch.search(getstring) > -1));
    }
    else { // non reg exp
      var yessir = (tosearch.indexOf(getstring) == 0 || (!/sw/.exec(DPR_G.G_dictOpts) && tosearch.indexOf(getstring) > -1));
    }
    if(yessir)
    {

      finouta.push('<b><font style="color:'+DPR_G.DPR_prefs['colsel']+'">' + gsplit[0] + '</font></b>: '+gsplit[1] +'<br>');

    }
  }

  $('#dicthead').append('<p>CEPD search for <b style="color:'+DPR_G.DPR_prefs['colped']+'">'+(/rx/.exec(DPR_G.G_dictOpts)?DPR_translit_mod.toUniRegEx(getstring):DPR_translit_mod.toUni(getstring))+'</b>:');

  finout = '<hr /><table width=100%><tr><td valign="top">';
  if(finouta.length == 0) {
    var outDiv = document.createElement('div');
    outDiv.innerHTML = finout + 'No results</td></tr></table>';
    $('#dict').html('');
    document.getElementById('dict').appendChild(outDiv);
    document.getElementById('odif').scrollTop=0;
    return;
  }
  for (var z = 0; z < finouta.length; z++)
  {
    finout += finouta[z];
  }
  var outDiv = document.createElement('div');
  outDiv.innerHTML = finout + '</td></tr></table>';
  $('#dict').html('');
  document.getElementById('dict').appendChild(outDiv);
  document.getElementById('odif').scrollTop=0;
  var yut = 0;
}


function attsearchstart()
{
  if(typeof(DPR_G.attlist) == 'undefined') {
    return;
  }
  clearDivs('dict');

  var getstring = DPR_G.G_dictQuery;
  if(/fz/.exec(DPR_G.G_dictOpts)) {
    getstring = DPR_translit_mod.toFuzzy(getstring);
  }
  else getstring = DPR_translit_mod.toUni(getstring);

  var gslength = getstring.length;
  var gsplit = new Array();
  var hsplit = [];
  var gletter = getstring.charAt(0);
  var foldersw = new Array();
  var f0 = 0;
  var f1 = 0;

  var finouta = new Array();
  var y = 0;
  var finout = '';
  var outnik = '';

  for (var x = 0; x < DPR_G.attlist.length; x++)
  {
    outnik = '';
    var attt = DPR_G.attlist[x].split('#')[0];

    if(/fz/.exec(DPR_G.G_dictOpts)) {
      attt = DPR_translit_mod.toFuzzy(attt);
    }

    var tosearch = attt;
     if(DPR_G.G_dictUnicode) tosearch = DPR_translit_mod.toUni(tosearch);

        if (/rx/.exec(DPR_G.G_dictOpts)) { // reg exp
      var yessir = (tosearch.search(getstring) == 0 || (!/sw/.test(DPR_G.G_dictOpts) && tosearch.search(getstring) > -1));
    }
    else { // non reg exp
      var yessir = (tosearch.indexOf(getstring) == 0 || (!/sw/.test(DPR_G.G_dictOpts) && tosearch.indexOf(getstring) > -1));
    }
    if(yessir)
    {
      var entries = DPR_G.attlist[x].split('#');
      gsplit = entries.shift();
      var uniout = DPR_translit_mod.toUni(gsplit);

      // nikayas
      for(var a = 0; a < entries.length; a++) {
        var tnik = entries[a].charAt(0);
        if(DPR_G.G_dictOpts.indexOf('x'+tnik) == -1) entries.splice(a--,1);
        else if(outnik.indexOf(tnik) == -1) outnik+=tnik;
      }
      if (entries.length == 0) continue;

      finouta[y] = '<span class="pointer style="color:'+DPR_G.DPR_prefs['coltext']+'" onclick="getAtthXML('+ x +',\'a\',\''+outnik+'\')">' + uniout + ' (' + (entries.length) + ')</span><br>';
      y++;
    }
  }
  var y = finouta.length;

  var findiv = Math.ceil(y/3);

  $('#dicthead').append('<p>Aṭṭhakathā term search for <b style="color:'+DPR_G.DPR_prefs['colped']+'">'+DPR_translit_mod.toUni(getstring)+'</b>:');

  var listoutf = '<hr /><table width="100%">';
  if(y == 0) {
    var outDiv = document.createElement('div');
    outDiv.innerHTML = listoutf + '<tr><td>No results</td></tr></table><hr />';
    $('#dict').html('');
    document.getElementById('dict').appendChild(outDiv);
    document.getElementById('odif').scrollTop=0;
    return;
  }

  for (var z = 0; z < findiv; z++)
  {
    listoutf += '<tr><td>'+finouta[z]+'</td><td>'+(finouta[findiv+z]?finouta[findiv+z]:'')+'</td><td>'+(finouta[(findiv*2)+z]?finouta[(findiv*2)+z]:'')+'</td></tr>';
  }
  var outDiv = document.createElement('div');
  outDiv.innerHTML = listoutf + '</table>';
  $('#dict').html('');
  document.getElementById('dict').appendChild(outDiv);
  document.getElementById('odif').scrollTop=0;
  var yut = 0;
}


function tiksearchstart()
{
  if(typeof(DPR_G.tiklist) == 'undefined') {
    return;
  }

  clearDivs('dict');

  var getstring = DPR_G.G_dictQuery;
  if(/fz/.exec(DPR_G.G_dictOpts)) {
    getstring = DPR_translit_mod.toFuzzy(getstring);
  }

  var gslength = getstring.length;
  var gsplit = new Array();
  var hsplit = [];
  var gletter = getstring.charAt(0);
  var foldersw = new Array();
  var f0 = 0;
  var f1 = 0;

  var finouta = new Array();
  var y = 0;
  var finout = '';
  var outnik = '';

  for (var x = 0; x < DPR_G.tiklist.length; x++)
  {
    outnik = '';
    var tikt = DPR_G.tiklist[x].split('#')[0];

    if(/fz/.exec(DPR_G.G_dictOpts)) {
      tikt = DPR_translit_mod.toFuzzy(tikt);
    }

    var tosearch = tikt;
     if(DPR_G.G_dictUnicode) tosearch = DPR_translit_mod.toUni(tosearch);

        if (/rx/.exec(DPR_G.G_dictOpts)) { // reg exp
      var yessir = (tosearch.search(getstring) == 0 || (!/sw/.test(DPR_G.G_dictOpts) && tosearch.search(getstring) > -1));
    }
    else { // non reg exp
      var yessir = (tosearch.indexOf(getstring) == 0 || (!/sw/.test(DPR_G.G_dictOpts) && tosearch.indexOf(getstring) > -1));
    }
    if(yessir)
    {

      var entries = DPR_G.tiklist[x].split('#');
      gsplit = entries.shift();
      var uniout = DPR_translit_mod.toUni(gsplit);

      // nikayas
      for(var a = 0; a < entries.length; a++) {
        var tnik = entries[a].charAt(0);
        if(DPR_G.G_dictOpts.indexOf('x'+tnik) == -1) entries.splice(a--,1);
        else if(outnik.indexOf(tnik) == -1) outnik+=tnik;
      }
      if (entries.length == 0) continue;

      finouta[y] = '<span class="pointer" style="color:'+DPR_G.DPR_prefs['coltext']+'" onclick="getAtthXML('+ x +',\'t\',\''+outnik+'\')">' + uniout + ' (' + (entries.length) + ')</span><br>';
      y++;
    }
  }
  var y = finouta.length;

  var findiv = Math.ceil(y/3);

  $('#dicthead').append('<p>Ṭīka term search for <b style="color:'+DPR_G.DPR_prefs['colped']+'">'+DPR_translit_mod.toUni(getstring)+'</b>:');

  var listoutf = '<hr /><table width="100%">';
  if(y == 0) {
    var outDiv = document.createElement('div');
    outDiv.innerHTML = listoutf + '<tr><td>No results</td></tr></table><hr />';
    $('#dict').html('');
    document.getElementById('dict').appendChild(outDiv);
    document.getElementById('odif').scrollTop=0;
    return;
  }

  for (var z = 0; z < findiv; z++)
  {
    listoutf += '<tr><td>'+finouta[z]+'</td><td>'+(finouta[findiv+z]?finouta[findiv+z]:'')+'</td><td>'+(finouta[(findiv*2)+z]?finouta[(findiv*2)+z]:'')+'</td></tr>';
  }
  var outDiv = document.createElement('div');
  outDiv.innerHTML = listoutf + '</table>';
  $('#dict').html('');
  document.getElementById('dict').appendChild(outDiv);
  document.getElementById('odif').scrollTop=0;
  var yut = 0;
}


function titlesearchstart()
{
  if(typeof(DPR_G.titlelist) == 'undefined') {
    return;
  }

  clearDivs('dict');

  var getstring = DPR_G.G_dictQuery;
  if(/fz/.exec(DPR_G.G_dictOpts)) {
    getstring = DPR_translit_mod.toFuzzy(getstring);
  }
  else {
    getstring = DPR_translit_mod.toUni(getstring);
  }

  var gslength = getstring.length;
  var gsplit = new Array();
  var hsplit = [];
  var gletter = getstring.charAt(0);
  var foldersw = new Array();
  var f0 = 0;
  var f1 = 0;

  var finouta = new Array();
  var y = 0;
  var finout = '';

  var outnik = '';

  for (var x = 0; x < DPR_G.titlelist.length; x++)
  {

    outnik = '';

    var titt = DPR_G.titlelist[x].split('#')[0];
    if(/fz/.exec(DPR_G.G_dictOpts)) {
      titt = DPR_translit_mod.toFuzzy(titt);
    }

    var tosearch = titt;
     if(DPR_G.G_dictUnicode) tosearch = DPR_translit_mod.toUni(tosearch);

    if (/rx/.exec(DPR_G.G_dictOpts)) { // reg exp
      var yessir = (tosearch.search(getstring) == 0 || (!/sw/.test(DPR_G.G_dictOpts) && tosearch.search(getstring) > -1));
    }
    else { // non reg exp
      var yessir = (tosearch.indexOf(getstring) == 0 || (!/sw/.test(DPR_G.G_dictOpts) && tosearch.indexOf(getstring) > -1));
    }
    if(yessir)
    {

      // separate mat
      var entries = DPR_G.titlelist[x].split('#');
      gsplit = entries.shift();
      var uniout = DPR_translit_mod.toUni(gsplit);

      for(var a = 0; a < entries.length; a++) {
        if(!DPR_G.G_dictOpts.indexOf('m'+entries[a].charAt(entries[a].length-3))) {
          entries.splice(a--,1);
        }
      }
      if (entries.length == 0) continue;

      // nikayas
      for(var a = 0; a < entries.length; a++) {
        var tnik = entries[a].charAt(0);
        if(DPR_G.G_dictOpts.indexOf('x'+tnik) == -1) entries.splice(a--,1);
        else if(outnik.indexOf(tnik) == -1) outnik+=tnik;
      }
      if (entries.length == 0) continue;

      // add DPPN title entries

      var dppnEntry = [];
      if(DPR_G.D[gsplit]) {
        dppnEntry = DPR_G.D[gsplit];
      }
      else {
        if(typeof(DPR_G.D[gsplit.replace(/\.m$/,'')]) == 'object') {
          dppnEntry = DPR_G.D[gsplit.replace(/\.m$/,'')];
        }
        else if(typeof(DPR_G.D[gsplit.replace(/o$/,'a')]) == 'object') {
          dppnEntry = DPR_G.D[gsplit.replace(/o$/,'a')];
        }
      }
      var dEI = '';
      var dEO = '';
      if(dppnEntry.length > 0) {
        for(var d in dppnEntry) {

          dEI += '&nbsp;<span class="pointer" style="color:'+DPR_G.DPR_prefs['coldppn']+'" title="DPPN entry" onclick="toggleDppnTitle(\''+dppnEntry[d]+'\',\'titleS'+x+'^'+d+'\');">n</span>';
          dEO += '<div class="hide round" id="titleS'+x+'^'+d+'"></div>'
        }
      }
      finouta.push('<span class="pointer" style="color:'+DPR_G.DPR_prefs['coltext']+'" onclick="getTitleXML('+ x +','+ (DPR_G.G_dictOpts.indexOf('mm') > -1) +','+(DPR_G.G_dictOpts.indexOf('ma') > -1)+','+(DPR_G.G_dictOpts.indexOf('mt') > -1)+',\''+outnik+'\')">' + uniout + ' (' + entries.length + ')</span>' + dEI + '<br>' + dEO);

    }
  }
  y = finouta.length;

  var findiv = Math.ceil(y/2);

  $('#dicthead').append('<p>Title search for <b style="color:'+DPR_G.DPR_prefs['colped']+'">'+getstring+'</b>:');

  var listoutf = '<hr />';
  if(y == 0) {
    var outDiv = document.createElement('div');
    outDiv.innerHTML = listoutf + '<tr><td>No results</td></tr></table><hr />';
    $('#dict').html('');
    document.getElementById('dict').appendChild(outDiv);
    document.getElementById('odif').scrollTop=0;
    return;
  }
  var finol = '';
  var finor = '';

  for (var z = 0; z < findiv; z++)
  {
    finol +=finouta[z]
    finor += (finouta[findiv+z]?finouta[findiv+z]:'');
  }
  listoutf += '<table width="100%"><tr><td>'+finol+'</td><td>'+finor+'</td></tr></table>';

  var outDiv = document.createElement('div');
  outDiv.innerHTML = listoutf;
  $('#dict').html('');
  document.getElementById('dict').appendChild(outDiv);
  document.getElementById('odif').scrollTop=0;
  var yut = 0;
}


function paliRootsearchstart(hard)
{
  if(typeof(DPR_G.proots) == 'undefined') {
    return;
  }

  clearDivs('dict');

  var getstring = DPR_G.G_dictQuery;
  if(/fz/.exec(DPR_G.G_dictOpts)) {
    getstring = DPR_translit_mod.toFuzzy(getstring);
  }

  var gslength = getstring.length;
  var gsplit = new Array();


  var gletter = getstring.charAt(0);
  var finouta = new Array();
  var y = 0;
  var finout = '';

  for (var x = 0; x < DPR_G.proots.length; x++)
  {
    gsplit = DPR_G.proots[x].split('^');

    if(!/ft/.exec(DPR_G.G_dictOpts)) {
      var tosearch = gsplit[0];
    }
    else {
      var tosearch = DPR_G.proots[x];
    }

    tosearch = DPR_translit_mod.toVel(tosearch);

    if(/fz/.exec(DPR_G.G_dictOpts)) {
      tosearch = DPR_translit_mod.toFuzzy(tosearch);
    }

    if(DPR_G.G_dictUnicode) tosearch = DPR_translit_mod.toUni(tosearch);

    if (/rx/.exec(DPR_G.G_dictOpts)) { // reg exp
      var yessir = (tosearch.search(getstring) == 0 || (!/sw/.exec(DPR_G.G_dictOpts) && tosearch.search(getstring) > -1));
    }
    else { // non reg exp
      var yessir = (tosearch.indexOf(getstring) == 0 || (!/sw/.exec(DPR_G.G_dictOpts) && tosearch.indexOf(getstring) > -1));
    }
    if(yessir)
    {
      var gs1 = gsplit[1].split(' ');
      for(var i = 0;i<gs1.length;i++) {
        var base = gs1[i].replace(/e$/,'a').replace(/[āe]su$/,'a').replace(/īsu$/,'i').replace(/yaṃ$/,'').replace(/mhi$/,'');
        gs1[i] = linkToPED(base,gs1[i]);
      }
      gsplit[1] = gs1.join(' ');
      var ln = DPR_G.rootsl[x].split('.');
      finouta.push('<b><font style="color:'+DPR_G.DPR_prefs['colsel']+'">' + gsplit[0] + '</font></b>: '+gsplit[1] +' <span class="pointer hoverShow" title="go to entry in Dhātumālā" onclick="openPlace([\'g\',3,'+ln[0]+',0,'+ln[1]+',0,0,\'m\'],'+(parseInt(ln[2])+1)+',null,eventSend(event))">&rarr;</span><br>');

    }
  }

  $('#dicthead').append('<p>Pali Roots search for <b style="color:'+DPR_G.DPR_prefs['colped']+'">'+(/rx/.exec(DPR_G.G_dictOpts)?DPR_translit_mod.toUniRegEx(getstring):DPR_translit_mod.toUni(getstring))+'</b>:');

  finout = '<table width=100%><tr><td valign="top">';
  if(finouta.length == 0) {
    var outDiv = document.createElement('div');
    outDiv.innerHTML = finout + 'No results</td></tr></table>';
    $('#dict').html('');
    document.getElementById('dict').appendChild(outDiv);
    document.getElementById('odif').scrollTop=0;
    return;
  }
  for (var z = 0; z < finouta.length; z++)
  {
    finout += finouta[z];
  }
  var outDiv = document.createElement('div');
  outDiv.innerHTML = finout + '</td></tr></table>';
  $('#dict').html('');
  document.getElementById('dict').appendChild(outDiv);
  document.getElementById('odif').scrollTop=0;
  var yut = 0;
}

DPR_G.G_sktR = [];

async function sktsearchstart()
{
  if(typeof(DPR_G.skt) == 'undefined') {
    return;
  }

  clearDivs('dict');

  var char = DPR_G.G_dictQuery.charAt(0);

  var getstring = DPR_translit_mod.toSkt(DPR_translit_mod.toVel(DPR_G.G_dictQuery));
  if(/fz/.exec(DPR_G.G_dictOpts)) {
    getstring = DPR_translit_mod.toFuzzy(getstring);
  }

  var gslength = getstring.length;
  var gsplit = new Array();

  var gletter = getstring.charAt(0);
  var finouta = new Array();
  var y = 0;
  var finout = '';
  var last = 0;
  var uniout;

  if(typeof(DPR_G.G_sktR['a']) == 'undefined') {
    for (var w in DPR_G.skt) {
      for (var x = 0; x < DPR_G.skt[w].length; x++)
        DPR_G.G_sktR[DPR_G.skt[w][x]] = x;
    }
  }

  for (var x = 0; x < DPR_G.skt[char].length; x++)
  {
    var sx = DPR_G.skt[char][x];

    if(/fz/.exec(DPR_G.G_dictOpts)) {
      sx = DPR_translit_mod.toFuzzy(sx);
    }
    var totest = sx;
    if(DPR_G.G_dictUnicode) totest = DPR_translit_mod.toUni(totest);

    if (/rx/.exec(DPR_G.G_dictOpts)) { // reg exp
      var yessir = (totest.search(getstring) == 0 || (!/sw/.test(DPR_G.G_dictOpts) && totest.search(getstring) > -1));
    }
    else { // non reg exp
      var yessir = (totest.indexOf(getstring) == 0 || (!/sw/.test(DPR_G.G_dictOpts) && totest.indexOf(getstring) > -1));
    }
    if(yessir)
    {
      var uniout = DPR_translit_mod.toUni(DPR_translit_mod.toSkt(sx,true));
      last = x;
      finouta[y] = '<span class="pointer" style="color:'+DPR_G.DPR_prefs['coltext']+'" onclick="sktXML(\''+sx+'\',' + x +');">' + uniout + '</span><br>';

      y++;
    }
  }

  $('#dicthead').append('<p>Sanskrit search for <b style="color:'+DPR_G.DPR_prefs['colped']+'">'+(/rx/.exec(DPR_G.G_dictOpts)?DPR_translit_mod.toUniRegEx(DPR_G.G_dictQuery):DPR_translit_mod.toUni(DPR_G.G_dictQuery))+'</b>:');


  var outDiv = document.createElement('div');

  if(finouta.length == 0) {
    outDiv.innerHTML += '<table width="100%"><tr><td>No results</td></tr></table><hr />';


    if(/hd/.exec(DPR_G.G_dictOpts) || hard) { // find similar words if hard search

      var simlist = findSimilarWords(DPR_translit_mod.toFuzzy(getstring),DPR_G.G_sktR[char],DPR_G.G_similar_min,1);
      if(simlist) {
        outDiv.innerHTML += '<p>Did you mean:</p>';
        for (var x = 0; x < simlist.length; x++) {
          sx = simlist[x][1];
          var uniout = DPR_translit_mod.toUni(DPR_translit_mod.toSkt(sx,true));
          finouta[y] = '<a href="javascript:void(0)" style="color:'+DPR_G.DPR_prefs['coltext']+'" onclick="sktXML(\''+sx+'\',' + DPR_G.G_sktR[sx]+');">' + uniout + '</a><br>';

          y++;
        }
      }
      else outDiv.innerHTML += '<p>No suggestions.</p>';
    }
    else {
      finouta.push('<a href="javascript:void(0)" style="color:'+DPR_G.DPR_prefs['colped']+'" onclick="pedsearchstart(1)">Show Suggestions</a><br>');

    }
  }
  else if(finouta.length == 1)
    await sktXML(last+','+uniout);

  var findiv = Math.ceil(finouta.length/3);
  var listoutf = '<table width="100%">';
  for (var z = 0; z < findiv; z++)
  {
    listoutf += '<tr><td>'+finouta[z]+'</td><td>'+(finouta[findiv+z]?finouta[findiv+z]:'')+'</td><td>'+(finouta[(findiv*2)+z]?finouta[(findiv*2)+z]:'')+'</td></tr>';
  }

  outDiv.innerHTML += listoutf + '</table><hr />';
  $('#dict').html('');
  document.getElementById('dict').appendChild(outDiv);
  document.getElementById('odif').scrollTop=0;

  if(DPR_G.G_dictEntry) await sktXML(DPR_G.G_dictEntry,DPR_G.G_sktR[DPR_G.G_dictEntry]);

  var yut = 0;
}


async function sktRootsearchstart(hard)
{
  if(typeof(DPR_G.sktR) == 'undefined') {
    return;
  }
  var getstring = DPR_translit_mod.toSkt(DPR_translit_mod.toVel(DPR_G.G_dictQuery));

  if(getstring == '') {
      await sktRXML(DPR_translit_mod.toUni(DPR_G.G_dictEntry));
      return;
  }

  if(/ft/.exec(DPR_G.G_dictOpts)) { // full text search
    //sktRootFullTextSearch(getstring);
    //return;
  }

  if(/fz/.exec(DPR_G.G_dictOpts)) {
    getstring = DPR_translit_mod.toFuzzy(getstring);
  }

  var finouta = new Array();
  var y = 0;
  var finout = '';

  for (var i=0; i < DPR_G.sktR.length; i++)
  {
    var j = DPR_G.sktR[i];
    if(/fz/.exec(DPR_G.G_dictOpts)) {
      j = DPR_translit_mod.toFuzzy(j);
    }
    var totest = j;
    if(DPR_G.G_dictUnicode) totest = DPR_translit_mod.toUni(totest);

    if (/rx/.exec(DPR_G.G_dictOpts)) { // reg exp
      var yessir = (totest.search(getstring) == 0 || (!/sw/.test(DPR_G.G_dictOpts) && totest.search(getstring) > -1));
    }
    else { // non reg exp
      var yessir = (totest.indexOf(getstring) == 0 || (!/sw/.test(DPR_G.G_dictOpts) && totest.indexOf(getstring) > -1));
    }
    if(yessir)
    {
      var uniout = j;
      uniout = DPR_translit_mod.toUni(DPR_translit_mod.toSkt(uniout,true));
      finouta[y] = '<span class="pointer" style="color:'+DPR_G.DPR_prefs['coltext']+'" onclick="sktRXML('+i+');">√' + uniout + '</a><br>';

      y++;
    }
  }

  $('#dicthead').append('<p>Skt Root search for <b style="color:'+DPR_G.DPR_prefs['colped']+'">'+(/rx/.exec(DPR_G.G_dictOpts)?DPR_translit_mod.toUniRegEx(DPR_G.G_dictQuery):DPR_translit_mod.toUni(DPR_G.G_dictQuery))+'</b>:<hr />');

  var outDiv = document.createElement('div');

  if(finouta.length == 0) {
    outDiv.innerHTML += '<table width="100%"><tr><td>No results</td></tr></table><hr />';
  }
  else if(finouta.length == 1)
    await sktRXML(0);

  var findiv = Math.ceil(finouta.length/3);
  var listoutf = '<table width="100%">';
  for (var z = 0; z < findiv; z++)
  {
    listoutf += '<tr><td>'+finouta[z]+'</td><td>'+(finouta[findiv+z]?finouta[findiv+z]:'')+'</td><td>'+(finouta[(findiv*2)+z]?finouta[(findiv*2)+z]:'')+'</td></tr>';
  }

  outDiv.innerHTML += listoutf + '</table><hr />';
  $('#dict').html('');
  document.getElementById('dict').appendChild(outDiv);
  document.getElementById('odif').scrollTop=0;

  if(DPR_G.G_dictEntry) await sktRXML(DPR_translit_mod.toUni(DPR_G.G_dictEntry));

  var yut = 0;
}
