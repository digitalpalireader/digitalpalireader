

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
