import {describe, expect, it} from 'vitest'
import {
  createSessionToken,
  type GuestSession,
  verifySessionToken
} from './session'

const secret = 'test-secret-that-is-long-enough-for-hmac-use'
const now = Date.parse('2026-10-03T12:00:00Z')
const session: GuestSession = {
  c: '1234567890',
  p: 'mocca-city',
  exp: Date.parse('2026-10-04T08:00:00Z') / 1000
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
      JSON.stringify({...session, p: 'mocca-by-the-sea-dimitra'})
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

  it('rejects malformed input', () => {
    for (const token of [undefined, '', 'v1', 'v1.a', 'v2.a.b', 'v1.a.b.c']) {
      expect(verifySessionToken(token, secret, now)).toBeNull()
    }
  })
})
