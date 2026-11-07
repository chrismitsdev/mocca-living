# Guest app: handoff

Temporary file for moving work on `feat/guest-app-access` to another
machine (8 Nov 2026). Delete it once work has resumed there.

**Agent reading this:** read `docs/guest-app-access.md` next. It is the
source of truth for requirements, architecture, decisions, testing (§11),
build order (§12) and open items (§13). This file only adds the current
status and how to work on the project. If the user also hands you the
private handoff notes, save their contents to your memory for this project.

## Status

- Branch `feat/guest-app-access`. All work through commit `66f905e`
  (`feat(guest-app): admin dashboard with add and revoke access`) is pushed.
  No PR is open yet.
- Steps 1–3 (email intake, parsing, storage, guest access) are built and
  passed the §11 preview checklist on 31 Oct 2026.
- Step 4 (admin): magic-link login, dashboard (desktop table and mobile
  list from one `BookingRow` model in
  `src/app/admin/dashboard/(components)/booking-row.ts`), revoke, and
  "Προσθήκη πρόσβασης" are done. Adding access was tested by the user in the
  browser on 6 Nov 2026.
- 101 tests pass. They run only in the Husky pre-push hook (no CI yet).

## Next

1. **Preview check.** The user runs the §11 admin checklist on the branch
   preview (login link, list, add access, revoke, logout, rate limit), and
   the guest checklist again, because the guest URLs moved to `/guests`.
2. **Extend** ("Παράταση πρόσβασης", late checkout), as its own commit. The
   button is a placeholder today. Reuse `Calendar`
   (`src/components/ui/calendar.tsx`), the `dateString()` check
   (`src/lib/guest-app/admin/actions.ts`) and the `isChangeable` rule
   (`src/lib/guest-app/store/reservations.ts`). New: an Athens-local time field, and the rule that the new end must
   be later than the current access end. It writes `accessUntilOverride` and
   an audit entry with the admin's email.
3. Open the PR once the user says so.

## Open questions (not blocking)

- **Undo a revoke:** the user is asking the owner whether it's needed. If
  yes, do the safe version before go-live: make revoke a separate
  `revokedAt` flag (the stored status stays the platform's latest, and
  emails keep applying while revoked), not a status flip back to confirmed.
  Until decided, the revoke dialog's "δεν αναιρείται" wording stays.
- **Reservation number in "Προσθήκη πρόσβασης":** stays a required
  free-text field for now. Possible later: optional, with the server
  generating a code like `ML-7K4Q9P` (no look-alike characters, can't clash
  with platform formats), shown in the success toast and the table.

## How to work on this project

- Build the access mechanism before the content. Don't polish the UI
  unprompted; the user does a full browser review.
- Never include the user's in-progress UI edits in a commit unless asked.
- Commit or push only when the user asks. Conventional commits, scope
  `guest-app`.
- Keep `docs/guest-app-access.md` up to date with every decision.
- Call the management area **admin** (admin page, admin actions), never
  "owner page". The property owner is still "the owner" as a person.
- Explicit names: `reservationNumber` (never `confirmation`), Redis keys
  `guestAppReservation:<n>`, `guestAppReservationIndex`,
  `guestAppRateLimit:*`.
- UI copy is about guest-app **access**, not bookings: the page heading is
  "Πρόσβαση επισκεπτών", never "κρατήσεις". The dialog labels match the
  table columns ("Αριθμός κράτησης", "Ονοματεπώνυμο").
- Admin URLs are plain strings (no `paths.ts`); the admin lives outside
  `[locale]` in `src/app/admin/`.
- `RETENTION_DAYS` stays 3 (user decision).
- The user makes every dashboard and DNS change (Vercel, Resend, Upstash,
  Hostinger) from step-by-step instructions.
- `main` requires the `Vercel`, `renovate/stability-days` and
  `renovate/artifacts` checks. The renovate checks never report on the
  user's own PRs, so they show as BLOCKED; that's expected. Merge with
  `gh pr merge <n> --admin --merge`. Don't suggest removing the checks.

## Machine setup

```sh
git switch feat/guest-app-access
corepack enable && pnpm install   # pnpm version pinned in package.json; also installs the Husky hook
```

Copy the git-ignored `.env` by hand (it mirrors the Preview values; the
variable names are in `docs/guest-app-access.md` §10). Sensitive Vercel
variables can't be pulled with `vercel env pull`.
