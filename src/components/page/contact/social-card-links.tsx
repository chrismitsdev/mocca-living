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
    <article className='py-12'>
      <div className='grid gap-8 sm:grid-flow-col sm:auto-cols-fr'>
        <Card className='p-8 bg-brand-4 transition hover:border-primary-hover hover:shadow-lg'>
          <div className='flex flex-col gap-4 items-center'>
            <InstagramLogoIcon width={72} height={72} />
            <Typography variant='large'>{name}</Typography>
          </div>
        </Card>
        <Card className='p-8 bg-brand-4 transition hover:border-primary-hover hover:shadow-lg'>
          <div className='flex flex-col gap-4 items-center'>
            <DrawingPinIcon width={72} height={72} />
            <Typography variant='large'>{location}</Typography>
          </div>
        </Card>
        <Card className='p-8 bg-brand-4 transition hover:border-primary-hover hover:shadow-lg'>
          <div className='flex flex-col gap-4 items-center'>
            <MobileIcon width={72} height={72} />
            <Typography variant='large'>{phone}</Typography>
          </div>
        </Card>
      </div>
      {/* <div className='flex flex-wrap justify-between gap-8'>
        <Card className='p-8 flex-1 bg-brand-4 transition hover:border-primary-hover hover:shadow-lg'>
          <div className='flex flex-col gap-4 items-center'>
            <InstagramLogoIcon width={72} height={72} />
            <Typography variant='large'>{name}</Typography>
          </div>
        </Card>
        <Card className='p-8 flex-1 bg-brand-4 transition hover:border-primary-hover hover:shadow-lg'>
          <div className='flex flex-col gap-4 items-center'>
            <DrawingPinIcon width={72} height={72} />
            <Typography variant='large'>{location}</Typography>
          </div>
        </Card>
        <Card className='p-8 flex-1 bg-brand-4 transition hover:border-primary-hover hover:shadow-lg'>
          <div className='flex flex-col gap-4 items-center'>
            <MobileIcon width={72} height={72} />
            <Typography variant='large'>{phone}</Typography>
          </div>
        </Card>
      </div> */}
    </article>
  )
}

SocialCardLinks.displayName = 'SocialCardLinks'

export {SocialCardLinks}