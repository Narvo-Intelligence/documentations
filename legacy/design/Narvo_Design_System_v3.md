# Narvo Design System v3 — Mathematical Foundations

> **Version 3.0 — March 2026**
> Rebuilt from mathematical first principles. OKLCH colour science. Modular type scales. Physics-based motion.
> Single system, three brand expressions.

---

## 0. Philosophy

Every value in this system traces back to a mathematical relationship — not an arbitrary choice. Spacing derives from an 8px grid. Typography follows modular scale ratios. Colours are defined in OKLCH for perceptual uniformity. Motion uses spring physics. Layouts reference the golden ratio. The result is a system that *feels* naturally balanced because it *is* naturally balanced.

**The Principle:** Spacing, grids, motion, and component APIs are shared infrastructure. Colour, typefaces, border radii, and shadow warmth are the brand-switching layer.

---

## 1. Typography — Modular Scale

### The Formula

```
Size(n) = base × ratio^n
```

Where `base` is the body text size, `ratio` is a harmonic interval, and `n` is the step number (0 = body, positive = headings, negative = captions).

### Brand-Specific Scales

| Brand | Base | Ratio | Name | Rationale |
|-------|------|-------|------|-----------|
| **Narvo** (B2C) | 16px | 1.250 | Major Third | Clear hierarchy without ballooning on mobile |
| **Narvo Platform** (B2B) | 15px | 1.200 | Minor Third | Dense info with many hierarchy levels |
| **Narvo Intelligence** | 16px | 1.333 | Perfect Fourth | Dramatic display for marketing/investor pages |

### Generated Scales

**Narvo B2C** (16px × 1.250):

| Step | Size | Rounded | Token | Usage |
|------|------|---------|-------|-------|
| -2 | 10.24 | 10px | `text-xs` | Micro labels |
| -1 | 12.80 | 13px | `text-sm` | Captions, timestamps |
| 0 | 16.00 | 16px | `text-base` | Body text |
| 1 | 20.00 | 20px | `text-lg` | Card titles |
| 2 | 25.00 | 25px | `text-xl` | Section titles |
| 3 | 31.25 | 31px | `text-2xl` | Page headers |
| 4 | 39.06 | 39px | `text-3xl` | Hero display |
| 5 | 48.83 | 49px | `text-4xl` | Marketing display |

**Narvo Platform** (15px × 1.200):

| Step | Size | Rounded | Token | Usage |
|------|------|---------|-------|-------|
| -2 | 10.42 | 10px | `text-xs` | Code annotations |
| -1 | 12.50 | 13px | `text-sm` | Labels, metadata |
| 0 | 15.00 | 15px | `text-base` | Body, docs |
| 1 | 18.00 | 18px | `text-lg` | Subheadings |
| 2 | 21.60 | 22px | `text-xl` | Section titles |
| 3 | 25.92 | 26px | `text-2xl` | Page titles |
| 4 | 31.10 | 31px | `text-3xl` | Hero |

**Narvo Intelligence** (16px × 1.333):

| Step | Size | Rounded | Token | Usage |
|------|------|---------|-------|-------|
| -2 | 9.00 | 9px | `text-xs` | Legal, footnotes |
| -1 | 12.00 | 12px | `text-sm` | Captions |
| 0 | 16.00 | 16px | `text-base` | Body |
| 1 | 21.33 | 21px | `text-lg` | Subheadings |
| 2 | 28.43 | 28px | `text-xl` | Section titles |
| 3 | 37.90 | 38px | `text-2xl` | Page titles |
| 4 | 50.52 | 51px | `text-3xl` | Hero display |

### Typeface Selection

Typefaces encode brand personality. Each brand uses a distinct combination:

| Brand | Display | Body | Mono | Personality |
|-------|---------|------|------|-------------|
| **Narvo** (B2C) | General Sans (600–700) | General Sans (400–500) | Geist Mono | Warm, geometric, confident |
| **Narvo Platform** | Geist Sans (600–700) | Geist Sans (400–500) | Geist Mono | Precise, developer-native |
| **Narvo Intelligence** | Instrument Sans (600–700) | Inter (400–500) | Geist Mono | Authoritative, sophisticated |

**Font Sources:**
- General Sans: fontshare.com (free)
- Geist Sans / Geist Mono: Vercel CDN (free, MIT)
- Instrument Sans: fontshare.com (free)
- Inter: Google Fonts / rsms.me (free, OFL)

### Line Height

All line heights snap to 4px increments for vertical rhythm:

| Role | Line-height | Tracking |
|------|-------------|----------|
| Display (hero) | 1.1 (round to 4px) | -0.03em |
| Heading | 1.2 | -0.02em |
| Subheading | 1.3 | -0.01em |
| Body | 1.6 | 0 |
| Caption | 1.4 | 0.01em |

### Responsive Scale Switching

Use `clamp()` to transition between mobile (tighter) and desktop (wider) ratios:

```css
/* Hero heading: 31px mobile → 49px desktop */
--text-hero: clamp(1.938rem, 1rem + 3vw, 3.063rem);
```

Formula: `preferred = 100 × (max - min) / (maxViewport - minViewport)`

---

## 2. Spacing — The 8px Grid

### The Scale

Base unit: **8px**. All spacing values are multiples or subdivisions of 8:

```
0  2  4  8  12  16  20  24  32  40  48  64  80  96  128
```

| Token | Value | Usage |
|-------|-------|-------|
| `space-0` | 0px | None |
| `space-0.5` | 2px | Hairline gaps, focus offset |
| `space-1` | 4px | Tight inline spacing |
| `space-2` | 8px | Icon + label gap, tight padding |
| `space-3` | 12px | Small component padding |
| `space-4` | 16px | Standard component padding |
| `space-5` | 20px | Comfortable padding |
| `space-6` | 24px | Card internal padding |
| `space-8` | 32px | Section gaps |
| `space-10` | 40px | Large section gaps |
| `space-12` | 48px | Major section separation |
| `space-16` | 64px | Page-level spacing |
| `space-20` | 80px | Hero section gaps |
| `space-24` | 96px | Extra large spacing |
| `space-32` | 128px | Maximum spacing |

This scale is **shared identically across all three brands**. Spacing establishes hierarchy and readability, not personality.

### Why 8px

- Divides cleanly by 2 and 4 (no sub-pixel issues)
- Maps across screen densities: @1.5x → 12px, @2x → 16px, @3x → 24px
- Most screen widths (360, 390, 768, 1024, 1280, 1440, 1920px) are divisible by 8
- Used by Material Design 3, Apple HIG, Tailwind, Atlassian, and Linear

### Layout Heights (Shared)

| Token | Mobile | Desktop | Purpose |
|-------|--------|---------|---------|
| `--header-h` | 56px | 64px | App header |
| `--nav-h` | 56px | — | Bottom navigation (mobile only) |
| `--player-h` | 64px | 72px | Audio player bar |
| `--touch-min` | 48px | 44px | Minimum touch/click target |

---

## 3. Colour — OKLCH Perceptual Science

### Why OKLCH

OKLCH provides **perceptual uniformity** — a blue and a red at the same L (lightness) value genuinely look equally bright. HSL does not guarantee this. OKLCH coordinates: **L** (lightness 0–1), **C** (chroma 0–~0.4), **H** (hue angle 0–360°).

Browser support: 92%+ globally (Chrome 111+, Safari 16.4+, Firefox 113+). Tailwind v4 uses OKLCH natively.

### The 60-30-10 Rule

```
1.0 = 0.60(Dominant) + 0.30(Supporting) + 0.10(Accent)
```

- **60% Dominant:** Background and surface colours
- **30% Supporting:** Secondary elements, navigation, cards
- **10% Accent:** CTAs, active states, highlights

### Palette Architecture — 12-Step Scales

Following Radix UI's pattern, each hue is expanded into 12 steps with defined semantic roles:

| Steps | Purpose | Example |
|-------|---------|---------|
| 1–2 | Backgrounds | App bg, subtle bg |
| 3–5 | Interactive surfaces | Hover, active, selected |
| 6–8 | Borders | Subtle, default, strong |
| 9–10 | Solid fills | Primary, primary hover |
| 11–12 | Accessible text | High-contrast, heading |

### Narvo B2C — "The Local Pulse"

Inspired by Lagos golden hour, Yoruba adire indigo, and West African earth tones.

**Primary: Sunset Amber** — warm, energetic, reminiscent of golden hour

| Step | OKLCH | Hex | Usage |
|------|-------|-----|-------|
| 1 | `oklch(0.98 0.01 75)` | #FDF8F0 | App background |
| 2 | `oklch(0.96 0.02 70)` | #FBF0E0 | Subtle background |
| 3 | `oklch(0.92 0.04 65)` | #F5E0C2 | Hover state |
| 4 | `oklch(0.88 0.07 60)` | #EDD0A5 | Active state |
| 5 | `oklch(0.84 0.10 58)` | #E2BE88 | Selected |
| 6 | `oklch(0.78 0.10 55)` | #CFA46E | Subtle border |
| 7 | `oklch(0.72 0.12 52)` | #BB8A54 | Default border |
| 8 | `oklch(0.64 0.14 50)` | #9E6E3A | Strong border |
| 9 | `oklch(0.68 0.18 52)` | #D4850A | **Primary solid** |
| 10 | `oklch(0.63 0.18 50)` | #BE7508 | Primary hover |
| 11 | `oklch(0.50 0.14 48)` | #8A5A18 | High-contrast text |
| 12 | `oklch(0.35 0.08 45)` | #5C3E18 | Heading text |

**Accent: Adire Indigo** — sophistication drawn from Yoruba resist-dyeing

| Step | OKLCH | Hex | Usage |
|------|-------|-----|-------|
| 9 | `oklch(0.55 0.20 275)` | #5B5BD6 | Accent solid |
| 10 | `oklch(0.50 0.20 275)` | #4B4BBF | Accent hover |
| 11 | `oklch(0.55 0.15 275)` | #6B6BA8 | Accent text |

**Secondary: Forest Teal** — grounding, natural, verification

| Step | OKLCH | Hex | Usage |
|------|-------|-----|-------|
| 9 | `oklch(0.58 0.12 175)` | #18967E | Secondary solid |
| 10 | `oklch(0.53 0.12 175)` | #0F846D | Secondary hover |
| 11 | `oklch(0.45 0.10 175)` | #0A6B58 | Secondary text |

**Neutral: Warm Sand** (ochre-tinted grays)

| Step | OKLCH | Hex | Usage |
|------|-------|-----|-------|
| 1 | `oklch(0.98 0.005 80)` | #FDFBF7 | Page background |
| 2 | `oklch(0.96 0.008 75)` | #FAF6EE | Card surface |
| 3 | `oklch(0.93 0.01 70)` | #F0EAE0 | Raised surface |
| 7 | `oklch(0.70 0.02 60)` | #B0A490 | Border |
| 11 | `oklch(0.35 0.02 55)` | #4A4038 | Primary text |
| 12 | `oklch(0.22 0.02 50)` | #2A2420 | Heading text |

### Narvo Platform — "Built for Scale"

Technical, dark-first, precise. Electric cyan on near-black.

**Primary: Electric Cyan**

| Step | OKLCH | Hex | Usage |
|------|-------|-----|-------|
| 9 | `oklch(0.75 0.14 210)` | #22AAD0 | Primary solid |
| 10 | `oklch(0.70 0.14 210)` | #1A98BE | Primary hover |
| 11 | `oklch(0.80 0.10 210)` | #60BCD5 | Primary text (on dark) |

**Accent: Emerald**

| Step | OKLCH | Hex | Usage |
|------|-------|-----|-------|
| 9 | `oklch(0.72 0.17 160)` | #34D399 | Success, accents |

**Neutral: Blue-tinted dark**

| Step | OKLCH | Hex | Usage |
|------|-------|-----|-------|
| 1 | `oklch(0.14 0.015 270)` | #0D0F1A | Page background |
| 2 | `oklch(0.17 0.015 270)` | #131526 | Card surface |
| 3 | `oklch(0.21 0.015 270)` | #1A1C32 | Raised surface |
| 7 | `oklch(0.40 0.02 260)` | #4A4F6A | Border |
| 11 | `oklch(0.88 0.01 260)` | #D8DBE8 | Primary text |
| 12 | `oklch(0.95 0.005 260)` | #ECEEF5 | Heading text |

### Narvo Intelligence — "The Intelligence Behind"

Clean, corporate, light-first. Deep indigo on white.

**Primary: Deep Indigo**

| Step | OKLCH | Hex | Usage |
|------|-------|-----|-------|
| 9 | `oklch(0.55 0.22 280)` | #5B52EF | Primary solid |
| 10 | `oklch(0.50 0.22 280)` | #4B42DF | Primary hover |
| 11 | `oklch(0.45 0.18 280)` | #4540B5 | Primary text |

**Accent: Mint**

| Step | OKLCH | Hex | Usage |
|------|-------|-----|-------|
| 9 | `oklch(0.78 0.16 170)` | #06D6A0 | Highlights, success |

**Neutral: Cool gray**

| Step | OKLCH | Hex | Usage |
|------|-------|-----|-------|
| 1 | `oklch(0.995 0 0)` | #FDFDFD | Page background |
| 2 | `oklch(0.98 0.003 260)` | #F7F8FA | Card surface |
| 3 | `oklch(0.95 0.005 260)` | #ECEEF5 | Raised surface |
| 7 | `oklch(0.68 0.01 260)` | #9CA0B2 | Border |
| 11 | `oklch(0.30 0.02 260)` | #333550 | Primary text |
| 12 | `oklch(0.18 0.02 260)` | #1A1C30 | Heading text |

### Semantic Category Colours (Shared)

Used for content tags across all brands:

| Category | OKLCH | Hex |
|----------|-------|-----|
| Finance | `oklch(0.85 0.12 85)` | #E8C86A |
| Politics | `oklch(0.78 0.14 55)` | #D4944A |
| Tech | `oklch(0.72 0.15 300)` | #B080E0 |
| Health | `oklch(0.78 0.18 155)` | #4ADE80 |
| Sports | `oklch(0.75 0.16 60)` | #E8923A |
| Culture | `oklch(0.72 0.16 340)` | #E070A8 |
| Science | `oklch(0.80 0.12 185)` | #50D0C0 |
| Security | `oklch(0.68 0.03 260)` | #8890A8 |
| Environment | `oklch(0.75 0.10 230)` | #70A8E0 |
| Urgent | `oklch(0.72 0.18 25)` | #E06050 |

---

## 4. Dark Mode — Logarithmic Elevation

### The Formula

```
Contrast Ratio = (L1 + 0.05) / (L2 + 0.05)
```

Must be ≥ 4.5:1 for AA text, ≥ 3:1 for large text and UI elements.

### Principles

1. **Never use pure black** (#000000) — causes halation and eliminates shadow depth
2. **Tint surfaces with brand hue** — adds warmth and brand identity
3. **Logarithmic elevation:** Higher surfaces get progressively lighter, following MD3's overlay model
4. **Desaturate brand colours** — use lighter, less saturated variants for dark backgrounds

### Surface Elevation Scale (Narvo B2C Dark)

| Level | Lightness | OKLCH | Usage |
|-------|-----------|-------|-------|
| 0 (Base) | 0.14 | `oklch(0.14 0.015 55)` | Page background |
| 1 | 0.17 | `oklch(0.17 0.015 55)` | Cards, panels |
| 2 | 0.20 | `oklch(0.20 0.015 55)` | Raised cards, sheets |
| 3 | 0.24 | `oklch(0.24 0.012 55)` | Dialogs, popovers |
| 4 | 0.28 | `oklch(0.28 0.010 55)` | Menus, dropdowns |
| 5 | 0.32 | `oklch(0.32 0.008 55)` | Tooltips |

Note the warm hue (55° = amber) in the B2C dark surfaces. Platform uses blue hue (270°). Intelligence uses neutral (0°).

### Dark Mode Text Hierarchy

| Role | Opacity | OKLCH | Contrast |
|------|---------|-------|----------|
| Primary | 95% | `oklch(0.93 0.01 H)` | ~14:1 |
| Secondary | 70% | `oklch(0.72 0.01 H)` | ~6:1 |
| Disabled | 40% | `oklch(0.50 0.01 H)` | ~3:1 |

### Dark Primary Colour Adjustments

| Brand | Light Primary | Dark Primary | Change |
|-------|---------------|--------------|--------|
| Narvo B2C | `oklch(0.68 0.18 52)` | `oklch(0.78 0.15 55)` | +L, -C, shift warm |
| Platform | `oklch(0.75 0.14 210)` | `oklch(0.80 0.12 210)` | +L, -C |
| Intelligence | `oklch(0.55 0.22 280)` | `oklch(0.72 0.18 280)` | +L, -C |

---

## 5. Shadows — Z-Axis Elevation

### The Formula

```
Shadow(z) = (y-offset: z×1, blur: z×2, spread: 0, opacity: 0.04 + z×0.02)
```

Where `z` is the elevation level (1–5).

### Shadow Scale (Light Mode)

| Level | CSS Value | Usage |
|-------|-----------|-------|
| 1 | `0 1px 2px rgba(T, 0.06)` | Subtle lift (tags, inputs) |
| 2 | `0 2px 4px rgba(T, 0.08), 0 1px 2px rgba(T, 0.04)` | Cards |
| 3 | `0 4px 8px rgba(T, 0.10), 0 2px 4px rgba(T, 0.06)` | Raised cards, player |
| 4 | `0 8px 16px rgba(T, 0.12), 0 4px 8px rgba(T, 0.08)` | Dialogs |
| 5 | `0 16px 32px rgba(T, 0.14), 0 8px 16px rgba(T, 0.10)` | Overlays |

Where `T` (tint) varies by brand:
- **Narvo B2C:** `rgba(139, 90, 43, ...)` — warm amber tint
- **Narvo Platform:** `rgba(0, 0, 0, ...)` — neutral
- **Narvo Intelligence:** `rgba(0, 0, 0, ...)` — neutral

### Dark Mode Shadows

In dark mode, shadows are nearly invisible. Replace with **surface tint elevation** (see Section 4). No CSS box-shadows in dark mode — differentiate through surface lightness.

---

## 6. Border Radius — Brand Personality

Radius is one of the strongest brand differentiators. It communicates personality at a glance.

| Token | Narvo B2C | Platform | Intelligence | Usage |
|-------|-----------|----------|--------------|-------|
| `radius-xs` | 4px | 2px | 2px | Inline badges |
| `radius-sm` | 8px | 4px | 3px | Inputs, small buttons |
| `radius-md` | 12px | 6px | 4px | Buttons, chips |
| `radius-lg` | 16px | 8px | 6px | Cards |
| `radius-xl` | 20px | 10px | 8px | Featured cards, modals |
| `radius-full` | 9999px | 9999px | 9999px | Pills, avatars |

**Narvo B2C:** Friendly, rounded, approachable (12–20px for cards).
**Platform:** Precise, technical, subtle (6–10px for cards).
**Intelligence:** Refined, institutional, clean (4–8px for cards).

---

## 7. Grids & Layouts — Golden Ratio

### The Golden Split

```
φ = 1.618
Content width = Total × 0.618
Sidebar width = Total × 0.382
```

Approximation in CSS Grid: `grid-template-columns: 8fr 5fr` (Fibonacci).

### Responsive Grid

| Viewport | Columns | Gutter | Margin | Breakpoint |
|----------|---------|--------|--------|------------|
| Mobile | 4 | 16px | 16px | < 640px |
| Tablet | 8 | 24px | 24px | 640–1024px |
| Desktop | 12 | 24px | 32px | > 1024px |

### Breakpoints (Golden-Ratio Derived)

Starting from 1920px and dividing by φ:

```
1920 → 1187 → 733 → 453 → 280
```

Practical rounded values:

| Token | Value | Nearest Device |
|-------|-------|----------------|
| `screen-xs` | 480px | Small phone |
| `screen-sm` | 640px | Large phone |
| `screen-md` | 768px | Tablet portrait |
| `screen-lg` | 1024px | Tablet landscape |
| `screen-xl` | 1280px | Desktop |
| `screen-2xl` | 1536px | Large desktop |

### Card Proportions

| Ratio | Decimal | Usage |
|-------|---------|-------|
| 1:1 | 1.0 | Thumbnails, avatars |
| 4:3 | 1.33 | Standard content cards |
| 3:2 | 1.5 | Photography, featured |
| φ:1 | 1.618 | Hero cards, golden rectangle |
| 16:9 | 1.78 | Video, banner |

---

## 8. Motion — Spring Physics & Cubic Bézier

### Easing Curves (Shared)

| Name | Curve | Usage |
|------|-------|-------|
| Standard | `cubic-bezier(0.2, 0, 0, 1)` | On-screen movement |
| Enter | `cubic-bezier(0.05, 0.7, 0.1, 1)` | Elements appearing |
| Exit | `cubic-bezier(0.3, 0, 0.8, 0.15)` | Elements leaving |

### Duration Scale

Perception thresholds: < 100ms feels instant. 200–300ms is standard. > 500ms feels slow.

| Token | Value | Usage |
|-------|-------|-------|
| `duration-instant` | 50ms | Ripples, micro-feedback |
| `duration-fast` | 100ms | Toggles, switches |
| `duration-normal` | 200ms | Button states, hovers |
| `duration-moderate` | 300ms | Dropdowns, reveals |
| `duration-slow` | 400ms | Page transitions |
| `duration-deliberate` | 500ms | Full-screen transitions |

**Rule:** Exit animations are 25% shorter than enter animations.

### Spring Physics (Framer Motion)

```
F = -kx - dv
```

| Component Size | Stiffness | Damping | Mass |
|----------------|-----------|---------|------|
| Small (buttons, toggles) | 400 | 28 | 1 |
| Medium (cards, sheets) | 260 | 20 | 1 |
| Large (page transitions) | 150 | 18 | 1 |

Standard entrance animation:
```javascript
initial: { opacity: 0, y: 12 }
animate: { opacity: 1, y: 0 }
transition: { type: "spring", stiffness: 260, damping: 20 }
```

Stagger: `delay: index * 0.06`
Press feedback: `whileTap: { scale: 0.96 }`

---

## 9. Affordances & Interactive Design — Fitts's Law

### The Formula

```
MT = a + b × log₂(1 + 2D/W)
```

Movement Time depends on Distance (D) and target Width (W). Larger, closer targets are faster to hit.

### Touch Target Minimums

| Context | Minimum Size | Recommended |
|---------|-------------|-------------|
| Primary CTA | 48×48px | 52×56px |
| Secondary actions | 44×44px | 48×48px |
| Icon buttons | 44×44px | 48×48px (with invisible padding) |
| Dense desktop UI | 32×32px | 36×36px (with 44px tap zone) |

### Visual Affordance Cues

- **Filled + shadow = primary action** (highest affordance)
- **Outlined = secondary action** (medium affordance)
- **Ghost/text = tertiary action** (low affordance)
- **Disabled = muted colour + no shadow** (zero affordance)

---

## 10. Feedback & States

### Response Timing

```
P(instant) = 1 if t < 100ms
```

All interactive feedback must occur within 100ms to feel instantaneous.

### State Layer System

Interactive elements use a transparent overlay system:

| State | Overlay Opacity | Duration |
|-------|----------------|----------|
| Default | 0% | — |
| Hover | 8% of text colour | 200ms |
| Focus | 12% + 2px ring | 0ms (instant) |
| Active/Pressed | 16% | 100ms |
| Disabled | Element at 38% opacity | — |

### Loading States

- **< 1s:** No indicator needed
- **1–3s:** Skeleton screens (pulsing placeholder)
- **> 3s:** Progress bar or spinner with text

---

## 11. Overlays & Modals

### Blur-Opacity Relationship

```
Blur = k × (1 - opacity)
```

Where k is the importance constant. Higher importance = higher blur + lower opacity.

| Type | Backdrop | Blur | z-index |
|------|----------|------|---------|
| Dropdown | none | 0 | 1000 |
| Sheet | `rgba(0,0,0, 0.3)` | 4px | 1100 |
| Modal | `rgba(0,0,0, 0.5)` | 8px | 1200 |
| Critical dialog | `rgba(0,0,0, 0.6)` | 16px | 1300 |

### Z-Index Scale

```
dropdown: 1000    sticky: 1100    overlay: 1200
modal: 1300       popover: 1400   toast: 1500     tooltip: 1600
```

### Accessibility Requirements

- Use `<dialog>` element with `.showModal()` for native focus trapping
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- Escape key dismissal
- Focus returns to trigger element on close

---

## 12. Icons

### Grid System

- Standard: 24×24px grid, 20×20px live area, 2px stroke
- Small: 16×16px grid, 14×14px live area, 1.5px stroke
- Large: 32×32px grid, 28×28px live area, 2.5px stroke

### Recommended Library

**Phosphor Icons** — 6 weights (thin, light, regular, bold, fill, duotone), 2000+ icons, React and web components. MIT license. Consistent 24px grid with 1.5px default stroke.

Alternative: **Lucide** (Feather fork, maintained, 1400+ icons).

### Optical Sizing

At smaller sizes, increase relative stroke width and reduce detail. At larger sizes, allow finer detail and thinner relative strokes.

---

## 13. Token Architecture — Three-Layer System

### Layer 1: Primitives (Brand-Specific)

Raw values that differ per brand:

```css
/* Narvo B2C primitives */
--primitive-amber-9: oklch(0.68 0.18 52);
--primitive-amber-10: oklch(0.63 0.18 50);
--primitive-neutral-1: oklch(0.98 0.005 80);
--primitive-font-display: 'General Sans', system-ui, sans-serif;
--primitive-radius-lg: 16px;

/* Narvo Platform primitives */
--primitive-cyan-9: oklch(0.75 0.14 210);
--primitive-neutral-1: oklch(0.14 0.015 270);
--primitive-font-display: 'Geist Sans', system-ui, sans-serif;
--primitive-radius-lg: 8px;
```

### Layer 2: Semantic (Shared API)

Purpose-based aliases that reference primitives:

```css
--color-bg: var(--primitive-neutral-1);
--color-surface: var(--primitive-neutral-2);
--color-primary: var(--primitive-brand-9);
--color-primary-hover: var(--primitive-brand-10);
--color-text: var(--primitive-neutral-12);
--color-text-secondary: var(--primitive-neutral-11);
--font-display: var(--primitive-font-display);
--radius-card: var(--primitive-radius-lg);
```

### Layer 3: Component (Shared API)

Element-specific mappings:

```css
--button-bg: var(--color-primary);
--button-text: var(--color-on-primary);
--button-radius: var(--radius-md);
--card-bg: var(--color-surface);
--card-border: var(--color-border);
--card-radius: var(--radius-card);
```

### Brand Switching in CSS

```css
[data-brand="consumer"] {
  --color-primary: var(--amber-9);
  --font-display: 'General Sans', system-ui, sans-serif;
  --radius-lg: 16px;
  --shadow-tint: 139, 90, 43;
}

[data-brand="platform"] {
  --color-primary: var(--cyan-9);
  --font-display: 'Geist Sans', system-ui, sans-serif;
  --radius-lg: 8px;
  --shadow-tint: 0, 0, 0;
}

[data-brand="intelligence"] {
  --color-primary: var(--indigo-9);
  --font-display: 'Instrument Sans', system-ui, sans-serif;
  --radius-lg: 6px;
  --shadow-tint: 0, 0, 0;
}
```

### Tailwind v4 Integration

```css
@theme {
  --color-primary: var(--color-primary);
  --color-surface: var(--color-surface);
  --font-display: var(--font-display);
  --radius-lg: var(--radius-lg);
}
```

---

## 14. Accessibility Requirements (Shared)

### Contrast Minimums (WCAG 2.1 AA)

| Context | Minimum Ratio |
|---------|---------------|
| Normal text (< 18px) | 4.5:1 |
| Large text (≥ 18px bold or ≥ 24px) | 3:1 |
| UI components, icons | 3:1 |
| Decorative, disabled | No requirement |

### Focus Management

```css
--focus-ring-width: 2px;
--focus-ring-offset: 2px;
--focus-ring-color: var(--color-primary);
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Font Scaling

Support user-adjustable text via `--font-scale` multiplier:

```css
font-size: calc(var(--text-base) * var(--font-scale, 1));
```

---

## 15. Summary — Three Brands at a Glance

|  | Narvo (B2C) | Narvo Platform (B2B) | Narvo Intelligence |
|--|-------------|----------------------|--------------------|
| **Primary** | Sunset Amber `oklch(0.68 0.18 52)` | Electric Cyan `oklch(0.75 0.14 210)` | Deep Indigo `oklch(0.55 0.22 280)` |
| **Accent** | Adire Indigo `oklch(0.55 0.20 275)` | Emerald `oklch(0.72 0.17 160)` | Mint `oklch(0.78 0.16 170)` |
| **Secondary** | Forest Teal `oklch(0.58 0.12 175)` | — | — |
| **Background** | Warm Champagne `oklch(0.98 0.01 75)` | Near Black `oklch(0.14 0.015 270)` | Clean White `oklch(0.995 0 0)` |
| **Display Font** | General Sans 600–700 | Geist Sans 600–700 | Instrument Sans 600–700 |
| **Body Font** | General Sans 400–500 | Geist Sans 400–500 | Inter 400–500 |
| **Mono Font** | Geist Mono | Geist Mono | Geist Mono |
| **Type Ratio** | 1.250 (Major Third) | 1.200 (Minor Third) | 1.333 (Perfect Fourth) |
| **Card Radius** | 16–20px | 8–10px | 6–8px |
| **Shadow Tint** | Warm amber | Neutral | Neutral |
| **Default Mode** | Light | Dark | Light |
| **Touch Target** | 48px+ | 44px+ | 44px+ |
| **Tone** | "Oya, Play" | "Get your API key" | "Quarterly Report" |

### What's Shared Across All Brands

- 8px spacing grid and scale
- Motion curves and spring physics
- Duration tokens
- Accessibility requirements (WCAG AA, focus management, reduced motion)
- Z-index scale
- Category tag colours
- Component API (semantic + component token layer)
- Icon grid (24px, Phosphor)
- Overlay blur/opacity system

---

*This document is the single source of truth for the Narvo design system. All skills, rules, configuration files, and code implementations derive from it.*
