# MVP implementation entry spec (documentations → narvo_news)

> **Purpose:** Executable trace from org docs into this repo. Derived from [08_MVP_Launch_Checklist_and_Grant_Priority.md](research/08_MVP_Launch_Checklist_and_Grant_Priority.md), [Narvo_MVP_Backend_Architecture_v1.md](technical/Narvo_MVP_Backend_Architecture_v1.md), [Narvo_Security_Hardening_Checklist_v1.md](technical/Narvo_Security_Hardening_Checklist_v1.md), [03_UX_Design_Patterns.md](research/03_UX_Design_Patterns.md), and [06_Landing_Page_Implementation.md](research/06_Landing_Page_Implementation.md).  
> **Code references:** `[backend/server.py](../../backend/server.py)`, `[backend/routes/](../../backend/routes/)`, `[frontend/](../../frontend/)`.

---

## 1. Ordered must-ship backlog (from doc 08)

Execution order follows **§4 Launch Priority Order** in doc 08, expanded into FE/BE touchpoints.


| Order | Priority | Area (doc 08)                       | Frontend work                                                                                                                      | Backend / data                                                                                                         |
| ----- | -------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 1     | P0       | Landing page                        | Landing route: value prop, trust, CTA into app; align copy to [Narvo_App_Copy.md](design/Narvo_App_Copy.md) + Design Foundation v5 | Public reads: `/api/news`, `/api/news/breaking`, metrics if landing uses them                                          |
| 2     | P0       | Dashboard / feed                    | Audio-first home: Morning Briefing entry, breaking, cards with play + Truth cues                                                   | `GET /api/news`, `GET /api/news/breaking`, `GET /api/briefing/latest`                                                  |
| 3     | P0       | Core voice playback                 | Player shell, language/voice selection, cache/PWA playback                                                                         | `GET /api/news/{id}`, audio URLs in story payload; generation via pipeline / `POST /api/tts/generate` where applicable |
| 4     | P0       | Morning Briefing                    | Ready state, play, transcript fallback                                                                                             | `GET /api/briefing/latest`, `GET /api/briefing/{date}`, generation: `/api/briefing/generate` (see §2 method note)      |
| 5     | P0       | Truth Tag UX                        | Calm, explainable trust UI on cards + detail                                                                                       | Truth fields on `GET /api/news/{id}`; avoid mock verdicts per MVP backend doc §3.4                                     |
| 6     | P1       | Offline                             | Save replay, surfaced in UI                                                                                                        | `GET/POST/DELETE /api/me/offline*`                                                                                     |
| 7     | P1       | WhatsApp / share                    | Share sheet + preview                                                                                                              | `GET /api/share/{id}`, `GET /api/og/{id}`                                                                              |
| 8     | P1       | Security hardening                  | Ensure FE only uses anon Supabase + backend for privileged ops                                                                     | See §3                                                                                                                 |
| 9     | P2       | Onboarding & settings consolidation | Language, voice, interests; single settings surface                                                                                | `GET/PUT /api/me/preferences`, `GET/PUT /api/me/settings`; avoid legacy `/api/settings/{user_id}` for new work         |
| 10    | P2+      | Analytics polish                    | Instrumentation per doc 08 §7.8                                                                                                    | Event plumbing; optional Mixpanel per research 01                                                                      |


**Parallel “product scope lock” tasks (doc 08 §7.1):** freeze MVP definition, list out-of-scope features, map every new request to the five-step user loop.

**Checklist parity:** Use doc 08 §8.1 Must-Ship as the release gate checklist.

---

## 2. MVP public API vs narvo_news backend (mapping)

[MVP backend doc §5](technical/Narvo_MVP_Backend_Architecture_v1.md) defines the *target* contract. Below: **MVP route** → **Current implementation** → **Notes**.


| MVP (documented)                     | Implemented in repo                                  | Notes                                                                                               |
| ------------------------------------ | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `GET /api/news`                      | `GET /api/news`                                      | `[routes/news.py](../../backend/routes/news.py)`                                                    |
| `GET /api/news/breaking`             | `GET /api/news/breaking`                             | Same                                                                                                |
| `GET /api/news/{story_id}`           | `GET /api/news/{news_id}`                            | Path param name differs only in label                                                               |
| `GET /api/briefing/latest`           | `GET /api/briefing/latest`                           | `[routes/briefing.py](../../backend/routes/briefing.py)`                                            |
| `POST /api/briefing/generate`        | `GET /api/briefing/generate`                         | **Method mismatch:** MVP doc says POST; code exposes GET with query params                          |
| `GET /api/briefing/{date}`           | `GET /api/briefing/{briefing_date}`                  | Same intent                                                                                         |
| `GET /api/me/preferences`            | `GET /api/me/preferences`                            | `[routes/me.py](../../backend/routes/me.py)`                                                        |
| `PUT /api/me/preferences`            | `PUT` + `POST /api/me/preferences`                   | POST kept for transition                                                                            |
| `GET/POST/DELETE /api/me/bookmarks*` | Present                                              |                                                                                                     |
| `GET/POST/DELETE /api/me/offline*`   | Present                                              |                                                                                                     |
| `GET /api/voices`                    | `GET /api/tts/voices` **and** `GET /api/news/voices` | **Duplicate surface:** MVP wants one; consolidate client on `/api/tts/voices` or document canonical |
| `GET /api/share/{story_id}`          | `GET /api/share/{news_id}`                           | `[routes/share.py](../../backend/routes/share.py)`                                                  |


**Routers registered in** `[server.py](../../backend/server.py)` **beyond MVP narrow surface** (treat as defer / internal / admin for scope discussions):


| Router module      | Prefix / paths                                                        | MVP doc posture                                                      |
| ------------------ | --------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `discover.py`      | `/api/podcasts/*`, `/api/discover/trending`, `/api/radio/*`           | Out of scope: podcasts, radio (MVP §Out of MVP Backend Scope)        |
| `admin.py`         | `/api/admin/*`                                                        | Internalize — not public MVP contract                                |
| `aggregators.py`   | `/api/aggregators/*`, `/api/sources/*`, `/api/news/refresh`, etc.     | Internalize — “public aggregator controls” deferred                  |
| `translation.py`   | `/api/translate/*`                                                    | Defer standalone translation API for MVP doc                         |
| `tts.py`           | `/api/tts/generate`, `/api/tts/paraphrase`, `/api/tts/narrative/duel` | Generate may remain for pipeline; paraphrase/duel = deferred tooling |
| `search.py`        | `/api/search`, `/api/trending`                                        | “Broad search” deferred — confirm product still needs minimal search |
| `factcheck.py`     | `/api/factcheck/*`                                                    | Trust synthesis support; keep behind rate limits                     |
| `notifications.py` | `/api/notifications/*`                                                | Push/digest; align with security consolidation                       |
| `settings.py`      | `/api/settings/{user_id}`                                             | Overlaps `/api/me/*` — merge per MVP doc §6.1                        |
| `health.py`        | `/api/health`, `/api/metrics`, `/api/analytics/{user_id}`             | Ops; review analytics path for `user_id` pattern                     |


---

## 3. Security hardening trace (checklist v1 → narvo_news)

[Narvo_Security_Hardening_Checklist_v1.md](technical/Narvo_Security_Hardening_Checklist_v1.md) references paths under an older `narvo/` tree. **This repo:** `narvo_news/`. Equivalent focus areas:

### 3.1 Identity: caller-supplied `user_id`


| Finding                | narvo_news location                                                                                 | Action                                                                                                                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Insights path param    | `GET /api/me/insights/summary/{user_id}` — compares to JWT in `[me.py](../../backend/routes/me.py)` | Safer than blind trust; still prefer no path `user_id` for MVP (derive only from JWT)                                                                                          |
| Legacy settings compat | `GET/POST/PUT /api/settings/{user_id}` in `[settings.py](../../backend/routes/settings.py)`         | For non-`guest`, reads/writes use `**_require_user(request)`** (JWT), not path `user_id` — low IDOR risk but still duplicate surface; deprecate toward `/api/me/settings` only |
| Health analytics       | `GET /api/analytics/{user_id}` in `[health.py](../../backend/routes/health.py)`                     | **Critical:** no `Depends`/JWT check; path `user_id` is passed straight to Supabase via service role — **IDOR until auth or removal**                                          |


### 3.2 Rate limiting (`[lib/ratelimit.py](../../backend/lib/ratelimit.py)`)

Only `/api/tts/*`, `/api/factcheck/*`, `/api/notifications/*` are limited. Checklist §4.4 also calls out translation, briefing generation, push, search, share — **not currently in `_is_rate_limited_path`**. Upstash failure **fails open** (line ~72).

### 3.3 Expensive / abuse-prone routes


| Route                                  | Module           |
| -------------------------------------- | ---------------- |
| `POST /api/tts/generate`               | `tts.py`         |
| `GET /api/briefing/generate`           | `briefing.py`    |
| `POST /api/translate/text`, `/narrate` | `translation.py` |


### 3.4 Legacy notifications

`POST /api/notifications/subscribe` and `/unsubscribe` in `[notifications.py](../../backend/routes/notifications.py)` vs authenticated `POST /api/me/push` in `me.py` — consolidate per checklist §4.9.

### 3.5 Recommended execution order (from checklist §7)

1. Fix identity trust on all user-data routes (JWT-only).
2. Lock down expensive endpoints (TTS, translation, briefing).
3. Consolidate duplicate/legacy endpoints (push, settings).
4. Expand rate limits + fail-open/fail-closed policy.
5. Spend caps and alerts.
6. Security regression tests (cross-user ID forging).

---

## 4. UX sequencing (research 03 + 06)

Use **after** scope lock. Product implementation order:

1. **Landing (doc 03 §2 + doc 06)** — Single hero CTA, bento features, social proof static or API-backed; performance and skeleton states; v5 tokens supersede v3 hex table in doc 06 (treat 06 as structure/logic reference, not colour source).
2. **Onboarding (doc 03 §6)** — Language, voice, interests before heavy feed; aligns with P2 backlog row but should follow landing in funnel.
3. **Feed / dashboard (doc 03 §3)** — Audio-first cards, Truth visible on every card, data-conscious loading.
4. **Navigation (doc 03 §4)** — Mobile dock / desktop rail per Design Foundation v5 + component DS v1.
5. **Audio player (doc 03 §5)** — Persistent, thumb-zone, completion over scroll depth.
6. **Story detail + Truth (doc 03 §9)** — Sources and verification context.
7. **Offline (doc 03 §8)** — Explicit offline affordances; low-bandwidth QA per doc 08 §7.6.

**Doc 06 specifics:** Section architecture (Nav → Hero → Stats → Bento → Live feed → Social proof → Voice modal → CTA → Footer) is the reference build order for the landing *page only*; wire live blocks to current API paths listed in §2.

---

## 5. Related files in this repo


| Doc                      | Path                                                                                                             |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Canonical index          | [README.md](README.md)                                                                                           |
| MVP launch checklist     | [research/08_MVP_Launch_Checklist_and_Grant_Priority.md](research/08_MVP_Launch_Checklist_and_Grant_Priority.md) |
| MVP backend architecture | [technical/Narvo_MVP_Backend_Architecture_v1.md](technical/Narvo_MVP_Backend_Architecture_v1.md)                 |
| Security                 | [technical/Narvo_Security_Hardening_Checklist_v1.md](technical/Narvo_Security_Hardening_Checklist_v1.md)         |
| Stack / cost             | [research/01_Stack_Analysis_Free_MVP.md](research/01_Stack_Analysis_Free_MVP.md)                                 |


