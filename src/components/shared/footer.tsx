import {
  BedSingleIcon,
  CookieIcon,
  FacebookIcon,
  FileTextIcon,
  InstagramIcon,
  MailIcon,
  MapPinHouseIcon,
  MusicIcon,
  PhoneIcon
} from 'lucide-react'
import Image from 'next/image'
import {useTranslations} from 'next-intl'
import logoFull from '@/public/logos/mocca-logo-box.svg'
import {Container} from '@/src/components/shared/container'
import {DialogAudioPlayer} from '@/src/components/shared/dialog-audio-player'
import {LocaleSwitcher} from '@/src/components/shared/locale-switcher'
import {LogosCarousel} from '@/src/components/shared/logos-carousel'
import {Button} from '@/src/components/ui/button'
import {Separator} from '@/src/components/ui/separator'
import {Typography} from '@/src/components/ui/typography'
import {Link} from '@/src/i18n/navigation'

function Footer() {
  const t = useTranslations('Components')

  return (
    <footer className='py-16 bg-surface-2'>
      <Container className='space-y-12'>
        <div className='grid gap-12 sm:grid-flow-col sm:auto-cols-fr'>
          <Image
            src={logoFull}
            height={160}
            alt='Mocca Living footer logo'
          />
          <FooterColumn title={t('Footer.row-1.info-column.title')}>
            {/*<Typography
              variant='link'
              asChild
            >
              <a
                className='flex gap-1.5'
                href='tel:+306973560007'
              >
                <PhoneIcon className='w-3.5 h-lh shrink-0' />
                <span>{t('Footer.row-1.info-column.tel-1')}</span>
              </a>
            </Typography>*/}
            <Typography
              variant='link'
              asChild
            >
              <a
                className='flex gap-1.5'
                href='tel:+306973433980'
              >
                <PhoneIcon className='w-3.5 h-lh shrink-0' />
                <span>{t('Footer.row-1.info-column.tel-2')}</span>
              </a>
            </Typography>
            <Typography
              variant='link'
              asChild
            >
              <a
                className='flex gap-1.5'
                href='mailto:info@moccaliving.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <MailIcon className='w-3.5 h-lh shrink-0' />
                <span>{t('Footer.row-1.info-column.email')}</span>
              </a>
            </Typography>
            <Typography
              variant='link'
              asChild
            >
              <a
                className='flex gap-1.5'
                href='https://maps.app.goo.gl/L6JEySni2t8jnb5m9'
                target='_blank'
                rel='noopener noreferrer'
              >
                <MapPinHouseIcon className='w-3.5 h-lh shrink-0' />
                <span>{t('Footer.row-1.info-column.location')}</span>
              </a>
            </Typography>
          </FooterColumn>
          <FooterColumn title={t('Footer.row-1.links-column.title')}>
            <Typography
              className='flex items-center gap-1.5'
              variant='link'
              asChild
            >
              <Link href='/privacy'>
                <FileTextIcon className='w-3.5 h-lh shrink-0' />
                <span>{t('Footer.row-1.links-column.privacy-policy')}</span>
              </Link>
            </Typography>
            <Typography
              className='flex items-center gap-1.5'
              variant='link'
              asChild
            >
              <Link href='/cookies'>
                <CookieIcon className='w-3.5 h-lh shrink-0' />
                <span>{t('Footer.row-1.links-column.cookies-policy')}</span>
              </Link>
            </Typography>
            <Typography
              className='flex items-center gap-1.5'
              variant='link'
              asChild
            >
              <Link href='/rules'>
                <BedSingleIcon className='w-3.5 h-lh shrink-0' />
                <span>
                  {t('Footer.row-1.links-column.accomodation-policy')}
                </span>
              </Link>
            </Typography>
            <DialogAudioPlayer>
              <Typography
                className='flex items-center gap-1.5'
                variant='link'
              >
                <MusicIcon className='w-3.5 h-lh shrink-0' />
                <span>{t('Footer.row-1.links-column.playlist')}</span>
              </Typography>
            </DialogAudioPlayer>
          </FooterColumn>
          <FooterColumn title={t('Footer.row-1.more-column.title')}>
            <Typography
              variant='link'
              asChild
            >
              <a
                href='https://www.yuppii.gr/'
                target='_blank'
                rel='noopener noreferrer'
              >
                {t('Footer.row-1.more-column.yuppii')}
              </a>
            </Typography>
            <Typography
              variant='link'
              asChild
            >
              <a
                href='https://www.thechristmaslighthouse.gr/'
                target='_blank'
                rel='noopener noreferrer'
              >
                {t('Footer.row-1.more-column.christmas-lighthouse')}
              </a>
            </Typography>
            <Typography
              variant='link'
              asChild
            >
              <a
                href='https://startpilates.gr/'
                target='_blank'
                rel='noopener noreferrer'
              >
                {t('Footer.row-1.more-column.start-pilates')}
              </a>
            </Typography>
          </FooterColumn>
          <FooterColumn>
            <div className='flex gap-2 sm:flex-col'>
              <div className='space-x-2'>
                <Button
                  variant='bordered-alt'
                  size='icon-normal'
                  asChild
                >
                  <a
                    aria-label='Visit our facebook page (Opens in new tab)'
                    href='https://www.facebook.com/profile.php?id=61566665200042'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FacebookIcon />
                  </a>
                </Button>
                <Button
                  variant='bordered-alt'
                  size='icon-normal'
                  asChild
                >
                  <a
                    aria-label='Visit our instagram page (Opens in new tab)'
                    href='https://www.instagram.com/moccaliving.premiumstay'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <InstagramIcon />
                  </a>
                </Button>
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
            {t('Footer.row-2.copyright', {created: new Date()})}
          </Typography>
          <LogosCarousel />
          <Typography
            className='order-3 sm:hidden'
            variant='mini'
          >
            {t.rich('Footer.row-2.constructor', {
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
            {t.rich('Footer.row-2.developer', {
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
  let renderedJsx: React.JSX.Element

  if (title) {
    renderedJsx = (
      <div className='w-fit space-y-2 sm:space-y-4'>
        <Typography className='font-semibold uppercase'>{title}</Typography>
        <div className='space-y-2'>{children}</div>
      </div>
    )
  } else {
    renderedJsx = <div className='w-fit space-y-2 sm:space-y-4'>{children}</div>
  }

  return renderedJsx
}

Footer.displayName = 'Footer'
FooterColumn.displayName = 'FooterColumn'

export {Footer}
