import {useTranslations} from 'next-intl'
import {HeaderNavigation} from '@/components/shared/header-navigation'

type HeaderLink = {
  label: keyof IntlMessages['Metadata']['Pages']
  href: string
}

const links: HeaderLink[] = [
  {label: 'home', href: '/'},
  {label: 'accomodation', href: '/accomodation'},
  {label: 'contact', href: '/contact'}
]

function Header() {
  const t = useTranslations('Metadata.Pages')
  const tLinks = links.map(({label, href}) => ({
    label: t(label === 'accomodation' ? 'accomodation.root' : label),
    href
  }))

  return <HeaderNavigation links={tLinks} />
}

Header.displayName = 'Header'

export {Header}
