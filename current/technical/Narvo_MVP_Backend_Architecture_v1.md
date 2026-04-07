# Narvo MVP Backend Architecture v1

> **Date:** March 31, 2026  
> **Scope:** MVP-only backend architecture for Narvo B2C  
> **Status:** Documentation baseline for backend simplification and optimization planning  
> **Authoring basis:** current backend structure, MVP launch research, and technical reference

---

## 1. One-Page Architecture Specification

### Purpose

Narvo's MVP backend exists to do one job extremely well:

> **turn important stories into trustworthy, audio-first story objects and a reliable Morning Briefing**

The backend should be optimized for:

- fast story availability
- clear trust evidence
- high-quality multilingual audio
- stable briefing generation
- low operational complexity

### MVP Product Promise

Narvo should ingest important stories, synthesize them into clear narratives, attach visible trust evidence, generate audio in core launch languages, and make playback reliable online and offline.

### Architecture Principles

- One pipeline, not many disconnected features.
- Story synthesis happens once and is reused everywhere.
- Trust evidence is first-class data, not presentation garnish.
- Audio generation is selective and cached.
- Background jobs own heavy work; request paths stay light.
- User-scoped operations must use authenticated identity, not caller-supplied `user_id`.

### Core Backend Domains

Only six domains are required for the MVP backend:

1. `ingestion`
2. `scraping`
3. `story synthesis`
4. `trust synthesis`
5. `audio synthesis`
6. `briefing`

### Canonical Backend Flow

```text
Sources
  -> Ingestion
  -> Deduplication + Clustering
  -> Scraping
  -> Canonical Story Synthesis
  -> Truth Tag Synthesis
  -> Story Persistence
  -> Selective Translation + TTS
  -> Morning Briefing Assembly
```

### Canonical Story Packet

Every story delivered to product surfaces should resolve to one canonical object:

- `story_id`
- `title`
- `short_summary`
- `narrative`
- `key_takeaways`
- `category`
- `published_at`
- `source_packet`
- `truth_tag`
- `translations`
- `audio_by_lang`

### Truth Tag Packet

The Truth Tag should be backed by explicit evidence:

- `source_count`
- `trusted_source_count`
- `source_diversity_score`
- `external_factcheck_status`
- `confidence_score`
- `explanation`
- `evidence_links`

### Public MVP API Surface

Keep the public surface narrow:

- `GET /api/news`
- `GET /api/news/breaking`
- `GET /api/news/{story_id}`
- `GET /api/briefing/latest`
- `POST /api/briefing/generate`
- `GET /api/briefing/{date}`
- `GET /api/me/preferences`
- `PUT /api/me/preferences`
- `GET /api/me/bookmarks`
- `POST /api/me/bookmarks`
- `DELETE /api/me/bookmarks/{story_id}`
- `GET /api/me/offline`
- `POST /api/me/offline`
- `DELETE /api/me/offline/{story_id}`
- `GET /api/tts/voices`
- `GET /api/share/{story_id}`

### Internal Jobs

The MVP backend should rely on a small scheduled job surface:

- source refresh
- top-story prefill
- Morning Briefing generation

### Explicitly Out of MVP Backend Scope

- podcasts
- radio
- public partner APIs
- subscriptions and billing
- advanced personalization
- narrative duel and paraphrase tooling
- public raw aggregator controls
- broad unified cross-media search

### Defining Architectural Statement

Narvo's MVP backend is a disciplined editorial pipeline:

> **trusted inputs -> canonical stories -> trust evidence -> audio outputs -> briefing outputs**

---

## 2. Context and Current-State Assessment

The current backend is functional and already contains strong building blocks for MVP:

- RSS and optional aggregator ingestion
- full-article scraping cascade
- AI narrative generation
- fact-check integration
- multilingual translation
- Nigerian-accented TTS
- briefing generation
- offline support

The main issue is not lack of capability. The issue is **surface-area creep**.

The live backend currently exposes a wider set of routers and features than the MVP requires, including:

- discovery surfaces
- admin operations
- overlapping user/content/settings routes
- public translation and TTS tooling endpoints
- public aggregator control endpoints
- subscription management
- broad search across non-MVP content types

For MVP, this should be reduced into a simpler and more logical service model centered on the launch loop:

1. user opens Narvo
2. user understands the story quickly
3. user hears the gist quickly
4. user trusts what they are hearing
5. user saves, shares, or returns

If a backend surface does not strengthen that loop, it should not sit on the MVP critical path.

---

## 3. Target MVP Backend Domains

### 3.1 Ingestion

`ingestion` is responsible for:

- fetching from curated sources
- normalizing source records
- deduplicating duplicates
- clustering related reports into story candidates

For MVP, ingestion should prioritize trusted, high-signal Nigerian and Africa-relevant sources.

It should not be documented as a broad media aggregation framework. It should be documented as a focused story acquisition layer.

### 3.2 Scraping

`scraping` is responsible for converting source URLs into usable full-text inputs for synthesis.

The existing extraction cascade is already suitable as the baseline:

- `trafilatura`
- `newspaper4k`
- `readability-lxml`
- `goose3`
- `BeautifulSoup`
- RSS summary fallback

For MVP, scraping should:

- fetch article text once per URL where possible
- persist extraction quality metadata
- avoid repeated scraping inside user-facing request paths
- fall back gracefully to RSS summary when extraction fails

### 3.3 Story Synthesis

`story synthesis` should create the canonical story packet used by all downstream systems.

It should produce:

- `short_summary`
- `narrative`
- `key_takeaways`

The synthesis layer should be documented as one logical system, even if current code is split between single-source and multi-source functions.

For MVP, the system should aim for:

- one schema for all stories
- one persisted canonical story record
- no regeneration unless content materially changes

### 3.4 Trust Synthesis

`trust synthesis` is the backend foundation for the Truth Tag.

It should combine:

- source corroboration count
- source quality weighting
- diversity of sources
- external fact-check evidence where available
- clear human-readable explanation

Important MVP rule:

If no external fact-check exists, the system should say so explicitly. It should not substitute pseudo-verification language or opaque mock verdicts in product-facing responses.

### 3.5 Audio Synthesis

`audio synthesis` is responsible for:

- language-specific text preparation
- translation
- TTS generation
- caching and reuse

The current backend supports:

- YarnGPT as primary Nigerian-accent TTS
- OpenAI TTS fallback
- chunked generation for long text

For MVP, this domain should be optimized around selective pre-generation:

- pre-generate `en` and `pcm` for top stories and the Morning Briefing
- lazily generate `yo`, `ha`, and `ig` on first request
- cache all outputs by `story_id`, language, and content version

### 3.6 Briefing

`briefing` is the retention engine of the MVP backend.

It should:

- select already-synthesized top stories
- assemble the daily script
- generate briefing audio
- persist the briefing
- expose a stable ready state

For MVP, the primary mode should be the **global daily briefing**.

Personalized briefing generation is valuable, but it should not define the architecture until the core loop is stable.

---

## 4. Recommended End-to-End Flow

### 4.1 Source Refresh Flow

```text
Curated feeds
  -> fetch source items
  -> normalize fields
  -> deduplicate
  -> cluster related reports
  -> store story candidates
```

### 4.2 Story Build Flow

```text
story candidate
  -> scrape full text for each source
  -> synthesize canonical story
  -> synthesize Truth Tag evidence
  -> persist story packet
```

### 4.3 Audio Flow

```text
canonical story
  -> prepare base English text
  -> selectively translate by target language
  -> generate TTS
  -> cache audio output
  -> expose audio URL/data to clients
```

### 4.4 Briefing Flow

```text
top persisted stories
  -> assemble briefing story set
  -> generate script
  -> generate audio
  -> persist briefing for the day
  -> optionally notify users
```

### 4.5 Request-Time Rules

During request handling:

- story detail should read from persisted story packets first
- audio should read from cached story audio first
- briefing should read from persisted briefing first
- request-time regeneration should be exception-based, not the default

---

## 5. Public API Documentation Baseline

### 5.1 News

#### `GET /api/news`

Returns the current news feed for the MVP product.

Responsibilities:

- lightweight list payload
- no heavy regeneration inside the list endpoint
- enough metadata for feed cards and story entry points

#### `GET /api/news/breaking`

Returns the top breaking stories for dashboard use.

#### `GET /api/news/{story_id}`

Returns one canonical story packet.

This should be the primary story detail endpoint and the main consumer of:

- synthesized story content
- Truth Tag data
- pre-generated or lazily-generated audio

### 5.2 Briefing

#### `GET /api/briefing/latest`

Returns the most recent ready Morning Briefing.

#### `POST /api/briefing/generate`

Triggers generation or retrieval of the day's briefing.

#### `GET /api/briefing/{date}`

Returns a historical briefing by date.

### 5.3 User State

The MVP documentation should treat user state as one logical surface under `/api/me/*`.

That unified surface should cover:

- preferences
- bookmarks
- offline items

### 5.4 Voices

#### `GET /api/tts/voices`

Returns supported TTS voices for current product surfaces (canonical; legacy `GET /api/voices` removed).

### 5.5 Sharing

#### `GET /api/share/{story_id}`

Supports share surfaces for stories and should remain aligned with the WhatsApp-oriented MVP growth loop.

---

## 6. What Should Be Merged, Hidden, or Deferred

### 6.1 Merge

These route families should be treated as one logical domain in documentation:

- `content.py`
- `user.py`
- user settings portions of `settings.py`

Reason:

- overlapping responsibilities
- duplicated concepts
- inconsistent user-state boundaries

### 6.2 Internalize

These capabilities may still exist operationally, but should not define the public MVP contract:

- aggregator refresh controls
- source health refresh triggers
- story batch prefill triggers
- admin surfaces

### 6.3 Defer

The following are not launch-critical to the MVP backend:

- podcast discovery
- radio discovery
- subscription lifecycle endpoints
- standalone translation endpoints
- public paraphrase and narrative comparison tools
- broad cross-media search

---

## 7. Optimization Guidance by Subsystem

### 7.1 Scraping Optimization

Recommended direction:

- persist extracted article text per source URL
- persist extraction success or failure metadata
- add domain-level extraction quality monitoring
- avoid repeated scrape attempts when content has not changed

### 7.2 Ingestion Optimization

Recommended direction:

- narrow the default source set
- prioritize trusted Nigerian and Africa-relevant sources
- reduce LLM dependency during clustering and role assignment
- keep clustering deterministic where possible

### 7.3 Narrative Synthesis Optimization

Recommended direction:

- unify story synthesis into one canonical output schema
- synthesize once and reuse
- avoid request-time regeneration when canonical content already exists
- reserve deep regeneration for source changes or recovery paths

### 7.4 Trust Synthesis Optimization

Recommended direction:

- stop treating mock or hash-based verdicts as user-facing truth
- build the Truth Tag around explainable evidence
- keep external fact-checks additive, not mandatory
- let corroboration and source quality carry most of the MVP trust layer

### 7.5 Audio Synthesis Optimization

Recommended direction:

- keep YarnGPT primary
- keep OpenAI fallback
- pre-generate only the highest-value languages at MVP scale
- lazily generate lower-demand languages and cache them
- reuse story-level audio everywhere possible

### 7.6 Briefing Optimization

Recommended direction:

- build briefing from persisted top stories
- treat the global briefing as primary
- keep briefing generation job-driven and predictable
- avoid pulling advanced recommendations into the MVP critical path

---

## 8. Security and Reliability Requirements

The MVP backend documentation should explicitly state these constraints:

- user-scoped endpoints must rely on authenticated user context
- caller-supplied `user_id` should not be trusted in final MVP route design
- expensive endpoints must be rate-limited
- heavy generation belongs to scheduled jobs or recovery workflows
- startup should avoid unnecessary heavy warmup work
- all synthesis outputs should be cacheable and idempotent where practical

These requirements are not secondary. They are part of the MVP architecture.

---

## 9. Operational Model

### 9.1 Core Scheduled Jobs

For MVP, the backend should depend on only a few recurring jobs:

1. source refresh
2. top-story synthesis and selective prefill
3. Morning Briefing generation

### 9.2 Cache Strategy

The cache model should be simple and aligned to the core pipeline:

- feed cache
- story packet cache
- audio cache
- briefing cache

### 9.3 Failure Behavior

If one stage fails:

- scraping failure falls back to summary-based synthesis
- translation failure falls back to base English content
- primary TTS failure falls back to secondary TTS
- missing external fact-check does not block story publication
- briefing failure should degrade visibly, not silently

---

## 10. Recommended Documentation Position

This document should be treated as the architecture baseline for backend simplification planning.

It does **not** declare that the current backend already matches this model.

It declares:

- what the MVP backend should optimize for
- what should define the public contract
- what should be merged or de-emphasized
- what should be deferred beyond the MVP critical path

The guiding statement is:

> **Narvo's MVP backend is a focused editorial and audio pipeline, not a general media platform.**

