import {describe, expect, it} from 'vitest'
import {mapPropertyName} from './properties'

describe('mapPropertyName', () => {
  it('maps Primal Res property names', () => {
    expect(mapPropertyName('Mocca Living')).toBe('mocca-by-the-sea-dimitra')
    expect(mapPropertyName('Mocca City')).toBe('mocca-city')
  })

  it('maps Hotelo property and room names, case-insensitively', () => {
    expect(mapPropertyName('MOCCA Living Premium Stay')).toBe(
      'mocca-by-the-sea-dimitra'
    )
    expect(mapPropertyName(undefined, 'Villa Dimitra by Mocca Living')).toBe(
      'mocca-by-the-sea-dimitra'
    )
  })

  it('tolerates extra whitespace', () => {
    expect(mapPropertyName('  Mocca   City ')).toBe('mocca-city')
  })

  it('does not map names that merely contain a known name', () => {
    expect(mapPropertyName('Villa Georgia by Mocca Living')).toBeNull()
    expect(mapPropertyName('Mocca City Center Suites')).toBeNull()
  })

  it('returns null when nothing matches', () => {
    expect(mapPropertyName()).toBeNull()
    expect(mapPropertyName('', undefined)).toBeNull()
  })
})
