import {Typography} from '@/components/ui/typography'
import {DrawingPinIcon, InstagramLogoIcon,  MobileIcon} from '@radix-ui/react-icons'

type SocialCardLinksProps = {
  location: string
  name: string
  phone: string
}

function SocialCardLinks({name, location, phone}: SocialCardLinksProps) {
  return (
    <article className='py-24 bg-surface-2'>
      <div className='container flex flex-wrap justify-center gap-8'>
        <div className='p-6 flex-1 inline-flex flex-col items-center gap-4 bg-surface-3 rounded'>
          <InstagramLogoIcon width={72} height={72} />
          <Typography className='whitespace-nowrap' variant='h4'>{name}</Typography>
        </div>
        <div className='p-6 flex-1 inline-flex flex-col items-center gap-4 bg-surface-3 rounded'>
          <DrawingPinIcon width={72} height={72} />
          <Typography className='whitespace-nowrap' variant='h4'>{location}</Typography>
        </div>
        <div className='p-6 flex-1 inline-flex flex-col items-center gap-4 bg-surface-3 rounded'>
          <MobileIcon width={72} height={72} />
          <Typography className='whitespace-nowrap' variant='h4'>{phone}</Typography>
        </div>
      </div>
    </article>
  )
}

SocialCardLinks.displayName = 'SocialCardLinks'

export {SocialCardLinks}