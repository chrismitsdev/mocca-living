import type {Reservation} from '@/src/lib/guest-app/store/reservations'

// Greek labels for the admin

export const PROPERTY_LABELS: Record<PropertySlug, string> = {
  'mocca-by-the-sea-dimitra': 'Mocca by the Sea · Dimitra',
  'mocca-by-the-sea-georgia': 'Mocca by the Sea · Georgia',
  'mocca-city': 'Mocca City'
}

export const CHANNEL_LABELS: Record<Reservation['channel'], string> = {
  booking: 'Booking.com',
  airbnb: 'Airbnb',
  hotelo: 'Hotelo',
  other: 'Άλλο',
  admin: 'Διαχειριστής'
}

// What the dashboard shows. A stored "confirmed" booking is shown by where
// it is in the guest-app access window (see booking-row.ts); cancelled and
// revoked are shown as stored
export type DisplayStatus =
  | 'upcoming'
  | 'active'
  | 'expired'
  | Exclude<Reservation['status'], 'confirmed'>

export const STATUS_LABELS: Record<DisplayStatus, string> = {
  upcoming: 'Ανοίγει σύντομα',
  active: 'Ενεργή',
  expired: 'Έληξε',
  cancelled: 'Ακυρώθηκε',
  revoked: 'Ανακλήθηκε'
}
