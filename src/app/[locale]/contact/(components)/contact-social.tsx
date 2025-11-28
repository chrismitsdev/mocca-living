import {FacebookIcon, InstagramIcon, MapPin, PhoneIcon} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

const ContactSocial: React.FC = () => {
  const t = useTranslations('Pages.Contact.Social')

  return (
    <Section className='bg-surface-2'>
      <Container>
        <div className='grid gap-8 sm:grid-cols-2'>
          <SocialLink href='https://www.google.com/maps?saddr=My+Location&daddr=40.848948,25.723508'>
            <MapPin size={64} />
            <Typography variant='h4'>{t('location')}</Typography>
          </SocialLink>
          <SocialLink href='tel:+306973560007'>
            <PhoneIcon size={64} />
            <Typography variant='h4'>{t('phone')}</Typography>
          </SocialLink>
          <SocialLink href='https://www.instagram.com/moccaliving.premiumstay'>
            <InstagramIcon size={64} />
            <Typography variant='h4'>{t('instagram')}</Typography>
          </SocialLink>
          <SocialLink href='https://www.facebook.com/profile.php?id=61566665200042'>
            <FacebookIcon size={64} />
            <Typography variant='h4'>{t('facebook')}</Typography>
          </SocialLink>
        </div>
      </Container>
    </Section>
  )
}

const SocialLink: React.FC<React.ComponentPropsWithoutRef<'a'>> = ({
  target = '_blank',
  ...props
}) => {
  return (
    <a
      className='p-6 mx-auto w-fit flex flex-col items-center gap-4 rounded transition hover:bg-surface-3 hover:-translate-y-0.5 sm:w-full'
      target={target}
      {...props}
    />
  )
}

ContactSocial.displayName = 'ContactSocial'
SocialLink.displayName = 'SocialLink'

export {ContactSocial}
