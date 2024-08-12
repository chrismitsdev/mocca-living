import Image from 'next/image'
import {useTranslations} from 'next-intl'
import {Link} from '@/navigation'
import {Container} from '@/components/shared/container'
import {HeaderNavigation} from '@/components/shared/header-navigation'
import logo from '#/public/logos/mocca-logo-simple.svg'

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
    label: t(label),
    href
  }))

  return (
    <header className='py-8'>
      <Container>
        <div className='flex flex-col gap-4 items-center'>
          <Link href='/'>
            <Image
              priority
              src={logo}
              style={{width: 'auto', height: 100}}
              alt='Mocca Living header logo'
            />
          </Link>

          <HeaderNavigation links={tLinks} />
        </div>
      </Container>
    </header>
  )
}

Header.displayName = 'Header'

export {Header}
