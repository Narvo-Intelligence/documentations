# Narvo Intelligence — Brand Guidelines v3

> **Version 3.0 — March 2026**
> Mathematical foundations. OKLCH colour science. Differentiated typefaces. Three brands, one system.

---

## 1. Brand Architecture

### 1.1 The Three Brands

| Brand | Type | Audience | Personality |
|-------|------|----------|-------------|
| **Narvo Intelligence** | Parent / Corporate | Investors, legal, partners | Authoritative, sophisticated, precise |
| **Narvo** | Consumer App (B2C) | End users, listeners, diaspora | Warm, bold, culturally alive |
| **Narvo Platform** | Business (B2B) | Developers, publishers, enterprise | Technical-modern, precise, confident |

### 1.2 The Unifying Principle: Shared Mathematics, Distinct Personality

All three brands share identical mathematical foundations (8px grid, modular type scale formula, spring physics motion, OKLCH colour science). Brands differentiate through colour palette, typeface selection, border radius, and shadow warmth.

### 1.3 When to Use Each Brand

| Context | Brand |
|---------|-------|
| App Store, in-app UI, consumer marketing, social media | **Narvo** |
| API docs, developer portal, B2B website, sales materials | **Narvo Platform** |
| Investor deck, press releases, contracts, corporate website | **Narvo Intelligence** |
| Internal docs mentioning both products | **Narvo Intelligence** |

---

## 2. Typography

### Typefaces Per Brand

| Brand | Display | Body | Mono |
|-------|---------|------|------|
| **Narvo** (B2C) | General Sans (600–700) | General Sans (400–500) | Geist Mono |
| **Narvo Platform** | Geist Sans (600–700) | Geist Sans (400–500) | Geist Mono |
| **Narvo Intelligence** | Instrument Sans (600–700) | Inter (400–500) | Geist Mono |

### Type Scale Formula

```
Size(n) = base × ratio^n
```

| Brand | Base | Ratio | Scale Name |
|-------|------|-------|------------|
| Narvo B2C | 16px | 1.250 | Major Third |
| Narvo Platform | 15px | 1.200 | Minor Third |
| Narvo Intelligence | 16px | 1.333 | Perfect Fourth |

### Font Sources

- General Sans: fontshare.com (free)
- Instrument Sans: fontshare.com (free)
- Geist Sans / Geist Mono: Vercel CDN (free, MIT)
- Inter: Google Fonts / rsms.me (free, OFL)

---

## 3. Colour Palettes (OKLCH)

### Narvo (B2C Consumer)

| Role | OKLCH | Hex | Usage |
|------|-------|-----|-------|
| Background | `oklch(0.98 0.01 75)` | #FDF8F0 | Warm champagne |
| Surface | `oklch(0.96 0.008 75)` | #FAF6EE | Cards |
| Primary | `oklch(0.68 0.18 52)` | #D4850A | Sunset amber CTAs |
| Primary Hover | `oklch(0.63 0.18 50)` | #BE7508 | Hover state |
| Accent | `oklch(0.55 0.20 275)` | #5B5BD6 | Adire indigo |
| Secondary | `oklch(0.58 0.12 175)` | #18967E | Forest teal (verification) |
| Text Primary | `oklch(0.22 0.02 50)` | #2A2420 | Headings, body |
| Text Secondary | `oklch(0.50 0.14 48)` | #6B5A40 | Labels, metadata |

Emotional origin: Lagos golden hour, Yoruba adire resist-dyeing, West African earth tones.

### Narvo Platform (B2B)

| Role | OKLCH | Hex | Usage |
|------|-------|-----|-------|
| Background | `oklch(0.14 0.015 270)` | #0D0F1A | Near black |
| Surface | `oklch(0.17 0.015 270)` | #131526 | Cards |
| Primary | `oklch(0.75 0.14 210)` | #22AAD0 | Electric cyan |
| Accent | `oklch(0.72 0.17 160)` | #34D399 | Emerald |
| Text Primary | `oklch(0.95 0.005 260)` | #ECEEF5 | Light on dark |
| Text Secondary | `oklch(0.62 0.02 260)` | #8890A8 | Labels |

### Narvo Intelligence (Corporate)

| Role | OKLCH | Hex | Usage |
|------|-------|-----|-------|
| Background | `oklch(0.995 0 0)` | #FDFDFD | Clean white |
| Surface | `oklch(0.98 0.003 260)` | #F7F8FA | Cards |
| Primary | `oklch(0.55 0.22 280)` | #5B52EF | Deep indigo |
| Accent | `oklch(0.78 0.16 170)` | #06D6A0 | Mint |
| Text Primary | `oklch(0.18 0.02 260)` | #1A1C30 | Headings |
| Text Secondary | `oklch(0.48 0.02 260)` | #6B6E88 | Labels |

---

## 4. Border Radius

| Token | Narvo B2C | Platform | Intelligence |
|-------|-----------|----------|--------------|
| Cards | 16–20px | 8–10px | 6–8px |
| Buttons | 12px | 6px | 4px |
| Inputs | 8px | 4px | 3px |
| Pills | 9999px | 9999px | 9999px |

---

## 5. Shadows

- **Narvo B2C:** Warm amber-tinted shadows (`rgba(139, 90, 43, ...)`)
- **Narvo Platform:** No box shadows in dark mode — use surface tint elevation
- **Narvo Intelligence:** Neutral shadows (`rgba(0, 0, 0, ...)`)

---

## 6. Brand Personality & Tone

### Narvo B2C
- "Good morning, Oga" — warm, human, culturally grounded
- "Oya, Play" — action-oriented with Nigerian flavour
- "The Full Gist" — conversational, not technical
- Photography: African culture, markets, cityscapes, community

### Narvo Platform
- "Get your API key" — direct, technical, confident
- "News infrastructure, built for scale" — value-forward
- Code as content — copy-paste ready, dark terminal aesthetic
- Imagery: Abstract geometry, dashboard mockups, data visualisation

### Narvo Intelligence
- "Quarterly Report" — institutional, precise
- "The intelligence behind the brands" — corporate authority
- Clean, editorial photography — team, events, press
- Charts and data as visual content

---

## 7. Logo Direction

| Brand | Style |
|-------|-------|
| Narvo Intelligence | Instrument Sans SemiBold. Indigo→mint gradient mark. |
| Narvo | General Sans Bold. Lowercase "narvo." Amber accent. |
| Narvo Platform | Geist Sans. "narvo" semibold + "platform" regular. |

---

## 8. Cross-Brand Rules

### Never Do

- Never mix consumer/platform palettes in the same context
- Never show "Narvo Intelligence" branding in consumer app contexts
- Never use consumer tone ("Oga", "Oya") in Platform or Intelligence materials
- Never use a brand's typeface in another brand's context
- Never use grey box-shadows in the B2C consumer app

---

*See the [Design System v3](Narvo_Design_System_v3.md) for complete mathematical foundations, token architecture, and implementation details.*
