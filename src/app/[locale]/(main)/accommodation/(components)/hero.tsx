import {useTranslations} from 'next-intl'
import {desktop, mobile} from '@/public/images/accommodation/index/index'
import {Button} from '@/src/components/ui/button'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Link} from '@/src/i18n/navigation'

function Hero() {
  const t = useTranslations('Pages.accommodation.index.hero')

  return (
    <section className='relative h-[calc(100svh-var(--main-header-height))]'>
      <CustomImage
        className='w-full h-full sm:hidden'
        src={mobile}
        alt='Accommodation page mobile hero image'
        sizes='100vw'
        quality={60}
        preload
      />
      <CustomImage
        className='w-full h-full hidden sm:block'
        src={desktop}
        alt='Accommodation page desktop hero image'
        sizes='100vw'
        quality={60}
        preload
      />
      <Button
        className='absolute bottom-10 left-1/2 -translate-x-1/2'
        size='large'
        variant='primary'
        asChild
      >
        <Link href='/contact'>{t('button-label')}</Link>
      </Button>
    </section>
  )
}

export {Hero}
