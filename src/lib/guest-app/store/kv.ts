// The small subset of Redis the reservation store needs, so the store can be
// tested in memory and run on Upstash in production

export interface KeyValueStore {
  get<T>(key: string): Promise<T | null>
  /** expireAt: epoch seconds after which the key disappears */
  set(key: string, value: unknown, options?: {expireAt?: number}): Promise<void>
  del(key: string): Promise<void>
  /**
   * Increment a counter and return its new value. A new counter expires after
   * ttlSeconds (fixed window); later increments keep that expiry
   */
  incr(key: string, ttlSeconds: number): Promise<number>
  /** Sorted set */
  zadd(key: string, score: number, member: string): Promise<void>
  zrangeByScore(key: string, min: number, max: number): Promise<string[]>
  zrem(key: string, member: string): Promise<void>
  zremRangeByScore(key: string, min: number, max: number): Promise<void>
}

/** In-memory implementation for tests. `now` drives key expiry */
export function createMemoryStore(now: () => number = Date.now) {
  const values = new Map<string, {value: string; expireAt?: number}>()
  const sorted = new Map<string, Map<string, number>>()

  const live = (key: string) => {
    const entry = values.get(key)
    if (entry?.expireAt !== undefined && entry.expireAt * 1000 <= now()) {
      values.delete(key)
      return undefined
    }
    return entry
  }

  const store: KeyValueStore & {keys(): string[]} = {
    async get<T>(key: string) {
      const entry = live(key)
      return entry ? (JSON.parse(entry.value) as T) : null
    },
    async set(key, value, options) {
      values.set(key, {
        value: JSON.stringify(value),
        expireAt: options?.expireAt
      })
    },
    async del(key) {
      values.delete(key)
    },
    async incr(key, ttlSeconds) {
      const entry = live(key)
      const count = (entry ? Number(JSON.parse(entry.value)) : 0) + 1
      values.set(key, {
        value: JSON.stringify(count),
        expireAt: entry?.expireAt ?? Math.floor(now() / 1000) + ttlSeconds
      })
      return count
    },
    async zadd(key, score, member) {
      const set = sorted.get(key) ?? new Map<string, number>()
      set.set(member, score)
      sorted.set(key, set)
    },
    async zrangeByScore(key, min, max) {
      return [...(sorted.get(key) ?? [])]
        .filter(([, score]) => score >= min && score <= max)
        .sort(([, a], [, b]) => a - b)
        .map(([member]) => member)
    },
    async zrem(key, member) {
      sorted.get(key)?.delete(member)
    },
    async zremRangeByScore(key, min, max) {
      const set = sorted.get(key)
      for (const [member, score] of set ?? []) {
        if (score >= min && score <= max) set?.delete(member)
      }
    },
    keys() {
      return [...values.keys()].filter((key) => live(key))
    }
  }
  return store
}
