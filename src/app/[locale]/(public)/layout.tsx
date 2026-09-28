import {Toaster} from 'sonner'
import {AudioDialog} from '@/src/components/shared/audio-player-dialog'
import {ContactDrawer} from '@/src/components/shared/contact-drawer'
import {Footer} from '@/src/components/shared/footer'
import {Header} from '@/src/components/shared/header'

export default function MainLayout({children}: LayoutProps<'/[locale]'>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <ContactDrawer />
      <AudioDialog />
      <Toaster
        position='top-center'
        mobileOffset={12}
      />
    </>
  )
}
