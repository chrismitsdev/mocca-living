'use client'

import {useTranslations} from 'next-intl'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {addDays, subDays, isSameDay} from 'date-fns'
import {
  UserIcon,
  AtSignIcon,
  PhoneIcon,
  LogInIcon,
  LogOutIcon,
  HomeIcon,
  MessageCircle,
  SendHorizonalIcon,
  RotateCcwIcon
} from 'lucide-react'
import {type ContactFormSchema, getContactFormSchema} from '#/lib/schema'
import {sendContactForm} from '@/actions'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPortal,
  SelectContent,
  SelectViewport,
  SelectItem
} from '@/components/ui/select'
import {Input} from '@/components/ui/input'
import {DatePicker} from '@/components/ui/date-picker'
import {Textarea} from '@/components/ui/textarea'
import {Checkbox} from '@/components/ui/checkbox'
import {Button} from '@/components/ui/button'
import {toast} from '@/components/ui/toast'

function ContactForm({locale}: {locale: Params['params']['locale']}) {
  const t = useTranslations<'Pages.Contact.Form'>()
  const form = useForm<ContactFormSchema>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      villa: '',
      message: '',
      consentData: false
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(getContactFormSchema(t))
  })
  const watchCheckIn = form.watch('checkIn')
  const watchCheckOut = form.watch('checkOut')

  async function onSubmit(values: ContactFormSchema) {
    const {title, message, status} = await sendContactForm(values)
    const isSuccess = status === 'success'

    toast({
      title,
      description: message,
      status
    })

    if (isSuccess) form.reset()
  }

  return (
    <Form {...form}>
      <form
        id='contact-page-form'
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <div className='grid gap-y-2 sm:grid-cols-3 sm:gap-y-6 sm:gap-x-10'>
          <FormField
            control={form.control}
            name='fullName'
            render={({field}) => (
              <FormItem className='min-h-[82px]'>
                <FormLabel>{t('fields.fullName.label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('fields.fullName.placeholder')}
                    autoComplete='name'
                    icon={UserIcon}
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({field}) => (
              <FormItem className='min-h-[82px]'>
                <FormLabel>{t('fields.email.label')}</FormLabel>
                <FormControl>
                  <Input
                    autoComplete='email'
                    placeholder={t('fields.email.placeholder')}
                    type='email'
                    icon={AtSignIcon}
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='phone'
            render={({field}) => (
              <FormItem className='min-h-[82px]'>
                <FormLabel>{t('fields.phone.label')}</FormLabel>
                <FormControl>
                  <Input
                    autoComplete='mobile tel'
                    placeholder={t('fields.phone.placeholder')}
                    icon={PhoneIcon}
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='checkIn'
            render={({field}) => (
              <FormItem className='min-h-[82px]'>
                <FormLabel>{t('fields.checkIn.label')}</FormLabel>
                <FormControl>
                  <DatePicker
                    placeholder={t('fields.checkIn.placeholder')}
                    icon={LogInIcon}
                    locale={locale}
                    date={field.value}
                    onDateChange={field.onChange}
                    disabledDates={{
                      before: new Date(),
                      after: !watchCheckOut
                        ? undefined
                        : isSameDay(watchCheckOut, addDays(new Date(), 1))
                        ? new Date()
                        : subDays(watchCheckOut, 1)
                    }}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='checkOut'
            render={({field}) => (
              <FormItem className='min-h-[82px]'>
                <FormLabel>{t('fields.checkOut.label')}</FormLabel>
                <FormControl>
                  <DatePicker
                    placeholder={t('fields.checkOut.placeholder')}
                    icon={LogOutIcon}
                    locale={locale}
                    date={field.value}
                    onDateChange={field.onChange}
                    disabledDates={{
                      before: !watchCheckIn
                        ? addDays(new Date(), 1)
                        : addDays(watchCheckIn, 1)
                    }}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='villa'
            render={({field}) => (
              <FormItem className='min-h-[82px]'>
                <FormLabel>{t('fields.villa.label')}</FormLabel>
                <Select
                  name='villa'
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={form.formState.isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger
                      className='w-full'
                      {...field}
                    >
                      <span className='flex items-center gap-2'>
                        <HomeIcon size={16} />
                        {!field.value ? (
                          <span className='text-sm font-normal text-foreground-muted'>
                            <SelectValue
                              placeholder={t('fields.villa.placeholder')}
                            />
                          </span>
                        ) : (
                          <SelectValue />
                        )}
                      </span>
                    </SelectTrigger>
                  </FormControl>
                  <SelectPortal>
                    <SelectContent>
                      <SelectViewport>
                        <SelectItem value='Γεωργία'>{'Georgia'}</SelectItem>
                        <SelectItem value='Δήμητρα'>{'Dimitra'}</SelectItem>
                      </SelectViewport>
                    </SelectContent>
                  </SelectPortal>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='consentData'
            render={({field}) => (
              <FormItem className='space-y-0 flex gap-2 sm:col-span-3'>
                <FormControl className='mt-[3px]'>
                  <Checkbox
                    name='consentData'
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormLabel>{t('fields.consentData.label')}</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='message'
            render={({field}) => (
              <FormItem className='sm:col-span-3'>
                <FormLabel>{t('fields.message.label')}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('fields.message.placeholder')}
                    icon={MessageCircle}
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
      <div className='mt-8 flex justify-end gap-4'>
        <Button
          className='grow sm:grow-0'
          form='contact-page-form'
          variant='bordered'
          onClick={() => form.reset()}
          disabled={form.formState.isSubmitting}
        >
          <RotateCcwIcon size={16} />
          <span>{t('buttons.reset')}</span>
        </Button>
        <Button
          className='grow sm:grow-0'
          form='contact-page-form'
          type='submit'
          disabled={form.formState.isSubmitting}
          isLoading={form.formState.isSubmitting}
        >
          <span>{t('buttons.submit')}</span>
          <SendHorizonalIcon size={16} />
        </Button>
      </div>
    </Form>
  )
}

ContactForm.displayName = 'ContactForm'

export {ContactForm}
