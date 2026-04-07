# Narvo Component Design System — v1
### Comprehensive Component Reference for the Approved v5 Foundation

> **Version:** 1.1  
> **Date:** March 31, 2026  
> **Author:** Ajibola Akelebe — Founder & Sole Developer, Narvo Intelligence  
> **Depends on:** [Narvo_Design_Foundation_v5.md](./Narvo_Design_Foundation_v5.md)  
> **Status:** Approved component-system direction — large-UI refinement locked, implementation pending  

---

## Table of Contents

1. [Purpose](#1-purpose)
2. [System Principles](#2-system-principles)
3. [Component Architecture](#3-component-architecture)
4. [Primitives](#4-primitives)
5. [Navigation Components](#5-navigation-components)
6. [Content and Editorial Components](#6-content-and-editorial-components)
7. [Trust and Intelligence Components](#7-trust-and-intelligence-components)
8. [Audio Components](#8-audio-components)
9. [Discovery and Collection Components](#9-discovery-and-collection-components)
10. [Forms, Settings, and Input Components](#10-forms-settings-and-input-components)
11. [Feedback and System Components](#11-feedback-and-system-components)
12. [Layout Shells](#12-layout-shells)
13. [Responsive Rules](#13-responsive-rules)
14. [Motion and State Rules](#14-motion-and-state-rules)
15. [Current Codebase Mapping](#15-current-codebase-mapping)
16. [Approval Checklist](#16-approval-checklist)

---

## 1. Purpose

This document defines the **component language** for Narvo after approval of the v5 foundation.

It answers the next design question:

> If `Petrol Teal + Signal Vermilion + Newsreader + Instrument Sans + Geist Mono` is the visual foundation, what should the actual product components look like and how should they behave?

This system is designed around the real Narvo product surfaces already present in the codebase:

- dashboard and feed
- news detail
- morning briefing
- listen hub
- discover
- library and offline
- voice and truth surfaces
- settings and profile

This is not a generic UI kit. It is a **Narvo-specific product system**.

---

## 2. System Principles

### 2.1 Calm by Default

Most components should live on quiet light surfaces with strong hierarchy and minimal noise.

### 2.2 Audio is the Most Active Surface

The player, queue, waveform, live, and briefing components are allowed to carry more energy than reading components.

### 2.3 Editorial Hierarchy First

Narvo is a news product. Headline, summary, metadata, and proof all need different visual weights.

### 2.4 Metadata Must Feel Technical

Truth labels, timestamps, queue positions, source stamps, and certainty signals belong to the mono layer.

### 2.5 Component Families Must Share DNA

Cards, rows, chips, player controls, and settings modules should not look like they came from different systems.

### 2.6 Rounded, Floating, Precise

The attached inspiration is useful in one way: it shows a modular, card-led interface with soft elevation and clear groupings. Narvo should borrow that modularity, but become more editorial, more trustworthy, and more product-specific.

### 2.7 Large on Habit Surfaces

Narvo should feel physically larger on the surfaces users touch every day:

- dashboard
- listen
- discover
- player
- landing hero

Large scale means bigger targets, clearer grouping, and stronger rhythm. It does not mean playful inflation everywhere.

### 2.8 Calm Reading by Default

The large-UI pivot stops where reading density starts.

- article detail stays typography-led
- settings stay controlled and compact
- proof modules stay precise rather than oversized

---

## 3. Component Architecture

Narvo components are organised into five layers:

1. **Tokens**  
   Colour, type, spacing, radius, elevation, motion.

2. **Primitives**  
   Buttons, chips, pills, dividers, badges, progress bars, waveform bars, avatars.

3. **Composed Components**  
   Cards, rows, toggles, nav items, queue items, form controls, tabs.

4. **Feature Components**  
   Story cards, truth modules, player bar, briefing hero, source timeline, radio card.

5. **Layout Shells**  
   Dashboard shell, article shell, settings shell, discover shell, mobile bottom-nav shell.

Rule:

- Primitives should never encode product semantics directly.
- Feature components should never duplicate primitive rules.

### 3.1 Core Contracts

The following contracts are now mandatory reference components for the next Narvo implementation pass:

| Contract | Role |
|---------|------|
| `NavDock` | floating mobile bottom navigation with large touch targets |
| `FilterPill` | segmented browsing/filter control for dashboard, listen, discover |
| `StatusPill` | saved, live, breaking, downloaded, queued, syncing |
| `TruthPill` | verified, mixed, disputed, checking |
| `StoryCardLarge` | high-importance editorial card for dashboard, listen, and landing |
| `StoryCardCompact` | repeatable feed card for browse and list contexts |
| `PlayerCluster` | central transport control family for full and compact playback |
| `DesktopRail` | dark anchored desktop navigation shell |
| `LandingHeroFrame` | bold campaign-level hero that transitions into calmer product explanation |

### 3.2 Scope of Scale

Apply the larger scale to:

- top-level habit surfaces
- modular browse surfaces
- primary audio controls

Do not apply the same scale to:

- long-form article reading
- source-dense verification blocks
- settings rows where compact comparison matters

---

## 4. Primitives

### 4.1 Buttons

Narvo needs four main button types.

| Component | Use | Height | Shape | Colour rule |
|----------|-----|--------|-------|-------------|
| `ButtonPrimary` | play, listen, start, confirm | 56px app / 60px landing | full pill or soft rounded | Signal Vermilion |
| `ButtonSecondary` | follow, save, view more | 48px to 52px | rounded rectangle | white or Cool Mist with Petrol Teal text |
| `ButtonGhost` | subtle inline action | 44px to 48px | transparent | text-led only |
| `ButtonIcon` | player controls, nav utilities | 44px / 52px / 60px | circular | white, Cool Mist, or Vermilion depending on priority |

### Primary Button Rule

- Default fill: `Signal Vermilion`
- Text/icon: white
- Hover: slightly deeper vermilion
- Focus: visible ring using teal or vermilion depending on background

### Secondary Button Rule

- Default fill: white or `Cool Mist`
- Text: `Deep Ink`
- Border: subtle `--color-border`
- Hover: tint toward `--color-primary-tint`

### Never

- Never use `Petrol Teal` as the default fill for all primary buttons.
- Never make primary CTAs smaller than the surrounding metadata affordances.

### 4.2 Chips and Pills

Narvo uses chips heavily for scanning, not decoration.

| Component | Use | Font | Style |
|----------|-----|------|-------|
| `CategoryPill` | politics, markets, tech, health | Instrument Sans 12/600 | soft teal tint |
| `StatusPill` | live, breaking, saved, downloaded | Geist Mono 10/700 | pill with state colour |
| `TruthPill` | verified, mixed, disputed | Geist Mono 10/700 | semantically coloured |
| `FilterPill` | category rail and segmented selection | Instrument Sans 12/600 | interactive pill |

Chip priority:

- category chips are quieter
- status chips are hotter
- truth chips are most semantically strict
- filter pills should feel larger and more touchable on top-level browse surfaces

Pill size defaults:

- `pill-sm`: compact metadata and inline labels
- `pill-md`: filter rails, docked selectors, and large browse contexts

### 4.3 Progress and Waveform

| Primitive | Use |
|----------|-----|
| `ProgressBar` | playback, reading position, download state |
| `WaveformStrip` | active audio, live visualisation |
| `MiniBars` | small now-playing indicators inside queue or cards |

Rules:

- Playback progress may use vermilion highlight.
- Structural progress without urgency can use teal.
- Waveforms should be simple, not audio-editor complicated.

### 4.4 Dividers and Surfaces

Narvo dividers should be extremely quiet.

- default line: `rgba(23, 50, 74, 0.10)`
- heavy line: `rgba(23, 50, 74, 0.18)` only when separating macro zones

Surface tiers:

| Token | Use |
|------|-----|
| `Surface/Base` | page body |
| `Surface/Card` | regular cards |
| `Surface/Raised` | player, sheets, sticky modules |
| `Surface/Floating` | nav dock, floating player, hero action clusters |
| `Surface/Rail` | dark anchored desktop navigation |
| `Surface/Tinted` | section grouping, soft context blocks |

### 4.5 Cover Art and Media Frames

Narvo needs consistent media primitives for:

- article images
- podcast art
- radio thumbnails
- voice avatars

Rules:

- square covers: 16px radius
- rectangular editorial images: 18px to 24px radius
- hero media: 24px radius minimum
- artwork should never dominate the headline hierarchy

---

## 5. Navigation Components

### 5.1 App Top Bar

Purpose:

- context, greeting, search entry, utilities

Anatomy:

- left: logo or context label
- center: page title or active context
- right: alerts, profile, settings, search, or live indicators

Rules:

- desktop top bar can be transparent over light background
- mobile top bar should stay tight and not compete with bottom nav
- use `Newsreader` only for the main page title, not all nav labels

### 5.2 NavDock

The floating mobile dock is one of the most important Narvo habits.

Destinations:

- Dashboard
- Listen
- Discover
- Library
- Profile / More

Rules:

- floating pill container with breathing room from the screen edge
- oversized tap targets and clearer active-state framing
- active item gets teal emphasis
- live or active audio can show a small vermilion or waveform cue
- icon + short label only

This is not a flat utility bar. It should feel like a premium control dock.

### 5.3 DesktopRail

Desktop only.

Used for:

- source rail
- navigation clusters
- insight panels

Rules:

- dark, anchored, and visually stable
- quieter than main feed content but stronger than a generic sidebar
- supports filters, collections, and utility groups
- should feel like a stable rail, not a second app

### 5.4 Tab Rails and Segment Controls

Used in:

- Discover
- Insights
- Settings
- Search

Rules:

- compact pill group
- active state should feel decisive
- avoid over-thick indicators

---

## 6. Content and Editorial Components

### 6.1 StoryCardLarge

Use for:

- top dashboard story
- major recommended story
- landing feature story

Anatomy:

- category / status row
- strong Newsreader headline
- short summary
- source and timestamp
- primary play button
- optional save / queue actions

Visual rule:

- card should feel premium, spacious, and calm
- this is not the brightest component on screen

### 6.2 StoryCardCompact

Use for:

- dashboard feed grid
- related stories
- library entries

Anatomy:

- category chip
- headline
- summary or deck
- source / time / truth row
- play action

Rules:

- should work with or without image
- must still scan well in dense feed layouts

### 6.3 StoryCardBreaking

Use for:

- urgent dashboard items
- breaking rail
- push-driven promoted slots

Differences from standard:

- stronger vermilion cue
- tighter metadata
- priority chip always visible
- should still avoid full-surface red fill

### 6.4 StoryRowCompact

Use for:

- search results
- continue listening
- queue-adjacent story surfaces
- related article modules

Anatomy:

- optional thumbnail
- title
- metadata
- trailing action

This is a utility component, not a hero component.

### 6.5 BriefingHero

Use for:

- Morning Briefing main entry point

Anatomy:

- date stamp
- headline
- story-count preview
- duration
- main play CTA
- optional waveform activity

Rules:

- may use full teal surface
- can hold more brand expression than regular news cards

### 6.6 EditorialQuoteCard and InsightCard

Use for:

- explainers
- narrative interludes
- "what this means" modules
- insight summaries

Rules:

- cleaner than regular cards
- higher ratio of text to utility actions
- can use `Soft Butter` or `Mist Lilac` as subtle support fills

---

## 7. Trust and Intelligence Components

This family is uniquely Narvo and should become visually ownable.

### 7.1 TruthPill / TruthTag

Use for:

- verified
- mixed
- disputed
- checking

Rules:

- always mono
- always compact
- colour must stay semantic
- this component should never be over-designed
- use pill framing on browse surfaces and stricter compact framing inside dense article contexts

Approved semantic mapping:

| State | Colour |
|------|--------|
| Verified | teal/green-leaning support |
| Mixed | butter / muted warning |
| Disputed | vermilion or red-leaning warning |
| Checking | teal-neutral loading |

### 7.2 CertaintyMeter

Use for:

- news detail
- narrative confidence modules
- source-comparison modules

Rules:

- horizontal bar first
- percentage second
- supporting label in mono
- avoid dashboard-gauge theatrics

### 7.3 SourceTimeline

Use for:

- news detail proof chain
- chronology of reporting

Anatomy:

- mono heading
- vertical rule
- source node
- timestamp
- role label
- outbound link

Rules:

- should feel forensic, not decorative
- spacing matters more than ornament

### 7.4 SourceCard

Use for:

- source credibility panels
- source list modules
- source follow surfaces

Anatomy:

- source name
- logo or mark
- role / region / credibility label
- actions

### 7.5 SignalPanel

Use for:

- "why this matters"
- fact pattern
- anomaly / spike
- source spread

This is a higher-level intelligence card, somewhere between analytics and editorial.

---

## 8. Audio Components

Audio is Narvo’s most distinctive interaction layer.

### 8.1 PlayerCluster and PlayerBarPersistent

`PlayerCluster` is the central transport-control family for Narvo.

Use for:

- persistent player
- full player
- briefing hero
- active audio tiles

Anatomy:

- central play or pause action
- supporting transport actions
- progress or waveform context
- active emphasis state

Rules:

- controls should feel larger and more central than in a standard media app
- the cluster can carry more vermilion emphasis than the rest of the layout
- active state may pulse or glow subtly, never aggressively

`PlayerBarPersistent` remains the always-on compact expression of this family.

Use for:

- always-on playback at the bottom of the app

Anatomy:

- track title
- source / mode label
- progress line
- play/pause
- queue
- expand

Rules:

- should feel lightweight but premium
- active state can glow slightly
- must not cover navigation logic awkwardly

### 8.2 PlayerFull

Use for:

- Listen
- briefing deep playback
- expanded player sheet

Anatomy:

- cover / story context
- waveform or progress
- elapsed / remaining time
- primary control cluster
- speed / queue / mute / repeat

Rules:

- this is where vermilion can be most visible
- the player can feel more emotional than the feed

### 8.3 QueueItem

Use for:

- queue drawer
- player sheet
- up-next modules

Anatomy:

- order index
- title
- source
- drag affordance
- active mini-bars
- remove action

Rules:

- active row should be obviously active
- inactive rows should stay quiet

### 8.4 AudioTile

Use for:

- radio
- podcast episode
- voice model
- saved audio

Visual rule:

- compact, modular, media-led
- this family can borrow more from the inspiration image’s modular card feeling

### 8.5 VoiceCard

Use for:

- voice selection
- voice studio
- TTS identity preview

Anatomy:

- avatar or voice illustration
- voice name
- language / tone
- preview action
- select state

---

## 9. Discovery and Collection Components

### 9.1 RadioStationCard

Use for:

- Discover radio surfaces

Anatomy:

- station name
- country / stream info
- live state
- play action

### 9.2 PodcastCard

Use for:

- Discover podcast grids

Anatomy:

- cover art
- title
- show / episode context
- duration
- play / download / queue

### 9.3 CollectionTile

Use for:

- category
- interest
- topic
- listening collection

Rules:

- stronger visual iconography allowed
- should remain system-consistent with cards

### 9.4 StatTile

Use for:

- Insights
- source counts
- listening streaks
- profile metrics

Rules:

- short metric
- mono label
- optional trend cue

---

## 10. Forms, Settings, and Input Components

### 10.1 SearchBar

Use for:

- global search
- discover search
- settings search

Rules:

- pill or softly rounded field
- subtle left icon
- no harsh borders

### 10.2 InputField

Use for:

- auth
- forms
- profile edits

Rules:

- 52px default height
- clear focus ring
- label above or placeholder plus external label

### 10.3 SelectField and SegmentedSelector

Use for:

- language
- theme
- category filters
- playback speed

### 10.4 ToggleRow

Use for:

- settings
- notification preferences
- accessibility controls

Anatomy:

- icon block
- title
- description
- trailing switch

This is one of the highest-reuse utility rows in the product.

### 10.5 PreferenceCard

Use for:

- theme selector
- voice selector
- source preference
- onboarding interest blocks

Rules:

- selection state must be easy to read from distance
- cards should not need long explanatory copy to work

### 10.6 Modal, Sheet, and Drawer

Use for:

- queue
- filters
- onboarding explanations
- account utilities

Rules:

- desktop uses floating modal or side sheet
- mobile prefers bottom sheet
- glass is allowed here, but only lightly

---

## 11. Feedback and System Components

### 11.1 EmptyState

Use for:

- no bookmarks
- no downloads
- no search results
- no stories available

Rules:

- concise message
- one clear action
- light illustration or abstract motif only

### 11.2 ErrorState

Use for:

- network failure
- fetch failure
- server problem

Rules:

- clear language
- retry action
- avoid catastrophic tone

### 11.3 SkeletonState

Used heavily in:

- dashboard
- news detail
- discover
- settings

Rules:

- layout-shaped, not just grey blocks
- reading skeletons should hint at editorial layout

### 11.4 Toast and Banner

Use for:

- saved
- downloaded
- queue updated
- language changed
- sync feedback

Rules:

- brief
- anchored
- not visually heavier than the action that triggered it

### 11.5 BreakingBanner

Use for:

- global breaking strip
- top-of-feed urgency

Rules:

- strong but compact
- should not turn the entire layout into a danger state

---

## 12. Layout Shells

### 12.1 Dashboard Shell

Structure:

- top header
- optional topic rail
- primary feed
- desktop rail on desktop
- persistent player
- floating nav dock on mobile

Rules:

- large-card rhythm belongs here
- the shell should feel airy in the canvas and anchored in the rail

### 12.2 Article Shell

Structure:

- back/context row
- title block
- proof modules
- body
- source timeline
- related content

Rule:

- this is the quietest shell in the app
- large-UI scale should step back here so reading stays comfortable

### 12.3 Listen Shell

Structure:

- greeting
- briefing hero
- continue listening
- queue / history

Rule:

- more active than article shell
- calmer than full discover browse
- should make room for the larger player cluster and premium briefing card

### 12.4 Discover Shell

Structure:

- top search/filter
- radio
- podcasts
- topic/category modules

Rule:

- most modular and card-rich shell
- the best place to use large pills, large cards, and segmented browse controls

### 12.5 Settings Shell

Structure:

- settings top bar
- tab rail or segmented nav
- grouped cards and rows

Rule:

- should feel controlled, not clinical
- should not inherit the full large-UI scale from browse surfaces

---

## 13. Responsive Rules

### Mobile

- prefer stacked cards
- keep controls thumb-reachable
- bottom nav and player must co-exist cleanly
- use compact metadata

### Tablet

- introduce paired cards and 2-column discovery layouts
- player may expand into richer control layout

### Desktop

- allow dashboard split layouts
- sidebar becomes meaningful
- queue and proof modules can live side-by-side with content

Rule:

- Do not invent separate visual languages per breakpoint.

---

## 14. Motion and State Rules

State model every interactive component should consider:

- default
- hover
- focus-visible
- pressed
- active
- loading
- disabled
- success or synced
- error or warning

Motion rules:

- 150ms to 200ms for most hover/press interactions
- 250ms to 350ms for sheets and component reveals
- waveform and live states can loop, but subtly
- no decorative motion on long reading surfaces

---

## 15. Current Codebase Mapping

Historical CRA filenames below are **removed** in `narvo_news`; the B2C app maps to §15.1. This table stays as a vocabulary bridge for older docs.

| Historical file (pre–Phase 5) | Component family |
|-------------|-------------------------|
| `StoryCard.tsx` | `StoryCardLarge`, `StoryCardCompact`, `RecommendationCard` |
| `AudioPlayerBar.tsx` | `PlayerBarPersistent`, `QueueItem`, `PlayerCluster` |
| `AudioPlayer.tsx` | `PlayerFull`, `WaveformStrip`, `TransportControls` |
| `TruthTag.tsx` | `TruthPill`, `TruthTag` |
| `CertaintyMeter.tsx` | `CertaintyMeter` |
| `SourceTimeline.tsx` | `SourceTimeline` |
| `MobileNav.tsx` | `NavDock` → **`MobileNavDock`** in `narvo_news` |
| `DashboardHeader.tsx` | `TopBar`, `ContextHeader` |
| `DashboardSidebar.tsx` | `DesktopRail`, `SignalPanel`, `SourcePanel` |
| `EmptyState.tsx` | `EmptyState` |
| `ErrorState.tsx` | `ErrorState` |
| `Skeleton.tsx` | `SkeletonState` primitives |
| `BreakingNews.tsx` | `BreakingBanner` |
| `ThemeToggle.tsx` | `ToggleRow`, `SegmentControl` |

### 15.1 Next.js B2C app (`narvo_news` / `frontend/app/`)

The consumer web app uses different filenames but should converge on the contracts in §3.1 (e.g. `NavDock`, `DesktopRail`, `PlayerCluster`, truth family). Initial mapping:

| Current file (`narvo_news`) | Component family (this document) |
| --- | --- |
| `components/TruthTag.tsx` | `TruthPill`, `TruthTag` |
| `components/AudioPlayer.tsx`, `AudioPlayerContext.tsx` | `PlayerBarPersistent`, `PlayerCluster`, transport |
| `components/app/DesktopRail.tsx` | `DesktopRail` |
| `components/app/MobileNavDock.tsx` | `NavDock` |
| `components/app/AuthenticatedAppShell.tsx` | Layout shells (dashboard, settings, library, etc.) |
| `components/auth/AuthShell.tsx` | Auth / funnel frame |
| `app/page.tsx` (landing) | `LandingHeroFrame` (target state) |

**Gaps:** Many §3.1 names are not yet standalone modules — e.g. `StoryCardLarge` / `StoryCardCompact`, `FilterPill`, shared `EmptyState` / `ErrorState` — behaviour often lives inline on pages. Emotional and motion targets for implementation are in [Narvo_Emotional_Interaction_Guidelines_v1.md](./Narvo_Emotional_Interaction_Guidelines_v1.md). Route inventory for Next.js: `narvo_news/docs/NARVO_APP_ROUTES.md`.

This means the next implementation phase should mostly be a **systematisation and redesign**, not a total invention from zero.

---

## 16. Approval Checklist

Approve this component system if the following statements are true:

1. Narvo should remain calm on reading surfaces and more energetic on audio surfaces.
2. The large-UI pivot should apply to dashboard, listen, discover, player, and landing surfaces, not article detail.
3. Story, truth, and player components should form the three signature families of the product.
4. The system should favour rounded modular cards, pill actions, floating docks, and anchored rails without becoming soft or generic.
5. Trust and intelligence components should feel uniquely Narvo, not copied from a standard media app.
6. The next step after approval should be component-by-component implementation against this final board.

If approved, the build sequence should be:

1. primitives
2. navigation
3. story cards
4. trust/intelligence family
5. player family
6. settings and feedback family
7. layout shells
