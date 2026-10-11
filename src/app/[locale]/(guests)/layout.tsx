import {Header} from './(components)/header'

export default function GuestsLayout({children}: LayoutProps<'/[locale]'>) {
  return (
    <>
      <Header />
      <main className='bg-surface-1'>{children}</main>
    </>
  )
}
