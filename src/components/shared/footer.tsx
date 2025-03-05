import Image from 'next/image'
import {useLocale, useTranslations} from 'next-intl'
import {locales} from '@/src/i18n/routing'
import {Link} from '@/src/i18n/navigation'
import {Container} from '@/src/components/shared/container'
import {
  LocaleSelect,
  LocaleSelectItem
} from '@/src/components/shared/locale-select'
import {Separator} from '@/src/components/ui/separator'
import {Typography} from '@/src/components/ui/typography'
import {DialogAudioPlayer} from '@/src/components/shared/dialog-audio-player'
import logoFull from '@/public/logos/mocca-logo-full.svg'

const Footer: React.FC = () => {
  const t = useTranslations('Components')
  const locale = useLocale()

  return (
    <footer className='py-12 bg-surface-2 border-t border-t-surface-3'>
      <Container className='space-y-12'>
        <div className='space-y-10 sm:space-y-0 sm:flex sm:justify-between sm:items-start'>
          <Image
            src={logoFull}
            height={160}
            alt='Mocca Living footer logo'
          />
          <div className='w-fit space-y-2 sm:space-y-4'>
            <Typography className='font-semibold uppercase'>
              {t('Footer.row-1.column-1.header')}
            </Typography>
            <div className='space-y-1'>
              <Typography
                variant='link'
                asChild
              >
                <a
                  href='tel:+306936998859'
                  target='_blank'
                >
                  {t('Footer.row-1.column-1.link-1')}
                </a>
              </Typography>
              <Typography
                variant='link'
                asChild
              >
                <a
                  href='mailto:info@moccaliving.com'
                  target='_blank'
                  rel='noopener'
                >
                  {t('Footer.row-1.column-1.link-2')}
                </a>
              </Typography>
              <Typography
                variant='link'
                asChild
              >
                <a
                  href='https://maps.app.goo.gl/L6JEySni2t8jnb5m9'
                  target='_blank'
                >
                  {t.rich('Footer.row-1.column-1.link-3', {
                    br: () => <br />
                  })}
                </a>
              </Typography>
            </div>
          </div>
          <div className='w-fit space-y-2 sm:space-y-4'>
            <Typography className='font-semibold uppercase'>
              {t('Footer.row-1.column-2.header')}
            </Typography>
            <div className='space-y-1'>
              <Typography
                variant='link'
                asChild
              >
                <Link href='/privacy'>{t('Footer.row-1.column-2.link-1')}</Link>
              </Typography>
              <Typography
                variant='link'
                asChild
              >
                <Link href='/cookies'>{t('Footer.row-1.column-2.link-2')}</Link>
              </Typography>
              <DialogAudioPlayer>
                <Typography variant='link'>
                  {t('Footer.row-1.column-2.link-3')}
                </Typography>
              </DialogAudioPlayer>
            </div>
          </div>
          <div className='w-fit space-y-2 sm:space-y-4'>
            <Typography className='font-semibold uppercase'>
              {t('Footer.row-1.column-3.header')}
            </Typography>
            <div className='space-y-1'>
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
            </div>
          </div>
          <LocaleSelect
            className='min-w-40'
            defaultValue={locale}
            placeholder={t('LocaleSelect.placeholder')}
            loadingText={t('LocaleSelect.loadingText')}
          >
            {locales.map((localeEntry) => (
              <LocaleSelectItem
                key={localeEntry}
                value={localeEntry}
              >
                {t(`LocaleSelect.values.${localeEntry}`)}
              </LocaleSelectItem>
            ))}
          </LocaleSelect>
        </div>

        <Separator />

        <div className='flex flex-col justify-between gap-2 sm:flex-row'>
          <Typography variant='mini'>
            {t('Footer.row-2.copyright', {created: new Date()})}
          </Typography>
          <Typography variant='mini'>
            {t.rich('Footer.row-2.manufacturer', {
              a: (chunks) => (
                <a
                  className='hover:underline'
                  href='https://kyrcom.com/el/'
                  target='_blank'
                >
                  {chunks}
                </a>
              )
            })}
          </Typography>
          <Typography variant='mini'>{t('Footer.row-2.developer')}</Typography>
        </div>
      </Container>
    </footer>
  )
}

Footer.displayName = 'Footer'

export {Footer}
