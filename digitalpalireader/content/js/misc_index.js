function citation(cite) {
	document.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.makeLinkPlace(cite,false);
}

function reindexPanels(idx) {
	var x = 1;
	while(document.getElementById('dpr-index-top-'+x)) {
		document.getElementById('dpr-index-top-'+x).contentWindow.G_compare = x;
		if(idx)
			if(x > parseInt(idx)) {
				document.getElementById('dpr-index-top-'+x).setAttribute('id','dpr-index-top-'+(x-1));
				document.getElementById('dpr-index-top-'+x+'-splitter').setAttribute('id','dpr-index-top-'+(x-1)+'-splitter');
			}
		}
		x++;
	}
}
alert('here');
function getBrowserCount() {
	var count = document.getElementById('dpr-tops').getElementsByTagName('browser').length;
	return count;
}