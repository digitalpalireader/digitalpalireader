function hiddenout(name)
{
	var td1 = name;
	var td2 = 'html' + name;
	var hbutton = 'hiderbutton' + name;
	
	document.getElementById(td1).setAttribute('class','');
	document.getElementById(td2).setAttribute('class','');
	document.getElementById(hbutton).value = '-';
	document.getElementById(hbutton).setAttribute('onClick','hiddenin(\'' + name + '\')');	
}
function hiddenin(name)
{
	var td1 = name;
	var td2 = 'html' + name;
	var hbutton = 'hiderbutton' + name;
	
	document.getElementById(td1).setAttribute('class','hide');
	document.getElementById(td2).setAttribute('class','hide');
	document.getElementById(hbutton).value = '+';
	document.getElementById(hbutton).setAttribute('onClick','hiddenout(\'' + name + '\')');	
}
