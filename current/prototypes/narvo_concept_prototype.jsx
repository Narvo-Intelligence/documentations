import { useState, useEffect, useRef } from "react";

const P = {
  bg: "#FFFCF5", surface: "#FFFFFF", raised: "#FFF3E0", border: "#F0DCC8",
  primary: "#D4520A", primaryMuted: "#FFF1E8", accent: "#0A6847", accentMuted: "#E6F9F0",
  text: "#1A1207", textSec: "#6B5A40", textDim: "#A69880",
  shadow: "0 2px 12px rgba(180,130,80,0.08)",
  shadowLg: "0 4px 24px rgba(180,130,80,0.12)",
};

const font = {
  d: "'Clash Display', system-ui, sans-serif",
  b: "'Satoshi', system-ui, sans-serif",
  m: "'Geist Mono', monospace",
};

const STORIES = [
  { id: 1, title: "CBN holds interest rates steady at 27.5% amid inflation concerns", source: "Channels TV", time: "2:30", timeFull: "6:15", cat: "Business", catColor: "#D4520A", verified: true },
  { id: 2, title: "Lagos-Calabar highway phase 2 construction officially begins", source: "Punch NG", time: "1:45", timeFull: "5:20", cat: "Politics", catColor: "#C2410C", verified: true },
  { id: 3, title: "AI startup raises $2M seed round in Lagos tech ecosystem", source: "TechCabal", time: "2:00", timeFull: "4:45", cat: "Tech", catColor: "#7C3AED", verified: true },
  { id: 4, title: "Dangote refinery hits 500,000 barrels daily production milestone", source: "Vanguard", time: "2:15", timeFull: "5:00", cat: "Business", catColor: "#D4520A", verified: true },
  { id: 5, title: "Super Eagles qualify for 2027 AFCON with dominant win over Ghana", source: "Guardian NG", time: "1:30", timeFull: "4:10", cat: "Sports", catColor: "#EA580C", verified: false },
  { id: 6, title: "New malaria vaccine rollout begins across northern Nigeria states", source: "Premium Times", time: "2:45", timeFull: "6:30", cat: "Health", catColor: "#0A6847", verified: true },
];

const PLAYLISTS = [
  { id: "morning", name: "Your morning", desc: "Today's top stories, personalised", count: 8, duration: "18 min", emoji: "☀️", color: "#F59E0B", bg: "#FFF8E1" },
  { id: "business", name: "Business today", desc: "Markets, economy, money moves", count: 6, duration: "14 min", emoji: "📊", color: "#D4520A", bg: "#FFF1E8" },
  { id: "lagos", name: "Lagos update", desc: "What's happening in your city", count: 5, duration: "11 min", emoji: "🏙", color: "#7C3AED", bg: "#F3E8FF" },
  { id: "catchup", name: "5-min catch-up", desc: "No time? We got you", count: 3, duration: "5 min", emoji: "⚡", color: "#0A6847", bg: "#E6F9F0" },
  { id: "world", name: "World in brief", desc: "Global stories that matter", count: 6, duration: "15 min", emoji: "🌍", color: "#1D4ED8", bg: "#EFF6FF" },
  { id: "deep", name: "Deep dive", desc: "Longer, richer narratives", count: 4, duration: "22 min", emoji: "🎧", color: "#9333EA", bg: "#F5F3FF" },
];

const RADIO = [
  { name: "Wazobia FM", freq: "95.1", city: "Lagos" },
  { name: "Cool FM", freq: "96.9", city: "Lagos" },
  { name: "BBC Hausa", freq: "—", city: "Global" },
];

function PlayIcon({ size = 20, color = "#fff" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M8 5.14v14l11-7-11-7z"/></svg>;
}
function PauseIcon({ size = 20, color = "#fff" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>;
}
function SkipIcon({ size = 18, color }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color || P.textSec}><path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2V6z"/></svg>;
}
function BookmarkIcon({ size = 18, color }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || P.textSec} strokeWidth="2"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>;
}
function ExpandIcon({ size = 16, color }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || P.textDim} strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>;
}

function ListenTab({ playing, setPlaying, currentStory, setCurrentStory, setExpandedStory, setTab }) {
  const story = STORIES[currentStory];
  const [progress, setProgress] = useState(32);

  useEffect(() => {
    if (!playing) return;
    const iv = setInterval(() => setProgress(p => p >= 100 ? (setCurrentStory(c => (c + 1) % STORIES.length), 0) : p + 0.5), 150);
    return () => clearInterval(iv);
  }, [playing, setCurrentStory]);

  return (
    <div style={{ padding: "0 20px 20px" }}>
      {/* Greeting */}
      <div style={{ padding: "20px 0 16px" }}>
        <div style={{ fontFamily: font.d, fontSize: 26, fontWeight: 600, color: P.text, letterSpacing: "-0.03em", lineHeight: 1.15 }}>Good morning,<br/>Oga</div>
        <div style={{ fontFamily: font.b, fontSize: 13, color: P.textSec, marginTop: 4 }}>Your stream is {playing ? "playing" : "ready"}</div>
      </div>

      {/* Now Playing — the dominant element */}
      <div style={{ backgroundColor: P.surface, borderRadius: 24, boxShadow: P.shadowLg, overflow: "hidden", marginBottom: 20 }}>
        {/* Colour bar */}
        <div style={{ height: 4, background: `linear-gradient(90deg, ${P.primary}, ${P.accent})` }} />

        <div style={{ padding: 24 }}>
          {/* Stream label */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: P.primary, fontFamily: font.b }}>Now playing</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: P.accent, backgroundColor: P.accentMuted, padding: "3px 10px", borderRadius: 20, fontFamily: font.b }}>Your morning</div>
          </div>

          {/* Story info */}
          <div style={{ fontFamily: font.d, fontSize: 19, fontWeight: 600, color: P.text, lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: 6 }}>{story.title}</div>
          <div style={{ fontFamily: font.b, fontSize: 12, color: P.textDim, marginBottom: 20 }}>
            {story.source} · <span style={{ color: story.catColor, fontWeight: 600 }}>{story.cat}</span> · {story.time} summary
            {story.verified && <span style={{ color: P.accent, marginLeft: 6 }}>✓ Verified</span>}
          </div>

          {/* Progress */}
          <div style={{ height: 4, backgroundColor: P.raised, borderRadius: 4, marginBottom: 12, overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, height: "100%", backgroundColor: P.primary, borderRadius: 4, transition: "width 0.15s linear" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
            <span style={{ fontFamily: font.m, fontSize: 10, color: P.textDim }}>0:{String(Math.floor(progress * 1.5 / 100 * 60)).padStart(2, "0")}</span>
            <span style={{ fontFamily: font.m, fontSize: 10, color: P.textDim }}>{story.time}</span>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
            <button onClick={() => setCurrentStory(c => c > 0 ? c - 1 : STORIES.length - 1)} style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: P.raised, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transform: "scaleX(-1)" }}>
              <SkipIcon />
            </button>
            <button onClick={() => setPlaying(!playing)} style={{
              width: 64, height: 64, borderRadius: 20, backgroundColor: P.primary, border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 20px rgba(212,82,10,0.3)", transition: "transform 0.1s",
            }}>
              {playing ? <PauseIcon size={28} /> : <PlayIcon size={28} />}
            </button>
            <button onClick={() => { setCurrentStory(c => (c + 1) % STORIES.length); setProgress(0); }} style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: P.raised, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <SkipIcon />
            </button>
          </div>

          {/* Secondary actions */}
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 16 }}>
            <button onClick={() => setExpandedStory(story)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <ExpandIcon size={18} color={P.textSec} />
              <span style={{ fontFamily: font.b, fontSize: 10, color: P.textSec }}>Read</span>
            </button>
            <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <BookmarkIcon size={18} color={P.textSec} />
              <span style={{ fontFamily: font.b, fontSize: 10, color: P.textSec }}>Save</span>
            </button>
            <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <span style={{ fontSize: 14, color: P.textSec }}>🔗</span>
              <span style={{ fontFamily: font.b, fontSize: 10, color: P.textSec }}>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Up Next */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontFamily: font.d, fontSize: 16, fontWeight: 600, color: P.text, marginBottom: 12, letterSpacing: "-0.01em" }}>Up next</div>
        {STORIES.filter((_, i) => i !== currentStory).slice(0, 3).map((s, i) => (
          <div key={s.id} onClick={() => { setCurrentStory(STORIES.indexOf(s)); setProgress(0); }} style={{
            display: "flex", gap: 12, alignItems: "center", padding: "10px 0",
            borderBottom: i < 2 ? `1px solid ${P.border}` : "none", cursor: "pointer",
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: P.primaryMuted, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <PlayIcon size={14} color={P.primary} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: font.b, fontSize: 13, fontWeight: 600, color: P.text, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.title}</div>
              <div style={{ fontFamily: font.b, fontSize: 10, color: P.textDim }}>{s.source} · {s.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick playlist picks */}
      <div style={{ fontFamily: font.d, fontSize: 16, fontWeight: 600, color: P.text, marginBottom: 12, marginTop: 20, letterSpacing: "-0.01em" }}>Switch stream</div>
      <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 8 }}>
        {PLAYLISTS.slice(0, 4).map(pl => (
          <div key={pl.id} onClick={() => setTab("playlists")} style={{
            minWidth: 120, backgroundColor: pl.bg, borderRadius: 14, padding: 14, cursor: "pointer", flexShrink: 0,
          }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{pl.emoji}</div>
            <div style={{ fontFamily: font.d, fontSize: 13, fontWeight: 600, color: pl.color, letterSpacing: "-0.01em" }}>{pl.name}</div>
            <div style={{ fontFamily: font.b, fontSize: 10, color: P.textDim, marginTop: 2 }}>{pl.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrowseTab({ setExpandedStory, setCurrentStory, setPlaying }) {
  return (
    <div style={{ padding: "0 20px 20px" }}>
      <div style={{ padding: "20px 0 16px" }}>
        <div style={{ fontFamily: font.d, fontSize: 22, fontWeight: 600, color: P.text, letterSpacing: "-0.02em" }}>Browse stories</div>
        <div style={{ fontFamily: font.b, fontSize: 13, color: P.textSec, marginTop: 2 }}>Tap to listen, expand to read</div>
      </div>

      {/* Search */}
      <div style={{ backgroundColor: P.surface, borderRadius: 12, border: `1px solid ${P.border}`, padding: "12px 16px", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: P.textDim, fontSize: 16 }}>🔍</span>
        <span style={{ fontFamily: font.b, fontSize: 13, color: P.textDim }}>Find a story</span>
      </div>

      {/* Category filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
        {["All", "Business", "Politics", "Tech", "Sports", "Health"].map((cat, i) => (
          <button key={cat} style={{
            fontFamily: font.b, fontSize: 12, fontWeight: 600, padding: "6px 16px", borderRadius: 20, border: "none", cursor: "pointer", flexShrink: 0,
            backgroundColor: i === 0 ? P.primary : P.surface, color: i === 0 ? "#fff" : P.textSec,
            boxShadow: i === 0 ? "none" : `inset 0 0 0 1px ${P.border}`,
          }}>{cat}</button>
        ))}
      </div>

      {/* Stories */}
      {STORIES.map((s, i) => (
        <div key={s.id} style={{
          backgroundColor: P.surface, borderRadius: 16, boxShadow: P.shadow, marginBottom: 12,
          border: `1px solid ${P.border}`, overflow: "hidden",
        }}>
          <div style={{ padding: 16, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <button onClick={(e) => { e.stopPropagation(); setCurrentStory(i); setPlaying(true); }} style={{
              width: 48, height: 48, borderRadius: 14, backgroundColor: P.primaryMuted, border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <PlayIcon size={18} color={P.primary} />
            </button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: font.d, fontSize: 14, fontWeight: 600, color: P.text, lineHeight: 1.3, letterSpacing: "-0.01em", marginBottom: 4 }}>{s.title}</div>
              <div style={{ fontFamily: font.b, fontSize: 11, color: P.textDim }}>{s.source} · {s.time} summary · {s.timeFull} full</div>
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: s.catColor, backgroundColor: s.catColor + "15", padding: "2px 8px", borderRadius: 6 }}>{s.cat}</span>
                {s.verified && <span style={{ fontSize: 10, fontWeight: 600, color: P.accent, backgroundColor: P.accentMuted, padding: "2px 8px", borderRadius: 6 }}>Verified</span>}
              </div>
            </div>
            <button onClick={() => setExpandedStory(s)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <ExpandIcon />
            </button>
          </div>
          {/* Listen options */}
          <div style={{ padding: "0 16px 12px", display: "flex", gap: 8 }}>
            <button onClick={() => { setCurrentStory(i); setPlaying(true); }} style={{
              fontFamily: font.b, fontSize: 11, fontWeight: 600, color: P.primary, backgroundColor: P.primaryMuted,
              border: "none", padding: "6px 14px", borderRadius: 8, cursor: "pointer",
            }}>▶ Summary ({s.time})</button>
            <button onClick={() => { setCurrentStory(i); setPlaying(true); }} style={{
              fontFamily: font.b, fontSize: 11, fontWeight: 500, color: P.textSec, backgroundColor: P.raised,
              border: "none", padding: "6px 14px", borderRadius: 8, cursor: "pointer",
            }}>Full story ({s.timeFull})</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function PlaylistsTab({ setTab }) {
  return (
    <div style={{ padding: "0 20px 20px" }}>
      <div style={{ padding: "20px 0 16px" }}>
        <div style={{ fontFamily: font.d, fontSize: 22, fontWeight: 600, color: P.text, letterSpacing: "-0.02em" }}>Playlists</div>
        <div style={{ fontFamily: font.b, fontSize: 13, color: P.textSec, marginTop: 2 }}>Curated streams for every mood</div>
      </div>

      {/* Featured playlist */}
      <div style={{
        background: `linear-gradient(135deg, ${P.primary}18, ${P.accent}12)`,
        borderRadius: 20, padding: 24, marginBottom: 20, border: `1px solid ${P.border}`,
      }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>☀️</div>
        <div style={{ fontFamily: font.d, fontSize: 20, fontWeight: 600, color: P.text, letterSpacing: "-0.02em" }}>Your morning</div>
        <div style={{ fontFamily: font.b, fontSize: 13, color: P.textSec, marginTop: 4, marginBottom: 16 }}>8 stories · 18 min · Updated today at 5:00 AM</div>
        <button style={{
          fontFamily: font.d, fontSize: 14, fontWeight: 600, color: "#fff", backgroundColor: P.primary,
          border: "none", padding: "12px 28px", borderRadius: 14, cursor: "pointer",
          boxShadow: "0 4px 16px rgba(212,82,10,0.25)",
        }}>Oya, Play</button>
      </div>

      {/* Playlist grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {PLAYLISTS.slice(1).map(pl => (
          <div key={pl.id} style={{
            backgroundColor: P.surface, borderRadius: 16, padding: 16, cursor: "pointer",
            border: `1px solid ${P.border}`, boxShadow: P.shadow, transition: "transform 0.15s",
          }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{pl.emoji}</div>
            <div style={{ fontFamily: font.d, fontSize: 14, fontWeight: 600, color: P.text, letterSpacing: "-0.01em", marginBottom: 2 }}>{pl.name}</div>
            <div style={{ fontFamily: font.b, fontSize: 11, color: P.textDim, lineHeight: 1.4 }}>{pl.desc}</div>
            <div style={{ fontFamily: font.m, fontSize: 10, color: P.textDim, marginTop: 8 }}>{pl.count} stories · {pl.duration}</div>
          </div>
        ))}
      </div>

      {/* Live radio */}
      <div style={{ marginTop: 24 }}>
        <div style={{ fontFamily: font.d, fontSize: 16, fontWeight: 600, color: P.text, marginBottom: 12, letterSpacing: "-0.01em" }}>Live radio</div>
        {RADIO.map((r, i) => (
          <div key={r.name} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "12px 0",
            borderBottom: i < RADIO.length - 1 ? `1px solid ${P.border}` : "none",
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "#FEE2E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 16 }}>📻</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: font.b, fontSize: 13, fontWeight: 600, color: P.text }}>{r.name}</div>
              <div style={{ fontFamily: font.m, fontSize: 10, color: P.textDim }}>{r.freq} · {r.city}</div>
            </div>
            <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: P.raised, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <PlayIcon size={14} color={P.primary} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function YouTab() {
  return (
    <div style={{ padding: "0 20px 20px" }}>
      <div style={{ padding: "20px 0 16px" }}>
        <div style={{ fontFamily: font.d, fontSize: 22, fontWeight: 600, color: P.text, letterSpacing: "-0.02em" }}>You</div>
      </div>

      {/* Profile card */}
      <div style={{ backgroundColor: P.surface, borderRadius: 16, padding: 20, border: `1px solid ${P.border}`, boxShadow: P.shadow, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", backgroundColor: P.primaryMuted, border: `2px solid ${P.primary}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: font.d, fontSize: 20, fontWeight: 600, color: P.primary }}>AA</span>
          </div>
          <div>
            <div style={{ fontFamily: font.d, fontSize: 16, fontWeight: 600, color: P.text }}>Ajibola</div>
            <div style={{ fontFamily: font.b, fontSize: 12, color: P.textDim }}>Listening in Yoruba · Lagos</div>
          </div>
        </div>
      </div>

      {/* Voice selection */}
      <div style={{ fontFamily: font.d, fontSize: 16, fontWeight: 600, color: P.text, marginBottom: 12, letterSpacing: "-0.01em" }}>Your voice</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, overflowX: "auto", paddingBottom: 4 }}>
        {["Yoruba", "Pidgin", "Hausa", "Igbo", "English"].map((lang, i) => (
          <div key={lang} style={{
            minWidth: 80, textAlign: "center", padding: "12px 8px", borderRadius: 14, cursor: "pointer",
            backgroundColor: i === 0 ? P.primaryMuted : P.surface,
            border: i === 0 ? `2px solid ${P.primary}` : `1px solid ${P.border}`,
          }}>
            <div style={{ fontFamily: font.b, fontSize: 12, fontWeight: 600, color: i === 0 ? P.primary : P.text }}>{lang}</div>
          </div>
        ))}
      </div>

      {/* Recently played */}
      <div style={{ fontFamily: font.d, fontSize: 16, fontWeight: 600, color: P.text, marginBottom: 12, letterSpacing: "-0.01em" }}>Recently played</div>
      {STORIES.slice(0, 3).map((s, i) => (
        <div key={s.id} style={{ display: "flex", gap: 10, alignItems: "center", padding: "10px 0", borderBottom: i < 2 ? `1px solid ${P.border}` : "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: P.raised, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <PlayIcon size={12} color={P.textDim} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: font.b, fontSize: 12, fontWeight: 600, color: P.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.title}</div>
            <div style={{ fontFamily: font.b, fontSize: 10, color: P.textDim }}>{s.source} · Today</div>
          </div>
        </div>
      ))}

      {/* Settings sections */}
      <div style={{ marginTop: 24 }}>
        {["Notifications", "Appearance", "Offline & storage", "Account", "About Narvo"].map(item => (
          <div key={item} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "14px 0", borderBottom: `1px solid ${P.border}`, cursor: "pointer",
          }}>
            <span style={{ fontFamily: font.b, fontSize: 14, color: P.text }}>{item}</span>
            <span style={{ color: P.textDim, fontSize: 16 }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StoryExpanded({ story, onClose, playing, setPlaying }) {
  if (!story) return null;
  return (
    <div style={{ position: "absolute", inset: 0, backgroundColor: P.bg, zIndex: 50, overflowY: "auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderBottom: `1px solid ${P.border}` }}>
        <button onClick={onClose} style={{ fontFamily: font.b, fontSize: 14, fontWeight: 600, color: P.primary, background: "none", border: "none", cursor: "pointer" }}>← Back</button>
        <div style={{ display: "flex", gap: 12 }}>
          <BookmarkIcon size={20} color={P.textSec} />
          <span style={{ fontSize: 18, color: P.textSec, cursor: "pointer" }}>🔗</span>
        </div>
      </div>

      <div style={{ padding: 20 }}>
        {/* Category + verified */}
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: story.catColor, backgroundColor: story.catColor + "15", padding: "3px 10px", borderRadius: 8 }}>{story.cat}</span>
          {story.verified && <span style={{ fontSize: 11, fontWeight: 600, color: P.accent, backgroundColor: P.accentMuted, padding: "3px 10px", borderRadius: 8 }}>Verified</span>}
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: font.d, fontSize: 24, fontWeight: 600, color: P.text, lineHeight: 1.25, letterSpacing: "-0.02em", margin: "0 0 8px" }}>{story.title}</h1>
        <div style={{ fontFamily: font.b, fontSize: 12, color: P.textDim, marginBottom: 20 }}>{story.source} · {story.time} summary · {story.timeFull} full</div>

        {/* Audio options */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          <button onClick={() => setPlaying(true)} style={{
            fontFamily: font.d, fontSize: 13, fontWeight: 600, color: "#fff", backgroundColor: P.primary,
            border: "none", padding: "10px 20px", borderRadius: 12, cursor: "pointer",
            boxShadow: "0 4px 12px rgba(212,82,10,0.2)", display: "flex", alignItems: "center", gap: 6,
          }}><PlayIcon size={14} /> Summary ({story.time})</button>
          <button style={{
            fontFamily: font.d, fontSize: 13, fontWeight: 600, color: P.primary, backgroundColor: P.primaryMuted,
            border: `1.5px solid ${P.primary}`, padding: "10px 20px", borderRadius: 12, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
          }}><PlayIcon size={14} color={P.primary} /> Full ({story.timeFull})</button>
        </div>

        {/* Key takeaways */}
        <div style={{ backgroundColor: P.accentMuted, borderRadius: 14, padding: 16, marginBottom: 20, borderLeft: `4px solid ${P.accent}` }}>
          <div style={{ fontFamily: font.d, fontSize: 14, fontWeight: 600, color: P.accent, marginBottom: 10 }}>Key takeaways</div>
          {["CBN Monetary Policy Committee voted unanimously to maintain the benchmark rate", "Inflation showed slight improvement dropping to 31.7% in February", "Foreign reserves stabilised at $36.8 billion, providing import cover"].map((t, i) => (
            <div key={i} style={{ fontFamily: font.b, fontSize: 13, color: P.text, lineHeight: 1.6, padding: "4px 0 4px 12px", borderLeft: "none", display: "flex", gap: 8 }}>
              <span style={{ color: P.accent, fontWeight: 700, flexShrink: 0 }}>·</span> {t}
            </div>
          ))}
        </div>

        {/* Full narrative */}
        <div style={{ fontFamily: font.d, fontSize: 16, fontWeight: 600, color: P.text, marginBottom: 10 }}>The full story</div>
        <div style={{ fontFamily: font.b, fontSize: 14, color: P.text, lineHeight: 1.7, marginBottom: 20 }}>
          The Central Bank of Nigeria has opted to maintain its benchmark interest rate at 27.5%, signalling continued caution as the economy navigates persistent inflationary pressures. The decision, announced following the latest Monetary Policy Committee meeting in Abuja, was unanimous among the twelve committee members present.
        </div>
        <div style={{ fontFamily: font.b, fontSize: 14, color: P.text, lineHeight: 1.7, marginBottom: 20 }}>
          Governor Olayemi Cardoso noted that while inflation has shown marginal improvement — easing from 33.2% in January to 31.7% in February — the rate remains well above the bank's target corridor. "We are seeing early signs of stabilisation, but it would be premature to ease monetary conditions at this juncture," Cardoso stated.
        </div>

        {/* Trust Tag */}
        <div style={{ backgroundColor: P.surface, borderRadius: 14, padding: 16, border: `1px solid ${P.border}`, marginBottom: 20 }}>
          <div style={{ fontFamily: font.d, fontSize: 12, fontWeight: 600, color: P.accent, marginBottom: 8, letterSpacing: "0.05em" }}>TRUTH TAG</div>
          <div style={{ fontFamily: font.b, fontSize: 12, color: P.textSec, lineHeight: 1.5 }}>
            Sources: Channels TV, Vanguard, Nairametrics · Fact-checked via Google Fact Check · Confidence: 97% · Synthesised from 3 sources · Translated: Yoruba, Pidgin, Hausa, Igbo, English
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NarvoPrototype() {
  const [tab, setTab] = useState("listen");
  const [playing, setPlaying] = useState(false);
  const [currentStory, setCurrentStory] = useState(0);
  const [expandedStory, setExpandedStory] = useState(null);

  const tabs = [
    { id: "listen", label: "Listen", icon: "🎧" },
    { id: "browse", label: "Browse", icon: "📰" },
    { id: "playlists", label: "Playlists", icon: "📋" },
    { id: "you", label: "You", icon: "👤" },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px 0", backgroundColor: "#0A0C10", minHeight: "100vh" }}>
      <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />

      {/* Phone frame */}
      <div style={{
        width: 375, height: 812, backgroundColor: P.bg, borderRadius: 40, overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)", position: "relative", display: "flex", flexDirection: "column",
        border: "4px solid #1A1E2A",
      }}>
        {/* Status bar */}
        <div style={{ height: 50, backgroundColor: P.bg, display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 28px 6px", flexShrink: 0 }}>
          <span style={{ fontFamily: font.b, fontSize: 14, fontWeight: 600, color: P.text }}>9:41</span>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <div style={{ width: 16, height: 10, borderRadius: 2, border: `1px solid ${P.textDim}`, opacity: 0.5 }} />
            <div style={{ width: 16, height: 10, borderRadius: 2, border: `1px solid ${P.textDim}`, opacity: 0.5 }} />
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", position: "relative" }}>
          {tab === "listen" && <ListenTab playing={playing} setPlaying={setPlaying} currentStory={currentStory} setCurrentStory={setCurrentStory} setExpandedStory={setExpandedStory} setTab={setTab} />}
          {tab === "browse" && <BrowseTab setExpandedStory={setExpandedStory} setCurrentStory={setCurrentStory} setPlaying={setPlaying} />}
          {tab === "playlists" && <PlaylistsTab setTab={setTab} />}
          {tab === "you" && <YouTab />}

          <StoryExpanded story={expandedStory} onClose={() => setExpandedStory(null)} playing={playing} setPlaying={setPlaying} />
        </div>

        {/* Mini player (when not on Listen tab and playing) */}
        {playing && tab !== "listen" && (
          <div onClick={() => setTab("listen")} style={{
            height: 56, backgroundColor: P.surface, borderTop: `1px solid ${P.border}`,
            display: "flex", alignItems: "center", padding: "0 16px", gap: 12, cursor: "pointer",
            boxShadow: "0 -2px 12px rgba(180,130,80,0.08)",
          }}>
            <button onClick={(e) => { e.stopPropagation(); setPlaying(!playing); }} style={{
              width: 36, height: 36, borderRadius: 10, backgroundColor: P.primary, border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <PauseIcon size={16} />
            </button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: font.b, fontSize: 12, fontWeight: 600, color: P.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{STORIES[currentStory].title}</div>
              <div style={{ fontFamily: font.b, fontSize: 10, color: P.textDim }}>{STORIES[currentStory].source}</div>
            </div>
            <SkipIcon size={16} color={P.textSec} />
          </div>
        )}

        {/* Bottom nav */}
        <div style={{
          height: 80, backgroundColor: P.surface, borderTop: `1px solid ${P.border}`,
          display: "flex", alignItems: "flex-start", justifyContent: "space-around", paddingTop: 8, flexShrink: 0,
        }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); setExpandedStory(null); }} style={{
              background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column",
              alignItems: "center", gap: 3, padding: "4px 0", minWidth: 60,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                backgroundColor: tab === t.id ? P.primaryMuted : "transparent", fontSize: 16,
              }}>{t.icon}</div>
              <span style={{
                fontFamily: font.b, fontSize: 10, fontWeight: tab === t.id ? 700 : 400,
                color: tab === t.id ? P.primary : P.textDim,
              }}>{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
