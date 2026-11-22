import {useTranslations} from 'next-intl'
import type {GuestAppProperty} from '@/src/lib/guest-app/properties'

function Heading({slug}: {slug: GuestAppProperty}) {
  const t = useTranslations('Metadata')
  return <h1 className='sr-only'>{t(`guest-app.${slug}`)}</h1>
}

export {Heading}
