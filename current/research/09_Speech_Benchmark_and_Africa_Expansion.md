# Narvo Speech Benchmark and Africa Expansion Evaluation

> **Series:** Narvo B2C Revamp Research · Document 09 of 09  
> **Date:** April 2026  
> **Scope:** Production benchmark for Narvo's speech stack, with explicit decision rules for Nigeria-first quality and future expansion into other African markets

---

## Table of Contents

1. [Purpose](#1-purpose)
2. [Current Narvo Speech Baseline](#2-current-narvo-speech-baseline)
3. [Providers Under Evaluation](#3-providers-under-evaluation)
4. [Rollout Clusters](#4-rollout-clusters)
5. [Benchmark Rules](#5-benchmark-rules)
6. [Scoring Rubric](#6-scoring-rubric)
7. [Test Set](#7-test-set)
8. [Reviewer Worksheet](#8-reviewer-worksheet)
9. [Ops and Performance Checks](#9-ops-and-performance-checks)
10. [Decision Thresholds](#10-decision-thresholds)
11. [Recommended Rollout Policy](#11-recommended-rollout-policy)
12. [References](#12-references)

---

## 1. Purpose

Narvo's current speech moat is not generic TTS quality. It is culturally credible, broadcast-grade delivery in Nigerian languages and accents, with room to expand across Africa without losing trust.

This document defines:

1. how Narvo should evaluate `YarnGPT`, `OmniVoice`, and fallback providers
2. how Narvo should protect launch-quality Nigerian speech while testing wider African coverage
3. what score, latency, and reliability thresholds must be met before a voice or language is exposed to users

This is an execution document, not a model hype document.

---

## 2. Current Narvo Speech Baseline

Narvo's current code path is:

- `YarnGPT` as the primary TTS provider for the five launch languages
- `Google Cloud TTS` as the first fallback when configured
- `OpenAI` as the emergency fallback after Google

Current production launch languages in the repo:

- English (`en`)
- Yoruba (`yo`)
- Hausa (`ha`)
- Igbo (`ig`)
- Nigerian Pidgin (`pcm`)

Current Narvo voice map in `backend/services/yarngpt_service.py`:

| Language | Voice ID | Narvo voice name |
|---|---|---|
| English | `emma` | Emma |
| Yoruba | `idera` | Idera |
| Hausa | `zainab` | Zainab |
| Igbo | `osagie` | Osagie |
| Nigerian Pidgin | `wura` | Wura |

Current strategic rule:

- keep `YarnGPT` as the Nigerian primary until another system clearly beats it in blind listening tests
- use global models to expand language coverage, not to erase Narvo's local-accent differentiation

---

## 3. Providers Under Evaluation

### 3.1 Primary comparison set

| Provider | Role in benchmark | Why it matters |
|---|---|---|
| `YarnGPT` | Current production baseline | Best fit for Narvo's current Nigerian positioning |
| `OmniVoice` | Expansion and challenger candidate | Large multilingual coverage with zero-shot voice cloning and voice design |

### 3.2 Secondary comparison set

| Provider | Role | Why it matters |
|---|---|---|
| `Google Cloud TTS` | Reliability fallback | Operations-safe fallback for some languages and outages |
| `OpenAI TTS` | Emergency fallback | Last-resort continuity, not brand voice |

### 3.3 Research watchlist

| Provider | Role | Status |
|---|---|---|
| `LongCat-AudioDiT` | Research-only voice cloning watchlist | Excluded from current rollout benchmark; revisit only if Narvo wants a custom premium cloned-voice lane on dedicated GPU infrastructure |

### 3.4 External model assumptions

Current external signals used for benchmark planning:

- `OmniVoice` describes itself as a massively multilingual zero-shot TTS model supporting over 600 languages, with voice cloning and voice design
- `OmniVoice` explicitly lists support for `Yoruba`, `Hausa`, `Igbo`, `Nigerian Pidgin`, `Swahili`, `Standard Arabic`, `Amharic`, `Lingala`, and `Wolof`
- `LongCat-AudioDiT` looks promising for zero-shot voice cloning, but the public repo currently reads like a research-first GPU workflow rather than a Narvo-ready multilingual production layer

Implication:

- `OmniVoice` is the only candidate here that is immediately relevant to both Nigeria and multi-country expansion
- `LongCat-AudioDiT` is not part of launch or near-term expansion decisions

---

## 4. Rollout Clusters

Narvo should not expand "Africa" as one speech problem. Expansion should be staged by market cluster and operational confidence.

### Cluster A - Nigeria core

| Market | Languages | Goal |
|---|---|---|
| Nigeria | `en-NG`, `pcm`, `yo`, `ha`, `ig` | Protect Narvo's current moat and listener trust |

### Cluster B - first expansion

| Market group | Languages | Goal |
|---|---|---|
| East Africa | `sw` | First non-Nigeria launch language |
| Francophone West and Central Africa | `fr` | Large cross-market language reach |
| North Africa | `arb` | Broad reach with one standard entry point |

### Cluster C - selective regional depth

| Market group | Languages | Goal |
|---|---|---|
| Ethiopia | `am` | Deep local-market entry after Cluster B |
| Somalia and Horn | `so` | Regional expansion after Cluster B |
| DRC and Congo | `ln` | Regional depth market |
| Senegal and Gambia | `wo` | Regional depth market |

Cluster rules:

- Cluster A is judged primarily on accent authenticity
- Cluster B is judged on intelligibility plus acceptable regional fit
- Cluster C should not be exposed until Cluster B is stable in production

---

## 5. Benchmark Rules

### 5.1 Review conditions

- All listening reviews must be blind
- Reviewers must not know which provider generated a sample
- Output files must be loudness-normalized before review
- The same normalized text must be used across engines
- Scripts must be reviewed by native or near-native speakers before synthesis

### 5.2 Review panel

Each language must have at least `3` reviewers:

| Reviewer | Required perspective |
|---|---|
| Reviewer A | Everyday listener from the target language market |
| Reviewer B | Journalist, broadcaster, editor, or radio producer |
| Reviewer C | Language and culture reviewer, translator, or dialect-aware reviewer |

### 5.3 Minimum sample count

For each language and provider, run:

- `5` script types
- `3` repetitions per script when measuring reliability and latency
- `1` blind listening pack per reviewer

Minimum output per provider-language pair:

- `5` reviewed clips
- `15` operational runs

---

## 6. Scoring Rubric

Every reviewed clip is scored out of `100`.

| Category | Weight | What to judge |
|---|---:|---|
| Accent authenticity | 30 | Does this sound like the right region or community, not just the right words? |
| Intelligibility | 20 | Are words, numbers, names, and sentence boundaries easy to understand? |
| Newsreader suitability | 15 | Does it sound credible, calm, and broadcast-safe for Narvo? |
| Proper noun handling | 10 | Cities, people, ministries, parties, brands, and currencies |
| Prosody and pacing | 10 | Pauses, emphasis, transitions, and naturalness |
| Reliability | 10 | No broken chunks, missing audio, stutters, clipped endings, or obvious artifacts |
| Ops and cost fit | 5 | Reasonable for Narvo's runtime, cost, and caching model |

### 6.1 Scoring guide

Use these interpretations consistently:

| Score band | Meaning |
|---|---|
| `90-100` | Production-grade |
| `82-89` | Launchable with confidence |
| `75-81` | Usable only as beta or opt-in |
| `<75` | Not launchable |

### 6.2 Hard blockers

A sample is blocked even if the total score is high when:

- reviewer consensus says the accent feels "foreign", "generic", or "wrong for this market"
- more than `2` critical named entities are mispronounced in a 60-second clip
- clipping, stutter, truncation, or missing-chunk artifacts are obvious

---

## 7. Test Set

Each language should use the same semantic structure, adapted by a native reviewer for natural phrasing.

### 7.1 Script pack

| Script type | Purpose | Target length |
|---|---|---:|
| Morning briefing | Standard Narvo daily summary tone | 45-60s |
| Breaking update | Higher urgency without panic | 30-45s |
| Truth Tag attribution | Verification and source explanation | 30-45s |
| Numbers and economics | Percentages, dates, money, counts | 30-45s |
| Mixed local register | Local phrasing with embedded English names and institutions | 45-60s |

### 7.2 Canonical English source scripts

These are the semantic base scripts. They must be adapted, not translated literally.

#### A. Morning briefing

> Good morning. Here are the top stories shaping your day. Fuel prices may rise again after the latest policy review, while heavy rain warnings remain in parts of the region. Narvo is following the official updates and the strongest on-ground reporting before this morning's next briefing.

#### B. Breaking update

> This is a breaking update. Officials say traffic has been diverted after a major incident on the highway, and emergency teams are already at the scene. Narvo is waiting for confirmation on casualties and the expected reopening time.

#### C. Truth Tag attribution

> Narvo verified this story against multiple independent reports. At the time of publication, the core claim was supported by statements from public officials and two established newsrooms. Where facts are still uncertain, we say so clearly.

#### D. Numbers and economics

> The budget increased by 12.5 percent, from 48 billion to 54 billion naira, with the first phase scheduled for June 14. Analysts say the policy could affect transport costs, food prices, and small business planning over the next quarter.

#### E. Mixed local register

> In today's story, Narvo is tracking reactions from commuters, market traders, and local officials. The main issue is simple: people want clear updates they can trust, in a voice that sounds familiar and easy to follow.

### 7.3 Local adaptation rules

- do not translate literally if that produces unnatural speech
- preserve meaning, tone, and factual structure
- replace generic names with local named entities relevant to the language market
- keep one version with formal register and one with everyday register when the language supports both naturally

### 7.4 Named-entity packs

Each market cluster needs its own named-entity pack.

| Cluster | Required examples |
|---|---|
| Nigeria core | Lagos, Kano, Enugu, National Assembly, CBN, naira, Dangote, Abuja |
| East Africa | Nairobi, Dar es Salaam, Kampala, shilling, parliament, regional rail or fuel references |
| Francophone | Abidjan, Dakar, Kinshasa, CFA franc, ministry names, election commission references |
| North Africa | Cairo, Rabat, Tunis, dinar, ministry names, Arabicized institutional references |
| Regional depth markets | Capital city, major roads, currencies, ministries, common surnames, broadcaster names |

---

## 8. Reviewer Worksheet

Use one row per clip.

### 8.1 Master score sheet

| Language | Provider | Script | Reviewer | Accent /30 | Intelligibility /20 | News fit /15 | Proper nouns /10 | Prosody /10 | Reliability /10 | Ops fit /5 | Total /100 | Launchable? | Notes |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| `pcm` | `YarnGPT` | `Briefing` | `R1` |  |  |  |  |  |  |  |  |  |  |

### 8.2 Reviewer note prompts

Each reviewer should answer all of these in one short sentence each:

1. Does this sound like a speaker from the intended market?
2. Would you trust this voice to deliver serious news every morning?
3. Which words, names, or phrases sounded wrong or unnatural?
4. Would this feel premium, acceptable, or distracting in a Narvo product?

### 8.3 Quick decision tags

Use only these tags to keep notes comparable:

- `authentic`
- `acceptable`
- `generic`
- `foreign-sounding`
- `clear`
- `muddy`
- `broadcast-safe`
- `too robotic`
- `bad names`
- `bad pacing`
- `artifact`

---

## 9. Ops and Performance Checks

Human review is only half of the decision. Narvo also needs operational fit.

### 9.1 Measurements to capture

| Metric | Why it matters |
|---|---|
| Time to first audio | Determines preview and playback responsiveness |
| Full generation time | Matters for lazy generation and first-play waits |
| Failure rate | Expensive endpoint reliability |
| Mean output size per minute | Storage and offline cost |
| Retry behavior | Abuse resistance and timeout handling |
| GPU or runtime requirement | Cloud Run fit and hosting cost |

### 9.2 Operational run sheet

| Language | Provider | Script | Run # | TTFA ms | Full gen ms | Output sec | File size KB | Success | Error type | Notes |
|---|---|---|---:|---:|---:|---:|---:|---|---|---|
| `yo` | `OmniVoice` | `Truth Tag` | 1 |  |  |  |  |  |  |  |

### 9.3 Runtime policy

- Production candidates should complete at least `95%` of benchmark runs successfully
- Fallback-only candidates may be tolerated down to `90%` if they are not customer-facing brand voices
- Any provider that requires a runtime Narvo cannot operate economically in the current architecture is blocked from immediate rollout

---

## 10. Decision Thresholds

### 10.1 Nigeria core

`YarnGPT` stays primary for `en-NG`, `pcm`, `yo`, `ha`, and `ig` unless another provider:

- beats it by at least `10` points overall
- does not lose on accent authenticity
- meets all operational thresholds

### 10.2 New expansion languages

A provider may launch for a new language only if:

- total score is `>= 82`
- accent authenticity is `>= 24/30`
- intelligibility is `>= 16/20`
- reliability is `>= 8/10`
- success rate is `>= 95%`

### 10.3 Beta-only lane

A language can ship as explicitly labeled beta only if:

- total score is `75-81`
- no hard blocker is present
- Narvo positions it as experimental and non-default

### 10.4 Automatic rejection

Reject a provider-language pair when:

- total score is `<75`
- any hard blocker appears in more than one reviewer sheet
- runtime cost or infra complexity is disproportionate to expected demand

---

## 11. Recommended Rollout Policy

### 11.1 Immediate policy

1. keep `YarnGPT` as the production primary for Nigeria
2. run a formal `YarnGPT vs OmniVoice` blind benchmark for the five Nigerian launch languages
3. run `OmniVoice` baseline tests for `fr`, `sw`, and `arb`
4. compare `OmniVoice` against existing fallback quality for those non-Nigeria languages

### 11.2 Practical rollout order

| Order | Language | Purpose |
|---:|---|---|
| 1 | `pcm` | Narvo's sharpest viral and cultural differentiator |
| 2 | `yo` | Core Nigeria launch quality |
| 3 | `ha` | Core Nigeria launch quality |
| 4 | `ig` | Core Nigeria launch quality |
| 5 | `fr` | Broadest first expansion reach |
| 6 | `sw` | Strong East Africa expansion candidate |
| 7 | `arb` | Broad North Africa entry point |
| 8 | `am` | Cluster C pilot after Cluster B is stable |
| 9 | `so` | Cluster C pilot after Cluster B is stable |
| 10 | `ln` or `wo` | Cluster C depth market after evidence of demand |

### 11.3 Product policy

- Nigeria voices are part of Narvo's brand identity, not just a model choice
- non-Nigeria expansion should start with the biggest language bridges first
- lower-demand languages should be generated lazily and cached, not pre-generated at full volume on day one
- every new language should launch with a voice preview, explicit language labeling, and a reversible rollout switch

---

## 12. References

External repositories consulted for this benchmark design:

- `k2-fsa/OmniVoice`
- `k2-fsa/OmniVoice/docs/languages.md`
- `meituan-longcat/LongCat-AudioDiT`

Internal Narvo references:

- `narvo_news/backend/services/yarngpt_service.py`
- `documentations/current/technical/TECHNICAL_REFERENCE.md`
- `documentations/current/Narvo_Technical_Master.md`
- `documentations/current/research/05_Strategic_Opportunities.md`
- `documentations/current/research/07_MVP_Launch_Checklist_and_Grant_Priority.md`

