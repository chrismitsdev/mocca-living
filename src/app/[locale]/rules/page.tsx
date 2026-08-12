import type {Metadata} from 'next'
import {getTranslations} from 'next-intl/server'
import {RulesContent} from './(components)/rules-content'
import {RulesHeader} from './(components)/rules-header'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')

  return {
    title: t('rules')
  }
}

export default function RulesPage() {
  return (
    <>
      <RulesHeader />
      <RulesContent />
    </>
  )
}
