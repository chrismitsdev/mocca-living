import {normalizeConfirmation} from '../normalize'
import {mapPropertyName} from '../properties'
import {parseLongDate, parsePax, valueAfter} from './text'
import type {ParseResult} from './types'

// Direct-booking confirmations sent by Hotelo to the guest (owner in copy)

export function parseHotelo(lines: string[]): ParseResult {
  const reference = valueAfter(lines, /booking reference:/i)
  if (!reference) return {type: 'ignored', reason: 'no booking reference'}

  const confirmation = reference.match(/#?\s*(\d{6,})/)?.[1]
  if (!confirmation) return {type: 'failed', reason: 'unreadable reference'}

  const heading = lines.slice(0, 3).join(' ')
  const status = /cancel/i.test(heading)
    ? 'cancelled'
    : /confirm/i.test(heading)
      ? 'confirmed'
      : null
  if (!status) return {type: 'failed', reason: `unknown heading "${heading}"`}

  const checkIn = parseLongDate(valueAfter(lines, /^CHECK-IN$/i) ?? '')
  const checkOut = parseLongDate(valueAfter(lines, /^CHECK-OUT$/i) ?? '')
  if (!checkIn || !checkOut) return {type: 'failed', reason: 'no stay dates'}

  const propertyName = valueAfter(lines, /^PROPERTY$/i)
  const roomName = lines
    .map((line) => line.match(/^Room \d+:\s*(.+)$/i)?.[1])
    .find(Boolean)
  const property = mapPropertyName(propertyName, roomName)
  if (!property) {
    return {
      type: 'failed',
      reason: `unknown property "${propertyName}" / room "${roomName}"`
    }
  }

  const billing = lines.findIndex((line) => /^Billing Information$/i.test(line))
  const bookerName =
    billing === -1 ? undefined : valueAfter(lines, /^Name$/i, billing)
  if (!bookerName) return {type: 'failed', reason: 'no booker name'}

  return {
    type: 'reservation',
    reservation: {
      confirmation: normalizeConfirmation(confirmation),
      channel: 'hotelo',
      property,
      status,
      bookerName,
      checkIn,
      checkOut,
      pax: parsePax(lines.find((line) => /\d+\s*adults?/i.test(line))),
      sourceUpdatedAt: null
    }
  }
}
