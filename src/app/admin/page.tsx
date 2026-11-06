import {notFound, redirect} from 'next/navigation'
import {GUEST_APP_HIDDEN} from '@/src/lib/constants'
import {getAdmin} from '@/src/lib/guest-app/admin/admin-session'

// Entry point: signed-in admins go to the dashboard, everyone else to login
export default async function AdminPage() {
  if (GUEST_APP_HIDDEN) notFound()

  redirect((await getAdmin()) ? '/admin/dashboard' : '/admin/login')
}
