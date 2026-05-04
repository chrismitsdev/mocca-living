import {
  IconBrandFacebookFilled,
  IconBrandInstagramFilled,
  IconPhoneFilled
} from '@tabler/icons-react'
import {useTranslations} from 'next-intl'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'
import {PHONE} from '@/src/lib/utils'

function ContactSocial() {
  const t = useTranslations('Pages.contact.contact-social')

  return (
    <Section className='bg-surface-2'>
      <Container>
        <div className='flex flex-wrap gap-8'>
          <SocialLink href='https://www.facebook.com/profile.php?id=61566665200042'>
            <IconBrandFacebookFilled className='size-16' />
            <Typography variant='h4'>{t('facebook')}</Typography>
          </SocialLink>
          <SocialLink href='https://www.instagram.com/moccaliving.premiumstay'>
            <IconBrandInstagramFilled className='size-16' />
            <Typography variant='h4'>{t('instagram')}</Typography>
          </SocialLink>
          <SocialLink href={`tel:${PHONE}`}>
            <IconPhoneFilled className='size-16' />
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
