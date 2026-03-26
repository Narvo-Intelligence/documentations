# Narvo B2C Revamp — Research Index

> **Authored:** March 2026  
> **Context:** Pre-revamp research conducted ahead of the Narvo consumer app (narvo_news) restructure, redesign, and feature expansion.  
> **Author:** Ajibola Akelebe — Founder & Sole Developer, Narvo Intelligence

---

## Purpose

This directory captures the strategic and technical research that informs the **Narvo B2C revamp** — a full-cycle effort covering UX redesign, code quality, performance, and new feature additions (monetisation, personalisation engine, offline-first improvements, and social features).

The research was conducted with four goals:

1. **Validate the current stack** — identify free alternatives that deliver more value at MVP scale
2. **Map the premium upgrade path** — tools and services to adopt as Narvo scales past MVP
3. **Define UX best practices** — landing page, feed, navigation, audio player, and onboarding patterns grounded in current industry evidence
4. **Understand the competitive landscape** — African news apps, global audio news exits, and strategic differentiation opportunities

---

## Documents

| # | File | Summary |
|---|------|---------|
| 1 | [Stack Analysis — Free MVP](./01_Stack_Analysis_Free_MVP.md) | Current stack audit, free-tier alternatives by category, cost breakdown |
| 2 | [Premium Tools Roadmap](./02_Premium_Tools_Roadmap.md) | Scaling-phase tools: payments, CDN, personalisation, analytics, social |
| 3 | [UX Design Patterns](./03_UX_Design_Patterns.md) | Landing page, feed, navigation, audio player, onboarding, microinteractions |
| 4 | [Competitor Analysis](./04_Competitor_Analysis.md) | African news apps, audio news exits (Curio, Artifact, Audm), design lessons |
| 5 | [Strategic Opportunities](./05_Strategic_Opportunities.md) | Narvo's 5 decisive advantages, go-to-market priorities, WhatsApp distribution |

---

## How to Use This Research

- **For engineering decisions** → Start with Doc 01 (stack) and Doc 02 (premium roadmap)
- **For UX/design work** → Start with Doc 03 (patterns), cross-reference the [Design System v3](../design/Narvo_Design_System_v3.md) and [Brand Guidelines v3](../brand/Narvo_Brand_Guidelines_v3.md)
- **For product and strategy** → Doc 04 (competitors) + Doc 05 (opportunities)
- **For investor conversations** → Doc 05 (strategic opportunities) provides the core differentiation narrative

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

---

## Related Documentation

- [Design System v3](../design/Narvo_Design_System_v3.md)
- [Brand Guidelines v3](../brand/Narvo_Brand_Guidelines_v3.md)
- [App Copy](../design/Narvo_App_Copy.md)
- [Technical Reference](../technical/TECHNICAL_REFERENCE.md)
- [Narvo Overview](../repo-files/Narvo_Overview.md)
