# Narvo Technical Master
### Single source of truth — architecture, backend, frontend, data model, API contract, security, and infrastructure

> **Version:** 1.0  
> **Consolidates:** TECHNICAL_REFERENCE · Narvo_MVP_Backend_Architecture_v1 · Narvo_Security_Hardening_Checklist_v1  
> **Date:** April 2026  
> **Status:** Canonical — superseded technical documents are for archive reference only

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Repository Structure](#2-repository-structure)
3. [Tech Stack](#3-tech-stack)
4. [Backend Architecture](#4-backend-architecture)
5. [Frontend Architecture — Next.js 15](#5-frontend-architecture--nextjs-15)
6. [Data Model](#6-data-model)
7. [MVP API Contract](#7-mvp-api-contract)
8. [Security Requirements](#8-security-requirements)
9. [Environment Variables](#9-environment-variables)
10. [Infrastructure & Deployment](#10-infrastructure--deployment)
11. [Key Constants & Tunables](#11-key-constants--tunables)
12. [Decisions Log](#12-decisions-log)

---

## 1. Project Overview

Narvo is a bold, audio-first news platform for Africa. It ingests RSS feeds and aggregator APIs, clusters related articles, synthesises AI-written broadcast narratives via Gemini, pre-generates TTS audio in five Nigerian languages, and serves a Next.js PWA with offline playback, queue management, and a Morning Briefing feature.

**Core differentiators:**
- Authentic Nigerian-accented TTS via YarnGPT (Yoruba, Hausa, Igbo, Nigerian Pidgin, English)
- Multi-source composite story synthesis — cross-source narrative, not one article
- Full pre-generation pipeline: translate → TTS all 5 languages before user opens a story
- PWA with IndexedDB blob cache for true offline audio

**Company:** Narvo Intelligence Ltd. → Narvo (B2C, this repo) + Narvo Platform (B2B NaaS, planned).

**MVP backend purpose:** Turn important stories into trustworthy, audio-first story objects and a reliable Morning Briefing.

---

## 2. Repository Structure

```
narvo_news/                         (github.com/Narvo-Intelligence/narvo_news)
├── CLAUDE.md
├── .claude/                        ← agents, commands, rules, skills
│   ├── TECHNICAL_REFERENCE.md
│   ├── agents/                     ← 30 agents, 7 departments
│   ├── commands/
│   └── rules/                      ← design-system, frontend-style, backend-api, copy-system, product-context, supabase
├── frontend/                       ← Next.js 15 App Router
│   ├── app/                        ← All routes
│   │   ├── layout.tsx              ← Root layout (fonts, providers, AudioPlayer)
│   │   ├── globals.css             ← Tailwind v4 @theme tokens + light/dark
│   │   ├── page.tsx                ← Landing (/)
│   │   ├── dashboard/page.tsx
│   │   ├── briefing/page.tsx
│   │   ├── listen/page.tsx
│   │   ├── news/[id]/page.tsx
│   │   ├── library/page.tsx
│   │   ├── search/page.tsx
│   │   ├── settings/page.tsx
│   │   ├── insights/page.tsx
│   │   ├── discover/page.tsx
│   │   ├── onboarding/page.tsx
│   │   ├── auth/page.tsx + callback/
│   │   └── forgot-password/
│   ├── components/
│   │   ├── app/                    ← AuthenticatedAppShell, DesktopRail, MobileNavDock, AppUniversalHeader, nav-items.ts
│   │   ├── AudioPlayer.tsx         ← Persistent player (mounts in root layout)
│   │   ├── AudioPlayerContext.tsx
│   │   ├── StoryCardLarge.tsx
│   │   ├── StoryNewsListCard.tsx
│   │   ├── FilterPillGroup.tsx
│   │   ├── StatusPill.tsx
│   │   ├── TruthTag.tsx
│   │   ├── EmptyState.tsx / ErrorState.tsx
│   │   ├── NarvoClientBootstrap.tsx
│   │   ├── OfflineDownloadContext.tsx
│   │   └── ThemeProvider.tsx
│   ├── hooks/
│   │   └── use-latest-briefing.ts
│   ├── lib/
│   │   ├── narvo-api.ts            ← Public API client
│   │   ├── me-api.ts               ← Authenticated /api/me/* client
│   │   ├── narvo-session.ts        ← Session token (narvo_demo_session cookie)
│   │   ├── narvo-auth-actions.ts   ← Supabase server auth
│   │   ├── narvo-analytics.ts
│   │   ├── narvo-app-copy.ts       ← COPY object — all user-facing strings
│   │   ├── supabase-browser.ts
│   │   └── offlineStorage.ts
│   ├── middleware.ts               ← Route protection
│   ├── next.config.ts              ← distDir: "build", redirects, images
│   └── package.json
├── backend/                        ← FastAPI (Python)
│   ├── server.py                   ← App assembly, middleware, routers
│   ├── routes/
│   │   ├── news.py                 ← GET /api/news, breaking, detail
│   │   ├── briefing.py             ← briefing generate/latest/date
│   │   ├── me.py                   ← /api/me/* (authenticated user state)
│   │   ├── share.py                ← share URLs + Open Graph
│   │   ├── tts.py                  ← TTS generation + voice list
│   │   ├── factcheck.py
│   │   ├── discover.py             ← radio, podcasts, trending
│   │   ├── aggregators.py
│   │   ├── search.py
│   │   ├── settings.py             ← Legacy; migrate to /api/me/*
│   │   ├── notifications.py
│   │   ├── health.py
│   │   └── admin.py
│   ├── services/
│   │   ├── llm_gemini.py           ← Gemini client (google.genai SDK)
│   │   ├── llm_groq.py             ← Groq LLM provider
│   │   ├── narrative_service.py
│   │   ├── story_content_service.py
│   │   ├── yarngpt_service.py
│   │   ├── tts_service.py          ← OpenAI TTS standalone
│   │   ├── translation_service.py
│   │   ├── news_service.py
│   │   ├── article_scraper_service.py
│   │   ├── aggregator_service.py
│   │   ├── recommendation_service.py
│   │   ├── briefing_service.py
│   │   └── factcheck_service.py
│   ├── lib/
│   │   ├── auth.py                 ← JWT decode/verify
│   │   ├── supabase_db.py          ← Supabase client singleton
│   │   ├── ratelimit.py            ← Upstash rate limiting
│   │   ├── http_client.py          ← Shared httpx pool
│   │   ├── cache_registry.py
│   │   ├── gcp_verify.py
│   │   └── qstash_verify.py        ← HMAC-SHA256 cron auth
│   ├── migrations/                 ← scraped_articles, trust_scoring, sources_used
│   └── requirements.txt
├── investor/                       ← Vite/React (separate from Next.js frontend)
└── supabase/
```

---

## 3. Tech Stack

### Backend

| Layer | Technology |
|-------|------------|
| Framework | FastAPI 0.11x, async, Python 3.12 + uvicorn |
| Validation | Pydantic v2 |
| Database | Supabase (PostgreSQL) + RLS |
| Primary LLM | Google Gemini (`gemini-2.5-flash` via `google.genai` SDK) |
| Fallback LLM | Groq (`services/llm_groq.py`) |
| Primary TTS | YarnGPT (Nigerian accents, chunked MP3) |
| Fallback TTS | OpenAI `tts-1` |
| Caching | Upstash Redis (HTTP, `NEWS_CACHE_TTL=120s`) |
| Scheduling | Upstash QStash (HMAC-SHA256 cron) |
| Rate limiting | Upstash Ratelimit |
| Vector search | Upstash Vector (768-dim, `gemini-embedding-001`) |
| HTTP client | httpx shared pool + aiohttp |
| Container | Docker → Google Cloud Run |
| CI/CD | Google Cloud Build |

### Frontend

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15, App Router, React 18 |
| Styling | Tailwind CSS v4 (`@theme` in globals.css) |
| Icons | Lucide React |
| Animation | `motion` package (not framer-motion) |
| API | `lib/narvo-api.ts` (public), `lib/me-api.ts` (auth) |
| Auth | Supabase browser client + server auth actions |
| Session | `narvo_demo_session` cookie → Bearer token |
| Copy strings | `lib/narvo-app-copy.ts` COPY object |
| Audio | Web Audio API + HTMLAudioElement |
| Offline | Service Worker + IndexedDB |
| Build output | `build/` (distDir in next.config.ts) |
| Hosting | Vercel |

---

## 4. Backend Architecture

### 4.1 Server & Routing

`server.py` is the FastAPI assembly point:
- CORS via `CORSMiddleware` with `ALLOWED_ORIGINS` env var
- CSP and Referrer-Policy headers via `SecurityHeadersMiddleware`
- `X-Request-ID` middleware for tracing
- Structured JSON logging with request_id and latency_ms
- Standardized error envelopes: `{error, code, detail, status}`
- Sentry init when `SENTRY_DSN` is set

**Cron endpoints** (protected by `Depends(verify_qstash)`):
- `POST /api/news/refresh` — every 15 min
- `POST /api/aggregators/refresh` — every 10 min
- `POST /api/sources/health/refresh` — every 5 min
- `POST /api/briefing/generate` — daily 05:00 WAT

### 4.2 Content Pipeline

```
RSS Feeds (40+)
  -> news_service.fetch_all_news()        # feedparser + aiohttp, per-feed concurrent
  -> news_service.cluster_related_articles()  # title-word overlap ≥3, same category+region
  -> news_service.merge_clusters_to_stories() # per cluster: scrape → assign roles → build story
  -> story_id = SHA-1(title[:120].lower())    # deterministic ID
  -> Upstash Redis (TTL: 120s)
  -> On /api/news/{id}:
      story_content_service.get_story_content(story_id)
        HIT  -> return cached narrative + translations + audio
        MISS -> scrape -> synthesize -> persist -> BackgroundTask: prefill all 5 languages
```

**Scraper cascade** (first to return ≥150 chars wins):
1. `trafilatura` → 2. `newspaper4k` → 3. `readability-lxml` → 4. `goose3` → 5. `BeautifulSoup4` → 6. RSS summary (always available)

**Multi-source synthesis:** When cluster has ≥2 sources, Gemini synthesises a composite narrative using PRIMARY/SUPPORTING/CONTEXT source roles. Output schema identical to single-source.

### 4.3 AI & LLM Layer

All Gemini calls via two functions in `services/llm_gemini.py`:

```python
await generate_gemini(system_instruction: str, user_content: str) -> Optional[str]
await embed_text(text: str) -> Optional[List[float]]   # 768-dim
```

**SDK:** `google.genai` (package `google-genai`). The deprecated `google.generativeai` was removed.

| Constant | Model | Purpose |
|----------|-------|---------|
| `MODEL_NAME` | `gemini-2.5-flash` | Narrative, translation, roles, recommendations |
| `MODEL_LITE` | `gemini-2.5-flash-lite` | In-function fallback |
| `EMBED_MODEL` | `gemini-embedding-001` | 768-dim embeddings (not text-embedding-004, deprecated 2026-01-14) |

### 4.4 TTS Pipeline

**Primary: YarnGPT** — splits at sentence boundaries (`YARNGPT_CHUNK_MAX=1900`), sequential chunks to avoid rate limits, concatenates MP3 bytes.

**Resilient chunk fallback:** YarnGPT failure on a chunk → retry that chunk with OpenAI TTS. Both fail → skip chunk (not whole story). Returns `None` only when zero chunks succeeded.

| Language | YarnGPT Voice | OpenAI Fallback |
|----------|--------------|-----------------|
| English (`en`) | `emma` | `onyx` |
| Yoruba (`yo`) | `idera` | `nova` |
| Hausa (`ha`) | `zainab` | `shimmer` |
| Igbo (`ig`) | `osagie` | `alloy` |
| Nigerian Pidgin (`pcm`) | `wura` | `echo` |

**Pre-generation batch:** `BackgroundTask` after first story fetch. Translates + TTS all 5 languages (`PRELOAD_LANGUAGES`), upserts to Supabase `story_content`. Semaphore: `BATCH_STORY_CONCURRENCY=4`.

### 4.5 Translation Pipeline

`translation_service.py` uses Gemini with language-specific system prompts. Before storing, `_STAGE_DIRECTION_PATTERNS` strips AI-generated performance cues (`[pause]`, `(music)`, etc.) from translated text.

### 4.6 Caching & Scheduling

**Upstash Redis keys:**
- `narvo:news:all` — full feed (TTL 120s)
- `narvo:aggregator:*` — Mediastack/NewsData.io
- `narvo:briefing:*` — today's briefing

**QStash cron verification** (`lib/qstash_verify.py`): HMAC-SHA256 signing with rotation key support. Dev fallback: `QSTASH_CRON_SECRET` header.

### 4.7 Recommendations Engine

Three signals: (1) collaborative filtering on last 100 listening rows with age-decay, (2) Gemini topic expansion from user profile, (3) Upstash Vector semantic boost (`SEMANTIC_BOOST=25.0`) for vector-similar articles.

### 4.8 Morning Briefing

1. Pull top N cached stories
2. Gemini curates and orders for broadcast
3. Generate full script (intro + N story blocks + outro)
4. `_strip_story_numbering()` removes "Story 1:" prefixes
5. `_compute_story_segments()` calculates char offsets → enables seek-to-story
6. OpenAI TTS generates full-script audio
7. Store in Supabase, expose via `GET /api/briefing/latest`

### 4.9 Authentication & Security

- **JWT auth:** `lib/auth.py` decodes Supabase JWT. Authenticated routes use `Depends` — never trust caller-supplied `user_id` in path/query.
- **Supabase RLS:** All user tables (bookmarks, listening_history, preferences, offline articles) have RLS via `auth.uid()`.
- **Rate limiting:** Upstash Ratelimit. Currently: `/api/tts/`, `/api/factcheck/`, `/api/notifications/`. **Gap:** needs expansion (see §8).
- **Service-role key:** Backend only. Never exposed to frontend.

---

## 5. Frontend Architecture — Next.js 15

### 5.1 App Shell

Root layout (`app/layout.tsx`) loads fonts via `next/font/google`, mounts global providers and `AudioPlayer`.

```
ThemeProvider
  └─ NarvoClientBootstrap        ← analytics, session restore
      └─ AudioPlayerProvider
           └─ OfflineDownloadProvider
                └─ {children}
                └─ AudioPlayer   ← persistent, always mounted
```

**Authenticated page structure** (`AuthenticatedAppShell`):
```
min-h-screen flex
  ├─ NarvoNotificationBootstrap
  ├─ NarvoFeatureTutorial
  ├─ DesktopRail (hidden mobile, lg:ml-[4.5rem] xl:ml-[15.5rem])
  ├─ AppUniversalHeader
  ├─ <page content> (pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))])
  └─ MobileNavDock (md:hidden, floating pill)
```

**Route protection:** `middleware.ts` checks `narvo_demo_session` cookie. Unauthenticated → redirect to `/auth?next=...`.

**Primary shell links:** `components/app/nav-items.ts` — dock and desktop rail use Home (`/dashboard`), Listen, Discover, Library; Settings stays a separate trailing control. `/briefing` and `/search` remain first-class routes (entry from feed, library, listen hub, and header search).

### 5.2 API Client

**Public reads:** `lib/narvo-api.ts` → base URL from `NEXT_PUBLIC_NARVO_API_URL` or `NEXT_PUBLIC_BACKEND_URL`. Throws `NarvoApiError` on non-ok responses.

**Authenticated ops:** `lib/me-api.ts` → sends `Authorization: Bearer <token>` via `lib/narvo-session.ts`. All user-scoped operations go through `/api/me/*` only.

**All user-facing strings:** `lib/narvo-app-copy.ts` COPY object. Never hardcode English strings inline.

### 5.3 Audio System

`AudioPlayerContext.tsx` is the single source of truth.

**Track resolution order:**
1. IndexedDB blob URL (instant, offline)
2. In-memory AudioContext URL
3. Backend `/api/news/{id}` → `audio_by_lang[language]`
4. Error state

**Features:** Queue with auto-advance, Media Session API (lock-screen controls, hardware keys), playback rate/volume/mute persisted to preferences.

### 5.4 Audio Cache (IndexedDB)

```
Database:  narvo_audio_cache  (DB_VERSION = 3)
Store:     audio_files         keyPath: story_id
```

Schema: `{ story_id, audioBlob, audio_url, title, source, duration, type, size, cached_at }`

**Eviction policy** (runs after each write): TTL 7 days, max 100 items, max 200MB. Oldest entries evicted first.

### 5.5 Audio Prefetch

Viewport-intersection hook (`useAudioPrefetch`) watches cards entering viewport. `prefetchAndCacheStory()` called on entry; in-flight deduplication via `Set<string>`. Bookmarks pre-warmed on mount (sequential, not concurrent).

### 5.6 Service Worker & PWA

`public/sw.js` — cache name: `narvo-v5`. Strategy: cache-first for static assets, network-first for API.

**Critical guard:** All cross-origin requests skipped unconditionally (`if (url.origin !== self.location.origin) return`).

**Background Sync:** Bookmark saves and listening history replayed when connectivity returns. `trimCache()` evicts oldest entries when cache exceeds 150 items.

### 5.7 Internationalisation

5 locale files: `en.json · yo.json · ha.json · ig.json · pcm.json`. UI language driven by `broadcastLanguage` in AudioContext, also controls TTS voice selection.

### 5.8 Theme System

`ThemeProvider` sets `class="dark"` on `<html>`. Tailwind `dark:` prefix used throughout. CSS vars: `--bg-primary`, `--bg-card`, `--text-primary`, `--border-primary` adapt per theme.

---

## 6. Data Model

### Supabase Tables

**`story_content`**
```sql
story_id        TEXT PRIMARY KEY          -- SHA-1(title[:120].lower())
title           TEXT
short_summary   TEXT
narrative       TEXT                      -- 600-1200w broadcast narrative, English
key_takeaways   JSONB                     -- string[]
translations    JSONB  DEFAULT '{}'       -- {yo: {short_summary, narrative, key_takeaways}, ...}
audio_by_lang   JSONB  DEFAULT '{}'       -- {en: "data:audio/mpeg;base64,...", yo: ..., ...}
sources_used    JSONB                     -- source attribution
trust_scoring   JSONB                     -- truth tag data
created_at      TIMESTAMPTZ
updated_at      TIMESTAMPTZ
```

**`listening_history`**
```sql
id          UUID PRIMARY KEY DEFAULT gen_random_uuid()
user_id     UUID REFERENCES auth.users
story_id    TEXT
title       TEXT
source      TEXT
category    TEXT
played_at   TIMESTAMPTZ DEFAULT now()
```

**`bookmarks`**
```sql
id, user_id, story_id, title, summary, source, category, created_at
```

**`user_preferences`**
```sql
user_id, broadcast_language, voice_model, playback_rate, theme, auto_play
```

**`push_subscriptions`**
```sql
user_id, endpoint, p256dh, auth, created_at
```

**`scraped_articles`** (migration 20260401)
```sql
url TEXT PRIMARY KEY, content TEXT, extracted_at TIMESTAMPTZ, quality_score FLOAT
```

### Canonical Story Packet

Every story delivered to product surfaces resolves to:

```
story_id · title · short_summary · narrative · key_takeaways · category · published_at
source_packet · truth_tag · translations · audio_by_lang
```

### Truth Tag Packet

```
source_count · trusted_source_count · source_diversity_score
external_factcheck_status · confidence_score · explanation · evidence_links
```

---

## 7. MVP API Contract

### Public MVP Surface (narrow — keep this way)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/news` | Feed list — lightweight, no regeneration |
| GET | `/api/news/breaking` | Breaking stories for dashboard |
| GET | `/api/news/{story_id}` | Canonical story packet (narrative + truth + audio) |
| GET | `/api/briefing/latest` | Most recent ready Morning Briefing |
| POST | `/api/briefing/generate` | Trigger generation or return today's briefing |
| GET | `/api/briefing/{date}` | Historical briefing by date |
| GET | `/api/me/preferences` | Authenticated — user preferences |
| PUT | `/api/me/preferences` | Authenticated — update preferences |
| GET | `/api/me/bookmarks` | Authenticated |
| POST | `/api/me/bookmarks` | Authenticated |
| DELETE | `/api/me/bookmarks/{story_id}` | Authenticated |
| GET | `/api/me/offline` | Authenticated |
| POST | `/api/me/offline` | Authenticated |
| DELETE | `/api/me/offline/{story_id}` | Authenticated |
| GET | `/api/voices` | Canonical voice list — use `/api/tts/voices` (deprecate `/api/news/voices`) |
| GET | `/api/share/{story_id}` | Share URL + Open Graph metadata |

### Known Mismatches to Resolve

| Issue | Current | Expected |
|-------|---------|----------|
| Briefing generate method | `GET /api/briefing/generate` | `POST /api/briefing/generate` |
| Voice endpoint duplicate | Both `/api/tts/voices` and `/api/news/voices` exist | Consolidate on one |
| Analytics IDOR | `GET /api/analytics/{user_id}` has no JWT check | Add `Depends` or remove |
| Legacy settings overlap | `/api/settings/{user_id}` duplicates `/api/me/*` | Deprecate toward `/api/me/settings` |

### Out of MVP Scope (backend)

Podcasts · radio · public partner APIs · subscriptions/billing · advanced personalization · narrative duel/paraphrase tooling · public aggregator controls · broad cross-media search.

---

## 8. Security Requirements

### Critical — Fix First

**1. Caller-supplied `user_id` IDOR.** Backend uses service-role key that bypasses RLS. Routes that accept `user_id` from the path/query string (not from JWT) allow one user to read or write another's data.

- All authenticated user-data routes must derive identity from `request.state.user_id` (JWT only).
- Routes to audit: `me.py`, `settings.py`, `health.py` (`/api/analytics/{user_id}` — confirmed no auth check).
- Remove `"guest"` as a hidden authorization mode.

**2. Rate limiting too narrow.** Currently only `/api/tts/`, `/api/factcheck/`, `/api/notifications/`. Must expand to include at minimum: briefing generation, translation, search, share, push subscription.

**3. Rate limiter fails open.** If Upstash fails, traffic passes through. High-cost endpoints (TTS generation) must fail closed or degrade safely rather than fail open.

### Required Controls by Domain

**Identity & Authorization:**
- JWT-only identity on all user-scoped routes
- Admin authorization check on any route reading/writing another user's data
- Document which routes are guest-safe vs. authenticated vs. admin vs. cron-only

**Supabase & RLS:**
- Every user-owned table: RLS enabled + correct `auth.uid()` policies
- Service-role key: backend only, never frontend
- Written policy audit for every table before new migrations deploy

**API Exposure:**
- Cron endpoints: QStash `Depends` required
- Remove/deprecate legacy endpoints once authenticated replacement exists
- Push subscription: single authenticated route only (remove legacy unauthenticated endpoint)

**Input Validation:**
- Maximum text length on TTS, translation, paraphrase payloads
- Reject oversized payloads before any provider call
- Validate `language`, `voice`, `mode` against allowlists

**Secrets:**
- `SUPABASE_SERVICE_ROLE_KEY`, `VAPID_PRIVATE_KEY`, `QSTASH_*` keys: backend only
- No provider API keys in frontend env vars or logs
- Rotation checklist for service-role, VAPID, QStash, and AI-provider credentials

**Spend Protection:**
- Set budget caps and threshold alerts for OpenAI, Gemini, YarnGPT, Supabase, Upstash
- Monitor TTS and fallback usage separately
- Alert on abnormal 429 spikes or TTS volume spikes

### Security Hardening Execution Order

1. Fix identity trust bugs (caller-supplied `user_id`)
2. Lock down expensive endpoints (TTS, translation, briefing, search, share)
3. Consolidate duplicate/legacy endpoints
4. Expand and classify rate limiting (per-IP and per-user, fail-open vs fail-closed rules)
5. Add spend controls and alerts
6. Add security regression tests — especially cross-user access: "User A authenticates, passes User B's ID, cannot read/write User B's data."

---

## 9. Environment Variables

### Backend (`.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google AI Studio |
| `SUPABASE_URL` | Yes | Supabase project URL |
| `SUPABASE_SERVICE_KEY` | Yes | Service role key (bypasses RLS — backend only) |
| `UPSTASH_REDIS_REST_URL` | Yes | Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Yes | Redis auth token |
| `YARNGPT_API_KEY` | Yes | YarnGPT TTS |
| `QSTASH_SIGNING_KEY` | Yes (prod) | QStash HMAC signing |
| `OPENAI_API_KEY` | No | TTS fallback |
| `QSTASH_NEXT_SIGNING_KEY` | No | Key rotation backup |
| `UPSTASH_VECTOR_REST_URL/TOKEN` | No | Semantic recommendations |
| `VAPID_PRIVATE_KEY` | No | Web push |
| `VAPID_PUBLIC_KEY` | No | Web push |
| `VAPID_CLAIMS_EMAIL` | No | Web push |
| `MEDIASTACK_API_KEY` | No | Aggregator |
| `NEWSDATA_API_KEY` | No | Aggregator |
| `GOOGLE_FACT_CHECK_API_KEY` | No | Fact Check Tools |
| `SENTRY_DSN` | No | Backend Sentry |
| `ALLOWED_ORIGINS` | No | Comma-separated CORS origins |
| `SUPABASE_TIMEOUT` | No | DB query timeout (default 10s) |

### Frontend (`.env.local`)

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_NARVO_API_URL` | No | API base. Leave unset in dev (proxy). Set for Vercel. |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon key (safe to expose) |
| `NEXT_PUBLIC_SENTRY_DSN` | No | Frontend Sentry |

**Never** set `NEXT_PUBLIC_NARVO_API_URL=https://api.narvo.news` in local `.env` — causes CORS from localhost. Use `.env.local` only.

---

## 10. Infrastructure & Deployment

### Backend — Google Cloud Run

- Docker container built via `cloudbuild.yaml`: build → Artifact Registry → Cloud Run deploy on push to `main`
- `entrypoint.sh` runs `uvicorn server:app --host 0.0.0.0 --port $PORT`
- Auto-scales to zero; keep-alive via QStash `/ping` or Cloud Scheduler

### Frontend — Vercel

- Auto-deploy on push to `main`
- Preview deployments on PRs
- `NEXT_PUBLIC_NARVO_API_URL` set to `https://api.narvo.news` in Vercel env vars
- Build output: `build/` (configured as `distDir` in `next.config.ts`)

### Local Development

```bash
# Backend
cd backend && pip install -r requirements.txt && cp .env.example .env
uvicorn server:app --host 0.0.0.0 --port 8000

# Frontend (Next.js)
cd frontend && npm install && npm run dev   # → http://localhost:3000
# No NEXT_PUBLIC_NARVO_API_URL needed — next.config.ts proxies /api to localhost:8000
```

---

## 11. Key Constants & Tunables

| Constant | File | Value | Purpose |
|----------|------|-------|---------|
| `YARNGPT_CHUNK_MAX` | yarngpt_service.py | `1900` | Max chars per YarnGPT request |
| `OPENAI_CHUNK_MAX` | yarngpt_service.py | `4000` | Max chars per OpenAI TTS request |
| `MIN_CONTENT_CHARS` | article_scraper_service.py | `150` | Min chars to accept from scraper |
| `SOURCE_CONTENT_MAX` | narrative_service.py | `6000` | Max chars per source to Gemini |
| `BATCH_STORY_CONCURRENCY` | story_content_service.py | `4` | Semaphore for pre-generation |
| `NEWS_CACHE_TTL` | news_service.py | `120` | Redis feed cache TTL (seconds) |
| `PRELOAD_LANGUAGES` | story_content_service.py | `[en, yo, ha, ig, pcm]` | Pre-generated languages per story |
| `VECTOR_UPSERT_BATCH_LIMIT` | recommendation_service.py | `100` | Max vector upserts per cycle |
| `SEMANTIC_BOOST` | recommendation_service.py | `25.0` | Score bonus for vector-similar stories |
| `DB_VERSION` | audioCache.ts (frontend) | `3` | IndexedDB schema version — bump on schema changes |
| `CACHE_NAME` | sw.js | `narvo-v5` | SW cache name — bump on deploy |
| `MODEL_NAME` | llm_gemini.py | `gemini-2.5-flash` | Primary Gemini model |
| `MODEL_LITE` | llm_gemini.py | `gemini-2.5-flash-lite` | Gemini fallback |
| `EMBED_MODEL` | llm_gemini.py | `gemini-embedding-001` | 768-dim embeddings |
| `EMBED_DIMENSION` | llm_gemini.py | `768` | Must match Upstash Vector index dimension |

---

## 12. Decisions Log

### 2026-04 — Full UI revamp complete (Milestones A–D)

All four milestones of the UI/UX revamp workflow are complete. Key deliverables:

**Player:** `AudioPlayer.tsx` now has a full-screen expanded sheet with interactive `TimeScrubber` (pointer-capture draggable, keyboard-accessible), cross-browser fullscreen + iOS immersive mode, mute toggle with pre-mute volume memory, volume range input, skip-to-next (queue), clear-queue, real elapsed/remaining time display, speed selector (0.75×–2×). `AudioPlayerContext` gained `playbackRate`, `volume`, `seekToRatio`, `enqueueTrack`, `removeFromQueueAt`, `clearPlayQueue`, `skipToNext`, `currentTimeSec`, `durationSec`. `lib/player-routes.ts` determines when track info should link to `/news/:id`.

**Briefing transcript seek:** `briefing_service.py` `_compute_story_segments()` stores `story_segments` (`start_char` + `length`) in Supabase. Frontend `buildBriefingTranscriptBlocks()` renders clickable segment blocks; `handleTranscriptSegmentSeek` converts `startChar / scriptLen` to a seek ratio and calls `seekToRatio()`.

**Discover:** Three-tab layout (Stories / Radio / Podcasts). `RadioStationCard` and `PodcastCard` in `components/discover/`. Backend `radio_service.py` and `podcast_service.py` added.

**Insights:** `StatTile` components (time listened, streak, stories, favourite category) from `aggregateListeningInsights()`. `ListeningTrendChart` — 7-day CSS bar chart. Individual entry deletion via `deleteMyListeningHistoryEntry`. Realtime via `useListeningHistoryRealtime`.

**Settings:** Reorganised to account / voice / billing / preferences / accessibility tabs. `SaveStateFeedback` inline sync-state indicator. Theme persistence and display toggles (`high_contrast`, `reduced_motion`) via `lib/narvo-ui-persistence.ts`. `writeDisplayToggles` applies `narvo-high-contrast` / `narvo-reduced-motion` classes to `document.documentElement`. Billing portal and subscription checkout wired.

**New primitives:** `Skeleton.tsx` (StoryCardSkeleton, ListRowSkeleton, FeedSkeleton, BriefingSkeleton), `Toast.tsx` (ToastProvider + `useToast` hook), `ToggleRow.tsx` + `SelectRow.tsx`, `QueueItem.tsx`, `BreakingBanner.tsx`.

**Supabase realtime:** `useUserTableRealtime` generic hook subscribes to `postgres_changes` filtered by `user_id=eq.{uid}`. Migrations 005/006 add `listening_history`, `bookmarks`, `offline_articles`, `user_preferences` to `supabase_realtime` publication. DELETE RLS policy added for `listening_history`.

**TruthTag:** `mixed` state added (Soft Butter). `unverified` resolves to `mixed`. **SourceTimeline:** role-coloured dots (teal = PRIMARY, butter = SUPPORTING, vermilion/alert = CONTEXT) from `assign_source_roles()` backend field.

**ThemeProvider:** now exports `useTheme()` with `{ theme, resolvedTheme, setThemeChoice, toggleTheme }`. `resolvedTheme` resolves `system` via `prefers-color-scheme`.

### 2026-04 — Frontend migrated to Next.js 15 App Router
Old Vite/React (`frontend/src/`) replaced by Next.js 15 (`frontend/app/`). Tailwind v4 `@theme` replaces CSS vars-only approach. `motion` replaces `framer-motion`. Lucide replaces Phosphor Icons. Route protection via `middleware.ts` cookie check. Build output remains `build/` via `distDir` in `next.config.ts` for Vercel compatibility.

### 2026-04 — llm_groq.py added (Groq LLM provider)
Ultra-fast inference available as fallback or supplement to Gemini for latency-sensitive paths.

### 2026-04 — me.py replaces user.py
All authenticated user-state endpoints (`/api/me/*`) consolidated in `routes/me.py`. Legacy `routes/user.py` deleted. JWT-derived identity only — no caller-supplied `user_id`.

### 2026-03 — Gemini SDK migration: google.generativeai → google.genai
`google.generativeai` is end-of-life. Migrated to `google.genai` (package `google-genai`). All Gemini calls now work. Model: `gemini-2.5-flash` (was `gemini-1.5-flash`). Embedding model: `gemini-embedding-001` 768-dim (was `text-embedding-004`, deprecated 2026-01-14).

### 2026-03 — Upstash Vector dimension: 768 not 1536
`gemini-embedding-001` outputs 768-dim. Index must be created with dimension 768. Error `Invalid vector dimension: 768, expected: 1536` means the index was created with 1536. Fix: recreate index with 768. Do not change app to 1536.

### 2026-03 — TTS chunk fallback (per-chunk, not per-story)
YarnGPT failure on a chunk → retry that chunk with OpenAI TTS. Both fail → skip chunk, continue. Returns partial audio rather than aborting. Prevents full story loss from a single API error.

### 2026-03 — SW cross-origin guard
Previous SW incorrectly allowed cross-origin `/api/*` through the cache. Fix: `if (url.origin !== self.location.origin) return` — all cross-origin requests skipped unconditionally. Cache bumped to `narvo-v5`.

### 2026-03 — IndexedDB audio cache eviction
`evictStaleEntries()` runs after each `downloadAndCacheAudio()` write. Policy: TTL 7 days, max 100 items, max 200MB. Prevents unbounded storage growth.

### 2026-03 — server.py decomposition: 2194 → 266 lines
60 inline routes extracted into 8 modules: tts, settings, notifications, content, aggregators, search, health, share. server.py now contains only: app creation, middleware, CORS, router registration, ping/docs/root, startup/shutdown.

### 2026-03 — Vite proxy: no NEXT_PUBLIC_NARVO_API_URL needed in dev
Vite/Next proxies `/api/*` to `localhost:8000` by default. Never set the API URL to production in local `.env` — causes CORS from localhost. Use `.env.local` to override.
