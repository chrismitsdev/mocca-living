'use client'

import * as React from 'react'
import {useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Form} from '@/src/components/shared/form'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/src/components/ui/card'

const ContactForm: React.FC = () => {
  const t = useTranslations('Pages.Contact.Form')

  return (
    <Section>
      <Container>
        <Card className='px-4 py-8 space-y-8 sm:p-16 w-full'>
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>{t('description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form />
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}

ContactForm.displayName = 'ContactForm'

export {ContactForm}
