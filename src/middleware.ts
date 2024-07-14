import type {MiddlewareConfig} from 'next/server'
import createMiddleware from 'next-intl/middleware'
import {locales, localePrefix} from '../lib/config'
 
export default createMiddleware({
  // A list of all locales that are supported
  locales,
  // Enable/disable locale detection based on the "accept-language" header and cookie value
  localeDetection: true,
  // Optionally remove the locale prefix or customize it per locale
  localePrefix,
  // Used as a fallback when none of the available locales match the user's request
  defaultLocale: 'gr',
})

export const config: MiddlewareConfig = {
  matcher: ['/((?!_next|.*\\..*).*)']
}