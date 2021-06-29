import '@testing-library/jest-dom'

// TODO [#339]: replace third-party libraries with NPM modules
import jQuery from './_dprhtml/js/external/jquery-3.4.1.min'
import knockout from './_dprhtml/js/external/ajax/libs/knockout/3.5.0/knockout-min'

import { server } from './_dprhtml/js/mock-server'

window.$ = jQuery
window.jQuery = jQuery
window.ko = knockout

window.DPR_G = require('./_dprhtml/js/globalObject')
window.DPR_PAL = require('./_dprhtml/js/dpr_pal')
window.DPR_translitCore_mod = require('./_dprhtml/js/translitCore')
window.DPR_translit_mod = require('./_dprhtml/js/translit')
window.DPR1_chrome_mod = require('./_dprhtml/js/chrome').DPR1_chrome_mod
window.DPR1_format_mod = require('./_dprhtml/js/format')
window.DPR_Chrome = require('./_dprhtml/js/chrome').DPR_Chrome
window.DPR_navigation_mod = require('./_dprhtml/js/navigation')
window.DPR_navigation_common_mod = require('./_dprhtml/js/navigation_common')
window.DPR_prefload_mod = require('./_dprhtml/js/prefload')
window.DPR_search_mod = require('./_dprhtml/js/web/search')
window.DPR_search_utils_mod = require('./_dprhtml/js/search_utils')
window.DPR_sortaz_mod = require('./_dprhtml/js/sortaz')
window.DPR_translitCore_mod = require('./_dprhtml/js/translitCore')
window.DPR_translit_mod = require('./_dprhtml/js/translit')
window.XML_Load = require('./_dprhtml/js/xml_load').XML_Load

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
