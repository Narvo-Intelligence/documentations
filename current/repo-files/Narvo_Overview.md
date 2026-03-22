# Narvo Overview

Narvo is a bold, audio-first news companion for Africa. It transforms fragmented, multilingual news into clear spoken stories — delivered in the listener's own language, verified for trust, and designed for busy, mobile-first lives.

A product of **Narvo Intelligence Ltd.**

## Mission

To give everyone access to high-quality news by cutting the noise and delivering an **audio-first experience** — stories that are summarised, rewritten for broadcast, and **spoken in the user's language**. Starting from Nigeria, expanding across the continent and worldwide.

## Core Pillars

- **Audio-First:** News is heard, not read. The entire UX is optimised around listening — play buttons are the largest elements, the audio player is always accessible, and stories are consumed hands-free.
- **Language Inclusion:** Information in your own language is a right, not a luxury. Five Nigerian launch languages (English, Yoruba, Hausa, Igbo, Pidgin) with architecture for continental expansion.
- **Trust Transparency:** Every story carries a Truth Tag showing sources, fact-check results, and confidence score. Users never have to wonder where the information came from.
- **Bold Design:** Warm cream backgrounds, burnt orange (#D4520A) primary, large typography (Clash Display), rounded cards, and warm shadows. The app doesn't whisper — it speaks.
- **Single Codebase:** One repo with a React PWA frontend and FastAPI backend for consistent, maintainable delivery.

## Current Capabilities

- **Morning Briefing:** Daily top stories generated at 5AM, spoken in the user's language, delivered via push notification.
- **Multi-Source Synthesis:** Clusters related reports from 39+ sources into a unified narrative via Google Gemini.
- **5 Nigerian TTS Languages:** English, Pidgin, Yoruba, Hausa, Igbo — with authentic regional accents via YarnGPT.
- **Narrative Duel:** Compare different narrative takes on the same story to see how framing changes the message.
- **Source Reputation:** See how sources are weighted and how certainty is scored (Reputation Dashboard).
- **Full Offline:** Stories and audio cached in IndexedDB. PWA with Service Worker for true offline playback.
- **Investor Dashboard:** Metrics view for partners and investors.

## "The Local Pulse, Refined"

Narvo connects the energy of local African news with clear, reliable delivery. We don't just show headlines; we turn them into a narrative experience that respects the user's time and intelligence.

## Company Structure

| Entity | Type | Description |
|--------|------|-------------|
| **Narvo Intelligence** | Parent Company | AI news infrastructure, IP, corporate operations |
| **Narvo** | B2C Product | Consumer app (this repo) |
| **Narvo Platform** | B2B Product | News-as-a-Service APIs for publishers, developers, enterprise |

## Design Evolution

- **V1:** Bento layout, short summaries
- **V2:** Swiss Grid, broadcast narratives, audio
- **V3 (Current):** Enhanced direction — Clash Display + Satoshi + Geist Mono. Burnt orange + warm cream. Bold, large UI. Human-centred copy ("Good morning, Oga" not "SYSTEM_STATUS"). Two themes (Light default + Dark).

## Tech

React (Vite) + FastAPI. Supabase (PostgreSQL + Auth). Google Gemini. YarnGPT + OpenAI TTS. Google Fact Check. Upstash (Redis, QStash). Deployed on Vercel (frontend) + Google Cloud Run (backend).
