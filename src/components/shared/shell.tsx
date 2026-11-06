import '@/src/styles/index.css'
import {Inter} from 'next/font/google'
import type {Locale} from 'next-intl'
import {Toaster} from 'sonner'

const inter = Inter({
  subsets: ['latin', 'latin-ext', 'greek', 'cyrillic'],
  display: 'swap'
})

function Shell({
  lang,
  children
}: Readonly<React.PropsWithChildren<{lang: Locale}>>) {
  return (
    <html
      lang={lang}
      className={inter.className}
    >
      <body className='bg-surface-1 text-foreground'>
        {children}
        <Toaster
          position='top-center'
          mobileOffset={12}
        />
      </body>
    </html>
  )
}

export {Shell}
