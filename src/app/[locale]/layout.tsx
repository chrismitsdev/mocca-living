import '@/globals.css'
import type {Metadata} from 'next'
import {NextIntlClientProvider, useMessages} from 'next-intl'
import {Commissioner} from 'next/font/google'
import {unstable_setRequestLocale} from 'next-intl/server'
import {locales} from '#/lib/next-intl-config'
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
      className={`${commissioner.className} overscroll-y-none`}
    >
      <body className='min-h-svh grid grid-rows-[1fr,_auto]'>
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
