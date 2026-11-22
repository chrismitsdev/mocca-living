import {useTranslations} from 'next-intl'
import {SubpageHeader} from '@/src/app/[locale]/(guest-app)/(components)/subpage-header'
import {sectionIcon} from '@/src/lib/guest-app/content/sections'
import type {GuestAppProperty} from '@/src/lib/guest-app/properties'

function Heading({slug}: {slug: GuestAppProperty}) {
  const t = useTranslations('Pages.guest-app.sections')

  return (
    <SubpageHeader
      title={t('emergency.title')}
      backHref={`/guests/${slug}`}
      icon={sectionIcon('emergency')}
    />
  )
}

export {Heading}
