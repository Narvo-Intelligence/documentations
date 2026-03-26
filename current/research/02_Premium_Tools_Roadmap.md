# Premium Tools Roadmap

> **Series:** Narvo B2C Revamp Research · Document 02 of 05  
> **Date:** March 2026  
> **Scope:** Paid and premium tools to adopt as Narvo scales beyond MVP — organised by growth phase and business function

---

## Table of Contents

1. [Phased Adoption Framework](#1-phased-adoption-framework)
2. [Payments and Monetisation](#2-payments-and-monetisation)
3. [Audio Delivery at Scale](#3-audio-delivery-at-scale)
4. [Personalisation Engine](#4-personalisation-engine)
5. [Social and Engagement Infrastructure](#5-social-and-engagement-infrastructure)
6. [Analytics and Product Intelligence](#6-analytics-and-product-intelligence)
7. [TTS at Scale](#7-tts-at-scale)
8. [AI Synthesis at Scale](#8-ai-synthesis-at-scale)
9. [Mobile App Distribution](#9-mobile-app-distribution)
10. [Premium Upgrade Decision Matrix](#10-premium-upgrade-decision-matrix)

---

## 1. Phased Adoption Framework

Not all premium tools are needed at launch. Adopting too many too early burns cash and engineering time. This document organises recommendations into three phases tied to Narvo's growth milestones.

| Phase | Trigger | Focus |
|-------|---------|-------|
| **MVP** | 0–1,000 MAU | Free stack only (see Doc 01) |
| **Growth** | 1,000–10,000 MAU | Payments, CDN, basic analytics |
| **Scale** | 10,000–100,000 MAU | Personalisation, social, advanced monitoring |
| **Platform** | 100,000+ MAU | Enterprise AI, ML infrastructure, B2B capabilities |

The tools in this document are mapped to the Growth and Scale phases.

---

## 2. Payments and Monetisation

### Primary: Paystack (Growth Phase — Day 1 if monetising)

Paystack is the non-negotiable choice for Nigeria. It is the infrastructure layer beneath PiggyVest, Flutterwave, and most Nigerian consumer apps.

**Why Paystack:**
- **1.5% + ₦100 per local transaction** — lowest fees in the Nigerian market
- Bank transfers, USSD, QR codes, Verve cards, Mastercard, Visa
- **USSD payment support** — critical for users without smartphones or data access
- Mobile Money via bank integrations
- Subscription billing with automatic retry logic
- Webhook-based payment confirmation (FastAPI-compatible)
- Acquired by Stripe in 2020 — robust compliance and fraud protection

**Integration points:**
- `POST /api/subscriptions/create` — initiate Paystack transaction
- Webhook endpoint: `POST /api/subscriptions/webhook` — handle payment events
- Store subscription status in Supabase `user_subscriptions` table
- Gate premium features via RLS policies tied to subscription status

**Pricing tiers recommended for Nigerian market** (informed by Nation Africa's micro-pricing success):

| Plan | Price | Billing | Target User |
|------|-------|---------|-------------|
| Daily Pass | ₦50/day (~$0.04) | USSD / bank transfer | Low-income, trial |
| Weekly | ₦200/week (~$0.15) | Any method | Commuters, students |
| Monthly | ₦500/month (~$0.38) | Card / transfer | Regular users |
| Annual | ₦4,000/year (~$3.00) | Card | Power users |
| Diaspora | $1.99/month | Card | International |

Nation Africa proved African audiences pay for quality digital content — 52,000 paid subscribers within 3 months — using micro-pricing via M-Pesa. Narvo should replicate this model with Paystack.

### Pan-African Expansion: Flutterwave

For markets beyond Nigeria:
- **1.4% per transaction** across 14+ African markets
- Mobile money: MTN Mobile Money, M-Pesa, Airtel Money, Zambia Kwacha, Ghana Cedis
- Ghana, Kenya, South Africa, Egypt, Rwanda
- Accept in 150+ currencies, settle in NGN, USD, GBP, EUR

**Decision:** Paystack as primary (Nigeria). Flutterwave as expansion layer for East/West/Southern Africa.

### Diaspora Web Subscriptions: Stripe (via Entity)

- Stripe is not available to Nigerian-registered entities directly
- Diaspora subscriptions (UK, US, Canada, Europe) can be processed via a registered UK/EU entity or through Paystack's global card processing
- If Narvo Intelligence registers a UK entity: use Stripe directly at standard rates (2.9% + $0.30)
- LemonSqueezy's 5% fee and lack of local payment methods make it unsuitable except as a last resort

### Subscription Management: RevenueCat

When Narvo launches native iOS/Android apps:
- **Free:** Up to $2,500 monthly tracked revenue
- Manages Apple App Store and Google Play subscription lifecycle automatically
- Handles grace periods, billing retry, refunds, and entitlement validation
- Cross-platform: web (Paystack) + mobile (in-app purchases) unified in one dashboard
- Revenue analytics and subscriber cohort tracking

---

## 3. Audio Delivery at Scale

Audio files are Narvo's heaviest bandwidth consumers. A 4-minute TTS audio file at 128kbps is approximately 3.8MB. At 10,000 DAU each playing 5 stories, that is **190GB/day** or roughly **5.7TB/month**. The CDN choice makes the difference between $18/month and $300+/month.

### Recommended: Backblaze B2 + Cloudflare CDN

The **Bandwidth Alliance** between Backblaze and Cloudflare eliminates egress fees between the two services — a unique arrangement that makes this combination the most cost-efficient audio delivery stack available.

| Provider | Role | Cost |
|----------|------|------|
| Backblaze B2 | Object storage for audio files | $0.006/GB storage; **$0 egress to Cloudflare** |
| Cloudflare CDN | Global delivery + caching | Free for B2 egress via Bandwidth Alliance |

**At 5.7TB/month:**
- Backblaze B2 storage: ~$0.034/GB × average library = ~$10–20/month
- Cloudflare CDN: $0 egress (Bandwidth Alliance)
- **Total: ~$10–20/month**

Compared to:
- AWS S3 + CloudFront: ~$0.023/GB storage + $0.085/GB transfer = **~$324/month**
- Vercel Edge: bandwidth-limited, not designed for audio streaming

**Cloudflare African PoPs:** Lagos, Nairobi, Cape Town, Cairo, Johannesburg, Casablanca — covering all major Narvo markets with sub-50ms cache hit latency.

### Alternative: Bunny.net

If Backblaze B2 integration is not available:
- **13 Africa-specific PoPs** — highest African edge coverage of any CDN
- Pricing: $0.06/GB for Africa/Middle East zones (higher than Backblaze+CF but still affordable)
- Bunny Stream: purpose-built video/audio delivery with built-in analytics
- At 5.7TB/month Africa traffic: ~$342/month — more expensive, better African coverage

**Decision:** Backblaze B2 + Cloudflare as primary (best cost). Bunny.net Stream as fallback if African edge latency requires it.

### Audio File Architecture

```
Naming convention: /audio/{story_id}/{language_code}/{voice_id}.mp3
Example: /audio/abc123/pcm/yarn_female_01.mp3

Pre-generate on synthesis:
  - en (English)
  - pcm (Nigerian Pidgin)  ← highest priority for growth
  - yo (Yorùbá)
  - ha (Hausa)
  - ig (Igbo)

Cache TTL: 30 days (stories don't change after synthesis)
Delivery: signed URLs with 1-hour expiry for authenticated users
```

---

## 4. Personalisation Engine

A personalisation engine ranks stories in a user's feed based on their listening history, bookmarks, language preferences, and reading patterns. This is the "For You" feed that drives daily active use.

### Phase 1: Gemini Embeddings + Qdrant (Growth Phase)

Start with content-based recommendations using vector similarity:

**Architecture:**
1. On article synthesis, generate a vector embedding via `gemini-embedding-exp-03-07`
2. Store embeddings in **Qdrant Cloud** alongside the story record
3. At feed generation time, find stories similar to what the user has recently engaged with
4. Re-rank by recency + engagement score

**Qdrant Cloud:**
- **Free tier:** 1 cluster, 1GB RAM, 0.5 CPU
- Sufficient for up to ~500K story embeddings at typical embedding dimensions
- REST and gRPC APIs, Python client available

**Embedding cost (Gemini):** ~$0.000025/1K tokens — minimal for article-length text

### Phase 2: Recombee (Scale Phase, 10K+ MAU)

Recombee adds **collaborative filtering** — "users who played these stories also played..." — on top of content-based similarity.

- **Free tier:** 100K interactions/month, 20K users, 20K catalog items
- Purpose-built for content recommendation (news, media, e-commerce)
- A/B testing built in — test recommendation strategies against each other
- Python SDK: `pip install recombee-api-client`
- Recommended at 10K+ MAU when collaborative signals become statistically meaningful

**Integration:** Send listening events and bookmarks to Recombee via background task after each user interaction. Query `GET /recomms/items/{item_id}/next-items` for "what to play next."

### Feed Ranking Signals

| Signal | Weight | Notes |
|--------|--------|-------|
| Content similarity (vector) | High | Computed at synthesis time |
| User listening history | High | Stories in same topic cluster |
| User language preference | High | Must-have for Nigerian multi-language context |
| Story recency | Medium | Decay function: 1 / (hours_since_published + 1) |
| Source reliability (Truth Tag score) | Medium | Boost high-reliability sources |
| Category preference | Medium | Learned from explicit onboarding + implicit behaviour |
| Time of day | Low | Morning Briefing content surfaced at 5–9AM |
| Collaborative filter score | Medium | Enable at 10K+ MAU |

---

## 5. Social and Engagement Infrastructure

### Phase 1: Supabase Realtime (MVP — already available)

Supabase Realtime handles real-time data synchronisation at zero additional cost:
- **Reactions** on stories: insert into `story_reactions` table; broadcast via Realtime channel
- **Comments count** badge: subscribe to `story_comments` row count changes
- **Online presence** (who's listening now): Presence feature in Supabase Realtime

No external service needed until scale requires it.

### Phase 2: Stream (Scale Phase)

When social features grow beyond simple reactions:
- **Maker Account:** Free for teams under 5 with <$10K MRR
- Activity feeds ("user X bookmarked this story")
- Notification feeds ("3 people reacted to a story you shared")
- AI-powered content moderation for comments
- React SDK with pre-built UI components

**Integration:** Supabase edge function triggers Stream API on user action events.

### Comment Architecture (Phase 1 — Supabase only)

```sql
-- comments table
CREATE TABLE story_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  content TEXT NOT NULL CHECK (char_length(content) <= 500),
  parent_id UUID REFERENCES story_comments(id),  -- for threading
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_flagged BOOLEAN DEFAULT FALSE
);

-- RLS: users can read all, write only their own
ALTER TABLE story_comments ENABLE ROW LEVEL SECURITY;
```

**Moderation approach at MVP:** Character limit (500), rate limiting per user (max 10 comments/hour via Redis), keyword blocklist maintained in backend.

---

## 6. Analytics and Product Intelligence

### Mixpanel (Recommended — see Doc 01)

20M events/month on free tier is sufficient through 100K+ MAU. When upgrading:

- **Growth plan:** $28/month (unlimited events, data warehouse sync)
- Key reports: daily active users, story completion rate by language, briefing open rate, feature funnel by cohort

### PostHog (Alternative — Self-Hosted)

At scale where Mixpanel costs become significant:
- Self-host on Cloud Run: ~$10–20/month infrastructure cost
- Session recording, feature flags, A/B testing all included
- Full data ownership — important for GDPR/NDPA compliance

### Product Metrics to Track

| Metric | Category | Target |
|--------|----------|--------|
| Daily Active Users | Engagement | 20% of MAU |
| Story Completion Rate | Quality | >60% |
| Briefing Open Rate | Feature | >40% of subscribers |
| Audio Play Rate | Core | >50% of story opens |
| D7 Retention | Retention | >30% |
| D30 Retention | Retention | >15% |
| Language Switch Rate | Localisation | Track by story |
| Truth Tag Tap Rate | Feature | Track for product value |
| Offline Download Rate | Feature | Track adoption curve |
| Subscription Conversion | Revenue | >3% free-to-paid |

---

## 7. TTS at Scale

As Narvo's library grows and concurrent users increase, TTS pre-generation load increases. The self-hosted YarnGPT approach is optimal but requires infrastructure management.

### Dedicated TTS Worker

At 10K+ MAU:
- Deploy YarnGPT on a **Cloud Run GPU instance** or a dedicated VM
- Queue TTS generation jobs via python-rq
- Pre-generate all 5 languages per story on synthesis — not on-demand
- Cache generated audio to Backblaze B2 immediately after generation

### ElevenLabs for Voice Personalisation ($5–22/month)

When Narvo introduces "choose your narrator" as a premium feature:
- Creator plan: $22/month (100K characters, professional quality)
- Voice cloning: provide 1 minute of audio from a real Nigerian broadcaster → generate unlimited synthesis in that voice
- Support Narvo Premium tier: "Hear your news in Funke Akindele's voice"

---

## 8. AI Synthesis at Scale

### Claude API (Anthropic)

For complex multi-source narrative synthesis requiring nuanced understanding:
- Claude Haiku: $0.80/1M input tokens — fastest, most cost-efficient for batch synthesis
- Claude Sonnet: $3.00/1M input tokens — for high-quality Truth Tag analysis
- Strengths: long context (200K tokens), excellent at following structured prompts, strong factual grounding

**Use case:** When synthesis quality from Gemini or Groq produces inconsistent Truth Tag accuracy, Claude can serve as a quality verification layer.

### Dedicated Gemini API Key (Paid)

At 100K+ MAU, a paid Gemini API key with committed usage is more cost-effective than managing free-tier rate limits:
- Gemini 2.0 Flash: $0.075/1M input tokens at standard pricing
- Predictable billing vs. rate-limit management complexity

---

## 9. Mobile App Distribution

Narvo's PWA covers most use cases, but an App Store presence signals legitimacy and enables in-app purchases for iOS.

### iOS: React Native (or Capacitor wrapping PWA)

- Capacitor wraps the existing React PWA into an iOS app shell with minimal code changes
- Enables Apple in-app purchase (required for iOS subscriptions — Apple takes 30%/15%)
- Required for push notifications on iOS (web push support is improving but inconsistent)
- App Store presence provides discovery and trust signals

### Android: TWA (Trusted Web Activity)

- Wraps the PWA in a TWA for Google Play Store listing
- Zero code changes required — same React app
- Google Play Billing for Android subscriptions (30%/15% cut)
- RevenueCat manages cross-platform subscription state

**Decision:** Prioritise PWA (already live). Add App Store presence at Growth phase (1K+ MAU). Capacitor for iOS + TWA for Android is the lowest-effort path.

---

## 10. Premium Upgrade Decision Matrix

| Tool | Trigger to Upgrade | Monthly Cost | Priority |
|------|--------------------|--------------|----------|
| Paystack | First paying subscriber | Transaction % only | **Immediate** |
| Cloudflare Pages | 5K+ DAU or 50GB/month | $0 | **Immediate** |
| Backblaze B2 + Cloudflare | First audio library | ~$10–20 | **Growth Phase** |
| Mixpanel Growth | 20M events/month exceeded | $28 | Growth Phase |
| Qdrant Cloud paid | >1GB embedding storage | $25 | Growth Phase |
| OneSignal Growth | Segmentation needed | $9 | Growth Phase |
| Recombee | 10K+ MAU | Free tier first | Scale Phase |
| ElevenLabs | Voice personalisation feature | $5 | Scale Phase |
| Stream | Social features scaled | Free then $99 | Scale Phase |
| RevenueCat | iOS/Android apps launched | Free to $2.5K MRR | Scale Phase |
| Flutterwave | Pan-African expansion | Transaction % only | Scale Phase |

---

*Previous: [01 — Stack Analysis](./01_Stack_Analysis_Free_MVP.md)*  
*Next: [03 — UX Design Patterns](./03_UX_Design_Patterns.md)*
