import * as IH from './main-core.js'
import * as DprVM from './dprviewmodel.js'

// NOTE: Ensure this is the very first line.
IH.installGlobalHandlers()

/* Start: Legacy stuff - Don't mess with it! */
window.DPR_G.devCheck = 0
// eslint-disable-next-line no-console
window.dump = window.dump || window.DPR_G.devCheck ? console.log : () => { }
window.moveFrame = () => { }
window.devO = () => { }
window.dalert = (_a) => { }
window.ddump = (_a) => { }
/* End: Legacy stuff. */

// NOTE: Ensure these are the very last lines.
ko.applyBindings(DprVM.ViewModel)
document.addEventListener('keypress', DprVM.DprKeyboardHandler)
window.document.addEventListener('DOMContentLoaded', IH.mainInitialize)
