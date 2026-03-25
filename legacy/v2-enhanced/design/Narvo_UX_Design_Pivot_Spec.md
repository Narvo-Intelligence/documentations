# Narvo Consumer — UX/Design Pivot Spec

> **Implementation guide for rebuilding the Narvo consumer app from Swiss Grid to the enhanced bold, warm design system.**
>
> Version 1.0 — March 2026. References: [Brand Guidelines](./Narvo_Brand_Guidelines.md), [Company Blueprint](./Narvo_Intelligence_Company_Blueprint.md).

---

## 1. Overview

This spec translates the Narvo brand guidelines into buildable component specs, CSS tokens, Tailwind config, and screen compositions. It covers what changes in the codebase, what stays, and the exact token values to use.

### What Changes

| Area | Before (Swiss Grid) | After (Enhanced) |
|------|---------------------|------------------|
| Display font | Space Grotesk | **Clash Display** (fontshare.com) |
| Body font | Inter | **Satoshi** (fontshare.com) |
| Mono font | JetBrains Mono | **Geist Mono** (Vercel CDN) |
| Border-radius | 0px everywhere | 8–20px scale |
| Shadows | None | Warm-tinted elevation |
| Background | `#1B211A` (dark matte green) | `#FFFCF5` (warm cream, light default) |
| Primary | `#EBD5AB` (sand) | `#D4520A` (burnt orange) |
| Accent | `#628141` (forest) | `#0A6847` (deep green) |
| Borders | 1px visible everywhere | Subtle, only where needed |
| Touch targets | 48px | 52px (scaled up) |
| Themes | 4 (Nature/Sun/Moon/Dusk) | 2 (Light default / Dark) |
| UI scale | Standard | Large (28px+ headers, 52px+ play) |

### What Stays

- CSS custom property architecture (RGB triplets for Tailwind opacity)
- 8px spacing grid (4, 8, 16, 24, 32, 48, 64px)
- Layout height var pattern (header, nav, audio bar)
- Content max-width tokens (1280px / 896px narrow)
- Semantic category colour palette (unchanged hex values)
- WCAG 2.1 AA compliance targets
- Utility classes pattern (`.page-scroll`, `.pb-safe`, `.pb-nav`, `.page-container`)
- Framer Motion for animation, Lenis for scroll
- Phosphor Icons

---

## 2. Font Loading

Replace the Google Fonts import in `index.css`:

```css
/* OLD */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

/* NEW */
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap');
/* Geist Mono via CDN — add @font-face or link tag */
```

Add preconnect hints in `index.html`:
```html
<link rel="preconnect" href="https://api.fontshare.com" crossorigin />
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
```

---

## 3. CSS Token Migration

### 3.1 Root Variables (`:root` in `index.css`)

```css
:root {
  /* --- Core palette (Enhanced Light — default) --- */
  --color-primary: 212 82 10;          /* #D4520A Burnt Orange */
  --color-bg: 255 252 245;             /* #FFFCF5 Warm Cream */
  --color-surface: 255 255 255;        /* #FFFFFF White */
  --color-surface-raised: 255 243 224; /* #FFF3E0 Warm highlight */
  --color-border: 240 220 200;         /* #F0DCC8 */
  --color-border-subtle: 245 232 216;  /* #F5E8D8 */
  --color-text-primary: 26 18 7;       /* #1A1207 */
  --color-text-secondary: 107 90 64;   /* #6B5A40 */
  --color-text-dim: 166 152 128;       /* #A69880 */
  --color-text-dim-accessible: 130 115 90; /* Meets 4.5:1 on cream */
  --color-accent: 10 104 71;           /* #0A6847 Deep Green */

  /* --- NEW: Radius tokens --- */
  --radius-xs: 6px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-pill: 9999px;

  /* --- NEW: Shadow tokens (warm-tinted) --- */
  --shadow-sm: 0 1px 4px rgba(180, 130, 80, 0.06);
  --shadow-md: 0 2px 12px rgba(180, 130, 80, 0.08);
  --shadow-lg: 0 4px 20px rgba(180, 130, 80, 0.10);

  /* --- Typography (CHANGED) --- */
  --font-display: 'Clash Display', system-ui, sans-serif;
  --font-body: 'Satoshi', system-ui, sans-serif;
  --font-mono: 'Geist Mono', 'JetBrains Mono', monospace;

  /* --- Layout (scaled up for bold UI) --- */
  --header-h: 56px;              /* was 48px */
  --header-h-desktop: 72px;      /* was 64px */
  --mobile-nav-h: 60px;          /* was 56px */
  --audio-bar-h: 68px;           /* was 60px */
  --touch-target-min: 52px;      /* was 48px */
  --touch-target-icon: 48px;     /* kept */

  /* --- KEPT UNCHANGED --- */
  /* --spacing-1 through --spacing-7: same values */
  /* --container-px-mobile: 16px; --container-px-desktop: 32px */
  /* --content-max-w: 1280px; --content-max-w-narrow: 896px */
  /* --line-height-body: 1.5; --line-height-heading: 1.25 */
  /* --focus-outline-*: update --focus-outline-color to match primary */
  --focus-outline-color: 212 82 10;

  /* Semantic categories: UNCHANGED hex values */
}
```

### 3.2 Dark Theme Override

```css
[data-theme='dark'] {
  --color-primary: 232 140 68;         /* #E88C44 Lighter orange for dark */
  --color-bg: 18 14 10;                /* #120E0A Deep warm black */
  --color-surface: 28 22 16;           /* #1C1610 */
  --color-surface-raised: 40 32 22;    /* #282016 */
  --color-border: 60 48 34;            /* #3C3022 */
  --color-border-subtle: 48 38 26;     /* #30261A */
  --color-text-primary: 245 240 232;   /* #F5F0E8 */
  --color-text-secondary: 180 165 140; /* #B4A58C */
  --color-text-dim: 120 108 90;        /* #786C5A */
  --color-accent: 52 211 153;          /* #34D399 Emerald */
  --focus-outline-color: 232 140 68;
}
```

---

## 4. Tailwind Config Changes

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        display: ["Clash Display", "system-ui", "sans-serif"],
        body: ["Satoshi", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        xs: "var(--radius-xs)",   // 6px
        sm: "var(--radius-sm)",   // 8px
        DEFAULT: "var(--radius-md)", // 12px
        md: "var(--radius-md)",   // 12px
        lg: "var(--radius-lg)",   // 16px
        xl: "var(--radius-xl)",   // 20px
        pill: "9999px",
        full: "9999px",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow-md)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      // colors, spacing, height: keep existing pattern,
      // just the font-family values change
    },
  },
};
```

---

## 5. Component Specs

### 5.1 Story Card (Featured)

```
Container:  rounded-xl (20px), bg-surface, shadow-lg, border border-border
Top bar:    h-1 (4px) bg-primary, full width, rounded-t-xl
Inner:      p-5 (20px)
Play btn:   w-14 h-14 (56px), rounded-2xl (16px), bg-primary/10, text-primary
Title:      font-display text-[17px] font-semibold tracking-tight leading-snug
Meta:       font-body text-[11px] text-dim
Tags:       mt-3.5, flex gap-1.5
Tag:        text-[10px] font-semibold px-2.5 py-0.5 rounded-lg
```

### 5.2 Story Card (Standard)

```
Container:  rounded-lg (16px), bg-surface, shadow-md, border border-border
Inner:      p-4 (16px), flex gap-3 items-center
Play btn:   w-11 h-11 (44px), rounded-xl (12px), bg-surface-raised
Title:      font-display text-sm font-semibold tracking-tight
Meta:       font-body text-[10px] text-dim
```

### 5.3 Audio Player Bar

```
Container:  h-[68px], bg-surface, shadow-lg, border-t border-border
Inner:      px-4, flex gap-4 items-center
Play btn:   w-14 h-14 (56px), rounded-2xl, bg-primary, text-white
            shadow: 0 4px 16px rgba(212,82,10,0.25)
            active: scale(0.92) transition 0.1s
Title:      font-display text-[15px] font-semibold tracking-tight
Progress:   h-1 (4px), rounded-full, bg-surface-raised, fill: bg-primary
```

### 5.4 Buttons

| Type | Classes |
|------|---------|
| Primary | `font-display font-semibold text-sm text-white bg-primary px-6 py-3 rounded-xl shadow-md tracking-tight` |
| Secondary | `font-display font-semibold text-sm text-primary bg-primary/10 border-1.5 border-primary px-6 py-3 rounded-xl` |
| Ghost | `font-body text-sm text-secondary border border-border px-5 py-2.5 rounded-lg` |
| Icon | `font-body text-dim bg-surface-raised p-2.5 rounded-lg min-w-touch min-h-touch` |

### 5.5 Navigation (Mobile Bottom)

```
Container:  h-[60px], bg-surface, border-t border-border
Items:      flex justify-around items-center
Active:     icon circle bg-primary/10, label font-body text-[9px] font-semibold text-primary
Inactive:   icon circle bg-surface-raised, label text-dim
```

### 5.6 Header

```
Mobile:     h-[56px], px-4, flex justify-between items-center, bg-bg
Desktop:    h-[72px], px-8
Logo:       font-display text-[22px] font-semibold text-primary tracking-tight
Avatar:     w-9 h-9, rounded-full, border-2 border-primary, bg-primary/10
```

### 5.7 Category Tags

```
Container:  px-3 py-1 rounded-lg text-[10px] font-semibold
Colours:    Use existing semantic palette (--color-finance, etc.)
            Background: 10% opacity of the category colour
Verified:   bg-accent/10 text-accent
Duration:   bg-surface-raised text-dim font-mono
```

---

## 6. Typography Scale

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

---

## 7. Motion Spec

### Framer Motion (components)

```js
// Card entrance (staggered list)
variants: {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, type: "spring", stiffness: 260, damping: 20 }
  }),
}

// Play button press
whileTap={{ scale: 0.92 }}
transition={{ duration: 0.1 }}

// Page transition
initial={{ opacity: 0, y: 12 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}

// Audio waveform pulse (when playing)
animate={{ scaleY: [1, 1.4, 1] }}
transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
```

### Lenis (scroll)

```js
// Keep current Lenis config — no changes needed
// Smooth scroll with momentum, same as before
```

### CSS transitions

```css
/* Updated animation — warmer feel */
.animate-fade-in-up {
  animation: fade-in-up 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 8. Screen Compositions

### 8.1 Home Dashboard (Mobile)

```
[Header: 56px]
  narvo (Clash Display 22px, primary) ··· [Avatar 36px]

[Greeting: 28px Clash Display]
  "Good morning, Oga"
  "Your briefing is ready" (Satoshi 13px, secondary)

[Featured Card: 20px radius, shadow-lg]
  [4px primary top bar]
  [56px play] Title 17px ··· meta
  [Tags: Business, Verified]

[Standard Card: 16px radius, shadow-md]
  [44px play] Title 14px ··· meta

[Standard Card]
  ...

[Audio Player: 68px, shadow-lg, above nav]
  [56px primary play] Title ··· progress bar

[Bottom Nav: 60px]
  Home* · Discover · Library · Settings
```

### 8.2 News Detail (Mobile)

```
[Header: back arrow + share/bookmark]

[Hero Image: full-width, 16px bottom radius]

[Content: page-container]
  Title: Clash Display 22px, semibold
  Meta: source · category tag · time · Verified tag
  
  [Audio Bar: full-width card, 56px play, warm shadow]
  
  [Key Takeaways: accent left border, bg-accent/5]
  
  [Full Narrative: Satoshi 15px, 1.6 line-height]
  
  [Source attribution: mono, dim]
  [Truth Tag: bordered card, fact-check metadata]
```

### 8.3 Morning Briefing

```
[Header: "Morning Briefing" Clash Display 20px]
  [Generate button: primary, rounded-xl]

[Briefing Card: xl radius, shadow-lg]
  [Large play button: 64px, primary]
  "5 stories · 12 min · Yoruba"
  
[Story List: staggered cards]
  1. Story title ··· [mini play]
  2. Story title ··· [mini play]
  ...

[Transcript: collapsible, mono styling]
```

---

## 9. Migration Phases

### Phase 1: Token Swap (1–2 days)

1. Replace font import in `index.css`
2. Update `:root` colour values (copy from §3.1)
3. Add `--radius-*` and `--shadow-*` tokens
4. Update `--font-display`, `--font-body`, `--font-mono`
5. Update `tailwind.config.js` (font families, border-radius, shadows)
6. Update `--header-h`, `--mobile-nav-h`, `--audio-bar-h`, `--touch-target-min`
7. Replace 4 theme overrides with single `[data-theme='dark']` (§3.2)
8. Update `--focus-outline-color`

**Result:** Entire app visually transforms. Fonts change, colours change, everything gets warmer. Layout structure stays identical but elements will still have 0px radius.

### Phase 2: Component Rebuild (3–5 days)

1. Story cards: add radius, shadow, top colour bar on featured
2. Audio player bar: scale up, add primary shadow to play button
3. Header: scale up, update logo styling
4. Bottom nav: update active/inactive states
5. Buttons: apply new radius and elevation per type
6. Tags/badges: rounded with category colours
7. Remove all `.narvo-border` classes (Swiss Grid borders)
8. Replace `.btn-command` with new button classes

### Phase 3: Screen Redesign (5–8 days)

1. Home Dashboard: large greeting, featured/standard card hierarchy
2. News Detail: hero image, large audio bar, key takeaways section
3. Morning Briefing: prominent play, story list, transcript
4. Discover: radio + podcast tabs with warm cards
5. Settings: clean form layout with new radii
6. Onboarding: bold, warm welcome screens

---

## 10. Files to Modify

| File | Changes |
|------|---------|
| `frontend/src/index.css` | Root variables, font import, theme overrides, radius/shadow tokens, utility classes |
| `frontend/tailwind.config.js` | Font families, border-radius, box-shadow, remove 0px radius overrides |
| `frontend/index.html` | Preconnect hints for fontshare.com and jsdelivr.net |
| `frontend/src/components/DashboardHeader.*` | Height, logo styling, avatar |
| `frontend/src/components/MobileNav.*` | Height, active/inactive styling |
| `frontend/src/components/AudioPlayerBar.*` | Height, play button size/shadow, progress bar |
| `frontend/src/components/StoryCard.*` (new or refactored) | Featured vs standard variants |
| `frontend/src/pages/DashboardPage.*` | Greeting section, card layout |
| `frontend/src/pages/NewsDetailPage.*` | Hero, audio, takeaways |
| `frontend/src/pages/BriefingPage.*` | Play button, story list |

---

*This spec is the implementation guide for the Narvo consumer design pivot. For brand-level guidelines see [Brand Guidelines](./Narvo_Brand_Guidelines.md). For Platform (B2B) design, a separate spec will be created when the Platform website project begins.*
