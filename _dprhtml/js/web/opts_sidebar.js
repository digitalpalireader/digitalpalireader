'use strict';

const DPR_Web_Opts_Sidebar = (function () {
  async function tipitakaOptions() {
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
        await DPRNav.setSearchBookList(); // populate books
        break;
      case 3:
        $('#tsoPart').show();
        $('#tsoContainer').show();
        $('#tsoSET').show();
        $('#tsoBOOK').show();
        $('#tsoMAT2').show();
        await DPRXML.updateSearchHierarchyAfterSetSearchBookList(0); // populate sections
        break;
      case 5:
        $('#tsoContainer').show();
        $('#tsoSetContainer').show();
        $('#tsoCO2').show();
        break;
      default:
        break;
    }
  }

  function selAll(id) {
    const cbSelector = `#${id} input`;
    const cbs = $(cbSelector);
    const checkedCbs = $(`#${id} input`).filter(":checked");
    cbs.prop('checked', cbs.length != checkedCbs.length);
  }

  function dictAdvToggle() {
    console.error("This should not have been invoked on web.");
    var ao = $('#dictAdvOpts');
    if (!ao.getAttribute('collapsed')) ao.hide();
    else ao.show();
  }

  function showCheckbox(id) {
    $(`#${id}`).show();
    $(`label[for='${id}']`).show();
  }

  function hideCheckbox(id) {
    $(`#${id}`).hide();
    $(`label[for='${id}']`).hide();
  }

  function dictOptions() {
    var which = $('#dictType').prop("value");

    $('#dictAdvOpts1').hide(); // misc
    $('#dictAdvOpts2').hide(); // mat
    $('#dictAdvOpts3').hide(); // sets
    $('#soNO').hide();
    $('#soFT').hide();
    $('#soSW').hide();
    $('#soRX').hide();
    $('#soFZ').hide();

    switch (which) {
      case 'PED': // ped
        $('#dictAdvOpts1').show();
        $('#soFZ').show();
        $('#soRX').show();
        $('#soFT').show();
        $('#soSW').show();
        break;
      case 'DPPN': // dppn
        $('#dictAdvOpts1').show();
        $('#soFZ').show();
        $('#soRX').show();
        $('#soFT').show();
        $('#soSW').show();
        break;
      case 'CPED': // CPED
        $('#dictAdvOpts1').show();
        $('#soFZ').show();
        $('#soFT').show();
        $('#soRX').show();
        $('#soSW').show();
        break;
      case 'CEPD': // CEPD
        $('#dictAdvOpts1').show();
        $('#soFZ').show();
        $('#soFT').show();
        $('#soRX').show();
        $('#soSW').show();
        break;
      case 'MULTI': // Multi
        $('#dictAdvOpts1').show();
        $('#soFZ').show();
        $('#soFT').show();
        $('#soRX').show();
        $('#soSW').show();
        break;
      case 'ATT': // ATTH
        $('#dictAdvOpts1').show();
        $('#dictAdvOpts3').show();
        $('#soFZ').show();
        $('#soRX').show();
        $('#soSW').show();
        break;
      case 'TIK': // TIKA
        $('#dictAdvOpts1').show();
        $('#dictAdvOpts3').show();
        $('#soFZ').show();
        $('#soRX').show();
        $('#soSW').show();
        break;
      case 'TIT': // Title
        $('#dictAdvOpts1').show();
        $('#dictAdvOpts2').show();
        $('#dictAdvOpts3').show();
        $('#soFZ').show();
        $('#soRX').show();
        $('#soSW').show();
        break;
      default:
        $('#soNO').show();
        break;
    }
  }

  return {
    tipitakaOptions,
    selAll,
    dictAdvToggle,
    showCheckbox,
    hideCheckbox,
    dictOptions,
  }
})()

window.DPROpts = DPR_Web_Opts_Sidebar