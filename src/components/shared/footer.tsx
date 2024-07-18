import Image from 'next/image'
import {useTranslations, useLocale} from 'next-intl'
import {Container} from '@/components/shared/container'
import {LocaleSwitcherSelect, LocaleSwitcherSelectItem} from '@/components/shared/locale-switcher-select'
import {locales} from '#/lib/next-intl-config'
import logoFullWhite from '#/public/logos/mocca-logo-full-white.svg'

function Footer() {
  const t = useTranslations('Components.LocaleSwitcherSelect')
  const locale = useLocale()

  return (
    <footer className='py-8 bg-primary text-primary-foreground'>
      <Container>
        <div className='flex items-start justify-between'>
          <Image 
            priority 
            src={logoFullWhite} 
            width={160} 
            alt='Mocca Living footer logo' 
          />
          <LocaleSwitcherSelect 
            className='max-w-32'
            defaultValue={locale}
            placeholder={t('placeholder')}
          >
            {locales.map(locale => (
              <LocaleSwitcherSelectItem key={locale} value={locale}>
                {t(`values.${locale}`)}
              </LocaleSwitcherSelectItem>
            ))}
          </LocaleSwitcherSelect>
        </div>
      </Container>
    </footer>
  )
}

Footer.displayName = 'Footer'

export {Footer}