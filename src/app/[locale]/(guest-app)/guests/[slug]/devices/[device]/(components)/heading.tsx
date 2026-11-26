import type {TablerIcon} from '@tabler/icons-react'
import {useTranslations} from 'next-intl'
import {SubpageHeader} from '@/src/app/[locale]/(guest-app)/(components)/subpage-header'
import type {DeviceTextKey} from '@/src/lib/guest-app/content/device-text'
import type {GuestAppProperty} from '@/src/lib/guest-app/properties'

type HeadingProps = {
  slug: GuestAppProperty
  id: string
  icon: TablerIcon
}

function Heading({slug, id, icon}: HeadingProps) {
  const t = useTranslations('Pages.guest-app.device-guides')

  return (
    <SubpageHeader
      title={t(`${slug}.${id}.name` as DeviceTextKey)}
      backHref={`/guests/${slug}/devices`}
      icon={icon}
    />
  )
}

export {Heading}
