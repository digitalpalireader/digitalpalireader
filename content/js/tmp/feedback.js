function feedbackform() {
	moveframex(1);
	moves();

	var outNode = document.createElement('iframe');
	outNode.setAttribute('frameBorder','0');
	outNode.setAttribute('width','100%');
	outNode.setAttribute('height',(document.getElementById('maf').offsetHeight-64)+'px');
	outNode.setAttribute('src','contact.htm');
	document.getElementById('mafbc').innerHTML='';
	document.getElementById('mafbc').appendChild(outNode);
}

