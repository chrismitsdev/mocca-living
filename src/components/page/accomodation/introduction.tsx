import {Link} from '@/navigation'
import Image from 'next/image'
import {Container} from '@/components/shared/container'
import {Typography} from '@/components/ui/typography'
import {Button} from '@/components/ui/button'
import indoorImage from '#/public/images/indoor/4.webp'

function Introduction() {
  return (
    <>
      <div className='relative h-[calc(100vh-128px)] before:absolute before:inset-0 before:bg-black/40'>
        <Image
          priority
          draggable={false}
          className='w-full h-full object-cover'
          src={indoorImage}
          alt='Hero image'
        />
        <Button
          className='absolute bottom-10 left-1/2 -translate-x-1/2'
          variant='primary-alt'
          size='large'
          asChild
        >
          <Link href='/contact'>{'Book now'}</Link>
        </Button>
      </div>
      <Container
        className='space-y-6'
        asChild
      >
        <article>
          <Typography variant='h3'>{'Our Exclusive Villas'}</Typography>
          <Typography className='leading-8'>
            {
              'Experience unparalleled luxury at Mocca Living, where our exclusive villas offer a perfect blend of modern comfort and timeless elegance. Each villa is designed to provide an unforgettable stay, whether you’re here for a family vacation, a getaway with friends, or a romantic retreat.'
            }
          </Typography>
        </article>
      </Container>
    </>
  )
}

Introduction.displayName = 'Introduction'

export {Introduction}
