# Handoff to Claude Code

This guide walks you through moving from Cowork to Claude Code so you can
iterate on the portfolio with local files, a live preview, and direct Git
control.

End-to-end takes ~20 minutes. Most of it is one-time setup.

---

## What you need installed

Open **Terminal** on your Mac and check each of these. If a command returns a
version number, you're good. If it says "command not found," install it.

```bash
node --version   # need v18+ (recommended v20+)
git --version    # any recent version
code --version   # VS Code CLI (installed with VS Code)
```

### If Node.js is missing
Download from **nodejs.org** (LTS version). Runs the installer, next-next-next.

### If Git is missing
Install Xcode Command Line Tools:
```bash
xcode-select --install
```
That gives you Git + a bunch of other dev basics.

### If VS Code is missing
Download from **code.visualstudio.com**. After install, open VS Code once
and press `Cmd+Shift+P` → type "Shell Command" → select
"Install 'code' command in PATH". Now `code .` works from Terminal.

### Install Claude Code
```bash
npm install -g @anthropic-ai/claude-code
```
Then sign in:
```bash
claude
```
Follow the prompts to authenticate.

### Install the Claude Code extension for VS Code
- Open VS Code
- Click the Extensions icon (four squares in the left sidebar)
- Search "Claude Code"
- Install the official one by Anthropic
- Sign in when prompted (same account as the CLI)

---

## Step 1 — Get the portfolio files onto your Mac

You have two paths, depending on what state your local machine is in.

### Path A — You already have the folder locally (from earlier Cowork downloads)
Skip to Step 2. But note: your local copy is probably out of date compared to
what Cowork has now (Mercado Libre case study, marquee, meli-hero image, SHEIN
updates). Download the current version from Cowork and overwrite your local
folder. **Back up your local folder first if you made any manual edits.**

### Path B — You want to start fresh from Cowork
1. Download the entire `maribel-portfolio` folder from Cowork to your Mac.
   Recommended location: `~/Documents/maribel-portfolio/`.
2. Move it there in Finder.

---

## Step 2 — Sync with GitHub

Your GitHub repo is behind the current state (it doesn't have Mercado Libre,
the marquee, meli-hero, etc.). You need to push the current version up.

### Clean up orphan files before pushing
In the `maribel-portfolio` folder in Finder, delete these files (they're
excluded from deploy anyway via `.vercelignore`, but removing them keeps your
repo clean):

- `stori-home.html` (case study removed from the portfolio)
- All `preview-*.html` files (dev-only previews)
- `build.py` (dev helper — Claude Code won't need this anymore)
- `.DS_Store` files inside any `assets/*` folder
- `assets/shein/landing-v1.png` (replaced by Landing-version-a.png)
- `assets/shein/hero.png` (orphan)
- `assets/shein/a.png` (accidental upload)
- `assets/shein/image_1-1_2.png` (accidental upload)

### Push the current state to GitHub

Open Terminal, `cd` into your folder:
```bash
cd ~/Documents/maribel-portfolio
```

If this folder isn't a git repo yet (no `.git` folder inside), initialize it
and connect to your existing GitHub repo:
```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/maribel-portfolio.git
git branch -M main
git add .
git commit -m "Sync latest portfolio state from Cowork"
git push -u origin main --force
```

If this folder IS already a git repo (was cloned earlier):
```bash
git add .
git commit -m "Sync latest portfolio state — Mercado Libre + marquee + meli"
git push
```

Vercel picks up the push and deploys automatically. Wait ~60 seconds and
verify at your Vercel URL.

---

## Step 3 — Open the folder in VS Code

From Terminal, still in the folder:
```bash
code .
```

VS Code opens with your portfolio folder as the workspace. You'll see all
files in the left sidebar.

---

## Step 4 — Start a Claude Code session

In VS Code:
- Click the Claude Code icon in the left sidebar (or `Cmd+Shift+P` → "Claude Code: Open")
- A chat panel opens on the right

**Paste this starter prompt to Claude Code to give it context:**

```
This is my personal portfolio as a Product Designer. Static site (HTML + CSS + vanilla JS)
deployed on Vercel via GitHub.

Structure:
- index.html (landing with 5 project cards)
- 5 case study pages: mercado-libre.html, stori.html, shein.html, metlife.html, herff-jones.html
- styles.css (full design system)
- script.js (custom cursor, scroll reveals, smooth scroll)
- assets/ (organized per project: meli, stori, shein, provida-app, herff-jones)
- favicon.svg
- .vercelignore (excludes dev files from deploy)

Design system:
- Typography: DM Sans (body + display) + Instrument Serif (italic accents) + JetBrains Mono (mono labels)
- Palette: warm cream background (#FAF9F6), near-black ink (#0A0A0A), warm orange accent (#FF5B27)
- Motion: custom cursor with mix-blend-mode, scroll reveals via IntersectionObserver,
  hero word reveal on load, editorial serif marquee between hero and Selected Work

Deploy chain: GitHub main branch → Vercel auto-deploy → live URL.

I want to iterate on visual polish, add more sophisticated animations (open to GSAP + Lenis
for scroll-linked motion), and occasionally add new case studies. Familiarize yourself with
the structure before we start.
```

Claude Code will read the files, understand the setup, and be ready to work
with the same tone and rigor you're used to from Cowork.

---

## Step 5 — Your new workflow

**Making a change and shipping it:**

Ask Claude Code what you want. It edits the files directly in your folder.
When you're happy, tell it to commit and push:

> "Commit these changes with the message 'refine hero spacing' and push."

Claude Code runs the git commands. Vercel picks up the push and deploys.
~60 seconds later your live URL updates.

**Experimenting without touching production:**

> "Create a branch called 'test-gsap-scroll' and add GSAP ScrollTrigger to
> the hero words for scroll-linked reveals. Push it as a preview."

Claude Code creates the branch, installs GSAP, makes the changes, pushes.
Vercel creates a preview URL for the branch (visible in your Vercel
dashboard). If you like it, merge to main. If not, delete the branch.

**Previewing locally with hot reload:**

> "Start a local dev server so I can preview changes live."

Claude Code runs a lightweight server (`npx serve` or `vite`). You open
`localhost:PORT` in your browser and see changes instantly as we edit.

---

## Recommended next steps once you're comfortable

Ask Claude Code to help you do these upgrades — they'll level up the polish
significantly:

1. **Add Lenis for smooth momentum scroll** (one command install, one line
   of init, dramatic feel improvement).
2. **Add GSAP + ScrollTrigger** for scroll-linked reveals on section titles
   and case study hero elements.
3. **Optimize images to WebP/AVIF** with `sharp` for faster page loads.
4. **Run Lighthouse** in Chrome to see performance/accessibility scores and
   iterate.
5. **Set up preview branches per feature** so recruiter-shared URLs never
   see work-in-progress.

---

## Troubleshooting

**"claude" command not found after install** — restart Terminal (PATH needs
to reload).

**Git asks for authentication when pushing** — you may need to set up a
Personal Access Token or SSH key. Search "GitHub PAT setup" — it's a
5-minute one-time thing.

**Vercel doesn't detect the push** — check that GitHub → Vercel integration
is still connected. Vercel dashboard → your project → Settings → Git.

**VS Code Claude Code extension isn't finding your files** — make sure you
opened the folder as a *workspace* (`code .` from inside the folder, not
`code` outside it).
