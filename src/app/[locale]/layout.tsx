import '@/src/styles/index.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import type {Metadata} from 'next'
import {Commissioner} from 'next/font/google'
import {NextIntlClientProvider} from 'next-intl'
import {getMessages, setRequestLocale} from 'next-intl/server'
import {notFound} from 'next/navigation'
import {routing} from '@/src/i18n/routing'
import {Header} from '@/src/components/shared/header'
import {RouteTransition} from '@/src/components/shared/route-transition'
import {Footer} from '@/src/components/shared/footer'
import {ContactDrawer} from '@/src/components/shared/contact-drawer'
import {CookieConsent} from '@/src/components/shared/cookie-consent'
import {Toaster} from '@/src/components/ui/toast'

const commissioner = Commissioner({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mocca-living.gr'),
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
  const messages = (await getMessages()) as IntlMessages

  if (!routing.locales.includes(locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      className={`${commissioner.className}`}
    >
      <body className='min-h-screen grid grid-rows-[1fr_auto]'>
        <Header />
        <main>
          <RouteTransition>{children}</RouteTransition>
        </main>
        <Footer />
        <ContactDrawer />
        <NextIntlClientProvider messages={messages.Components.CookieConsent}>
          <CookieConsent />
        </NextIntlClientProvider>
        <Toaster position='top-right' />
      </body>
    </html>
  )
}
