import {useTranslations} from 'next-intl'

function Heading({slug}: {slug: PropertySlug}) {
  const t = useTranslations('Metadata')
  return <h1 className='sr-only'>{t(`guest-app.${slug}`)}</h1>
}

export {Heading}
