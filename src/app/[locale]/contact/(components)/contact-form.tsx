'use client'

import {useTranslations} from 'next-intl'
import type * as React from 'react'
import {Container} from '@/src/components/shared/container'
import {Form} from '@/src/components/shared/form'
import {Section} from '@/src/components/shared/section'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
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
