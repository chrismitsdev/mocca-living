import {Typography} from '@/components/ui/typography'
import {FacebookIcon} from '@/components/social-icons/facebook-icon'
import {InstagramIcon} from '@/components/social-icons/instagram-icon'
import {PhoneIcon} from '@/components/social-icons/phone-icon'
import {PinIcon} from '@/components/social-icons/pin-icon'

type SocialCardLinksProps = {
  location: string
  name: string
  phone: string
}

function SocialCardLinks({name, location, phone}: SocialCardLinksProps) {
  return (
    <article className='py-24 bg-surface-3'>
      <div className='container flex flex-wrap justify-center gap-8'>
        <a 
          className='p-6 flex-1 inline-flex flex-col items-center gap-4 rounded'
          href='https://www.google.com/maps?saddr=My+Location&daddr=40.849038,25.723552' 
          target='_blank'
        >
          <PinIcon width={72} height={72} />
          <Typography className='whitespace-nowrap' variant='h4'>{location}</Typography>
        </a>
        <a 
          className='p-6 flex-1 inline-flex flex-col items-center gap-4 rounded'
          href='https://www.instagram.com/' 
          target='_blank'
        >
          <InstagramIcon width={72} height={72} />
          <Typography className='whitespace-nowrap' variant='h4'>{name}</Typography>
        </a>
        <a 
          className='p-6 flex-1 inline-flex flex-col items-center gap-4 rounded'
          href='https://www.facebook.com/' 
          target='_blank'
        >
          <FacebookIcon width={72} height={72} />
          <Typography className='whitespace-nowrap' variant='h4'>{name}</Typography>
        </a>
        <a 
          className='p-6 flex-1 inline-flex flex-col items-center gap-4 rounded'
          href='tel:+306973433980'
          target='_blank'
        >
          <PhoneIcon width={72} height={72} />
          <Typography className='whitespace-nowrap' variant='h4'>{phone}</Typography>
        </a>
      </div>
    </article>
  )
}

SocialCardLinks.displayName = 'SocialCardLinks'

export {SocialCardLinks}