'use client'

import {IconLock, IconTicket, IconUserCircle} from '@tabler/icons-react'
import {useFormatter, useLocale, useTranslations} from 'next-intl'
import {useActionState, useEffect} from 'react'
import {FormControl} from '@/src/components/shared/form-control'
import {Button} from '@/src/components/ui/button'
import {Input} from '@/src/components/ui/input'
import {Label} from '@/src/components/ui/label'
import {toast} from '@/src/components/ui/toast'
import {
  type VerifyGuestState,
  verifyGuestAction
} from '@/src/lib/guest-app/actions'
import {PROPERTY_TIMEZONE} from '@/src/lib/guest-app/properties'

const initialState: VerifyGuestState = {
  data: {reservationNumber: '', name: ''},
  errors: {},
  ok: null
}

function AccessForm() {
  const [state, action, isPending] = useActionState(
    verifyGuestAction.bind(null, useLocale()),
    initialState
  )
  const t = useTranslations('Pages.guest-app.access')
  const format = useFormatter()

  useEffect(() => {
    if (state.ok !== false) return

    toast({
      title: t(`toast.error.${state.type}.title`),
      description: t(`toast.error.${state.type}.description`, {
        date: state.opensAt
          ? format.dateTime(new Date(state.opensAt), {
              dateStyle: 'full',
              timeZone: PROPERTY_TIMEZONE
            })
          : ''
      }),
      status: 'error'
    })
  }, [state, t, format])

  return (
    <form
      className='space-y-4'
      action={action}
      noValidate
    >
      <FormControl
        id='reservationNumber'
        error={state.errors.reservationNumber}
      >
        <Label htmlFor='reservationNumber'>
          {t('fields.reservationNumber.label')}
        </Label>
        <Input
          id='reservationNumber'
          name='reservationNumber'
          autoComplete='off'
          autoCapitalize='characters'
          spellCheck={false}
          placeholder={t('fields.reservationNumber.placeholder')}
          defaultValue={state.data.reservationNumber}
          icon={IconTicket}
          error={Boolean(state.errors.reservationNumber)}
          disabled={isPending}
          required
        />
      </FormControl>

      <FormControl
        id='name'
        error={state.errors.name}
      >
        <Label htmlFor='name'>{t('fields.name.label')}</Label>
        <Input
          id='name'
          name='name'
          autoComplete='name'
          spellCheck={false}
          placeholder={t('fields.name.placeholder')}
          defaultValue={state.data.name}
          icon={IconUserCircle}
          error={Boolean(state.errors.name)}
          disabled={isPending}
          required
        />
      </FormControl>

      <div className='pt-10'>
        <Button
          className='inline-full'
          type='submit'
          size='large'
          isLoading={isPending}
        >
          <IconLock aria-hidden />
          {t('submit')}
        </Button>
      </div>
    </form>
  )
}

export {AccessForm}
