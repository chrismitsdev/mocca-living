import type {MiddlewareConfig} from 'next/server'
import createMiddleware from 'next-intl/middleware'
import {routing} from '@/src/i18n/routing'

export default createMiddleware(routing)

export const config: MiddlewareConfig = {
  // Match only internationalized pathnames; /admin (the guest-app admin)
  // is Greek only and lives outside [locale]
  matcher: '/((?!api|admin|trpc|_next|_vercel|.*\\..*).*)'
}
