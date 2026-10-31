'use client'

import {
  IconBrandWhatsapp,
  IconLock,
  IconTicket,
  IconUserCircle
} from '@tabler/icons-react'
import {useFormatter, useLocale, useTranslations} from 'next-intl'
import {useActionState} from 'react'
import {FormControl} from '@/src/components/shared/form-control'
import {Button} from '@/src/components/ui/button'
import {Input} from '@/src/components/ui/input'
import {Label} from '@/src/components/ui/label'
import {OWNER_PHONE} from '@/src/lib/constants'
import {
  type VerifyGuestState,
  verifyGuestAction
} from '@/src/lib/guest-app/actions'
import {PROPERTY_TIMEZONE} from '@/src/lib/guest-app/properties'

const initialState: VerifyGuestState = {
  confirmation: '',
  name: '',
  error: null
}

function AccessForm() {
  const [state, action, isPending] = useActionState(
    verifyGuestAction.bind(null, useLocale()),
    initialState
  )
  const t = useTranslations('Pages.guest-app.access')
  const format = useFormatter()

  const required = (value: string) =>
    state.error === 'required' && !value.trim()
      ? t('errors.required')
      : undefined

  // Errors about the booking as a whole show under the last field
  const bookingError =
    state.error === 'not-yet' && state.opensAt
      ? t('errors.not-yet', {
          date: format.dateTime(new Date(state.opensAt), {
            dateStyle: 'full',
            timeZone: PROPERTY_TIMEZONE
          })
        })
      : state.error && state.error !== 'not-yet' && state.error !== 'required'
        ? t(`errors.${state.error}`)
        : undefined

  const confirmationError = required(state.confirmation)
  const nameError = required(state.name) ?? bookingError
  const showContact =
    state.error === 'not-found' || state.error === 'unavailable'

  return (
    <form
      className='space-y-6'
      action={action}
      noValidate
    >
      <FormControl
        id='confirmation'
        error={confirmationError}
      >
        <Label htmlFor='confirmation'>{t('fields.confirmation.label')}</Label>
        <Input
          id='confirmation'
          name='confirmation'
          autoComplete='off'
          autoCapitalize='characters'
          spellCheck={false}
          placeholder={t('fields.confirmation.placeholder')}
          defaultValue={state.confirmation}
          icon={IconTicket}
          error={Boolean(confirmationError)}
          disabled={isPending}
          required
        />
      </FormControl>

      <FormControl
        id='name'
        error={nameError}
      >
        <Label htmlFor='name'>{t('fields.name.label')}</Label>
        <Input
          id='name'
          name='name'
          autoComplete='name'
          spellCheck={false}
          placeholder={t('fields.name.placeholder')}
          defaultValue={state.name}
          icon={IconUserCircle}
          error={Boolean(nameError)}
          disabled={isPending}
          required
        />
      </FormControl>

      <Button
        className='inline-full'
        type='submit'
        size='large'
        isLoading={isPending}
      >
        <IconLock aria-hidden />
        {t('submit')}
      </Button>

      {showContact && (
        <Button
          className='inline-full'
          variant='secondary'
          asChild
        >
          <a
            href={`https://api.whatsapp.com/send/?phone=${OWNER_PHONE.replace('+', '')}&type=phone_number&app_absent=0`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <IconBrandWhatsapp aria-hidden />
            {t('contact')}
          </a>
        </Button>
      )}
    </form>
  )
}

export {AccessForm}
