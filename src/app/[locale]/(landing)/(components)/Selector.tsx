import {IconArrowRight} from '@tabler/icons-react'
import Image, {type StaticImageData} from 'next/image'
import {useTranslations} from 'next-intl'
import {cityDimitraCover, seaDimitraCover} from '@/public/images/covers'
import moccaLogo from '@/public/logos/mocca-logo-simple.svg'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Link} from '@/src/i18n/navigation'
import {cn} from '@/src/lib/utils'

function Selector() {
  const t = useTranslations('Pages.home')

  return (
    <div className='flex flex-col block-dvh relative overflow-hidden md:flex-row'>
      <Destination
        className='not-md:border-be md:border-e'
        href='/accommodation/mocca-sea/sea-dimitra'
        src={seaDimitraCover}
        heading={t('mocca-sea.heading')}
        title={t('mocca-sea.title')}
      />
      <Destination
        className='not-md:border-bs md:border-s'
        href='/accommodation/mocca-city/city-dimitra'
        src={cityDimitraCover}
        heading={t('mocca-city.heading')}
        title={t('mocca-city.title')}
      />
      <Logo />
    </div>
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
        'flex-1 size-full relative overflow-hidden border-primary-foreground focus-visible:outline-primary-foreground focus-visible:-outline-offset-8 group',
        className
      )}
      href={href}
    >
      <CustomImage
        className='duration-1000 group-hover:scale-105'
        src={src}
        alt={title}
      />
      <div className='px-4 py-10 absolute inset-x-0 inset-be-0 text-primary-foreground text-left bg-linear-to-b fromfrom-transparent to-black md:py-30 md:text-center'>
        <span className='block uppercase text-xs tracking-widest md:text-sm'>
          {heading}
        </span>
        <span className='block text-4xl font-serif md:mt-2 md:mb-10 md:text-7xl'>
          {title}
        </span>
        <span className='px-10 block-12 hidden items-center gap-x-1 border md:inline-flex'>
          <span>{t('button')}</span>
          <IconArrowRight className='mt-px size-5 duration-1000 group-hover:translate-x-0.5' />
        </span>
      </div>
    </Link>
  )
}

function Logo() {
  return (
    <div className='p-2 bg-primary-foreground absolute top-1/2 left-1/2 -translate-1/2'>
      <Image
        className='size-6 md:size-10'
        src={moccaLogo}
        alt='Mocca Living logo'
      />
    </div>
  )
}

Selector.displayName = 'Selector'
Destination.displayName = 'Destination'
Logo.displayName = 'Logo'

export {Selector}
