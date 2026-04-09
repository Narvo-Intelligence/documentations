# Enhanced Features, Fact-Checking Architecture, and Monetisation Research

> **Series:** Narvo B2C Revamp Research · Document 08
> **Date:** April 2026
> **Scope:** External research intake — enhanced product features, advanced fact-checking AI, expanded monetisation strategies, LangChain/LangGraph evaluation, CertaintyMeter enhancement, and MVP completion tasks
> **Status:** Evaluated draft — cross-referenced against Docs 01–07 and the `narvo_news` codebase

---

## Editorial Note

This document captures findings from external research conducted in April 2026. Each section includes an **Implementation Status** block that notes overlap with existing documentation and the current codebase, as well as any conflicts or divergences. Items marked **[NEW]** have no prior coverage. Items marked **[EXTENDS]** build on existing work. Items marked **[CONFLICTS]** propose changes that diverge from the current implementation.

---

## Table of Contents

1. [Enhanced Product Features](#1-enhanced-product-features)
2. [Grant-Focused vs Market-Focused Feature Tiers](#2-grant-focused-vs-market-focused-feature-tiers)
3. [Advanced Fact-Checking Architecture](#3-advanced-fact-checking-architecture)
4. [Expanded Monetisation Strategies](#4-expanded-monetisation-strategies)
5. [LangChain and LangGraph Evaluation](#5-langchain-and-langgraph-evaluation)
6. [CertaintyMeter Enhancement Path](#6-certaintymeter-enhancement-path)
7. [SSML Validation](#7-ssml-validation)
8. [MVP Completion Tasks](#8-mvp-completion-tasks)
9. [References](#9-references)

---

## 1. Enhanced Product Features

### 1.1 Interactive "Barge-In" Agent [NEW]

**Concept:** Allow users to interrupt a playing narrative to ask follow-up questions, then resume playback from the exact interruption point.

**Technical approach:** Use Pocket TTS word-level timestamps to pause and resume precisely. A task-based AI agent handles the follow-up question before the narrative resumes.

**Example:** A user says "Wait, how much did fuel prices go up by exactly?" — the agent pivots to answer, then the gist resumes.

**Implementation Status:**
- Not in any existing document or codebase
- Pocket TTS is evaluated in [Doc 06 §4](./06_Realtime_and_Audio_Delivery_Analysis.md) as an English-only fallback — its word-level timestamp capability is not yet leveraged
- The current audio player (`AudioPlayerContext.tsx`) supports play/pause/seek but has no concept of mid-playback agent interaction
- This feature requires: speech-to-text input, agent routing, TTS response, and precise playback resume — significant engineering scope
- **Recommended tier:** Post-MVP premium feature

### 1.2 Multi-Dialect Code-Switching [NEW]

**Concept:** Allow the AI narrator to naturally switch between English and local dialects (Pidgin, Yoruba, Hausa, Igbo) within the same story, inserting culturally relevant signifiers.

**Implementation Status:**
- Not in any existing document or codebase
- The current pipeline supports per-story language selection (`yarngpt_service.py` voice mapping, `ssml_decorator.py` language parameter) but not mid-story language switching
- YarnGPT voices are language-specific — switching mid-story would require either: (a) multiple TTS calls stitched together, or (b) a multilingual TTS model
- **Risk:** Stitching audio from different voice models creates audible seams
- **Recommended tier:** Growth phase (requires TTS model improvements or audio post-processing)

### 1.3 Hyper-Local "News Map" [NEW]

**Concept:** A spatial UI showing news "pulses" by location. Users can tap a city (e.g., "Ibadan") to hear a localised 30-second gist before the national briefing.

**Implementation Status:**
- Not in any existing document or codebase
- The backend aggregation pipeline (`aggregators.py`, `narrative_service.py`) does not currently cluster stories by geographic location
- Requires: geolocation extraction from stories, spatial indexing, a map UI component, and location-specific TTS generation
- **Recommended tier:** Full product — significant data and UI investment

### 1.4 Emotionally Adaptive Synthesis [EXTENDS existing implementation]

**Concept:** Tag stories with an "Emotional Vector" (Urgent, Celebratory, Solemn) and have TTS automatically adapt pitch and pace.

**Implementation Status:**
- `ssml_decorator.py` already implements a version of this:
  - `_STRONG_EMPHASIS_RE` detects breaking/urgent/crisis/attack keywords → `<emphasis level="strong">`
  - `_ADVISORY_SENTENCE_RE` detects cautionary language → `<prosody rate="92%" pitch="-1st">`
  - `_OPENING_SENTENCE_RE` adjusts opening cadence → `<prosody rate="94%" pitch="+1st">`
  - `_MODERATE_EMPHASIS_RE` detects key-point language → `<emphasis level="moderate">`
- **What's new in this research:** Systematising emotional classification into explicit vectors at the story level (not just sentence-level keyword matching), with richer TTS parameter mapping
- **Recommended approach:** Extend the existing `narrative_service.py` to output an `emotional_tone` field per story, and map it to prosody profiles in `ssml_decorator.py`

### 1.5 Interactive Snap Polls [EXTENDS Doc 05]

**Concept:** 1-tap reaction polls at the end of stories. Voice-activated variant: "Do you agree with the Governor's move?" — user replies "Yes/No/Abeg."

**Implementation Status:**
- Doc 05 lists social features (comments, reactions) as P3
- The codebase has a `feedback` route but no polling/reaction system
- **Grant value:** Provides real-time sentiment data — attractive for Policy & Governance research grants
- **Recommended tier:** MVP (text-tap version) or Growth (voice-activated version)

---

## 2. Grant-Focused vs Market-Focused Feature Tiers

### 2.1 MVP / Grant-Focused Features

| Feature | Grant Angle | Technical Notes |
|---------|------------|-----------------|
| **Offline "Stash"** (auto-download Morning Briefing on Wi-Fi in Opus, ~2MB/10min) | "Digital Divide" — ITU, USAID grants | Already partially built (`offlineStorage.ts`, `sw.js`, `OfflineDownloadContext.tsx`). See [Doc 05 §4](./05_Strategic_Opportunities.md), [Doc 06 §3](./06_Realtime_and_Audio_Delivery_Analysis.md). Gap: auto-download on Wi-Fi and Opus compression not yet wired. |
| **"Truth-Check" Voice Commands** ("Narvo, show receipts" → display sources) | Anti-misinformation — Fact-Checking & Democracy funds | Sources already available via `factcheck_service.py` and `story_content_service.py`. Gap: voice command input and source overlay UI. |
| **Snap Polls (text-tap)** | Real-time sentiment data for Policy researchers | Straightforward frontend feature. Backend needs a polls table and aggregation endpoint. |

### 2.2 Full Product / Market-Focused Features

| Feature | Market Value | Technical Notes |
|---------|-------------|-----------------|
| **AI-Native "Ad-Synthesis"** | Higher conversion, lower listener fatigue — ads in the "Full Gist" tone | Requires: ad content ingestion, narrative-style ad generation via LLM, insertion logic in briefing pipeline. [NEW] |
| **Community "Gist" Threads** (15-second audio reactions) | Retention, community building — social audio | Requires: audio recording, moderation pipeline, playback queue after main briefing. [NEW] |
| **"Narvo Widget" for Media Houses** | B2B distribution without per-user acquisition | Embeddable player component. Related to NaaS direction in [Doc 05 §9](./05_Strategic_Opportunities.md). [EXTENDS] |
| **Smart-Watch & Car-Play Integration** | Commute-optimised "hands-free" experience | Requires native platform work (WatchOS, Android Auto, CarPlay APIs). [NEW] |
| **Hyper-Local Neighbourhood Radar** (5km radius, GPS-based) | Market prices, traffic, local events | Requires GPS, geolocation extraction, local data sources. [NEW] |

---

## 3. Advanced Fact-Checking Architecture

> **Current state:** `factcheck_service.py` uses LLM-based trust scoring (Groq → Gemini fallback) + Google Fact Check Tools API + keyword heuristic. This is single-layer verification without adversarial robustness.

### 3.1 Robustness by Design [NEW]

**Curated Evidence Bases (RAG):** Augmenting LLMs with high-quality databases (Snopes, PolitiFact, Africa Check, Dubawa archives) via Retrieval-Augmented Generation can improve accuracy significantly over web-search-only approaches.

- The codebase currently has no RAG infrastructure
- `requirements.txt` includes `supabase` which supports `pgvector` — a vector store is feasible without new infrastructure
- **Recommended approach:** Index curated fact-check archives in Supabase pgvector; retrieve relevant prior checks during `generate_truth_tags()` to ground LLM scoring

**Knowledge Transfer & Distillation:** Combining outputs from multiple neural networks where one network's classification trains the next, reducing sensitivity to input manipulation.

- Applicable as a research direction rather than an immediate implementation
- Could be explored when Narvo has sufficient labelled fact-check data

**Adversarial Training ("Vaccination"):** Intentionally expose the model to adversarial inputs (manipulated wording, jailbreak prompts) during fine-tuning to build resilience.

- Relevant for `generate_truth_tags()` prompt hardening
- **Practical step:** Build a test suite of adversarial news inputs (sensationalised, manipulated, jailbreak attempts) and verify scoring stability

### 3.2 Multi-Layered Detection [NEW]

**Input Preprocessing:** Filter incoming content for suspicious patterns — junk code insertion, instruction manipulation, anomalous character frequencies — before it reaches the LLM.

- The codebase has `sanitize_ai_text()` in `lib/text_utils.py` and `ai_sanitizer` tests, but these focus on output sanitisation, not adversarial input detection
- **Recommended addition:** An input validation layer in the aggregation pipeline that flags anomalous content before narrative synthesis

**Anomaly & Behavioural Monitoring:** Auxiliary classifiers that flag inputs unlike training data. Unexpected shifts in decision-making can signal an ongoing attack.

- Not in the current pipeline
- **Practical step:** Log trust score distributions over time; alert on sudden statistical shifts

**Cross-Modal Consistency:** For stories with media, use multimodal fusion to detect inconsistencies between text, images, and metadata.

- Not applicable to MVP (text-only synthesis pipeline) but relevant for future media-rich stories

### 3.3 Human-in-the-Loop & Governance [NEW]

**Human Oversight:** Integrate human review at critical junctures — cultural nuance, emotional manipulation, edge cases where AI scoring is insufficient.

- The codebase has `admin` routes but no human-review queue for fact-checking
- **Recommended approach:** Flag stories where `trust_score` falls in an ambiguous range (40–60) for manual review via admin dashboard

**Red Teaming:** Continuously simulate adversarial attacks to find gaps proactively.

- **Practical step:** Quarterly adversarial testing against the fact-check pipeline, documented as part of the security checklist (see [Security Hardening Checklist](../technical/Narvo_Security_Hardening_Checklist_v1.md))

**Governance Frameworks:** Align with 2026 regulatory standards (EU AI Act, NDPA) for documentation, risk tiering, and post-market monitoring.

- [Doc 05 §10](./05_Strategic_Opportunities.md) lists NDPA compliance as a risk item
- **Extension:** Document Narvo's AI decision pipeline for regulatory transparency — LangSmith-style logging (see §5) could serve this purpose

---

## 4. Expanded Monetisation Strategies

> **Current coverage:** [Doc 05 §8](./05_Strategic_Opportunities.md) defines freemium tiers (₦0–$1.99/month). [Doc 05 §9](./05_Strategic_Opportunities.md) outlines B2B NaaS. [Doc 02](./02_Premium_Tools_Roadmap.md) covers payment providers.

### 4.1 B2B & Enterprise Solutions [EXTENDS Doc 05 §9]

**API Licensing ("One API Platform"):** Package the synthesis engine and CertaintyMeter as a unified API for SMEs — pre-synthesised, fact-checked news feeds saving clients up to 80% in operational costs.

- Extends the NaaS direction already outlined
- **Practical first step:** Versioned public API with rate limiting (already has rate limit middleware in `server.py`)

**White-Label "Truth Signal" Newsrooms:** Offer media houses an AI-powered newsroom that turns static archives into structured, citable sources.

- Extends the B2B customer table in Doc 05 §9
- **New angle:** Positioning around "Truth Signal" rather than just audio generation

**Data Intelligence:** Sell aggregated, privacy-compliant market intelligence based on trending topics and engagement patterns.

- [NEW] — Requires analytics infrastructure (engagement tracking exists via `analytics` routes) and a data product layer

### 4.2 Premium Tiers ("Sovereign Audience" Model) [NEW]

| Tier Feature | Description | Revenue Model |
|-------------|-------------|---------------|
| **"Verified-Only" Feed** | Zero-hallucination guarantee via higher-compute, multi-source verification | Premium subscription |
| **Personalised Voice Agents** | Users "hire" premium AI voices or clone their own for Morning Briefing | Per-voice or premium tier |
| **Interactive Barge-In** | Interrupt the gist with follow-up questions (see §1.1) | Premium feature gate |

### 4.3 Micro-Monetisation & In-App Economy [NEW]

**AI-Driven Dynamic Pricing:** Adjust subscription costs based on location, engagement, or churn likelihood — e.g., temporary lower-tier offers during high-churn periods.

- Requires: churn prediction model, pricing engine, A/B testing infrastructure
- **Caution:** Must be transparent to avoid user trust erosion — especially given Narvo's "Truth" positioning

**Premium News "Drops":** 1-tap access to deep-dive reports on breaking events beyond the standard briefing.

- Straightforward content-gating feature
- **Complements** the Morning Briefing habit loop defined in [Doc 07 §2.1](./07_MVP_Launch_Checklist_and_Grant_Priority.md)

**Lead Generation:** Connect high-intent users with relevant services (e.g., fuel price story → carpool service) with commission per qualified lead.

- [NEW] — Requires contextual linking infrastructure and partner onboarding

### 4.4 Content Licensing & Partnerships [NEW]

**Micro-Licensing:** License Narvo's audio gists to creators for use in their content ecosystems.

**Attribution Deals:** Negotiate with AI platforms (OpenAI, Google) to pay Narvo for including its fact-checked gists in their information discovery results.

- Novel positioning: Narvo as a **source** rather than just a **consumer** of AI services
- **Long-term play** — requires significant content volume and credibility first

---

## 5. LangChain and LangGraph Evaluation

> **Current state:** The `narvo_news` backend uses procedural orchestration — no LangChain, LangGraph, or agent framework. LLM calls are direct via `llm_gemini.py` and `llm_groq.py` with Groq-first, Gemini-fallback patterns.

### 5.1 Proposed Architecture [CONFLICTS with current implementation]

The research proposes a LangGraph multi-agent workflow:

```
aggregator → synthesizer → fact_checker → evaluator
```

With conditional edges: if the evaluator finds a low confidence score, it routes back to the synthesiser for revision.

**Agents proposed:**
- **"Hunter" Agent** — News aggregation via LangChain Document Loaders, DuckDuckGoSearch, semantic deduplication via vector store
- **"Scribe" Agent** — Narrative synthesis via ChatGoogle + `.with_structured_output()`
- **"Judge" Agent** — Claim extraction, multi-step verification (Serper/Tavily search + Reflexion self-correction), confidence scoring

### 5.2 Evaluation Against Current Codebase

| Capability | Current Implementation | LangChain Proposal | Assessment |
|------------|----------------------|-------------------|------------|
| News aggregation | `aggregators.py` routes, RSS/scraping services | LangChain Document Loaders + search tools | Current works. LangChain adds abstraction without clear operational gain at MVP scale. |
| Narrative synthesis | `narrative_service.py` → Groq/Gemini with JSON output | ChatGoogle + `.with_structured_output()` | Current works and is simpler. Structured output is achievable without LangChain (already done via JSON parsing). |
| Fact-checking | `factcheck_service.py` → LLM scoring + Google Fact Check API | Multi-step claim extraction + web search + Reflexion | **Genuine improvement.** Self-correction loop and multi-step verification are not in the current pipeline. |
| Orchestration | Procedural async Python | LangGraph state machine with conditional edges | Adds complexity. Benefit: retry/revision loops, observability. Cost: new dependency, learning curve, potential vendor lock-in. |
| Observability | Sentry error tracking | LangSmith trace logging | **Genuine improvement** for grant transparency and debugging. |
| Deduplication | Not implemented | Semantic deduplication via vector store | **Genuine improvement.** Currently stories can be processed multiple times. |

### 5.3 Recommendation

**Do not refactor the entire pipeline to LangChain/LangGraph for MVP.** The current procedural approach works and is simpler to maintain for a solo developer.

**Selectively adopt:**
1. **Semantic deduplication** — implement via Supabase pgvector without LangChain dependency
2. **Self-correction loop** — add a revision step in `narrative_service.py` when `generate_truth_tags()` returns a low score, without requiring LangGraph
3. **LangSmith (or equivalent)** — consider for grant-facing transparency; can be integrated independently of LangChain

**Revisit LangGraph** when Narvo scales past MVP and the pipeline complexity justifies a state machine orchestrator.

---

## 6. CertaintyMeter Enhancement Path

> **Current state:** `CertaintyMeter.tsx` renders a 0–100 CSS progress bar. `truth-map.ts` maps API trust data to UI status. No Lottie, no real-time updates, no animation states.

### 6.1 Proposed Enhancement [EXTENDS existing component]

Replace the CSS bar with a Lottie-driven gauge/needle animation:

**Frame Mapping Formula:**
$$\text{Target Frame} = \frac{\text{FactCheck Score}}{100} \times \text{Total Frames}$$

**API Methods:** `goToAndStop(frame, isFrame)` or `playSegments([current, target], true)` for smooth transitions.

### 6.2 Real-Time Integration

- WebSocket or Supabase Realtime pushes score updates during synthesis
- LERP (Linear Interpolation) or spring physics (via existing `motion` library) for smooth needle movement
- State machine: Idle → Calculating → Verified

### 6.3 Visual Specification

| Aspect | Recommendation | Rationale |
|--------|---------------|-----------|
| Format | `.dotLottie` | Smaller, mobile-optimised (see [Doc 06 §5](./06_Realtime_and_Audio_Delivery_Analysis.md)) |
| Colour mapping | Signal Vermilion (low) → Petrol Teal (high) via Lottie Expression Controls | Matches Narvo design tokens |
| States | Idle, Calculating, Verified | Immediate feedback while AI processes |

### 6.4 Implementation Notes

- [Doc 06 §5](./06_Realtime_and_Audio_Delivery_Analysis.md) already evaluated LottieFiles as "a complementary tool for contained animation assets" — the CertaintyMeter is an ideal candidate
- The `motion` library (already in `package.json`) can handle spring interpolation between Lottie frames, avoiding a heavy additional dependency
- Supabase Realtime is already used for `offline_articles` — extending it to push trust score updates is architecturally consistent
- **No need for Apinator/WebSockets specifically for this** — Supabase Realtime is sufficient

### 6.5 Code Concept

```javascript
const updateCertainty = (score) => {
  const totalFrames = animInstance.getDuration(true);
  const targetFrame = (score / 100) * totalFrames;
  animInstance.playSegments([currentFrame, targetFrame], true);
  currentFrame = targetFrame;
};
```

---

## 7. SSML Validation

> **Current state:** `ssml_decorator.py` is a mature implementation with `<prosody>`, `<break>`, `<emphasis>`, `<say-as>`, `<phoneme>`, currency/date/time formatting, Nigerian phoneme map (Lagos, Abuja, Naira), and "Warm Gist" OpenAI voice instructions.

### 7.1 Research Findings vs Implementation

The external research validates the existing SSML approach. Specific comparisons:

| SSML Capability | Research Proposal | Current Implementation |
|----------------|------------------|----------------------|
| `<prosody>` for rhythm | `rate="slow" pitch="+2st"` | Opening: `rate="94%" pitch="+1st"`, Advisory: `rate="92%" pitch="-1st"` |
| `<break>` for pauses | `time="800ms"` | Dynamic: 320ms default, 420ms after colons, 460ms after exclamations, 520ms before transitions |
| `<emphasis>` for stress | `level="strong"` | Strong (breaking/urgent) and moderate (key-point) levels |
| `<say-as>` for currency | `interpret-as="currency" currency="NGN"` | `interpret-as="currency" language="en-NG"` with regex detection |
| `<phoneme>` for names | Mentioned conceptually | Implemented: Lagos (`ˈleɪɡɒs`), Abuja (`əˈbuːdʒə`), Naira (`ˈnaɪrə`) |
| OpenAI instructions | Not addressed | Full instruction set: warm gist style, natural pace, Nigerian pronunciation care |

### 7.2 Potential Extensions

- **Expand the phoneme map** to cover more Nigerian cities and names (Kano, Owerri, Enugu, etc.)
- **Add the story-level Emotional Vector** (§1.4) to inform prosody selection beyond sentence-level keyword matching
- **Test SSML behaviour** with the adversarial prompt hardening recommended in §3

**Conclusion:** The SSML implementation is ahead of what the research proposes. No architectural changes needed — only incremental extensions.

---

## 8. MVP Completion Tasks

### 8.1 Latency Optimisation [EXTENDS Doc 06]

**Target:** Pocket TTS output starts in under 200ms.

- [Doc 06 §4](./06_Realtime_and_Audio_Delivery_Analysis.md) discusses Pocket TTS latency characteristics
- **Current bottleneck:** The pipeline generates complete audio assets before playback (`yarngpt_service.py` concatenates chunks). Progressive delivery (Doc 06 §3.3) would address this more fundamentally than TTS model speed alone.

### 8.2 Prompt Hardening [NEW — aligns with §3]

**Target:** Stress-test `narrative_service.py` with controversial news to maintain neutral, "Fact-Check First" tone without hallucinating.

- Build a suite of adversarial test cases: politically charged content, ethnically sensitive stories, unverified rumours, jailbreak-style inputs
- Verify LLM output stability and trust score consistency
- Cross-reference with [Security Hardening Checklist](../technical/Narvo_Security_Hardening_Checklist_v1.md)

### 8.3 The "5 AM Smoke Test" [EXTENDS Doc 07]

**Target:** Dedicated health check for the QStash cron that triggers the Morning Briefing. If the 5 AM briefing fails, the brand loses trust instantly.

- `routes/cron_tasks.py` has `GET /api/cron/morning-briefing-push/health`
- `routes/briefing.py` has `POST /briefing/cron`
- **Recommended addition:** External uptime monitor (UptimeRobot, Better Stack) pinging the briefing health endpoint at 5:05 AM WAT, with SMS/Slack alerting on failure
- [Doc 07 §7.7](./07_MVP_Launch_Checklist_and_Grant_Priority.md) covers reliability but does not specify external monitoring for the cron specifically

---

## 9. References

### External Sources (from research)

**Enhanced Features:**
- [1] https://www.sciencedirect.com
- [2] https://www.refontelearning.com

**Fact-Checking AI:**
- [3] https://cyber.fsi.stanford.edu
- [4] https://www.infosys.com
- [5] https://roundtable.datascience.salon
- [6] https://dl.acm.org
- [7] https://londondataconsulting.medium.com
- [8] https://lab.imedd.org
- [9] https://twit.tv
- [10] https://www.cornerstoneondemand.com
- [11] https://www.weforum.org

**Monetisation:**
- [12] https://openforge.io
- [13] https://www.forbes.com
- [14] https://pr.co
- [15] https://mediacopilot.ai
- [16] https://logie.ai
- [17] https://www.poynter.org
- [18] https://www.playwire.com

**LangChain / Pipeline:**
- [19] https://python.plainenglish.io
- [20] https://docs.langchain.com
- [21] https://blog.langchain.com
- [22] https://www.langchain.com
- [23] https://sparkco.ai
- [24] https://pub.towardsai.net

**CertaintyMeter / Lottie:**
- [25] https://developers.lottiefiles.com
- [26] https://docs.lottielab.com
- [27] https://vue3-lottie.vercel.app

### Internal Cross-References

- [Doc 02 — Premium Tools Roadmap](./02_Premium_Tools_Roadmap.md) — Payments, scaling tools
- [Doc 05 — Strategic Opportunities](./05_Strategic_Opportunities.md) — Monetisation tiers, B2B NaaS, risk register
- [Doc 06 — Realtime and Audio Delivery Analysis](./06_Realtime_and_Audio_Delivery_Analysis.md) — Audio formats, Pocket TTS, LottieFiles evaluation
- [Doc 07 — MVP Launch Checklist](./07_MVP_Launch_Checklist_and_Grant_Priority.md) — Must-ship core, grant positioning, execution order
- [Security Hardening Checklist](../technical/Narvo_Security_Hardening_Checklist_v1.md) — Adversarial testing alignment

### Codebase References

- `backend/services/ssml_decorator.py` — SSML implementation (validated in §7)
- `backend/services/factcheck_service.py` — Current fact-checking (extended in §3)
- `backend/services/narrative_service.py` — Narrative synthesis (evaluated in §5)
- `backend/services/yarngpt_service.py` — TTS pipeline
- `backend/routes/cron_tasks.py` — Cron health checks (extended in §8.3)
- `frontend/components/CertaintyMeter.tsx` — Current trust UI (enhanced in §6)
- `frontend/lib/truth-map.ts` — Trust score mapping
- `frontend/lib/offlineStorage.ts` — Offline capability
- `frontend/components/AudioPlayerContext.tsx` — Audio player state

---

*Previous: [07 — MVP Launch Checklist and Grant Priority](./07_MVP_Launch_Checklist_and_Grant_Priority.md)*
*Return to: [Research Index](./README.md)*
