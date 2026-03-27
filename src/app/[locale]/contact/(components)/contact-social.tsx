import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconMapPin,
  IconPhone
} from '@tabler/icons-react'
import {useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

function ContactSocial() {
  const t = useTranslations('Pages.Contact.Social')

  return (
    <Section className='bg-surface-2'>
      <Container>
        <div className='grid gap-8 sm:grid-cols-2'>
          <SocialLink href='https://www.google.com/maps?saddr=My+Location&daddr=40.848948,25.723508'>
            <IconMapPin className='size-16' />
            <Typography variant='h4'>{t('location')}</Typography>
          </SocialLink>
          <SocialLink href='tel:+306973560007'>
            <IconPhone className='size-16' />
            <Typography variant='h4'>{t('phone')}</Typography>
          </SocialLink>
          <SocialLink href='https://www.instagram.com/moccaliving.premiumstay'>
            <IconBrandFacebook className='size-16' />
            <Typography variant='h4'>{t('instagram')}</Typography>
          </SocialLink>
          <SocialLink href='https://www.facebook.com/profile.php?id=61566665200042'>
            <IconBrandInstagram className='size-16' />
            <Typography variant='h4'>{t('facebook')}</Typography>
          </SocialLink>
        </div>
      </Container>
    </Section>
  )
}

function SocialLink({
  target = '_blank',
  ...props
}: React.ComponentPropsWithoutRef<'a'>) {
  return (
    <a
      className='p-6 mx-auto w-fit flex flex-col items-center gap-4 transition hover:bg-surface-3 hover:-translate-y-0.5 sm:w-full'
      target={target}
      {...props}
    />
  )
}

ContactSocial.displayName = 'ContactSocial'
SocialLink.displayName = 'SocialLink'

export {ContactSocial}
