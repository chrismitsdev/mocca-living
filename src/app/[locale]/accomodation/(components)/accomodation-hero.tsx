import {useTranslations} from 'next-intl'
import {Link} from '@/src/i18n/navigation'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Button} from '@/src/components/ui/button'
import accomodationIndex from '@/public/images/accomodation/index/1.webp'

const AccomodationHero: React.FC = () => {
  const t = useTranslations('Pages.Accomodation')
  return (
    <section className='relative h-svh'>
      <CustomImage
        className='w-full h-full object-cover'
        src={accomodationIndex}
        alt='Hero image'
        priority
      />
      <Button
        className='absolute bottom-10 left-1/2 -translate-x-1/2'
        size='large'
        asChild
      >
        <Link href='/contact'>
          <span>{t('HeroImage.button-label')}</span>
        </Link>
      </Button>
    </section>
  )
}

AccomodationHero.displayName = 'AccomodationHero'

export {AccomodationHero}
