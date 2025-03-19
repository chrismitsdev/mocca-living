'use client'

import * as React from 'react'
import {useTranslations} from 'next-intl'
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  MessageCircleIcon,
  SendHorizonalIcon
} from 'lucide-react'
import {cn} from '@/src/lib/utils'
import {
  type ContactFormActionState,
  contactFormAction
} from '@/src/app/[locale]/contact/(components)/contact-form-new/action'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {PrivacyModal} from '@/src/components/shared/privacy-modal'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/src/components/ui/card'
import {Label} from '@/src/components/ui/label'
import {Input} from '@/src/components/ui/input'
import {Textarea} from '@/src/components/ui/textarea'
import {Checkbox} from '@/src/components/ui/checkbox'
import {Button} from '@/src/components/ui/button'
import {Typography} from '@/src/components/ui/typography'

const initialState = {
  data: {} as ContactFormActionState['data'],
  errors: {} as ContactFormActionState['errors']
}

const ContactFormNew: React.FC = () => {
  const [state, action, isPending] = React.useActionState(
    contactFormAction,
    initialState
  )
  const t = useTranslations('Components.Form')

  return (
    <Section>
      <Container>
        <form
          action={action}
          noValidate
        >
          <Card className='px-4 py-8 space-y-8 sm:p-16 w-full'>
            <CardHeader>
              <CardTitle>{t('contact-page-title')}</CardTitle>
              <CardDescription>{t('contact-page-description')}</CardDescription>
            </CardHeader>
            <CardContent className='grid gap-y-6 gap-x-12 sm:grid-cols-2'>
              <FormControl error={state?.errors?.firstName}>
                <Label htmlFor='firstName'>{t('fields.firstName.label')}</Label>
                <Input
                  id='firstName'
                  name='firstName'
                  autoComplete='username'
                  defaultValue={state.data.firstName}
                  placeholder={t('fields.firstName.placeholder')}
                  icon={UserIcon}
                  disabled={isPending}
                />
              </FormControl>
              <FormControl error={state?.errors?.lastName}>
                <Label htmlFor='lastName'>{t('fields.lastName.label')}</Label>
                <Input
                  id='lastName'
                  name='lastName'
                  autoComplete='family-name'
                  defaultValue={state.data.lastName}
                  placeholder={t('fields.lastName.placeholder')}
                  icon={UserIcon}
                  disabled={isPending}
                />
              </FormControl>
              <FormControl error={state?.errors?.email}>
                <Label htmlFor='email'>{t('fields.email.label')}</Label>
                <Input
                  id='email'
                  name='email'
                  autoComplete='email'
                  defaultValue={state.data.email}
                  placeholder={t('fields.email.placeholder')}
                  icon={MailIcon}
                  disabled={isPending}
                  type='email'
                />
              </FormControl>
              <FormControl error={state?.errors?.phone}>
                <Label htmlFor='phone'>{t('fields.phone.label')}</Label>
                <Input
                  id='phone'
                  name='phone'
                  autoComplete='mobile tel'
                  defaultValue={state.data.phone}
                  placeholder={t('fields.phone.placeholder')}
                  icon={PhoneIcon}
                  disabled={isPending}
                  type='tel'
                />
              </FormControl>
              <FormControl className='col-span-full'>
                <Label htmlFor='message'>{t('fields.message.label')}</Label>
                <Textarea
                  id='message'
                  name='message'
                  placeholder={t('fields.message.placeholder')}
                  icon={MessageCircleIcon}
                />
              </FormControl>
              <FormControl className='col-span-full flex-row gap-2'>
                <Checkbox
                  id='consent'
                  name='consent'
                  defaultChecked={Boolean(state.data.consent)}
                  disabled={isPending}
                />
                <Label
                  htmlFor='consent'
                  className={state.errors.consent && 'text-red-10'}
                >
                  {t.rich('fields.consent.label', {
                    link: (string) => <PrivacyModal>{string}</PrivacyModal>
                  })}
                </Label>
              </FormControl>
            </CardContent>
            <CardFooter className='justify-end'>
              <Button
                type='submit'
                disabled={isPending}
                isLoading={isPending}
              >
                <span>{t('buttons.submit')}</span>
                <SendHorizonalIcon size={16} />
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Container>
    </Section>
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
          className='absolute top-1.5 right-0 !text-xxs text-error-hover sm:!text-xs'
          variant='mini'
        >
          {error}
        </Typography>
      )}
      {children}
    </div>
  )
}

ContactFormNew.displayName = 'ContactFormNew'
FormControl.displayName = 'FormControl'

export {ContactFormNew}
