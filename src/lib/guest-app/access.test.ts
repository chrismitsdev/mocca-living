import {describe, expect, it} from 'vitest'
import {checkAccess, windowDecision} from './access'
import type {Reservation} from './store/reservations'

const reservation = (overrides: Partial<Reservation> = {}): Reservation => ({
  confirmation: '1234567890',
  channel: 'booking',
  property: 'mocca-city',
  status: 'confirmed',
  bookerName: 'Doe Jane',
  checkIn: '2026-10-02',
  checkOut: '2026-10-04',
  pax: 3,
  sourceUpdatedAt: '2026-10-01T06:05:00.000Z',
  audit: [],
  ...overrides
})

const at = (iso: string) => Date.parse(iso)

describe('checkAccess', () => {
  it('allows a matching guest during the stay', () => {
    expect(
      checkAccess(reservation(), 'jane doe', at('2026-10-03T12:00:00Z'))
    ).toEqual({
      ok: true,
      property: 'mocca-city',
      endsAt: at('2026-10-04T08:00:00Z')
    })
  })

  it('opens at 00:00 Athens time on the arrival date', () => {
    // 2026-10-02 00:00 EEST = 2026-10-01 21:00 UTC
    expect(
      checkAccess(reservation(), 'Jane Doe', at('2026-10-01T20:59:59Z'))
    ).toEqual({
      ok: false,
      reason: 'not-yet',
      opensAt: at('2026-10-01T21:00:00Z')
    })
    expect(
      checkAccess(reservation(), 'Jane Doe', at('2026-10-01T21:00:00Z')).ok
    ).toBe(true)
  })

  it('closes at 11:00 Athens time on the departure date', () => {
    expect(
      checkAccess(reservation(), 'Jane Doe', at('2026-10-04T07:59:59Z')).ok
    ).toBe(true)
    expect(
      checkAccess(reservation(), 'Jane Doe', at('2026-10-04T08:00:00Z'))
    ).toEqual({ok: false, reason: 'ended'})
  })

  it('honours an owner extension', () => {
    const extended = reservation({
      accessUntilOverride: '2026-10-04T12:00:00.000Z'
    })
    expect(
      checkAccess(extended, 'Jane Doe', at('2026-10-04T10:00:00Z')).ok
    ).toBe(true)
  })

  it('accepts only the booker name, in full', () => {
    const now = at('2026-10-03T12:00:00Z')
    expect(checkAccess(reservation(), 'DOE JANE', now).ok).toBe(true)
    expect(checkAccess(reservation(), 'Doe', now)).toEqual({
      ok: false,
      reason: 'name-mismatch'
    })
    expect(checkAccess(reservation(), 'Anna Doe', now)).toEqual({
      ok: false,
      reason: 'name-mismatch'
    })
  })

  it('rejects a wrong name without revealing the stay', () => {
    expect(
      checkAccess(reservation(), 'Smith', at('2026-10-03T12:00:00Z'))
    ).toEqual({ok: false, reason: 'name-mismatch'})
  })

  it('treats missing, cancelled and revoked bookings alike', () => {
    const now = at('2026-10-03T12:00:00Z')
    expect(checkAccess(null, 'Jane Doe', now)).toEqual({
      ok: false,
      reason: 'not-found'
    })
    expect(
      checkAccess(reservation({status: 'cancelled'}), 'Jane Doe', now)
    ).toEqual({ok: false, reason: 'not-found'})
    expect(
      checkAccess(reservation({status: 'revoked'}), 'Jane Doe', now)
    ).toEqual({
      ok: false,
      reason: 'not-found'
    })
  })
})

describe('windowDecision', () => {
  it('re-validates a session without a name', () => {
    expect(windowDecision(reservation(), at('2026-10-03T12:00:00Z')).ok).toBe(
      true
    )
    expect(
      windowDecision(
        reservation({status: 'revoked'}),
        at('2026-10-03T12:00:00Z')
      ).ok
    ).toBe(false)
  })
})
