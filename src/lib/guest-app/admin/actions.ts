'use server'

import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {
  check,
  email,
  flatten,
  type GenericSchema,
  maxLength,
  minLength,
  nonEmpty,
  object,
  picklist,
  pipe,
  regex,
  safeParse,
  string,
  transform,
  trim
} from 'valibot'
import {clientKey, hashForKey} from '../client-key'
import {guestAppEnv} from '../env'
import {normalizeReservationNumber} from '../normalize'
import {PROPERTY_TIMES, PROPERTY_TIMEZONE} from '../properties'
import {hit, LIMITS} from '../rate-limit'
import {
  addManualReservation,
  extendReservation,
  getReservation,
  isChangeable,
  ReservationError,
  revokeReservation
} from '../store/reservations'
import {createUpstashStore} from '../store/upstash'
import {zonedTimeToEpochMs} from '../time'
import {endAdminSession, requireAdmin} from './admin-session'
import {createLoginToken, isAllowedAdmin, normalizeEmail} from './auth'
import {sendLoginEmail} from './login-email'

// Admin actions. The page is Greek only, so messages are Greek. Any action
// that reads or changes reservations must check the admin session first
// (requireAdmin): server actions are public endpoints

export type AdminFormState<Data extends Record<string, string>> = {
  data: Data
  errors: Partial<Record<keyof Data, string>>
} & ({ok: null} | {ok: boolean; title?: string; message: string})

const messages = {
  required: 'Υποχρεωτικό πεδίο',
  email: 'Μη έγκυρη διεύθυνση email',
  rateLimited: 'Πάρα πολλές προσπάθειες. Δοκιμάστε ξανά σε 15 λεπτά.',
  unavailable: 'Κάτι πήγε στραβά. Δοκιμάστε ξανά σε λίγο.',
  loginSent:
    'Αν η διεύθυνση έχει πρόσβαση, θα λάβετε σύνδεσμο σύνδεσης σε λίγα λεπτά.',
  notFound: 'Η κράτηση δεν βρέθηκε.',
  notChangeable:
    'Η κράτηση δεν μπορεί πλέον να αλλάξει: έχει ολοκληρωθεί, ακυρωθεί ή ανακληθεί.',
  revoked: 'Η πρόσβαση ανακλήθηκε.',
  added: 'Η πρόσβαση προστέθηκε.',
  extended: 'Η πρόσβαση παρατάθηκε.',
  date: 'Μη έγκυρη ημερομηνία',
  time: 'Μη έγκυρη ώρα',
  reservationNumberLength: 'Από 8 έως 20 χαρακτήρες',
  reservationNumberCharacters: 'Μόνο λατινικά γράμματα και αριθμοί',
  bookerNameLength: 'Έως 120 χαρακτήρες',
  guestCount: 'Από 1 και πάνω',
  duplicate: 'Υπάρχει ήδη πρόσβαση για αυτόν τον αριθμό κράτησης.',
  checkOutBeforeCheckIn: 'Η αναχώρηση πρέπει να είναι μετά την άφιξη.',
  stayEnded: 'Η διαμονή έχει ήδη λήξει.',
  endNotLater: 'Η νέα λήξη πρέπει να είναι μετά την τρέχουσα.'
}

// Same toast as every other form on the site (contact, guest access)
const validationError = {
  ok: false,
  title: 'Αποτυχία υποβολής',
  message:
    'Ελέγξτε τα επισημασμένα πεδία και διορθώστε τυχόν σφάλματα πριν την υποβολή.'
} as const

const requiredString = () => pipe(string(), trim(), nonEmpty(messages.required))
/**
 * Whether a "YYYY-MM-DD" string is a real calendar day. Date arithmetic
 * rolls an impossible date over (2026-02-31 becomes 3 March), so the date
 * must format back to the same string. UTC, so no time zone can shift it
 */
function isRealDate(value: string): boolean {
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  )
}

const dateString = () =>
  pipe(
    requiredString(),
    regex(/^\d{4}-\d{2}-\d{2}$/, messages.date),
    check(isRealDate, messages.date)
  )

function parseForm<Schema extends GenericSchema>(
  schema: Schema,
  data: Record<string, string>
) {
  const result = safeParse(schema, data)
  if (result.success) return {output: result.output, errors: null}

  const nested = flatten<Schema>(result.issues).nested ?? {}
  const errors = Object.fromEntries(
    Object.entries(nested).map(([key, value]) => [
      key,
      (value as string[] | undefined)?.[0]
    ])
  )
  return {output: null, errors}
}

const formValues = <Key extends string>(formData: FormData, keys: Key[]) =>
  Object.fromEntries(
    keys.map((key) => [key, String(formData.get(key) ?? '').slice(0, 200)])
  ) as Record<Key, string>

// Login

type LoginData = {email: string}

const LoginSchema = object({
  email: pipe(requiredString(), email(messages.email))
})

export async function requestLoginAction(
  _prevState: AdminFormState<LoginData>,
  formData: FormData
): Promise<AdminFormState<LoginData>> {
  const data = formValues(formData, ['email'])
  const {output, errors} = parseForm(LoginSchema, data)
  if (!output) {
    return {data, errors, ...validationError}
  }

  const address = normalizeEmail(output.email)
  try {
    const store = createUpstashStore()
    const ipAllowed = await hit(
      store,
      `adminLoginIp:${await clientKey()}`,
      LIMITS.adminLoginIp
    )
    const emailAllowed = await hit(
      store,
      `adminLoginEmail:${hashForKey(address)}`,
      LIMITS.adminLoginEmail
    )
    if (!ipAllowed || !emailAllowed) {
      return {data, errors: {}, ok: false, message: messages.rateLimited}
    }

    // Same answer whether or not the address is allowed
    if (isAllowedAdmin(address, guestAppEnv.adminEmails())) {
      const token = await createLoginToken(store, address)
      await sendLoginEmail(address, token)
    }
  } catch (error) {
    console.error('guest-app admin login request failed', error)
    return {data, errors: {}, ok: false, message: messages.unavailable}
  }

  return {data: {email: ''}, errors: {}, ok: true, message: messages.loginSent}
}

export async function logoutAction() {
  await endAdminSession()
  redirect('/admin/login')
}

// Reservations

const DASHBOARD_PATH = '/admin/dashboard'

type RevokeData = {reservationNumber: string}

/**
 * Block guest access for a booking. Only upcoming or current confirmed stays
 * can be revoked: the dashboard disables the button otherwise, and this
 * checks again since the booking may have changed since the page loaded
 */
export async function revokeReservationAction(
  _prevState: AdminFormState<RevokeData>,
  formData: FormData
): Promise<AdminFormState<RevokeData>> {
  const admin = await requireAdmin()
  const data = formValues(formData, ['reservationNumber'])

  try {
    const store = createUpstashStore()
    const reservation = data.reservationNumber
      ? await getReservation(store, data.reservationNumber)
      : null
    if (!reservation) {
      return {data, errors: {}, ok: false, message: messages.notFound}
    }
    if (!isChangeable(reservation, Date.now())) {
      return {data, errors: {}, ok: false, message: messages.notChangeable}
    }

    await revokeReservation(store, reservation.reservationNumber, admin)
  } catch (error) {
    console.error('guest-app admin revoke failed', error)
    return {data, errors: {}, ok: false, message: messages.unavailable}
  } finally {
    // Refresh in every case, so a stale row updates to its real status
    revalidatePath(DASHBOARD_PATH)
  }

  return {data, errors: {}, ok: true, message: messages.revoked}
}

type AddAccessData = {
  reservationNumber: string
  property: string
  bookerName: string
  checkIn: string
  checkOut: string
  guestCount: string
}

const AddAccessSchema = object({
  // Checked as the guest will type it: case, a leading '#', spaces and dashes
  // don't matter. 8-20 Latin letters and digits covers every platform
  // (Hotelo 8 digits, Booking.com 10, Airbnb HM + 8) and keeps made-up
  // numbers hard to guess; Latin only, so a Greek look-alike letter can't
  // lock the guest out
  reservationNumber: pipe(
    requiredString(),
    transform(normalizeReservationNumber),
    nonEmpty(messages.required),
    regex(/^[A-Z0-9]*$/, messages.reservationNumberCharacters),
    minLength(8, messages.reservationNumberLength),
    maxLength(20, messages.reservationNumberLength)
  ),
  property: picklist(
    Object.keys(PROPERTY_TIMES) as PropertySlug[],
    messages.required
  ),
  // The guest form reads at most 120 characters of the name, so a longer one
  // could never match
  bookerName: pipe(requiredString(), maxLength(120, messages.bookerNameLength)),
  checkIn: dateString(),
  checkOut: dateString(),
  // Required: a whole number from 1
  guestCount: pipe(
    requiredString(),
    regex(/^[1-9]\d{0,2}$/, messages.guestCount),
    transform(Number)
  )
})

/**
 * Store errors as Greek messages on the field they concern. The check-out
 * rules both land on the departure date, the field the owner would change
 */
function addAccessError(
  error: unknown
): Pick<AdminFormState<AddAccessData>, 'errors'> | null {
  if (!(error instanceof ReservationError)) return null
  if (/already exists/i.test(error.message)) {
    return {errors: {reservationNumber: messages.duplicate}}
  }
  if (/check-out must be after/i.test(error.message)) {
    return {errors: {checkOut: messages.checkOutBeforeCheckIn}}
  }
  if (/already ended/i.test(error.message)) {
    return {errors: {checkOut: messages.stayEnded}}
  }
  if (/required/i.test(error.message)) {
    return {errors: {reservationNumber: messages.required}}
  }
  return null
}

/**
 * Give guest-app access for a booking that didn't arrive by email (a phone
 * booking, a missed or failed email). Arrival may be in the past, e.g. a
 * guest already at the property; a stay that has already ended is refused
 */
export async function addAccessAction(
  _prevState: AdminFormState<AddAccessData>,
  formData: FormData
): Promise<AdminFormState<AddAccessData>> {
  const admin = await requireAdmin()
  const data = formValues(formData, [
    'reservationNumber',
    'property',
    'bookerName',
    'checkIn',
    'checkOut',
    'guestCount'
  ])
  const {output, errors} = parseForm(AddAccessSchema, data)
  if (!output) {
    return {data, errors, ...validationError}
  }

  try {
    await addManualReservation(createUpstashStore(), output, admin)
  } catch (error) {
    const fieldError = addAccessError(error)
    if (fieldError) {
      return {data, ...fieldError, ...validationError}
    }
    console.error('guest-app admin add access failed', error)
    return {data, errors: {}, ok: false, message: messages.unavailable}
  }

  revalidatePath(DASHBOARD_PATH)
  return {
    data: {
      reservationNumber: '',
      property: '',
      bookerName: '',
      checkIn: '',
      checkOut: '',
      guestCount: ''
    },
    errors: {},
    ok: true,
    message: messages.added
  }
}

type ExtendAccessData = {
  reservationNumber: string
  accessUntilDate: string
  accessUntilTime: string
}

const ExtendAccessSchema = object({
  reservationNumber: requiredString(),
  accessUntilDate: dateString(),
  accessUntilTime: pipe(
    requiredString(),
    regex(/^([01]\d|2[0-3]):[0-5]\d$/, messages.time)
  )
})

/**
 * Keep guest access open until a later moment (late checkout). The date and
 * time are property-local, wherever the admin happens to be
 */
export async function extendAccessAction(
  _prevState: AdminFormState<ExtendAccessData>,
  formData: FormData
): Promise<AdminFormState<ExtendAccessData>> {
  const admin = await requireAdmin()
  const data = formValues(formData, [
    'reservationNumber',
    'accessUntilDate',
    'accessUntilTime'
  ])
  const {output, errors} = parseForm(ExtendAccessSchema, data)
  if (!output) {
    return {data, errors, ...validationError}
  }

  const until = new Date(
    zonedTimeToEpochMs(
      output.accessUntilDate,
      output.accessUntilTime,
      PROPERTY_TIMEZONE
    )
  )

  try {
    await extendReservation(
      createUpstashStore(),
      output.reservationNumber,
      until,
      admin
    )
  } catch (error) {
    if (error instanceof ReservationError) {
      if (/after the current end/i.test(error.message)) {
        return {
          data,
          errors: {accessUntilDate: messages.endNotLater},
          ...validationError
        }
      }
      const message = /not found/i.test(error.message)
        ? messages.notFound
        : messages.notChangeable
      return {data, errors: {}, ok: false, message}
    }
    console.error('guest-app admin extend failed', error)
    return {data, errors: {}, ok: false, message: messages.unavailable}
  } finally {
    // Refresh in every case, so a stale row updates to its real status
    revalidatePath(DASHBOARD_PATH)
  }

  return {data, errors: {}, ok: true, message: messages.extended}
}
