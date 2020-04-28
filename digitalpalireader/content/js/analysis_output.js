'use strict';

function outputDef(which,first,frombox)
{
  $('#anfright').html('');

  var osout = '<table style="float:left" id="data-table" cellspacing="0" cellpadding="0"><tr>';

  var hotlink;

  var conjWord = [] // word to pass to conjugate

  if (G_outwords.length > 1 && first) {

    $('#anfs').html('<form name="forma"><select id="anfout" name="out" class="tiny" onchange="outputDef(this.selectedIndex);" title="Select alternative interpretations here"></select></form>');

    // sort by percentage of PED big matches, then average of sizes squared descending, then word size by order
    for(var i = 0; i < G_outwords.length; i++)
    {
      G_outwords[i].push(G_shortdefpost[i]);
    }

    G_outwords.sort(function (a, b) {

      var af = 0;
      var a1 = a[1].split('@');
      for(var i = 0; i < a1.length; i++){
        if(/\//.exec(a1[i].split('^')[0]) && toUni(a[0].split('-')[i]).length > toUni(a[0].replace('-','')).length/3){ // contains PED match, and is longer than 4
          af++;
        }
        if(i > 0 && toUni(a[0].split('-')[i]).length < 4 && toUni(a[0].split('-')[i]).length > 1){
          af--;
        } // penalize small middle 
      }

      var bf = 0;
      var b1 = b[1].split('@');
      for(var i = 0; i < b1.length; i++){
        if(/\//.exec(b1[i].split('^')[0]) && toUni(b[0].split('-')[i]).length > toUni(b[0].replace('-','')).length/3){ 
          bf++;
        }
        if(i > 0 && toUni(b[0].split('-')[i]).length < 4 && toUni(b[0].split('-')[i]).length > 1){
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
    
    for(var i = 0; i < G_outwords.length; i++)
    {
      G_shortdefpost[i] = G_outwords[i][G_outwords[i].length-1];
    }


    var sorta = [];

    for (var b = 0; b < G_outwords.length; b++)
    {
      sorta.push(G_outwords[b][0]+'$'+G_outwords[b][1]+'!'+G_shortdefpost[b]);
    }

    for (var b = 0; b < sorta.length; b++)
    {
      G_outwords[b] = sorta[b].split('!')[0].split('$');
      G_shortdefpost[b] = sorta[b].split('!')[1]
    }

    // get the word names

    for (var b = 0; b < G_outwords.length; b++)
    {
      var outword = G_outwords[b][0];
      document.forma.out.innerHTML += '<option>' + toUni(outword) + '</option>';
    }
  }

  var owparts = G_outwords[which][1].split('@');

  var myConj = owparts[owparts.length-1].split('#')[0].split('^');
  if(myConj[3]) { // if root form is found, set up conjugation
    if(yt[myConj[3]][4] != 'I') {
      conjWord.form = toUni(G_outwords[which][0].split('-').pop());
      conjWord.root = toUni(myConj[3]);
    }
  }

  for (var c in owparts) { // per part (with many variants)

    var partvars = owparts[c].split('#');
    if (c > 0) {
      osout += '<td valign="top"><b>-</b></td>';
    }

    osout += '<td valign="top" align="center">';

    for (var d = 0; d < partvars.length; d++) { // per variant for each part
      var data = partvars[d].split('^');
        // data[0] = reference
        // data[1] = pali word
        // data[2] = category
        // data[3] = short def (if avail)
        // for data[2]: 0 = main, 1 = name, 2 = concise, 3 = none
      var dataout = translit(toUni(G_outwords[which][0].split('-')[c])); // get the part name from the names part :)
      var conciseCode = (data[3]?'onmouseover="showShortDef(\''+toUni(data[3])+'\')" ':'');
      if (d == 0) { // first match (will go on top)
        switch (data[2]) {
          case '0':
            if (frombox !=2 && !hotlink) { hotlink = 'PED/' + data[0]+','+toUni(data[1]) } // opens link in lower frame
            osout += '<span class="pointer" '+conciseCode+'onmouseup="paliXML(\'PED/' + data[0] + ','+toUni(data[1])+'\',null,eventSend(event))" ' + '><b style="color:' + DPR_prefs['colped'] + '">' + dataout + '</b></span>';
            break;
          case '1':
            if (frombox !=2 && !hotlink) { hotlink = toUni(data[1])+'/' + data[0] +','+ toUni(data[1]); } // opens link in lower frame
            osout += '<span class="pointer" '+conciseCode+'onmousedown="DPPNXML(\''+toUni(data[1])+'/' + data[0] +','+ toUni(data[1]) + '\',null,eventSend(event))"><b style="color:' + DPR_prefs['coldppn'] + '">' + dataout + '</b></span>';
            break;
          case '2':
            osout += '<b '+conciseCode+'style="color:' + DPR_prefs['colcpd'] + '">' + dataout + '</b>';
            break;
          case '3':
            osout += '<b style="color:' + DPR_prefs['coltext'] + '">' + dataout + '</b>';
            break;
        }
      }
      else { // lower match
        if (d == 1) {
          osout += '<br><font size="2">';
        }
        switch (data[2]) {
          case '0':
            osout += '<span class="pointer" onmouseup="paliXML(\'PED/' + data[0] + ','+toUni(data[1])+'\',null,eventSend(event))" ' + '><b style="color:' + DPR_prefs['colped'] + '">' + (parseInt(d)+1) + '</b></span>&nbsp;';
            break;
          case '1':
            osout += '<span class="pointer" onmouseup="DPPNXML(\''+toUni(data[1])+'/' + data[0]+','+ toUni(data[1]) + '\',null,eventSend(event))"><b style="color:' + DPR_prefs['coldppn'] + '">' + 'n' + '</b></span>&nbsp;';
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

  osout += (conjWord.root?'<td class="conjc" valign="top">&nbsp;<a href="javascript:void(0);" onclick="conjugate(\''+conjWord.root+'\',\'dif\',\''+conjWord.form+'\')" title="conjugate this word" class="small" style="color:green"><sup>c</sup></a></td>':'');

  // editing

  osout += '<td class="pointer" onclick="$(\'#data-table\').hide(); $(\'#modify-box\').show();$(\'#modify\').focus();" title="edit word"><div id="edit-pencil" class="hoverShow" style="background-image:url(' + DPR_PAL.contentFolder + 'images/pencil.png);margin:2px 4px;width:12px;height:12px; background-size:100% 100%; background-repeat:no-repeat;"></div></td></tr></table>';

  osout += '<div style="float:left; display:none" id="modify-box"><input type="text" size="'+G_outwords[which][0].length+'" id="modify" value="'+G_outwords[which][0].replace(/-/g,'').replace(/"/g,'&quot;')+'" onkeypress="if(event.keyCode === 13) reanalyze(\''+G_outwords[which][0].replace(/-/g,'').replace(/"/g,'&quot;')+'\')" title="type your changes, then hit ENTER to submit">&nbsp;<span class="pointer" onclick="reanalyze(\''+G_outwords[which][0].replace(/-/g,'').replace(/"/g,'&quot;')+'\',true)" title="cancel edits">x</span></div>';

  // output

  $('#anfleft').html(osout);

// add concise definitions

  var thisconcise = [];
  var conciseoutput = '';

  if (G_shortdefpost[which]) {
    thisconcise = G_shortdefpost[which].replace(/\$\$+/,'$').replace(/^\$/,'').replace(/\$$/,'').split('$');

    for (var x = 0; x < thisconcise.length; x++)
    {
      if (thisconcise[x].length == 0) { continue; }

      var concisedefa = yt[thisconcise[x]];

      var condefnotype = concisedefa[2];
      if (condefnotype.length > 100) {
          condefnotype = condefnotype.substring(0,100);
        condefnotype += '...'
      }

      var concisedef = concisedefa[2];

      if(/ of /.test(concisedefa[1])) {
        var base = / of ([^;,. ]+)/.exec(concisedefa[1])[1];
        concisedefa[1] = concisedefa[1].replace(base,linkToPED(base,base));
      }

      concisedef = toUni(concisedef + ' (' + concisedefa[1] + ')');

      var conciseword = thisconcise[x];
      conciseword = toUni(conciseword);

      G_thisConcise[conciseword] = concisedef;
      if(x== 0)
        var sdfirst = '<b style="color:' + DPR_prefs['colcpd'] + '">' + translit(conciseword) + '</b>: ' + concisedef;
    }

  }
  if (thisconcise.length > 1 || (thisconcise[0] && thisconcise[0].length > 0))
    $('#anfright').html(sdfirst);

  //alert(G_thisConcise);
  if (hotlink) {
    if (hotlink.search('PED') >= 0) paliXML(hotlink);
    else DPPNXML(hotlink);
    //if(moveat == 2) { moveFrame(1); }
  }
  else clearDivs('dif');

  DPRBottomPaneUpdateStyle();

  DPRShowBottomPane();
}

var G_thisConcise = [];

function showShortDef(word) {
  $('#anfright').html('<b style="color:' + DPR_prefs['colcpd'] + '";>' + translit(word) + '</b>: ' + G_thisConcise[word]);
}

function conciseChange(value) {
  var spdcol = value.split(':');
  $('#anfright').html('<b style="color:' + DPR_prefs['colcpd'] + '">' + translit(spdcol[1]) + ':</b> ' + spdcol[2]);
}

function reanalyze(word,cancel) {

  $('#data-table').show();
  $('#modify-box').hide();

  if(cancel) {
    $('#modify').val(word);
    return;
  }

  if($('#modify').val() != word)
    outputAnalysis($('#modify').val(),null);
}
