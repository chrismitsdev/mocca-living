import Image from 'next/image'
import moccaLogo from '@/public/logos/mocca-logo.svg'
import {Container} from '@/src/components/shared/container'
import {Navigation} from '@/src/components/shared/navigation'
import {Link} from '@/src/i18n/navigation'

function Header() {
  return (
    <header className='py-2 bg-surface-3'>
      <Container>
        <div className='flex items-center justify-between'>
          <Link href='/'>
            <Image
              width={64}
              src={moccaLogo}
              alt='Mocca Living logo'
              loading='eager'
            />
          </Link>
          <Navigation />
        </div>
      </Container>
    </header>
  )
}

export {Header}
