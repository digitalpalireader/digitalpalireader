'use strict';

var DPR_analysis_output_mod = ( function () {

async function outputDef(sectionId,which,first,frombox)
{
  $('#anfs').html('');

  var osout = '<table style="float:left" id="data-table" cellspacing="0" cellpadding="0"><tr>';

  var hotlink;

  var conjWord = [] // word to pass to DPR_grammar_mod.conjugate
  if (first) {
    $('#anfright').html("");
    if(DPR_G.G_outwords.length > 1){
      $('#anfright').html('<form name="forma"><select id="anfout" name="out" class="tiny" onchange="DPR_analysis_output_mod.outputDef(\'' + sectionId + '\', this.selectedIndex);" title="Select alternative interpretations here"></select></form>');
      // sort by percentage of PED big matches, then average of sizes squared descending, then word size by order
      for(var i = 0; i < DPR_G.G_outwords.length; i++)
      {
        DPR_G.G_outwords[i].push(DPR_G.G_shortdefpost[i]);
      }

      DPR_G.G_outwords.sort(function (a, b) {

        var af = 0;
        var a1 = a[1].split('@');
        for(var i = 0; i < a1.length; i++){
          if(/\//.exec(a1[i].split('^')[0]) && DPR_translit_mod.toUni(a[0].split('-')[i]).length > DPR_translit_mod.toUni(a[0].replace('-','')).length/3){ // contains PED match, and is longer than 4
            af++;
          }
          if(i > 0 && DPR_translit_mod.toUni(a[0].split('-')[i]).length < 4 && DPR_translit_mod.toUni(a[0].split('-')[i]).length > 1){
            af--;
          } // penalize small middle
        }

        var bf = 0;
        var b1 = b[1].split('@');
        for(var i = 0; i < b1.length; i++){
          if(/\//.exec(b1[i].split('^')[0]) && DPR_translit_mod.toUni(b[0].split('-')[i]).length > DPR_translit_mod.toUni(b[0].replace('-','')).length/3){
            bf++;
          }
          if(i > 0 && DPR_translit_mod.toUni(b[0].split('-')[i]).length < 4 && DPR_translit_mod.toUni(b[0].split('-')[i]).length > 1){
            bf--;
          } // penalize small middle
        }

        if (af/a1.length > bf/b1.length) {
          return -1;
        }
        if (af/a1.length < bf/b1.length) {
          return 1;
        }

        if (a1.length < b1.length) {
          return -1;
        }
        if (a1.length > b1.length) {
          return 1;
        }

        var al = a[0].split('-');
        var ac = 0;
        var ae = 0;
        for(var i = 0; i < al.length; i++){
          ac += al[i].length ** 2;
          ae += al[i].length * i;
        }
        var bl = b[0].split('-');
        var bc = 0;
        var be = 0;
        for(var i = 0; i < bl.length; i++){
          bc += bl[i].length ** 2;
          be += bl[i].length * i;
        }
        if (ac > bc) {
            return -1;
        }
        if (bc > ac) {
            return 1;
        }
        if (ae > be) {
            return 1;
        }
        if (be > ae) {
            return -1;
        }
        return 0;

      });

      for(var i = 0; i < DPR_G.G_outwords.length; i++)
      {
        DPR_G.G_shortdefpost[i] = DPR_G.G_outwords[i][DPR_G.G_outwords[i].length-1];
      }


      var sorta = [];

      for (var b = 0; b < DPR_G.G_outwords.length; b++)
      {
        sorta.push(DPR_G.G_outwords[b][0]+'$'+DPR_G.G_outwords[b][1]+'!'+DPR_G.G_shortdefpost[b]);
      }

      for (var b = 0; b < sorta.length; b++)
      {
        DPR_G.G_outwords[b] = sorta[b].split('!')[0].split('$');
        DPR_G.G_shortdefpost[b] = sorta[b].split('!')[1]
      }

      // get the word names

      for (var b = 0; b < DPR_G.G_outwords.length; b++)
      {
        var outword = DPR_G.G_outwords[b][0];
        document.forma.out.innerHTML += '<option>' + DPR_translit_mod.toUni(outword) + '</option>';
      }
    }
  }

  var owparts = DPR_G.G_outwords[which][1].split('@');

  var myConj = owparts[owparts.length-1].split('#')[0].split('^');
  if(myConj[3]) { // if root form is found, set up conjugation
    if(DPR_cped_mod.getInflectionGroup(myConj[3]) != 'I') {
      conjWord.form = DPR_translit_mod.toUni(DPR_G.G_outwords[which][0].split('-').pop());
      conjWord.root = DPR_translit_mod.toUni(myConj[3]);
    }
  }

  for (var c in owparts) { // per part (with many variants)

    var partvars = owparts[c].split('#');
    if (c > 0) {
      osout += '<td valign="top" class="localized"' + ` script="${DPR_translit_mod.getTranslitLangId()}"` + '><b>-</b></td>';
    }

    osout += '<td valign="top" align="center" class="localized"' + ` script="${DPR_translit_mod.getTranslitLangId()}"` + '>';

    for (var d = 0; d < partvars.length; d++) { // per variant for each part
      var data = partvars[d].split('^');
        // data[0] = reference
        // data[1] = pali word
        // data[2] = category
        // data[3] = short def (if avail)
        // for data[2]: 0 = main, 1 = name, 2 = concise, 3 = none
      var dataout = DPR_translit_mod.translit(DPR_translit_mod.toUni(DPR_G.G_outwords[which][0].split('-')[c])); // get the part name from the names part :)
      var conciseCode = "";
      if (d == 0) { // first match (will go on top)
        switch (data[2]) {
          case '0':
            if (frombox !=2 && !hotlink) { hotlink = 'PED/' + data[0]+','+DPR_translit_mod.toUni(data[1]) } // opens link in lower frame
            osout += '<span class="pointer" '+conciseCode+'onmouseup="DPR1_dict_xml_mod.paliXML(\'PED/' + data[0] + ','+DPR_translit_mod.toUni(data[1])+'\',null,DPR1_send_mod.eventSend(event))" ' + '><b style="color:' + DPR_G.DPR_prefs['colped'] + '">' + dataout + '</b></span>';
            break;
          case '1':
            if (frombox !=2 && !hotlink) { hotlink = DPR_translit_mod.toUni(data[1])+'/' + data[0] +','+ DPR_translit_mod.toUni(data[1]); } // opens link in lower frame
            osout += '<span class="pointer" '+conciseCode+'onmousedown="DPR1_dict_xml_mod.DPPNXML(\''+DPR_translit_mod.toUni(data[1])+'/' + data[0] +','+ DPR_translit_mod.toUni(data[1]) + '\',null,DPR1_send_mod.eventSend(event))"><b style="color:' + DPR_G.DPR_prefs['coldppn'] + '">' + dataout + '</b></span>';
            break;
          case '2':
            osout += '<b '+conciseCode+'style="color:' + DPR_G.DPR_prefs['colcpd'] + '">' + dataout + '</b>';
            break;
          case '3':
            osout += '<b style="color:' + DPR_G.DPR_prefs['coltext'] + '">' + dataout + '</b>';
            break;
        }
      }
      else { // lower match
        if (d == 1) {
          osout += '<br><font size="2">';
        }
        switch (data[2]) {
          case '0':
            osout += '<span class="pointer" onmouseup="DPR1_dict_xml_mod.paliXML(\'PED/' + data[0] + ','+DPR_translit_mod.toUni(data[1])+'\',null,DPR1_send_mod.eventSend(event))" ' + '><b style="color:' + DPR_G.DPR_prefs['colped'] + '">' + (parseInt(d)+1) + '</b></span>&nbsp;';
            break;
          case '1':
            osout += '<span class="pointer" onmouseup="DPR1_dict_xml_mod.DPPNXML(\''+DPR_translit_mod.toUni(data[1])+'/' + data[0]+','+ DPR_translit_mod.toUni(data[1]) + '\',null,DPR1_send_mod.eventSend(event))"><b style="color:' + DPR_G.DPR_prefs['coldppn'] + '">' + 'n' + '</b></span>&nbsp;';
            break;
        }
      }
    }
    if (partvars.length > 1) {
      osout = osout.substring(0,osout.length-6);
      osout += '</font>';
    }

    osout += '</td>';

  }

  // conjugation

  osout += (conjWord.root?'<td class="conjc" valign="top">&nbsp;<a href="javascript:void(0);" onclick="DPR_grammar_mod.conjugate(\''+conjWord.root+'\',\'dif\',\''+conjWord.form+'\')" title="DPR_grammar_mod.conjugate this word" class="large" style="color:green"><sup>c</sup></a></td>':'');

  // editing

  osout += '<td class="pointer" onclick="$(\'#data-table\').hide(); $(\'#modify-box\').show();$(\'#modify\').focus();" title="edit word"><div id="edit-pencil" class="hoverShow" style="background-image:url(' + DPR_PAL.contentFolder + 'images/pencil.png);margin:2px 4px;width:12px;height:12px; background-size:100% 100%; background-repeat:no-repeat;"></div></td></tr></table>';

  osout += '<div style="float:left; display:none" id="modify-box"><input type="text" size="'+DPR_G.G_outwords[which][0].length+'" id="modify" value="'+DPR_G.G_outwords[which][0].replace(/-/g,'').replace(/"/g,'&quot;')+'" onkeypress="DPR_analysis_output_mod.reanalyzeOnEnterKey(event.keyCode,\''+DPR_G.G_outwords[which][0].replace(/-/g,'').replace(/"/g,'&quot;')+'\')" title="type your changes, then hit ENTER to submit">&nbsp;<span class="pointer" onclick="DPR_analysis_output_mod.reanalyze(\''+DPR_G.G_outwords[which][0].replace(/-/g,'').replace(/"/g,'&quot;')+'\',true)" title="cancel edits">x</span></div>';

  // output

  $('#anfleft').html(osout);

// add concise definitions

  var thisconcise = [];
  var conciseoutput = '';

  if (DPR_G.G_shortdefpost[which]) {
    thisconcise = DPR_G.G_shortdefpost[which].replace(/\$\$+/,'$').replace(/^\$/,'').replace(/\$$/,'').split('$');

    var seen = {};
    thisconcise = thisconcise.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });

    for (var x = 0; x < thisconcise.length; x++)
    {
      if (thisconcise[x].length == 0) { continue; }

      let condefnotype = DPR_cped_mod.getDefinition(thisconcise[x]);
      if (condefnotype.length > 100) {
          condefnotype = condefnotype.substring(0,100);
        condefnotype += '...'
      }

      let concisedef = DPR_cped_mod.getDefinition(thisconcise[x]);

      let grammar = DPR_cped_mod.getGrammar(thisconcise[x]);
      if(/ of /.test(grammar)) {
        var base = / of ([^;,. ]+)/.exec(grammar)[1];
        grammar = grammar.replace(base, await DPR1_format_mod.linkToPED(base,base));
      }

      concisedef = DPR_translit_mod.toUni(concisedef + ' (' + grammar + ')');

      var conciseword = thisconcise[x];
      conciseword = DPR_translit_mod.toUni(conciseword);

      DPR_G.G_thisConcise[conciseword] = concisedef;
      if(x == 0){

        var sdfirst = '<b style="color:' + DPR_G.DPR_prefs['colcpd'] + '">' + DPR_translit_mod.translit(conciseword) + '</b>: ' + concisedef;
      }
      conciseoutput += '<b style="color:' + DPR_G.DPR_prefs['colcpd'] + '">' + DPR_translit_mod.translit(conciseword) + '</b>: ' + concisedef +'<br/>';
    }

  }
  if (thisconcise.length > 1 || (thisconcise[0] && thisconcise[0].length > 0)){

    $('#anfs').html(conciseoutput);
    DPR1_chrome_mod.setTransLitScriptId('#anfs')
  }

  //alert(DPR_G.G_thisConcise);
  if (hotlink) {
    if (hotlink.search('PED') >= 0) await DPR1_dict_xml_mod.paliXML(hotlink);
    else await DPR1_dict_xml_mod.DPPNXML(hotlink);
    //if(DPR_G.moveat == 2) { moveFrame(1); }
  }
  else DPR1_format_mod.clearDivs(sectionId,'dif');

  DPR1_chrome_mod.DPRBottomPaneUpdateStyle();

  DPR1_chrome_mod.DPRShowBottomPane();
}

DPR_G.G_thisConcise = [];

function showShortDef(word) {
  //$('#anfright').html('<b style="color:' + DPR_G.DPR_prefs['colcpd'] + '";>' + DPR_translit_mod.translit(word) + '</b>: ' + DPR_G.G_thisConcise[word]);
}

function conciseChange(value) {
  var spdcol = value.split(':');
  //$('#anfright').html('<b style="color:' + DPR_G.DPR_prefs['colcpd'] + '">' + DPR_translit_mod.translit(spdcol[1]) + ':</b> ' + spdcol[2]);
}

async function reanalyzeOnEnterKey(keyCode, word,cancel) {
  if(keyCode === 13) {
    await reanalyze(word,cancel);
  }
}

async function reanalyze(word,cancel) {
  const sectionId = DPR_Chrome.getPrimarySectionId()

  $('#data-table').show();
  $('#modify-box').hide();

  if(cancel) {
    $('#modify').val(word);
    return;
  }

  if($('#modify').val() != word)
    await DPR1_analysis_function_mod.outputAnalysis(sectionId, $('#modify').val(),null);
}

return {
outputDef : outputDef,
reanalyze : reanalyze,
reanalyzeOnEnterKey : reanalyzeOnEnterKey
}
})()
