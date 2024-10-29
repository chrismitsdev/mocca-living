import '@/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import type {Metadata} from 'next'
import {Commissioner} from 'next/font/google'
import {notFound} from 'next/navigation'
import {setRequestLocale, getMessages} from 'next-intl/server'
import {NextIntlClientProvider} from 'next-intl'
import {routing} from '@/i18n/routing'
import {Header} from '@/components/shared/header'
import {Footer} from '@/components/shared/footer'
import {CookieConsent} from '@/components/shared/cookie-consent'
import {ContactPopup} from '@/components/motion/contact-popup'
import {Toaster} from '@/components/ui/toast'

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
  params: {locale},
  children
}: React.PropsWithChildren<Params>) {
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
      <body className='min-h-screen grid grid-rows-[1fr,_auto]'>
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
