
function sendSearch() {

	if(!checkGetstring(document.form.isearch.value)) return;
	
	var which = document.getElementById('tipType').selectedIndex;
	
	if(which == 3 || which == 6 || which == 10 || which == 13) return;
	
	if(which == 15) { // Dev
		DevInput(document.form.isearch.value);
		return;
	}


	// get options
	
	if(which > 6) {
		var MAT = (document.getElementById('tsoMATm').checked ? 'm' : '') + (document.getElementById('tsoMATa').checked ? 'a' : '') + (document.getElementById('tsoMATt').checked ? 't' : '');
	}
	else var MAT = hier;

	if(which == 0 || which == 4 || which == 7 || which == 11) {
		var set = ''
		for (i in G_nikToNumber) {
			if(document.getElementById('tsoCO'+i).checked) set += i;
		}
	}
	else var set = document.form.nik.value;
	
	if(which == 5 || which == 12) {
		var book = [];
		for (i = 0; i < nikvoladi[document.form.nik.value]; i++) {
			if(document.getElementById('tsoBObook' + i).checked) book.push(i);
		}
		book = book.join(',');
	}
	else book = document.form.book.value;

	document.form.usearch.value = toUni(document.form.isearch.value).toLowerCase(); 

	var rx = document.form.tsoregexp.checked;



	var permalink = 'chrome://digitalpalireader/content/search.htm' + '?type='+which+'&query=' + toVel(document.form.isearch.value).toLowerCase() + '&MAT=' + MAT + '&set=' + set + '&book=' + book + '&rx=' + rx;

	openDPRTab(permalink);

}


function tipitakaOptions() {
	
	document.getElementById('tsoMAT').style.display = 'none';
	document.getElementById('tsoCO1').style.display = 'none';
	document.getElementById('tsoCO2').style.display = 'none';
	document.getElementById('tsoCO3').style.display = 'none';
	document.getElementById('tsoBO').style.display = 'none';
	
	var which = document.getElementById('tipType').selectedIndex;
	switch(which) {
		case 4:
			document.getElementById('tsoCO1').style.display = 'block';
			document.getElementById('tsoCO2').style.display = 'block';
			document.getElementById('tsoCO3').style.display = 'block';
		break;
		case 5:
			document.getElementById('tsoBO').style.display = 'block';
		break;
		case 7:
			document.getElementById('tsoMAT').style.display = 'block';
		break;
		case 8:
			document.getElementById('tsoMAT').style.display = 'block';
		break;
		case 9:
			document.getElementById('tsoMAT').style.display = 'block';
		break;
		case 11:
			document.getElementById('tsoMAT').style.display = 'block';
			document.getElementById('tsoCO1').style.display = 'block';
			document.getElementById('tsoCO2').style.display = 'block';
			document.getElementById('tsoCO3').style.display = 'block';
		break;
		case 12:
			document.getElementById('tsoMAT').style.display = 'block';
			document.getElementById('tsoBO').style.display = 'block';
		break;
		case 14:
			document.getElementById('tsoCO2').style.display = 'block';
		break;
		default:
		break;
	}
}

function checkGetstring(getstring) {

	var stringra = [];
	
	var yesplus = getstring.indexOf('+');
	if (yesplus >= 0)
	{
		stringra = getstring.split('+');
	}
	if (getstring.length < 3)
	{
		alertFlash("Minimum three letter search length",'yellow');
		document.getElementById('sbfb').innerHTML='<div align = center><br><br><br><br><br><h1 id = "c">ready</h1></div>';
		document.getElementById('sbfa').innerHTML='';
		document.getElementById('sbfab').innerHTML='';
		return false;
	}
	if (stringra.length > 3)
	{
		alertFlash("Maximum three strings per search",'yellow');
		document.getElementById('sbfb').innerHTML='<div align = center><br><br><br><br><br><h1 id = "c">ready</h1></div>';
		document.getElementById('sbfa').innerHTML='';
		return false;
	}
	for (var s = 0; s < stringra.length; s++)
	{
		if (stringra[s].length < 3 && stringra.length > 0)
		{
			alertFlash("Minimum three letter search length",'yellow');
			document.getElementById('sbfb').innerHTML='<div align = center><br><br><br><br><br><h1 id = "c">ready</h1></div>';
			document.getElementById('sbfa').innerHTML='';
			document.getElementById('sbfab').innerHTML='';
			return false;
		}
	}
	return true;
}
