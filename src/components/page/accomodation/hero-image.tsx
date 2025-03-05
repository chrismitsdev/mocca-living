import {Link} from '@/src/i18n/navigation'
import {CustomImage} from '@/src/components/ui/custom-image'
import {Button} from '@/src/components/ui/button'
import {dimitra35} from '@/public/images/accomodation/slug/dimitra'

const HeroImage: React.FC = () => {
  return (
    <div className='relative h-svh'>
      <CustomImage
        className='w-full h-full object-cover'
        src={dimitra35}
        alt='Hero image'
        draggable={false}
        priority
      />
      <Button
        className='absolute bottom-10 left-1/2 -translate-x-1/2'
        variant='primary'
        size='large'
        asChild
      >
        <Link href='/contact'>
          <span>{'Book now'}</span>
        </Link>
      </Button>
    </div>
  )
}

HeroImage.displayName = 'HeroImage'

export {HeroImage}
