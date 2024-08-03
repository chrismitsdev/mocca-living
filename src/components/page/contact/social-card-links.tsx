import {Typography} from '@/components/ui/typography'
import {DrawingPinIcon, InstagramLogoIcon,  MobileIcon} from '@radix-ui/react-icons'

type SocialCardLinksProps = {
  location: string
  name: string
  phone: string
}

function SocialCardLinks({name, location, phone}: SocialCardLinksProps) {
  return (
    <article className='py-16 bg-muted'>
      <div className='container grid gap-12 sm:grid-cols-[auto_1fr_auto]'>
        <div className='flex flex-col gap-4 items-center'>
          <InstagramLogoIcon width={72} height={72} />
          <Typography variant='h4'>{name}</Typography>
        </div>
        <div className='flex flex-col gap-4 items-center'>
          <DrawingPinIcon width={72} height={72} />
          <Typography variant='h4'>{location}</Typography>
        </div>
        <div className='flex flex-col gap-4 items-center'>
          <MobileIcon width={72} height={72} />
          <Typography variant='h4'>{phone}</Typography>
        </div>
      </div>
    </article>
  )
}

SocialCardLinks.displayName = 'SocialCardLinks'

export {SocialCardLinks}