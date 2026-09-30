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
      <div className='py-20 px-8 absolute inset-0 bg-radial from-transparent from-20% to-surface-1 flex flex-col justify-between gap-8 sm:justify-center'>
        <div className='space-y-4 text-center'>
          <span className='block text-5xl font-serif font-semibold'>
            Welcome
          </span>
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
            <Link href='/guest-app/mocca-by-the-sea'>Mocca by the Sea</Link>
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
