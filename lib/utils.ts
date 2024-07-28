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
  formatPattern: string = 'PPP', 
): string {
  return format(date, formatPattern, {locale : locale === 'gr' ? el : enUS})
}