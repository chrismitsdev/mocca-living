import {useTranslations} from 'next-intl'
import {desktop, mobile} from '@/public/images/accommodation/index/index'
import {Button} from '@/src/components/ui/button'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Link} from '@/src/i18n/navigation'

function AccommodationHero() {
  const t = useTranslations('Pages.accommodation.index.hero')

  return (
    <section className='relative h-[calc(100svh-80px)]'>
      <div className='absolute inset-0 bg-black/25' />
      <CustomImage
        className='w-full h-full sm:hidden'
        src={mobile}
        alt='Accomdation page mobile hero image'
        sizes='100vw'
        quality={60}
      />
      <CustomImage
        className='w-full h-full hidden sm:block'
        src={desktop}
        alt='Accomdation page desktop hero image'
        sizes='100vw'
        quality={60}
      />
      <Button
        className='absolute bottom-10 left-1/2 -translate-x-1/2'
        size='large'
        variant='outline'
        asChild
      >
        <Link href='/contact'>{t('button-label')}</Link>
      </Button>
    </section>
  )
}

AccommodationHero.displayName = 'AccommodationHero'

export {AccommodationHero}
