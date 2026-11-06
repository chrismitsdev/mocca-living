import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import {guestAppEnv} from '../env'
import {createUpstashStore} from '../store/upstash'
import {
  ADMIN_SESSION_TTL_SECONDS,
  createAdminSession,
  deleteAdminSession,
  getAdminSessionEmail,
  isAllowedAdmin
} from './auth'

// The admin session cookie. It only carries a random id; the session
// itself lives in Redis, so logging out really ends it

const COOKIE_NAME = 'guest_app_admin_session'

export async function startAdminSession(email: string) {
  const sessionId = await createAdminSession(createUpstashStore(), email)
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_SESSION_TTL_SECONDS
  })
}

/** The signed-in admin's email, or null (also once removed from the allowlist) */
export async function getAdmin(): Promise<string | null> {
  const cookieStore = await cookies()
  const email = await getAdminSessionEmail(
    createUpstashStore(),
    cookieStore.get(COOKIE_NAME)?.value
  )
  return email && isAllowedAdmin(email, guestAppEnv.adminEmails())
    ? email
    : null
}

/** The signed-in admin's email; anyone else is sent to the login page */
export async function requireAdmin(): Promise<string> {
  const email = await getAdmin()
  if (!email) redirect('/admin/login')
  return email
}

export async function endAdminSession() {
  const cookieStore = await cookies()
  await deleteAdminSession(
    createUpstashStore(),
    cookieStore.get(COOKIE_NAME)?.value
  )
  cookieStore.delete(COOKIE_NAME)
}
