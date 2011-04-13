

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
