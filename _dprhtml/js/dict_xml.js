'use strict';

DPR_G.G_peda = [];

DPR_G.G_pedhist = [];
DPR_G.G_phmark = 0;

DPR_G.pedfileget = '';

function makeUniqueStringForCaseInsensitiveFS(s) {
  const charToHexStr = c => Number(c.charCodeAt(0)).toString(16).padStart(2, '0').toUpperCase();

  const uniqueStr =
    [...s]
      .reverse()
      .map(charToHexStr)
      .reduce((current, previous) => previous + current, '');

  return `${s}-${uniqueStr}`;
}

async function paliXMLHistory(opts) {
  if(opts.selectedIndex != 0) {
    DPR_G.G_phmark = opts.length - 1 - opts.selectedIndex;
    await paliXML(opts.options[opts.selectedIndex].value,1);
  }
}

async function paliXML(filein,which,add)
{
  appInsights.trackEvent({ name: 'Lookup word',  properties: { filein,which,add, }});

  addJS(['ped']);

  if(add == 'right') return;
  if(add == true) {
    await sendPaliXML(toVel(filein.split(',')[1]),true);
    return;
  }
  moveFrame(1);
  var file = toUni(filein);
  clearDivs('dif');
  moveFrame(1);

  if(!which) { // not from select
    DPR_G.G_pedhistt = [];
    DPR_G.G_pedhist = DPR_G.G_pedhist.slice(0,DPR_G.G_phmark+1); // cut old future
    for (var i in DPR_G.G_pedhist) {
      if (DPR_G.G_pedhist[i] != file) { DPR_G.G_pedhistt.push(DPR_G.G_pedhist[i]); }
    }
    DPR_G.G_pedhist = DPR_G.G_pedhistt.concat([file]); // add latest
    DPR_G.G_phmark = DPR_G.G_pedhist.length; // set mark to latest
  }

  var filea = file.split(',');
  var ttit = filea[1].replace(/˚/g,'`');
  file = filea[0];

  if(!DPR_G.P[toVel(ttit)]) {
    if(DPR_G.G_irregNoun[toVel(ttit)]) {
      ttit = DPR_G.G_irregNoun[toVel(ttit)];
    }
    else if(DPR_G.G_irregVerb[toVel(ttit)]) {
      ttit = DPR_G.G_irregVerb[toVel(ttit)];
    }
  }

  var tloc = file.split('/');
  var t1 = tloc[1];
  var t2 = tloc[2];
  DPR_G.pedfileget = t1 + '/' + t2;
  var xmlDoc = await DPR_DataLoader.loadPXD(t1);

  var data = xmlDoc.getElementsByTagName('d')[t2].textContent;

  data = data.replace(/-- *([0-9]+)\./g,"<br/><br/><b>$1.</b>");

  if(DPR_G.DPR_prefs['showPedLinks']) {

    // add links
    var dataa = data.split(' ');
    var datat = '';
    for (var i = 0; i < dataa.length; i++) {
      if(/<[^>]*$/.exec(dataa[i])) { // pesky broken up links
        var tda = toVel(dataa[i].replace(/<[^>]*$/,'').replace(/<[^>]*>/g, '').replace(/ŋ/g, 'ṃ').toLowerCase().replace(/[^āīūṭḍṅṇṃñḷĀĪŪṬḌṄṆṂÑḶa-z]/g,''));
        if(!tda || tda.length < 2) {
          datat += ' ' + dataa[i];
        }
        else if(typeof(DPR_G.P[tda]) == 'object' && tda != toVel(ttit)) datat += dataa[i].replace(/<[^>]*$/,'').replace(toUni(tda), ' <a style="color:'+DPR_G.DPR_prefs['colsel']+'" href="javascript:void(0)" onclick="paliXML(\'PED/' + DPR_G.P[tda][0] + ','+toUni(tda)+'\')">'+toUni(tda)+'</a>') + dataa[i].substring(dataa[i].indexOf(/<[^>]*$/));
        else datat += ' ' + dataa[i];
        i++

        // add inner <a b c d> b,c parts

        while(dataa[i] && !/^[^<>]*>/.exec(dataa[i])) {
          datat += ' ' + dataa[i++];
        }

        // add d part

        if(dataa[i]) {
          datat += ' ' + dataa[i].match(/^[^<>]*>/)[0];
          dataa[i] = dataa[i].replace(/^[^<>]*>/,'');
        }
      }
      var tda = toVel(dataa[i].replace(/<[^>]*>/g, '').toLowerCase().replace(/[^āīūṭḍṅṇṃṃñḷĀĪŪṬḌṄṆṂÑḶa-z]/g,''));
      if(!tda || tda.length < 2) {
        datat += ' ' + dataa[i];
      }
      else if(typeof(DPR_G.P[tda]) == 'object' && tda != toVel(ttit)) {
        datat += ' ' + dataa[i].replace(toUni(tda), '<a style="color:'+DPR_G.DPR_prefs['colsel']+'" href="javascript:void(0)" onclick="paliXML(\'PED/' + DPR_G.P[tda][0] + ','+toUni(tda)+'\')">'+toUni(tda)+'</a>');
      }
      else datat += ' ' + dataa[i];

    }
    data = datat.substring(1);
  }


  var outdata = '<p>'+data.replace(/\[([^\]]*)\]/g, "[<em style=\"color:grey\">$1</em>]")+'<hr/>';
  displayDictData(outdata);
  var tout = '';
  if (DPR_G.G_pedhist.length > 1) { // show select
    var showing = '<select title="go to history" onchange="paliXMLHistory(this);"><option>- history -</option>';
    for (var i = DPR_G.G_pedhist.length-1; i >= 0; i--) {
      showing += '<option value="'+DPR_G.G_pedhist[i]+'"';
      if (i == DPR_G.G_phmark) { showing += ' selected'; }
      var dhs = DPR_G.G_pedhist[i].split(',');
      showing += '>' + (dhs[1] ? dhs[1] : dhs[0]) + '</option>';
    }
    showing += '</select>';
    tout += (tout.length > 0 ? ' ' : '') + showing;
  }


  // get number
  var tname, lname, nname;

  if(DPR_G.P[toVel(ttit)]) {
    if(DPR_G.G_peda.length == 0) {
      for (var i in DPR_G.P) {
        for (var j in DPR_G.P[i]) {
          DPR_G.G_peda.push([i,DPR_G.P[i][j]]);
        }
      }
    }
    for (var i=0; i < DPR_G.G_peda.length;i++) {
      if(tname) {
        nname = DPR_G.G_peda[i][1]+","+toUni(DPR_G.G_peda[i][0]);
        break;
      }
      if (DPR_G.G_peda[i][0] == toVel(ttit) && DPR_G.G_peda[i][1] == DPR_G.pedfileget) {
        tname = DPR_G.G_peda[i][1]+","+toUni(DPR_G.G_peda[i][0]);
      }
      else lname = DPR_G.G_peda[i][1]+","+toUni(DPR_G.G_peda[i][0]);
    }
  }

  if (lname) tout += '<span class="abut lbut tiny" onclick="paliXML(\'PED/'+lname+'\')" />&lt;</span>';
  if (nname) tout += '<span class="abut rbut tiny" onclick="paliXML(\'PED/'+nname+'\')" />&gt;</span>';


  $('#difhist').html('<table><tr><td>' + tout + '</td></tr></table>');

  if(document.getElementById('bottom')) {
    document.getElementById('cdif').scrollTop=0;
    DPRBottomPaneUpdateStyle()
  }
  else document.getElementById('dictc').scrollTop=0;

  // permalink

  if(DPR_PAL.isDictionaryFeature()) {
    var permalink = document.location.href;
    if(/\&entry=/.exec(permalink)) {
      permalink = permalink.replace(/&entry=[^&]*/,'&entry='+toVel(filein));
    }
    else permalink += '&entry='+toVel(filein);
    try {
      window.history.replaceState('Object', 'Title', permalink);
    }
    catch(ex) {
    }
  }


}

async function toggleDppnTitle(link,id) {
  appInsights.trackEvent({ name: 'toggleDppnTitle',  properties: { link,id, }});

  if(document.getElementById(id).innerHTML.length > 0) {
    document.getElementById(id).style.display = 'none';
    document.getElementById(id).innerHTML = '';
    return;
  }

  var data = await getDppnData(link);

  document.getElementById(id).style.display = 'block';
  document.getElementById(id).innerHTML =  data;
}

DPR_G.G_dppn = [];
DPR_G.G_dppnhist = [];
DPR_G.G_dhmark = 0;

async function DPPNXMLHistory(opts) {
  if(opts.selectedIndex != 0) {
    DPR_G.G_dhmark = opts.length - 1 - opts.selectedIndex;
    await DPPNXML(opts.options[opts.selectedIndex].value,1);
  }
}

async function DPPNXML(filein,which,add)
{
  appInsights.trackEvent({ name: 'DPPNXML',  properties: { filein,which,add, }});

  addJS(['dppn','nameno']);

  if(add == 'right') return;
  if(add == true) {
    await sendDPPNXML(toVel(filein),true);
    return;
  }

  moveFrame(1);
  var file = filein;

  var filea = file.split(',');
  var tloc = filea[0].split('/');
  if (DPR_G.Dn[tloc[2]+'^'+filea[1]]) { // fudge
    var tt = DPR_G.Dn[tloc[2]+'^'+filea[1]];
    if (tt == '' || !DPR_G.D[tt]) {
      alert('Link not found');
      return;
    }
    tloc = [tt].concat(DPR_G.D[tt][0].split('/'));
  }

  tloc[0] = toVel(tloc[0]);

  clearDivs('dif');
  moveFrame(1);

  if(!which) { // not from select
    var dppnhistt = [];
    DPR_G.G_dppnhist = DPR_G.G_dppnhist.slice(0,DPR_G.G_dhmark+1); // cut old future
    for (var i in DPR_G.G_dppnhist) {
      if (DPR_G.G_dppnhist[i] != file) { dppnhistt.push(DPR_G.G_dppnhist[i]); }
    }
    DPR_G.G_dppnhist = dppnhistt.concat([file]); // add latest
    DPR_G.G_dhmark = DPR_G.G_dppnhist.length; // set mark to latest
  }




  // xml

  var xmlDoc = await DPR_DataLoader.loadXDPPN(tloc[1]);

  var data = ' ' + xmlDoc.getElementsByTagName('e')[tloc[2]].textContent.replace(/\[/g, '<').replace(/\]/g, '>').replace(/href/g, 'style="color:blue" href').replace(/\.  /g, '.&nbsp; ');

  // output

    displayDictData(data);

  // get number
  var tname, lname, nname;

  if(DPR_G.G_dppn.length == 0) {
    for (var i in DPR_G.D) {
      for (var j in DPR_G.D[i]) {
        DPR_G.G_dppn.push([i,DPR_G.D[i][j]]);
      }
    }
  }
  for (var i in DPR_G.G_dppn) {
    if(tname) {
      nname = "'"+toUni(DPR_G.G_dppn[i][0])+'/'+DPR_G.G_dppn[i][1]+"','"+toUni(DPR_G.G_dppn[i][0])+"'";
      break;
    }
    if (DPR_G.G_dppn[i][0] == tloc[0] && DPR_G.G_dppn[i][1] == tloc[1]+'/'+tloc[2]) {
      tname = "'"+toUni(DPR_G.G_dppn[i][0])+'/'+DPR_G.G_dppn[i][1]+"','"+toUni(DPR_G.G_dppn[i][0])+"'";
    }
    else lname = "'"+toUni(DPR_G.G_dppn[i][0])+'/'+DPR_G.G_dppn[i][1]+"','"+toUni(DPR_G.G_dppn[i][0])+"'";
  }
  if (!tname) lname = null;
  // buttons

  var tout = '';

  if (DPR_G.G_dppnhist.length > 1) { // show select
    var showing = '<select title="go to history" onchange="DPPNXMLHistory(this)"><option>- history -</option>';
    for (var i = DPR_G.G_dppnhist.length-1; i >= 0; i--) {
      showing += '<option value="'+DPR_G.G_dppnhist[i]+'"';
      if (i == DPR_G.G_dhmark) { showing += ' selected'; }
      var dhs = DPR_G.G_dppnhist[i].split(',');
      showing += '>' + (dhs[1] ? dhs[1] : dhs[0]) + '</option>';
    }
    showing += '</select>';
    tout += (tout.length > 0 ? ' ' : '') + showing;

  }

  if (lname) tout += '<span class="abut lbut tiny" onclick="DPPNXML('+lname+')" />&lt;</span>';
  if (nname) tout += '<span class="abut rbut tiny" onclick="DPPNXML('+nname+')" />&gt;</span>';


  $('#difhist').html('<table><tr><td>' + tout + '</td></tr></table>');
  if(document.getElementById('bottom')) {
    document.getElementById('cdif').scrollTop=0;
    DPRBottomPaneUpdateStyle();
  }
  else document.getElementById('dictc').scrollTop=0;

  // permalink

  if(DPR_PAL.isDictionaryFeature()) {
    var permalink = document.location.href;
    if(/\&entry=/.exec(permalink)) {
      permalink = permalink.replace(/&entry=[^&]*/,'&entry='+toVel(filein));
    }
    else permalink += '&entry='+toVel(filein);
    try {
      window.history.replaceState('Object', 'Title', permalink);
    }
    catch(ex) {
    }
  }

}

DPR_G.G_skt = [];
DPR_G.G_skthist = [];
DPR_G.G_shmark = 0;

async function sktRXML(no,add)
{
  appInsights.trackEvent({ name: 'sktRXML',  properties: { no,add, }});

  if(add == 'right') return;
  if(add == true) {
    //await sendDPPNXML(toVel(filein),true);
    //return;
  }

  //moveFrame(1);

  clearDivs('dif');

  if(/[^0-9]/.test(no)) {
    for(var i = 0; i < DPR_G.sktR.length;i++) {
      if (DPR_G.sktR[i] == no) {
        no = i;
        break;
      }
    }
    if(/[^0-9]/.test(no))
      return;
  }

  // xml

  var xmlDoc = await DPR_DataLoader.loadSARoots(makeUniqueStringForCaseInsensitiveFS(DPR_G.sktR[no]));
  var s = new XMLSerializer();
  var data = s.serializeToString(xmlDoc);

  data = data.replace(/<p><a href="index.htm">Index<\/a><\/p>/,'').replace(/<a href="([^.]+)[^>]+/g,"<a class=\"green\" href=\"javascript:void(0)\" onclick=\"sktRXML('$1')\"");

  // output

    displayDictData(data);

  // scroll

  if(document.getElementById('bottom')) {
    document.getElementById('cdif').scrollTop=0;
    DPRBottomPaneUpdateStyle();
  }
  else document.getElementById('dictc').scrollTop=0;

  // permalink

  if(DPR_PAL.isDictionaryFeature()) {
    var permalink = document.location.href;
    if(/\&entry=/.exec(permalink)) {
      permalink = permalink.replace(/&entry=[^&]*/,'&entry='+no);
    }
    else permalink += '&entry='+no;
    try {
      window.history.replaceState({}, 'Title', permalink);
    }
    catch(ex) {
    }
  }

}


async function sktXML(entry,idx,which,add)
{
  appInsights.trackEvent({ name: 'sktXML',  properties: { entry,idx,which,add, }});

  addJS(['/sa/dict/index.js']);

  if(add == 'right') return;
  if(add == true) {
    //await sendPaliXML(toVel(filein.split(',')[1]),true);
    return;
  }

  clearDivs('dif');

  var char = entry.charAt(0);

  var xmlDoc = await DPR_DataLoader.loadSADictionary(makeUniqueStringForCaseInsensitiveFS(char));;

  var data = xmlDoc.getElementsByTagName('u')[idx];
  var ser = new XMLSerializer();
  data = ser.serializeToString(data);

  data = data.replace(/<(\/*)d/g,"<$1td").replace(/<(\/*)u/g,"<$1table").replace(/<(\/*)r/g,"<$1tr").replace(/<(\/*)f/g,"<$1font").replace(/ c=["']g/g,' style="color:green').replace(/ c=["']b/g,' style="color:blue').replace(/ c=["']r/g,' style="color:red').replace(/ s=["']-1/g,'  style="font-size:75%').replace(/" style="/g,';');

    displayDictData(data);

  // permalink

  if(DPR_PAL.isDictionaryFeature()) {
    var permalink = document.location.href;
    if(/\&entry=/.exec(permalink)) {
      permalink = permalink.replace(/&entry=[^&]*/,'&entry='+entry);
    }
    else permalink += '&entry='+entry;
    try {
      window.history.replaceState('Object', 'Title', permalink);
    }
    catch(ex) {
    }
  }


}


async function getAtthXML(num,type,niklist) { // get atthakatha or tika word
  appInsights.trackEvent({ name: 'getAtthXML',  properties: { num,type,niklist, }});

    if(type == 'a') {
    addJS(['attlist']);
    var loca = DPR_G.attlist[num].split('#');
    var word = loca.shift();
  }
  else {
    addJS(['tiklist']);
    var loca = DPR_G.tiklist[num].split('#');
    var word = loca.shift();
  }

    var finout = '';

    location:
    for (var i in loca) {
        var pca = loca[i].split('^');
        var nikaya = pca[0];

        // specify nikayas

    if(niklist.indexOf(nikaya) == -1) continue;

        var book = parseInt(pca[1])+1;

        var bookload = nikaya + book + type;
        var xmlDoc = await XML_Load.loadXMLFileAsync(bookload,0);

    if (nikaya == 'k') {
      var bookno = DPR_G.kudvala[book];
    }
    else if(nikaya == 'y') {
      var bookno = DPR_G.abhivala[book];
    }
    else var bookno = pca[1];

        var meta = pca[2];
        var volume = pca[3];
        var vagga = pca[4];
        var sutta = pca[5];
        var section = pca[6];
        var para = pca[7];

        var metalist = '';
        var volumelist = '';
        var vaggalist = '';
        var suttalist = '';
        var sectionlist = '';

        var placen = DPR_G.G_nikLongName[nikaya] + '-'+type+' ' + book;

        var u = xmlDoc.getElementsByTagName("h0");
        if (u.length > 1) placen += '.' + (parseInt(meta)+1);
        var v = u[meta].getElementsByTagName("h1");
        if (v.length > 1) placen += '.' + (parseInt(volume)+1);
        var w = v[volume].getElementsByTagName("h2");
        if (w.length > 1) placen += '.' + (parseInt(vagga)+1);
        var x = w[vagga].getElementsByTagName("h3");
        if (x.length > 1) placen += '.' + (parseInt(sutta)+1);
        var y = x[sutta].getElementsByTagName("h4");
        if (y.length > 1) placen += '.' + (parseInt(section)+1);
        var z = y[section].getElementsByTagName("p")[para].textContent.substring(4);

        placen += ' Para. ' + (parseInt(para)+1);
        finout += '<p><span class="abut obut tiny" onclick="openPlace([\''+nikaya+'\','+bookno+','+pca[2]+','+pca[3]+','+pca[4]+','+pca[5]+','+pca[6]+',\''+type+'\'],'+(parseInt(pca[7])+1)+',[\''+toUni(word)+'\'],eventSend(event))">'+placen+'</span> '+preparepali(z,1)[0]+'</p>';
    }

    displayDictData(finout);

    setCurrentTitle(toUni(word)+' in the '+DPR_G.G_hTitles[DPR_G.G_hNumbers[type]]);
}

async function getTitleXML(num,mul,att,tik,niklist) { // get titles for title search
  appInsights.trackEvent({ name: 'getTitleXML',  properties: { num,mul,att,tik,niklist, }});

  addJS(['titles']);


  var loca = DPR_G.titlelist[num].split('#');
  var word = loca.shift();

    var finout = '';

    location:
    for (var i in loca) {
        var pca = loca[i].split('^');

    // separate mat
    if((pca[7] == 'm' && !mul) || (pca[7] == 'a' && !att) || (pca[7] == 't' && !tik)) continue;

        // specify nikayas
        var nikaya = pca[0];

    if(niklist.indexOf(nikaya) == -1) continue;


        var book = pca[1];
        var hiert = pca[7];
        var bookload = nikaya + book + hiert;

        var xmlDoc = await XML_Load.loadXMLFileAsync(bookload,0);


    if (hiert != 'm' && nikaya == 'k') {
      var bookno = DPR_G.kudvala[pca[1]];
    }
    else if (hiert != 'm' && nikaya == 'k') {
      var bookno = DPR_G.abhivala[pca[1]];
    }
    else var bookno = parseInt(pca[1])-1;

        var meta = pca[2];
        var volume = pca[3];
        var vagga = pca[4];
        var sutta = pca[5];
        var section = pca[6];
        var depth = pca[8];

        var metalist = '';
        var volumelist = '';
        var vaggalist = '';
        var suttalist = '';
        var sectionlist = '';

    var vna = ' ';
    var wna = ' ';
    var xna = ' ';
    var yna = ' ';
    var zna = ' ';
    var un = xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("han");

    var una = (un[0].childNodes[0] ? un[0].textContent : ' ');

    if(depth > 0) {
      var u = xmlDoc.getElementsByTagName("h0");
      if (u.length > 1) {
        var vn = u[meta].getElementsByTagName("h0n");
        vna = (vn[0].childNodes[0] ? vn[0].textContent : ' ');
      }
      if(depth > 1) {
        var v = u[meta].getElementsByTagName("h1");
        if (v.length > 1) {
          var wn = v[volume].getElementsByTagName("h1n");
          wna = (wn[0].childNodes[0] ? wn[0].textContent : ' ');
        }
        if(depth > 2) {
          var w = v[volume].getElementsByTagName("h2");
          if (w.length > 1) {
            var xn = w[vagga].getElementsByTagName("h2n");
            xna = (xn[0].childNodes[0] ? xn[0].textContent : ' ');
          }
          if(depth > 3) {
            var x = w[vagga].getElementsByTagName("h3");
            if (x.length > 1) {
              var yn = x[sutta].getElementsByTagName("h3n");
              yna = (yn[0].childNodes[0] ? yn[0].textContent : ' ');
            }
            if(depth > 4) {
              var y = x[sutta].getElementsByTagName("h4");
              if (y.length > 1) {
                var zn = y[section].getElementsByTagName("h4n");
                zna = (zn[0].childNodes[0] ? zn[0].textContent : ' ');
              }
            }
          }
        }
      }
    }
    //dalert([nikaya,bookno,meta,volume,vagga,sutta,section]);
    var sn = (hiert == 'm' ? getSuttaNumber(nikaya,bookno,meta,volume,vagga,sutta,section,hiert,(y ? y.length : 1)) : null);
    var placen = convtitle(nikaya,book,una,vna,wna,xna,yna,zna,hiert,1)[0] + (sn ? ' (' + DPR_G.G_nikLongName[nikaya] + ' ' + sn + ')' : '');

        finout += '<p>'+placen+' <span class="abut obut" onclick="openPlace([\''+nikaya+'\',\''+bookno+'\',\''+pca[2]+'\',\''+pca[3]+'\',\''+pca[4]+'\',\''+pca[5]+'\',\''+pca[6]+'\',\''+hiert+'\'],null,null,eventSend(event));">go</span></p>';
    }
    displayDictData(finout);
    if (!DPR_PAL.isXUL) {
      scrollMainPane(0);
    }
}



async function getDppnData(link){
  appInsights.trackEvent({ name: 'getDppnData',  properties: { link, }});

  var xmlDoc = await DPR_DataLoader.loadXDPPN(link.split('/')[0]);;

  var data = ' ' + xmlDoc.getElementsByTagName('e')[parseInt(link.split('/')[1])].textContent.replace(/\[/g, '<').replace(/\]/g, '>').replace(/href/g, 'style="color:blue" href').replace(/\.  /g, '.&nbsp; ');
  return data;
}

function displayDictData(data) {
  if (DPR_PAL.isXUL) {
    var dataNode = document.createElement('div');
    dataNode.innerHTML = data;
    document.getElementById('difb').setAttribute('align','left');
    document.getElementById('difb').appendChild(dataNode);
    document.getElementById('cdif').scrollTop=0;
  } else {
    const difbId = `#${DPR_PAL.getDifId()}`;
    var dataNode = $('<div></div>').html(data);
    $(difbId).html('');
    $(difbId).append(dataNode);
    $('#paliTextContent').scrollTop(0);
  }
}
