import {IconArrowRight} from '@tabler/icons-react'
import Image, {type StaticImageData} from 'next/image'
import {useTranslations} from 'next-intl'
import {moccaCityCover, moccaSeaDimitraCover} from '@/public/images/covers'
import moccaLogo from '@/public/logos/mocca-logo.svg'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Link} from '@/src/i18n/navigation'
import {cn} from '@/src/lib/utils'

function HeroSelector() {
  const t = useTranslations('Pages.home')

  return (
    <section className='flex flex-col block-dvh relative overflow-hidden sm:flex-row'>
      <Destination
        className='not-sm:border-be sm:border-e-2'
        href='/accommodation/mocca-by-the-sea-dimitra'
        src={moccaSeaDimitraCover}
        heading={t('mocca-by-the-sea.heading')}
        title={t('mocca-by-the-sea.title')}
      />
      <Destination
        className='not-sm:border-bs sm:border-s-2'
        href='/accommodation/mocca-city'
        src={moccaCityCover}
        heading={t('mocca-city.heading')}
        title={t('mocca-city.title')}
      />
      <Logo />
    </section>
  )
}

function Destination({
  className,
  href,
  src,
  heading,
  title
}: {
  className: string
  href: string
  src: StaticImageData
  heading: string
  title: string
}) {
  const t = useTranslations('Pages.home')

  return (
    <Link
      className={cn(
        'flex-1 size-full relative overflow-hidden border-surface-2 focus-ring group',
        className
      )}
      href={href}
    >
      <CustomImage
        className='object-[40%] duration-1000 group-hover:scale-105'
        src={src}
        sizes='(min-width: 640px) 50vw, 100vw'
        alt=''
        preload
      />
      <div className='px-4 py-10 absolute inset-x-0 inset-be-0 text-surface-2 text-left bg-linear-to-b from-transparent to-black sm:py-30 sm:text-center'>
        <span className='block uppercase text-xs tracking-widest sm:text-sm'>
          {heading}
        </span>
        <span className='block text-4xl font-serif sm:mt-2 sm:mb-10 sm:text-7xl'>
          {title}
        </span>
        <span className='px-10 block-12 hidden items-center gap-x-1 border sm:inline-flex'>
          <span>{t('button-label')}</span>
          <IconArrowRight
            className='mt-px size-5 duration-1000 group-hover:translate-x-0.5'
            aria-hidden
          />
        </span>
      </div>
    </Link>
  )
}

function Logo() {
  const t = useTranslations('Pages.home')

  return (
    <Link
      className='p-2 absolute top-1/2 left-1/2 -translate-1/2 bg-surface-2 hover:bg-surface-3 focus-ring sm:p-3'
      href='/about'
      aria-label={t('about-link')}
    >
      <Image
        className='inline-8 sm:inline-14'
        src={moccaLogo}
        alt=''
        loading='eager'
      />
    </Link>
  )
}

export {HeroSelector}
