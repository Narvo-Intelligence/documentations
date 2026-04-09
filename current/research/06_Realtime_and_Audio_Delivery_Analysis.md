# Realtime and Audio Delivery Analysis

Status: Working draft

Date: March 30, 2026

Purpose: Capture the current conclusions from the Narvo Q&A so far. This document is intended to be extended as additional questions are answered.

## 1. How `apinator.io` could benefit Narvo

### Summary

Apinator is best understood as a hosted realtime WebSocket layer for modern applications, not as a replacement for Narvo's core API, TTS, or ingestion stack. Its strongest value to Narvo is in live event delivery: breaking news fanout, dashboard freshness, operational streams, and future partner-facing realtime feeds.

Narvo itself is already a broadcast-grade news pipeline built on React/Vite, FastAPI, Supabase, Gemini, YarnGPT, and OpenAI. Its product and NaaS documents show that the core system already handles ingestion, enrichment, trust, REST delivery, audio generation, and push notifications. Apinator would sit beside that stack as a dedicated realtime transport layer.

### What Apinator offers

Based on its public documentation, Apinator provides:

- Public, private, and presence WebSocket channels
- Multi-region routing
- Automatic reconnect and failover
- Webhooks for channel occupancy and membership events
- Horizontal scaling claims
- A free, community-run model with open-source and self-hostable positioning

### Where Apinator fits Narvo

The best fit is not "replace everything with WebSockets." The best fit is targeted realtime fanout for specific Narvo surfaces.

#### 1. Breaking news can become truly live

Narvo currently still polls for breaking stories on an interval, while also using Supabase Realtime for a breaking-news channel. Apinator could make this cleaner and more immediate by publishing `breaking-news:update` events from the backend to all connected clients instantly.

Benefit:

- Faster time-to-visibility for breaking stories
- Less polling load on the API
- Better alignment with Narvo's broadcast-loop experience

#### 2. Dashboard freshness improves

Narvo's main feed and "new stories" surfaces currently depend on interval refresh and revalidation. Apinator could push:

- new story arrived
- source health changed
- aggregator refresh completed
- recommendation batch ready
- briefing audio ready

Benefit:

- Fewer unnecessary HTTP refreshes
- Faster UI updates
- A more "live newsroom" feel

#### 3. NaaS and partner delivery become stronger

Narvo's NaaS direction already includes future webhooks, public/partner APIs, white-label feeds, and embedded players. Apinator is relevant here because it can serve as the event layer for:

- partner dashboards
- embedded headline widgets
- embedded audio/status feeds
- enterprise alert streams

This is especially useful if Narvo expands from a product app into a partner-facing platform.

#### 4. Internal operational tooling gets easier

Narvo already tracks source health, refresh cycles, and ingest status. Apinator could push operational events to internal tools such as:

- feed failure alerts
- latency spikes
- refresh completion events
- queue and processing progress

Benefit:

- Better internal visibility without constant polling
- More responsive admin and operator dashboards

### What Apinator does not solve

Apinator does not replace Narvo's main platform responsibilities. It does not solve:

- API keys
- rate limiting
- usage metering
- partner billing
- SLA management
- TTS generation itself
- translation or narrative generation
- feed ingestion or enrichment logic

Narvo still needs those capabilities to mature into a full public NaaS platform.

### Main caution

Apinator describes itself as a free, community-driven project. That is attractive for experimentation and beta-stage cost control, but it introduces production risk around:

- support depth
- long-term maintenance
- operational guarantees
- enterprise readiness

For Narvo, the practical recommendation is:

- use Apinator selectively for realtime UX and event fanout
- do not put critical business guarantees on it without validation
- keep fallback paths for important user flows

### Recommendation

Apinator is a good fit for Narvo if Narvo wants to become more event-driven and more partner-ready. It is not the next most important infrastructure investment overall. Narvo's larger strategic gaps still remain public API hardening, authentication, rate limits, metering, and enterprise delivery controls.

Recommended stance:

- adopt Apinator for targeted realtime delivery
- keep Narvo's core API and audio pipeline separate
- treat it as an acceleration layer, not the backbone of the platform

## 2. Which audio format is fast, lightweight, and best suited for distribution?

### Short answer

For Narvo today, the best default distribution format is `MP3`.

### Why MP3 is the right default now

Narvo's current TTS pipeline is already MP3-first end to end:

- YarnGPT requests MP3
- OpenAI fallback requests MP3
- long outputs are concatenated as MP3
- the backend returns `data:audio/mpeg;base64,...`
- the frontend plays and caches those assets directly

That means MP3 currently matches Narvo's implementation, playback model, caching model, and compatibility needs.

MP3 is the strongest default for Narvo because it is:

- broadly compatible across browsers and devices
- simple to cache and replay offline
- easy to distribute to partners and downloads
- operationally low-risk

### Important nuance: Opus is technically better for live speech streaming

If the question is purely about codec efficiency for low-bitrate speech and low-latency streaming, Opus is better than MP3.

However, Narvo is not currently using a true live chunk-streaming TTS architecture. It currently returns completed audio assets for playback and caching. In that reality, MP3 is the better default format for distribution.

So the correct conclusion is:

- MP3 is best for Narvo's default distribution today
- Opus is better for a future low-latency streaming path

## 3. How Narvo should use both formats for maximum optimization

### Recommended model

Narvo should use a two-tier audio strategy:

- `Opus` for immediate playback
- `MP3` for persistence and distribution

This avoids forcing one format to solve two different problems.

### 3.1 Opus for the live "play now" path

Use Opus when Narvo wants the lowest possible time-to-first-audio on supported clients.

Best use cases:

- instant story playback
- voice previews
- "play briefing now"
- low-bandwidth mode
- future segmented/chunked TTS playback

Why:

- better speech quality at low bitrates
- smaller payloads
- better suited to progressive or segmented delivery

### 3.2 MP3 for the durable asset path

Use MP3 as the compatibility and archive asset.

Best use cases:

- offline saves
- downloads
- archived briefings
- partner/API distribution
- fallback playback

Why:

- maximum playback compatibility
- simpler storage and caching behavior
- better downstream interoperability

### 3.3 The most important architectural point

Codec choice alone will not deliver the full speed gain. Narvo gets the biggest improvement only if it changes the delivery model.

The ideal future flow is:

1. Split long text into sentence-bounded chunks
2. Generate the first chunk quickly
3. Start playback immediately
4. Continue generating later chunks in the background
5. Persist a full compatibility asset separately

In that model:

- Opus improves the live path
- MP3 remains the durable path

### 3.4 Practical rollout path for Narvo

#### Short term

Keep MP3 as the default output and make it more speech-efficient:

- mono audio
- speech-optimized settings
- roughly `48-64 kbps` for spoken news

This improves startup time and bandwidth with minimal product risk.

#### Medium term

Add optional Opus output for "play now" flows:

- story playback
- briefing playback
- voice preview

Do this only on clients that support it.

#### Long term

If Narvo adopts true progressive audio delivery:

- use Opus for live segmented playback
- store or export MP3 as the compatibility asset

### Final recommendation

Narvo should not choose a single format for every use case.

The strongest setup is:

- `MP3` as the default distribution format today
- `Opus` as the future low-latency format for immediate playback
- a dual-format strategy once Narvo introduces progressive delivery

## 4. Kyutai Pocket TTS and its advantage for Narvo

### Summary

Kyutai Pocket TTS is a strong experimental fit for Narvo, but not a full replacement for Narvo's current TTS stack.

Its main appeal is that it is designed as a small, CPU-friendly TTS model with streaming-oriented behavior. That makes it relevant to Narvo's goals around faster time-to-first-audio, cheaper fallback generation, and local or self-managed TTS paths. However, its current limitation to English makes it a weak fit as Narvo's primary production voice layer, because Narvo's differentiation depends heavily on multilingual Nigerian-language delivery.

### What Pocket TTS offers

Based on Kyutai's public materials, Pocket TTS is positioned as:

- a compact TTS model
- CPU-friendly rather than GPU-dependent
- suitable for streaming-style synthesis
- capable of low time-to-first-audio
- open for experimentation and local deployment

Kyutai also distinguishes Pocket TTS from its larger server-oriented TTS models, which suggests Pocket TTS is better understood as a lightweight and flexible option rather than the default production-scale serving model.

### Where Pocket TTS helps Narvo

#### 1. Low-cost English fallback

Narvo currently relies on YarnGPT first and OpenAI second for TTS generation. Pocket TTS introduces a third option: a local or self-managed English voice path that does not depend on paid API calls for every request.

Benefit:

- lower marginal cost for English requests
- more control over fallback behavior
- useful backup when external TTS vendors degrade or fail

#### 2. Better experimentation with instant playback

Narvo's current delivery model is asset-first: generate completed audio, return a finished audio URL, then play or cache it. Pocket TTS is attractive because it aligns more naturally with progressive, low-latency generation.

Benefit:

- better R&D path for reducing time-to-first-audio
- useful for experimenting with chunk-first playback
- useful for testing more responsive briefing and story playback flows

#### 3. Local development and internal tools

Pocket TTS is especially valuable in environments where Narvo does not want to depend on live external APIs.

Best use cases:

- local development
- staging environments
- internal operator tools
- admin previews
- quick QA verification of TTS flows

#### 4. Brand voice experimentation for English

If used with clear consent and proper governance, Pocket TTS can support experimentation around a more distinctive Narvo English broadcast voice.

Potential use cases:

- investor demos
- internal prototypes
- controlled brand-voice pilots

### Where Pocket TTS does not fit Narvo well

#### 1. It does not match Narvo's multilingual product edge

Narvo's TTS system is not only about English narration. It is designed around regionally appropriate voices across:

- English
- Yoruba
- Hausa
- Igbo
- Pidgin

Pocket TTS is currently English-only, which means it cannot replace the language coverage Narvo already depends on.

#### 2. It should not replace YarnGPT for local-language production

Narvo's present advantage comes from local-language accessibility and culturally relevant voice output. Pocket TTS does not yet offer that value. For that reason, it should not displace YarnGPT or the current multilingual fallback design for production delivery.

#### 3. Its latency advantage requires delivery changes in Narvo

Pocket TTS is most useful when Narvo actually serves audio progressively. If Narvo keeps the same "generate full asset first, then return it" pattern, Pocket TTS will still help somewhat, but its strongest advantage will remain underused.

#### 4. Voice cloning needs strict trust controls

Narvo's product positioning includes the Truth Tag and a trust-oriented presentation of synthesized content. Any use of cloned or highly personalized voices must be handled carefully so it does not create confusion, impersonation risk, or editorial trust issues.

### Best role for Pocket TTS inside Narvo

The best role is a selective one.

Recommended use:

- English-only fallback
- local and self-hosted development path
- voice preview generation
- R&D on low-latency story and briefing playback
- non-critical internal tooling

Not recommended:

- replacing Narvo's multilingual production TTS layer
- becoming the primary voice engine for Nigerian-language delivery

### Recommendation

Pocket TTS is valuable to Narvo as a lightweight experimental and fallback tool, especially for English and low-latency playback research. It is not a strong primary production substitute for Narvo's current TTS providers because Narvo's real product advantage comes from multilingual, culturally appropriate voice delivery.

The strongest strategic use is:

- keep YarnGPT and OpenAI for current multilingual production needs
- use Pocket TTS for English-only fallback and latency experiments
- evaluate larger Kyutai server-grade models separately if Narvo later wants a deeper self-hosted TTS strategy

## 5. LottieFiles and its advantage for Narvo

### Summary

LottieFiles would benefit Narvo as a lightweight motion asset workflow and branded animation layer. It is not a replacement for Narvo's existing GSAP and Framer Motion stack. Its value is in adding reusable, performant, visually polished motion assets to key product moments without relying on heavier GIF or video files.

Narvo already uses GSAP and Framer Motion for application motion and transitions. There is no current Lottie usage in the repo. That means LottieFiles should be treated as a complementary tool for contained animation assets rather than a foundational motion engine.

### What LottieFiles offers

Based on current public documentation, LottieFiles provides:

- a large animation library
- animation creation and editing tools
- Figma and After Effects integrations
- dotLottie packaging and optimization
- web runtimes and player tooling
- theming and interactivity support through dotLottie

The most relevant production format for Narvo is `dotLottie`, which LottieFiles positions as more compact and more deployment-friendly than raw JSON animation files in many cases.

### Where LottieFiles helps Narvo

#### 1. Better loading and waiting states

Narvo has several flows where users wait for meaningful work to complete:

- TTS generation
- morning briefing generation
- content sync
- feed refresh
- offline download and queue operations

Instead of generic spinners, Narvo could use branded motion states that feel more aligned with its broadcast identity.

Benefit:

- better perceived responsiveness
- stronger premium feel during brief waits
- more cohesive emotional experience

#### 2. More expressive Truth Tag and certainty feedback

Narvo's product identity depends on trust signaling and structured editorial presentation. LottieFiles is a good fit for small, contained animations that reinforce that trust layer.

High-value examples:

- subtle verification check animation
- certainty indicator pulse or glow
- "briefing ready" signal
- sync success state

These are stronger fits than large decorative animations because they support Narvo's functional UX and trust communication.

#### 3. Lightweight mobile-friendly motion

Narvo is mobile-first and serves bandwidth-sensitive users. Lottie and especially dotLottie are useful because they can be much smaller than GIF or embedded video for UI animation use cases.

Benefit:

- lower payload cost
- cleaner scalability across screen sizes
- better fit for installable PWA flows

#### 4. Faster design-to-development motion handoff

Narvo already has a strong design and product language. LottieFiles would help motion assets move from design tools into the frontend with less custom engineering work.

This is especially useful for:

- onboarding flows
- investor/demo storytelling
- reusable branded system states
- product marketing surfaces

#### 5. Theme-aware animation variants

LottieFiles' current dotLottie theming support makes it possible to create animation packages that adapt better to light, dark, and branded theme variants.

For Narvo, this matters in:

- dark-mode or early-morning briefing usage
- brand-accent shifts by feature surface
- maintaining consistent motion language across themes

### Where LottieFiles is less useful for Narvo

#### 1. It should not replace Narvo's app choreography layer

Narvo already uses GSAP and Framer Motion for:

- page transitions
- interactive UI movement
- layout-aware motion
- stateful component transitions

Lottie is not the best tool for those jobs. It is better for packaged animation assets.

#### 2. It does not improve Narvo's core engine directly

LottieFiles does not strengthen:

- ingestion
- TTS generation
- translation
- fact-checking
- realtime data delivery

It improves polish and interaction quality, not Narvo's core audio/news infrastructure.

#### 3. Overuse would weaken Narvo's editorial authority

Narvo's visual system is structured, restrained, and trust-oriented. Too many animated flourishes would make the product feel less authoritative. Lottie should be used selectively and intentionally, mainly for moments of feedback, guidance, or emphasis.

#### 4. Some interactive claims should stay modest

Lottie can support interactivity and themed variants, but Narvo should avoid overpromising highly dynamic behaviors that would really require custom application logic. For example, a stylized "audio active" wave is a good fit; a fully accurate live waveform analyzer is a different implementation problem.

### Best role for LottieFiles inside Narvo

Recommended use:

- morning briefing loading states
- truth and certainty feedback cues
- onboarding and explainer animations
- queue, sync, and download feedback
- investor/demo storytelling assets
- reusable branded micro-interactions

Not recommended:

- replacing GSAP or Framer Motion for UI choreography
- introducing decorative motion everywhere
- treating Lottie as a core engine tool

### Recommendation

LottieFiles is a strong secondary tool for Narvo. It would improve brand polish, mobile-friendly motion delivery, and design-to-dev handoff for contained animation assets. The best approach is:

- keep GSAP and Framer Motion for application motion
- use LottieFiles and dotLottie for reusable branded animation assets
- apply it to high-value UX surfaces where feedback and perceived quality matter

Used this way, LottieFiles supports Narvo's "digital-first" polish without diluting its editorial clarity.

## References

### Narvo code and documentation

- `narvo/README.md`
- `narvo/docs/technical/Narvo_Technical_Documentation.md`
- `narvo/docs/business/Narvo_News_as_a_Service.md`
- `narvo/backend/services/yarngpt_service.py`
- `narvo/frontend/src/components/BreakingNews.tsx`
- `narvo/frontend/src/pages/DashboardPage.tsx`
- `narvo/frontend/src/hooks/useNewsRefresh.ts`
- `narvo/frontend/src/pages/VoiceStudioPage.tsx`
- `narvo/frontend/src/pages/NewsDetailPage.tsx`

### External sources

- Apinator homepage: https://apinator.io/
- Apinator SvelteKit guide: https://apinator.io/for/sveltekit/
- MDN audio codec guide: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Audio_codecs
- RFC 6716 Opus codec: https://www.rfc-editor.org/rfc/rfc6716
- Kyutai TTS: https://kyutai.org/tts
- Kyutai blog: https://kyutai.org/blog
- Pocket TTS model card: https://huggingface.co/kyutai/pocket-tts
- Pocket TTS docs: https://kyutai-labs.github.io/pocket-tts/
- LottieFiles homepage: https://lottiefiles.com/
- dotLottie web docs: https://developers.lottiefiles.com/docs/dotlottie-player/dotlottie-web/
- dotLottie runtimes: https://lottiefiles.com/runtimes
- Lottie theming support: https://help.lottiefiles.com/hc/en-us/articles/40214728966681-Lottie-Theming
