function refreshit()
{
	document.getElementById('mafb').innerHTML='<div style="color:'+colorcfg['coltext']+'" id = "c" align=center><h1>Welcome to the Digital Pali Reader</h1><p>To start, simply choose a book, section and passage on the right side of the screen.</b></p><p>If you encounter any problems, simply press the "*" button to restart the reader.</b></p><p>For detailed instructions, click on the "?" button for the help page.</p<p>For information on updates, visit <b><a href="http://pali.sirimangalo.org/" target="_blank">the project site</a></b>.</b></p><p>If you have questions or feedback, you can try to contact me at <b><a href="mailto:yuttadhammo@gmail.com">yuttadhammo@gmail.com</a></b></p></div><div id="mafd" align=center></div><div id="mafe" align=center></div>';
	if (remote) {
		document.getElementById('mafd').innerHTML += '<p style="color:'+colorcfg['colsel']+'"><b>It seems you have not added the optional archive.  <br>The PED and DPPN will only be available remotely.  <br>Please see <a href="http://www.sourceforge.net/projects/digitalpali">the project site</a> for info on how to get and install this file.</b>';
	}
	var rverse=Math.floor(Math.random()*366)
	document.getElementById('difb').innerHTML = '<h3 name="changecolor" style="color:'+colorcfg['coltext']+'">Quote of the Moment:</h3><p name="changecolor" valign=middle>' + dbv[rverse] + '</p>';
    changenikaya(1);
}
function checkupdate() {
	var hrefd = 'http://sourceforge.net/projects/digitalpali/files/DPR/' + latest + '/DPR_' + latest + '_Update.tar.gz/download';
	var hreff = 'http://sourceforge.net/projects/digitalpali/files/DPR/' + latest + '/DPR_' + latest + '.tar.gz/download';
    if (!document.getElementById('mafe')) return;
	if (latest > version) {
		if (Math.floor(latest) == Math.floor(version)) document.getElementById('mafe').innerHTML = '<p style="color:'+colorcfg['green']+'"><img src="images/caution.png" width=20><b>There is a new update available.  Download: <a href="'+ hrefd + '" target="_blank" style="color:'+colorcfg['blue']+'" title="use this to overwrite changed files only">update</a> or <a href="'+ hreff + '" target="_blank"  title="download entire project (latest version)" style="color:'+colorcfg['blue']+'">full archive</a></b></p>';	
        else document.getElementById('mafe').innerHTML = '<p style="color:'+colorcfg['green']+'"><img src="images/caution.png" width=20><b>There is a new update available.  (<a href="'+ hreff + '" target="_blank"  title="download entire project (latest version)" style="color:'+colorcfg['blue']+'">download</a>)</b></p>';
        
	}
	else if (latest == version) {
		document.getElementById('mafe').innerHTML = '<p class="green"><b>You are using the latest version of the DPR.</b>';
	}
	else {
		document.getElementById('mafe').innerHTML = '<p class="yellow"><img src="images/caution.png" width=20> <a href="https://sourceforge.net/project/platformdownload.php?group_id=164784&sel_platform=4716" target="_blank"><b>Could not contact the update server.</b></a></p>';
	}
}
var ckup = 0;
