// Normalisation of guest input and reservation data, so that matching is
// tolerant to case, diacritics, separators and the script the guest types in

// Greek digraphs, applied before single letters (ELOT 743, as on passports)
const GREEK_DIGRAPHS: [RegExp, string][] = [
  [/ου/g, 'ou'],
  [/αυ/g, 'av'],
  [/ευ/g, 'ev'],
  [/ηυ/g, 'iv'],
  [/γγ/g, 'ng'],
  [/γκ/g, 'gk'],
  [/μπ/g, 'mp'],
  [/ντ/g, 'nt']
]

const GREEK: Record<string, string> = {
  α: 'a',
  β: 'v',
  γ: 'g',
  δ: 'd',
  ε: 'e',
  ζ: 'z',
  η: 'i',
  θ: 'th',
  ι: 'i',
  κ: 'k',
  λ: 'l',
  μ: 'm',
  ν: 'n',
  ξ: 'x',
  ο: 'o',
  π: 'p',
  ρ: 'r',
  σ: 's',
  ς: 's',
  τ: 't',
  υ: 'y',
  φ: 'f',
  χ: 'ch',
  ψ: 'ps',
  ω: 'o'
}

const CYRILLIC: Record<string, string> = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'sht',
  ъ: 'a',
  ь: 'y',
  ю: 'yu',
  я: 'ya',
  ё: 'yo',
  ы: 'y',
  э: 'e'
}

// Latin letters that don't decompose under NFD
const LATIN_EXTRA: Record<string, string> = {
  ı: 'i',
  ß: 'ss',
  ø: 'o',
  æ: 'ae',
  œ: 'oe',
  đ: 'd',
  ł: 'l'
}

const LETTER_MAP = {...GREEK, ...CYRILLIC, ...LATIN_EXTRA}

/** Lowercase, strip diacritics and transliterate Greek/Cyrillic to Latin */
export function toLatin(value: string): string {
  const base = GREEK_DIGRAPHS.reduce(
    (text, [pattern, latin]) => text.replace(pattern, latin),
    value.toLocaleLowerCase('en').normalize('NFD').replace(/\p{M}/gu, '')
  )

  return Array.from(base)
    .map((char) => LETTER_MAP[char] ?? char)
    .join('')
}

/** Split a name into normalised Latin tokens */
export function nameTokens(value: string): string[] {
  return toLatin(value)
    .split(/[^a-z]+/)
    .filter(Boolean)
}

/**
 * Looser form used as a fallback, to absorb common transliteration variants
 * such as "Christov" / "Hristov" or "Philippou" / "Filippou"
 */
function skeleton(token: string): string {
  return token
    .replace(/ph/g, 'f')
    .replace(/f/g, 'v')
    .replace(/[ck]h/g, 'h')
    .replace(/th/g, 't')
    .replace(/y/g, 'i')
    .replace(/w/g, 'v')
    .replace(/(.)\1+/g, '$1')
}

/**
 * True when every token the guest typed matches a token of the booked names.
 * At least one typed token must be 3+ letters long.
 */
export function surnameMatches(input: string, bookedNames: string[]): boolean {
  const typed = nameTokens(input)
  if (!typed.length || !typed.some((token) => token.length >= 3)) return false

  const booked = new Set(bookedNames.flatMap(nameTokens))
  const bookedSkeletons = new Set([...booked].map(skeleton))

  return typed.every(
    (token) => booked.has(token) || bookedSkeletons.has(skeleton(token))
  )
}

/** Uppercase, strip a leading '#', spaces and dashes */
export function normalizeConfirmation(value: string): string {
  return value
    .trim()
    .toUpperCase()
    .replace(/^#/, '')
    .replace(/[\s-]+/g, '')
}
