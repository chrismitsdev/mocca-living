import type {Badge} from '@/src/components/ui/badge'
import {accessWindow} from '@/src/lib/guest-app/access'
import {PROPERTY_TIMES, PROPERTY_TIMEZONE} from '@/src/lib/guest-app/properties'
import {
  accessEndsAt,
  isChangeable,
  type Reservation
} from '@/src/lib/guest-app/store/reservations'
import {
  zonedDate,
  zonedTime,
  zonedTimeToEpochMs
} from '@/src/lib/guest-app/time'
import {formatDate, formatDateTime} from './format'
import {
  CHANNEL_LABELS,
  type DisplayStatus,
  PROPERTY_LABELS,
  STATUS_LABELS
} from './labels'

// Display values for one booking, shared by the desktop table and the mobile
// list so both always show the same thing. Plain strings only: rows are
// passed to client components

const STATUS_VARIANTS: Record<DisplayStatus, BookingRow['statusVariant']> = {
  upcoming: 'info',
  active: 'success',
  expired: 'error',
  cancelled: 'error',
  revoked: 'error'
}

export type BookingRow = {
  reservationNumber: string
  bookerName: string
  property: string
  checkIn: string
  checkOut: string
  guestCount: string
  channel: string
  status: DisplayStatus
  statusLabel: string
  /** Badge colour for the status */
  statusVariant: React.ComponentProps<typeof Badge>['variant']
  /** When access ends (check-out time, or the extension); "—" when the
   * booking has no access at all (cancelled or revoked) */
  accessEnds: string
  /** The same moment as form values, property-local: "YYYY-MM-DD", "HH:MM" */
  accessEndsDate: string
  accessEndsTime: string
  /** True when the owner extended access past check-out */
  extended: boolean
  canExtend: boolean
  canRevoke: boolean
}

type Phase = 'upcoming' | 'active' | 'expired'

/**
 * Where "now" falls in the guest-app access window. Uses the guest app's own
 * accessWindow, so the dashboard always matches what the guest gets
 */
function phaseOf(reservation: Reservation, now: number): Phase {
  const {opensAt, endsAt} = accessWindow(reservation)
  if (now < opensAt) return 'upcoming'
  if (now < endsAt) return 'active'
  return 'expired'
}

function toBookingRow(reservation: Reservation, now: number): BookingRow {
  const checkOutAt = zonedTimeToEpochMs(
    reservation.checkOut,
    PROPERTY_TIMES[reservation.property].checkOut,
    PROPERTY_TIMEZONE
  )
  const endsAt = accessEndsAt(reservation)
  const confirmed = reservation.status === 'confirmed'
  // Worked out on read, never stored
  const status: DisplayStatus =
    reservation.status === 'confirmed'
      ? phaseOf(reservation, now)
      : reservation.status
  // Same rule the server actions enforce
  const changeable = isChangeable(reservation, now)

  return {
    reservationNumber: reservation.reservationNumber,
    bookerName: reservation.bookerName,
    property: PROPERTY_LABELS[reservation.property],
    checkIn: formatDate(reservation.checkIn),
    checkOut: formatDate(reservation.checkOut),
    guestCount:
      reservation.guestCount === null ? '—' : String(reservation.guestCount),
    channel: CHANNEL_LABELS[reservation.channel],
    status,
    statusLabel: STATUS_LABELS[status],
    statusVariant: STATUS_VARIANTS[status],
    // Cancelled and revoked bookings never let the guest in
    accessEnds: confirmed ? formatDateTime(endsAt) : '—',
    accessEndsDate: zonedDate(endsAt, PROPERTY_TIMEZONE),
    accessEndsTime: zonedTime(endsAt, PROPERTY_TIMEZONE),
    extended: confirmed && endsAt > checkOutAt,
    canExtend: changeable,
    canRevoke: changeable
  }
}

// Current stays first, then upcoming, then expired; by arrival within each
// group. Cancelled and revoked bookings sit with their dates' group
const PHASE_ORDER: Record<Phase, number> = {
  active: 0,
  upcoming: 1,
  expired: 2
}

/** Display rows for the dashboard, in display order */
export function toBookingRows(
  reservations: Reservation[],
  now: number
): BookingRow[] {
  return reservations
    .map((reservation) => ({
      order: PHASE_ORDER[phaseOf(reservation, now)],
      checkIn: reservation.checkIn,
      row: toBookingRow(reservation, now)
    }))
    .sort((a, b) => a.order - b.order || a.checkIn.localeCompare(b.checkIn))
    .map(({row}) => row)
}
