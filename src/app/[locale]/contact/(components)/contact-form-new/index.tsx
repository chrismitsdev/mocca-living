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
import {useMinimumNights} from '@/src/hooks/useMinimumNights'
import {submitFormAction} from '@/src/app/[locale]/contact/(components)/contact-form-new/action'
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

const initialDate: DateRange = {
  from: undefined,
  to: undefined
}

const initialState = {
  message: ''
}

const ContactFormNew: React.FC = () => {
  const [date, setDate] = React.useState<DateRange>(initialDate)
  const submitFormActionWithDate = submitFormAction.bind(null, date)
  const [state, action, pending] = React.useActionState(
    submitFormActionWithDate,
    initialState
  )
  const minNights = useMinimumNights(date.from)
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
            <CardContent className='grid gap-12 sm:grid-cols-3'>
              <div>
                <Label htmlFor='firstName'>{t('fields.firstName.label')}</Label>
                <Input
                  id='firstName'
                  name='firstName'
                  placeholder={t('fields.firstName.placeholder')}
                  icon={UserIcon}
                />
              </div>
              <div>
                <Label htmlFor='lastName'>{t('fields.lastName.label')}</Label>
                <Input
                  id='lastName'
                  name='lastName'
                  placeholder={t('fields.lastName.placeholder')}
                  icon={UserIcon}
                />
              </div>
              <div>
                <Label htmlFor='email'>{t('fields.email.label')}</Label>
                <Input
                  id='email'
                  name='email'
                  placeholder={t('fields.email.placeholder')}
                  icon={MailIcon}
                />
              </div>
              <div>
                <Label htmlFor='phone'>{t('fields.phone.label')}</Label>
                <Input
                  id='phone'
                  name='phone'
                  placeholder={t('fields.phone.placeholder')}
                  icon={PhoneIcon}
                />
              </div>
              <div>
                <Label htmlFor='dates'>{t('fields.dates.label')}</Label>
                <PopoverCalendar
                  id='dates'
                  name='dates'
                  date={date}
                  onDateChange={setDate}
                  icon={CalendarIcon}
                  minimumNights={minNights}
                  placeholder={t('fields.dates.placeholder')}
                  footerMessage={t('fields.dates.footer', {min: minNights})}
                />
              </div>
              <div>
                <Label htmlFor='villa'>{t('fields.villa.label')}</Label>
                <Select name='villa'>
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
              </div>
              <div className='col-span-full'>
                <Label htmlFor='message'>{t('fields.message.label')}</Label>
                <Textarea
                  id='message'
                  name='message'
                  placeholder={t('fields.message.placeholder')}
                  icon={MessageCircleIcon}
                />
              </div>
              <div className='flex items-center gap-2 col-span-full'>
                <Checkbox
                  id='consent'
                  name='consent'
                />
                <Label htmlFor='consent'>
                  {t.rich('fields.consent.label', {
                    link: (string) => <PrivacyModal>{string}</PrivacyModal>
                  })}
                </Label>
              </div>
            </CardContent>
            <CardFooter className='justify-end'>
              <Button type='submit'>
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

const FormControl: React.FC = () => {
  return (
    <div>
      <Label></Label>
    </div>
  )
}

ContactFormNew.displayName = 'ContactFormNew'
FormControl.displayName = 'FormControl'

export {ContactFormNew}
