import {afterEach, describe, expect, it, vi} from 'vitest'
import {guestAppEnv} from './env'

describe('guestAppEnv.wifi', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('reads the network and password of the property', () => {
    vi.stubEnv('GUEST_APP_WIFI_MOCCA_CITY_NETWORK', ' Mocca City ')
    vi.stubEnv('GUEST_APP_WIFI_MOCCA_CITY_PASSWORD', 'secret')

    expect(guestAppEnv.wifi('mocca-city')).toEqual({
      network: 'Mocca City',
      password: 'secret'
    })
  })

  it('returns null for a field that is missing or blank', () => {
    vi.stubEnv('GUEST_APP_WIFI_DIMITRA_NETWORK', '')
    vi.stubEnv('GUEST_APP_WIFI_DIMITRA_PASSWORD', 'secret')

    expect(guestAppEnv.wifi('mocca-by-the-sea-dimitra')).toEqual({
      network: null,
      password: 'secret'
    })
  })

  it('never reads another property’s variables', () => {
    vi.stubEnv('GUEST_APP_WIFI_DIMITRA_PASSWORD', 'dimitra')

    expect(guestAppEnv.wifi('mocca-city').password).toBeNull()
  })
})
