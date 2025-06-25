import Image from 'next/image'
import {useTranslations} from 'next-intl'
import {
  PhoneIcon,
  MailIcon,
  MapPinHouseIcon,
  FileTextIcon,
  CookieIcon,
  BedSingleIcon,
  MusicIcon,
  FacebookIcon,
  InstagramIcon
} from 'lucide-react'
import {Container} from '@/src/components/shared/container'
import {ClientLink} from '@/src/components/shared/client-link'
import {LogosCarousel} from '@/src/components/shared/logos-carousel'
import {LocaleSwitcher} from '@/src/components/shared/locale-switcher'
import {DialogAudioPlayer} from '@/src/components/shared/dialog-audio-player'
import {Separator} from '@/src/components/ui/separator'
import {Typography} from '@/src/components/ui/typography'
import {Button} from '@/src/components/ui/button'
import logoFull from '@/public/logos/mocca-logo-full.svg'

const Footer: React.FC = () => {
  const t = useTranslations('Components')

  return (
    <footer className='py-16 bg-surface-2'>
      <Container className='space-y-12'>
        <div className='space-y-12 sm:space-y-0 sm:flex sm:justify-between sm:items-start'>
          <Image
            src={logoFull}
            height={160}
            alt='Mocca Living footer logo'
          />
          <FooterColumn title={t('Footer.row-1.column-1.header')}>
            <Typography
              variant='link'
              asChild
            >
              <a
                className='flex items-center gap-1.5'
                href='tel:+30697 3560007'
                target='_blank'
              >
                <PhoneIcon size={14} />
                <span>{t('Footer.row-1.column-1.link-1')}</span>
              </a>
            </Typography>
            <Typography
              variant='link'
              asChild
            >
              <a
                className='flex items-center gap-1.5'
                href='tel:+306973433980'
                target='_blank'
              >
                <PhoneIcon size={14} />
                <span>{t('Footer.row-1.column-1.link-2')}</span>
              </a>
            </Typography>
            <Typography
              variant='link'
              asChild
            >
              <a
                className='flex items-center gap-1.5'
                href='mailto:info@moccaliving.com'
                target='_blank'
                rel='noopener'
              >
                <MailIcon size={14} />
                <span>{t('Footer.row-1.column-1.link-3')}</span>
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
              >
                <MapPinHouseIcon
                  className='mt-1'
                  size={14}
                />
                <span>
                  {t.rich('Footer.row-1.column-1.link-4', {
                    br: () => <br />
                  })}
                </span>
              </a>
            </Typography>
          </FooterColumn>
          <FooterColumn title={t('Footer.row-1.column-2.header')}>
            <Typography
              className='flex items-center gap-1.5'
              variant='link'
              asChild
            >
              <ClientLink href='/privacy'>
                <FileTextIcon size={14} />
                <span>{t('Footer.row-1.column-2.link-1')}</span>
              </ClientLink>
            </Typography>
            <Typography
              className='flex items-center gap-1.5'
              variant='link'
              asChild
            >
              <ClientLink href='/cookies'>
                <CookieIcon size={14} />
                <span>{t('Footer.row-1.column-2.link-2')}</span>
              </ClientLink>
            </Typography>
            <Typography
              className='flex items-center gap-1.5'
              variant='link'
              asChild
            >
              <ClientLink href='/rules'>
                <BedSingleIcon size={14} />
                <span>{t('Footer.row-1.column-2.link-3')}</span>
              </ClientLink>
            </Typography>
            <DialogAudioPlayer>
              <Typography
                className='flex items-center gap-1.5'
                variant='link'
              >
                <MusicIcon size={14} />
                <span>{t('Footer.row-1.column-2.link-4')}</span>
              </Typography>
            </DialogAudioPlayer>
          </FooterColumn>
          <FooterColumn title={t('Footer.row-1.column-3.header')}>
            <Typography
              variant='link'
              asChild
            >
              <a
                href='https://yuppii.gr/'
                target='_blank'
              >
                {t('Footer.row-1.column-3.link-1')}
              </a>
            </Typography>
            <Typography
              variant='link'
              asChild
            >
              <a
                href='https://startpilates.gr/'
                target='_blank'
              >
                {t('Footer.row-1.column-3.link-2')}
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
                    target='_blank'
                    href='https://www.facebook.com/profile.php?id=61566665200042'
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
                    target='_blank'
                    href='https://www.instagram.com/moccaliving.premiumstay'
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
            {t.rich('Footer.row-2.manufacturer', {
              a: (chunks) => (
                <a
                  className='underline'
                  href='https://kyrcom.com/el/'
                  target='_blank'
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

const FooterColumn: React.FC<React.PropsWithChildren & {title?: string}> = ({
  title,
  children
}) => {
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

export {Footer}
