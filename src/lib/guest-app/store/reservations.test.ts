import {beforeEach, describe, expect, it} from 'vitest'
import type {ParsedReservation} from '../email/types'
import {createMemoryStore} from './kv'
import {
  accessEndsAt,
  addManualReservation,
  applyReservationEmail,
  extendReservation,
  getReservation,
  listReservations,
  ReservationError,
  revokeReservation
} from './reservations'

let clock = Date.parse('2026-10-01T06:10:00Z')
let store = createMemoryStore(() => clock)

const booking = (overrides: Partial<ParsedReservation> = {}) =>
  ({
    confirmation: '1234567890',
    channel: 'booking',
    property: 'mocca-city',
    status: 'confirmed',
    bookerName: 'Doe Jane',
    checkIn: '2026-10-02',
    checkOut: '2026-10-04',
    pax: 3,
    sourceUpdatedAt: '2026-10-01T06:05:00.000Z',
    ...overrides
  }) satisfies ParsedReservation

const at = (iso: string) => new Date(iso)

beforeEach(() => {
  clock = Date.parse('2026-10-01T06:10:00Z')
  store = createMemoryStore(() => clock)
})

describe('applyReservationEmail', () => {
  it('creates a reservation with an audit entry', async () => {
    const outcome = await applyReservationEmail(
      store,
      booking(),
      at('2026-10-01T06:06:20Z')
    )

    expect(outcome).toBe('created')
    expect(await getReservation(store, '1234567890')).toMatchObject({
      status: 'confirmed',
      sourceUpdatedAt: '2026-10-01T06:05:00.000Z',
      audit: [
        {at: '2026-10-01T06:06:20.000Z', by: 'inbound', action: 'created'}
      ]
    })
  })

  it('finds a reservation by any formatting of its number', async () => {
    await applyReservationEmail(store, booking(), at('2026-10-01T06:06:20Z'))
    expect(await getReservation(store, ' 1234-567890 ')).not.toBeNull()
  })

  it('applies a later cancellation', async () => {
    await applyReservationEmail(store, booking(), at('2026-10-01T06:06:20Z'))
    const outcome = await applyReservationEmail(
      store,
      booking({
        status: 'cancelled',
        sourceUpdatedAt: '2026-10-01T19:37:51.000Z'
      }),
      at('2026-10-01T19:38:00Z')
    )

    expect(outcome).toBe('updated')
    const reservation = await getReservation(store, '1234567890')
    expect(reservation?.status).toBe('cancelled')
    expect(reservation?.audit.map((entry) => entry.action)).toEqual([
      'created',
      'cancelled'
    ])
  })

  it('ignores an older email arriving after a newer one', async () => {
    await applyReservationEmail(
      store,
      booking({
        status: 'cancelled',
        sourceUpdatedAt: '2026-10-01T19:37:51.000Z'
      }),
      at('2026-10-01T19:38:00Z')
    )
    const outcome = await applyReservationEmail(
      store,
      booking(),
      at('2026-10-01T19:38:05Z')
    )

    expect(outcome).toBe('stale')
    expect((await getReservation(store, '1234567890'))?.status).toBe(
      'cancelled'
    )
  })

  it('treats a duplicate delivery as stale', async () => {
    await applyReservationEmail(store, booking(), at('2026-10-01T06:06:20Z'))
    expect(
      await applyReservationEmail(store, booking(), at('2026-10-01T06:06:25Z'))
    ).toBe('stale')
  })

  it('orders Hotelo emails, which have no Last Update, by arrival', async () => {
    const hotelo = booking({
      confirmation: '12345678',
      channel: 'hotelo',
      sourceUpdatedAt: null
    })
    await applyReservationEmail(store, hotelo, at('2026-09-04T14:29:50Z'))
    const outcome = await applyReservationEmail(
      store,
      {...hotelo, status: 'cancelled'},
      at('2026-09-05T10:00:00Z')
    )

    expect(outcome).toBe('updated')
    expect((await getReservation(store, '12345678'))?.sourceUpdatedAt).toBe(
      '2026-09-05T10:00:00.000Z'
    )
  })

  it('keeps a booking revoked by the owner revoked', async () => {
    await applyReservationEmail(store, booking(), at('2026-10-01T06:06:20Z'))
    await revokeReservation(store, '1234567890', 'owner@example.com')

    const outcome = await applyReservationEmail(
      store,
      booking({sourceUpdatedAt: '2026-10-01T08:00:00.000Z'}),
      at('2026-10-01T08:00:10Z')
    )

    expect(outcome).toBe('revoked')
    expect((await getReservation(store, '1234567890'))?.status).toBe('revoked')
  })
})

describe('expired stays', () => {
  it('does not store an email for a stay already past retention', async () => {
    const outcome = await applyReservationEmail(
      store,
      booking({checkIn: '2026-09-01', checkOut: '2026-09-05'}),
      at('2026-10-01T06:06:20Z')
    )
    expect(outcome).toBe('expired')
    expect(store.keys()).toEqual([])
  })

  it('rejects a manual booking that has already ended', async () => {
    await expect(
      addManualReservation(
        store,
        {
          confirmation: 'X2',
          property: 'mocca-city',
          bookerName: 'John Roe',
          checkIn: '2026-09-28',
          checkOut: '2026-09-30'
        },
        'owner@example.com',
        new Date(clock)
      )
    ).rejects.toThrow('This stay has already ended')
  })
})

describe('retention', () => {
  it('deletes the record 3 days after checkout', async () => {
    await applyReservationEmail(store, booking(), at('2026-10-01T06:06:20Z'))

    // Departure 2026-10-04 → deleted at 00:00 Athens on 2026-10-07
    clock = Date.parse('2026-10-06T20:59:59Z')
    expect(await getReservation(store, '1234567890')).not.toBeNull()
    clock = Date.parse('2026-10-06T21:00:00Z')
    expect(await getReservation(store, '1234567890')).toBeNull()
  })

  it('keeps an extended booking until 3 days after the extension', async () => {
    await applyReservationEmail(store, booking(), at('2026-10-01T06:06:20Z'))
    await extendReservation(
      store,
      '1234567890',
      at('2026-10-05T09:00:00Z'),
      'owner@example.com'
    )

    clock = Date.parse('2026-10-07T12:00:00Z')
    expect(await getReservation(store, '1234567890')).not.toBeNull()
  })
})

describe('accessEndsAt', () => {
  it('is 11:00 Athens on the departure date', async () => {
    await applyReservationEmail(store, booking(), at('2026-10-01T06:06:20Z'))
    const reservation = await getReservation(store, '1234567890')
    if (!reservation) throw new Error('missing reservation')

    expect(new Date(accessEndsAt(reservation)).toISOString()).toBe(
      '2026-10-04T08:00:00.000Z'
    )
  })

  it('uses a later override', async () => {
    await applyReservationEmail(store, booking(), at('2026-10-01T06:06:20Z'))
    const extended = await extendReservation(
      store,
      '1234567890',
      at('2026-10-04T12:00:00Z'),
      'owner@example.com'
    )

    expect(new Date(accessEndsAt(extended)).toISOString()).toBe(
      '2026-10-04T12:00:00.000Z'
    )
    expect(extended.audit.at(-1)).toMatchObject({
      by: 'owner@example.com',
      action: 'extended until 2026-10-04T12:00:00.000Z'
    })
  })
})

describe('listReservations', () => {
  it('lists current and upcoming stays by arrival and drops expired ones', async () => {
    await applyReservationEmail(store, booking(), at('2026-10-01T06:06:20Z'))
    await applyReservationEmail(
      store,
      booking({
        confirmation: 'HMTEST1234',
        channel: 'airbnb',
        property: 'mocca-by-the-sea-dimitra',
        checkIn: '2026-09-26',
        checkOut: '2026-09-28'
      }),
      at('2026-10-01T06:07:00Z')
    )
    await addManualReservation(
      store,
      {
        confirmation: 'call-001',
        property: 'mocca-by-the-sea-georgia',
        bookerName: 'John Roe',
        checkIn: '2026-10-10',
        checkOut: '2026-10-12'
      },
      'owner@example.com',
      new Date(clock)
    )

    // HMTEST1234 left on 2026-09-28, past retention: never stored
    const list = await listReservations(store, new Date(clock))
    expect(list.map((reservation) => reservation.confirmation)).toEqual([
      '1234567890',
      'CALL001'
    ])
  })
})

describe('addManualReservation', () => {
  it('rejects a duplicate number', async () => {
    await applyReservationEmail(store, booking(), at('2026-10-01T06:06:20Z'))
    await expect(
      addManualReservation(
        store,
        {
          confirmation: '1234567890',
          property: 'mocca-city',
          bookerName: 'John Roe',
          checkIn: '2026-10-10',
          checkOut: '2026-10-12'
        },
        'owner@example.com',
        new Date(clock)
      )
    ).rejects.toThrow(ReservationError)
  })

  it('rejects a check-out that is not after check-in', async () => {
    await expect(
      addManualReservation(
        store,
        {
          confirmation: 'X1',
          property: 'mocca-city',
          bookerName: 'John Roe',
          checkIn: '2026-10-12',
          checkOut: '2026-10-12'
        },
        'owner@example.com',
        new Date(clock)
      )
    ).rejects.toThrow('Check-out must be after check-in')
  })
})

describe('owner actions', () => {
  it('throw for an unknown reservation', async () => {
    await expect(
      revokeReservation(store, 'NOPE', 'owner@example.com')
    ).rejects.toThrow('Reservation not found')
  })
})
