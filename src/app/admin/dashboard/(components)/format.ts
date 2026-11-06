import {PROPERTY_TIMEZONE} from '@/src/lib/guest-app/properties'
import {zonedTimeToEpochMs} from '@/src/lib/guest-app/time'

// Dates and times in the admin, always in the properties' time zone

const dateFormat = new Intl.DateTimeFormat('el-GR', {
  dateStyle: 'medium',
  timeZone: PROPERTY_TIMEZONE
})

const dateTimeFormat = new Intl.DateTimeFormat('el-GR', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: PROPERTY_TIMEZONE
})

/** A "YYYY-MM-DD" property-local date */
export function formatDate(date: string): string {
  return dateFormat.format(zonedTimeToEpochMs(date, '12:00', PROPERTY_TIMEZONE))
}

export function formatDateTime(value: number | string): string {
  return dateTimeFormat.format(new Date(value))
}
