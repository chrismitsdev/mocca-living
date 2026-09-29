import {Header} from './(components)/header'

export default function GuestsLayout({children}: LayoutProps<'/[locale]'>) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
