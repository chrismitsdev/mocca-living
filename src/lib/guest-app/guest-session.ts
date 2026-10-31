import {cookies} from 'next/headers'
import {windowDecision} from './access'
import {guestAppEnv} from './env'
import {createSessionToken, verifySessionToken} from './session'
import {getReservation, type Reservation} from './store/reservations'
import {createUpstashStore} from './store/upstash'

// The guest's session cookie, and the check every guest page runs: a valid
// signature, plus the stored booking still confirmed and inside its window

const COOKIE_NAME = 'ga_session'

export async function startGuestSession(
  confirmation: string,
  property: PropertySlug,
  endsAt: number
) {
  const token = createSessionToken(
    {c: confirmation, p: property, exp: Math.floor(endsAt / 1000)},
    guestAppEnv.sessionSecret()
  )
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(endsAt)
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

  const reservation = await getReservation(createUpstashStore(), session.c)
  const decision = windowDecision(reservation, Date.now())
  if (!reservation || !decision.ok || decision.property !== session.p) {
    return null
  }
  return {property: decision.property, reservation}
}
