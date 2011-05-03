var moveat = 2;

function moveframex(a,temp) //read, etc
{
    if(!temp) getconfig();

}

function moveframey(a) //dict, conv, or scratch
{
	if(a == 'dif' || a == 'cdif') a = 'difout';

	if (moveat == 1) moveframex(2);
	
	var fa = ['difout','cof','scf'];

    document.getElementById('difout').style.display="none";
	document.getElementById('cof').style.display="none";
	document.getElementById('scf').style.display="none";

	document.getElementById(a).style.display="block";
}

var cpout = 1;


function moveframec() // open close control panel
{

}
G_cpspeed = 50;
function closeCP(wR) {

}
function openCP(wR) {

}

function cpFlatten(cpin) {
	var cpt = document.getElementById(cpin);
	var cptt = document.getElementById(cpin+'t');
	if(cpt.style.display=='none') {
		cpt.style.display='block';
		cptt.style.display='none';
		setMiscPref(cpin,'1');
	}
	else {
		cpt.style.display='none';
		cptt.style.display='block';
		setMiscPref(cpin,'0');
	}
}

function showHideId(a) {
	var sopts = document.getElementById(a);
	if(sopts.style.display=='block') {
		sopts.style.display='none';
	}
	else {
		sopts.style.display='block';
	}
}

function moves(a) // search open / close
{
}

function moveanf(which) {

}

function scrolldown(much)
{
	if (much == 'alert')
	{
		//alert('Scroll distance = ' + document.getElementById('maf').scrollTop);
		scrollmuch=document.getElementById('maf').scrollTop;
	}
	else document.getElementById('maf').scrollTop=much;
}

function getlink(which)
{
	var linkfile = which + '.htm';
	parent.mainFrame.location = linkfile;
	scrollmuch = bookmarklink[which-1];
}

function changelang(lang) {
	var langc = document.getElementById('lang').value;
	parent.mainFrame.yt = eval('parent.mainFrame.'+langc+'t');
}

function go_anchor(mydiv,n){
    document.getElementById(mydiv).scrollTop = document.getElementById(n).offsetTop;
}


function scrollToId(a,b) {
	if(a=='search') a = 'sbfbc';
	if(a=='dif') a = 'cdif';
	document.getElementById(a).scrollTop=(typeof(b) == 'number' ? b : document.getElementById(b).offsetTop);
}
