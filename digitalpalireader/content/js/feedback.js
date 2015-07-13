function feedbackform() {
	var outNode = document.createElement('iframe');
	outNode.setAttribute('frameBorder','0');
	outNode.setAttribute('width','100%');
	outNode.setAttribute('height',(document.getElementById('maf').offsetHeight-64)+'px');
	outNode.setAttribute('src','contact.htm');
	$('#mafbc').html('');
	document.getElementById('mafbc').appendChild(outNode);
}

