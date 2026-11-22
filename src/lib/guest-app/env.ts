import {SITE_URL} from '@/src/lib/constants'
import type {GuestAppProperty} from './properties'

// Guest-app configuration, read on demand so a missing variable fails the
// request that needs it instead of the whole build

function required(name: string): string {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`Missing environment variable ${name}`)
  return value
}

function optional(name: string): string | null {
  return process.env[name]?.trim() || null
}

// Wi-Fi details stay out of the public repo: GUEST_APP_WIFI_<KEY>_NETWORK and
// GUEST_APP_WIFI_<KEY>_PASSWORD per rentable property
const WIFI_ENV_KEYS: Record<GuestAppProperty, string> = {
  'mocca-by-the-sea-dimitra': 'DIMITRA',
  'mocca-city': 'MOCCA_CITY'
}

export type WifiDetails = {network: string | null; password: string | null}

export const guestAppEnv = {
  redisUrl: () => required('GUEST_APP_REDIS_KV_REST_API_URL'),
  redisToken: () => required('GUEST_APP_REDIS_KV_REST_API_TOKEN'),
  resendApiKey: () => required('RESEND_API_KEY'),
  inboundWebhookSecret: () => required('RESEND_INBOUND_WEBHOOK_SECRET'),
  inboundAddress: () => required('GUEST_APP_INBOUND_ADDRESS').toLowerCase(),
  alertEmail: () => required('GUEST_APP_ALERT_EMAIL'),
  sessionSecret: () => required('GUEST_APP_SESSION_SECRET'),
  /** Admin allowlist, lowercased */
  adminEmails: () =>
    required('GUEST_APP_ADMIN_EMAILS')
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  /** Wi-Fi of a property; either field is null when not configured */
  wifi: (property: GuestAppProperty): WifiDetails => {
    const key = WIFI_ENV_KEYS[property]
    return {
      network: optional(`GUEST_APP_WIFI_${key}_NETWORK`),
      password: optional(`GUEST_APP_WIFI_${key}_PASSWORD`)
    }
  },
  /**
   * Base URL for links in emails. Taken from Vercel's own variables, never
   * from the request's Host header
   */
  appUrl: () => {
    if (process.env.VERCEL_ENV === 'production') return SITE_URL
    const host = process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL
    return host ? `https://${host}` : 'http://localhost:3000'
  }
}
