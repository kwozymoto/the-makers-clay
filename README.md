# The Makers Clay

Bilingual (English / 中文) catalogue site for a small handmade pottery studio in Malaysia.

Static site — no server, no database, no monthly platform fee. Enquiries go to
WhatsApp and Instagram. Checkout is deliberately **not** built yet; see
[Adding payments later](#adding-payments-later).

- **Framework:** Astro 7 (static output)
- **Hosting:** Cloudflare Pages (free tier is plenty)
- **Running cost:** just the domain

---

## Editing without touching code

The site is wired up to [Pages CMS](https://pagescms.org), so content can be
edited in a browser at [app.pagescms.org](https://app.pagescms.org) — sign in
with GitHub, pick the repo, edit a form, hit Save. That commits to `main` and
the Pages workflow rebuilds. No server, no database, no extra cost, and every
change is a commit, so nothing is unrecoverable.

`.pages.yml` defines the editing interface. Three things are editable:

| In the CMS | Writes to |
| --- | --- |
| **Pieces** | `src/content/pieces/*.md` |
| **About page** | `src/data/about.json` |
| **Site settings** | `src/data/site.json` (WhatsApp, socials, preview toggle) |

**[docs/EDITING.md](docs/EDITING.md) is the guide for whoever is editing** —
written for a non-developer, not for you. If you change `.pages.yml`, change
that too.

Two things to know if you edit `.pages.yml`:

- **`media.output` is `/`**, so the CMS writes image values as `/photo.jpg`
  while hand-written entries use bare filenames. `resolveImage()` matches on
  the filename alone, so both work.
- **The content schema tolerates CMS output** — `''` for a cleared number,
  `null` for an empty text box, a bare string where a list is expected. See the
  preprocessors at the top of `src/content.config.ts`. Removing them will make
  the build fail the first time someone clears a field.

The URL of a piece comes from its **filename**, which the CMS generates by
slugifying the English name. Renaming a piece in the CMS does not move the
file, so the old URL sticks — rename the file directly if that matters.

---

## Everyday tasks

### Run it locally

```bash
npm install && npm run dev
```

Then open <http://localhost:4321>.

### Add a piece

Create a new `.md` file in `src/content/pieces/`. The filename becomes the URL
(`cloud-dish.md` → `/shop/cloud-dish`). Everything lives in the frontmatter:

```yaml
---
title: 'Cloud Dish'
titleZh: '云朵小碟'
kind: 'unique'          # 'unique' = there is only one | 'batch' = can be made again
status: 'available'     # 'available' | 'sold' | 'made-to-order'
price: 58               # or: null  → shows "Price on enquiry"
images:
  - 'cloud-dish-1.jpg'
  - 'cloud-dish-2.jpg'
description: >-
  A soft-edged dish in pale celadon with a single small drawing in the well.
descriptionZh: >-
  边缘柔和的浅青瓷小碟,碟心画了一个小图案。
dimensions: 'Approx. 13 × 9 cm'
dimensionsZh: '约 13 × 9 公分'
care: 'Food safe. Hand wash recommended.'
careZh: '可接触食物。建议手洗。'
order: 70               # higher numbers appear first
featured: true          # show on the home page
batch: '2026-02'
---
```

Only `title` and `kind` are required. If a `...Zh` field is missing, the English
text is used on the Chinese pages, so you can translate gradually.

Sold pieces automatically sink to the bottom of the shop and switch their button
to "Ask about something similar" — worth keeping them listed, because a full
shop with some sold pieces sells better than a nearly empty one.

### Add photos

Drop image files into `src/assets/pieces/`, then list the filenames under
`images:`. Astro resizes them, converts to WebP and generates `srcset`
automatically — upload the full-size photo, don't pre-shrink it.

The first image is the cover shown in the grid. Portrait crops (4:5) look best.
Any piece with no photo shows a placeholder pot, so the site never looks broken.

### Change the settings

Everything you'll want to edit is in **`src/config.ts`**:

| Setting | What it does |
| --- | --- |
| `whatsapp` | Your number, international format, digits only (`60123456789`). Until this is set, every enquiry button falls back to Instagram. |
| `waitlistEndpoint` | A form endpoint from MailerLite / Buttondown / Formspree. Empty = the waitlist block shows a "follow on Instagram" prompt instead. |
| `instagram`, `email` | Links in the footer and enquiry buttons. |

### The wordmark

`src/components/Wordmark.astro` reproduces the studio's own mark — lowercase
marker hand, three lines cascading right, `HANDBUILT BY LYDIA` tracked out
underneath. It's modelled on the sticker in `cloud-dish-1.jpg` and the overlay
in `night-flower-1.jpg`.

The lettering is **Shantell Sans standing in for the real hand**. It is close,
not identical. If there's an original logo file, drop it in and replace the
component — the sizing and rhythm are already set up to match.

The font is subset down to just the eleven letters in "the makers clay", which
takes it from 174 kB to 14 kB while keeping all four variable axes. If you
change the wordmark text, regenerate it:

```bash
npm run font:mark
```

That needs Python with `fonttools` and `brotli` (`python -m pip install
fonttools brotli`). The full font is a devDependency and never ships.

Screen readers and search engines see the plain string "The Makers Clay" — the
three-line split is visual only.

### Piece names

The studio names pieces as a bilingual *pair* rather than a translation
(夜花小杯 / NIGHT FLOWER MINI CUP), so both names show on cards and piece pages.
The reader's language leads; the other sits underneath, in tracked caps when
it's the English one, matching how it appears on her posts. Set both `title` and
`titleZh` and it happens automatically — if `titleZh` is missing, only the one
name shows.

### Edit the wording

- Navigation, buttons, labels: `src/i18n/ui.ts` (English and Chinese side by side)
- The About story: `src/views/About.astro` — **this one is placeholder text, rewrite it in your own voice**

---

## Before going live

- [ ] Set `whatsapp` in `src/config.ts`
- [ ] Rewrite the About story in `src/views/About.astro`
- [ ] **Replace the preview photos** — see [About the photos](#about-the-photos)
- [ ] Check every price and description in `src/content/pieces/` (the piece
      *names* came from the Instagram posts, but prices, sizes and descriptions
      are all invented placeholders)
- [ ] Set the `PUBLIC_SITE_URL` default in `astro.config.mjs` to the real domain
- [ ] **Set `preview: false` in `src/config.ts`** — this drops the "work in
      progress" bar, removes `noindex`, and switches `robots.txt` from
      disallow-everything to allow-everything. Until you do, the site is
      deliberately invisible to search engines.
- [ ] Set up a waitlist endpoint — this is the single highest-value thing on the
      site, because small batches sell out before the algorithm shows the post

---

## About the photos

The images in `src/assets/pieces/` were pulled from the
[@themakersclay.lydia](https://www.instagram.com/themakersclay.lydia) grid so the
site could be previewed with real work in it. Two things to know:

**They are only 640px.** That is Instagram's grid size. It's fine on a phone and
acceptable in the shop grid, but it's soft on a large screen, especially the
single large image on a piece page. Re-export from the originals at 1600px or
more and Astro will do the rest.

**Several are Instagram posters, not product shots.** `little-fence-1.jpg`,
`night-flower-1.jpg` and `blossomed-1.jpg` have titles and captions baked into
the image, because they were designed as feed posts. They look like posters in a
product grid. For the real site you want a plain photo of the piece, with the
words as text on the page where they can be read, translated and searched.

Filenames map to pieces, so replacing one is just overwriting the file.

---

## Where it's deployed

Currently on **GitHub Pages** at
<https://kwozymoto.github.io/the-makers-clay/>, built by
`.github/workflows/deploy-pages.yml` on every push to `main`.

The repo is public because GitHub Pages only serves private repos on a paid
plan. To keep a work-in-progress site out of search results, `SITE.preview`
emits `noindex` and a `robots.txt` that disallows everything — see the checklist
above.

**The site is path-portable.** `PUBLIC_SITE_URL` and `PUBLIC_BASE_PATH` are read
at build time, and every internal link goes through a base-aware `localePath()`,
so the same code works at a subpath (`/the-makers-clay/`) and at a root domain.
The Pages workflow feeds those from the Pages config, so moving to a custom
domain or a different repo owner needs no code changes.

To build a subpath version locally:

```bash
PUBLIC_SITE_URL=https://kwozymoto.github.io PUBLIC_BASE_PATH=/the-makers-clay npm run build
```

(On Git Bash for Windows, prefix that with `MSYS_NO_PATHCONV=1` or the shell
rewrites `/the-makers-clay` into a Windows path.)

---

## Deploying to Cloudflare Pages

Push to GitHub first:

```bash
git init && git add -A && git commit -m "Initial site"
```

Create the repo and push:

```bash
gh repo create the-makers-clay --private --source=. --push
```

Then in the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to
Git**, pick the repo, and use these build settings:

| Field | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |

Under **Custom domains**, add your domain. Because the domain is already on
Cloudflare, the DNS record is created for you and SSL is automatic.

Every push to `main` redeploys. That is the whole release process for a new batch:
add the markdown files, add the photos, push.

---

## Adding payments later

The site is built so checkout can be added without restructuring anything.
When you're ready:

**One-of-a-kind pieces** (`kind: 'unique'`) — use one hosted payment link per
piece rather than a cart. There is exactly one of each, so a cart creates a real
risk of two people buying the same piece and one of them needing a refund. A
payment link per piece makes that impossible. Add a `paymentLink:` field to the
schema and render it as the primary button when `status: 'available'`.

**Repeatable pieces** (`kind: 'batch'`) — these can take a normal cart with
quantities whenever there's enough volume to justify it.

**Gateways**, cheapest first for Malaysia (verify current rates — they change):

| | FPX | DuitNow QR | Cards | Monthly |
| --- | --- | --- | --- | --- |
| toyyibPay | ~RM1 flat | ~1% or RM1 | — | RM0 |
| HitPay | ~1.8% + RM0.40 | ~1.2% | ~1.2% + RM1 | RM0 |
| Billplz | ~1.25% | — | — | RM0 |

HitPay covers the most methods (Touch 'n Go, GrabPay, ShopeePay, Boost, cards).
toyyibPay is cheapest on FPX. All of them require SSM registration and a
business bank account, so do that first.

---

## Project layout

```
src/
  config.ts              ← all the settings
  content.config.ts      ← the schema for a piece
  content/pieces/        ← one markdown file per piece
  assets/pieces/         ← photos (optimised at build time)
  i18n/ui.ts             ← every string, EN + ZH
  views/                 ← page bodies, shared between languages
  pages/                 ← routes (EN at /, Chinese at /zh/)
  components/
    Wordmark.astro       ← the brand mark
  styles/global.css      ← colours and type live at the top
public/
  fonts/                 ← the subset wordmark font
```

English lives at `/`, Chinese at `/zh/`. Each route file is a thin wrapper that
renders the matching view with a `lang` prop, so there's one copy of the markup
and no duplicated layout to keep in sync.
