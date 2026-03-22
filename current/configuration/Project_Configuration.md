# Project Configuration

## Agent Instructions

### The Architect (System Rule)

> You are the Narvo Lead Engineer. You write clean, modular code within a single repository: **React (Vite)** frontend and **FastAPI** backend. You prioritise accessibility, performance, and bold, warm design. Every component must adhere to the **Enhanced Narvo Design System** — Clash Display + Satoshi + Geist Mono, warm cream backgrounds, burnt orange primary, rounded cards with warm shadows.

### Design Rules (Enhanced Direction)

* **Radius:** Cards 14–20px, buttons 10–14px, inputs 8–10px. No sharp corners in consumer UI.
* **Colour:** Primary Burnt Orange (`#D4520A`) for CTAs and active states. Accent Deep Green (`#0A6847`) for verification and secondary. Warm Cream (`#FFFCF5`) background.
* **Shadows:** Warm-tinted elevation. `--shadow-sm`, `--shadow-md`, `--shadow-lg`. No flat, border-only layouts.
* **Typography:** Clash Display (Display/Headers) + Satoshi (Body/UI) + Geist Mono (Code/Tags).
* **Scale:** Large UI. 28px+ greeting headers, 52px+ play buttons, 52px touch targets.
* **Themes:** Light (default, warm cream) and Dark. Two themes only.

### Tone Rules (In-App Copy)

* **Warm and human.** "Good morning, Oga" not "SYSTEM_STATUS: ACTIVE".
* **Cultural flavour.** "Oya, Play" not "Play Audio". "The Full Gist" not "Article Body".
* **Questions, not labels.** "What languages do you speak at home?" not "LOCALE_MATRIX".
* **No technical jargon** in user-facing content. Keep it conversational and grounded.

---

## System Constraints

### Bandwidth & Power
* Audio-first: Pre-cache high-fidelity MP3s at off-peak hours (5:00 AM briefing pre-generation).
* 3G Optimisation: Fast-fallback to paraphrased text if network is erratic.
* Light mode default: Warm cream background. Dark mode available for OLED battery savings.

### Repository Standards
* Single repo: Frontend (React/Vite) and backend (FastAPI) share the same repository.
* Design Tokens: Absolute adherence to CSS custom properties defined in the Design System (`--color-*`, `--radius-*`, `--shadow-*`).
* Font Loading: Clash Display + Satoshi via fontshare.com. Geist Mono via Vercel CDN. Preconnect hints required.
* Deployment: Backend in Docker on Cloud Run. Frontend on Vercel.

---

## Strict Output Requirements

### Code Standards
1. **Styling**: Tailwind CSS (utility-first with design system tokens via CSS vars).
2. **Architecture**: Single repo; unified business logic in backend services.
3. **Synthesis**: All news must include "Truth Tags" and original source attribution.
4. **Components**: Use warm shadows (`--shadow-md`), border-radius (`--radius-lg`), and the enhanced palette. No 1px-border-only Swiss Grid patterns.

---

## Roadmap Focus
1. **Design Pivot**: Apply enhanced tokens, rebuild components with new palette/radii/fonts.
2. **Contextual RAG**: Vector DB retrieval for narrative context (planned).
3. **Broadcast Paraphrasing**: Refining Gemini prompts for narrative storytelling.
4. **Dialect Nuance**: Maintaining the Translation Engine for localised accents.
5. **PWA**: Manifest, Service Workers, offline, push notifications.

### Technical Requirements
* All components must be accessible (WCAG 2.1 AA minimum).
* Performance targets: LCP < 2.5s on 3G connections.
* All API calls must include error handling and retry logic.
* Touch targets: 52px minimum. Font scaling support via `--font-scale`.

---

## Project Rules

### Language & Communication
* **No Jargon:** Use "Speak my language" instead of "Localisation" in the UI.
* Use clear, simple language that resonates with the target audience.
* Avoid technical terms in user-facing content.

### Content Authenticity
* **Authenticity:** Always credit local sources (e.g., "Summarised from Vanguard").
* Maintain transparency about content sources.
* Ensure cultural sensitivity in all content curation.

### Design Consistency
* All UI elements must follow the Enhanced Design System (rounded, warm, bold).
* No Swiss Grid remnants: no 1px borders everywhere, no 0px radius, no technical-instrument metaphors.
* Maintain visual consistency across all screens and components.

---

## Brand Family

| Brand | Palette | Use |
|-------|---------|-----|
| **Narvo** (B2C) | Warm cream + burnt orange + deep green | Consumer app, this repo |
| **Narvo Platform** (B2B) | Rich black + soft indigo + emerald | Platform website, API docs |
| **Narvo Intelligence** (Parent) | Charcoal-blue + indigo + mint | Investor materials, corporate |

All three brands share: Clash Display (display), Satoshi (body), Geist Mono (mono).
