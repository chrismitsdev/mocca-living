import {nameMatches} from './normalize'
import {PROPERTY_TIMEZONE} from './properties'
import {accessEndsAt, type Reservation} from './store/reservations'
import {zonedTimeToEpochMs} from './time'

// Whether a guest may use the guest app right now: an active booking, the
// booker's name and the stay window (00:00 on arrival day until check-out
// time on departure day, or a later owner override)

export type AccessWindow = {opensAt: number; endsAt: number}

export function accessWindow(reservation: Reservation): AccessWindow {
  return {
    opensAt: zonedTimeToEpochMs(
      reservation.checkIn,
      '00:00',
      PROPERTY_TIMEZONE
    ),
    endsAt: accessEndsAt(reservation)
  }
}

export type AccessDecision =
  | {ok: true; property: PropertySlug; endsAt: number}
  | {ok: false; reason: 'not-found'}
  | {ok: false; reason: 'name-mismatch'}
  | {ok: false; reason: 'not-yet'; opensAt: number}
  | {ok: false; reason: 'ended'}

/** Window check alone, for re-validating an existing session */
export function windowDecision(
  reservation: Reservation | null,
  now: number
): AccessDecision {
  if (reservation?.status !== 'confirmed') {
    return {ok: false, reason: 'not-found'}
  }
  const {opensAt, endsAt} = accessWindow(reservation)
  if (now < opensAt) return {ok: false, reason: 'not-yet', opensAt}
  if (now >= endsAt) return {ok: false, reason: 'ended'}
  return {ok: true, property: reservation.property, endsAt}
}

/** Full check for a guest entering their booking details */
export function checkAccess(
  reservation: Reservation | null,
  name: string,
  now: number
): AccessDecision {
  if (reservation?.status !== 'confirmed') {
    return {ok: false, reason: 'not-found'}
  }
  if (!nameMatches(name, reservation.bookerName)) {
    return {ok: false, reason: 'name-mismatch'}
  }
  return windowDecision(reservation, now)
}
