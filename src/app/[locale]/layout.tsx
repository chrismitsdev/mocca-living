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
import {Messenger} from '@/components/shared/messenger'

const commissioner = Commissioner({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Mocca Living | Premium • Stay • Philosophy',
  description: '',
  formatDetection: {
    email: true,
    telephone: true
  }
}

export default function LocaleLayout({
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
        <Toaster
          position='top-right'
          duration={5000}
        />
        <Messenger />
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return locales.map((locale) => ({locale}))
}
