import {getTranslations} from 'next-intl/server'
import {getOpengraphImage} from '@/src/lib/get-opengraph-image'

export const alt = 'Contact page'
export const size = {width: 1200, height: 630}
export const contentType = 'image/png'

export default async function Image({params}: Params) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata'})
  return getOpengraphImage(t('contact'), alt, size)
}
