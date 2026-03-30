# Narvo Security Hardening Checklist — v1
### Security Review Priorities for the Current Backend and Frontend Architecture

> **Version:** 1.0  
> **Date:** March 30, 2026  
> **Author:** Ajibola Akelebe — Founder & Sole Developer, Narvo Intelligence  
> **Scope:** Narvo backend, frontend, Supabase, Upstash, AI/TTS services, and deployment configuration  
> **Status:** Actionable checklist based on current code inspection  

---

## Table of Contents

1. [Purpose](#1-purpose)
2. [Current Security Posture](#2-current-security-posture)
3. [Highest-Priority Risks Found in the Current Repo](#3-highest-priority-risks-found-in-the-current-repo)
4. [Checklist by Security Domain](#4-checklist-by-security-domain)
5. [Service-by-Service Spend Protection](#5-service-by-service-spend-protection)
6. [Verification and Testing Checklist](#6-verification-and-testing-checklist)
7. [Execution Order](#7-execution-order)

---

## 1. Purpose

This document turns general AI-app security advice into a Narvo-specific hardening checklist.

It is based on the current architecture in the repo:

- FastAPI backend
- React frontend
- Supabase auth and Postgres
- Upstash Redis / QStash / Ratelimit
- OpenAI, Gemini, YarnGPT, and other paid API dependencies

The goal is simple:

- protect user data
- prevent privilege mistakes
- reduce abuse of expensive endpoints
- avoid accidental spend spikes
- make security expectations explicit before more product work lands

---

## 2. Current Security Posture

The repo already has useful security controls in place:

- backend-only Supabase service-role client in [supabase_db.py](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/lib/supabase_db.py)
- frontend Supabase anon key usage in [supabase.ts](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/frontend/src/lib/supabase.ts)
- Supabase JWT decoding in [auth.py](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/lib/auth.py)
- CSP, CORS, request ID logging, and middleware stack in [server.py](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/server.py)
- QStash HMAC verification in [qstash_verify.py](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/lib/qstash_verify.py)
- RLS policies in [005_rls_policies.sql](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/supabase_migrations/005_rls_policies.sql)
- Upstash-backed rate limiting in [ratelimit.py](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/lib/ratelimit.py)

That said, the current setup still has security gaps that matter.

---

## 3. Highest-Priority Risks Found in the Current Repo

These are the first items to treat as real hardening work, not optional polish.

### 3.1 User-Controlled `user_id` on Sensitive Routes

Several backend routes accept `user_id` directly from the URL path or query string instead of deriving identity from the authenticated JWT.

Examples:

- [user.py](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/routes/user.py)
- [settings.py](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/routes/settings.py)
- [offline.py](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/routes/offline.py)

Why this is high risk:

- the backend uses a Supabase service-role client, which bypasses RLS
- if a route trusts caller-supplied `user_id`, an attacker can potentially read or write another user’s data by guessing their ID

This is the most important hardening item in the repo right now.

### 3.2 Rate Limiting Is Too Narrow

Current rate limiting only applies to paths starting with:

- `/api/tts/`
- `/api/factcheck/`
- `/api/notifications/`

See [ratelimit.py](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/lib/ratelimit.py).

Why this is risky:

- other expensive or abusable routes may still be open
- settings, share, search, discover, content generation, and any future AI-assisted route can still become abuse surfaces

### 3.3 Rate Limiter Fails Open

If Upstash rate limiting fails, the current code allows traffic through.

See [ratelimit.py](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/lib/ratelimit.py).

Why this matters:

- this is acceptable for low-risk endpoints
- it is not ideal for high-cost or high-abuse routes like TTS generation

Narvo should classify which routes may fail open and which must fail closed or degrade more safely.

### 3.4 Legacy Unauthenticated Push Subscription Endpoint

The legacy push endpoint stores subscriptions by endpoint alone:

- [notifications.py](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/routes/notifications.py)

There is also a newer authenticated push subscription route in:

- [user.py](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/routes/user.py)

Why this is risky:

- legacy endpoints create drift
- unauthenticated write endpoints can be abused for storage spam or unwanted state writes

### 3.5 Expensive Generation Endpoint Needs Tighter Controls

`/api/tts/generate` performs expensive work and uses backend database caching:

- [tts.py](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/routes/tts.py)

Why this matters:

- any AI/TTS route can become a billing attack surface
- caching helps, but it does not replace quotas, strict limits, and request validation

### 3.6 Spend Caps and Alerts Are Not Represented as a First-Class Operational Control

The codebase documents providers and env vars, but there is no central Narvo checklist for:

- budget caps
- quota ceilings
- per-provider spend alerts
- incident steps when costs spike

This needs to become operationally explicit.

---

## 4. Checklist by Security Domain

### 4.1 Identity and Authorization

- [ ] Stop trusting caller-supplied `user_id` for authenticated user data routes.
- [ ] For authenticated routes, derive identity from `request.state.user_id` only.
- [ ] Treat path/query `user_id` as an anti-pattern unless the route is strictly admin-only.
- [ ] Review all routes under [routes/](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/routes) for direct user-identity parameters.
- [ ] Require explicit admin authorization checks for any route that reads or writes another user’s data.
- [ ] Document which routes are guest-safe and which routes require auth.

### Immediate target files

- [user.py](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/routes/user.py)
- [settings.py](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/routes/settings.py)
- [offline.py](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/routes/offline.py)
- [subscription_service.py](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/services/subscription_service.py)
- [user_service.py](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/services/user_service.py)

### 4.2 Supabase and RLS

Positive note:

- RLS policies exist for bookmarks, preferences, offline articles, listening history, subscriptions, and briefings in [005_rls_policies.sql](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/supabase_migrations/005_rls_policies.sql).

Checklist:

- [ ] Confirm every user-owned table has both RLS enabled and correct policies.
- [ ] Confirm every table that should be backend-only truly has no client-readable policies.
- [ ] Review `briefings` access carefully because it allows both global and per-user rows.
- [ ] Verify no frontend code is using service-role credentials or server-only Supabase endpoints.
- [ ] Add a written policy audit for every table in [supabase_schema.sql](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/supabase_schema.sql).
- [ ] Ensure all future migrations include a security review step before deployment.

### Special note

RLS does not save routes that already use a service-role key and trust user-controlled identity. That must be fixed at the application layer.

### 4.3 API Route Exposure

- [ ] Inventory all public endpoints and classify them as:
  - public read
  - authenticated user
  - privileged/admin
  - cron/internal
- [ ] Ensure cron/internal endpoints require QStash or another explicit auth mechanism.
- [ ] Remove or deprecate legacy public endpoints that overlap authenticated routes.
- [ ] Ensure expensive routes are not callable from the frontend without backend guardrails.
- [ ] Review routes that proxy third-party content or audio streams for abuse potential.

### Immediate target files

- [tts.py](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/routes/tts.py)
- [notifications.py](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/routes/notifications.py)
- [discover.py](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/routes/discover.py)
- [share.py](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/routes/share.py)
- [briefing.py](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/backend/routes/briefing.py)

### 4.4 Rate Limiting and Abuse Protection

- [ ] Expand path coverage beyond the current three prefixes.
- [ ] Add different rate-limit tiers for:
  - expensive AI/TTS calls
  - auth-sensitive writes
  - push subscription endpoints
  - search/discover endpoints
  - public share endpoints
- [ ] Add per-user limits where auth exists, not just per-IP limits.
- [ ] Decide which endpoints can fail open and which cannot.
- [ ] For high-cost endpoints, prefer safe degradation over full fail-open.
- [ ] Return structured retry guidance where useful.

### Narvo-specific recommendation

At minimum, stricter rate-limit review should include:

- TTS generation
- translation
- briefing generation
- fact-check
- push subscribe/unsubscribe
- search
- share

### 4.5 Frontend Sensitive Calls

Positive note:

- the frontend correctly uses the anon key and retrieves JWTs for backend auth in [api.ts](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/frontend/src/lib/api.ts).

Checklist:

- [ ] Ensure no frontend code directly calls privileged Supabase tables using elevated credentials.
- [ ] Ensure all expensive operations still flow through backend routes.
- [ ] Audit realtime channels to confirm they only subscribe to intended public/safe events.
- [ ] Review push subscription flow to ensure only the authenticated route remains in active use.
- [ ] Review service worker fetch handling so cached or cross-origin behavior does not bypass expectations.

### Immediate target files

- [api.ts](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/frontend/src/lib/api.ts)
- [supabase.ts](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/frontend/src/lib/supabase.ts)
- [notificationService.ts](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/frontend/src/lib/notificationService.ts)
- [sw.js](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/frontend/public/sw.js)
- [BreakingNews.tsx](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/frontend/src/components/BreakingNews.tsx)

### 4.6 Secrets and Environment Variables

- [ ] Confirm no secret appears in frontend env vars except intentionally public values.
- [ ] Confirm `SUPABASE_SERVICE_ROLE_KEY` exists only on backend infrastructure.
- [ ] Confirm `VAPID_PRIVATE_KEY` exists only on backend infrastructure.
- [ ] Confirm `QSTASH_*` signing keys exist only on backend infrastructure.
- [ ] Confirm provider API keys are not accidentally logged.
- [ ] Add a rotation checklist for service-role, VAPID, QStash, and AI-provider credentials.

### 4.7 Logging, Monitoring, and Incident Response

- [ ] Ensure structured logs include enough context for abuse debugging without leaking secrets.
- [ ] Add alerting for abnormal 429 spikes, TTS volume spikes, and push-subscription churn.
- [ ] Add cost-spike incident steps to ops docs.
- [ ] Add security-specific Sentry filters or alerts where useful.
- [ ] Track which endpoints drive the highest paid-provider usage.

### 4.8 Input Validation and Payload Limits

- [ ] Add explicit maximum text length for TTS, translation, and paraphrase payloads.
- [ ] Reject malformed or oversized payloads before provider calls.
- [ ] Validate language, voice, and mode parameters against allowlists.
- [ ] Add tighter validation on push subscription payload shape.
- [ ] Review upload-like or content-caching endpoints for unbounded growth.

### 4.9 Legacy and Duplicate Endpoints

- [ ] Remove duplicated legacy API surfaces when a secure replacement already exists.
- [ ] Consolidate push subscription flows into a single auth model.
- [ ] Consolidate settings routes so security expectations are not split across route families.
- [ ] Make guest behavior explicit rather than letting `"guest"` become a hidden authorization mode.

---

## 5. Service-by-Service Spend Protection

Security for Narvo is partly a cost-control problem.

### 5.1 OpenAI

- [ ] Set monthly hard budget.
- [ ] Set threshold alerts at multiple levels.
- [ ] Restrict keys by project or environment where possible.
- [ ] Monitor TTS and fallback usage separately.

### 5.2 Gemini / Google

- [ ] Set quota alerts.
- [ ] Track translation and narrative-generation call volume separately.
- [ ] Review retry behavior so transient failures do not multiply cost.

### 5.3 YarnGPT / Other TTS Providers

- [ ] Set spend or quota alerting if the provider supports it.
- [ ] Track fallback frequency to understand when spend shifts to OpenAI.
- [ ] Add alerts when TTS generation volume exceeds baseline.

### 5.4 Supabase

- [ ] Monitor database size growth.
- [ ] Monitor storage growth if cached media expands.
- [ ] Track realtime and auth usage spikes.
- [ ] Review table growth for `tts_cache`, `push_subscriptions`, and user-owned content tables.

### 5.5 Upstash

- [ ] Monitor Redis, ratelimit, vector, and QStash usage separately.
- [ ] Alert on sudden ratelimit misses or QStash retries.
- [ ] Treat ratelimit outage behavior as an explicit security decision.

---

## 6. Verification and Testing Checklist

- [ ] Write tests that prove one authenticated user cannot read or write another user’s records through backend routes.
- [ ] Add abuse tests for rate-limited paths.
- [ ] Add tests for unauthenticated access to authenticated-only routes.
- [ ] Add tests for oversized AI/TTS payload rejection.
- [ ] Add tests for guest-mode boundaries.
- [ ] Add manual verification steps for RLS after each schema migration.
- [ ] Run a direct API abuse pass with forged `user_id` values against current user/settings/offline endpoints.

### Most important test to add first

Prove that a caller cannot:

1. authenticate as User A
2. pass User B’s ID in the request
3. read or mutate User B’s bookmarks, settings, subscriptions, or offline data

---

## 7. Execution Order

Recommended order for Narvo:

1. **Fix identity trust bugs first**
   Replace caller-supplied `user_id` with JWT-derived identity on user-owned routes.

2. **Lock down expensive endpoints**
   TTS, translation, briefing, notifications, share/search where relevant.

3. **Consolidate duplicate / legacy endpoints**
   Especially push and settings flows.

4. **Expand and classify rate limiting**
   Per-IP and per-user, with clear fail-open vs fail-closed rules.

5. **Add spend controls and alerts**
   OpenAI, Gemini, YarnGPT, Supabase, Upstash.

6. **Add security regression tests**
   Especially cross-user access tests.

The highest-signal summary is this:

> Narvo’s main immediate security problem is not “AI coding” in the abstract. It is backend trust in caller-supplied identity combined with service-role database access.

Fix that first, then tighten abuse and spend controls.
