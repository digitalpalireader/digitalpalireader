'use strict';

var DPR_receive_mod = ( function () {

function makeLocPlace(inplace) {
  var outplace;
  var place = inplace.split('.');

  if (place.length == 8 || /[vdmaskyxbgn]\.[0-9]+\.[mat]/.test(inplace)) {
    outplace = place;
  }
  else if (place.length == 9) {
    outplace = place;
    outplace[8] = parseInt(outplace[8]);
  }
  else { // shorthand
    outplace = DPR_navigation_common_mod.convertShortLink(inplace);
    if(outplace[0] === false)
      outplace = null;
  }
  return outplace;
}

return {
makeLocPlace : makeLocPlace
}
})()
