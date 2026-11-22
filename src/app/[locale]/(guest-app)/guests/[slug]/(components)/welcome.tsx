import type {StaticImageData} from 'next/image'
import {useTranslations} from 'next-intl'
import {moccaCityCover, moccaSeaDimitraCover} from '@/public/images/covers'
import {Container} from '@/src/components/shared/container'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Typography} from '@/src/components/ui/typography'
import type {GuestAppProperty} from '@/src/lib/guest-app/properties'

// The same covers as on the public site
const covers: Record<GuestAppProperty, StaticImageData> = {
  'mocca-by-the-sea-dimitra': moccaSeaDimitraCover,
  'mocca-city': moccaCityCover
}

function Welcome({slug}: {slug: GuestAppProperty}) {
  const t = useTranslations('Pages.guest-app.home')
  const tProperty = useTranslations('Metadata.guest-app')

  return (
    <section className='relative h-80'>
      <CustomImage
        src={covers[slug]}
        alt=''
        sizes='100vw'
        quality={60}
        preload
      />
      <div className='absolute inset-0 flex items-end bg-linear-to-b from-black/10 to-black/75'>
        <Container className='pb-8 space-y-2 text-center text-surface-2 sm:pb-12'>
          <Typography
            variant='h2'
            as='p'
          >
            {t('title', {property: tProperty(slug)})}
          </Typography>
          <Typography>{t('description')}</Typography>
        </Container>
      </div>
    </section>
  )
}

export {Welcome}
