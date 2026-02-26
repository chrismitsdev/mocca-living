import '@/src/styles/index.css'
import {Analytics} from '@vercel/analytics/next'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {notFound} from 'next/navigation'
import {hasLocale, NextIntlClientProvider} from 'next-intl'
import {setRequestLocale} from 'next-intl/server'
import * as React from 'react'
import {Toaster} from 'sonner'
import {ContactDrawer} from '@/src/components/shared/contact-drawer'
import {CookieConsent} from '@/src/components/shared/cookie-consent'
import {Footer} from '@/src/components/shared/footer'
import {Header} from '@/src/components/shared/header'
import {ColumnsTransition} from '@/src/components/shared/route-transitions'
import {routing} from '@/src/i18n/routing'

const inter = Inter({
  subsets: ['latin', 'latin-ext', 'greek', 'cyrillic'],
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://moccaliving.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'el-GR': '/el',
      'tr-TR': '/tr',
      'bg-BG': '/bg'
    }
  },
  title: 'Mocca Living | Premium • Stay • Philosophy',
  description:
    'Luxury villas Georgia & Dimitra for seaside escapes at Mocca Living.',
  formatDetection: {
    email: true,
    telephone: true
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

export default function LocaleLayout({
  params,
  children
}: LayoutProps<'/[locale]'>) {
  const {locale} = React.use(params as Params['params'])

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      className={`${inter.className}`}
    >
      <body className='min-h-screen grid grid-rows-[auto_1fr] relative bg-surface-1 text-foreground'>
        <NextIntlClientProvider>
          <Header />
          <main>
            <ColumnsTransition>{children}</ColumnsTransition>
          </main>
          <Footer />
          <ContactDrawer />
          <CookieConsent />
          <Toaster
            position='top-center'
            mobileOffset={12}
          />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
