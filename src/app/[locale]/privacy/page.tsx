import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {PrivacyContent} from './(components)/privacy-content'
import {PrivacyHeader} from './(components)/privacy-header'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')

  return {
    title: t('privacy')
  }
}

export default async function PrivacyPage() {
  return (
    <>
      <PrivacyHeader />
      <PrivacyContent />
    </>
  )
}
