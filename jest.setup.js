// TODO [#339]: replace third-party libraries with NPM modules
import jQuery from './_dprhtml/js/external/jquery-3.4.1.min';
import knockout from './_dprhtml/js/external/ajax/libs/knockout/3.5.0/knockout-min';

window.jQuery = jQuery;
window.ko = knockout;

window.DPR_G = require('./_dprhtml/js/globalObject');
window.DPR_PAL = require('./_dprhtml/js/dpr_pal');
window.DPR_prefload_mod = require('./_dprhtml/js/prefload');
