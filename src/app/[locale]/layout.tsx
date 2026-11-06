import {Analytics} from '@vercel/analytics/next'
import type {Metadata} from 'next'
import {NextIntlClientProvider} from 'next-intl'
import {getLocale} from 'next-intl/server'
import {PageTransition} from '@/src/components/shared/page-transition'
import {Shell} from '@/src/components/shared/shell'
import {routing} from '@/src/i18n/routing'
import {IS_PRODUCTION, SITE_URL} from '@/src/lib/constants'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Mocca Living',
    default: 'Mocca Living'
  },
  description:
    'Luxury accommodations in Makri and Alexandroupoli. Experience refined stays by the sea or in the heart of the city with Mocca Living.',
  formatDetection: {
    email: true,
    telephone: true
  }
}

export default async function LocaleLayout({
  children
}: LayoutProps<'/[locale]'>) {
  const locale = await getLocale()

  return (
    <Shell lang={locale}>
      <NextIntlClientProvider>
        <PageTransition>{children}</PageTransition>
      </NextIntlClientProvider>
      {IS_PRODUCTION && <Analytics />}
    </Shell>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}
