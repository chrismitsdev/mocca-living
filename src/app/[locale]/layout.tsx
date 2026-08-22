import '@/src/styles/index.css'
import {Analytics} from '@vercel/analytics/next'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {NextIntlClientProvider} from 'next-intl'
import {getLocale} from 'next-intl/server'
import {CookieBanner} from '@/src/components/shared/cookie-banner'
import {routing} from '@/src/i18n/routing'

const inter = Inter({
  subsets: ['latin', 'latin-ext', 'greek', 'cyrillic'],
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://moccaliving.com'),
  title: {
    template: '%s | Mocca Living',
    default: 'Mocca Living'
  },
  description:
    'Luxury accommodations in Makri and Alexandroupolis. Experience refined stays by the sea or in the heart of the city with Mocca Living.',
  formatDetection: {
    email: true,
    telephone: true
  }
}

export default async function RootLayout({children}: LayoutProps<'/[locale]'>) {
  const locale = await getLocale()

  return (
    <html
      lang={locale}
      className={inter.className}
    >
      <body className='bg-surface-1 text-foreground'>
        <NextIntlClientProvider>
          {children}
          <CookieBanner />
        </NextIntlClientProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}
