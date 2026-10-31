import {readFileSync} from 'node:fs'
import {join} from 'node:path'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import type {OriginResult} from './email/origin'
import {type InboundDeps, processReceivedEmail} from './inbound'
import {createMemoryStore} from './store/kv'
import {getReservation} from './store/reservations'

// Origin verification has its own tests; here it is stubbed to focus on the
// processing flow

const html = (name: string) =>
  readFileSync(join(__dirname, '__fixtures__', `${name}.html`), 'utf8')

const mime = (body: string) =>
  Buffer.from(
    [
      'From: bookings@primal-res.com',
      'Subject: Test',
      'MIME-Version: 1.0',
      'Content-Type: text/html; charset=utf-8',
      'Content-Transfer-Encoding: 8bit',
      '',
      body
    ].join('\r\n')
  )

const email = {
  email_id: 'email-1',
  from: 'bookings@primal-res.com',
  subject: 'New Reservation [1234567890] for Mocca City from Booking.com'
}

let store = createMemoryStore()
let alert: ReturnType<typeof vi.fn<InboundDeps['alert']>>

function deps(raw: Buffer, origin: OriginResult): InboundDeps {
  return {
    store,
    alert,
    fetchRaw: async () => raw,
    verify: async () => origin,
    now: () => new Date('2026-10-01T06:06:20Z')
  }
}

const primalRes: OriginResult = {
  ok: true,
  source: 'primal-res',
  domain: 'primal-res.com',
  method: 'arc'
}

beforeEach(() => {
  store = createMemoryStore(() => Date.parse('2026-10-01T06:10:00Z'))
  alert = vi.fn<InboundDeps['alert']>(async () => {})
})

describe('processReceivedEmail', () => {
  it('stores a verified reservation', async () => {
    const outcome = await processReceivedEmail(
      email,
      deps(mime(html('primal-res-booking-reservation')), primalRes)
    )

    expect(outcome).toEqual({
      status: 'stored',
      outcome: 'created',
      reservationNumber: '1234567890'
    })
    expect((await getReservation(store, '1234567890'))?.bookerName).toBe(
      'Doe Jane'
    )
    expect(alert).not.toHaveBeenCalled()
  })

  it('ignores a verified email that is not a reservation', async () => {
    const outcome = await processReceivedEmail(
      email,
      deps(mime('<p>Monthly statement</p>'), primalRes)
    )

    expect(outcome).toEqual({status: 'ignored', reason: 'no Res ID'})
    expect(alert).not.toHaveBeenCalled()
  })

  it('alerts when a verified reservation email cannot be read', async () => {
    const unreadable = html('primal-res-booking-reservation').replace(
      '>Mocca City<',
      '>Villa Georgia by Mocca Living<'
    )
    const outcome = await processReceivedEmail(
      email,
      deps(mime(unreadable), primalRes)
    )

    expect(outcome.status).toBe('failed')
    expect(alert).toHaveBeenCalledWith(
      'Guest app: reservation email could not be read',
      expect.arrayContaining([
        'Reason: unknown property "Villa Georgia by Mocca Living"'
      ])
    )
    expect(store.keys()).toEqual([])
  })

  it('alerts when an email claiming a reservation sender fails the origin check', async () => {
    const outcome = await processReceivedEmail(
      email,
      deps(mime(html('primal-res-booking-reservation')), {
        ok: false,
        reason: 'invalid ARC seal'
      })
    )

    expect(outcome).toEqual({status: 'rejected', reason: 'invalid ARC seal'})
    expect(alert).toHaveBeenCalledOnce()
    expect(store.keys()).toEqual([])
  })

  it('silently ignores unverified email from other senders', async () => {
    const outcome = await processReceivedEmail(
      {...email, from: 'someone@gmail.com'},
      deps(mime('<p>Hello</p>'), {ok: false, reason: 'no valid DKIM'})
    )

    expect(outcome.status).toBe('ignored')
    expect(alert).not.toHaveBeenCalled()
  })

  it('lets fetch failures propagate so the webhook is retried', async () => {
    await expect(
      processReceivedEmail(email, {
        ...deps(Buffer.from(''), primalRes),
        fetchRaw: async () => {
          throw new Error('Raw email unavailable')
        }
      })
    ).rejects.toThrow('Raw email unavailable')
  })
})
