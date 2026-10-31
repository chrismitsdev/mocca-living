import {useTranslations} from 'next-intl'
import heroLandscape from '@/public/images/guest-app/hero-landscape.webp'
import heroPortrait from '@/public/images/guest-app/hero-portrait.webp'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Typography} from '@/src/components/ui/typography'
import {AccessForm} from './access-form'

function AccessHero() {
  const t = useTranslations('Pages.guest-app.access')

  return (
    <section className='relative min-block-[calc(100svh-var(--guest-header-height))]'>
      <CustomImage
        className='hidden sm:block'
        src={heroLandscape}
        alt={t('image-alt')}
      />
      <CustomImage
        className='block sm:hidden'
        src={heroPortrait}
        alt={t('image-alt')}
      />
      <div className='py-15 px-6 absolute inset-0 flex items-center justify-center bg-linear-to-b from-surface-2 via-surface-2/60 to-surface-2 sm:py-20'>
        <div className='p-6 inline-full max-inline-md space-y-6 bg-surface-1/95 sm:p-8'>
          <div className='space-y-2 text-center'>
            <Typography variant='h1'>{t('title')}</Typography>
            <Typography variant='small'>{t('subtitle')}</Typography>
          </div>
          <AccessForm />
        </div>
      </div>
    </section>
  )
}

export {AccessHero}
