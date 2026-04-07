# Narvo Design Master
### Single source of truth — visual system, components, copy, interaction, and implementation roadmap

> **Version:** 1.0  
> **Consolidates:** Design_Foundation_v5 · Component_Design_System_v1 · Copy_System · Emotional_Interaction_Guidelines_v1 · UI_UX_Revamp_Workflow_v1 · MVP_Page_Surface_Map_v1 · UI_Inventory_Migration_Map_v1 · UI_Route_Acceptance_Checklist_v1  
> **Date:** April 2026  
> **Status:** Canonical — all superseded design documents are for archive reference only

---

## Table of Contents

1. [Brand & Product Position](#1-brand--product-position)
2. [Visual Principles](#2-visual-principles)
3. [Colour System](#3-colour-system)
4. [Typography](#4-typography)
5. [Spacing, Radius, Shadow & Motion](#5-spacing-radius-shadow--motion)
6. [CSS Token Architecture](#6-css-token-architecture)
7. [Component Architecture](#7-component-architecture)
8. [Primitives](#8-primitives)
9. [Navigation Components](#9-navigation-components)
10. [Content & Editorial Components](#10-content--editorial-components)
11. [Trust & Intelligence Components](#11-trust--intelligence-components)
12. [Audio Components](#12-audio-components)
13. [Discovery, Forms, Feedback & System Components](#13-discovery-forms-feedback--system-components)
14. [Layout Shells](#14-layout-shells)
15. [Responsive Rules](#15-responsive-rules)
16. [Voice & Copy System](#16-voice--copy-system)
17. [Emotional Interaction Design](#17-emotional-interaction-design)
18. [Implementation Roadmap & Status](#18-implementation-roadmap--status)

---

## 1. Brand & Product Position

Narvo is an audio-first news platform for Africa. It is not a bank, a generic AI wrapper, or a traditional newspaper site.

The brand must feel like a **daily utility** people can check at 5 AM without visual fatigue, a **trusted synthesis engine** that feels informed not loud, and a **modern listener product** with enough energy to feel current on web and mobile.

**Core taglines:**
- *Africa's news, spoken clearly.*
- *The day's biggest stories, turned into a briefing.*
- *Less scrolling. More understanding.*

**The two-colour thesis:** Narvo uses a hybrid system — `Petrol Teal` as the structural engine (trust, synthesis) and `Signal Vermilion` as the attention signal (playback, urgency, live moments).

---

## 2. Visual Principles

| Principle | Rule |
|-----------|------|
| Calm base, hot moments | Stable interface most of the time. Energy appears only when the product needs attention — play, live states, breaking items. |
| Editorial, not institutional | Enough serif authority to feel editorial, not enough to look legacy. |
| Large UI, calm reading | Dashboard/listen/discover/player get bigger targets and stronger rhythm. Article detail and settings stay quiet. |
| Deep rail, airy canvas | Desktop: dark anchored rail (Deep Ink) + light main canvas (Cloud White). Not an all-light SaaS shell. |
| Distinct, not fintech-copied | Teal-led, not trust-blue, not earth-tone-led. |
| Product first | If a style only works once on a hero banner, it is not a Narvo foundation. |

**Surface hierarchy rule:** Reading surfaces should be quieter than browsing surfaces. Audio surfaces can carry slightly more energy than article surfaces. Breaking/live can spike in colour, but the entire app should not.

---

## 3. Colour System

### Core Brand

| Name | Hex | Role |
|------|-----|------|
| Petrol Teal | `#0F5F73` | Primary anchor — navigation shells, hero panels, structural surfaces, selected states |
| Deep Ink | `#17324A` | Contrast layer — headline text on light, icon strokes, rail background, dense UI |
| Cloud White | `#F6F8FB` | Page background |
| Cool Mist | `#EEF3F7` | Cards, shells, raised sections |
| Slate Mist | `#6C7F93` | Secondary text, support copy, inactive UI |

### Functional Accents

| Name | Hex | Role |
|------|-----|------|
| Signal Vermilion | `#F04B24` | ALL primary CTAs, play buttons, active/live/breaking states |
| Seafoam Mint | `#7FDDCA` | Positive support, verified confidence |
| Soft Butter | `#F2D66B` | Highlights, onboarding warmth, guided emphasis |

### Auxiliary (charts, empty states, illustration only)

| Name | Hex | Role |
|------|-----|------|
| Mist Lilac | `#ACB6FF` | Secondary data accent, insights |
| Soft Coral | `#FF9F8D` | Soft warning fill, promo support |

### Usage Ratio

- **60%** light surfaces: Cloud White, Cool Mist, white
- **30%** teal structure: Petrol Teal, Deep Ink
- **10%** hot/support accents: Signal Vermilion, Seafoam Mint, Soft Butter, Mist Lilac

### Surface Pairings

| Background | Headline | Body | CTA |
|-----------|----------|------|-----|
| Cloud White | Deep Ink | Slate Mist | Signal Vermilion |
| Cool Mist | Deep Ink | Slate Mist | Petrol Teal or Signal Vermilion |
| Petrol Teal | White | `rgba(255,255,255,0.82)` | Soft Butter or Signal Vermilion |
| Deep Ink | White | `rgba(255,255,255,0.72)` | Signal Vermilion |

### Tints

| Token | Value | Use |
|------|-------|-----|
| `--color-primary-tint` | `rgba(15, 95, 115, 0.10)` | Category tags, hover fills |
| `--color-alert-tint` | `rgba(240, 75, 36, 0.10)` | Breaking chips, urgent states |
| `--color-success-tint` | `rgba(127, 221, 202, 0.14)` | Positive indicators |
| `--color-highlight-tint` | `rgba(242, 214, 107, 0.16)` | Editorial highlights |

### Colour Hard Rules

- Never use Signal Vermilion as the default page background.
- Never let auxiliary colours compete with Petrol Teal on the same hierarchy level.
- Never use saturated blue as a competing primary brand colour.
- Never use all support colours in a single compact card.
- Data visualisations start with Petrol Teal/Deep Ink; Signal Vermilion only for spikes/urgency.

---

## 4. Typography

### Typefaces

| Layer | Font | Token | Use |
|-------|------|-------|-----|
| Headlines / Display | **Newsreader** | `font-serif` / `--font-display` | H1–H4, editorial hero, Morning Briefing |
| Body / UI | **Instrument Sans** | `font-sans` / `--font-body` | Body copy, nav, buttons, labels, descriptions |
| Metadata / Stamps | **Geist Mono** | `font-mono` / `--font-mono` | Timestamps, truth tags, source stamps, durations |

**Loading:**
```css
@import url('https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600;6..72,700&family=Instrument+Sans:wght@400;500;600;700&display=swap');
```
Geist Mono via `next/font/google` or package `@vercel/fonts`.

### Type Scale

| Token | Desktop | Mobile | Weight | Typeface | Use |
|-------|---------|--------|--------|----------|-----|
| `--text-display` | 64px | 44px | 700 | Newsreader | Landing hero |
| `--text-h1` | 52px | 36px | 700 | Newsreader | Page titles |
| `--text-h2` | 40px | 30px | 700 | Newsreader | Section titles |
| `--text-h3` | 32px | 24px | 600 | Newsreader | Feature cards |
| `--text-h4` | 26px | 20px | 600 | Newsreader | Card titles, player |
| `--text-lead` | 20px | 18px | 500 | Instrument Sans | Intro copy, decks |
| `--text-body` | 16px | 16px | 400 | Instrument Sans | Body copy |
| `--text-body-sm` | 14px | — | 400 | Instrument Sans | Compact lists |
| `--text-label` | 12px | 12px | 600 | Instrument Sans | Chips, tabs, nav |
| `--text-stamp` | 11px | 11px | 500 | Geist Mono | Timestamps, truth, source stamps |
| `--text-caption` | 10px | — | 500 | Geist Mono | Dense metadata |

### Line Height

| Layer | Value |
|-------|-------|
| Display / H1 | `0.94`–`1.00` |
| H2 / H3 | `1.00`–`1.08` |
| H4 / Lead | `1.10`–`1.25` |
| Body | `1.60`–`1.72` |
| Metadata | `1.30`–`1.50` |

### Letter Spacing

| Layer | Tracking |
|-------|----------|
| Newsreader display / H1 | `-0.04em` to `-0.05em` |
| H2 / H3 | `-0.03em` to `-0.04em` |
| Body | `0` |
| Labels | `0.04em` to `0.08em` |
| Mono stamps | `0.08em` to `0.12em` |

### Typography Hard Rules

- Never use Newsreader for long-form body copy.
- Never use Instrument Sans as the hero display font when a real headline is needed.
- Never use Geist Mono for paragraph copy.
- Never allow multiple serif voices in the same screen.
- h1, h2, h3, h4 receive `font-serif` globally.

---

## 5. Spacing, Radius, Shadow & Motion

### Spacing (8px grid)

`4px · 8px · 12px · 16px · 20px · 24px · 32px · 40px · 48px · 64px`

### Shell & Layout Tokens

| Token | Value | Use |
|-------|-------|-----|
| `--shell-radius` | 32px | Hero panels, dock containers, desktop shells |
| `--card-radius` | 24px | Large modular cards |
| `--dock-height` | 84px | Floating mobile dock |
| `--rail-width` | 232px (expanded) / 88px (compact) | Desktop rail |
| `--section-gap` | 24px mobile / 32px desktop | Major grouping rhythm |
| `--hero-max-width` | 1120px | Landing hero composition |
| `--button-lg` | 56px | Primary CTA height |
| `--button-md` | 48px | Secondary CTA height |
| `--pill-sm` | 30px | Compact labels |
| `--pill-md` | 40px | Filter rail pills |
| `--nav-item-lg` | 56px | Large nav touch targets |

### Radius Scale

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | 10px | Compact pills, small inputs |
| `--radius-md` | 14px | Standard controls |
| `--radius-lg` | 18px | Compact cards and rows |
| `--radius-xl` | 24px | Large cards, player shells |
| `--radius-2xl` | 32px | Dock, hero panels, desktop shells |
| `--radius-full` | 999px | Pills, circular controls |

### Shadows (Deep Ink tint — never cold grey)

```css
--shadow-1: 0 1px 2px rgba(23, 50, 74, 0.05);
--shadow-2: 0 6px 24px rgba(23, 50, 74, 0.08);
--shadow-3: 0 16px 48px rgba(23, 50, 74, 0.10);
--shadow-4: 0 24px 80px rgba(23, 50, 74, 0.12);
```

**Glow** (allowed on active hero CTAs, featured player shells, onboarding spotlights only):
```css
box-shadow: 0 0 0 1px rgba(15,95,115,0.14), 0 0 24px rgba(15,95,115,0.20);
```

**Glass** (allowed on hero overlays, onboarding panes, settings drawers, desktop side panels only):
```css
background: rgba(255,255,255,0.15);
backdrop-filter: blur(30px);
```

### Motion Timing

| Interaction | Duration |
|------------|----------|
| Press / release | 80–140ms |
| Hover / hover-out | 150–200ms |
| Card reveal | 220–320ms |
| Sheet / modal | 260–360ms |
| Toast entrance | 200–260ms |
| Progress fill | 300–800ms context-dependent |
| Motion tokens | `--motion-dock-spring: cubic-bezier(0.2, 0.9, 0.2, 1)` |

**Motion rules:** Standard transitions feel deliberate, not playful. Audio/live states can move faster. Reading surfaces get the least motion. `prefers-reduced-motion` must fully disable decorative movement while preserving state clarity.

---

## 6. CSS Token Architecture

Complete `:root` block for implementation:

```css
:root {
  /* Colour */
  --color-bg:              #F6F8FB;
  --color-surface:         #FFFFFF;
  --color-surface-alt:     #EEF3F7;
  --color-primary:         #0F5F73;
  --color-primary-deep:    #17324A;
  --color-primary-tint:    rgba(15, 95, 115, 0.10);
  --color-alert:           #F04B24;
  --color-alert-tint:      rgba(240, 75, 36, 0.10);
  --color-success:         #7FDDCA;
  --color-success-tint:    rgba(127, 221, 202, 0.14);
  --color-highlight:       #F2D66B;
  --color-highlight-tint:  rgba(242, 214, 107, 0.16);
  --color-insight:         #ACB6FF;
  --color-coral:           #FF9F8D;
  --color-text-primary:    #17324A;
  --color-text-mid:        #6C7F93;
  --color-text-dim:        #93A4B6;
  --color-border:          rgba(23, 50, 74, 0.10);
  --surface-rail:          #17324A;

  /* Backward-compat aliases (do not use in new code) */
  --color-cta:             var(--color-alert);
  --color-urgent:          var(--color-alert);
  --color-verified:        var(--color-primary);

  /* Typography */
  --font-display: 'Newsreader', Georgia, serif;
  --font-body:    'Instrument Sans', system-ui, sans-serif;
  --font-mono:    'Geist Mono', 'SF Mono', monospace;

  /* Layout shells */
  --shell-radius:     32px;
  --card-radius:      24px;
  --dock-height:      84px;
  --rail-width:       232px;
  --section-gap:      32px;
  --hero-max-width:   1120px;
  --button-lg:        56px;
  --button-md:        48px;
  --pill-sm:          30px;
  --pill-md:          40px;
  --nav-item-lg:      56px;
  --card-padding-lg:  24px;

  /* Shadows */
  --shadow-1: 0 1px 2px rgba(23, 50, 74, 0.05);
  --shadow-2: 0 6px 24px rgba(23, 50, 74, 0.08);
  --shadow-3: 0 16px 48px rgba(23, 50, 74, 0.10);
  --shadow-4: 0 24px 80px rgba(23, 50, 74, 0.12);

  /* Motion */
  --motion-dock-spring:  cubic-bezier(0.2, 0.9, 0.2, 1);
  --motion-pill-hover:   180ms ease;
  --motion-card-lift:    220ms ease;
  --motion-player-pulse: 240ms ease;
}
```

**Tailwind v4 (Next.js app globals.css):**
```css
@theme {
  --color-narvo-teal:      #0f5f73;
  --color-narvo-vermilion: #f04b24;
  --color-narvo-ink:       #17324a;
  --color-narvo-mist:      #eef3f7;
  --color-narvo-cloud:     #f6f8fb;
  --color-narvo-butter:    #f2d66b;
  --color-narvo-mint:      #7fddca;
}
:root  { --bg-primary: #f9f6ef; --bg-card: #ffffff; }
.dark  { --bg-primary: #0a1520; --bg-card: #17324a; }
```

**Semantic rule:** `--color-primary` = brand anchor. `--color-alert` = active/urgent/breaking. `--surface-rail` = dark anchored nav only. Never hard-code hex values when a token exists.

---

## 7. Component Architecture

Five layers, in order:

1. **Tokens** — colour, type, spacing, radius, elevation, motion
2. **Primitives** — buttons, chips, pills, dividers, progress bars, waveform bars
3. **Composed Components** — cards, rows, toggles, nav items, form controls, tabs
4. **Feature Components** — story cards, truth modules, player bar, briefing hero, source timeline
5. **Layout Shells** — dashboard, article, settings, discover, mobile nav

**Rule:** Primitives never encode product semantics. Feature components never duplicate primitive rules.

### Core Component Contracts

| Contract | File (Next.js) | Role |
|---------|----------------|------|
| `NavDock` / `MobileNavDock` | `components/app/MobileNavDock.tsx` | Floating mobile bottom-nav, large touch targets |
| `DesktopRail` | `components/app/DesktopRail.tsx` | Dark anchored desktop nav shell |
| `AuthenticatedAppShell` | `components/app/AuthenticatedAppShell.tsx` | Rail + dock + header wrapper |
| `FilterPill` / `FilterPillGroup` | `components/FilterPillGroup.tsx` | Segmented browsing/filter controls |
| `StatusPill` | `components/StatusPill.tsx` | live, breaking, saved, downloaded, syncing, queued |
| `TruthTag` / `TruthPill` | `components/TruthTag.tsx` | verified, mixed, disputed, checking |
| `StoryCardLarge` | `components/StoryCardLarge.tsx` | High-importance editorial card |
| `StoryNewsListCard` | `components/StoryNewsListCard.tsx` | Dense feed list card |
| `PlayerCluster` + `AudioPlayer` | `components/AudioPlayer.tsx` | Central transport family |
| `BriefingHero` | `app/briefing/page.tsx` | Morning Briefing entry |

**Scale scope:** Apply large-UI scale to dashboard, listen, discover, player, and landing. Do not apply it to article detail, settings, or verification blocks.

---

## 8. Primitives

### Buttons

| Component | Height | Shape | Colour |
|----------|--------|-------|--------|
| `ButtonPrimary` | 56px (landing) / 52px (app) | Full pill | Signal Vermilion |
| `ButtonSecondary` | 48–52px | Rounded rectangle | White/Cool Mist + Deep Ink text |
| `ButtonGhost` | 44–48px | Transparent | Text-led |
| `ButtonIcon` | 44–60px | Circular | White, Cool Mist, or Vermilion by priority |

**Primary rule:** Signal Vermilion fill, white text, deeper vermilion on hover, teal focus ring. Never use Petrol Teal as the default primary button fill.

### Chips & Pills

| Component | Font | Style |
|----------|------|-------|
| `CategoryPill` | Instrument Sans 12/600 | Soft teal tint bg |
| `StatusPill` | Geist Mono 10/700 | State colour — see below |
| `TruthPill` | Geist Mono 10/700 | Semantic — see §11 |
| `FilterPill` | Instrument Sans 12/600 | Interactive, `pill-md` scale on browse surfaces |

**StatusPill state colours:**
- `live` / `breaking` → `--color-alert-tint` bg + `--color-alert` text
- `saved` / `downloaded` → `--color-primary-tint` bg + `--color-primary` text
- `syncing` / `queued` → `--color-highlight-tint` bg + text-primary

### Progress & Waveform

- `ProgressBar` — playback, reading position, download. Vermilion highlight for playback; teal for non-urgent structural progress.
- `WaveformStrip` — active audio / live. Simple, not audio-editor complicated.
- `MiniBars` — inline now-playing indicators inside queue or cards.

### Dividers & Surface Tiers

Default divider: `rgba(23, 50, 74, 0.10)`. Heavy divider: `rgba(23, 50, 74, 0.18)` for macro zone separation only.

| Surface token | Use |
|--------------|-----|
| `Surface/Base` | Page body |
| `Surface/Card` | Regular cards |
| `Surface/Raised` | Player, sheets, sticky modules |
| `Surface/Floating` | Nav dock, floating player, hero action clusters |
| `Surface/Rail` | Dark anchored desktop navigation |

---

## 9. Navigation Components

### NavDock / MobileNavDock

Mobile-only, floating pill. Breathing room from screen edge. Oversized tap targets.

**Primary destinations (from `nav-items.ts`):** Home `/dashboard` · Listen `/listen` · Discover `/discover` · Library `/library`. Morning Briefing `/briefing` is reached from Home, Listen, and Library; Search `/search` from the universal header (not duplicated in the dock).

Active item: Petrol Teal emphasis. Live/active audio: small vermilion or waveform cue. This is a premium control dock, not a flat utility bar.

### DesktopRail

Desktop-only, dark anchored. `lg:ml-[4.5rem]` (icon-only) / `xl:ml-[15.5rem]` (expanded).

Deep Ink background. Visually stable. Supports nav clusters, source rail, and topic filters. Should feel like a stable rail, not a second app.

### Tab Rails & Segment Controls

Used in Discover, Insights, Settings, Search. Compact pill group. Active state decisive. Avoid over-thick indicators.

---

## 10. Content & Editorial Components

### StoryCardLarge

Use for: top dashboard story, major recommended story, landing feature.

Anatomy: category/status row → strong Newsreader headline → short summary → source + timestamp → primary play button → optional save/queue.

Visual rule: spacious, calm, premium. Not the brightest component on screen.

### StoryNewsListCard / StoryCardCompact

Use for: dashboard feed grid, related stories, library entries.

Anatomy: category chip → headline → summary/deck → source/time/truth row → play action.

Works with or without image. Scans well in dense layouts.

### StoryCardBreaking

Differences from standard: stronger vermilion cue, tighter metadata, priority chip always visible. No full-surface red fill.

### BriefingHero

Use for: Morning Briefing main entry point.

Anatomy: date stamp → headline → story-count preview → duration → main play CTA → optional waveform.

May use full teal surface. Can hold more brand expression than regular news cards.

### EditorialQuoteCard / InsightCard

Use for: explainers, narrative interludes, "what this means" modules.

Cleaner than regular cards, higher text ratio. Can use Soft Butter or Mist Lilac as subtle support fills.

---

## 11. Trust & Intelligence Components

This family is uniquely Narvo and must become visually ownable.

### TruthPill / TruthTag

States and semantic colours:

| State | Colour |
|-------|--------|
| Verified | Teal/mint-leaning (`--color-success-tint` bg + `--color-primary` text) |
| Mixed | Butter/muted warning (`--color-highlight-tint` bg) |
| Disputed | Vermilion/red warning (`--color-alert-tint` bg + `--color-alert` text) |
| Checking | Teal-neutral loading state |

Rules: always Geist Mono, always compact, always semantic colour, never over-designed. Pill framing on browse surfaces, stricter compact on dense article contexts.

### CertaintyMeter

Use for: news detail, confidence modules.

Anatomy: horizontal bar → percentage → supporting Geist Mono label. Avoid dashboard-gauge theatrics.

### SourceTimeline

Use for: news detail proof chain.

Anatomy: mono heading → vertical rule → source node → timestamp → role label → outbound link.

Feel: forensic, not decorative. Spacing matters more than ornament.

---

## 12. Audio Components

### PlayerCluster / AudioPlayer (Persistent)

The central transport family. Anatomy: play/pause → supporting transport → progress or waveform → active emphasis.

Controls feel larger and more central than a standard media app. Can carry more vermilion emphasis than the rest of the layout. Active state may subtly pulse or glow — never aggressively.

Persistent bar anatomy: track title → source/mode label → progress line → play/pause → queue → expand.

### PlayerFull

Use for: Listen hub, briefing deep playback, expanded player sheet.

Anatomy: cover/story context → waveform/progress → elapsed/remaining → primary cluster → speed/queue/mute/repeat.

This is where vermilion can be most visible. The player can feel more emotional than the feed.

### QueueItem

Anatomy: order index → title → source → drag affordance → active mini-bars → remove.

Active row obviously active. Inactive rows stay quiet.

### VoiceCard

Use for: voice selection, TTS preview.

Anatomy: avatar or illustration → voice name → language/tone → preview action → select state.

---

## 13. Discovery, Forms, Feedback & System Components

### Discovery

- `RadioStationCard` — station name, stream info, live state, play
- `PodcastCard` — cover art, title, show/episode, duration, play/download/queue
- `CollectionTile` — category/interest/topic groupings
- `StatTile` — Insights metrics: short number, Geist Mono label, optional trend

### Forms & Settings

- `SearchBar` — pill or softly rounded, subtle left icon, no harsh borders
- `InputField` — 52px height, visible focus ring, label above
- `ToggleRow` — icon block + title + description + trailing switch. Highest-reuse utility row.
- `PreferenceCard` — theme, voice, source, interest selection. Selection state readable at distance.
- `Modal / Sheet / Drawer` — desktop: floating modal or side sheet. Mobile: bottom sheet. Light glass allowed.

### Feedback & System

- `EmptyState` — concise message, one clear action, light illustration only
- `ErrorState` — clear language, retry, avoid catastrophic tone
- `SkeletonState` — layout-shaped, reading skeletons hint at editorial layout
- `Toast/Banner` — brief, anchored, lighter than the triggering action
- `BreakingBanner` — strong but compact, should not turn the entire layout into a danger state

---

## 14. Layout Shells

### Dashboard Shell

Structure: top header → optional topic rail → primary feed → desktop rail → persistent player → floating nav dock (mobile).

Large-card rhythm. Airy canvas, anchored rail.

### Article Shell

Structure: back/context row → title block → proof modules → body → source timeline → related content.

Quietest shell in the app. Large-UI scale steps back here.

### Listen Shell

Structure: greeting → briefing hero → continue listening → queue/history.

More active than article. Calmer than discover. Makes room for the larger player cluster and premium briefing card.

### Discover Shell

Structure: top search/filter → radio → podcasts → topic/category modules.

Most modular and card-rich shell. Best place for large pills, large cards, and segmented browse controls.

### Settings Shell

Structure: settings top bar → tab rail or segmented nav → grouped cards and rows.

Controlled, not clinical. Does not inherit the full large-UI scale from browse surfaces.

---

## 15. Responsive Rules

**Mobile:** Stacked cards, thumb-reachable controls, bottom nav and player co-exist cleanly, compact metadata, bottom clearance `pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))]`.

**Tablet:** Paired cards, 2-column discovery, richer player controls.

**Desktop:** Split layouts, meaningful sidebar, queue and proof modules side-by-side with content, rail `lg:4.5rem` icon / `xl:15.5rem` full.

**Rule:** Do not invent separate visual languages per breakpoint. The same system scales.

---

## 16. Voice & Copy System

### Brand Voice

Narvo should sound like a **sharp global sabi-person** — informed, warm, calm, conversational, unmistakably Nigerian.

Narvo is: intelligent, clear, emotionally aware, editorial, mobile-native, locally grounded.  
Narvo is not: robotic, overhyped, slang-heavy everywhere, clinical, sensational.

Human roles: the trusted friend who already sorted the noise, the calm radio host who knows what matters.

### Three Tone Modes

| Mode | Where | Character | Examples |
|------|-------|-----------|---------|
| **Warm / Narrative** | Landing, onboarding, briefing, playback, loading, toasts, notifications | Human, companion-like, slightly expressive | "Wake up, Narvo has the gist." "Keep this for later." |
| **Clear / Assured** | Navigation, labels, dashboard cards, settings, browse | Short, stable, low-drama | "Trending Now" "Your Narvo Voice" "Available Offline" |
| **Precise / Responsible** | Truth Tag, fact-check, source attribution, corrections | Exact, transparent, non-performative | "What Narvo could verify" "Confidence: 75% based on current sources" |

### Copy Principles

1. **Explain first, stylize second.** The user understands in under five seconds.
2. **Sound human, not mechanical.** "Getting your stories ready..." not "Initializing content pipeline..."
3. **Never overclaim.** Prefer "Confidence: 75% based on current sources" over "100% confirmed."
4. **Warm but controlled.** Nigerian flavour only when it feels natural. Never in Truth Tag or corrections contexts.
5. **Story Arc rule for briefing/notifications:** Hook (why care?) → Meat (what happened?) → Takeaway (what does it mean?).

### Writing Patterns

**Buttons:** Short, direct, verbal. "Hear the full gist" / "Listen now" / "Save for later". Not "Proceed" / "Execute."

**Toasts:** "Keep this for later." / "Saved. Come back to it anytime." Not "Saved successfully." / "Operation completed."

**Loading:** "Getting your stories ready..." / "Preparing your briefing..." Not "Loading" / "Processing request."

**Verification copy:** "We checked this against 5 sources." / "Confidence: 75%." Not "Verified by AI." / "This is solid."

**Errors:** "The signal is fuzzy right now." / "We're reconnecting the dots." / "Hold tight. Try again shortly."

### Approved Vocabulary

Core: gist, briefing, story, listen, source, verified, cross-checked, confidence, pulse, voice, clarity, what matters, full story, takeaways.  
Warm: Oya, hold tight, here's the gist, come back to it, pick your voice.  
Careful (onboarding/marketing only): Oga, vibe, receipts, sabi, sharp-sharp.

### Banned Phrases

- Overclaiming: "The real truth" / "100% factual" / "Fully verified by AI"
- Generic AI: "AI-powered insights" / "cutting-edge intelligence" / "seamless experience"
- Mechanical: "initializing pipeline" / "synthesizing narrative asset" / "processing request"
- Corporate: "optimize your workflow" / "unlock the power of" / "frictionless content discovery"

### Copy Checklist

Before approving any new line: self-explanatory in 5 seconds? Sounds human? Correct tone mode? No overclaiming? Shorter than before? Guides next action?

---

## 17. Emotional Interaction Design

### Core Thesis

> Calm editorial structure + emotionally rewarding interaction

Layout stays composed, typography stays intelligent, the interaction layer supplies delight, rhythm, and memory.

### Emotional Ladder (apply to every major surface)

1. **Orientation** — user understands where they are
2. **Confidence** — interface signals reliability
3. **Reward** — action produces satisfying response
4. **Momentum** — next action is easy and tempting
5. **Attachment** — repetition creates habit

Applied: dashboard gives orientation, truth systems give confidence, play/save/download give reward, queue gives momentum, briefing ritual gives attachment.

### Signature Interaction Moments (invest in these first)

**Morning Briefing entry** — single most important moment. Briefing card reveals with gentle authority. Play CTA feels slightly more alive than ordinary story actions. Readiness is obvious. Autoplay transition feels ceremonial.

**Play action** — primary button reacts in under 100ms. State changes obvious and elegant. Waveform starts quickly. Active audio state subtly animates.

**Save/Bookmark** — clean success confirmation. Icon state change alone is not enough. Lightweight toast or inline confirmation.

**Download/Offline** — queue start confirms immediately. Progress visible. Completion feels resolved, not silent.

**Truth/Verification** — calm and legible. Loading should not feel uncertain for too long. State transitions (checking → verified/mixed/disputed) feel crisp and informative.

### Feedback Loop Rules

| Level | Window | Examples |
|-------|--------|---------|
| Instant | 0–120ms | Button press, icon state change, toggle movement |
| Confirming | 120–800ms | Save confirmation, queue add, download start, verified reveal |
| Resolving | 800ms+ | Download complete, sync finished, audio ready |

Every meaningful action needs at least instant and confirming feedback. Every longer task also needs resolving feedback.

### What Narvo Must Never Do

- Turn emotional design into cartoon behaviour.
- Reward trivial actions more than meaningful ones.
- Use delight where reassurance is needed.
- Make trust cues feel like marketing.
- Let breaking/live logic leak into every surface.
- Confuse "premium" with "slower."

---

## 18. Implementation Roadmap & Status

### Revamp Phase Overview

| Phase | Scope | Status |
|-------|-------|--------|
| 0 — Stabilization | TS errors, test harness, shell-level token misuse, legacy duplicates identified | Partial |
| 1 — Source of Truth | This doc + migration map + acceptance checklist maintained | ✅ Done |
| 2 — Shared Presentation Layer | Root tokens, Tailwind semantics, shell variables, shared primitives | ✅ Done |
| 3 — Landing + App Shell | Landing page, desktop rail, mobile dock, top header, shell spacing | ✅ Done |
| 4 — Core Product Surfaces | Dashboard → Briefing + Player → News Detail → Listen → Discover/Library/Search → Settings/Onboarding/Auth → System states | ✅ Done |
| 5 — Consolidation | Remove deprecated components, v4 naming, ensure one component per job | 🔄 In progress |

### Milestone Tracker

**Milestone A — Stabilize** ✅
- ✅ v5.1 tokens in frontend CSS
- ✅ Shell reset: DesktopRail, NavDock, DashboardHeader
- ✅ Landing page replaced with v5.1 hero-first direction
- ✅ Revamp docs added to repo
- ✅ TypeScript errors cleared (zero errors as of April 2026)
- ✅ Token drift cleared — zero `rgb(var(--token))` patterns remain

**Milestone B — Dashboard and Player** ✅
- ✅ Dashboard large-card shell (StoryCardLarge, 2-col grid, featured slot)
- ✅ Filter pill rail (FilterPillGroup, All / Recommended / Breaking)
- ✅ Briefing entry and scan-state truth cues (TruthTag, CertaintyMeter, SourceTimeline)
- ✅ Persistent player cluster alignment (compact bar + full-screen expanded sheet, TimeScrubber, speed, volume, queue, immersive/fullscreen)

**Milestone C — Reading and Detail** ✅
- ✅ Calm article shell (NewsDetailClient, calm reading scale)
- ✅ Quieter action treatment (actions below body, proof modules restrained)
- ✅ Truth/certainty/source modules aligned to reading tone (TruthTag mixed state, SourceTimeline role dots, CertaintyMeter light/dark variants)

**Milestone D — Browse, Utility, Support** ✅
- ✅ Discover (Stories / Radio / Podcasts tabs, RadioStationCard, PodcastCard, CollectionTile, debounced search)
- ✅ Library (SwipeToDeleteRow, sort rail, search, cloud + local sync)
- ✅ Search (existing page)
- ✅ Settings (account / voice / billing / preferences / accessibility tabs, SaveStateFeedback, theme persistence, display toggles, realtime sync)
- ✅ Onboarding and Auth (existing pages)
- ✅ Empty / Error / Skeleton states (EmptyState, ErrorState, Skeleton family — StoryCardSkeleton, ListRowSkeleton, FeedSkeleton, BriefingSkeleton, HeadlineSkeleton)
- ✅ Briefing transcript seek (segment-linked, char-offset → ratio, seekToRatio wired end-to-end)
- ✅ Insights (StatTiles, 7-day ListeningTrendChart, individual entry deletion, realtime updates)
- ✅ Toast system (ToastProvider + useToast hook, 6 variants, AnimatePresence)
- ✅ QueueItem (order index, mini wave bars, remove, drag-handle support)
- ✅ BreakingBanner (standalone, reusable across surfaces)
- ✅ ToggleRow / SelectRow primitives
- ✅ MobileNavDock live dot (vermilion pulse on Listen when audio playing)
- ✅ Supabase realtime (listening_history, bookmarks, offline_articles, user_preferences all in publication)

### MVP Page Inventory

#### P0 — Required for launch

| Route | Surface | Must-ship features |
|-------|---------|-------------------|
| `/` | Landing | Hero CTA, product story, proof blocks, auth entry, responsive |
| `/auth` | Auth | Email/password sign in + up, Google auth, confirmation messaging, redirect logic |
| `/forgot-password` | Recovery | Reset flow, success/error, return path |
| `/onboarding` | Onboarding | Region, voice selection + preview, interests, save prefs |
| `/dashboard` | Feed | Feed cards, breaking, play actions, truth cues, Briefing access |
| `/briefing` | Morning Briefing | Featured briefing, play/pause, transcript fallback, story rundown |
| `/news/:id` | News Detail | Headline + body, truth tag, certainty meter, source timeline, share/bookmark/play |

#### P1 — Must ship, not blocking launch gate

| Route | Surface | Must-ship features |
|-------|---------|-------------------|
| `/listen` | Listen Hub | Continue listening, queue/up-next, recently played, Briefing shortcut |
| `/library` | Library | Saved stories, offline audio, play/remove, cache stats |
| `/settings` | Settings | Account, voice, billing, preferences, accessibility |
| `/search` | Search | Query input, filters, results, bookmarks, play/open |

#### Deferable

| Route | Recommendation |
|-------|---------------|
| `/discover` | Optional — depends on podcasts/radio API scope |
| `/insights` | Optional — useful for retention, not core loop |

### Route Aliases (in `next.config.ts`)

`/profile` → `/settings?tab=account` · `/subscription` → `/settings?tab=billing` · `/voices` → `/settings?tab=voice` · `/bookmarks` → `/library` · `/history` → `/insights`

### Route Acceptance Checklist (gates before marking any route complete)

**Every route:**
- Uses approved v5.1 colour and type system
- Uses correct scale for its surface type (large-UI vs calm reading)
- No `rgb(var(--token))` legacy misuse
- Does not visually regress on mobile
- No duplicate shell behaviour

**Surface-specific gates:**
- Landing: hero dominant, below-fold calmer, clear CTA path
- Shell: rail is dark/anchored, dock is floating/pill, spacing consistent
- Dashboard: large-card rhythm, filter rail, trust cues, no fintech feel
- Briefing/Player: controls central, vermilion used carefully, queue feels premium
- News Detail: typography leads, proof restrained, actions do not overpower reading
- Settings/Onboarding/Auth: calmer scale, consistent tokens

### Component Migration Status

| Legacy | Target | Status |
|--------|--------|--------|
| `MobileNav.tsx` | `MobileNavDock.tsx` | ✅ Migrated — legacy removed |
| `DashboardSidebar.tsx` | `DesktopRail.tsx` | ✅ Migrated — legacy removed |
| `StoryCard.tsx` | `StoryCardLarge` + `StoryNewsListCard` | ✅ Migrated — legacy removed |
| `AudioPlayerBar.tsx` | `AudioPlayer.tsx` PlayerCluster | ✅ Full expanded sheet built, TimeScrubber, queue, immersive mode |
| `TruthTag.tsx` | `TruthPill` + calmer truth module | ✅ Mixed state added, Soft Butter, role-coloured SourceTimeline |
