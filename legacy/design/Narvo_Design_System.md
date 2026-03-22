# Narvo Design System (Revised)

## Source
This document was uploaded by the user on Feb 25, 2026. Saved from: Narvo_Design_System.md

## Key Changes Applied

### Feb 2026
- **Accessibility CSS Variables**: `--color-text-dim-accessible`, `--touch-target-min`, `--line-height-body`, focus outline tokens; `:focus-visible`; skip link; `prefers-reduced-motion`; theme-scoped focus/dim colors.

### Mar 2026 (UI Redesign Phase 1+2)
1. **Four themes** (replacing single dark/light): **Nature** (default dark), **Sun** (warm light), **Moon** (deep navy dark), **Dusk** (warm amber dark). Selected via `data-theme` on root.
2. **Layout heights (CSS vars)** — single source of truth: `--header-h` (48px), `--header-h-desktop` (64px), `--mobile-nav-h` (56px), `--audio-bar-h` (60px); `--bottom-safe`, `--bottom-nav-only` for mobile nav + audio bar clearance.
3. **New tokens**: `--color-surface-raised`, `--color-border-subtle`; `--content-max-w` (1280px), `--content-max-w-narrow` (896px); `--container-px-mobile` / `--container-px-desktop`; `--font-display` (headers); transition tokens; RGB triplets for Tailwind opacity.
4. **Utility classes**: `.page-scroll`, `.pb-safe`, `.pb-nav`, `.page-container`, `.page-container-narrow`, `.page-header`, `.narvo-border-subtle` (and `-b`/`-t`), `.btn-ghost`, `.animate-fade-in-up`.
5. **Display density**: `data-density="compact|standard|expanded"` for section padding, inline gap, control padding.
6. **Tailwind**: `height.header`, `height.mobile-nav`, `height.audio-bar`; `minHeight`/`minWidth.touch`; `maxWidth.content`/`content-narrow`; `borderRadius.full: 9999px`; `fade-in-up` animation.
7. **Shell**: DashboardLayout uses `h-dvh`; header, sidebar, MobileNav, AudioPlayerBar use CSS-var heights; pages use `pb-safe` / `pb-nav` instead of hardcoded bottom padding.

## Design Tokens (CSS Variables)
See `frontend/src/index.css` for the full implementation. Core palette tokens use **RGB triplets** (e.g. `235 213 171`) so Tailwind can apply opacity via `rgb(var(--color-primary) / <alpha-value>)`.

## Typography
- **Headers / Display:** Space Grotesk (`--font-display`)
- **Body:** Inter (`--font-body`)
- **System / Mono:** JetBrains Mono (`--font-mono`)

## Themes (data-theme)
Four themes are available. Default is **Nature**. Set `data-theme` on the root element (`nature` | `sun` | `moon` | `dusk`).

| Theme   | Description | Base / Primary |
|--------|--------------|----------------|
| **Nature** | Default dark. Forest/sand. | BG `#1B211A`; primary `#EBD5AB` (Sand/Beige). |
| **Sun**    | Warm light. Parchment base, green accent. | BG `#FCF6F0`; primary green-800. Border warmer for visibility. |
| **Moon**   | Deep navy dark. Purple accent. | BG `#0b0c14`; surface `#161928`; border `#3a3e58`; primary `#a79bff`. |
| **Dusk**   | Warm amber dark. Editorial studio feel. | BG `#14100c`; primary `#ffba4a` (amber). |

- **Surface (secondary):** Cards and raised areas use `--color-surface`; hover/elevated use `--color-surface-raised`.
- **Borders:** Primary structure `--color-border`; inner/dividers `--color-border-subtle`.
- **Text:** Primary `--color-text-primary`; secondary/labels `--color-text-secondary`; dim `--color-text-dim`; WCAG-friendly dim `--color-text-dim-accessible`.
- **Primary (signal)** is limited to ~**10%** of screen real estate for hierarchy.

### Semantic Label Palette
Used for metadata categorization and tag-based filtering. These colors are paired with a 10% opacity background of the same hue for subtle classification.

| Category | Text Color | Border/Active Color | Context |
| :--- | :--- | :--- | :--- |
| **Finance** | `#EBD5AB` | `#EBD5AB` | Market data, economic shifts |
| **Environ** | `#93C5FD` | `#1E3A8A` | Climate, ecology, geography |
| **Tech** | `#D8B4FE` | `#581C87` | AI, hardware, infrastructure |
| **Urgent** | `#FCA5A5` | `#7F1D1D` | Critical breaking news, alerts |
| **Politics** | `#FDBA74` | `#7C2D12` | Policy, governance, regional law |
| **Science** | `#5EEAD4` | `#134E4A` | Research, health, space |
| **Culture** | `#F472B6` | `#831843` | Art, music, social trends |
| **Sports** | `#FB923C` | `#7C2D12` | Athletics, competitions |
| **Health** | `#4ADE80` | `#064E3B` | Wellness, medicine, outbreaks |
| **Security** | `#94A3B8` | `#1E293B` | Defense, cyber, law enforcement |
| **Opinion** | `#A8A29E` | `#44403C` | Editorials, commentary |
| **Legal** | `#818CF8` | `#312E81` | Jurisprudence, court rulings |

## 4. Design Tokens (The Unified Grid)
Uniformity across Web and Mobile is maintained via strict spacing, layout, and shape tokens. Implemented in `frontend/src/index.css`; core colors use **RGB triplets** for Tailwind opacity.

### Layout Heights (single source of truth)
- `--header-h`: 48px (DashboardHeader mobile)
- `--header-h-desktop`: 64px (DashboardHeader md+)
- `--mobile-nav-h`: 56px (MobileNav tab bar)
- `--audio-bar-h`: 60px (AudioPlayerBar)
- `--bottom-safe`: nav + audio + safe-area (for page bottom padding)
- `--bottom-nav-only`: nav + safe-area

### Spacing & Layout
- **Unit scale:** `--spacing-1` (4px) through `--spacing-7` (64px). 8pt step grid.
- **Container:** `--container-px-mobile` (16px), `--container-px-desktop` (32px).
- **Content width:** `--content-max-w` (1280px), `--content-max-w-narrow` (896px).
- **Grid:** `--grid-gap` 16px; borders 1px hairline.

### Shapes & Radii
- **Standard / interactive:** 0px (Swiss sharp). **Pill shapes:** `borderRadius.full` = 9999px in Tailwind.
- **Borders:** `--border-width` 1px.

### Representative token set (Nature theme; implementation uses RGB for colors)
```css
:root {
  /* Core (RGB for opacity) — see index.css for full set */
  --color-primary:          235 213 171;
  --color-bg:               27  33  26;
  --color-surface:          36  43  35;
  --color-surface-raised:   44  53  43;
  --color-border:           98 129  65;
  --color-border-subtle:    62  77  45;
  --color-text-primary:    242 242 242;
  --color-text-secondary:  139 174 102;
  --color-text-dim-accessible: 163 163 163;

  --border-width: 1px;
  --spacing-1: 4px;  --spacing-2: 8px;  --spacing-3: 16px;
  --spacing-4: 24px;  --spacing-5: 32px;  --spacing-6: 48px;  --spacing-7: 64px;
  --container-px-mobile: 16px;  --container-px-desktop: 32px;
  --content-max-w: 1280px;  --content-max-w-narrow: 896px;

  --header-h: 48px;  --header-h-desktop: 64px;
  --mobile-nav-h: 56px;  --audio-bar-h: 60px;
  --bottom-safe: calc(var(--mobile-nav-h) + var(--audio-bar-h) + env(safe-area-inset-bottom, 0px));

  --touch-target-min: 48px;  --touch-target-icon: 44px;
  --line-height-body: 1.6;  --line-height-heading: 1.2;
  --focus-outline-width: 2px;  --focus-outline-style: solid;
  --focus-outline-color: 235 213 171;  --focus-outline-offset: 2px;

  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --transition-fast: 0.12s ease;  --transition-medium: 0.25s ease-out;
}
```
Theme overrides live under `[data-theme='sun']`, `[data-theme='moon']`, `[data-theme='dusk']` (Nature is default `:root`).

### Layout utility classes
- **`.page-scroll`** — Flex-1 scroll container for authenticated page content (overflow-y auto, min-height 0).
- **`.pb-safe`** — Bottom padding that clears mobile nav + audio bar; desktop override 2rem.
- **`.pb-nav`** — Clears only nav (e.g. pages without active audio).
- **`.page-container`** — Max-width `--content-max-w`, responsive horizontal padding.
- **`.page-container-narrow`** — Max-width `--content-max-w-narrow` for forms/settings.
- **`.page-header`** — Sticky page header bar with border-bottom, min-height 56px (64px md+).
- **`.narvo-border-subtle`** (and `-b`, `-t`) — 1px border using `--color-border-subtle`.
- **`.btn-ghost`** — Icon-only / low-emphasis button (transparent, hover surface-raised, min touch target).
- **`.animate-fade-in-up`** — Entrance animation (opacity + translateY 8px → 0).

### Display density
`data-density` on a container: `compact` | `standard` | `expanded`. Controls `--density-section-padding`, `--density-inline-gap`, `--density-control-padding`, and density-aware grid/card padding.

### Tailwind (frontend/tailwind.config.js)
- **Heights:** `h-header`, `h-header-desktop`, `h-mobile-nav`, `h-audio-bar` map to CSS vars.
- **Touch:** `min-h-touch`, `min-w-touch`, `min-h-touch-icon`, `min-w-touch-icon`.
- **Max width:** `max-w-content` (1280px), `max-w-content-narrow` (896px).
- **Colors:** Theme-aware via `rgb(var(--color-*) / <alpha-value>)` (e.g. `bg-primary`, `text-content`, `border-surface-raised`).
- **Border radius:** Default 0; `rounded-full` = 9999px for pills.
- **Animation:** `animate-fade-in-up` (0.3s ease-out).

## 5. Typography
- **Headers & numerals:** *Space Grotesk* (`--font-display`) — Impact, data points, section titles.
- **UI body content:** *Inter* (`--font-body`) — News summaries and article body.
- **System identifiers:** *JetBrains Mono* (`--font-mono`) — Labels, timestamps, `[COMMAND]` style, technical metadata.

## 6. Iconography (Phosphoricons)
All functional icons must be sourced from **[Phosphoricons](https://phosphoricons.com/)**.
- **Style:** `Regular` (1.5px stroke) for consistency with hairline borders.
- **Weight:** Use `Fill` weight ONLY for active/toggle states in the primary color `#EBD5AB`.
- **Sizing:** Fixed at 20px or 24px within technical cells.

## 7. Motion & Interaction (Broadcast Fidelity)
Motion in Narvo is not decorative; it is a **Signal of Process**.

### Tools
- **[Motion (framer-motion)](https://motion.dev/)**: For lightweight, reactive layout transitions and gestural animations.
- **[GSAP](https://gsap.com/)**: For frame-accurate, high-performance technical animations (e.g., waveform scrubbing, dashboard data tickers).
- **[Lenis](https://lenis.darkroom.engineering/)**: For smooth, momentum-based scrolling that mimics the fluidity of a high-end broadcast reel.

### Principles
- **Mechanical Precision**: No "bouncy" springs. Use linear or sharp exponential easing.
- **Momentum**: Scrolling should feel like a physical dial being turned (Lenis Integration).
- **State Feedback**: Transitions must reinforce the "Instrument" feel—cells should pulse or "lock-in" when interacted with.

## 8. Components
- **Shell:** DashboardLayout uses `h-dvh` and CSS-var heights. DashboardHeader (mobile 48px, desktop 64px), DashboardSidebar, MobileNav (56px), AudioPlayerBar (60px) use `--header-h`, `--header-h-desktop`, `--mobile-nav-h`, `--audio-bar-h`. Bottom placement uses `--bottom-safe` / `--bottom-nav-only`; pages use `.pb-safe` or `.pb-nav`.
- **The Broadcast Loop:** Real-time, radio-like stream with pulsing audio indicators.
- **Technical Cards:** Grid-mapped containers with 1px borders (`narvo-border` / `narvo-border-subtle`), no shadows, strict alignment; hover can use `surface-raised`.
- **[Command] Buttons:** `.btn-command`, `.btn-command-outline` — terminal-style; `.btn-ghost` for icon-only low-emphasis.
- **The Signal Meter:** Visualizers for audio levels and data sync status.
- **Regional Zoom Toggle:** Switch for City / National / Continental news feeds.

## 9. Visual Style: The Swiss Grid
- **Visible Architecture:** Every layout element sits within a visible `1px` border using `--color-border`.
- **Flat Aesthetic:** No shadows, no gradients, no rounded corners. The design is purely 2D, relying on typography and spatial hierarchy for depth.
- **Haptic Precision:** UI interactions are paired with subtle, sharp haptic taps to reinforce the "instrument" feel.
- **Dynamic Grid Breathing:** Grid lines subtly pulse in opacity during audio playback to confirm the system is "live."

## 10. Accessibility (WCAG 2.1 Level AA)

Narvo meets **WCAG 2.1 Level AA** for contrast, spacing, and focus. Use the tokens and rules below in addition to semantic HTML, keyboard operability, and reduced-motion support.

### 10.1 Color & Contrast

**Requirement:** Normal text ≥ **4.5:1**; large text (≥18px or 14px bold) and UI components ≥ **3:1**. Do not convey information by color alone.

| Context | Foreground | Background | Ratio (approx.) | Pass AA? | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Dark – Body text** | `#F2F2F2` | `#1B211A` | ~14:1 | ✓ | Use for primary copy. |
| **Dark – Secondary text** | `#8BAE66` | `#1B211A` | ~5.2:1 | ✓ | OK for labels, metadata. |
| **Dark – Dim / placeholder** | `#808080` | `#1B211A` | ~3.2:1 | ✗ | **Fails** normal text. Use only for non-essential placeholder or large text. |
| **Dark – Primary (signal)** | `#EBD5AB` | `#1B211A` | ~12:1 | ✓ | Buttons, active states. |
| **Light – Body text** | `#1B211A` | `#FFFFFF` | ~14:1 | ✓ | Primary copy. |
| **Light – Secondary text** | `#628141` | `#FFFFFF` | ~4.6:1 | ✓ | Labels, metadata. |
| **Light – Dim / placeholder** | `#808080` | `#FFFFFF` | ~4.5:1 | ✓ (borderline) | Prefer darker grey for body (see adjusted token below). |
| **Light – Primary (signal)** | `#628141` | `#FFFFFF` | ~4.6:1 | ✓ | Buttons, links. |
| **Surface cards (dark)** | `#F2F2F2` | `#242B23` | ~12:1 | ✓ | Text on cards. |
| **Surface cards (light)** | `#1B211A` | `#EFF3ED` | ~13:1 | ✓ | Text on cards. |

**Adjusted tokens for accessibility (use where contrast fails):**

- **Text dim (dark mode):** Use `#A3A3A3` on `#1B211A` for placeholder/secondary dim text (meets 4.5:1). Keep `#808080` only for large text or decorative elements.
- **Text dim (light mode):** Use `#525252` on `#FFFFFF` for body-equivalent dim text (≥4.5:1); `#808080` is acceptable for large labels only.

Use the token **`--color-text-dim-accessible`** (defined in §4 Design Tokens). It resolves to the correct value per theme: dark in `:root`, light in `[data-theme='light']`. No separate `-dark` / `-light` variables exist.

**Semantic category colors (e.g. Finance, Urgent, Tech):** When used as **text** on `#1B211A` or `#FFFFFF`, verify each pair in [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/). Use for tags/labels with sufficient contrast or pair with a contrasting background; do not use low-contrast category color as the only differentiator.

### 10.2 Spacing & Touch Targets

**Requirement:** Interactive targets ≥ **44×44 px** (WCAG 2.2); support **text spacing** override (line height, paragraph/letter/word spacing) without loss of content or functionality.

| Token | Value | Use |
| :--- | :--- | :--- |
| **Touch target (minimum)** | **48px** (`--touch-target-min`) | Min for buttons, links, toggles (exceeds 44px). |
| **Touch target (icon)** | **44px** (`--touch-target-icon`) | Used for icon-only controls where 48px is not required. |
| **Clickable padding** | **12px** (1.5 units) | Min padding inside a touch target so hit area stays ≥ 48px when combined with font size. |

**Spacing scale (unchanged):** 4, 8, 16, 24, 32, 48, 64 px. Use **48px** or **64px** for interactive control dimensions (e.g. play button, region toggle).

**Text spacing (WCAG 1.4.12):** Ensure content does not break when user applies:
- Line height ≥ **1.5×** font size (body: use `line-height: 1.5` or `--line-height-body: 1.5`).
- Paragraph spacing ≥ **2×** font size (e.g. `margin-bottom: 2em` for paragraphs).
- Letter spacing ≥ **0.12×** font size (avoid negative letter-spacing on body).
- Word spacing ≥ **0.16×** font size.

**Tokens** (defined in §4): `--touch-target-min` (48px), `--touch-target-icon` (44px), `--line-height-body` (1.6), `--line-height-heading` (1.2).

### 10.3 Focus (Keyboard & Screen Reader)

**Requirement:** All interactive elements must be **keyboard focusable** with a **visible focus indicator** (≥ **3:1** against adjacent colors; minimum **2px** outline/offset).

The design system uses **0px radius** and **1px borders**; focus should remain sharp and technical.

**Default focus ring (recommended):**

| Property | Value | Rationale |
| :--- | :--- | :--- |
| **Outline** | `2px solid` | Meets 2px minimum; visible at zoom. |
| **Outline color (dark)** | `#EBD5AB` (primary) on `#1B211A` | High contrast, on-brand. |
| **Outline color (light)** | `#628141` (primary) on `#FFFFFF` | Meets 3:1. |
| **Outline offset** | `2px` | Prevents overlap with 1px border; clear separation. |

**Do not:** Use `outline: none` or `outline: 0` without replacing with a visible focus style. Use `:focus-visible` so mouse users don’t get a ring unless appropriate (e.g. buttons can show focus on click for confirmation).

**Tokens** (defined in §4): `--focus-outline-width`, `--focus-outline-style`, `--focus-outline-color`, `--focus-outline-offset`. **`--focus-outline-color`** is theme-scoped (Nature, Sun, Moon, Dusk); use `rgb(var(--focus-outline-color))` in styles.

**Example:** (implementation uses RGB triplet for `--focus-outline-color`)

```css
:focus { outline: none; }
:focus-visible {
  outline: var(--focus-outline-width) var(--focus-outline-style) rgb(var(--focus-outline-color));
  outline-offset: var(--focus-outline-offset);
}
```

**Skip link:** Provide a “Skip to main content” link that becomes visible on focus (e.g. positioned off-screen, transitions into view on `:focus`). Style with same focus ring and primary/surface colors.

### 10.4 Motion (prefers-reduced-motion)

Respect user preference for reduced motion (WCAG 2.3.3):

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Keep “Grid Breathing” and other non-essential motion disabled or minimal when `prefers-reduced-motion: reduce` is set.

---

## 11. Brand Philosophy & Narrative
**"The Local Pulse, Refined."**
Narvo is the bridge between the raw energy of African news and the precision of global engineering. We modernize the narrative by providing a tool that treats local stories with the technical respect they deserve. We don't just "show" news; we **broadcast** it with authority, clarity, and structural beauty.
