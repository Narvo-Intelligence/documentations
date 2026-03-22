# Narvo Technical Documentation

Narvo is a news broadcast platform that delivers AI-produced narratives in local, high-quality voices. This document describes how the system is built and how its main parts work.

**What makes it different:** Stories are rewritten for broadcast-style delivery and spoken in regional voices, so news feels local and trustworthy.

---

## Core Features

### Broadcast Experience

- **The Broadcast Loop**: A continuous stream of prioritized news stories, like a radio feed.
- **Native Language Translation**: Stories are synthesized and translated into local languages.
- **Broadcast Paraphrasing**: Narrative-style content is generated with Google Gemini.
- **The Truth Tag**: Clear labelling of AI use, translation, and source verification.
- **Regional Voice Studio**: Users choose from high-quality, culturally appropriate voices.
- **Swiss Grid Feed**: A clear, grid-based layout for reading and scanning.
- **Morning Push Briefings**: Users can subscribe to a daily 5AM briefing delivered via push notification. Optional pre-caching of audio for offline playback remains on the roadmap.

---

## Technical Architecture

### Infrastructure: Single Repository

The project uses a single repository with a **React App (Vite)** web frontend and a **FastAPI** backend. The **Swiss Grid Design System** is applied across the web app.

### Core Stack

| Layer           | Technology                    | Role |
| --------------- | ----------------------------- | ---- |
| **Frontend**    | Create React App (React)      | Web app with routing; installable PWA with offline support. |
| **Backend**     | FastAPI                       | REST API; serves news, briefings, user data, and audio. |
| **Database**    | Supabase (Postgres)           | Stores bookmarks, preferences, briefings, offline articles, listening history, and voice cache. |
| **Auth**        | Supabase Auth                 | Login and user identity; same project as the database. |
| **AI / Narrative** | Google Gemini              | Writes and translates narrative-style stories. |
| **Voice**       | YARNGPT / OpenAI               | Turns story text into spoken audio. |
| **Fact-Check**  | Google Fact Check API         | Source verification; optional, with fallback when not configured. |
| **News / Feeds**| RSS, MediaStack, NewsData     | Ingesting and aggregating news; RSS is primary. |
| **Icons**       | Phosphoricons                 | Consistent icon set across the app. |
| **Motion**      | GSAP + Framer Motion          | Animations and transitions. |
| **Smooth Scroll** | Lenis                        | Smooth, natural scrolling. |

**Operations and quality**

- **Error tracking**: Sentry is used to capture and report frontend errors.
- **Backend availability**: A keep-alive ping from the frontend helps prevent serverless backends from going cold.
- **Backend type checking**: Pyright is used for stricter type checking in the backend codebase.
- **Deployment**: The backend can run in Docker; Cloud Build is used for automated builds and deployment.

### Future / Roadmap

| Area        | Note |
| ----------- | ----- |
| **RAG / context** | Richer historical context for narratives (e.g. vector search). |
| **Voice**   | Additional or premium voice providers (e.g. ElevenLabs). |
| **Fact-check** | Optional regional verification (e.g. Dubawa). |
| **Pre-cache** | Automatic pre-download of morning briefing audio by user locale. |


---

## Current Architecture

### Backend

- **Entry:** [backend/server.py](backend/server.py) sets up the app, CORS, database clients, and routes.
- **Routes:** News (`/api/news`, `/api/news/breaking`, `/api/news/{id}`), briefing (`/api/briefing/*`), user, discover, offline, admin, factcheck, translation, and others. Route logic lives under `backend/routes/` and uses services in `backend/services/`. News is powered by the shared news service and RSS feeds.
- **Extra features:** Source reputation data supports trust and certainty scoring. User-specific push subscriptions allow 5AM briefings to be sent per user.
- **Config:** Environment variables are listed in [backend/.env.example](backend/.env.example) (e.g. `YARNGPT_API_KEY`, `MEDIASTACK_API_KEY`, `NEWSDATA_API_KEY`).

### Frontend

- **Stack:** React (Vite), React Router, Supabase for auth. A single API client at [frontend/src/lib/api.ts](frontend/src/lib/api.ts) talks to the backend using `VITE_BACKEND_URL`. All pages and hooks use this client for data; share and Open Graph URLs use `API_BASE`.
- **PWA:** [frontend/public/manifest.json](frontend/public/manifest.json) and [frontend/public/sw.js](frontend/public/sw.js) define the installable app and offline caching; the service worker is registered from `index.html`.

---

## How Stories Are Produced

### 1. Ingesting Content

- **RSS:** Feeds are fetched and cleaned; optional aggregators (MediaStack, NewsData) can be enabled via API keys.
- **Live / video:** Design allows for future use of live audio or video; current implementation focuses on RSS and aggregators.

### 2. From Raw Content to Broadcast Story

1. **Extract:** Pull key facts and quotes from the source.
2. **Synthesize and translate:** Gemini rewrites content as a narrative and translates it into the user’s language.
3. **Verify:** Google Fact Check is used when configured; otherwise a fallback is used. Truth score and source attribution feed into the Truth Tag.
4. **Truth Tag:** Metadata explains how the story was produced and translated.

Richer context (e.g. vector search) and regional verification (e.g. Dubawa) are on the roadmap.

### 3. Morning Briefings and Push

Users can subscribe to a **daily 5AM briefing** delivered by push notification. Subscriptions are stored per user; the backend sends the briefing at the scheduled time. Automatic pre-download of briefing audio for offline playback is planned for a future release.

---

## Design System: Swiss Grid

### Visual Rules

- **Grid:** 1px borders (`#628141`) define layout. Primary sand (`#EBD5AB`) is used sparingly for active elements only.
- **No shadows:** Flat, clear hierarchy.
- **Numbers:** Monospaced fonts for data (time, speed, storage).

### Interaction

- **Playback feedback:** Subtle pulsing when audio is playing.
- **Haptics:** Distinct vibration patterns for breaking news and sync events.

---

## Success Metrics

- **Audio completion:** Aim for most listeners to hear stories to the end.
- **Trust:** Users can see how stories were synthesized (Truth Tag).
- **Speed:** Playback should start quickly (target under 500ms where possible).
- **Sources:** Primary narratives are verified where fact-check is configured.

---
