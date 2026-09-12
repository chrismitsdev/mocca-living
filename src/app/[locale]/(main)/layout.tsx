import {Toaster} from 'sonner'
import {ContactDrawer} from '@/src/components/shared/contact-drawer'
import {DialogAudioPlayer} from '@/src/components/shared/dialog-audio-player'
import {Footer} from '@/src/components/shared/footer'
import {Header} from '@/src/components/shared/header'

export default function WebsiteLayout({children}: LayoutProps<'/[locale]'>) {
  return (
    <>
      <Header />
      <main>{children}</main>
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
