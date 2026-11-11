import {describe, expect, it} from 'vitest'
import {
  createSessionToken,
  type GuestSession,
  verifySessionToken
} from './session'

const secret = 'test-secret-that-is-long-enough-for-hmac-use'
const now = Date.parse('2026-10-03T12:00:00Z')
const session: GuestSession = {
  reservationNumber: '1234567890',
  property: 'mocca-city',
  recordCreatedAt: '2026-10-01T06:06:20.000Z',
  expiresAt: Date.parse('2026-10-04T08:00:00Z') / 1000
}

describe('session tokens', () => {
  it('round-trips a valid session', () => {
    const token = createSessionToken(session, secret)
    expect(verifySessionToken(token, secret, now)).toEqual(session)
  })

  it('rejects a token signed with another secret', () => {
    const token = createSessionToken(session, 'another-secret')
    expect(verifySessionToken(token, secret, now)).toBeNull()
  })

  it('rejects a tampered payload', () => {
    const token = createSessionToken(session, secret)
    const [version, , signature] = token.split('.')
    const forged = Buffer.from(
      JSON.stringify({...session, property: 'mocca-by-the-sea-dimitra'})
    ).toString('base64url')
    expect(
      verifySessionToken(`${version}.${forged}.${signature}`, secret, now)
    ).toBeNull()
  })

  it('rejects an expired session', () => {
    const token = createSessionToken(session, secret)
    expect(
      verifySessionToken(token, secret, Date.parse('2026-10-04T08:00:00Z'))
    ).toBeNull()
  })

  it('rejects a v2 token, which has no recordCreatedAt', () => {
    const {recordCreatedAt: _, ...v2Session} = session
    const payload = Buffer.from(JSON.stringify(v2Session)).toString('base64url')
    const token = createSessionToken(session, secret)
    const signature = token.split('.')[2]
    expect(
      verifySessionToken(`v2.${payload}.${signature}`, secret, now)
    ).toBeNull()
  })

  it('rejects a v3 token without recordCreatedAt', () => {
    const {recordCreatedAt: _, ...rest} = session
    const token = createSessionToken(rest as GuestSession, secret)
    expect(verifySessionToken(token, secret, now)).toBeNull()
  })

  it('rejects malformed input', () => {
    for (const token of [undefined, '', 'v3', 'v3.a', 'v2.a.b', 'v3.a.b.c']) {
      expect(verifySessionToken(token, secret, now)).toBeNull()
    }
  })
})
