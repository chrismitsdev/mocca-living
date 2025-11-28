import {TriangleAlertIcon} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {ClientLink} from '@/src/components/shared/client-link'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Button} from '@/src/components/ui/button'
import {Typography} from '@/src/components/ui/typography'

export default function NotFound() {
  const t = useTranslations('Pages.NotFound')

  return (
    <Section>
      <Container>
        <div className='flex flex-col items-center space-y-6'>
          <TriangleAlertIcon size={128} />
          <Typography
            variant='h3'
            asChild
          >
            <h2>{t('title')}</h2>
          </Typography>
          <Typography>{t('subtitle')}</Typography>
          <Button
            variant='primary'
            size='large'
            asChild
          >
            <ClientLink
              href='/'
              replace
            >
              <span>{t('linkToHome')}</span>
            </ClientLink>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
