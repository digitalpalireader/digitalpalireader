function feedbackform() {
	addToolbar();
	var mafbout = '<form action="http://pali.sirimangalo.org/dprmail.php" method="POST">'
	+ '<p><font size=5><b>Feedback Form</b></font>'
	+ '<p><em>This form allows you to send comments, questions or bug reports directly to the creator of the DPR.<br>'
	+ 'Your email goes straight to me, so there is no need to worry about spam, etc.</em></p>'
	+ '<p>'
	+ '<b>Your Email</b>'
	+ '<br>'
	+ '<input type="text" name="email" size=40>'
	+ '<p>'
	+ '<b>Subject</b>'
	+ '<br>'
	+ '<input type="text" name="subject" size=40>'
	+ '<p>'
	+ '<b>Message</b>'
	+ '<br>'
	+ '<textarea cols=40 rows=10 name="message"></textarea>'
	+ '<p><input type="submit" value=" Send ">'
	+ '</form>';
	document.getElementById('mafbc').innerHTML=mafbout;
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
