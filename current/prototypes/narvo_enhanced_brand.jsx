import { useState } from "react";

const CURRENT = {
  parent: {
    palette: { bg: "#0F1419", primary: "#3B82F6", accent: "#10B981", text: "#F1F5F9", border: "#2D3F54" },
    display: "'Instrument Serif', serif",
    label: "Instrument Serif + Deep Navy + Blue",
  },
  consumer: {
    palette: { bg: "#FAFAF7", primary: "#2D6A4F", accent: "#E07A2F", text: "#1A1A18", border: "#E8E0D8" },
    display: "'Fraunces', serif",
    label: "Fraunces + Off-White + Forest Green",
  },
  business: {
    palette: { bg: "#09090B", primary: "#A78BFA", accent: "#22D3EE", text: "#FAFAFA", border: "#3F3F46" },
    display: "'Space Grotesk', sans-serif",
    label: "Space Grotesk + Black + Purple",
  },
};

const ENHANCED = {
  parent: {
    name: "Narvo Intelligence",
    role: "Parent Company",
    tagline: "The intelligence layer powering African media",
    description: "A modern AI company, not a law firm. Signals innovation, technical depth, and global ambition. Clean enough for boardrooms, bold enough for tech conferences.",
    tone: ["Modern-Institutional", "Forward-thinking", "Precise"],
    palette: {
      bg: "#0A0C10",
      surface: "#11141C",
      surfaceRaised: "#1A1E2A",
      border: "#262D3D",
      primary: "#6366F1",
      primaryMuted: "#1E1B4B",
      accent: "#06D6A0",
      text: "#F0F2F5",
      textSecondary: "#8B95A8",
      textDim: "#5A6478",
    },
    typography: {
      display: "'Clash Display', system-ui, sans-serif",
      body: "'Satoshi', system-ui, sans-serif",
      mono: "'Geist Mono', 'JetBrains Mono', monospace",
    },
    designNotes: "Clash Display gives geometric authority without feeling dated. Indigo primary is tech-forward (Stripe, Linear energy). Mint accent adds freshness. Satoshi body is modern and highly legible. Deep charcoal-blue is richer than pure black.",
  },
  consumer: {
    name: "Narvo",
    role: "Consumer App (B2C)",
    tagline: "The Local Pulse, Refined.",
    description: "Bold, vibrant, unapologetically African. Large type, strong colours, generous spacing. The app radiates energy and confidence. It doesn't whisper — it speaks.",
    tone: ["Bold", "Vibrant", "Culturally-alive"],
    palette: {
      bg: "#FFFCF5",
      surface: "#FFFFFF",
      surfaceRaised: "#FFF3E0",
      border: "#F0DCC8",
      primary: "#D4520A",
      primaryMuted: "#FFF1E8",
      accent: "#0A6847",
      text: "#1A1207",
      textSecondary: "#6B5A40",
      textDim: "#A69880",
    },
    typography: {
      display: "'Clash Display', system-ui, sans-serif",
      body: "'Satoshi', system-ui, sans-serif",
      mono: "'Geist Mono', monospace",
    },
    designNotes: "Deep burnt orange primary is bold, warm, and unmistakably African — like sunset over Lagos. Forest green accent grounds it. Large display type (Clash Display shared with parent for family cohesion). Warm cream background feels luxurious, not clinical. Everything is big, touch-friendly, and confident.",
  },
  business: {
    name: "Narvo Platform",
    role: "Business Platform (B2B)",
    tagline: "News infrastructure, built for scale.",
    description: "Technical authority with a contemporary edge. Not generic dev-tool dark mode — a distinctive identity that signals 'this is infrastructure built by people who care about craft.'",
    tone: ["Technical-Modern", "Confident", "Distinctive"],
    palette: {
      bg: "#08090D",
      surface: "#101218",
      surfaceRaised: "#1A1D26",
      border: "#282D3A",
      primary: "#818CF8",
      primaryMuted: "#1E1B4B",
      accent: "#34D399",
      text: "#ECEEF2",
      textSecondary: "#8891A5",
      textDim: "#565E72",
    },
    typography: {
      display: "'Clash Display', system-ui, sans-serif",
      body: "'Satoshi', system-ui, sans-serif",
      mono: "'Geist Mono', 'JetBrains Mono', monospace",
    },
    designNotes: "Softer indigo primary (less saturated than parent, more developer-friendly). Emerald accent for success/active states. Clash Display shared across all three brands creates a strong family signature while each palette differentiates. Geist Mono is cleaner and more modern than JetBrains Mono.",
  },
};

function Swatch({ color, label, size = 40 }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: size, height: size, borderRadius: 10, backgroundColor: color, border: "1px solid rgba(255,255,255,0.08)", margin: "0 auto 4px" }} />
      <div style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.4)", fontFamily: "'Geist Mono', monospace" }}>{label}</div>
      <div style={{ fontSize: 8, color: "rgba(255,255,255,0.25)", fontFamily: "'Geist Mono', monospace" }}>{color}</div>
    </div>
  );
}

function EnhancedBrandCard({ brand, brandKey }) {
  const p = brand.palette;
  const t = brand.typography;
  const isConsumer = brandKey === "consumer";

  return (
    <div style={{ backgroundColor: p.bg, borderRadius: 20, padding: 28, border: `1.5px solid ${p.border}`, flex: 1, minWidth: 0, transition: "all 0.3s ease" }}>
      {/* Badge */}
      <div style={{ display: "inline-block", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: p.primary, backgroundColor: p.primaryMuted, padding: "4px 10px", borderRadius: 8, marginBottom: 14 }}>
        {brand.role}
      </div>

      {/* Name */}
      <h2 style={{ fontFamily: t.display, fontSize: 32, fontWeight: 600, color: p.text, margin: "0 0 4px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
        {brand.name}
      </h2>
      <p style={{ fontFamily: t.body, fontSize: 14, color: p.accent, margin: "0 0 16px", fontWeight: 500 }}>{brand.tagline}</p>

      {/* Description */}
      <p style={{ fontFamily: t.body, fontSize: 13, color: p.textSecondary, lineHeight: 1.6, margin: "0 0 20px" }}>{brand.description}</p>

      {/* Tone */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {brand.tone.map(t2 => (
          <span key={t2} style={{ fontSize: 10, fontWeight: 600, color: p.textSecondary, backgroundColor: p.surfaceRaised, border: `1px solid ${p.border}`, padding: "3px 10px", borderRadius: 20 }}>{t2}</span>
        ))}
      </div>

      {/* Palette */}
      <div style={{ display: "flex", gap: 8, justifyContent: "space-between", marginBottom: 20, backgroundColor: p.surface, borderRadius: 12, padding: 14, border: `1px solid ${p.border}` }}>
        <Swatch color={p.bg} label="BG" />
        <Swatch color={p.surface} label="Surface" />
        <Swatch color={p.primary} label="Primary" />
        <Swatch color={p.accent} label="Accent" />
        <Swatch color={p.text} label="Text" />
      </div>

      {/* Typography Preview */}
      <div style={{ backgroundColor: p.surfaceRaised, borderRadius: 12, padding: 16, border: `1px solid ${p.border}`, marginBottom: 20 }}>
        <div style={{ fontFamily: t.display, fontSize: 26, fontWeight: 600, color: p.text, marginBottom: 6, letterSpacing: "-0.02em" }}>
          {isConsumer ? "Good morning, Oga" : brand.name}
        </div>
        <div style={{ fontFamily: t.body, fontSize: 13, color: p.textSecondary, marginBottom: 8, lineHeight: 1.5 }}>
          {isConsumer ? "Your briefing is ready. 5 stories, spoken in Yoruba." : "Body text in Satoshi — modern, geometric, highly legible."}
        </div>
        <div style={{ fontFamily: t.mono, fontSize: 11, color: p.textDim }}>
          {brandKey === "business" ? "$ curl /api/v1/narrative -H 'Auth: Bearer sk_...'" : "const pipeline = 'intelligence';"}
        </div>
      </div>

      {/* Design Notes */}
      <p style={{ fontSize: 11, color: p.textDim, lineHeight: 1.5, fontStyle: "italic", fontFamily: t.body, margin: 0 }}>{brand.designNotes}</p>
    </div>
  );
}

function MockConsumer({ brand }) {
  const p = brand.palette;
  const t = brand.typography;
  return (
    <div style={{ backgroundColor: p.bg, borderRadius: 16, padding: 20, border: `1px solid ${p.border}` }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: p.textDim, marginBottom: 14 }}>App Preview</div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ fontFamily: t.display, fontSize: 22, fontWeight: 600, color: p.primary, letterSpacing: "-0.02em" }}>narvo</span>
        <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: p.primaryMuted, border: `2px solid ${p.primary}` }} />
      </div>

      {/* Greeting - BIG and bold */}
      <div style={{ fontFamily: t.display, fontSize: 28, fontWeight: 600, color: p.text, lineHeight: 1.15, marginBottom: 4, letterSpacing: "-0.02em" }}>Good morning,<br />Oga</div>
      <div style={{ fontFamily: t.body, fontSize: 13, color: p.textSecondary, marginBottom: 20 }}>Your briefing is ready</div>

      {/* Featured story card - LARGE */}
      <div style={{ backgroundColor: p.surface, borderRadius: 16, overflow: "hidden", border: `1px solid ${p.border}`, marginBottom: 12 }}>
        {/* Coloured header bar */}
        <div style={{ height: 4, backgroundColor: p.primary }} />
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: p.primaryMuted, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 22, color: p.primary }}>&#9654;</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: t.display, fontSize: 16, fontWeight: 600, color: p.text, lineHeight: 1.25, marginBottom: 4, letterSpacing: "-0.01em" }}>CBN Holds Interest Rates Steady at 27.5%</div>
              <div style={{ fontFamily: t.body, fontSize: 11, color: p.textDim }}>Channels TV &middot; 3 min listen</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
            <span style={{ fontSize: 10, fontWeight: 600, backgroundColor: p.primaryMuted, color: p.primary, padding: "3px 10px", borderRadius: 8 }}>Business</span>
            <span style={{ fontSize: 10, fontWeight: 600, backgroundColor: "#E6F9F0", color: p.accent, padding: "3px 10px", borderRadius: 8 }}>Verified</span>
          </div>
        </div>
      </div>

      {/* Second story */}
      <div style={{ backgroundColor: p.surface, borderRadius: 16, padding: 14, border: `1px solid ${p.border}`, display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, ${p.accent}22, ${p.accent}44)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 18, color: p.accent }}>&#9654;</span>
        </div>
        <div>
          <div style={{ fontFamily: t.display, fontSize: 14, fontWeight: 600, color: p.text, lineHeight: 1.25, letterSpacing: "-0.01em" }}>Lagos-Calabar Highway Phase 2</div>
          <div style={{ fontFamily: t.body, fontSize: 10, color: p.textDim }}>Punch NG &middot; 4 min &middot; Pidgin available</div>
        </div>
      </div>
    </div>
  );
}

function MockPlatform({ brand }) {
  const p = brand.palette;
  const t = brand.typography;
  return (
    <div style={{ backgroundColor: p.bg, borderRadius: 16, padding: 20, border: `1px solid ${p.border}` }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: p.textDim, marginBottom: 14 }}>Website Preview</div>

      {/* Nav */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, paddingBottom: 14, borderBottom: `1px solid ${p.border}` }}>
        <span style={{ fontFamily: t.display, fontSize: 18, fontWeight: 600, color: p.text, letterSpacing: "-0.02em" }}>narvo</span>
        <span style={{ fontFamily: t.display, fontSize: 18, fontWeight: 400, color: p.textDim }}>platform</span>
      </div>

      {/* Hero */}
      <div style={{ fontFamily: t.display, fontSize: 26, fontWeight: 600, color: p.text, lineHeight: 1.15, marginBottom: 8, letterSpacing: "-0.03em" }}>
        News infrastructure,<br />built for scale.
      </div>
      <p style={{ fontFamily: t.body, fontSize: 12, color: p.textSecondary, lineHeight: 1.5, marginBottom: 16, margin: "0 0 16px" }}>
        Narrative synthesis, translation, and TTS APIs for African media.
      </p>

      {/* Code block */}
      <div style={{ backgroundColor: p.surfaceRaised, borderRadius: 10, padding: 14, fontFamily: t.mono, fontSize: 11, border: `1px solid ${p.border}`, lineHeight: 1.8, marginBottom: 14 }}>
        <span style={{ color: p.textDim }}>$</span> <span style={{ color: p.accent }}>curl</span> <span style={{ color: p.text }}>narvo.news/api/v1/narrative</span> \<br />
        &nbsp;&nbsp;<span style={{ color: p.primary }}>-H</span> <span style={{ color: "#F59E0B" }}>"Authorization: Bearer sk_..."</span> \<br />
        &nbsp;&nbsp;<span style={{ color: p.primary }}>-d</span> <span style={{ color: "#F59E0B" }}>'{"{"}source_url: "..."{"}"}'</span>
      </div>

      {/* Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {[["98.2%", "Accuracy"], ["$0.08", "Per User"], ["5", "Languages"]].map(([v, l]) => (
          <div key={l} style={{ backgroundColor: p.surface, borderRadius: 10, padding: 12, border: `1px solid ${p.border}`, textAlign: "center" }}>
            <div style={{ fontFamily: t.mono, fontSize: 18, fontWeight: 700, color: p.primary }}>{v}</div>
            <div style={{ fontSize: 9, color: p.textDim, marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockParent({ brand }) {
  const p = brand.palette;
  const t = brand.typography;
  return (
    <div style={{ backgroundColor: p.bg, borderRadius: 16, padding: 20, border: `1px solid ${p.border}` }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: p.textDim, marginBottom: 14 }}>Investor Preview</div>

      <div style={{ fontFamily: t.display, fontSize: 28, fontWeight: 600, color: p.text, lineHeight: 1.15, marginBottom: 8, letterSpacing: "-0.03em" }}>
        Narvo Intelligence
      </div>
      <div style={{ width: 40, height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${p.primary}, ${p.accent})`, marginBottom: 16 }} />
      <p style={{ fontFamily: t.body, fontSize: 12, color: p.textSecondary, lineHeight: 1.6, marginBottom: 18, margin: "0 0 18px" }}>
        The intelligence layer powering the next generation of African digital media. From Nigeria to the world.
      </p>

      {/* Org structure */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ background: `linear-gradient(135deg, ${p.primaryMuted}, ${p.surfaceRaised})`, borderRadius: 12, padding: 14, border: `1px solid ${p.border}`, textAlign: "center" }}>
          <div style={{ fontFamily: t.display, fontSize: 14, fontWeight: 600, color: p.primary }}>Narvo Intelligence</div>
          <div style={{ fontSize: 9, color: p.textDim, marginTop: 2 }}>Parent Entity &middot; AI Infrastructure &middot; IP</div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: 1, height: 14, backgroundColor: p.border }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div style={{ backgroundColor: p.surface, borderRadius: 10, padding: 10, border: `1px solid ${p.border}`, textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#D4520A", fontFamily: t.display }}>Narvo</div>
            <div style={{ fontSize: 9, color: p.textDim }}>B2C &middot; Consumer App</div>
          </div>
          <div style={{ backgroundColor: p.surface, borderRadius: 10, padding: 10, border: `1px solid ${p.border}`, textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#818CF8", fontFamily: t.display }}>Platform</div>
            <div style={{ fontSize: 9, color: p.textDim }}>B2B &middot; NaaS APIs</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComparisonRow({ label, current, enhanced, accent }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: "1px solid #1A1D26" }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "#5A6478" }}>{label}</div>
      <div style={{ fontSize: 12, color: "#5A6478", fontFamily: "'Geist Mono', monospace" }}>{current}</div>
      <div style={{ fontSize: 12, color: accent || "#F0F2F5", fontWeight: 500, fontFamily: "'Geist Mono', monospace" }}>{enhanced}</div>
    </div>
  );
}

export default function EnhancedBrandBoard() {
  const [view, setView] = useState("enhanced");
  const [activeBrand, setActiveBrand] = useState("consumer");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#050508", color: "#F0F2F5", fontFamily: "'Satoshi', 'DM Sans', system-ui, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Fraunces:ital,wght@0,400;0,600;0,700;1,400&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
      <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&f[]=general-sans@400,500,600&display=swap" rel="stylesheet" />
      <style>{`@font-face { font-family: 'Geist Mono'; src: url('https://cdn.jsdelivr.net/npm/geist@1.2.0/dist/fonts/geist-mono/GeistMono-Regular.woff2') format('woff2'); font-weight: 400; } @font-face { font-family: 'Geist Mono'; src: url('https://cdn.jsdelivr.net/npm/geist@1.2.0/dist/fonts/geist-mono/GeistMono-Medium.woff2') format('woff2'); font-weight: 500; }`}</style>

      {/* Header */}
      <div style={{ padding: "36px 36px 0", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "linear-gradient(135deg, #6366F1, #06D6A0)" }} />
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A6478" }}>Brand Evolution</span>
        </div>
        <h1 style={{ fontFamily: "'Clash Display', 'Space Grotesk', sans-serif", fontSize: 38, fontWeight: 600, color: "#F0F2F5", margin: "0 0 8px", lineHeight: 1.15, letterSpacing: "-0.03em" }}>
          Enhanced Brand Direction
        </h1>
        <p style={{ fontSize: 14, color: "#5A6478", margin: "0 0 28px", maxWidth: 640, lineHeight: 1.6 }}>
          Classic meets futuristic. Bolder colours, larger UI, one display font family across all three brands for cohesion. Each brand still has its own palette and personality.
        </p>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, borderBottom: "1px solid #1A1D26" }}>
          {[["enhanced", "Enhanced Direction"], ["compare", "Before \u2192 After"]].map(([k, l]) => (
            <button key={k} onClick={() => setView(k)} style={{
              fontFamily: "'Satoshi', sans-serif", fontSize: 13, fontWeight: 600,
              color: view === k ? "#F0F2F5" : "#5A6478", backgroundColor: "transparent",
              border: "none", borderBottom: view === k ? "2px solid #6366F1" : "2px solid transparent",
              padding: "10px 20px", cursor: "pointer", transition: "all 0.2s ease",
            }}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "28px 36px 56px", maxWidth: 1280, margin: "0 auto" }}>
        {view === "enhanced" && (
          <>
            {/* Brand selector */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {Object.entries(ENHANCED).map(([key, b]) => (
                <button key={key} onClick={() => setActiveBrand(key)} style={{
                  fontFamily: "'Clash Display', sans-serif", fontSize: 13, fontWeight: 500,
                  color: activeBrand === key ? "#F0F2F5" : "#5A6478",
                  backgroundColor: activeBrand === key ? b.palette.primary + "18" : "#11141C",
                  border: `1.5px solid ${activeBrand === key ? b.palette.primary : "#1A1D26"}`,
                  borderRadius: 10, padding: "8px 18px", cursor: "pointer", transition: "all 0.2s ease", letterSpacing: "-0.01em",
                }}>{b.name}</button>
              ))}
            </div>

            {/* Brand card + mock */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}>
              <EnhancedBrandCard brand={ENHANCED[activeBrand]} brandKey={activeBrand} />
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {activeBrand === "consumer" && <MockConsumer brand={ENHANCED.consumer} />}
                {activeBrand === "business" && <MockPlatform brand={ENHANCED.business} />}
                {activeBrand === "parent" && <MockParent brand={ENHANCED.parent} />}

                {/* Key change callout */}
                <div style={{ backgroundColor: "#11141C", borderRadius: 16, padding: 20, border: "1px solid #1A1D26" }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A6478", marginBottom: 10 }}>What Changed</div>
                  {activeBrand === "consumer" && (
                    <div style={{ fontSize: 13, color: "#8B95A8", lineHeight: 1.65 }}>
                      <strong style={{ color: "#F0F2F5" }}>Bolder, louder, more alive.</strong> The muted forest green + off-white is replaced with <strong style={{ color: "#D4520A" }}>deep burnt orange (#D4520A)</strong> — the colour of African sunsets, market energy, and confidence. <strong style={{ color: "#0A6847" }}>Dark forest green</strong> stays as accent. <strong style={{ color: "#F0F2F5" }}>Clash Display</strong> replaces Fraunces — geometric, bold, and shared across all three brands. Typography is <em>large</em>: 28px+ greeting headers, 16px story titles, 52px+ play buttons. This isn't polite — it's magnetic.
                    </div>
                  )}
                  {activeBrand === "business" && (
                    <div style={{ fontSize: 13, color: "#8B95A8", lineHeight: 1.65 }}>
                      <strong style={{ color: "#F0F2F5" }}>Same technical DNA, elevated craft.</strong> Purple softens to <strong style={{ color: "#818CF8" }}>perceptual indigo (#818CF8)</strong> — less "gaming" more "infrastructure." <strong style={{ color: "#34D399" }}>Emerald accent</strong> replaces cyan for better contrast. <strong style={{ color: "#F0F2F5" }}>Geist Mono</strong> replaces JetBrains — Vercel's typeface, signals cutting-edge dev tooling. Clash Display as display font creates instant family recognition with the consumer brand.
                    </div>
                  )}
                  {activeBrand === "parent" && (
                    <div style={{ fontSize: 13, color: "#8B95A8", lineHeight: 1.65 }}>
                      <strong style={{ color: "#F0F2F5" }}>Modern authority, not old-world prestige.</strong> Instrument Serif is replaced with <strong style={{ color: "#6366F1" }}>Clash Display</strong> — geometric, confident, unmistakably contemporary. <strong style={{ color: "#6366F1" }}>Indigo (#6366F1)</strong> primary signals AI/tech innovation. <strong style={{ color: "#06D6A0" }}>Mint accent</strong> adds freshness. Deep charcoal-blue (#0A0C10) is richer than the previous navy. This reads "AI company" not "investment bank."
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Unified font family callout */}
            <div style={{ marginTop: 24, background: "linear-gradient(135deg, #1E1B4B15, #06D6A010)", borderRadius: 16, padding: 24, border: "1px solid #1A1D26" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#6366F1" }} />
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A6478" }}>Key Decision</span>
              </div>
              <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 20, fontWeight: 600, color: "#F0F2F5", margin: "0 0 8px", letterSpacing: "-0.02em" }}>One Display Font, Three Palettes</h3>
              <p style={{ fontSize: 13, color: "#8B95A8", lineHeight: 1.65, margin: 0 }}>
                <strong style={{ color: "#F0F2F5" }}>Clash Display</strong> is now the signature typeface across all three brands. This creates instant family recognition — when you see that letterform, you know it's Narvo. The brands differentiate through <em>colour and context</em>, not through separate font families. This is what Apple, Google, and Stripe do — one typeface, many expressions. The body font (<strong style={{ color: "#F0F2F5" }}>Satoshi</strong>) and mono font (<strong style={{ color: "#F0F2F5" }}>Geist Mono</strong>) are also shared, upgraded from DM Sans and JetBrains Mono respectively.
              </p>
            </div>
          </>
        )}

        {view === "compare" && (
          <>
            <h2 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 22, fontWeight: 600, color: "#F0F2F5", margin: "0 0 20px", letterSpacing: "-0.02em" }}>Before \u2192 After</h2>

            {[
              { brand: "Narvo Intelligence (Parent)", items: [
                { label: "Display Font", curr: "Instrument Serif", next: "Clash Display", accent: "#6366F1" },
                { label: "Body Font", curr: "DM Sans", next: "Satoshi", accent: "#6366F1" },
                { label: "Mono Font", curr: "JetBrains Mono", next: "Geist Mono", accent: "#6366F1" },
                { label: "Background", curr: "#0F1419", next: "#0A0C10", accent: "#6366F1" },
                { label: "Primary", curr: "#3B82F6 (Blue)", next: "#6366F1 (Indigo)", accent: "#6366F1" },
                { label: "Accent", curr: "#10B981 (Emerald)", next: "#06D6A0 (Mint)", accent: "#06D6A0" },
                { label: "Feel", curr: "Old-world institutional", next: "Modern AI company", accent: "#6366F1" },
              ]},
              { brand: "Narvo (Consumer B2C)", items: [
                { label: "Display Font", curr: "Fraunces (serif)", next: "Clash Display (sans)", accent: "#D4520A" },
                { label: "Body Font", curr: "DM Sans", next: "Satoshi", accent: "#D4520A" },
                { label: "Background", curr: "#FAFAF7 (off-white)", next: "#FFFCF5 (warm cream)", accent: "#D4520A" },
                { label: "Primary", curr: "#2D6A4F (Forest green)", next: "#D4520A (Burnt orange)", accent: "#D4520A" },
                { label: "Accent", curr: "#E07A2F (Amber)", next: "#0A6847 (Deep green)", accent: "#0A6847" },
                { label: "UI Scale", curr: "Standard (14px titles)", next: "Large (16-28px+ titles)", accent: "#D4520A" },
                { label: "Feel", curr: "Pleasant, polite, warm", next: "Bold, vibrant, magnetic", accent: "#D4520A" },
              ]},
              { brand: "Narvo Platform (B2B)", items: [
                { label: "Display Font", curr: "Space Grotesk", next: "Clash Display", accent: "#818CF8" },
                { label: "Mono Font", curr: "JetBrains Mono", next: "Geist Mono", accent: "#818CF8" },
                { label: "Background", curr: "#09090B (pure black)", next: "#08090D (rich black)", accent: "#818CF8" },
                { label: "Primary", curr: "#A78BFA (Purple)", next: "#818CF8 (Soft indigo)", accent: "#818CF8" },
                { label: "Accent", curr: "#22D3EE (Cyan)", next: "#34D399 (Emerald)", accent: "#34D399" },
                { label: "Feel", curr: "Generic dev-tool dark", next: "Distinctive, crafted", accent: "#818CF8" },
              ]},
            ].map(section => (
              <div key={section.brand} style={{ marginBottom: 28 }}>
                <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 16, fontWeight: 600, color: "#F0F2F5", margin: "0 0 12px", letterSpacing: "-0.01em" }}>{section.brand}</h3>
                <div style={{ backgroundColor: "#0A0C10", borderRadius: 14, padding: "4px 16px", border: "1px solid #1A1D26" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr", gap: 12, padding: "8px 0", borderBottom: "1px solid #1A1D26" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#5A6478", letterSpacing: "0.08em" }}>ELEMENT</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#5A6478", letterSpacing: "0.08em" }}>BEFORE</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#5A6478", letterSpacing: "0.08em" }}>AFTER</div>
                  </div>
                  {section.items.map(item => (
                    <ComparisonRow key={item.label} label={item.label} current={item.curr} enhanced={item.next} accent={item.accent} />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
