import {AudioDialog} from '@/src/app/[locale]/(main)/(components)/audio-dialog'
import {ContactDrawer} from '@/src/app/[locale]/(main)/(components)/contact-drawer'
import {Footer} from '@/src/app/[locale]/(main)/(components)/footer'
import {Header} from '@/src/app/[locale]/(main)/(components)/header'

export default function MainLayout({children}: LayoutProps<'/[locale]'>) {
  return (
    <>
      <Header />
      <main className='bg-surface-1'>{children}</main>
      <Footer />
      <ContactDrawer />
      <AudioDialog />
    </>
  )
}
