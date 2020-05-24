'use strict';

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

function toVelRegEx(input) {
  if(!input || input == '') return input;
  input = input.replace(/\u0101/g, 'aa').replace(/\u012B/g, 'ii').replace(/\u016B/g, 'uu').replace(/\u1E6D/g, '\\.t').replace(/\u1E0D/g, '\\.d').replace(/\u1E45/g, '"n').replace(/\u1E47/g, '\\.n').replace(/\u1E43/g, '\\.m').replace(/\u1E41/g, '\\.m').replace(/\u00F1/g, '~n').replace(/\u1E37/g, '\\.l').replace(/\u0100/g, 'AA').replace(/\u012A/g, 'II').replace(/\u016A/g, 'UU').replace(/\u1E6C/g, '\\.T').replace(/\u1E0C/g, '\\.D').replace(/\u1E44/g, '"N').replace(/\u1E46/g, '\\.N').replace(/\u1E42/g, '\\.M').replace(/\u00D1/g, '~N').replace(/\u1E36/g, '\\.L');
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


function toSin(input,type) {
  input = input.toLowerCase().replace(/ṁ/g,'ṃ');
  var vowel = [];

  vowel['a'] = 'අ';
  vowel['ā'] = 'ආ';
  vowel['i'] = 'ඉ';
  vowel['ī'] = 'ඊ';
  vowel['u'] = 'උ';
  vowel['ū'] = 'ඌ';
  vowel['e'] = 'එ';
  vowel['o'] = 'ඔ';

  var sinhala = [];

  sinhala['ā'] = 'ා';
  sinhala['i'] = 'ි';
  sinhala['ī'] = 'ී';
  sinhala['u'] = 'ු';
  sinhala['ū'] = 'ූ';
  sinhala['e'] = 'ෙ';
  sinhala['o'] = 'ො';
  sinhala['ṃ'] = 'ං';
  sinhala['k'] = 'ක';
  sinhala['g'] = 'ග';
  sinhala['ṅ'] = 'ඞ';
  sinhala['c'] = 'ච';
  sinhala['j'] = 'ජ';
  sinhala['ñ'] = 'ඤ';
  sinhala['ṭ'] = 'ට';
  sinhala['ḍ'] = 'ඩ';
  sinhala['ṇ'] = 'ණ';
  sinhala['t'] = 'ත';
  sinhala['d'] = 'ද';
  sinhala['n'] = 'න';
  sinhala['p'] = 'ප';
  sinhala['b'] = 'බ';
  sinhala['m'] = 'ම';
  sinhala['y'] = 'ය';
  sinhala['r'] = 'ර';
  sinhala['l'] = 'ල';
  sinhala['ḷ'] = 'ළ';
  sinhala['v'] = 'ව';
  sinhala['s'] = 'ස';
  sinhala['h'] = 'හ';

  var conj = [];

  conj['kh'] = 'ඛ';
  conj['gh'] = 'ඝ';
  conj['ch'] = 'ඡ';
  conj['jh'] = 'ඣ';
  conj['ṭh'] = 'ඨ';
  conj['ḍh'] = 'ඪ';
  conj['th'] = 'ථ';
  conj['dh'] = 'ධ';
  conj['ph'] = 'ඵ';
  conj['bh'] = 'භ';
  conj['jñ'] = 'ඥ';
  conj['ṇḍ'] = 'ඬ';
  conj['nd'] = 'ඳ';
  conj['mb'] = 'ඹ';
  conj['rg'] = 'ඟ';


  var cons = [];

  cons['k'] = 'ක';
  cons['g'] = 'ග';
  cons['ṅ'] = 'ඞ';
  cons['c'] = 'ච';
  cons['j'] = 'ජ';
  cons['ñ'] = 'ඤ';
  cons['ṭ'] = 'ට';
  cons['ḍ'] = 'ඩ';
  cons['ṇ'] = 'ණ';
  cons['t'] = 'ත';
  cons['d'] = 'ද';
  cons['n'] = 'න';
  cons['p'] = 'ප';
  cons['b'] = 'බ';
  cons['m'] = 'ම';
  cons['y'] = 'ය';
  cons['r'] = 'ර';
  cons['l'] = 'ල';
  cons['ḷ'] = 'ළ';
  cons['v'] = 'ව';
  cons['s'] = 'ස';
  cons['h'] = 'හ';


  var im, i0, i1, i2, i3
  var output = '';
  var i = 0;

  input = input.replace(/\&quot;/g, '`');

  while (i < input.length) {
    im = input.charAt(i-2);
    i0 = input.charAt(i-1);
    i1 = input.charAt(i);
    i2 = input.charAt(i+1);
    i3 = input.charAt(i+2);

    if (vowel[i1]) {
      if (i == 0 || i0 == 'a') output += vowel[i1];
      else if (i1 != 'a') {
        output += sinhala[i1];
      }
      i++;
    }
    else if (conj[i1+i2]) {    // two character match
      output += conj[i1+i2];
      i += 2;
      if(cons[i3]) output += '්';
    }
    else if (sinhala[i1] && i1 != 'a') {    // one character match except a
      output += sinhala[i1];
      i++;
      if(cons[i2] && i1 != 'ṃ') output += '්';
    }
    else if (!sinhala[i1]) {
      if (cons[i0] || (i0 == 'h' && cons[im])) output += '්'; // end word consonant
      output += i1;
      i++;
      if (vowel[i2]) {  // word-beginning vowel marker
        output += vowel[i2];
        i++;
      }
    }
    else i++;
  }
  if (cons[i1]) output += '්';

  // fudges

  // "‍" zero-width joiner inside of quotes

  output = output.replace(/ඤ්ජ/g, 'ඦ');
  output = output.replace(/ණ්ඩ/g, 'ඬ');
  output = output.replace(/න්ද/g, 'ඳ');
  output = output.replace(/ම්බ/g, 'ඹ');
  output = output.replace(/්ර/g, '්‍ර');
  output = output.replace(/\`+/g, '"');
  return output;
}



function fromSin(input,type) {
  var vowel = [];

  vowel['අ'] = 'a';
  vowel['ආ'] = 'ā';
  vowel['ඉ'] = 'i';
  vowel['ඊ'] = 'ī';
  vowel['උ'] = 'u';
  vowel['ඌ'] = 'ū';
  vowel['එ'] = 'e';
  vowel['ඔ'] = 'o';


  vowel['ඒ'] = 'ē';
  vowel['ඇ'] = 'ai';
  vowel['ඈ'] = 'āi';
  vowel['ඕ'] = 'ō';
  vowel['ඖ'] = 'au';

  vowel['ා'] = 'ā';
  vowel['ි'] = 'i';
  vowel['ී'] = 'ī';
  vowel['ු'] = 'u';
  vowel['ූ'] = 'ū';
  vowel['ෙ'] = 'e';
  vowel['ො'] = 'o';

  vowel['ෘ'] = 'ṛ';
  vowel['ෟ'] = 'ḷ';
  vowel['ෲ'] = 'ṝ';
  vowel['ෳ'] = 'ḹ';

  vowel['ේ'] = 'ē';
  vowel['ැ'] = 'ae';
  vowel['ෑ'] = 'āe';
  vowel['ෛ'] = 'ai';
  vowel['ෝ'] = 'ō';
  vowel['ෞ'] = 'au';

  var sinhala = [];


  sinhala['ං'] = 'ṃ';
  sinhala['ක'] = 'k';
  sinhala['ඛ'] = 'kh';
  sinhala['ග'] = 'g';
  sinhala['ඝ'] = 'gh';
  sinhala['ඞ'] = 'ṅ';
  sinhala['ච'] = 'c';
  sinhala['ඡ'] = 'ch';
  sinhala['ජ'] = 'j';
  sinhala['ඣ'] = 'jh';
  sinhala['ඤ'] = 'ñ';
  sinhala['ට'] = 'ṭ';
  sinhala['ඨ'] = 'ṭh';
  sinhala['ඩ'] = 'ḍ';
  sinhala['ඪ'] = 'ḍh';
  sinhala['ණ'] = 'ṇ';
  sinhala['ත'] = 't';
  sinhala['ථ'] = 'th';
  sinhala['ද'] = 'd';
  sinhala['ධ'] = 'dh';
  sinhala['න'] = 'n';
  sinhala['ප'] = 'p';
  sinhala['ඵ'] = 'ph';
  sinhala['බ'] = 'b';
  sinhala['භ'] = 'bh';
  sinhala['ම'] = 'm';
  sinhala['ය'] = 'y';
  sinhala['ර'] = 'r';

  sinhala['ල'] = 'l';
  sinhala['ළ'] = 'ḷ';
  sinhala['ව'] = 'v';
  sinhala['ස'] = 's';
  sinhala['හ'] = 'h';

  sinhala['ෂ'] = 'ṣ';
  sinhala['ශ'] = 'ś';

  sinhala['ඥ'] = 'jñ';
  sinhala['ඬ'] = 'ṇḍ';
  sinhala['ඳ'] = 'nd';
  sinhala['ඹ'] = 'mb';
  sinhala['ඟ'] = 'rg';

  var im, i0, i1, i2, i3
  var output = '';
  var i = 0;

  input = input.replace(/\&quot;/g, '`');

  while (i < input.length) {
    i1 = input.charAt(i);

    if (vowel[i1]) {
      if(output.charAt(output.length-1) == 'a')
        output = output.substring(0,output.length-1);
      output += vowel[i1];
    }
    else if (sinhala[i1]) {
      output += sinhala[i1]+'a';
    }
    else
      output += i1;
    i++;
  }

  // fudges

  // "‍" zero-width joiner inside of quotes

  output = output.replace(/a්/g, '');
  return output;
}

function toMyanmar(input,type) {
  input = input.toLowerCase().replace(/ṁ/g,'ṃ');
  var vowel = [];
  vowel['a'] = "အ";
  vowel['i'] = "ဣ";
  vowel['u'] = "ဥ";
  vowel['ā'] = "အာ";
  vowel['ī'] = "ဤ";
  vowel['ū'] = "ဦ";
  vowel['e'] = "ဧ";
  vowel['o'] = "ဩ";

  var myanr = [];

//  myanr['ā'] = 'ā'; // later
  myanr['i'] = 'ိ';
  myanr['ī'] = 'ီ';
  myanr['u'] = 'ု';
  myanr['ū'] = 'ူ';
  myanr['e'] = 'ေ';
//  myanr['o'] = 'ေā'; // later
  myanr['ṃ'] = 'ံ';
  myanr['k'] = 'က';
  myanr['kh'] = 'ခ';
  myanr['g'] = 'ဂ';
  myanr['gh'] = 'ဃ';
  myanr['ṅ'] = 'င';
  myanr['c'] = 'စ';
  myanr['ch'] = 'ဆ';
  myanr['j'] = 'ဇ';
  myanr['jh'] = 'ဈ';
  myanr['ñ'] = 'ဉ';
  myanr['ṭ'] = 'ဋ';
  myanr['ṭh'] = 'ဌ';
  myanr['ḍ'] = 'ဍ';
  myanr['ḍh'] = 'ဎ';
  myanr['ṇ'] = 'ဏ';
  myanr['t'] = 'တ';
  myanr['th'] = 'ထ';
  myanr['d'] = 'ဒ';
  myanr['dh'] = 'ဓ';
  myanr['n'] = 'န';
  myanr['p'] = 'ပ';
  myanr['ph'] = 'ဖ';
  myanr['b'] = 'ဗ';
  myanr['bh'] = 'ဘ';
  myanr['m'] = 'မ';
  myanr['y'] = 'ယ';
  myanr['r'] = 'ရ';
  myanr['l'] = 'လ';
  myanr['ḷ'] = 'ဠ';
  myanr['v'] = 'ဝ';
  myanr['s'] = 'သ';
  myanr['h'] = 'ဟ';

  var cons = [];

  cons['k'] = 'က';
  cons['g'] = 'ဂ';
  cons['ṅ'] = 'င';
  cons['c'] = 'စ';
  cons['j'] = 'ဇ';
  cons['ñ'] = 'ဉ';
  cons['ṭ'] = 'ဋ';
  cons['ḍ'] = 'ဍ';
  cons['ṇ'] = 'ဏ';
  cons['t'] = 'တ';
  cons['d'] = 'ဒ';
  cons['n'] = 'န';
  cons['p'] = 'ပ';
  cons['b'] = 'ဗ';
  cons['m'] = 'မ';
  cons['y'] = 'ယ';
  cons['r'] = 'ရ';
  cons['l'] = 'လ';
  cons['ḷ'] = 'ဠ';
  cons['v'] = 'ဝ';
  cons['s'] = 'သ';
  cons['h'] = 'ဟ';


  var spec = []; // takes special aa
  spec['kh'] = 1;
  spec['g'] = 1;
  spec['d'] = 1;
  spec['dh'] = 1;
  spec['p'] = 1;
  spec['v'] = 1;

  var im, i0, i1, i2, i3
  var output = '';
  var i = 0;

  input = input.replace(/\&quot;/g, '`');

  var longa = false; // special character for long a

  while (i < input.length) {
    im = input.charAt(i-2);
    i0 = input.charAt(i-1);
    i1 = input.charAt(i);
    i2 = input.charAt(i+1);
    i3 = input.charAt(i+2);

    if (vowel[i1]) {
      if (i == 0 || i0 == 'a') output += vowel[i1];
      else if (i1 == 'ā') {
        if (spec[longa]) { output += 'ါ'; }
        else { output += 'ာ'; };
      }
      else if (i1 == 'o') {
        if (spec[longa]) { output += 'ေါ'; }
        else { output += 'ော'; };
      }
      else if (i1 != 'a') {
        output += myanr[i1];
      }
      i++;
      longa = false;
    }
    else if (myanr[i1+i2] && i2 == 'h') {  // two character match
      output += myanr[i1+i2];
      if (i3 != 'y' && !longa) longa = i1+i2; // gets first letter in conjunct for special long a check
      if(cons[i3]) output += '္';
      i += 2;
    }
    else if (myanr[i1] && i1 != 'a') {  // one character match except a
      output += myanr[i1];
      i++;
      if (i2 != 'y' && !longa) longa = i1; // gets first letter in conjunct for special long a check
      if(cons[i2] && i1 != 'ṃ') {
        output += '္';
      }
    }
    else if (!myanr[i1]) {
      output += i1;
      i++;
      if (vowel[i2]) {  // word-beginning vowel marker
        if (vowel[i2+i3]) {
          output += vowel[i2+i3];
          i += 2;
        }
        else {
          output += vowel[i2];
          i++;
        }
      }
      longa = false;
    }
    else {
      longa = false;
      i++;
    }
  }

  // fudges

  output = output.replace(/ဉ္ဉ/g, 'ည');
  output = output.replace(/္ယ/g, 'ျ');
  output = output.replace(/္ရ/g, 'ြ');
  output = output.replace(/္ဝ/g, 'ွ');
  output = output.replace(/္ဟ/g, 'ှ');
  output = output.replace(/သ္သ/g, 'ဿ');
  output = output.replace(/င္/g, 'င်္');

  output = output.replace(/\`+/g, '"');
  return output;
}


// Refer: https://en.wikipedia.org/wiki/Bengali_(Unicode_block)
function toBengali(input,type) {

  input = input.toLowerCase().replace(/ṁ/g,'ṃ');

  var vowel = [];
  vowel['a'] = " অ";
  vowel['i'] = " ই";
  vowel['u'] = " উ";
  vowel['ā'] = " আ";
  vowel['ī'] = " ঈ";
  vowel['ū'] = " ঊ";
  vowel['e'] = " এ";
  vowel['o'] = " ও";

  var bengalir = [];

  bengalir['ā'] = 'া';
  bengalir['i'] = 'ি';
  bengalir['ī'] = 'ী';
  bengalir['u'] = 'ু';
  bengalir['ū'] = 'ূ';
  bengalir['e'] = 'ে';
  bengalir['o'] = 'ো';
  bengalir['ṃ'] = 'ং';
  bengalir['k'] = 'ক';
  bengalir['kv'] = 'ক্ব';
  bengalir['kh'] = 'খ';
  bengalir['khv'] = 'খ্ব';
  bengalir['g'] = 'গ';
  bengalir['gh'] = 'ঘ';
  bengalir['ṅ'] = 'ঙ';
  bengalir['c'] = 'চ';
  bengalir['ch'] = 'ছ';
  bengalir['j'] = 'জ';
  bengalir['jh'] = 'ঝ';
  bengalir['ñ'] = 'ঞ';
  bengalir['ṭ'] = 'ট';
  bengalir['ṭh'] = 'ঠ';
  bengalir['ḍ'] = 'ড';
  bengalir['ḍh'] = 'ঢ';
  bengalir['ṇ'] = 'ণ';
  bengalir['t'] = 'ত';
  bengalir['tv'] = 'ত্ব';
  bengalir['th'] = 'থ';
  bengalir['d'] = 'দ';
  bengalir['dv'] = 'দ্ব';
  bengalir['dh'] = 'ধ';
  bengalir['n'] = 'ন';
  bengalir['nv'] = 'ন্ব';
  bengalir['p'] = 'প';
  bengalir['ph'] = 'ফ';
  bengalir['b'] = 'ব';
  bengalir['bh'] = 'ভ';
  bengalir['m'] = 'ম';
  bengalir['y'] = 'য';
  bengalir['yv'] = 'য্ব';
  bengalir['r'] = 'র';
  bengalir['l'] = 'ল';
  bengalir['ḷ'] = 'ল়';
  bengalir['v'] = 'ৱ';
  bengalir['s'] = 'স';
  bengalir['sv'] = 'স্ব';
  bengalir['h'] = 'হ';

  var im = '';
  var i0 = '';
  var i1 = '';
  var i2 = '';
  var i3 = '';
  var i4 = '';
  var i5 = '';
  var output = '';
  var cons = 0;
  var i = 0;
  var bstop = '্';

  input = input.replace(/\&quot;/g, '`');

  while (i < input.length) {
    im = input.charAt(i-2);
    i0 = input.charAt(i-1);
    i1 = input.charAt(i);
    i2 = input.charAt(i+1);
    i3 = input.charAt(i+2);
    i4 = input.charAt(i+3);
    i5 = input.charAt(i+4);

    if (i == 0 && vowel[i1]) { // first letter vowel
      output += vowel[i1];
      i += 1;
    }
    else if (i2 == 'h' && bengalir[i1+i2]) {    // two character match
      output += bengalir[i1+i2];
      if (i3 && !vowel[i3] && i2 != 'ṃ') {
        output += bstop;
      }
      i += 2;
    }
    else if (bengalir[i1]) {  // one character match except a
      output += bengalir[i1];
      if (i2 && !vowel[i2] && !vowel[i1] && i1 != 'ṃ') {
        output += bstop;
      }
      i++;
    }
    else if (i1 != 'a') {
      if (cons[i0] || (i0 == 'h' && cons[im])) output += bstop; // end word consonant
      output += i1;
      i++;
      if(vowel[i2]) {
        output+=vowel[i2];
        i++;
      }
    }
    else i++; // a
  }
  if (cons[i1]) output += bstop;
  output = output.replace(/\`+/g, '"');
  return output;
}



// Refer: https://en.wikipedia.org/wiki/Devanagari_(Unicode_block)
function toDeva(input,type) {

  input = input.toLowerCase().replace(/ṁ/g,'ṃ');

  var vowel = [];
  vowel['a'] = " अ";
  vowel['i'] = " इ";
  vowel['u'] = " उ";
  vowel['ā'] = " आ";
  vowel['ī'] = " ई";
  vowel['ū'] = " ऊ";
  vowel['e'] = " ए";
  vowel['o'] = " ओ";

  var devar = [];

  devar['ā'] = 'ा';
  devar['i'] = 'ि';
  devar['ī'] = 'ी';
  devar['u'] = 'ु';
  devar['ū'] = 'ू';
  devar['e'] = 'े';
  devar['o'] = 'ो';
  devar['ṃ'] = 'ं';
  devar['k'] = 'क';
  devar['kh'] = 'ख';
  devar['g'] = 'ग';
  devar['gh'] = 'घ';
  devar['ṅ'] = 'ङ';
  devar['c'] = 'च';
  devar['ch'] = 'छ';
  devar['j'] = 'ज';
  devar['jh'] = 'झ';
  devar['ñ'] = 'ञ';
  devar['ṭ'] = 'ट';
  devar['ṭh'] = 'ठ';
  devar['ḍ'] = 'ड';
  devar['ḍh'] = 'ढ';
  devar['ṇ'] = 'ण';
  devar['t'] = 'त';
  devar['th'] = 'थ';
  devar['d'] = 'द';
  devar['dh'] = 'ध';
  devar['n'] = 'न';
  devar['p'] = 'प';
  devar['ph'] = 'फ';
  devar['b'] = 'ब';
  devar['bh'] = 'भ';
  devar['m'] = 'म';
  devar['y'] = 'य';
  devar['r'] = 'र';
  devar['l'] = 'ल';
  devar['ḷ'] = 'ळ';
  devar['v'] = 'व';
  devar['s'] = 'स';
  devar['h'] = 'ह';

  var im = '';
  var i0 = '';
  var i1 = '';
  var i2 = '';
  var i3 = '';
  var i4 = '';
  var i5 = '';
  var output = '';
  var cons = 0;
  var i = 0;

  input = input.replace(/\&quot;/g, '`');

  while (i < input.length) {
    im = input.charAt(i-2);
    i0 = input.charAt(i-1);
    i1 = input.charAt(i);
    i2 = input.charAt(i+1);
    i3 = input.charAt(i+2);
    i4 = input.charAt(i+3);
    i5 = input.charAt(i+4);

    if (i == 0 && vowel[i1]) { // first letter vowel
      output += vowel[i1];
      i += 1;
    }
    else if (i2 == 'h' && devar[i1+i2]) {    // two character match
      output += devar[i1+i2];
      if (i3 && !vowel[i3] && i2 != 'ṃ') {
        output += '्';
      }
      i += 2;
    }
    else if (devar[i1]) {  // one character match except a
      output += devar[i1];
      if (i2 && !vowel[i2] && !vowel[i1] && i1 != 'ṃ') {
        output += '्';
      }
      i++;
    }
    else if (i1 != 'a') {
      if (cons[i0] || (i0 == 'h' && cons[im])) output += '्'; // end word consonant
      output += i1;
      i++;
      if(vowel[i2]) {
        output+=vowel[i2];
        i++;
      }
    }
    else i++; // a
  }
  if (cons[i1]) output += '्';
  output = output.replace(/\`+/g, '"');
  return output;
}

// Refer: https://en.m.wikipedia.org/wiki/Telugu_(Unicode_block)
function toTelugu(input,type) {

  input = input.toLowerCase().replace(/ṁ/g,'ṃ');

  var vowel = [];
  vowel['a'] = " అ";
  vowel['i'] = " ఇ";
  vowel['u'] = " ఉ";
  vowel['ā'] = " ఆ";
  vowel['ī'] = " ఈ";
  vowel['ū'] = " ఊ";
  vowel['e'] = " ఎ";
  vowel['o'] = " ఒ";

  var telugur = [];

  telugur['ā'] = 'ా';
  telugur['i'] = 'ి';
  telugur['ī'] = 'ీ';
  telugur['u'] = 'ు';
  telugur['ū'] = 'ూ';
  telugur['e'] = 'ె';
  telugur['o'] = 'ొ';
  telugur['ṃ'] = 'ం';
  telugur['k'] = 'క';
  telugur['kh'] = 'ఖ';
  telugur['g'] = 'గ';
  telugur['gh'] = 'ఘ';
  telugur['ṅ'] = 'ఙ';
  telugur['c'] = 'చ';
  telugur['ch'] = 'ఛ';
  telugur['j'] = 'జ';
  telugur['jh'] = 'ఝ';
  telugur['ñ'] = 'ఞ';
  telugur['ṭ'] = 'ట';
  telugur['ṭh'] = 'ఠ';
  telugur['ḍ'] = 'డ';
  telugur['ḍh'] = 'ఢ';
  telugur['ṇ'] = 'ణ';
  telugur['t'] = 'త';
  telugur['th'] = 'థ';
  telugur['d'] = 'ద';
  telugur['dh'] = 'ధ';
  telugur['n'] = 'న';
  telugur['p'] = 'ప';
  telugur['ph'] = 'ఫ';
  telugur['b'] = 'బ';
  telugur['bh'] = 'భ';
  telugur['m'] = 'మ';
  telugur['y'] = 'య';
  telugur['r'] = 'ర';
  telugur['l'] = 'ల';
  telugur['ḷ'] = 'ళ';
  telugur['v'] = 'వ';
  telugur['s'] = 'స';
  telugur['h'] = 'హ';

  var im = '';
  var i0 = '';
  var i1 = '';
  var i2 = '';
  var i3 = '';
  var i4 = '';
  var i5 = '';
  var output = '';
  var cons = 0;
  var i = 0;
  var virama = '్';

  input = input.replace(/\&quot;/g, '`');

  while (i < input.length) {
    im = input.charAt(i-2);
    i0 = input.charAt(i-1);
    i1 = input.charAt(i);
    i2 = input.charAt(i+1);
    i3 = input.charAt(i+2);
    i4 = input.charAt(i+3);
    i5 = input.charAt(i+4);

    if (i == 0 && vowel[i1]) { // first letter vowel
      output += vowel[i1];
      i += 1;
    }
    else if (i2 == 'h' && telugur[i1+i2]) {    // two character match
      output += telugur[i1+i2];
      if (i3 && !vowel[i3] && i2 != 'ṃ') {
        output += virama;
      }
      i += 2;
    }
    else if (telugur[i1]) {  // one character match except a
      output += telugur[i1];
      if (i2 && !vowel[i2] && !vowel[i1] && i1 != 'ṃ') {
        output += virama;
      }
      i++;
    }
    else if (i1 != 'a') {
      if (cons[i0] || (i0 == 'h' && cons[im])) output += virama; // end word consonant
      output += i1;
      i++;
      if(vowel[i2]) {
        output+=vowel[i2];
        i++;
      }
    }
    else i++; // a
  }
  if (cons[i1]) output += virama;
  output = output.replace(/\`+/g, '"');
  return output;
}

function toThai(input) {
  input = input.toLowerCase().replace(/ṁ/g,'ṃ');

  var vowel = [];
  vowel['a'] = '1';
  vowel['ā'] = '1';
  vowel['i'] = '1';
  vowel['ī'] = '1';
  vowel['iṃ'] = '1';
  vowel['u'] = '1';
  vowel['ū'] = '1';
  vowel['e'] = '2';
  vowel['o'] = '2';


  var thair = [];
  thair['a'] = 'อ';
  thair['ā'] = 'า';
  thair['i'] = 'ิ';
  thair['ī'] = 'ี';
  thair['iṃ'] = 'ึ';
  thair['u'] = 'ุ';
  thair['ū'] = 'ู';
  thair['e'] = 'เ';
  thair['o'] = 'โ';
  thair['ṃ'] = 'ํ';
  thair['k'] = 'ก';
  thair['kh'] = 'ข';
  thair['g'] = 'ค';
  thair['gh'] = 'ฆ';
  thair['ṅ'] = 'ง';
  thair['c'] = 'จ';
  thair['ch'] = 'ฉ';
  thair['j'] = 'ช';
  thair['jh'] = 'ฌ';
  thair['ñ'] = '';
  thair['ṭ'] = 'ฏ';
  thair['ṭh'] = '';
  thair['ḍ'] = 'ฑ';
  thair['ḍh'] = 'ฒ';
  thair['ṇ'] = 'ณ';
  thair['t'] = 'ต';
  thair['th'] = 'ถ';
  thair['d'] = 'ท';
  thair['dh'] = 'ธ';
  thair['n'] = 'น';
  thair['p'] = 'ป';
  thair['ph'] = 'ผ';
  thair['b'] = 'พ';
  thair['bh'] = 'ภ';
  thair['m'] = 'ม';
  thair['y'] = 'ย';
  thair['r'] = 'ร';
  thair['l'] = 'ล';
  thair['ḷ'] = 'ฬ';
  thair['v'] = 'ว';
  thair['s'] = 'ส';
  thair['h'] = 'ห';

  var cons = [];

  cons['k'] = '1';
  cons['g'] = '1';
  cons['ṅ'] = '1';
  cons['c'] = '1';
  cons['j'] = '1';
  cons['ñ'] = '1';
  cons['ṭ'] = '1';
  cons['ḍ'] = '1';
  cons['ṇ'] = '1';
  cons['t'] = '1';
  cons['d'] = '1';
  cons['n'] = '1';
  cons['p'] = '1';
  cons['b'] = '1';
  cons['m'] = '1';
  cons['y'] = '1';
  cons['r'] = '1';
  cons['l'] = '1';
  cons['ḷ'] = '1';
  cons['v'] = '1';
  cons['s'] = '1';
  cons['h'] = '1';

  var i0 = '';
  var i1 = '';
  var i2 = '';
  var i3 = '';
  var i4 = '';
  var i5 = '';
  var output = '';
  var i = 0;
  var im = '';

  input = input.replace(/\&quot;/g, '`');

  while (i < input.length) {
    im = input.charAt(i-2);
    i0 = input.charAt(i-1);
    i1 = input.charAt(i);
    i2 = input.charAt(i+1);
    i3 = input.charAt(i+2);
    i4 = input.charAt(i+3);
    i5 = input.charAt(i+4);

    if (vowel[i1]) {
      if (i1 == 'o' || i1 == 'e') {
        output += thair[i1] + thair['a'];
        i++;
      }
      else {
        if (i == 0) {
          output += thair['a'];
        }
        if (i1 == 'i' && i2 == 'ṃ') { // special i.m character
          output += thair[i1+i2];
          i++;
        }
        else if (i1 != 'a') { output += thair[i1]; }
        i++;
      }
    }
    else if (thair[i1+i2] && i2 == 'h') {    // two character match
      if (i3 == 'o' || i3 == 'e') {
        output += thair[i3];
        i++;
      }
      output += thair[i1+i2];
      if (cons[i3]) output += 'ฺ';
      i = i + 2;
    }
    else if (thair[i1] && i1 != 'a') {    // one character match except a
      if (i2 == 'o' || i2 == 'e') {
        output += thair[i2];
        i++;
      }
      output += thair[i1];
      if (cons[i2] && i1 != 'ṃ') output += 'ฺ';
      i++;
    }
    else if (!thair[i1]) {
      output += i1;
      if (cons[i0] || (i0 == 'h' && cons[im])) output += 'ฺ';
      i++;
      if (i2 == 'o' || i2 == 'e') {  // long vowel first
        output += thair[i2];
        i++;
      }
      if (vowel[i2]) {  // word-beginning vowel marker
        output += thair['a'];
      }
    }
    else { // a
      i++;
    }
  }
  if (cons[i1]) output += 'ฺ';
  output = output.replace(/\`+/g, '"');
  return output;
}

function fromThai(input) {

  let output = "";

  output = input.replace(/([อกขคฆงจฉชฌญฏฐฑฒณตถทธนปผพภมยรลฬวสห])(?!ฺ)/g, "$1a").replace(/([เโ])([อกขคฆงจฉชฌญฏฐฑฒณตถทธนปผพภมยรลฬวสหฺฺ]+a)/g, "$2$1").replace(/[a]([าิีึุูเโ])/g, "$1").replace(/ฺ/g, "");

  output = output.replace(/อ/g,'').replace(/า/g,'ā').replace(/ิ/g,'i').replace(/ี/g,'ī').replace(/ึ/g,'iṃ').replace(/ุ/g,'u').replace(/ู/g,'ū').replace(/เ/g,'e').replace(/โ/g,'o').replace(/ํ/g,'ṃ').replace(/ก/g,'k').replace(/ข/g,'kh').replace(/ค/g,'g').replace(/ฆ/g,'gh').replace(/ง/g,'ṅ').replace(/จ/g,'c').replace(/ฉ/g,'ch').replace(/ช/g,'j').replace(/ฌ/g,'jh').replace(//g,'ñ').replace(/ญ/g,'ñ').replace(/ฏ/g,'ṭ').replace(//g,'ṭh').replace(/ฐ/g,'ṭh').replace(/ฑ/g,'ḍ').replace(/ฒ/g,'ḍh').replace(/ณ/g,'ṇ').replace(/ต/g,'t').replace(/ถ/g,'th').replace(/ท/g,'d').replace(/ธ/g,'dh').replace(/น/g,'n').replace(/ป/g,'p').replace(/ผ/g,'ph').replace(/พ/g,'b').replace(/ภ/g,'bh').replace(/ม/g,'m').replace(/ย/g,'y').replace(/ร/g,'r').replace(/ล/g,'l').replace(/ฬ/g,'ḷ').replace(/ว/g,'v').replace(/ส/g,'s').replace(/ห/g,'h').replace(/๐/g,'0').replace(/๑/g,'1').replace(/๒/g,'2').replace(/๓/g,'3').replace(/๔/g,'4').replace(/๕/g,'5').replace(/๖/g,'6').replace(/๗/g,'7').replace(/๘/g,'8').replace(/๙/g,'9').replace(/ฯ/g,'...');

  output = output.replace(//g,'');

  return output;
}

function translit(data) {
  if(!data || data == '' || typeof(data) != 'string')
    return data;
  data = data.replace(/\&nbsp;/g,' ');
  var script = DPR_G.DPR_prefs['translits'];
  var out = '';
  switch (script) {
    case 0:
      out = data;
    break;
    case 1:
      out = toThai(data);
    break;
    case 2:
      out = toDeva(data);
    break;
    case 3:
      out = toMyanmar(data);
    break;
    case 4:
      out = toSin(data);
    break;
    case 5:
      out = toBengali(data);
    break;
    case 6:
      out = toTelugu(data);
    break;
  }
  return out;
}
