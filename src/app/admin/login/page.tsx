import {notFound, redirect} from 'next/navigation'
import {GUEST_APP_HIDDEN} from '@/src/lib/constants'
import {getAdmin} from '@/src/lib/guest-app/admin/admin-session'
import {AuthCard} from './(components)/auth-card'
import {LoginForm} from './(components)/login-form'

// Set by the email link's route (login/verify/route.ts) when it fails
const notices: Record<string, string> = {
  expired: 'Ο σύνδεσμος έληξε ή έχει ήδη χρησιμοποιηθεί. Ζητήστε νέο σύνδεσμο.',
  unavailable: 'Κάτι πήγε στραβά. Δοκιμάστε ξανά σε λίγο.'
}

export default async function AdminLoginPage({
  searchParams
}: PageProps<'/admin/login'>) {
  if (GUEST_APP_HIDDEN) notFound()

  if (await getAdmin()) redirect('/admin/dashboard')

  const {error} = await searchParams

  return (
    <AuthCard
      title='Διαχείριση'
      description='Εισάγετε το email σας για να λάβετε σύνδεσμο σύνδεσης.'
    >
      <LoginForm
        notice={typeof error === 'string' ? notices[error] : undefined}
      />
    </AuthCard>
  )
}
