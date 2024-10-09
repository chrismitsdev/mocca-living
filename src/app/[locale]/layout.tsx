import '@/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import type {Metadata} from 'next'
import {unstable_setRequestLocale} from 'next-intl/server'
import {useMessages, NextIntlClientProvider} from 'next-intl'
import {locales} from '@/i18n/routing'
import {Commissioner} from 'next/font/google'
import {Header} from '@/components/shared/header'
import {Footer} from '@/components/shared/footer'
import {CookieConsent} from '@/components/shared/cookie-consent'
import {Toaster} from '@/components/ui/toast'
import {ExpandablePopup} from '@/components/motion/expandable-popup'
import {MessagePopover} from '@/components/motion/message-popover'
// import {Messenger} from '@/components/shared/messenger'

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
  return locales.map((locale) => ({locale}))
}

export default function RootLayout({
  params: {locale},
  children
}: React.PropsWithChildren<Params>) {
  unstable_setRequestLocale(locale)
  const messages = useMessages() as IntlMessages

  return (
    <html
      lang={locale}
      className={`${commissioner.className}`}
    >
      <body className='min-h-screen grid grid-rows-[1fr,_auto]'>
        <Header />
        <main>{children}</main>
        <Footer />
        <NextIntlClientProvider messages={messages.Components.CookieConsent}>
          <CookieConsent />
        </NextIntlClientProvider>
        <Toaster position='top-right' />
        <ExpandablePopup />
        {/* <MessagePopover /> */}
        {/* <Messenger /> */}
      </body>
    </html>
  )
}
