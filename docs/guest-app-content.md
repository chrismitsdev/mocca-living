# Guest app: content

What guests see after signing in (`/[locale]/guests/<property>`). Access,
sessions and the admin are in `docs/guest-app-access.md`.

Status (22 Nov 2026): round 1 built on branch `feat/guest-app-content`, to be
reviewed by the owner on the preview. Text marked **draft** below is ours and
waits for the owner's corrections.

## Sources

The owner's material sits in the untracked `guest-app/` folder at the repo
root, excluded through `.git/info/exclude` (it holds the Wi-Fi passwords and
private photos; the repo is public). It contains:

- a wireframe of the wanted features (`ai-wireframe.jpeg`);
- a 13-device guide for Mocca by the Sea · Dimitra (PDF, English);
- photos of the Mocca City appliances;
- the Wi-Fi passwords.

## Round 1 (built)

Every page calls `requireGuest(locale, slug, subpath)`
(`src/lib/guest-app/require-guest.ts`): hidden in production, signed-out
visitors go to `/guests`, a guest of another property goes to the same page
of their own property.

The sections, their order and icons are in
`src/lib/guest-app/content/sections.ts`, shared by the home tiles and the
subpage headers. Check-out stays last; new sections go before it.

Subpage header (`SubpageHeader`): on phones, a back icon button and the
centred title on one row, then the section's (or device's) icon; from `sm`,
a "‹ Πίσω" button above a left-aligned title. Page content spans the full
container width. The layout is at least one screen tall, so the site's logo
page transition never shows its black backdrop under a short page.

Page transitions (22 Nov 2026): inside the guest app a sideways slide
(`SlidePageTransition`) replaces the site's `LogoPageTransition`, which now
only plays on the way in and out (it treats `/guests/*` as one page). Both
are in `src/components/shared/page-transition/`. Going deeper (by URL depth) the new page slides in from the
right over the current one, which drifts 30% left and dims; going back
(link, browser or phone) the reverse. The leaving page stays where it was
on screen even when the window scroll jumps (to the top going deeper, or
back down when the browser restores a scrolled page). 0.5 s, ease-in-out
(`[0.4, 0, 0.2, 1]`); the header stays still; no animation with "reduce
motion".

| Route (`/guests/<property>/…`) | Content                                                                                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| (home)                         | Welcome over the property's cover photo (`public/images/covers`), then four tiles: Wi-Fi, Συσκευές, Τηλέφωνα, Αναχώρηση                         |
| `wifi`                         | Network name and password (tap to select), copy button: Clipboard API on HTTPS, a selection fallback on plain http, an error toast if both fail |
| `devices`                      | List of devices: icon, name, model, chevron                                                                                                     |
| `devices/<id>`                 | Name with the model under it, the device icon, "Περιγραφή", four numbered steps, safety, cleaning                                               |
| `check-out`                    | "Η αναχώρησή σας": end of access (so an extension shows), then the checklist                                                                    |
| `emergency`                    | "Τηλέφωνα": 112, Police 100, Fire 199, Ambulance 166, Coast Guard 108 (tap to call)                                                             |

- **Text** is in `messages/*.json` under `Pages.guest-app` (`home`,
  `sections`, `wifi`, `devices`, `check-out`, `emergency`, `device-guides`).
  Turkish and Bulgarian are drafts until a native speaker reviews them.
- **Devices**: order and icon per property in
  `src/lib/guest-app/content/devices.ts`; text per device (name, model,
  description, step-1 to step-4, safety, cleaning) under
  `Pages.guest-app.device-guides.<property>.<id>`. Steps are numbered with
  `IconSquareNumber1`–`4`.
  - **Icons only, no photos** (decided 22 Nov 2026). The owner's pictures
    were a mix of AI product renders and phone photos, which looked
    unfinished. Images found online are copyrighted shop photos in different
    styles, and no brand press kits were found. Tabler icons replace them;
    some are near matches (hood `IconWind`, safe `IconLock`, air fryer and
    dishwasher `IconToolsKitchen2`, oven `IconChefHat`). Photos come back
    only with consistent material, e.g. a professional shoot of each
    property's appliances; they would then replace the icons.
  - Dimitra: the 13 devices of the owner's PDF, text from it.
  - No video or guide links (removed 22 Nov 2026): most of the PDF's links
    were YouTube searches, not specific videos.
  - Mocca City (**draft**): 11 devices identified from the owner's photos
    (Fujitsu AC, TCL TV, De'Longhi Nespresso, Arzum Okka Minio Jet, Gruppe
    kettle, Pitsos oven and dishwasher, Candy microwave, Life grill,
    Whirlpool fridge, Hisense washer-dryer); steps are written from the
    brand and model. Plus the Yale safe, the same model as in Dimitra
    (confirmed 22 Nov 2026), with Dimitra's text: 12 devices.
  - Some photos in the Mocca City folder are the Dimitra product shots
    (Marshall, Candy hob and washer, Essenza, LG, Davoline); left out until
    the owner confirms. The Yale safe is confirmed for both. A Marshall-like speaker shows in the Mocca City
    TV photo, and the kitchen has a hob not covered yet.
- **Wi-Fi** comes from env variables, never the repo:
  `GUEST_APP_WIFI_<KEY>_NETWORK` and `GUEST_APP_WIFI_<KEY>_PASSWORD`, with
  `<KEY>` = `DIMITRA` or `MOCCA_CITY` (`guestAppEnv.wifi`). Without
  a password the page asks the guest to contact us; without a network name
  only the password shows. Dimitra's network is `mocca living`; the Mocca
  City name in the local `.env` still needs the owner's confirmation.
- **Check-out checklist** (**draft**): belongings, switch things off, close
  windows, leave the keys as agreed.
- **Τηλέφωνα**: emergency numbers only. The host's WhatsApp, call and email
  links were removed (22 Nov 2026).
- **Lockbox codes**: not in the app (owner's decision, 22 Nov 2026).

## Later rounds

- Map sections: pharmacies, places to eat, attractions, parking, ATMs. Leaflet
  is already used on the contact page; the owner must provide the places (the
  wireframe's places are placeholders).
- EUR/TRY converter: daily ECB rates (e.g. Frankfurter API). Bulgaria uses the
  euro, so it's mainly for Turkish guests.
- Border wait times (Kipoi, Kastanies): no reliable public source found yet.
- Not planned: music player, key box. Wooden gym only if there are videos.

## Questions for the owner

- Which Mocca City devices are wrong or missing (speaker, hob)?
- Mocca City Wi-Fi network name (confirm the one we use).
- Corrections to the device steps, the check-out checklist and the phone
  numbers.
- Real videos of the devices, if any (links were removed for now).
