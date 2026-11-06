import {notFound, redirect} from 'next/navigation'
import type {NextRequest} from 'next/server'
import {GUEST_APP_HIDDEN} from '@/src/lib/constants'
import {startAdminSession} from '@/src/lib/guest-app/admin/admin-session'
import {consumeLoginToken, isAllowedAdmin} from '@/src/lib/guest-app/admin/auth'
import {guestAppEnv} from '@/src/lib/guest-app/env'
import {createUpstashStore} from '@/src/lib/guest-app/store/upstash'

// Target of the login email link: uses up the single-use token, starts the
// session and goes straight to the dashboard. A bad or used link goes back to
// the login page with a message
export async function GET(request: NextRequest) {
  if (GUEST_APP_HIDDEN) notFound()

  const token = request.nextUrl.searchParams.get('token')?.slice(0, 100) ?? ''
  let error: 'expired' | 'unavailable' | null = null

  try {
    const email = await consumeLoginToken(createUpstashStore(), token)
    // Also re-check the allowlist, in case it changed since the link was sent
    if (email && isAllowedAdmin(email, guestAppEnv.adminEmails())) {
      await startAdminSession(email)
    } else {
      error = 'expired'
    }
  } catch (cause) {
    console.error('guest-app admin login failed', cause)
    error = 'unavailable'
  }

  // Outside the try: redirect() works by throwing
  redirect(error ? `/admin/login?error=${error}` : '/admin/dashboard')
}
