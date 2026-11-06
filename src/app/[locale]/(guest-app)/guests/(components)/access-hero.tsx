import {useTranslations} from 'next-intl'
import {Section} from '@/src/components/shared/section'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/src/components/ui/card'
import {AccessForm} from './access-form'

function AccessHero() {
  const t = useTranslations('Pages.guest-app.access')

  return (
    <Section>
      <Card className='mx-auto max-inline-lg sm:p-10'>
        <CardHeader className='text-center'>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <AccessForm />
        </CardContent>
      </Card>
    </Section>
  )
}

export {AccessHero}
