import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {Heading} from './(components)/heading'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')

  return {
    title: t('guest-app')
  }
}

export default function GuestAppPage() {
  return (
    <>
      <Heading />
      <div />
    </>
  )
}
