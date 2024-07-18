import Image from 'next/image'
import {useTranslations} from 'next-intl'
import {Link} from '@/navigation'
import {Container} from '@/components/shared/container'
import {buttonVariants} from '@/components/ui/button'
import logo from '#/public/logos/mocca-logo-simple.svg'

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
  const t = useTranslations('Metadata.Pages')

  return (
    <header className='py-8'>
      <Container>
        <div className='flex flex-col items-center gap-4'>
          <Link href='/'>
            <Image 
              priority 
              src={logo} 
              style={{width: 41.44}}
              alt='Mocca Living header logo'
            />
          </Link>
          <div className='flex items-center gap-4'>
            {links.map(link => (
              <Link
                key={link.href} 
                className={buttonVariants({variant: 'link', size: 'small'})} 
                href={link.href}
              >
                {t(link.label)}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </header>
  )
}

Header.displayName = 'Header'

export {Header}