import {useTranslations} from 'next-intl'
import {reasonImages} from '@/public/images/about/reasons'
import {
  moccaCityCover,
  moccaSeaDimitraCover,
  moccaSeaGeorgiaCover
} from '@/public/images/covers'
import {Section} from '@/src/components/shared/section'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Typography} from '@/src/components/ui/typography'

function Reasons() {
  const t = useTranslations('Pages.about.reasons')

  return (
    <Section className='space-y-4'>
      <div className='px-3 flex space-x-3 overflow-x-auto sm:hidden'>
        <CustomImage
          className='shrink-0 aspect-3/4 inline-screen'
          src={moccaSeaDimitraCover}
          alt='Mocca Sea Dimitra cover'
        />
        <CustomImage
          className='shrink-0 aspect-3/4 inline-screen'
          src={reasonImages[0]}
          alt='Handmade ceramic cups and a bowl on a dark round table'
        />
        <CustomImage
          className='shrink-0 aspect-3/4 inline-screen'
          src={moccaCityCover}
          alt='Mocca City cover image'
        />
        <CustomImage
          className='shrink-0 aspect-3/4 inline-screen'
          src={reasonImages[1]}
          alt='Handmade ceramic cups arranged on a wooden shelf'
        />
        <CustomImage
          className='shrink-0 aspect-3/4 inline-screen'
          src={moccaSeaGeorgiaCover}
          alt='Mocca Sea Georgia cover'
        />
      </div>
      <div className='space-y-12'>
        <Typography
          variant='h2'
          asChild
        >
          <h2>{t('title')}</h2>
        </Typography>
        <ul className='space-y-10'>
          <Reason
            title={t('reason1.title')}
            description={t('reason1.description')}
          />
          <Reason
            title={t('reason2.title')}
            description={t('reason2.description')}
          />
          <Reason
            title={t('reason3.title')}
            description={t('reason3.description')}
          />
          <Reason
            title={t('reason4.title')}
            description={t('reason4.description')}
          />
          <Reason
            title={t('reason5.title')}
            description={t('reason5.description')}
          />
        </ul>
      </div>
    </Section>
  )
}

function Reason({title, description}: {title: string; description: string}) {
  return (
    <li className='space-y-1'>
      <Typography variant='large'>{title}</Typography>
      <Typography>{description}</Typography>
    </li>
  )
}

export {Reasons}
