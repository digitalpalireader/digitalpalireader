function toMyanmar(input,type) {
	var vowel = [];
	vowel['a'] = "အ";
	vowel['i'] = "ဣ";
	vowel['u'] = "ဥ";
	vowel['aa'] = "အာ";
	vowel['ii'] = "ဤ";
	vowel['uu'] = "ဦ";
	vowel['e'] = "ဧ";
	vowel['o'] = "ဩ";

	var myanr = [];

	myanr['aa'] = 'ā'; // later
	myanr['i'] = 'ိ';
	myanr['ii'] = 'ီ';
	myanr['u'] = 'ု';
	myanr['uu'] = 'ူ';
	myanr['e'] = 'e'; // later
	myanr['o'] = 'o'; // later
	myanr['.m'] = 'ံ';
	myanr['k'] = 'က';
	myanr['kh'] = 'ခ';
	myanr['g'] = 'ဂ';
	myanr['gh'] = 'ဃ';
	myanr['"n'] = 'င';
	myanr['c'] = 'စ';
	myanr['ch'] = 'ဆ';
	myanr['j'] = 'ဇ';
	myanr['jh'] = 'ဈ';
	myanr['~n'] = 'ဉ';
	myanr['.t'] = 'ဋ';
	myanr['.th'] = 'ဌ';
	myanr['.d'] = 'ဍ';
	myanr['.dh'] = 'ဎ';
	myanr['.n'] = 'ဏ';
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
	myanr['.l'] = 'ဠ';
	myanr['v'] = 'ဝ';
	myanr['s'] = 'သ';
	myanr['h'] = 'ဟ';
	
	var cons = [];
	
	cons['k'] = 'က';
	cons['kh'] = 'ခ';
	cons['g'] = 'ဂ';
	cons['gh'] = 'ဃ';
	cons['"n'] = 'င';
	cons['c'] = 'စ';
	cons['ch'] = 'ဆ';
	cons['j'] = 'ဇ';
	cons['jh'] = 'ဈ';
	cons['~n'] = 'ဉ';
	cons['.t'] = 'ဋ';
	cons['.th'] = 'ဌ';
	cons['.d'] = 'ဍ';
	cons['.dh'] = 'ဎ';
	cons['.n'] = 'ဏ';
	cons['t'] = 'တ';
	cons['th'] = 'ထ';
	cons['d'] = 'ဒ';
	cons['dh'] = 'ဓ';
	cons['n'] = 'န';
	cons['p'] = 'ပ';
	cons['ph'] = 'ဖ';
	cons['b'] = 'ဗ';
	cons['bh'] = 'ဘ';
	cons['m'] = 'မ';
	cons['y'] = 'ယ';
	cons['r'] = 'ရ';
	cons['l'] = 'လ';
	cons['.l'] = 'ဠ';
	cons['v'] = 'ဝ';
	cons['s'] = 'သ';
	cons['h'] = 'ဟ';

	
	var spec = []; // takes special aa
	spec[ 'ခ' ] = 1;
	spec[ 'ဂ' ] = 1;
	spec[ 'င' ] = 1;
	spec[ 'ဒ' ] = 1;
	spec[ 'ပ' ] = 1;
	spec[ 'ဝ' ] = 1; 
	
	var i0 = '';
	var i1 = '';
	var i2 = '';
	var i3 = '';
	var i4 = '';
	var i5 = '';
	var output = '';
	var i = 0;
	
	input = input.replace(/\&quot;/g, '`');

	while (i < input.length) {
		i0 = input.charAt(i-1);
		i1 = input.charAt(i);
		i2 = input.charAt(i+1);
		i3 = input.charAt(i+2);
		i4 = input.charAt(i+3);
		i5 = input.charAt(i+4);
		
		if (vowel[i1]) {
			if (vowel[i1+i2] && i2 != '') {
				if (i == 0 || i0 == 'a') output += vowel[i1+i2];
				else output += myanr[i1+i2];
				i = i + 2;	
			}
			else { 
				if (i == 0 || (i0 == 'a' && i1 != 'a')) output += vowel[i1];
				else if (i1 != 'a') output += myanr[i1];
				i++;
			}
		}		
		else if (i1 == '.' && myanr[i1+i2+i3] && i2 != '' && i3 != '') {		// three character match
			output += myanr[i1+i2+i3];
			if (!vowel[i4]) {
				output += '္';
			}
			i += 3;
		}					
		else if (myanr[i1+i2] && i2 != '') {		// two character match
			output += myanr[i1+i2];
			if (!vowel[i3] && i2 != 'm') {
				output += '္';
			}
			i += 2;
		}					
		else if (myanr[i1] && i1 != 'a') {		// one character match except a
			output += myanr[i1];
			if (!vowel[i2]) {
				output += '္';
			}
			i++;
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
		}
		else i++;
	}
	
	// deal with ā, e, o
		
	for (i=0; i < output.length; i++) {
		var c = output.charAt(i);
		var c0 = output.charAt(i-1);
		if (c=='ā') {
			var r = new RegExp(c0+c,'g');
			if (spec[c0]) { output=output.replace(r,c0+'ါ'); }
			else { output=output.replace(r,c0+'ာ'); };
		}
		else if (c=='e') {
			var cs = '';
			var im = 0;
			var cm = ''
			while (cons[cm]) {
				cs = cm+cs;
				cm = output.charAt(im);
				im--;
			}
			var r = new RegExp(cs+c,'g');
			output=output.replace(r,'ေ'+cs);
		}
		else if (c=='o') {
			var cs = '';
			var im = 0;
			var cm = c0
			while (cons[cm]) {
				cs = cm+cs;
				cm = output.charAt(im);
				im--;
			}
			var r = new RegExp(cs+c,'g');
			if (spec[c0]) { output=output.replace(r,'ေ'+cs+'ါ'); }
			else { output=output.replace(r,'ေ'+cs+'ာ'); };
		}
	}
	
	// fudges
	
	output = output.replace(/ဉ္ဉ/g, 'ည');
	
	output = output.replace(/\`+/g, '"');
	return output;
}	
	


function todeva(input,type) {
	var vowel = [];
	vowel['a'] = " अ";
	vowel['i'] = " इ";
	vowel['u'] = " उ";
	vowel['aa'] = " आ";
	vowel['ii'] = " ई";
	vowel['uu'] = " ऊ";
	vowel['e'] = " ए";
	vowel['o'] = " ओ";
	
	var devar = [];

	devar['aa'] = 'ा';
	devar['i'] = 'ि';
	devar['ii'] = 'ी';
	devar['u'] = 'ु';
	devar['uu'] = 'ू';
	devar['e'] = 'े';
	devar['o'] = 'ो';
	devar['.m'] = 'ं';
	devar['k'] = 'क';
	devar['kh'] = 'ख';
	devar['g'] = 'ग';
	devar['gh'] = 'घ';
	devar['"n'] = 'ङ';
	devar['c'] = 'च';
	devar['ch'] = 'छ';
	devar['j'] = 'ज';
	devar['jh'] = 'झ';
	devar['~n'] = 'ञ';
	devar['.t'] = 'ट';
	devar['.th'] = 'ठ';
	devar['.d'] = 'ड';
	devar['.dh'] = 'ढ';
	devar['.n'] = 'ण';
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
	devar['.l'] = 'ळ';
	devar['v'] = 'व';
	devar['s'] = 'स';
	devar['h'] = 'ह';
	
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
		i0 = input.charAt(i-1);
		i1 = input.charAt(i);
		i2 = input.charAt(i+1);
		i3 = input.charAt(i+2);
		i4 = input.charAt(i+3);
		i5 = input.charAt(i+4);
		
		if (i == 0 && vowel[i1]) { // first letter vowel
			if (i2 == i1 && (i1 == 'a' || i1 == 'i' || i1 == 'u')) {
				output += vowel[i1+i2];
				i += 2;
			}
			else {
				output += vowel[i1];
				i += 1;
			}
		}		
		else if (i1 == '.' && i2 && i3 && i2 != '' && i3 != '' && devar[i1+i2+i3]) {		// three character match
			output += devar[i1+i2+i3];
			if (i4 != '' && !vowel[i4]) {
				output += '्';
			}
			i += 3;
		}					
		else if (i2 && i2 != '' && devar[i1+i2]) {		// two character match
			output += devar[i1+i2];
			if (i3 != '' && !vowel[i1+i2] && !vowel[i3] && i2 != 'm') {
				output += '्';
			}
			i += 2;
		}					
		else if (devar[i1]) {	// one character match except a
			output += devar[i1];
			if (!vowel[i1] && i2 && i2 != '' && !vowel[i2]) {
				output += '्';
			}
			i++;
		}
		else if (i1 == 'a' && i2 == '.' && i3 == 'm') {
			output += 'ं';
			i += 3;
		}					
		else if (i1 != 'a') {
			output += i1;
			i++;
			if(vowel[i2+i3]) {
				output+=vowel[i2+i3];
				i+=2;
			}
			else if(vowel[i2]) {
				output+=vowel[i2];
				i++;
			}
		}
		else i++; // a
	}
	output = output.replace(/\`+/g, '"');
	return output;
}	

function thaiconv(input) {
	var vowel = [];
	vowel['a'] = 1;
	vowel['i'] = 1;
	vowel['u'] = 1;
	vowel['e'] = 2;
	vowel['o'] = 2;


	var thair = [];
	thair['a'] = 'อ';
	thair['aa'] = 'า';
	thair['i'] = 'ิ';
	thair['ii'] = 'ี';
	thair['i.m'] = 'ึ';
	thair['u'] = 'ุ';
	thair['uu'] = 'ู';
	thair['e'] = 'เ';
	thair['o'] = 'โ';
	thair['.m'] = 'ํ';
	thair['k'] = 'ก';
	thair['kh'] = 'ข';
	thair['g'] = 'ค';
	thair['gh'] = 'ฆ';
	thair['"n'] = 'ง';
	thair['c'] = 'จ';
	thair['ch'] = 'ฉ';
	thair['j'] = 'ช';
	thair['jh'] = 'ฌ';
	thair['~n'] = 'ญ';
	thair['.t'] = 'ฏ';
	thair['.th'] = 'ฐ';
	thair['.d'] = 'ฑ';
	thair['.dh'] = 'ฒ';
	thair['.n'] = 'ณ';
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
	thair['.l'] = 'ล';
	thair['v'] = 'ว';
	thair['s'] = 'ส';
	thair['h'] = 'ห';

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
		i0 = input.charAt(i-1);
		i1 = input.charAt(i);
		i2 = input.charAt(i+1);
		i3 = input.charAt(i+2);
		i4 = input.charAt(i+3);
		i5 = input.charAt(i+4);
		
		if (vowel[i1]) {
			cons = 0;
			if (i1 == 'o' || i1 == 'e') {
				output += thair[i1];
				if (i == 0 || i0 == 'a') output += thair['a'];
				i++;
			}
			else {
				if (i == 0 || i0 == 'a') output += thair['a'];
				if (i1 == i2) {
					output += thair[i1+i2];
					i = i + 2;	
				}
				else if (i1 == 'i' && i2 == '.' && i3 == 'm') { // special i.m character
					output += thair[i1+i2+i3];
					i = i + 3;				
				}
				else if (i1 != 'a') { // nothing for a
					output += thair[i1];
					i++;
				}
				else i++;
			}
		}		
		else if (i1 == '.' && thair[i1+i2+i3]) {		// three character match
			cons++;
			if (cons >= 2) output += 'ฺ';
			if (i4 == 'o' || i4 == 'e') {
				output += thair[i4];
				i++;
				cons = 0;
			}	
			output += thair[i1+i2+i3];
			i = i + 3;
		}					
		else if (thair[i1+i2]) {		// two character match
			cons++;
			if (i2 == 'm') cons = 0 // exception for .m
			if (cons >= 2) output += 'ฺ';
			if (i3 == 'o' || i3 == 'e') {
				output += thair[i3];
				i++;
				cons = 0;
			}	
			output += thair[i1+i2];
			i = i + 2;
		}					
		else if (thair[i1] && i1 != 'a') {		// one character match except a
			cons++;
			if (cons >= 2) output += 'ฺ';
			if (i2 == 'o' || i2 == 'e') {
				output += thair[i2];
				i++;
				cons = 0;
			}	
			output += thair[i1];
			i++;
		}					
		else if (!thair[i1]) {
			cons = 0;
			output += i1;
			i++;				
			if (i2 == 'o' || i2 == 'e') {  // long vowel first
				output += thair[i2];
				i++;
				cons = 0;
			}
			if (vowel[i2]) {  // word-beginning vowel marker
				output += thair['a']; 
			}
		}
		else i++;
	}
	output = output.replace(/\`+/g, '"');
	return output;
}	

var script = 0;

function changeScript() {
	script = document.form.translits.selectedIndex;
	setMiscPref('script',script);
	changenikaya();
}

function translit(data) {
	switch (script) {
		case 0:
			output = data;
		break;
		case 1:
			output = thaiconv(replacevelstandard(data).toLowerCase());
		break;
		case 2:
			output = todeva(replacevelstandard(data).toLowerCase());
		break;
		case 3:
			output = toMyanmar(replacevelstandard(data).toLowerCase());
		break;
	}
	return output;
}
