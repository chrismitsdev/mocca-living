import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function sleep(sleepTime: number = 1000) {
  await new Promise((resolve) => setTimeout(resolve, sleepTime))
}

export function isValidLocation(
  location: string
): location is PropertyLocation {
  return location === 'mocca-sea' || location === 'mocca-city'
}

export const MOCCA_SEA_GMAP = 'https://maps.app.goo.gl/UtXAvFmNtEwMjK3x9'
export const MOCCA_CITY_GMAP = 'https://maps.app.goo.gl/pLsA8svYzYq5Z9GK9'
export const PHONE = '+306973433980'
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
