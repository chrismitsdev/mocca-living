import {Toaster} from 'sonner'
import {AudioPlayerDialog} from '@/src/components/shared/audio-player-dialog'
import {ContactDrawer} from '@/src/components/shared/contact-drawer'
import {Footer} from '@/src/components/shared/footer'
import {Header} from '@/src/components/shared/header'

export default function MainLayout({children}: React.PropsWithChildren) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <ContactDrawer />
      <AudioPlayerDialog />
      <Toaster
        position='top-center'
        mobileOffset={12}
      />
    </>
  )
}
