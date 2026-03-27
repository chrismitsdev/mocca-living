'use client'

import {
  IconMail,
  IconMessage,
  IconPhone,
  IconSend,
  IconUser
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
import {Typography} from '@/src/components/ui/typography'
import {type ContactFormActionState, contactFormAction} from '@/src/lib/actions'
import {cn} from '@/src/lib/utils'

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
  const t = useTranslations('Components.Form')

  useEffect(() => {
    if (state.ok === null) return

    if (state.ok) {
      toast({
        title: t('toast.success.title'),
        description: t('toast.success.description'),
        status: 'success'
      })
    } else if (!state.ok) {
      toast({
        title: t(`toast.error.${state.type}.title`),
        description: t(`toast.error.${state.type}.description`),
        status: 'error'
      })
    }
  }, [state, t])

  return (
    <form
      className='@container'
      action={action}
      noValidate
    >
      <div className='grid gap-x-10 gap-y-6 @xl:grid-cols-2'>
        <FormControl error={state.errors.firstName}>
          <Label htmlFor='firstName'>{t('fields.firstName.label')}</Label>
          <Input
            id='firstName'
            name='firstName'
            autoComplete='username'
            defaultValue={state.data.firstName}
            placeholder={t('fields.firstName.placeholder')}
            icon={IconUser}
            error={Boolean(state.errors.firstName)}
            disabled={isPending}
          />
        </FormControl>
        <FormControl error={state.errors.lastName}>
          <Label htmlFor='lastName'>{t('fields.lastName.label')}</Label>
          <Input
            id='lastName'
            name='lastName'
            autoComplete='family-name'
            defaultValue={state.data.lastName}
            placeholder={t('fields.lastName.placeholder')}
            icon={IconUser}
            error={Boolean(state.errors.lastName)}
            disabled={isPending}
          />
        </FormControl>
        <FormControl error={state.errors.email}>
          <Label htmlFor='email'>{t('fields.email.label')}</Label>
          <Input
            id='email'
            name='email'
            autoComplete='email'
            defaultValue={state.data.email}
            placeholder={t('fields.email.placeholder')}
            icon={IconMail}
            error={Boolean(state.errors.email)}
            disabled={isPending}
            type='email'
          />
        </FormControl>
        <FormControl error={state.errors.phone}>
          <Label htmlFor='phone'>{t('fields.phone.label')}</Label>
          <Input
            id='phone'
            name='phone'
            autoComplete='mobile tel'
            defaultValue={state.data.phone}
            placeholder={t('fields.phone.placeholder')}
            icon={IconPhone}
            error={Boolean(state.errors.phone)}
            disabled={isPending}
            type='tel'
          />
        </FormControl>
        <FormControl className='col-span-full'>
          <Label htmlFor='message'>{t('fields.message.label')}</Label>
          <Textarea
            id='message'
            name='message'
            defaultValue={state.data.message}
            placeholder={t('fields.message.placeholder')}
            icon={IconMessage}
            disabled={isPending}
          />
        </FormControl>
        <FormControl className='col-span-full flex-row gap-2'>
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
      <div className='pt-8 flex justify-end'>
        <Button
          className='w-full @xl:w-auto'
          type='submit'
          size='large'
          disabled={isPending}
          isLoading={isPending}
        >
          <span>{t('button.label')}</span>
          <IconSend />
        </Button>
      </div>
    </form>
  )
}

function FormControl({
  className,
  error,
  children,
  ...props
}: React.ComponentPropsWithRef<'div'> & {error?: string}) {
  return (
    <div
      className={cn('relative flex flex-col gap-0.5', className)}
      {...props}
    >
      {error && (
        <Typography
          className='absolute inset-bs-0.5 inset-e-0 text-danger-hover'
          variant='tiny'
        >
          {error}
        </Typography>
      )}
      {children}
    </div>
  )
}

Form.displayName = 'Form'
FormControl.displayName = 'FormControl'

export {Form}
