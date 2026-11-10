'use client'

import {IconMail, IconSend2} from '@tabler/icons-react'
import {useActionState} from 'react'
import {FormControl} from '@/src/components/shared/form-control'
import {Button} from '@/src/components/ui/button'
import {Input} from '@/src/components/ui/input'
import {Label} from '@/src/components/ui/label'
import {useResultToast} from '@/src/hooks/use-result-toast'
import {
  type AdminFormState,
  requestLoginAction
} from '@/src/lib/guest-app/admin/actions'

/** A message to show as a toast when the page opens, e.g. an expired link */
function LoginForm({notice}: {notice?: string}) {
  const initialState: AdminFormState<{email: string}> = {
    data: {email: ''},
    errors: {},
    ...(notice ? {ok: false, message: notice} : {ok: null})
  }
  const [state, action, isPending] = useActionState(
    requestLoginAction,
    initialState
  )
  useResultToast(state)

  return (
    <form
      className='space-y-4'
      action={action}
      noValidate
    >
      <FormControl
        id='email'
        error={state.errors.email}
      >
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          name='email'
          type='email'
          autoComplete='email'
          placeholder='π.χ. info@moccaliving.com'
          defaultValue={state.data.email}
          icon={IconMail}
          error={Boolean(state.errors.email)}
          disabled={isPending}
        />
      </FormControl>
      <Button
        className='mt-6 inline-full'
        type='submit'
        size='large'
        isLoading={isPending}
      >
        Αποστολή συνδέσμου
        <IconSend2 aria-hidden />
      </Button>
    </form>
  )
}

export {LoginForm}
