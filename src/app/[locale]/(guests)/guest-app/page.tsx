import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {getTranslations} from 'next-intl/server'
import {IS_PRODUCTION} from '@/src/lib/constants'
import {Heading} from './(components)/heading'
import {HeroSelector} from './(components)/hero-selector'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')

  return {
    title: t('guest-app.index')
  }
}

export default function GuestAppPage() {
  // Guest app is a work in progress, keep it unreachable in production
  if (IS_PRODUCTION) notFound()

  return (
    <>
      <Heading />
      <HeroSelector />
    </>
  )
}
