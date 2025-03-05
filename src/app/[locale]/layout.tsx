import '@/src/styles/index.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import type {Metadata} from 'next'
import {Commissioner} from 'next/font/google'
import {NextIntlClientProvider} from 'next-intl'
import {setRequestLocale, getMessages} from 'next-intl/server'
import {notFound} from 'next/navigation'
import {routing} from '@/src/i18n/routing'
import {Header} from '@/src/components/shared/header'
import {Footer} from '@/src/components/shared/footer'
import {CookieConsent} from '@/src/components/shared/cookie-consent'
import {ContactPopup} from '@/src/components/shared/contact-popup'
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

  if (!routing.locales.includes(locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = (await getMessages()) as IntlMessages

  return (
    <html
      lang={locale}
      className={`${commissioner.className}`}
    >
      <body className='min-h-screen grid grid-rows-[1fr_auto]'>
        <Header />
        <main>{children}</main>
        <Footer />
        <NextIntlClientProvider
          messages={{
            ...messages.Components.CookieConsent,
            ...messages.Components.ContactPopup
          }}
        >
          <CookieConsent />
          <ContactPopup />
        </NextIntlClientProvider>
        <Toaster position='top-right' />
      </body>
    </html>
  )
}
