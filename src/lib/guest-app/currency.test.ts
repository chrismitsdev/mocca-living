import {describe, expect, it} from 'vitest'
import {parseAmount, parseEcbResponse, parseNbsResponse} from './currency'

const NOW = Date.parse('2026-11-26T12:00:00Z')

const ecb = (overrides: Record<string, unknown> = {}) => ({
  amount: 1,
  base: 'EUR',
  date: '2026-11-26',
  rates: {GBP: 0.83755, RON: 5.344, TRY: 55.6177, USD: 1.0975},
  ...overrides
})

const nbs = (overrides: Record<string, unknown> = {}) => ({
  code: 'EUR',
  date: '2026-11-26',
  parity: 1,
  exchange_buy: 117.2903,
  exchange_middle: 117.6432,
  exchange_sell: 117.9961,
  ...overrides
})

const NO_ECB = {TRY: null, RON: null, GBP: null, USD: null}

describe('parseEcbResponse', () => {
  it('returns each rate with its date and source', () => {
    expect(parseEcbResponse(ecb(), NOW)).toEqual({
      TRY: {rate: 55.6177, date: '2026-11-26', source: 'ecb'},
      RON: {rate: 5.344, date: '2026-11-26', source: 'ecb'},
      GBP: {rate: 0.83755, date: '2026-11-26', source: 'ecb'},
      USD: {rate: 1.0975, date: '2026-11-26', source: 'ecb'}
    })
  })

  it('accepts rates from a few days back (weekends, holidays)', () => {
    expect(parseEcbResponse(ecb({date: '2026-11-21'}), NOW).TRY).not.toBeNull()
  })

  it('rejects rates older than a week', () => {
    expect(parseEcbResponse(ecb({date: '2026-11-18'}), NOW)).toEqual(NO_ECB)
  })

  it('drops only the currency that is missing or broken', () => {
    const result = parseEcbResponse(
      ecb({rates: {TRY: 55.6, RON: 0, GBP: '0.8'}}),
      NOW
    )
    expect(result.TRY?.rate).toBe(55.6)
    expect(result.RON).toBeNull()
    expect(result.GBP).toBeNull()
    expect(result.USD).toBeNull()
  })

  it.each([
    ['another base', ecb({base: 'USD'})],
    ['a malformed date', ecb({date: '26/11/2026'})],
    ['no date', ecb({date: undefined})],
    ['an error body', {message: 'not found'}],
    ['nothing', null]
  ])('rejects %s', (_, json) => {
    expect(parseEcbResponse(json, NOW)).toEqual(NO_ECB)
  })
})

describe('parseNbsResponse', () => {
  it('returns the middle rate with its date and source', () => {
    expect(parseNbsResponse(nbs(), NOW)).toEqual({
      rate: 117.6432,
      date: '2026-11-26',
      source: 'nbs'
    })
  })

  it.each([
    ['another currency', nbs({code: 'USD'})],
    ['a parity other than 1', nbs({parity: 100})],
    ['no middle rate', nbs({exchange_middle: undefined})],
    ['an old date', nbs({date: '2026-11-10'})],
    ['an error body', {error: 'not found'}],
    ['nothing', null]
  ])('rejects %s', (_, json) => {
    expect(parseNbsResponse(json, NOW)).toBeNull()
  })
})

describe('parseAmount', () => {
  it.each([
    ['25', 25],
    ['25.5', 25.5],
    ['25,50', 25.5],
    [' 1 250,75 ', 1250.75],
    ['25.', 25],
    [',5', 0.5],
    ['0', 0]
  ])('reads %j as %d', (text, amount) => {
    expect(parseAmount(text)).toBe(amount)
  })

  it.each(['', '   '])('reads %j as empty', (text) => {
    expect(parseAmount(text)).toBeNull()
  })

  it.each(['abc', '1,2,3', '1.2.3', '-5', '1e3', '.', '€5'])(
    'rejects %j',
    (text) => {
      expect(parseAmount(text)).toBeNaN()
    }
  )
})
