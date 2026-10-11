import Image from 'next/image'
import moccaLogo from '@/public/logos/mocca-logo.svg'
import {Container} from '@/src/components/shared/container'
import {Typography} from '@/src/components/ui/typography'
import {Link} from '@/src/i18n/navigation'

function Header() {
  return (
    <header className='py-6 bg-surface-3'>
      <Container>
        <div className='flex flex-col items-center gap-2'>
          <Link href='/'>
            <Image
              width={64}
              src={moccaLogo}
              alt='Mocca living logo'
              loading='eager'
            />
          </Link>
          <Typography variant='tiny'>PREMIUM · STAY · PHILOSOPHY</Typography>
        </div>
      </Container>
    </header>
  )
}

export {Header}
