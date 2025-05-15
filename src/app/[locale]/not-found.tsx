import {useTranslations} from 'next-intl'
import {TriangleAlertIcon} from 'lucide-react'
import {Section} from '@/src/components/shared/section'
import {Container} from '@/src/components/shared/container'
import {ClientLink} from '@/src/components/shared/client-link'
import {Typography} from '@/src/components/ui/typography'
import {Button} from '@/src/components/ui/button'

export default function NotFound() {
  const t = useTranslations('Pages.NotFound')

  return (
    <Section>
      <Container>
        <div className='flex flex-col items-center space-y-6'>
          <TriangleAlertIcon
            width={128}
            height={128}
          />
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
