import type {Channel, ParsedReservation} from '../email/types'
import {normalizeConfirmation} from '../normalize'
import {PROPERTY_TIMES, PROPERTY_TIMEZONE} from '../properties'
import {addDays, zonedDate, zonedTimeToEpochMs} from '../time'
import type {KeyValueStore} from './kv'

// Reservations kept for guest-app access, one record per confirmation number.
// Records delete themselves a few days after the stay; an index sorted by
// expiry lets the owner page list current and upcoming stays

export type AuditEntry = {at: string; by: string; action: string}

export type Reservation = {
  confirmation: string
  channel: Channel | 'manual'
  property: PropertySlug
  status: 'confirmed' | 'cancelled' | 'revoked'
  guestName: string
  bookedNames: string[]
  /** YYYY-MM-DD, property-local */
  checkIn: string
  /** YYYY-MM-DD, property-local */
  checkOut: string
  pax: number | null
  /** ISO; orders updates (Last Update from the email, or when it arrived) */
  sourceUpdatedAt: string
  /** ISO; set by the owner to extend access (late checkout) */
  accessUntilOverride?: string
  audit: AuditEntry[]
}

export const RETENTION_DAYS = 3
const KEY_PREFIX = 'gaRes:'
const INDEX_KEY = 'gaRes:index'

const keyOf = (confirmation: string) => `${KEY_PREFIX}${confirmation}`

/** End of access: check-out time on the departure date, or the override */
export function accessEndsAt(reservation: Reservation): number {
  const checkOut = zonedTimeToEpochMs(
    reservation.checkOut,
    PROPERTY_TIMES[reservation.property].checkOut,
    PROPERTY_TIMEZONE
  )
  const override = reservation.accessUntilOverride
    ? Date.parse(reservation.accessUntilOverride)
    : 0
  return Math.max(checkOut, override)
}

/** Epoch seconds when the record is deleted */
function expiresAt(reservation: Reservation): number {
  const end = accessEndsAt(reservation)
  const deleteAt = zonedTimeToEpochMs(
    addDays(zonedDate(end, PROPERTY_TIMEZONE), RETENTION_DAYS),
    '00:00',
    PROPERTY_TIMEZONE
  )
  return Math.ceil(Math.max(deleteAt, end) / 1000)
}

async function save(store: KeyValueStore, reservation: Reservation) {
  const expireAt = expiresAt(reservation)
  await store.set(keyOf(reservation.confirmation), reservation, {expireAt})
  await store.zadd(INDEX_KEY, expireAt, reservation.confirmation)
}

export async function getReservation(
  store: KeyValueStore,
  confirmation: string
): Promise<Reservation | null> {
  return store.get<Reservation>(keyOf(normalizeConfirmation(confirmation)))
}

export type ApplyOutcome =
  | 'created'
  | 'updated'
  | 'stale'
  | 'revoked'
  | 'expired'

/**
 * Apply a parsed reservation email. Older or duplicate emails are ignored,
 * and a booking revoked by the owner stays revoked
 */
export async function applyReservationEmail(
  store: KeyValueStore,
  parsed: ParsedReservation,
  receivedAt: Date
): Promise<ApplyOutcome> {
  const existing = await getReservation(store, parsed.confirmation)
  const sourceUpdatedAt = parsed.sourceUpdatedAt ?? receivedAt.toISOString()

  if (existing?.status === 'revoked') return 'revoked'
  if (
    existing &&
    Date.parse(sourceUpdatedAt) <= Date.parse(existing.sourceUpdatedAt)
  ) {
    return 'stale'
  }

  const action = !existing
    ? parsed.status === 'cancelled'
      ? 'created (cancelled)'
      : 'created'
    : parsed.status === 'cancelled'
      ? 'cancelled'
      : 'updated'

  const reservation: Reservation = {
    confirmation: parsed.confirmation,
    channel: parsed.channel,
    property: parsed.property,
    status: parsed.status,
    guestName: parsed.guestName,
    bookedNames: parsed.bookedNames,
    checkIn: parsed.checkIn,
    checkOut: parsed.checkOut,
    pax: parsed.pax,
    sourceUpdatedAt,
    accessUntilOverride: existing?.accessUntilOverride,
    audit: [
      ...(existing?.audit ?? []),
      {at: receivedAt.toISOString(), by: 'inbound', action}
    ]
  }

  // A stay already past retention (e.g. an old email) isn't stored
  if (expiresAt(reservation) * 1000 <= receivedAt.getTime()) return 'expired'

  await save(store, reservation)
  return existing ? 'updated' : 'created'
}

/** Current and upcoming stays, earliest arrival first */
export async function listReservations(
  store: KeyValueStore,
  now: Date
): Promise<Reservation[]> {
  const nowSeconds = Math.floor(now.getTime() / 1000)
  await store.zremRangeByScore(INDEX_KEY, 0, nowSeconds)

  const confirmations = await store.zrangeByScore(
    INDEX_KEY,
    nowSeconds,
    Number.POSITIVE_INFINITY
  )
  const reservations = await Promise.all(
    confirmations.map((confirmation) =>
      store.get<Reservation>(keyOf(confirmation))
    )
  )
  return reservations
    .filter((reservation): reservation is Reservation => Boolean(reservation))
    .sort((a, b) => a.checkIn.localeCompare(b.checkIn))
}

export class ReservationError extends Error {}

async function update(
  store: KeyValueStore,
  confirmation: string,
  by: string,
  action: string,
  change: (reservation: Reservation) => Partial<Reservation>,
  now: Date
): Promise<Reservation> {
  const existing = await getReservation(store, confirmation)
  if (!existing) throw new ReservationError('Reservation not found')

  const updated: Reservation = {
    ...existing,
    ...change(existing),
    audit: [...existing.audit, {at: now.toISOString(), by, action}]
  }
  await save(store, updated)
  return updated
}

/** Owner action: block access for this booking */
export function revokeReservation(
  store: KeyValueStore,
  confirmation: string,
  by: string,
  now = new Date()
) {
  return update(
    store,
    confirmation,
    by,
    'revoked',
    () => ({status: 'revoked'}),
    now
  )
}

/** Owner action: allow access until a later moment (late checkout) */
export function extendReservation(
  store: KeyValueStore,
  confirmation: string,
  until: Date,
  by: string,
  now = new Date()
) {
  return update(
    store,
    confirmation,
    by,
    `extended until ${until.toISOString()}`,
    () => ({accessUntilOverride: until.toISOString()}),
    now
  )
}

export type ManualReservationInput = {
  confirmation: string
  property: PropertySlug
  guestName: string
  checkIn: string
  checkOut: string
  pax?: number | null
}

/** Owner action: add a booking that didn't arrive by email */
export async function addManualReservation(
  store: KeyValueStore,
  input: ManualReservationInput,
  by: string,
  now = new Date()
): Promise<Reservation> {
  const confirmation = normalizeConfirmation(input.confirmation)
  if (!confirmation) throw new ReservationError('Confirmation is required')
  if (input.checkOut <= input.checkIn) {
    throw new ReservationError('Check-out must be after check-in')
  }
  if (await getReservation(store, confirmation)) {
    throw new ReservationError('A reservation with this number already exists')
  }

  const reservation: Reservation = {
    confirmation,
    channel: 'manual',
    property: input.property,
    status: 'confirmed',
    guestName: input.guestName.trim(),
    bookedNames: [input.guestName.trim()],
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    pax: input.pax ?? null,
    sourceUpdatedAt: now.toISOString(),
    audit: [{at: now.toISOString(), by, action: 'added manually'}]
  }
  if (accessEndsAt(reservation) <= now.getTime()) {
    throw new ReservationError('This stay has already ended')
  }
  await save(store, reservation)
  return reservation
}
