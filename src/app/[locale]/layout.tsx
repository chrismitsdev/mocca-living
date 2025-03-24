import '@/src/styles/index.css'
import type {Metadata} from 'next'
import {Commissioner} from 'next/font/google'
import {NextIntlClientProvider, hasLocale} from 'next-intl'
import {setRequestLocale} from 'next-intl/server'
import {SpeedInsights} from '@vercel/speed-insights/next'
import {notFound} from 'next/navigation'
import {Toaster} from 'sonner'
import {routing} from '@/src/i18n/routing'
import {Header} from '@/src/components/shared/header'
import {ColumnsTransition} from '@/src/components/shared/route-transitions'
import {Footer} from '@/src/components/shared/footer'
import {ContactDrawer} from '@/src/components/shared/contact-drawer'
import {CookieConsent} from '@/src/components/shared/cookie-consent'

const commissioner = Commissioner({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://moccaliving.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'el-GR': '/gr'
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

export default async function LocaleLayout({
  params,
  children
}: React.PropsWithChildren<Params>) {
  const {locale} = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      className={`${commissioner.className}`}
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
        <SpeedInsights />
      </body>
    </html>
  )
}
