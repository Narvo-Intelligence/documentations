# Narvo Design Foundation — v5
### Approved Visual System for the Next Narvo Build

> **Version:** 5.0  
> **Date:** March 29, 2026  
> **Author:** Ajibola Akelebe — Founder & Sole Developer, Narvo Intelligence  
> **Scope:** Narvo B2C brand foundation, colour system, typography system, and core visual rules  
> **Status:** Approved foundation — implementation pending, component system next  

---

## Table of Contents

1. [Purpose](#1-purpose)
2. [Brand Position](#2-brand-position)
3. [Visual Principles](#3-visual-principles)
4. [Product Surface Intent](#4-product-surface-intent)
5. [Colour System](#5-colour-system)
6. [Typography System](#6-typography-system)
7. [Spacing, Radius, Shadow, and Motion Foundations](#7-spacing-radius-shadow-and-motion-foundations)
8. [Token Architecture](#8-token-architecture)
9. [Usage Rules](#9-usage-rules)
10. [Accessibility Rules](#10-accessibility-rules)
11. [Implementation Notes](#11-implementation-notes)

---

## 1. Purpose

This document replaces the earlier colour and typography direction as the approved foundation for Narvo’s next design phase.

It exists to solve three problems:

1. Narvo needs a single clear visual engine, not multiple competing aesthetic directions.
2. The product must balance editorial trust with a modern, mobile-native feel.
3. The repo needs one canonical reference before the component system is redesigned.

This is a **foundation document**, not the final component library. It defines the visual logic that all future components must inherit.

---

## 2. Brand Position

Narvo is an audio-first news product. It is not a bank, a generic AI wrapper, or a traditional newspaper site.

The brand must feel like:

- **A daily utility** people can check at 5 AM without visual fatigue.
- **A trusted synthesis engine** that feels informed, not loud.
- **A modern listener product** that still has enough energy to feel current on web and mobile.

That leads to one core conclusion:

- The product needs a **calm base** for sustained use.
- It also needs a **hot accent** for playback, urgency, and live moments.

Narvo therefore uses a hybrid system:

- **Core engine:** `Petrol Teal`
- **Attention signal:** `Signal Vermilion`

This is the right balance between:

- **The Gist**: trust, synthesis, storytelling
- **The Pipeline**: motion, urgency, digital energy

---

## 3. Visual Principles

### 3.1 Calm Base, Hot Moments

The interface should feel stable most of the time. Energy appears only when the product has a reason to ask for attention.

- Calm base: navigation, surfaces, layout structure, reading environment
- Hot moments: play actions, live states, breaking items, active audio, urgent prompts

### 3.2 Editorial, Not Institutional

Narvo should have enough serif authority to feel editorial, but not so much that it looks like a legacy publication.

### 3.3 Modern, Not Trend-Chasing

The UI should feel current and app-native without relying on visual noise, neon overload, or decorative complexity.

### 3.4 Product First

The brand should support the product surfaces:

- dashboard
- news detail
- morning briefing
- persistent player
- listen/discover
- library/offline

The system must survive repetition. If a style looks good only once on a hero banner, it is not a Narvo foundation.

### 3.5 Distinct, Not Fintech-Copied

Narvo can borrow the discipline of single-colour-led brands like CowryWise, but it should not inherit their category signals. The approved system is teal-led, not trust-blue, and not earth-tone-led.

---

## 4. Product Surface Intent

The foundation must support the actual product structure already visible in the codebase and visual explorations.

| Surface | Primary goal | Visual behaviour |
|--------|--------------|------------------|
| Dashboard / feed | Scan quickly, trust instantly | Calm background, strong headline hierarchy, sparing vermilion |
| News detail | Read comfortably, verify context | Highest readability, lowest decorative noise |
| Morning Briefing | Feel premium and routine | Strong display typography, controlled warmth |
| Audio player | Emphasise action and continuity | Vermilion can become more visible here |
| Listen / Discover | Feel curated, browseable | Teal structure with lighter support colours |
| Voice / truth surfaces | Signal system intelligence | Mono stamps, teal-based structural credibility |

The general rule is:

- Reading surfaces should be quieter than browsing surfaces.
- Audio surfaces can carry slightly more energy than article surfaces.
- Breaking or live moments can spike in colour, but the entire app should not.

---

## 5. Colour System

### 5.1 Palette Structure

The Narvo colour system is divided into four layers:

1. **Core brand**
2. **Structural support**
3. **Functional states**
4. **Auxiliary illustration/data colours**

Each colour must own a job. Shared ownership creates drift.

### 5.2 Core Brand Colours

| Name | Hex | Role |
|------|-----|------|
| Petrol Teal | `#0F5F73` | Primary brand colour, core identity, structural anchor |
| Deep Ink | `#17324A` | Maximum contrast text, nav ink, high-emphasis UI |
| Cloud White | `#F6F8FB` | Main page background |
| Cool Mist | `#EEF3F7` | Secondary surface, cards, shells, raised sections |
| Slate Mist | `#6C7F93` | Secondary text, support copy, inactive UI |

### 5.3 Functional Accent Colours

| Name | Hex | Role |
|------|-----|------|
| Signal Vermilion | `#F04B24` | Playback, active CTA moments, live, urgent, breaking |
| Seafoam Mint | `#7FDDCA` | Positive support, subtle confidence, soft chart accent |
| Soft Butter | `#F2D66B` | Highlights, guided emphasis, onboarding warmth |

### 5.4 Auxiliary Support Colours

These are not identity colours. They are controlled support colours for charts, empty states, illustration accents, and analytical surfaces.

| Name | Hex | Role |
|------|-----|------|
| Mist Lilac | `#ACB6FF` | Secondary data accent, insights, layered depth |
| Soft Coral | `#FF9F8D` | Soft warning fill, promo support, warm background accents |

### 5.5 Role Definitions

#### Petrol Teal

This is the brand engine.

Use for:

- navigation shells
- hero panels
- primary structural surfaces
- player shells
- major emphasis lines
- selected states when urgency is not involved

Do not use Petrol Teal as a universal fill for every component. It should shape the product, not flood it.

#### Deep Ink

This is the contrast layer.

Use for:

- headline text on light surfaces
- icon strokes
- strong dividers
- complex data labels
- dense UI contexts

Deep Ink is not a separate brand colour. It is a support colour that allows Petrol Teal to stay premium instead of doing all the work.

#### Signal Vermilion

This is the action and urgency colour.

Use for:

- primary play buttons
- active playback states
- breaking news
- live states
- urgent notifications
- progress highlights when attention matters

Do not use Signal Vermilion as the default background of screens, cards, or navigation.

#### Seafoam Mint and Soft Butter

These are support colours that keep the system from becoming cold.

Use them for:

- subtle chips
- secondary highlights
- onboarding guidance
- chart support
- supporting illustration shapes

They should remain visibly secondary to Petrol Teal.

### 5.6 Usage Ratio

Narvo uses a deliberate ratio:

- `60%` light surfaces: `Cloud White`, `Cool Mist`, white
- `30%` teal structure: `Petrol Teal`, `Deep Ink`
- `10%` hot/support accents: `Signal Vermilion`, `Seafoam Mint`, `Soft Butter`, `Mist Lilac`

This is not mathematical per page. It is a system discipline.

If a screen feels loud, the first thing to reduce is warm accent usage.

### 5.7 Surface Pairings

| Background | Headline | Body | CTA / Accent |
|-----------|----------|------|--------------|
| Cloud White | Deep Ink | Slate Mist | Signal Vermilion |
| Cool Mist | Deep Ink | Slate Mist | Petrol Teal or Signal Vermilion depending on urgency |
| Petrol Teal | White | rgba(255,255,255,0.82) | Soft Butter or Signal Vermilion |
| Deep Ink | White | rgba(255,255,255,0.72) | Signal Vermilion |

### 5.8 Tints and Soft Fills

| Token | Value | Use |
|------|-------|-----|
| `--color-primary-tint` | `rgba(15, 95, 115, 0.10)` | soft category tags, hover fills |
| `--color-alert-tint` | `rgba(240, 75, 36, 0.10)` | breaking chips, urgent states |
| `--color-success-tint` | `rgba(127, 221, 202, 0.14)` | positive indicators |
| `--color-highlight-tint` | `rgba(242, 214, 107, 0.16)` | editorial highlights |

### 5.9 Gradient Rules

Gradients are allowed, but they must remain controlled.

Approved pattern:

```css
background: linear-gradient(135deg, #0F5F73 0%, #0A4959 100%);
```

Use gradients on:

- hero surfaces
- large feature panels
- player shells

Do not use gradients inside dense reading surfaces.

### 5.10 Data and Illustration Colour Rules

- Data visualisations should start with Petrol Teal and Deep Ink.
- Use Mist Lilac and Seafoam Mint before adding more colours.
- Signal Vermilion should only enter charts when highlighting exceptions, drops, spikes, or urgency.
- Soft Butter is better for guidance and context than for numerical emphasis.

### 5.11 Hard Colour Rules

- Never turn Signal Vermilion into the default page colour.
- Never use all support colours in a single compact card.
- Never let auxiliary colours compete with Petrol Teal on the same hierarchy level.
- Never use saturated blue as a competing primary brand colour.
- Never make the app feel like a warning state when nothing urgent is happening.

---

## 6. Typography System

### 6.1 Typeface Selection

| Role | Typeface | Source | Licence |
|------|----------|--------|---------|
| Display and Headlines | **Newsreader** | Google Fonts | Free, open |
| Body and UI | **Instrument Sans** | Google Fonts / official release | Free, open |
| Labels, Metadata, Stamps | **Geist Mono** | Vercel / package | Free, open |

### 6.2 Why This Pairing Wins

#### Newsreader

Newsreader is the best display and editorial headline fit for Narvo because:

- it is designed for reading-rich digital environments
- it has authority without stiffness
- it feels calmer and more durable than Fraunces in repeated product contexts
- it gives Narvo an editorial spine without making the product look old

#### Instrument Sans

Instrument Sans is the body and UI layer because:

- it feels more current and product-native than Plus Jakarta Sans in this system
- it supports dashboard density and mobile controls very well
- it adds modern clarity without flattening the brand

#### Geist Mono

Geist Mono remains the technical stamp layer because:

- metadata should feel precise
- timestamps, truth tags, durations, and system markers benefit from consistent fixed-width rhythm
- it supports Narvo’s intelligence and verification posture

### 6.3 Typography Philosophy

Narvo typography should read like:

- a trusted morning brief
- a modern audio tool
- a product that respects the reader’s intelligence

It should not read like:

- a playful startup landing page
- a newspaper replica
- a generic fintech dashboard

### 6.4 Font Loading

```css
@import url('https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600;6..72,700&family=Instrument+Sans:wght@400;500;600;700&display=swap');
```

`Geist Mono` should be loaded via package or `@font-face` in the frontend build rather than treated as a system fallback.

### 6.5 Type Scale

The approved scale is editorial-first, then product-adapted. It is slightly tighter at the top than a generic marketing scale because Narvo repeats headlines across cards, lists, and article surfaces.

#### Desktop Scale

| Token | Size | Weight | Typeface | Use |
|------|------|--------|----------|-----|
| `--text-display` | 64px | 700 | Newsreader | landing hero, major campaign headers |
| `--text-h1` | 52px | 700 | Newsreader | page titles, Morning Briefing hero |
| `--text-h2` | 40px | 700 | Newsreader | large section titles |
| `--text-h3` | 32px | 600 | Newsreader | feature cards, article section heads |
| `--text-h4` | 26px | 600 | Newsreader | news card titles, player titles |
| `--text-lead` | 20px | 500 | Instrument Sans | intro copy, decks |
| `--text-body` | 16px | 400 | Instrument Sans | body copy, descriptions |
| `--text-body-sm` | 14px | 400 | Instrument Sans | compact lists, support text |
| `--text-label` | 12px | 600 | Instrument Sans | chips, tabs, nav labels |
| `--text-stamp` | 11px | 500 | Geist Mono | time, truth, source, system stamps |
| `--text-caption` | 10px | 500 | Geist Mono | dense metadata, timestamps |

#### Mobile Scale

| Token | Size | Weight | Typeface | Use |
|------|------|--------|----------|-----|
| `--text-display-mobile` | 44px | 700 | Newsreader | hero moments |
| `--text-h1-mobile` | 36px | 700 | Newsreader | page titles |
| `--text-h2-mobile` | 30px | 700 | Newsreader | section titles |
| `--text-h3-mobile` | 24px | 600 | Newsreader | feature rows |
| `--text-h4-mobile` | 20px | 600 | Newsreader | card titles |
| `--text-lead-mobile` | 18px | 500 | Instrument Sans | short decks |
| `--text-body-mobile` | 16px | 400 | Instrument Sans | reading copy |
| `--text-label-mobile` | 12px | 600 | Instrument Sans | tabs, chips |
| `--text-stamp-mobile` | 11px | 500 | Geist Mono | system metadata |

### 6.6 Line Height

| Layer | Line height |
|------|-------------|
| Display / H1 | `0.94` to `1.00` |
| H2 / H3 | `1.00` to `1.08` |
| H4 / lead | `1.10` to `1.25` |
| Body | `1.60` to `1.72` |
| Metadata | `1.30` to `1.50` |

### 6.7 Letter Spacing

| Layer | Tracking |
|------|----------|
| Newsreader display / H1 | `-0.04em` to `-0.05em` |
| H2 / H3 | `-0.03em` to `-0.04em` |
| Body | `0` |
| Labels | `0.04em` to `0.08em` |
| Mono stamps | `0.08em` to `0.12em` |

### 6.8 Usage by Surface

#### Dashboard

- headlines: Newsreader
- summary/body: Instrument Sans
- source, category, time, confidence: Geist Mono

#### News Detail

- article title: Newsreader
- deck and body: Instrument Sans
- truth labels, publication metadata, source codes: Geist Mono

#### Audio Player

- track title: Newsreader or Instrument Sans depending on prominence
- queue/support copy: Instrument Sans
- timestamps and playback stamps: Geist Mono

#### Marketing / Landing

- hero: Newsreader
- body and conversion copy: Instrument Sans
- metrics and micro labels: Geist Mono

### 6.9 Hard Typography Rules

- Never use Newsreader for long-form body copy.
- Never use Instrument Sans as the hero display font when a real headline is needed.
- Never use Geist Mono for paragraph copy.
- Never set metadata in the same style as editorial body text.
- Never over-italicise headlines.
- Never allow multiple serif voices in the same screen.
- Never use default system fonts as the primary expression layer once implementation starts.

### 6.10 Tone Relationship

The type system should create this emotional ladder:

- Newsreader: trust, editorial gravity, story
- Instrument Sans: clarity, product speed, usability
- Geist Mono: precision, proof, system intelligence

If a screen does not show that hierarchy, it is off-system.

---

## 7. Spacing, Radius, Shadow, and Motion Foundations

These are foundation rules, not final component specs.

### 7.1 Spacing Grid

Narvo remains on an 8px grid.

| Token | Value |
|------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |

### 7.2 Radius

| Token | Value | Use |
|------|-------|-----|
| `--radius-sm` | 10px | chips, small inputs |
| `--radius-md` | 14px | standard controls |
| `--radius-lg` | 18px | cards |
| `--radius-xl` | 24px | large cards, player shells |
| `--radius-2xl` | 30px | hero panels, modal surfaces |
| `--radius-full` | 999px | pills, circular controls |

### 7.3 Shadows

Shadows should derive from Deep Ink, not cold black.

```css
--shadow-1: 0 1px 2px rgba(23, 50, 74, 0.05);
--shadow-2: 0 6px 24px rgba(23, 50, 74, 0.08);
--shadow-3: 0 16px 48px rgba(23, 50, 74, 0.10);
--shadow-4: 0 24px 80px rgba(23, 50, 74, 0.12);
```

### 7.4 Glow Rule

A soft teal glow is allowed on:

- active hero CTAs
- featured player shells
- onboarding spotlights

Example:

```css
box-shadow: 0 0 0 1px rgba(15,95,115,0.14), 0 0 24px rgba(15,95,115,0.20);
```

Do not apply glow to article cards or dense list items.

### 7.5 Glass Rule

Glassmorphism is allowed only on:

- top-level hero overlays
- onboarding panes
- settings drawers
- desktop side panels

Example:

```css
background: rgba(255,255,255,0.15);
backdrop-filter: blur(30px);
```

Never use heavy glass on article reading surfaces.

### 7.6 Motion Rule

- Standard transitions should feel deliberate, not playful.
- Audio and live states can move faster than reading states.
- Reduced motion must fully disable decorative movement.

---

## 8. Token Architecture

The approved token structure for the next implementation pass:

```css
:root {
  --color-bg: #F6F8FB;
  --color-surface: #FFFFFF;
  --color-surface-alt: #EEF3F7;
  --color-primary: #0F5F73;
  --color-primary-deep: #17324A;
  --color-primary-tint: rgba(15, 95, 115, 0.10);

  --color-alert: #F04B24;
  --color-alert-tint: rgba(240, 75, 36, 0.10);
  --color-success: #7FDDCA;
  --color-success-tint: rgba(127, 221, 202, 0.14);
  --color-highlight: #F2D66B;
  --color-insight: #ACB6FF;
  --color-coral: #FF9F8D;

  --color-text-primary: #17324A;
  --color-text-mid: #6C7F93;
  --color-text-dim: #93A4B6;
  --color-border: rgba(23, 50, 74, 0.10);

  --font-display: 'Newsreader', Georgia, serif;
  --font-body: 'Instrument Sans', system-ui, sans-serif;
  --font-mono: 'Geist Mono', 'SF Mono', monospace;
}
```

### Semantic Intent

Keep semantic aliases separate from brand tokens:

- `--color-primary` means brand anchor
- `--color-alert` means active / urgent / breaking
- `--color-text-primary` means maximum readable text

Do not let component code hard-code raw hex values when the token already exists.

---

## 9. Usage Rules

### Always

- Build screens on a calm light base.
- Let Petrol Teal define the structural identity.
- Use Signal Vermilion only where the product truly needs attention.
- Keep editorial hierarchy clear through Newsreader headlines and Instrument Sans body copy.
- Use Geist Mono to mark system truth, timing, and metadata.
- Reserve the most energetic visuals for audio, live, and breaking contexts.

### Never

- Never turn Narvo into an always-hot orange interface.
- Never treat auxiliary colours like additional brand colours.
- Never use decorative typography in utility-heavy contexts.
- Never let reading surfaces become visually busier than playback surfaces.
- Never collapse metadata into body text styles.

---

## 10. Accessibility Rules

- Default body text must maintain strong contrast on Cloud White and Cool Mist.
- Signal Vermilion should not carry tiny body text without contrast testing.
- Primary reading text should remain Deep Ink or near-equivalent contrast.
- Focus rings should be visible and warm, with a preference for Signal Vermilion or Petrol Teal depending on context.
- Motion, glow, and glass effects must degrade cleanly when `prefers-reduced-motion` is enabled.

---

## 11. Implementation Notes

### Current Repo State

At the time of approval:

- the approved colour system is **not yet implemented** in the production CSS tokens
- the approved typography system is **not yet implemented** in the production frontend
- the old v4 design system remains in the repo as the previous reference

### Next Sequence

1. Update design tokens in frontend CSS to match this foundation.
2. Replace legacy typography tokens with `Newsreader`, `Instrument Sans`, and `Geist Mono`.
3. Redesign the component system against this foundation.
4. Apply the new system across dashboard, article, player, and supporting surfaces.

### Canonical Rule

From this point onward:

- This document is the source of truth for **colour**
- This document is the source of truth for **typography**
- This document is the source of truth for **visual posture**

Component rules should reference this file, not re-invent these decisions.
