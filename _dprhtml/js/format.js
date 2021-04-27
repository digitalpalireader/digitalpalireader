'use strict';

var DPR1_format_mod = ( function () {
// āīūṭḍṅṇṃṃñḷĀĪŪṬḌṄṆṂÑḶ  aiueokgcjtdnpbmyrlvsh

//«»
DPR_G.G_uniRegExp = /[AIUEOKGCJTDNPBMYRLVSHaiueokgcjtdnpbmyrlvshāīūṭḍṅṇṁṃñḷĀĪŪṬḌṄṆṀṂÑḶ]/;
DPR_G.G_uniRegExpG = /[AIUEOKGCJTDNPBMYRLVSHaiueokgcjtdnpbmyrlvshāīūṭḍṅṇṁṃñḷĀĪŪṬḌṄṆṀṂÑḶ]/g;
DPR_G.G_uniRegExpN = /[^AIUEOKGCJTDNPBMYRLVSHaiueokgcjtdnpbmyrlvshāīūṭḍṅṇṁṃñḷĀĪŪṬḌṄṆṀṂÑḶ]/;
DPR_G.G_uniRegExpNG = /[^AIUEOKGCJTDNPBMYRLVSHaiueokgcjtdnpbmyrlvshāīūṭḍṅṇṁṃñḷĀĪŪṬḌṄṆṀṂÑḶ]/g;
DPR_G.G_uniRegExpNS = /[^ AIUEOKGCJTDNPBMYRLVSHaiueokgcjtdnpbmyrlvshāīūṭḍṅṇṁṃñḷĀĪŪṬḌṄṆṀṂÑḶ]/;
DPR_G.G_uniRegExpNSG = /[^ AIUEOKGCJTDNPBMYRLVSHaiueokgcjtdnpbmyrlvshāīūṭḍṅṇṁṃñḷĀĪŪṬḌṄṆṀṂÑḶ]/g;

var b_global = 0;


async function outputFormattedData(sectionId, data,which,place,shortcutFns) // calls text prep, then outputs it to preFrame
{

  DPR_G.G_lastcolour = 0; // reset colour changing

  // remove sutta bolding

  if(!which && place[7] == 'm' && ('dmas'.indexOf(place[0]) >= 0 || (place[0] == 'k' && parseInt(place[1]) < 15)) ) {
    data = data.replace(/\^e*b\^/g, '');
  }

  var inarray = preparepali(sectionId,data,which);

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

    var transin = await DPR_Translations.addtrans(hier,0,nikaya,book,meta,volume,vagga,sutta,section);
    if(transin && shortcutFns) {
      $
        .parseHTML(transin.join(''))
        .map(x => $(x).find('img'))
        .filter(x => x.length)
        .map(x => ({ title: $(x).attr('title'), src: $(x).attr('src'), onmouseup: $(x).attr('onmouseup') }))
        .forEach((x, i) => {
          shortcutFns[`${DPR_CMD_TRANSLATE_}${i}`] = {
            canExecuteStr: 'true',
            executeStr: x.onmouseup,
            titleStr: x.title,
            visibleStr: 'true',
            icon: x.src,
          };
        });
    }

    var convDiv = document.createElement('div');
    convDiv.setAttribute('id','convi');
    convDiv.innerHTML = convout;
    $(`${DPR_Chrome.getSectionElementId(sectionId)} #mafbc`)[0].appendChild(convDiv);

    var saveDiv = $('#savei');
    saveDiv.html(saveDiv.html()+saveout);
  }

  var outDiv =  document.createElement('div');
  outDiv.innerHTML = finout;
  if (!DPR_PAL.isXUL) {
    outDiv.id="paliTextContent";
  }
  $(`${DPR_Chrome.getSectionElementId(sectionId)} #mafbc`)[0].appendChild(outDiv);

  $(`${DPR_Chrome.getSectionElementId(sectionId)} #maf`)[0].scrollTop = 0;

}


function formatuniout(sectionId, data,which) { // which = 1 prepare without links, 2 with links, 3 with links from search results page

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

  if(DPR_G.DPR_prefs['nigahita']) {
    data = data.replace(/ṃ/g, 'ṁ');
    data = data.replace(/Ṃ/g, 'Ṁ');
  }

  if(!DPR_G.DPR_prefs['showPages']) data = data.replace(/ *\^a\^[^^]*\^ea\^ */g,' ');
  else {
    data = data.replace(/\^a\^\"/g, ' z');
    data = data.replace(/\"\^ea\^/g, 'z ');
    data = data.replace(/\^a\^/g, ' z');
    data = data.replace(/\^ea\^/g, 'z ');
  }

  //data = data.replace(/\^v/g, '');
  //data = data.replace(/v\^/g, '');

  if(!DPR_G.DPR_prefs['showVariants']) data = data.replace(/ *\{[^}]*\} */g,' ');
  else data = data.replace(/\}/g, '} ').replace(/\{/g, ' {');

  data = data.replace(/   */g, ' ');

  data = data.replace(/([^.])\.\.(?!\.)/g, "$1."); // double periods

  var uniouta = DPR_translit_mod.toUni(data).replace(/[”’] ([”’])/g, " $1").split(' ');

  var wordbyword = data.split(' ');
  var addpre = '';
  var paran=1;

  var wb;
  var b = 0;
  if (which == 3) {
    b = b_global;
  }
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
        altplus = DPR_translit_mod.translit(DPR_translit_mod.toUni(altplus));
        altplus = altplus.replace(/0/g, '.').replace(/ /g, '&nbsp;');
        //finout += '{'+altplus+'}' + space;
        if(DPR_G.DPR_prefs['showVariantsInline']) {
        if(which != 1) {
          altplusf += '<span class="text tiny varc pointer" style="color:'+DPR_G.DPR_prefs['grey']+'" id="W' + b + '" onmouseup="DPR1_send_mod.sendAnalysisToOutput(' + `${sectionId}, ` + '&#39;' + wb.replace(/"/g,'x').replace(/<[^>]*>/g, '') + '&#39;,' + b + ',0,DPR1_send_mod.eventSend(event))">' +  DPR_translit_mod.translit(DPR_translit_mod.toUni(wb.substring(0,endpt))) + '</span>}';
        }
        else {
          altplusf += '<span class="text tiny varc" style="color:'+DPR_G.DPR_prefs['grey']+'" id="W' + b + '">' +  DPR_translit_mod.toUni(wb.substring(0,endpt)) + '</span>}';
        }
          finout += altplusf + space;
          b++;
          saveout += ' <span class="varc">'+altplus+'</span>' + space;
        }
        else {
          finout += ' <span class="text tiny varc" style="color:'+DPR_G.DPR_prefs['grey']+'" onmouseover="$(\'span\', this).show(); if($(\'span\', this).offset().left+$(\'span\', this).width() > $(window).width()){$(\'span\', this).offset({left:($(window).width()-$(\'span\', this).width()-30)})}" onmouseout="$(\'span\', this).hide()">VAR<span class="tiny var chromeback">'+altplus+'</span></span>' + space;
          saveout += ' <span class="varc" title="'+altplus+'">VAR</span>' + space;
        }
      }
      else {
        altplus += wb + ' ';
        if(DPR_G.DPR_prefs['showVariantsInline'] && which  != 1) {
          altplusf += '<span class="text tiny varc pointer" style="color:'+DPR_G.DPR_prefs['grey']+'" id="W' + b + '" onmouseup="DPR1_send_mod.sendAnalysisToOutput(' + `${sectionId}, ` + '&#39;' + wb.replace(/"/g,'x').replace(/<[^>]*>/g, '') + '&#39;,' + b + ',0,DPR1_send_mod.eventSend(event))">' +  DPR_translit_mod.translit(DPR_translit_mod.toUni(wb)) + '</span>' + space;
          b++;
        }
      }
    }
    else if (wb.charAt(0) == '{') {
      if (wb.charAt(wb.length-1) == '}') {
        altplus = wb.substring(1,wb.length-1) + ' ';
        altplus = DPR_translit_mod.translit(DPR_translit_mod.toUni(altplus));
        altplus = altplus.replace(/0/g, '.').replace(/ /g, '&nbsp;');
        //finout += '{'+altplus+'}' + space;
        if(DPR_G.DPR_prefs['showVariantsInline']) {
          finout += '{<span class="text tiny varc pointer" style="color:'+DPR_G.DPR_prefs['grey']+'" id="W' + b + '" onmouseup="DPR1_send_mod.sendAnalysisToOutput(' + `${sectionId}, ` + '&#39;' + wb.replace(/"/g,'x').replace(/<[^>]*>/g, '') + '&#39;,' + b + ',0,DPR1_send_mod.eventSend(event))">' +  DPR_translit_mod.translit(DPR_translit_mod.toUni(altplus)) + '</span>}' + space;
          saveout += ' <span class="varc">'+altplus+'</span>' + space;
          b++;
        }
        else {
          finout += ' <span class="text tiny varc" style="color:'+DPR_G.DPR_prefs['grey']+'" onmouseover="$(\'span\', this).show(); if($(\'span\', this).offset().left+$(\'span\', this).width() > $(window).width()){$(\'span\', this).offset({left:($(window).width()-$(\'span\', this).width()-30)})}" onmouseout="$(\'span\', this).hide()">VAR<span class="tiny var chromeback">'+altplus+'</span></span>' + space;
          saveout += ' <span class="varc" title="'+altplus+'">VAR</span>' + space;
        }
      }
      else {
        altread = 1;
        altplus = wb.substring(1) + space;
        if(DPR_G.DPR_prefs['showVariantsInline']) {
          if(which  != 1) {
            altplusf = '{<span class="text tiny varc pointer" style="color:'+DPR_G.DPR_prefs['grey']+'" id="W' + b + '" onmouseup="DPR1_send_mod.sendAnalysisToOutput(' + `${sectionId}, ` + '&#39;' + wb.replace(/"/g,'x').replace(/<[^>]*>/g, '') + '&#39;,' + b + ',0,DPR1_send_mod.eventSend(event))">' + DPR_translit_mod.translit(DPR_translit_mod.toUni(wb.substring(1))) + '</span>' + space;
          }
          else {
            altplusf = '{<span class="text tiny varc" style="color:'+DPR_G.DPR_prefs['grey']+'" id="W' + b + '">' + DPR_translit_mod.translit(DPR_translit_mod.toUni(wb.substring(1))) + '</span>' + space;
          }
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
          if (which && which != 3) {
            finout += DPR_translit_mod.translit(DPR_translit_mod.toUni(wb.substring(0,cp))); b++;
          }
          else {
            fullwordout[0] += wb.substring(0,cp).replace(/"/g, 'x').replace(/<[^>]*>/g, '');
            fullwordout[1] += DPR_translit_mod.translit(DPR_translit_mod.toUni(wb.substring(0,cp)));
          }
          convout += wb.substring(0,cp).replace(/<[^>]*>/g, '');
          saveout += wb.substring(0,cp).replace(/<[^>]*>/g, '');
        }

        var cno = wb.substring(cp,cp+4); // <c1>

        wb = wb.substring(cp+4);

        var cm = wb.search('<xc>');

        if (which == 1) {
          finout += cno + DPR_translit_mod.translit(DPR_translit_mod.toUni(wb.substring(0,cm)))+'<xc>'; b++;
        }
        else {
          fullwordout[0] += wb.substring(0,cm).replace(/"/g, 'x').replace(/<[^>]*>/g, '');
          fullwordout[1] += cno + DPR_translit_mod.translit(DPR_translit_mod.toUni(wb.substring(0,cm))) + '<xc>';
        }

        convout += wb.substring(0,cm).replace(/<[^>]*>/g, '');
        saveout += wb.substring(0,cm).replace(/<[^>]*>/g, '');

        wb = wb.substring(cm+4);
      }
      if(wb.length > 0) { // anything left?
        if (which == 1) {
          finout += DPR_translit_mod.translit(DPR_translit_mod.toUni(wb)); b++;
        }
        else {
          fullwordout[0] += wb.replace(/"/g, 'x').replace(/<[^>]*>/g, '');
          fullwordout[1] += DPR_translit_mod.translit(DPR_translit_mod.toUni(wb));
        }
        convout += wb.replace(/<[^>]*>/g, '');
      }
      if(which != 1) {// put it together as one link
        finout += '<span id="W' + b + '" class="pointer" onmouseup="DPR1_send_mod.sendAnalysisToOutput(' + `${sectionId}, ` + '&#39;' + fullwordout[0] +  '&#39;,' + b + ',0,DPR1_send_mod.eventSend(event))">' +  fullwordout[1] + '</span>'; b++;
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
      var permalink = DPR_PAL.fixupDprBaseUrl(parap[2].replace(/_/g,' '));
      if(convout.length>1) convout += '\n\n';
      finout += '<p class="paratype'+ptype+' localized" script="'+DPR_translit_mod.getTranslitLangId()+'" id="para'+paran+'">'+(DPR_G.DPR_prefs['showPermalinks'] ? '<span class="pointer '+(DPR_G.G_thisPara && DPR_G.G_thisPara == paran?'green':'hoverShow')+'" onclick="DPR1_format_mod.permalinkClick(\''+permalink+'\',1);" title="Click to copy permalink to clipboard">&diams;&nbsp;</span>' :'');
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
        if(DPR_G.DPR_prefs['showPagesFull'])
          indexpage = ref[0]+'.' + vp[0] + ',' + vp[1].replace(/^0+/,"");
      }
      else {
        pagetitle += ' vol. ' + ref[0] + ', p. ' + ref[1].replace(/^0+/,"");
        if(DPR_G.DPR_prefs['showPagesFull'])
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
      unioutb = DPR_translit_mod.translit(unioutb);
      finout += unioutb + space;
      saveout += unioutb + space;
    }
    else  // with links
    {
      convout += wb.replace(/<[^>]*>/g, '') + space;
      unioutb = uniouta[a];
      //unioutb = unioutb.replace(/0/g, '.');
      unioutb = DPR_translit_mod.translit(unioutb);
      finout += '<span class="pointer" id="W' + b + '" onmouseup="DPR1_send_mod.sendAnalysisToOutput(' + `${sectionId}, ` + '&#39;' + wb.replace(/"/g,'x').replace(/<[^>]*>/g, '') + '&#39;,' + b + ',0,DPR1_send_mod.eventSend(event))">' +  unioutb + '</span>' + space;
      saveout += unioutb + space;
      b++;
    }
  }

  b_global = b;

  finout = finout.replace(/<@>/g, '<b>');
  finout = finout.replace(/<\/@>/g, '</b>');
  finout = finout.replace(/ +([,;])/g, "$1");

  saveout = saveout.replace(/<@>/g, '<b>');
  saveout = saveout.replace(/<\/@>/g, '</b>');
  saveout = saveout.replace(/ +([,;])/g, "$1");

  outarray[0] = finout;
  outarray[1] = DPR_translit_mod.toUni(convout);
  outarray[2] = DPR_translit_mod.toUni(saveout);
  return outarray;
}

function preparepali(sectionId,data,which) { // standard text prep for algorithm

  var finout = formatuniout(sectionId, data,which);


  // add search markers

  finout[0] = finout[0].replace(/<c0>/g, '<span style="color:'+DPR_G.DPR_prefs['colped']+'">');
  finout[0] = finout[0].replace(/<c1>/g, '<span style="color:'+DPR_G.DPR_prefs['coldppn']+'">');
  finout[0] = finout[0].replace(/<c2>/g, '<span style="color:'+DPR_G.DPR_prefs['colcpd']+'">');
  finout[0] = finout[0].replace(/<xc>/g, '</span>');

  finout[0] = finout[0].replace(/> +([,;.!?] )/g, ">$1");


  return finout;

}

function wrapLink(text,click,url) {
  return '<'+(url?'a href="'+url+'"':'span class="pointer localized" script=' + `"${DPR_translit_mod.getTranslitLangId()}"`)+(click?' onclick="'+click+'"':'')+'>'+text+'</'+(url?'a':'span')+'>';
}

async function convtitle(nikaya,book,una,vna,wna,xna,yna,zna,hiert,oneline,click)
{
  var lmt = 60;
  var lgt = una.length;

  book = DPR_navigation_mod.getBookName(nikaya,hiert,book-1);
  var title = '',save = '',raw = '';

  if (DPR_G.G_nikFullFullNames[nikaya]) {
    var nn = '<b>'+DPR_translit_mod.translit(DPR_G.G_nikFullFullNames[nikaya])+'</b>';
    title += (click?wrapLink(nn,click):nn) + ', ';
  }

  var col = ['colped','coldppn','colcpd','colped','coldppn','colcpd','colped','coldppn','colcpd'];
  var w = 0;

  // dppn title links

  var namea = [una,vna,wna,xna,yna,zna];
  var namen = [null,null,null,null,null,null];
  if (DPR_G.DPR_prefs['showNames']) {
    await DPR_PAL.addJS(['dppn']);
    for (var i in namea) {
      var tt = DPR_translit_mod.toVel(namea[i]).replace(/^[ 0-9.]+ /,'').replace(/[- ]/g,'');
      if(tt.length < 2) continue;
      var dEI = await DPR_navigation_mod.getDppnEntry(tt);
      if (dEI.length > 0) {
        namen[i] = '<span class="super tiny pointer" style="color:'+DPR_G.DPR_prefs['coldppn']+'" title="DPPN entry" onmouseup="DPR1_send_mod.sendDPPNXML(\''+DPR_translit_mod.toUni(tt)+'/'+dEI.join(','+DPR_translit_mod.toUni(tt)+'\',DPR1_send_mod.eventSend(event));">&nbsp;n</span><span class="super tiny pointer" style="color:'+DPR_G.DPR_prefs['coldppn']+'" title="DPPN entry" onmouseup="DPR1_send_mod.sendDPPNXML(\''+DPR_translit_mod.toUni(tt)+'/')+','+DPR_translit_mod.toUni(tt)+'\',DPR1_send_mod.eventSend(event));">&nbsp;n</span>';
      }
    }
  }

  for (var i=0; i < namea.length;i++) {
    var thisname = DPR_translit_mod.translit(DPR_translit_mod.toUni(namea[i])).replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_G.DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,'').replace(/ /g,'&nbsp;')

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

    var onet = '<b style="color:'+DPR_G.DPR_prefs[col[w++]]+'">' + DPR_translit_mod.translit(DPR_translit_mod.toUni(thisname)) + '</b>';
    __otherDialogsViewModel.bookmarkName(DPR_translit_mod.translit(DPR_translit_mod.toUni(thisname)));
    title += (click?wrapLink(onet,click):onet) + (namen[i] ? namen[i] :'');
    save += '<h'+w+'>'+thisname+'</h'+w+'>';
    raw += thisname+(i < namea.length-1?"<br/>":"");
  }

  return [title,save,raw];
}


async function analyzeTextPad(sectionId, text) {
  var titleout = await convtitle('Input From Scratchpad',' ',' ',' ',' ',' ',' ',' ');
  $(`${DPR_Chrome.getSectionElementId(sectionId)} #mafbc`).html('<table width=100%><tr><td align=left></td><td align=center>'+titleout[0]+'</td><td id="maftrans" align="right"></td></tr></table>');
  await outputFormattedData(sectionId,'<p> '+text.replace(/\n/g,' <p> ').replace(/\t/g,' '),2);
}

DPR_G.pleasewait =  document.createElement('div');
DPR_G.pleasewait.setAttribute('align','center');
DPR_G.pleasewait.innerHTML = '<br/><br/><br/><br/><img class="spin-img-infinitely" src="'+DPR_PAL.contentFolder+'images/dwheel.png" /><br/><br/><br/><br/>';



function permalinkClick(link,url) {
  try {
    DPR_PAL.copyToClipboard(link);
    if(url) {
      DPR_PAL.mainWindow.gBrowser.selectedTab.linkedBrowser.contentWindow.history.replaceState('Object', 'Title', link);
    }
    alertFlash("Permalink copied to clipboard.",'green');
  }
  catch(ex) {
    alertFlash("Unable to copy permalink.",'red');
  }
}

DPR_G.G_alertFlashStart = 0;

function alertFlash(text,color) {
  let fn;

  if(color) {
    switch (color) {
      case 'red':
        fn = DPR_Chrome.showErrorToast;
      break;
      case 'green':
        fn = DPR_Chrome.showSuccessToast;
      break;
      case 'yellow':
        fn = DPR_Chrome.showWarningToast;
      break;
      default:
        console.error('Unknown color passed to DPR1_format_mod.alertFlash', color)
      break;
    }
  }

  console.warn('DPR1_format_mod.alertFlash is deprecated. Use DPR_Chrome.show*Toast functions.')
  fn(text);
}


function fadeInOut(AID,id, sIn, L, sOut) {
  if(AID != DPR_G.G_alertFlashStart) return;
  fadeIn(AID,id,sIn,L,sOut);
}
function fadeIn(AID,id,speed,L,sOut) {
  if(AID != DPR_G.G_alertFlashStart) return;
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
  if(AID != DPR_G.G_alertFlashStart) return;
  if(parseFloat(document.getElementById(id).style.opacity) > 0.1) {
    document.getElementById(id).style.opacity = parseFloat(document.getElementById(id).style.opacity)-0.1;
    setTimeout(function() { fadeOut(AID,id,speed*0.9); }, speed*0.9);
  }
  else document.getElementById(id).style.display='none';
}

function clearDivs(sectionId, which) { // place divs to be cleared here
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
    $(`${DPR_Chrome.getSectionElementId(sectionId)} #mafbc`).html('');
    $(`${DPR_Chrome.getSectionElementId(sectionId)} #matrelc`).html('');
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

function makeToolbox(shortcutFns,main,aux,title,conv,ex,save,trans) {
  if(main === false) {
    return;
  }

  if(conv) {
    shortcutFns[DPR_CMD_SEND_TO_CONVERTER] = {
      canExecuteStr: 'true',
      execute: () => __dprViewModel.DPR_CMD_SEND_TO_CONVERTER,
      titleStr: null,
      visibleStr: 'true',
    };
  }

  if(ex) {
    shortcutFns[DPR_CMD_SEND_TO_TEXTPAD] = {
      canExecuteStr: 'true',
      execute: () => __dprViewModel.DPR_CMD_SEND_TO_TEXTPAD,
      titleStr: null,
      visibleStr: 'true',
    };
  }

  if(save) {
    shortcutFns[DPR_CMD_SAVE_TO_DESKTOP] = {
      canExecuteStr: 'true',
      executeStr: 'DPR_xml_mod.saveCompilation()',
      titleStr: null,
      visibleStr: 'true',
    };
  }
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


async function linkToPED(base,word) {
  await DPR_PAL.addJS(['ped']);

  var vbase = DPR_translit_mod.toVel(base);

  if(typeof(DPR_G.P[vbase]) == 'object') {
    word = '<span style="color:'+DPR_G.DPR_prefs['colsel']+'" class="pointer" onclick="DPR1_dict_xml_mod.paliXML(\'PED/' + DPR_G.P[vbase][0] + ','+base+'\',true)">'+word+'</span>';
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
  var namen = '<span class="super tiny pointer" style="color:'+DPR_G.DPR_prefs['coldppn']+'" title="DPPN entry" onmouseup="DPR1_send_mod.sendDPPNXML(\''+DPR_translit_mod.toUni(tt)+'/'+dEI.join(','+DPR_translit_mod.toUni(tt)+'\',DPR1_send_mod.eventSend(event,1));">&nbsp;n</span><span class="super tiny pointer" style="color:'+DPR_G.DPR_prefs['coldppn']+'" title="DPPN entry" onmouseup="DPR1_send_mod.sendDPPNXML(\''+DPR_translit_mod.toUni(tt)+'/')+','+DPR_translit_mod.toUni(tt)+'\',DPR1_send_mod.eventSend(event,1));">&nbsp;n</span>';
  return namen;
}

return {

alertFlash : alertFlash,
analyzeTextPad : analyzeTextPad,
clearDivs : clearDivs,
convtitle : convtitle,
formatuniout : formatuniout,
getNameHTML : getNameHTML,
linkToPED : linkToPED,
makeTable : makeTable,
makeToolbox : makeToolbox,
outputFormattedData : outputFormattedData,
permalinkClick : permalinkClick,
preparepali : preparepali
}
})()

if (typeof module !== 'undefined') {
  module.exports = DPR1_format_mod;
}
