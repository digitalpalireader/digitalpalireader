import DPR_G from './globalObject.js'
import { searchTipitaka, SearchType } from './search.js'

describe('searchTipitaka', () => {
  beforeEach(() => {
    $('<div/>', { id: 'finished' }).appendTo('body')
    $('<div/>', { id: 'sbfab' }).appendTo('body')
    $('<div/>', { id: 'sbfb' }).appendTo('body')
    $('<div/>', { id: 'sbfbc' }).appendTo('body')
    $('<div/>', { id: 'searchb' }).appendTo('body')
    $('<div/>', { id: 'search-link' }).appendTo('body')
    $('<div/>', { id: 'search-sets' }).appendTo('body')
  })

  test('generates the correct permalink when searching', async () => {
    const sectionId = 0
    const searchType = SearchType.SINGLE_BOOK
    const searchString = 'pahūte'
    const searchMAT = 'm'
    const searchSet = 'k'
    const searchBook = '1'
    const searchPart = '1'
    const searchRX = false
    await searchTipitaka(
      sectionId,
      searchType,
      searchString,
      searchMAT,
      searchSet,
      searchBook,
      searchPart,
      searchRX,
    )

    expect(DPR_G.G_searchLink).toBe(
      'http://localhost/_dprhtml/index.html?feature=search&type=2&query=pahuute&MAT=m&set=k&book=1&part=1&rx=false',
    )
    expect($('#0qpahūteq').text()).toMatchInlineSnapshot(
      '"KN Kh.p.,  7. tirokuṭṭasuttaṃ (KN 1.7), para. 5 ⇒pahūte annapānamhi, khajjabhojje upaṭṭhite. "',
    )
    expect($('#1qpahūteq').text()).toMatchInlineSnapshot(
      '"KN Kh.p.,  7. tirokuṭṭasuttaṃ (KN 1.7), para. 13 ⇒pahūte annapānamhi, sakkaccaṃ anumodare. "',
    )
  })
})
