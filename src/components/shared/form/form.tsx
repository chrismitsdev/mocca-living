'use client'

import {
  IconMail,
  IconMessage,
  IconPhone,
  IconSend2,
  IconUserCircle
} from '@tabler/icons-react'
import {useLocale, useTranslations} from 'next-intl'
import {useActionState, useEffect} from 'react'
import {PrivacyPolicyDialog} from '@/src/components/shared/privacy-policy-dialog'
import {Button} from '@/src/components/ui/button'
import {Checkbox} from '@/src/components/ui/checkbox'
import {Input} from '@/src/components/ui/input'
import {Label} from '@/src/components/ui/label'
import {Textarea} from '@/src/components/ui/textarea'
import {toast} from '@/src/components/ui/toast'
import {type ContactFormActionState, contactFormAction} from '@/src/lib/actions'
import {FormControl} from './form-control'
import {HoneyPot} from './honeypot'

const initialState = {
  data: {} as ContactFormActionState['data'],
  errors: {} as ContactFormActionState['errors'],
  ok: null
}

function Form() {
  const [state, action, isPending] = useActionState(
    contactFormAction.bind(null, useLocale()),
    initialState
  )
  const t = useTranslations('Components.form')

  useEffect(() => {
    if (state.ok === null) return

    toast({
      title: state.ok
        ? t('toast.success.title')
        : t(`toast.error.${state.type}.title`),
      description: state.ok
        ? t('toast.success.description')
        : t(`toast.error.${state.type}.description`),
      status: state.ok ? 'success' : 'error'
    })
  }, [state, t])

  return (
    <form
      className='@container'
      action={action}
      noValidate
    >
      <HoneyPot />
      <div className='grid gap-x-10 gap-y-4 @xl:grid-cols-2'>
        <FormControl
          id='fullname'
          error={state.errors.fullname}
          className='col-span-full'
        >
          <Label htmlFor='fullname'>{t('fields.fullname.label')}</Label>
          <Input
            id='fullname'
            name='fullname'
            autoComplete='name'
            placeholder={t('fields.fullname.placeholder')}
            defaultValue={state.data.fullname}
            icon={IconUserCircle}
            error={Boolean(state.errors.fullname)}
            disabled={isPending}
          />
        </FormControl>

        <FormControl
          id='email'
          error={state.errors.email}
        >
          <Label htmlFor='email'>{t('fields.email.label')}</Label>
          <Input
            id='email'
            name='email'
            autoComplete='email'
            placeholder={t('fields.email.placeholder')}
            defaultValue={state.data.email}
            icon={IconMail}
            error={Boolean(state.errors.email)}
            disabled={isPending}
            type='email'
          />
        </FormControl>

        <FormControl
          id='phone'
          error={state.errors.phone}
        >
          <Label htmlFor='phone'>{t('fields.phone.label')}</Label>
          <Input
            id='phone'
            name='phone'
            autoComplete='mobile tel'
            placeholder={t('fields.phone.placeholder')}
            defaultValue={state.data.phone}
            icon={IconPhone}
            error={Boolean(state.errors.phone)}
            disabled={isPending}
            type='tel'
          />
        </FormControl>

        <FormControl
          id='message'
          error={state.errors.message}
          className='col-span-full'
        >
          <Label htmlFor='message'>{t('fields.message.label')}</Label>
          <Textarea
            id='message'
            name='message'
            placeholder={t('fields.message.placeholder')}
            defaultValue={state.data.message}
            icon={IconMessage}
            error={Boolean(state.errors.message)}
            disabled={isPending}
          />
        </FormControl>
        <FormControl
          id='consent'
          className='col-span-full flex-row gap-2'
        >
          <Checkbox
            id='consent'
            name='consent'
            defaultChecked={Boolean(state.data.consent)}
            error={Boolean(state.errors.consent)}
            disabled={isPending}
          />
          <Label htmlFor='consent'>
            {t.rich('fields.consent.label', {
              link: (string) => (
                <PrivacyPolicyDialog>{string}</PrivacyPolicyDialog>
              )
            })}
          </Label>
        </FormControl>
      </div>

      <div className='pt-10'>
        <Button
          className='w-full @xl:w-auto'
          type='submit'
          size='large'
          disabled={isPending}
          isLoading={isPending}
        >
          <span>{t('button.label')}</span>
          <IconSend2 />
        </Button>
      </div>
    </form>
  )
}

Form.displayName = 'Form'

export {Form}
