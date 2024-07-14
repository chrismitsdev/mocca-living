import Image from 'next/image'
import {Link} from '@/navigation'
import logo from '#/public/mocca-logo.svg'

export function Header() {
  return (
    <header>
      <div className='p-4 flex flex-col items-center gap-2'>
        <Link href='/'>
          <Image priority src={logo} width={120} alt='Mocca Living'/>
        </Link>
        <div className='flex items-center gap-2'>
          <Link href='/'>Home</Link>
          <Link href='/'>Suites</Link>
          <Link href='/'>Information</Link>
        </div>
      </div>
    </header>
  )
}

Header.displayName = 'Header'