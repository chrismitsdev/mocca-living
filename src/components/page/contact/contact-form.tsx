'use client'

import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {addDays, subDays, isSameDay} from 'date-fns'
import {formSchema, type FormSchema} from '#/lib/form-schema'
import {sendContactForm} from '@/actions'
import {toast} from '@/components/ui/toast'
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
import {
  UserIcon,
  AtSignIcon,
  SmartphoneIcon,
  LogInIcon,
  LogOutIcon,
  HomeIcon,
  MessageCircle,
  SendHorizonalIcon,
  RotateCcwIcon
} from 'lucide-react'

function ContactForm({locale}: {locale: Params['params']['locale']}) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      villa: '',
      message: '',
      consentData: false
    }
  })
  const watchCheckIn = form.watch('checkIn')
  const watchCheckOut = form.watch('checkOut')

  async function onSubmit(values: FormSchema) {
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
        <div className='grid grid-cols-3 gap-y-6 gap-x-10'>
          <FormField
            disabled={form.formState.isSubmitting}
            control={form.control}
            name='fullName'
            render={({field}) => (
              <FormItem className='min-h-[82px]'>
                <FormLabel>{'Full name'}</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Fill in your full name'
                    icon={UserIcon}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            disabled={form.formState.isSubmitting}
            control={form.control}
            name='email'
            render={({field}) => (
              <FormItem className='min-h-[82px]'>
                <FormLabel>{'Email'}</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Fill in your email'
                    icon={AtSignIcon}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            disabled={form.formState.isSubmitting}
            control={form.control}
            name='phone'
            render={({field}) => (
              <FormItem className='min-h-[82px]'>
                <FormLabel>{'Phone number'}</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Fill in your phone number'
                    icon={SmartphoneIcon}
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
                <FormLabel>{'Check-in date'}</FormLabel>
                <FormControl>
                  <DatePicker
                    placeholder='Select a check-in date'
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
                <FormLabel>{'Check-out date'}</FormLabel>
                <FormControl>
                  <DatePicker
                    placeholder='Select a check-out date'
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
            disabled={form.formState.isSubmitting}
            control={form.control}
            name='villa'
            render={({field}) => (
              <FormItem className='min-h-[82px]'>
                <FormLabel>{'Select a villa'}</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
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
                            <SelectValue placeholder='Select your preferred villa' />
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
              <FormItem className='space-y-0 flex items-center gap-2 col-span-3'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormLabel>
                  {
                    'I agree that my personal data will be used only to fulfill my request according to Privacy Policy statements'
                  }
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            disabled={form.formState.isSubmitting}
            control={form.control}
            name='message'
            render={({field}) => (
              <FormItem className='col-span-3'>
                <FormLabel>{'Message'}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Optionally, leave your message here...'
                    icon={MessageCircle}
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
          form='contact-page-form'
          variant='bordered'
          onClick={() => form.reset()}
          disabled={form.formState.isSubmitting}
        >
          <RotateCcwIcon size={16} />
          <span>{'Reset'}</span>
        </Button>
        <Button
          form='contact-page-form'
          type='submit'
          disabled={form.formState.isSubmitting}
          isLoading={form.formState.isSubmitting}
        >
          <span>{'Submit'}</span>
          <SendHorizonalIcon size={16} />
        </Button>
      </div>
    </Form>
  )
}

ContactForm.displayName = 'ContactForm'

export {ContactForm}
