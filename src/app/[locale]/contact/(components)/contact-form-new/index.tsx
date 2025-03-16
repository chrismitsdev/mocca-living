'use client'

import {useTranslations} from 'next-intl'
import {UserIcon, MailIcon, PhoneIcon} from 'lucide-react'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/src/components/ui/card'
import {Label} from '@/src/components/ui/label'
import {Input} from '@/src/components/ui/input'
import {Textarea} from '@/src/components/ui/textarea'
import {Checkbox} from '@/src/components/ui/checkbox'
import {DatePicker} from '@/src/components/ui/date-picker'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPortal,
  SelectContent,
  SelectViewport,
  SelectItem
} from '@/src/components/ui/select'
import {Button} from '@/src/components/ui/button'
import {Calendar} from '@/src/app/[locale]/contact/(components)/contact-form-new/calendar'

const ContactFormNew: React.FC = () => {
  const t = useTranslations('Components.Form')

  return (
    <Section>
      <Container>
        <Calendar />

        {/* <Card>
          <CardHeader>
            <CardTitle>{t('contact-page-title')}</CardTitle>
            <CardDescription>{t('contact-page-description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className='grid grid-cols-3 gap-12'>
                <div>
                  <Label htmlFor='fullname'>{t('fields.fullName.label')}</Label>
                  <Input
                    id='fullname'
                    name='fullname'
                    placeholder={t('fields.fullName.placeholder')}
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
                  <Label htmlFor='checIn'>{t('fields.checkIn.label')}</Label>
                  <DatePicker
                    id='checkIn'
                    placeholder={t('fields.checkIn.placeholder')}
                  />
                </div>
              </div>
            </form>
          </CardContent>
        </Card> */}
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
