import type {GuestAppProperty} from '../properties'

export type ReservationSource = 'primal-res' | 'hotelo'

export type Channel = 'booking' | 'airbnb' | 'expedia' | 'hotelo' | 'other'

export type ParsedReservation = {
  confirmation: string
  channel: Channel
  property: GuestAppProperty
  status: 'confirmed' | 'cancelled'
  /** Primary display name */
  guestName: string
  /** Every name found on the booking, used for surname matching */
  bookedNames: string[]
  /** YYYY-MM-DD, property-local */
  checkIn: string
  /** YYYY-MM-DD, property-local */
  checkOut: string
  pax: number | null
  /** ISO timestamp of the reservation's last update, when the email has one */
  sourceUpdatedAt: string | null
}

export type ParseResult =
  | {type: 'reservation'; reservation: ParsedReservation}
  /** Not a reservation email (e.g. alerts, invoices, newsletters) */
  | {type: 'ignored'; reason: string}
  /** Looks like a reservation but couldn't be read: alert the developer */
  | {type: 'failed'; reason: string}
