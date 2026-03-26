# UX Design Patterns — Landing Page, Feed, and App Experience

> **Series:** Narvo B2C Revamp Research · Document 03 of 05  
> **Date:** March 2026  
> **Scope:** UX and design best practices for the Narvo landing page, dashboard/feed, navigation, audio player, onboarding flow, and microinteractions — grounded in 2025–2026 industry research and Design System v3

---

## Table of Contents

1. [Design Principles for Narvo B2C](#1-design-principles-for-narvo-b2c)
2. [Landing Page](#2-landing-page)
3. [Feed and Dashboard](#3-feed-and-dashboard)
4. [Navigation Architecture](#4-navigation-architecture)
5. [Audio Player](#5-audio-player)
6. [Onboarding Flow](#6-onboarding-flow)
7. [Microinteractions and Motion](#7-microinteractions-and-motion)
8. [Offline and Low-Bandwidth UX](#8-offline-and-low-bandwidth-ux)
9. [Trust and Credibility Signals](#9-trust-and-credibility-signals)
10. [Design Token Checklist](#10-design-token-checklist)

---

## 1. Design Principles for Narvo B2C

Before any layout or component decision, these principles govern every screen. They are derived from the intersection of Design System v3, the Nigerian mobile context, and 2025–2026 consumer app research.

**1. Audio is the primary action.** Play buttons are the largest interactive element. Every card has a play action. The audio player is always accessible. Listening completion is more important than reading.

**2. Data-consciousness is non-negotiable.** Nigerian mobile users are acutely aware of data costs. Skeleton loading, lazy image loading, progressive audio pre-fetching, and explicit download sizes before offline storage are table stakes — not enhancements.

**3. Trust must be visible.** The Truth Tag is not a secondary feature. Every story card shows its reliability indicator. Users should never have to wonder where information came from.

**4. Cultural voice, not technical voice.** Every label, heading, and empty state follows the App Copy guidelines. "Good morning, Oga" not "SYSTEM_STATUS: ACTIVE". "Oya, Play" not "Play Audio". The UI speaks like a trusted friend, not a dashboard.

**5. Mobile-first, touch-first.** 48px minimum touch targets. Bottom navigation. Thumb-zone primary actions. No hover-dependent UI. The app works perfectly one-handed on a 5.5-inch Android screen.

**6. Performance is a feature.** LCP < 2.5s on 3G. First Meaningful Paint < 1.5s. Offline operation is a feature, not a fallback. IndexedDB audio cache is front-and-centre, not hidden in settings.

---

## 2. Landing Page

### 2.1 Goals

The landing page has two jobs: (1) communicate Narvo's value proposition in under 5 seconds, and (2) convert visitors to sign-ups. Everything else is secondary.

Industry data for 2025–2026 establishes clear principles:
- Pages with a **single focused CTA** increase conversions by up to 62%
- Reducing complexity improves conversion rates by 27%
- Target **under 500KB initial page load** for Nigerian connections (average 10–15Mbps mobile, but with high latency and packet loss)

### 2.2 Hero Section (Above the Fold)

**Layout:** Two-column on desktop (headline/CTA left, phone mockup right). Single column on mobile (headline → CTA → mockup stacked).

**Headline:** Bold, benefit-driven, two lines maximum.
> *"Africa's news, explained — then spoken."*  
> *"AI reads 39 sources so you don't have to."*

**Sub-headline:** One sentence, value proposition.
> *"Get the full story, synthesised from dozens of sources and spoken in your language — in minutes."*

**Primary CTA:** Single amber button, 52px height, `rounded-md`, font-display 600.
> Label: **"Start Listening Free"**

**Phone mockup:** Show the audio player with an active waveform animation. Use a CSS-animated SVG waveform — not a video or GIF — to keep load size under 5KB. Display a story card with a Truth Tag badge visible.

**Trust signal (below CTA):** Single line in text-secondary.
> *"Join 10,000+ early listeners • No credit card required"*

### 2.3 Feature Sections (Below the Fold)

Use a **narrative scroll** — each section reveals one feature as the user scrolls, with a consistent left/right alternating layout on desktop and stacked on mobile.

| Section | Feature | Visual |
|---------|---------|--------|
| 01 | AI synthesis — "We read dozens of sources" | Animated source logos merging into one card |
| 02 | Audio-first — "Listen, don't read" | Waveform with language selector |
| 03 | Truth Tag — "Know where it came from" | Truth Tag component expanded |
| 04 | Your language — "News that sounds like home" | Language selector with voice preview |
| 05 | Offline — "Listen anywhere" | Phone with offline badge, no wifi icon |

### 2.4 Social Proof Section

Proven patterns for African consumer apps:
- **Milestone counter:** "X stories synthesised · X hours listened" (live from API)
- **Testimonials:** Full name, photo, city, occupation — not anonymous
- **Logos or partner signals:** "Powered by Google Gemini · YarnGPT"
- **Security badge:** Narvo Intelligence Ltd. registered company signal

**Copy example for testimonial:**
> *"I used to spend 45 minutes reading four different news sites every morning. Now I play my Narvo briefing during my commute. Done in 8 minutes."*  
> — Chidi Okafor, Software Engineer, Lagos

### 2.5 Final CTA Section

Repeat the CTA at page bottom with a different framing:
> **Headline:** "Your morning briefing is waiting."  
> **CTA:** "Get Started — It's Free"  
> **Sub-text:** "No credit card • 5 Nigerian languages • Works offline"

### 2.6 Layout Pattern: Bento Grid

The **bento grid** is the dominant 2025–2026 landing page pattern (per Figma's design trends report). Use it for the feature highlights section:

```
┌─────────────────┬────────────┐
│ AI Synthesis    │  TruthTag  │
│ (Large card)    │  (Square)  │
├────────┬────────┤            │
│ Audio  │ Offline│            │
│ First  │ Ready  ├────────────┤
│        │        │ Languages  │
└────────┴────────┴────────────┘
```

Each bento card: `rounded-xl` (20px), surface bg with amber shadow, warm champagne interior, brief headline + icon.

### 2.7 Performance Targets

| Metric | Target | Method |
|--------|--------|--------|
| Initial page load | < 500KB | WebP images, lazy below-fold, SVG animations |
| LCP | < 2.0s on 3G | Preload hero mockup image, inline critical CSS |
| CLS | < 0.05 | Reserve image dimensions, no layout shifts |
| TTI | < 3.5s | Defer non-critical JS |

---

## 3. Feed and Dashboard

### 3.1 Feed Architecture

The feed is the heart of the app. Every decision must be tested against: "Does this help the user find a story worth listening to faster?"

**Layout pattern:** Hybrid card grid

```
┌────────────────────────────────┐
│ Greeting + Briefing CTA        │  ← DashboardHeader (sticky)
├────────────────────────────────┤
│ Topic chips (horizontal scroll)│  ← Filter row
├────────────────────────────────┤
│ HERO CARD (featured story)     │  ← Full width, large image
│ [Image] Headline               │
│ 🎧 6 min · 2h ago · 🟢 Verified│
│ ▶ Oya, Play                   │
├────────┬───────────────────────┤
│ CARD   │ CARD                  │  ← Standard 2-col grid
│        │                       │
├────────┴───────────────────────┤
│ CARD (full width, no image)    │  ← Text-only variant
├────────┬───────────────────────┤
│ CARD   │ CARD                  │
└────────┴───────────────────────┘
```

### 3.2 Story Card Anatomy

Every story card must display the following information hierarchy:

**Featured Card (Hero):**
- Source logo (24px, top-left over image)
- Topic tag chip (category colour, top-right over image)
- Headline (font-display 600, 20px, max 2 lines, bottom of image)
- Listen time (🎧 6 min)
- Time ago (2h ago)
- Truth Tag badge (🟢 Verified by 5 sources / 🟡 Mixed / 🔴 Unverified)
- AI badge (✨ AI Summary — if synthesised from multiple sources)
- Play button (52px, primary amber, bottom-right, `whileTap: {scale: 0.96}`)
- Audio progress bar (4px line at card bottom — amber for played amount)

**Standard Card:**
- Thumbnail (80×80px, `rounded-md`, left side)
- Topic tag chip (top of text column)
- Headline (font-display 600, 16px, max 3 lines)
- Source name + time ago (font-body 400, 13px, text-secondary)
- Listen time + Truth Tag badge (bottom row)
- Play button (44px, embedded right side)

### 3.3 Topic Filter Chips

Below the header, a horizontally scrollable chip row filters the feed:

```
[For You] [Nigeria] [Africa] [Business] [Tech] [Sports] [Health] [Politics]
```

- First chip "For You" is always selected by default (AI-personalised)
- Active state: primary amber background, white text
- Inactive state: surface bg, text-secondary
- Chips: `rounded-full` (pill shape), `px-4 py-2`, font-body 600 10px
- Scroll: `overflow-x-auto scroll-smooth snap-x` — no scrollbar visible on mobile
- Accessibility: `role="tablist"` with `aria-selected` per chip

### 3.4 Feed Loading and Pagination

- Load **10 stories** on initial render
- Show skeleton cards (3 featured-size + 6 standard) during load
- Pagination: "Load 10 more" button at bottom — prefer explicit button over infinite scroll
  - Infinite scroll causes disorientation on return visits ("where was I?")
  - Explicit button signals data usage intent to data-conscious users
- Pull-to-refresh gesture (already implemented via `usePullToRefresh`)

### 3.5 Empty and Error States

**Empty state** (no stories loaded):
> Icon: 📻 (waveform illustration)  
> Headline: "Nothing here yet."  
> Sub-text: "Check back soon — stories are being prepared."  
> CTA: "Refresh Feed"

**Error state:**
> Icon: ⚡
> Headline: "Couldn't load your stories."  
> Sub-text: "Check your connection, then try again."  
> CTA: "Try Again"

**Offline state:**
> Icon: 📥
> Headline: "You're offline."  
> Sub-text: "Here are your downloaded stories."  
> CTA: "Go to Library"

---

## 4. Navigation Architecture

### 4.1 Five-Tab Bottom Navigation

Bottom navigation is 20–30% faster than hamburger menus. 49% of users navigate thumb-only on mobile. Five tabs cover Narvo's primary use cases.

| Tab | Icon | Route | Label |
|-----|------|-------|-------|
| Home | `SquaresFour` | `/dashboard` | Home |
| Discover | `Compass` | `/discover` | Discover |
| Listen | `Waveform` | `/listen` (new) | Listen |
| Library | `BookmarkSimple` | `/library` | Library |
| Profile | `UserCircle` | `/profile` (new) | Profile |

**Changes from current nav:**
- "Briefing" tab → absorbed into "Listen" tab (Morning Briefing is a primary listen feature, not a standalone page)
- "More" sheet removed — no longer needed after cutting experimental pages
- "Profile" tab replaces the buried settings access — acts as the entry point for Settings, Account, and Subscription

### 4.2 Listen Tab Architecture

The Listen tab becomes the audio hub, replacing the standalone Morning Briefing page:

```
/listen
  ├── Morning Briefing        ← Featured at top when available
  ├── Queue                   ← Current play queue
  ├── Continue Listening      ← Resume partially-played stories
  ├── Recently Played         ← Listening history
  └── Playlists               ← Saved playlists (future feature)
```

### 4.3 Desktop Sidebar Navigation

On desktop (≥ 1024px), the sidebar replaces bottom navigation:

```
┌──────────────────────┐
│ 🟠 NARVO             │  ← Logo
├──────────────────────┤
│ ⬛ Home              │
│ 🔍 Discover          │
│ 🎧 Listen            │
│ 📚 Library           │
├──────────────────────┤
│ 🔔 Notifications     │
│ ⚙️  Settings          │
│ 👤 Profile           │
└──────────────────────┘
```

Active state: `bg-primary/10 text-primary border-l-2 border-primary`

---

## 5. Audio Player

### 5.1 Mini Player (Persistent Bar)

The mini player sits above the bottom navigation on mobile and at the bottom of the content area on desktop. It persists across all routes while audio is active.

**Height:** 64px  
**Layout:** `flex items-center gap-3 px-4`

```
[Story thumbnail 40px] [Title (truncated) + Source] [⏮ 15s] [▶/⏸ 52px] [⏭ 15s] [Progress 4px bar]
```

- Tapping the bar (anywhere except controls) expands to full player
- Use Framer Motion `layoutId` for shared-element transition between mini and full player
- Progress bar spans the full width of the bar, sits at the bottom edge

### 5.2 Full Player (Expanded)

```
┌─────────────────────────────┐
│ ← Back          ⋯ Share     │  ← Header
├─────────────────────────────┤
│                             │
│    [Story cover art/cat     │
│     image — large]          │
│                             │
├─────────────────────────────┤
│  Story Headline             │  ← font-display 600 20px
│  Source Name · 2h ago       │  ← text-secondary 13px
│  🟢 Verified by 5 sources   │  ← Truth Tag pill
├─────────────────────────────┤
│  0:42 ────────●──── 4:30    │  ← Scrubber
├─────────────────────────────┤
│  [0.75×][1×][1.25×][1.5×][2×] │  ← Speed selector
├─────────────────────────────┤
│   ⏮15   ⏮skip  ▶  ⏭skip  ⏭15  │  ← Controls (52px play btn)
├─────────────────────────────┤
│  🌍 Listening in: [English ▼]│  ← Language selector
│  [Yorùbá][Pidgin][Hausa][Igbo]│
├─────────────────────────────┤
│  📥 Download  ♡ Save  ↗ Share│  ← Actions
└─────────────────────────────┘
```

### 5.3 Queue Management

The queue button in the full player opens a bottom sheet:

- Drag-to-reorder items (Framer Motion drag + reorder)
- Remove items with swipe-left gesture
- "Clear queue" at bottom
- Auto-queue: "Up next from your feed" section

### 5.4 Offline Audio Resume

When reopening a partially-listened story:
- Show "Resume from X:XX" as the primary play action instead of "Play from start"
- Store playback position in `localStorage` keyed by story ID
- Sync position to Supabase `listening_history` table when online

---

## 6. Onboarding Flow

### 6.1 Maximum 4 Steps

Completion rates drop from 72% to 45% after 3 steps, and further to 25% after 5 steps. Four steps is the maximum. Every step must earn its place.

### 6.2 Step Structure

**Step 1: Welcome**
- Full-screen illustration: warm amber background, Narvo wordmark, short animation
- Headline: "Your news. Your language. Your voice."
- Sub-text: "AI turns 39 news sources into stories you can actually listen to."
- Progress: 1 of 4 dots
- CTA: "Let's Go →"

**Step 2: Topics**
- Headline: "What stories matter to you?"
- Sub-text: "Pick at least 3 topics to personalise your feed."
- Layout: Scrollable grid of topic chips with emoji icons
  ```
  🇳🇬 Nigeria    🌍 Africa      💼 Business
  💻 Tech        ⚽ Sports      🏥 Health
  🎭 Culture     🏛️ Politics    🌱 Environment
  🔬 Science     🎵 Music       📱 Social Media
  ```
- Minimum selection: 3 (button disabled until 3 selected)
- Selected: amber fill with check icon
- CTA: "Next →"

**Step 3: Language and Voice**
- Headline: "What languages do you speak at home?"
- Sub-text: "We'll deliver your stories in the right voice."
- Layout: Language cards with voice preview button
  ```
  [🎧] English — Standard Nigerian
  [🎧] Yorùbá — Ẹ káàárọ̀, Oga
  [🎧] Hausa — Sannu
  [🎧] Igbo — Nnọọ
  [🎧] Nigerian Pidgin — How e dey?
  ```
- Tap [🎧] plays a 3-second sample immediately
- Multiple selection allowed
- CTA: "Next →"

**Step 4: Notifications**
- Headline: "Never miss your morning briefing."
- Sub-text: "We send you a 5-minute news summary every morning at 7AM."
- Context: Show what the notification looks like (mocked notification preview)
- CTA: "Turn on Notifications" (primary, amber)
- Secondary: "Maybe later" (text link, no button styling)
- Note: Request the actual browser notification permission after tapping primary CTA, not before — do not ask for permission on app load

### 6.3 Progressive Disclosure

Do not explain all features upfront. Use contextual tooltips on first encounter:

| First encounter | Tooltip / Message |
|----------------|-------------------|
| First Truth Tag seen | "This shows how many sources we checked. Tap to see details." |
| First audio play | Brief tip strip: "Tap 15s to skip. Tap speed to change pace." |
| First story save | "Saved! Find it in your Library." |
| First briefing open | "Your daily brief. 5 minutes. Every morning." |

---

## 7. Microinteractions and Motion

All animations must follow Design System v3 spring physics: `stiffness: 260, damping: 20`.

### 7.1 Card Entrance Animation

```typescript
// Staggered feed card entrance
const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: i * 0.06,
    },
  }),
};
```

### 7.2 Play/Pause Button

- Use `AnimatePresence` to morph between play triangle and pause bars
- Play → Pause: scale up then down (`scale: [1, 1.1, 1]`)
- Tap feedback: `whileTap: { scale: 0.96 }`

### 7.3 Bookmark Interaction

```typescript
// Bookmark save animation — scale overshoot + wiggle
const bookmarkVariants = {
  unsaved: { scale: 1 },
  saved: {
    scale: [1, 1.3, 1],
    rotate: [0, -10, 10, 0],
    transition: { duration: 0.4 }
  }
};
```

### 7.4 Page Transitions

```typescript
// Subtle horizontal slide between routes
const pageVariants = {
  initial: { opacity: 0, x: 10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
};
const pageTransition = { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] };
```

### 7.5 Toast Notifications

```typescript
// Slide up from bottom with spring
const toastVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 300 }
  },
  exit: { opacity: 0, y: 20 },
};
```

### 7.6 Skeleton Loading

Show skeleton placeholders matching card layout immediately. Transition to real content with staggered fade-in once data arrives.

```typescript
// Skeleton pulse animation via Tailwind
// Use: className="animate-pulse bg-surface rounded-lg"
// Hierarchy: matches actual card layout
```

Skeleton must appear within 50ms of route load — before any API response. Never show a blank screen.

### 7.7 Haptic Feedback

Use `navigator.vibrate()` for Android users:

```typescript
// Tap feedback on primary actions
navigator.vibrate?.(8);  // play button
navigator.vibrate?.(12); // bookmark
navigator.vibrate?.(5);  // topic chip selection
```

### 7.8 Performance Rules for Animations

1. Only animate `transform` and `opacity` — GPU-accelerated, never cause layout recalculation
2. Use `LazyMotion` with `domAnimation` feature set (~15KB) instead of full Framer Motion bundle
3. Implement `useReducedMotion()` hook — disable all animations for users with `prefers-reduced-motion`
4. Use `@starting-style` CSS for simple enter animations — avoids JavaScript overhead entirely
5. Tailwind v4's container queries (`@container`) for responsive card layouts that adapt within the component

---

## 8. Offline and Low-Bandwidth UX

### 8.1 Offline Indicator

A persistent but non-intrusive banner appears when offline:

```
┌──────────────────────────────────────┐
│ 📶 You're offline — showing cached   │
│ content. Tap to retry.               │
└──────────────────────────────────────┘
```

- Amber background, not red (red implies error; offline is a normal mode for commuters)
- Tap to retry connection
- Dismiss with ✕ — preference stored in localStorage

### 8.2 Explicit Download UX

Downloads must be explicit — not silent background operations. Users need to trust the app is not consuming data unexpectedly.

**Download button:** Per story, show 📥 with file size estimate ("Download · ~3.8MB")  
**Queue indicator:** Floating badge showing "3 stories downloading" with progress ring  
**Completion:** "Downloaded ✓" replaces button; "Available Offline" badge on card

### 8.3 Pre-Download on Wifi

Offer to pre-download the Morning Briefing automatically when on WiFi:

- Setting in Listen preferences: "Auto-download briefing on WiFi"
- Background Sync API triggers download on WiFi reconnection
- Stored in IndexedDB alongside manually downloaded stories

### 8.4 Storage Management

Surface storage usage transparently in Library:

```
📦 Offline Storage
Used: 47MB of 2GB browser limit
[Clear all downloads]  [Manage individual files]
```

---

## 9. Trust and Credibility Signals

### 9.1 Truth Tag Component

The Truth Tag is Narvo's most differentiated feature. Its visual design must communicate reliability at a glance.

**Card badge (collapsed):**
```
🟢 Verified · 5 sources
🟡 Mixed · 3 sources
🔴 Unverified · 1 source
```

**Full Truth Tag (expanded bottom sheet on tap):**
```
┌─────────────────────────────────────────┐
│ Truth Tag                              ✕│
├─────────────────────────────────────────┤
│ Verification Score: 87%                 │
│ ████████░░ High confidence             │
├─────────────────────────────────────────┤
│ Sources confirmed this story:           │
│ ✓ Channels Television                  │
│ ✓ Punch Newspapers                     │
│ ✓ Premium Times                        │
│ ✓ The Cable                            │
│ ✓ Vanguard                             │
├─────────────────────────────────────────┤
│ Fact-check result: No disputed claims   │
├─────────────────────────────────────────┤
│ Perspectives covered:                   │
│ Government • Opposition • Civil Society │
└─────────────────────────────────────────┘
```

### 9.2 Source Attribution

Every story must display its source logo(s). When synthesised from multiple sources:
```
Originally synthesised from: [Channels] [Punch] [+3 more]
```

### 9.3 AI Transparency

When a story is AI-synthesised (not a direct article excerpt), display:
```
✨ AI-synthesised narrative
Generated from 5 source articles by Narvo AI
Read the original sources →
```

---

## 10. Design Token Checklist

Before implementing any component, verify against Design System v3:

| Check | Token |
|-------|-------|
| Background | `oklch(0.98 0.01 75)` — warm champagne |
| Surface (cards) | `oklch(0.96 0.008 75)` |
| Primary (CTAs) | `oklch(0.68 0.18 52)` — sunset amber |
| Accent | `oklch(0.55 0.20 275)` — adire indigo |
| Secondary (verified) | `oklch(0.58 0.12 175)` — forest teal |
| Text primary | `oklch(0.22 0.02 50)` |
| Text secondary | `oklch(0.50 0.14 48)` |
| Font (display) | General Sans 600–700 — `font-display` |
| Font (body) | General Sans 400–500 — `font-body` |
| Font (mono) | Geist Mono — `font-mono` |
| Card radius (standard) | 16px — `rounded-lg` |
| Card radius (featured) | 20px — `rounded-xl` |
| Button radius | 12px — `rounded-md` |
| Shadow (cards) | `0 2px 4px rgba(139, 90, 43, 0.08)` — warm amber |
| Shadow (never) | Never grey shadows in B2C light mode |
| Touch targets | 48px minimum |
| Spring physics | `stiffness: 260, damping: 20` |
| Press feedback | `whileTap: { scale: 0.96 }` |

---

*Previous: [02 — Premium Tools Roadmap](./02_Premium_Tools_Roadmap.md)*  
*Next: [04 — Competitor Analysis](./04_Competitor_Analysis.md)*
