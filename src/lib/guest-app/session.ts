import {createHmac, timingSafeEqual} from 'node:crypto'

// Compact signed session tokens: "v3.<payload>.<signature>", where payload is
// base64url JSON and signature an HMAC-SHA256 over "v3.<payload>". The token
// only proves who verified and until when; every request still re-checks the
// stored reservation, including that it's the same record (recordCreatedAt)

export type GuestSession = {
  reservationNumber: string
  property: PropertySlug
  /** The record's creation time, so a re-added booking needs a new sign-in */
  recordCreatedAt: string
  /** Epoch seconds */
  expiresAt: number
}

// v2: explicit field names (v1 used c/p/exp). v3: adds recordCreatedAt.
// Tokens of older versions are rejected
const VERSION = 'v3'

function sign(data: string, secret: string): string {
  return createHmac('sha256', secret).update(data).digest('base64url')
}

export function createSessionToken(
  session: GuestSession,
  secret: string
): string {
  const payload = Buffer.from(JSON.stringify(session)).toString('base64url')
  const data = `${VERSION}.${payload}`
  return `${data}.${sign(data, secret)}`
}

export function verifySessionToken(
  token: string | undefined,
  secret: string,
  now: number = Date.now()
): GuestSession | null {
  if (!token) return null

  const [version, payload, signature, ...rest] = token.split('.')
  if (version !== VERSION || !payload || !signature || rest.length) return null

  const expected = Buffer.from(sign(`${version}.${payload}`, secret))
  const actual = Buffer.from(signature)
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return null
  }

  try {
    const session = JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf8')
    ) as GuestSession
    if (
      typeof session.reservationNumber !== 'string' ||
      typeof session.property !== 'string' ||
      typeof session.recordCreatedAt !== 'string' ||
      typeof session.expiresAt !== 'number' ||
      session.expiresAt * 1000 <= now
    ) {
      return null
    }
    return session
  } catch {
    return null
  }
}
