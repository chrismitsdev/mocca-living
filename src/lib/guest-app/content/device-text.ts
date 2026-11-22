import type {useTranslations} from 'next-intl'

/**
 * Key of a device text for a `t` of Pages.guest-app.device-guides, built as
 * `${slug}.${id}.${field}` (field: name, model, description, step-1 to
 * step-4, safety or cleaning). Device ids come from devices.ts, so the key
 * can't be typed. Call `t` with the template inline at each use: the Eloqnt
 * lint only sees dynamic keys written inside the `t(...)` call
 */
export type DeviceTextKey = Parameters<
  ReturnType<typeof useTranslations<'Pages.guest-app.device-guides'>>
>[0]
