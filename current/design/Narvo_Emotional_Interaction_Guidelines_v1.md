# Narvo Emotional Interaction Guidelines — v1
### Designing Trust, Delight, and Daily Habit Into the Product

> **Version:** 1.0  
> **Date:** March 30, 2026  
> **Author:** Ajibola Akelebe — Founder & Sole Developer, Narvo Intelligence  
> **Depends on:** [Narvo_Design_Foundation_v5.md](./Narvo_Design_Foundation_v5.md), [Narvo_Component_Design_System_v1.md](./Narvo_Component_Design_System_v1.md)  
> **Status:** Approved interaction guideline — implementation pending  

---

## Table of Contents

1. [Purpose](#1-purpose)
2. [Core Interaction Thesis](#2-core-interaction-thesis)
3. [Emotional Design Principles for Narvo](#3-emotional-design-principles-for-narvo)
4. [The Narvo Emotional Ladder](#4-the-narvo-emotional-ladder)
5. [Signature Interaction Moments](#5-signature-interaction-moments)
6. [Product-Surface Guidelines](#6-product-surface-guidelines)
7. [Feedback Loop Rules](#7-feedback-loop-rules)
8. [Motion Rules](#8-motion-rules)
9. [Sound and Haptic Rules](#9-sound-and-haptic-rules)
10. [Trust-Building Interaction Rules](#10-trust-building-interaction-rules)
11. [Premium Perception Rules](#11-premium-perception-rules)
12. [What Narvo Must Never Do](#12-what-narvo-must-never-do)
13. [Implementation Priorities](#13-implementation-priorities)

---

## 1. Purpose

Narvo should not rely on features alone to build user loyalty.

The product needs emotional interaction design so that:

- listening feels rewarding
- trust feels visible
- routine usage feels premium
- the product becomes habit-forming without becoming noisy or manipulative

This document defines how Narvo should create delight, reassurance, rhythm, and attachment through interaction quality.

It is not about making the app playful for its own sake. It is about making the app feel:

- alive
- considered
- human
- trustworthy

### Bridging to implementation

- **Component scale, primitives, and motion timings:** [Narvo_Component_Design_System_v1.md](./Narvo_Component_Design_System_v1.md) (especially §14 *Motion and State Rules*).
- **Where features live by route (Next.js):** `narvo_news/docs/NARVO_APP_ROUTES.md`, aligned to [Narvo_MVP_Page_Surface_Map_v1.md](./Narvo_MVP_Page_Surface_Map_v1.md).

Use the **emotional ladder** (§4) as a QA lens on **briefing entry**, **play / save / download**, and **truth** surfaces before polishing secondary flows.

---

## 2. Core Interaction Thesis

Narvo’s advantage should come from this formula:

> **Calm editorial structure + emotionally rewarding interaction**

That means:

- the layout stays composed
- the typography stays intelligent
- the interaction layer supplies delight, rhythm, and memory

Narvo should feel closer to:

- a trusted morning ritual
- a premium listening product
- a human-guided intelligence tool

It should feel less like:

- a cold feed reader
- a static news website
- a cluttered media dashboard

---

## 3. Emotional Design Principles for Narvo

### 3.1 Reward the User for Paying Attention

Every meaningful action should acknowledge the user in a satisfying way.

Examples:

- tapping play should feel immediate and alive
- saving a story should feel secure and complete
- downloading should feel reliable, not ambiguous
- switching language or voice should feel deliberate and premium

### 3.2 Make Intelligence Feel Human

Narvo’s AI, synthesis, and fact-checking systems should not feel robotic. The interface should translate technical capability into humane confidence.

Examples:

- `TruthTag` should reassure, not intimidate
- `CertaintyMeter` should feel understandable in one glance
- `SourceTimeline` should feel like a confidence trail, not a forensic burden

### 3.3 Create Ritual, Not Just Utility

The most emotionally valuable Narvo surface is not the random article view. It is the repeated ritual:

- open app
- see briefing
- press play
- continue where you left off

The emotional design priority should therefore reinforce repeat behavior.

### 3.4 Small Joy, Not Cartoon Energy

Narvo can be delightful, but the delight must stay mature.

Allowed:

- elegant motion
- crisp confirmations
- subtle glow
- premium transitions
- soft auditory cues

Not allowed:

- confetti logic
- exaggerated bounce
- game-like celebration for ordinary actions
- loud visual reward loops

### 3.5 Trust Is Also an Interaction Problem

Users trust interfaces that:

- respond clearly
- transition cleanly
- explain states visibly
- avoid ambiguity

So for Narvo, emotional design and trust design are not separate tracks.

---

## 4. The Narvo Emotional Ladder

Every major interaction should ideally climb this sequence:

1. **Orientation**  
   The user understands where they are and what they can do.

2. **Confidence**  
   The interface signals reliability and clarity.

3. **Reward**  
   The action produces a satisfying response.

4. **Momentum**  
   The system makes the next action easy and tempting.

5. **Attachment**  
   Repetition creates habit and preference.

Applied to Narvo:

- dashboard gives orientation
- truth systems give confidence
- play/save/download give reward
- queue and continue-listening give momentum
- briefing ritual gives attachment

---

## 5. Signature Interaction Moments

These are the moments Narvo should invest in first.

### 5.1 Morning Briefing Entry

This is the single most important emotional moment in the product.

Desired feeling:

- calm
- premium
- ready
- personal

Interaction guidance:

- the briefing card should reveal itself with gentle authority
- the play CTA should feel slightly more alive than ordinary story actions
- if audio is ready, the system should make readiness obvious
- if autoplay is requested, the transition into playback should feel ceremonial, not abrupt

### 5.2 Play Action

Desired feeling:

- immediate
- confident
- alive

Interaction guidance:

- primary play button reacts in under 100ms
- button state changes should be obvious and elegant
- progress/waveform starts quickly
- active audio state should subtly animate after press confirmation

### 5.3 Save / Bookmark

Desired feeling:

- safe
- retained
- yours

Interaction guidance:

- save action should produce a clean success confirmation
- icon state change alone is not enough
- there should be a lightweight toast or inline confirmation

### 5.4 Download / Offline

Desired feeling:

- dependable
- complete
- under control

Interaction guidance:

- queue start should confirm immediately
- progress must be visible
- completion should feel resolved, not silent

### 5.5 Truth and Verification

Desired feeling:

- reassured
- informed
- grounded

Interaction guidance:

- verification states should appear calm and legible
- loading should not feel uncertain for too long
- transitions from checking to verified/mixed/disputed should feel crisp and informative

### 5.6 Continue Listening

Desired feeling:

- remembered
- frictionless
- personal

Interaction guidance:

- progress should be easy to scan
- the interface should make resuming easier than starting over
- re-entry should feel like the product is keeping up with the user

---

## 6. Product-Surface Guidelines

### 6.1 Dashboard

Goal:

- make the product feel fresh every day without becoming chaotic

Emotional rules:

- first paint should feel calm and premium
- hero card should carry a subtle reveal
- topic rails and cards should respond cleanly on hover/tap
- live and breaking cues should feel sharper than the rest of the feed

### 6.2 News Detail

Goal:

- make reading feel composed and trustworthy

Emotional rules:

- transitions into article view should feel smooth and quiet
- proof systems should reduce anxiety, not add visual burden
- body reading should avoid distracting motion
- bookmark/share/queue actions should still feel crisp and satisfying

### 6.3 Audio Player

Goal:

- make playback feel rich, premium, and continuous

Emotional rules:

- player bar should feel like a living layer
- waveform or mini-bars should reinforce activity
- queue transitions should feel fluid
- active track state should be obvious without shouting

### 6.4 Listen Hub

Goal:

- turn listening into a habit loop

Emotional rules:

- continue-listening rows should feel inviting
- morning briefing should feel like the anchor ritual
- history should feel personal, not archival

### 6.5 Discover

Goal:

- make exploration feel modular, fresh, and low-friction

Emotional rules:

- cards can be slightly more expressive here
- actions like preview, follow, queue, and download should feel quick and polished
- discovery should feel active, but not louder than the player

### 6.6 Settings and Preferences

Goal:

- make control feel empowering, not technical

Emotional rules:

- toggles and preference cards should feel tactile
- changes to language, theme, voice, and accessibility should confirm clearly
- settings should feel curated, not bureaucratic

---

## 7. Feedback Loop Rules

Narvo should use three levels of feedback:

### 7.1 Instant Feedback

Time window:

- `0ms` to `120ms`

Examples:

- button press response
- icon state change
- playback state swap
- toggle movement

### 7.2 Confirming Feedback

Time window:

- `120ms` to `800ms`

Examples:

- save confirmation
- queue add confirmation
- download start
- verified state reveal

### 7.3 Resolving Feedback

Time window:

- `800ms` and above

Examples:

- full download completion
- sync finished
- audio ready
- background process success

Rule:

- every meaningful action should have at least instant and confirming feedback
- every longer task must also have resolving feedback

---

## 8. Motion Rules

### 8.1 Motion Philosophy

Narvo motion should feel:

- composed
- premium
- precise
- slightly soft at the edges

It should not feel:

- springy for fun
- cartoonish
- hyperactive

### 8.2 Motion Categories

### Structural Motion

Use for:

- page transitions
- card reveal
- sheet open/close
- tab change

Rule:

- subtle and clean

### Feedback Motion

Use for:

- button press
- save/bookmark
- toggle
- chip activation

Rule:

- short and satisfying

### Live Motion

Use for:

- waveform
- mini-bars
- now-playing states
- breathing active player shell

Rule:

- looped but quiet

### 8.3 Recommended Timing

| Interaction | Duration |
|------------|----------|
| Press / release | `80ms` to `140ms` |
| Hover / hover-out | `150ms` to `200ms` |
| Card reveal | `220ms` to `320ms` |
| Sheet / modal | `260ms` to `360ms` |
| Toast entrance | `200ms` to `260ms` |
| Progress fill easing | `300ms` to `800ms` depending on context |

### 8.4 Motion Priority Rules

- article reading gets the least motion
- dashboard gets moderate motion
- player and briefing get the most motion
- live/breaking states may use the strongest emphasis

### 8.5 Reduced Motion

When `prefers-reduced-motion` is active:

- decorative motion stops
- state-change clarity must remain
- active audio can still indicate status through static visual cues

---

## 9. Sound and Haptic Rules

Narvo is an audio product. Sound and haptic cues should therefore feel more intentional than in a typical app.

### 9.1 Sound Design Role

Sound should reinforce:

- start of ritual
- completion
- clarity
- continuity

Not every action needs sound.

### 9.2 Approved Sound Moments

- Morning Briefing intro
- Morning Briefing outro
- section-divider or subtle transition cue
- optional sound-theme previews

### 9.3 Haptic Moments

Allowed:

- primary play
- save/bookmark
- queue add
- toggle confirmation
- important success or warning moments

Not allowed:

- haptic spam on every tap
- strong haptic on passive browsing

### 9.4 Synchronisation Rule

If sound, haptic, and motion are used together, they must feel like one event.

Bad:

- button animates immediately
- haptic comes late
- toast appears much later

Good:

- button responds
- haptic lands with press
- confirmation appears almost immediately after

---

## 10. Trust-Building Interaction Rules

Narvo’s strongest differentiator is not only audio. It is the combination of audio and trust.

### 10.1 Trust Must Be Seen Quickly

Users should not have to work hard to understand:

- whether a story is reliable
- whether audio is ready
- whether something saved successfully
- whether playback is actually active

### 10.2 System Intelligence Must Feel Calm

Truth-related states should not feel dramatic.

Preferred emotional tone:

- calm verified confidence
- measured uncertainty
- clear warning

### 10.3 Background Work Must Feel Reliable

If Narvo is:

- prefetching
- generating
- caching
- downloading

the UI should communicate that work cleanly.

Silence during long work erodes trust.

### 10.4 Ambiguity Is the Enemy

Avoid states where the user is unsure:

- did it save?
- is it loading?
- is it playing?
- is this verified?
- did my setting change?

---

## 11. Premium Perception Rules

Premium in Narvo should come from:

- spacing rhythm
- animation polish
- clean state transitions
- clarity of hierarchy
- confident restraint

It should not depend on:

- visual excess
- gradient overload
- loud shadows
- decorative flourish without purpose

### Premium Signals Narvo Should Use

- polished player controls
- elegant briefing reveal
- subtle teal glow on live/high-value actions
- strong article rhythm
- precise metadata
- smooth queue interactions

### Premium Signals Narvo Should Avoid

- over-ornamented cards
- excessive glass everywhere
- motion that feels expensive but distracts from use
- generic “luxury app” darkness

---

## 12. What Narvo Must Never Do

- Never turn emotional design into cartoon behavior.
- Never reward trivial actions more than meaningful ones.
- Never use delight where reassurance is needed.
- Never make trust cues feel like marketing.
- Never make the interface so active that reading suffers.
- Never let breaking/live logic leak into every surface.
- Never confuse “premium” with “slower.”

---

## 13. Implementation Priorities

Implement this interaction layer in this order:

1. **Primary audio actions**  
   Play, pause, queue, continue listening, progress.

2. **Morning Briefing ritual**  
   Entry, start, intro cue, active state, completion.

3. **Trust systems**  
   TruthTag, CertaintyMeter, SourceTimeline state clarity.

4. **Save and offline loops**  
   Bookmark, download, queue confirmation, completion.

5. **Navigation and browsing polish**  
   tab changes, filter chips, card hover/tap response.

6. **Settings and preference reassurance**  
   toggle, language, theme, voice, accessibility.

The implementation test is simple:

> If Narvo feels more human, more premium, and more habit-worthy without becoming noisier, the interaction design is working.
