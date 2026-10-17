/**
 * Optimisation workflow for client photographs.
 *
 * 1. Drop the client's original JPG/PNG/HEIC files into assets-source/
 *    (git-ignored — originals are never committed).
 * 2. Run: npm run optimize-images
 *
 * Files are resized and written as WebP into the matching public/assets/
 * folder. Naming convention decides the destination:
 *
 *   assets-source/hero/<name>.jpg        -> public/assets/hero/<name>.webp
 *   assets-source/victories/<name>.jpg   -> public/assets/victories/<name>.webp
 *   ...same for teams, history, leadership, development, gallery,
 *      branding, affiliations, placeholders
 *
 * Pass --dry-run to preview without writing.
 */
import { readdir, mkdir, stat } from "node:fs/promises";
import { extname, join, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(ROOT, "assets-source");
const TARGET = join(ROOT, "public", "assets");
const DRY = process.argv.includes("--dry-run");

const ALLOWED_INPUT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".tif", ".tiff"]);
const FOLDERS = [
  "branding",
  "hero",
  "victories",
  "teams",
  "history",
  "leadership",
  "development",
  "gallery",
  "affiliations",
  "placeholders",
];

/** Per-folder output constraints: [maxWidth, maxHeight, quality]. */
const SPECS = {
  hero: [2400, 1500, 80],
  victories: [1600, 1600, 82],
  teams: [1600, 1600, 82],
  history: [1400, 1400, 82],
  leadership: [1200, 1500, 84],
  development: [1400, 1400, 82],
  gallery: [1400, 1400, 82],
  branding: [800, 800, 90],
  affiliations: [800, 800, 90],
  placeholders: [1600, 1600, 82],
};

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function main() {
  let sourceExists = true;
  try {
    await stat(SOURCE);
  } catch {
    sourceExists = false;
  }

  if (!sourceExists) {
    console.log(
      [
        "assets-source/ does not exist yet.",
        "",
        "To use this workflow:",
        "  1. mkdir assets-source",
        "  2. copy the client's photos into assets-source/<folder>/",
        `     folders: ${FOLDERS.join(", ")}`,
        "  3. npm run optimize-images",
      ].join("\n"),
    );
    return;
  }

  let count = 0;
  for await (const file of walk(SOURCE)) {
    const ext = extname(file).toLowerCase();
    if (!ALLOWED_INPUT.has(ext)) continue;

    const relFolder = basename(dirname(file));
    const folder = FOLDERS.includes(relFolder) ? relFolder : "placeholders";
    const [maxW, maxH, quality] = SPECS[folder] ?? SPECS.placeholders;

    const out = join(TARGET, folder, `${basename(file, ext)}.webp`);
    if (DRY) {
      console.log(`→ ${file} => ${out}`);
      count += 1;
      continue;
    }

    await mkdir(dirname(out), { recursive: true });
    await sharp(file)
      .rotate()
      .resize({ width: maxW, height: maxH, fit: "inside", withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(out);
    console.log(`✓ ${folder}/${basename(file, ext)}.webp`);
    count += 1;
  }

  console.log(DRY ? `\n${count} file(s) would be written.` : `\n${count} file(s) written to public/assets/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
