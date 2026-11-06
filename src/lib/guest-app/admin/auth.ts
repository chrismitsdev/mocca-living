import {createHash, randomBytes} from 'node:crypto'
import type {KeyValueStore} from '../store/kv'

// Admin authentication: single-use login links and server-side sessions.
// Redis only ever holds a SHA-256 of a token or session id, so reading the
// database doesn't give anyone a working link or session

export const LOGIN_TOKEN_TTL_SECONDS = 15 * 60
export const ADMIN_SESSION_TTL_SECONDS = 24 * 60 * 60

const LOGIN_TOKEN_KEY_PREFIX = 'guestAppAdminLoginToken:'
const ADMIN_SESSION_KEY_PREFIX = 'guestAppAdminSession:'

const sha256 = (value: string) =>
  createHash('sha256').update(value).digest('base64url')

const randomSecret = () => randomBytes(32).toString('base64url')

const nowSeconds = (now: number) => Math.floor(now / 1000)

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function isAllowedAdmin(email: string, allowlist: string[]): boolean {
  return allowlist.includes(normalizeEmail(email))
}

/** A new single-use login token for this email; returns the raw token */
export async function createLoginToken(
  store: KeyValueStore,
  email: string,
  now = Date.now()
): Promise<string> {
  const token = randomSecret()
  await store.set(
    `${LOGIN_TOKEN_KEY_PREFIX}${sha256(token)}`,
    normalizeEmail(email),
    {expireAt: nowSeconds(now) + LOGIN_TOKEN_TTL_SECONDS}
  )
  return token
}

/** The email a token was issued for, or null; the token can't be used again */
export async function consumeLoginToken(
  store: KeyValueStore,
  token: string
): Promise<string | null> {
  if (!token) return null
  return store.take<string>(`${LOGIN_TOKEN_KEY_PREFIX}${sha256(token)}`)
}

/** A new session for this email; returns the raw session id for the cookie */
export async function createAdminSession(
  store: KeyValueStore,
  email: string,
  now = Date.now()
): Promise<string> {
  const sessionId = randomSecret()
  await store.set(
    `${ADMIN_SESSION_KEY_PREFIX}${sha256(sessionId)}`,
    normalizeEmail(email),
    {expireAt: nowSeconds(now) + ADMIN_SESSION_TTL_SECONDS}
  )
  return sessionId
}

export async function getAdminSessionEmail(
  store: KeyValueStore,
  sessionId: string | undefined
): Promise<string | null> {
  if (!sessionId) return null
  return store.get<string>(`${ADMIN_SESSION_KEY_PREFIX}${sha256(sessionId)}`)
}

export async function deleteAdminSession(
  store: KeyValueStore,
  sessionId: string | undefined
): Promise<void> {
  if (!sessionId) return
  await store.del(`${ADMIN_SESSION_KEY_PREFIX}${sha256(sessionId)}`)
}
