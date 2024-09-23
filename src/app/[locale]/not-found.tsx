import {useTranslations} from 'next-intl'
import {Link} from '@/i18n/routing'
import {Container} from '@/components/shared/container'
import {Button} from '@/components/ui/button'
import {HouseIcon, TriangleAlertIcon} from 'lucide-react'

export default function NotFound() {
  const t = useTranslations('Pages.NotFound')

  return (
    <Container asChild>
      <article className='pt-56 grid place-content-center gap-8'>
        <TriangleAlertIcon
          className='mx-auto'
          width={64}
          height={64}
        />
        <div className='space-y-2'>
          <h2 className='text-xl font-semibold text-center'>{t('title')}</h2>
          <p className='text-center'>{t('subtitle')}</p>
        </div>
        <Button
          variant='primary'
          asChild
        >
          <Link href='/'>
            <HouseIcon size={16} />
            <span>{t('linkToHome')}</span>
          </Link>
        </Button>
      </article>
    </Container>
  )
}
