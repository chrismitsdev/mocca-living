import createMiddleware from 'next-intl/middleware'
import type {MiddlewareConfig} from 'next/server'
import {routing} from '@/src/i18n/routing'

export default createMiddleware(routing)

export const config: MiddlewareConfig = {
  // Match only internationalized pathnames
  matcher: ['/', '/(gr|en)/:path*']
}

// export const config: MiddlewareConfig = {
//   // Match all pathnames except for
//   // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
//   // - … the ones containing a dot (e.g. `favicon.ico`)
//   matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
// }
