import '@/globals.css'
import type {Metadata} from 'next'
import {unstable_setRequestLocale} from 'next-intl/server'
import {Open_Sans} from 'next/font/google'

const openSans = Open_Sans({
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

export default function LocaleLayout(
  {children, params: {locale}}: 
  {children: React.ReactNode, params: {locale: string}}
) {
  unstable_setRequestLocale(locale)
  
  return (
    <html lang={locale} className={openSans.className}>
      <body>{children}</body>
    </html>
  )
}
