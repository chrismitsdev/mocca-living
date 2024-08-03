'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import {useForm, Controller} from 'react-hook-form'
import {addDays, subDays} from 'date-fns'
import {
  PaperPlaneIcon, 
  AvatarIcon, 
  EnvelopeClosedIcon, 
  MobileIcon, 
  EnterIcon, 
  ExitIcon, 
  HomeIcon,
  ChatBubbleIcon
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
// import {toast} from '@/components/ui/toast'

const DevTool: React.ElementType = dynamic(
  () => import('@hookform/devtools').then((module) => module.DevTool),
  { ssr: false }
)

type ContactFormProps = {
  locale: Params['params']['locale'],
  formTitle: IntlMessages['Pages']['Contact']['Form']['title'] 
  formDescription: IntlMessages['Pages']['Contact']['Form']['description']
  fieldTranslations:  IntlMessages['Pages']['Contact']['Form']['fields']
}

const emailProviders = [
  '@gmail.com',
  '@yahoo.com',
  '@outlook.com',
  '@hotmail.com',
  '@icloud.com',
]

const DEV_MODE = process.env.NODE_ENV === 'development'

function ContactForm({locale, formTitle, formDescription, fieldTranslations}: ContactFormProps) {
  const {
    formState, 
    register, 
    control, 
    handleSubmit, 
    watch
  } = useForm<ContactFormValues>()
  const [origin, setOrigin] = React.useState<string>('')
  const endpoint = `${origin}/${locale}/api/contact-form`

  React.useEffect(
    function() {
      if (typeof window === 'undefined') return
      setOrigin(DEV_MODE ? 'http://localhost:3000' : window.location.origin)
    }, 
    []
  )

  async function onSubmit(data: ContactFormValues) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const result = await res.json() as Response
    console.log(result)
  }

  return (
    <article>
      <Card className='px-4 py-8 sm:px-12 sm:py-16'>
        <CardHeader>
          <CardTitle>{formTitle}</CardTitle>
          <CardDescription>{formDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <form id='contact-form' onSubmit={handleSubmit(onSubmit)} noValidate>
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
                    validate: {
                      whitelistedProviders: (value) => {
                        return emailProviders.some(p => value.endsWith(p)) 
                          || fieldTranslations.email.validation.whitelistedProviders
                      },
                    }
                  })}
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
                      disabled={{
                        before: new Date(),
                        after: !watch('checkOut') ? undefined : subDays(watch('checkOut'), 1)
                      }}
                      icon={EnterIcon}
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: fieldTranslations.checkIn.validation.required
                    },
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
                      disabled={{
                        before: !watch('checkIn') ? addDays(new Date(), 1) : addDays(watch('checkIn'), 1)
                      }}
                      icon={ExitIcon}
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: fieldTranslations.checkOut.validation.required
                    },
                  }}
                />
              </FormControl>

              <FormControl error={formState.errors.house?.message}>
                <Label htmlFor='house'>{fieldTranslations.house.label}</Label>
                <Controller 
                  control={control}
                  name='house'
                  render={({field: {name, value = '', onChange, disabled}}) => (
                    <Select name={name} value={value} onValueChange={onChange} disabled={disabled}>
                      <SelectTrigger id='house' className='w-full'>
                        <span className='flex items-center gap-2'>
                          <HomeIcon width={16} height={16} />
                          <span className={!value ? 'text-sm font-normal text-foreground-muted' : ''}>
                            <SelectValue placeholder={fieldTranslations.house.placeholder}  />
                          </span>
                        </span>
                      </SelectTrigger>
                      <SelectPortal>
                        <SelectContent>
                          <SelectViewport>
                            <SelectItem value='Γεωργία'>{"Georgia"}</SelectItem>
                            <SelectItem value='Δήμητρα'>{"Dimitra"}</SelectItem>
                          </SelectViewport>
                        </SelectContent>
                      </SelectPortal>
                    </Select>
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: fieldTranslations.house.validation.required
                    },
                  }}
                />
              </FormControl>

              <FormControl className='min-h-fit sm:col-span-3'>
                <Label htmlFor='message'>{fieldTranslations.message.label}</Label>
                <Textarea 
                  id='message' 
                  placeholder={fieldTranslations.message.placeholder} 
                  icon={ChatBubbleIcon}
                  {...register('message')}
                />
              </FormControl>
            </div>
          </form>
          {/* <DevTool placement='top-right' control={control} /> */}
        </CardContent>
        <CardFooter className='sm:justify-end'>
          <Button 
            className='w-full sm:w-auto' 
            form='contact-form' 
            type='submit'
          >
            <span>{'Submit'}</span>
            <PaperPlaneIcon width={16} height={16} />
          </Button>
        </CardFooter>
      </Card>
    </article>
  )
}

ContactForm.displayName = 'ContactForm'

export {ContactForm}