import {describe, expect, it} from 'vitest'
import {
  htmlToLines,
  parseLongDate,
  parsePax,
  parseSlashDate,
  valueAfter
} from './text'

describe('htmlToLines', () => {
  it('splits cells and rows, decodes entities and drops comments', () => {
    const html =
      '<table><tr><td>Booked By:</td><td>Doe&nbsp;Jane</td></tr></table>' +
      '<!-- <li>hidden</li> --><p>Rate&nbsp;&amp; tax</p>'
    expect(htmlToLines(html)).toEqual(['Booked By: Doe Jane', 'Rate & tax'])
  })
})

describe('valueAfter', () => {
  const lines = ['Name', 'Jane Doe', 'Res ID: 123 - 01/10/2026', 'Name', 'X']

  it('returns the next line when the label stands alone', () => {
    expect(valueAfter(lines, /^Name$/)).toBe('Jane Doe')
  })

  it('returns the rest of the line when present', () => {
    expect(valueAfter(lines, /^Res ID:/)).toBe('123 - 01/10/2026')
  })

  it('can start searching from an index', () => {
    expect(valueAfter(lines, /^Name$/, 2)).toBe('X')
  })
})

describe('dates', () => {
  it('parses dd/mm/yyyy', () => {
    expect(parseSlashDate('02/10/2026')).toBe('2026-10-02')
    expect(parseSlashDate('31/02/2026')).toBeNull()
  })

  it('parses long dates in en/el/tr/bg', () => {
    expect(parseLongDate('Monday, 14 September 2026')).toBe('2026-09-14')
    expect(parseLongDate('Δευτέρα, 14 Σεπτεμβρίου 2026')).toBe('2026-09-14')
    expect(parseLongDate('Cuma, 1 Mayıs 2026')).toBe('2026-05-01')
    expect(parseLongDate('петък, 4 септември 2026')).toBe('2026-09-04')
    expect(parseLongDate('Πέμπτη, 1 Μαΐου 2026')).toBe('2026-05-01')
  })

  it('returns null for unreadable dates', () => {
    expect(parseLongDate('soon')).toBeNull()
    expect(parseLongDate('31 February 2026')).toBeNull()
  })
})

describe('parsePax', () => {
  it('reads the different guest count formats', () => {
    expect(parsePax('1 Rooms, 3 Persons')).toBe(3)
    expect(parsePax('1 Unit, 3 Adults + 1 Children')).toBe(4)
    expect(parsePax('2 adults , 2 children')).toBe(4)
    expect(parsePax(undefined)).toBeNull()
  })
})
