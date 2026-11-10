import {cookies} from 'next/headers'
import {windowDecision} from './access'
import {guestAppEnv} from './env'
import {createSessionToken, verifySessionToken} from './session'
import {getReservation, type Reservation} from './store/reservations'
import {createUpstashStore} from './store/upstash'

// The guest's session cookie, and the check every guest page runs: a valid
// signature, plus the stored booking still confirmed and inside its window

const COOKIE_NAME = 'guest_app_session'

// The cookie outlives the access window on purpose, so a guest who's already
// signed in stays in when an admin extends access. It grants nothing by
// itself: getActiveGuest checks the stored booking's window on every request
const SESSION_GRACE_MS = 30 * 24 * 60 * 60 * 1000

export async function startGuestSession(
  reservationNumber: string,
  property: PropertySlug,
  endsAt: number
) {
  const sessionEndsAt = endsAt + SESSION_GRACE_MS
  const token = createSessionToken(
    {
      reservationNumber,
      property,
      expiresAt: Math.floor(sessionEndsAt / 1000)
    },
    guestAppEnv.sessionSecret()
  )
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(sessionEndsAt)
  })
}

export type ActiveGuest = {
  property: PropertySlug
  reservation: Reservation
}

/** The current guest, or null when there's no valid, active session */
export async function getActiveGuest(): Promise<ActiveGuest | null> {
  const cookieStore = await cookies()
  const session = verifySessionToken(
    cookieStore.get(COOKIE_NAME)?.value,
    guestAppEnv.sessionSecret()
  )
  if (!session) return null

  const reservation = await getReservation(
    createUpstashStore(),
    session.reservationNumber
  )
  const decision = windowDecision(reservation, Date.now())
  if (!reservation || !decision.ok || decision.property !== session.property) {
    return null
  }
  return {property: decision.property, reservation}
}
