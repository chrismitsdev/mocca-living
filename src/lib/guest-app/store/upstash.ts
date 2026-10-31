import {Redis} from '@upstash/redis'
import {guestAppEnv} from '../env'
import type {KeyValueStore} from './kv'

// Upstash implementation of the key-value interface. Automatic
// deserialization is off: it would turn number-like members such as
// "0012345" into numbers, so values are (de)serialised here instead

const finite = (value: number) =>
  Number.isFinite(value)
    ? value
    : value > 0
      ? Number.MAX_SAFE_INTEGER
      : -Number.MAX_SAFE_INTEGER

let redis: Redis | undefined

function client(): Redis {
  redis ??= new Redis({
    url: guestAppEnv.redisUrl(),
    token: guestAppEnv.redisToken(),
    automaticDeserialization: false
  })
  return redis
}

export function createUpstashStore(): KeyValueStore {
  return {
    async get<T>(key: string) {
      const value = await client().get<string>(key)
      return value === null ? null : (JSON.parse(value) as T)
    },
    async set(key, value, options) {
      const serialized = JSON.stringify(value)
      if (options?.expireAt) {
        await client().set(key, serialized, {exat: options.expireAt})
      } else {
        await client().set(key, serialized)
      }
    },
    async del(key) {
      await client().del(key)
    },
    async incr(key, ttlSeconds) {
      const [count] = await client()
        .pipeline()
        .incr(key)
        .expire(key, ttlSeconds, 'NX')
        .exec<[number, number]>()
      return Number(count)
    },
    async zadd(key, score, member) {
      await client().zadd(key, {score, member})
    },
    async zrangeByScore(key, min, max) {
      return client().zrange<string[]>(key, finite(min), finite(max), {
        byScore: true
      })
    },
    async zrem(key, member) {
      await client().zrem(key, member)
    },
    async zremRangeByScore(key, min, max) {
      await client().zremrangebyscore(key, finite(min), finite(max))
    }
  }
}
