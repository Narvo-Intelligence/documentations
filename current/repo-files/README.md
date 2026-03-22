# Narvo

**Bold, audio-first news for Africa** — AI-synthesised narratives, authentic Nigerian TTS, and the Truth Tag. Built by [Narvo Intelligence](https://github.com/Narvo-Intelligence).

> *The Local Pulse, Refined.*

## What is Narvo?

Narvo transforms fragmented news into clear, spoken stories. It ingests from 39+ sources, synthesises broadcast-grade narratives via AI, translates into five Nigerian languages, generates audio with authentic regional accents, and wraps every story in a transparent Trust Tag.

**This repo** is the Narvo consumer app (B2C) — a React PWA + FastAPI backend. For the business platform (Narvo Platform / NaaS), see the [Company Blueprint](docs/business/Narvo_Intelligence_Company_Blueprint.md).

## Quick Start

### Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env   # Fill in Supabase, Gemini, OpenAI keys
uvicorn server:app --host 0.0.0.0 --port 8000
```

- Health: [http://localhost:8000/api/health](http://localhost:8000/api/health)
- API docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### Frontend (Vite + React)

```bash
cd frontend
npm install
cp .env.example .env   # Set VITE_BACKEND_URL, VITE_PUBLIC_URL, Supabase
npm start
```

- App: [http://localhost:3000](http://localhost:3000)
- Build: `npm run build` → `build/`. Preview: `npm run preview`.

### Environment

- **Backend:** See `backend/.env.example` (Supabase, GEMINI_API_KEY, OPENAI_API_KEY, optional YARNGPT, FRONTEND_ORIGIN for CORS, optional SENTRY_DSN).
- **Frontend:** See `frontend/.env.example` (VITE_BACKEND_URL, VITE_PUBLIC_URL, Supabase auth, optional VITE_SENTRY_DSN). Only `VITE_*` vars are exposed to the client.

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 (Vite), TypeScript, Tailwind CSS, PWA |
| Backend | FastAPI (Python 3.12), Uvicorn |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| AI / LLM | Google Gemini |
| TTS | YarnGPT (Nigerian voices), OpenAI (fallback) |
| Fact-Check | Google Fact Check API |
| Caching | Upstash Redis |
| Scheduling | Upstash QStash |
| Hosting | Vercel (frontend), Google Cloud Run (backend) |

## Design System

Narvo uses the **enhanced design system** (March 2026):

| Token | Value |
|-------|-------|
| Display Font | **Clash Display** (fontshare.com) |
| Body Font | **Satoshi** (fontshare.com) |
| Mono Font | **Geist Mono** (Vercel) |
| Background | `#FFFCF5` (warm cream, light default) |
| Primary | `#D4520A` (burnt orange) |
| Accent | `#0A6847` (deep green) |
| Border Radius | 8–20px (cards, buttons) |
| Shadows | Warm-tinted elevation |

See [Narvo_Design_System.md](docs/design/Narvo_Design_System.md) for the full token set.

## Company Structure

Narvo is a product of **Narvo Intelligence Ltd.**, which operates:

- **Narvo** (this repo) — Consumer app (B2C). Audio-first news for end users.
- **Narvo Platform** — Business platform (B2B). NaaS APIs for publishers, developers, enterprise.

## Docs

- [Technical Reference](docs/technical/TECHNICAL_REFERENCE.md) — Architecture, data model, infrastructure
- [Design System](docs/design/Narvo_Design_System.md) — Tokens, typography, components, themes
- [Brand Guidelines](docs/brand/Narvo_Brand_Guidelines.md) — Three-brand identity system
- [Company Blueprint](docs/business/Narvo_Intelligence_Company_Blueprint.md) — Full strategy document
- [B2C Product Document](docs/product/Narvo_B2C_Product_Document.md) — Concept, flows, screens, tech stack
- [API & PWA Versioning](docs/technical/API_And_PWA_Versioning.md)
- [Google Cloud Run Deploy](docs/configuration/Google_Cloud_Run_Deploy.md)
- [Morning Briefing Cron & Push](docs/configuration/Briefing_Cron_And_Push.md)

## Launch Languages (Nigeria)

| Language | TTS Engine | Interface |
|----------|-----------|-----------|
| English (Nigerian) | OpenAI TTS | Yes |
| Nigerian Pidgin | YarnGPT | Yes |
| Yoruba | YarnGPT | Yes |
| Hausa | YarnGPT | Yes |
| Igbo | YarnGPT | Yes |

Architected for expansion to Ghana, East Africa, and worldwide.

## Author

**Ajibola Akelebe** — Founder & Sole Developer, Narvo Intelligence

- GitHub: [@Narvo-Intelligence](https://github.com/Narvo-Intelligence) (org) · [@ajibolagenius](https://github.com/ajibolagenius) (personal)
