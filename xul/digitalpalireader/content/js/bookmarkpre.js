function hiddenout(name)
{
  var td1 = name;
  var td2 = 'html' + name;
  var hbutton = 'hiderbutton' + name;

  document.getElementById(td1).style.display="block";
  document.getElementById(td2).style.display="block";
  document.getElementById(hbutton).innerHTML = '-';
  document.getElementById(hbutton).setAttribute('onClick','hiddenin(\'' + name + '\')');
}
function hiddenin(name)
{
  var td1 = name;
  var td2 = 'html' + name;
  var hbutton = 'hiderbutton' + name;

  document.getElementById(td1).style.display="none";
  document.getElementById(td2).style.display="none";
  document.getElementById(hbutton).innerHTML = '+';
  document.getElementById(hbutton).setAttribute('onClick','hiddenout(\'' + name + '\')');
}
