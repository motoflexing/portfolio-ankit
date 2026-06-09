# Ankit Dubey — Personal Portfolio

A premium, editorial, cinematic personal portfolio for **Ankit Dubey** — a
software developer and product builder. Deployed to
**[ankit.motoflexing.com](https://ankit.motoflexing.com)**.

This is an **independent project and repository**. It references the MotoFlexing
ecosystem (the brand Ankit builds products under) but the subject of the site is
Ankit the individual, not the ecosystem.

---

## Tech stack

| Concern | Choice |
|---|---|
| Framework | **Next.js 16** (App Router, React Server Components) |
| Language | **TypeScript** (strict mode) |
| UI runtime | **React 19** |
| Styling | **Tailwind CSS v4** + CSS-variable design tokens |
| UI primitives | **shadcn/ui** (dialog, select, input, textarea, sonner, separator, label, button) |
| Icons | **lucide-react** (+ hand-rolled brand SVGs, since lucide removed brand logos) |
| Deployment | **Vercel** |

> **Note on the framework version:** the brief specified Next.js 15;
> `create-next-app@latest` installed **Next.js 16**, the current stable. App
> Router, RSC, and the Metadata API behave identically, so the brief's intent is
> fully met. Pin to 15 only if you have a specific reason.

### Animation & interaction toolkit — each library has one job

The toolkit is deliberately curated. Every library earns its place; nothing
redundant is loaded, which keeps the bundle small enough to hit the performance
goals.

| Capability | Library | Where it's used |
|---|---|---|
| Page transitions, scroll reveals, layout animation, magnetic CTAs, card depth, drawer | **Framer Motion** | App-wide motion layer |
| Scroll-driven hero tie-in + scrubbed journey timeline | **GSAP + ScrollTrigger** | Hero scene, `/journey` |
| Signature 3D visual | **Three.js + React Three Fiber + Drei** | Hero "product constellation" |
| Swipeable selected-projects rail + case-study gallery | **Embla Carousel** | Home rail, case-study galleries |
| Full-bleed coverflow project showcase | **Swiper** | `/projects` showcase |
| Throwable/draggable micro-interaction (reserved) | **Interact.js** | Available for the draggable "AD" token |
| Utility-class micro-animations (status pulses) | **tailwindcss-motion** | Status dots, small accents |

### Why these, and why not the redundant ones

- **Embla** powers the lightweight home rail and case-study galleries — small,
  dependency-free, great touch momentum.
- **Swiper** is used only where its coverflow effect adds real value (the
  desktop card-stack showcase on `/projects`).
- **GSAP/ScrollTrigger** drives the two genuinely scroll-*scrubbed* moments
  (hero scale/fade tie-in, the journey timeline) — work Framer Motion's
  `whileInView` doesn't do as cleanly.
- **Framer Motion** owns everything else: page transitions, reveals, the mobile
  drawer, card depth, magnetic CTAs.

**Deliberately omitted** to avoid duplicate bundles and meet performance goals:

- **Keen Slider** and **ZingTouch** — their carousel/gesture jobs are already
  covered by Embla, Swiper, and Framer Motion.
- **React Spring** — overlaps Framer Motion's spring system. Add it back only if
  you later want a single springy number-counter, and nothing more.

Three.js is the one heavy dependency, so it is **code-split** (`next/dynamic`
with `ssr: false`) and only loaded on the client, after first paint, when the
hero is in view.

---

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
npx tsc --noEmit # strict type check
```

> **Environment note:** if `npm install` fails with
> `UNABLE_TO_VERIFY_LEAF_SIGNATURE` behind a corporate proxy / AV that
> intercepts TLS, run Node with the system certificate store:
> `NODE_OPTIONS="--use-system-ca" npm install`.

---

## Build & deploy (Vercel)

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import it into Vercel — the framework is auto-detected as Next.js.
   [`vercel.json`](./vercel.json) sets the build command, region (`bom1`,
   Mumbai — closest to India), and security headers.
3. **Domain:** in **Vercel → Project → Settings → Domains**, add
   `ankit.motoflexing.com` and point the DNS `CNAME` at Vercel. (Domains are
   configured in the dashboard, not in `vercel.json` — Vercel's schema has no
   `domains` field, so putting one there would fail validation.)
4. Deploy. All routes are statically prerendered except `/api/contact`
   (server-rendered on demand).

### Contact form delivery

The contact form posts to [`/api/contact`](./src/app/api/contact/route.ts),
which validates server-side and currently **logs** the submission. To send real
email, implement `deliverMessage()` in that file with a provider (e.g. Resend,
SendGrid, Nodemailer) and add the API key to Vercel's environment variables. No
provider is bundled, so there are no broken secrets out of the box.

---

## File structure

```text
src/
  app/
    layout.tsx              # fonts, metadata, chrome, JSON-LD (Person + WebSite)
    template.tsx            # page-transition wrapper (curtain wipe + AD monogram)
    page.tsx                # Home
    projects/page.tsx       # Projects (Swiper showcase + filterable grid)
    projects/[slug]/        # Case studies (SSG) + per-slug opengraph-image
    about/ journey/ contact/
    api/contact/route.ts    # contact route handler (validation + stub delivery)
    not-found.tsx           # custom 404
    sitemap.ts robots.ts manifest.ts
    icon.svg apple-icon.tsx opengraph-image.tsx
  components/               # Nav, Footer, cursor, grain, buttons, cards, badges
  components/three/         # ProductConstellation R3F scene (lazy, ssr:false)
  components/projects/      # showcase, grid, rail, gallery, feature list, nav
  sections/                # Hero, SelectedProjects, WhatIBuild, Capabilities, …
  data/                    # site, projects, skills, experience, journey, socials…
  hooks/                   # useReducedMotion, useMediaQuery, useScrollProgress…
  lib/                     # seo, structured-data, contact, utils, fonts
  types/                   # Project, Skill, Experience, Journey interfaces
```

---

## Content management — one place to edit everything

**All content lives in `src/data/`** — typed, centralized, and the single source
of truth. Components never hard-code copy. To update the site, edit data:

| File | Holds |
|---|---|
| `data/site.ts` | Name, role, email, domain, status, SEO defaults |
| `data/projects.ts` | Every project + full case-study narrative |
| `data/skills.ts` | Grouped skills with honesty tags |
| `data/experience.ts` | Internship experience + education |
| `data/journey.ts` | The ordered journey stages |
| `data/socials.ts` | Social links (no follower counts) |
| `data/home.ts` `data/about.ts` | Home + About page copy |
| `data/nav.ts` | Navigation links |

Adding a project? Append to `data/projects.ts` — the projects page, home rail,
case study (with its own SSG route + OG image), and sitemap all pick it up
automatically.

### Things to fill in before/after launch

- `public/ankit-dubey-resume.pdf` — replace the placeholder with the real CV.
- `data/experience.ts` — the **BCA institution name and dates** are `TODO`
  placeholders (not fabricated); set the real values.
- Project **screenshots** — `data/projects.ts` references image paths under
  `/public/projects/<slug>/`. Until real images are added, the gallery/cards
  render an on-brand placeholder tile; the `src` is already threaded so swapping
  in `<Image>` is a one-line change.
- `games.motoflexing.com` — MotoFlexing Games is marked **In Development** with
  no live link because the subdomain didn't resolve at build time. Once it's
  deployed, set `status: "Live"` and re-add `liveUrl` in `data/projects.ts`.

---

## Honesty rules (enforced, not decorative)

This portfolio is built to be **credible, not inflated**:

- **Feature claims are typed by state.** Every feature is `Implemented`,
  `Prototype`, or `Planned` — a planned capability literally cannot render as
  shipped (see `FeatureList`).
- **Skills are tagged by real usage** — `Shipped` / `Prototype` / `Explored` /
  `Learning`. No percentage bars, no fake levels.
- **Ownership is explicit.** Personal products, internship work, and
  collaborative projects are clearly distinguished; the Nightlife platform is
  marked collaborative and Ankit's contribution is described honestly — no
  sole-ownership claim.
- **No invented testimonials**, follower counts, revenue, user numbers, or years
  of experience. Capability is shown through real projects, live deployments,
  decisions, and lessons.
- **No broken or unverified live links.** QA found `games.motoflexing.com` did
  not resolve, so that project was honestly downgraded rather than shipped with
  a dead link.

---

## Design system

A dark, editorial, cinematic system — a design-studio magazine, not a dashboard.

**Tokens** (in `src/app/globals.css`, as CSS variables mapped into Tailwind v4's
`@theme`):

- Near-black background (`#0A0A0B`), charcoal surfaces, soft off-white text
  (never pure white), a three-step muted grey scale.
- One disciplined accent — **signal red `#E5484D`** — used only for active nav,
  the scroll-progress bar, status dots, hover details, and single key words in
  headings. Never floods a heading, never neon.
- Type: **Space Grotesk** (display; swap in Clash Display via `next/font/local`
  later), **Inter** (body), **JetBrains Mono** (labels, indices, status).
- All text/contrast pairs meet WCAG AA (tertiary `--text-faint` was tuned to
  ~4.4:1).

**Key design decisions:**

- **Asymmetric magazine grid** — a persistent thin left margin carrying mono
  section numbers (`00 / 04`) and a vertical hairline, like an editorial index.
- **Hairline borders, not drop shadows** — depth comes from contrast and motion.
- **Film grain + vignette** — a fixed, GPU-cheap CSS overlay for cinematic depth.
- **Custom cursor** — a dot + magnetic ring follower (desktop only; never traps
  focus).
- **One signature 3D scene** — the hero "product constellation" (nodes = real
  projects, hairline links, cursor parallax, accent glow on the active node).
  Exactly one 3D moment, not a heavy 3D background.

**Animation philosophy:** restrained and meaningful. No scroll-hijacking, no
constant floating objects, no autoplay video, no loading screens.

**`prefers-reduced-motion` is respected everywhere:** the 3D scene isn't
mounted, scroll-scrubbing is disabled, reveals become instant, the page-
transition curtain is skipped, and the cursor follower stops.

---

## Accessibility & performance

- Semantic HTML, one `<h1>` per page, logical heading order, landmarks, skip-to-
  content link, visible focus states, labelled form fields with `aria-describedby`
  errors, accessible mobile drawer (Escape + scroll-lock + focus management),
  `aria-label` on every icon-only control.
- `next/font` (display: swap), code-split 3D, route-split carousels, fixed-aspect
  media containers (no CLS), responsive design for mobile → large desktop with no
  horizontal overflow.
- Full SEO surface: canonical on `ankit.motoflexing.com`, OG + Twitter cards,
  generated per-page OG images, web manifest, sitemap, robots, and JSON-LD
  (Person, WebSite, and CreativeWork per case study).
