'use strict';

function loadXMLFile(file,setNo) {
  var setName;
  if(typeof(setNo) == 'undefined')
    setNo = 0;

  switch(setNo) {
    case 0:
      var setPack = 'DPRMyanmar';
      var setName = 'Myanmar';
      break;
    case 1:
      var setPack = 'DPRThai';
      var setName = 'Thai';
      break;
  }
  try {
    var bookload = DPR_PAL.baseUrl+setPack+'/content/xml/' + file + '.xml';
    var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", bookload, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;

    return xmlDoc;
  }
  catch(ex) {
    alert('XML file '+file+'.xml not found.  Do you have the latest ' + setName + ' Tipitaka extension installed?');
    return null;
  }
}

