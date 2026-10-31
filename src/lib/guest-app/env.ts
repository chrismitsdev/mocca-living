// Guest-app configuration, read on demand so a missing variable fails the
// request that needs it instead of the whole build

function required(name: string): string {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`Missing environment variable ${name}`)
  return value
}

export const guestAppEnv = {
  redisUrl: () => required('GUEST_APP_REDIS_KV_REST_API_URL'),
  redisToken: () => required('GUEST_APP_REDIS_KV_REST_API_TOKEN'),
  resendApiKey: () => required('RESEND_API_KEY'),
  inboundWebhookSecret: () => required('RESEND_INBOUND_WEBHOOK_SECRET'),
  inboundAddress: () => required('GUEST_APP_INBOUND_ADDRESS').toLowerCase(),
  alertEmail: () => required('GUEST_APP_ALERT_EMAIL')
}
