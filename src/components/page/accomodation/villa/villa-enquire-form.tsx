'use client'

import * as React from 'react'
import {useTranslations} from 'next-intl'
import {useForm} from 'react-hook-form'
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

type VillaEnquireFormProps = {
  slug: Slug
  locale: Params['params']['locale']
}

function VillaEnquireForm({slug, locale}: VillaEnquireFormProps) {
  const [open, setOpen] = React.useState(false)
  const form = useForm()
  const t = useTranslations<'Components.Form'>()
  const watchCheckIn = form.watch('checkIn')
  const watchCheckOut = form.watch('checkOut')

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
        <DrawerContent side='bottom'>
          <div className='px-3 py-8 sm:pt-16 sm:pb-10 space-y-2 sm:px-16'>
            <DrawerTitle>
              {'Enquire about'} <span className='capitalize'>{slug}</span>
            </DrawerTitle>
            <DrawerDescription>
              {
                'Fill out the form below to make a booking, and we will contact you shortly.'
              }
            </DrawerDescription>
          </div>
          <Separator />
          <ScrollArea type='always'>
            <ScrollAreaViewport className='max-h-[calc(100dvh-144px-104px-3px)]'>
              <Form {...form}>
                <form>
                  <div className='pl-3 pr-3 py-4 grid gap-y-2 sm:py-12 sm:px-16 sm:gap-y-4 sm:gap-x-8 sm:grid-cols-6'>
                    <FormField
                      control={form.control}
                      disabled={form.formState.isSubmitting}
                      name='fullName'
                      render={({field}) => (
                        <FormItem className='min-h-[82px] sm:col-span-2'>
                          <FormLabel>{t('fields.fullName.label')}</FormLabel>
                          <FormControl>
                            <Input
                              autoComplete='name'
                              placeholder={t('fields.fullName.placeholder')}
                              icon={UserIcon}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      disabled={form.formState.isSubmitting}
                      name='email'
                      render={({field}) => (
                        <FormItem className='min-h-[82px] sm:col-span-2'>
                          <FormLabel>{t('fields.email.label')}</FormLabel>
                          <FormControl>
                            <Input
                              autoComplete='email'
                              placeholder={t('fields.email.placeholder')}
                              icon={AtSignIcon}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      disabled={form.formState.isSubmitting}
                      name='phone'
                      render={({field}) => (
                        <FormItem className='min-h-[82px] sm:col-span-2'>
                          <FormLabel>{t('fields.phone.label')}</FormLabel>
                          <FormControl>
                            <Input
                              autoComplete='mobile tel'
                              placeholder={t('fields.phone.placeholder')}
                              icon={PhoneIcon}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='check-in'
                      render={({field}) => (
                        <FormItem className='min-h-[82px] sm:col-span-3'>
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
                      name='check-out'
                      render={({field}) => (
                        <FormItem className='min-h-[82px] sm:col-span-3'>
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
                        <FormItem className='space-y-0 flex gap-2 sm:col-span-full'>
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
                </form>
              </Form>
            </ScrollAreaViewport>
            <ScrollAreaBar className='w-2 sm:w-2.5' />
          </ScrollArea>
          <Separator />
          <div className='px-3 py-8 flex justify-end sm:pb-16 sm:pt-10 sm:px-16'>
            <Button>
              <span>{'Submit'}</span>
              <SendHorizonalIcon size={16} />
            </Button>
          </div>
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

VillaEnquireForm.displayName = 'VillaEnquireForm'

export {VillaEnquireForm}
