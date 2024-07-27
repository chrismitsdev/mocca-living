import {Card} from '@/components/ui/card'
import {Typography} from '@/components/ui/typography'
import {DrawingPinIcon, InstagramLogoIcon,  MobileIcon} from '@radix-ui/react-icons'

type SocialCardLinksProps = {
  location: string
  name: string
  phone: string
}

function SocialCardLinks({name, location, phone}: SocialCardLinksProps) {
  return (
    <div className='grid gap-4 sm:grid-flow-col sm:auto-cols-fr'>
      <Card className='p-8 hover:border-primary-hover hover:shadow-lg'>
        <div className='flex flex-col gap-4 items-center'>
          <InstagramLogoIcon width={72} height={72} />
          <Typography variant='lead'>{name}</Typography>
        </div>
      </Card>
      <Card className='p-8 hover:border-primary-hover hover:shadow-lg'>
        <div className='flex flex-col gap-4 items-center'>
          <DrawingPinIcon width={72} height={72} />
          <Typography variant='lead'>{location}</Typography>
        </div>
      </Card>
      <Card className='p-8 hover:border-primary-hover hover:shadow-lg'>
        <div className='flex flex-col gap-4 items-center'>
          <MobileIcon width={72} height={72} />
          <Typography variant='lead'>{phone}</Typography>
        </div>
      </Card>
    </div>
  )
}

SocialCardLinks.displayName = 'SocialCardLinks'

export {SocialCardLinks}