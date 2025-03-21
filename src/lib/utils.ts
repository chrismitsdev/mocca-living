import {type StaticImageData} from 'next/image'
import {type Locale} from 'next-intl'
import {type ClassValue, clsx} from 'clsx'
import {format} from 'date-fns'
import {el, enUS} from 'date-fns/locale'
import {twMerge} from 'tailwind-merge'
import {Resend} from 'resend'
import {type ContactFormActionState} from '@/src/lib/actions'
import {ContactFormTemplate} from '@/src/components/email/contact-form-template'

export async function sendContactForm(
  formData: ContactFormActionState['data']
) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const {error} = await resend.emails.send({
      from: 'Mocca Living <info@moccaliving.com>',
      to: ['apefthimiadou@gmail.com', 'mokalis@gmail.com'],
      cc: 'chrismits88@gmail.com',
      subject: 'Φόρμα επικοινωνίας',
      react: ContactFormTemplate(formData) as React.JSX.Element
    })

    if (error) {
      return error
    }
  } catch (error) {
    console.error(error)
  }
}

export async function sleep(sleepTime: number = 1000) {
  await new Promise((resolve) => setTimeout(resolve, sleepTime))
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shimmer(w: number, h: number) {
  return `
    <svg 
      width='${w}' 
      height='${h}' 
      version='1.1' 
      xmlns='http://www.w3.org/2000/svg' 
      xmlns:xlink='http://www.w3.org/1999/xlink'
    >
      <defs>
        <linearGradient id='g'>
          <stop stop-color='#b1a082' offset='20%' />
          <stop stop-color='#9b8c71' offset='50%' />
          <stop stop-color='#b1a082' offset='70%' />
        </linearGradient>
      </defs>
      <rect width='${w}' height='${h}' fill='#b1a082' />
      <rect id="r" width='${w}' height='${h}' fill='url(#g)' />
      <animate 
        xlink:href='#r' 
        attributeName='x' 
        from='-${w}' 
        to='${w}'
        dur='1s' 
        repeatCount='indefinite'  
      />
    </svg>
  `
}

export function toBase64(str: string) {
  return typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)
}

export function formatDate(
  date: Date,
  locale: Locale,
  formatStr: string = 'PP'
): string {
  return format(date, formatStr, {locale: locale === 'gr' ? el : enUS})
}

export function formatDuration(durationInSeconds: number | null) {
  if (durationInSeconds === null) return null

  const minutes = Math.floor(durationInSeconds / 60)
  const seconds = Math.floor(durationInSeconds % 60)
    .toString()
    .padStart(2, '0')

  return `${minutes}:${seconds}`
}

export function sortImportedImagesByName(
  importedImages: Record<string, StaticImageData>
) {
  return Object.values(importedImages).sort(function (a, b) {
    const numA = parseInt(a.src.match(/\d+/)?.[0] || '0', 10)
    const numB = parseInt(b.src.match(/\d+/)?.[0] || '0', 10)
    return numA - numB
  })
}
