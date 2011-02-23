function feedbackform() {
	var mafbout = '<form action="http://pali.sirimangalo.org/dprmail.php" method="POST">'
	+ '<p><font size=5><b>Feedback Form</b></font>'
	+ '<p><em>This form allows you to send comments, questions or bug reports directly to the creator of the DPR.<br>'
	+ 'Your email goes straight to me, so there is no need to worry about spam, etc.</em></p>'
	+ '<p>'
	+ '<b>Your Email</b>'
	+ '<br>'
	+ '<input type="text" name="email" size=40>'
	+ '<p>'
	+ '<b>Subject</b>'
	+ '<br>'
	+ '<input type="text" name="subject" size=40>'
	+ '<p>'
	+ '<b>Message</b>'
	+ '<br>'
	+ '<textarea cols=40 rows=10 name="message"></textarea>'
	+ '<p><input type="submit" value=" Send ">'
	+ '</form>';
	document.getElementById('mafbc').innerHTML=mafbout;
}

