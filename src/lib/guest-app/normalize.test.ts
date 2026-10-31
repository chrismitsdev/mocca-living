import {describe, expect, it} from 'vitest'
import {
  nameTokens,
  normalizeConfirmation,
  surnameMatches,
  toLatin
} from './normalize'

describe('toLatin', () => {
  it('strips diacritics', () => {
    expect(toLatin('Gündoğdu Çağla Şimşek')).toBe('gundogdu cagla simsek')
  })

  it('handles Latin letters that do not decompose', () => {
    expect(toLatin('Işık Straße')).toBe('isik strasse')
  })

  it('transliterates Greek', () => {
    expect(toLatin('Παπαδόπουλος')).toBe('papadopoulos')
    expect(toLatin('Χατζηαντώνης')).toBe('chatziantonis')
    expect(toLatin('Ευαγγελία Μπαλτά')).toBe('evangelia mpalta')
  })

  it('transliterates Bulgarian Cyrillic', () => {
    expect(toLatin('Костадинов')).toBe('kostadinov')
    expect(toLatin('Щерев Жеков')).toBe('shterev zhekov')
  })
})

describe('nameTokens', () => {
  it('splits on spaces, hyphens and punctuation', () => {
    expect(nameTokens('Ayşe Oruç-Coşkun')).toEqual(['ayse', 'oruc', 'coskun'])
  })
})

describe('surnameMatches', () => {
  const booked = ['Doe Jane', 'Jane Doe (for 3 persons, 3 Adults)']

  it('matches regardless of name order and case', () => {
    expect(surnameMatches('doe', booked)).toBe(true)
    expect(surnameMatches('JANE', booked)).toBe(true)
  })

  it('ignores diacritics on either side', () => {
    expect(surnameMatches('Gundogdu', ['Gündoğdu Ayla'])).toBe(true)
    expect(surnameMatches('Gündoğdu', ['Gundogdu Ayla'])).toBe(true)
  })

  it('matches a surname typed in Cyrillic against a Latin booking', () => {
    expect(surnameMatches('Костадинов', ['Ivan Kostadinov'])).toBe(true)
  })

  it('matches a surname typed in Greek against a Latin booking', () => {
    expect(surnameMatches('Παπαδόπουλος', ['Nikos Papadopoulos'])).toBe(true)
  })

  it('absorbs common transliteration variants', () => {
    expect(surnameMatches('Hristov', ['Petar Christov'])).toBe(true)
    expect(surnameMatches('Хаджиев', ['Georgi Hadzhiev'])).toBe(true)
  })

  it('accepts a multi-word surname when every word matches', () => {
    expect(surnameMatches('Oruc Coskun', ['Ayse Oruc-Coskun'])).toBe(true)
    expect(surnameMatches('Oruc Smith', ['Ayse Oruc-Coskun'])).toBe(false)
  })

  it('rejects a different surname', () => {
    expect(surnameMatches('Smith', booked)).toBe(false)
  })

  it('rejects empty or too-short input', () => {
    expect(surnameMatches('', booked)).toBe(false)
    expect(surnameMatches('  ', booked)).toBe(false)
    expect(surnameMatches('Do', ['Do Van'])).toBe(false)
  })
})

describe('normalizeConfirmation', () => {
  it('normalises the three channel formats', () => {
    expect(normalizeConfirmation(' 1234 567 890 ')).toBe('1234567890')
    expect(normalizeConfirmation('hm9abc12de')).toBe('HM9ABC12DE')
    expect(normalizeConfirmation('#12345678')).toBe('12345678')
    expect(normalizeConfirmation('1234-5678')).toBe('12345678')
  })
})
