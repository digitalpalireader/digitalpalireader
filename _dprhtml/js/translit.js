'use strict';

var DPR_translit_mod = ( function () {

function toUni(input) {
  if(!input || input == '') return input;
  var nigahita = (DPR_G.DPR_prefs['nigahita']?'ṁ':'ṃ');
  var Nigahita = (DPR_G.DPR_prefs['nigahita']?'Ṁ':'Ṃ');

  input = input.replace(/aa/g, 'ā').replace(/ii/g, 'ī').replace(/uu/g, 'ū').replace(/\.t/g, 'ṭ').replace(/\.d/g, 'ḍ').replace(/\"n\b/g, 'ṅ').replace(/\"nk/g, 'ṅk').replace(/\"ng/g, 'ṅg').replace(/\.n/g, 'ṇ').replace(/\.m/g, nigahita).replace(/\u1E41/g, nigahita).replace(/\~n/g, 'ñ').replace(/\.l/g, 'ḷ').replace(/AA/g, 'Ā').replace(/II/g, 'Ī').replace(/UU/g, 'Ū').replace(/\.T/g, 'Ṭ').replace(/\.D/g, 'Ḍ').replace(/\"N/g, 'Ṅ').replace(/\.N/g, 'Ṇ').replace(/\.M/g, Nigahita).replace(/\~N/g, 'Ñ').replace(/\.L/g, 'Ḷ').replace(/\.ll/g,'ḹ').replace(/\.r/g,'ṛ').replace(/\.rr/g,'ṝ').replace(/\.s/g,'ṣ').replace(/"s/g,'ś').replace(/\.h/g,'ḥ');

  return input;
}

function toUniRegEx(input) {
  if(!input || input == '') return input;
  var nigahita = (DPR_G.DPR_prefs['nigahita']?'ṁ':'ṃ');
  var Nigahita = (DPR_G.DPR_prefs['nigahita']?'Ṁ':'Ṃ');
  input = input.replace(/aa/g, 'ā').replace(/ii/g, 'ī').replace(/uu/g, 'ū').replace(/\\\.t/g, 'ṭ').replace(/\\\.d/g, 'ḍ').replace(/\"n\b/g, 'ṅ').replace(/\"nk/g, 'ṅk').replace(/\"ng/g, 'ṅg').replace(/\\\.n/g, 'ṇ').replace(/\\\.m/g, nigahita).replace(/\u1E41/g, nigahita).replace(/\~n/g, 'ñ').replace(/\\\.l/g, 'ḷ').replace(/AA/g, 'Ā').replace(/II/g, 'Ī').replace(/UU/g, 'Ū').replace(/\\\.T/g, 'Ṭ').replace(/\\\.D/g, 'Ḍ').replace(/\"N/g, 'Ṅ').replace(/\\\.N/g, 'Ṇ').replace(/\\\.M/g, Nigahita).replace(/\~N/g, 'Ñ').replace(/\\\.L/g, 'Ḷ');
  return input;
}

function toVel(input) {
  if(!input || input == '') return input;
  input = input.replace(/\u0101/g, 'aa').replace(/\u012B/g, 'ii').replace(/\u016B/g, 'uu').replace(/\u1E6D/g, '\.t').replace(/\u1E0D/g, '\.d').replace(/\u1E45/g, '\"n').replace(/\u1E47/g, '\.n').replace(/\u1E43/g, '\.m').replace(/\u1E41/g, '\.m').replace(/\u00F1/g, '\~n').replace(/\u1E37/g, '\.l').replace(/\u0100/g, 'AA').replace(/\u012A/g, 'II').replace(/\u016A/g, 'UU').replace(/\u1E6C/g, '\.T').replace(/\u1E0C/g, '\.D').replace(/\u1E44/g, '\"N').replace(/\u1E46/g, '\.N').replace(/\u1E42/g, '\.M').replace(/\u00D1/g, '\~N').replace(/\u1E36/g, '\.L').replace(/ḹ/g, '\.ll').replace(/ṛ/g, '\.r').replace(/ṝ/g, '\.rr').replace(/ṣ/g, '\.s').replace(/ś/g, '"s').replace(/ḥ/g, '\.h');
  return input;
}

function toFuzzy(input){
  if(!input) return;
  input = toVel(input).replace(/\.([tdnlmTDNLM])/g,"$1").replace(/~([nN])/g,"$1").replace(/"([nN])/g,"$1").replace(/aa/g,"a").replace(/ii/g,"i").replace(/uu/g,"u").replace(/nn/g,"n").replace(/mm/g,"m").replace(/yy/g,"y").replace(/ll/g,"l").replace(/ss/g,"s").replace(/([kgcjtdpb])[kgcjtdpb]{0,1}h*/g,"$1");
  return input;
}

function toSkt(input,rv) {
  if(!input || input == '') return input;

  if(rv) {
    input = input.replace(/A/g,'aa').replace(/I/g,'ii').replace(/U/g,'uu').replace(/f/g,'.r').replace(/F/g,'.rr').replace(/x/g,'.l').replace(/X/g,'.ll').replace(/E/g,'ai').replace(/O/g,'au').replace(/K/g,'kh').replace(/G/g,'gh').replace(/N/g,'"n').replace(/C/g,'ch').replace(/J/g,'jh').replace(/Y/g,'~n').replace(/w/g,'.t').replace(/q/g,'.d').replace(/W/g,'.th').replace(/Q/g,'.dh').replace(/R/g,'.n').replace(/T/g,'th').replace(/D/g,'dh').replace(/P/g,'ph').replace(/B/g,'bh').replace(/S/g,'"s').replace(/z/g,'.s').replace(/M/g,'.m').replace(/H/g,'.h');
  }
  else {
    input = input.replace(/aa/g,'A').replace(/ii/g,'I').replace(/uu/g,'U').replace(/\.r/g,'f').replace(/\.rr/g,'F').replace(/\.l/g,'x').replace(/\.ll/g,'X').replace(/ai/g,'E').replace(/au/g,'O').replace(/kh/g,'K').replace(/gh/g,'G').replace(/\"nk/g, 'Nk').replace(/\"ng/g, 'Ng').replace(/ch/g,'C').replace(/jh/g,'J').replace(/~n/g,'Y').replace(/\.t/g,'w').replace(/\.d/g,'q').replace(/\.th/g,'W').replace(/\.dh/g,'Q').replace(/\.n/g,'R').replace(/th/g,'T').replace(/dh/g,'D').replace(/ph/g,'P').replace(/bh/g,'B').replace(/"s/g,'S').replace(/\.s/g,'z').replace(/\.m/g,'M').replace(/\.h/g,'H');
  }
  return input;
}

const TranslitCoreScriptMap = [
  DPR_translitCore_mod.ScriptIds.RO,
  DPR_translitCore_mod.ScriptIds.THAI,
  DPR_translitCore_mod.ScriptIds.SI,
  DPR_translitCore_mod.ScriptIds.HI,
  DPR_translitCore_mod.ScriptIds.LAOS,
  DPR_translitCore_mod.ScriptIds.MY,
  DPR_translitCore_mod.ScriptIds.KM,
  DPR_translitCore_mod.ScriptIds.BENG,
  DPR_translitCore_mod.ScriptIds.GURM,
  DPR_translitCore_mod.ScriptIds.GUJA,
  DPR_translitCore_mod.ScriptIds.TELU,
  DPR_translitCore_mod.ScriptIds.KANN,
  DPR_translitCore_mod.ScriptIds.MALA,
  DPR_translitCore_mod.ScriptIds.THAM,
  DPR_translitCore_mod.ScriptIds.BRAH,
  DPR_translitCore_mod.ScriptIds.TIBT,
  DPR_translitCore_mod.ScriptIds.CYRL,
]

function translit(data) {
  if(!data || data == '' || typeof(data) != 'string') {
    return data;
  }

  data = data.replace(/\&nbsp;/g,' ');
  const script = TranslitCoreScriptMap[parseInt(DPR_G.DPR_prefs['translits'])];

  if (script === DPR_translitCore_mod.ScriptIds.RO) {
    return data;
  }

  const siData = DPR_translitCore_mod.convertX2SI(data, DPR_translitCore_mod.ScriptIds.RO);
  if (script === DPR_translitCore_mod.ScriptIds.SI) {
    return siData;
  }

  return DPR_translitCore_mod.convertSI2X(siData, script)
}

const ConvertCoreScriptMap = [...TranslitCoreScriptMap]
ConvertCoreScriptMap.splice(1, 0, 'VEL');

function convertMain(text, inScriptIndex, outScriptIndex) {
  let newText = text
  if (inScriptIndex === outScriptIndex) {
    return newText;
  }

  const inScript = ConvertCoreScriptMap[inScriptIndex];
  const outScript = ConvertCoreScriptMap[outScriptIndex];

  if (outScript === 'VEL') {
    if (inScript !== DPR_translitCore_mod.ScriptIds.RO) {
      newText = DPR_translitCore_mod.convertX2SI(newText, inScript);
      newText = DPR_translitCore_mod.convertSI2X(newText, DPR_translitCore_mod.ScriptIds.RO)
    }
    newText = toVel(newText);
    return newText;
  } else if (inScript === 'VEL') {
    newText = toUni(newText)
  }

  newText = DPR_translitCore_mod.convertX2SI(newText, inScript);
  if (outScript === DPR_translitCore_mod.ScriptIds.SI) {
    return newText;
  }

  return DPR_translitCore_mod.convertSI2X(newText, outScript)
}

return {
  toFuzzy: toFuzzy,
  toSkt: toSkt,
  toUni: toUni,
  toUniRegEx: toUniRegEx,
  toVel: toVel,
  convertMain: convertMain,
  translit: translit,
}
})()
