import {unstable_setRequestLocale} from 'next-intl/server'

export default function Default({params: {locale}}: Params) {
  unstable_setRequestLocale(locale)
  return null
}
