import '@testing-library/jest-dom'

// TODO [#339]: replace third-party libraries with NPM modules
import jQuery from './_dprhtml/js/external/jquery-3.4.1.min.js'
import knockout from './_dprhtml/js/external/ajax/libs/knockout/3.5.0/knockout-min.js'

import { server } from './_dprhtml/js/mock-server/index.js'

window.$ = jQuery
window.jQuery = jQuery
window.ko = knockout

window.DPR_G = require('./_dprhtml/js/globalObject.js')
window.DPR_PAL = require('./_dprhtml/js/dpr_pal.js')
window.DPR_translitCore_mod = require('./_dprhtml/js/translitCore.js')
window.DPR_translit_mod = require('./_dprhtml/js/translit.js')
window.DPR1_chrome_mod = require('./_dprhtml/js/chrome.js').DPR1_chrome_mod
window.DPR1_format_mod = require('./_dprhtml/js/format.js')
window.DPR_Chrome = require('./_dprhtml/js/chrome.js').DPR_Chrome
window.DPR_navigation_mod = require('./_dprhtml/js/navigation.js')
window.DPR_navigation_common_mod = require('./_dprhtml/js/navigation_common.js')
window.DPR_prefload_mod = require('./_dprhtml/js/prefload.js')
window.DPR_search_mod = require('./_dprhtml/js/web/search.js')
window.DPR_search_utils_mod = require('./_dprhtml/js/search_utils.js')
window.DPR_sortaz_mod = require('./_dprhtml/js/sortaz.js')
window.DPR_translitCore_mod = require('./_dprhtml/js/translitCore.js')
window.DPR_translit_mod = require('./_dprhtml/js/translit.js')
window.XML_Load = require('./_dprhtml/js/xml_load.js').XML_Load

window.focus = jest.fn()

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
