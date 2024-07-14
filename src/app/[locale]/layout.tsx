import '@/globals.css'
import type {Metadata} from 'next'
import {Open_Sans} from 'next/font/google'
import {unstable_setRequestLocale} from 'next-intl/server'
import {Header} from '@/components/shared/header'
import {Footer} from '@/components/shared/footer'
import {Container} from '@/components/shared/container'

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
      <body className='h-screen grid grid-rows-[auto,1fr,auto]'>
        <Header />
        <main>
          <Container>{children}</Container>
        </main>
        <Footer />
      </body>
    </html>
  )
}
