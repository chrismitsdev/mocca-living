import heroPortrait from '@/public/images/guest-app/hero-landscape.webp'
import heroLandscape from '@/public/images/guest-app/hero-landscape.webp'
import {Button} from '@/src/components/ui/button'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Typography} from '@/src/components/ui/typography'
import {Link} from '@/src/i18n/navigation'

function HeroSelector() {
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
      <div className='py-15 px-8 absolute inset-0 flex flex-col justify-between gap-30 bg-linear-to-b from-surface-2 via-transparent to-surface-2 sm:py-30 sm:gap-50'>
        <div className='space-y-8 text-center'>
          <Typography variant='h1'>Welcome</Typography>
          <Typography variant='large'>
            We are here to make sure your stay will be comfortable and
            unforgettable
          </Typography>
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

export {HeroSelector}
