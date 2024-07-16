import Image from 'next/image'
import {useTranslations, useLocale} from 'next-intl'
import {Link} from '@/navigation'
import {Container} from '@/components/shared/container'
import {buttonVariants} from '@/components/ui/button'
import {LocaleSwitcherSelect, LocaleSwitcherSelectItem} from '@/components/shared/locale-switcher-select'
import logo from '#/public/mocca-logo-simple.svg'
import {locales} from '#/lib/next-intl-config'

type HeaderLink = {
  label: keyof IntlMessages['Metadata']['Pages']
  href: string
}

const links: HeaderLink[] = [
  {label: 'home', href: '/'},
  {label: 'suites', href: '/suites'},
  {label: 'contact', href: '/contact'}
]

function Header() {
  const t = useTranslations()
  const defaultLocale = useLocale()

  return (
    <header className='py-4'>
      <Container>
        <div className='flex flex-col items-center gap-4'>
          <Link href='/'>
            <Image priority src={logo} width={41} alt='Mocca Living'/>
          </Link>
          <div className='flex items-center gap-4'>
            {links.map(link => (
              <Link
                key={link.href} 
                className={buttonVariants({variant: 'link', size: 'small'})} 
                href={link.href}
              >
                {t(`Metadata.Pages.${link.label}`)}
              </Link>
            ))}
          </div>
          <LocaleSwitcherSelect 
            defaultLocale={defaultLocale}
            placeholder={t('Components.LocaleSwitcherSelect.placeholder')}
          >
            {locales.map(locale => (
              <LocaleSwitcherSelectItem key={locale} value={locale}>
                {t(`Components.LocaleSwitcherSelect.values.${locale}`)}
              </LocaleSwitcherSelectItem>
            ))}
          </LocaleSwitcherSelect>
        </div>
      </Container>
    </header>
  )
}

Header.displayName = 'Header'

export {Header}