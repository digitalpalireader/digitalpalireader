//window.alert('dev mode');
var devCheck = 0;

function devMode(string) {

 devCheck = 1;
	if(string) {
		if(/^htm/.test(string)) {
			eval('document.getElementById("dpr-dev").contentWindow'+string.substring(3));
		}
		else eval(string);
		return;
	}
//document.textpad.pad.value = '';
//DconvertMATtoReal();
//DdppnSort();
//DcheckWords();
//DgroupBySimilarity();
//DtestSort();
}

function devO(data,sw,clear) {
//	if(clear) document.textpad.pad.value = '';
	//if(typeof(data) == "object") data = data.join('\n');
	//document.textpad.pad.value += data + '\n';
	//if(!sw) moveFrame(3);
	
}
function dalert(a) {
	if(a == null) a = 'Dev Alert';
	else if(typeof(data) == "object") data = data.join(' | ');
	window.alert(a);
}
function ddump(a) {
	if(a == null) a = 'Dev Dump';
	else if(typeof(a) == 'object') a = a.join(' ');
	window.dump(a + '\n');
}

function DevInput(string) {
	Ddppnsearchstart(string);
}


function DdppnFixzz() {
	var foa = [];
	var fout = '';
	for (i in Dna) {
		if (nameda[i]) {
			foa.push(i+'#[\''+nameda[i].concat(Dna[i]).join("','")+"'];\n");
		}
		else {
			for (z in nameda) {
				if(!/\./.exec(z)) continue;
				if(z.replace(/\./g,'') == i.replace(/\./g,'')) {
					foa.push(z+'#[\''+nameda[z].concat(Dna[i]).join("','")+"'];\n");
					yes = 1;
					break;
				}
			}
			if (yes == 0) foa.push(i+'#[\''+Dna[i].join("','")+"']; // unfound \n");
		}
	}
	foa = sortaz(foa);
	for (q in foa) {
		var y = foa[q].split('#');
		fout += "nameda['"+y[0]+"'] = " + y[1];
	}
	devO(fout);	
}

function DdppnFixa() {
	var fout = '';
	var listouta = [];
	
	for (d in nameda) {
		var foa = [];
		if(nameda[d].length == 1) {
			fout+="nameda['"+d+"'] = ['" + nameda[d] +"'];\n"
			continue;
		}
		var sa = [];
		for (e = 0; e < nameda[d].length; e++) {
			var s = 0;
			var sb = nameda[d][e].split('/');
			for (f = 0; f < nameda[d].length; f++) {
				if (e == f) continue;
				var sc = nameda[d][f].split('/');
				if(parseInt(sc[0]) < parseInt(sb[0]) || (parseInt(sc[0]) == parseInt(sb[0]) && parseInt(sc[1]) < parseInt(sb[1]))) s++; 
			}
			foa['a'+s] = nameda[d][e];
		}
		var t = 0;
		fout+="nameda['"+d+"'] = [";
		for (i in foa) {
			fout += "'" + foa['a'+(t++)] + "',"
		}
		fout = fout.replace(/,$/, '');
		fout += "];\n"
	} 
	devO(fout);
}

function DdppnFixConcat() { // concat unlisted (namedad) with nameda
	var fo = [];
	for (i in namedad) {
		if (nameda[i]) fo.push("nameda['"+i+"'] = ['"+nameda[i].join("','")+"','"+namedad[i][0]+"']; // joined");
		else fo.push("nameda['"+i+"'] = ['"+namedad[i][0]+"']; // new");
	}
	devO(fo);
}

function DdppnFixy() { // find unlisted entries
	var foa = [];
	var dup = [];
	
	var listouta = [];
	
	for (d in nameda) {
		for(e in nameda[d]) {
			dup[nameda[d][e]] = d;
		}
	} 
	
	for (i = 1; i < 10; i++) {
		
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", 'etc/XML2/'+i+'.xml', false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		
		var allp = xmlDoc.getElementsByTagName('entry');
		
		for (j =0; j < allp.length; j++) {
			if (dup[i+'/'+j]) continue;
			var texttomatch = allp[j].textContent;
			if(texttomatch.indexOf('Pali Proper Names') >=0) continue;
			if(texttomatch.indexOf('"huge"]') > -1) var ttitle = toVel(texttomatch.substring(texttomatch.indexOf('"huge"]')+7,texttomatch.indexOf('[/div]')));
			else if(texttomatch.indexOf('[b]') > -1) {
				var ttitle = toVel(texttomatch.substring(texttomatch.indexOf('[b]')+3,texttomatch.indexOf('[/b]')));
			}
			else var ttitle = texttomatch;
			
			ttitle = ttitle.replace(/[-\]\[ .,0-9]/g,'').toLowerCase();
			
			foa.push(ttitle+'#'+i+'/'+j);
			
		}
	}
	var fout = '';
		
	foa = sortaz(foa);

	for (q in foa) {
		var y = foa[q].split('#');
		fout += "nameda['"+y[0]+"'] = ['" + y[1] +"'];\n";
	}
	devO(fout);
}


function DdppnFixx() {
	var fout = '';
	for (i in nameno) {
		var x = nameno[i];
		if(x == '') {
			fout += "nameno['"+i+"'] = [''];\n";
			continue;
		}
		if(nameda[x]) fout += "nameno['"+i+"'] = ['" + nameda[x].join("','") + "'];\n";
		else {
			var yes = 0;
			for (z in nameda) {
				if(!/\./.exec(z)) continue;
				if(toFuzzy(z) == toFuzzy(x)) {
					fout += "nameno['"+i+"'] = ['" + nameda[z].join("','") + "'];\n";
					yes = 1;
					break;
				}
			}
			if (yes == 0) fout += "nameno['"+i+"'] = [''];\n";
		}
	}
	devO(fout);
}

function DdppnFix() {
	var finalouta = [];
	var matchout = [];
	
	var listouta = [];
	for (i = 1; i < 10; i++) {
		
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", 'etc/XML2/'+i+'.xml', false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		
		var allp = xmlDoc.getElementsByTagName('entry');
		
		for (j =0; j < allp.length; j++) {
			var texttomatch = allp[j].textContent;
			if(texttomatch.indexOf('Pali Proper Names') >=0) continue;
			if(texttomatch.indexOf('"huge"]') > -1) var ttitle = toVel(texttomatch.substring(texttomatch.indexOf('"huge"]')+7,texttomatch.indexOf('[/div]')));
			else if(texttomatch.indexOf('[b]') > -1) {
				var ttitle = toVel(texttomatch.substring(texttomatch.indexOf('[b]')+3,texttomatch.indexOf('[/b]')));
			}
			else continue;
			
			ttitle = ttitle.replace(/[- .,]/g,'').toLowerCase();

			if(finalouta[ttitle] && finalouta[ttitle][1] != texttomatch) {
				if(!listouta[ttitle]) {
					listouta[ttitle] = [finalouta[ttitle][0],i+'/'+j];
					matchout.push(ttitle);
				}
				else listouta[ttitle].push(i+'/'+j);
			}
			else finalouta[ttitle] = [i+'/'+j,texttomatch];
			
		}
	}
	var fout = '';
	
	matchout = sortaz(matchout);
	
	for (q in matchout) {
		var y = matchout[q];
		fout += "nameda['"+y+"'] = ['" + listouta[y].join("','") + "']; " + (nameda[y] ? '// '+nameda[y] : '') + "\n";
	}
	devO(fout);
}

function DpedFix() {
	var out = [];
	var fout = [];
	for (i in mainda) {
		var x = i.replace(/z[0-9]$/,'');
		
		if(x != i) {
			if(!out[x]) out[x] = [mainda[i]];
			else out[x].push(mainda[i]);
		}
		else out[i] = [mainda[i]];
	}
	
	for (y in out) {
		fout += "mainda['"+y+"'] = ['" + out[y].join("','") + "'];\n";
	}
	devO(fout);
}

function Ddppn5() {
	var finout = '';

    for (x in DnameDa)
	{
		var y = DnameDa[x][0].replace(/, /g, ',').split(',');
		for (z in y) {
			finout +="nameda['"+toVel(y[z].replace(/[-(). ]/g,''))+"'] = '"+DnameDa[x][1]+"';\n"; 
		}
	}
	devO(finout);
	return;
}

function Ddppn4() {  // compare nameno with nameda
	var matched = [];
	var unmatched = [];
	var w,x, y;
	out:
	for (i in dppng) {
		 x = dppng[i][0].replace(/_th$/,'thera').replace(/_v_s$/,'vagga').replace(/_s_v$/,'sutta').replace(/_s$/,'sutta').replace(/_jat_.+/,'jaataka').replace(/_j_.+/,'jaataka').replace(/_/g,'');
		 w = toVel(dppng[i][1].toLowerCase()).replace(/[ -]/g, '');
		if (nameda[x]) {
			matched[dppng[i][0]+'^'+dppng[i][1]] = x;
			continue out;
		}
		if (nameda[w]) {
			matched[dppng[i][0]+'^'+dppng[i][1]] = w;
			continue out;
		}
		y = dppng[i][1].toLowerCase();
		for (j in nameda) {
			if (j.indexOf(x) == 0 || toFuzzy(j).indexOf(toFuzzy(x)) == 0  || toFuzzy(j).indexOf(toFuzzy(w)) == 0 || nameda[j][0].indexOf(y) == 0) {
				matched[dppng[i][0]+'^'+dppng[i][1]] = j;
				continue out;
			}
		}
		unmatched[dppng[i][0]+'^'+dppng[i][1]] = '';
		//if(unmatched.length > 10) break;
	}
	
	var outs = 'var nameno = [];\n// matched\n';
	
	for (i in matched) {
		outs += "nameno['"+i+"'] = '"+matched[i]+"';\n";
	}
	
	outs += '\n\n\n// unmatched\n\n';
	
	for (i in unmatched) {
		outs += "nameno['"+i+"'] = '';\n";
	}
	devO(outs);
}			

function Ddppn3() {
	var sorta = [];
	for (i in Ddppn) {
		var j = Ddppn[i].split('#');
		var k = j[0].split('^');
		for (x in k) {
			var m = k[x].toLowerCase().replace(/^  */,'').replace(/  *$/,'');
			if (k[x].length > 0) {
				var l = toVel(k[x].toLowerCase().replace(/\(no\..+\)/g,'').replace(/[^ñāīūa-z]/g,''));
				sorta.push(l+'^'+m+'#'+j[1]);
			}
		}
	}
//	alert(sorta.length);
	var sorta2 = sortaz(sorta);
	var out = 'var nameda = [];\n';
	for (i in sorta2) {
		var z = sorta2[i].split('^');
		var j = z[1].split('#');
		out +="nameda['"+z[0]+"'] = ['"+j[0]+"','"+j[1]+"'];\n";
	}
	devO(out);
}	
	

function DcheckWords() {
	devCheck = 2;
	var niks = ['v','d','m','s','a','k'];
	var her = 'm';
	var out = [];
	var out3 = [];
	var outmatch = [];
	var hardword = [];
	var componly = 0;
	var componlyu = 0;
	var notrecog = 0;
	var notrecogu = 0;
	var wordsu = 0;
	var wordst = 0;
	var hw = 0;
	var text;
	for (j=0; j < niks.length; j++) {
		var nik = niks[j];
		for (k=0; k < nikvoladi[nik].length; k++) {		
			var xmlhttp = new window.XMLHttpRequest();
			xmlhttp.open("GET", 'xml/'+nik+(k+1)+her+'.xml', false);
			xmlhttp.send(null);
			var xmlDoc = xmlhttp.responseXML.documentElement;

			window.dump("____________ starting "+nik + ' ' + (parseInt(k)+1)+" ___________________\n");
			var u = xmlDoc.getElementsByTagName("h0");
			
			out:
			for (var a = 0; a < u.length; a++) // per h0
			{							
				var v = u[a].getElementsByTagName("h1");
					
				for (var b = 0; b < v.length; b++) // per h1
				{			
					var w = v[b].getElementsByTagName("h2");
				
					for (var c = 0; c < w.length; c++) // per h2
					{
						var x = w[c].getElementsByTagName("h3");
						
						for (var d = 0; d < x.length; d++) // per h3
						{
							var y = x[d].getElementsByTagName("h4");
							
							for (var e = 0; e < y.length; e++) // per h4
							{
								var z = y[e].getElementsByTagName("p");
								for (var f = 0; f < z.length; f++) // per p
								{
									window.dump( nik + ' ' +(parseInt(k)+1)+' - '+(u.length != 1 ? (a+1)+' of '+u.length+', ' : '')+(v.length != 1 ? (b+1)+' of '+v.length+', ' : '')+(w.length != 1 ? (c+1)+' of '+w.length+', ' : '')+(x.length != 1 ? (d+1)+' of '+x.length+', ' : '')+(y.length != 1 ? (e+1)+' of '+y.length+', ' : '') + ' paragraph ' + (f+1) + ' of '+(z.length)+'\n\nunmatched words: '+notrecogu+' - ' + Math.round(notrecogu/wordst*10000)/100 +'% ('+notrecog+' instances - ' + Math.round(notrecog/wordst*10000)/100 +'%)\ncompounds only: '+componlyu+' - ' + Math.round(componlyu/wordsu*10000)/100 +'% ('+componly+' instances - '+ Math.round(componly/wordst*10000)/100 +'%)\nTotal words: '+wordsu+' ('+wordst+' instances)\nHard Words: '+hw+'\n\n');
									
									text = toVel(z[f].textContent).toLowerCase().replace(/\.\.\.pe0\.\.\./g, ' ... pe ...').replace(/\^b\^/g, '').replace(/\^eb\^/g, '').replace(/[”"]ti/g, '” ”ti').replace(/['’]+ti/g, '’ ’ti').replace(/[”"]nti/g, 'n” ”ti').replace(/['’]+nti/g, 'n’ ’ti').replace(/"n/g, 'xn').replace(/[ .]+pe[ .]+/g, ' ').replace(/\^[be]b*\^/g, ' ').replace(/\^a\^[^^]*\^ea\^/g, ' ').replace(/\{[^}]*\}/g, ' ').replace(/[0-9\[\]()]/g, ' ').replace(/\.+([^nmltd])/g, "$1").replace(/ "/g, " ").replace(/n[’”]/g, ".m").replace(/([aiu])[aiu][’”]/g, "$1").replace(/[‘“’”`',{}?;!"-]/g, '').replace(/xn/g, '"n').replace(/\.+pe/g, "").replace(/\.(?![tdnml])/g, " ").replace(/   */g, ' ').split(' ');
									
									var zzc = 1;
									
									word:
									for (zz in text) {
										G_stopAnalyzing = 0
										
										window.dump(zz > zzc*10 ? (zzc++)*10 : '.'); 
										G_outwords = [];
										G_shortdefpost = [];
										var input = text[zz];

										if (input.length < 2) continue;
										wordst++;

										if(out[input]) {
											out[input]++;
											notrecog++;
											continue;
										}

										if(outmatch[input]) {
											continue;
										}
										wordsu++;

										if(out3[input]) {
											componly++;
											out3[input][0]++;
											continue;
										}

										var starttime = new Date;
										starttime = starttime.getTime();
										
										var matchit = '';


										if(typeof(G_manualCompoundInd[input]) == 'object' || typeof(G_manualCompoundDec[input]) == 'object') manualCompound(input); // let it tell us what is the match
										else var matchit = analyzeword(input);  // will populate G_outwords, which is nested array - 1) full alternative compounds/words seperated by array entry "space", 2) parts of the alt. compounds seperated by "@", 3) alt. defs of the parts, seperated by "#", 4) info for each alt. def. seperated by "^" 
										
										var endtime = new Date;
										var totaltime = Math.round((endtime.getTime() - starttime)*10/6)/1000;
										if(totaltime > 5 || G_outwords.length > 50) {
											hw++;
											hardword[input] = totaltime;
										}
										
										if(matchit) {
											//ddump('found: '+input);
											outmatch[input] =  1;
										}
										else if (G_outwords.length == 0) {
											//ddump('\nnot found: '+input);
											out[input] = 1;
											notrecog++;
											notrecogu++;
										}
										else if(!out3[input]) {
											var otmp = [];
											for(tmp in G_outwords) {
												var cpds = G_outwords[tmp][0];
												otmp.push(cpds);
											}
											componly++;
											componlyu++;
											out3[input] = [1,otmp];
										}
									}
									window.dump('\n\n___________________\n\n');
								}
								//break out;
							}
						}
					}
				}
			}
			var out2 = [];
			var out4 = [];
			var hwo = [];
			window.dump("____________ finished, outputting... ___________________\n");
			for (i in out) {
				var oi = out[i]+'';
				while(oi.length < 5) oi = '0'+oi;
				out2.push(oi + ' ' + i);
			}
			out2.sort();
			out2.reverse();

			for (i in out3) {
				var oi = out3[i];
				out4.push(oi[0] + ' ' + i + '\n\t' + oi[1].join('\n\t'));
			}
			out4.sort();
			out4.reverse();
			
			for(i in hardword) {
				hwo.push(i + ' ' + hardword[i]);
				hwo.sort();
				hwo.reverse();
			}
			if(writeExtFile('/home/noah/Extensions/work/unmatched',nik+' '+(parseInt(k)+1)+'\n\nwords analyzed (unique): '+wordsu+'\t\t(total): '+wordst+'\nnot recognized (unique): '+notrecogu+'\t\t(total): '+notrecog+'\n\n// Unmatched\n\n'+out2.join('\n')+'\n') && writeExtFile('/home/noah/Extensions/work/compoundonly','compound-only (unique): '+componlyu+'\t\t(total): '+componly+'\n\n// Compound Only:\n\n'+out4.join('\n')+'\n\nHard words:\n\n'+hwo.join('\n'))) {
					window.dump("____________ output to ~/Extensions/work: unmatched and compoundonly ___________________\n");
			}
		}
	}
	devCheck = 1;
}


function makeInflect() {

var n = ['','1st','2nd','3rd'];

	var x = DinfN[0];

	var out = "DinfN['"+x[0]+"'] = [];\n";
	out+= "DinfN['"+x[0]+"']['"+x[2]+"'] = [];\n";
	out+= "DinfN['"+x[0]+"']['"+x[2]+"']['"+x[4]+"'] = [];\n";
	out+= "DinfN['"+x[0]+"']['"+x[2]+"']['"+x[4]+"']['"+x[5]+"'] = [];\n";
	out+= "DinfN['"+x[0]+"']['"+x[2]+"']['"+x[4]+"']['"+x[5]+"']['"+(x[6] == 's' ? 0 : 1)+"'] = ['"+x[9]+"'";
	for (i = 1; i < DinfN.length; i++) {
		if(x[0] != DinfN[i][0]) out+= "];\nDinfN['"+DinfN[i][0]+"'] = [];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"'] = [];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"'] = [];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"'] = [];;\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"']['"+(DinfN[i][6] == 's' ? 0 : 1)+"'] = ['"+DinfN[i][9]+"'";
		else if(x[2] != DinfN[i][2]) out+= "];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"'] = [];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"'] = [];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"'] = [];;\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"']['"+(DinfN[i][6] == 's' ? 0 : 1)+"'] = ['"+DinfN[i][9]+"'";
		else if(x[4] != DinfN[i][4]) out+= "];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"'] = [];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"'] = [];;\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"']['"+(DinfN[i][6] == 's' ? 0 : 1)+"'] = ['"+DinfN[i][9]+"'";
		else if(x[5] != DinfN[i][5]) out+= "];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"'] = [];;\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"']['"+(DinfN[i][6] == 's' ? 0 : 1)+"'] = ['"+DinfN[i][9]+"'";
		else if(x[6] != DinfN[i][6]) out+= "];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"']['"+(DinfN[i][6] == 's' ? 0 : 1)+"'] = ['"+DinfN[i][9]+"'";
 		else {
			out+= ",'"+DinfN[i][9]+"'";
		}
		x = DinfN[i];
	}
	document.textpad.pad.value = out;
}	

var Drelmul = [];
var Drelatt = [];
var Dreltik = [];

function DconvertMATtoReal() {
	

	document.getElementById('mafbc').innerHTML = '<table><tr><td><textarea id="rel1"></textarea></td><td><textarea id="rel2"></textarea></td><td><textarea id="rel3"></textarea></td></tr></table>';
	var fin = '';
	var relm = [];
	var rela = [];
	var relt = [];
	for (i in Drelmul) {
		if(relm[Drelmul[i]] || Drelmul[i] == '') continue;
		relm[Drelmul[i]] = 1;
		fin += "relm['"+Drelmul[i]+"'] = '"+Drelatt[i]+'#'+Dreltik[i]+"';\n";
	}
	
	document.getElementById('rel1').value = fin;

	fin = '';
	for (i in Drelatt) {
		if(rela[Drelatt[i]] || Drelatt[i] == '') continue;
		rela[Drelatt[i]] = 1;
		fin += "rela['"+Drelatt[i]+"'] = '"+Drelmul[i]+'#'+Dreltik[i]+"';\n";
	}
	document.getElementById('rel2').value = fin;

	fin = '';
	for (i in Dreltik) {
		if(relt[Dreltik[i]] || Dreltik[i] == '') continue;
		relt[Dreltik[i]] = 1;
		fin += "relt['"+Dreltik[i]+"'] = '"+Drelmul[i]+'#'+Drelatt[i]+"';\n";
	}
	document.getElementById('rel3').value = fin;
}
function DcompareMAT() {
	var hi = ['m','a','t']; //,'t'
	var nik = 'y';
	var books = 14;
	var finalout = '<table><tr>';
	var out = [];
	
	for (h = 0; h < hi.length; h++) {
		out[hi[h]] = [];
		for (j=8; j < books; j++) {
			var i = j;
			if (h > 0) {
				if(j == 6 || j == 7 || j > 8) continue;
				i = abhivala[j+1];
			}
			document.textpad.pad.value = 'xml/'+nik+(j+1)+hi[h]+'.xml';
			
			var xmlhttp = new window.XMLHttpRequest();
			xmlhttp.open("GET", 'xml/'+nik+(j+1)+hi[h]+'.xml', false);
			xmlhttp.send(null);
			var xmlDoc = xmlhttp.responseXML.documentElement;

			var u = xmlDoc.getElementsByTagName("h0");
			
			for (var sx = 0; sx < u.length; sx++) // per h0
			{							
				name = u[sx].getElementsByTagName("h0n")[0].textContent.replace(/ /g, '');
				if (u.length > 1 && name == '') { name = 'unnamed'; }
				if(name && name.length > 1) {
					out[hi[h]].push(' '+name+'^'+nik+'^'+i+'^'+sx+'^0^0^0^0^1');
				}
				var v = u[sx].getElementsByTagName("h1");
					
				for (var sy = 0; sy < v.length; sy++) // per h1
				{			
					name = v[sy].getElementsByTagName("h1n")[0].textContent.replace(/ /g, '');
					if (v.length > 1 && name == '') { name = 'unnamed'; }
					if(name && name.length > 1) {
						out[hi[h]].push('  '+name+'^'+nik+'^'+i+'^'+sx+'^'+sy+'^0^0^0^2');
					}
					var w = v[sy].getElementsByTagName("h2");
				
					for (var sz = 0; sz < w.length; sz++) // per h2
					{
						name = w[sz].getElementsByTagName("h2n")[0].textContent.replace(/ /g, '');
						if (w.length > 1 && name == '') { name = 'unnamed'; }
						if(name && name.length > 1) {
							out[hi[h]].push('   '+name+'^'+nik+'^'+i+'^'+sx+'^'+sy+'^'+sz+'^0^0^3');
						}
						var x = w[sz].getElementsByTagName("h3");
						
						for (var s = 0; s < x.length; s++) // per h3
						{
							name = x[s].getElementsByTagName("h3n")[0].textContent.replace(/ /g, '');
							if (x.length > 1 && name == '') { name = 'unnamed'; }
							if(name && name.length > 1) {
								out[hi[h]].push('    '+name+'^'+nik+'^'+i+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^0^4');
							}
							var y = x[s].getElementsByTagName("h4");
							
							for (var se = 0; se < y.length; se++) // per h4
							{
								if(!y[se].getElementsByTagName("h4n")[0]) alert(h+' '+name+'^'+nik+'^'+i+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^'+se);
								name = y[se].getElementsByTagName("h4n")[0].textContent.replace(/ /g, '');
								if (y.length > 1 && name == '') { name = 'unnamed'; }
								if(name && name.length > 1) {
									out[hi[h]].push('     '+name+'^'+nik+'^'+i+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^'+se+'^5');
								}
							}
						}
					}
				}
			}
		}
		finalout += '<td><textarea  id="'+hi[h]+'"></textarea></td>';
	}
	finalout += '</tr>';
	finalout += '</table>';
	document.getElementById('mafbc').innerHTML = finalout;
	for (h = 0; h < hi.length; h++) {
			document.getElementById(hi[h]).value=out[hi[h]].join('\n');
	}
}
		
function DtitleSearchCreate() {

	
	var out = [];
	var dup = [];
	for (i in G_XMLFileArray) {
		for (ii = 0; ii < 3; ii++) {
			if(!G_XMLFileArray[i][ii]) continue;
			var fi = i;
			var xmlhttp = new window.XMLHttpRequest();
			xmlhttp.open("GET", 'xml/'+fi+G_hLetters[ii]+'.xml', false);
			xmlhttp.send(null);
			var xmlDoc = xmlhttp.responseXML.documentElement;

			var name = xmlDoc.getElementsByTagName("han")[0].textContent.replace(/^[()0-9-. ]*[)0-9-. ]+/,'').replace(/[()0-9-]/g,'').replace(/ +$/,'').toLowerCase();
			
			out[name] = fi.charAt(0)+'^'+fi.substring(1)+'^0^0^0^0^0^'+G_hLetters[ii]+'^0';
			
			var u = xmlDoc.getElementsByTagName("h0");
			
			var iw = fi.charAt(0);
			var ino = parseInt(fi.substring(1));		
			
			for (var sx = 0; sx < u.length; sx++) // per h0
			{							
				name = u[sx].getElementsByTagName("h0n")[0].textContent.replace(/^[()0-9-. ]*[)0-9-. ]+/,'').replace(/[()0-9-]/g,'').replace(/ +$/,'').toLowerCase();
				if(name && name != ' ') {
					if(out[name]) out[name] += '#'+fi.charAt(0)+'^'+fi.substring(1)+'^'+sx+'^0^0^0^0^'+G_hLetters[ii]+'^1';
					else out[name] = fi.charAt(0)+'^'+fi.substring(1)+'^'+sx+'^0^0^0^0^'+G_hLetters[ii]+'^1';
				}
				var v = u[sx].getElementsByTagName("h1");
					
				for (var sy = 0; sy < v.length; sy++) // per h1
				{			
					name = v[sy].getElementsByTagName("h1n")[0].textContent.replace(/^[()0-9-. ]*[)0-9-. ]+/,'').replace(/[()0-9-]/g,'').replace(/ +$/,'').toLowerCase();
					if(name && name != ' ') {
						if(out[name]) out[name] += '#'+fi.charAt(0)+'^'+fi.substring(1)+'^'+sx+'^'+sy+'^0^0^0^'+G_hLetters[ii]+'^2';
						else out[name] = fi.charAt(0)+'^'+fi.substring(1)+'^'+sx+'^'+sy+'^0^0^0^'+G_hLetters[ii]+'^2';
					}
					var w = v[sy].getElementsByTagName("h2");
				
					for (var sz = 0; sz < w.length; sz++) // per h2
					{
						name = w[sz].getElementsByTagName("h2n")[0].textContent.replace(/^[()0-9-. ]*[)0-9-. ]+/,'').replace(/[()0-9-]/g,'').replace(/ +$/,'').toLowerCase();
						if(name && name != ' ') {
							if(out[name]) out[name] += '#'+fi.charAt(0)+'^'+fi.substring(1)+'^'+sx+'^'+sy+'^'+sz+'^0^0^'+G_hLetters[ii]+'^3';
							else out[name] = fi.charAt(0)+'^'+fi.substring(1)+'^'+sx+'^'+sy+'^'+sz+'^0^0^'+G_hLetters[ii]+'^3';
						}
						var x = w[sz].getElementsByTagName("h3");
						
						for (var s = 0; s < x.length; s++) // per h3
						{
							name = x[s].getElementsByTagName("h3n")[0].textContent.replace(/^[()0-9-. ]*[)0-9-. ]+/,'').replace(/[()0-9-]/g,'').replace(/ +$/,'').toLowerCase();
							if(name && name != ' ') {
								if(out[name]) out[name] += '#'+fi.charAt(0)+'^'+fi.substring(1)+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^0^'+G_hLetters[ii]+'^4';
								else out[name] = fi.charAt(0)+'^'+fi.substring(1)+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^0^'+G_hLetters[ii]+'^4';
							}
							var y = x[s].getElementsByTagName("h4");
							
							for (var se = 0; se < y.length; se++) // per h4
							{
								name = y[se].getElementsByTagName("h4n")[0].textContent.replace(/^[()0-9-. ]*[)0-9-. ]+/,'').replace(/[()0-9-]/g,'').replace(/ +$/,'').toLowerCase();
								if(name && name != ' ') {
									if(out[name]) out[name] += '#'+fi.charAt(0)+'^'+fi.substring(1)+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^'+se+'^'+G_hLetters[ii]+'^5';
									else out[name] = fi.charAt(0)+'^'+fi.substring(1)+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^'+se+'^'+G_hLetters[ii]+'^5';
								}
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

	devO("var titlelist = ['"+dup.join("',\n'") + "'];");
}

function replaceInXML(file) {

	
	var out = [];
	var dup = [];

	var fiat = file.split(',');

	for (i in fiat) {
		var fi = fiat[i];
		
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", 'xml/'+fi+'.xml', false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;

		var thaiPage = '';

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
								var text = z[tmp].textContent;
								if(/^-- /.exec(text)) {
									thaiPage = text.match(/[0-9]+(?=\^)/)[0].replace(/^0+/,'');
								}
								while (/[0-9]+-/.exec(text)) {
									var fnn = /[0-9]+-/.exec(text);
									if(!fnotes[thaiPage +','+(tmp) +','+ fnn]) {
										dalert([thaiPage,(tmp),fnn]);
										return;
									}
									text = text.replace(fnn,'{'+fnotes[thaiPage +','+(tmp) +','+ fnn]+'}');
								}
								z[tmp].textContent = text;
							}
						}
					}
				}
			}
		}
	}
	DsaveXML('/home/noah/Desktop/v3m.t.xml',xmlDoc); 
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

function PEDcat() {
	
	var dataout = '';
	var ma = [];
	for (a in mainda) {
		for (b in mainda[a]) {
			var entry = mainda[a][b].split('/');
			var i = parseInt(entry[0],10);
			var j = parseInt(entry[1],10);
			if(!ma[i]) ma[i] = [];
			ma[i][j]=a+(mainda[a].length > 1?'^'+(parseInt(b)+1):'');
		}
	}
	
	for (a in ma) {

		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", 'etc/XML1/'+a+'/ped.xml', false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		var allp = xmlDoc.getElementsByTagName('data');

		for (b in ma[a]) {
			
			var alld = allp[b].textContent; //.replace(/<[^>]*>/g, '').replace(/   */g, ' ');
			
			dataout += '\n'+ma[a][b]+'###'+alld;
		}
	}
	writeFile('ped',dataout, 'UTF-8');
}

function DPPNcat() {
	
	var dataout = '';
	var ma = [];
	for (a in nameda) {
		for (b in nameda[a]) {
			var entry = nameda[a][b].split('/');
			var i = parseInt(entry[0],10);
			var j = parseInt(entry[1],10);
			if(!ma[i]) ma[i] = [];
			ma[i][j]=a+(nameda[a].length > 1?'^'+(parseInt(b)+1):'');
		}
	}
	
	for (a in ma) {

		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", 'etc/XML2/'+a+'.xml', false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		var allp = xmlDoc.getElementsByTagName('entry');

		for (b in ma[a]) {
			
			var alld = allp[b].textContent; //.replace(/<[^>]*>/g, '').replace(/   */g, ' ');
			
			dataout += '\n'+ma[a][b]+'###'+alld;
		}
	}
	writeFile('dppn',dataout, 'UTF-8');
}


function noah11()
{
	var dataout = '';
	for (i = 0; i <= 4; i++) {
	
		var pedp = 'etc/XML1/'+ i +'/ped.xml';

		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", pedp, false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		var cntx = xmlDoc.getElementsByTagName('data').length;
		var noc = ''; 
		var nocd = 'x';
		var nocdo;
		for (e = 0; e < cntx; e++) {
			noc = i+'/'+e;
			if ( noahda[noc]) {
				if ( noahda[noc].charAt(0) != nocd.charAt(0)) { dataout += '<h1>' + noahda[noc].charAt(0) + '</h1>\n'; }
				nocd = noahda[noc];
				var dataa = xmlDoc.getElementsByTagName('data')[e].getElementsByTagName('sdata');
				var data = '';
				for (j=0; j<dataa.length; j++) {
					data += dataa[j].textContent;
				}
				nocdo = nocd.replace(/aa/g, 'ā');
				nocdo = nocdo.replace(/ii/g, 'ī');
				nocdo = nocdo.replace(/uu/g, 'ū');
				nocdo = nocdo.replace(/,t/g, 'ṭ');
				nocdo = nocdo.replace(/,d/g, 'ḍ');
				nocdo = nocdo.replace(/`n/g, 'ṅ');
				nocdo = nocdo.replace(/,n/g, 'ṇ');
				nocdo = nocdo.replace(/,m/g, 'ṃ');
				nocdo = nocdo.replace(/\~n/g, 'ñ');
				nocdo = nocdo.replace(/,l/g, 'ḷ');				
				nocdo = nocdo.replace(/`/g, '-');
				nocdo = nocdo.replace(/z/g, ' ');
				dataout	+= '<h2>' + nocdo + '</h2>\n<p>' + data + '\n';
			}
		}
	}
	
	writeFile('PEDdata.html', dataout, 'UTF-8')
}

function noah22()
{
	var dataout = '';
	for (i = 1; i <= 8; i++) {
	
		var dn = 'etc/XML2/'+ i +'.xml';

		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", dn, false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		var en = xmlDoc.getElementsByTagName('entry');
		for (j = 0; j < en.length; j++) { 
			var out = '';
			var da = en[j].getElementsByTagName('data');
			for (k = 0; k < da.length; k++) {
				if(da[k].childNodes[0]) {
					var data = da[k].textContent;
					out += data;
				}
			}
			writeFile(i+'.'+j+'.html', out, 'UTF-8')
		}
		out = out.replace(/\&lt;/g, '\n<');
		out = out.replace(/\&gt;/g, '>');
	}
}


function noahddd() {
//	alert('yes');
	var out = '';
	var x=0;
	for (i = 0; i< devmain.length; i++) {
		if (devmain[i+1] && devmain[i][0] == devmain[i+1][0]) {
			x++;
			out+='mainda["'+devmain[i][0]+'z'+x+'"] = "'+devmain[i][1]+'"; //'+devmain[i][2]+'\n';
			//alert(devmain[i]);
		}
		else {
			if(x >0) out+='mainda["'+devmain[i][0]+'z'+(x+1)+'"] = "'+devmain[i][1]+'"; //'+devmain[i][2]+'\n';
			else out+='mainda["'+devmain[i][0]+'"] = "'+devmain[i][1]+'"; //'+devmain[i][2]+'\n';
			x=0;
		}
	}
	document.textpad.pad.value = out;
}
		

function noahd() {
	var engN = sortaz(newE);
	out = '';
	for (i in engN) {
		var x = engN[i].split(',');
		out += 'yt['+toVel(x.shift()).replace(/"n/g, '`n').replace(/\./g, ',')+'] = ['+x.join(',')+'];\n';
	}
	writeFile('english1.js', out);
}



function Dloaded() {

	var x = [];

	for (i in nameda) {
		x.push(i.replace(/`n/g, '"n').replace(/,/g, '.').replace("f", "!")+'#'+nameda[i]);
	}
	var y = sortaz(x);
			
	document.getElementById('pad').innerHTML = y.join('\n');
}

function DloadFileAsXML() {
	var cont = readExtFile('Desktop/ati_website/html/tipitaka/dn','dn.01.0.bodh.html');
	document.textpad.pad.value = cont;
	var parser=new DOMParser();
	var doc = parser.parseFromString(cont,'text/xml');
	alert(doc.documentElement.getElementsByTagName('div').length);
}

function Dnda() {
	var out = '';
	var na = [];
	for (i in nameda) {
		var s = nameda[i].split('#');
		var f = 1;
		while(na[s[0]+'f'+f]) { f++; }
		na[s[0]+'f' + f] = s[1];
	}
	for (j in na) {
		out += "nameda['"+j+"'] = '"+na[j]+"';"; 
	}
	document.getElementById('pad').innerHTML = out + '];';
}

function DnameDa () {

	var oldda = [];
	var longda = [];
	var newda = [];
	var noneda = [];
	
	for (i in nameda) {
		var s = nameda[i].split('/');
		var t = toUni(i.split('f')[0]);
		var u = t.charAt(t.length-1);
		
		var n = new RegExp(t,'i');
		
		
		var o = new RegExp(t+u,'i');

		var dppnf = 'etc/XML2/'+s[0]+'.xml';

		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", dppnf, false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		var data = xmlDoc.getElementsByTagName('entry')[parseInt(s[1])].textContent.match(/\&lt;h2\&gt;[^&]*&lt;\/h2\&gt;/);
		if(data) data = data[0].replace(/\&lt;\/*h2\&gt;/g,'');
		else {
			noneda.push(i+' // ' + nameda[i]);
			continue;
		}
		if(n.exec(data)) {
			oldda.push(t);
		}
		else if(o.exec(data)) {
			longda.push(t+u);
		}
		else if(data) {
			newda.push(data);
		}
		else {
			noneda.push(i+' // ' + nameda[i]);
		}
		
		devO('\n// old\n'+oldda.join('\n')+'\n// long\n'+longda.join('\n')+'\n// new\n'+newda.join('\n')+'\n// none\n'+noneda.join('\n'));
	}
}

function DnameDa2 () {

	var oldda = [];
	var longda = [];
	var newda = [];
	var noneda = [];
	
	for (i = 1; i < 10; i++) {

		var dppnf = 'etc/XML2/'+i+'.xml';

		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", dppnf, false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		var dataa = xmlDoc.getElementsByTagName('entry');
		
		for (j = 0; j < dataa.length; j++) {
			
			var data = dataa[j].textContent.replace(/huge"\]/);
			if(data) data = data[0].replace(/\&lt;\/*h2\&gt;/g,'');
			else {
				noneda.push(i+' // ' + nameda[i]);
				continue;
			}
			if(n.exec(data)) {
				oldda.push(t);
			}
			else if(o.exec(data)) {
				longda.push(t+u);
			}
			else if(data) {
				newda.push(data);
			}
			else {
				noneda.push(i+' // ' + nameda[i]);
			}
		}
	}
	devO('\n// old\n'+oldda.join('\n')+'\n// long\n'+longda.join('\n')+'\n// new\n'+newda.join('\n')+'\n// none\n'+noneda.join('\n'));
}


function DdppnNameNo() {

	var out = '';
	var t=0;
	for (i in nameno) {
		t=0;
		for (j in nn) {
			if (nn[j].search(nameno[i]+'/') == 0) {
				out += "nameno['"+i+"'] = '"+nn[j]+"';\n";
				t=1;
				break;
			}
		}
		if(t == 0) { out += "nameno['"+i+"'] = '"+nameno[i]+"';\n"; }
	}
	document.getElementById('pad').innerHTML = out;
}

var Dev_tl = [];
Dev_tl['t'] = 'ṭ';
Dev_tl['d'] = 'ḍ';
Dev_tl['n'] = 'ṇ';
Dev_tl['l'] = 'ḷ';
Dev_tl['m'] = 'ṃ';
Dev_tl['ṭ'] = 't';
Dev_tl['ḍ'] = 'd';
Dev_tl['ṇ'] = 'n';
Dev_tl['ḷ'] = 'l';
Dev_tl['ṃ'] = 'm';


function Ddppnsearchstart(getstring)
{
	
	clearDivs('dif');
	moveframey('dif');
	moveframex(3);

	document.getElementById('difb').appendChild(pleasewait);


	var gslength = getstring.length;
	var gsplit = new Array();	
	
	var gletter = getstring.charAt(0);

	var foldersw = new Array();
	var f0 = 0;
	var f1 = 0;

	var dict = '../DPPN/';
	
	var finouta = new Array();
	var finout = '<table>';


	if (dppn.length == 0) { 
		for (a in nameda) { 
			for (b in nameda[a]) {
				dppn.push([a,nameda[a][b]]); 
			} 
		}
	}
	
    for (x in dppn)
	{
		var dppnt = dppn[x][0];
		var yessir = (dppnt.search(getstring) > -1);
		if(yessir && /[tdnlm]/.exec(dppnt.substring(1).replace(/sutta$/, "").replace(/thera$/, "").replace(/therii$/, "").replace(/vatthu$/, "").replace(/jaataka$/, "").replace(/tissa$/, "")))
		{
			var loc = dppn[x][1];
			var dppntb = dppnt;
			if (!/[tdn]/.exec(dppntb)) dppntb = dppntb.replace(/l/g, '.l');
			dppntb = toUni(dppnt.replace(/([tdn])/g, ".$1").replace(/([.~"])\./g, "$1").replace(/su\.t\.ta$/, "sutta").replace(/\.tissa$/, "tissa").replace(/\.thera$/, "thera").replace(/\.therii$/, "therii").replace(/va\.t\.thu$/, "vatthu").replace(/jaa\.taka$/, "jaataka").replace(/^./, ""));
			var dppntc = '';
			for (y = 0; y < dppntb.length; y++) {
				var th = dppntb[y];
				if(Dev_tl[th]) dppntc += '<a class="huge" href="javascript:void(0)" onclick="this.blur(); this.innerHTML = Dev_tl[this.innerHTML]">'+th+'</a>';
				else dppntc += th;
			}
			
			finout += '<tr id="DevX'+dppnt.replace(/"/g,'x')+'"><td><a class="tiny" href="javascript:void(0)" style="color:'+DPR_prefs['coltext']+'" onClick="DdppnShow(\'dppn/' + loc + ',' + dppnt + '\')">'+dppnt+'</a></td><td class="huge" id="DevD'+dppnt.replace(/"/g,'x')+'">' + dppntc + '</td><td><input type="button" value="save" onClick="DdppnSave(\''+dppnt.replace(/"/g,'x')+'\')"><input type="button" value="dup" onClick="DdppnSave(\''+dppnt.replace(/"/g,'x')+'\',true)"></td></tr>';
			
			// <input type="input" id="DevD'+dppnt.replace(/"/g,'x')+'" value="'+dppnt.replace(/([tdnl])/g, ".$1").replace(/([.~"])\./g, "$1").replace(/su\.t\.ta$/, "sutta").replace(/jaa\.taka$/, "jaataka").replace(/"/g,'&quot;')+'"> <input type="checkbox" onclick="DdppnReplace(\'t\',\'DevD'+dppnt.replace(/"/g,'x')+'\',this.checked)" checked><input type="checkbox" onclick="DdppnReplace(\'d\',\'DevD'+dppnt.replace(/"/g,'x')+'\',this.checked)" checked><input type="checkbox" onclick="DdppnReplace(\'n\',\'DevD'+dppnt.replace(/"/g,'x')+'\',this.checked)" checked><input type="checkbox" onclick="DdppnReplace(\'l\',\'DevD'+dppnt.replace(/"/g,'x')+'\',this.checked)" checked><input type="button" value="save" onClick="DdppnSave(\''+dppnt.replace(/"/g,'x')+'\')"></div>';
		}
	}
	finout += '</table>';

	
	var outDiv = document.createElement('div');
	outDiv.setAttribute('align','right');
	outDiv.innerHTML = finout;
	document.getElementById('difb').innerHTML = '';
	document.getElementById('difb').appendChild(outDiv);
	document.getElementById('cdif').scrollTop=0;
	yut = 0;
}

function DdppnReplace(ltr, id, ck) {
	var val = document.getElementById(id).value;
	if(ck) {
		var rx = new RegExp(ltr,'g');
		document.getElementById(id).value = val.replace(rx, '.'+ltr);
	}
	else {
		var rx = new RegExp('\\.'+ltr,'g');
		document.getElementById(id).value = val.replace(rx, ltr);
	}
}
function DdppnSave(terma,dup) {
	var term = terma.replace(/x/g,'"')
	var termn = toVel(document.getElementById('DevD'+terma).innerHTML.replace(/<[^>]*>/g, ''));
	nameda[termn] = nameda[term];
	if(!dup) delete nameda[term];
	var sorta = [];
	for (i in nameda) {
		sorta.push(i);
	}
	var sorta2 = sortaz(sorta);
	var outs = 'var nameda = [];\n\n';
	for (i in sorta2) {
		var sa = sorta2[i];
		outs+= 'nameda[\''+sa+'\'] = [\''+nameda[sa].join("','")+'\'];\n';
	}
	document.getElementById('DevX'+terma).style.display = 'none';
	devO(outs,1);
}
function DdppnSort() {
	var sorta = [];
	for (i in nameda) {
		sorta.push(i);
	}
	var sorta2 = sortaz(sorta);
	var outs = 'var nameda = [];\n\n';
	for (i in sorta2) {
		var sa = sorta2[i];
		outs+= 'nameda[\''+sa+'\'] = [\''+nameda[sa].join("','")+'\'];\n';
	}
	devO(outs,1);
}

function DdppnShow(file,which) {
	var filea = file.split(',');
	var tloc = filea[0].split('/');
	if (nameno[tloc[2]+','+filea[1]]) { // fudge
		if (nameno[tloc[2]+','+filea[1]] == '') {
			alert('Link not found');
			return;
		}
		var ttmp = nameda[nameno[tloc[2]+','+filea[1]]][1].split('/');
		tloc[0] = 'dppn';
		tloc[1] = ttmp[0];
		tloc[2] = ttmp[1];
		
	}
	
	if(!which) { // not from select
		var dppnhistt = [];
		dppnhist = dppnhist.slice(0,dhmark+1); // cut old future
		for (i in dppnhist) {
			if (dppnhist[i] != file) { dppnhistt.push(dppnhist[i]); }
		}
		dppnhist = dppnhistt.concat([file]); // add latest 
		dhmark = dppnhist.length; // set mark to latest
	}
	
	

	
	// xml
	
	var dppnf = 'etc/XML2/'+tloc[1]+'.xml';

	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", dppnf, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;

	var data = ' ' + xmlDoc.getElementsByTagName('entry')[tloc[2]].textContent.replace(/\[/g, '<').replace(/\]/g, '>').replace(/href/g, 'style="color:blue" href').replace(/\.  /g, '.&nbsp; ');
	window.alert(file+' | ' +data);
}

var G_xmlDoc;

function DgetThaiBook(book) {
	
	var xmlg = 'xml/thai/Canon/' + book + '.xml';
	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", xmlg, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;
	var pages = xmlDoc.getElementsByTagName('page');
	var xmlo = '<?xml version="1.0"?><body><ha><han></han><h0><h0n></h0n><h1><h1n></h1n><h2><h2n></h2n><h3><h3n></h3n><h4><h4n></h4n><p>';
	for (i = 0; i < pages.length; i++) {

		var pageno = pages[i].getElementsByTagName('pageno')[0].textContent;

		// footnotes

		var fnotesa = pages[i].getElementsByTagName('fnote');
		var fnotes = '';
		for (j = 0; j < fnotesa.length; j++) {
			fnotes += fnotesa[j].textContent + (j < fnotesa.length-1 ? ' ' : '');
		}
		var fna = [];
		while (/^[ 0-9*]/.exec(fnotes)) {
			i//if(!fnotes.match(/^[ 0-9-]+[^0-9]+/)) dalert(i + ' ' + fnotes);
			var tf = fnotes.match(/^[ 0-9*-]+[^0-9*]+/)[0];
			
			if(/^[ 0-9]+-/.exec(tf)) { // multi footnote
				var l = tf.match(/[ 0-9]+-[ 0-9]+/)[0];
				var la = l.replace(/ /g, '').split('-');
				for (j = 0; j < parseInt(la[1]); j++) {
					fna.push( ' ' + (j+1) + ' ' + tf.replace(l,''));
				}
			}
			else fna.push(tf.replace(/ +$/,''));
			fnotes = fnotes.substring(tf.length);
		}
				
		var linesa = pages[i].getElementsByTagName('line');
		if(/^  +/.exec(linesa[0].textContent) && i > 0) xmlo += '</p><p>';
		xmlo += '^a^Thai '+book+'.'+i+'^ea^ '; 

		var lines = '';
		for (j = 0; j < linesa.length; j++) {
			var tl = linesa[j].textContent;
			
			if(/[0-9]+-/.exec(tl)) { // footnote replacing
				var fn = tl.match(/[0-9]+-/g);
				for (k in fn) {
					var fnn = parseInt(fn[k].slice(0,-1));
					tl = tl.replace(fn[k], '{'+fna[fnn-1] + '}');
				}
			}
			else if(/\*-/.exec(tl)) { // footnote replacing
				tl = tl.replace('*-', '{' + fna[[0]] + '}');
			}
			lines += '#' + j + '^' + tl.replace(/%/g,'^a^').replace(/@/g,'^ea^') + (linesa[j+1] ? ((/^  +/.exec(linesa[j+1].textContent) || (/^ {7,}/.exec(tl) && !/^ *\[/.exec(tl))) ? '</p><p>' : ' ') : '');
		}
		xmlo += lines;
	}
	xmlo += '</p></h4></h3></h2></h1></h0></ha></body>';
	var parser=new DOMParser();
	G_xmlDoc = parser.parseFromString(xmlo,'text/xml');
	DthaiOut();
}

function DthaiOut(){


	var z = G_xmlDoc.getElementsByTagName("ha");
	var y = '';
	var x = '';
	var w = '';
	var v = '';
	var u = '';
	
	var theData = "";
	var theDatao = "";

		
	var tmp = 0;
	var tmp1 = 0;
	var tmp2 = 0;
	var tmp3 = 0;
	var tmp4 = 0;
	var tmp5 = 0;
	var tmp6 = 0;

	var col = ['coltext','colsel','colped','coldppn','colcpd'];
	var whichcol = [0,0,0,0,0,0];
	var wcs = 0;
	for (tmp = 0; tmp < z.length; tmp++)
	{
		if (z[tmp].getElementsByTagName("han")[0].childNodes[0]) theData = z[tmp].getElementsByTagName("han")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
		if (z.length > 1 && theData == '') { theData = 'unnamed'; } 
		if (theData != '') {

			whichcol[0] = 1; // bump up to let the second color know

			theDatao += '<font style="color:'+DPR_prefs[col[wcs]]+'"><b>' + toVel(theData) + '</b></font></a><br />';
		}
		y = z[tmp].getElementsByTagName("h0");
		for (tmp2 = 0; tmp2 < y.length; tmp2++)
		{
			if (y[tmp2].getElementsByTagName("h0n")[0].childNodes[0]) theData = y[tmp2].getElementsByTagName("h0n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
			if (y.length > 1 && theData == '') { theData = 'unnamed'; }
			if (theData != '') {
				
				wcs = whichcol[0]; // either 0 or 1
				whichcol[1] = 1; // bump up for the next color, if no data, this will still be 0, next color will get 0
				var spaces = '';
				for(f = 0; f < wcs; f++) {
					spaces += '&nbsp;&nbsp;';
				}
				
				theDatao += spaces+'<b>0</b> <font style="color:'+DPR_prefs[col[wcs]]+'">' + toVel(theData) + '</font></a>';


				theDatao += '<br />';
			}
			x = y[tmp2].getElementsByTagName("h1");
			for (tmp3 = 0; tmp3 < x.length; tmp3++)
			{
				if (x[tmp3].getElementsByTagName("h1n")[0].childNodes[0]) theData = x[tmp3].getElementsByTagName("h1n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
				if (x.length > 1 && theData == '') { theData = 'unnamed'; }
				if (theData != '') {
					
					wcs = whichcol[0] + whichcol[1]; // 0, 1 or 2 - if 0,1 are still 0, this will get 0
					whichcol[2] = 1; // bump up for the next color, if no data, this will still be -1, next color will get 0
				
					spaces = '';
					for(f = 0; f < wcs; f++) {
						spaces += '&nbsp;&nbsp;';
					}

					theDatao += spaces+'<span class="abut obut tiny" onclick="DthaiL(['+ tmp2 + ',' + tmp3 +'],1);">-</span><b>1</b> <font style="color:'+DPR_prefs[col[wcs]]+'">' + toVel(theData) + '</font></a>';


					theDatao += '<br />';
				}
				w = x[tmp3].getElementsByTagName("h2");
				for (tmp4 = 0; tmp4 < w.length; tmp4++)
				{
					if (w[tmp4].getElementsByTagName("h2n")[0].childNodes[0]) theData = w[tmp4].getElementsByTagName("h2n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
					if (w.length > 1 && theData == '') { theData = 'unnamed'; }
					if (theData != '') {
						
						wcs = whichcol[0] + whichcol[1] + whichcol[2]; // 0, 1, 2, or 3
						whichcol[3] = 1; // bump
						
						spaces = '';
						for(f = 0; f < wcs; f++) {
							spaces += '&nbsp;&nbsp;';
						}

						theDatao += spaces+'<span class="abut obut tiny" onclick="DthaiL(['+ tmp2 + ',' + tmp3 + ',' + tmp4 + '],2);">-</span><b>2</b> <font style="color:'+DPR_prefs[col[wcs]]+'">' + toVel(theData) + '</font></a>';

                        theDatao += '<br />';
                    }

					v = w[tmp4].getElementsByTagName("h3");
					for (tmp5 = 0; tmp5 < v.length; tmp5++)
					{
						if (v[tmp5].getElementsByTagName("h3n")[0].childNodes[0]) theData = v[tmp5].getElementsByTagName("h3n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
						if (v.length > 1 && theData == '') { theData = 'unnamed'; }
						if (theData != '') {

							wcs = whichcol[0] + whichcol[1] + whichcol[2] + whichcol[3]; // 0, 1, 2, 3, or 4
							whichcol[4] = 1; // bump

							spaces = '';
							for(f = 0; f < wcs; f++) {
								spaces += '&nbsp;&nbsp;';
							}

							theDatao += spaces+'<span class="abut obut tiny" onclick="DthaiL(['+ tmp2 + ',' + tmp3 + ',' + tmp4 + ',' + tmp5 +'],3);">-</span><b>3</b> <font style="color:'+DPR_prefs[col[wcs]]+'">' + toVel(theData) + '</font></a>';

                            theDatao += '<br />';
                        }


						u = v[tmp5].getElementsByTagName("h4");
						for (tmp6 = 0; tmp6 < u.length; tmp6++)
						{
							if (u[tmp6].getElementsByTagName("h4n")[0].childNodes[0]) theData = u[tmp6].getElementsByTagName("h4n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
							if (u.length > 1 && theData == '') { theData = 'unnamed'; }
							if (theData != '') {

								wcs = whichcol[0] + whichcol[1] + whichcol[2] + whichcol[3] + whichcol[4]; // 0, 1, 2, 3, 4 or 5
								spaces = '';
								for(f = 0; f < wcs; f++) {
									spaces += '&nbsp;&nbsp;';
								}
								whichcol[5] = 1; // bump

								theDatao += spaces+'<span class="abut obut tiny" onclick="DthaiL(['+ tmp2 + ',' + tmp3 + ',' + tmp4 + ',' + tmp5 + ',' + tmp6 +'],4);">-</span><b>4</b> <font style="color:'+DPR_prefs[col[(wcs == 5 ? 0 : wcs)]]+'">' + toVel(theData) + '</font></a>';

                                theDatao += '<br />';
                            }
							t = u[tmp6].getElementsByTagName("p");
							theDatao += tmp2 + '.' + tmp3 + '.' + tmp4 + '.' + tmp5 + '.' + tmp6 + ': ' + t.length + '<br />';
							
							for (tmp7 = 0; tmp7 < t.length; tmp7++)
							{

								wcs = whichcol[0] + whichcol[1] + whichcol[2] + whichcol[3] + whichcol[4] + whichcol[5]; // 0, 1, 2, 3, 4 or 5
								spaces = '';
								for(f = 0; f < wcs; f++) {
									spaces += '&nbsp;&nbsp;';
								}

								if(t[tmp7].textContent.length < 100) theDatao += spaces + '<span class="abut obut tiny" onclick="DthaiL(['+ tmp2 + ',' + tmp3 + ',' + tmp4 + ',' + tmp5 + ',' + tmp6 + ',' + tmp7+'],5);">-</span> <span class="abut lbut tiny" onclick="DthaiA(['+ tmp2 + ',' + tmp3 + ',' + tmp4 + ',' + tmp5 + ',' + tmp6 + ',' + tmp7+'],5);">&lt;</span><span class="abut rbut tiny" onclick="DthaiB(['+ tmp2 + ',' + tmp3 + ',' + tmp4 + ',' + tmp5 + ',' + tmp6 + ',' + tmp7+'],5);">&gt;</span> <span class="abut obut tiny" onclick="DthaiR(['+ tmp2 + ',' + tmp3 + ',' + tmp4 + ',' + tmp5 + ',' + tmp6 + ',' + tmp7+'],5);">R</span><b>p</b> '+t[tmp7].textContent + '<br /><br />';
								else theDatao += spaces + '<span class="abut lbut tiny" onclick="DthaiA(['+ tmp2 + ',' + tmp3 + ',' + tmp4 + ',' + tmp5 + ',' + tmp6 + ',' + tmp7+'],5);">&lt;</span><span class="abut rbut tiny" onclick="DthaiB(['+ tmp2 + ',' + tmp3 + ',' + tmp4 + ',' + tmp5 + ',' + tmp6 + ',' + tmp7+'],5);">&gt;</span><b>p</b> ' + t[tmp7].textContent.substring(0,50) + '...' + t[tmp7].textContent.length + '...' + t[tmp7].textContent.substring(t[tmp7].textContent.length-50) +'<br><br>'; 
							}
						}
					}
				}
			}
		}
	}
	
	// save button
	
	theDatao +='<p><span class="abut obut" onclick="DsaveXML(G_xmlDoc)">save</span></p>';
	
	var theDataDiv = document.createElement('div');
	theDataDiv.innerHTML = theDatao;
	document.getElementById('mafbc').innerHTML = '';
	document.getElementById('mafbc').appendChild(theDataDiv);  // ---------- return output ----------

	//document.getElementById('maf').scrollTop = 0;
	moveframex(1); 
	
}

function DthaiR(w,type) {
	G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]].getElementsByTagName("h1")[w[1]].getElementsByTagName("h2")[w[2]].getElementsByTagName("h3")[w[3]].getElementsByTagName("h4")[w[4]].getElementsByTagName("p")[w[5]].childNodes[0].nodeValue = document.form.isearch.value;
	DthaiOut();
	
}

function DthaiA(w,type) {
	var tpar = G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]].getElementsByTagName("h1")[w[1]].getElementsByTagName("h2")[w[2]].getElementsByTagName("h3")[w[3]].getElementsByTagName("h4")[w[4]].getElementsByTagName("p")[w[5]];
	var mpar = G_xmlDoc.createElement('p');
	var npv = document.form.isearch.value;
	var mt = G_xmlDoc.createTextNode(npv);
	mpar.appendChild(mt);
	G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]].getElementsByTagName("h1")[w[1]].getElementsByTagName("h2")[w[2]].getElementsByTagName("h3")[w[3]].getElementsByTagName("h4")[w[4]].insertBefore(mpar,tpar);
	DthaiOut();
	
}

function DthaiB(w,type) {
	var parent = G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]].getElementsByTagName("h1")[w[1]].getElementsByTagName("h2")[w[2]].getElementsByTagName("h3")[w[3]].getElementsByTagName("h4")[w[4]];
		
	var mpar = G_xmlDoc.createElement('p');
	var npv = document.form.isearch.value;
	var mt = G_xmlDoc.createTextNode(npv);
	mpar.appendChild(mt);

	if(w[5] == parent.length-1) {
		parent.appendChild(mpar);
	}
	else {
		var tpar = G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]].getElementsByTagName("h1")[w[1]].getElementsByTagName("h2")[w[2]].getElementsByTagName("h3")[w[3]].getElementsByTagName("h4")[w[4]].getElementsByTagName("p")[w[5]+1];
		parent.insertBefore(mpar,tpar);
	}
	DthaiOut();
	
}


function DthaiL(w,type) {

	switch (type) {
		case 5:

			// move this p to h4n

			var tpar = G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]].getElementsByTagName("h1")[w[1]].getElementsByTagName("h2")[w[2]].getElementsByTagName("h3")[w[3]].getElementsByTagName("h4")[w[4]].getElementsByTagName("p")[w[5]];
			var tpv = tpar.textContent;
			var parent = G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]].getElementsByTagName("h1")[w[1]].getElementsByTagName("h2")[w[2]].getElementsByTagName("h3")[w[3]].getElementsByTagName("h4")[w[4]];
			parent.removeChild(parent.getElementsByTagName("p")[w[5]]);
			
			if(w[5] == 0) { // just shift it up
				parent.getElementsByTagName("h4n")[0].childNodes[0].nodeValue=tpv;
			}
			else { // add a new h4
				var newh = G_xmlDoc.createElement('h4');
				var newhn = G_xmlDoc.createElement('h4n');
				var newhnt = G_xmlDoc.createTextNode(tpv);
				newhn.appendChild(newhnt);
				newh.appendChild(newhn);
			
				// move pars after to this h4
				
				var pars = G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]].getElementsByTagName("h1")[w[1]].getElementsByTagName("h2")[w[2]].getElementsByTagName("h3")[w[3]].getElementsByTagName("h4")[w[4]].getElementsByTagName("p");
				var count = parent.getElementsByTagName('p').length;
				for (x = w[5]; x < count; x++) {
					var npar = parent.getElementsByTagName("p")[w[5]];
					var npv = npar.textContent;

					parent.removeChild(parent.getElementsByTagName("p")[w[5]]);

					var mpar = G_xmlDoc.createElement('p');
					var mt = G_xmlDoc.createTextNode(npv);
					mpar.appendChild(mt);
					newh.appendChild(mpar);
				}
				
				var gparent = G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]].getElementsByTagName("h1")[w[1]].getElementsByTagName("h2")[w[2]].getElementsByTagName("h3")[w[3]];
				gparent.appendChild(newh);
			}
			
		break;
		case 4:

			// move this h4n to h3n

			var tpar = G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]].getElementsByTagName("h1")[w[1]].getElementsByTagName("h2")[w[2]].getElementsByTagName("h3")[w[3]].getElementsByTagName("h4")[w[4]].getElementsByTagName("h4n")[0];
			var tpv = tpar.textContent;
			var parent = G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]].getElementsByTagName("h1")[w[1]].getElementsByTagName("h2")[w[2]].getElementsByTagName("h3")[w[3]];
			
			if(w[4] == 0) { // just shift it up
				tpar.childNodes[0].nodeValue='';
				parent.getElementsByTagName("h3n")[0].childNodes[0].nodeValue=tpv;
			}
			else { // add a new h3
				var newh = G_xmlDoc.createElement('h3');
				var newhn = G_xmlDoc.createElement('h3n');
				var newhnt = G_xmlDoc.createTextNode(tpv);
				newhn.appendChild(newhnt);
				newh.appendChild(newhn);
				newh.appendChild(parent.getElementsByTagName("h4")[w[4]]);
				newh.getElementsByTagName("h4")[0].getElementsByTagName("h4n")[0].childNodes[0].nodeValue = '';
				
				// move h4s after to this h3
				
				var pars = G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]].getElementsByTagName("h1")[w[1]].getElementsByTagName("h2")[w[2]].getElementsByTagName("h3")[w[3]].getElementsByTagName("h4");
				var count = pars.length;
				for (x = w[4]; x < count; x++) {
					var npar = parent.getElementsByTagName("h4")[w[4]];
					newh.appendChild(npar);
				}
				
				var gparent = G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]].getElementsByTagName("h1")[w[1]].getElementsByTagName("h2")[w[2]];
				gparent.appendChild(newh);
			}
			
			
		break;
		case 3:

			// move this h3n to h2n

			var tpar = G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]].getElementsByTagName("h1")[w[1]].getElementsByTagName("h2")[w[2]].getElementsByTagName("h3")[w[3]].getElementsByTagName("h3n")[0];
			var tpv = tpar.textContent;
			var parent = G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]].getElementsByTagName("h1")[w[1]].getElementsByTagName("h2")[w[2]];
			
			if(w[3] == 0) { // just shift it up
				tpar.childNodes[0].nodeValue='';
				parent.getElementsByTagName("h2n")[0].childNodes[0].nodeValue=tpv;
			}
			else { // add a new h2
				var newh = G_xmlDoc.createElement('h2');
				var newhn = G_xmlDoc.createElement('h2n');
				var newhnt = G_xmlDoc.createTextNode(tpv);
				newhn.appendChild(newhnt);
				newh.appendChild(newhn);
				newh.appendChild(parent.getElementsByTagName("h3")[w[3]]);
				newh.getElementsByTagName("h3")[0].getElementsByTagName("h3n")[0].childNodes[0].nodeValue = '';
				
				// move h3s after to this h2
				
				var pars = G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]].getElementsByTagName("h1")[w[1]].getElementsByTagName("h2")[w[2]].getElementsByTagName("h3");
				var count = pars.length;
				for (x = w[3]; x < count; x++) {
					var npar = parent.getElementsByTagName("h3")[w[3]];
					newh.appendChild(npar);
				}
				
				var gparent = G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]].getElementsByTagName("h1")[w[1]];
				gparent.appendChild(newh);
			}
			
			
		break;
		case 2:

			// move this h2n to h1n

			var tpar = G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]].getElementsByTagName("h1")[w[1]].getElementsByTagName("h2")[w[2]].getElementsByTagName("h2n")[0];
			var tpv = tpar.textContent;
			var parent = G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]].getElementsByTagName("h1")[w[1]];
			
			if(w[2] == 0) { // just shift it up
				tpar.childNodes[0].nodeValue='';
				parent.getElementsByTagName("h2n")[0].childNodes[0].nodeValue=tpv;
			}
			else { // add a new h1
				var newh = G_xmlDoc.createElement('h1');
				var newhn = G_xmlDoc.createElement('h1n');
				var newhnt = G_xmlDoc.createTextNode(tpv);
				newhn.appendChild(newhnt);
				newh.appendChild(newhn);
				newh.appendChild(parent.getElementsByTagName("h2")[w[2]]);
				newh.getElementsByTagName("h2")[0].getElementsByTagName("h2n")[0].childNodes[0].nodeValue = '';
				
				// move h2s after to this h1
				
				var pars = G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]].getElementsByTagName("h1")[w[1]].getElementsByTagName("h2");
				var count = pars.length;
				for (x = w[2]; x < count; x++) {
					var npar = parent.getElementsByTagName("h2")[w[2]];
					newh.appendChild(npar);
				}
				
				var gparent = G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]];
				gparent.appendChild(newh);
			}
			
			
		break;
		case 1:

			// move this h1n to h0n

			var tpar = G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]].getElementsByTagName("h1")[w[1]].getElementsByTagName("h1n")[0];
			var tpv = tpar.textContent;
			var parent = G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]];
			
			if(w[1] == 0) { // just shift it up
				tpar.childNodes[0].nodeValue='';
				parent.getElementsByTagName("h0n")[0].childNodes[0].nodeValue=tpv;
			}
			else { // add a new h0
				var newh = G_xmlDoc.createElement('h0');
				var newhn = G_xmlDoc.createElement('h0n');
				var newhnt = G_xmlDoc.createTextNode(tpv);
				newhn.appendChild(newhnt);
				newh.appendChild(newhn);
				newh.appendChild(parent.getElementsByTagName("h1")[w[1]]);
				newh.getElementsByTagName("h1")[0].getElementsByTagName("h1n")[0].childNodes[0].nodeValue = '';
				
				// move h1s after to this h0
				
				var pars = G_xmlDoc.getElementsByTagName("ha")[0].getElementsByTagName("h0")[w[0]].getElementsByTagName("h1");
				var count = pars.length;
				for (x = w[1]; x < count; x++) {
					var npar = parent.getElementsByTagName("h1")[w[1]];
					newh.appendChild(npar);
				}
				
				var gparent = G_xmlDoc.getElementsByTagName("ha")[0];
				gparent.appendChild(newh);
			}
			
			
		break;

	}
	
	DthaiOut();
}

function DsaveXML(file,doc) {
	var outfile = (new XMLSerializer()).serializeToString(doc);
	if(writeExtFile(file, outfile)) dalert('File Saved');
	else dalert('File Not Saved');
}

// New Thai Function


var DAv = [];
var DAh = [];
var DAp = [];
/* 

htm.DXMLThai('v',1,'m',[[1,0,null],[2,0,152]]);
htm.DXMLThai('v',2,'m',[[2,152,null]]);
htm.DXMLThai('v',3,'m',[[3,0,null]]);
htm.DXMLThai('v',4,'m',[[4,0,null],[5,0,null]]);
htm.DXMLThai('v',5,'m',[[6,0,null],[7,0,null]]);
htm.DXMLThai('v',6,'m',[[8,0,null]]);
htm.DXMLThai('d',1,'m',[[9,0,null]]);

thaibook [x][1] is last page to load

*/
function DXMLThai(nikaya,book,hier,thaibook) {
	DAv = [];
	DAh = [];
	DAp = [];	
	var DshowH = true;
		
	document.activeElement.blur();

	document.getElementById('content').innerHTML = '<div id="maf"><div id="mafbc"><div id="Dl" style="position:absolute; width:50%; left:0; top:0; bottom:0; overflow:auto"></div><div style="position:absolute; width:50%; right:0; top:0; bottom:0; overflow:auto"><div id="Dr" style="position:relative;width:100%;height:100%;"></div></div></div>';
	var bookload = 'chrome://DPRMyanmar/content/xml/' + nikaya + book + hier + '.xml';
	//dalert(bookload);
	var bookno = book-1;
	
	
	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", bookload, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;

	var z = xmlDoc.getElementsByTagName("ha");
	var y = '';
	var x = '';
	var w = '';
	var v = '';
	var u = '';
	var t = '';
	
	var theData = "";
	var theDatao = "";

	bookfile = nikaya + book;
		
	var tmp = 0;
	var tmp1 = 0;
	var tmp2 = 0;
	var tmp3 = 0;
	var tmp4 = 0;
	var tmp5 = 0;
	var tmp6 = 0;

	var col = ['coltext','colsel','colped','coldppn','colcpd'];
	var whichcol = [0,0,0,0,0];
	var wcs = 0;
	for (tmp = 0; tmp < z.length; tmp++)
	{
		if (z[tmp].getElementsByTagName("han")[0].childNodes[0]) theData = z[tmp].getElementsByTagName("han")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
		if (z.length > 1 && theData == '') { theData = 'unnamed'; } 
		if (theData != '') {

			whichcol[0] = 1; // bump up to let the second color know
			
			DAv.push([9, theData]);
			
			theDatao += (devCheck == 1 && DshowH ? '[a]':'')+'<a href="javascript:void(0)" class="tiny" onclick="window.find(\''+toUni(theData)+'\', false, false)"/><font style="color:'+DPR_prefs[col[wcs]]+'"><b>' + translit(toUni(theData)) + '</b></font></a><br />';
		}
		y = z[tmp].getElementsByTagName("h0");
		for (tmp2 = 0; tmp2 < y.length; tmp2++)
		{
			if (y[tmp2].getElementsByTagName("h0n")[0].childNodes[0]) theData = y[tmp2].getElementsByTagName("h0n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
			if (y.length > 1 && theData == '') { theData = 'unnamed'; }
			if (theData != '') {
				
				DAv.push([0, theData]);
				wcs = whichcol[0]; // either 0 or 1
				whichcol[1] = 1; // bump up for the next color, if no data, this will still be 0, next color will get 0
				var spaces = '';
				for(f = 0; f < wcs; f++) {
					spaces += '&nbsp;&nbsp;';
				}
				
				theDatao += spaces+(devCheck == 1 && DshowH ? '[0]':'')+'<a href="javascript:void(0)" class="tiny" onclick="window.find(\''+toUni(theData)+'\', false, false)"/><font style="color:'+DPR_prefs[col[wcs]]+'">' + translit(toUni(theData)) + '</font></a>';


				theDatao += '<br />';
			}
			x = y[tmp2].getElementsByTagName("h1");
			for (tmp3 = 0; tmp3 < x.length; tmp3++)
			{
				if (x[tmp3].getElementsByTagName("h1n")[0].childNodes[0]) theData = x[tmp3].getElementsByTagName("h1n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
				if (x.length > 1 && theData == '') { theData = 'unnamed'; }
				if (theData != '') {
					
					DAv.push([1, theData]);
					wcs = whichcol[0] + whichcol[1]; // 0, 1 or 2 - if 0,1 are still 0, this will get 0
					whichcol[2] = 1; // bump up for the next color, if no data, this will still be -1, next color will get 0
				
					spaces = '';
					for(f = 0; f < wcs; f++) {
						spaces += '&nbsp;&nbsp;';
					}

					theDatao += spaces+(devCheck == 1 && DshowH ? '[1]':'')+'<a href="javascript:void(0)" class="tiny" onclick="window.find(\''+toUni(theData)+'\', false, false)"/><font style="color:'+DPR_prefs[col[wcs]]+'">' + translit(toUni(theData)) + '</font></a>';

					theDatao += '<br />';
				}
				w = x[tmp3].getElementsByTagName("h2");
				for (tmp4 = 0; tmp4 < w.length; tmp4++)
				{
					if (w[tmp4].getElementsByTagName("h2n")[0].childNodes[0]) theData = w[tmp4].getElementsByTagName("h2n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
					if (w.length > 1 && theData == '') { theData = 'unnamed'; }
					if (theData != '') {
						
						DAv.push([2, theData]);
						wcs = whichcol[0] + whichcol[1] + whichcol[2]; // 0, 1, 2, or 3
						whichcol[3] = 1; // bump
						
						spaces = '';
						for(f = 0; f < wcs; f++) {
							spaces += '&nbsp;&nbsp;';
						}

						theDatao += spaces+(devCheck == 1 && DshowH ? '[2]':'')+'<a href="javascript:void(0)" class="tiny" onclick="window.find(\''+toUni(theData)+'\', false, false)"/><font style="color:'+DPR_prefs[col[wcs]]+'">' + translit(toUni(theData))+(nikaya == 'd' && hier == 'm' ? '&nbsp;<d class="small">(DN&nbsp;'+getSuttaNumber(nikaya,bookno,tmp2,tmp3,tmp4,0,0,0) + ')' : '') + '</d></font></a>';

                        theDatao += '<br />';
                    }

					v = w[tmp4].getElementsByTagName("h3");
					for (tmp5 = 0; tmp5 < v.length; tmp5++)
					{
						if (v[tmp5].getElementsByTagName("h3n")[0].childNodes[0]) theData = v[tmp5].getElementsByTagName("h3n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
						if (v.length > 1 && theData == '') { theData = 'unnamed'; }
						if (theData != '') {

							DAv.push([3, theData]);
							wcs = whichcol[0] + whichcol[1] + whichcol[2] + whichcol[3]; // 0, 1, 2, 3, or 4
							whichcol[4] = 1; // bump

							spaces = '';
							for(f = 0; f < wcs; f++) {
								spaces += '&nbsp;&nbsp;';
							}

							theDatao += spaces+(devCheck == 1 && DshowH ? '[3]':'')+'<a href="javascript:void(0)" class="tiny" onclick="window.find(\''+toUni(theData)+'\', false, false)"/><font style="color:'+DPR_prefs[col[wcs]]+'">' + translit(toUni(theData)) + (nikaya == 'm' && hier == 'm' ? '&nbsp;<d class="small">(MN&nbsp;'+getSuttaNumber(nikaya,bookno,tmp2,tmp3,tmp4,tmp5,0,0) + ')' : '') + '</d></font></a>';

                            theDatao += '<br />';
                        }


						u = v[tmp5].getElementsByTagName("h4");
						for (tmp6 = 0; tmp6 < u.length; tmp6++)
						{
							if (u[tmp6].getElementsByTagName("h4n")[0].childNodes[0]) theData = u[tmp6].getElementsByTagName("h4n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
							if (u.length > 1 && theData == '') { theData = 'unnamed'; }
							if (theData != '') {

								DAv.push([4, theData]);
								wcs = whichcol[0] + whichcol[1] + whichcol[2] + whichcol[3] + whichcol[4]; // 0, 1, 2, 3, 4 or 5
								spaces = '';
								for(f = 0; f < wcs; f++) {
									spaces += '&nbsp;&nbsp;';
								}

								theDatao += spaces+(devCheck == 1 && DshowH ? '[4]':'')+'<a href="javascript:void(0)" class="tiny" onclick="window.find(\''+toUni(theData)+'\', false, false)"/><font style="color:'+DPR_prefs[col[(wcs == 5 ? 0 : wcs)]]+'">' + translit(toUni(theData)) + (/[sa]/.exec(nikaya) && hier == 'm' ? '&nbsp;<d class="small">(AN&nbsp;'+getSuttaNumber(nikaya,bookno,tmp2,tmp3,tmp4,tmp5,tmp6) + ')' : '') + '</d></font></a>';

                                theDatao += '<br />';
                            }
							try{t = u[tmp6].getElementsByTagName("p")[0].textContent;}catch(ex){dalert(['alert1',hier,nikaya,bookno,tmp2,tmp3,tmp4,tmp5,tmp6]); }
							
							t = t.replace(/\^e*b\^/g, '');
							t = t.replace(/\^e*a\^[^^]*\^ea\^/g, '');
							t = t.replace(/\{[^}]*\}/g, ' ');
							t = t.replace(/^\[[^\]]*\]/g, ' ');
							t = t.replace(/[".,;`']/g,'');
							
							var tw = t.split(' ',40);
							for (i in tw) {
								tw[i] = '<a href="javascript:void(0)" onclick="window.find(\''+tw[i]+'\', false, false)">'+tw[i]+'</a> ';
							}
									
							
							theDatao += spaces + '&nbsp;&nbsp;' + '<span>' + tw.join(' ') + '</span>';
							theDatao += '<br />';

						}
					}
				}
			}
		}
	}
	var theDataDiv = document.createElement('div');
	theDataDiv.innerHTML = theDatao;
	document.getElementById('Dl').innerHTML = '';
	document.getElementById('Dl').appendChild(theDataDiv);  // ---------- return output ----------

	DAp = DthaiOut2(thaibook);
	var out = '';
	for (i=0; i < DAp.length; i++) {
		var t = DAp[i];
		var cx = '';
		var ac = '';
		if(/[\]^0-9] +Sāvatthiyaṁ/.exec(t) || /[\]^0-9] +] +Taññeva nidānaṁ\./.exec(t) || /[\]^0-9] +Sāvatthī\./.exec(t) || /[\]^0-9] +Sāvatthīnidānaṁ/.exec(t) || /[\]^0-9] +Evamme/.exec(t) || /[\]^0-9] +] Ekaṁ samayaṁ/.exec(t)) {
			cx = 'checked';
			ac = '<div><input type="checkbox" onclick="DaddThaiH('+i+',this.checked)" name="Dcbx" value="'+i+'"><span name="Dhead"></span><input type="text" name="Dtxt" id="Dtxt'+i+'"></div>';
		}
		out += '<div id="Dcbl'+i+'"><input type="checkbox" name="Dcbx" onclick="DaddThaiH('+i+',this.checked)" value="'+i+'" '+cx+'><span name="Dhead"></span><input type="text" name="Dtxt" id="Dtxt'+i+'">'+ac+'</div>';
		t = t.replace(/\^e*b\^/g, '');
		t = t.replace(/\^a\^/g, '<span style="color:red">');
		t = t.replace(/\^ea\^/g, '</span>');
		t = t.replace(/\{[^}]*\}/g, ' ');
		t = t.replace(/^\[[^\]]*\]/g, ' ');
		t = t.replace(/ṁ/g, 'ṃ');
		out += '<div id="Dpara'+i+'">'+t+'</div>';
	}
	out +='<div style="position:absolute;top:0;right:0;"><span class="abut obut" onclick="DsaveXML2(\''+nikaya + book + hier+'\')">save</span></div>';
	var theDataDiv2 = document.createElement('div');
	theDataDiv2.innerHTML = out;
	document.getElementById('Dr').innerHTML = '';
	document.getElementById('Dr').appendChild(theDataDiv2);  // ---------- return output ----------
	
	document.getElementById('maf').scrollTop = 0;

	var w = 0;
	var cbxs = document.getElementsByName('Dcbx');
	for (j=0;j<cbxs.length;j++) {
		if(typeof(DAv[w]) == 'undefined') break;
		if(document.getElementsByName('Dcbx')[j].checked) {
			document.getElementsByName('Dtxt')[j].value = DAv[w][1];
			document.getElementsByName('Dhead')[j].innerHTML = DAv[w++][0];
		}
		else {
			document.getElementsByName('Dtxt')[j].value = '';
		}
	}
	moveframex(1);

}

function DthaiOut2(booka) {

	var Ax = [];
	
	var footnotelist = '';
	
	out:
	for (e in booka) {
		
		book = booka[e][0];
		
		var cont = '<?xml version="1.0"?>' + readExtFile('/home/noah/Extensions/work/thai/m/' + book + '.xml');
		var parser=new DOMParser();
		var xmlDoc = parser.parseFromString(cont,'text/xml');
		
		
		var pages = xmlDoc.getElementsByTagName('page');
		var firstpage = (booka[e][1]?booka[e][1]:0); // first page (pageno - 1)
		for (i = firstpage; i < pages.length; i++) {
			var pageno = pages[i].getElementsByTagName('pageno')[0].textContent;
			
			if(booka[e][2] && parseInt(pageno,10) > booka[e][2]) break out; // hit page limit
			
			Ax.push('-- ^a^Thai '+book+'.'+pageno+'^ea^ --');

			// footnotes

			var fnotesa = pages[i].getElementsByTagName('fnote');
			var fnotes = '';
			var nfloc = 0; // next fn location
			
			for (j = 0; j < fnotesa.length; j++) {
				fnotes += fnotesa[j].textContent + (j < fnotesa.length-1 ? ' ' : '');
			}
			
			fnotes = fnotes.replace(/\*/g,'~');
		
			var fna = [];
			var fns = '';
			var fncount = 1;
			while (/^ ([0-9]{1,2}|~)/.exec(fnotes)) {
				var l = '';
				if(/^ [0-9]{1,2}-/.exec(fnotes)) { // multi footnote
					try{l = fnotes.match(/^ *[0-9]+[-0-9]+ */)[0];}catch(ex){dalert([1,i,fnotes])}
					var tempfna = [];
					
					var la = l.replace(/ /g, '').split('-');
					var nfn = parseInt(la[0])+1; // initial next
					for(q = 0; q < la.length; q++) {
						var tfn = parseInt(la[q]);
						if(tfn == nfn) nfn++; // as long as we have consecutive nos, increase next
						tempfna.push(tfn);
					}
	

					nfloc = fnotes.substring(l.length).search(/ [0-9~]{1,2}[ -]/);  // next fn location
					
					nfloc = (nfloc>-1?nfloc + l.length:fnotes.length);

					var tf = fnotes.substring(l.length,nfloc);
					for (qq=0; qq < tempfna.length;qq++) {
						fna[tempfna[qq]+'-'] = ' ' + tempfna[qq] + ' ' + tf;
					}
				}
				else if(/^ ~ /.exec(fnotes)) {
					try{l = fnotes.match(/ ~ /)[0];}catch(ex){dalert([2,i,fnotes])}

					nfloc = fnotes.substring(l.length).search(/ [0-9~]{1,2}[ -]/);  // next fn location
					
					nfloc = (nfloc>-1?nfloc + l.length:fnotes.length);

					var tf = fnotes.substring(l.length,nfloc);

					fns =  ' * ' + tf;
				}
				else {
					try{l = fnotes.match(/ [0-9]{1,2} /)[0];}catch(ex){dalert([3,i,fnotes])}

					var nfloc = fnotes.substring(l.length).search(/ [0-9~]{1,2}[ -]/);  // next fn location
					nfloc = (nfloc>-1?nfloc + l.length:fnotes.length);

					var tf = fnotes.substring(0,nfloc);

					fna[parseInt(l.replace(/ /g,''))+'-'] = tf;

				}
				fnotes = fnotes.substring(nfloc);
				//if(i == 39) dalert(fnotes);
			}
			var linesa = pages[i].getElementsByTagName('line');
			for (j = 0; j < linesa.length; j++) {
				var tl = linesa[j].textContent;
				
				if(/[0-9]+-/.exec(tl)) { // footnote replacing
					var fn = tl.match(/[0-9]+-/g);
					for (k=0;k<fn.length;k++) {
						tl = tl.replace(fn[k], '{'+fna[fn[k]] + '}');
						footnotelist +=(i+1)+', '+(j+1)+', '+fna[fn[k]]+'\n';
					}
					//if(i == 11) dalert(fn.length);
				}
				if(/\*-/.exec(tl)) { // footnote replacing
					tl = tl.replace('*-', '{' + fns + '}');
					footnotelist +=(i+1)+', '+(j+1)+', '+fns+'\n';
				}
				if(/[0-9]-/.exec(tl)) {
					dalert(tl);
					return;
				}
				var t = '#' + j + '#' + tl.replace(/%/g,'^a^').replace(/@/g,'^ea^');
				Ax.push(t);
			}
		}
	}
	return Ax;
}

function DaddThaiH(i,checked) {
	if (checked) {
		var newDiv = document.createElement('div');
		newDiv.innerHTML = '<div><input type="checkbox" onclick="DaddThaiH('+i+',this.checked)" name="Dcbx" value="'+i+'"><span name="Dhead"></span><input type="text" name="Dtxt" id="Dtxt'+i+'"></div>';
		document.getElementById('Dcbl'+i).appendChild(newDiv);
	} 
	else {
		document.getElementById('Dcbl'+i).removeChild(document.getElementById('Dcbl'+i).lastChild);
	}
	var w = 0;
	var cbxs = document.getElementsByName('Dcbx');
	for (j=0;j<cbxs.length;j++) {
		if(typeof(DAv[w]) == 'undefined') break;
		if(document.getElementsByName('Dcbx')[j].checked) {
			document.getElementsByName('Dtxt')[j].value = DAv[w][1];
			document.getElementsByName('Dhead')[j].innerHTML = DAv[w++][0];
		}
		else {
			document.getElementsByName('Dtxt')[j].value = '';
		}
	}
}

function DsaveXML2(name) {

	var DAt = [];
	var w = 0;
	var cbxs = document.getElementsByName('Dcbx');
	for (j=0;j<cbxs.length;j++) {
		if(document.getElementsByName('Dcbx')[j].checked) {
			DAt.push([cbxs[j].value,parseInt(document.getElementsByName('Dhead')[j].innerHTML),document.getElementsByName('Dtxt')[j].value]);
		}
	}

	var outfile = '<?xml version="1.0"?><body>';
	for (i in DAp) {
		var lastHead = -1;
		for (j in DAt) {
			if(DAt[j][0] == i) {
				switch(DAt[j][1]) {
					case 9:
						outfile +='<ha><han>'+DAt[j][2] + '</han>';
						lastHead = 9;
					break;
					case 0:
						if(DAt[j-1][0] == i) { // another right before it
							switch (DAt[j-1][1]) {
								case 9:
									outfile +='<h0><h0n>'+DAt[j][2] + '</h0n>';
								break;
							}
						}
						else {
							outfile +='</h4></h3></h2></h1></h0><h0><h0n>'+DAt[j][2] + '</h0n>';
						}
						lastHead = 0;
					break;
					case 1:
						if(DAt[j-1][0] == i) { // another right before it
							switch (DAt[j-1][1]) {
								case 9:
									outfile +='<h0><h0n> </h0n><h1><h1n>'+DAt[j][2] + '</h1n>';
								break;
								case 0:
									outfile +='<h1><h1n>'+DAt[j][2] + '</h1n>';
								break;
							}
						}
						else {
							outfile +='</h4></h3></h2></h1><h1><h1n>'+DAt[j][2] + '</h1n>';
						}
						lastHead = 1;
					break;
					case 2:
						if(DAt[j-1][0] == i) { // another right before it
							switch (DAt[j-1][1]) {
								case 9:
									outfile +='<h0><h0n> </h0n><h1><h1n> </h1n><h2><h2n>'+DAt[j][2] + '</h2n>';
								break;
								case 0:
									outfile +='<h1><h1n> </h1n><h2><h2n>'+DAt[j][2] + '</h2n>';
								break;
								case 1:
									outfile +='<h2><h2n>'+DAt[j][2] + '</h2n>';
								break;
							}
						}
						else {
							outfile +='</h4></h3></h2><h2><h2n>'+DAt[j][2] + '</h2n>';
						}
						lastHead = 2;
					break;
					case 3:
						if(DAt[j-1][0] == i) { // another right before it
							switch (DAt[j-1][1]) {
								case 9:
									outfile +='<h0><h0n> </h0n><h1><h1n> </h1n><h2><h2n> </h2n><h3><h3n>'+DAt[j][2] + '</h3n>';
								break;
								case 0:
									outfile +='<h1><h1n> </h1n><h2><h2n> </h2n><h3><h3n>'+DAt[j][2] + '</h3n>';
								break;
								case 1:
									outfile +='<h2><h2n> </h2n><h3><h3n>'+DAt[j][2] + '</h3n>';
								break;
								case 2:
									outfile +='<h3><h3n>'+DAt[j][2] + '</h3n>';
								break;
							}
						}
						else {
							outfile +='</h4></h3><h3><h3n>'+DAt[j][2] + '</h3n>';
						}
						lastHead = 3;
					break;
					case 4:
						if(DAt[j-1][0] == i) { // another right before it
							switch (DAt[j-1][1]) {
								case 9:
									outfile +='<h0><h0n> </h0n><h1><h1n> </h1n><h2><h2n> </h2n><h3><h3n> </h3n><h4><h4n>'+DAt[j][2] + '</h4n>';
								break;
								case 0:
									outfile +='<h1><h1n> </h1n><h2><h2n> </h2n><h3><h3n> </h3n><h4><h4n>'+DAt[j][2] + '</h4n>';
								break;
								case 1:
									outfile +='<h2><h2n> </h2n><h3><h3n> </h3n><h4><h4n>'+DAt[j][2] + '</h4n>';
								break;
								case 2:
									outfile +='<h3><h3n> </h3n><h4><h4n>'+DAt[j][2] + '</h4n>';
								break;
								case 3:
									outfile +='<h4><h4n>'+DAt[j][2] + '</h4n>';
								break;
							}
						}
						else {
							outfile +='</h4><h4><h4n>'+DAt[j][2] + '</h4n>';
						}
						lastHead = 4;
					break;
				}
			}
		}
		switch(lastHead) {
			case -1:
			break;
			case 9:
				outfile+='<h0><h0n></h0n><h1><h1n></h1n><h2><h2n></h2n><h3><h3n></h3n><h4><h4n></h4n>'
			break;
			case 0:
				outfile+='<h1><h1n></h1n><h2><h2n></h2n><h3><h3n></h3n><h4><h4n></h4n>'
			break;
			case 1:
				outfile+='<h2><h2n></h2n><h3><h3n></h3n><h4><h4n></h4n>'
			break;
			case 2:
				outfile+='<h3><h3n></h3n><h4><h4n></h4n>'
			break;
			case 3:
				outfile+='<h4><h4n></h4n>'
			break;
			case 4:
			break;
		}
			
		outfile+='<p>' + DAp[i] + '</p>'; 
	}
	outfile += '</h4></h3></h2></h1></h0></ha></body>';
	if(writeToDesktop(name+'.xml', outfile)) dalert('File Saved');
	else dalert('File Not Saved');
}

// fudge for numbers in footnotes

function replaceWithThaiNumbers(input) {
	input=input.replace(/0/g,'๐');
	input=input.replace(/1/g,'๑');
	input=input.replace(/2/g,'๒');
	input=input.replace(/3/g,'๓');
	input=input.replace(/4/g,'๔');
	input=input.replace(/5/g,'๕');
	input=input.replace(/6/g,'๖');
	input=input.replace(/7/g,'๗');
	input=input.replace(/8/g,'๘');
	input=input.replace(/9/g,'๙');
}


function DtestSort() {
	list = ['abhi','aabhi','abhii','abbhi.m'];
	list = sortaz(list);
	dalert(list);
}

D_outputStore = '';

function DgroupBySimilarity() {
	devCheck = 2;
	var input = readExtFile('/home/noah/Extensions/work/unmatched').join(',');
	var list = toUni(input.replace(/[0-9 ]/g,'')).split(',');
	var simlist = groupBySimilarity(list,60);
	var output = '';
	for (i in simlist) {
		output += simlist[i].join('\n')+'\n\n';
	}
	writeExtFile('/home/noah/Extensions/work/simwords',output);
	D_outputStore = output;
	devCheck = 1;
}
/*
javascript:writeExtFile('/home/noah/Extensions/work/unmatched','test');

*/


// ATT & TIK Creation

function DMakeAttArray(h) {
	var outa = [];
	var getstring = /\^b\^[^^]+\^eb\^/;
	for (i in G_XMLFileArray) {
		if(i.charAt(0) == 'x') continue;
		if (G_XMLFileArray[i][h] == 1) {
			var a = Dsearch(i+(h==1?'a':'t'),getstring);
			for(c = 0; c < a.length; c++) {

				var b = '#'+i.charAt(0)+'^'+(parseInt(i.substring(1))-1)+'^'+a[c][0]+'^'+a[c][1]+'^'+a[c][2]+'^'+a[c][3]+'^'+a[c][4]+'^'+a[c][5];
				if(typeof(outa[a[c][6]]) == 'string') outa[a[c][6]] += b;
				else outa[a[c][6]] = b;
			}
		}
	}
	
	var a2 = [];
	
	
	for (i in outa) {
		a2.push(i+outa[i]);
	}
	a2 = sortaz(a2);
		
	var out = h==1?"var attlist = [":"tiklist[";

	for (i = 0; i < a2.length-1; i++) {
		out+="'"+a2[i]+"',\n";
	}
	out+="'"+a2[i]+"',\n";
	
	var theDataDiv = document.createElement('div');
	theDataDiv.innerHTML = '<textarea>'+out+'];</textarea>';
	document.getElementById('content').innerHTML = '';
	document.getElementById('content').appendChild(theDataDiv);
}

function Dsearch(file,getstring)
{
	var xmlDoc = loadXMLFile(file,0);
	var u = xmlDoc.getElementsByTagName("h0");
	
	var gotstring;

	var outa = [];
	
	var intext = '';

	var finalout = '';

	var match = 0;
	
	for (var a = 0; a < u.length; a++) // per h0
	{
		var v = u[a].getElementsByTagName("h1");
			
		for (var b = 0; b < v.length; b++) // per h1
		{
			var w = v[b].getElementsByTagName("h2");
		
			for (var c = 0; c < w.length; c++) // per h2
			{

				
				var x = w[c].getElementsByTagName("h3");
				
	
				for (var d = 0; d < x.length; d++) // per h3
				{

					
					var y = x[d].getElementsByTagName("h4");
					
					for (var e = 0; e < y.length; e++) // per h4
					{
						window.dump(a+','+b+','+c+','+d+','+e+'\n');

						var z = y[e].getElementsByTagName("p");		

						for (var f = 0; f < z.length; f++) // per paragraph
						{


							intext = z[f].textContent.substring(4);
							intext = intext.replace(/\{[^}]+\}/g, '');
							intext = intext.replace(/\^a\^[^^]*\^ea\^/g, ''); 
							intext = intext.replace(/[-‘’“”)(,;`'"0-9]/g, ' ');
							intext = intext.replace(/…/g, ' ');
							intext = intext.replace(/ +/g, ' ');
							intext = intext.replace(/Ñ/g, 'ñ');
							intext = intext.replace(/Ā/g, 'ā');
							intext = intext.replace(/Ū/g, 'ū');
							intext = intext.replace(/Ṭ/g, 'ṭ');
							intext = intext.toLowerCase();
							
							startmatch = intext.search(getstring);

							if (startmatch >= 0)
							{
								while (startmatch >= 0)
								{				
									match = 1;
									gotstring = intext.match(getstring)[0];
									
									var os = gotstring.replace(/\^e*b\^/g,'');
									os = os.replace(/\.\.\.* *pe0* *\.*\.\./g, ' pe ');
									os = os.replace(/\.\./g, '.');
									os = os.replace(/^ +/g, '');
									os = os.replace(/ +$/g, '');
									os = os.replace(/\.$/g, '');
									os = os.replace(/ +/g, ' ');

									if(os.length > 1) {
										if(/\. /.exec(os)) {
											var ss = os.split(/ *\. /);
											for (q=0;q<ss.length;q++) {
												ss[q] = ss[q].replace(/^ +/g, '');
												ss[q] = ss[q].replace(/ +$/g, '');
												ss[q] = ss[q].replace(/\.$/g, '');
												ss[q] = ss[q].replace(/ +/g, ' ');
												if(ss[q].length == 0) continue;
												outa.push([a,b,c,d,e,f,ss[q]]);
											}
										}
										else outa.push([a,b,c,d,e,f,os]);

									}
									intext = intext.substring(intext.indexOf(gotstring)+gotstring.length);
									startmatch = intext.search(getstring);
								}
							
							}
						}
					}
				}
			}
		}
	}
	return outa;
}

function mDataLower() {
    mData = sortaz(mData);
    var out = "";
    for (var i = 0; i < mData.length; i++) {
        out += mData[i].toLowerCase() + "<br/>";
    }
    $("body").html(out);
}

function paliCite() {
	var dataout = '';
	var doa = [];
	var xmlDoc = loadXMLFile('g4m',0);
	
	var x = proots.length;
	var y = xmlDoc.getElementsByTagName('h0');
	
	outer:
	for (var b = 0; b < x; b++) {
		var r = proots[b].split('^');
		var ra = [r[0]].concat(r[1].split(' '));
		for (var c = 0; c < y.length; c++) {
			var ya = y[c].getElementsByTagName('h2');
			for (var d = 0; d < ya.length; d++) {
				var yb = ya[d].getElementsByTagName('p');
				out:
				for (var e = 0; e < yb.length; e++) {
					ddump(c+'.'+d+'.'+e+' of '+y.length+'.'+ya.length+'.'+yb.length);
					var f = yb[e].textContent.replace(/(\^b\^[^^]+\^eb\^).+/,"$1").toLowerCase();

					for(var g = 0; g<ra.length;g++) {
						if(f.indexOf(ra[g].replace(/ṃ$/,'')) == -1) {
							continue out;
						}
					}
					doa[b] = c+'.'+d+'.'+e;
					continue outer;
				}
			}
		}
		doa[b] = 'null';
	}
	for (var d = 0; d < x; d++) {
		dataout+= "'"+doa[d]+"',";
	}
	
	writeToDesktop('dpr_roots_temp.js', 'var rootsl = ['+dataout+'];');
}
