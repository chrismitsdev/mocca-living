import {describe, expect, it} from 'vitest'
import {count, hit} from './rate-limit'
import {createMemoryStore} from './store/kv'

describe('rate limiting', () => {
  it('allows hits up to the limit within the window', async () => {
    let clock = Date.parse('2026-10-03T12:00:00Z')
    const store = createMemoryStore(() => clock)
    const limit = {limit: 3, windowSeconds: 60}

    expect(await hit(store, 'ip:1', limit)).toBe(true)
    expect(await hit(store, 'ip:1', limit)).toBe(true)
    expect(await hit(store, 'ip:1', limit)).toBe(true)
    expect(await hit(store, 'ip:1', limit)).toBe(false)
    expect(await count(store, 'ip:1')).toBe(4)

    // A new window starts once the first one expires
    clock += 61_000
    expect(await hit(store, 'ip:1', limit)).toBe(true)
  })

  it('keeps separate counters per key', async () => {
    const store = createMemoryStore()
    const limit = {limit: 1, windowSeconds: 60}

    expect(await hit(store, 'ip:1', limit)).toBe(true)
    expect(await hit(store, 'ip:2', limit)).toBe(true)
    expect(await hit(store, 'ip:1', limit)).toBe(false)
  })
})
