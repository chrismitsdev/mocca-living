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

export const SEA_GMAP = 'https://maps.app.goo.gl/L6JEySni2t8jnb5m9'
export const CITY_GEORGIA_GMAP = 'https://maps.app.goo.gl/pLsA8svYzYq5Z9GK9'
export const PHONE = '+306973433980'
