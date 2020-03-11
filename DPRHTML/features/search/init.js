var searchType = 0;
var searchString = '';
var searchMAT = '';
var searchSet = '';
var searchBook = 0;
var searchPart = 0;
var searchRX = false;

const setSearchParams = () => {
  DPRNav.setSearchBookList();
  DPROpts.tipitakaOptions();
  const urlParams = window.location.search.substring(1, window.location.search.length).split('&');
  urlParams.forEach(parameter => {
    parameterSections = parameter.split('=');
    switch (parameterSections[0]) {
      case 'type':
        searchType = parseInt(parameterSections[1], 10);
        break;
      case 'query':
        searchString = decodeURIComponent(parameterSections[1]);
        break;
      case 'MAT':
        searchMAT = parameterSections[1];
        break;
      case 'set':
        searchSet = parameterSections[1];
        break;
      case 'book':
        searchBook = parameterSections[1];
        break;
      case 'part':
        searchPart = parameterSections[1];
        break;
      case 'rx':
        searchRX = parameterSections[1];
        break;
    }
  });
}

searchHandler = event => {
  DPRSend.sendSearch(DPRSend.eventSend(event));
  setSearchParams();
}

const initializeSearchSidebarTab = () => {
  setSearchParams();

  DPR_PAL.enablePopover('#isearchInfo', 'click', 'bottom');
}

const initializeSearchFeature = () => {
  getconfig();
  searchTipitaka(searchType,searchString,searchMAT,searchSet,searchBook,searchPart,searchRX);
}
