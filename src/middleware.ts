import type {MiddlewareConfig} from 'next/server'
import createMiddleware from 'next-intl/middleware'
import {routing} from '@/i18n/routing'

export default createMiddleware({...routing, localeDetection: true})

export const config: MiddlewareConfig = {
  // Match only internationalized pathnames
  matcher: ['/', '/(gr|en)/:path*']
}

// export const config: MiddlewareConfig = {
//   matcher: ['/((?!_next|.*\\..*).*)']
// }
