'use strict';

var DPR_translate_mod = ( function () {

function translateTextx() {
  var a,b,c,d;
  var cc = [],dd = [],ee = [];
  var x = '';
  var y = '';
  var z = '';
  var cnt = 0;
  for (var i in DPR_G.yt) {
    window.dump(cnt+' of 20926 - '+ Math.floor((cnt++)/20926*100)+'% finished\n');
    var aa = [],bb = [];
    var a = new RegExp('(^|[ .,;])'+DPR_translit_mod.toUni(i)+'($|[ .,;])');
    for(var j in epd) {
      b = epd[j].split('^');
      if(a.test(b[1])) {
        c = DPR_G.yt[i][2].search(b[0]);
        if(c > -1) {
          window.dump(i+' in '+b[0]+'\n');
          aa[c] = b[0];
        }
        //else
          //bb.push(b[0]);
      }
    }
    if(aa.length)
      for(var j in aa) {
        cc[i] = aa[j];
        break;
      }
    //~ else if(bb.length)
      //~ for(var j in bb) {
        //~ cc[i] = bb[j];
        //~ break;
      //~ }
    else
      dd[i] = 'unknown';
  }

  for (var i in cc)
    x+='eg["'+i+'"] = "'+cc[i]+'";<br/>';
  for (var i in dd)
    y+='eg["'+i+'"] = "'+dd[i]+'";<br/>';

  $('#translation').html(x+'<hr/><hr/><hr/>'+y);
}

async function translateTextFromBottomPane(element) {
  $('#input').val($(element).html());
  await translateText();
}

async function translateText(alts) {
  if(/^zzz/.test($('#input').val()))
    return translateTextx();
  var words = [];
  var subject = '';
  var outparts = [];
  var input = DPR_translit_mod.toUni($('#input').val().toLowerCase()).replace(DPR_G.G_uniRegExpNSG,'');

  var translUrl = `digitalpalireader/content/translate.htm?phrase='${DPR_translit_mod.toVel(input)}`;
  DPR_PAL.contentWindow.history.pushState({}, 'Title', translUrl);

  $('#input').val(input);
  input=input.split(' ');
  for (var i = 0; i < input.length; i++) {
    var trans = await translateWord(input[i],i);
    words.push(trans);
  }
  var out = arrangeWords(words,alts);

  if(!out.subject.length) {
    if(DPR_G.G_verbDecl.length)
      subject = DPR_G.G_subjects[DPR_G.G_verbDecl[1]-1][DPR_G.G_verbDecl[2]-1];
  }
  else {
    subject = out.subject.join('&nbsp;').replace(/^ *(.+) */,"$1");
    var fL = subject.replace(/<[^>]+>/g,'').charAt(0);
    subject = subject.replace('>'+fL,'>'+fL.toUpperCase());
  }
  var verb = (out.verb.join()?out.verb.join('&nbsp;'):'');

  var obj = (out.object.join()?out.object.join('&nbsp;'):'');
  var other = (out.other.join()?out.other.join('&nbsp;'):'');
  if(subject)
    outparts.push(makeTable([[subject],['subject']],'sub'));
  if(verb)
    outparts.push(makeTable([[verb],['verb']],'verb'));
  if(obj)
    outparts.push(makeTable([[obj],['object']],'obj'));
  if(other)
    outparts.push(makeTable([[other],['other']],'other'));

  $('#translation').html(makeTable([outparts.concat([(DPR_G.G_verbDecl[0]==2?'!':'.')])],'trans'));
}

DPR_G.G_altChoices = []; // this is for later, when we offer alternatives

function arrangeWords(wordst,alts) {
  DPR_G.G_subDecl = [];
  DPR_G.G_verbDecl = [];
  DPR_G.G_objDecl = [];

  var pendG = [];
  var pendI = [];

  var out = {
    subject:[],
    bverb:[],
    verb:[],
    object:[],
    other:[]
  };

  var outer = [];
  outer[0] = [];
  outer[1] = [];
  outer[2] = [];
  outer[3] = [];
  outer[4] = [];
  outer[5] = [];
  outer[6] = [];
  outer[7] = [];
  outer['bv'] = [];
  outer['v'] = [];
  outer['o'] = [];

  var inter = [];
  inter[0] = [];
  inter[1] = [];
  inter[2] = [];
  inter[3] = [];
  inter[4] = [];
  inter[5] = [];
  inter[6] = [];
  inter[7] = [];
  inter['bv'] = [];
  inter['v'] = [];
  inter['o'] = [];

  var chosen = []; // array of chosen, not to use twice.

  var tint = -1;

  var ca = 0,va = 0;

  var words = [];

  // perform filters

  for(var i=0;i<wordst.length;i++) {
/*
    // remove second ca, vaa
    if(wordst[i][0] && wordst[i][0][3] == 'ca' && ca++) {
      ca = 0;
      continue;
    }
    else if(wordst[i][0] && wordst[i][0][3] == 'vaa' && va++) {
      va = 0;
      continue;
    }
*/
    var wgtemp = [];

    // prefer special words

    for(var j=0;j<wordst[i].length;j++) {
      if(wordst[i][j][5] && wordst[i][j][4]['special']) {
        wgtemp.push(wordst[i][j]);
      }
    }
    if(wgtemp.length) {
      for(var j=0;j<wordst[i].length;j++) {
        if(!wordst[i][j][5] || wordst[i][j][4]['special'])
          wgtemp.push = wordst[i][j];
      }
      wordst[i] = wgtemp;
    }
    // prefer genitives

    for(var j=0;j<wordst[i].length;j++) {
      if(wordst[i][j][2] && wordst[i][j][2][1] == 6) {
        wgtemp.push(wordst[i][j]);
      }
    }
    if(wgtemp.length) {
      for(var j=0;j<wordst[i].length;j++) {
        if(!wordst[i][j][2] || wordst[i][j][2][1] != 6)
          wgtemp.push = wordst[i][j];
      }
      wordst[i] = wgtemp;
    }
    words.push(wordst[i]);

  }
  for(var i=0;i<words.length;i++) {

    for(var j=0;j<words[i].length;j++) {
      if(alts && alts[i] && alts[i][1] != 0 && alts[i][1] != j) // chose another alternative
        continue;
      if(!words[i][j][1] && !words[i][j][2])
        tint = 'o';
      else if(words[i][j][1] == 'bv')
        tint = 'bv';
      else if(words[i][j][1] == 'v')
        tint = 'v';
      else if(words[i][j][2])
        tint = words[i][j][2][1]-1;
      else
        tint = 'o';

      if(words[i].length == 1) { // force place if necessary
        if(tint == 'v')
          DPR_G.G_verbDecl = words[i][j][2];
        else if(tint == 0)
          DPR_G.G_subDecl = words[i][j][2];
        else if(tint == 1)
          DPR_G.G_objDecl = words[i][j][2];

        chosen[i] = [tint,j];
      }
      if(!chosen[i])
        inter[tint].push([i,j]);
    }
  }



  //~ var g = [];
  //~ g[1] = [];
  //~ g[2] = [];
  //~ g[3] = [];

  var compat = [];

  // now prioritize subj, obj and verb

  if(inter[0].length) { // subjects
    compat = checkCompatibleNoun(inter[0],chosen,words);
    if(compat[1]) { // decided
      for(var i in compat[0]) {
        if(!chosen[compat[0][i][0]])
          chosen[compat[0][i][0]] = [0,compat[0][i][1]];
      }
      DPR_G.G_subDecl = words[compat[0][0][0]][chosen[compat[0][0][0]][1]][2];
      inter[0] = [];
    }
    else { // punting
      inter[0] = [];
      inter[0] = inter[0].concat(compat[0]);
    }
  }

  if(inter[1].length) { // objects
    // remove chosen;
    var choices1 = [];

    for (var i in inter[1])
      if(!chosen[inter[1][i][0]])
        choices1.push(inter[1][i]);

    compat = checkCompatibleNoun(choices1,chosen,words);
    if(compat[1]) {
      for(var i in compat[0]) {
        if(!chosen[compat[0][i][0]])
          chosen[compat[0][i][0]] = [1,compat[0][i][1]];
      }
      DPR_G.G_objDecl = words[compat[0][0][0]][chosen[compat[0][0][0]][1]][2];
      inter[1] = [];
    }
    else { // punting
      inter[1] = [];
      for(var i in compat[0]) {
        inter[1].push(compat[0][i]);
      }
    }
  }

  if(inter['v'].length) { // verbs
    // remove chosen;
    var choicesV = [];

    for (var i in inter['v'])
      if(!chosen[inter['v'][i][0]])
        choicesV.push(inter['v'][i]);

    compat = checkCompatibleVerb(choicesV,chosen,words);
    if(compat[1]) {
      for(var i in compat[0]) {
        if(!chosen[compat[0][i][0]])
          chosen[compat[0][i][0]] = ['v',compat[0][i][1]];
      }
      inter['v'] = [];
      if(compat[0][0])
        DPR_G.G_verbDecl = words[compat[0][0][0]][compat[0][0][1]][2];
    }
    else { // punting
      inter['v'] = [];
      for(var i in compat[0]) {
        inter['v'].push(compat[0][i]);
      }
    }
  }

  // if punted, recheck subjects, and choose

  if(inter[0].length && DPR_G.G_verbDecl) {
    // remove chosen;
    var choices0 = [];
    for (var i in inter[0]) {
      if(!chosen[inter[0][i][0]])
        choices0.push(inter[0][i]);
    }
    if(choices0.length) {
      compat = checkCompatibleNoun(choices0,chosen,words);
      if(compat[1]) {
        for(var i in compat[0]) {
          if(!chosen[compat[0][i][0]])
            chosen[compat[0][i][0]] = [0,compat[0][i][1]];
        }
        DPR_G.G_subDecl = words[compat[0][0][0]][chosen[compat[0][0][0]][1]][2];
        inter[0] = [];
      }
    }
  }
  // if still none, choose first
  if (inter[0].length && !DPR_G.G_subDecl) {
    chosen[inter[0][0][0]] = [0,inter[0][0][1]];
    DPR_G.G_subDecl = words[inter[0][0][0]][inter[0][0][1]];
    inter[0] = [];
  }

  // now, just fill them in, noting where we've forced. (this may have to change)

  for(var i in words) {
    if(chosen[i]) {
      if(!alts) // don't recreate if we are using it
        DPR_G.G_altChoices[i] = [words[i],j];
      if(words[i][chosen[i][1]][2] && words[i][chosen[i][1]][2][1] == 6) { // genitive, keep with next
        pendG.push(words[i][chosen[i][1]]);
        continue;
      }
      if(words[i][chosen[i][1]][1] == 'i') { // indec, keep with next
        pendI.push(words[i][chosen[i][1]]);
        continue;
      }
      if(pendI.length) {
        for (var k in pendI) {
          outer[chosen[i][0]].push(pendI[k]);
        }
        pendI = [];
      }
      outer[chosen[i][0]].push(words[i][chosen[i][1]]);
      if(pendG.length) {
        outer[chosen[i][0]].push(DPR_G.G_joints['n'][5]); // push preposition
        for (var k in pendG) {
          outer[chosen[i][0]].push(pendG[k]);
        }
        pendG = [];
      }
      continue;
    }
    for(var j in words[i]) {  // for the rest, choose first, then alt the rest

      if(alts && alts[i] && alts[i][1] != 0 && alts[i][1] != j) // chose another alternative
        continue;
      var w = words[i][j];
      var vib = w[2]?w[2][1]:null;
      var type = w[1];

      if(vib == 1 || vib == 2 || type == 'v') // we've chosen them already;
        continue;

      if(!alts) // don't recreate if we are using it
        DPR_G.G_altChoices[i] = [words[i],j];

      if(w[2] && vib == 6) { // genitive, keep with next
        pendG.push(w);
        break;
      }
      if(w[1] == 'i') { // indec, keep with next
        pendI.push(w);
        break;
      }
      if(!w[1] && !w[2])
        tint = 'o';
      else if(w[2])
        tint = w[2][1]-1;
      else
        tint = 'o';
      if (pendI.length) { // add indeclinables
        for (var k in pendI)
          outer[tint].push(pendI[k]);
        pendI = [];
      }
      if (pendG.length) { // add genitives
        for (var k in pendG)
          outer[tint].push(pendG[k]);
        pendG = [];
      }
      outer[tint].push(w);
      break;
    }
  }

  // now put it all together

  for (var i in outer) {
    if(outer[i].length > 1 || (outer[i].length == 1 && outer[i][0].length > 1)) {
      var joined = '';
      if(i != 'v' && i != 'o') // nominal, add prepositions, plural
        joined = addPhrasePreps(outer[i],i,'n',true);
      else if(i == 'v') // verbal, add prepositions
        joined = addPhrasePreps(outer[i],DPR_G.G_verbDecl[0]-1,'v',true);
      else
        for(var j=0;j<outer[i].length;j++) {
          if(typeof(outer[i][j]) == 'string') {
            joined += (j>0?' ':'')+outer[i][j];
          }
          else
            joined += (j>0?' ':'')+makeWord(outer[i][j],false,true);
        }

      if(i == 0)
        out.subject.push(joined);
      else if(i == 1)
        out.object.push(joined);
      else if(i == 'bv')
        out.bverb.push(joined);
      else if(i == 'v')
        out.verb.push(joined);
      else
        out.other.push(joined);
    }
  }
  return out;
}

function checkCompatibleNoun(input,chosen,words) {
  var outerb = [];
  if(input.length > 1) {

    var choices = [];

    var og = 7;
    // first, check for words that are already chosen for this array, use their gender
    for(var i in chosen) {
      var ww = words[i];
      if(ww[0][2] && ww[0][2][0]!=7) {
        var og = ww[0][2][0];
      }
    }

    // second, if verb, coordinate with verb
    if(DPR_G.G_verbDecl) {
      var vv = DPR_G.G_verbDecl[1];
      var vn = DPR_G.G_verbDecl[2];
    }

    // filter out other genders, tenses and numbers (TODO tenses)
    for (var i in input) {
      var g = words[input[i][0]][input[i][1]][2];
      if(g[0] & og && (!vn || g[2] == vn)) // okay
        choices.push(input[i]);
    }

    // if still multi, check and see if compatible
    if((og > 4 || og == 3) && choices.length > 1) {
      var gg = [0,0,0];
      for(var i in choices) {
        g = words[choices[i][0]][choices[i][1]][2][0];
        for(var j in gg){
          if(j & g)
            gg[j]++;
        }
      }
      // check compat
      for(var j in gg){
        if(gg[j] == choices.length) { // all compatible
          for(var i in choices) {
            outerb.push(choices[i]);
          }
          choices = [];
          break;
        }
      }
      // if still choices, punt
      input = [];
      for(var i in choices) {
        input.push(choices[i]);
      }
    }
    else {
      for(var i in choices) {
        outerb.push(choices[i]);
      }
      input = [];
    }

  }
  else if(input[0]){
    outerb.push(input[0]);
    input = [];
  }
  if(input.length || !outerb.length)
    return [input,false];
  else
    return [outerb,true];

}

function checkCompatibleVerb(input,chosen,words) {
  if(input.length > 1) {
    var choices = [];
    var outerb = [];

    // tense

    // first, check for words that are only this array, use their tense
    for(var i in chosen) {
      if(words[i][0][2]) {
        var ww = words[i][0][2][0];
        break; // only one verb per sentence...
      }
    }

    // if forced tense, filter out other tenses
    for (var i in input) {
      var t = words[input[i][0]][input[i][1]][2][0];
      if(!ww || ww == t) // okay
        choices.push(input[i]);
    }

    // if still multi, check and see if compatible, multiple verbs (this IS rare...)
    if(choices.length > 1) {
      var tt = [];
      for(var i in choices) {
        t = words[choices[i][0]][choices[i][1]][2][0];
        if(!tt[t])
          tt[t] = 1;
        else
          tt[t]++;
      }
      // check compat
      for(var j in tt){
        if(tt[j] == choices.length) { // all compatible
          for(var i in choices) {
            outerb.push(choices[i]);
          }
          choices = [];
          break;
        }
      }
      // if still choices, punt
      input = [];
      for(var i in choices) {
        input.push(choices[i]);
      }
    }
    else {
      for(var i in choices) {
        outerb.push(choices[i]);
      }
      input = [];
    }

  }
  else if(input[0]){
    outerb.push(input[0]);
    input = [];
  }
  if(input.length)
    return [input,false];
  else
    return [outerb,true];

}

function makeWord(word,pl,alts) {
  return '<a class="green underline"'+(alts?' onmouseover="DPR_translate_mod.showAltTable('+word[5]+')"':'')+' target="_blank" href='+DPR_PAL.dprHomePage+'?analysis='+DPR_translit_mod.toVel(word[3])+'" title="'+(word[0] == word[3]?'lookup ':'translation of ')+word[3]+'">'+(pl?addPlural(word[0]):word[0])+'</a>';
}

async function translateWord(word,idx) {
  DPR_G.G_thisWord = word;
  var decls = [];
  var yto = [];
  var deca = [];
  var meta = []; // anything
  var vword = DPR_translit_mod.toVel(word);
  var type = '';
  var trans = '';
  var wtr = [];
  var outs = [];
  var eg = [];
  var engVerbs = [];
  if(DPR_G.G_specWords[word]) {
    type = DPR_G.G_specWords[word][0];
    trans = DPR_G.G_specWords[word][1];
    deca = DPR_G.G_specWords[word][2];
    meta = [];
    meta['orig'] = vword;
    meta['special'] = true;
    outs.push([trans,type,deca,word,meta,idx]);
  }
  if(eg[vword]) {
    meta = [];
    type = DPR_G.yt[vword][4].toLowerCase();
    trans = eg[vword];
    if(type == 'i' || type == 'p') {
      meta['orig'] = vword;
      deca = null;
      outs.push([trans,type,deca,word,meta,idx]);
    }
    else{
      for(var i in DPR_G.G_defDecl[type]) {
        if(DPR_G.G_defDecl[type][i][0].test(vword)){
          deca = DPR_G.G_defDecl[type][i][1][0];
          meta = [];
          meta['orig'] = vword;
          outs.push([trans,type,deca,word,meta,idx]);
        }
      }
    }
  }
  else if(engVerbs[word]) {
    type = 'v';
    trans = engVerbs[word];
    for(var i in DPR_G.G_defDecl['v']) {
      if(DPR_G.G_defDecl['v'][i][0].test(vword)){
        deca = DPR_G.G_defDecl['v'][i][1][0];
        meta = [];
        meta['orig'] = vword;
        outs.push([trans,type,deca,word,meta,idx]);
      }
    }
  }
  else {

    if(DPR_G.yt[vword]) {
      type = DPR_G.yt[vword][4].toLowerCase();
      if(type == 'i' || type == 'p') {
        trans = stripEnglish(DPR_G.yt[vword][2]);
        deca = null;
        meta = [];
        meta['orig'] = vword;
        outs.push([trans,type,deca,word,meta,idx]);
      }
      else {
        first:
        for(var i in DPR_G.G_defDecl[type]) {
          if(DPR_G.G_defDecl[type][i][0].test(vword)){
            decls = DPR_G.G_defDecl[type][i][1];
            for(var c in decls) { // just get the first one for now
              var deft = true;
              trans = stripEnglish(DPR_G.yt[vword][2]);
              deca = decls[c];
              meta = [];
              meta['orig'] = vword;
              outs.push([trans,type,deca,word,meta,idx]);
            }
          }
        }
        if(!deft) {
          trans = stripEnglish(DPR_G.yt[vword][2]);
          outs.push([trans,type,null,word,meta,idx]);
          meta = [];
          meta['orig'] = vword;
        }
      }
    }
    else if (typeof(DPR_G.P[vword]) == 'object') {
      for(var p in DPR_G.P[temp]) {
        var tloc = DPR_G.P[vword][p].split('/');
        var t1 = tloc[0];
        var t2 = tloc[1];
        var xmlDoc = await DPR_DataLoader.loadPXD(t1);

        var data = xmlDoc.getElementsByTagName('d')[t2].textContent;

        trans = data.replace(/^[^\[]+\[[^\]]*\]([a-zA-Z ]).*/g, "$1").replace(/^ +/,'').replace(/ +$/,'');
        type = data.replace(/^[^\[(]+\(([^)]+)\).*/,"$1");

        if(/adj\./.test(type))
          type = 'p';
        else if(/indecl\./.test(type))
          type = 'i';
        else if(/(adj|nt|m|f)\./.test(type))
          type = 'n';
        else if(/^to /.test(trans))
          type = 'v';
        else
          type = 'n';

        for(var i in DPR_G.G_defDecl[type]) {
          if(DPR_G.G_defDecl[type][i][0].test(vword)){
            decls = DPR_G.G_defDecl[type][i][1];
            for(var c in decls) { // just get the first one for now
              var deft = true;
              deca = decls[c];
              meta = [];
              meta['orig'] = vword;
              outs.push([trans,type,deca,word,meta,idx]);
            }
          }
        }
        if(!deft) {
          meta = [];
          meta['orig'] = vword;
          outs.push([trans,type,null,word,meta,idx]);
        }
      }
    }
    trans = '';
    type = '';
    var endings = DPR_analysis_declension_mod.makeDeclensions(vword);
    wtr = endings[0].concat(endings[1]);
    wtr = wtr.sort(sortLongerDec);
    second:
    for (var a in wtr) {
      type = DPR_G.G_endings[wtr[a][1]][4];
      var temp = wtr[a][0];
      var declt = DPR_G.G_endings[wtr[a][1]][5];
      decls = [];
      if(DPR_G.yt[temp] && DPR_G.yt[temp][4] != 'I') {
        var gender = DPR_G.yt[temp][1];
        for(var c in declt) {
          if(type=='v' || /adj\./.test(DPR_G.yt[temp][1]) || (1 & declt[c][0] && DPR_G.G_nTx[0].test(gender)) || (2 & declt[c][0] && DPR_G.G_nTx[1].test(gender)) || (4 & declt[c][0] && DPR_G.G_nTx[2].test(gender))) {
            decls.push(declt[c]);
          }
        }

        if(DPR_G.yt[temp][4] == 'P' || DPR_G.yt[temp][1] == 'adj.')
          type = 'p';
        if(eg[temp]) {
          for(var c in decls) {
            trans = eg[temp];
            deca = decls[c];
            meta = [];
            meta['orig'] = temp;
            outs.push([trans,type,deca,word,meta,idx]);
          }
        }
        if (engVerbs[DPR_translit_mod.toUni(temp)]) {
          for(var c in decls) {
            trans = engVerbs[DPR_translit_mod.toUni(temp)];
            deca = decls[c];
            meta = [];
            meta['orig'] = temp;
            outs.push([trans,type,deca,word,meta,idx]);
          }
        }
        for(var c in decls) {
          trans = stripEnglish(DPR_G.yt[temp][2]);
          deca = decls[c];
          meta = [];
          meta['orig'] = temp;
          outs.push([trans,type,deca,word,meta,idx]);
        }
      }
      else if (DPR_G.G_irregDec[temp] && typeof(DPR_G.yt[DPR_G.G_irregDec[temp][0]]) == 'object') {
        if(DPR_G.yt[DPR_G.G_irregDec[temp][0]][4] == 'P' || DPR_G.yt[DPR_G.G_irregDec[temp][0]][1] == 'adj.')
          type = 'p';
        for(var c in decls) {
          trans = stripEnglish(DPR_G.yt[DPR_G.G_irregDec[temp][0]][2]);
          deca = decls[c];
          meta = [];
          meta['orig'] = temp;
          outs.push([trans,type,deca,word,meta,idx]);
        }
      }
      else if (typeof(DPR_G.P[temp]) == 'object') {
        for(var p in DPR_G.P[temp]) {
          var tloc = DPR_G.P[temp][p].split('/');
          var t1 = tloc[0];
          var t2 = tloc[1];
          var xmlDoc = await DPR_DataLoader.loadPXD(t1);

          var data = xmlDoc.getElementsByTagName('d')[t2].textContent;

          if(!/^[^\[]+\[[^\]]*\][a-zA-Z ]+/.test(data))
            continue;
          trans = data.replace(/^[^\[]+\[[^\]]*\]([a-zA-Z ]+).*/g, "$1").replace(/^ +/,'').replace(/ +$/,'');

          if(/^[^\[(]+\([^)]+\)/.test(data)) {
            type = data.replace(/^[^\[(]+\(([^)]+)\).*/,"$1");
            if(/adj\./.test(type))
              type = 'p';
            else if(/indecl\./.test(type))
              type = 'i';
            else if(/(adj|nt|m|f)\./.test(type))
              type = 'n';
            else if(/^to /.test(trans))
              type = 'v';
            else
              type = 'n';
          }
          else
            type = DPR_G.G_endings[wtr[a][1]][4];

          for(var c in declt) {
            deca = declt[c];
            meta = [];
            meta['orig'] = temp;
            outs.push([trans,type,deca,word,meta,idx]);
          }
        }
      }
    }
    if(!trans.replace(/ /g,'')) {
      if(wtr.length) {
        for (var a in wtr) {
          var temp = wtr[a][0];
          var declt = DPR_G.G_endings[wtr[a][1]][5];
          for (var c in declt) {
            type = DPR_G.G_endings[wtr[a][1]][4];
            deca = declt[c];
            meta = [];
            meta['orig'] = vword;
            outs.push([DPR_translit_mod.toUni(temp),type,deca,word,meta,idx]);
          }
        }
      }
      else {
        meta = [];
        meta['orig'] = vword;
        outs.push([word,null,null,word,meta,idx]);
      }
    }
  }
  var dups = [];
  var outfin = [];
  dupsl:
  for (var i=0;i<outs.length;i++) {
    if(outs[i][0] != outs[i][3]) {
      outs[i][0] = transMod(outs[i]);
    }
    for(var j=0;j<dups.length;j++) {
      if(dups[j][1] == outs[i][1] && ((!dups[j][2] && !outs[i][2]) || (dups[j][2] && outs[i][2] && dups[j][2][0] == outs[i][2][0] && dups[j][2][1] == outs[i][2][1] && dups[j][2][2] == outs[i][2][2]))) {
        continue dupsl;
      }
    }
    dups.push(outs[i]);
    outfin.push(outs[i]);
  }
  return outfin;
}

function transMod([trans,type,deca,word,meta]) {
  if(type == 'n')
    trans = trans.replace(/^(an*|the) /,'');
  if(type == 'n' && deca && deca[1] == 1) // noun subject
    DPR_G.G_subDecl = deca;
  if(type == 'v' && deca) {
    DPR_G.G_verbDecl = deca;
    if(!(1 & deca[0]))
      trans = trans.replace(/\bis\b/,'be');
    else {
      trans = trans.replace(/\bbe\b/,'is');
      trans = trans.replace(/\bis\b/,DPR_G.G_ises[deca[1]-1][deca[2]-1]);
    }
    if(!(deca[0] & 1) || (deca[1]+deca[2] != 2)) { // verb endings, not present or not 3rd sing
      trans = trans.replace(/^(\S\S+)ies\b/,"$1y");
      trans = trans.replace(/^(\S+)(ss|[sc]h|zz|[xo])es\b/,"$1$2");
      trans = trans.replace(/^(\S+)s\b/,"$1");
    }
    else if(deca[1]+deca[2] == 2 && !/s\b/.test(trans))
      trans = addPlural(trans,type);
  }
  return trans;
}

function addPlural(word,type) {
  if(/\bone\b/.test(word))
    return word.replace(/\bone\b/,'ones');
  else if(/man\b/.test(word))
    word = word.replace(/man\b/,"men");
  else if(/(\S\S+)y$/.test(word) && type != 'v')
    word = word.replace(/y$/,"ies");
  else if(/(\S\S+)f$/.test(word))
    word = word.replace(/f$/,"ves");
  else if(/(\S+)(s|[sc]h|zz|[xo])$/.test(word))
    word += 'es';
  else
    word += 's';
  return word;
}

function addPhrasePreps(words,i,type,alts) {
  var joined = '';
  for(var j = 0;j < words.length;j++) {
    if(typeof(words[j]) == 'string') {
      joined += (j>0?' ':'')+words[j];
    }
    else {
      if(typeof(type) == "undefined")
         type = words[j][1];
      if(type == 'p')
        type = 'n';

      if(typeof(i) == "undefined") {
        if(words[j][2] == null) {
          joined += words[j][0];
          continue;
        }
        i = words[j][2][1]-1;
      }

      if(j == 0) {
        if(DPR_G.G_joints[type] == null)
          return words[j][3];
        joined += (DPR_G.G_joints[type][i]?DPR_G.G_joints[type][i]+' ':'');
      }
      if(j > 0)
        joined += ' ';
      if(words[j+1])
        joined += makeWord(words[j],false,alts);
      else // last word, check plural
        joined += makeWord(words[j],(type == 'n' && words[j][2] && words[j][2][2] == 2),alts);
    }
  }
  return joined;
}

function sortLongerDec(a,b) {
  if(DPR_G.G_endings[a[1]][4] == 'v')
    return -1;
  if(DPR_G.G_endings[b[1]][4] == 'v')
    return 1;
  var x = DPR_G.G_endings[a[1]][0];
  var y = DPR_G.G_endings[b[1]][0];
  return( x.length - y.length );
}

function stripEnglish(input) {

  var out = input.replace(/^[0-9]+\./,'').replace(/[;.,].*/,'');
  return out;
}

async function simpleWordTranslation(word) {
  words = await translateWord(word);
  for(var i in words) {
    words[i] = addPhrasePreps(words[i]);
  }
  return words;
}


function showAltTable(idx) {
  var w = DPR_G.G_altChoices[idx][0];
  var out = '<b>'+w[0][3]+'</b> ';
  if(w.length == 1)
    out += DPR_grammar_mod.makeGrammarTerms(w[0]);
  else if(w.length > 1) {
    out += '<select onclick="DPR_translate_mod.changeAlt(this,'+idx+')">';
    for(var i in w) {
      out+='<option>'+DPR_grammar_mod.makeGrammarTerms(w[i])+'</option>';
    }
    out+='</select>';
  }
  else
    return;

  $('#altTable').hide();
  $('#altTable').html(out);
  $('#altTable').fadeIn('fast');
}

async function changeAlt(e,i) {
  var alt = e.selectedIndex;
  DPR_G.G_altChoices[i][1] = alt;
  await translateText(DPR_G.G_altChoices);
}

async function insertWordByWord() {
  var input = DPR_translit_mod.toUni($('#input').val().toLowerCase()).replace(/(\n|\r)/g, ' ').replace(DPR_G.G_uniRegExpNSG,'');
  var words = await DPR_grammar_mod.conjugateWords(input);
  var out = "";
  for(var i = 0; i < words.length; i++) {
    var options = "";
    for(var j = 0; j < words[i].length; j++) {
      options += '<li><span class="decl-grammar">'+words[i][j][0]+' form of '+words[i][j][1]+'</span><br/><span class="decl-english">'+words[i][j][2]+'</span></li>';
      options = "$('#').html(unescape('"+escape('<ol>' + options + '</ol>')+"'))";
    }
    out += '<b>'+words[i][0][3]+'</b> '+words[i][0][2]+' ';
  }
  $('#translation').html(out);
}

function clearText() {
  $('#translation').empty();
  $('#altTable').empty();
  $('#input').val('');
}

DPR_G.G_subDecl = [];
DPR_G.G_verbDecl = [];
DPR_G.G_objDecl = [];
DPR_G.G_thisWord = '';

DPR_G.G_joints = [];
DPR_G.G_joints['n'] = ['','','with','for','from','of','at','O'];
DPR_G.G_joints['v'] = ['','should','may','will','did','causes to'];

DPR_G.G_defDecl = [];
DPR_G.G_defDecl['v'] = [];
DPR_G.G_defDecl['v'].push([/ati$/,[[1,1,1]]]);
DPR_G.G_defDecl['v'].push([/eti$/,[[1,1,1]]]);
DPR_G.G_defDecl['v'].push([/oti$/,[[1,1,1]]]);
DPR_G.G_defDecl['v'].push([/si$/,[[5,1,1]]]);
DPR_G.G_defDecl['n'] = [];
DPR_G.G_defDecl['n'].push([/aa$/,[[4,1,1]]]);
DPR_G.G_defDecl['n'].push([/a$/,[[3,8,1]]]);
DPR_G.G_defDecl['n'].push([/i$/,[[7,1,1],[7,8,1]]]);
DPR_G.G_defDecl['n'].push([/u$/,[[7,1,1],[7,8,1]]]);

DPR_G.G_specWords = [];
DPR_G.G_specWords['na'] = ['i','not',null];
DPR_G.G_specWords['mā'] = ['i','not',null];

DPR_G.G_ises = [];
DPR_G.G_ises.push(['is','are']);
DPR_G.G_ises.push(['are','are']);
DPR_G.G_ises.push(['am','are']);

DPR_G.G_subjects = [['He/She/It','They'],['You','You all'],['I','We']];

DPR_G.G_nTx = [/\bm\./,/\bnt\./,/\bf\./]; //rx
DPR_G.G_vTypes = ['pres','imp','opt','fut','past','caus']; // binary

return {
addPhrasePreps : addPhrasePreps,
changeAlt : changeAlt,
clearText : clearText,
insertWordByWord : insertWordByWord,
showAltTable : showAltTable,
translateText : translateText,
translateTextFromBottomPane : translateTextFromBottomPane,
translateWord : translateWord
}
})()
