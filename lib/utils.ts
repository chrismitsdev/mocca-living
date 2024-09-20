import {clsx, type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'
import {format} from 'date-fns'
import {el, enUS} from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(
  date: Date,
  locale: Params['params']['locale'],
  formatPattern: string = 'PPP'
): string {
  return format(date, formatPattern, {locale: locale === 'gr' ? el : enUS})
}

export async function sleep(sleepTime: number = 1000) {
  await new Promise((resolve) => setTimeout(resolve, sleepTime))
}

export function getMobileOS(): 'Android' | 'iOS' | 'Other' {
  // Check if navigator is defined (this ensures the code runs only in a browser environment)
  if (typeof navigator !== 'undefined') {
    const ua = navigator.userAgent

    // Check for Android
    if (/android/i.test(ua)) {
      return 'Android'
    }

    // Check for iOS devices
    if (
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.userAgent.includes('Mac') &&
        navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 1)
    ) {
      return 'iOS'
    }
  }

  // Default to 'Other' if no match or if navigator is not available
  return 'Other'
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

export function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max)
}

export function splitByComma(str: string) {
  return str.split(',')
}
