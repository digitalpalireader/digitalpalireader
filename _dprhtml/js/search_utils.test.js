import { searchAcrossBoundary } from './search_utils.js'

describe('searchAcrossBoundary', () => {
  test('finds match using string search pattern', () => {
    expect(
      searchAcrossBoundary({
        text: 'abcdefghi',
        searchPattern: 'def',
      }),
    ).toStrictEqual({ start: 3, end: 6, match: 'def' })
  })

  test('finds match using regular expression search pattern', () => {
    expect(
      searchAcrossBoundary({
        text: 'abcdefghi',
        searchPattern: /d[a-z]f/,
      }),
    ).toStrictEqual({ start: 3, end: 6, match: 'def' })
  })

  test('finds match using string boundary pattern', () => {
    expect(
      searchAcrossBoundary({
        text: 'abc##de#fghi',
        searchPattern: 'def',
        boundaryPattern: '#',
      }),
    ).toStrictEqual({ start: 5, end: 9, match: 'de#f' })
  })

  test('finds match using regular expression boundary pattern', () => {
    expect(
      searchAcrossBoundary({
        text: 'abcd@e##f@ghi',
        searchPattern: 'def',
        boundaryPattern: /[#@]+/,
      }),
    ).toStrictEqual({ start: 3, end: 9, match: 'd@e##f' })
  })

  test('returns null if string pattern not found', () => {
    expect(
      searchAcrossBoundary({
        text: 'abcdefghi',
        searchPattern: 'xxx',
      }),
    ).toBeNull()
  })

  test('returns null if regular expression pattern not found', () => {
    expect(
      searchAcrossBoundary({
        text: 'abcdefghi',
        searchPattern: /d[^e]f/i,
      }),
    ).toBeNull()
  })
})
