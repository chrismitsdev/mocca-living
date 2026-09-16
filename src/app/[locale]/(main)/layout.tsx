import {Toaster} from 'sonner'
import {AudioPlayerDialog} from '@/src/components/shared/audio-player-dialog'
import {ContactDrawer} from '@/src/components/shared/contact-drawer'
import {Footer} from '@/src/components/shared/footer'
import {PageTransition} from '@/src/components/shared/page-transition'

export default function MainLayout({children}: LayoutProps<'/[locale]'>) {
  return (
    <>
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
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
