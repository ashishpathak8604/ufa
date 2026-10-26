# CLIENT VERIFICATION CHECKLIST

This document lists every unverified fact, image, and policy placeholder that must be replaced or confirmed by the Uttarakhand Football Association before going live. Development builds show small "Placeholder"/"Needs verification"/"Sample data" markers for these items; production builds suppress markers but the content remains unverified.

Each line must be checked off by the client. Where possible, replace via `src/content/site.ts` (copy) and `public/assets/` (photographs).

## 1) Brand identity

- [ ] **Logo / wordmark** — `src/content/site.ts#site.logo` (`/assets/branding/ufa-logo.svg`) — replace with the official UFA logo (SVG with transparency). Confirm correct alt text.
- [ ] **Favicon** — `src/app/icon.svg` — replace with the official mark if preferred. Current is a development placeholder.

## 2) Site-wide metadata

- [ ] **Site URL** — set `NEXT_PUBLIC_SITE_URL` in deployment (e.g. `https://ufa.example.org`). Do **not** commit this value. It affects Open Graph, Twitter, and `sitemap.ts`/`robots.ts` base URLs.
- [ ] **Open Graph/Twitter image** — `public/assets/placeholders/og-cover.webp` — replace with an appropriate 1200×630 image.

## 3) Hero (section 5B)

- [ ] **Hero image** — `src/content/site.ts#hero.image` — confirm the photograph and alt text (`"Football match in progress..."`). Replace file at `public/assets/hero/uttarakhand-football-hero.webp` (16:9, ≥2400px wide). 
- [ ] **Eyebrow/headline/body/CTAs** — `hero.*` — confirm exact wording. The screenshot used "ONE STATE. / ONE PASSION. / ONE GAME." as a layout; treat as placeholder.
- [ ] **Primary/secondary CTAs targets** — confirm destinations (currently `#achievements`, `#membership`).

## 4) Affiliation ribbon (section 5C)

- [ ] **Affiliation text** — `src/content/site.ts#ribbon.parts` — confirm AIFF affiliation wording. **No** claim of direct FIFA affiliation is made. 
- [ ] **Verify official affiliation status** — mark as verified only if provided in writing.

## 5) Winning gallery "Our proudest moments" (section 5E)

For each slide (`src/content/site.ts#gallerySlides`, 4 items):
- [ ] **Tournament name** (e.g. "Santosh Trophy" etc.) — do **not** copy from screenshot unless confirmed. Replace with verified names.
- [ ] **Year / season** — verify dates/years.
- [ ] **Title / achievement** — verify champions/runners-up/squad honours.
- [ ] **Description** — replace with an accurate, concise description (no invented statistics).
- [ ] **Images** — `public/assets/victories/championship-celebration-*.webp` (4:3 1600×1200). Provide correct alt text.
- [ ] **Overall verification** — set `verified: true` per item once confirmed.

## 6) Match Centre + Official Notices (section 5F)

**Match Centre (mock data)** — `src/content/site.ts#matches`, `#standings`
- [ ] **Fixtures** — competition, home/away, date, kick-off, venue. All are sample data and labelled as such; do not treat as live/real.
- [ ] **Results** — scores/minutes/status — to be supplied if publishing results; leave as placeholders otherwise.
- [ ] **Standings** — table caption/rows — confirm if the compact standings should be shown at all. May be removed if not required.
- [ ] **"Sample data" notice** — acceptable to keep in development; may be removed/replaced in production copy.

**Official Notices (integration seam for Jagdeep)**
- [x] **Contract review** — implemented: `Notice.fileName` added; `url` carries the resolved PDF link; real data arrives via the `lib/notices.ts` database source.
- [ ] **Notice links** — PDFs or internal links must be https (dev allows http). Use `lib/safe-url.ts` for all hrefs.
- [ ] **"View all circulars" link** — destination placeholder (`#notices`) — confirm final route.
- [ ] **Sample data** — `lib/notices.ts` returns clearly flagged `isSample: true` in development; production returns empty via seam. Jagdeep replaces implementation.

## 7) Leadership (section 5G)

For each leader (`src/content/site.ts#leaders`, 3 items):
- [ ] **Name** — "Name to be confirmed" — replace with full, correct names.
- [ ] **Designation** — replace with verified titles (e.g. President, Secretary, Treasurer) — do not invent.
- [ ] **Quote** — replace with an authorised quotation. The supplied quotes are institutional and generic.
- [ ] **Portraits** — `leadership/leader-*-portrait.webp` (4:5, 1200×1500). Thumbnails `*-thumb.webp` (4:5, 480×600). Use descriptive alt text.
- [ ] **Verification** — set `verified: true` per item.

## 8) Our Journey through time (section 5H)

For each milestone (`src/content/site.ts#journeyEntries`, 5 items):
- [ ] **Year** — currently "Year TBC". Replace with correct years (or range) — do not copy screenshot years unless confirmed.
- [ ] **Title** — confirm milestone titles and their order.
- [ ] **Description** — accurate, factual descriptions. Remove invented "founded in..." claims if not documented.
- [ ] **Images** — `public/assets/history/association-milestone-*.webp` (4:3, 1200×900). Provide correct alt text (archive photos).
- [ ] **Verification** — set `verified: true` per item.

## 9) Membership (section 5I)

- [ ] **Intro/leads** — confirm membership purpose and tone.
- [ ] **Pathways** — 4 generic categories: player registration, coach education, referee pathway, club affiliation. Replace titles/descriptions with accurate ones.
- [ ] **Apply button URL** — `membership.applyUrl` — currently `#contact`. Confirm final URL (form/page/email).
- [ ] **Fees, eligibility, process** — must be supplied; none are published here (explicitly marked).
- [ ] **Image** — `gallery/membership-pathway.webp` (4:3, 1200×900). Confirm alt text.
- [ ] **Verification** — set `imageVerified: true` and per pathway `verified: true`.

## 10) Football development (section 5J)

For each card (`src/content/site.ts#development.cards`, 3 items):
- [ ] **Title/description** — confirm grassroots/youth, women’s participation, coach and referee development. Do not add statistics.
- [ ] **Images** — `development/grassroots-football.webp`, `women-participation.webp`, `coach-referee-development.webp` (4:3, 1200×900).
- [ ] **Verification** — set `verified: true` per item.

## 11) Affiliations and partners (section 5K)

- [ ] **Affiliations list** — currently includes a single AIFF placeholder (`aiff`). Confirm exact name, status note, and whether AIFF logo is to be shown. The logo file at `affiliations/aiff-affiliation-placeholder.svg` must be replaced with an official (or appropriately licensed) logo.
- [ ] **Partners/sponsors** — `affiliations.sponsors` is **empty by design**. Do **not** populate with invented sponsors. Only add real commercial partners with written approval; if none, leave empty (sponsors block is omitted).
- [ ] **Verification** — set `verified: true` per affiliation only when confirmed.

## 12) Footer (section 5L)

- [ ] **Short introduction** — confirm association description.
- [ ] **Office bearers** — President/Secretary/Treasurer names and titles. All are placeholders.
- [ ] **Contact** — Address, Phone, Email. Currently "… to be confirmed". Never fabricate.
- [ ] **Socials** — URLs for X/Facebook/Instagram/YouTube. Placeholder `https://example.com/ufa` — replace with real handles/URLs (validated via `lib/safe-url.ts`).
- [ ] **Policies** — Privacy and Terms pages exist as placeholders (`/privacy`, `/terms`). Replace with association-approved policy text before publication.
- [ ] **Copyright** — uses current year at build; fine as-is.

## 13) Content hygiene (global)

- [ ] **Copy tone** — remove any remaining marketing exaggeration if added later; prefer natural, institutional, concise.
- [ ] **Unverified items sweep** — search `src/content/site.ts` for `verified: false`, `isSample: true`, and placeholder strings ("to be confirmed", "TBC", "Sample data"). Replace with confirmed values.
- [ ] **Development markers** — in development, "Placeholder", "Needs verification", "Sample", "Sample data" badges appear. Production (`NODE_ENV=production`) suppresses these. Verify behaviour at build time.
- [ ] **No facts invented** — history/dates/competition names/titles/statistics/affiliation status/contact details/leadership statements/sponsors must not be published unless confirmed.

## 14) Assets / media

- [ ] **Replace all placeholders** — overwrite files in `public/assets/` with client photos or approved logos (matching filenames/paths). See `public/assets/README.md`.
- [ ] **Use optimiser** — drop originals into `assets-source/` (git-ignored) and run `npm run optimize-images` to produce WebP. 
- [ ] **Alt text** — all informative images must have accurate, descriptive alt text in `src/content/site.ts`.
- [ ] **Decorative images** — thumbnails marked with `alt=""` (e.g. leadership thumbnails) — confirm this is acceptable.
- [ ] **File sizes** — hero < ~300KB, others < ~150KB, SVGs minimal. Run a quick size check after replacement.

## 15) Integration contract (Jagdeep)

- [x] **Notice type agreement** — implemented: `Notice.fileName` added and `url` carries the resolved PDF link.
- [x] **Seam implementation** — implemented: `lib/notices.ts#createDatabaseSource()` returns real database `Notice[]` records. Landing page never does DB/auth/upload work.
- [ ] **Props-only components** — `NoticeBoard` and `AnnouncementStrip` accept props only; no data fetching in them.
- [ ] **Safe URLs** — all externally supplied hrefs go through `safeUrl()`; links open with `rel="noopener noreferrer"` when external.
- [ ] **States** — loading/empty/error states for notices are implemented; confirm UX expectations.
- [ ] **Environment** — `.env.example` lists placeholders; real keys are Jagdeep’s responsibility (never put secrets in `NEXT_PUBLIC_*`).
- [ ] **Backend security boundary** — frontend checks are never a substitute for backend authorisation (stated in handover).
- [ ] Confirm notice category list and 4 MB PDF-only policy with the client.

## Verification status

- Verified by client: ___________ (name/title)
- Date: ___________
- Notes: ___________

---
*Generated by the UFA landing page build. Keep this file up to date as items are confirmed/replaced.*
