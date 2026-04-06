# Narvo MVP Page Surface Map v1

> **Purpose:** Canonical inventory of every page and system surface needed for the Narvo B2C MVP. This document translates the current route map in `frontend/src/App.jsx` and the launch priorities in [MVP_Implementation_Entry_Spec.md](../MVP_Implementation_Entry_Spec.md) into a UI-facing build list.
>
> **Scope:** B2C web MVP only. Includes public pages, authenticated product pages, auth/onboarding, empty/loading/error states, route aliases, and shared system surfaces.

### Multi-repo file paths (read this first)

The **File** columns in §2–§5 still describe a **Vite + `frontend/src/`** layout (`App.jsx`, `pages/*.tsx`). The shipping **Next.js** B2C app in the **`narvo_news`** monorepo uses **`frontend/app/`** with the **same route intent** and different paths.

- **Authoritative route → file map for Next.js:** `narvo_news/docs/NARVO_APP_ROUTES.md` (sibling repo to this `documentations` checkout).
- **Visual and component contracts** on those surfaces: [Narvo_Component_Design_System_v1.md](./Narvo_Component_Design_System_v1.md).
- **Interaction quality** (briefing ritual, play/save, trust): [Narvo_Emotional_Interaction_Guidelines_v1.md](./Narvo_Emotional_Interaction_Guidelines_v1.md).

When auditing or specifying work, do not treat the legacy `frontend/src/...` paths as the only source of truth for the Next.js consumer app.

---

## 1. MVP page set at a glance

Narvo’s MVP needs three layers of UI:

1. **Funnel pages**
   Landing, authentication, password recovery, and onboarding.
2. **Core product pages**
   Dashboard, Morning Briefing, News Detail, Listen, Library, Settings, and a minimal Search surface.
3. **System and fallback surfaces**
   Empty states, loading states, auth guard redirects, 404/500 pages, offline and queue indicators, and the persistent audio layer.

This is the minimum page system required to support the five-step MVP loop:

1. Discover Narvo
2. Create or recover access
3. Personalize the experience
4. Consume stories and audio daily
5. Save, resume, and manage playback/settings

---

## 2. Must-ship MVP pages

### 2.1 Public and funnel pages

| Route | Page / Surface | File | MVP status | Core purpose | Must-ship features |
| --- | --- | --- | --- | --- | --- |
| `/` | Landing page | `frontend/src/pages/LandingPage.tsx` | P0 | Brand, value proposition, trust, CTA into product | Hero CTA, product story, proof/value blocks, auth entry points, responsive marketing shell |
| `/auth` | Authentication | `frontend/src/pages/AuthPage.tsx` | P0 | Sign in and sign up entry point | Email/password sign in, sign up, Google auth, auth errors, email confirmation messaging, redirect to onboarding/dashboard |
| `/forgot-password` | Password recovery | `frontend/src/pages/ForgotPasswordPage.tsx` | P0 | Recover account access | Request reset flow, success/error feedback, return path to auth |
| `/onboarding` | Onboarding | `frontend/src/pages/OnboardingPage.tsx` | P0/P1 | Personalize first-run experience | Region selection, voice selection, voice preview, interests, save preferences, redirect to dashboard |

### 2.2 Authenticated core product pages

| Route | Page / Surface | File | MVP status | Core purpose | Must-ship features |
| --- | --- | --- | --- | --- | --- |
| `/dashboard` | Dashboard / feed | `frontend/src/pages/DashboardPage.tsx` | P0 | Daily home for stories and briefing entry | Feed cards, breaking stories, play actions, truth cues, filter/navigation entry, Morning Briefing access |
| `/briefing` | Morning Briefing | `frontend/src/pages/MorningBriefingPage.tsx` | P0 | Daily audio digest ritual | Featured briefing, play/pause, transcript fallback, story rundown, archive/history affordance |
| `/news/:id` | News detail | `frontend/src/pages/NewsDetailPage.tsx` | P0 | Full story consumption and trust context | Headline + body, truth tags, certainty meter, source timeline, share/bookmark/play actions |
| `/listen` | Listen hub | `frontend/src/pages/ListenPage.tsx` | P1 | Audio-first continuation surface | Continue listening, queue/up next, recently played, Morning Briefing shortcut, playback continuity |
| `/library` | Library | `frontend/src/pages/LibraryPage.tsx` | P1 | Saved and offline management | Saved stories, offline audio/articles, play/remove actions, cache stats, clear offline |
| `/settings` | Settings | `frontend/src/pages/SettingsPage.tsx` | P1/P2 | Account and preference control center | Account, voice, billing, preferences, accessibility, save-state feedback |
| `/search` | Search | `frontend/src/pages/SearchPage.tsx` | P1/P2 | Find stories quickly | Query input, filters, sort, result list, bookmarks, play/open actions, default browse state |

---

## 3. Product pages present in code but not strict MVP core

These routes exist in the current app and may remain available, but they are not as central to the narrow MVP loop as the pages above.

| Route | Page / Surface | File | Recommendation | Notes |
| --- | --- | --- | --- | --- |
| `/discover` | Discover | `frontend/src/pages/DiscoverPage.tsx` | Optional / deferable | Depends on podcasts/radio/discovery APIs that the MVP backend spec treats as broader scope than the narrow launch contract |
| `/insights` | Insights / history + analytics | `frontend/src/pages/InsightsPage.tsx` | Optional / deferable | Useful for retention and listening-history visibility, but not core to first launch if the team needs to tighten scope |
| `/metrics` | Investor board redirect | `frontend/src/App.jsx` | Not part of B2C MVP | External redirect to investor board, not a consumer MVP page |

Recommendation:

- Keep `Discover` and `Insights` in the codebase if they are already functional.
- Do not let them block launch-critical work on landing, auth, dashboard, briefing, detail, library, settings, and player.

---

## 4. Route aliases and redirects

These routes should be documented as aliases, not separate MVP pages.

| Route | Redirect target | Meaning |
| --- | --- | --- |
| `/bookmarks` | `/library` | Legacy saved-items alias |
| `/saved` | `/library` | Alternate saved-items alias |
| `/offline` | `/library` | Offline content entry alias |
| `/voices` | `/settings?tab=voice` | Voice management alias |
| `/profile` | `/settings?tab=account` | Profile/account alias |
| `/subscription` | `/settings?tab=billing` | Billing alias |
| `/history` | `/insights` | Legacy history alias |
| `/analytics` | `/insights?tab=analytics` | Analytics alias |

These should not be counted as independent page-design work unless the product intentionally breaks them back out into separate surfaces.

---

## 5. System and fallback surfaces required for MVP

These are not route-level pages in every case, but they are required MVP UI surfaces because the product will feel incomplete or unreliable without them.

### 5.1 Access and routing guards

| Surface | File | Why it matters |
| --- | --- | --- |
| Protected route guard | `frontend/src/components/ProtectedRoute.tsx` | Prevents unauthenticated access to app routes and sends users to `/auth` |
| Onboarding redirect logic | `frontend/src/pages/AuthPage.tsx` and `frontend/src/pages/OnboardingPage.tsx` | Decides whether a signed-in user goes to onboarding or dashboard |

### 5.2 Shared app-shell surfaces

| Surface | Primary files | Why it matters |
| --- | --- | --- |
| Desktop rail | `frontend/src/components/DesktopRail.tsx` | Canonical desktop navigation shell |
| Mobile dock | `frontend/src/components/NavDock.tsx` | Canonical mobile navigation shell |
| Header shell | `frontend/src/components/DashboardHeader.tsx` | Page-level context and utility actions |
| Dashboard layout | `frontend/src/components/DashboardLayout.tsx` | Shared authenticated shell wrapper |
| Persistent audio player | `frontend/src/components/AudioPlayerBar.tsx` | Playback continuity across routes |
| Download queue indicator | `frontend/src/components/DownloadQueueIndicator.tsx` | Visible status for offline/download actions |
| Tour guide modal | `frontend/src/components/TourGuideModal.tsx` | First-run product guidance |

### 5.3 Empty, loading, and error states

| Surface | File | Required MVP coverage |
| --- | --- | --- |
| Empty state | `frontend/src/components/EmptyState.tsx` | Search empty, saved empty, offline empty, generic no-content state |
| Error state shell | `frontend/src/components/ErrorState.tsx` | Shared fatal/system error framing |
| Not found page | `frontend/src/pages/NotFoundPage.tsx` | Unknown route recovery |
| Server error page | `frontend/src/pages/ServerErrorPage.tsx` | Hard failure recovery path |
| Skeleton loaders | `frontend/src/components/Skeleton.tsx` and page-local loading states | Perceived performance and data-loading continuity |
| Page suspense loader | `frontend/src/App.jsx` (`PageLoader`) | Route transition/loading fallback |

### 5.4 Offline and resilience states

| Surface | Primary files | Required MVP coverage |
| --- | --- | --- |
| Offline library states | `frontend/src/pages/LibraryPage.tsx` | Downloaded stories/audio, remove/clear, playback from cache |
| Offline hint banners | `frontend/src/components/EmptyState.tsx`, `frontend/src/pages/NotFoundPage.tsx`, `frontend/src/pages/ServerErrorPage.tsx` | Network-awareness for degraded states |
| Service-worker playback/cache behavior | `frontend/public/sw.js`, `frontend/src/lib/audioCache.ts` | Persistent/offline listening support |

---

## 6. Feature coverage by page

This section answers the practical product question: where does each major MVP feature live?

| MVP feature | Primary page(s) | Supporting surfaces |
| --- | --- | --- |
| Authentication | `/auth`, `/forgot-password` | `ProtectedRoute`, auth context |
| Account creation | `/auth` | Email confirmation messaging |
| Onboarding/personalization | `/onboarding` | Preferences API, voice preview |
| Daily feed | `/dashboard` | Shared story cards, nav shell |
| Morning digest | `/briefing`, `/dashboard` | Audio player, transcript fallback |
| Story detail and trust UI | `/news/:id` | `TruthTag`, `CertaintyMeter`, `SourceTimeline` |
| Persistent audio playback | All authenticated routes | `AudioPlayerBar`, audio context |
| Listen/resume behavior | `/listen`, `/library`, `/insights` | Queue/history APIs |
| Save/bookmark | `/dashboard`, `/news/:id`, `/search`, `/library` | bookmarks hook |
| Offline access | `/library` | download queue, audio cache, service worker |
| Search and retrieval | `/search` | bookmarks, play/open actions |
| Preferences/settings | `/settings` | account, voice, billing, accessibility |
| Empty states | `/library`, `/search`, `/discover`, generic shared | `EmptyState` |
| 404/500 resilience | `/404`, `/500`, wildcard route | `ErrorState` |

---

## 7. Recommended MVP launch page checklist

If Narvo had to ship a focused B2C MVP tomorrow, the minimum approved page stack should be:

### Required

- Landing
- Authentication
- Forgot Password
- Onboarding
- Dashboard
- Morning Briefing
- News Detail
- Library
- Settings
- Search
- Shared audio player
- Empty states
- 404 / 500 states

### Strongly recommended

- Listen

### Optional or deferable

- Discover
- Insights
- Investor metrics redirect

---

## 8. Design-system implication

The redesign program should treat these route families differently:

### Large UI surfaces

- Landing hero
- Dashboard
- Morning Briefing
- Listen
- Discover
- Player controls

### Calm reading / utility surfaces

- News detail
- Settings
- Forgot password
- Some library states
- Error and fallback pages

### Semantic pill usage

- Filters on dashboard/search/discover
- Truth/status tags on cards and detail
- Save/download/listening state labels

Pills should remain semantic metadata, not decoration.

---

## 9. Canonical implementation note

This document is the page-level counterpart to:

- [MVP_Implementation_Entry_Spec.md](../MVP_Implementation_Entry_Spec.md)
- `Narvo_Design_Foundation_v5.md`
- [Narvo_Component_Design_System_v1.md](./Narvo_Component_Design_System_v1.md)
- [Narvo_Emotional_Interaction_Guidelines_v1.md](./Narvo_Emotional_Interaction_Guidelines_v1.md)
- `Narvo_UI_UX_Revamp_Workflow_v1.md`

Use this page map when:

- planning route-by-route redesign work
- deciding what is truly MVP vs optional
- auditing missing empty/error/auth states
- preparing implementation checklists and QA passes
