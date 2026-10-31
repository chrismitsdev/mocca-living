'use server'

import {createHmac} from 'node:crypto'
import {headers} from 'next/headers'
import type {Locale} from 'next-intl'
import {redirect} from '@/src/i18n/navigation'
import {checkAccess} from './access'
import {guestAppEnv} from './env'
import {startGuestSession} from './guest-session'
import {normalizeConfirmation} from './normalize'
import {count, hit, LIMITS} from './rate-limit'
import {getReservation} from './store/reservations'
import {createUpstashStore} from './store/upstash'

export type VerifyGuestState = {
  confirmation: string
  surname: string
  error:
    | null
    | 'invalid'
    | 'rate-limited'
    | 'not-found'
    | 'not-yet'
    | 'ended'
    | 'unavailable'
  /** ISO timestamp when access opens, for 'not-yet' */
  opensAt?: string
}

/** Client IP, hashed so raw addresses are never stored */
async function clientKey(): Promise<string> {
  const headerList = await headers()
  const ip =
    headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headerList.get('x-real-ip') ||
    'unknown'
  return createHmac('sha256', guestAppEnv.sessionSecret())
    .update(ip)
    .digest('base64url')
    .slice(0, 22)
}

export async function verifyGuestAction(
  locale: Locale,
  _prevState: VerifyGuestState,
  formData: FormData
): Promise<VerifyGuestState> {
  const confirmationInput = String(formData.get('confirmation') ?? '').slice(
    0,
    40
  )
  const surname = String(formData.get('surname') ?? '')
    .trim()
    .slice(0, 80)
  const state = {confirmation: confirmationInput, surname}
  const confirmation = normalizeConfirmation(confirmationInput)

  if (!confirmation || !surname) return {...state, error: 'invalid'}

  const store = createUpstashStore()
  let property: PropertySlug

  try {
    const ipAllowed = await hit(store, `ip:${await clientKey()}`, LIMITS.ip)
    const confirmationFailures = await count(store, `conf:${confirmation}`)
    if (!ipAllowed || confirmationFailures >= LIMITS.confirmation.limit) {
      return {...state, error: 'rate-limited'}
    }

    const reservation = await getReservation(store, confirmation)
    const decision = checkAccess(reservation, surname, Date.now())

    if (!decision.ok) {
      if (
        decision.reason === 'not-found' ||
        decision.reason === 'name-mismatch'
      ) {
        await hit(store, `conf:${confirmation}`, LIMITS.confirmation)
        // Same answer for both, so a booking number can't be probed
        return {...state, error: 'not-found'}
      }
      if (decision.reason === 'not-yet') {
        return {
          ...state,
          error: 'not-yet',
          opensAt: new Date(decision.opensAt).toISOString()
        }
      }
      return {...state, error: 'ended'}
    }

    await startGuestSession(confirmation, decision.property, decision.endsAt)
    property = decision.property
  } catch (error) {
    console.error('guest-app verify failed', error)
    return {...state, error: 'unavailable'}
  }

  // Outside the try: redirect() works by throwing
  return redirect({href: `/guest-app/${property}`, locale})
}
