function getSelected() {
	var txt = '';
	if (window.getSelection) {
		txt = window.getSelection();
	}
	else if (document.getSelection)	{
		txt = document.getSelection();
	}
	else if (document.selection) {
		txt = document.selection.createRange().text;
	}
	return txt;
}


function convert()
{
	var spell = document.convertor.input.value;

	for (Count = 1; Count < 5; Count++) 
	{
		if (document.convertor.R1[Count].checked)
		break;
	}
	for (Counta = 1; Counta < 5; Counta++) 
	{
		if (document.convertor.R2[Counta].checked)
		break;
	}
	if (Count == 1)
	{
		if (Counta == 2) // Unicode to velthius
		{
            spell = replacevelstandard(spell);
		}
		else if (Counta == 3) // Unicode to Thai
		{

            spell = replacevelstandard(spell);
			spell = thaiconv(spell);
		}
		else if (Counta == 4) // Unicode to Deva
		{

            spell = replacevelstandard(spell);
			spell = todeva(spell);
		}
		else if (Counta == 5) // Unicode to Myan
		{

            spell = replacevelstandard(spell);
			spell = toMyanmar(spell);
		}
	}
	else if (Count == 2)
	{
		if (Counta == 1) // Velthius to unicode
		{
            spell = replaceunistandard(spell);
		}
		else if (Counta == 3) // Velthius to Thai
		{
			spell = thaiconv(spell);
		}			
		else if (Counta == 4) // Velthius to Deva
		{
			spell = todeva(spell);
		}			
		else if (Counta == 5) // Velthius to Myan
		{
			spell = toMyanmar(spell);
		}			
	}
	document.getElementById('output').value = spell;	
}



function changeit(what,which)
{
	if (what == 'u')
	{
		
		if (which == 1 && document.convertor.R2[1].checked) document.convertor.R2[2].checked = true;
		else if (which == 2 && document.convertor.R1[1].checked) document.convertor.R1[2].checked = true;
	}
	else if (what == 'v')
	{
		
		if (which == 1 && document.convertor.R2[2].checked) document.convertor.R2[1].checked = true;
		else if (which == 2 && document.convertor.R1[2].checked) document.convertor.R1[1].checked = true;
	}
	convert();
}
function clearboth()
{
	document.convertor.input.value = '';
	document.convertor.output.value = '';
}

function sendtoconvert(data)
{
	data = data.replace(/\u00B7/g, '\'');
	data = data.replace(/\u00B4/g, '\"');
	data = data.replace(/ M /g, ' ');
	data = data.replace(/ V /g, ' ');
	data = data.replace(/ P /g, ' ');
	data = data.replace(/ T /g, ' ');
	data = data.replace(/ VAR /g, ' ');
	data = data.replace(/  *,/g, ',')

	moveframex(2)
	moveframey('cof');
	document.convertor.R1[1].checked = true;
	document.convertor.R2[2].checked = true;
	document.convertor.output.value = '';
	document.convertor.input.value = data;
	convert();
}
