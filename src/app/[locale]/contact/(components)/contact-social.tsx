import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconPhone
} from '@tabler/icons-react'
import {useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

function ContactSocial() {
  const t = useTranslations('Pages.contact.contact-social')

  return (
    <Section className='bg-surface-2'>
      <Container>
        <div className='flex flex-wrap gap-8'>
          <SocialLink href='https://www.facebook.com/profile.php?id=61566665200042'>
            <IconBrandFacebook className='size-16' />
            <Typography variant='h4'>{t('facebook')}</Typography>
          </SocialLink>
          <SocialLink href='https://www.instagram.com/moccaliving.premiumstay'>
            <IconBrandInstagram className='size-16' />
            <Typography variant='h4'>{t('instagram')}</Typography>
          </SocialLink>
          <SocialLink href='tel:+306973560007'>
            <IconPhone className='size-16' />
            <Typography variant='h4'>{t('phone')}</Typography>
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
      className='flex-1 p-6 inline-flex flex-col items-center gap-4 transition hover:bg-surface-3 hover:-translate-y-0.5'
      target={target}
      {...props}
    />
  )
}

ContactSocial.displayName = 'ContactSocial'
SocialLink.displayName = 'SocialLink'

export {ContactSocial}
