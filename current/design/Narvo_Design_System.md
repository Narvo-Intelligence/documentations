# Narvo Design System (Enhanced Direction)

> **Last updated:** March 2026 — Enhanced direction replacing Swiss Grid.
>
> Single source of truth for the Narvo consumer app. Tokens implemented in `frontend/src/index.css` and `frontend/tailwind.config.js`.

---

## 1. Design Philosophy

**"The news should feel like it was made just for you."**

The enhanced direction replaces the Swiss Grid "technical instrument" metaphor with a bold, warm, culturally-alive aesthetic. Everything is oversized and confident. The app radiates energy — it doesn't whisper.

### What Changed from Swiss Grid

| Element | Swiss Grid (Previous) | Enhanced (Current) |
|---------|----------------------|-------------------|
| Metaphor | Technical instrument / command console | Personal companion / morning ritual |
| Display Font | Space Grotesk | **Clash Display** |
| Body Font | Inter | **Satoshi** |
| Mono Font | JetBrains Mono | **Geist Mono** |
| Border-radius | 0px everywhere | 8–20px scale |
| Shadows | None | Warm-tinted elevation |
| Borders | 1px visible everywhere | Subtle, only where needed |
| Background | `#1B211A` (dark matte green) | `#FFFCF5` (warm cream) |
| Primary | `#EBD5AB` (sand) | `#D4520A` (burnt orange) |
| Themes | 4 (Nature/Sun/Moon/Dusk) | 2 (Light default + Dark) |
| Touch targets | 48px | 52px |
| UI scale | Standard | Large (28px+ headers, 52px+ play) |
| Onboarding tone | "SYSTEM_STATUS // LOCALE_MATRIX" | "What languages do you speak at home?" |
| Greeting | "FEED // DASHBOARD" | "Good morning, Oga" |

---

## 2. Typography

### Font Stack

| Role | Font | Source | Weight | Usage |
|------|------|--------|--------|-------|
| Display / Headings | **Clash Display** | fontshare.com (free) | 400, 500, 600, 700 | App headers (28px+), story titles (16px+), hero, marketing |
| Body / UI | **Satoshi** | fontshare.com (free) | 400, 500, 700 | Story body, UI labels, nav, buttons |
| Mono / Technical | **Geist Mono** | Vercel CDN (free) | 400, 500 | Timestamps, truth tags, source IDs (minimal use) |

All three brands (Narvo, Narvo Platform, Narvo Intelligence) share this font family. Brands differentiate through colour, not fonts.

### Font Loading

```css
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap');
```

Geist Mono loaded via `@font-face` pointing to `cdn.jsdelivr.net/npm/geist`. Add preconnect hints in `index.html`.

### Type Scale

| Element | Font | Size | Weight | Tracking | Line-height |
|---------|------|------|--------|----------|-------------|
| Page greeting | Clash Display | 28–32px | 600 | -0.03em | 1.15 |
| Section title | Clash Display | 20–22px | 600 | -0.02em | 1.2 |
| Card title (featured) | Clash Display | 17px | 600 | -0.01em | 1.25 |
| Card title (standard) | Clash Display | 14px | 600 | -0.01em | 1.25 |
| Body text | Satoshi | 14px | 400 | normal | 1.6 |
| Labels / metadata | Satoshi | 12px | 500 | normal | 1.4 |
| Captions | Satoshi | 11px | 400 | normal | 1.4 |
| Tags | Satoshi | 10px | 600 | normal | 1 |
| Mono / technical | Geist Mono | 11px | 400 | normal | 1.4 |

### CSS Variables

```css
--font-display: 'Clash Display', system-ui, sans-serif;
--font-body: 'Satoshi', system-ui, sans-serif;
--font-mono: 'Geist Mono', 'JetBrains Mono', monospace;
```

---

## 3. Colour Palette

### Light Theme (Default)

Core palette tokens use **RGB triplets** so Tailwind can apply opacity: `rgb(var(--color-primary) / <alpha-value>)`.

| Role | Hex | RGB Triplet | Usage |
|------|-----|-------------|-------|
| Background | `#FFFCF5` | `255 252 245` | App background, page base |
| Surface | `#FFFFFF` | `255 255 255` | Cards, modals, inputs |
| Surface Raised | `#FFF3E0` | `255 243 224` | Hover, selected, warm highlights |
| Border | `#F0DCC8` | `240 220 200` | Card borders, dividers |
| Border Subtle | `#F5E8D8` | `245 232 216` | Inner dividers, secondary borders |
| Primary | `#D4520A` | `212 82 10` | CTAs, active states, brand anchor |
| Primary Muted | `#FFF1E8` | `255 241 232` | Tag backgrounds, light badges |
| Accent | `#0A6847` | `10 104 71` | Verification, secondary actions |
| Accent Muted | `#E6F9F0` | `230 249 240` | Accent tag backgrounds |
| Text Primary | `#1A1207` | `26 18 7` | Headlines, body copy |
| Text Secondary | `#6B5A40` | `107 90 64` | Labels, metadata, captions |
| Text Dim | `#A69880` | `166 152 128` | Placeholders, disabled |
| Text Dim (Accessible) | `#82735A` | `130 115 90` | Meets 4.5:1 on cream bg |

Deep burnt orange (#D4520A) — Lagos sunsets, market energy, confidence. Forest green accent grounds it. Warm cream background feels luxurious.

### Dark Theme

```css
[data-theme='dark'] {
  --color-primary: 232 140 68;           /* #E88C44 lighter orange */
  --color-bg: 18 14 10;                  /* #120E0A deep warm black */
  --color-surface: 28 22 16;             /* #1C1610 */
  --color-surface-raised: 40 32 22;      /* #282016 */
  --color-border: 60 48 34;              /* #3C3022 */
  --color-border-subtle: 48 38 26;       /* #30261A */
  --color-text-primary: 245 240 232;     /* #F5F0E8 */
  --color-text-secondary: 180 165 140;   /* #B4A58C */
  --color-text-dim: 120 108 90;          /* #786C5A */
  --color-accent: 52 211 153;            /* #34D399 emerald */
}
```

### Semantic Category Colours (Unchanged)

Used for tags, badges, and content filtering. Paired with 10% opacity background.

| Category | Colour | Category | Colour |
|----------|--------|----------|--------|
| Finance | `#EBD5AB` | Science | `#5EEAD4` |
| Environment | `#93C5FD` | Culture | `#F472B6` |
| Tech | `#D8B4FE` | Sports | `#FB923C` |
| Urgent | `#FCA5A5` | Health | `#4ADE80` |
| Politics | `#FDBA74` | Security | `#94A3B8` |

---

## 4. Spacing & Layout

### Spacing Scale (8px grid)

```css
--spacing-1: 4px;   --spacing-2: 8px;   --spacing-3: 16px;
--spacing-4: 24px;  --spacing-5: 32px;  --spacing-6: 48px;  --spacing-7: 64px;
```

### Layout Heights

| Token | Value | Notes |
|-------|-------|-------|
| `--header-h` | 56px | Mobile header (was 48px) |
| `--header-h-desktop` | 72px | Desktop header (was 64px) |
| `--mobile-nav-h` | 60px | Bottom nav bar (was 56px) |
| `--audio-bar-h` | 68px | Audio player bar (was 60px) |
| `--bottom-safe` | nav + audio + safe-area | For page bottom padding |

### Container

```css
--container-px-mobile: 16px;
--container-px-desktop: 32px;
--content-max-w: 1280px;
--content-max-w-narrow: 896px;
```

### Touch Targets

```css
--touch-target-min: 52px;    /* was 48px — scaled up for bold UI */
--touch-target-icon: 48px;
```

---

## 5. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-xs` | 6px | Small badges, inline elements |
| `--radius-sm` | 8px | Inputs, small buttons |
| `--radius-md` | 12px | Standard buttons, small cards |
| `--radius-lg` | 16px | Standard cards, audio player |
| `--radius-xl` | 20px | Featured cards, modals |
| `--radius-pill` | 9999px | Pill buttons, tags |

---

## 6. Shadows

Warm-tinted shadows (orange-brown undertone, not grey).

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 4px rgba(180, 130, 80, 0.06)` | Subtle lift, tags |
| `--shadow-md` | `0 2px 12px rgba(180, 130, 80, 0.08)` | Standard cards |
| `--shadow-lg` | `0 4px 20px rgba(180, 130, 80, 0.10)` | Featured cards, audio player |

Play button shadow: `0 4px 16px rgba(212, 82, 10, 0.25)` (primary-tinted).

---

## 7. Components

### 7.1 Shell

- **DashboardLayout:** Uses `h-dvh` and CSS-var heights. Light cream background.
- **DashboardHeader:** Mobile 56px, desktop 72px. "narvo" wordmark in Clash Display 22px burnt orange. Avatar circle with primary border.
- **MobileNav:** 60px bottom bar. Active: icon circle `bg-primary/10`, label in primary. Inactive: `bg-surface-raised`, text dim.
- **AudioPlayerBar:** 68px. 56px play button (burnt orange, shadow, scale on press). Progress bar with primary fill.

### 7.2 Story Cards

**Featured Card:**
- Container: `rounded-xl` (20px), `bg-surface`, `shadow-lg`, `border border-border`
- Top bar: 4px `bg-primary`, full width
- Play button: 56px, `rounded-2xl` (16px), `bg-primary/10`, text primary
- Title: Clash Display 17px semibold
- Tags: category + Verified badges below

**Standard Card:**
- Container: `rounded-lg` (16px), `bg-surface`, `shadow-md`, `border border-border`
- Play button: 44px, `rounded-xl` (12px), `bg-surface-raised`
- Title: Clash Display 14px semibold

### 7.3 Buttons

| Type | Radius | Style |
|------|--------|-------|
| Primary | 12px | `bg-primary text-white shadow-md font-display font-semibold` |
| Secondary | 12px | `bg-primary/10 text-primary border-primary font-display` |
| Ghost | 10px | `bg-transparent text-secondary border-border` |
| Icon | 10px | `bg-surface-raised text-dim min-w-touch min-h-touch` |

### 7.4 Tags & Badges

- Category: `px-3 py-1 rounded-lg text-[10px] font-semibold` with category colour + 10% bg
- Verified: `bg-accent/10 text-accent`
- Duration: `bg-surface-raised text-dim font-mono`

### 7.5 Audio Player

- Full player: 68px, `shadow-lg`, 56px primary play button with orange shadow
- Mini player: Compact version above bottom nav when backgrounded
- Progress bar: 4px, `rounded-full`, `bg-surface-raised`, fill `bg-primary`
- Media Session API for lock screen controls

---

## 8. Motion

### Framer Motion

```js
// Card entrance (staggered)
{ opacity: 0, y: 12 } → { opacity: 1, y: 0 }
transition: { type: "spring", stiffness: 260, damping: 20, delay: i * 0.06 }

// Play button press
whileTap: { scale: 0.92 }
transition: { duration: 0.1 }

// Page transition
initial: { opacity: 0, y: 12 }
animate: { opacity: 1, y: 0 }
transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }
```

### CSS

```css
--transition-fast: 0.12s ease;
--transition-medium: 0.25s ease-out;

.animate-fade-in-up {
  animation: fade-in-up 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}
```

### Lenis

Smooth momentum-based scrolling. Same configuration as before — no changes needed.

---

## 9. Utility Classes

| Class | Purpose |
|-------|---------|
| `.page-scroll` | Flex-1 scroll container for page content |
| `.pb-safe` | Bottom padding clearing nav + audio bar |
| `.pb-nav` | Bottom padding clearing nav only |
| `.page-container` | Max-width `--content-max-w`, responsive padding |
| `.page-container-narrow` | Max-width `--content-max-w-narrow` |
| `.page-header` | Sticky header bar, min-height 56px (64px md+) |
| `.animate-fade-in-up` | Entrance animation (opacity + translateY) |

Swiss Grid utility classes removed: `.narvo-border`, `.narvo-border-subtle`, `.narvo-border-b`, `.narvo-border-t`, `.btn-command`, `.btn-command-outline`.

---

## 10. Accessibility (WCAG 2.1 Level AA)

### Colour Contrast

| Context | Foreground | Background | Ratio | Pass? |
|---------|-----------|-----------|-------|-------|
| Body text | `#1A1207` | `#FFFCF5` | ~15:1 | ✓ |
| Secondary text | `#6B5A40` | `#FFFCF5` | ~5.8:1 | ✓ |
| Dim (accessible) | `#82735A` | `#FFFCF5` | ~4.5:1 | ✓ |
| Primary (CTA) | `#D4520A` | `#FFFCF5` | ~4.8:1 | ✓ (large text/UI) |
| Primary on white | `#D4520A` | `#FFFFFF` | ~4.6:1 | ✓ (large text/UI) |
| Accent (green) | `#0A6847` | `#FFFCF5` | ~6.2:1 | ✓ |

### Touch & Focus

```css
--touch-target-min: 52px;
--focus-outline-width: 2px;
--focus-outline-style: solid;
--focus-outline-color: 212 82 10;   /* matches primary */
--focus-outline-offset: 2px;
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Font Scaling

`--font-scale` variable respected in news detail for user-adjustable text size.

---

## 11. Tailwind Config (Key Changes)

```js
fontFamily: {
  display: ["Clash Display", "system-ui", "sans-serif"],
  body: ["Satoshi", "system-ui", "sans-serif"],
  mono: ["Geist Mono", "JetBrains Mono", "monospace"],
},
borderRadius: {
  xs: "var(--radius-xs)",    // 6px
  sm: "var(--radius-sm)",    // 8px
  DEFAULT: "var(--radius-md)", // 12px
  md: "var(--radius-md)",    // 12px
  lg: "var(--radius-lg)",    // 16px
  xl: "var(--radius-xl)",    // 20px
  pill: "9999px",
  full: "9999px",
},
boxShadow: {
  sm: "var(--shadow-sm)",
  DEFAULT: "var(--shadow-md)",
  md: "var(--shadow-md)",
  lg: "var(--shadow-lg)",
},
```

Remove the `borderRadius: { 'none': '0', DEFAULT: '0', ... }` overrides that forced 0px everywhere.

---

## 12. Brand Family Reference

This design system is for **Narvo (Consumer, B2C)**. The other brands have separate palettes:

| | Narvo (B2C) | Narvo Platform (B2B) | Narvo Intelligence (Parent) |
|---|---|---|---|
| Background | `#FFFCF5` warm cream | `#08090D` rich black | `#0A0C10` charcoal-blue |
| Primary | `#D4520A` burnt orange | `#818CF8` soft indigo | `#6366F1` indigo |
| Accent | `#0A6847` deep green | `#34D399` emerald | `#06D6A0` mint |
| Mode | Light default | Dark default | Dark |

All three share: Clash Display, Satoshi, Geist Mono. See [Brand Guidelines](../brand/Narvo_Brand_Guidelines.md) for details.
