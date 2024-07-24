import Image from 'next/image'
import {useTranslations, useLocale} from 'next-intl'
import {Link} from '@/navigation'
import {Container} from '@/components/shared/container'
import {LocaleSelect, LocaleSelectItem} from '@/components/shared/locale-switcher-select'
import {Typography} from '@/components/ui/typography'
import {Separator} from '@/components/ui/separator'
import {locales} from '#/lib/next-intl-config'
import logoFull from '#/public/logos/mocca-logo-full.svg'

function Footer() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <footer className='py-12 border-t-2'>
      <Container className='space-y-10'>
        <div className='space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-start'>
          <Image 
            priority 
            src={logoFull} 
            height={160} 
            alt='Mocca Living footer logo' 
          />
          <FooterColumn title={t('Components.Footer.first-column.title')}>
            <Typography className='hover:underline' variant='small' asChild>
              <Link href='/privacy'>{t('Components.Footer.first-column.first-link')}</Link>
            </Typography>
            <Typography className='hover:underline' variant='small' asChild>
              <Link href='/cookies'>{t('Components.Footer.first-column.second-link')}</Link>
            </Typography>
          </FooterColumn>
          <FooterColumn title={t('Components.Footer.second-column.title')}>
            <Typography className='hover:underline' variant='small' asChild>
              <a href='https://maps.app.goo.gl/41UMZ9aS2DT1SDD88' target='_blank'>
                {t('Components.Footer.second-column.first-link')}
              </a>
            </Typography>
            <Typography className='hover:underline' variant='small' asChild>
              <a href='tel:+306973433980'>
                {t('Components.Footer.second-column.second-link')}
              </a>
            </Typography>
          </FooterColumn>
          <LocaleSelect 
            className='w-full sm:w-36 justify-self-end'
            defaultValue={locale}
            placeholder={t('Components.LocaleSelect.placeholder')}
            loadingText={t('Components.LocaleSelect.loadingText')}
          >
            {locales.map(locale => (
              <LocaleSelectItem key={locale} value={locale}>
                {t(`Components.LocaleSelect.values.${locale}`)}
              </LocaleSelectItem>
            ))}
          </LocaleSelect>
        </div>
        <Separator />
        <div className='flex justify-between'>
          <Typography variant='mini'>
            {`Copyright © ${new Date().getFullYear()} Mocca Living`}
          </Typography>
          <Typography variant='mini'>
            {'Designed & Developed by CM'}
          </Typography>
        </div>
      </Container>
    </footer>
  )
}

function FooterColumn({title, children}: React.PropsWithChildren<{title: string}>) {
  return (
    <div>
      <Typography className='mb-2 uppercase font-semibold' >
        {title}
      </Typography>
      {children}
    </div>
  )
}

Footer.displayName = 'Footer'
FooterColumn.displayName = 'FooterColumn'

export {Footer}