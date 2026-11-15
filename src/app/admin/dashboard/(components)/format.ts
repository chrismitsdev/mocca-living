import {PROPERTY_TIMEZONE} from '@/src/lib/guest-app/properties'

// Dates and times in the admin, always in the properties' time zone and on a
// 24-hour clock: h23 shows midnight as 00:00 (h24 would show 24:00, and the
// Greek default is 12-hour with π.μ./μ.μ.)

const dateTimeFormat = new Intl.DateTimeFormat('el-GR', {
  dateStyle: 'medium',
  timeStyle: 'short',
  hourCycle: 'h23',
  timeZone: PROPERTY_TIMEZONE
})

export function formatDateTime(value: number | string): string {
  return dateTimeFormat.format(new Date(value))
}
