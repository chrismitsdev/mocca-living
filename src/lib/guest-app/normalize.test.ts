import {describe, expect, it} from 'vitest'
import {nameMatches, normalizeConfirmation} from './normalize'

describe('nameMatches', () => {
  it('matches the booker name in any word order and letter case', () => {
    expect(nameMatches('Jane Doe', 'Doe Jane')).toBe(true)
    expect(nameMatches('doe JANE', 'Doe Jane')).toBe(true)
    expect(nameMatches('  Jane    Doe ', 'Doe Jane')).toBe(true)
  })

  it('requires accents exactly as saved', () => {
    expect(nameMatches('Ayşe Şahin', 'Şahin Ayşe')).toBe(true)
    expect(nameMatches('AYŞE ŞAHİN', 'Şahin Ayşe')).toBe(true)
    expect(nameMatches('Ayse Sahin', 'Şahin Ayşe')).toBe(false)
    // Saved without accents: the guest must type it without accents too
    expect(nameMatches('Ayşe Şahin', 'Sahin Ayse')).toBe(false)
  })

  it('treats differently encoded accents as the same letter', () => {
    const decomposed = 'Şahin Ayşe'.normalize('NFD')
    expect(nameMatches('Ayşe Şahin', decomposed)).toBe(true)
  })

  it('handles Turkish and English capital i correctly', () => {
    expect(nameMatches('IŞIK', 'Işık')).toBe(true)
    expect(nameMatches('İLKAY', 'İlkay')).toBe(true)
    expect(nameMatches('IVAN', 'Ivan')).toBe(true)
    expect(nameMatches('Isik', 'Işık')).toBe(false)
  })

  it('needs each booked word once', () => {
    expect(nameMatches('Anna Anna', 'Anna Maria')).toBe(false)
    expect(nameMatches('Anna Maria Anna', 'Anna Maria Anna')).toBe(true)
  })

  it('requires every word: no partial or extra names', () => {
    expect(nameMatches('Jane', 'Doe Jane')).toBe(false)
    expect(nameMatches('Doe', 'Doe Jane')).toBe(false)
    expect(nameMatches('Jane Mary Doe', 'Doe Jane')).toBe(false)
    expect(nameMatches('Maria Petrova', 'Maria Elena Petrova')).toBe(false)
  })

  it('keeps hyphenated names as saved', () => {
    expect(nameMatches('Ayşe Oruç-Coşkun', 'Oruç-Coşkun Ayşe')).toBe(true)
    expect(nameMatches('Ayşe Oruç Coşkun', 'Oruç-Coşkun Ayşe')).toBe(false)
  })

  it('does not transliterate other scripts', () => {
    expect(nameMatches('Иван Костадинов', 'Ivan Kostadinov')).toBe(false)
  })

  it('rejects empty input', () => {
    expect(nameMatches('', 'Doe Jane')).toBe(false)
    expect(nameMatches('   ', 'Doe Jane')).toBe(false)
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
