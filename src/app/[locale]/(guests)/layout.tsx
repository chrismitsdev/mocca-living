import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {IS_PRODUCTION} from '@/src/lib/constants'
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
  // Guest app is a work in progress, keep it unreachable in production.
  // Pages repeat this check since layouts and pages render in parallel.
  if (IS_PRODUCTION) notFound()

  return (
    <>
      <Header />
      <main className='bg-surface-1'>{children}</main>
    </>
  )
}
