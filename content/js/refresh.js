function refreshit(which)
{
	document.getElementById('mafa').innerHTML='';
	document.getElementById('mafb').innerHTML='<div style="color:'+colorcfg['coltext']+'" id = "c" align=center><h1>Welcome to the Digital Pali Reader</h1><p>To start, simply choose a book, section and passage on the right side of the screen.</p><p>If you encounter any problems, simply press the "*" button to restart the reader.</p><p>For detailed instructions, click on the "?" button for the help page.</p><p>For information on updates, visit <b><a href="http://pali.sirimangalo.org/" target="_blank">the project site</a></b>.</p><p>If you have questions or feedback, you can try to contact me at <b><a href="mailto:yuttadhammo@gmail.com">yuttadhammo@gmail.com</a></b></p></div><div id="mafd" align=center>&nbsp;</div><div id="mafe" align=center>&nbsp;</div>';
	bv();
    changenikaya(1);
    if (which == 1) { // coming from reset options.
		document.getElementById('mafe').innerHTML='<b style="color:'+colorcfg['colsel']+'">Options reset.</b>';
	}
}
