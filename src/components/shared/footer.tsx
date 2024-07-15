import Image from 'next/image'
import {Container} from '@/components/shared/container'
import logoFull from '#/public/mocca-logo-full.svg'

function Footer() {
  return (
    <footer className='py-8'>
      <Container>
        <Image priority src={logoFull} height={120} alt='Mocca Living full logo' />
      </Container>
    </footer>
  )
}

Footer.displayName = 'Footer'

export {Footer}