'use client'

import {
  IconBrandWhatsapp,
  IconLock,
  IconTicket,
  IconUserCircle
} from '@tabler/icons-react'
import {useFormatter, useLocale, useTranslations} from 'next-intl'
import {useActionState} from 'react'
import {Button} from '@/src/components/ui/button'
import {Input} from '@/src/components/ui/input'
import {Label} from '@/src/components/ui/label'
import {Typography} from '@/src/components/ui/typography'
import {OWNER_PHONE} from '@/src/lib/constants'
import {
  type VerifyGuestState,
  verifyGuestAction
} from '@/src/lib/guest-app/actions'
import {PROPERTY_TIMEZONE} from '@/src/lib/guest-app/properties'

const initialState: VerifyGuestState = {
  confirmation: '',
  surname: '',
  error: null
}

function AccessForm() {
  const [state, action, isPending] = useActionState(
    verifyGuestAction.bind(null, useLocale()),
    initialState
  )
  const t = useTranslations('Pages.guest-app.access')
  const format = useFormatter()

  const error =
    state.error === 'not-yet' && state.opensAt
      ? t('errors.not-yet', {
          date: format.dateTime(new Date(state.opensAt), {
            dateStyle: 'full',
            timeZone: PROPERTY_TIMEZONE
          })
        })
      : state.error && state.error !== 'not-yet'
        ? t(`errors.${state.error}`)
        : null
  const showContact =
    state.error === 'not-found' || state.error === 'unavailable'

  return (
    <form
      className='space-y-4'
      action={action}
      noValidate
    >
      <div>
        <Label
          htmlFor='confirmation'
          className='mb-1'
        >
          {t('fields.confirmation.label')}
        </Label>
        <Input
          id='confirmation'
          name='confirmation'
          autoComplete='off'
          autoCapitalize='characters'
          spellCheck={false}
          placeholder={t('fields.confirmation.placeholder')}
          defaultValue={state.confirmation}
          icon={IconTicket}
          error={state.error === 'invalid' && !state.confirmation.trim()}
          disabled={isPending}
          aria-describedby='confirmation-hint'
          required
        />
        <Typography
          id='confirmation-hint'
          variant='tiny'
          className='mt-1 px-2'
        >
          {t('fields.confirmation.hint')}
        </Typography>
      </div>

      <div>
        <Label
          htmlFor='surname'
          className='mb-1'
        >
          {t('fields.surname.label')}
        </Label>
        <Input
          id='surname'
          name='surname'
          autoComplete='family-name'
          placeholder={t('fields.surname.placeholder')}
          defaultValue={state.surname}
          icon={IconUserCircle}
          error={state.error === 'invalid' && !state.surname.trim()}
          disabled={isPending}
          required
        />
      </div>

      {error && (
        <div
          role='alert'
          className='py-2 px-3 bg-danger text-danger-foreground'
        >
          <Typography variant='small'>{error}</Typography>
        </div>
      )}

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
