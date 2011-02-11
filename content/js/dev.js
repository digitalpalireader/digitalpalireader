
var xmall = [];

xmall.push('a10a');
xmall.push('a5a');
xmall.push('k12a');
xmall.push('k3a');
xmall.push('m2m');
xmall.push('s5m');
xmall.push('v6m');
xmall.push('y3m');
xmall.push('a10m');
xmall.push('a5m');
xmall.push('d1a');
xmall.push('k12m');
xmall.push('k3m');
xmall.push('m2t');
xmall.push('s5t');
xmall.push('v6t');
xmall.push('y3t');
xmall.push('a10t');
xmall.push('a5t');
xmall.push('d1m');
xmall.push('k13a');
xmall.push('k4a');
xmall.push('m3a');
xmall.push('v1a');
xmall.push('x1a');
xmall.push('y4a');
xmall.push('a11a');
xmall.push('a6a');
xmall.push('d1t');
xmall.push('k13m');
xmall.push('k4m');
xmall.push('m3m');
xmall.push('v1m');
xmall.push('x1m');
xmall.push('y4m');
xmall.push('a11m');
xmall.push('a6m');
xmall.push('d2a');
xmall.push('k14a');
xmall.push('k5a');
xmall.push('m3t');
xmall.push('v1t');
xmall.push('x2a');
xmall.push('y4t');
xmall.push('a11t');
xmall.push('a6t');
xmall.push('d2m');
xmall.push('k14m');
xmall.push('k5m');
xmall.push('s1a');
xmall.push('v2a');
xmall.push('x2m');
xmall.push('y5a');
xmall.push('a1a');
xmall.push('a7a');
xmall.push('d2t');
xmall.push('k15a');
xmall.push('k6a');
xmall.push('s1m');
xmall.push('v2m');
xmall.push('y10m');
xmall.push('y5m');
xmall.push('a1m');
xmall.push('a7m');
xmall.push('d3a');
xmall.push('k15m');
xmall.push('k6m');
xmall.push('s1t');
xmall.push('v2t');
xmall.push('y11m');
xmall.push('y5t');
xmall.push('a1t');
xmall.push('a7t');
xmall.push('d3m');
xmall.push('k16m');
xmall.push('k7a');
xmall.push('s2a');
xmall.push('v3a');
xmall.push('y12m');
xmall.push('y6a');
xmall.push('a2a');
xmall.push('a8a');
xmall.push('d3t');
xmall.push('k17m');
xmall.push('k7m');
xmall.push('s2m');
xmall.push('v3m');
xmall.push('y13m');
xmall.push('y6m');
xmall.push('a2m');
xmall.push('a8m');
xmall.push('g1m');
xmall.push('k18m');
xmall.push('k8a');
xmall.push('s2t');
xmall.push('v3t');
xmall.push('y14m');
xmall.push('y6t');
xmall.push('a2t');
xmall.push('a8t');
xmall.push('g2m');
xmall.push('k19m');
xmall.push('k8m');
xmall.push('s3a');
xmall.push('v4a');
xmall.push('y1a');
xmall.push('y7a');
xmall.push('a3a');
xmall.push('a9a');
xmall.push('g3m');
xmall.push('k1a');
xmall.push('k9a');
xmall.push('s3m');
xmall.push('v4m');
xmall.push('y1m');
xmall.push('y7m');
xmall.push('a3m');
xmall.push('a9m');
xmall.push('g4m');
xmall.push('k1m');
xmall.push('k9m');
xmall.push('s3t');
xmall.push('v4t');
xmall.push('y1t');
xmall.push('y7t');
xmall.push('a3t');
xmall.push('a9t');
xmall.push('g5m');
xmall.push('k20m');
xmall.push('m1a');
xmall.push('s4a');
xmall.push('v5a');
xmall.push('y2a');
xmall.push('y8m');
xmall.push('a4a');
xmall.push('b1m');
xmall.push('k10a');
xmall.push('k21m');
xmall.push('m1m');
xmall.push('s4m');
xmall.push('v5m');
xmall.push('y2m');
xmall.push('y9m');
xmall.push('a4m');
xmall.push('k10m');
xmall.push('k2a');
xmall.push('m1t');
xmall.push('s4t');
xmall.push('v5t');
xmall.push('y2t');
xmall.push('a4t');
xmall.push('b2m');
xmall.push('k11m');
xmall.push('k2m');
xmall.push('m2a');
xmall.push('s5a');
xmall.push('v6a');
xmall.push('y3a');


function noahs() {
	var out = [];
	var dup = [];
	for (i in xmall) {
		var fi = xmall[i];
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", 'xml/'+fi+'.xml', false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;

		var name = xmlDoc.getElementsByTagName("han")[0].childNodes[0];
		
		out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')] = fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^0^0^0^0^0^'+fi.charAt(fi.length-1)+'^0';
		
		var u = xmlDoc.getElementsByTagName("h0");
		
		var iw = fi.charAt(0);
		var ino = parseInt(fi.substring(1));		
		
		for (var sx = 0; sx < u.length; sx++) // per h0
		{							
			name = u[sx].getElementsByTagName("h0n")[0].childNodes[0];
			if(name && name.nodeValue != ' ') {
				if(out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')]) out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')] += '#'+fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^0^0^0^0^'+fi.charAt(fi.length-1)+'^1';
				else out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')] = fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^0^0^0^0^'+fi.charAt(fi.length-1)+'^1';
			}
			var v = u[sx].getElementsByTagName("h1");
				
			for (var sy = 0; sy < v.length; sy++) // per h1
			{			
				name = v[sy].getElementsByTagName("h1n")[0].childNodes[0];
				if(name && name.nodeValue != ' ') {
					if(out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')]) out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')] += '#'+fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^0^0^0^'+fi.charAt(fi.length-1)+'^2';
					else out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')] = fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^0^0^0^'+fi.charAt(fi.length-1)+'^2';
				}
				var w = v[sy].getElementsByTagName("h2");
			
				for (var sz = 0; sz < w.length; sz++) // per h2
				{
					name = w[sz].getElementsByTagName("h2n")[0].childNodes[0];
					if(name && name.nodeValue != ' ') {
						if(out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')]) out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')] += '#'+fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^'+sz+'^0^0^'+fi.charAt(fi.length-1)+'^3';
						else out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')] = fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^'+sz+'^0^0^'+fi.charAt(fi.length-1)+'^3';
					}
					var x = w[sz].getElementsByTagName("h3");
					
					for (var s = 0; s < x.length; s++) // per h3
					{
						name = x[s].getElementsByTagName("h3n")[0].childNodes[0];
						if(name && name.nodeValue != ' ') {
							if(out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')]) out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')] += '#'+fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^0^'+fi.charAt(fi.length-1)+'^4';
							else out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')] = fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^0^'+fi.charAt(fi.length-1)+'^4';
						}
						var y = x[s].getElementsByTagName("h4");
						
						for (var se = 0; se < y.length; se++) // per h4
						{
							name = y[se].getElementsByTagName("h4n")[0].childNodes[0];
							if(name && name.nodeValue != ' ') {
								if(out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')]) out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')] += '#'+fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^'+se+'^'+fi.charAt(fi.length-1)+'^5';
								else out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')] = fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^'+se+'^'+fi.charAt(fi.length-1)+'^5';
							}
						}
					}
				}
			}
		}
	}
	for (j in out) {
		dup.push(j+'#'+out[j]);
	}
	dup=sortaz(dup);

	document.textpad.pad.value="titlelist.push('"+dup.join("');\ntitlelist.push('") + "');";
}

function noahsb() {
	var out = [];
	var dup = [];

var fiat = [];

for (i in filearraya) {
	fiat.push('a'+filearraya[i]);
}
for (i in filearrayt) {
	fiat.push('t'+filearrayt[i]);
}

for (i in fiat) {
	var fi = fiat[i];
	
	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", 'xml/'+fi+'a.xml', false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;

	var u = xmlDoc.getElementsByTagName("h0");
	var type = fi.charAt(0);
	var iw = fi.charAt(1);
	var ino = parseInt(fi.substring(2));		
	
	for (var sx = 0; sx < u.length; sx++) // per h0
	{							
		var v = u[sx].getElementsByTagName("h1");
			
		for (var sy = 0; sy < v.length; sy++) // per h1
		{			
			var w = v[sy].getElementsByTagName("h2");
		
			for (var sz = 0; sz < w.length; sz++) // per h2
			{
				var x = w[sz].getElementsByTagName("h3");
				
				for (var s = 0; s < x.length; s++) // per h3
				{
					var y = x[s].getElementsByTagName("h4");
					
					for (var se = 0; se < y.length; se++) // per h4
					{
						var z = y[se].getElementsByTagName("p");		

						for (var tmp = 0; tmp < z.length; tmp++) // per paragraph
						{
							var text = z[tmp].childNodes[0].nodeValue;
							var qus = text.search(/\^b\^/);
							while (qus > -1) {
								var que = text.search(/\^eb\^/);
								var term = text.substring(qus+3,que);
								term = term.replace(/^\.+pe0*[^a-zA-Z]+ */g,'').replace(/``/g,'“').replace(/''/g,'“').replace(/'/g,'’').replace(/`/g,'‘').replace(/^[^a-zA-Z\.~]*/g,'').replace(/^[^a-zA-Z]  */g,'').replace(/   */g,' ').replace(/[^a-zA-Z]*$/g,'').toLowerCase();
								if (term != '') {
									if(dup[term]) dup[term] += '#'+iw+'^'+ino+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^'+se+'^'+tmp+'^'+type;
									else dup[term] = iw+'^'+ino+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^'+se+'^'+tmp+'^'+type;
								}
								text = text.substring(que+4);
								qus = text.search(/\^b\^/);
							}
						}
					}
				}
			}
		}
	}
}
for (j in dup) {
	out.push(j+'#'+dup[j]);
}
out=sortaz(out);

document.textpad.pad.value="attlist.push('"+out.join("');\nattlist.push('") + "');";
}

/*
            var file = 'xml/listam.xml';
            
            var xmlhttp = new window.XMLHttpRequest();
            xmlhttp.open("GET", file, false);
            xmlhttp.send(null);
            var xmlDoc = xmlhttp.responseXML.documentElement;
            var w = xmlDoc.getElementsByTagName('ab');
            
            var out = 'var amlist = [];\n';
            var countv = -1;
            var countc = 0;
            
            for (a = 0; a < w.length; a++) {
				out+='amlist['+a+'] = [];\n';
				var x = w[a].getElementsByTagName('av');
				for(b = 0; b < x.length; b++) {
					out+='amlist['+a+']['+b+'] = [];\n';
					countc = 0;
					var y = x[b].getElementsByTagName('as');
					for(c = 0; c < y.length; c++) {
						out+='amlist['+a+']['+b+']['+c+'] = [];\n';
						var z = y[c].getElementsByTagName('ac');
						for(d = 0; d < z.length; d++) {
							out+='amlist['+a+']['+b+']['+c+']['+d+'] = [];\n';
							var zz = z[d].getElementsByTagName('ap');
							for(e = 0; e < zz.length; e++) {
								out+='amlist['+a+']['+b+']['+c+']['+d+']['+e+'] = '+zz[e].childNodes[0].nodeValue+';\n';
							}
						}
					}
				}
			}
document.textpad.pad.value = out;						
*/
function makeSin() {
	var vowel = ['a','ā','i','ī','u','ū','e','o'];
	var cons = ['ā','i','ī','u','ū','e','o','ṃ','k','kh','g','gh','ṅ','c','ch','j','jh','ñ','ṭ','ṭh','ḍ','ḍh','ṇ','t','th','d','dh','n','p','ph','b','bh','m','y','r','l','ḷ','v','s','h'];

	var sinV = ['අ','ආ','ඉ','ඊ','උ','ඌ','එ','ඔ']

	var sinC = ['ා','ි','ී','ු','ූ','ෙ','ො','ං','ක','ඛ','ග','ඝ','ඞ','ච','ඡ','ජ','ඣ','ඤ','ට','ඨ','ඩ','ඪ','ණ','ත','ථ','ද','ධ','න','ප','ඵ','බ','භ','ම','ය','ර','ල','ළ','ව','ස','හ']


	var padOut = '';

	for(i in sinV) {
	padOut += "vowel['"+vowel[i] + "'] = '" + sinV[i] + "';\n";
	}
	document.textpad.pad.value = padOut;
}

function getWordList(){
	
	var dataout = [];
	
	for (i = 0; i < 4; i++) {
		
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", 'etc/XML1/'+i+'/ped.xml', false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		var allp = xmlDoc.getElementsByTagName('data');
		
		for (j =0; j < allp.length; j++) {
			var alld = allp[j].textContent.replace(/<[^>]*>/g, '').replace(/   */g, ' ').split(' ');
			
			var thisterms = [];
			
			for (k = 0; k < alld.length; k++) {
				var thisd = 'XYZ'+alld[k].replace(/[0-9\/\+\%";.\-\&\*!,)(:<=>?\[\]_˚ɔ≈\\]+/g, '').replace(/'$/g, '').replace(/^[~']/g, '').toLowerCase();
				if (thisd.length < 7) continue;
				if(thisterms[thisd]) continue;
				thisterms[thisd] = 1;
				if(dataout[thisd]) {
					dataout[thisd] += '#' + i + '^' + j;
				}
				else dataout[thisd] = i + '^' + j;
			}
		}
	}
	var outputD = [];
	for (l in dataout) {
		outputD.push(l.substring(3) + '#' + dataout[l]); 
	}
	outputD = outputD.sort();
	writeFile('devTest',"var pedFull = [];\npedFull.push('"+outputD.join("');\npedFull.push('") + "');", 'UTF-8');

}
