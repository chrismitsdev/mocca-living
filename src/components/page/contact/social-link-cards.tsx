import {Container} from '@/components/shared/container'
import {Typography} from '@/components/ui/typography'
import {MapPin, InstagramIcon, FacebookIcon, PhoneIcon} from 'lucide-react'

type SocialLinkCardsProps = {
  location: string
  name: string
  phone: string
}

function SocialLinkCards({name, location, phone}: SocialLinkCardsProps) {
  return (
    <article className='py-24 bg-surface-3'>
      <Container>
        <div className='grid gap-8 sm:grid-cols-4'>
          <SocialLink href='https://www.google.com/maps?saddr=My+Location&daddr=40.849038,25.723552'>
            <MapPin size={64} />
            <Typography variant='h4'>{location}</Typography>
          </SocialLink>
          <SocialLink href='https://www.instagram.com/'>
            <InstagramIcon size={64} />
            <Typography variant='h4'>{name}</Typography>
          </SocialLink>
          <SocialLink href='https://www.facebook.com/'>
            <FacebookIcon size={64} />
            <Typography variant='h4'>{name}</Typography>
          </SocialLink>
          <SocialLink href='tel:+306973433980'>
            <PhoneIcon size={64} />
            <Typography variant='h4'>{phone}</Typography>
          </SocialLink>
        </div>
      </Container>
    </article>
  )
}

function SocialLink({target = '_blank', ...props}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className='p-6 flex flex-col items-center gap-4 rounded transition hover:bg-surface-4 hover:-translate-y-0.5'
      target={target}
      {...props}
    />
  )
}

SocialLinkCards.displayName = 'SocialLinkCards'
SocialLink.displayName = 'SocialLink'

export {SocialLinkCards}
