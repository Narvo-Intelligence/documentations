# Landing Page — v3 Implementation Log

> **Series:** Narvo B2C Revamp · Document 06 of 06
> **Date:** 26 March 2026
> **Commit:** `c198178` — `feat(landing): complete v3 landing page`
> **Status:** ✅ Shipped to `main` — narvo.news

---

## What Was Built

Full v3 Design System landing page replacing the previous Swiss/dark v2 design. Zero breaking changes to other app pages — all changes are additive.

---

## Files Changed

| File | Change |
|------|--------|
| `frontend/index.html` | General Sans (fontshare) + Geist Mono (jsDelivr) font imports; v2 Google Fonts kept as fallback |
| `frontend/src/index.css` | `[data-theme='warm']` v3 token block appended; wave-bar keyframe animation; reduced-motion override |
| `frontend/tailwind.config.js` | `fontFamily` updated to General Sans primary (v2 fonts kept as fallback) |
| `frontend/src/pages/LandingPage.tsx` | Complete v3 rewrite — 1,081 lines |

---

## LandingPage.tsx — Section Architecture

```
Nav (sticky, scroll-aware backdrop blur)
  └── Breaking Banner (AnimatePresence, dismiss action)
Hero
  ├── Left: Headline · Sub · CTAs · Trust signals · Push notification teaser
  └── Right: PhoneMockup (decorative, aria-hidden, wave-bar animation)
Stats Strip (4 live metrics from /api/metrics via SWR)
Bento Features (5 cards)
  ├── Amber: AI Synthesis — large card, spans 2 rows on sm+
  ├── Teal: Truth Tag
  ├── Neutral: Morning Briefing
  ├── Indigo: 5 Nigerian Languages
  └── Teal: Works Offline
Live Feed (SWR /api/news?limit=6 — 4 stories, skeleton loading)
Social Proof (testimonial blockquote + 4 metric cards)
Voice Section (copy + 5 language cards → opens voice modal)
Final CTA (dark #2A2420 bg — two CTAs: start + hear sample)
Footer (4-col: brand · product · company · get started CTA)
Voice Preview Modal (AnimatePresence spring entry, full TTS cache chain)
```

---

## Design Tokens Applied

| Token | OKLCH | Hex | Usage |
|-------|-------|-----|-------|
| Background | `oklch(0.98 0.01 75)` | #FDF8F0 | Page bg, nav bg |
| Surface | `oklch(0.96 0.008 75)` | #FAF6EE | Cards, footer |
| Primary | `oklch(0.68 0.18 52)` | #D4850A | CTAs, amber bento card |
| Accent | `oklch(0.55 0.20 275)` | #5B5BD6 | Tag pill, AI badge |
| Secondary | `oklch(0.58 0.12 175)` | #18967E | Verified icons, teal cards |
| Text | `oklch(0.22 0.02 50)` | #2A2420 | Headings, body |
| Text secondary | `oklch(0.50 0.14 48)` | #6B5A40 | Labels, captions |
| Border | `oklch(0.78 0.10 55)` | #CFA46E | Card borders |

Shadows: warm amber-tinted `rgba(139,90,43,...)` — no grey shadows.

---

## Motion Spec Applied

- Spring: `{ type: 'spring', stiffness: 260, damping: 20 }`
- Entrance: `{ opacity: 0, y: 12 } → { opacity: 1, y: 0 }`
- Stagger: `delay: i × 0.06`
- Press: `whileTap: { scale: 0.96 }`
- Hero phone mockup: `{ opacity: 0, x: 20, y: 8 } → { opacity: 1 }` with `delay: 0.15`
- Breaking banner: `AnimatePresence` with `y: -8` exit
- Voice modal: `AnimatePresence` with `y: 40` spring entry
- `useReducedMotion()` gate on all Framer Motion props

---

## Copy Source

All copy follows `Narvo_App_Copy.md` Section 10 (Landing Page) + tone guidelines:
- Hero: *"Africa's news, explained — then spoken."*
- Sub: *"AI reads {n}+ sources so you don't have to."*
- Primary CTA: *"Start listening free"*
- Bottom CTA: *"Your morning briefing is waiting."*
- Voice modal: *"Your Narvo Voice · Choose how your stories sound"*

---

## Logic Preserved from v2

All functional logic from the original LandingPage.tsx was carried forward:

| Feature | Preserved |
|---------|-----------|
| SWR hooks (`/api/news`, `/api/news/breaking`, `/api/metrics`) | ✅ |
| Voice preview — mem cache → IDB → API TTS pipeline | ✅ |
| Push notification subscribe (`subscribeToPush`) | ✅ |
| Breaking news banner (dismiss, navigate) | ✅ |
| `data-testid` attributes for all interactive elements | ✅ |
| `useAudio` context (playTrack, stopTrack) | ✅ |

---

## Build Output

```
LandingPage-7A6xTI4J.js    44.21 kB │ gzip: 11.16 kB
```

Zero TypeScript errors. Zero new ESLint warnings.

---

## What's Next (Phase 4 continued)

| Task | Priority |
|------|----------|
| DashboardPage v3 (feed redesign, 5-tab nav) | High |
| MobileNav component (5 tabs replacing 4-tab + More sheet) | High |
| Settings consolidation (4 pages → 1 tabbed SettingsPage) | High |
| Phase 1 surgery (delete ToolsPage, NarrativeDuelPage, ReputationDashboardPage) | Medium |
| Phase 2 code quality (App.jsx → TSX, component restructure) | Medium |
