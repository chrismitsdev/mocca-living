import {describe, expect, it} from 'vitest'
import {MAX_READING_AGE_MINUTES, parseBorderResponse} from './border'

const NOW = Date.parse('2026-11-24T12:00:00Z')
const minutesAgo = (minutes: number) =>
  new Date(NOW - minutes * 60_000).toISOString()

function checkpoint(overrides: Record<string, unknown> = {}) {
  return {
    ppid: 'id_487',
    name: 'Kipi',
    wait_min: 25,
    wait_status: 'green',
    queue: 3,
    updated_at: minutesAgo(10),
    stale: false,
    source_url: 'https://nakordoni.eu/en/id/id_487',
    ...overrides
  }
}

const response = (...checkpoints: unknown[]) => ({
  ok: true,
  data: {checkpoints}
})

describe('parseBorderResponse', () => {
  it('returns our crossings in our order, with a reading when valid', () => {
    const result = parseBorderResponse(
      response(
        checkpoint({
          ppid: 'id_901',
          name: 'Kastanies',
          wait_min: 72.4,
          wait_status: 'yellow'
        }),
        checkpoint()
      ),
      'turkey',
      NOW
    )

    expect(result).toEqual([
      {
        id: 'kipi',
        reading: {
          minutes: 25,
          level: 'low',
          updatedAt: minutesAgo(10),
          detailsUrl: 'https://nakordoni.eu/en/id/id_487'
        }
      },
      {
        id: 'kastanies',
        reading: {
          minutes: 72,
          level: 'medium',
          updatedAt: minutesAgo(10),
          detailsUrl: 'https://nakordoni.eu/en/id/id_487'
        }
      }
    ])
  })

  it('ignores checkpoints that are not ours, such as the inactive Kipi entry', () => {
    const result = parseBorderResponse(
      response(checkpoint({ppid: 'id_549', wait_min: 20})),
      'turkey',
      NOW
    )
    expect(result.map((crossing) => crossing.reading)).toEqual([null, null])
  })

  it('shows no number for missing, stale, too old or malformed values', () => {
    const cases = [
      {wait_min: null},
      {wait_min: -5},
      {wait_min: '30'},
      {stale: true},
      {updated_at: 'not a date'},
      {updated_at: minutesAgo(MAX_READING_AGE_MINUTES + 1)}
    ]
    for (const overrides of cases) {
      const [kipi] = parseBorderResponse(
        response(checkpoint(overrides)),
        'turkey',
        NOW
      )
      expect(kipi.reading, JSON.stringify(overrides)).toBeNull()
    }
  })

  it('keeps a reading exactly at the age limit', () => {
    const [kipi] = parseBorderResponse(
      response(checkpoint({updated_at: minutesAgo(MAX_READING_AGE_MINUTES)})),
      'turkey',
      NOW
    )
    expect(kipi.reading?.minutes).toBe(25)
  })

  it('maps both status vocabularies and leaves unknown ones without a level', () => {
    const level = (wait_status: unknown) =>
      parseBorderResponse(response(checkpoint({wait_status})), 'turkey', NOW)[0]
        .reading?.level
    expect(level('green')).toBe('low')
    expect(level('free_flow')).toBe('low')
    expect(level('moderate')).toBe('medium')
    expect(level('red')).toBe('high')
    expect(level('heavy')).toBe('high')
    expect(level('purple')).toBeNull()
    expect(level(null)).toBeNull()
  })

  it('only links to nakordoni.eu', () => {
    const [kipi] = parseBorderResponse(
      response(checkpoint({source_url: 'https://example.com/x'})),
      'turkey',
      NOW
    )
    expect(kipi.reading?.detailsUrl).toBeNull()
  })

  it('returns no readings for an error or an unexpected shape', () => {
    for (const json of [
      {ok: false, error: {code: 'rate_limited'}},
      {ok: true},
      {ok: true, data: {checkpoints: 'x'}},
      null,
      'oops'
    ]) {
      expect(
        parseBorderResponse(json, 'bulgaria', NOW).map(
          (crossing) => crossing.id
        )
      ).toEqual(['nymfaia', 'kyprinos', 'ormenio'])
      expect(
        parseBorderResponse(json, 'bulgaria', NOW).every(
          (crossing) => crossing.reading === null
        )
      ).toBe(true)
    }
  })
})
