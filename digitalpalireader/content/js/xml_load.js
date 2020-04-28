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
    DPR_Chrome.showErrorToast('XML file '+file+'.xml not found.  Do you have the latest ' + setName + ' Tipitaka extension installed?');
    return null;
  }
}

var XML_Load = (function () {
  const xhrGetAsync = request => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(request.method || "GET", request.url);
      if (request.headers) {
        requestect.keys(request.headers).forEach(key => {
          xhr.setRequestHeader(key, request.headers[key]);
        });
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseXML.documentElement);
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send(request.body);
    });
  };

  const loadXMLFile = async (file, setNo) => {
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
      const xmlDoc = await xhrGetAsync({ url: `${DPR_PAL.baseUrl}${setPack}/content/xml/${file}.xml` });
      return xmlDoc;
    }
    catch(ex) {
      DPR_Chrome.showErrorToast('XML file ' + file + '.xml not found.  Do you have the latest ' + setName + ' Tipitaka extension installed?');
      return null;
    }
  }

  return {
    loadXMLFile: loadXMLFile,
  };
})();
