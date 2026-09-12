import {useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/src/components/ui/card'
import {Typography} from '@/src/components/ui/typography'
import {Form as ContactForm} from './form'

function Form() {
  const t = useTranslations('Pages.contact.contact-form')

  return (
    <Section>
      <Container>
        <Card className='sm:p-20'>
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>
              <Typography>{t('description')}</Typography>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}

export {Form}
