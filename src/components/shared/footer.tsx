import {IconBrandFacebook, IconBrandInstagram} from '@tabler/icons-react'
import Image from 'next/image'
import {useTranslations} from 'next-intl'
import logoFull from '@/public/logos/mocca-logo-box.svg'
import {Container} from '@/src/components/shared/container'
import {DialogAudioPlayer} from '@/src/components/shared/dialog-audio-player'
import {LocaleSwitcher} from '@/src/components/shared/locale-switcher'
import {LogosCarousel} from '@/src/components/shared/logos-carousel'
import {IconButton} from '@/src/components/ui/icon-button'
import {Separator} from '@/src/components/ui/separator'
import {Typography} from '@/src/components/ui/typography'
import {Link} from '@/src/i18n/navigation'
import {cn} from '@/src/lib/utils'

function Footer() {
  const t = useTranslations('Components.footer')

  return (
    <footer className='py-16 bg-surface-3'>
      <Container className='space-y-12'>
        <div className='grid gap-12 sm:grid-flow-col sm:auto-cols-fr'>
          <Image
            src={logoFull}
            height={160}
            alt='Mocca Living footer logo'
          />
          <FooterColumn title={t('row-1.info-column.title')}>
            <FooterLink href='tel:+306973560007'>
              <Typography variant='small'>
                {t('row-1.info-column.tel-1')}
              </Typography>
            </FooterLink>
            <FooterLink href='tel:+306973433980'>
              <Typography variant='small'>
                {t('row-1.info-column.tel-2')}
              </Typography>
            </FooterLink>
            <FooterLink
              href='mailto:info@moccaliving.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Typography variant='small'>
                {t('row-1.info-column.email')}
              </Typography>
            </FooterLink>
            <Typography variant='small'>
              {t('row-1.info-column.location')}
            </Typography>
          </FooterColumn>
          <FooterColumn title={t('row-1.links-column.title')}>
            <FooterLink href='/privacy'>
              <Typography variant='small'>
                {t('row-1.links-column.privacy-policy')}
              </Typography>
            </FooterLink>
            <FooterLink href='/cookies'>
              <Typography variant='small'>
                {t('row-1.links-column.cookies-policy')}
              </Typography>
            </FooterLink>
            <FooterLink href='/rules'>
              <Typography variant='small'>
                {t('row-1.links-column.accomodation-policy')}
              </Typography>
            </FooterLink>
            <DialogAudioPlayer>
              <Typography variant='small'>
                {t('row-1.links-column.playlist')}
              </Typography>
            </DialogAudioPlayer>
          </FooterColumn>
          <FooterColumn title={t('row-1.more-column.title')}>
            <FooterLink
              href='https://www.yuppii.gr/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Typography variant='small'>
                {t('row-1.more-column.yuppii')}
              </Typography>
            </FooterLink>
            <FooterLink
              href='https://www.thechristmaslighthouse.gr/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Typography variant='small'>
                {t('row-1.more-column.christmas-lighthouse')}
              </Typography>
            </FooterLink>
            <FooterLink
              href='https://startpilates.gr/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Typography variant='small'>
                {t('row-1.more-column.start-pilates')}
              </Typography>
            </FooterLink>
          </FooterColumn>
          <FooterColumn>
            <div className='flex gap-2 sm:flex-col'>
              <div className='space-x-2'>
                <IconButton
                  aria-label='Visit our Facebook page (Opens in new tab)'
                  variant='outline'
                  asChild
                >
                  <a
                    href='https://www.facebook.com/profile.php?id=61566665200042'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <IconBrandFacebook />
                  </a>
                </IconButton>
                <IconButton
                  aria-label='Visit our Instagram page (Opens in new tab)'
                  variant='outline'
                  asChild
                >
                  <a
                    href='https://www.instagram.com/moccaliving.premiumstay'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <IconBrandInstagram />
                  </a>
                </IconButton>
              </div>
              <LocaleSwitcher scrollTop />
            </div>
          </FooterColumn>
        </div>

        <Separator />

        <div className='flex flex-col justify-between gap-3 sm:items-center sm:flex-row'>
          <Typography
            className='order-2 sm:order-1'
            variant='tiny'
          >
            {t('row-2.copyright', {created: new Date()})}
          </Typography>
          <LogosCarousel />
          <Typography
            className='order-3 sm:hidden'
            variant='tiny'
          >
            {t('row-2.constructor')}
          </Typography>
          <Typography
            className='order-4 sm:order-3'
            variant='tiny'
          >
            {t('row-2.developer')}
          </Typography>
        </div>
      </Container>
    </footer>
  )
}

function FooterColumn({
  title,
  children
}: React.PropsWithChildren & {title?: string}) {
  if (title) {
    return (
      <div className='w-fit space-y-2 sm:space-y-4'>
        <Typography
          variant='large'
          className='uppercase'
        >
          {title}
        </Typography>
        <div className='space-y-2'>{children}</div>
      </div>
    )
  }

  return <div className='w-fit space-y-2 sm:space-y-4'>{children}</div>
}

function FooterLink({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Link>) {
  return (
    <Link
      className={cn('hover:underline', className)}
      {...props}
    />
  )
}

Footer.displayName = 'Footer'
FooterColumn.displayName = 'FooterColumn'

export {Footer}
