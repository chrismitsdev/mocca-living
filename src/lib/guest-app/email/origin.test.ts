import {generateKeyPairSync} from 'node:crypto'
import {authenticate, dkimSign} from 'mailauth'
import {beforeAll, describe, expect, it} from 'vitest'
import {type DnsResolver, verifyOrigin} from './origin'

// Real signatures and seals produced by mailauth with keys generated per run,
// served by a fake DNS resolver. Hostinger forwarding is simulated by sealing
// the message and then rewriting its Date header, as MailChannels does

type Key = {privateKey: string; record: string}

function createKey(): Key {
  const {privateKey, publicKey} = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    privateKeyEncoding: {type: 'pkcs8', format: 'pem'},
    publicKeyEncoding: {type: 'spki', format: 'der'}
  })
  return {
    privateKey,
    record: `v=DKIM1; k=rsa; p=${publicKey.toString('base64')}`
  }
}

const keys: Record<string, Key> = {}

const resolver: DnsResolver = async (name, rrtype) => {
  const key = keys[name.toLowerCase()]
  if (rrtype === 'TXT' && key) return [[key.record]]
  throw Object.assign(new Error(`queryTxt ENOTFOUND ${name}`), {
    code: 'ENOTFOUND'
  })
}

function message(from: string, body = '<p>Res ID: 1234567890</p>'): string {
  return [
    `From: ${from}`,
    'To: info@moccaliving.com',
    'Subject: New Reservation [1234567890] for Mocca City from Booking.com',
    'Date: Thu, 1 Oct 2026 06:06:17 +0000',
    'Message-ID: <test@example.com>',
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    '',
    body,
    ''
  ].join('\r\n')
}

async function sign(
  raw: string,
  domain: string,
  canonicalization = 'relaxed/simple'
): Promise<string> {
  const {signatures} = await dkimSign(raw, {
    signatureData: [
      {
        signingDomain: domain,
        selector: 'test',
        privateKey: keys[`test._domainkey.${domain}`].privateKey,
        canonicalization
      }
    ]
  })
  return signatures + raw
}

/** Seal like Hostinger's inbound MTA, then rewrite Date like the relay */
async function forward(raw: string, sealer = 'moccaliving.com') {
  const {headers} = await authenticate(raw, {
    resolver,
    mta: 'fr-int-smtpin25.hostinger.io',
    ip: '192.0.2.10',
    helo: 'mail.example.com',
    sender: 'bookings@primal-res.com',
    disableBimi: true,
    seal: {
      signingDomain: sealer,
      selector: 'hostingermail1',
      privateKey: keys[`hostingermail1._domainkey.${sealer}`].privateKey
    }
  })
  return (headers + raw).replace(
    /^Date: .*$/m,
    'Date: Thu, 01 Oct 2026 06:06:20 +0000 (UTC)'
  )
}

beforeAll(() => {
  for (const name of [
    'test._domainkey.primal-res.com',
    'test._domainkey.hotelo-gr.20251104.gappssmtp.com',
    'test._domainkey.gmail.com',
    'hostingermail1._domainkey.moccaliving.com',
    'hostingermail1._domainkey.attacker.example'
  ]) {
    keys[name] = createKey()
  }
})

describe('verifyOrigin', () => {
  it('accepts an unforwarded email with a valid allowed DKIM signature', async () => {
    const raw = await sign(message('bookings@primal-res.com'), 'primal-res.com')

    expect(await verifyOrigin(raw, {resolver})).toEqual({
      ok: true,
      source: 'primal-res',
      domain: 'primal-res.com',
      method: 'dkim'
    })
  })

  it('accepts a forwarded Primal Res email through the Hostinger ARC attestation', async () => {
    const raw = await forward(
      await sign(message('bookings@primal-res.com'), 'primal-res.com')
    )

    expect(await verifyOrigin(raw, {resolver})).toEqual({
      ok: true,
      source: 'primal-res',
      domain: 'primal-res.com',
      method: 'arc'
    })
  })

  it('accepts a forwarded Hotelo email signed with the Google Workspace domain', async () => {
    const raw = await forward(
      await sign(
        message('booking@hotelo.gr'),
        'hotelo-gr.20251104.gappssmtp.com',
        'relaxed/relaxed'
      )
    )

    expect(await verifyOrigin(raw, {resolver})).toMatchObject({
      ok: true,
      source: 'hotelo',
      method: 'arc'
    })
  })

  it('rejects a forwarded email whose body was changed after sealing', async () => {
    const raw = (
      await forward(
        await sign(message('bookings@primal-res.com'), 'primal-res.com')
      )
    ).replace('Res ID: 1234567890', 'Res ID: 9999999999')

    expect(await verifyOrigin(raw, {resolver})).toEqual({
      ok: false,
      reason: 'ARC results attest no matching allowed signature'
    })
  })

  it('rejects an email signed by a domain that is not allowed', async () => {
    const raw = await forward(
      await sign(message('someone@gmail.com'), 'gmail.com')
    )

    expect(await verifyOrigin(raw, {resolver})).toEqual({
      ok: false,
      reason: 'ARC results attest no matching allowed signature'
    })
  })

  it('rejects an ARC set sealed by another domain', async () => {
    const raw = await forward(
      await sign(message('bookings@primal-res.com'), 'primal-res.com'),
      'attacker.example'
    )

    expect(await verifyOrigin(raw, {resolver})).toEqual({
      ok: false,
      reason: 'ARC sealed by "attacker.example", not moccaliving.com'
    })
  })

  it('rejects a forged seal claiming to be from our domain', async () => {
    // Sealed with the attacker's key but labelled as moccaliving.com
    const forged = (
      await forward(
        await sign(message('bookings@primal-res.com'), 'primal-res.com'),
        'attacker.example'
      )
    ).replace(/d=attacker\.example/g, 'd=moccaliving.com')

    const result = await verifyOrigin(forged, {resolver})
    expect(result.ok).toBe(false)
    expect(result.ok === false && result.reason).toMatch(/^invalid ARC seal/)
  })

  it('rejects an unsigned email', async () => {
    expect(
      await verifyOrigin(message('bookings@primal-res.com'), {resolver})
    ).toEqual({ok: false, reason: 'no valid DKIM and no ARC set'})
  })
})
