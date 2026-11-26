import {describe, expect, it} from 'vitest'
import {parseAmount, parseRateResponse} from './currency'

const NOW = Date.parse('2026-11-26T12:00:00Z')

const response = (overrides: Record<string, unknown> = {}) => ({
  amount: 1,
  base: 'EUR',
  date: '2026-11-26',
  rates: {TRY: 55.6177},
  ...overrides
})

describe('parseRateResponse', () => {
  it('returns the rate and its date', () => {
    expect(parseRateResponse(response(), NOW)).toEqual({
      ok: true,
      rate: 55.6177,
      date: '2026-11-26'
    })
  })

  it('accepts a rate from a few days back (weekends, holidays)', () => {
    expect(parseRateResponse(response({date: '2026-11-21'}), NOW).ok).toBe(true)
  })

  it('rejects a rate older than a week', () => {
    expect(parseRateResponse(response({date: '2026-11-18'}), NOW)).toEqual({
      ok: false
    })
  })

  it.each([
    ['another base', response({base: 'USD'})],
    ['no lira rate', response({rates: {USD: 1.05}})],
    ['a zero rate', response({rates: {TRY: 0}})],
    ['a negative rate', response({rates: {TRY: -3}})],
    ['a text rate', response({rates: {TRY: '55.6'}})],
    ['a malformed date', response({date: '26/11/2026'})],
    ['no date', response({date: undefined})],
    ['an error body', {message: 'not found'}],
    ['nothing', null]
  ])('rejects %s', (_, json) => {
    expect(parseRateResponse(json, NOW)).toEqual({ok: false})
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
