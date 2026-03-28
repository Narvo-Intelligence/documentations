# Narvo Design System — v4
### The Complete Brand & UI Reference

> **Version:** 4.0  
> **Date:** March 2026  
> **Author:** Ajibola Akelebe — Founder & Sole Developer, Narvo Intelligence  
> **Scope:** Narvo B2C consumer app, landing page, and marketing materials  
> **Status:** Active — supersedes Design System v3

---

## Table of Contents

1. [Brand Philosophy](#1-brand-philosophy)
2. [Brand Architecture](#2-brand-architecture)
3. [Geometry & Mark System](#3-geometry--mark-system)
4. [Colour System](#4-colour-system)
5. [Typography](#5-typography)
6. [Spacing Grid](#6-spacing-grid)
7. [Border Radius](#7-border-radius)
8. [Shadows & Elevation](#8-shadows--elevation)
9. [Motion & Animation](#9-motion--animation)
10. [Component Patterns](#10-component-patterns)
11. [Voice & Tone](#11-voice--tone)
12. [Accessibility](#12-accessibility)
13. [Token Architecture](#13-token-architecture)
14. [Usage Rules — Never Do](#14-usage-rules--never-do)

---

## 1. Brand Philosophy

Narvo is Africa's audio news platform. The brand must hold two truths simultaneously:

**Rooted.** The mark, the palette, and the geometry all say: *we come from somewhere specific*. Forest green, sunshine yellow, cream — these are West African earth tones, derived from Lagos at golden hour. The continent fragment mark is Africa's silhouette, abstracted. There is no ambiguity about where this product belongs.

**Reaching.** The product is a signal — voice, audio, information — radiating outward. The motion system (fragments breathing apart), the editorial typographic structure, and the Crisp Carrot call-to-action all say: *this is moving, this is alive, this matters now*.

The gap between the continent fragments is not a flaw. It is the negative space that carries the brand's meaning — disconnection, potential, the signal breaking through. Never close it.

---

## 2. Brand Architecture

Three brands share the same mathematical foundation. They differentiate through personality.

| Brand | Audience | Personality |
|-------|----------|-------------|
| **Narvo** (B2C) | End users, listeners | Warm, bold, culturally alive |
| **Narvo Platform** (B2B) | Developers, enterprise | Technical-modern, precise |
| **Narvo Intelligence** | Investors, legal, partners | Authoritative, sophisticated |

**Shared across all brands:**
- 8px spacing grid
- Modular type scale formula (base × ratioⁿ)
- Spring physics motion system
- Phosphor icon library
- OKLCH colour space
- Z-index scale
- WCAG 2.1 AA accessibility standards

**Brand switch:** `[data-brand="consumer"]` / `[data-brand="platform"]` / `[data-brand="intelligence"]` on root element.

This document covers **Narvo B2C** exclusively.

---

## 3. Geometry & Mark System

### The Continent Fragment Mark

The mark is Africa's silhouette abstracted to its geometric essence, divided into three horizontal fragments. No curves. No literal map outlines. Three hexagonal polygons with a consistent gap between each.

**What the geometry communicates:**
- **Fragment 1 (top):** The northern identity — bold, anchoring
- **Fragment 2 (middle):** The equatorial energy — often the yellow fragment, carrying warmth
- **Fragment 3 (bottom):** The southern taper — lighter, fading forward in time

**The gap rule:** The gap between fragments is never zero. It is proportional — approximately 15% of a single fragment's height. Closing the gap kills the meaning. The gap is the signal space.

### Construction Logic

The outer silhouette is derived from continental proportions — wider at the north/west (bulge), tapering toward the south. Each fragment is a convex hexagonal polygon. Three horizontal cuts at equal intervals divide the silhouette. Each fragment is separated by the gap value. The result is three floating shapes that together read as a single identity.

**The Signal Dot (optional, 48px+):** A centred circle within each fragment acts as the point of origin — the news source. Used at card/avatar scale and above. Omit at favicon/micro sizes.

### Scale System

| Context | Size | Fragment dot |
|---------|------|--------------|
| Favicon | 16px | No |
| Micro / inline | 24px | No |
| Navigation mark | 40px | No |
| Card / avatar | 64px | Optional |
| Hero mark | 96px | Yes |
| Decorative / background | 128px+ | Yes |

### Colour Applications on the Mark

| Mode | Fragment 1 | Fragment 2 | Fragment 3 | Background |
|------|------------|------------|------------|------------|
| Primary (dark bg) | Sunshine Yellow | White 85% | Sunshine Yellow 50% | Forest Green |
| Editorial (light bg) | Forest Green | Sunshine Yellow | Forest Green 40% | Cream |
| Accent (yellow bg) | Forest Green | White | Forest Green 70% | Sunshine Yellow |
| Night (dark mode) | Sunshine Yellow | Cream 60% | Sunshine Yellow 30% | Dark bg |

### Motion — Fragment Drift

On page load and during audio playback, the three fragments drift apart slightly on the Y-axis then return. This is a breathing motion, not a bounce.

- Fragment 1: drifts up 6px
- Fragment 2: stationary (anchor)
- Fragment 3: drifts down 5px
- Duration: 2.8s ease-in-out, infinite loop
- Stagger: 0.15s between each fragment
- Spring: stiffness 260, damping 20
- Wrap in `@media (prefers-reduced-motion: no-preference)`

### Mark Usage Rules

**Always:**
- Maintain the gap between fragments — it is structural, not accidental
- Use the mark alongside the wordmark at sizes below 64px
- Allow clear space equal to mark height × 0.5 on all sides
- Scale all three fragments proportionally as a unit
- Use the signal dot only at 48px and above

**Never:**
- Never close the gaps (fragments must not touch)
- Never rotate the mark
- Never use more than two colours across the three fragments
- Never apply drop shadows to the fragments
- Never trace or use the realistic continent outline — the geometric abstraction only
- Never use the mark at sizes below 16px

---

## 4. Colour System

### Tier Structure

The six colours are divided into two tiers. Each colour owns exactly one job.

#### Tier 1 — Brand Identity (3 colours)

These define who Narvo is. They appear in the logo, mark, large surfaces, and overall environment.

| Name | Hex | OKLCH | Role |
|------|-----|-------|------|
| Forest Green | `#18542A` | `oklch(0.34 0.10 145)` | Anchor — trust, depth, editorial |
| Sunshine Yellow | `#FFC926` | `oklch(0.84 0.17 88)` | Energy — warmth, African identity |
| Cream | `#F3E8CC` | `oklch(0.94 0.04 80)` | Ground — editorial space, breathing room |

**Forest Green** is the dominant brand colour. Backgrounds, navbars, hero sections, the continent mark body. It commands authority without coldness.

**Sunshine Yellow** is the energy colour. Used for the mark's accent layer, the wordmark on dark backgrounds, selected states, and category highlights. Never a button background — it belongs to identity, not action.

**Cream** is the editorial ground. Every page background, article surface, and card defaults to cream. It is the most used colour by area on light-mode surfaces.

#### Tier 2 — Functional (3 colours)

These communicate specific states. Each owns exactly one job and must not stray from it.

| Name | Hex | OKLCH | Role |
|------|-----|-------|------|
| Crisp Carrot | `#F96015` | `oklch(0.65 0.19 42)` | Action — all primary CTAs and buttons |
| Tomato Burst | `#D52518` | `oklch(0.52 0.20 27)` | Urgency — breaking news, errors, alerts |
| Kiwi | `#9ABC05` | `oklch(0.73 0.17 120)` | Signal — Truth Tag, verified, credibility |

**Crisp Carrot** owns every primary action. "Play now", "Sign up", "Listen", "Get started" — all Crisp Carrot. It is high energy without alarm.

**Tomato Burst** owns urgency. Breaking news tags, error states, urgent system notifications. It is *never* decorative. If nothing is urgent, Tomato Burst is invisible.

**Kiwi** owns verification. The Truth Tag system, source credibility scores, "verified" badges. Kiwi signals that something has been checked. It is never used for CTAs — if it becomes a button colour, the verification signal is destroyed.

### Approved Colour Pairings

| Combination | Use case |
|-------------|----------|
| Forest Green bg + Sunshine Yellow text | Logo lockup, dark hero sections, nav |
| Cream bg + Forest Green text + Crisp Carrot CTA | Editorial pages with action |
| Forest Green bg + White text | Body copy on dark surfaces |
| Cream bg + Tomato Burst tag + Kiwi badge | News cards with state indicators |
| Sunshine Yellow bg + Forest Green text | Accent banners, notifications |

### Hard Pairing Rules

- Crisp Carrot and Tomato Burst never appear side by side — they are both warm reds and create noise
- Kiwi is never a button background — it signals verification only
- Tomato Burst is never decorative — only used when urgency is genuinely present
- Sunshine Yellow is never a button background — it belongs to identity, not action
- Forest Green and Tomato Burst together only when necessary — both are dark and compete

### Tints (for backgrounds and chips)

All tints are derived from their base colour at 10% opacity on Cream.

| Base | Tint | Use |
|------|------|-----|
| Forest Green 10% | `rgba(24, 84, 42, 0.10)` | Category chips, soft tags |
| Crisp Carrot 10% | `rgba(249, 96, 21, 0.10)` | CTA hover states, links bg |
| Tomato Burst 10% | `rgba(213, 37, 24, 0.10)` | Breaking tag bg, error bg |
| Kiwi 10% | `rgba(154, 188, 5, 0.10)` | Verified badge bg, Truth Tag bg |

### Neutral Scale

Narvo's neutrals are **warm-tinted** — derived in OKLCH with a slight 60° hue angle (the cream axis). Cold grey (#808080 family) fights the brand palette. These neutrals harmonise with Forest Green and Cream without competing with them.

| Token | Hex | OKLCH | Usage |
|-------|-----|-------|-------|
| `--neutral-900` | `#1E1A16` | `oklch(0.14 0.01 60)` | Maximum contrast text, dark mode headings |
| `--neutral-800` | `#2E2922` | `oklch(0.20 0.01 60)` | High-contrast body on very light surfaces |
| `--neutral-700` | `#47413A` | `oklch(0.30 0.01 60)` | Secondary headings, strong labels |
| `--neutral-600` | `#625B52` | `oklch(0.41 0.01 60)` | Supporting body copy, descriptions |
| `--neutral-500` | `#807870` | `oklch(0.53 0.01 60)` | Placeholder text, dimmed body |
| `--neutral-400` | `#A09890` | `oklch(0.65 0.01 60)` | Timestamps, metadata, disabled states |
| `--neutral-300` | `#C0B9B1` | `oklch(0.76 0.01 60)` | Subtle dividers, secondary borders |
| `--neutral-200` | `#DDD8D2` | `oklch(0.87 0.01 60)` | Card borders, input borders, separators |
| `--neutral-100` | `#EDE9E4` | `oklch(0.92 0.01 60)` | Hover states, input backgrounds, table stripes |
| `--neutral-50`  | `#F7F5F2` | `oklch(0.97 0.005 60)` | Alternative surface for non-brand card backgrounds |

**Usage mapping by role:**

| Layer | Token | Use |
|-------|-------|-----|
| Text — high contrast | 900 / 800 | Dark mode headings, max contrast body |
| Text — secondary | 700 / 600 | Supporting body, descriptions |
| Text — dim / meta | 500 / 400 | Timestamps, Geist Mono stamps, disabled states |
| Borders | 300 / 200 | Card borders, input outlines, dividers |
| Surfaces | 100 / 50 | Hover backgrounds, striped rows, alt card bg |

**Rule:** Never use neutral-900 as a page background or neutral-50 as primary body text. The neutral scale is for *structural* UI elements only — brand colours (Forest Green, Cream) remain the dominant surface and text colours.

---

## 5. Typography

### Typeface Selection

| Role | Typeface | Source | Licence |
|------|----------|--------|---------|
| Display & Headlines | **Fraunces** | Google Fonts | Free, open |
| Body Copy | **Plus Jakarta Sans** | Google Fonts | Free, open |
| Labels, Meta & UI Stamps | **Geist Mono** | Vercel CDN | Free, open |

**Fraunces** is a variable serif with an optical size axis. At large sizes it is expressive and characterful. At small sizes it is compact and legible. Its italic cuts are strong enough to carry headlines without feeling decorative. The natural warmth in its letterforms echoes the cream-and-green palette. It is the primary reason Narvo's editorial voice sounds different from every other news app.

**Plus Jakarta Sans** is a geometric humanist sans-serif with subtly rounded terminals that bring warmth to body copy without softening legibility. It sits more characterfully than neutral workhorses like Inter or General Sans, making long-form article reading feel considered rather than generic. Used for all body paragraphs, descriptions, navigation links, button text, and non-metadata UI elements.

**Geist Mono** is used exclusively for labels, metadata stamps, timestamps, source credits, and UI identifiers — Truth Tag strings, category codes, durations, and API strings. Its fixed-width precision makes metadata scannable and signals technical credibility — fitting for a product built on verified information. Also used for code and API documentation in the Platform brand.

### Font Loading

```css
/* Fraunces — variable, all axes */
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700;1,9..144,900&display=swap');

/* Plus Jakarta Sans */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
```

```html
<!-- Preconnect in <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

Geist Mono is loaded via `@font-face` from the Vercel CDN — see Platform brand docs for the CDN URL.

### Type Scale — Major Third (1.250)

Formula: `Size(n) = 16px × 1.250ⁿ`

| Token | Size | Weight | Typeface | Usage |
|-------|------|--------|----------|-------|
| `--text-display` | 61px | 700 | Fraunces | Hero headlines, campaign moments |
| `--text-h1` | 49px | 700 | Fraunces | Page titles, landing hero |
| `--text-h2` | 39px | 700 | Fraunces italic mix | Section headlines |
| `--text-h3` | 31px | 600 | Fraunces | Sub-section headers |
| `--text-h4` | 25px | 600 | Fraunces | Card headlines, article titles |
| `--text-h5` | 20px | 600 | General Sans | UI section labels |
| `--text-body-lg` | 18px | 400 | General Sans | Lead paragraph, deck text |
| `--text-body` | 16px | 400 | General Sans | Body copy, descriptions |
| `--text-label` | 13px | 600 | Plus Jakarta Sans | UI labels, chips, navigation |
| `--text-stamp` | 11px | 500 | Geist Mono | Metadata, Truth Tag strings, source credits |
| `--text-caption` | 10px | 400 | Geist Mono | Timestamps, publication dates, version strings |

### Italic Usage

Fraunces italic is used for *emotional emphasis* within headlines. The pattern is: roman for the factual statement, italic for the resonant word or phrase.

```
The news, in your mother tongue.
         ↑ italic carries the meaning
```

```
Africa speaks. Listen.
               ↑ italic = the invitation
```

Italic is *never* used for entire body paragraphs. Never use italic on Plus Jakarta Sans for emphasis — use `font-weight: 600` instead.

### Colour Rules for Type

| Surface | Headline colour | Body colour |
|---------|----------------|-------------|
| Cream bg | Forest Green | `#3C5544` (text-mid) |
| Forest Green bg | Sunshine Yellow | White 80% |
| Sunshine Yellow bg | Forest Green | Forest Green 80% |
| Dark mode | Cream | Cream 65% |

### Line Height

| Scale | Line height |
|-------|-------------|
| Display / H1 / H2 | 1.05–1.10 |
| H3 / H4 | 1.15–1.20 |
| Body large | 1.65 |
| Body | 1.70 |
| Caption | 1.50 |

### Letter Spacing

| Scale | Tracking |
|-------|---------|
| Display / H1 | `-0.02em` (tight — Fraunces reads better pulled in) |
| H2 / H3 | `-0.01em` |
| Body | `0` |
| Labels / chips | `+0.04em` to `+0.08em` |
| ALL CAPS strings | `+0.12em` minimum |

**Note:** ALL CAPS is only used for labels and metadata — set in Plus Jakarta Sans (UI labels) or Geist Mono (stamps). Never use ALL CAPS on Fraunces — it destroys the character of the letterforms.

### Typography Rules

**Always:**
- Use Fraunces for all headlines H1–H4 and display text
- Use Fraunces italic for emotional emphasis words within headlines
- Use Plus Jakarta Sans for all body copy, navigation links, button text, and non-metadata UI
- Use Geist Mono for all labels, metadata stamps, timestamps, source credits, and Truth Tag strings
- Set headlines in Forest Green on cream backgrounds
- Set headlines in Sunshine Yellow on Forest Green backgrounds
- Maintain body line-height at 1.65 minimum
- Use `font-variant-numeric: tabular-nums` for time displays and statistics

**Never:**
- Never use Fraunces for body copy or UI elements
- Never set headlines in Crisp Carrot, Tomato Burst, or Kiwi — those are functional colours
- Never use font-weight below 400 or above 700 in body copy
- Never use ALL CAPS on Fraunces
- Never apply `letter-spacing` to Fraunces display text (the variable font optical sizing handles it)
- Never use Inter, Roboto, Arial, General Sans, or system fonts — always load Plus Jakarta Sans for body
- Never use Plus Jakarta Sans for metadata or stamps — Geist Mono owns that layer
- Never load both Fraunces weights unnecessarily — use variable axis for intermediate weights

---

## 6. Spacing Grid

All spacing uses multiples of **8px**. 8px divides cleanly by 2 and 4, maps across screen densities, and aligns with all major screen widths.

```
Tokens:
--space-1:   4px    /* half-unit — use sparingly */
--space-2:   8px    /* base unit */
--space-3:  12px    
--space-4:  16px    /* standard component padding */
--space-5:  20px    
--space-6:  24px    /* card internal padding */
--space-8:  32px    
--space-10: 40px    /* section breathing room */
--space-12: 48px    
--space-16: 64px    /* major section gaps */
--space-20: 80px    /* hero padding */
--space-24: 96px    
--space-32: 128px   /* page-level whitespace */
```

**Rule:** Never use pixel values that are not multiples of 4px. Prefer 8px multiples. Use 4px only for micro-adjustments (icon nudging, text nudging).

---

## 7. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 8px | Tags, input fields, small chips |
| `--radius-md` | 12px | Standard UI elements |
| `--radius-lg` | 16px | Standard cards |
| `--radius-xl` | 20px | Featured cards, modal sheets |
| `--radius-2xl` | 24px | Hero sections, large surfaces |
| `--radius-full` | 9999px | Pill buttons, avatars, audio progress |

**Note for Tailwind:** `rounded-lg` maps to `0px` in the existing Narvo v2 legacy config. Always use arbitrary values `rounded-[16px]` to apply v4 radius values until the config is updated.

---

## 8. Shadows & Elevation

Shadows use a warm amber tint `rgb(24, 84, 42)` — matching the brand's green warmth — not neutral black.

### Light Mode Elevations

| Level | Token | Value | Usage |
|-------|-------|-------|-------|
| 1 | `--shadow-1` | `0 1px 2px rgba(24,84,42, 0.06)` | Tags, inputs, chips |
| 2 | `--shadow-2` | `0 2px 4px rgba(24,84,42, 0.08), 0 1px 2px rgba(24,84,42, 0.04)` | Cards |
| 3 | `--shadow-3` | `0 4px 8px rgba(24,84,42, 0.10), 0 2px 4px rgba(24,84,42, 0.06)` | Audio player, raised cards, sticky nav |
| 4 | `--shadow-4` | `0 8px 16px rgba(24,84,42, 0.12), 0 4px 8px rgba(24,84,42, 0.08)` | Modals, dialogs, bottom sheets |

### Dark Mode Elevation

No CSS box-shadows in dark mode. Use surface tint elevation — progressively lighter surfaces at higher z-levels.

| Z-level | Surface colour | Usage |
|---------|---------------|-------|
| Base | `oklch(0.14 0.015 270)` | Page background |
| Raised | `oklch(0.17 0.015 270)` | Cards |
| Overlay | `oklch(0.20 0.015 270)` | Modals, drawers |
| Tooltip | `oklch(0.24 0.015 270)` | Tooltips, popovers |

**Never** use grey box-shadows in the B2C consumer app. The shadow tint must always derive from Forest Green.

---

## 9. Motion & Animation

### Easing Curves

| Curve | Value | Usage |
|-------|-------|-------|
| Standard | `cubic-bezier(0.2, 0, 0, 1)` | Elements moving on-screen |
| Enter | `cubic-bezier(0.05, 0.7, 0.1, 1)` | Elements appearing |
| Exit | `cubic-bezier(0.3, 0, 0.8, 0.15)` | Elements leaving |

### Duration Scale

| Token | Duration | Usage |
|-------|---------|-------|
| `--dur-micro` | 50ms | Icon state changes, checkbox ticks |
| `--dur-toggle` | 100ms | Switch toggles, radio selections |
| `--dur-hover` | 200ms | Hover states, colour transitions |
| `--dur-modal` | 300ms | Modal open/close, sheet slides |
| `--dur-page` | 400ms | Page transitions, large reveals |

### Spring Physics

For Framer Motion animations:

```js
const spring = {
  type: "spring",
  stiffness: 260,
  damping: 20
}

// Stagger for list items and card grids
const stagger = { delay: index * 0.06 }

// Press feedback
whileTap={{ scale: 0.96 }}
```

### Fragment Drift (Brand Mark Animation)

```css
@keyframes fragment-drift-1 {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-6px); }
}
@keyframes fragment-drift-3 {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(5px); }
}

.fragment-1 { animation: fragment-drift-1 2.8s ease-in-out infinite; }
.fragment-2 { /* stationary — anchor */ }
.fragment-3 { animation: fragment-drift-3 2.8s ease-in-out infinite 0.30s; }

@media (prefers-reduced-motion: reduce) {
  .fragment-1, .fragment-3 { animation: none; }
}
```

### Audio Playback State

When audio is actively playing, the fragment drift speeds up to 1.8s and amplitude increases by 50%. When paused, it returns to the resting 2.8s rhythm. This ties the brand mark physically to the product's core action.

---

## 10. Component Patterns

### Sizing Philosophy

Narvo components are deliberately generous. The minimum (48px touch target) is a floor, not a design target. Every component should feel substantial enough to match the editorial weight of Fraunces headlines at their sizes. Nothing should feel like it was sized to save space — whitespace is the tool for breathing room, not shrinking components.

Two contexts, two size registers:

| Context | Philosophy | Primary CTA | Inputs | Card padding |
|---------|------------|-------------|--------|--------------|
| **Landing page** | First impression — make it count | **56px** | 56px | 32px |
| **App (daily use)** | Habitual, ergonomic — generous but not overwhelming | **52px** | 52px | 24px |

The ghost/secondary button matches the primary height in both contexts. The size relationship between buttons within a group must remain consistent — never mix 56px and 48px side by side.

---

### Navigation Bar

- Height: **72px** (landing) / **64px** (app)
- Background: Cream (light mode) / Forest Green (dark mode)
- Logo: Mark (40px) + Wordmark, vertically centred
- Nav links: Plus Jakarta Sans 500, 15px, `--neutral-600`, 24px gap
- Active link: Forest Green, 2px Forest Green underline, 2px offset
- Sticky with `--shadow-3` on scroll
- Mobile: collapses to hamburger + bottom tab bar

### Bottom Tab Bar (Mobile)

- Height: **72px** + safe area inset
- 5 tabs maximum: Home, Stories, Briefings, Search, Profile
- Icon: 24px, active = Forest Green fill + Sunshine Yellow 6px dot below
- Label: Geist Mono 400, 10px
- Background: Cream, `--shadow-3` upward

---

### Buttons

Shared base — only height, padding, and font-size vary between contexts.

```css
/* ── Shared base ── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 9999px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  letter-spacing: 0.02em;
  border: none;
  cursor: pointer;
  transition: background 200ms cubic-bezier(0.2, 0, 0, 1),
              transform  100ms cubic-bezier(0.2, 0, 0, 1);
}
.btn:active { transform: scale(0.96); }

/* ── Landing page sizes ── */
.btn--landing    { height: 56px; padding: 0 36px; font-size: 16px; }
.btn--landing-sm { height: 48px; padding: 0 28px; font-size: 14px; } /* secondary/ghost only */

/* ── App sizes ── */
.btn--app    { height: 52px; padding: 0 32px; font-size: 15px; }
.btn--app-sm { height: 44px; padding: 0 24px; font-size: 14px; } /* secondary/ghost only */

/* ── Variants ── */
.btn-primary { background: #F96015; color: #ffffff; }           /* Crisp Carrot — ALL CTAs */
.btn-primary:hover { background: #e05510; }

.btn-brand   { background: #18542A; color: #FFC926; }           /* Forest Green / Yellow */
.btn-brand:hover { background: #0e3319; }

.btn-ghost {
  background: transparent;
  color: #18542A;
  border: 1.5px solid rgba(24, 84, 42, 0.30);
}
.btn-ghost:hover { border-color: rgba(24, 84, 42, 0.60); }
```

---

### Inputs & Form Fields

Inputs are tall, open, and clearly legible. Never the web default 36–40px.

```css
.input {
  height: 56px;                            /* landing */
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #18542A;
  background: #FDF8EF;
  border: 1.5px solid #DDD8D2;            /* --neutral-200 */
  border-radius: 12px;                    /* --radius-md */
  padding: 0 20px;
  width: 100%;
  transition: border-color 200ms cubic-bezier(0.2, 0, 0, 1);
}
.input--app { height: 52px; }             /* app context */

.input::placeholder { color: #A09890; }  /* --neutral-400 */
.input:focus {
  outline: none;
  border-color: #18542A;
  box-shadow: 0 0 0 3px rgba(24, 84, 42, 0.10);
}
```

**Search field (app):** same as `.input--app` but with a 24px search icon inset left, padding-left 52px, `border-radius: 9999px` (pill).

**Textarea:** minimum height 120px, `padding: 16px 20px`, same border/focus treatment.

---

### News Card (Standard — App)

- `--radius-lg` (16px)
- Background: `#FDF8EF`
- `--shadow-2`
- Internal padding: **24px**
- Structure: thumbnail (16:9, radius 12px) → 12px gap → category chip → 8px gap → headline (Fraunces 600, 20px, Forest Green, max 2 lines) → 8px gap → metadata row → 16px gap → play button row
- Play button: **52px** circular, Crisp Carrot bg, white 18px icon
- Thumbnail: full-width, `border-radius: 12px`, aspect-ratio 16/9

### Featured Card (App & Landing)

- `--radius-xl` (20px)
- `--shadow-3`
- Internal padding: **32px** (landing) / **24px** (app)
- Full-bleed thumbnail with Forest Green overlay (bottom 60%)
- Headline: Fraunces 700, 25px, Sunshine Yellow, max 2 lines
- Metadata: Geist Mono 400, 10px, Sunshine Yellow 60%
- Play button: **64px** circular (landing) / **56px** (app), Crisp Carrot bg, white 22px icon

### Briefing / Morning Card (Full-width)

- `--radius-2xl` (24px)
- Background: Forest Green
- Internal padding: **40px** (landing) / **32px** (app)
- Headline: Fraunces 700 italic, 31px, Sunshine Yellow
- Subtext: Plus Jakarta Sans 400, 15px, White 70%
- Play button: **64px** circular, Crisp Carrot bg

---

### Tags & Chips

```css
/* Category chip — Plus Jakarta Sans */
.chip-category {
  background: rgba(24, 84, 42, 0.10);
  color: #18542A;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 5px 12px;          /* slightly taller than convention */
  border-radius: 9999px;
}

/* Breaking tag — Geist Mono, sharp corners */
.tag-breaking {
  background: #D52518;
  color: #ffffff;
  font-family: 'Geist Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 4px;
}

/* Truth Tag / Verified — Geist Mono */
.tag-verified {
  background: rgba(154, 188, 5, 0.12);
  color: #5a7003;
  font-family: 'Geist Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 9999px;
}
```

---

### Audio Player Bar

- Height: **72px** (expanded) / 64px (collapsed), fixed bottom above tab bar
- Background: Forest Green
- Internal padding: 0 24px
- Track title: Plus Jakarta Sans 600, 15px, Sunshine Yellow
- Source / timestamp: Geist Mono 400, 10px, Sunshine Yellow 55%
- Progress bar: **6px** tall (generous — easy to scrub), Sunshine Yellow filled, Sunshine Yellow 25% unfilled
- Play/Pause button: **56px** circle, Crisp Carrot bg, white 20px icon
- Skip ±15s: **40px** circle, transparent, white icon
- Scrub: tap-anywhere on progress bar

---

## 11. Voice & Tone

The Narvo B2C tone is warm, direct, and culturally present. It does not talk down. It does not over-explain. It assumes the listener is smart and busy.

| Situation | Example | Never |
|-----------|---------|-------|
| Onboarding | "Oya, let's set up your feed." | "Welcome to the Narvo platform experience." |
| Empty state | "Nothing here yet. Let's fix that." | "No content available at this time." |
| Playback start | "Listening: Lagos & the Budget" | "Now playing audio content item #427" |
| Error | "Something broke on our end. Try again." | "An error has occurred. Error code: 500." |
| Verification badge | "Truth Tag ✓" | "This content has been fact-checked and verified for accuracy." |

**Language note:** Pidgin English phrases (`oya`, `oga`, `na so`) are used sparingly and only where they feel natural — never forced. They signal cultural presence, not performance.

---

## 12. Accessibility

All Narvo interfaces target **WCAG 2.1 AA** at minimum.

### Colour Contrast

| Combination | Ratio | Passes |
|-------------|-------|--------|
| Forest Green on Cream | 9.2:1 | AAA ✓ |
| Sunshine Yellow on Forest Green | 5.4:1 | AA ✓ |
| White on Crisp Carrot | 3.1:1 | AA Large ✓ |
| White on Tomato Burst | 5.8:1 | AA ✓ |
| Forest Green on Kiwi tint | 6.1:1 | AA ✓ |

**Note:** White on Crisp Carrot passes AA for large text (18px+ or 14px bold) only. For small body text on Carrot backgrounds, use Forest Green instead of white.

### Focus States

```css
:focus-visible {
  outline: 2px solid #F96015;   /* Crisp Carrot */
  outline-offset: 2px;
}
```

Forest Green focus rings are also acceptable on cream surfaces. Never remove focus rings — only style them.

### Touch Targets

All interactive elements: **48px minimum** hit target. Use padding to extend without changing visual size.

### Motion

All animations wrapped in `@media (prefers-reduced-motion: no-preference)`. Static fallbacks must be equally clear.

### Screen Reader

- All audio content includes a text summary
- Truth Tag status announced as text: "Verified by three sources"
- Progress bar has `aria-valuenow`, `aria-valuemin`, `aria-valuemax`

---

## 13. Token Architecture

Three-layer system. Tokens flow from specific → semantic → component.

### Layer 1: Primitives (Brand-Specific)

Raw values. Never used directly in components.

```css
/* Narvo B2C Primitives */
--primitive-green-900: #0e3319;
--primitive-green-800: #18542A;
--primitive-green-700: #1E6933;
--primitive-green-100: rgba(24,84,42,0.10);

--primitive-yellow-500: #FFC926;
--primitive-yellow-400: #E6B420;

--primitive-cream-100: #F3E8CC;
--primitive-cream-50:  #FDF8EF;

--primitive-carrot-600: #e05510;
--primitive-carrot-500: #F96015;
--primitive-carrot-100: rgba(249,96,21,0.10);

--primitive-tomato-600: #a81e13;
--primitive-tomato-500: #D52518;
--primitive-tomato-100: rgba(213,37,24,0.10);

--primitive-kiwi-500:   #9ABC05;
--primitive-kiwi-400:   #b3d906;
--primitive-kiwi-100:   rgba(154,188,5,0.10);

/* Warm Neutrals (OKLCH hue 60° — cream axis) */
--primitive-neutral-900: #1E1A16;
--primitive-neutral-800: #2E2922;
--primitive-neutral-700: #47413A;
--primitive-neutral-600: #625B52;
--primitive-neutral-500: #807870;
--primitive-neutral-400: #A09890;
--primitive-neutral-300: #C0B9B1;
--primitive-neutral-200: #DDD8D2;
--primitive-neutral-100: #EDE9E4;
--primitive-neutral-50:  #F7F5F2;
```

### Layer 2: Semantics (Shared API)

```css
/* Colours */
--color-bg:           var(--primitive-cream-100);
--color-surface:      var(--primitive-cream-50);
--color-primary:      var(--primitive-green-800);
--color-primary-hover:var(--primitive-green-900);
--color-accent:       var(--primitive-yellow-500);
--color-cta:          var(--primitive-carrot-500);
--color-cta-hover:    var(--primitive-carrot-600);
--color-urgent:       var(--primitive-tomato-500);
--color-verified:     var(--primitive-kiwi-500);
--color-text-primary: var(--primitive-green-800);
--color-text-mid:     var(--primitive-neutral-600);
--color-text-dim:     var(--primitive-neutral-500);
--color-text-meta:    var(--primitive-neutral-400);
--color-border:       var(--primitive-neutral-200);
--color-border-subtle:var(--primitive-neutral-100);

/* Typography */
--font-display: 'Fraunces', serif;
--font-body:    'Plus Jakarta Sans', sans-serif;
--font-label:   'Plus Jakarta Sans', sans-serif;
--font-mono:    'Geist Mono', monospace;

/* Spacing */
--space-base: 8px;

/* Radius */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-full: 9999px;
```

### Layer 3: Components (Shared API)

```css
--button-primary-bg:     var(--color-cta);
--button-primary-text:   #ffffff;
--button-primary-radius: var(--radius-full);

--card-bg:      var(--color-surface);
--card-radius:  var(--radius-lg);
--card-shadow:  var(--shadow-2);

--nav-bg:       var(--color-bg);
--nav-height:   64px;

--player-bg:    var(--color-primary);
--player-height:64px;
```

---

## 14. Usage Rules — Never Do

### Colour
- Never mix palettes between brands in the same context
- Never use pure black (`#000000`) or pure white (`#ffffff`) as primary surfaces
- Never use Sunshine Yellow as a button background — it is an identity colour, not an action colour
- Never use Kiwi for CTAs — it signals verification only
- Never use Tomato Burst decoratively — only when something requires urgent attention
- Never place Crisp Carrot and Tomato Burst side by side
- Never hardcode hex values in components — always use semantic tokens

### Typography
- Never use Fraunces for body copy or UI elements
- Never use Inter, Roboto, Arial, General Sans, or system fonts in the B2C app
- Never use Plus Jakarta Sans for metadata stamps — Geist Mono owns that layer
- Never use ALL CAPS on Fraunces
- Never apply letter-spacing to Fraunces display text
- Never set headlines in functional colours (Carrot, Tomato, Kiwi)
- Never use cold grey for text — always use the warm neutral scale

### Mark & Geometry
- Never close the gap between continent fragments
- Never rotate the continent mark
- Never use more than two colours on the mark fragments
- Never use drop shadows on the mark
- Never use the realistic continent outline — geometric abstraction only

### Shadows
- Never use grey box-shadows in the B2C app
- Never use box-shadows in dark mode — use surface elevation instead

### Layout
- Never break the 8px grid without documented reason
- Never use touch targets below 48px

---

*Narvo Design System v4 — March 2026*  
*Narvo Intelligence Ltd. — All rights reserved.*
