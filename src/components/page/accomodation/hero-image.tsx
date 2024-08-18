import Image from 'next/image'
import {Link} from '@/navigation'
import {Button} from '@/components/ui/button'
import indoorImage from '#/public/images/indoor/1.webp'

function HeroImage() {
  return (
    <div className='relative h-[100svh]'>
      <Image
        className='w-full h-full object-cover'
        src={indoorImage}
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
