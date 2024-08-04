import '@/globals.css'
import type {Metadata} from 'next'
import {useTranslations} from 'next-intl'
import {Commissioner} from 'next/font/google'
import {unstable_setRequestLocale} from 'next-intl/server'
import {locales} from '#/lib/next-intl-config' 
import {Header} from '@/components/shared/header'
import {Footer} from '@/components/shared/footer'
import {CookieConsent} from '@/components/shared/cookie-consent'
import {Toaster} from '@/components/ui/toast'

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

export function generateStaticParams() {
  return locales.map((locale) => ({locale}))
}

export default function LocaleLayout(
  {children, params: {locale}}: 
  {children: React.ReactNode, params: {locale: string}}
) {
  unstable_setRequestLocale(locale)
  const t = useTranslations('Components.CookieConsent')
  
  return (
    <html lang={locale} className={commissioner.className}>
      <body className='sm:h-screen sm:grid sm:grid-rows-[auto,1fr,auto]'>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsent 
          title={t('title')}
          message={t('message')}
          acceptLabel={t('accept-label')}
          rejectLabel={t('reject-label')}
        />
        <Toaster position='top-right' duration={5000} />
      </body>
    </html>
  )
}
