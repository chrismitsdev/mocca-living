import {unstable_setRequestLocale} from 'next-intl/server'
import {locales} from '@/i18n/routing'

type ContactLayoutProps = React.PropsWithChildren<
  Params & {
    modal: React.ReactNode
  }
>

export default function ContactLayout({
  params: {locale},
  children,
  modal
}: ContactLayoutProps) {
  unstable_setRequestLocale(locale)

  return (
    <>
      {children}
      {modal}
    </>
  )
}

export function generateStaticParams() {
  return locales.map((locale) => ({locale}))
}
