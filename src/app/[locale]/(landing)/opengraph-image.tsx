import {getTranslations} from 'next-intl/server'
import {getOpengraphImage} from '@/src/lib/getOpengraphImage'

export const alt = 'Mocca Living home page'
export const contentType = 'image/png'

export default async function Image({params}: Params) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata'})
  return getOpengraphImage({title: t('home'), alt})
}
