'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import {useForm, Controller} from 'react-hook-form'
import {addDays, subDays, isSameDay} from 'date-fns'
import {
  AvatarIcon,
  EnvelopeClosedIcon,
  MobileIcon,
  EnterIcon,
  ExitIcon,
  HomeIcon,
  ChatBubbleIcon,
  PaperPlaneIcon,
  ResetIcon
} from '@radix-ui/react-icons'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPortal,
  SelectContent,
  SelectViewport,
  SelectItem
} from '@/components/ui/select'
import {Button} from '@/components/ui/button'
import {FormControl} from '@/components/ui/form-control'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {DatePicker} from '@/components/ui/date-picker'
import {Checkbox} from '@/components/ui/checkbox'
import {Typography} from '@/components/ui/typography'
import {toast} from '@/components/ui/toast'

// const DevTool: React.ElementType = dynamic(
//   () => import('@hookform/devtools').then((module) => module.DevTool),
//   { ssr: false }
// )

type FormMessages = IntlMessages['Pages']['Contact']['Form']

type ContactFormProps<T extends FormMessages = FormMessages> = {
  locale: Params['params']['locale']
  formTitle: T['title']
  formDescription: T['description']
  fieldTranslations: T['fields']
  submitBtnLabel: T['submit-btn']
  resetBtnLabel: T['reset-btn']
}

const emailProviders = ['@gmail.com', '@yahoo.com', '@outlook.com', '@hotmail.com', '@icloud.com']

const DEV_MODE = process.env.NODE_ENV === 'development'

function ContactForm({
  locale,
  formTitle,
  formDescription,
  fieldTranslations,
  submitBtnLabel,
  resetBtnLabel
}: ContactFormProps) {
  const {formState, control, register, handleSubmit, watch, reset} = useForm<ContactFormValues>()
  const [origin, setOrigin] = React.useState<string>('')
  const watchCheckIn = watch('checkIn')
  const watchCheckOut = watch('checkOut')

  const explicitReset = React.useCallback(
    function () {
      reset({
        name: '',
        email: '',
        phone: '',
        checkIn: undefined,
        checkOut: undefined,
        suite: '',
        message: '',
        consentData: false
      })
    },
    [reset]
  )

  async function onSubmit(data: ContactFormValues) {
    const res = await fetch(`${origin}/${locale}/api/contact-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const {title, message: description, status} = (await res.json()) as ContactFormResponse

    toast({title, description, status})
  }

  // Sets origin depending on the enviroment (development or production)
  React.useEffect(function () {
    if (typeof window === 'undefined') return
    setOrigin(DEV_MODE ? 'http://localhost:3000' : window.location.origin)
  }, [])

  // Resets form field values on successful submission
  React.useEffect(
    function () {
      if (typeof window === 'undefined') return
      if (formState.isSubmitSuccessful) {
        explicitReset()
      }
    },
    [formState.isSubmitSuccessful, explicitReset]
  )

  return (
    <article>
      <Card className='px-4 py-8 sm:px-12 sm:py-16'>
        <CardHeader>
          <CardTitle>{formTitle}</CardTitle>
          <CardDescription>{formDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id='contact-form'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className='grid gap-y-2 gap-x-8 sm:grid-cols-3'>
              <FormControl error={formState.errors.name?.message}>
                <Label htmlFor='name'>{fieldTranslations.name.label}</Label>
                <Input
                  id='name'
                  placeholder={fieldTranslations.name.placeholder}
                  icon={AvatarIcon}
                  autoComplete='name'
                  {...register('name', {
                    required: {
                      value: true,
                      message: fieldTranslations.name.validation.required
                    },
                    minLength: {
                      value: 5,
                      message: fieldTranslations.name.validation.length
                    },
                    maxLength: {
                      value: 25,
                      message: fieldTranslations.name.validation.length
                    }
                  })}
                  disabled={formState.isSubmitting}
                />
              </FormControl>

              <FormControl error={formState.errors.email?.message}>
                <Label htmlFor='email'>{fieldTranslations.email.label}</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder={fieldTranslations.email.placeholder}
                  icon={EnvelopeClosedIcon}
                  autoComplete='email'
                  {...register('email', {
                    required: {
                      value: true,
                      message: fieldTranslations.email.validation.required
                    },
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: fieldTranslations.email.validation.pattern
                    },
                    validate: (value) =>
                      emailProviders.some((p) => value.endsWith(p)) ||
                      fieldTranslations.email.validation.whitelistedProviders
                  })}
                  disabled={formState.isSubmitting}
                />
              </FormControl>

              <FormControl error={formState.errors.phone?.message}>
                <Label htmlFor='phone'>{fieldTranslations.phone.label}</Label>
                <Input
                  id='phone'
                  placeholder={fieldTranslations.phone.placeholder}
                  icon={MobileIcon}
                  autoComplete='mobile tel'
                  {...register('phone', {
                    required: {
                      value: true,
                      message: fieldTranslations.phone.validation.required
                    },
                    pattern: {
                      value: /^(2\d|69)\d{8}$/g,
                      message: fieldTranslations.phone.validation.pattern
                    }
                  })}
                  disabled={formState.isSubmitting}
                />
              </FormControl>

              <FormControl error={formState.errors.checkIn?.message}>
                <Label htmlFor='check-in'>{fieldTranslations.checkIn.label}</Label>
                <Controller
                  control={control}
                  name='checkIn'
                  render={({field}) => (
                    <DatePicker
                      id='check-in'
                      locale={locale}
                      date={field.value}
                      onDateChange={field.onChange}
                      placeholder={fieldTranslations.checkIn.placeholder}
                      calendarDisabled={{
                        before: new Date(),
                        after: !watchCheckOut
                          ? undefined
                          : isSameDay(watchCheckOut, addDays(new Date(), 1))
                          ? new Date()
                          : subDays(watchCheckOut, 1)
                      }}
                      disabled={formState.isSubmitting}
                      icon={EnterIcon}
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: fieldTranslations.checkIn.validation.required
                    }
                  }}
                />
              </FormControl>

              <FormControl error={formState.errors.checkOut?.message}>
                <Label htmlFor='check-out'>{fieldTranslations.checkOut.label}</Label>
                <Controller
                  control={control}
                  name='checkOut'
                  render={({field}) => (
                    <DatePicker
                      id='check-out'
                      locale={locale}
                      date={field.value}
                      onDateChange={field.onChange}
                      placeholder={fieldTranslations.checkOut.placeholder}
                      calendarDisabled={{
                        before: !watchCheckIn ? addDays(new Date(), 1) : addDays(watchCheckIn, 1)
                      }}
                      disabled={formState.isSubmitting}
                      icon={ExitIcon}
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: fieldTranslations.checkOut.validation.required
                    }
                  }}
                />
              </FormControl>

              <FormControl error={formState.errors.suite?.message}>
                <Label htmlFor='suite'>{fieldTranslations.suite.label}</Label>
                <Controller
                  control={control}
                  name='suite'
                  render={({field: {name, value = '', onChange}}) => (
                    <Select
                      name={name}
                      value={value}
                      onValueChange={onChange}
                      disabled={formState.isSubmitting}
                    >
                      <SelectTrigger
                        id='suite'
                        className='w-full'
                      >
                        <span className='flex items-center gap-2'>
                          <HomeIcon
                            width={16}
                            height={16}
                          />
                          <span
                            className={!value ? 'text-sm font-normal text-foreground-muted' : ''}
                          >
                            <SelectValue placeholder={fieldTranslations.suite.placeholder} />
                          </span>
                        </span>
                      </SelectTrigger>
                      <SelectPortal>
                        <SelectContent>
                          <SelectViewport>
                            <SelectItem value='Γεωργία'>{'Georgia'}</SelectItem>
                            <SelectItem value='Δήμητρα'>{'Dimitra'}</SelectItem>
                          </SelectViewport>
                        </SelectContent>
                      </SelectPortal>
                    </Select>
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: fieldTranslations.suite.validation.required
                    }
                  }}
                />
              </FormControl>

              <FormControl className='min-h-fit sm:col-span-3'>
                <Label htmlFor='message'>{fieldTranslations.message.label}</Label>
                <Textarea
                  id='message'
                  placeholder={fieldTranslations.message.placeholder}
                  icon={ChatBubbleIcon}
                  disabled={formState.isSubmitting}
                  {...register('message')}
                />
              </FormControl>

              <FormControl className='mt-2 min-h-fit space-y-0 flex gap-2 sm:col-span-3'>
                <Controller
                  control={control}
                  name='consentData'
                  render={({field}) => (
                    <Checkbox
                      id='consentData'
                      className='mt-[3px]'
                      name={field.name}
                      defaultChecked={field.value}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      onBlur={field.onBlur}
                      disabled={formState.isSubmitting}
                      ref={field.ref}
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: fieldTranslations.consentData.validation.required
                    }
                  }}
                />
                <div className='space-y-0.5'>
                  <Label
                    htmlFor='consentData'
                    className='grow'
                  >
                    {fieldTranslations.consentData.label}
                  </Label>
                  {formState.errors.consentData?.message && (
                    <Typography
                      variant='mini'
                      className='text-right text-error sm:text-left'
                    >
                      {formState.errors.consentData.message}
                    </Typography>
                  )}
                </div>
              </FormControl>
            </div>
          </form>
          {/* <DevTool placement='top-right' control={control} /> */}
        </CardContent>
        <CardFooter className='pt-4 sm:justify-end gap-4'>
          <Button
            variant='bordered'
            className='w-full sm:w-auto'
            form='contact-form'
            onClick={explicitReset}
            disabled={formState.isSubmitting}
          >
            <ResetIcon
              width={16}
              height={16}
            />
            <span>{resetBtnLabel}</span>
          </Button>
          <Button
            className='w-full sm:w-auto'
            form='contact-form'
            type='submit'
            disabled={formState.isSubmitting}
            isLoading={formState.isSubmitting}
          >
            <span>{submitBtnLabel}</span>
            <PaperPlaneIcon
              width={16}
              height={16}
            />
          </Button>
        </CardFooter>
      </Card>
    </article>
  )
}

ContactForm.displayName = 'ContactForm'

export {ContactForm}
