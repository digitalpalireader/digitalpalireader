'use strict';

var DPR_grammar_mod = ( function () {

// uses inflect.js, english.js

function conjugate(word, id, which) {
  appInsights.trackEvent({ name: 'Conjugate',  properties: { word, id, which, }});

  const sectionId = DPR_Chrome.getPrimarySectionId()

  if(DPR_G.DPR_prefs['nigahita'] && which) {
    which = which.replace(/ṁ/g, 'ṃ');
    which = which.replace(/Ṁ/g, 'Ṃ');
  }
  word = DPR_translit_mod.toVel(word);

  var yto = DPR_G.yt[word];

  if(yto == undefined) {
    DPR1_format_mod.alertFlash('Word not found','yellow');
    return;
  }

  var out;

  if(yto[4] == 'V') { // verb
    if(yto[9] == 'N') out = conjugateIrrVerb(word,which);
    else out = conjugateVerb(word);
  }
  else {
    if(yto[9] == 'N') out = conjugateIrrNoun(word);
    else out = conjugateNoun(word);
  }

  if (out == undefined) {
    return;
  }

  if(which) {
    var whichR = new RegExp('([> ])'+which+'([<,])','gi');
    out = out.replace(whichR, "$1<span style=\"color:"+DPR_G.DPR_prefs['colped']+"\">"+which+"</span>$2");
  }

  if(DPR_G.DPR_prefs['nigahita']) {
    out = out.replace(/ṃ/g, 'ṁ');
    out = out.replace(/Ṃ/g, 'Ṁ');
  }

  var outNode = document.createElement('div');

  if (!id) {
    return out;
  }
  if(id == 'dif') {
    DPR1_format_mod.clearDivs(sectionId, 'dif');
    outNode.innerHTML = '<div class="conj">'+out+'</div>';
    document.getElementById(DPR_PAL.getDifId()).appendChild(outNode);
  }
  else {
    outNode.innerHTML = '<div class="conj">'+out+'</div><div class="x" onclick="this.parentNode.innerHTML=null">x</div>';
    document.getElementById(id).appendChild(outNode);
  }
}

DPR_G.decNames = ['nom','voc','acc','ins','dat','abl','gen','loc'];
DPR_G.gendNames = ['m','nt','f'];

function conjugateNoun(word) {

  var yto = DPR_G.yt[word];
  var yto5 = yto[5].split(',');
  var out = '';

  var outword = word.replace(/\`/g, '"');
  outword = outword.replace(/,/g, '.');
  if(yto[5].search(/\.[āīū],/) > -1 || yto[5].search(/\.[āīū]$/) > -1) outword = outword+outword.charAt(outword.length-1);
  outword = DPR_translit_mod.toUni(outword);


  var stem = yto[8];

  for (var q in yto5) {
    var type1 = yto[4]+'#'+yto5[q];
    var type2 = DPR_G.iI[type1];
    if(type2 == undefined) {
      continue;
    }

    var descript = (q > 0 ? '<hr>':'')+'<div><b>' + outword + ': ' + type2[0] + '</b><br/>' + yto[2] + ' (' + yto[1] + ')<br /></div>';

    if (type2[1] == '' && type2[2] == '' && type2[3] == '') {
      out += descript;
      continue;
    }

    var gender = yto[1];
    switch(gender) {
      case 'm.':
        if(type2[1] != '') {

          out += descript; // description

          out += '<table class="conjtable"><tr><td class="toprow">Case</td>';
          var noun = DPR_G.iN[type2[1]];

          if(noun[0] != undefined) out += '<td class="toprow">s.</td>';
          if(noun[1] != undefined) out += '<td class="toprow">pl.</td>';

          out += '</tr>';

          for (var i in DPR_G.decNames) { // per number

            var di = DPR_G.decNames[i];

            out += '<tr><td class="sidecol"><b>'+di + '</b></td>';

            for(var j in noun) {
              out+='<td class="decb small">';
              if(noun[j][di] == undefined) {
                out += '-';
              }
              else {
                var anoun = noun[j][di];
                var allnoun = [];
                for (var l in anoun) {
                  allnoun.push(stem+anoun[l].replace(/[()]/g,''));
                }
                out += allnoun.join(', ');
              }
              out += '</td>';
            }
            out += '</tr>';
          }
        }
      break;
      case 'nt.':
        if(type2[2] != '') {

          out += descript; // description

          out += '<table class="conjtable"><tr><td class="toprow">Case</td>';
          var noun = DPR_G.iN[type2[2]];

          if(noun[0] != undefined) out += '<td class="toprow">s.</td>';
          if(noun[1] != undefined) out += '<td class="toprow">pl.</td>';

          out += '</tr>';

          for (var i in DPR_G.decNames) { // per number

            var di = DPR_G.decNames[i];

            out += '<tr><td class="sidecol"><b>'+di + '</b></td>';

            for(var j in noun) {
              out+='<td class="decb small">';
              if(noun[j][di] == undefined) {
                out += '-';
              }
              else {
                var anoun = noun[j][di];
                var allnoun = [];
                for (var l in anoun) {
                  allnoun.push(stem+anoun[l].replace(/[()]/g,''));
                }
                out += allnoun.join(', ');
              }
              out += '</td>';
            }
            out += '</tr>';
          }
        }
      break;
      case 'f.':
        if(type2[3] != '') {

          out += descript; // description

          out += '<table class="conjtable"><tr><td class="toprow">Case</td>';

          var noun = DPR_G.iN[type2[3]];

          if(noun[0] != undefined) out += '<td class="toprow">s.</td>';
          if(noun[1] != undefined) out += '<td class="toprow">pl.</td>';

          out += '</tr>';

          for (var i in DPR_G.decNames) { // per number

            var di = DPR_G.decNames[i];

            out += '<tr><td class="sidecol"><b>'+di + '</b></td>';

            for(var j in noun) {
              out+='<td class="decb small">';
              if(noun[j][di] == undefined) {
                out += '-';
              }
              else {
                var anoun = noun[j][di];
                var allnoun = [];
                for (var l in anoun) {
                  allnoun.push(stem+anoun[l].replace(/[()]/g,''));
                }
                out += allnoun.join(', ');
              }
              out + '</td>';
            }
            out += '</tr>';
          }
        }
      break;
      default:
        var cnt = 0;
        var outt = '';

        out += descript; // description

        out += '<table class="conjtable"><tr><td class="toprow">Case</td>';
        for (var i in DPR_G.decNames) { // per number
          var di = DPR_G.decNames[i];
          outt += '<tr><td class="sidecol"><b>'+di + '</b></td>';
          cnt = 0;
          for (var k = 1; k <= 3; k++) {
            if(type2[k] != '') {
              cnt++;

              var noun = DPR_G.iN[type2[k]];

              if(i==0) {
                if(noun[0] != undefined) out += '<td class="toprow">'+DPR_G.gendNames[k-1]+'.s.</td>';
                if(noun[1] != undefined) out += '<td class="toprow">'+DPR_G.gendNames[k-1]+'.pl.</td>';
              }

              for(var j in noun) {
                outt+='<td class="decb small '+ ((cnt == 1 || cnt == 3) ? '' : 'whiteb') + '">'
                if(noun[j][di] == undefined) {
                  outt += '-';
                }
                else {
                  var anoun = noun[j][di];
                  var allnoun = [];
                  for (var l in anoun) {
                    allnoun.push(stem+anoun[l].replace(/[()]/g,''));
                  }
                  outt += allnoun.join(', ');
                }
                outt += '</td>';
              }
            }
          }
          outt += '</tr>';
        }
        out += '</tr>' + outt;
      break;
    }
    out += '</table>';
  }
  return out;

}

DPR_G.personNames = ['3rd','2nd','1st'];

function conjugateVerb(word) {

  var yto = DPR_G.yt[word];
  var out = '';

  var outword = word.replace(/\`/g, '"');
  outword = outword.replace(/,/g, '.');
  if(yto[5].search(/\.[āīū],/) > -1 || yto[5].search(/\.[āīū]$/) > -1) outword = outword+outword.charAt(outword.length-1);
  outword = DPR_translit_mod.toUni(outword);

  var stem = yto[8];

  var type1 = yto[4]+'#'+yto[5];
  var type2 = DPR_G.iI[type1];
  if(type2 == undefined) {
    DPR1_format_mod.alertFlash('Verb not found','yellow');
    return;
  }

  out += '<div align="left"><b>' + outword + ': ' + type2[0] + '</b><br/>' + yto[2] + ' (' + yto[1] + ')<br/><br/></div>'; // description

  var verbCTense = yto[5].split('.')[1];

  // if not present tense, only output the current tense

  if(verbCTense != 'pres') {
    out += '<table class="conjtable"><tr><td class="toprow">person</td><td class="toprow">s.</td><td class="toprow">pl.</td></tr>';
    var verb = DPR_G.iV[yto[5]];
    for(var j =0; j < 3; j++) { // 3 persons
      var pi = DPR_G.personNames[j];
      out += '<tr><td class="sidecol"><b>'+pi + '</b></td>';
      for (var i = 0; i <= 1; i++) {
          out+='<td class="decb small">'
          if(verb[pi] == undefined || verb[pi][i] == undefined) {
            out += '-';
          }
          else {
            var splitverb = verb[pi][i];
            var averb = [];
            for (var l in splitverb) {
              averb.push(stem+splitverb[l].replace(/[()]/g,''));
            }
            out += averb.join(', ');
          }
          out += '</td>';
      }
      out += '</tr>';
    }
    out += '</table>';
    return out;
  }

  var verbTense = ['pres', 'impv', 'opt', 'fut', 'cond'];
  var verbName = ['Present', 'Imperative', 'Optative', 'Future', 'Conditional'];
  var verbVoice = yto[5].split('.')[0];
  var verbType = yto[5].replace(/.+\..+\./,'.');

  var verbAdd = [];
  verbAdd[0] = ['','','eyy','iss','iss'];
  verbAdd[1] = ['','','eyy','ess','ess'];

  if(verbType == '.') verbType = '';

  for (var m in verbName) {

    out += '<table class="butc"><tr><td class="toprow"></td><td class="toprow" colspan="4">'+verbName[m]+'</td></tr><tr><td class="toprow"></td><td class="toprow" colspan="2">Parassapada</td><td class="toprow" colspan="2">Attanopada</td></tr><tr><td class="toprow"></td><td class="toprow">s.</td><td class="toprow">pl.</td><td class="toprow">s.</td><td class="toprow">pl.</td></tr>';
    for(var j =0; j < 3; j++) { // 3 persons
      var pi = DPR_G.personNames[j];
      out += '<tr><td class="sidecol"><b>'+pi + '</b></td>';
      for (var n = 0; n < 2; n++) { // per voice
        for (var k = 0; k < 2; k++) { // per number
          out+='<td class="decb small'+ (n != 1 ? '' : ' whiteb') + '">'
          var verb = DPR_G.iV[(n == 0 ? verbVoice : 'md') + '.' + verbTense[m]+(((verbTense[m] == 'pres' || verbTense[m] == 'impv' || (verbTense[m] == 'opt' && n == 1)) && verbVoice == 'ac') ? verbType : '')];
          if(verb == undefined || verb[pi][k] == undefined) {
            out += '-';
          }
          else {
            var splitverb = verb[pi][k];
            var allthis = [];
            for (var l in splitverb) {
              allthis.push((stem + (verbVoice != 'ca' ? verbAdd[0][m] : verbAdd[1][m]) + splitverb[l]).replace(/[()]/g,''));
            }
            out += allthis.join(', ');
          }
          out += '</td>';
        }
      }
      out += '</tr>';
    }
    out += '</table><table><tr><td>&nbsp;</td></tr></table>';
  }
  return out;
}

function conjugateIrrNoun(word) {
  var yto = DPR_G.yt[word];
  var out = '';

  var outword = word.replace(/\`/g, '"');
  outword = outword.replace(/,/g, '.');
  if(yto[5].search(/\.[āīū],/) > -1 || yto[5].search(/\.[āīū]$/) > -1) outword = outword+outword.charAt(outword.length-1);
  outword = DPR_translit_mod.toUni(outword);

  var stem = '';

  var type1 = yto[4]+'#'+yto[5];
  var type2 = DPR_G.iI[type1];
  if(type2 == undefined) {
    DPR1_format_mod.alertFlash('Noun not found','yellow');
    return;
  }

    out += '<div align="left"><b>' + outword + ': ' + type2[0] + '</b><br/>' + yto[2] + ' (' + yto[1] + ')</div>'; // description

  var noun = DPR_G.iNI[outword];
  if(noun == undefined) {
    DPR1_format_mod.alertFlash('Noun not found','yellow');
    return;
  }
  var cnt = 0;
  var outt = '';
  out += '<table class="conjtable"><tr><td class="toprow">Case</td>';
  for (var i in DPR_G.decNames) { // per vibhatti
    var di = DPR_G.decNames[i];
    outt += '<tr><td class="sidecol"><b>'+di + '</b></td>';
    cnt = 0;
    for (var h = 0; h < DPR_G.gendNames.length; h++) {
      if(noun[DPR_G.gendNames[h]] == undefined) continue;
      cnt++;
      if(i==0) {
        out += '<td class="toprow">'+DPR_G.gendNames[h]+'.s.</td>';
        out += '<td class="toprow">'+DPR_G.gendNames[h]+'.pl.</td>';
      }
      for(var j = 0; j <=1; j++) {
        outt+='<td class="decb small '+ ((cnt == 1 || cnt == 3) ? '' : 'whiteb') + '">'
        if(noun[DPR_G.gendNames[h]][j] == undefined || noun[DPR_G.gendNames[h]][j][di] == undefined) {
          outt += '-';
        }
        else {
          outt += stem+noun[DPR_G.gendNames[h]][j][di].join(', '+stem);
          if(stem.length > 0) outt = outt.replace(/[()]/g,'');
        }
        outt += '</td>';
      }
    }
    outt += '</tr>';
  }
  out += outt;
  out += '</table>';
  return out;


}

function conjugateIrrVerb(word,which) {
  var yto = DPR_G.yt[word];
  var out = '';

  var outword = word.replace(/\`/g, '"');
  outword = outword.replace(/,/g, '.');
  if(yto[5].search(/\.[āīū],/) > -1 || yto[5].search(/\.[āīū]$/) > -1) outword = outword+outword.charAt(outword.length-1);
  outword = DPR_translit_mod.toUni(outword);

  var stem = yto[8];

  var type1 = yto[4]+'#'+yto[5];
  var type2 = DPR_G.iI[type1];
  if(type2 == undefined) {
    alert('Noun not found');
    return;
  }

    out += '<div align="left"><b>' + outword + ': ' + type2[0] + '</b><br/>' + yto[2] + ' (' + yto[1] + ')<br/></div>'; // description

  var verbNumbers = ['65535','1','4','3','7','2','12','13','14','16','19','22'];
  var verbNames = ['Present','Imperative','Optative','Future','Caus. Pass','Imperative','Att. Pres.','Att. Impv','Aorist','Att. Opt.','Caus. Impv','Caus. Opt'];



  var verbC = DPR_G.iVI[yto[6]];
  if(verbC == undefined) {
    DPR1_format_mod.alertFlash('Verb not found','yellow');
    return;
  }
  var verb;
  for (var k in verbNumbers) {
    verb = verbC[outword]; // try general conjugation first
    var verbno = verbNumbers[k];
    if(verb == undefined || verb[verbno] == undefined && which) {
      verb = verbC[which]; // try specific conjugation next
    }
    if(verb == undefined || verb[verbno] == undefined) {
      out:
      for (var v in verbC) { // try to find the exact conjugation, get general conjugation from that
        for (var w in verbC[v]) {
          for (var x in verbC[v][w]) {
            for (var y in verbC[v][w][x]) {
              for (var z in verbC[v][w][x][y]) {
                if(verbC[v][w][x][y][z] == which) {
                  verb = verbC[v];
                  break out;
                }
              }
            }
          }
        }
      }
    }
    if(verb == undefined || verb[verbno] == undefined) {
      if(yto[6] != outword || verbC['def'] == undefined || verbC['def'][verbno] == undefined) continue;
      else verb = verbC['def'];
    }
    out += '<table class="butc">'+(yto[6] == outword ? '<tr><td class="toprow" colspan="3">'+verbNames[k]+'</td></tr>':'')+'<tr><td class="toprow">person</td><td class="toprow">s.</td><td class="toprow">pl.</td></tr>';

    for(var j =0; j < 3; j++) { // 3 persons
      var pi = DPR_G.personNames[j];
      out += '<tr><td class="sidecol"><b>'+pi + '</b></td>';
      for (var i = 0; i <= 1; i++) {
          out+='<td class="decb small">'
          if(verb[verbno][pi] == undefined || verb[verbno][pi][i] == undefined) {
            out += '-';
          }
          else {
            var splitverb = verb[verbno][pi][i];
            var averb = [];
            for (var l in splitverb) {
              averb.push(splitverb[l]);
            }
            out += averb.join(', ');
          }
          out += '</td>';
      }
      out += '</tr>';
    }
    out += '</table>';
  }
  return out;

}

async function conjugateWord(word,form) {
  if(!word && !form)
    return;
  if(DPR_G.yt[DPR_translit_mod.toVel(word)])
    return conjugate(word,null,form);

  if(form)
    var oneConj = await formatConjugation(form);
  else
    var oneConj = await formatConjugation(word);

  return oneConj?oneConj:null;
}

async function formatConjugation(word) {
  var oneConj = await getConjugation(word);
  if(oneConj !== null)
  {
    var out = "";
    for(var i = 0; i < oneConj.length; i++) {
      out += '<li><span class="decl-grammar">'+oneConj[i][0]+' form of '+oneConj[i][1]+'</span><br/><span class="decl-english">'+oneConj[i][2]+'</span></li>';
    }
    if(out.length > 0) {
      out = '<ol>' + out + '</ol>';
      return out;
    }
  }
  return null;
}

//[trans,type,deca,word,meta];

async function getConjugation(form,bare) {
  var word = await DPR_translate_mod.translateWord(form,0);
  var out = [];
  for(var i = 0; i < word.length; i++) {
    var grammar = makeGrammarTerms(word[i]);
    var trans = bare?word[i][0]:DPR_translate_mod.addPhrasePreps([word[i]]);
    out.push([grammar,word[i][4]['orig'],trans]);
  }
  return out;
}

function makeGrammarTerms([trans,type,deca,word,meta]) {
  switch(type) {
    case 'n':
      return (DPR_G.yt[meta['orig']]?'('+DPR_G.yt[meta['orig']][1]+') ':'')+(deca == null?'indeclinable':DPR_G.G_vibhatti[deca[1]]+' '+DPR_G.G_vacana[deca[2]]);
    case 'p':
      return (DPR_G.yt[meta['orig']]?'('+DPR_G.yt[meta['orig']][1]+') ':'')+(deca == null?'indeclinable':DPR_G.G_vibhatti[deca[1]]+' '+DPR_G.G_vacana[deca[2]]);
    case 'v':
      return '(v.) '+(deca == null?'indeclinable':DPR_G.G_tenses[deca[0]]+' '+DPR_G.G_persons[deca[1]]+' person '+DPR_G.G_vacana[deca[2]]);
    default:
      return (DPR_G.yt[meta['orig']]?DPR_G.yt[meta['orig']][1]:'');
  }

}

function typeAndGender(t) {
  if(t == 7)
    return 'adj.';
  var out = [];
  if (t & 1)
    out.push('m.');
  if (t & 2)
    out.push('nt.');
  if (t & 4)
    out.push('f.');
  return 'noun, '+out.join (', ');
}

DPR_G.G_persons = ['','3rd','2nd','1st'];
DPR_G.G_vibhatti = ['','nominative','accusative','instrumental','dative','ablative','genitive','locative','vocative'];
DPR_G.G_vacana = ['','singular','plural'];
DPR_G.G_tenses = ['','present','imperative','optative','future','past','causative'];


// used in word-by-word translation

async function conjugateWords(input) {
  var ina = input.split(' ');
  var outa = [];
  for(var i = 0; i < ina.length; i++) {
    var word = await getConjugation(ina[i],true);
    if(typeof(word[0]) != 'undefined')
      word[0].push(ina[i]); // add form
    else
      word[0] = ['','','',ina[i]];
    outa.push(word);
  }
  return outa;
}

return {
conjugate : conjugate,
conjugateWord : conjugateWord,
conjugateWords : conjugateWords,
makeGrammarTerms : makeGrammarTerms
}
})()
