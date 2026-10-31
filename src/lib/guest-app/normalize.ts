// Matching of guest input against reservation data

// Case-insensitive, accent-sensitive comparison ("Şahin" = "ŞAHİN" ≠ "Sahin").
// Collators also treat differently encoded accents (NFC/NFD) as equal. The
// Turkish one adds the dotted/dotless i case pairs (İ/i, I/ı), which the
// general one would otherwise reject or confuse
const collators = [
  new Intl.Collator('und', {sensitivity: 'accent'}),
  new Intl.Collator('tr', {sensitivity: 'accent'})
]

const sameWord = (a: string, b: string) =>
  collators.some((collator) => collator.compare(a, b) === 0)

const words = (value: string) => value.trim().split(/\s+/).filter(Boolean)

/**
 * True when the guest typed exactly the words of the booker's name as the
 * platform saved it, in any order and letter case; accents must match
 */
export function nameMatches(input: string, bookerName: string): boolean {
  const typed = words(input)
  const remaining = words(bookerName)
  if (!typed.length || typed.length !== remaining.length) return false

  // Pair every typed word with a distinct booked word
  return typed.every((word) => {
    const index = remaining.findIndex((booked) => sameWord(word, booked))
    if (index === -1) return false
    remaining.splice(index, 1)
    return true
  })
}

/** Uppercase, strip a leading '#', spaces and dashes */
export function normalizeReservationNumber(value: string): string {
  return value
    .trim()
    .toUpperCase()
    .replace(/^#/, '')
    .replace(/[\s-]+/g, '')
}
