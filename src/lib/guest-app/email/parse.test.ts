import {readFileSync} from 'node:fs'
import {join} from 'node:path'
import {describe, expect, it} from 'vitest'
import {decodeEmailBody, parseReservationBody} from './parse'
import type {ParseResult} from './types'

// Fixtures are real templates with every personal value replaced
const fixture = (name: string) =>
  readFileSync(join(__dirname, '..', '__fixtures__', `${name}.html`), 'utf8')

function reservationOf(result: ParseResult) {
  if (result.type !== 'reservation') {
    throw new Error(`expected a reservation, got ${JSON.stringify(result)}`)
  }
  return result.reservation
}

describe('Primal Res emails', () => {
  it('parses a Booking.com reservation', () => {
    const reservation = reservationOf(
      parseReservationBody(
        'primal-res',
        fixture('primal-res-booking-reservation')
      )
    )

    expect(reservation).toEqual({
      confirmation: '1234567890',
      channel: 'booking',
      property: 'mocca-city',
      status: 'confirmed',
      guestName: 'Jane Doe',
      bookedNames: ['Doe Jane', 'Jane Doe', 'Anna Doe', 'Mila Doe'],
      checkIn: '2026-10-02',
      checkOut: '2026-10-04',
      pax: 3,
      sourceUpdatedAt: '2026-10-01T06:05:00.000Z'
    })
  })

  it('parses a Booking.com cancellation', () => {
    const reservation = reservationOf(
      parseReservationBody(
        'primal-res',
        fixture('primal-res-booking-cancellation')
      )
    )

    expect(reservation).toMatchObject({
      confirmation: '1234567890',
      status: 'cancelled',
      property: 'mocca-city',
      checkIn: '2026-10-02',
      checkOut: '2026-10-04',
      sourceUpdatedAt: '2026-10-01T19:37:51.000Z'
    })
  })

  it('parses an Airbnb reservation', () => {
    const reservation = reservationOf(
      parseReservationBody(
        'primal-res',
        fixture('primal-res-airbnb-reservation')
      )
    )

    expect(reservation).toEqual({
      confirmation: 'HMTEST1234',
      channel: 'airbnb',
      property: 'mocca-by-the-sea-dimitra',
      status: 'confirmed',
      guestName: 'Ayşe Şahin',
      bookedNames: ['Şahin Ayşe', 'Ayşe Şahin'],
      checkIn: '2026-09-26',
      checkOut: '2026-09-28',
      pax: 4,
      sourceUpdatedAt: '2026-09-25T22:24:32.000Z'
    })
  })

  it('fails on an unknown property instead of guessing', () => {
    const html = fixture('primal-res-booking-reservation').replace(
      '>Mocca City<',
      '>Villa Georgia by Mocca Living<'
    )
    const result = parseReservationBody('primal-res', html)

    expect(result).toEqual({
      type: 'failed',
      reason: 'unknown property "Villa Georgia by Mocca Living"'
    })
  })

  it('ignores emails that are not reservations', () => {
    const result = parseReservationBody(
      'primal-res',
      '<p>Your monthly invoice is ready</p>'
    )
    expect(result.type).toBe('ignored')
  })
})

describe('Hotelo emails', () => {
  it('parses a direct booking', () => {
    const reservation = reservationOf(
      parseReservationBody('hotelo', fixture('hotelo-reservation'))
    )

    expect(reservation).toEqual({
      confirmation: '12345678',
      channel: 'hotelo',
      property: 'mocca-by-the-sea-dimitra',
      status: 'confirmed',
      guestName: 'Maria Petrova',
      bookedNames: ['Maria Petrova'],
      checkIn: '2026-09-14',
      checkOut: '2026-09-20',
      pax: 4,
      sourceUpdatedAt: null
    })
  })

  it('fails on an unknown heading', () => {
    const html = fixture('hotelo-reservation').replace(
      'Reservation Confirmed',
      'Reservation Updated'
    )
    expect(parseReservationBody('hotelo', html).type).toBe('failed')
  })

  it('ignores emails without a booking reference', () => {
    const result = parseReservationBody(
      'hotelo',
      '<p>Overdue invoice — immediate attention required</p>'
    )
    expect(result.type).toBe('ignored')
  })
})

describe('decodeEmailBody', () => {
  it('decodes a quoted-printable HTML message', async () => {
    const raw = [
      'From: bookings@example.com',
      'Subject: Test',
      'MIME-Version: 1.0',
      'Content-Type: text/html; charset=utf-8',
      'Content-Transfer-Encoding: quoted-printable',
      '',
      '<p>Booked By: =C5=9Eahin=C2=A0Ay=C5=9Fe</p>'
    ].join('\r\n')

    expect((await decodeEmailBody(raw)).trim()).toBe(
      '<p>Booked By: Şahin Ayşe</p>'
    )
  })
})
