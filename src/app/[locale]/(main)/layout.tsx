import {Toaster} from 'sonner'
import {ContactDrawer} from '@/src/components/shared/contact-drawer'
import {DialogAudioPlayer} from '@/src/components/shared/dialog-audio-player'
import {Footer} from '@/src/components/shared/footer'
import {Header} from '@/src/components/shared/header'
import {PageTransition} from '@/src/components/shared/page-transition'

export default function WebsiteLayout({children}: LayoutProps<'/[locale]'>) {
  return (
    <>
      <Header />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <ContactDrawer />
      <DialogAudioPlayer />
      <Toaster
        position='top-center'
        mobileOffset={12}
      />
    </>
  )
}
