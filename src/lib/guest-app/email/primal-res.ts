import {normalizeReservationNumber} from '../normalize'
import {mapPropertyName} from '../properties'
import {parsePax, parseSlashDate, valueAfter} from './text'
import type {Channel, ParseResult} from './types'

// Reservation emails from the Primal Res channel manager (Booking.com, Airbnb).
// Timestamps carry no zone; they match the UTC send time of the email

const STAY_LINE = /^(\d{2}\/\d{2}\/\d{4})\s*-\s*(\d{2}\/\d{2}\/\d{4})$/
const TIMESTAMP = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/

function toChannel(label: string): Channel {
  if (/booking\.com/i.test(label)) return 'booking'
  if (/airbnb/i.test(label)) return 'airbnb'
  if (/expedia/i.test(label)) return 'expedia'
  return 'other'
}

function parseTimestamp(value: string | undefined): string | null {
  const match = value?.match(TIMESTAMP)
  if (!match) return null
  const [, day, month, year, hours, minutes, seconds] = match
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`
}

export function parsePrimalRes(lines: string[]): ParseResult {
  const resLine = lines.find((line) => /^Res ID:/i.test(line))
  if (!resLine) return {type: 'ignored', reason: 'no Res ID'}

  const reservationNumber = resLine.match(/^Res ID:\s*([A-Z0-9-]+)/i)?.[1]
  if (!reservationNumber) return {type: 'failed', reason: 'unreadable Res ID'}

  // "<Property>" / "<Channel> - (" / "Booking Confirmation )"
  const channelIndex = lines.findIndex((line) => /\s-\s*\($/.test(line))
  if (channelIndex < 1) return {type: 'failed', reason: 'no channel line'}

  const propertyName = lines[channelIndex - 1]
  const property = mapPropertyName(propertyName)
  if (!property) {
    return {type: 'failed', reason: `unknown property "${propertyName}"`}
  }

  const header = `${lines[channelIndex]} ${lines[channelIndex + 1] ?? ''}`
  const status = /cancel/i.test(header) ? 'cancelled' : 'confirmed'

  const stays = lines.flatMap((line) => {
    const match = line.match(STAY_LINE)
    if (!match) return []
    const [checkIn, checkOut] = [match[1], match[2]].map(parseSlashDate)
    return checkIn && checkOut ? [{checkIn, checkOut}] : []
  })
  if (!stays.length) return {type: 'failed', reason: 'no stay dates'}

  // "Booked By" is always the booker; "Guest Info" may name someone else
  const bookerName = valueAfter(lines, /^Booked By:/i)
  if (!bookerName) return {type: 'failed', reason: 'no booker name'}

  // A booking with several rooms spans from the earliest to the latest date
  const checkIns = stays.map((stay) => stay.checkIn).sort()
  const checkOuts = stays.map((stay) => stay.checkOut).sort()

  return {
    type: 'reservation',
    reservation: {
      reservationNumber: normalizeReservationNumber(reservationNumber),
      channel: toChannel(lines[channelIndex]),
      property,
      status,
      bookerName,
      checkIn: checkIns[0],
      checkOut: checkOuts[checkOuts.length - 1],
      pax: parsePax(valueAfter(lines, /^(Rooms|Units), Pax:/i)),
      sourceUpdatedAt: parseTimestamp(valueAfter(lines, /^Last Update:/i))
    }
  }
}
