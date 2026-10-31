// Conversions between property-local wall time and absolute instants

/** Minutes the time zone is ahead of UTC at a given instant */
function offsetMinutes(epochMs: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).formatToParts(new Date(epochMs))
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value)

  const wallAsUtc = Date.UTC(
    get('year'),
    get('month') - 1,
    get('day'),
    get('hour'),
    get('minute'),
    get('second')
  )
  return Math.round((wallAsUtc - epochMs) / 60_000)
}

/** Epoch milliseconds of a local date ("YYYY-MM-DD") and time ("HH:MM") */
export function zonedTimeToEpochMs(
  date: string,
  time: string,
  timeZone: string
): number {
  const [year, month, day] = date.split('-').map(Number)
  const [hours, minutes] = time.split(':').map(Number)
  const wall = Date.UTC(year, month - 1, day, hours, minutes)

  // Two passes settle the offset around DST transitions
  const first = wall - offsetMinutes(wall, timeZone) * 60_000
  return wall - offsetMinutes(first, timeZone) * 60_000
}

/** Local calendar date ("YYYY-MM-DD") of an instant */
export function zonedDate(epochMs: number, timeZone: string): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date(epochMs))
}

/** Add whole days to a "YYYY-MM-DD" date */
export function addDays(date: string, days: number): string {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day + days))
    .toISOString()
    .slice(0, 10)
}
