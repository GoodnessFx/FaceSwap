# FaceSwap Studio

A single-price, CPU-first course site that teaches creators how to build a real-time AI persona
with free, open-source tools on an ordinary Windows laptop — no GPU required.

**Everything, once: ₦159,000 (All-Access Lifetime).** Pay in one go, or split it across two
payments. No tiers, no upsells, no expiry.

## What the site actually contains

| Page | Route | Notes |
|---|---|---|
| Landing | `/` | Dark hero with a CSS-only phone mockup, tool marquee, editorial pipeline panel, interactive roadmap, download hub, mistake vault, call recipes, command center, curriculum, pricing, FAQ |
| Pricing | `/pricing` | Single all-access plan with a one-time / two-payment toggle |
| Free lesson | `/free-lesson` | Module 1, Lesson 1 rendered from markdown |
| Course | `/course` | Lesson index plus every lesson, screenshots and a table of contents |
| Checkout | `/checkout/:tier` | Order summary, coupon field, consent gate, Paystack + Selar |
| Dashboard | `/dashboard` | Progress, modules and continue-where-you-left-off |
| Account | `/account` | Profile, purchases, password change, delete account |
| Admin | `/admin` | Buyers, coupons and a CDN note |
| Legal | `/legal/:page` | Terms, privacy, refunds, acceptable use |

## The creative feature set

Four interactive systems carry the teaching load, and each is deliberately a different kind of
component:

1. **Setup Roadmap** (`src/components/sections/SetupRoadmap.tsx`) — 13 steps with *where to go*
   links, ordered actions, a copy-ready verify command, the specific trap at each step, a real
   screenshot, and a progress bar persisted in `localStorage`. Filterable by phase.
2. **Mistake Vault** (`src/components/sections/ErrorDecoder.tsx`) — 18 real errors, each with the
   symptom as it appears on screen, the plain-English cause, the exact fix and a copyable command.
   Searchable and filterable by stage and severity.
3. **Command Center** (`src/components/sections/CommandCenter.tsx`) — every terminal command
   grouped into five phases, each block with a one-click copy button and a note on what success
   looks like.
4. **Download Hub** (`src/components/sections/DownloadHub.tsx`) — twelve official sources with
   size-to-expect, the check that proves the install worked, a safe-download checklist, per-app
   camera/microphone recipes and the start order that never fails.

## Design notes

- **Zero emoji.** Every glyph on the site is an inline SVG from `src/components/ui/Icon.tsx`.
- **Phone mockup hero.** `src/components/ui/PhoneMockup.tsx` renders the companion-app mockup in
  pure markup — crisp at any size, themeable, and readable by screen readers.
- **Mobile first.** Every grid, table, tab rail and button has an explicit small-screen layout,
  with 44px touch targets, horizontally scrollable chip rails and no horizontal page overflow.

## Tech stack

React 19, Vite 8, TypeScript 5.7, Tailwind CSS 4, React Router 7, `react-markdown` + `remark-gfm`.

## Getting started

```bash
pnpm install
pnpm dev      # Vite dev server on http://localhost:8443
pnpm build    # production build into dist/
pnpm preview  # preview the production build
pnpm format   # oxfmt
```

## Project layout

```
src/
  App.tsx                      routes, chrome, scroll/hash manager
  index.css                    Tailwind v4 theme tokens, motion, layout safety
  config/
    pricing.ts                 the single ₦159,000 product + payment options
    setup.ts                   roadmap steps, downloads, mistake vault, commands
    courses.ts                 modules and markdown lessons
  components/
    ui/                        Button, Badge, Card, Accordion, Callout, Icon,
                               PhoneMockup, CommandBlock, ProgressBar
    sections/                  SetupRoadmap, DownloadHub, ErrorDecoder,
                               CommandCenter, ProductShowcase, ToolMarquee
    layout/                    Nav, Footer
  pages/                       Landing, Pricing, Checkout, Course, Dashboard,
                               Account, Admin, Auth, FreeLesson, Legal, NotFound
public/imports/                the real screenshots referenced by the lessons
```

## Legal and ethics

This is educational material about how open-source face-swap and voice-conversion software works.
Use only faces and voices that are your own, licensed to you, or fully synthetic, and always
disclose AI-generated media. Never impersonate a real person, deceive someone on a call, or bypass
identity verification. See `/legal/acceptable-use`.

## Roadmap for the next pass

- Wire `POST /api/create-checkout` to a real Paystack initialise call and verify with a webhook.
- Replace the mock auth and mock purchases with Supabase (email/password, RLS on entitlements).
- Move lesson screenshots to object storage and serve them with signed URLs.
