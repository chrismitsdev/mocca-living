import {ImageResponse} from 'next/og'
import {getTranslations} from 'next-intl/server'
import {getOpengraphData} from '@/src/lib/get-opengraph-data'

export default async function Image({params}: Params) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'Metadata.Pages'})
  const {src, font} = await getOpengraphData()

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
          rowGap: 24,
          backgroundColor: '#e7d9be',
          color: '#453227',
          fontSize: 48
        }}
      >
        <img
          src={src}
          width='250'
        />
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
            <path d='M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8' />
            <path d='M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4' />
            <path d='M12 4v6' />
            <path d='M2 18h20' />
          </svg>
          <span>{`${t('accomodation.root')} • Mocca Living`}</span>
        </p>
      </div>
    ),
    {
      fonts: [
        {
          name: 'Commissioner',
          data: font,
          style: 'normal'
        }
      ]
    }
  )
}
