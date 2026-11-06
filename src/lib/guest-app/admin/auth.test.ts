import {beforeEach, describe, expect, it} from 'vitest'
import {createMemoryStore} from '../store/kv'
import {
  ADMIN_SESSION_TTL_SECONDS,
  consumeLoginToken,
  createAdminSession,
  createLoginToken,
  deleteAdminSession,
  getAdminSessionEmail,
  isAllowedAdmin,
  LOGIN_TOKEN_TTL_SECONDS
} from './auth'

let clock = Date.parse('2026-10-03T12:00:00Z')
let store = createMemoryStore(() => clock)

beforeEach(() => {
  clock = Date.parse('2026-10-03T12:00:00Z')
  store = createMemoryStore(() => clock)
})

describe('isAllowedAdmin', () => {
  const allowlist = ['owner@example.com', 'dev@example.com']

  it('matches allowlisted emails regardless of case and spaces', () => {
    expect(isAllowedAdmin(' Owner@Example.com ', allowlist)).toBe(true)
    expect(isAllowedAdmin('dev@example.com', allowlist)).toBe(true)
  })

  it('rejects other emails', () => {
    expect(isAllowedAdmin('someone@example.com', allowlist)).toBe(false)
    expect(isAllowedAdmin('', allowlist)).toBe(false)
  })
})

describe('login tokens', () => {
  it('returns the email once, then never again', async () => {
    const token = await createLoginToken(store, 'Owner@Example.com', clock)

    expect(await consumeLoginToken(store, token)).toBe('owner@example.com')
    expect(await consumeLoginToken(store, token)).toBeNull()
  })

  it('expire after 15 minutes', async () => {
    const token = await createLoginToken(store, 'owner@example.com', clock)
    clock += LOGIN_TOKEN_TTL_SECONDS * 1000

    expect(await consumeLoginToken(store, token)).toBeNull()
  })

  it('rejects unknown and empty tokens', async () => {
    await createLoginToken(store, 'owner@example.com', clock)

    expect(await consumeLoginToken(store, 'not-a-token')).toBeNull()
    expect(await consumeLoginToken(store, '')).toBeNull()
  })

  it('stores only a hash of the token', async () => {
    const token = await createLoginToken(store, 'owner@example.com', clock)
    const keys = store.keys()

    expect(keys).toHaveLength(1)
    expect(keys[0]).toMatch(/^guestAppAdminLoginToken:/)
    expect(keys[0]).not.toContain(token)
  })
})

describe('admin sessions', () => {
  it('resolve to the email until deleted', async () => {
    const sessionId = await createAdminSession(
      store,
      'owner@example.com',
      clock
    )

    expect(await getAdminSessionEmail(store, sessionId)).toBe(
      'owner@example.com'
    )
    await deleteAdminSession(store, sessionId)
    expect(await getAdminSessionEmail(store, sessionId)).toBeNull()
  })

  it('expire after 24 hours', async () => {
    const sessionId = await createAdminSession(
      store,
      'owner@example.com',
      clock
    )
    clock += ADMIN_SESSION_TTL_SECONDS * 1000

    expect(await getAdminSessionEmail(store, sessionId)).toBeNull()
  })

  it('stores only a hash of the session id', async () => {
    const sessionId = await createAdminSession(
      store,
      'owner@example.com',
      clock
    )
    const keys = store.keys()

    expect(keys[0]).toMatch(/^guestAppAdminSession:/)
    expect(keys[0]).not.toContain(sessionId)
    expect(await getAdminSessionEmail(store, undefined)).toBeNull()
  })
})

describe('memory store take', () => {
  it('returns a value once and removes it', async () => {
    await store.set('key', 'value')

    expect(await store.take('key')).toBe('value')
    expect(await store.take('key')).toBeNull()
    expect(await store.get('key')).toBeNull()
  })
})
