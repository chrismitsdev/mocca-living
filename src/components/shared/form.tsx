'use client'

import * as React from 'react'
import {useTranslations, useLocale} from 'next-intl'
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  MessageCircleIcon,
  SendHorizonalIcon
} from 'lucide-react'
import {cn} from '@/src/lib/utils'
import {type ContactFormActionState, contactFormAction} from '@/src/lib/actions'
import {PrivacyModal} from '@/src/components/shared/privacy-modal'
import {Label} from '@/src/components/ui/label'
import {Input} from '@/src/components/ui/input'
import {Textarea} from '@/src/components/ui/textarea'
import {Checkbox} from '@/src/components/ui/checkbox'
import {Typography} from '@/src/components/ui/typography'
import {Button} from '@/src/components/ui/button'
import {toast} from '@/src/components/ui/toast'

const initialState = {
  data: {} as ContactFormActionState['data'],
  errors: {} as ContactFormActionState['errors'],
  ok: null
}

const Form: React.FC = () => {
  const t = useTranslations('Components.Form')
  const [state, action, isPending] = React.useActionState(
    contactFormAction.bind(null, useLocale()),
    initialState
  )

  React.useEffect(
    function () {
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
    },
    [state]
  )

  return (
    <form
      className='@container'
      action={action}
      noValidate
    >
      <div />
      <div className='grid gap-x-10 gap-y-6 @xl:grid-cols-2'>
        <FormControl error={state.errors.firstName}>
          <Label htmlFor='firstName'>{t('fields.firstName.label')}</Label>
          <Input
            id='firstName'
            name='firstName'
            autoComplete='username'
            defaultValue={state.data.firstName}
            placeholder={t('fields.firstName.placeholder')}
            icon={UserIcon}
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
            icon={UserIcon}
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
            icon={MailIcon}
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
            icon={PhoneIcon}
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
            icon={MessageCircleIcon}
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
              link: (string) => <PrivacyModal>{string}</PrivacyModal>
            })}
          </Label>
        </FormControl>
      </div>
      <div className='pt-8 flex justify-end'>
        <Button
          className='w-full @xl:w-auto'
          type='submit'
          disabled={isPending}
          isLoading={isPending}
        >
          <span>{t('button.label')}</span>
          <SendHorizonalIcon
            className='mt-0.5'
            size={16}
          />
        </Button>
      </div>
    </form>
  )
}

const FormControl: React.FC<
  React.ComponentPropsWithRef<'div'> & {error?: string}
> = ({className, error, children, ...props}) => {
  return (
    <div
      className={cn('relative flex flex-col gap-0.5', className)}
      {...props}
    >
      {error && (
        <Typography
          className='absolute top-0 right-0 leading-6 text-error-hover'
          variant='mini'
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
