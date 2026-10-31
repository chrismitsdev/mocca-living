import {dkimVerify, verifyASChain} from 'mailauth'
import type {ReservationSource} from './types'

// Decides whether a received email really comes from a reservation source.
// Forwarding through Hostinger rewrites the Date header, which breaks the
// sender's DKIM signature, so an email is accepted on either of:
//   1. a valid DKIM signature from an allowed domain (unforwarded mail), or
//   2. Hostinger's ARC attestation: a valid ARC-Seal by our own domain whose
//      sealed results report dkim=pass for an allowed domain, bound to a
//      signature in the message whose body hash still matches.
// See docs/guest-app-access.md §3.3

export type DnsResolver = (
  domain: string,
  rrtype: string
) => Promise<string[][] | string[]>

export type OriginDomains = Record<ReservationSource, RegExp>

export const ORIGIN_DOMAINS: OriginDomains = {
  'primal-res': /^(primal-res\.com|revplus\.com)$/,
  hotelo: /^(hotelo\.gr|hotelo-gr\.\d+\.gappssmtp\.com)$/
}

/** The domain Hostinger seals forwarded mail with (our own) */
export const TRUSTED_SEALER = 'moccaliving.com'

export type OriginResult =
  | {
      ok: true
      source: ReservationSource
      domain: string
      method: 'dkim' | 'arc'
    }
  | {ok: false; reason: string}

type OriginOptions = {
  resolver?: DnsResolver
  domains?: OriginDomains
  sealer?: string
}

// Shapes of the mailauth results this module reads
type DkimResult = {
  signingDomain?: string
  signature?: string
  bodyHash?: string
  bodyHashExpecting?: string
  canonBodyLengthLimited?: boolean
  status: {result: string}
}
type ParsedTag = {value?: string | number}
type ArcEntry = {
  'arc-seal'?: {parsed?: {d?: ParsedTag; cv?: ParsedTag}}
  'arc-authentication-results'?: {
    parsed?: {dkim?: AuthResult | AuthResult[]}
  }
}
type AuthResult = {
  value?: string
  header?: {d?: string; i?: string; b?: string}
}
type ArcData = {chain: unknown[] | false; lastEntry?: ArcEntry}

function sourceOf(
  domain: string | undefined,
  domains: OriginDomains
): ReservationSource | null {
  if (!domain) return null
  const name = domain.toLowerCase()
  for (const source of Object.keys(domains) as ReservationSource[]) {
    if (domains[source].test(name)) return source
  }
  return null
}

/**
 * An attested result names its signature by header.d or header.i (RFC 8601),
 * which must agree with the signature's own signing domain
 */
function identifiesDomain(header: AuthResult['header'], domain: string) {
  const d = header?.d?.toLowerCase()
  const i = header?.i?.toLowerCase()
  if (!d && !i) return false
  if (d && d !== domain) return false
  if (i) {
    const identity = i.slice(i.lastIndexOf('@') + 1)
    if (identity !== domain && !identity.endsWith(`.${domain}`)) return false
  }
  return true
}

/** The body is intact and fully covered (no l= length limit) */
function bodyIntact(result: DkimResult): boolean {
  return (
    Boolean(result.bodyHash) &&
    result.bodyHash === result.bodyHashExpecting &&
    !result.canonBodyLengthLimited
  )
}

export async function verifyOrigin(
  raw: Buffer | string,
  {
    resolver,
    domains = ORIGIN_DOMAINS,
    sealer = TRUSTED_SEALER
  }: OriginOptions = {}
): Promise<OriginResult> {
  const verified = await dkimVerify(raw, resolver ? {resolver} : undefined)
  const results = verified.results as DkimResult[]

  // 1. Direct DKIM
  for (const result of results) {
    const domain = result.signingDomain?.toLowerCase()
    const source = sourceOf(domain, domains)
    if (
      domain &&
      source &&
      result.status.result === 'pass' &&
      bodyIntact(result)
    ) {
      return {ok: true, source, domain, method: 'dkim'}
    }
  }

  // 2. Hostinger ARC attestation
  const arc = (verified as unknown as {arc?: ArcData}).arc
  const last = arc?.chain ? arc.lastEntry : undefined
  if (!arc || !last) return {ok: false, reason: 'no valid DKIM and no ARC set'}

  const sealDomain = String(last['arc-seal']?.parsed?.d?.value ?? '')
  if (sealDomain.toLowerCase() !== sealer) {
    return {ok: false, reason: `ARC sealed by "${sealDomain}", not ${sealer}`}
  }

  try {
    await verifyASChain(arc as never, resolver ? {resolver} : undefined)
  } catch (error) {
    return {ok: false, reason: `invalid ARC seal: ${(error as Error).message}`}
  }

  const attested = [
    last['arc-authentication-results']?.parsed?.dkim ?? []
  ].flat()

  for (const entry of attested) {
    const prefix = entry.header?.b
    if (entry.value !== 'pass' || !prefix) continue

    // The signature the sealed result vouches for, found by its b= prefix
    for (const result of results) {
      const domain = result.signingDomain?.toLowerCase()
      const source = sourceOf(domain, domains)
      if (
        domain &&
        source &&
        result.signature?.replace(/\s/g, '').startsWith(prefix) &&
        identifiesDomain(entry.header, domain) &&
        bodyIntact(result)
      ) {
        return {ok: true, source, domain, method: 'arc'}
      }
    }
  }

  return {ok: false, reason: 'ARC results attest no matching allowed signature'}
}
