# Handoff: guest-app access

For an agent picking this work up on another machine. Status as of 16 Nov
2026. Read this, then `docs/guest-app-access.md`: the spec is the source of
truth for requirements, architecture, decisions, testing (§11), build order
(§12) and open items (§13). This file adds what changed in the last sessions
(11–16 Nov 2026), what's pending, and how the user likes to work. Once you're
up to speed, delete this file and commit the deletion (ask the user first).

The repo is **public**. Private details (admin emails, the inbound address,
webhook ids, the preview URL, test records) are not written anywhere in the
repo, and the previous agent's memory notes stay on the old machine. Ask the
user for any of them when you need them. Never write them into the repo.

## Status

- Branch `feat/guest-app-access`, pushed. No PR yet: open one only when the
  user asks.
- Steps 1–3 (email intake, parsing, storage, guest access) are built and
  passed the §11 guest checklist on 31 Oct 2026.
- Step 4 (admin) is built: magic-link login, dashboard, "Προσθήκη
  πρόσβασης", "Παράταση πρόσβασης" (extend) and "Ανάκληση πρόσβασης"
  (revoke). It still needs the §11 admin checklist on the Vercel preview.
- 116 tests pass. They run only in the Husky pre-push hook (no CI), together
  with `next typegen`, `tsc`, Biome and the Eloqnt translation lint.

## Changes, 11–16 Nov 2026 (in commit order)

1. **Cookies renamed** (`refactor(guest-app)`): `guest_app_session` →
   `GUEST_SESSION` (`src/lib/guest-app/guest-session.ts`) and
   `guest_app_admin_session` → `ADMIN_SESSION`
   (`src/lib/guest-app/admin/admin-session.ts`). Upper case matches
   `NEXT_LOCALE`. Everyone had to sign in again once.
2. **Property select arrow keys** (`fix(admin)`): `PropertySelect` in
   `add-access-dialog.tsx` rendered its items without `SelectViewport`.
   Radix registers items for keyboard navigation inside the Viewport, so the
   arrow keys did nothing. Wrapped them in `SelectViewport`, like the locale
   switcher.
3. **Clicks during a dialog's closing animation** (`fix(ui)`): Radix keeps
   the content mounted until the exit animation ends and sets an inline
   `pointer-events: auto`, so a click during the fade opened a select or date
   popup inside the closing dialog. `DialogContent`
   (`src/components/ui/dialog.tsx`) now has
   `data-closed:pointer-events-none!` (the `!` beats the inline style). Clicks
   fall through to the overlay, which ignores them.
4. **Property select border** (`style(admin)`): the trigger gets
   `not-data-placeholder:border-surface-4`, so it shows a border once a
   property is chosen, like filled inputs. Rule order was checked by
   compiling with the project's Tailwind: selected < error (`aria-invalid`) <
   open (`data-open`). The user also switched `data-[state=open]` to the
   project's `data-open` variant.
5. **Channels** (`refactor(guest-app)`): Expedia removed everywhere (type,
   Primal Res mapping, labels, spec). Any Primal Res channel other than
   Booking.com or Airbnb is `other`. The manual channel `manual` became
   `admin`. "Προέλευση" labels (`labels.ts`): Booking.com, Airbnb, Hotelo,
   Άλλο, Διαχειριστής. The audit text "added manually" and function names
   like `addManualReservation` were kept on purpose.
6. **Guest sessions tied to the record** (`fix(guest-app)`): the session
   token is now `v3` and carries `recordCreatedAt`, the record's first audit
   entry (`recordCreatedAt()` in `src/lib/guest-app/store/reservations.ts`).
   `windowDecision` returns it, and `getActiveGuest` requires it to match.
   Why: a cookie only held the number and property, so deleting a booking and
   adding it again under the same number (likely with numbers the owner makes
   up) let the old cookie into the new guest's stay. Email updates and
   extensions keep the value; re-adding changes it. `v2` tokens are rejected.
   Tests added. Verified by the user on localhost (re-added booking needs a
   fresh sign-in; wrong property redirects to the guest's own).
7. **Dashboard columns** (`refactor(admin)`): "Διαμονή" and "Λήξη" were
   replaced by "Έναρξη πρόσβασης" and "Λήξη πρόσβασης", both date and time,
   both from `accessWindow` (the guest app's own function), "—" for
   cancelled or revoked. `BookingRow` has `accessStarts` instead of
   `checkIn`/`checkOut`. An extended booking's original departure is no
   longer shown (it's in the record and audit; accepted). `format.ts` now
   has only `formatDateTime`, with `hourCycle: 'h23'` (Greek default is
   12-hour with π.μ./μ.μ.; `h24` would show midnight as 24:00).
8. **Add-access dialog description** (`docs(admin)`): added "Η πρόσβαση
   ανοίγει στις 00:00 την ημέρα άφιξης και λήγει στις 11:00 την ημέρα
   αναχώρησης." The 11:00 is written into the text; all three properties
   check out at 11:00 (`PROPERTY_TIMES`).
9. **Real Hotelo email confirmed** (`docs(guest-app)`): a non-reservation
   Hotelo email (a review request) was forwarded on 10 Nov 2026. The preview
   answered `{"status":"ignored","reason":"no booking reference"}` with 200,
   which means it passed the ARC origin check first. §13 now only waits on a
   real Primal Res email.
10. **Dialog labels and buttons** (`style(admin)`, 16 Nov 2026):
    - Add access: the date range label is "Ημ. έναρξης/λήξης πρόσβασης";
      on phone width the two native inputs are "Ημ. έναρξης πρόσβασης" and
      "Ημ. λήξης πρόσβασης". The order error is "Η λήξη πρέπει να είναι μετά
      την έναρξη." (`src/lib/guest-app/admin/actions.ts`). The description
      sentence above still says άφιξη/αναχώρηση on purpose.
    - Extend access: "Ημ. λήξης πρόσβασης" and "Ώρα λήξης πρόσβασης".
    - Submit buttons in the add, extend and revoke dialogs are text only.
      The icons stay on the buttons that open the dialogs.
11. **Lockfile refresh** (`chore(deps)`): the user's `pnpm-lock.yaml` update
    (Vercel AI SDK patch versions).

The spec was updated with each change (§4, §5.4, §7, §11, §12, §13).

## Pending

1. **Preview checklists (user)**: the §11 admin and guest checklists on the
   preview, plus the changes above: arrow keys in the property select, no
   popups when clicking a closing dialog, the select border, Προέλευση labels,
   the two access columns in 24-hour time, the new dialog labels, and a
   re-added booking needing a fresh sign-in. Sign in again first (cookie
   rename and token `v3`). Test bookings with `"channel":"manual"` must be
   re-added or edited to `"admin"`.
2. **Open the PR** when the user says so (merge rule below).
3. **Step 5**: privacy-policy paragraph in all four locales (§8).
4. **Step 6**: guest-app content, once the owner finalises it; it includes
   the code reveal time (§5.2: default 15:00, separate from the 00:00 app
   opening, which the user confirmed on 15 Nov). Then remove the production
   404 guards (`GUEST_APP_HIDDEN`).
5. **Step 7**: go-live (§12; the user has the private steps).
6. **After 22 Nov 2026**: check the first reservation email after the
   revplus launch still parses (§2.4); add `revplus.com` to the Hostinger
   filter if mail starts coming from there.
7. **GitHub Dependabot alert #82** (moderate, on `main`): not looked at.

Offered to the user, not decided (don't build unprompted):

- **Undo revoke**: waiting on the owner. If wanted, a separate `revokedAt`
  flag before go-live (§13), not a status flip.
- **Generated reservation number** for admin adds (e.g. `ML-7K4Q9P`: no
  look-alike characters, can't clash with platform formats; optional field).
  Separate from the session fix, which already covers reused numbers.
- **Time input in the extend dialog**: a native `type='time'` follows the
  device, so it may show π.μ./μ.μ. It can't be forced to 24-hour. The user
  chose to leave it (15 Nov); if it bothers the owner, replace it with a
  `Select` of 30-minute slots.
- **Past dates in the add-access calendar**: nothing is blocked in the
  picker; the server refuses stays whose access already ended. Option: block
  departure dates before today.
- **iOS empty date fields** show nothing in Safari. Option: a placeholder via
  `::before` while `:invalid`. Untested on iOS.
- **Bulgarian** "not open yet" toast ("ще се отвори на {date}") may need "в"
  before a weekday. Ask a native speaker.
- **Early check-in** (for step 6): the admin can only extend the end of
  access. A guest allowed in before 15:00 would need an earlier code reveal
  or the code sent by the owner. Also ask whether lockbox codes change
  between guests.

Deferred by the user, to review later:

- **No public link to `/admin`** (recommended: bookmark it; §7 already says
  it isn't linked; don't add it to `robots.txt` either).
- **How guests learn about the guest app before arrival** (QR codes in the
  property are separate, for during the stay). Ideas given: put a `/guests`
  link in the platforms' scheduled pre-arrival messages (Airbnb scheduled
  messages, Booking.com templates, the Hotelo email template, SMS/WhatsApp
  for admin-added bookings; ask whether revplus can message all channels).
  The message must say to type the booker's full name exactly as on the
  booking, and that access opens at 00:00 on arrival day. Optionally a
  public "Guests" link to `/guests` at go-live.

## How the user works

- Commit or push only when asked. Conventional commits, scope `guest-app`
  (or `ui`, `admin`). Split work into related commits. Never include the
  user's in-progress edits in a commit unless asked.
- The user edits files between turns. Re-read a file before changing it,
  and don't undo their changes.
- Keep `docs/guest-app-access.md` updated with every decision.
- Naming: the management area is **admin**; `reservationNumber`, never
  "confirmation"; UI copy is about **access** ("Πρόσβαση επισκεπτών"), not
  bookings. Admin is Greek only, outside `[locale]`, plain URL strings.
  Redis keys `guest:*` / `admin:*`; cookies `GUEST_SESSION` /
  `ADMIN_SESSION`; channel `admin` for admin additions.
- `RETENTION_DAYS` stays 3.
- The user makes every dashboard and DNS change (Vercel, Resend, Upstash,
  Hostinger). Give step-by-step instructions.
- The user does the UI review in the browser. Don't polish UI unprompted.
- When the user asks a question, answer it; don't change code until asked.
- `main` requires the `Vercel`, `renovate/stability-days` and
  `renovate/artifacts` checks. The renovate ones never report on the user's
  PRs, so they show BLOCKED. Merge with `gh pr merge <n> --admin --merge`.
  Don't suggest removing the checks.

## Machine notes

- Pushes from `~/Developer/personal` must use the user's personal GitHub
  account. Check `gh auth status` before `gh` commands that write.
- If the pre-push typecheck fails on `.next/dev/types/...` from another
  branch, delete `.next/dev` and push again.
- Phone testing: `allowedDevOrigins` in `next.config.ts` holds the LAN or
  hotspot IP (it changes per network). Admin login links always point to
  `localhost:3000` in dev; replace the host by hand on the phone.
- Firefox logs "Security Error … may not load or link to file:///" in dev.
  It comes from dev source maps and can be ignored.
- Vercel once missed a push without deploying. An empty commit fixed it.
