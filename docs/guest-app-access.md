# Guest app: access & authentication

Design for restricting the guest app (`/[locale]/guest-app`) to guests with an
active reservation. The guest-app **content** is out of scope here and will be
designed once the owner finalises it.

Status (1 Nov 2026): steps 1–3 implemented on branch `feat/guest-app-access`
and verified on its Vercel preview. Step 4 (owner page) is next. See §12.

## 1. Requirements

- Only guests with an **active reservation** at one of the properties may
  access the guest app.
- Knowing the URL must not be enough. A shared link (e.g. a guest forwarding
  it to a friend) must not grant access outside that guest's stay.
- The content will include **sensitive information** (e.g. lockbox codes).
- Verification must be **automated**: read reservation data, then allow or deny.
- The owner and the developer need a way to handle exceptions.

Accepted limitation: a guest can always share their own credentials with
someone else. Access is therefore bounded by the property and the stay
window, so it stops working when the stay ends.

## 2. Reservation data sources

There is no API we can use:

- The Hotelo extranet only shows direct ("Website" / "Call center") bookings.
- Booking.com and Airbnb are managed by Hotelo's OTA Management service and
  aren't visible to us.
- Hotelizer was rejected as uneconomic for two units.
- The WebHotelier (now **revplus**) API needs per-property accounts that only
  WebHotelier can set up, and it's unclear whether OTA bookings are included.

Every reservation does, however, produce an email to `info@moccaliving.com`
(a Hostinger mailbox):

| Channel          | Sender                    | Guest's confirmation number | DKIM `d=`                                                     |
| ---------------- | ------------------------- | --------------------------- | ------------------------------------------------------------- |
| Booking.com      | `bookings@primal-res.com` | 10 digits                   | `primal-res.com` (aligned, DMARC `p=reject`)                  |
| Airbnb           | `bookings@primal-res.com` | `HM` + 8 alphanumerics      | `primal-res.com`                                              |
| Website (Hotelo) | `booking@hotelo.gr`       | 8 digits                    | `hotelo-gr.<digits>.gappssmtp.com` (Google Workspace default) |

WebHotelier also sends "Availability Alert" emails (`noreply+alert@webhotelier.net`).
They have no guest name and are **ignored**.

### 2.1 Primal Res template (Booking.com and Airbnb)

- Subjects:
  - `New Reservation [<ID>] for <Property> from Booking.com`
  - `New Reservation Notification [<ID>] for <Property> from AirBnb`
  - `Reservation Cancellation [<ID>] for <Property> from Booking.com`
- Header block: `<Property>`, `<Channel> - ( Booking Confirmation | ***BOOKING CANCELLATION*** )`,
  `Res ID: <ID> - <dd/mm/yyyy hh:mm:ss>`, `Last Update: <dd/mm/yyyy hh:mm:ss>`.
- Body:
  - `Booked By: <Surname Name>` and `Guest Info: <Name Surname> (for N persons, …)`.
    The name order differs between the two fields.
  - The stay line is `dd/mm/yyyy - dd/mm/yyyy` (no times).
  - Pax appears as `Rooms, Pax: 1 Rooms, 3 Persons` (Booking.com) or
    `Units, Pax: 1 Unit, 3 Adults + 1 Children` (Airbnb).
  - Cancellations add `**Canceled**` markers.
  - `Booked By` is always the **booker** and is the only name stored and
    matched. `Guest Info` can name someone else (a booking made for another
    person), and the `Client Comments` guest list isn't used.
  - `Res ID` / `Last Update` timestamps have no zone. They match the UTC send
    time, so they're treated as UTC.
- The two channel layouts differ slightly. Parse only the shared fields.
- Modification emails haven't been seen yet. Treat any email with a newer
  `Last Update` for the same ID as replacing the previous state.

### 2.2 Hotelo template (direct bookings)

- Subject: `New reservation - Res #<ID> - <Property> - <Surname Name>`
- Body:
  - `Your booking reference: #<ID>`
  - `CHECK-IN` / `CHECK-OUT` as long dates (e.g. `Friday, 4 September 2026`).
    Assume localised variants (en/el/tr/bg) are possible.
  - `PROPERTY`, `Room 1: <room name>`, and the Billing `Name`.
  - Pax: `2 adults, 2 children`.
- Unknown: whether Hotelo sends a cancellation email for direct bookings. The
  owner page can revoke instead (§7).

### 2.3 Property mapping (exact match only)

| Email value                                                                                         | Slug                       |
| --------------------------------------------------------------------------------------------------- | -------------------------- |
| `Mocca Living` (Primal Res), `MOCCA Living Premium Stay` / `Villa Dimitra by Mocca Living` (Hotelo) | `mocca-by-the-sea-dimitra` |
| `Mocca City`                                                                                        | `mocca-city`               |
- Georgia isn't listed on any platform yet, so it isn't mapped. Its future
  name is probably `Villa Georgia by Mocca Living`, which **contains "Mocca
  Living"**. Matching must therefore be exact, never by substring.
- An unknown property name raises an alert and is not stored.

### 2.4 revplus rebrand

WebHotelier/Primal Res renamed to **revplus** (announced 8 Oct 2026). General
emails move to `@revplus.com`, but the **reservation emails stay as they
are**. A new revplus booking engine and channel manager launches on
**22 Nov 2026**, which may change the email layouts.

- Accept `revplus.com` as a sender and DKIM domain in advance.
- Follow-up: check the first reservation processed after 22 Nov 2026.

## 3. Architecture

```
Booking.com / Airbnb ─┐
                      ├─► Primal Res ──┐
Hotelo website ───────┘                ├─► info@moccaliving.com (Hostinger)
                       Hotelo mail ────┘            │
                                   webmail filter: "Send message copy to"
                                                    ▼
                         r-<random>@reservations.moccaliving.com (Resend Inbound)
                                                    │ webhook (Svix-signed)
                                                    ▼
                         /api/guest-app/inbound (Next.js on Vercel)
                           ├─ fetch raw MIME, verify DKIM
                           ├─ parse (Primal Res | Hotelo)
                           └─ upsert reservation ──► Upstash Redis (EU)
                                                    ▲
Guest ─► /[locale]/guest-app (confirmation no. + full name) ─┘
Admin ─► /[locale]/admin/guest-app (magic-link login)
```

### 3.1 Email intake

- **Hostinger webmail filter** on `info@moccaliving.com` (Settings → Filters):
  - Name: e.g. `Guest app reservations`
  - Scope: `Match any rule`
  - When: `From` contains `primal-res.com`, **or** `From` contains `booking@hotelo.gr`
  - Then: **`Send message copy to`** `r-<random>@reservations.moccaliving.com`
  - Never use "Redirect message to" (the owner would lose the email) or the
    hPanel Forwarders (they forward the whole mailbox).
- **Resend Inbound** runs on the subdomain `reservations.moccaliving.com` only.
  - Its MX record lives in Vercel DNS.
  - The root `moccaliving.com` MX stays on Hostinger. Never enable receiving
    on the root domain.
- Possible improvement: ask Hotelo to add the inbound address as a direct
  recipient of the reservation emails. That avoids forwarding entirely and
  guarantees the DKIM body hash survives.

### 3.2 Inbound processing (`/api/guest-app/inbound`)

1. Verify the Resend webhook signature (Svix) against the raw request body.
2. Fetch the full message via the Resend Receiving API
   (`GET /emails/receiving/{id}`). The response includes `raw.download_url`,
   a short-lived signed URL to the original `.eml`.
3. Verify the origin on the raw MIME (§3.3). Allowed origin domains:
   - `primal-res.com` or `revplus.com`, for Primal Res emails;
   - `hotelo.gr` or `hotelo-gr.<digits>.gappssmtp.com`, for Hotelo emails.
4. Pick the parser by sender. Ignore non-reservation emails (availability
   alerts, invoices, marketing). **Parsers read the body only**, because
   headers other than the ARC set aren't verifiable after forwarding (§3.3).
5. Parse, normalise, and map the property (§2.3).
6. Upsert by confirmation number. Apply the update only if its `Last Update`
   (or received time, for Hotelo) is newer than the stored one.
7. On parse failure, an unknown property, or a DKIM failure for a
   reservation-looking email: send an **alert** to the developer (§9). Don't
   store anything.

The webhook is idempotent: the same message received twice gives the same result.

### 3.3 Origin verification after forwarding

Spike result (31 Oct 2026, a Gmail test message sent through the Hostinger
filter):

- Hostinger forwards via MailChannels, which **replaces the `Date` header**
  with the forwarding time. That breaks both the original DKIM signature and
  Hostinger's own ARC-Message-Signature.
- The body arrives unchanged.
- Hostinger adds an ARC set signed as `d=moccaliving.com`, `s=hostingermail1`.
  The key is published in our Vercel DNS.

An email is accepted if **either** check passes:

1. **Direct DKIM**: a valid DKIM signature with an allowed `d=`. This covers
   mail that arrives without forwarding, e.g. if Hotelo adds the inbound
   address as a recipient.
2. **Hostinger ARC attestation**. All of the following must hold:
   - The highest-instance **ARC-Seal** is valid, with `d=moccaliving.com` and
     `cv=pass` (or `cv=none` at i=1). Verify the seal on its own; the
     ARC-Message-Signature is expected to fail because of the `Date` rewrite.
   - The sealed **ARC-Authentication-Results** reports `dkim=pass` and gives
     a `header.b=` prefix.
   - A **DKIM-Signature** in the message has a `b=` value starting with that
     prefix and an **allowed `d=`**. The result's `header.d=` or `header.i=`
     (RFC 8601 allows either; Hostinger uses `header.d`) must agree with it.
   - Recomputing that signature's **body hash** (with its `c=` body
     canonicalisation) matches its `bh=`, and it has no `l=` length limit.

   Implemented in `src/lib/guest-app/email/origin.ts` with mailauth
   (`dkimVerify`, `verifyASChain`). It was checked against the real Hostinger
   forward from the spike.

Together these prove the body was signed by the allowed sender and hasn't
changed since. A forged email can't carry a valid seal from our domain's
Hostinger key. Replaying a genuine email is harmless (idempotent upsert).

Still to confirm with real emails: Primal Res (`c=relaxed/simple` body) and
Hotelo (`c=relaxed/relaxed`) forwarded through the filter.

Unforwarded samples saved from the mailbox pass direct DKIM for Primal Res.
Hotelo's Google Workspace signatures carry a **7-day expiry** (`x=`), so an
old Hotelo email can't be re-verified directly later. Live processing happens
within seconds, and the ARC attestation records the result at arrival.

## 4. Data model (Upstash Redis, EU region)

`gaRes:<normalisedConfirmationNumber>`:

```ts
type Reservation = {
  confirmation: string // normalised: uppercase, no '#', spaces or dashes
  channel: 'booking' | 'airbnb' | 'expedia' | 'hotelo' | 'other' | 'manual'
  property: PropertySlug // Georgia only through a manual add
  status: 'confirmed' | 'cancelled' | 'revoked'
  bookerName: string // booker's full name exactly as the platform saved it
  checkIn: string // YYYY-MM-DD (property-local date)
  checkOut: string // YYYY-MM-DD
  pax: number | null // stored for a future device limit
  sourceUpdatedAt: string // ISO; Last Update from the email, or arrival time
  accessUntilOverride?: string // ISO; admin "extend" (late checkout)
  audit: {at: string; by: 'inbound' | string; action: string}[]
}
```

Implemented in `src/lib/guest-app/store/` behind a small key-value interface
(an in-memory version for tests, Upstash in production).

- **Updates**:
  - an email applies only if its `sourceUpdatedAt` is newer than the stored
    one, so duplicates and late older emails are no-ops;
  - a booking **revoked** by the owner stays revoked whatever emails arrive;
  - an email for a stay already past retention isn't stored.
- **TTL**: the record is deleted at 00:00 Athens, 3 days after access ends
  (11:00 on `checkOut`, or a later `accessUntilOverride`).
- **Index**: the sorted set `gaRes:index` (score = deletion time) lists current
  and upcoming stays for the owner page. Expired entries are pruned on read.
- **Stored**: the booker's full name, used for matching and shown on the
  owner page.
- **Never stored**: guest email, phone, address, prices, or the raw email.
- Concurrent emails for the same booking are rare. The read-then-write isn't
  atomic, and the `sourceUpdatedAt` rule lets the next email converge the
  state.

## 5. Guest access

### 5.1 Credentials

The guest enters:

- **Booking confirmation number**: Booking.com (10 digits), Airbnb (`HM…`)
  or Hotelo (8 digits). Normalise it by trimming, uppercasing and stripping
  `#`, spaces and dashes.
- **Full name of the booker, exactly as the platform saved it** (decided
  1 Nov 2026). The stored name is Primal Res `Booked By` or Hotelo billing
  `Name`, unmodified; if the platform reformatted or stripped accents, that's
  what counts.
  - Same words, letter for letter, **accents included**.
  - Ignored: **word order** (Booking.com shows "Surname Given"), **letter
    case** and extra spaces. Hyphens are part of the word.
  - Case folding covers the Turkish dotted/dotless i (`ŞAHİN` = `Şahin`,
    `IŞIK` = `Işık`).
  - No partial names, no other guests' names, no transliteration, no fuzzy
    matching.
  - Hint shown to the guest: _"Enter your full name exactly as it appears on
    your booking confirmation email."_
  - A guest who can't match contacts the owner (WhatsApp button). The owner
    page shows the stored name; a "correct name" action may come later.

Email and phone aren't used: Booking.com provides relay addresses, and
Airbnb's email field is empty.

### 5.2 Access window (Europe/Athens)

- **Opens**: 00:00 on `checkIn`.
- **Closes**: 11:00 on `checkOut`, or `accessUntilOverride` if set.
- **Sensitive items** (lockbox/door codes) have a separate, configurable
  reveal time (default: check-in time, 15:00 on `checkIn`), because of
  turnover days. The final value is decided together with the content.
- Property times are kept per property in config: check-in 15:00, check-out
  11:00 for both.

### 5.3 Outcomes

| Situation                                          | Response                                                                                |
| -------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Booking confirmed, name matches, inside the window | Issue a session and redirect to `/guest-app/<property>`                                 |
| Before `checkIn`                                   | "Your guest app opens on <date>"                                                        |
| After the window closes                            | "Your stay has ended, thank you for staying with us"                                    |
| Cancelled or revoked                               | Generic "We couldn't find an active booking"                                            |
| Number exists but name doesn't match               | Generic not-found message plus a WhatsApp contact button. The owner can verify manually |
| Unknown number                                     | Generic "We couldn't find this booking" (don't reveal which field was wrong)            |

All copy is translated (en/el/tr/bg) under `Pages.guest-app.access` and can
be edited later.

**Form UI** (`src/app/[locale]/(guests)/guest-app/(components)/access-form.tsx`):

- Fields: **Booking number** and **Name** (Greek: _Αριθμός κράτησης_,
  _Όνομα_).
- Each field is wrapped in the shared `FormControl`
  (`src/components/shared/form-control.tsx`), whose `error` prop shows the
  message. An empty field shows _"Mandatory field"_ under it. Booking-level
  errors (not found, not yet open, ended, rate-limited, unavailable) show
  under the last field.
- **One general toast per failed attempt**, like the contact form:
  `toast.error.validation` for everything except `unavailable`, which uses
  `toast.error.api`. Never several toasts at once. Success redirects without
  a toast.
- The WhatsApp contact button appears for `not-found` and `unavailable`.
- The field hints (`fields.*.hint`) stay in the messages but aren't shown.
  The plan is an info icon next to each label that opens a tooltip or popup.
- UI polish is deferred to a full end-to-end browser review.

### 5.4 Session

- The cookie `ga_session` is `httpOnly`, `Secure` (in production builds),
  `SameSite=Lax`, with path `/`. It holds a token `v1.<payload>.<HMAC-SHA256>`
  (signed with `GUEST_APP_SESSION_SECRET`) carrying `{c: confirmation,
  p: property, exp}`, and expires when the access window closes
  (`src/lib/guest-app/session.ts`, `guest-session.ts`).
- **Every request** re-checks the Redis record, so a cancellation, revoke or
  extend takes effect immediately.
- A session only unlocks its own property (`/guest-app/<slug>`).
- The guest-app routes stay `noindex`.
- **Visibility while in development:** `GUEST_APP_HIDDEN =
  process.env.VERCEL_ENV === 'production'` (`src/lib/constants.ts`). The guest
  app returns 404 on the live site only, and works on Vercel previews and
  locally. Previews aren't password-protected (accepted: behind the verify
  page they still need a valid current booking, and they're `noindex`). The
  guards are removed at go-live.

### 5.5 Abuse protection

- Fixed-window counters in Redis (`kv.incr` with an expiry set on first use,
  keys `gaRate:*`), in `src/lib/guest-app/rate-limit.ts`:
  - **10 attempts per 15 minutes per IP**. The IP is HMAC-hashed with the
    session secret, so raw addresses are never stored.
  - **5 failed attempts per 15 minutes per booking number**. When it's
    exceeded, that number is refused for the rest of the window even with
    the right name.
- `not-found` and `name-mismatch` return the same response, so a booking
  number can't be probed.
- With rate limiting, guessing is infeasible: only 1–2 bookings are valid at
  any moment, out of 10⁸–10¹⁰ possible numbers.

### 5.6 Deferred: device limit

Cap the number of devices per booking at `pax + 2`, with an owner reset. Not
in v1, but `pax` is stored so it can be added later.

## 6. Admin authentication

- **Passwordless magic link.** The login form takes an email. If it's one of
  the **two allowlisted addresses** (env var `GUEST_APP_ADMIN_EMAILS`), we
  send a one-time link via Resend.
  - The response is the same whether or not the email is allowlisted.
  - The link token is random and single-use, stored in Redis with a
    15-minute TTL.
- **Sessions last 1 day per login and aren't extended by activity** (decided
  1 Nov 2026). A new login starts a new 1-day session.
- Sessions are **stored in Redis** (random session id → admin email, 24 h
  TTL). The `httpOnly` cookie only carries the id, so logout really ends the
  session, and all admin sessions can be cleared without touching guest
  sessions.
- Login requests are rate-limited.
- The admins' Gmail accounts become the keys to the owner page, so both
  should have 2-Step Verification enabled.

## 7. Owner page (`/[locale]/admin/guest-app`)

- **List** current and upcoming stays: channel, property, the **stored booker
  name** (so the owner can tell a stuck guest exactly what to type), dates,
  status. A "correct name" action may come later.
- **Revoke**: e.g. a cancelled direct booking with no cancellation email.
- **Add manually**: call-center bookings, missed or failed emails, Georgia.
- **Extend**: late checkout (`accessUntilOverride`).
- Every action is appended to the record's `audit` with the admin's email.
- `noindex`, and not linked from anywhere.

## 8. Privacy

- Purpose: providing the stay-related guest app (performance of the contract).
- Data is minimised (§4) and deleted automatically 3 days after checkout.
- Processors: Resend (email intake and sending; domain in `eu-west-1`),
  Upstash (`fra1`), Vercel (hosting; functions in `fra1`).
- **Resend keeps a copy of each received email for 30 days** (its data
  retention on every plan). The Resend SDK (v6.34) has no API to delete
  received emails, so they can't be removed automatically after processing;
  manual deletion in the dashboard may be possible. Our store keeps only the
  fields in §4.
- Add a privacy-policy paragraph in all four locales.

## 9. Alerts

- Sent to the developer only (env var `GUEST_APP_ALERT_EMAIL`), via Resend.
- Triggers: a reservation-looking email that fails to parse, an unknown
  property name, or a DKIM failure.
- No daily summaries for now.

## 10. Configuration

| Env var                                      | Purpose                                                                        |
| -------------------------------------------- | ------------------------------------------------------------------------------ |
| `RESEND_API_KEY`                             | Existing. Sending email and the Receiving API                                  |
| `RESEND_INBOUND_WEBHOOK_SECRET`              | Svix signing secret for the inbound webhook                                    |
| `GUEST_APP_INBOUND_ADDRESS`                  | The random inbound address (sanity check on the recipient)                     |
| `GUEST_APP_SESSION_SECRET`                   | Signs the guest and admin cookies                                              |
| `GUEST_APP_ADMIN_EMAILS`                     | Comma-separated allowlist (2 addresses)                                        |
| `GUEST_APP_ALERT_EMAIL`                      | Alert recipient                                                                |
| `GUEST_APP_REDIS_KV_REST_API_URL` / `_TOKEN` | Upstash Redis (`mocca-guest-app`, Vercel Marketplace prefix `GUEST_APP_REDIS`) |

Environments (1 Nov 2026):

- `GUEST_APP_SESSION_SECRET` has **different values for Production and for
  Preview + Development**.
- `RESEND_INBOUND_WEBHOOK_SECRET` is Preview + Development only until
  go-live.
- The Redis variables are Production + Preview, marked sensitive.
- `GUEST_APP_ADMIN_EMAILS` is added in step 4.
- The local `.env` (git-ignored) mirrors the Preview values.
- The function region is **Frankfurt (`fra1`)** only.

**There is one Upstash database**, shared by production, previews and local
runs.

Dashboard and DNS changes (Resend, Vercel DNS, Upstash, env vars, Hostinger
filter) are made manually from step-by-step instructions.

## 11. Testing

- Vitest (`pnpm test` → `vitest run`). It runs in the Husky `pre-push` hook.
  No CI workflow yet.
- Fixtures are synthetic emails modelled on the real templates, with
  **invented** names, numbers and contacts. No real guest data goes in the
  repository.
- Covered:
  - both parsers, including cancellations;
  - localised Hotelo dates;
  - exact property mapping (including a Georgia-like name);
  - full-name matching (accents, word order, case, Turkish i);
  - the access window across DST changes and at the 11:00 checkout boundary;
  - the `Last Update` ordering rule.
- Known gap: Renovate dependency updates don't run the hook. Add a
  (non-blocking) workflow later.

**Manual test booking.** Until real reservations arrive, a test record can be
inserted from the Upstash console CLI in the stored format. Set `EXAT` to
00:00 Athens, 3 days after checkout, and add it to the index:

```
SET gaRes:TEST2026 '{"confirmation":"TEST2026","channel":"manual","property":"mocca-city","status":"confirmed","bookerName":"Tester Test","checkIn":"<YYYY-MM-DD>","checkOut":"<YYYY-MM-DD>","pax":2,"sourceUpdatedAt":"<ISO>","audit":[{"at":"<ISO>","by":"<admin email>","action":"added manually (test)"}]}' EXAT <epoch seconds>
ZADD gaRes:index <same epoch seconds> TEST2026
```

Remove it with `DEL gaRes:TEST2026` and `ZREM gaRes:index TEST2026`. Records
written in an older format (e.g. before `bookerName`) must be re-inserted.

## 12. Build order

1. **Intake spike** ✅ (31 Oct 2026).
   - `reservations.moccaliving.com` added to Resend (receiving, `eu-west-1`),
     with MX in Vercel DNS.
   - Hostinger filter created (with a temporary test condition for the
     developer's Gmail).
   - Raw MIME available; DKIM breaks on forwarding, so origin is verified via
     ARC (§3.3).
2. **Parsers + storage + webhook** ✅ (31 Oct 2026).
   - Vitest, fixtures, parsers, origin verification, the Redis store, the
     inbound route and alerts.
   - Upstash `mocca-guest-app` (`fra1`) is connected.
   - The Resend webhook (`email.received`) points at the branch preview.
     Verified end to end with a forwarded test email: the ARC seal checked
     out, and the sender was ignored as not allowed.
   - Still to see: the first real reservation stored.
3. **Guest access** ✅ (31 Oct – 1 Nov 2026).
   - Verify page, server action, rate limiting, session cookie, property and
     window checks, translations.
   - Full-name matching; `FormControl` errors and a single toast.
   - The guest app is visible on previews (`VERCEL_ENV`).
   - Verified on the preview with a manual test booking (correct and wrong
     name, other property, number formatting).
4. **Owner page.** Magic-link login, list, revoke, add, extend, audit.
5. **Privacy policy** update.
6. **Content** (separate design, once the owner finalises it), then remove
   the production 404 guards.
7. **Go-live.**
   - Change the existing Resend webhook's URL to
     `https://www.moccaliving.com/api/guest-app/inbound`. The free plan
     allows only one endpoint, so don't add a second one.
   - Add `RESEND_INBOUND_WEBHOOK_SECRET` for Production.
   - Remove the temporary Gmail condition from the Hostinger filter.

Resend free plan limits to keep in mind: received emails count towards the
100/day and 3,000/month email quota (shared with the contact form and
alerts); 3 inboxes; 1 webhook endpoint.

## 13. Open items

- Does Hotelo send cancellation or modification emails for direct bookings?
- What does a Primal Res modification email look like?
- Are Hotelo emails ever localised (en/el/tr/bg)?
- Confirm the §3.3 ARC attestation with the first real Primal Res and Hotelo
  emails forwarded through the filter.
- After 22 Nov 2026: do revplus reservation emails keep the same sender and layout?
- When Georgia gets a listing: add its exact property name(s) to the mapping.
- Watch for a Resend API to delete received emails (they're kept 30 days).
