import '@/src/styles/index.css'
import {Analytics} from '@vercel/analytics/next'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {notFound} from 'next/navigation'
import {hasLocale, NextIntlClientProvider} from 'next-intl'
import {setRequestLocale} from 'next-intl/server'
import {Toaster} from 'sonner'
import {ColumnsTransition} from '@/src/components/shared/columns-transition'
import {ContactDrawer} from '@/src/components/shared/contact-drawer'
import {CookieBanner} from '@/src/components/shared/cookie-banner'
import {Footer} from '@/src/components/shared/footer'
import {Header} from '@/src/components/shared/header'
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
  title: {
    template: '%s | Mocca Living',
    default: 'Mocca Living'
  },
  description:
    'Luxury villas Georgia & Dimitra for seaside escapes at Mocca Living.',
  formatDetection: {
    email: true,
    telephone: true
  }
}

export default async function LocaleLayout({
  params,
  children
}: LayoutProps<'/[locale]'>) {
  const {locale} = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      className={`${inter.className}`}
    >
      <body className='bg-surface-1 text-foreground'>
        <NextIntlClientProvider>
          <Header />
          <main>
            <ColumnsTransition>{children}</ColumnsTransition>
          </main>
          <Footer />
          <ContactDrawer />
          <CookieBanner />
          <Toaster
            position='top-center'
            mobileOffset={12}
          />
        </NextIntlClientProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => {
    return {
      locale
    }
  })
}
