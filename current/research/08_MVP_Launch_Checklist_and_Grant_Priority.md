# Narvo MVP Launch Checklist and Grant Priority
### What to Ship, What to Pitch, and What to Finish Before Launch

> **Series:** Narvo B2C Revamp Research  
> **Date:** March 30, 2026  
> **Scope:** MVP scope control, launch priorities, tool choices, practical execution tasks, and grant-facing positioning  
> **Status:** Working launch plan

---

## 1. MVP Definition

Narvo's MVP should prove one clear proposition:

> **Narvo can turn the day's most important stories into a trustworthy, low-friction audio briefing in Nigerian-relevant voices, and users will come back for it.**

The MVP is not "all roadmap items working." The MVP is a repeatable user loop:

1. user opens Narvo
2. user understands what Narvo is immediately
3. user hears the gist quickly
4. user trusts what they are hearing
5. user saves, shares, or returns

If a feature does not strengthen that loop, it is not launch-critical.

---

## 2. What Narvo Should Ship

### 2.1 Must-Ship Core

These are the launch-critical surfaces and capabilities.

#### 1. Landing Page That Explains Narvo in Seconds

Must communicate:

- audio-first news product
- multilingual local voice value
- trust and verification layer
- clear CTA into listening

#### 2. Onboarding

Must capture:

- preferred language
- preferred voice
- core interests

This is important because Narvo is not generic news browsing. It is a personalized listening experience.

#### 3. Audio-First Dashboard

The dashboard should foreground:

- Morning Briefing
- breaking stories
- clear playback entry points
- trust cues
- low-friction browsing

#### 4. Story Detail Experience

Each story should support:

- key takeaways
- full gist or full story
- audio playback
- source and verification context

#### 5. Morning Briefing

This is the MVP habit-forming feature.

It must include:

- generation flow
- playback
- transcript fallback
- obvious ready state
- reliable scheduling

#### 6. Truth Tag UX

Narvo's verification and confidence layer must be visible, understandable, and calm.

This is one of Narvo's strongest product differentiators.

#### 7. Offline Save and Replay

Offline capability matters because:

- network quality is inconsistent
- commuting and multitasking are core use cases
- offline audio is a true utility feature

#### 8. Share Flow, Especially WhatsApp

Narvo needs at least one practical distribution loop at launch.

WhatsApp sharing is likely the highest-value early sharing path.

#### 9. Core Security Hardening

Launch should not happen with known high-risk backend trust and abuse issues unresolved.

At minimum, harden:

- auth-sensitive routes
- caller-supplied `user_id` usage
- TTS and expensive endpoint controls
- legacy unauthenticated write paths
- rate limit coverage

---

## 3. What Can Wait

These items are valuable, but they should not sit on the MVP critical path.

### 3.1 Should-Ship After Launch

- paywall and subscriptions
- advanced personalization engine
- premium voice personalization
- broader recommendation sophistication
- richer analytics surfaces in the product
- advanced social or community features

### 3.2 Roadmap / Pitch-Only for Now

- public partner API
- full NaaS platform
- multi-tenant B2B architecture
- enterprise billing and usage metering
- native mobile apps
- advanced realtime infrastructure
- RAG and deeper historical context
- comments, reactions, and community systems

---

## 4. Launch Priority Order

This is the recommended launch execution order.

| Priority | Area | Why it matters |
|----------|------|----------------|
| **P0** | Landing page | Clarifies product instantly, improves conversion |
| **P0** | Dashboard/feed UX | The main product experience starts here |
| **P0** | Pidgin and core voice playback | Strong differentiation and viral potential |
| **P0** | Morning Briefing | Core retention loop |
| **P0** | Truth Tag UX | Trust differentiation |
| **P1** | Offline UX surfacing | Important for real-world utility |
| **P1** | WhatsApp sharing | Practical early growth loop |
| **P1** | Security hardening | Protects launch integrity and costs |
| **P2** | Settings consolidation | Clean-up and UX clarity |
| **P2** | Analytics polish | Useful after core loop is stable |
| **P3** | Monetisation layer | Only after product value is proven |
| **P3** | Social/community features | Not needed to validate core demand |

---

## 5. Grant Narrative vs Shipping Narrative

Narvo should not pitch and ship exactly the same thing.

### 5.1 What Narvo Should Ship

Ship Narvo as:

> **A multilingual, audio-first morning news briefing app with trust signals and offline playback.**

This is focused, believable, and testable.

### 5.2 What Narvo Should Pitch for Grants

Pitch Narvo as:

> **An African-first accessibility and media infrastructure company, starting with a consumer product that proves demand and builds the data loop.**

That lets Narvo frame itself around:

- multilingual information access
- low-bandwidth usability
- local-language inclusion
- media literacy and source transparency
- future infrastructure value for publishers and institutions

### 5.3 Grant-Friendly Themes

The strongest grant themes are:

- accessibility for eyes-busy and low-literacy contexts
- trustworthy information delivery
- local-language access
- African digital inclusion
- responsible AI for public information

### 5.4 Current Best Grant Story

Narvo helps users:

- hear the news in familiar voices
- get the gist without heavy reading
- understand what was verified
- access public information in lower-bandwidth conditions

That is a stronger grant story than generic "AI media startup" language.

---

## 6. Recommended MVP Tools

Narvo does not need a major tooling reset for MVP.

The current stack is already strong enough. The priority is disciplined use, not stack churn.

### 6.1 Keep

- `React + Vite + TypeScript`
- `FastAPI`
- `Supabase`
- `Cloud Run`
- `Sentry`
- `Gemini`
- `YarnGPT`
- current PWA and IndexedDB offline stack

### 6.2 Use Selectively

- `Cloud Scheduler` for reliable Morning Briefing jobs
- `OpenAI TTS` as fallback only
- `Mixpanel` or equivalent if product analytics visibility becomes urgent
- `OneSignal` only if push reliability and dashboard visibility become a bottleneck

### 6.3 Do Not Add for MVP Unless Necessary

- new realtime vendors
- new mobile app frameworks
- enterprise billing infrastructure
- advanced queue architectures beyond immediate need
- large motion/design tooling expansion
- B2B platform infrastructure

The default rule is:

> **Do not add a new tool unless it shortens the path to launch or materially reduces launch risk.**

---

## 7. Practical Tasks Needed to Complete the MVP

### 7.1 Product Scope Lock

- Freeze the MVP definition
- Write down what is explicitly out of scope
- Stop adding features that do not strengthen the launch loop

### 7.2 UX and Copy Alignment

Align the actual product surfaces to:

- [Narvo_Copy_System.md](/Users/ajibolagenius/Desktop/Narvo_Int/documentations/current/design/Narvo_Copy_System.md)
- [Narvo_App_Copy.md](/Users/ajibolagenius/Desktop/Narvo_Int/documentations/current/design/Narvo_App_Copy.md)
- [Narvo_Design_Foundation_v5.md](/Users/ajibolagenius/Desktop/Narvo_Int/documentations/current/design/Narvo_Design_Foundation_v5.md)

### 7.3 Core Flow QA

Test the real user journey:

1. landing
2. onboarding
3. dashboard
4. story playback
5. save offline
6. briefing playback
7. return visit

### 7.4 Security Hardening

Resolve the highest-priority items from:

- [Narvo_Security_Hardening_Checklist_v1.md](/Users/ajibolagenius/Desktop/Narvo_Int/documentations/current/technical/Narvo_Security_Hardening_Checklist_v1.md)

Focus first on:

- auth and route identity trust
- rate limiting
- expensive endpoint protection
- unauthenticated write flows

### 7.5 Reliability and Cost Controls

Set explicit controls for:

- Gemini
- OpenAI
- YarnGPT
- scheduled briefing jobs
- push delivery

Need:

- spend alerts
- fallback logic
- failure monitoring
- retry behavior

### 7.6 Low-Bandwidth and Device QA

Test on:

- poor mobile networks
- slow page loads
- flaky reconnects
- offline transitions
- older Android devices where possible

### 7.7 Source and Content Quality Review

Before launch, verify:

- source attribution is visible
- confidence language is responsible
- voice quality is acceptable in launch languages
- poor-quality or misleading feeds are not dominating outputs

### 7.8 Instrumentation

Track at minimum:

- onboarding completion
- story playback starts
- story playback completion
- Morning Briefing opens
- Morning Briefing play rate
- saves
- shares
- offline downloads

### 7.9 Growth Loop Setup

Before launch, set up:

- WhatsApp share flow
- morning reminder or push path
- clean guest-mode entry
- one clear retention loop around Morning Briefing

### 7.10 Grant and Demo Assets

Prepare:

- one-page product summary
- short product demo script
- short walkthrough video
- problem statement
- impact statement
- user personas
- use-of-funds summary
- roadmap showing shipped now vs funded next

---

## 8. MVP Launch Checklist

### 8.1 Must-Ship

- [ ] Landing page explains Narvo instantly
- [ ] Onboarding captures language, voice, and interests
- [ ] Dashboard feels audio-first
- [ ] Story detail supports takeaways, playback, and trust context
- [ ] Morning Briefing is reliable
- [ ] Truth Tag is visible and understandable
- [ ] Offline save and replay work
- [ ] WhatsApp sharing works
- [ ] High-risk security issues are addressed
- [ ] Errors and cost failures are monitored

### 8.2 Should-Ship

- [ ] Better loading states and interaction polish
- [ ] Stronger push or reminder experience
- [ ] Cleaner settings and preference management
- [ ] Basic behavior analytics dashboard

### 8.3 Cut From MVP If Needed

- [ ] paywall
- [ ] comments and reactions
- [ ] advanced personalization
- [ ] partner API
- [ ] NaaS billing
- [ ] native mobile app
- [ ] advanced realtime infrastructure

---

## 9. Four-to-Six Week Execution Order

### Week 1

- lock MVP scope
- finalize landing copy and core product messaging
- define launch-critical routes and flows
- list all out-of-scope features

### Week 2

- finish landing page and onboarding
- tighten dashboard start-state and audio-first entry
- align live UI to approved copy system

### Week 3

- finish story detail, Truth Tag UX, and Morning Briefing UX
- verify playback quality across launch languages
- tighten offline UX and save/replay reliability

### Week 4

- complete WhatsApp sharing
- harden security-critical backend routes
- add instrumentation and launch analytics
- verify scheduled briefing reliability

### Week 5

- run full QA on mobile, low-bandwidth, and offline scenarios
- fix launch-blocking bugs only
- prepare demo script, screenshots, and grant materials

### Week 6

- soft launch or controlled beta
- measure onboarding completion, playback, and return behavior
- gather user feedback
- finalize grant application narrative with live product evidence

---

## 10. Final Recommendation

Narvo should ship a focused B2C product and pitch a broader infrastructure vision.

The launch story should be:

> **Narvo helps people hear the news clearly, in familiar voices, with trust signals and offline access.**

The grant story should be:

> **Narvo is building multilingual, audio-first information access for African users and the media systems that serve them.**

That is the right balance between discipline and ambition.

---

## 11. Related Documents

- [01_Stack_Analysis_Free_MVP.md](/Users/ajibolagenius/Desktop/Narvo_Int/documentations/current/research/01_Stack_Analysis_Free_MVP.md)
- [05_Strategic_Opportunities.md](/Users/ajibolagenius/Desktop/Narvo_Int/documentations/current/research/05_Strategic_Opportunities.md)
- [Narvo_Security_Hardening_Checklist_v1.md](/Users/ajibolagenius/Desktop/Narvo_Int/documentations/current/technical/Narvo_Security_Hardening_Checklist_v1.md)
- [Narvo_Copy_System.md](/Users/ajibolagenius/Desktop/Narvo_Int/documentations/current/design/Narvo_Copy_System.md)
- [Narvo_App_Copy.md](/Users/ajibolagenius/Desktop/Narvo_Int/documentations/current/design/Narvo_App_Copy.md)
- [naas_startup_strategy.md](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/docs/business/naas_startup_strategy.md)
- [Narvo_Project_Documentation.md](/Users/ajibolagenius/Desktop/Narvo_Int/narvo/docs/business/Narvo_Project_Documentation.md)
