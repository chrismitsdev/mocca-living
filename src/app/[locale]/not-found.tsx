import {useTranslations} from 'next-intl'
import {Link} from '@/navigation'
import {Container} from '@/components/shared/container'
import {buttonVariants} from '@/components/ui/button'
import {ExclamationTriangleIcon, HomeIcon} from '@radix-ui/react-icons'

export default function NotFound() {
  const t = useTranslations('Pages.NotFound')

  return (
    <Container asChild>
      <section>
        <div className='my-8 flex flex-col items-center gap-4'>
          <ExclamationTriangleIcon width={64} height={64} />
          <div>
            <h2 className='text-xl font-semibold text-center'>{t('title')}</h2>
            <p className='text-center'>{t('subtitle')}</p>
          </div>
          <Link 
            className={buttonVariants({
              variant: 'primary', 
              size: 'normal'
            })} 
            href='/'
          >
            <HomeIcon />
            <span>{t('linkToHome')}</span>
          </Link>
        </div>
      </section>
    </Container>
  )
}