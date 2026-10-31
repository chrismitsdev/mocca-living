import type {GuestAppProperty} from '../properties'

export type ReservationSource = 'primal-res' | 'hotelo'

export type Channel = 'booking' | 'airbnb' | 'expedia' | 'hotelo' | 'other'

export type ParsedReservation = {
  confirmation: string
  channel: Channel
  property: GuestAppProperty
  status: 'confirmed' | 'cancelled'
  /** The booker's full name exactly as the platform saved it */
  bookerName: string
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
