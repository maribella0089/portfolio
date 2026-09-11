# Maribel Sosa — Portfolio

A strategic portfolio site built for a Product Designer Specialist position. Editorial minimalism + product sophistication.

## Files

```
maribel-portfolio/
├── index.html          # Landing page
├── stori.html          # Case study 01 — Stori Referrals
├── stori-home.html     # Case study 02 — Stori Home
├── metlife.html        # Case study 03 — ProVida App (MetLife / Globant)
├── styles.css          # Full design system
├── script.js           # Custom cursor, scroll reveals, smooth scroll
├── README.md           # This file
│
└── preview-*.html      # Single-file builds (CSS + JS inlined) — open these
                        # directly in a browser to preview without a server.
                        # NOT for deployment — deploy the files above instead.
```

These are the deployment files. The `preview-*.html` files are throwaway single-file
builds for quick previewing — you don't need them once the site is hosted.

## How to view locally

Just open `index.html` in any browser. No build step needed.

For a proper local server (recommended for testing fonts/anchors):
```bash
# Python
python3 -m http.server 8000

# Or Node
npx serve .
```

Then visit `http://localhost:8000`.

## How to deploy

### Option A — Vercel (recommended, free, fastest)
1. Create a free account at https://vercel.com
2. Drag the `maribel-portfolio` folder onto the Vercel dashboard
3. Done. You'll get `maribelsosa.vercel.app` instantly. Add a custom domain in Settings.

### Option B — Netlify (also free)
1. Account at https://netlify.com
2. Drag the folder to the "Deploy" area
3. Done.

### Option C — Framer (if you prefer Framer hosting)
1. In Framer, create a new project
2. Use the structure of these HTML files as a wireframe reference
3. Re-build the layouts using Framer components — copy/paste the text from these files

### Option D — GitHub Pages
1. Create a public repo `maribelsosa-portfolio`
2. Push these files
3. Settings → Pages → deploy from `main` branch

## Custom domain

Buy `maribelsosa.com` (or `maribelsosa.design`) on Namecheap / Cloudflare (~$12/year), then point it to Vercel/Netlify in their dashboards. Takes 5 minutes.

## What to edit

### Update your contact info
In `index.html`, search for these and replace:
- `hello@maribelsosa.com` → your real email
- `linkedin.com/in/maribelsosa` → your LinkedIn
- `read.cv/maribelsosa` → your Read.cv (delete if you don't have one)
- `dribbble.com/maribelsosa` → your Dribbble (delete if you don't have one)
- `medium.com/@maribelsosa` → your writing (delete if you don't have one)

### Stori case study images — IMPORTANT

The Stori Referrals case study and homepage card are already wired up to use
real images. They load via CSS `background-image`, so until the files exist
you'll just see a clean dark-green block (no broken-image icons).

**To make the real mockups appear, save 3 files into `assets/stori/` with these
exact names:**

| Filename | What it is | Used on |
|---|---|---|
| `assets/stori/cover.png` | The two-phones-on-dark-teal mockup (missions + achievement screens) | Cover hero of `stori.html` |
| `assets/stori/missions.gif` | The animated "Desafíos" missions screen (a GIF — it auto-plays and loops as a CSS background) | `stori.html` design section + homepage project card |
| `assets/stori/reward.png` | The 3D green treasure-chest reward asset | `stori.html` design section |

Names and extensions must match exactly (lowercase). `cover` and `reward` are
`.png`; `missions` is a `.gif` (it animates automatically — CSS `background-image`
plays and loops GIFs with no extra code). If you save any of them in a different
format, also update the matching `url('assets/stori/...')` reference in
`stori.html` and `index.html`.

Heads-up on the GIF: keep it reasonably light (ideally under ~2–3 MB). GIFs can
get heavy fast, and `missions.gif` loads on both the homepage card and the case
study. If it ends up large, you can keep a static `missions.png` for the
homepage card and use the GIF only inside `stori.html`.

Once the files are in the folder, open `index.html` / `stori.html` and the
images appear automatically — no code changes needed.

To swap imagery on the other case studies later, the same pattern applies:
add an `assets/<project>/` folder and point a `.media-img` `background-image`
at it.

### ProVida images

`assets/provida-app/` holds `hero.png` (homepage card cover) and `mockup.png`
(case-study cover on `metlife.html`). Note: the `hero.png` you exported was a
106 MB Photoshop file — the copy in this folder is the optimized 751 KB web
version. Don't replace it with the original PSD.

### Stori × SHEIN images

`shein.html` and the homepage card load four images from `assets/shein/`.
Until the files exist you'll see a clean dark block.

| Filename | What it is | Used on |
|---|---|---|
| `assets/shein/cover.png` | Main project hero / cover visual | `shein.html` cover + homepage card |
| `assets/shein/value-prop.png` | Landing page leading with the primary value proposition | `shein.html` § 05, decision 01 |
| `assets/shein/benefits.png` | Benefits regrouped into clear categories | `shein.html` § 05, decision 02 |
| `assets/shein/final.png` | The final redesigned landing page | `shein.html` § 07 (closing) |

Same rule: exact lowercase names. If you save as `.jpg`, update the matching
`url('assets/shein/...')` references in `shein.html` and `index.html`.

### Add more case studies
For each new project:
1. Duplicate `stori.html` → rename (e.g., `project-two.html`)
2. Edit the content following the same 8-section structure:
   - Context
   - Challenge
   - Team & role
   - Research
   - Diagnosis
   - Design
   - Impact
   - Reflection
3. In `index.html`, replace the `project--placeholder` block with a real project link copied from the Stori card pattern

### Tweak copy
Hero headline, intro, approach principles, and about section are all in `index.html`. They're written for a senior specialist tone — feel free to soften or sharpen.

### Color or typography changes
All design tokens are in the `:root` block at the top of `styles.css`:
- `--accent` (currently `#FF5B27` — warm orange) controls highlights
- `--font-display` (Instrument Serif) for big headlines
- `--font-sans` (Inter) for body
- `--font-mono` (JetBrains Mono) for labels

## Design system summary

| Token | Value |
|---|---|
| Primary background | `#FAF9F6` (warm off-white) |
| Inverse background | `#0E0E0C` (used in contact + footer) |
| Accent | `#FF5B27` |
| Type pairing | Instrument Serif + Inter + JetBrains Mono |
| Reveal animation | IntersectionObserver, 900ms cubic-bezier |
| Cursor | Custom blended cursor with smooth trail |

## Strategic notes (the "why" behind the structure)

The portfolio is intentionally structured for **how recruiters and hiring managers at large enterprises actually read portfolios**:

1. **Hero says what you do, who you are, and where you're going** — in 3 seconds.
2. **Selected work is gated to 2-3 projects** with visible metrics. Big Tech recruiters quickly scan for impact numbers; deeper case studies are for hiring managers and panels.
3. **Each case study follows a research → diagnosis → reframe → solution → impact narrative** because that's the pattern senior designers are evaluated against.
4. **The contact block leads with the role you want** — "Specialist roles · 2026" — so recruiters self-select before clicking.

Don't soften the metrics. Don't apologize. The +22.85% number is the headline of your career story right now.
