import {createHmac} from 'node:crypto'
import {headers} from 'next/headers'
import {guestAppEnv} from './env'

// Keyed hashes for rate-limit keys, so raw IP or email addresses are never
// stored in Redis

export function hashForKey(value: string): string {
  return createHmac('sha256', guestAppEnv.sessionSecret())
    .update(value)
    .digest('base64url')
    .slice(0, 22)
}

/** The client's IP address, hashed */
export async function clientKey(): Promise<string> {
  const headerList = await headers()
  const ip =
    headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headerList.get('x-real-ip') ||
    'unknown'
  return hashForKey(ip)
}
