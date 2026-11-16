'use client'

import {IconLogout} from '@tabler/icons-react'
import {useActionState} from 'react'
import {Button} from '@/src/components/ui/button'
import {logoutAction} from '@/src/lib/guest-app/admin/actions'

/** Ends the admin session; shows the loading state until the redirect */
function LogoutButton() {
  const [, action, isPending] = useActionState<void>(logoutAction, undefined)

  return (
    <form action={action}>
      <Button
        type='submit'
        variant='secondary'
        isLoading={isPending}
      >
        Αποσύνδεση
        <IconLogout aria-hidden />
      </Button>
    </form>
  )
}

export {LogoutButton}
