import Image from 'next/image'
import {useTranslations, useLocale} from 'next-intl'
import {Link} from '@/navigation'
import {Container} from '@/components/shared/container'
import {LocaleSelect, LocaleSelectItem} from '@/components/shared/locale-switcher-select'
import {Typography} from '@/components/ui/typography'
import {Separator} from '@/components/ui/separator'
import {locales} from '#/lib/next-intl-config'
import logoBox from '#/public/logos/mocca-logo-box.svg'

function Footer() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <footer className='py-8 border-t-2'>
      <Container className='space-y-8'>
        <div className='flex items-start justify-between'>
          <Image 
            priority 
            src={logoBox} 
            width={160} 
            alt='Mocca Living footer logo' 
          />
          <div className='flex flex-col gap-1'>
            <Typography className='mb-2 uppercase' variant='large'>
              {t('Components.Footer.title-1')}
            </Typography>
            <Typography className='hover:underline' variant='small' asChild>
              <Link href='/privacy'>{t('Metadata.Pages.privacy')}</Link>
            </Typography>
            <Typography className='hover:underline' variant='small' asChild>
              <Link href='/cookies'>{t('Metadata.Pages.cookies')}</Link>
            </Typography>
          </div>
          <LocaleSelect 
            className='w-36'
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

Footer.displayName = 'Footer'

export {Footer}