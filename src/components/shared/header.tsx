import Image from 'next/image'
import {Link} from '@/navigation'
import {Container} from '@/components/shared/container'
import logo from '#/public/mocca-logo-simple.svg'

export function Header() {
  return (
    <header>
      <Container className='py-4'>
        <div className='flex items-center justify-between'>
          <Link href='/'>
            <Image priority src={logo} width={41.45} alt='Mocca Living'/>
          </Link>
          <div className='flex items-center gap-2'>
            <Link href='/'>Home</Link>
            <Link href='/suites'>Suites</Link>
            <Link href='/contact'>Contact</Link>
          </div>
        </div>
      </Container>
    </header>
  )
}

Header.displayName = 'Header'