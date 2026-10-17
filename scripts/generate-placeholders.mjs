/**
 * Generates local, clearly labelled placeholder images for the UFA landing page.
 *
 * Every image is an original vector-to-raster composition (olive / sage /
 * ivory panel with a pitch-line motif and a "Placeholder · replace with client
 * photo" label). Nothing here is downloaded, licensed, or third-party.
 *
 * Run: npm run placeholders
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS = join(ROOT, "public", "assets");

const PALETTE = {
  ivory: "#F7F3EC",
  sage: "#DCE5DA",
  eucalyptus: "#879B87",
  olive: "#33372F",
  gold: "#B99A62",
  warmwhite: "#FFFDF9",
  roseSoft: "#E7D3CE",
};

/** @type {Array<{ path: string, w: number, h: number, label: string, scene: string }>} */
const RASTER = [
  {
    path: "hero/uttarakhand-football-hero.webp",
    w: 2400,
    h: 1350,
    label: "Placeholder · replace with client photo",
    scene: "Hero — stadium match photograph",
  },
  { path: "victories/championship-celebration-01.webp", w: 1600, h: 1200, label: "Placeholder · replace with client photo", scene: "Victory 01 — trophy celebration" },
  { path: "victories/championship-celebration-02.webp", w: 1600, h: 1200, label: "Placeholder · replace with client photo", scene: "Victory 02 — team with medal" },
  { path: "victories/championship-celebration-03.webp", w: 1600, h: 1200, label: "Placeholder · replace with client photo", scene: "Victory 03 — squad portrait" },
  { path: "victories/championship-celebration-04.webp", w: 1600, h: 1200, label: "Placeholder · replace with client photo", scene: "Victory 04 — supporters and banner" },
  { path: "teams/association-team-photo.webp", w: 1600, h: 1200, label: "Placeholder · replace with client photo", scene: "Teams — full association squad" },
  { path: "history/association-milestone-01.webp", w: 1200, h: 900, label: "Placeholder · replace with client photo", scene: "Journey 01" },
  { path: "history/association-milestone-02.webp", w: 1200, h: 900, label: "Placeholder · replace with client photo", scene: "Journey 02" },
  { path: "history/association-milestone-03.webp", w: 1200, h: 900, label: "Placeholder · replace with client photo", scene: "Journey 03" },
  { path: "history/association-milestone-04.webp", w: 1200, h: 900, label: "Placeholder · replace with client photo", scene: "Journey 04" },
  { path: "history/association-milestone-05.webp", w: 1200, h: 900, label: "Placeholder · replace with client photo", scene: "Journey 05" },
  { path: "leadership/leader-01-portrait.webp", w: 1200, h: 1500, label: "Placeholder · replace with client photo", scene: "Leader 01 portrait" },
  { path: "leadership/leader-02-portrait.webp", w: 1200, h: 1500, label: "Placeholder · replace with client photo", scene: "Leader 02 portrait" },
  { path: "leadership/leader-03-portrait.webp", w: 1200, h: 1500, label: "Placeholder · replace with client photo", scene: "Leader 03 portrait" },
  { path: "leadership/leader-01-thumb.webp", w: 480, h: 600, label: "", scene: "Leader 01 thumbnail" },
  { path: "leadership/leader-02-thumb.webp", w: 480, h: 600, label: "", scene: "Leader 02 thumbnail" },
  { path: "leadership/leader-03-thumb.webp", w: 480, h: 600, label: "", scene: "Leader 03 thumbnail" },
  { path: "development/grassroots-football.webp", w: 1200, h: 900, label: "Placeholder · replace with client photo", scene: "Grassroots youth football" },
  { path: "development/women-participation.webp", w: 1200, h: 900, label: "Placeholder · replace with client photo", scene: "Women's football participation" },
  { path: "development/coach-referee-development.webp", w: 1200, h: 900, label: "Placeholder · replace with client photo", scene: "Coach and referee education" },
  { path: "gallery/membership-pathway.webp", w: 1200, h: 900, label: "Placeholder · replace with client photo", scene: "Membership — player registration" },
  { path: "placeholders/og-cover.webp", w: 1200, h: 630, label: "Placeholder · Uttarakhand Football Association", scene: "Social share card" },
  { path: "placeholders/portrait-placeholder.webp", w: 1200, h: 1500, label: "Portrait placeholder", scene: "Generic portrait" },
];

/** SVG files written verbatim (logos and marks keep transparency). */
const VECTOR = [
  { path: "branding/ufa-logo.svg", svg: logoSvg("UFA", "Uttarakhand Football Association") },
  { path: "branding/ufa-mark.svg", svg: logoSvg("UFA", "") },
  { path: "affiliations/aiff-affiliation-placeholder.svg", svg: markSvg("AIFF affiliation mark placeholder") },
  { path: "affiliations/sponsor-placeholder.svg", svg: markSvg("Sponsor logo placeholder") },
  { path: "placeholders/logo-placeholder.svg", svg: logoSvg("LOGO", "Client logo placeholder") },
];

function esc(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function logoSvg(wordmark, sub) {
  const subLine = sub
    ? `<text x="50%" y="72%" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="${PALETTE.eucalyptus}">${esc(sub)}</text>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" width="240" height="120" role="img" aria-label="Placeholder logo">
  <rect width="240" height="120" rx="28" fill="${PALETTE.warmwhite}"/>
  <rect x="8" y="8" width="224" height="104" rx="22" fill="none" stroke="${PALETTE.eucalyptus}" stroke-width="2" stroke-dasharray="6 7"/>
  <text x="50%" y="52%" text-anchor="middle" font-family="Arial Narrow, Arial, sans-serif" font-weight="700" font-size="46" letter-spacing="4" fill="${PALETTE.olive}">${esc(wordmark)}</text>
  ${subLine}
</svg>`;
}

function markSvg(label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 96" width="240" height="96" role="img" aria-label="${esc(label)}">
  <rect x="4" y="4" width="232" height="88" rx="24" fill="${PALETTE.sage}"/>
  <rect x="14" y="14" width="212" height="68" rx="18" fill="none" stroke="${PALETTE.eucalyptus}" stroke-width="2" stroke-dasharray="6 7"/>
  <text x="50%" y="46%" text-anchor="middle" font-family="Arial Narrow, Arial, sans-serif" font-weight="700" font-size="22" letter-spacing="3" fill="${PALETTE.olive}">PLACEHOLDER</text>
  <text x="50%" y="68%" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="${PALETTE.olive}">${esc(label)}</text>
</svg>`;
}

function panelSvg({ w, h, label, scene }) {
  const compact = w < 700;
  const titleSize = Math.round(Math.min(w, h) * 0.075);
  const sceneSize = Math.round(Math.min(w, h) * 0.042);
  const labelSize = Math.max(12, Math.round(Math.min(w, h) * 0.03));
  const inset = Math.round(Math.min(w, h) * 0.035);

  // Pitch-line motif: centre circle, halfway line, two penalty boxes.
  const cy = h / 2;
  const r = Math.min(w, h) * 0.18;
  const boxW = w * 0.16;
  const boxH = h * 0.42;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(scene)} placeholder image">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${PALETTE.sage}"/>
      <stop offset="55%" stop-color="${PALETTE.ivory}"/>
      <stop offset="100%" stop-color="${PALETTE.roseSoft}"/>
    </linearGradient>
    <pattern id="grid" width="${Math.round(w / 24)}" height="${Math.round(w / 24)}" patternUnits="userSpaceOnUse">
      <path d="M ${Math.round(w / 24)} 0 L 0 0 0 ${Math.round(w / 24)}" fill="none" stroke="${PALETTE.eucalyptus}" stroke-width="1" opacity="0.18"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#grid)"/>
  <g stroke="${PALETTE.eucalyptus}" stroke-width="${Math.max(2, Math.round(Math.min(w, h) * 0.005))}" fill="none" opacity="0.55">
    <line x1="${w / 2}" y1="0" x2="${w / 2}" y2="${h}"/>
    <circle cx="${w / 2}" cy="${cy}" r="${r}"/>
    <rect x="0" y="${cy - boxH / 2}" width="${boxW}" height="${boxH}" rx="8"/>
    <rect x="${w - boxW}" y="${cy - boxH / 2}" width="${boxW}" height="${boxH}" rx="8"/>
    <rect x="${inset}" y="${inset}" width="${w - inset * 2}" height="${h - inset * 2}" rx="${Math.round(Math.min(w, h) * 0.05)}" opacity="0.5"/>
  </g>
  <g transform="translate(${w / 2}, ${h / 2})" text-anchor="middle">
    <rect x="${-Math.min(w, h) * 0.3}" y="${-Math.min(w, h) * 0.16}" width="${Math.min(w, h) * 0.6}" height="${Math.min(w, h) * 0.32}" rx="${Math.round(Math.min(w, h) * 0.06)}" fill="${PALETTE.warmwhite}" opacity="0.9"/>
    <text y="${-Math.min(w, h) * 0.03}" font-family="Arial Narrow, Arial, sans-serif" font-weight="700" font-size="${titleSize}" letter-spacing="${Math.round(titleSize * 0.12)}" fill="${PALETTE.olive}">PLACEHOLDER</text>
    <text y="${Math.min(w, h) * 0.08}" font-family="Georgia, serif" font-size="${sceneSize}" fill="${PALETTE.olive}" opacity="0.85">${esc(scene)}</text>
  </g>
  ${
    label && !compact
      ? `<text x="${inset + 8}" y="${h - inset - 8}" font-family="Georgia, serif" font-size="${labelSize}" fill="${PALETTE.olive}" opacity="0.8">${esc(label)}</text>`
      : ""
  }
</svg>`;
}

async function main() {
  let written = 0;

  for (const item of RASTER) {
    const out = join(ASSETS, item.path);
    await mkdir(dirname(out), { recursive: true });
    const svg = panelSvg(item);
    await sharp(Buffer.from(svg))
      .webp({ quality: 82, effort: 6 })
      .toFile(out);
    written += 1;
    console.log(`✓ ${item.path} (${item.w}×${item.h})`);
  }

  for (const item of VECTOR) {
    const out = join(ASSETS, item.path);
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, item.svg.trim() + "\n", "utf8");
    written += 1;
    console.log(`✓ ${item.path}`);
  }

  console.log(`\n${written} placeholder assets written to public/assets/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
