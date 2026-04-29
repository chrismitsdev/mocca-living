import {useTranslations} from 'next-intl'
import {
  cityDimitraCover,
  seaDimitraCover,
  seaGeorgiaCover
} from '@/public/images/covers'
import {homeReasonsImages} from '@/public/images/home/home-reasons'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Typography} from '@/src/components/ui/typography'

function HomeReasons() {
  const t = useTranslations('Pages.home.home-reasons')

  return (
    <Section className='bg-surface-2 space-y-4'>
      <div className='px-3 flex gap-x-3 overflow-x-auto snap-x snap-mandatory sm:hidden'>
        <CustomImage
          className='aspect-3/4 inline-[calc(100vw-24px)] snap-center'
          src={seaDimitraCover}
          alt='Mocca Sea Dimitra cover'
        />
        <CustomImage
          className='aspect-3/4 inline-[calc(100vw-24px)] snap-center'
          src={homeReasonsImages[0]}
          alt='Handmade ceramic cups and a bowl on a dark round table'
        />
        <CustomImage
          className='aspect-3/4 inline-[calc(100vw-24px)] snap-center'
          src={cityDimitraCover}
          alt='Mocca City Georgia villa'
        />
        <CustomImage
          className='aspect-3/4 inline-[calc(100vw-24px)] snap-center'
          src={homeReasonsImages[1]}
          alt='Handmade ceramic cups arranged on a wooden shelf'
        />
        <CustomImage
          className='aspect-3/4 inline-[calc(100vw-24px)] snap-center'
          src={seaGeorgiaCover}
          alt='Mocca Sea Georgia cover'
        />
      </div>
      <Container>
        <div className='space-y-12'>
          <Typography
            variant='h2'
            asChild
          >
            <h2>{t('title')}</h2>
          </Typography>
          <ul className='space-y-10'>
            <ReasonItem
              title={t('reason1.title')}
              description={t('reason1.description')}
            />
            <ReasonItem
              title={t('reason2.title')}
              description={t('reason2.description')}
            />
            <ReasonItem
              title={t('reason3.title')}
              description={t('reason3.description')}
            />
            <ReasonItem
              title={t('reason4.title')}
              description={t('reason4.description')}
            />
            <ReasonItem
              title={t('reason5.title')}
              description={t('reason5.description')}
            />
          </ul>
        </div>
      </Container>
    </Section>
  )
}

function ReasonItem({
  title,
  description
}: {
  title: string
  description: string
}) {
  return (
    <li className='space-y-1'>
      <Typography variant='large'>{title}</Typography>
      <Typography>{description}</Typography>
    </li>
  )
}

HomeReasons.displayName = 'HomeReasons'
ReasonItem.displayName = 'ReasonItem'

export {HomeReasons}
