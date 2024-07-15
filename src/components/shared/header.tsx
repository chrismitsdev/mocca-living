import Image from 'next/image'
import {Link} from '@/navigation'
import {Container} from '@/components/shared/container'
import logo from '#/public/mocca-logo-simple.svg'
import {buttonVariants} from '@/components/ui/button'

function Header() {
  return (
    <header className='py-4'>
      <Container>
        <div className='flex flex-col items-center gap-4'>
          <Link href='/'>
            <Image priority src={logo} width={41} alt='Mocca Living'/>
          </Link>
          <div className='flex items-center gap-4'>
            <Link className={buttonVariants({variant: 'link', size: 'small'})} href='/'>Home</Link>
            <Link className={buttonVariants({variant: 'link', size: 'small'})} href='/suites'>Suites</Link>
            <Link className={buttonVariants({variant: 'link', size: 'small'})} href='/contact'>Contact</Link>
          </div>
        </div>
      </Container>
    </header>
  )
}

Header.displayName = 'Header'

export {Header}