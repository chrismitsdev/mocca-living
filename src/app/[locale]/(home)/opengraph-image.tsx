import {ImageResponse} from 'next/og'
import {getTranslations} from 'next-intl/server'
import {readFile} from 'node:fs/promises'
import {join} from 'node:path'

export const alt = 'Mocca Living'
export const size = {
  width: 1200,
  height: 630
}
export const contentType = 'image/png'

export default async function Image({params}: Params) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})
  // Font loading
  const commissionerSemiBold = await readFile(
    join(process.cwd(), 'assets/Commissioner-SemiBold.ttf')
  )
  // Logo loading
  const logoData = await readFile(join(process.cwd(), 'opengraph.png'))
  const imgSrc = Uint8Array.from(logoData).buffer
  // const imgSrc = `data:image/png;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#e7d9be',
          color: '#453227',
          fontSize: 48
        }}
      >
        <picture>
          <img
            // @ts-ignore
            src={imgSrc}
            width='250'
          />
        </picture>
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16
          }}
        >
          <svg
            style={{marginTop: '6px'}}
            xmlns='http://www.w3.org/2000/svg'
            width='42'
            height='42'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path d='M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8' />
            <path d='M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
          </svg>
          <span>{`${t('home')} • Mocca Living`}</span>
        </p>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: commissionerSemiBold,
          style: 'normal',
          weight: 700
        }
      ]
    }
  )
}
