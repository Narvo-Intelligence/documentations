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

Later additions (06–08) add **implementation traceability**, **realtime/audio delivery options** (e.g. hosted WebSocket layers, fanout, TTS/delivery tradeoffs), and a **launch checklist** aligned to grants and scope control.

---

## Documents

| # | File | Summary |
|---|------|---------|
| 1 | [Stack Analysis — Free MVP](./01_Stack_Analysis_Free_MVP.md) | Current stack audit, free-tier alternatives by category, cost breakdown |
| 2 | [Premium Tools Roadmap](./02_Premium_Tools_Roadmap.md) | Scaling-phase tools: payments, CDN, personalisation, analytics, social |
| 3 | [UX Design Patterns](./03_UX_Design_Patterns.md) | Landing page, feed, navigation, audio player, onboarding, microinteractions |
| 4 | [Competitor Analysis](./04_Competitor_Analysis.md) | African news apps, audio news exits (Curio, Artifact, Audm), design lessons |
| 5 | [Strategic Opportunities](./05_Strategic_Opportunities.md) | Narvo's decisive advantages, go-to-market priorities, WhatsApp distribution |
| 6 | [Landing Page Implementation](./06_Landing_Page_Implementation.md) | v3 landing **implementation log**: files touched, `LandingPage.tsx` section architecture, shipped status |
| 7 | [Realtime and Audio Delivery Analysis](./07_Realtime_and_Audio_Delivery_Analysis.md) | **Working draft** — realtime fanout (e.g. Apinator vs polling/Supabase), audio pipeline fit, Q&A conclusions to extend |
| 8 | [MVP Launch Checklist and Grant Priority](./08_MVP_Launch_Checklist_and_Grant_Priority.md) | **Working launch plan** — MVP definition, must-ship core, priorities, grant-facing framing |

---

## How to Use This Research

| For… | Start here |
|------|------------|
| **Engineering & stack** | Doc 01 → Doc 02; cross-check [Technical Reference](../technical/TECHNICAL_REFERENCE.md) and [MVP Implementation Entry Spec](../MVP_Implementation_Entry_Spec.md) |
| **Realtime, WebSockets, audio delivery** | Doc 07 (draft — extend as technical decisions land) |
| **Launch scope, grants, “what ships first”** | Doc 08 → Doc 05 for narrative; Doc 01–02 for tooling |
| **UX / design execution** | Doc 03 → Doc 06 (what was built on the landing); align with [Design Foundation v5](../design/Narvo_Design_Foundation_v5.md) and [Component Design System v1](../design/Narvo_Component_Design_System_v1.md) |
| **Product & strategy** | Doc 04 + Doc 05; Doc 08 for MVP boundaries |
| **Investor / grant conversations** | Doc 05 + Doc 08 (proposition, must-ship, differentiation) |
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

*For execution order and backend crosswalk, prefer [MVP Implementation Entry Spec](../MVP_Implementation_Entry_Spec.md) alongside Doc 08.*

---

## Related Documentation

- [Narvo Design Master](../Narvo_Design_Master.md)  
- [Design Foundation v5](../design/Narvo_Design_Foundation_v5.md)  
- [Component Design System v1](../design/Narvo_Component_Design_System_v1.md)  
- [Narvo App Copy](../design/Narvo_App_Copy.md)  
- [Technical Reference](../technical/TECHNICAL_REFERENCE.md)  
- [MVP Implementation Entry Spec](../MVP_Implementation_Entry_Spec.md)  
- [Current documentation index](../README.md)  
