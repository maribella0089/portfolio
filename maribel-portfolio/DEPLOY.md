# Deploying maribelsosa.com

This portfolio is a static site (HTML + CSS + JS) — the simplest kind to host.
Path below uses **Vercel** because it's free, fast, and has zero learning curve.
End-to-end this takes about 15 minutes, most of which is waiting for DNS to
propagate.

---

## Part 1 — Get the site online (≈5 min)

### 1. Sign up for Vercel
Go to **vercel.com** → "Sign up". Use the "Continue with Email" option (no
GitHub needed). Free plan is perfect for a personal portfolio.

### 2. Drag-and-drop deploy
- In the Vercel dashboard, click **"Add New…"** → **"Project"**
- You'll see a "Deploy a static site" section. Drag the entire
  `maribel-portfolio` folder onto it.
- Vercel auto-detects it as a static site. Click **"Deploy"**.
- Wait ~30 seconds.

Vercel gives you a URL like `maribel-portfolio-abc123.vercel.app`. Open it
— that's your portfolio live on the internet. Test the links, scroll through
each case study, click into them, check the videos play.

If anything looks broken, you can drag the folder again to redeploy.

---

## Part 2 — Connect your GoDaddy domain (≈10 min, mostly waiting)

### 3. Add the domain in Vercel
- Inside your new project, go to **Settings → Domains**
- Type `maribelsosa.com` (or your actual domain) and click **"Add"**
- Vercel will show "Invalid configuration" — that's normal until you point
  GoDaddy at it. Vercel will tell you exactly which DNS records to set.

You'll typically need two records:

| Type  | Name  | Value                         |
|-------|-------|-------------------------------|
| A     | `@`   | `76.76.21.21`                 |
| CNAME | `www` | `cname.vercel-dns.com`        |

### 4. Add the records in GoDaddy
- Log in to GoDaddy → **My Products** → find your domain → click **"DNS"**
  (or **"Manage DNS"**)
- If you see any existing **A** record for `@` pointing to a GoDaddy parking
  page, **delete it** (otherwise the two records will conflict)
- Click **"Add New Record"**:
  - Type: **A** · Name: **`@`** · Value: **`76.76.21.21`** · TTL: **600 seconds**
- Click **"Add New Record"** again:
  - Type: **CNAME** · Name: **`www`** · Value: **`cname.vercel-dns.com`** · TTL: **600 seconds**
- **Save**

Leave your **MX records** alone — those handle email (any GoDaddy mailbox
keeps working). You're only touching A and CNAME.

### 5. Wait for DNS to propagate
DNS changes take **10 minutes to 1 hour** to spread across the internet.
Back in Vercel under **Settings → Domains**, the status next to your domain
flips from "Invalid configuration" to **"Valid configuration"** when it's
ready. You can also check live propagation at **whatsmydns.net**.

Once it's green, visit `https://maribelsosa.com` — Vercel automatically
issues an SSL certificate for free, so HTTPS works without any extra setup.

---

## Part 3 — Updating the site later

When you want to change anything — a typo, a new project, a swapped image —
you have two options:

**Easiest: drag-and-drop again.** Edit the files locally, go to your
Vercel project → **Deployments** → **"Create Deployment"** → drop the
updated folder. Live in under a minute. Vercel keeps every previous
deploy, so if something breaks you can roll back with one click.

**For ongoing edits: connect a GitHub repo.** Push the folder to a free
GitHub repo, connect it to Vercel (Settings → Git), and every future commit
auto-deploys. Worth doing once you've made one or two manual updates and
want the workflow to be cleaner.

---

## What I cleaned up for you

The `.vercelignore` file in this folder tells Vercel to skip a few files
that shouldn't go live: the `preview-*.html` builds (those were for local
preview), `build.py` (a dev helper), `README.md`, `DEPLOY.md`, all
`.DS_Store` files (Mac metadata), and two orphan images in `assets/shein/`
that are no longer referenced (`hero.png` and `landing-v1.png`).

You don't need to do anything about those — Vercel ignores them
automatically. If you want them gone from your local copy too, just delete
them in Finder.

---

## Troubleshooting

**"Domain shows Invalid configuration in Vercel"**
DNS hasn't propagated yet. Wait 30-60 minutes. If after 2 hours it's still
invalid, double-check the records on GoDaddy — Type, Name, and Value must
match exactly. Common mistake: a trailing dot in the CNAME value, or an
existing GoDaddy "parked" A record still active.

**"My site loads but images are missing"**
Check that the `assets/` folder was included in the upload. In Finder,
`assets/` should sit next to `index.html`. Re-deploy if it wasn't.

**"I need email at maribelsosa.com"**
GoDaddy offers free email forwarding (forward `you@maribelsosa.com` to your
Gmail). For a real inbox at the domain, use Google Workspace (~$6/month).
Your MX records stay on GoDaddy in either case; nothing about Vercel
affects email.

**"Custom domain didn't add an SSL certificate"**
Vercel issues SSL automatically once DNS resolves correctly. If after DNS
goes "Valid" you still see a warning, click "Refresh" on the domain in
Vercel — it'll re-trigger the cert issuance.

---

## Files in this folder

| File | What it does |
|---|---|
| `index.html` | Homepage |
| `stori.html` | Case study 01 — Stori Referrals |
| `shein.html` | Case study 02 — Stori × SHEIN |
| `metlife.html` | Case study 03 — ProVida (MetLife / Globant) |
| `herff-jones.html` | Case study 04 — Herff Jones (Huge Inc) |
| `styles.css` | Design system + all visual styling |
| `script.js` | Cursor, scroll reveals, smooth scroll |
| `assets/` | Project imagery, organized by case study |
| `.vercelignore` | Tells Vercel what to skip when deploying |
| `build.py` | Local-only helper for previewing — not deployed |
| `preview-*.html` | Local-only single-file previews — not deployed |
