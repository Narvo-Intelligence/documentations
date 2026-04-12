# Narvo B2C Revamp — Research Index

> **Authored:** March 2026  
> **Context:** Pre-revamp and launch research for the Narvo consumer app (narvo_news): stack, UX, competitors, implementation logs, realtime/audio options, and MVP launch priorities.  
> **Author:** Ajibola Akelebe — Founder & Sole Developer, Narvo Intelligence

---

## Purpose

This directory captures the strategic and technical research that informs the **Narvo B2C revamp** — UX redesign, code quality, performance, feature expansion (monetisation, personalisation, offline-first, social), and **shipping an MVP** with grant-ready positioning.

The research supports four goals:

1. **Validate the current stack** — free alternatives that deliver more value at MVP scale  
2. **Map the premium upgrade path** — tools and services to adopt as Narvo scales past MVP  
3. **Define UX best practices** — landing, feed, navigation, audio player, onboarding, and evidence-based patterns  
4. **Understand the competitive landscape** — African news apps, global audio news exits, and differentiation  

Later additions (06–07) add **realtime/audio delivery options** (e.g. hosted WebSocket layers, fanout, TTS/delivery tradeoffs) and a **launch checklist** aligned to grants and scope control. Doc 08 captures **externally researched** enhanced features, fact-checking architecture, monetisation expansion, and technology evaluations — cross-referenced against both the existing research and the `narvo_news` codebase. Doc 09 adds a **speech benchmark and Africa expansion evaluation framework** for comparing Narvo's current TTS stack against multilingual challengers such as OmniVoice.

---

## Documents

| # | File | Summary |
|---|------|---------|
| 1 | [Stack Analysis — Free MVP](./01_Stack_Analysis_Free_MVP.md) | Current stack audit, free-tier alternatives by category, cost breakdown |
| 2 | [Premium Tools Roadmap](./02_Premium_Tools_Roadmap.md) | Scaling-phase tools: payments, CDN, personalisation, analytics, social |
| 3 | [UX Design Patterns](./03_UX_Design_Patterns.md) | Landing page, feed, navigation, audio player, onboarding, microinteractions |
| 4 | [Competitor Analysis](./04_Competitor_Analysis.md) | African news apps, audio news exits (Curio, Artifact, Audm), design lessons |
| 5 | [Strategic Opportunities](./05_Strategic_Opportunities.md) | Narvo's decisive advantages, go-to-market priorities, WhatsApp distribution |
| 6 | [Realtime and Audio Delivery Analysis](./06_Realtime_and_Audio_Delivery_Analysis.md) | **Working draft** — realtime fanout (e.g. Apinator vs polling/Supabase), audio pipeline fit, Q&A conclusions to extend |
| 7 | [MVP Launch Checklist and Grant Priority](./07_MVP_Launch_Checklist_and_Grant_Priority.md) | **Working launch plan** — MVP definition, must-ship core, priorities, grant-facing framing |
| 8 | [Enhanced Features and Monetisation Research](./08_Enhanced_Features_and_Monetisation_Research.md) | **Evaluated draft** — enhanced features, advanced fact-checking AI, expanded monetisation, LangChain evaluation, CertaintyMeter enhancement |
| 9 | [Speech Benchmark and Africa Expansion Evaluation](./09_Speech_Benchmark_and_Africa_Expansion.md) | Production speech scorecard, rollout clusters, reviewer sheets, and launch thresholds for Nigeria-first quality plus Africa expansion |

---

## How to Use This Research

| For… | Start here |
|------|------------|
| **Engineering & stack** | Doc 01 → Doc 02; Doc 08 §5 for LangChain/LangGraph evaluation; cross-check [Technical Reference](../technical/TECHNICAL_REFERENCE.md) and [MVP Implementation Entry Spec](../MVP_Implementation_Entry_Spec.md) |
| **Realtime, WebSockets, audio delivery** | Doc 06 (draft — extend as technical decisions land); Doc 09 for speech model comparison and launch thresholds |
| **Launch scope, grants, “what ships first”** | Doc 07 → Doc 05 for narrative; Doc 01–02 for tooling |
| **UX / design execution** | Doc 03; align with [Design Foundation v5](../design/Narvo_Design_Foundation_v5.md) and [Component Design System v1](../design/Narvo_Component_Design_System_v1.md) |
| **Product & strategy** | Doc 04 + Doc 05; Doc 07 for MVP boundaries |
| **Investor / grant conversations** | Doc 05 + Doc 07 + Doc 08 §2–§4 (proposition, must-ship, differentiation, monetisation expansion) |
| **Historical UI reference (v4 era)** | [Design System v4](../design/Narvo_Design_System_v4.md) — context only during v5 transition |

Copy and tone: [Narvo App Copy](../design/Narvo_App_Copy.md). Master design index: [Narvo Design Master](../Narvo_Design_Master.md).

---

## Revamp Scope (as agreed)

| Driver | Status |
|--------|--------|
| UX / product redesign | ✅ Phase 4 — Starting point |
| Code quality & maintainability | 🔜 Phase 2 |
| Performance | 🔜 Phase 3 |
| Feature additions | 🔜 Phase 5 |

**Feature roadmap confirmed:** Paywall / monetisation (Paystack), offline-first improvements, AI-driven personalisation engine, social features (comments, reactions, sharing).

**Pages being cut:** `ToolsPage`, `NarrativeDuelPage`, `ReputationDashboardPage`  
**Settings consolidation:** `SettingsPage` + `AccountPage` + `SystemSettingsPage` + `AccessibilityPage` → one unified `SettingsPage`

*For execution order and backend crosswalk, prefer [MVP Implementation Entry Spec](../MVP_Implementation_Entry_Spec.md) alongside Doc 07.*

---

## Related Documentation

- [Narvo Design Master](../Narvo_Design_Master.md)  
- [Design Foundation v5](../design/Narvo_Design_Foundation_v5.md)  
- [Component Design System v1](../design/Narvo_Component_Design_System_v1.md)  
- [Narvo App Copy](../design/Narvo_App_Copy.md)  
- [Technical Reference](../technical/TECHNICAL_REFERENCE.md)  
- [MVP Implementation Entry Spec](../MVP_Implementation_Entry_Spec.md)  
- [Current documentation index](../README.md)  
