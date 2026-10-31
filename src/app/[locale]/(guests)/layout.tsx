import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {Toaster} from 'sonner'
import {GUEST_APP_HIDDEN} from '@/src/lib/constants'
import {Header} from './(components)/header'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true
    }
  }
}

export default function GuestsLayout({children}: LayoutProps<'/[locale]'>) {
  // Pages repeat this check since layouts and pages render in parallel
  if (GUEST_APP_HIDDEN) notFound()

  return (
    <>
      <Header />
      <main className='bg-surface-1'>{children}</main>
      <Toaster
        position='top-center'
        mobileOffset={12}
      />
    </>
  )
}
