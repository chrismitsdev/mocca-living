import {useTranslations} from 'next-intl'
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
import {Typography} from '@/src/components/ui/typography'

function ContactForm() {
  const t = useTranslations('Pages.Contact.Form')

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
            <Form />
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}

ContactForm.displayName = 'ContactForm'

export {ContactForm}
