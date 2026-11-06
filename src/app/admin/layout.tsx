import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {Shell} from '@/src/components/shared/shell'
import {GUEST_APP_HIDDEN} from '@/src/lib/constants'
import {Header} from './(components)/header'

// Root layout of the guest-app admin. It sits outside the [locale]
// segment because the page is Greek only; the i18n middleware skips /admin
// (src/proxy.ts). Hidden on the live site until go-live, never indexed

export const metadata: Metadata = {
  title: 'Πρόσβαση επισκεπτών | Mocca Living',
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

export default function AdminLayout({children}: LayoutProps<'/admin'>) {
  // Pages repeat this check since layouts and pages render in parallel
  if (GUEST_APP_HIDDEN) notFound()

  return (
    <Shell lang='el'>
      <Header />
      <main className='bg-surface-1'>{children}</main>
    </Shell>
  )
}
