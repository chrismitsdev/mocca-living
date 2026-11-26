import {guestAppEnv} from './env'

// Estimated waiting times at the land borders near the properties, from the
// nakordoni.eu developer API (free Explorer plan). Their terms: call it from
// the server only, cache at most 24 h, show each value's time, label values
// as estimates (not official) and credit "Data by nakordoni.eu"

export type BorderDirection = 'turkey' | 'bulgaria'

/** Our crossings; names in Pages.guest-app.border.crossings */
export type CrossingId =
  | 'kipi'
  | 'kastanies'
  | 'nymfaia'
  | 'kyprinos'
  | 'ormenio'

/** Crossings shown per direction, leaving Greece by car, nearest first */
export const BORDER_CROSSINGS: Record<
  BorderDirection,
  {id: CrossingId; ppid: string}[]
> = {
  turkey: [
    {id: 'kipi', ppid: 'id_487'},
    {id: 'kastanies', ppid: 'id_901'}
  ],
  bulgaria: [
    {id: 'nymfaia', ppid: 'id_818'},
    {id: 'kyprinos', ppid: 'id_820'},
    {id: 'ormenio', ppid: 'id_824'}
  ]
}

// Nakordoni country ids (origin Greece)
const GREECE = 19
const COUNTRY_ID: Record<BorderDirection, number> = {turkey: 14, bulgaria: 12}
// Car crossings
const CROSSING_TYPE_CAR = 4
// Fetched at most every 30 minutes: the free plan allows 200 border calls a
// day, and two directions every 30 minutes use 96
export const BORDER_REVALIDATE_SECONDS = 30 * 60
// Our own freshness limit, on top of their "stale" flag (240 minutes)
export const MAX_READING_AGE_MINUTES = 120

export type WaitLevel = 'low' | 'medium' | 'high'

export type CrossingWait = {
  id: CrossingId
  /** Null when there is no recent, usable estimate */
  reading: {
    minutes: number
    level: WaitLevel | null
    /** ISO time of the observation, not of our request */
    updatedAt: string
    detailsUrl: string | null
  } | null
}

export type BorderWaits =
  | {ok: true; crossings: CrossingWait[]}
  | {ok: false; crossings: CrossingWait[]}

const LEVELS: Record<string, WaitLevel> = {
  green: 'low',
  free_flow: 'low',
  yellow: 'medium',
  moderate: 'medium',
  red: 'high',
  heavy: 'high'
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

function noReadings(direction: BorderDirection): CrossingWait[] {
  return BORDER_CROSSINGS[direction].map(({id}) => ({id, reading: null}))
}

/**
 * Pick our crossings out of a border response. Anything missing, stale,
 * malformed or too old becomes "no reading" rather than a number
 */
export function parseBorderResponse(
  json: unknown,
  direction: BorderDirection,
  now: number
): CrossingWait[] {
  const checkpoints =
    isRecord(json) &&
    json.ok === true &&
    isRecord(json.data) &&
    Array.isArray(json.data.checkpoints)
      ? json.data.checkpoints.filter(isRecord)
      : []

  return BORDER_CROSSINGS[direction].map(({id, ppid}) => {
    const checkpoint = checkpoints.find((entry) => entry.ppid === ppid)
    if (!checkpoint) return {id, reading: null}

    const minutes = checkpoint.wait_min
    const updatedAt = checkpoint.updated_at
    const updatedMs =
      typeof updatedAt === 'string' ? Date.parse(updatedAt) : Number.NaN
    const ageMinutes = (now - updatedMs) / 60_000

    if (
      typeof minutes !== 'number' ||
      !Number.isFinite(minutes) ||
      minutes < 0 ||
      checkpoint.stale === true ||
      typeof updatedAt !== 'string' ||
      Number.isNaN(updatedMs) ||
      ageMinutes > MAX_READING_AGE_MINUTES
    ) {
      return {id, reading: null}
    }

    const status = checkpoint.wait_status
    const sourceUrl = checkpoint.source_url
    return {
      id,
      reading: {
        minutes: Math.round(minutes),
        level: typeof status === 'string' ? (LEVELS[status] ?? null) : null,
        updatedAt,
        detailsUrl:
          typeof sourceUrl === 'string' &&
          sourceUrl.startsWith('https://nakordoni.eu/')
            ? sourceUrl
            : null
      }
    }
  })
}

/** Current waits for one direction; never throws */
export async function fetchBorderWaits(
  direction: BorderDirection
): Promise<BorderWaits> {
  const key = guestAppEnv.nakordoniApiKey()
  if (!key) return {ok: false, crossings: noReadings(direction)}

  try {
    const response = await fetch(
      `https://nakordoni.eu/api/v4/data/border/${GREECE}/${COUNTRY_ID[direction]}/${CROSSING_TYPE_CAR}?lang=en`,
      {
        headers: {Authorization: `Bearer ${key}`},
        next: {revalidate: BORDER_REVALIDATE_SECONDS}
      }
    )
    if (!response.ok) {
      console.error('guest-app border: nakordoni responded', response.status)
      return {ok: false, crossings: noReadings(direction)}
    }
    return {
      ok: true,
      crossings: parseBorderResponse(
        await response.json(),
        direction,
        Date.now()
      )
    }
  } catch (cause) {
    console.error('guest-app border: nakordoni request failed', cause)
    return {ok: false, crossings: noReadings(direction)}
  }
}
