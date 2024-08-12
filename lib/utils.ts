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
