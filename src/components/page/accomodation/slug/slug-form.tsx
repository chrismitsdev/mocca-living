'use client'

import * as React from 'react'
import {useTranslations} from 'next-intl'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {addDays, subDays, isSameDay} from 'date-fns'
import {
  UserIcon,
  AtSignIcon,
  PhoneIcon,
  LogInIcon,
  LogOutIcon,
  XIcon,
  SendHorizonalIcon
} from 'lucide-react'
import {type SlugFormSchema, getSlugFormSchema} from '@/src/lib/schema'
import {sendContactForm} from '@/src/lib/actions'
import {PrivacyModal} from '@/src/components/shared/privacy-modal'
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose
} from '@/src/components/ui/drawer'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/src/components/ui/form'
import {Input} from '@/src/components/ui/input'
import {DatePicker} from '@/src/components/ui/date-picker'
import {Checkbox} from '@/src/components/ui/checkbox'
import {Button} from '@/src/components/ui/button'
import {VisuallyHidden} from '@/src/components/ui/visually-hidden'
import {Separator} from '@/src/components/ui/separator'
import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaBar
} from '@/src/components/ui/scrollarea'
import {toast} from '@/src/components/ui/toast'

interface SlugFormProps {
  slug: Slug
  locale: Awaited<Params['params']>['locale']
}

const SlugForm: React.FC<SlugFormProps> = ({slug, locale}) => {
  const [open, setOpen] = React.useState(false)
  const t = useTranslations<'Components.Form'>()
  const form = useForm<SlugFormSchema>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      consentData: false
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(getSlugFormSchema(t))
  })
  const watchCheckIn = form.watch('checkIn')
  const watchCheckOut = form.watch('checkOut')

  async function onSubmit(values: SlugFormSchema) {
    const villa = slug === 'dimitra' ? 'Δήμητρα' : 'Γεωργία'
    const formData = {...values, villa} as ContactFormData

    const {title, message, status} = await sendContactForm(formData)
    const isSuccess = status === 'success'

    toast({
      title,
      description: message,
      status
    })

    if (isSuccess) {
      form.reset()
      setOpen(false)
    }
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
    >
      <DrawerTrigger asChild>
        <Button>{t(`buttons.trigger.${slug}`)}</Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerContent
          side='left'
          className='w-full sm:max-w-3xl'
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className='px-[28px] pt-14 pb-4 space-y-2 sm:px-8 sm:py-16'>
            <DrawerTitle>{t('slug-page-title', {slug})}</DrawerTitle>
            <DrawerDescription>{t('slug-page-description')}</DrawerDescription>
          </div>
          <Separator />
          <ScrollArea type='always'>
            <ScrollAreaViewport className='max-h-[calc(100svh-152px-1px)]'>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  noValidate
                >
                  <div className='px-[28px] py-4 space-y-4 sm:p-8'>
                    <FormField
                      control={form.control}
                      name='fullName'
                      render={({field}) => (
                        <FormItem className='min-h-[82px]'>
                          <FormLabel>{t('fields.fullName.label')}</FormLabel>
                          <FormControl>
                            <Input
                              autoComplete='name'
                              placeholder={t('fields.fullName.placeholder')}
                              icon={UserIcon}
                              disabled={form.formState.isSubmitting}
                              name={field.name}
                              value={field.value}
                              onChange={field.onChange}
                              ref={field.ref}
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
                              icon={AtSignIcon}
                              disabled={form.formState.isSubmitting}
                              name={field.name}
                              value={field.value}
                              onChange={field.onChange}
                              ref={field.ref}
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
                              name={field.name}
                              value={field.value}
                              onChange={field.onChange}
                              ref={field.ref}
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
                                  : isSameDay(
                                      watchCheckOut,
                                      addDays(new Date(), 1)
                                    )
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
                      name='consentData'
                      render={({field}) => (
                        <FormItem className='space-y-0 flex gap-2'>
                          <FormControl className='mt-[3px]'>
                            <Checkbox
                              name='consentData'
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={form.formState.isSubmitting}
                            />
                          </FormControl>
                          <FormLabel>
                            {t.rich('fields.consentData.label', {
                              link: (string) => (
                                <PrivacyModal>{string}</PrivacyModal>
                              )
                            })}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <div className='pt-4'>
                      <Button
                        type='submit'
                        className='w-full flex ml-auto sm:w-auto'
                        isLoading={form.formState.isSubmitting}
                        disabled={form.formState.isSubmitting}
                      >
                        <span>{t('buttons.submit')}</span>
                        <SendHorizonalIcon size={16} />
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </ScrollAreaViewport>
            <ScrollAreaBar className='w-2 sm:w-2.5' />
          </ScrollArea>
          <DrawerClose asChild>
            <Button
              className='absolute top-3 right-4'
              variant='ghost-error'
              size='icon-normal'
            >
              <VisuallyHidden>{'Close drawer'}</VisuallyHidden>
              <XIcon />
            </Button>
          </DrawerClose>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  )
}

SlugForm.displayName = 'SlugForm'

export {SlugForm}
