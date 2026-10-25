import {
  IconBrandFacebookFilled,
  IconBrandInstagramFilled,
  IconPhoneFilled
} from '@tabler/icons-react'
import {useTranslations} from 'next-intl'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'
import {OWNER_PHONE} from '@/src/lib/constants'

function SocialLinks() {
  const t = useTranslations('Pages.contact.social-links')

  return (
    <Section>
      <div className='flex flex-col gap-8 sm:flex-row'>
        <SocialLink
          href='https://www.facebook.com/profile.php?id=61566665200042'
          aria-label='Visit our Facebook page (Opens in new tab)'
        >
          <IconBrandFacebookFilled className='size-16' />
          <Typography variant='h4'>{t('facebook')}</Typography>
        </SocialLink>
        <SocialLink
          href='https://www.instagram.com/moccaliving.premiumstay'
          aria-label='Visit our Instagram page (Opens in new tab)'
        >
          <IconBrandInstagramFilled className='size-16' />
          <Typography variant='h4'>{t('instagram')}</Typography>
        </SocialLink>
        <SocialLink
          href={`tel:${OWNER_PHONE}`}
          aria-label='Contact us via phone'
        >
          <IconPhoneFilled className='size-16' />
          <Typography variant='h4'>{t('phone')}</Typography>
        </SocialLink>
      </div>
    </Section>
  )
}

function SocialLink({
  target = '_blank',
  ...props
}: React.ComponentPropsWithoutRef<'a'>) {
  return (
    <a
      className='flex-1 p-6 inline-flex flex-col items-center gap-4 transition hover:bg-surface-3 hover:-translate-y-0.5 focus-visible:bg-surface-3 focus-ring'
      target={target}
      {...props}
    />
  )
}

export {SocialLinks}
