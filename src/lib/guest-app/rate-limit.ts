import type {KeyValueStore} from './store/kv'

// Fixed-window attempt counters against guessing booking numbers/names and
// against flooding the admin login. Each counter's Redis key is the limit's
// key plus what it counts, e.g. "guest:rateLimit:ip:<hashed ip>"

export type Limit = {key: string; limit: number; windowSeconds: number}

export const LIMITS = {
  /** Verification attempts per IP address */
  ip: {key: 'guest:rateLimit:ip', limit: 10, windowSeconds: 15 * 60},
  /** Failed attempts per booking number */
  reservationNumber: {
    key: 'guest:rateLimit:reservationNumber',
    limit: 5,
    windowSeconds: 15 * 60
  },
  /** Admin login link requests per IP address */
  adminLoginIp: {key: 'admin:rateLimit:ip', limit: 5, windowSeconds: 15 * 60},
  /** Admin login link requests per email address */
  adminLoginEmail: {
    key: 'admin:rateLimit:email',
    limit: 3,
    windowSeconds: 15 * 60
  }
} satisfies Record<string, Limit>

/** Count one hit; true while the count is within the limit */
export async function hit(
  store: KeyValueStore,
  {key, limit, windowSeconds}: Limit,
  id: string
): Promise<boolean> {
  const count = await store.incr(`${key}:${id}`, windowSeconds)
  return count <= limit
}

/** Current count without counting a hit */
export async function count(
  store: KeyValueStore,
  {key}: Pick<Limit, 'key'>,
  id: string
): Promise<number> {
  return (await store.get<number>(`${key}:${id}`)) ?? 0
}
