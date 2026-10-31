import {decodeHTML} from 'entities'
import {toLatin} from '../normalize'

/** Render an HTML email body as trimmed, non-empty text lines */
export function htmlToLines(html: string): string[] {
  const text = decodeHTML(
    html
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<(script|style|head)[\s\S]*?<\/\1>/gi, '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|tr|h[1-6]|li|table|title)>/gi, '\n')
      .replace(/<\/t[dh]>/gi, '\t')
      .replace(/<[^>]+>/g, '')
  )

  return text
    .replace(/ /g, ' ')
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
}

/**
 * Value of a labelled field: the rest of the label's line, or the next line
 * when the label stands alone (labels and values sit in separate cells)
 */
export function valueAfter(
  lines: string[],
  label: RegExp,
  from = 0
): string | undefined {
  for (let i = from; i < lines.length; i++) {
    const match = lines[i].match(label)
    if (!match) continue
    const rest = lines[i].slice((match.index ?? 0) + match[0].length).trim()
    return rest || lines[i + 1]
  }
  return undefined
}

/** Build a valid YYYY-MM-DD string, or null for impossible dates */
export function isoDate(
  year: number,
  month: number,
  day: number
): string | null {
  const date = new Date(Date.UTC(year, month - 1, day))
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null
  }
  return date.toISOString().slice(0, 10)
}

/** "dd/mm/yyyy" → "yyyy-mm-dd" */
export function parseSlashDate(value: string): string | null {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  return match ? isoDate(+match[3], +match[2], +match[1]) : null
}

const MONTHS: Record<string, number> = Object.fromEntries(
  [
    // English
    'january february march april may june july august september october november december',
    'jan feb mar apr may jun jul aug sep oct nov dec',
    // Greek, genitive and nominative (transliterated by toLatin)
    'ianouariou fevrouariou martiou apriliou maiou iouniou iouliou avgoustou septemvriou oktovriou noemvriou dekemvriou',
    'ianouarios fevrouarios martios aprilios maios iounios ioulios avgoustos septemvrios oktovrios noemvrios dekemvrios',
    // Turkish
    'ocak subat mart nisan mayis haziran temmuz agustos eylul ekim kasim aralik',
    // Bulgarian (transliterated by toLatin)
    'yanuari fevruari mart april may yuni yuli avgust septemvri oktomvri noemvri dekemvri'
  ].flatMap((list) =>
    list.split(' ').map((name, index) => [name, index + 1] as const)
  )
)

/** "Monday, 14 September 2026" (en/el/tr/bg month names) → "2026-09-14" */
export function parseLongDate(value: string): string | null {
  const match = toLatin(value).match(/(\d{1,2})\s+([a-z]+)\.?\s+(\d{4})/)
  const month = match && MONTHS[match[2]]
  return match && month ? isoDate(+match[3], month, +match[1]) : null
}

/** Total guests from texts like "3 Persons", "3 Adults + 1 Children", "2 adults , 2 children" */
export function parsePax(value: string | undefined): number | null {
  if (!value) return null
  const persons = value.match(/(\d+)\s*persons?/i)
  if (persons) return +persons[1]

  const counts = [
    ...value.matchAll(/(\d+)\s*(adults?|children|child|kids?|infants?)/gi)
  ]
  return counts.length
    ? counts.reduce((sum, [, count]) => sum + Number(count), 0)
    : null
}
