'use strict';

// āīūṭḍṅṇṃṃñḷĀĪŪṬḌṄṆṂÑḶ  aiueokgcjtdnpbmyrlvsh

//«»
var G_uniRegExp = /[AIUEOKGCJTDNPBMYRLVSHaiueokgcjtdnpbmyrlvshāīūṭḍṅṇṁṃñḷĀĪŪṬḌṄṆṀṂÑḶ]/;
var G_uniRegExpG = /[AIUEOKGCJTDNPBMYRLVSHaiueokgcjtdnpbmyrlvshāīūṭḍṅṇṁṃñḷĀĪŪṬḌṄṆṀṂÑḶ]/g;
var G_uniRegExpN = /[^AIUEOKGCJTDNPBMYRLVSHaiueokgcjtdnpbmyrlvshāīūṭḍṅṇṁṃñḷĀĪŪṬḌṄṆṀṂÑḶ]/;
var G_uniRegExpNG = /[^AIUEOKGCJTDNPBMYRLVSHaiueokgcjtdnpbmyrlvshāīūṭḍṅṇṁṃñḷĀĪŪṬḌṄṆṀṂÑḶ]/g;
var G_uniRegExpNS = /[^ AIUEOKGCJTDNPBMYRLVSHaiueokgcjtdnpbmyrlvshāīūṭḍṅṇṁṃñḷĀĪŪṬḌṄṆṀṂÑḶ]/;
var G_uniRegExpNSG = /[^ AIUEOKGCJTDNPBMYRLVSHaiueokgcjtdnpbmyrlvshāīūṭḍṅṇṁṃñḷĀĪŪṬḌṄṆṀṂÑḶ]/g;


function outputFormattedData(data,which,place) // calls text prep, then outputs it to preFrame
{

  G_lastcolour = 0; // reset colour changing

  // remove sutta bolding

  if(!which && place[7] == 'm' && ('dmas'.indexOf(place[0]) >= 0 || (place[0] == 'k' && parseInt(place[1]) < 15)) ) {
    data = data.replace(/\^e*b\^/g, '');
  }

  var inarray = preparepali(data,which);

  var finout = inarray[0];

  if(!which) { // not from textpad
    var convout = inarray[1].replace(/  *,/g, ',');
    var saveout = inarray[2].replace(/  *,/g, ',');

    var nikaya = place[0];
    var book = place[1];
    var meta = place[2];
    var volume = place[3];
    var vagga = place[4];
    var sutta = place[5];
    var section = place[6]
    var hier = place[7];



    var transin;
    var transout='';
    transin = addtrans(hier,0,nikaya,book,meta,volume,vagga,sutta,section);
    if (transin) {
      transout += transin.join('&nbsp;');
      document.getElementById('maftrans').innerHTML += transout;
    }

    var convDiv = document.createElement('div');
    convDiv.setAttribute('id','convi');
    convDiv.innerHTML = convout;
    document.getElementById('mafbc').appendChild(convDiv);

    var saveDiv = $('#savei');
    saveDiv.html(saveDiv.html()+saveout);
  }

  var outDiv =  document.createElement('div');
  outDiv.innerHTML = finout;
  if (!DPR_PAL.isXUL) {
    outDiv.id="paliTextContent";
  }
  document.getElementById('mafbc').appendChild(outDiv);

  document.getElementById('maf').scrollTop = 0;

}


function formatuniout(data,which) { // which = 1 prepare without links, 2 with links

  var convout = '';
  var saveout = '';

  var indexpage = '';
  var pageno = '';
  var pagetitle = '';

  var altread = 0;
  var altplus = '';
  var altplusf = '';
  var endpt = 0;
  var unioutb = '';
  var finout = '';
  var outarray = new Array();

  data = data.replace(/ -- /g, ' — ');
  data = data.replace(/\.\.\.pe0\.\.\./g, ' ... pe ...');
  data = data.replace(/([AIUEOKGCJTDNPBMYRLVSHaiueokgcjtdnpbmyrlvshāīūṭḍṅṇṁṃñḷĀĪŪṬḌṄṆṀṂÑḶ])0(?!>)/g, "$1.");
  data = data.replace(/``/g, '“');
  data = data.replace(/`/g, '‘');
  data = data.replace(/'''/g, '’”');
  data = data.replace(/''/g, '”');
  data = data.replace(/'/g, '’');
  data = data.replace(/[”"]ti/g, '” ”ti');
  data = data.replace(/['’]+ti/g, '’ ’ti');
  data = data.replace(/['’][”"]nti/g, 'n’” ”ti');
  data = data.replace(/[”"]nti/g, 'n” ”ti');
  data = data.replace(/['’]+nti/g, 'n’ ’ti');
  data = data.replace(/\^b\^/g, '<@>');
  data = data.replace(/\^eb\^/g, '</@>');
  data = data.replace(/["]+<\/@>nti/g, 'n”</@> ”ti');
  data = data.replace(/['’]+<\/@>nti/g, 'n’</@> ’ti');
  data = data.replace(/["]+<\/@>ti/g, '”</@> ”ti');
  data = data.replace(/['’]+<\/@>ti/g, '’</@> ’ti');

  if(DPR_prefs['nigahita']) {
    data = data.replace(/ṃ/g, 'ṁ');
    data = data.replace(/Ṃ/g, 'Ṁ');
  }

  if(!DPR_prefs['showPages']) data = data.replace(/ *\^a\^[^^]*\^ea\^ */g,' ');
  else {
    data = data.replace(/\^a\^\"/g, ' z');
    data = data.replace(/\"\^ea\^/g, 'z ');
    data = data.replace(/\^a\^/g, ' z');
    data = data.replace(/\^ea\^/g, 'z ');
  }

  //data = data.replace(/\^v/g, '');
  //data = data.replace(/v\^/g, '');

  if(!DPR_prefs['showVariants']) data = data.replace(/ *\{[^}]*\} */g,' ');
  else data = data.replace(/\}/g, '} ').replace(/\{/g, ' {');

  data = data.replace(/   */g, ' ');

  data = data.replace(/([^.])\.\.(?!\.)/g, "$1."); // double periods

  var uniouta = toUni(data).replace(/[”’] ([”’])/g, " $1").split(' ');

  var wordbyword = data.split(' ');
  var addpre = '';
  var paran=1;

  var wb;
  var b = 0;
  var space = ' ';

  for (var a = 0; a < wordbyword.length; a++)
  {

    wb = wordbyword[a];

    if (/^[,;.!?]$/.exec(wb)) {
      convout += wb + ' ';
      saveout += wb + ' ';
      finout += wb + ' ';
      continue;
    }

    // remove space where extra quotes were
    space = ' ';
    if(/[”’]/.exec(wb.charAt(wb.length-1)) && wordbyword[a+1] && wb.charAt(wb.length-1) == wordbyword[a+1].charAt(0)) {
      space = '';
    }


    // VAR readings

    if (altread == 1) {
      endpt = wb.length-1;
      if (wb.charAt(endpt) == '}') {
        altplus += wb.substring(0,endpt);
        altread = 0;
        altplus = translit(toUni(altplus));
        altplus = altplus.replace(/0/g, '.').replace(/ /g, '&nbsp;');
        //finout += '{'+altplus+'}' + space;
        if(DPR_prefs['showVariantsInline']) {
          altplusf += '<span class="text tiny varc pointer" style="color:'+DPR_prefs['grey']+'" id="W' + b + '" onmouseup="sendAnalysisToOutput(&#39;' + wb.replace(/"/g,'x').replace(/<[^>]*>/g, '') + '&#39;,' + b + ',0,eventSend(event))">' +  toUni(wb.substring(0,endpt)) + '</span>}';
          finout += altplusf + space;
          b++;
          saveout += ' <span class="varc">'+altplus+'</span>' + space;
        }
        else {
          finout += ' <span class="text tiny varc" style="color:'+DPR_prefs['grey']+'" onmouseover="$(\'span\', this).show(); if($(\'span\', this).offset().left+$(\'span\', this).width() > $(window).width()){$(\'span\', this).offset({left:($(window).width()-$(\'span\', this).width()-30)})}" onmouseout="$(\'span\', this).hide()">VAR<span class="tiny var chromeback">'+altplus+'</span></span>' + space;
          saveout += ' <span class="varc" title="'+altplus+'">VAR</span>' + space;
        }
      }
      else {
        altplus += wb + ' ';
        if(DPR_prefs['showVariantsInline'] && which  != 1) {
          altplusf += '<span class="text tiny varc pointer" style="color:'+DPR_prefs['grey']+'" id="W' + b + '" onmouseup="sendAnalysisToOutput(&#39;' + wb.replace(/"/g,'x').replace(/<[^>]*>/g, '') + '&#39;,' + b + ',0,eventSend(event))">' +  toUni(wb) + '</span>' + space;
          b++;
        }
      }
    }
    else if (wb.charAt(0) == '{') {
      if (wb.charAt(wb.length-1) == '}') {
        altplus = wb.substring(1,wb.length-1) + ' ';
        altplus = translit(toUni(altplus));
        altplus = altplus.replace(/0/g, '.').replace(/ /g, '&nbsp;');
        //finout += '{'+altplus+'}' + space;
        if(DPR_prefs['showVariantsInline']) {
          finout += '{<span class="text tiny varc pointer" style="color:'+DPR_prefs['grey']+'" id="W' + b + '" onmouseup="sendAnalysisToOutput(&#39;' + wb.replace(/"/g,'x').replace(/<[^>]*>/g, '') + '&#39;,' + b + ',0,eventSend(event))">' +  toUni(altplus) + '</span>}' + space;
          saveout += ' <span class="varc">'+altplus+'</span>' + space;
          b++;
        }
        else {
          finout += ' <span class="text tiny varc" style="color:'+DPR_prefs['grey']+'" onmouseover="$(\'span\', this).show(); if($(\'span\', this).offset().left+$(\'span\', this).width() > $(window).width()){$(\'span\', this).offset({left:($(window).width()-$(\'span\', this).width()-30)})}" onmouseout="$(\'span\', this).hide()">VAR<span class="tiny var chromeback">'+altplus+'</span></span>' + space;
          saveout += ' <span class="varc" title="'+altplus+'">VAR</span>' + space;
        }
      }
      else {
        altread = 1;
        altplus = wb.substring(1) + space;
        if(DPR_prefs['showVariantsInline'] && which  != 1) {
          altplusf = '{<span class="text tiny varc pointer" style="color:'+DPR_prefs['grey']+'" id="W' + b + '" onmouseup="sendAnalysisToOutput(&#39;' + wb.replace(/"/g,'x').replace(/<[^>]*>/g, '') + '&#39;,' + b + ',0,eventSend(event))">' + toUni(wb.substring(1)) + '</span>' + space;
          b++;
        }
      }
    }

    // search term coloured text

    else if (wb.indexOf('<c') >= 0) {
      var fullwordout = [];
      fullwordout[0] = '';
      fullwordout[1] = '';
      while (wb.indexOf('<c') >= 0) {
        var cp = wb.indexOf('<c');
        if(cp > 0) { // something before
          if (which) {
            finout += translit(toUni(wb.substring(0,cp))); b++;
          }
          else {
            fullwordout[0] += wb.substring(0,cp).replace(/"/g, 'x').replace(/<[^>]*>/g, '');
            fullwordout[1] += translit(toUni(wb.substring(0,cp)));
          }
          convout += wb.substring(0,cp).replace(/<[^>]*>/g, '');
          saveout += wb.substring(0,cp).replace(/<[^>]*>/g, '');
        }

        var cno = wb.substring(cp,cp+4); // <c1>

        wb = wb.substring(cp+4);

        var cm = wb.search('<xc>');

        if (which == 1) {
          finout += cno + translit(toUni(wb.substring(0,cm)))+'<xc>'; b++;
        }
        else {
          fullwordout[0] += wb.substring(0,cm).replace(/"/g, 'x').replace(/<[^>]*>/g, '');
          fullwordout[1] += cno + translit(toUni(wb.substring(0,cm))) + '<xc>';
        }

        convout += wb.substring(0,cm).replace(/<[^>]*>/g, '');
        saveout += wb.substring(0,cm).replace(/<[^>]*>/g, '');

        wb = wb.substring(cm+4);
      }
      if(wb.length > 0) { // anything left?
        if (which == 1) {
          finout += translit(toUni(wb)); b++;
        }
        else {
          fullwordout[0] += wb.replace(/"/g, 'x').replace(/<[^>]*>/g, '');
          fullwordout[1] += translit(toUni(wb));
        }
        convout += wb.replace(/<[^>]*>/g, '');
      }
      if(!which == 1) {// put it together as one link
        finout += '<span id="W' + b + '" class="pointer" onmouseup="sendAnalysisToOutput(&#39;' + fullwordout[0] +  '&#39;,' + b + ',0,eventSend(event))">' +  fullwordout[1] + '</span>'; b++;
      }
      finout += space;
      saveout += space;
      convout += space;
    }
    else if (/^&nbsp;/.exec(wb)) {
      finout += wb + space;
      saveout += wb + space;
    }
    else if (/^<\/*[fp]>$/.exec(wb)) {
      finout += wb + space;
      saveout += wb + space;
    }
    else if (/^<p/.exec(wb) && which !=2) { // 2 means coming from textbox
      var parap = wb.split('|');
      var ptype = parap[1];
      var permalink = parap[2].replace(/_/g,' ');
      if(convout.length>1) convout += '\n\n';
      finout += '<p class="paratype'+ptype+'" id="para'+paran+'">'+(DPR_prefs['showPermalinks'] ? '<span class="pointer '+(G_thisPara && G_thisPara == paran?'green':'hoverShow')+'" onclick="permalinkClick(\''+permalink+'\',1);" title="Click to copy permalink to clipboard">&diams;&nbsp;</span>' :'');
      saveout += '<p class="paratype'+ptype+'"'+'>';
      paran++;
    }
    else if (wb.charAt(0) == 'z') // page numbers
    {
      indexpage = wb.charAt(1);
      pageno = wb.substring(2,wb.length-1);
      switch (indexpage) {
        case 'M':
          pagetitle = 'Myanmar';
          break;
        case 'V':
          pagetitle = 'VRI';
          break;
        case 'P':
          pagetitle = 'PTS';
          break;
        case 'T':
          pagetitle = 'Thai';
          break;
      }


      var ref = pageno.split('.');

      if(!ref[1])
        pagetitle += ' '+pageno;
      else if(/[^0-9]/.exec(ref[0])) { // Thai
        var vp = ref[1].split(',');
        if(vp.length < 2)
          pagetitle += ' '+pageno;
        else
          pagetitle += ' '+ref[0]+'. ' + vp[0] + ', p. ' + vp[1].replace(/^0+/,"");
        if(DPR_prefs['showPagesFull'])
          indexpage = ref[0]+'.' + vp[0] + ',' + vp[1].replace(/^0+/,"");
      }
      else {
        pagetitle += ' vol. ' + ref[0] + ', p. ' + ref[1].replace(/^0+/,"");
        if(DPR_prefs['showPagesFull'])
          indexpage = indexpage+'.'+ref[0]+'.'+ref[1].replace(/^0+/,"");
      }
      finout += ' <span class="tiny pointer" style="color:blue" title="' + pagetitle + '">' + indexpage + '</span>' + space;
      //finout += ' ' + pagetitle +  space;
      saveout += ' <span class="pageno" title="' + pagetitle + '">' + indexpage + '</span>' + space;
    }
    else if (!wb) {
      continue;
    }
    else if (which == 1) // without links
    {
      convout += wb + space;
      unioutb = uniouta[a];
      unioutb = unioutb.replace(/0/g, '.');
      unioutb = translit(unioutb);
      finout += unioutb + space;
      saveout += unioutb + space;
    }
    else  // with links
    {
      convout += wb.replace(/<[^>]*>/g, '') + space;
      unioutb = uniouta[a];
      //unioutb = unioutb.replace(/0/g, '.');
      unioutb = translit(unioutb);
      finout += '<span class="pointer" id="W' + b + '" onmouseup="sendAnalysisToOutput(&#39;' + wb.replace(/"/g,'x').replace(/<[^>]*>/g, '') + '&#39;,' + b + ',0,eventSend(event))">' +  unioutb + '</span>' + space;
      saveout += unioutb + space;
      b++;
    }
  }

  finout = finout.replace(/<@>/g, '<b>');
  finout = finout.replace(/<\/@>/g, '</b>');
  finout = finout.replace(/ +([,;])/g, "$1");

  saveout = saveout.replace(/<@>/g, '<b>');
  saveout = saveout.replace(/<\/@>/g, '</b>');
  saveout = saveout.replace(/ +([,;])/g, "$1");

  outarray[0] = finout;
  outarray[1] = toUni(convout);
  outarray[2] = toUni(saveout);
  return outarray;
}

function preparepali(data,which) { // standard text prep for algorithm

  var finout = formatuniout(data,which);


  // add search markers

  finout[0] = finout[0].replace(/<c0>/g, '<span style="color:'+DPR_prefs['colped']+'">');
  finout[0] = finout[0].replace(/<c1>/g, '<span style="color:'+DPR_prefs['coldppn']+'">');
  finout[0] = finout[0].replace(/<c2>/g, '<span style="color:'+DPR_prefs['colcpd']+'">');
  finout[0] = finout[0].replace(/<xc>/g, '</span>');

  finout[0] = finout[0].replace(/> +([,;.!?] )/g, ">$1");


  return finout;

}

function wrapLink(text,click,url) {
  return '<'+(url?'a href="'+url+'"':'span class="pointer"')+(click?' onclick="'+click+'"':'')+'>'+text+'</'+(url?'a':'span')+'>';
}

function convtitle(nikaya,book,una,vna,wna,xna,yna,zna,hiert,oneline,click)
{
  var lmt = 60;
  var lgt = una.length;

  book = getBookName(nikaya,hiert,book-1);
  var title = '',save = '',raw = '';

  if (G_nikFullFullNames[nikaya]) {
    var nn = '<b>'+G_nikFullFullNames[nikaya]+'</b>';
    title += (click?wrapLink(nn,click):nn) + ', ';
  }

  var col = ['colped','coldppn','colcpd','colped','coldppn','colcpd','colped','coldppn','colcpd'];
  var w = 0;

  // dppn title links

  var namea = [una,vna,wna,xna,yna,zna];
  var namen = [null,null,null,null,null,null];
  if (DPR_prefs['showNames']) {
    addJS(['dppn']);
    for (var i in namea) {
      var tt = toVel(namea[i]).replace(/^[ 0-9.]+ /,'').replace(/[- ]/g,'');
      if(tt.length < 2) continue;
      var dEI = getDppnEntry(tt);
      if (dEI.length > 0) {
        namen[i] = '<span class="super tiny pointer" style="color:'+DPR_prefs['coldppn']+'" title="DPPN entry" onmouseup="sendDPPNXML(\''+toUni(tt)+'/'+dEI.join(','+toUni(tt)+'\',eventSend(event));">&nbsp;n</span><span class="super tiny pointer" style="color:'+DPR_prefs['coldppn']+'" title="DPPN entry" onmouseup="sendDPPNXML(\''+toUni(tt)+'/')+','+toUni(tt)+'\',eventSend(event));">&nbsp;n</span>';
      }
    }
  }

  for (var i=0; i < namea.length;i++) {
    var thisname = translit(toUni(namea[i])).replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,'').replace(/ /g,'&nbsp;')

    if (thisname.length <2 )
      continue;

    if(i != 0){
      if(lgt > lmt && !oneline) {
        title += ',<br/>';
        lgt = 0;
      }
      else {
        title += ', ';
        lgt += namea[1].length;
      }
    }

    var onet = '<b style="color:'+DPR_prefs[col[w++]]+'">' + translit(toUni(thisname)) + '</b>';
    title += (click?wrapLink(onet,click):onet) + (namen[i] ? namen[i] :'');
    save += '<h'+w+'>'+thisname+'</h'+w+'>';
    raw += thisname+(i < namea.length-1?"<br/>":"");
  }

  return [title,save,raw];
}


function analyzeTextPad(text) {
  var titleout = convtitle('Input From Scratchpad',' ',' ',' ',' ',' ',' ',' ');
  $('#mafbc').html('<table width=100%><tr><td align=left></td><td align=center>'+titleout[0]+'</td><td id="maftrans" align="right"></td></tr></table>');
  outputFormattedData('<p> '+text.replace(/\n/g,' <p> ').replace(/\t/g,' '),2);
}

var pleasewait =  document.createElement('div');
pleasewait.setAttribute('align','center');
pleasewait.innerHTML = '<br/><br/><br/><br/><img class="spin-img-infinitely" src="'+DPR_PAL.contentFolder+'images/dwheel.png" /><br/><br/><br/><br/>';



function permalinkClick(link,url) {
  try {
    copyToClipboard(link);
    if(url && DPR_PAL.mainWindow) {
      mainWindow.gBrowser.selectedTab.linkedBrowser.contentWindow.history.replaceState('Object', 'Title', link);
    }
    alertFlash("Permalink copied to clipboard.",'green');
  }
  catch(ex) {
    alertFlash("Unable to copy permalink.",'red');
  }
}

var copyToClipboard = DPR_PAL.copyToClipboard;

var G_alertFlashStart = 0;

function alertFlash(text,color) {
  if(!$) // sidebar
    return alert(text);

  G_alertFlashStart++; // give us an alert Id
  if(color) {

    switch (color) {
      case 'red':
      color = 'RGBa(255,64,64,1)';
      break;
      case 'green':
      color = 'RGBa(64,255,64,1)';
      break;
      case 'yellow':
      color = 'RGBa(255,255,64,1)';
      break;
    }
    $('#alert').css('background-color',color);

  }
  $('#alert').html(text);
  $('#alertc').fadeIn('fast').delay(2000).fadeOut('fast');

  //fadeInOut(G_alertFlashStart,'alertc',10,Math.sqrt(text.length)*500,100);
}


function fadeInOut(AID,id, sIn, L, sOut) {
  if(AID != G_alertFlashStart) return;
  fadeIn(AID,id,sIn,L,sOut);
}
function fadeIn(AID,id,speed,L,sOut) {
  if(AID != G_alertFlashStart) return;
  if(parseFloat(document.getElementById(id).style.opacity) < 1) {
    document.getElementById(id).style.opacity = parseFloat(document.getElementById(id).style.opacity)+0.1;
    setTimeout(function() { fadeIn(AID,id,speed*0.9,L,sOut); }, speed*0.9);
  }
  else {
    document.getElementById(id).style.display='block';
    if(L) setTimeout(function() { fadeOut(AID,id,sOut); }, L);
  }
}

function fadeOut(AID,id,speed) {
  if(AID != G_alertFlashStart) return;
  if(parseFloat(document.getElementById(id).style.opacity) > 0.1) {
    document.getElementById(id).style.opacity = parseFloat(document.getElementById(id).style.opacity)-0.1;
    setTimeout(function() { fadeOut(AID,id,speed*0.9); }, speed*0.9);
  }
  else document.getElementById(id).style.display='none';
}

function clearDivs(which) { // place divs to be cleared here
  if (!which || which.indexOf('dif') > -1) { // dictionary frame stuff
    $('#difhist').html('');
    $(`#${DPR_PAL.getDifId()}`).html('');
  }
  if (!which || which.indexOf('dict') > -1) { // dictionary search stuff
    $('#dict').html('');
    $('#difhist').html('');
    $(`#${DPR_PAL.getDifId()}`).html('');
  }
  if (!which || which.indexOf('anf') > -1) { // analyze frame stuff
    $('#anfs').html('');
    $('#anfsd').html('');
    $('#anfb').html('<div align=left id="anfc"></div><div align=right id="anfd"></div>');
  }
  if (!which || which.indexOf('maf') > -1) { // analyze frame stuff
    $('#mafbc').html('');
    $('#matrelc').html('');
  }

  if (!which || which.indexOf('search') > -1) { // search frame stuff
    $('#sbfa').html('');
    $('#sbfb').html('');
    $('#sbfab').html('');
    $('#stfb').html('');
    $('#stfc').html('');
    $('#showing').html('');
    document.getElementById('searchb').scrollTop = 0;
  }
}

function makeToolbox(main,aux,title,conv,ex,save,trans) {
  if (DPR_PAL.isWeb) {
    $('.nav-context-div').html('<button type="button" id="contextButton" data-html="true" data-container="body" data-toggle="popover">\u2234</button><div id="tbContainer2" style="display: none"><div id="MainToolbar" class="obutc">'+digitalpalireader.makeWebAppropriate(main)+'</div>'+(aux?'<div id="auxToolbar" class="obutc">'+digitalpalireader.makeWebAppropriate(aux)+'</div>':'')+'</div>'+'</div>');
    $('.nav-context-div').popover({
      trigger: 'click',
      html: true,
      content: () => $('#tbContainer2').html(),
    })
    return;
  }//TODO:MovetoMarkupLater

  if(main === false) {
    $('#tbContainer').html('');
    $('#tbContainer').hide();
    return;
  }
  $('#tbContainer').show();

  var but = ['l','m','r'];
  var bn = 0;
  var pre = '<div class="tiny tbtitle">'+title+'</div><hr style="margin-bottom:10px"/>';
  if(conv) {
    pre += '<span class="abut '+but[bn++]+'but small" onmousedown="sendTextToConvertor()" title="send text to convertor (s)">convert</span>';
  }
  if(ex) {
    pre += '<span class="abut '+but[bn++]+'but small" onmousedown="sendTextToTextpad(event)" title="send text to textpad (e)">export</span>';
  }
  if(save) {
    pre += '<span class="abut '+but[bn++]+'but small" onmousedown="saveCompilation()" title="save text to Desktop">save</span>';
  }
  main = pre + ' ' + main;

  $('#tbContainer').html('<div id="tbOpener" class="tiny">&there4;</div><div id="tbContainer2"><div id="MainToolbar" class="obutc">'+main+'</div>'+(aux?'<div id="auxToolbar" class="obutc">'+aux+'</div>':'')+'</div>');
}

function makeTable(text,cls) {
  var out = '<table class="'+cls+'-table">';
  for(var i in text) {
    out += '<tr class="'+cls+'-row-'+(parseInt(i)+1)+'">';
    for(var j in text[i]) {
      out += '<td class="'+cls+'">'+text[i][j]+'</td>';
    }
    out += '</tr>';
  }
  out += '</table>';
  return out;
}


function linkToPED(base,word) {
  addJS(['ped']);

  var vbase = toVel(base);

  if(typeof(P[vbase]) == 'object') {
    word = '<span style="color:'+DPR_prefs['colsel']+'" class="pointer" onclick="paliXML(\'PED/' + P[vbase][0] + ','+base+'\',true)">'+word+'</span>';
  }
  return word;
}

function joinArray(s,a) {
  var oa = '';
  for(var i = 0; i < a.length; i++) {
    if(a[i])
      oa += (oa?s:'')+a[i];
  }
  return oa;
}

function getNameHTML(dEI,tt) {
  var namen = '<span class="super tiny pointer" style="color:'+DPR_prefs['coldppn']+'" title="DPPN entry" onmouseup="sendDPPNXML(\''+toUni(tt)+'/'+dEI.join(','+toUni(tt)+'\',eventSend(event,1));">&nbsp;n</span><span class="super tiny pointer" style="color:'+DPR_prefs['coldppn']+'" title="DPPN entry" onmouseup="sendDPPNXML(\''+toUni(tt)+'/')+','+toUni(tt)+'\',eventSend(event,1));">&nbsp;n</span>';
  return namen;
}
