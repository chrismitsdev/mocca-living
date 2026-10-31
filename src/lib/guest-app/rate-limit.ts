import type {KeyValueStore} from './store/kv'

// Fixed-window attempt counters against guessing booking numbers/names

const RATE_LIMIT_KEY_PREFIX = 'guestAppRateLimit:'

export const LIMITS = {
  /** Verification attempts per IP address */
  ip: {limit: 10, windowSeconds: 15 * 60},
  /** Failed attempts per booking number */
  reservationNumber: {limit: 5, windowSeconds: 15 * 60}
}

/** Count one hit; true while the count is within the limit */
export async function hit(
  store: KeyValueStore,
  key: string,
  {limit, windowSeconds}: {limit: number; windowSeconds: number}
): Promise<boolean> {
  const count = await store.incr(
    `${RATE_LIMIT_KEY_PREFIX}${key}`,
    windowSeconds
  )
  return count <= limit
}

/** Current count without counting a hit */
export async function count(
  store: KeyValueStore,
  key: string
): Promise<number> {
  return (await store.get<number>(`${RATE_LIMIT_KEY_PREFIX}${key}`)) ?? 0
}
