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
import {type SlugFormSchema, getSlugFormSchema} from '#/lib/schema'
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose
} from '@/components/ui/drawer'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {DatePicker} from '@/components/ui/date-picker'
import {Checkbox} from '@/components/ui/checkbox'
import {Button} from '@/components/ui/button'
import {VisuallyHidden} from '@/components/ui/visually-hidden'
import {Separator} from '@/components/ui/separator'
import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaBar
} from '@/components/ui/scrollarea'

type SlugFormProps = {
  slug: Slug
  locale: Params['params']['locale']
}

function SlugForm({slug, locale}: SlugFormProps) {
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

  function onSubmit(values: SlugFormSchema) {
    console.log(values)
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
    >
      <DrawerTrigger asChild>
        <Button>{'Enquire'}</Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerContent
          side='left'
          className='w-full border-r-0 sm:max-w-xl'
        >
          <div className='px-3 pt-12 pb-4 space-y-2 sm:px-8 sm:py-16'>
            <DrawerTitle>{t('title', {slug})}</DrawerTitle>
            <DrawerDescription>{t('description')}</DrawerDescription>
          </div>
          <Separator />
          <ScrollArea type='always'>
            <ScrollAreaViewport className='max-h-[calc(100dvh-144px-1px)]'>
              <Form {...form}>
                <form
                  id='slug-page-form'
                  onSubmit={form.handleSubmit(onSubmit)}
                  noValidate
                >
                  <div className='pl-3 pr-3 py-4 space-y-4 sm:p-8'>
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
                          <FormLabel>{t('fields.consentData.label')}</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='px-3 py-4 flex sm:justify-end sm:pl-8 sm:pb-8 sm:pr-8'>
                    <Button
                      form='slug-page-form'
                      type='submit'
                      className='w-full sm:w-auto'
                      isLoading={form.formState.isSubmitting}
                      disabled={form.formState.isSubmitting}
                    >
                      <span>{t('buttons.submit')}</span>
                      <SendHorizonalIcon size={16} />
                    </Button>
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
