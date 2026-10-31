// Properties the guest app serves automatically, and how reservation emails
// name them. Matching is exact (after case/whitespace normalisation) because
// a future "Villa Georgia by Mocca Living" also contains "Mocca Living"

export type GuestAppProperty = Extract<
  PropertySlug,
  'mocca-by-the-sea-dimitra' | 'mocca-city'
>

export const PROPERTY_TIMEZONE = 'Europe/Athens'

// Includes Georgia: never matched from emails, but it can be added manually
export const PROPERTY_TIMES: Record<
  PropertySlug,
  {checkIn: string; checkOut: string}
> = {
  'mocca-by-the-sea-dimitra': {checkIn: '15:00', checkOut: '11:00'},
  'mocca-by-the-sea-georgia': {checkIn: '15:00', checkOut: '11:00'},
  'mocca-city': {checkIn: '15:00', checkOut: '11:00'}
}

const PROPERTY_NAMES: Record<string, GuestAppProperty> = {
  // Primal Res (Booking.com / Airbnb)
  'mocca living': 'mocca-by-the-sea-dimitra',
  'mocca city': 'mocca-city',
  // Hotelo (property and room names)
  'mocca living premium stay': 'mocca-by-the-sea-dimitra',
  'villa dimitra by mocca living': 'mocca-by-the-sea-dimitra'
}

function normalizeName(name: string): string {
  return name.toLocaleLowerCase('en').replace(/\s+/g, ' ').trim()
}

/** Map a property or room name from a reservation email to a slug */
export function mapPropertyName(
  ...names: (string | undefined)[]
): GuestAppProperty | null {
  for (const name of names) {
    const slug = name && PROPERTY_NAMES[normalizeName(name)]
    if (slug) return slug
  }
  return null
}
