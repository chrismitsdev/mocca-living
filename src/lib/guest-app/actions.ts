'use server'

import {createHmac} from 'node:crypto'
import {headers} from 'next/headers'
import type {Locale} from 'next-intl'
import {
  type BaseIssue,
  flatten,
  nonEmpty,
  object,
  pipe,
  safeParse,
  string,
  transform,
  trim
} from 'valibot'
import {redirect} from '@/src/i18n/navigation'
import {checkAccess} from './access'
import {guestAppEnv} from './env'
import {startGuestSession} from './guest-session'
import {normalizeReservationNumber} from './normalize'
import {count, hit, LIMITS} from './rate-limit'
import {getReservation} from './store/reservations'
import {createUpstashStore} from './store/upstash'

type VerifyGuestData = {reservationNumber: string; name: string}

export type VerifyGuestState = {
  data: VerifyGuestData
  errors: Partial<Record<keyof VerifyGuestData, string>>
} & (
  | {ok: null}
  | {
      ok: false
      // 'validation' is an invalid field (shown under it); the rest are about
      // the booking as a whole and only shown in the toast
      type:
        | 'validation'
        | 'rate-limited'
        | 'not-found'
        | 'not-yet'
        | 'ended'
        | 'unavailable'
      /** ISO timestamp when access opens, for 'not-yet' */
      opensAt?: string
    }
)

const messages = {
  required: {
    el: 'Υποχρεωτικό πεδίο',
    en: 'Mandatory field',
    tr: 'Zorunlu alan',
    bg: 'Задължително поле'
  }
}

function printIssueMessage(key: keyof typeof messages) {
  return (issue: BaseIssue<string>) => {
    const lang = issue.lang as Locale | undefined
    return lang && lang in messages[key]
      ? messages[key][lang]
      : messages[key].en
  }
}

const VerifyGuestSchema = object({
  reservationNumber: pipe(
    string(),
    trim(),
    nonEmpty(printIssueMessage('required')),
    transform(normalizeReservationNumber),
    // e.g. a lone '#' normalises to nothing
    nonEmpty(printIssueMessage('required'))
  ),
  name: pipe(string(), trim(), nonEmpty(printIssueMessage('required')))
})

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
  const data = {
    reservationNumber: String(formData.get('reservationNumber') ?? '').slice(
      0,
      40
    ),
    name: String(formData.get('name') ?? '').slice(0, 120)
  }
  const result = safeParse(VerifyGuestSchema, data, {lang: locale})

  if (!result.success) {
    const issues = flatten<typeof VerifyGuestSchema>(result.issues)

    return {
      data,
      errors: {
        reservationNumber: issues.nested?.reservationNumber?.[0],
        name: issues.nested?.name?.[0]
      },
      ok: false,
      type: 'validation'
    }
  }

  const {reservationNumber, name} = result.output
  const store = createUpstashStore()
  let property: PropertySlug

  try {
    const ipAllowed = await hit(store, `ip:${await clientKey()}`, LIMITS.ip)
    const reservationNumberFailures = await count(
      store,
      `reservationNumber:${reservationNumber}`
    )
    if (
      !ipAllowed ||
      reservationNumberFailures >= LIMITS.reservationNumber.limit
    ) {
      return {data, errors: {}, ok: false, type: 'rate-limited'}
    }

    const reservation = await getReservation(store, reservationNumber)
    const decision = checkAccess(reservation, name, Date.now())

    if (!decision.ok) {
      if (
        decision.reason === 'not-found' ||
        decision.reason === 'name-mismatch'
      ) {
        await hit(
          store,
          `reservationNumber:${reservationNumber}`,
          LIMITS.reservationNumber
        )
        // Same answer for both, so a booking number can't be probed
        return {data, errors: {}, ok: false, type: 'not-found'}
      }
      if (decision.reason === 'not-yet') {
        return {
          data,
          errors: {},
          ok: false,
          type: 'not-yet',
          opensAt: new Date(decision.opensAt).toISOString()
        }
      }
      return {data, errors: {}, ok: false, type: 'ended'}
    }

    await startGuestSession(
      reservationNumber,
      decision.property,
      decision.endsAt
    )
    property = decision.property
  } catch (error) {
    console.error('guest-app verify failed', error)
    return {data, errors: {}, ok: false, type: 'unavailable'}
  }

  // Outside the try: redirect() works by throwing
  return redirect({href: `/guest-app/${property}`, locale})
}
