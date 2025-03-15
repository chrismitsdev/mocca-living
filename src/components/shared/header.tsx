import Image from 'next/image'
import {Link} from '@/src/i18n/navigation'
import {Container} from '@/src/components/shared/container'
import {Navigation} from '@/src/components/shared/navigation'
import logoSimple from '@/public/logos/mocca-logo-simple.svg'

const Header: React.FC = () => {
  return (
    <header className='py-2 relative overflow-x-clip bg-surface-2'>
      <Container>
        <div className='flex items-center justify-between'>
          <Link href='/'>
            <Image
              width={64}
              src={logoSimple}
              alt='Mocca Living logo'
              priority
            />
          </Link>

          <Navigation />
        </div>
      </Container>
    </header>
  )
}

Header.displayName = 'Header'

export {Header}
