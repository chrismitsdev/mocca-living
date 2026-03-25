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

function Footer() {
  const t = useTranslations('Components.Footer')

  return (
    <footer className='py-16 bg-surface-2'>
      <Container className='space-y-12'>
        <div className='grid gap-12 sm:grid-flow-col sm:auto-cols-fr'>
          <Image
            src={logoFull}
            height={160}
            alt='Mocca Living footer logo'
          />
          <FooterColumn title={t('row-1.info-column.title')}>
            <Link href='tel:+306973560007'>
              <Typography variant='small'>
                {t('row-1.info-column.tel-1')}
              </Typography>
            </Link>
            <Link href='tel:+306973433980'>
              <Typography variant='small'>
                {t('row-1.info-column.tel-2')}
              </Typography>
            </Link>
            <Link
              href='mailto:info@moccaliving.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Typography variant='small'>
                {t('row-1.info-column.email')}
              </Typography>
            </Link>
            <Link
              href='https://maps.app.goo.gl/L6JEySni2t8jnb5m9'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Typography variant='small'>
                {t('row-1.info-column.location')}
              </Typography>
            </Link>
          </FooterColumn>
          <FooterColumn title={t('row-1.links-column.title')}>
            <Link href='/privacy'>
              <Typography variant='small'>
                {t('row-1.links-column.privacy-policy')}
              </Typography>
            </Link>
            <Link href='/cookies'>
              <Typography variant='small'>
                {t('row-1.links-column.cookies-policy')}
              </Typography>
            </Link>
            <Link href='/rules'>
              <Typography variant='small'>
                {t('row-1.links-column.accomodation-policy')}
              </Typography>
            </Link>
            <DialogAudioPlayer>
              <Typography variant='small'>
                {t('row-1.links-column.playlist')}
              </Typography>
            </DialogAudioPlayer>
          </FooterColumn>
          <FooterColumn title={t('row-1.more-column.title')}>
            <Link
              href='https://www.yuppii.gr/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Typography variant='small'>
                {t('row-1.more-column.yuppii')}
              </Typography>
            </Link>
            <Link
              href='https://www.thechristmaslighthouse.gr/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Typography variant='small'>
                {t('row-1.more-column.christmas-lighthouse')}
              </Typography>
            </Link>
            <Link
              href='https://startpilates.gr/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Typography variant='small'>
                {t('row-1.more-column.start-pilates')}
              </Typography>
            </Link>
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
            variant='mini'
          >
            {t('row-2.copyright', {created: new Date()})}
          </Typography>
          <LogosCarousel />
          <Typography
            className='order-3 sm:hidden'
            variant='mini'
          >
            {t.rich('row-2.constructor', {
              a: (chunks) => (
                <a
                  className='underline'
                  href='https://kyrcom.com/el/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {chunks}
                </a>
              )
            })}
          </Typography>
          <Typography
            className='order-4 sm:order-3'
            variant='mini'
          >
            {t.rich('row-2.developer', {
              a: (chunks) => (
                <a
                  className='underline'
                  href='https://www.facebook.com/Christos.Mitsiaris/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {chunks}
                </a>
              )
            })}
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
        <Typography variant='large'>{title}</Typography>
        <div className='space-y-2'>{children}</div>
      </div>
    )
  }

  return <div className='w-fit space-y-2 sm:space-y-4'>{children}</div>
}

Footer.displayName = 'Footer'
FooterColumn.displayName = 'FooterColumn'

export {Footer}
