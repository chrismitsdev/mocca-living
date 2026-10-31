import PostalMime from 'postal-mime'
import {parseHotelo} from './hotelo'
import {parsePrimalRes} from './primal-res'
import {htmlToLines} from './text'
import type {ParseResult, ReservationSource} from './types'

/** Decode a raw MIME message into its HTML (or plain text) body */
export async function decodeEmailBody(
  raw: ArrayBuffer | Uint8Array | string
): Promise<string> {
  const email = await PostalMime.parse(raw)
  return email.html ?? email.text ?? ''
}

/**
 * Parse a reservation email body. The source comes from the verified origin
 * domain, never from the (unverifiable after forwarding) From header
 */
export function parseReservationBody(
  source: ReservationSource,
  body: string
): ParseResult {
  const lines = htmlToLines(body)
  return source === 'primal-res' ? parsePrimalRes(lines) : parseHotelo(lines)
}
