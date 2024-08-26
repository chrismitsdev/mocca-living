'use client'

import * as React from 'react'
import {useForm, Controller} from 'react-hook-form'
import {addDays, subDays, isSameDay} from 'date-fns'
import {
  UserIcon,
  AtSignIcon,
  SmartphoneIcon,
  LogInIcon,
  LogOutIcon,
  HomeIcon,
  MessageCircleIcon,
  SendHorizonalIcon,
  RotateCcwIcon
} from 'lucide-react'
import {FormControl} from '@/components/ui/form-control'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import {DatePicker} from '@/components/ui/date-picker'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPortal,
  SelectContent,
  SelectViewport,
  SelectItem
} from '@/components/ui/select'
import {Textarea} from '@/components/ui/textarea'
import {Checkbox} from '@/components/ui/checkbox'
import {Typography} from '@/components/ui/typography'
import {Button} from '@/components/ui/button'
import {toast} from '@/components/ui/toast'

type FormMessages = IntlMessages['Pages']['Contact']['Form']

type ContactFormProps<T extends FormMessages = FormMessages> = {
  wrapperClassName?: string
  buttonWrapperClassName?: string
  locale: Params['params']['locale']
  fieldTranslations: T['fields']
  resetBtnLabel: T['reset-btn']
  submitBtnLabel: T['submit-btn']
}

const emailProviders = [
  '@gmail.com',
  '@yahoo.com',
  '@outlook.com',
  '@hotmail.com',
  '@icloud.com'
]

const DEV_MODE = process.env.NODE_ENV === 'development'

function Form({
  wrapperClassName,
  buttonWrapperClassName,
  locale,
  fieldTranslations,
  submitBtnLabel,
  resetBtnLabel
}: ContactFormProps) {
  const {formState, control, register, handleSubmit, watch, reset} =
    useForm<ContactFormData>()
  const [origin, setOrigin] = React.useState<string>('')
  const watchCheckIn = watch('checkIn')
  const watchCheckOut = watch('checkOut')

  const explicitReset = React.useCallback(
    function () {
      reset({
        fullName: '',
        email: '',
        phone: '',
        checkIn: undefined,
        checkOut: undefined,
        villa: '',
        message: '',
        consentData: false
      })
    },
    [reset]
  )

  async function onSubmit(data: ContactFormData) {
    const res = await fetch(`${origin}/${locale}/api/contact-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const {
      title,
      message: description,
      status
    } = (await res.json()) as ContactFormResponse

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className={wrapperClassName}>
        <FormControl error={formState.errors.fullName?.message}>
          <Label htmlFor='fullName'>{fieldTranslations.fullName.label}</Label>
          <Input
            id='fullName'
            placeholder={fieldTranslations.fullName.placeholder}
            icon={UserIcon}
            autoComplete='name'
            {...register('fullName', {
              required: {
                value: true,
                message: fieldTranslations.fullName.validation.required
              },
              minLength: {
                value: 5,
                message: fieldTranslations.fullName.validation.length
              },
              maxLength: {
                value: 25,
                message: fieldTranslations.fullName.validation.length
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
            icon={AtSignIcon}
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
            icon={SmartphoneIcon}
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
                disabledDates={{
                  before: new Date(),
                  after: !watchCheckOut
                    ? undefined
                    : isSameDay(watchCheckOut, addDays(new Date(), 1))
                    ? new Date()
                    : subDays(watchCheckOut, 1)
                }}
                disabled={formState.isSubmitting}
                icon={LogInIcon}
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
                disabledDates={{
                  before: !watchCheckIn
                    ? addDays(new Date(), 1)
                    : addDays(watchCheckIn, 1)
                }}
                disabled={formState.isSubmitting}
                icon={LogOutIcon}
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

        <FormControl error={formState.errors.villa?.message}>
          <Label htmlFor='villa'>{fieldTranslations.villa.label}</Label>
          <Controller
            control={control}
            name='villa'
            render={({field: {name, value = '', onChange}}) => (
              <Select
                name={name}
                value={value}
                onValueChange={onChange}
                disabled={formState.isSubmitting}
              >
                <SelectTrigger
                  id='villa'
                  className='w-full'
                >
                  <span className='flex items-center gap-2'>
                    <HomeIcon size={16} />
                    <span
                      className={
                        !value
                          ? 'text-sm font-normal text-foreground-muted'
                          : ''
                      }
                    >
                      <SelectValue
                        placeholder={fieldTranslations.villa.placeholder}
                      />
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
                message: fieldTranslations.villa.validation.required
              }
            }}
          />
        </FormControl>

        <FormControl className='min-h-fit sm:col-span-3'>
          <Label htmlFor='message'>{fieldTranslations.message.label}</Label>
          <Textarea
            id='message'
            placeholder={fieldTranslations.message.placeholder}
            icon={MessageCircleIcon}
            disabled={formState.isSubmitting}
            {...register('message')}
          />
        </FormControl>

        <FormControl className='mt-4 min-h-fit space-y-0 flex gap-2 sm:col-span-3'>
          <Controller
            control={control}
            name='consentData'
            render={({field}) => (
              <Checkbox
                id='consentData'
                className='mt-1'
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
          <div className=''>
            <Label
              htmlFor='consentData'
              className='block text-sm'
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

        <div className={buttonWrapperClassName}>
          <Button
            variant='bordered'
            className='w-full sm:w-auto'
            onClick={explicitReset}
            disabled={formState.isSubmitting}
          >
            <RotateCcwIcon size={16} />
            <span>{resetBtnLabel}</span>
          </Button>
          <Button
            className='w-full sm:w-auto'
            type='submit'
            disabled={formState.isSubmitting}
            isLoading={formState.isSubmitting}
          >
            <span>{submitBtnLabel}</span>
            <SendHorizonalIcon size={16} />
          </Button>
        </div>
      </div>
    </form>
  )
}

Form.displayName = 'Form'

export {Form}
