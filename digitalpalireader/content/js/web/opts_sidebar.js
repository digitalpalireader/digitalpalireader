if (DPR_PAL.isWeb) {
  console.log('Loading opts_sidebar.js...');
} else {
  console.log('Cannot opts_sidebar.js for the wrong platform', DPR_PAL);
}

var DPROpts = {
  tipitakaOptions: function () {
    $('#tsoContainer').hide();
    $('#tsoSetContainer').hide();
    $('#tsoSET').hide();
    $('#tsoBOOK').hide();
    $('#tsoPart').hide();
    $('#tsoMAT').hide();
    $('#tsoMAT2').hide();
    $('#tsoCO1').hide();
    $('#tsoCO2').hide();
    $('#tsoCO3').hide();
    $('#tsoBO').hide();

    const which = $('#tipType').prop('selectedIndex');
    switch (which) {
      case 0:
        $('#tsoContainer').show();
        $('#tsoSetContainer').show();
        $('#tsoMAT').show();
        $('#tsoCO1').show();
        $('#tsoCO2').show();
        $('#tsoCO3').show();
        break;
      case 1:
        $('#tsoContainer').show();
        $('#tsoSET').show();
        $('#tsoMAT2').show();
        $('#tsoBO').show();
        break;
      case 2:
        $('#tsoContainer').show();
        $('#tsoSET').show();
        $('#tsoBOOK').show();
        $('#tsoMAT').show();
        DPRNav.setSearchBookList(); // populate books
        break;
      case 3:
        $('#tsoPart').show();
        $('#tsoContainer').show();
        $('#tsoSET').show();
        $('#tsoBOOK').show();
        $('#tsoMAT2').show();
        DPRXML.updateSearchHierarchy(0); // populate sections
        break;
      case 5:
        $('#tsoContainer').show();
        $('#tsoSetContainer').show();
        $('#tsoCO2').show();
        break;
      default:
        break;
    }
  },

  selAll: function (id) {
    const cbSelector = `#${id} input`;
    const cbs = $(cbSelector);
    const checkedCbs = $(`#${id} input`).filter(":checked");
    cbs.prop('checked', cbs.length != checkedCbs.length);
  }

}
