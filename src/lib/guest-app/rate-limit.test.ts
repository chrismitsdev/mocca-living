import {describe, expect, it} from 'vitest'
import {count, hit} from './rate-limit'
import {createMemoryStore} from './store/kv'

describe('rate limiting', () => {
  it('allows hits up to the limit within the window', async () => {
    let clock = Date.parse('2026-10-03T12:00:00Z')
    const store = createMemoryStore(() => clock)
    const limit = {key: 'test:rateLimit:ip', limit: 3, windowSeconds: 60}

    expect(await hit(store, limit, '1')).toBe(true)
    expect(await hit(store, limit, '1')).toBe(true)
    expect(await hit(store, limit, '1')).toBe(true)
    expect(await hit(store, limit, '1')).toBe(false)
    expect(await count(store, limit, '1')).toBe(4)

    // A new window starts once the first one expires
    clock += 61_000
    expect(await hit(store, limit, '1')).toBe(true)
  })

  it('keeps separate counters per key', async () => {
    const store = createMemoryStore()
    const limit = {key: 'test:rateLimit:ip', limit: 1, windowSeconds: 60}

    expect(await hit(store, limit, '1')).toBe(true)
    expect(await hit(store, limit, '2')).toBe(true)
    expect(await hit(store, limit, '1')).toBe(false)
  })

  it('stores the counter under the limit key plus the id', async () => {
    const store = createMemoryStore()
    await hit(
      store,
      {key: 'guest:rateLimit:ip', limit: 1, windowSeconds: 60},
      'abc'
    )
    expect(store.keys()).toEqual(['guest:rateLimit:ip:abc'])
  })
})
