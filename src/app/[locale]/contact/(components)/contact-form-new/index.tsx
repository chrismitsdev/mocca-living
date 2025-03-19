'use client'

import * as React from 'react'
import {useTranslations} from 'next-intl'
import {type DateRange} from 'react-day-picker'
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  HomeIcon,
  MessageCircleIcon,
  SendHorizonalIcon
} from 'lucide-react'
import {cn} from '@/src/lib/utils'
import {useMinimumNights} from '@/src/hooks/useMinimumNights'
import {
  type ContactFormActionState,
  contactFormAction
} from '@/src/app/[locale]/contact/(components)/contact-form-new/action'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {PrivacyModal} from '@/src/components/shared/privacy-modal'
import {PopoverCalendar} from '@/src/app/[locale]/contact/(components)/contact-form-new/popover-calendar'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/src/components/ui/card'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPortal,
  SelectContent,
  SelectViewport,
  SelectItem
} from '@/src/components/ui/select'
import {Label} from '@/src/components/ui/label'
import {Input} from '@/src/components/ui/input'
import {Textarea} from '@/src/components/ui/textarea'
import {Checkbox} from '@/src/components/ui/checkbox'
import {Button} from '@/src/components/ui/button'
import {Typography} from '@/src/components/ui/typography'

const initialRange: DateRange = {
  from: undefined,
  to: undefined
}

const initialState = {
  data: {} as ContactFormActionState['data'],
  errors: {} as ContactFormActionState['errors']
}

const ContactFormNew: React.FC = () => {
  const [range, setRange] = React.useState<DateRange>(initialRange)
  const boundAction = contactFormAction.bind(null, {
    from: range.from ?? null,
    to: range.to ?? null
  })
  const [state, action, isPending] = React.useActionState(
    boundAction,
    initialState
  )
  const minNights = useMinimumNights(range.from)
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
            <CardContent className='grid gap-y-6 gap-x-12 sm:grid-cols-3'>
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
              <FormControl error={state?.errors?.range}>
                <Label htmlFor='range'>{t('fields.dates.label')}</Label>
                <PopoverCalendar
                  id='range'
                  name='range'
                  date={range}
                  onDateChange={setRange}
                  icon={CalendarIcon}
                  minimumNights={minNights}
                  placeholder={t('fields.dates.placeholder')}
                  footerMessage={t('fields.dates.footer', {min: minNights})}
                  disabled={isPending}
                />
              </FormControl>
              <FormControl error={state?.errors?.villa}>
                <Label htmlFor='villa'>{t('fields.villa.label')}</Label>
                <Select
                  name='villa'
                  defaultValue={state.data.villa}
                  disabled={isPending}
                >
                  <SelectTrigger
                    id='villa'
                    name='villa'
                    className='w-full'
                  >
                    <div className='flex items-center gap-2'>
                      <HomeIcon size={16} />
                      <SelectValue
                        placeholder={t('fields.villa.placeholder')}
                      />
                    </div>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectContent>
                      <SelectViewport>
                        <SelectItem value='Δήμητρα'>
                          {t('metadata.villa.dimitra')}
                        </SelectItem>
                        <SelectItem value='Γεωργία'>
                          {t('metadata.villa.georgia')}
                        </SelectItem>
                      </SelectViewport>
                    </SelectContent>
                  </SelectPortal>
                </Select>
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
