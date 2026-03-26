# Narvo Intelligence — Documentation

> Central archive for all Narvo startup documentation. Legacy and current docs, organised by category.

**Narvo Intelligence** is the parent company behind [Narvo](https://github.com/Narvo-Intelligence/narvo_news) (B2C consumer app) and Narvo Platform (B2B NaaS).

---

## Repository Structure

```
documentations/
├── current/                        ← Active documentation (March 2026, Design System v3)
│   ├── brand/                      Brand Guidelines v3 (OKLCH, differentiated typefaces)
│   ├── business/                   Company Blueprint, Parent entity doc
│   ├── product/                    B2C Product Document, B2B Platform Document
│   ├── design/                     Design System v3, App Copy
│   ├── technical/                  Technical reference (architecture, data model)
│   ├── pitch/                      Investor pitch deck (.pptx)
│   ├── prototypes/                 Interactive React prototypes (.jsx)
│   └── repo-files/                 Files intended for narvo_news repo root
│
└── legacy/                         ← Archived documentation
    ├── v2-enhanced/                Enhanced direction (Mar 2026) — superseded by v3
    │   ├── brand/                  v2 Brand Guidelines (Clash Display + Satoshi)
    │   ├── design/                 v2 Design System, UX Pivot Spec
    │   ├── configuration/          v2 Project Configuration
    │   └── prototypes/             v2 brand boards and variations
    ├── business/                   Swiss Grid era pitch deck, monetisation, NaaS
    ├── design/                     Swiss Grid design system, old app copy
    ├── technical/                  Old technical docs, PWA/Rust strategy
    ├── content/                    Content sources, content strategy
    ├── configuration/              Old project configuration
    └── assets/                     Logo SVG
```

---

## Current Documents

### Brand

| Document | Format | Description |
|----------|--------|-------------|
| [Brand Guidelines v3](current/brand/Narvo_Brand_Guidelines_v3.md) | MD | Three-brand identity: OKLCH palettes, differentiated typefaces, mathematical foundations |

### Business & Strategy

| Document | Format | Description |
|----------|--------|-------------|
| Company Blueprint | DOCX | Master strategy document — 8 parts, all aspects of the startup |
| Parent Entity Document | DOCX | Narvo Intelligence corporate: legal, operations, investor relations |

### Product

| Document | Format | Description |
|----------|--------|-------------|
| B2C Product Document | DOCX | Narvo consumer app: concept, user flows, screens, tech stack, MVP roadmap |
| B2B Platform Document | DOCX | Narvo Platform: NaaS APIs, target clients, commercial model, roadmap |

### Design

| Document | Format | Description |
|----------|--------|-------------|
| [Design System v3](current/design/Narvo_Design_System_v3.md) | MD | Mathematical foundations: OKLCH colour, modular type scales, 8px grid, spring physics, 3-layer tokens — 787 lines |
| [App Copy](current/design/Narvo_App_Copy.md) | MD | All user-facing text — warm, human, culturally grounded |

### Technical

| Document | Format | Description |
|----------|--------|-------------|
| [Technical Reference](current/technical/TECHNICAL_REFERENCE.md) | MD | Architecture, data model, infrastructure — 900+ lines |

### Research

| Document | Format | Description |
|----------|--------|-------------|
| [Research Index](current/research/README.md) | MD | Overview, context, how-to-use |
| [01 — Stack Analysis (Free MVP)](current/research/01_Stack_Analysis_Free_MVP.md) | MD | Current stack audit, free alternatives, MVP cost table |
| [02 — Premium Tools Roadmap](current/research/02_Premium_Tools_Roadmap.md) | MD | Paystack, Backblaze+Cloudflare CDN, Recombee, ElevenLabs — phased adoption |
| [03 — UX Design Patterns](current/research/03_UX_Design_Patterns.md) | MD | Landing page, feed, nav, audio player, onboarding, microinteractions |
| [04 — Competitor Analysis](current/research/04_Competitor_Analysis.md) | MD | Opera News, Pulse NG, Curio (closed), Artifact (closed), African app design lessons |
| [05 — Strategic Opportunities](current/research/05_Strategic_Opportunities.md) | MD | Narvo's 5 advantages: Pidgin audio, WhatsApp distribution, Truth Tag, offline, voice-first |

### Pitch

| Document | Format | Description |
|----------|--------|-------------|
| Pitch Deck | PPTX | 12-slide investor presentation with Narvo Intelligence branding |

### Prototypes

| File | Description |
|------|-------------|
| narvo_design_system_v3.jsx | Interactive three-brand showcase — palettes, type scales, radii, cards, mathematical foundations |
| narvo_concept_prototype.jsx | "Spotify for News" — full app prototype with 4 tabs, player, playlists |
| narvo_concept_prototype_v2.jsx | Updated concept prototype |

### Repo Files

Files intended for the [narvo_news](https://github.com/Narvo-Intelligence/narvo_news) repository root:

- `README.md` — Repo README
- `Narvo_Overview.md` — Product overview

---

## Design System v3 (March 2026)

Built from mathematical first principles. OKLCH colour science. Modular type scales. Physics-based motion.

| | Narvo Intelligence | Narvo (B2C) | Narvo Platform (B2B) |
|---|---|---|---|
| **Display Font** | Instrument Sans | General Sans | Geist Sans |
| **Body Font** | Inter | General Sans | Geist Sans |
| **Mono Font** | Geist Mono | Geist Mono | Geist Mono |
| **Type Ratio** | 1.333 (Perfect Fourth) | 1.250 (Major Third) | 1.200 (Minor Third) |
| **Background** | `#FDFDFD` clean white | `#FDF8F0` warm champagne | `#0D0F1A` near black |
| **Primary** | `#5B52EF` deep indigo | `#D4850A` sunset amber | `#22AAD0` electric cyan |
| **Accent** | `#06D6A0` mint | `#5B5BD6` adire indigo | `#34D399` emerald |
| **Card Radius** | 6–8px | 16–20px | 8–10px |
| **Shadow Tint** | Neutral | Warm amber | None (surface tint) |
| **Default Mode** | Light | Light | Dark |

### Mathematical Foundations

- **Typography:** `Size(n) = base × ratio^n` — modular scale per brand
- **Spacing:** 8px grid — `0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128`
- **Colour:** OKLCH perceptual colour space, 12-step scales per hue (Radix pattern)
- **Motion:** Spring physics (`F = -kx - dv`), MD3 cubic-bezier curves
- **Layout:** Golden ratio (φ = 1.618) for content splits and card proportions
- **Touch targets:** Fitts's Law — 48px minimum, larger for primary CTAs
- **Elevation:** Z-axis shadow formula, logarithmic dark-mode surfaces

### Token Architecture

Three-layer system: **Primitives** (brand-specific raw values) → **Semantics** (shared purpose-based aliases) → **Components** (element-specific mappings). Brand switching via `[data-brand]` CSS attribute.

---

## Legacy Documents

### v2 Enhanced Direction (Archived)

The `legacy/v2-enhanced/` directory contains the "Enhanced Direction" docs from early March 2026 — the Clash Display + Satoshi era with burnt orange primary and warm cream background. These are superseded by Design System v3.

### Swiss Grid Era (Archived)

The `legacy/` root contains pre-pivot documentation from the Swiss Grid era (Feb–Mar 2026) — Space Grotesk + Inter, 0px radii, technical-instrument metaphor. Fully superseded.

---

## Author

**Ajibola Akelebe** — Founder & Sole Developer, Narvo Intelligence

- GitHub: [@Narvo-Intelligence](https://github.com/Narvo-Intelligence) (org) · [@ajibolagenius](https://github.com/ajibolagenius) (personal)
