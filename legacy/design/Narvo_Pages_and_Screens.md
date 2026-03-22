# Narvo Pages & Screens

## Design Approach: The News Console

Every page follows the Swiss Grid: clear structure, 1px borders, and a consistent news-panel feel. Layouts work for both desktop (focused reading) and mobile (quick listening and scanning).

*Note: Some design labels (e.g. “Contextual RAG Zone”, “Dubawa monitoring”) refer to future work; the app currently uses Google Fact Check and does not yet use RAG.*

---

## 1. Public & Entry Pages

- **Splash / Loading**
  - Minimalist logo
  - "Grid Breathing" indicator
- **Landing (Hero Dashboard)**
  - The Pitch
  - Primary Broadcast CTA
  - Global Stats grid cells
- **Onboarding (Multi-panel Setup)**
  - **Language & Region Select**: Primary choice for native tongue translation.
  - Voice Preference
  - Interest Matrix
- **Auth (Center Console)**
  - 2FA Setup
  - Secure Login/Signup
  - Biometric prompts

---

## 2. Core News Experience (Broadcast Center)

- **Home Dashboard**
  - **Mobile:** Vertical feed of story cards; bottom navigation for main sections. A compact “now playing” bar stays visible when audio is playing.
  - **Desktop:** Left sidebar (navigation), center (main feed), right sidebar (context and metadata).
  - **Broadcast loop:** Persistent mini-player with waveform and grid-style pulsing when audio plays.
  - **Cards:** Grid layout, 1px borders, no shadows, aligned content.
- **News Detail (Deep Dive)**
  - **Data:** Story from the news API: title, summary, short lead (AI), full narrative (AI, used for audio), image, key takeaways, source, category. If the narrative is missing, the backend generates the lead, full narrative, and takeaways in one step.
  - **Voice:** Uses the user’s chosen voice and language from settings. Audio is generated from the full narrative, not the short lead.
  - **Layout:** Headline → short lead → image → audio bar → key takeaways → full article → source. Text and cards use overflow handling so nothing spills layout.
  - **Playback:** Main bar with play/pause, title, share, bookmark (large touch targets). On mobile, a “Now Playing” bar appears below the hero when this story is playing.
  - **Related content:** Sidebar on desktop, compact block on mobile; recommended stories and metadata (RAG-style recommendations are planned).
- **Morning Briefing**
  - **Data:** Briefings are stored by date. The page loads latest, history, or a specific date; users can generate a new briefing (with an option to force regenerate).
  - **Daily behaviour:** If there’s no briefing for today, the app generates one on load. When the user comes back on a new day, the page loads that day’s briefing.
  - **Layout:** Header (title, generate button, sound-effects toggle), main area (briefing card with play, story list), transcript, and archive. Mobile: single column, archive in a drawer, transcript below stories. Desktop: main column plus sidebar (transcript and archive). Spacing and touch targets follow the design system.
  - **Transcript:** Shown on mobile below the list, on desktop in the sidebar; the current sentence is highlighted during playback.
  - **Sound effects:** Optional intro, section breaks, and outro; toggle in the header.

---

## 3. Analysis & Tools

- **Narrative Duel** (`/narrative-duel`)
  - Compare different narrative angles or versions of a story. Helps users see how framing and synthesis change the message. Loading and empty states follow the design system.
- **Reputation Dashboard** (`/reputation`)
  - View source reputation and trust signals. Shows how sources are weighted and how certainty is scored across stories.
- **Investor Dashboard** (`/investor`)
  - High-level view of content and engagement for investment or partner use. Clustering and metrics are aligned with the news and narrative services.
- **Tools** (`/tools`)
  - Utility and diagnostic tools (e.g. feed checks, API status). Updated as new tools are added.

---

## 4. Library & Navigation

**Mobile:** A bottom navigation bar gives quick access to Dashboard, Discover, Library, Insights, and Settings. The same sections are available in the sidebar on desktop.

- **Search**
  - One search across news, aggregator articles, podcasts, and radio. Filter by source type (All, RSS, Aggregator, Podcast, Radio); sort by latest or relevance. Results: open story, play, or bookmark where applicable. Search term is in the URL (`?q=`) for sharing.
  - Layout: compact header, filter bar, results grid; same idea on desktop and mobile with responsive columns.
- **Discover**
  - **Mobile:** Tabs for Radio (default) and Podcasts. Radio is the main live-listening surface.
  - **Desktop:** Radio (live stations) and Podcasts (episodes, search, sort, categories, offline download) in a grid. A short “content sources” line shows feed and station counts.
  - Playback continues in the background and on the lock screen; play/pause and metadata appear there. Switching between radio and news updates the active source.
- **Library** (Saved + Offline)
  - **Saved:** Bookmarked stories. List with play, remove, open; refreshes when the user returns to the tab.
  - **Offline:** Cached audio and backend-saved articles. List with play, remove, optional storage summary, and clear-all. Same grid and touch targets on desktop and mobile.
- **Insights** (`/insights`)
  - **Tabs:** History and Analytics; tab is reflected in the URL. Default is History.
  - **History:** Listening history (grouped by date): play, title, source, category, time, delete per entry; header has count and “Clear all”. Refreshes on focus; new listens are added when the user plays from elsewhere.
  - **Analytics:** Stats from listening history (listens, minutes, streak, top category, weekly comparison, daily activity, peak hours, top sources). Empty state when there’s no data.

---

## 5. User Profile & Preferences

- **Settings** (`/settings`)
  - Sections: Account, Voice Studio, System, Accessibility. Interest topics use app categories and are saved. Logout ends the session and returns to the homepage. Each sub-page (Account, Voice Studio, etc.) has a Back control to `/settings`.
- **Account** (`/account`)
  - Profile, subscription status, activity. “Manage Plan” goes to Subscription.
- **Subscription** (`/subscription`)
  - Plans: Free, Pro, Enterprise. User can upgrade, downgrade, or cancel. Current plan is shown with a clear “active” state. The page updates when the plan changes (e.g. from another tab or from the backend) and when the user returns to the tab. Layout: header, plan banner, three tier cards with actions; 3 columns on desktop, single column on mobile.
- **Voice Studio** (`/voices`)
  - Choose voice and accent (e.g. Pidgin, Yoruba, Hausa, Igbo). Selection is saved and used for all news and briefing audio. Saves automatically.
- **System** (`/system`)
  - Display (contrast, scale), notifications (haptics, volume), aggregator options. All changes auto-save.
- **Accessibility** (`/accessibility`)
  - Display density, font size, and interaction options (e.g. swipe, zoom). These apply across the app: density affects the feed and grid; font size affects article text and headings; swipe can enable or disable pull-to-refresh on the dashboard.

---

## 6. Admin & Curation Dashboard (Desktop Only)

- **Operation Hub**
  - Real-time user metrics
  - Content ingest volume
  - System health
- **Curation Console**
  - AI summary review panel
  - Paraphrasing adjustment tools
- **Voice Management**
  - TTS performance monitoring
  - Regional voice training status
- **Moderation Zone**
  - Fact-checking status (Dubawa API monitoring)

---

## 7. System States & Events (Global)

- **404 (page not found)**
  - Full-screen message “[SIGNAL LOST]”, code 404. Buttons: Go back and Dashboard. Same grid style and large touch targets.
- **500 (server error)**
  - Full-screen message “[SYSTEM HALT]”, code 500. Buttons: Retry and Dashboard.
- **Empty states**
  - Used when there’s no content (e.g. no search results, no saved stories, offline). One card with icon, title, message, and actions (e.g. refresh, go to feed or settings). Used in Discover and elsewhere.
- **Alerts**
  - Toast-style notifications (success, error, breaking, sync). Vibration when supported; auto-dismiss with a progress bar. Flat style, no shadow.

---

## 8. Additional Improvements

- **Performance:** Content below the fold loads on demand; images use lazy loading where appropriate; long lists (e.g. search, history) may be virtualized.
- **Accessibility:** Error and empty states have focusable buttons with clear focus outline. Alerts are announced to assistive tech and have a labelled dismiss control.
- **Languages:** Error and empty copy comes from locale files (e.g. `en.json`); other languages fall back to English until translated.
- **Reduced motion:** When the user prefers reduced motion, animations and transitions are shortened app-wide.
- **Offline:** Error and empty screens show a short offline hint when the device is offline.
- **Analytics:** 404, 500, and empty states can fire a page-view event so product usage can be tracked.

