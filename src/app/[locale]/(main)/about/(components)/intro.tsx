import {IconMapPin} from '@tabler/icons-react'
import type {StaticImageData} from 'next/image'
import {useTranslations} from 'next-intl'
import {moccaCityCover, moccaSeaDimitraCover} from '@/public/images/covers'
import {Section} from '@/src/components/shared/section'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Separator} from '@/src/components/ui/separator'
import {Typography} from '@/src/components/ui/typography'
import {Link} from '@/src/i18n/navigation'

function Intro() {
  const t = useTranslations('Pages.about.intro')

  return (
    <Section title={t('section-title')}>
      <div className='grid gap-4 sm:grid-cols-3'>
        <div className='space-y-6 sm:space-y-10'>
          <Typography
            variant='display'
            serif
          >
            {t('title')}
          </Typography>
          <Typography>{t('description')}</Typography>
          <div className='space-y-4'>
            <Separator className='max-inline-12' />
            <Typography
              className='text-surface-5 uppercase tracking-widest'
              variant='tiny'
            >
              {t('subtitle')}
            </Typography>
          </div>
        </div>
        <IntroCard
          src={moccaSeaDimitraCover}
          href='/accommodation/mocca-by-the-sea-dimitra'
          title='Mocca by the Sea'
          location={t('mocca-by-the-sea-location')}
        />
        <IntroCard
          src={moccaCityCover}
          href='/accommodation/mocca-city'
          title='Mocca City'
          location={t('mocca-city-location')}
        />
      </div>
    </Section>
  )
}

function IntroCard({
  src,
  href,
  title,
  location
}: {
  src: StaticImageData
  href: string
  title: string
  location: string
}) {
  return (
    <Link
      className='relative text-surface-2 group'
      href={href}
    >
      <CustomImage
        className='sm:min-block-160'
        src={src}
        alt=''
      />
      <div className='p-2 space-y-2 absolute inset-be-0 inset-x-0 bg-black/25 backdrop-blur-sm sm:space-y-4 sm:p-6 '>
        <Typography
          variant='h2'
          serif
        >
          {title}
        </Typography>
        <div className='flex items-center gap-x-2'>
          <IconMapPin className='size-4' />
          <Typography
            variant='tiny'
            className='uppercase tracking-widest font-normal'
          >
            {location}
          </Typography>
        </div>
      </div>
    </Link>
  )
}

export {Intro}
