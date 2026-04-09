# Narvo Intelligence — Documentation

> Central archive for all Narvo startup documentation. Current and legacy docs, organised by category.

**Narvo Intelligence** is the parent company behind [Narvo](https://github.com/Narvo-Intelligence/narvo_news) (B2C consumer app) and Narvo Platform (B2B NaaS).

---

## Repository Structure

```
documentations/
├── current/                        ← Active documentation (March 2026, Design System v4)
│   ├── design/                     Design System v4, App Copy
│   ├── business/                   Blueprint, Parent entity, B2C Product, B2B Platform
│   ├── technical/                  Technical reference (architecture, data model)
│   ├── research/                   Stack analysis, competitors, UX patterns, strategy
│   └── pitch/                      Investor pitch deck (.pptx)
│
└── legacy/                         ← Archived documentation
    ├── design/                     Design System v3, Brand Guidelines v3, v3 JSX prototypes
    ├── v2-enhanced/                Enhanced direction (Mar 2026) — superseded by v3/v4
    ├── business/                   Swiss Grid era pitch deck, monetisation, NaaS
    ├── design/                     Swiss Grid design system, old app copy
    ├── technical/                  Old technical docs, PWA/Rust strategy
    ├── content/                    Content sources, content strategy
    ├── configuration/              Old project configuration
    └── assets/                     Logo SVG
```

---

## Current Documents

### Design

| Document | Format | Description |
|----------|--------|-------------|
| [Design System v4](current/design/Narvo_Design_System_v4.md) | MD | Complete brand and UI reference — continent fragment mark, six-colour system, warm neutral scale, three-typeface system, full token architecture — 820+ lines |
| [App Copy](current/design/Narvo_App_Copy.md) | MD | All user-facing text — warm, human, culturally grounded |

### Business & Product

| Document | Format | Description |
|----------|--------|-------------|
| Company Blueprint | DOCX | Master strategy document — 8 parts, all aspects of the startup |
| Parent Entity Document | DOCX | Narvo Intelligence corporate: legal, operations, investor relations |
| B2C Product Document v2 | DOCX | Narvo consumer app: "Spotify for News" concept, user flows, tech stack, MVP roadmap |
| B2B Platform Document | DOCX | Narvo Platform: NaaS APIs, target clients, commercial model, roadmap |

### Technical

| Document | Format | Description |
|----------|--------|-------------|
| [Technical Reference](current/technical/TECHNICAL_REFERENCE.md) | MD | Architecture, data model, infrastructure — 900+ lines |

### Research

| Document | Format | Description |
|----------|--------|-------------|
| [Research Index](current/research/README.md) | MD | Overview, context, how-to-use |
| [01 — Stack Analysis (Free MVP)](current/research/01_Stack_Analysis_Free_MVP.md) | MD | Current stack audit, free alternatives, MVP cost table |
| [02 — Premium Tools Roadmap](current/research/02_Premium_Tools_Roadmap.md) | MD | Paystack, CDN, Recombee, ElevenLabs — phased adoption |
| [03 — UX Design Patterns](current/research/03_UX_Design_Patterns.md) | MD | Landing page, feed, nav, audio player, onboarding, micro-interactions |
| [04 — Competitor Analysis](current/research/04_Competitor_Analysis.md) | MD | Opera News, Pulse NG, Curio, Artifact, African app design lessons |
| [05 — Strategic Opportunities](current/research/05_Strategic_Opportunities.md) | MD | Pidgin audio, WhatsApp distribution, Truth Tag, offline, voice-first |
| [06 — Realtime and Audio Delivery Analysis](current/research/06_Realtime_and_Audio_Delivery_Analysis.md) | MD | Working draft on realtime fanout, audio formats, and delivery choices |
| [07 — MVP Launch Checklist and Grant Priority](current/research/07_MVP_Launch_Checklist_and_Grant_Priority.md) | MD | Launch scope, must-ship priorities, and grant-facing framing |

### Pitch

| Document | Format | Description |
|----------|--------|-------------|
| Pitch Deck | PPTX | 12-slide investor presentation with Narvo Intelligence branding |

---

## Design System v4 (March 2026)

Built from mathematical first principles with a new brand identity direction.

| | Narvo Intelligence | Narvo (B2C) | Narvo Platform (B2B) |
|---|---|---|---|
| **Display Font** | Instrument Sans | Fraunces (variable serif) | Geist Sans |
| **Body Font** | Inter | Plus Jakarta Sans | Geist Sans |
| **Label/Meta Font** | Geist Mono | Geist Mono | Geist Mono |
| **Type Ratio** | 1.333 (Perfect Fourth) | 1.250 (Major Third) | 1.200 (Minor Third) |
| **Background** | `#FDFDFD` clean white | `#F3E8CC` Cream | `#0D0F1A` near black |
| **Primary** | `#5B52EF` deep indigo | `#18542A` Forest Green | `#22AAD0` electric cyan |
| **CTA** | — | `#F96015` Crisp Carrot | — |
| **Accent** | `#06D6A0` mint | `#FFC926` Sunshine Yellow | `#34D399` emerald |
| **Card Radius** | 6–8px | 16–20px | 8–10px |
| **Shadow Tint** | Neutral | Warm green `rgba(24,84,42,·)` | None (surface tint) |
| **Default Mode** | Light | Light | Dark |

### B2C Six-Colour System

**Brand Identity:** Forest Green `#18542A` · Sunshine Yellow `#FFC926` · Cream `#F3E8CC`

**Functional:** Crisp Carrot `#F96015` (all CTAs) · Tomato Burst `#D52518` (urgency only) · Kiwi `#9ABC05` (Truth Tag / verified only)

### Mathematical Foundations

- **Typography:** `Size(n) = base × ratio^n` — modular scale per brand
- **Spacing:** 8px grid — `0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128`
- **Colour:** OKLCH perceptual colour space; warm neutral scale (hue 60°, cream axis)
- **Motion:** Spring physics (stiffness 260, damping 20), MD3 cubic-bezier curves
- **Touch targets:** Fitts's Law — 48px minimum, larger for primary CTAs
- **Elevation:** Warm green shadow tint (light mode); surface tint (dark mode)

### Token Architecture

Three-layer system: **Primitives** (brand-specific raw values) → **Semantics** (shared purpose-based aliases) → **Components** (element-specific mappings). Brand switching via `[data-brand]` CSS attribute.

### Brand Mark

Continent fragment mark — Africa's silhouette abstracted into three horizontal hexagonal polygon fragments. The gap between fragments is structural. Never close it.

---

## Legacy Documents

### Design System v3 (Archived March 2026)

`legacy/design/` contains the v3 design system files — sunset amber primary, adire indigo accent, General Sans typeface, warm champagne background. Superseded by Design System v4.

### v2 Enhanced Direction (Archived)

`legacy/v2-enhanced/` contains the Clash Display + Satoshi era with burnt orange primary. Superseded by v3 → v4.

### Swiss Grid Era (Archived)

`legacy/` root contains pre-pivot documentation from the Swiss Grid era — Space Grotesk + Inter, 0px radii. Fully superseded.

---

## Author

**Ajibola Akelebe** — Founder & Sole Developer, Narvo Intelligence

- GitHub: [@Narvo-Intelligence](https://github.com/Narvo-Intelligence) (org) · [@ajibolagenius](https://github.com/ajibolagenius) (personal)
