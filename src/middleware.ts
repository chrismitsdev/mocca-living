import createMiddleware from 'next-intl/middleware'
import type {MiddlewareConfig} from 'next/server'
import {routing} from '@/src/i18n/routing'

export default createMiddleware(routing)

export const config: MiddlewareConfig = {
  // Match only internationalized pathnames
  matcher: ['/', '/(gr|en)/:path*']
}
