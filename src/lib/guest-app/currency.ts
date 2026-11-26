// Euro exchange rates for the guest app's converter, from two central banks,
// both free and without a key:
// - the European Central Bank's daily reference rates, through the
//   Frankfurter API (TRY, RON, GBP, USD);
// - the National Bank of Serbia's official middle rate, through
//   kurs.resenje.org (RSD, which the ECB doesn't publish).
// Both publish once a working day, so an hourly refresh is plenty

/** Currencies offered against the euro, in picker order */
export const CURRENCIES = ['TRY', 'RSD', 'RON', 'GBP', 'USD'] as const
export type Currency = (typeof CURRENCIES)[number]

export const isCurrency = (value: unknown): value is Currency =>
  CURRENCIES.includes(value as Currency)

/** Who publishes each rate */
export type RateSource = 'ecb' | 'nbs'
const ECB_CURRENCIES = ['TRY', 'RON', 'GBP', 'USD'] as const

// Fetched at most once an hour
export const RATE_REVALIDATE_SECONDS = 60 * 60
// No rates on weekends and holidays (Easter, Christmas), so a rate can be a
// few days old; anything older than this is not shown
export const MAX_RATE_AGE_DAYS = 7

export type Rate = {
  /** Units of the currency per euro */
  rate: number
  /** Publication date, YYYY-MM-DD */
  date: string
  source: RateSource
}

/** Null when there is no recent, usable rate */
export type Rates = Record<Currency, Rate | null>

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

/** A rate and its date, if both are sound and the date is recent */
function validRate(
  rate: unknown,
  date: unknown,
  source: RateSource,
  now: number
): Rate | null {
  const dateMs =
    typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)
      ? Date.parse(`${date}T00:00:00Z`)
      : Number.NaN
  const ageDays = (now - dateMs) / 86_400_000

  if (
    typeof rate !== 'number' ||
    !Number.isFinite(rate) ||
    rate <= 0 ||
    typeof date !== 'string' ||
    Number.isNaN(dateMs) ||
    ageDays > MAX_RATE_AGE_DAYS
  ) {
    return null
  }
  return {rate, date, source}
}

/** The ECB rates in a Frankfurter response */
export function parseEcbResponse(
  json: unknown,
  now: number
): Record<(typeof ECB_CURRENCIES)[number], Rate | null> {
  const rates =
    isRecord(json) && json.base === 'EUR' && isRecord(json.rates)
      ? json.rates
      : {}
  const date = isRecord(json) ? json.date : undefined
  const rateOf = (currency: (typeof ECB_CURRENCIES)[number]) =>
    validRate(rates[currency], date, 'ecb', now)

  return {
    TRY: rateOf('TRY'),
    RON: rateOf('RON'),
    GBP: rateOf('GBP'),
    USD: rateOf('USD')
  }
}

/** The National Bank of Serbia's EUR middle rate in a kurs.resenje.org response */
export function parseNbsResponse(json: unknown, now: number): Rate | null {
  if (!isRecord(json) || json.code !== 'EUR' || json.parity !== 1) return null
  return validRate(json.exchange_middle, json.date, 'nbs', now)
}

async function fetchJson(url: string, label: string): Promise<unknown> {
  try {
    const response = await fetch(url, {
      next: {revalidate: RATE_REVALIDATE_SECONDS}
    })
    if (!response.ok) {
      console.error(`guest-app currency: ${label} responded`, response.status)
      return null
    }
    return await response.json()
  } catch (cause) {
    console.error(`guest-app currency: ${label} request failed`, cause)
    return null
  }
}

/** Today's euro rates; a source that fails leaves only its currencies empty */
export async function fetchRates(): Promise<Rates> {
  const [ecb, nbs] = await Promise.all([
    fetchJson(
      `https://api.frankfurter.dev/v1/latest?base=EUR&symbols=${ECB_CURRENCIES.join(',')}`,
      'frankfurter'
    ),
    fetchJson(
      'https://kurs.resenje.org/api/v1/currencies/eur/rates/today',
      'kurs.resenje.org'
    )
  ])
  const now = Date.now()

  return {...parseEcbResponse(ecb, now), RSD: parseNbsResponse(nbs, now)}
}

/**
 * An amount as a guest types it: "25", "25.5" or "25,50" (comma or dot as the
 * decimal mark, spaces ignored). Null when empty, NaN when not a number
 */
export function parseAmount(text: string): number | null {
  const compact = text.replace(/\s/g, '').replace(',', '.')
  if (compact === '') return null
  if (!/^(\d+\.?\d*|\.\d+)$/.test(compact)) return Number.NaN
  return Number(compact)
}
