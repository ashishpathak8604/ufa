# UFA Landing Page — Asset Library

This document explains what belongs in `public/assets/`, naming conventions, recommended specs, and the workflow for adding the client's photographs.

## Folder structure

| Folder | Purpose | Typical aspect ratio |
|---|---|---|
| `branding/` | Association marks and logos | SVG (vector) preferred; if raster, square or 3:2 transparent PNG. |
| `hero/` | Large hero image shown on first load | 16:9. Export at least 2400px wide. |
| `victories/` | Championship and team celebration photos | 4:3 (1600×1200) is a safe default. |
| `teams/` | Squad and team group photographs | 4:3 (1600×1200). |
| `history/` | Archive/timeline images for Our Journey | 4:3 (1200×900). |
| `leadership/` | Portraits of office bearers and thumbnails | 4:5 portrait (1200×1500). Thumbnails 4:5 (480×600). |
| `development/` | Grassroots/women/coach-referee imagery | 4:3 (1200×900). |
| `gallery/` | Membership and general supporting images | 4:3 (1200×900). |
| `affiliations/` | AIFF and other verified logos | SVG with transparency where possible. |
| `placeholders/` | Open Graph card, generic portraits, shared placeholders | 1200×630 for OG; 1200×1500 for portrait. |

## Recommended formats and targets

- **WebP**: primary for all raster photographs (smaller, modern browser support). `next.config.ts` also allows AVIF.
- **SVG**: for logos, marks, and simple graphics. Always provide transparency.
- **File size targets**: hero under ~300KB; other photographs under ~150KB; SVGs tiny.
- **Descriptive filenames**: e.g. `hero/uttrakhand-football-hero.webp`, `victories/championship-celebration-01.webp`, `leadership/leader-01-portrait.webp`. Avoid internal codes that aren’t meaningful.

## Using the supplied placeholder set

Running `npm run placeholders` generates a neutral, labelled set in all folders above. These images are:
- local (no hotlinks, no copyrighted third-party downloads),
- clearly marked "Placeholder · replace with client photo",
- constructed with a pitch-line motif so they are obviously development-only.

**Do not** assume the photographs exist. Alt text in the data files describes what the real photo should depict. Decorative images use `alt=""`.

## Replacing placeholders with client photos

Two supported workflows:

### 1) Overwrite in place (simple)
1. Get the final photograph from the client (JPG/PNG preferred).
2. Optimise it (crop to the suggested aspect ratio, remove watermarks).
3. Convert to WebP at the target dimensions (see table above).
4. Overwrite the placeholder file with the same name in `public/assets/<folder>/`.
5. Do not change the path in the data file — the content layer in `src/content/site.ts` already references that path.

### 2) Use the optimiser (drop originals, run one command)
1. Create `assets-source/` at the repository root. This folder is **git-ignored** (originals must never be committed).
2. Copy the client’s original JPG/PNG files into `assets-source/<folder>/` matching the folder list above.
3. Run `npm run optimize-images`. It will read originals, auto-orient, resize to the folder’s max bounds (never upscales), and write `.webp` files into `public/assets/<folder>/` with the same base name.
4. For a dry run: `node scripts/optimize-images.mjs --dry-run`.

## Mapping to components

The paths are centralised in `src/content/site.ts`. Key mappings:
- **Hero**: `hero/uttrakhand-football-hero.webp` → Hero component
- **Gallery (Our proudest moments)**: `victories/*.webp` → Gallery component
- **Our Journey (timeline)**: `history/association-milestone-*.webp` → Journey component
- **Leadership**: `leadership/leader-*-portrait.webp` and `*-thumb.webp` → Leadership component
- **Development**: `development/grassroots-football.webp`, `women-participation.webp`, `coach-referee-development.webp` → Development component
- **Membership**: `gallery/membership-pathway.webp` → Membership component
- **Affiliations/partners**: `affiliations/*.svg` → Affiliations component
- **Branding**: `branding/ufa-logo.png`, `branding/ufa-og-image.jpg` → Navbar/Footer/metadata

If you rename a file, update the corresponding entry in `src/content/site.ts`. Do **not** hardcode paths inside components.

## Notes
- All references go through typed data (`src/content/site.ts`) so copy changes never require touching components.
- Unverified items are marked with a dev-only "Placeholder" badge and listed in `CLIENT_VERIFICATION.md`.
- Production builds do not show development markers.
- The optimiser never commits `assets-source/` and never overwrites outside `public/assets/`.
