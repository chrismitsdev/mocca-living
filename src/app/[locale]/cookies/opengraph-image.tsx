import {ImageResponse} from 'next/og'
import {getTranslations} from 'next-intl/server'
// import {HomeIcon} from 'lucide-react'
// import {readFile} from 'node:fs/promises'
// import {join} from 'node:path'
import {getOpengraphData} from '@/src/lib/getOpengraphData'

export const alt = 'Mocca Living'
export const size = {
  width: 1200,
  height: 630
}
export const contentType = 'image/png'

export default async function OpenGraphImage({params}: Params) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})
  const {src, font} = await getOpengraphData()
  // Logo loading
  // const logoData = await readFile(
  //   join(process.cwd(), 'public/images/other/opengraph.png')
  // )
  // Font loading
  // const commissionerSemiBold = await readFile(
  //   join(process.cwd(), 'assets/Commissioner-SemiBold.ttf')
  // )
  // const imgSrc = `data:image/png;base64,${logoData.toString('base64')}`
  // const imgSrc = Uint8Array.from(logoData).buffer

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
            src={src}
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
            <path d='M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5' />
            <path d='M8.5 8.5v.01' />
            <path d='M16 15.5v.01' />
            <path d='M12 12v.01' />
            <path d='M11 17v.01' />
            <path d='M7 14v.01' />
          </svg>
          <span>{`${t('cookies')} • Mocca Living`}</span>
        </p>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: font,
          style: 'normal',
          weight: 700
        }
      ]
    }
  )
}
