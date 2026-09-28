import {readFile} from 'node:fs/promises'
import {join} from 'node:path'
import {ImageResponse} from 'next/og'

const logo = await readFile(join(process.cwd(), 'public/images/opengraph.png'))
const src = `data:image/png;base64,${logo.toString('base64')}`
const font = await readFile(join(process.cwd(), 'assets/Inter-SemiBold.ttf'))

function getOpengraphImage(
  title: string,
  alt: string,
  size: {width: number; height: number}
) {
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
      <p>{`${title} | Mocca Living`}</p>
    </div>,
    {
      ...size,
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
