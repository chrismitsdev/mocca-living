import {describe, expect, it} from 'vitest'
import {addDays, zonedDate, zonedTimeToEpochMs} from './time'

const ATHENS = 'Europe/Athens'
const iso = (epochMs: number) => new Date(epochMs).toISOString()

describe('zonedTimeToEpochMs', () => {
  it('uses UTC+3 in summer', () => {
    expect(iso(zonedTimeToEpochMs('2026-08-15', '11:00', ATHENS))).toBe(
      '2026-08-15T08:00:00.000Z'
    )
  })

  it('uses UTC+2 in winter', () => {
    expect(iso(zonedTimeToEpochMs('2026-12-15', '11:00', ATHENS))).toBe(
      '2026-12-15T09:00:00.000Z'
    )
  })

  it('handles the day DST ends (last Sunday of October)', () => {
    // 2026-10-25: clocks go back from 04:00 EEST to 03:00 EET
    expect(iso(zonedTimeToEpochMs('2026-10-25', '00:00', ATHENS))).toBe(
      '2026-10-24T21:00:00.000Z'
    )
    expect(iso(zonedTimeToEpochMs('2026-10-25', '11:00', ATHENS))).toBe(
      '2026-10-25T09:00:00.000Z'
    )
  })

  it('handles the day DST starts (last Sunday of March)', () => {
    // 2026-03-29: clocks go forward from 03:00 EET to 04:00 EEST
    expect(iso(zonedTimeToEpochMs('2026-03-29', '00:00', ATHENS))).toBe(
      '2026-03-28T22:00:00.000Z'
    )
    expect(iso(zonedTimeToEpochMs('2026-03-29', '15:00', ATHENS))).toBe(
      '2026-03-29T12:00:00.000Z'
    )
  })
})

describe('zonedDate', () => {
  it('returns the local calendar date', () => {
    // 22:30 UTC is already the next day in Athens
    expect(zonedDate(Date.parse('2026-08-15T22:30:00Z'), ATHENS)).toBe(
      '2026-08-16'
    )
  })
})

describe('addDays', () => {
  it('crosses month and year boundaries', () => {
    expect(addDays('2026-12-30', 3)).toBe('2027-01-02')
    expect(addDays('2026-03-01', -1)).toBe('2026-02-28')
  })
})
