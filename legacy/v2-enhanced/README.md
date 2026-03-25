# v2 Enhanced Direction (Archived)

> Archived March 2026. Superseded by Design System v3.

This directory contains the "Enhanced Direction" documentation from early March 2026. This was the second design iteration (after Swiss Grid), featuring:

- **Fonts:** Clash Display (display) + Satoshi (body) + Geist Mono (mono) — shared across all brands
- **B2C Palette:** Burnt orange `#D4520A` primary, warm cream `#FFFCF5` background, deep green `#0A6847` accent
- **B2B Palette:** Soft indigo `#818CF8`, rich black `#08090D`
- **Corporate Palette:** Indigo `#6366F1`, charcoal-blue `#0A0C10`
- **Radii:** 14–20px cards, 10–14px buttons (consumer)

## Why It Was Superseded

Design System v3 introduced:
- **OKLCH colour science** for perceptually uniform palettes (replacing arbitrary hex values)
- **Modular type scales** (`Size(n) = base × ratio^n`) with brand-specific ratios
- **Differentiated typefaces** per brand (General Sans, Geist Sans, Instrument Sans) instead of one shared family
- **Three-layer token architecture** (Primitives → Semantics → Components) for proper multi-brand theming
- **Mathematical foundations** for spacing (8px grid), motion (spring physics), elevation (z-axis formula), and layout (golden ratio)

## Files

- `brand/Narvo_Brand_Guidelines.md` + `.docx` — v2 brand guidelines
- `design/Narvo_Design_System.md` — v2 design system tokens
- `design/Narvo_UX_Design_Pivot_Spec.md` — CSS migration guide (Swiss Grid → v2)
- `design/narvo_design_system_spec.jsx` — Interactive v2 component showcase
- `configuration/Project_Configuration.md` — v2 agent rules and design rules
- `prototypes/` — v2 brand boards and variation prototypes
