# Stack Analysis — Free MVP Recommendations

> **Series:** Narvo B2C Revamp Research · Document 01 of 05  
> **Date:** March 2026  
> **Scope:** Current stack audit, free-tier alternatives, and recommended configuration for MVP operation under $50/month

---

## Table of Contents

1. [Current Stack Assessment](#1-current-stack-assessment)
2. [TTS — Text-to-Speech](#2-tts--text-to-speech)
3. [AI Narrative Synthesis](#3-ai-narrative-synthesis)
4. [Background Job Scheduling](#4-background-job-scheduling)
5. [Caching Layer](#5-caching-layer)
6. [Database and Auth](#6-database-and-auth)
7. [Push Notifications](#7-push-notifications)
8. [Error Monitoring](#8-error-monitoring)
9. [Analytics](#9-analytics)
10. [Search](#10-search)
11. [Deployment](#11-deployment)
12. [MVP Cost Summary](#12-mvp-cost-summary)
13. [Recommended Configuration Table](#13-recommended-configuration-table)

---

## 1. Current Stack Assessment

Narvo's existing stack is production-grade and well-chosen for a solo founder. The architecture is sound. The goal of this audit is not to rebuild — it is to identify where free tiers can be extended, where strategic upgrades deliver outsized value, and where current tools may present scaling bottlenecks.

| Layer | Current Tool | Assessment |
|-------|-------------|------------|
| Frontend | React + Vite + TypeScript + Tailwind v4 | ✅ Optimal — no change needed |
| Backend | FastAPI (Python) | ✅ Solid — keep |
| Database | Supabase (Postgres) | ✅ Keep — generous free tier, already integrated |
| Auth | Supabase Auth | ✅ Keep — zero extra cost |
| AI Synthesis | Google Gemini | ⚠️ Free tier reduced — dual-provider strategy recommended |
| TTS (Primary) | YarnGPT | ✅ Keep as primary — self-host the open-source model |
| TTS (Fallback) | OpenAI TTS | ⚠️ Has per-character cost — replace with Google Cloud TTS free tier |
| Job Scheduling | QStash / Upstash | ⚠️ Limited free tier — Cloud Scheduler already on GCP, use it |
| Caching | Upstash Redis | ⚠️ Evaluate in-memory alternatives for MVP |
| Deployment (FE) | Vercel | ⚠️ 100GB bandwidth limit — Cloudflare Pages has unlimited bandwidth |
| Deployment (BE) | Google Cloud Run | ✅ Keep — 2M requests/month free, scale-to-zero |
| Error Monitoring | Sentry | ✅ Keep — 5K errors/month free, excellent SDK |
| Observability | Sentry | ✅ Adequate for MVP |

**Net assessment:** The stack is strong. The primary optimisation opportunities are (1) AI synthesis redundancy, (2) OpenAI TTS cost elimination, (3) frontend bandwidth costs, and (4) job scheduling simplification by leveraging GCP infrastructure already in use.

---

## 2. TTS — Text-to-Speech

TTS is Narvo's most distinctive technical asset. The pipeline must support Nigerian English, Pidgin, Yorùbá, Hausa, and Igbo with authentic accents. No general-purpose TTS provider covers this requirement.

### Primary: YarnGPT (Self-Hosted)

**What it is:** Open-source Nigerian TTS trained on Nollywood audio and Nigerian podcasts. Created by Saheed Niyi, a UNILAG student. Currently the only TTS with authentic Nigerian accent support across 5 languages.

**Self-hosting approach:**
- Model available on HuggingFace: `saheedniyi/YarnGPT2`
- Deploy on a Cloud Run instance with GPU, or on a separate small VM
- Self-hosting eliminates per-request API costs entirely
- Supports: Nigerian English, Yoruba, Hausa, Igbo, Pidgin (16 voices total)

**Cost:** $0 (open-source, MIT license)

### Secondary: Meta MMS (Massively Multilingual Speech)

**What it is:** Meta's open-source TTS system supporting **336 African languages** via single-speaker VITS models. Covers languages that YarnGPT does not.

- Available on HuggingFace: `facebook/mms-tts-*`
- Use for continental expansion beyond Nigeria's five launch languages
- Quality is functional but not as natural as YarnGPT for Nigerian-specific content

**Cost:** $0 (open-source)

### Fallback: Google Cloud TTS

**What it is:** Google's commercial TTS service with a dedicated Nigerian English voice (`en-NG`).

- **Free tier:** 1 million WaveNet characters/month
- Use as quality fallback when YarnGPT is unavailable or for specific voice profiles
- Nigerian English (`en-NG-Standard-A`, `en-NG-Wavenet-A`) available

**Cost:** Free up to 1M chars/month; $16/1M chars beyond

### Future Premium: ElevenLabs

- Starter plan at **$5/month** (30K credits)
- Industry-best voice cloning: capture a Nigerian voice once, synthesize indefinitely
- Recommended when Narvo moves to subscriber voice personalisation features

### Decision

```
YarnGPT (self-hosted) → primary for all Nigerian-language content
Meta MMS → continental expansion beyond launch languages
Google Cloud TTS (en-NG) → fallback for YarnGPT failures
ElevenLabs → future: subscriber voice personalisation
```

---

## 3. AI Narrative Synthesis

### Current: Google Gemini

Gemini's free tier has been revised (as of Q1 2026):
- Flash-Lite: **1,000 requests/day**
- Flash 2.0: **500 requests/day**
- Pro: **50 requests/day**

At 1,000 RPD, Gemini Flash-Lite supports approximately 300–500 article synthesis operations per day on the free tier. This is tight for production traffic.

**Recommendation:** Add Groq as a co-primary provider with automatic failover.

### Add: Groq (Free Tier)

**What it is:** Ultra-fast LLM inference with a very generous free tier.

- **Free tier:** 500K tokens/day (LLaMA 3.3 70B), 14,400 requests/day
- **Inference speed:** 394–1,000 tokens/second — significantly faster than Gemini
- **Model quality:** LLaMA 3.3 70B is production-quality for news summarisation tasks
- **Use case:** Primary synthesis engine during high-traffic periods; failover when Gemini rate-limits

**Cost:** $0 (free tier sufficient for MVP)

### Add: Cloudflare Workers AI (Edge)

- **Free tier:** 10,000 neurons/day
- Deployed across 250+ PoPs including African edge nodes
- Reduces latency for Nigerian users vs. centralised API calls
- Use for lightweight summarisation tasks (headlines, captions, short summaries)

**Cost:** $0

### Dual-Provider Strategy

```python
# Priority order for synthesis
# 1. Groq (fast, generous free tier)
# 2. Gemini Flash-Lite (quality, backup)
# 3. Cloudflare Workers AI (edge, lightweight tasks)
```

Implement with `tenacity` retry logic (already in the codebase) across providers. Store provider-specific rate limit counters in Redis/in-memory cache.

---

## 4. Background Job Scheduling

### Current: QStash (Upstash)

QStash is excellent but its free tier (500 messages/day) is modest. The primary use case in Narvo is the **5AM Morning Briefing pre-generation** — a daily cron job that should run reliably regardless of traffic.

### Recommended: Google Cloud Scheduler

Narvo's backend is already on **Google Cloud Run**. Cloud Scheduler is part of the same GCP project:

- **Free tier:** 3 cron jobs free forever
- Triggers Cloud Run HTTP endpoints directly
- No separate service to manage
- Already within Narvo's existing GCP infrastructure

**Migration:** Replace QStash cron triggers with Cloud Scheduler → Cloud Run HTTP calls. Keep QStash for message queuing if needed (it excels at that), but remove the cron dependency.

### For Task Queues: python-rq

For background task queuing beyond cron (e.g. async TTS generation, batch article processing):

- `python-rq` is a Redis-backed task queue for Python
- Pairs with any Redis instance (or in-process for development)
- Simple, well-documented, zero licensing cost
- Already compatible with FastAPI async patterns

**Cost:** $0

---

## 5. Caching Layer

### Current: Upstash Redis

Upstash Redis free tier provides 10,000 commands/day with a 256MB database. This is adequate for early MVP but can become a bottleneck.

### MVP Phase: In-Memory with `cachetools`

For MVP scale, Python's `cachetools` library with TTL caches eliminates the external Redis dependency entirely:

```python
from cachetools import TTLCache
news_cache = TTLCache(maxsize=500, ttl=300)  # 5-minute TTL
```

- Zero external network calls for cache lookups
- Suitable for Cloud Run single-instance deployments
- Upgrade path: swap to Redis when horizontal scaling is needed

### Growth Phase: Momento Serverless Cache

When in-memory is insufficient:
- **Free tier:** 5GB transfer/month, no upfront capacity
- Serverless billing — pay only for what you use
- Drop-in SDK replacement for Redis patterns

**Cost:** $0 (free tier) → usage-based

---

## 6. Database and Auth

### Current: Supabase — Keep

Supabase's free tier is highly generous for an MVP:
- 500MB database storage
- 50,000 monthly active users
- Unlimited API requests
- Auth with social providers, magic links, OTP
- Realtime subscriptions (used for social features)
- Built-in pgvector for embedding search

**Decision:** No change. Supabase is the correct choice through MVP and well into growth phase.

### Future Alternative: Turso (for specific workloads)

- **Free tier:** 5GB storage (10× Supabase), 500 databases
- SQLite-at-edge architecture — read replicas in Lagos, London, New York
- Ideal for read-heavy news feed queries with low-latency requirements
- Lacks built-in auth — would require Supabase Auth or Clerk alongside

**Decision:** Not needed at MVP. Evaluate at 10K+ MAU when read latency becomes a constraint.

---

## 7. Push Notifications

### Current: VAPID / pywebpush

The current VAPID implementation is functional but lacks a management dashboard, segmentation, and analytics. Debugging delivery failures is difficult.

### Recommended: OneSignal (Free Tier)

- **Free tier:** Unlimited push subscribers, unlimited sends
- Web push, in-app messaging, email, and SMS from one platform
- Segmentation, A/B testing, and delivery analytics — all free
- REST API for programmatic sends from FastAPI
- Dashboard for inspecting delivery rates and failures

**Migration effort:** Low — replace pywebpush calls with OneSignal REST API. Supabase stores the OneSignal player ID per user instead of raw VAPID keys.

**Cost:** $0

---

## 8. Error Monitoring

### Current: Sentry — Keep

Sentry's free tier is well-suited to MVP:
- **5,000 errors/month** across all projects
- Performance monitoring (transactions)
- Source map support for frontend
- Python + JavaScript SDKs already integrated

**Decision:** No change. Upgrade to Team plan ($26/month) when error volume exceeds 5K/month.

### Alternative: GlitchTip (Self-Hosted)

If Sentry costs become a concern:
- Open-source Sentry-compatible alternative
- Self-host on a small Cloud Run instance (~$5/month)
- Sentry SDK works without modification

---

## 9. Analytics

### Current: None documented (Vercel Analytics referenced conditionally)

Vercel Analytics is page-view based and lacks user-level event tracking needed for a news app (plays, bookmarks, language switches, briefing opens).

### Recommended: Mixpanel (Free Tier)

- **Free tier: 20 million events/month** — the most generous in the category
- Full funnel analysis, retention cohorts, A/B experiment results
- React SDK: `mixpanel-browser` — 2KB gzipped
- Event properties support custom data (story ID, language, voice, category)
- Shareable dashboards for investor reporting

**Key events to track:**
```
story_viewed, story_played, story_completed, story_bookmarked,
briefing_opened, briefing_completed, language_changed,
voice_changed, offline_download, truth_tag_viewed,
onboarding_step_completed, subscription_started
```

### Alternative: PostHog (Self-Hosted)

- Open-source product analytics with session recording
- Self-host on Cloud Run for zero ongoing cost
- More complex setup than Mixpanel

**Decision:** Mixpanel free tier for MVP. Evaluate PostHog self-hosted at growth stage.

---

## 10. Search

### Current: Supabase (Postgres FTS + pgvector)

Supabase's built-in full-text search and pgvector extension handle both keyword and semantic search. This is already configured in the codebase.

### Add: Orama (Client-Side)

For **offline search** — a PWA requirement when users have no connectivity:

- `orama` is a fully client-side, TypeScript-native search engine (~15KB)
- Index story titles/summaries in the browser using IndexedDB
- Search works with zero network requests
- Sync the index from Supabase on connectivity restoration

**Cost:** $0 (open-source)

### Future: Algolia / Typesense

At scale (50K+ stories):
- **Algolia:** 10K operations/month free; industry-standard relevance
- **Typesense Cloud:** $15/month; open-source, fast, self-hostable
- Evaluate when Postgres FTS relevance quality becomes insufficient

---

## 11. Deployment

### Backend: Google Cloud Run — Keep

Already configured, scale-to-zero, 2M requests/month free. No change needed.

### Frontend: Consider Cloudflare Pages

**Current:** Vercel — 100GB bandwidth/month on free tier  
**Alternative:** Cloudflare Pages — **unlimited bandwidth, unlimited requests**

At 10K daily active users each loading ~2MB of assets, Vercel's 100GB/month limit is reached in ~50 days. Cloudflare Pages removes this ceiling entirely.

**Migration effort:** Low — build output is identical (Vite static bundle). Update DNS and deployment webhook.

**Other benefits:**
- Cloudflare Workers for edge middleware
- 40+ African PoPs for Nigerian users
- R2 storage for static assets (10GB free, zero egress cost)

**Decision:** Migrate frontend to Cloudflare Pages before reaching 10K DAU.

---

## 12. MVP Cost Summary

Assuming ~1,000 MAU, ~50 daily synthesis operations, and ~500 daily audio plays:

| Service | Current Cost | Optimised Cost | Savings |
|---------|-------------|----------------|---------|
| TTS (YarnGPT self-hosted) | ~$0 (API) | ~$0 (self-hosted) | $0 |
| TTS fallback (OpenAI → Google) | ~$5–20/month | $0 (1M chars free) | ~$10–20 |
| AI Synthesis (Gemini + Groq) | ~$0 (free) | $0 (dual free tier) | $0 |
| Job Scheduling (QStash → Cloud Scheduler) | ~$0–10/month | $0 (GCP free) | ~$5–10 |
| Push Notifications (pywebpush → OneSignal) | $0 | $0 | $0 |
| Analytics (none → Mixpanel) | $0 | $0 | N/A |
| Sentry | $0 (free tier) | $0 (free tier) | $0 |
| Supabase | $0 (free tier) | $0 (free tier) | $0 |
| Cloud Run | $0 (free tier) | $0 (free tier) | $0 |
| Vercel (→ Cloudflare Pages) | $0–20/month | $0 (unlimited BW) | ~$0–20 |
| **Total** | **~$5–50/month** | **~$0–5/month** | **~$45/month** |

---

## 13. Recommended Configuration Table

| Category | MVP Tool | Free Limit | Upgrade Path |
|----------|----------|------------|-------------|
| TTS (Nigerian) | YarnGPT self-hosted | Unlimited | ElevenLabs at $5/month for voice cloning |
| TTS (Indigenous) | Meta MMS | Unlimited | No change — 336 languages |
| TTS (Fallback) | Google Cloud TTS | 1M chars/month | Standard tier beyond |
| AI Synthesis | Groq + Gemini Flash-Lite | 500K tokens/day + 1K RPD | Gemini Pro / Claude API |
| Job Scheduling | Google Cloud Scheduler | 3 cron jobs | Cloud Tasks for advanced queuing |
| Task Queue | python-rq | Unlimited | Celery + Redis at scale |
| Caching | cachetools (in-memory) | RAM-limited | Momento → Redis at horizontal scale |
| Database | Supabase | 500MB, 50K MAU | Pro plan at $25/month |
| Auth | Supabase Auth | Included | Included |
| Push Notifications | OneSignal | Unlimited | Growth plan for advanced segmentation |
| Error Monitoring | Sentry | 5K errors/month | Team plan at $26/month |
| Analytics | Mixpanel | 20M events/month | Growth plan at $28/month |
| Search (server) | Supabase pgvector + FTS | Included | Typesense at $15/month |
| Search (offline) | Orama (client-side) | Unlimited | No change |
| Frontend Deploy | Cloudflare Pages | Unlimited BW | Workers paid for edge logic |
| Backend Deploy | Google Cloud Run | 2M req/month | Cloud Run jobs for batch |

---

*Next: [02 — Premium Tools Roadmap](./02_Premium_Tools_Roadmap.md)*
