// Euro to Turkish lira, from the European Central Bank's daily reference
// rates through the Frankfurter API (free, no key). The ECB publishes once
// a working day, around 16:00 CET, so an hourly refresh is plenty

// Fetched at most once an hour
export const RATE_REVALIDATE_SECONDS = 60 * 60
// No ECB rates on weekends and holidays (Easter, Christmas), so a rate can
// be a few days old; anything older than this is not shown
export const MAX_RATE_AGE_DAYS = 7

export type EurTryRate =
  | {
      ok: true
      /** Lira per euro */
      rate: number
      /** ECB reference date, YYYY-MM-DD */
      date: string
    }
  | {ok: false}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

/** The EUR→TRY rate in a Frankfurter response; anything off is "no rate" */
export function parseRateResponse(json: unknown, now: number): EurTryRate {
  if (!isRecord(json) || json.base !== 'EUR' || !isRecord(json.rates)) {
    return {ok: false}
  }

  const rate = json.rates.TRY
  const date = json.date
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
    return {ok: false}
  }

  return {ok: true, rate, date}
}

/** Today's EUR→TRY rate; never throws */
export async function fetchEurTryRate(): Promise<EurTryRate> {
  try {
    const response = await fetch(
      'https://api.frankfurter.dev/v1/latest?base=EUR&symbols=TRY',
      {next: {revalidate: RATE_REVALIDATE_SECONDS}}
    )
    if (!response.ok) {
      console.error(
        'guest-app currency: frankfurter responded',
        response.status
      )
      return {ok: false}
    }
    return parseRateResponse(await response.json(), Date.now())
  } catch (cause) {
    console.error('guest-app currency: frankfurter request failed', cause)
    return {ok: false}
  }
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
