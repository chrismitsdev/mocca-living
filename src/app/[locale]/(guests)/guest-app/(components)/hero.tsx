import heroLandscape from '@/public/images/guest-app/hero-landscape.webp'
import heroPortrait from '@/public/images/guest-app/hero-landscape.webp'
import {Button} from '@/src/components/ui/button'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Link} from '@/src/i18n/navigation'

function Hero() {
  return (
    <section className='relative block-[calc(100svh-var(--guest-header-height))]'>
      <CustomImage
        className='hidden sm:block'
        src={heroLandscape}
        alt='Guest app page hero image'
      />
      <CustomImage
        className='block sm:hidden'
        src={heroPortrait}
        alt='Guest app page hero image'
      />
      {/* <div className='py-15 px-8 absolute inset-0 flex flex-col gap-30 bg-radial from-transparent to-surface-2 sm:py-30 sm:justify-between'> */}
      <div className='py-15 px-8 absolute inset-0 flex flex-col gap-30 bg-linear-to-b from-surface-2 via-transparent to-surface-2 sm:py-30 sm:gap-50'>
        <div className='space-y-8 text-center'>
          <span className='block text-5xl font-serif font-bold'>Welcome</span>
          <span className='block text-lg'>
            We are here to make sure your stay will be comfortable and
            unforgettable
          </span>
        </div>
        <div className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
          <Button
            className='sm:min-inline-56'
            size='large'
            asChild
          >
            <Link href='/guest-app/mocca-by-the-sea-dimitra'>
              Mocca by the Sea
            </Link>
          </Button>
          <Button
            className='sm:min-inline-56'
            size='large'
            asChild
          >
            <Link href='/guest-app/mocca-city'>Mocca City</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export {Hero}
