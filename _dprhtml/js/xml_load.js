'use strict';

var DPR_DataLoader = (function() {
  const loadTipitakaAsync = (id, set) => {
    var url = `${DPR_PAL.baseUrl}tipitaka/${set}/${id}.xml`;
    return XML_Load.xhrGetAsync({ url }, xhr => xhr.responseXML.documentElement);
  };

  const loadPXD = id => {
    var url = `${DPR_PAL.baseUrl}en/ped/${id}/ped.xml`;
    return XML_Load.xhrGetAsync({ url }, xhr => xhr.responseXML.documentElement);
  };

  const loadXDPPN = id => {
    var url = `${DPR_PAL.baseUrl}en/dppn/${id}.xml`;
    return XML_Load.xhrGetAsync({ url }, xhr => xhr.responseXML.documentElement);
  };

  const loadSARoots = id => {
    var url = `${DPR_PAL.baseUrl}sa/roots/${id}.xml`;
    return XML_Load.xhrGetAsync({ url }, xhr => xhr.responseXML.documentElement);
  };

  const loadSADictionary = id => {
    var url = `${DPR_PAL.baseUrl}sa/dict/${id}.xml`;
    return XML_Load.xhrGetAsync({ url }, xhr => xhr.responseXML.documentElement);
  };

  const wrapExceptionHandler = function(fn) {
    return function() {
      try {
        return fn.apply(this, arguments);
      } catch (e) {
        DPR_Chrome.showErrorToast(`Data files for [${[...arguments].join(',')}] not found. Ensure you have the latest components installed. More info: ${e.message}`);
        return null;
      }
    };
  };

  const wrapExceptionHandlerAsync = function(fn) {
    return async function() {
      try {
        return await fn.apply(this, arguments);
      } catch (e) {
        DPR_Chrome.showErrorToast(`Data files for [${[...arguments].join(',')}] not found. Ensure you have the latest components installed. More info: ${e.message}`);
        return null;
      }
    };
  };

  return {
    loadTipitakaAsync: wrapExceptionHandler(loadTipitakaAsync),
    loadPXD: wrapExceptionHandlerAsync(loadPXD),
    loadXDPPN: wrapExceptionHandlerAsync(loadXDPPN),
    loadSARoots: wrapExceptionHandlerAsync(loadSARoots),
    loadSADictionary: wrapExceptionHandlerAsync(loadSADictionary),
  };
})();

function loadXMLFileAsync(file, setNo) {
  if(typeof(setNo) == 'undefined')
    setNo = 0;

  switch(setNo) {
    case 0:
      var set = 'my';
      break;
    case 1:
      var set = 'th';
      break;
  }

  return DPR_DataLoader.loadTipitakaAsync(file, set);
}

var XML_Load = (function () {
  const createXhr = (request, async = true) => {
    let xhr = new XMLHttpRequest();
    xhr.open(request.method || "GET", request.url, async);
    if (request.headers) {
      Object.keys(request.headers).forEach(key => {
        xhr.setRequestHeader(key, request.headers[key]);
      });
    }

    return xhr;
  }

  // REFER: http://ccoenraets.github.io/es6-tutorial-data/promisify/.
  const xhrGetAsync = (request, procFn) => {
    return new Promise((resolve, reject) => {
      let xhr = createXhr(request);
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(procFn(xhr));
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send(request.body);
    });
  };

  return {
    xhrGetAsync: xhrGetAsync,
  };
})();
