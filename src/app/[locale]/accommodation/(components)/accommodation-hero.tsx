import {useTranslations} from 'next-intl'
import {Link} from '@/src/i18n/navigation'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Button} from '@/src/components/ui/button'
import {desktop, mobile} from '@/public/images/accommodation/index/index'

const AccommodationHero: React.FC = () => {
  const t = useTranslations('Pages.Accommodation.Index.Hero')

  return (
    <section className='relative h-[calc(100svh-80px)]'>
      <div className='absolute inset-0 bg-black/25' />
      <CustomImage
        className='w-full h-full object-cover sm:hidden'
        src={mobile}
        alt='Accomdation page mobile hero image'
        priority
      />
      <CustomImage
        className='w-full h-full object-cover hidden sm:block'
        src={desktop}
        alt='Accomdation page desktop hero image'
        priority
      />

      <Button
        className='absolute bottom-10 left-1/2 -translate-x-1/2'
        variant='primary-alt'
        size='large'
        asChild
      >
        <Link href='/contact'>
          <span>{t('button-label')}</span>
        </Link>
      </Button>
    </section>
  )
}

AccommodationHero.displayName = 'AccommodationHero'

export {AccommodationHero}
