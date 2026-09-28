import {readFile} from 'node:fs/promises'
import {join} from 'node:path'
import {ImageResponse} from 'next/og'

const logo = await readFile(join(process.cwd(), 'public/images/opengraph.png'))
const src = `data:image/png;base64,${logo.toString('base64')}`
const font = await readFile(join(process.cwd(), 'assets/Inter-SemiBold.ttf'))

function getOpengraphImage({title, alt}: {title: string; alt: string}) {
  return new ImageResponse(
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
      <picture>
        <img
          src={src}
          width={250}
          alt={alt}
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
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          role='img'
          aria-hidden='true'
        >
          <path d='M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8' />
          <path d='M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
        </svg>
        <span>{`${title} | Mocca Living`}</span>
      </p>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          style: 'normal',
          data: font
        }
      ]
    }
  )
}

export {getOpengraphImage}
