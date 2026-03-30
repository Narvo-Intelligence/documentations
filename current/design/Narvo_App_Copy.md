# Narvo App Copy: Source of Truth
### Approved User-Facing Strings for the Consumer Product

> **Version:** 2.0  
> **Date:** March 30, 2026  
> **Author:** Ajibola Akelebe — Founder & Sole Developer, Narvo Intelligence  
> **Scope:** Narvo consumer product copy across landing, onboarding, dashboard, stories, Morning Briefing, verification, playback, settings, errors, and notifications  
> **Status:** Approved copy inventory aligned to `Narvo_Copy_System.md`

---

## 1. Purpose

This document is the approved string inventory for the Narvo consumer app.

It should be used together with:

- [Narvo_Copy_System.md](/Users/ajibolagenius/Desktop/Narvo_Int/documentations/current/design/Narvo_Copy_System.md)
- [Narvo_Design_Foundation_v5.md](/Users/ajibolagenius/Desktop/Narvo_Int/documentations/current/design/Narvo_Design_Foundation_v5.md)

This file answers:

- what Narvo should say
- where it should say it
- which line is currently approved

The copy system defines the rules. This file defines the strings.

---

## 2. Global & Brand

| **Key** | **Text** | **Context** |
|---------|----------|-------------|
| `brand_name` | Narvo | Global brand name. |
| `brand_tagline` | Africa's news, spoken clearly. | Primary product tagline. |
| `brand_tagline_alt` | The day's biggest stories, turned into a briefing. | Alternate marketing line. |
| `brand_subtitle` | Less scrolling. More understanding. | Short supporting line. |
| `cta_play` | Oya, Play | Primary play action. |
| `cta_listen` | Start Listening | General listening CTA. |
| `cta_start` | Oya, Let's Go | Onboarding completion CTA. |
| `cta_continue` | Continue | General continuation action. |
| `cta_try_guest` | Try it first | Guest/demo CTA. |
| `status_loading` | Getting your stories ready... | General loading state. |
| `status_syncing` | Catching up on the latest... | Refresh/sync state. |
| `status_translating` | Translating for you... | Translation in progress. |
| `status_connecting_dots` | Connecting the dots for you... | Story synthesis or verification wait state. |
| `status_reconnecting` | Reconnecting the dots... | Recovery state. |

---

## 3. Landing Page

| **Key** | **Text** | **Context** |
|---------|----------|-------------|
| `landing_headline` | Africa's news, spoken clearly. | Hero headline. |
| `landing_headline_alt` | The day's biggest stories, turned into a briefing. | Alternate hero line. |
| `landing_subtitle` | News that speaks your language. Summarised, cross-checked, and read aloud so you can stay informed without looking at a screen. | Hero subtitle. |
| `landing_cta_primary` | Oya, Start Listening | Primary CTA. |
| `landing_cta_secondary` | Try it first | Secondary CTA. |
| `landing_pillar_audio_title` | Audio-First | Feature pillar title. |
| `landing_pillar_audio_desc` | Clear voices, built for your commute, your kitchen, and your morning. | Feature pillar description. |
| `landing_pillar_language_title` | Your Language | Feature pillar title. |
| `landing_pillar_language_desc` | Yoruba, Hausa, Igbo, Pidgin, English. Hear the story the way it fits your world. | Feature pillar description. |
| `landing_pillar_trust_title` | Cross-Checked | Feature pillar title. |
| `landing_pillar_trust_desc` | See the sources, confidence, and context behind every story. | Feature pillar description. |
| `landing_pillar_briefing_title` | Morning Briefing | Feature pillar title. |
| `landing_pillar_briefing_desc` | Wake up to the stories that matter, already sorted for you. | Feature pillar description. |

---

## 4. Onboarding

| **Key** | **Text** | **Context** |
|---------|----------|-------------|
| `onboard_progress` | Step {n} of 3 | Progress label. |
| `onboard_p1_title` | What languages do you speak at home? | Step 1 title. |
| `onboard_p1_desc` | Pick your main language. We'll speak your stories in it. | Step 1 description. |
| `onboard_p2_title` | Who should tell the story today? | Step 2 title. |
| `onboard_p2_desc` | Pick the voice for your briefing. Tap to hear a sample. | Step 2 description. |
| `onboard_p3_title` | What matters to you right now? | Step 3 title. |
| `onboard_p3_desc` | Pick at least 3 topics. We'll shape your feed around them. | Step 3 description. |
| `onboard_complete` | Oya, Let's Go | Completion button. |
| `onboard_skip` | Skip for now | Optional skip action. |

---

## 5. Home Dashboard

| **Key** | **Text** | **Context** |
|---------|----------|-------------|
| `home_greeting_morning` | Good morning, {name} | Before 12:00. |
| `home_greeting_afternoon` | Good afternoon, {name} | 12:00–17:00. |
| `home_greeting_evening` | Good evening, {name} | After 17:00. |
| `home_briefing_ready` | Your briefing is ready | Briefing card status. |
| `home_briefing_meta` | {n} stories · {duration} min | Briefing card metadata. |
| `home_trending` | Trending Now | Section header. |
| `home_latest` | Latest Stories | Section header. |
| `home_breaking` | Breaking | Breaking banner label. |
| `home_recommended` | Picked for You | Recommendations section. |
| `home_empty` | Nothing here yet. Check back soon. | Empty dashboard state. |
| `home_refreshing` | Pull to refresh | Refresh helper text. |

---

## 6. News Detail

| **Key** | **Text** | **Context** |
|---------|----------|-------------|
| `detail_takeaways` | Key Takeaways | Summary header. |
| `detail_full_story` | The Full Story | Main content header. |
| `detail_listen_now` | Hear the full gist | Primary playback CTA. |
| `detail_listen_in` | Listen in {language} | Language indicator. |
| `detail_attribution` | Originally from {source} | Source attribution. |
| `detail_related` | You might also like | Related content header. |
| `detail_save` | Save for later | Save action label. |
| `detail_saved` | Saved | Saved state label. |
| `detail_story_developing` | This story is still developing. | State for lower-certainty or evolving stories. |

---

## 7. Morning Briefing

| **Key** | **Text** | **Context** |
|---------|----------|-------------|
| `briefing_title` | Morning Briefing | Page title. |
| `briefing_ready` | Your briefing is ready | Generated state. |
| `briefing_generating` | Preparing your briefing... | Generation state. |
| `briefing_intro_morning` | Good morning. Narvo has the gist. | Preferred briefing intro line. |
| `briefing_intro_alt` | Here's what matters this morning. | Alternate briefing intro line. |
| `briefing_play_all` | Play All | Full briefing CTA. |
| `briefing_listen_now` | Listen now | General briefing playback CTA. |
| `briefing_meta` | {n} stories · {duration} min | Story count and duration. |
| `briefing_transcript` | Transcript | Transcript header. |
| `briefing_archive` | Past Briefings | Archive header. |
| `briefing_today` | Today | Current-day label. |
| `briefing_ready_toast` | Your briefing is ready. | Success toast. |

---

## 8. Search & Discovery

| **Key** | **Text** | **Context** |
|---------|----------|-------------|
| `search_placeholder` | Find a story | Search input placeholder. |
| `search_voice_cta` | Search by voice | Voice search prompt. |
| `search_no_results` | No stories found for "{query}" | Empty search result. |
| `search_empty` | Start with a topic, place, or headline. | Empty search prompt. |
| `discover_radio` | Live Radio | Section title. |
| `discover_podcasts` | Podcasts | Section title. |
| `discover_trending` | What's Trending | Section title. |
| `discover_for_you` | More to Explore | Discovery section title. |

---

## 9. Voice & Language

| **Key** | **Text** | **Context** |
|---------|----------|-------------|
| `voice_title` | Your Narvo Voice | Voice page title. |
| `voice_subtitle` | Choose how your stories sound | Voice page subtitle. |
| `voice_pick_prompt` | Pick the voice for your briefing | Voice selection helper text. |
| `voice_preview` | Listen to a sample | Voice preview button. |
| `voice_label_english` | English | Voice label. |
| `voice_label_pidgin` | Pidgin | Voice label. |
| `voice_label_yoruba` | Yorùbá | Voice label. |
| `voice_label_hausa` | Hausa | Voice label. |
| `voice_label_igbo` | Igbo | Voice label. |
| `language_title` | Voice & Language | Settings section title. |
| `language_home_question` | What languages do you speak at home? | Language selection question. |

---

## 10. Truth Tag & Verification

| **Key** | **Text** | **Context** |
|---------|----------|-------------|
| `truth_tag_title` | What Narvo could verify | Verification card title. |
| `truth_tag_subtitle` | Here's why we trust this story | Supporting title. |
| `truth_tag_cross_checked` | Cross-checked with {n} sources | Verification evidence line. |
| `truth_tag_confidence` | Confidence: {score}% based on current sources | Confidence label. |
| `truth_tag_sources` | See the sources behind this story | Source disclosure CTA. |
| `truth_tag_developing` | This story is still developing. | Lower-certainty state. |
| `truth_tag_explainer` | Narvo compared the reporting, checked the sources, and scored this story based on what holds up right now. | Explanatory subcopy. |

---

## 11. Playback, Saves, and Feedback

| **Key** | **Text** | **Context** |
|---------|----------|-------------|
| `play_cta` | Listen now | General play action. |
| `play_cta_full_gist` | Hear the full gist | Story playback CTA. |
| `play_cta_story` | Play the story | Alternate story CTA. |
| `pause_cta` | Pause | Playback control. |
| `resume_cta` | Resume | Playback control. |
| `save_cta` | Save for later | Bookmark/save CTA. |
| `save_toast` | Keep this for later. | Save success toast. |
| `save_toast_alt` | Saved. Come back to it anytime. | Alternate save toast. |
| `download_ready` | Ready offline | Download/offline state. |
| `download_in_progress` | Saving for offline... | Offline save state. |
| `download_complete` | Saved for offline. | Offline completion toast. |
| `queue_processing` | Getting this ready for you... | Queue state. |

---

## 12. Library & Offline

| **Key** | **Text** | **Context** |
|---------|----------|-------------|
| `library_saved` | Saved Stories | Library tab title. |
| `library_offline` | Available Offline | Library tab title. |
| `library_empty_saved` | No saved stories yet. Tap the bookmark icon on any story. | Empty saved state. |
| `library_empty_offline` | No offline stories yet. Save stories when you have connectivity. | Empty offline state. |
| `library_storage` | Storage: {used} MB used | Storage meter. |
| `library_clear` | Clear offline data | Clear cache action. |
| `library_clear_confirm` | Clear saved offline audio and stories? | Confirm message. |

---

## 13. Settings

| **Key** | **Text** | **Context** |
|---------|----------|-------------|
| `settings_title` | Settings | Page title. |
| `settings_profile` | Profile | Section title. |
| `settings_voice` | Voice & Language | Section title. |
| `settings_notifications` | Notifications | Section title. |
| `settings_storage` | Storage | Section title. |
| `settings_appearance` | Appearance | Section title. |
| `settings_account` | Account | Section title. |
| `settings_theme_light` | Light | Theme option. |
| `settings_theme_dark` | Dark | Theme option. |
| `settings_theme_system` | System | Theme option. |
| `settings_logout` | Log Out | Logout action. |

---

## 14. Errors, Empty States, and Recovery

| **Key** | **Text** | **Context** |
|---------|----------|-------------|
| `error_generic` | Something went wrong. Try again. | Generic error state. |
| `error_offline` | You're offline. Showing saved stories. | Offline fallback state. |
| `error_network` | Connection is slow. Some features may be limited. | Slow-network warning. |
| `error_signal_fuzzy` | The signal is fuzzy right now. | Softer recovery-oriented error headline. |
| `error_reconnecting` | We're reconnecting the dots. | Recovery message. |
| `error_hold_tight` | Hold tight. Try again shortly. | Recovery helper line. |
| `error_404` | We can't find that page. | 404 state. |
| `error_500` | Our servers are having a moment. Try again shortly. | 500 state. |
| `empty_feed` | Nothing here yet. Check back soon. | Empty feed state. |
| `empty_search` | No stories found for "{query}" | Empty search state. |
| `empty_recommendations` | We'll have more for you soon. | Recommendations empty state. |

---

## 15. Notifications

| **Key** | **Text** | **Context** |
|---------|----------|-------------|
| `push_briefing_title` | Your morning briefing is ready | Morning briefing push title. |
| `push_briefing_body` | {n} stories · {duration} min · Tap to listen | Morning briefing push body. |
| `push_breaking_title` | Breaking: {headline} | Breaking news push title. |
| `push_breaking_body` | Tap to hear the full gist. | Breaking news push body. |

---

## 16. Tone Notes for Implementers

When adding or changing copy in Narvo:

1. Follow [Narvo_Copy_System.md](/Users/ajibolagenius/Desktop/Narvo_Int/documentations/current/design/Narvo_Copy_System.md) first.
2. Use **Warm / Narrative** for onboarding, Morning Briefing, playback, saves, and loading.
3. Use **Clear / Assured** for labels, navigation, settings, and core structure.
4. Use **Precise / Responsible** for Truth Tag, confidence, source attribution, and corrections.
5. Never overclaim certainty.
6. Use Nigerian flavour with restraint.
7. Prefer short, direct, spoken language over technical or corporate wording.

---

## 17. Deprecated Directions

The following directions should not be reintroduced into Narvo copy:

- technical instrument metaphors as the dominant product language
- generic "AI-powered" marketing phrasing
- overconfident verification wording
- cold system-state labels as primary UI copy
- overuse of slang in trust-sensitive contexts
