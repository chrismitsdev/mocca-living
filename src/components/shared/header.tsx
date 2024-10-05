import {NextIntlClientProvider, useTranslations, useMessages} from 'next-intl'
import {HeaderNavigation} from '@/components/shared/header-navigation'

type HeaderLink = {
  label: keyof Pick<
    IntlMessages['Metadata']['Pages'],
    'home' | 'accomodation' | 'contact'
  >
  href: string
}

const links: HeaderLink[] = [
  {label: 'home', href: '/'},
  {label: 'accomodation', href: '/accomodation'},
  {label: 'contact', href: '/contact'}
]

const tLinks = function (t: ReturnType<typeof useTranslations>): HeaderLink[] {
  return links.map(({label, href}) => ({
    label: t(
      label === 'accomodation' ? 'accomodation.root' : label
    ) as HeaderLink['label'],
    href
  }))
}

function Header() {
  const links = tLinks(useTranslations('Metadata.Pages'))
  const messages = useMessages() as IntlMessages

  return (
    <NextIntlClientProvider messages={messages.Components.LocaleSelect}>
      <HeaderNavigation links={links} />
    </NextIntlClientProvider>
  )

  // return <HeaderNavigation links={links} />
}

Header.displayName = 'Header'

export {Header}
