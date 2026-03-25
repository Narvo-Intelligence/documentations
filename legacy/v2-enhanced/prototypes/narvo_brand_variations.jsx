import { useState } from "react";

const VARIATIONS = {
  A: {
    label: "Variation A",
    subtitle: "Original direction",
    parent: {
      name: "Narvo Intelligence",
      role: "Parent Company",
      tagline: "The intelligence layer powering African media",
      description: "Corporate entity. Contracts, investor materials, legal docs. Not consumer-facing.",
      tone: ["Institutional", "Data-driven", "Authoritative"],
      palette: {
        bg: "#0F1419", surface: "#1A2332", surfaceRaised: "#243042", border: "#2D3F54",
        primary: "#3B82F6", primaryMuted: "#1E3A5F", accent: "#10B981",
        text: "#F1F5F9", textSecondary: "#94A3B8", textDim: "#64748B",
      },
      typography: { display: "'Instrument Serif', Georgia, serif", body: "'DM Sans', system-ui, sans-serif", mono: "'JetBrains Mono', monospace" },
      style: "Deep navy, serif italic, institutional calm",
    },
    consumer: {
      name: "Narvo",
      role: "Consumer App (B2C)",
      tagline: "The Local Pulse, Refined.",
      description: "Warm, approachable, culturally resonant. Your daily news companion.",
      tone: ["Warm", "Personal", "Culturally-rooted"],
      palette: {
        bg: "#FAFAF7", surface: "#FFFFFF", surfaceRaised: "#F5F0EB", border: "#E8E0D8",
        primary: "#2D6A4F", primaryMuted: "#D8F3DC", accent: "#E07A2F",
        text: "#1A1A18", textSecondary: "#5C6356", textDim: "#9CA393",
      },
      typography: { display: "'Fraunces', Georgia, serif", body: "'DM Sans', system-ui, sans-serif", mono: "'JetBrains Mono', monospace" },
      style: "Warm off-white, editorial serif, earth tones",
    },
    business: {
      name: "Narvo Platform",
      role: "Business Platform (B2B)",
      tagline: "News infrastructure, built for scale.",
      description: "Professional, confident, technically deep. For developers and enterprises.",
      tone: ["Professional", "Technical", "Scalable"],
      palette: {
        bg: "#09090B", surface: "#18181B", surfaceRaised: "#27272A", border: "#3F3F46",
        primary: "#A78BFA", primaryMuted: "#2E1065", accent: "#22D3EE",
        text: "#FAFAFA", textSecondary: "#A1A1AA", textDim: "#71717A",
      },
      typography: { display: "'Space Grotesk', system-ui, sans-serif", body: "'DM Sans', system-ui, sans-serif", mono: "'JetBrains Mono', monospace" },
      style: "Pure black, purple/cyan, geometric sans",
    },
  },
  B: {
    label: "Variation B",
    subtitle: "Bolder, more contrast",
    parent: {
      name: "Narvo Intelligence",
      role: "Parent Company",
      tagline: "The intelligence layer powering African media",
      description: "Corporate entity. Contracts, investor materials, legal docs. Not consumer-facing.",
      tone: ["Commanding", "Precise", "Established"],
      palette: {
        bg: "#FCFCFA", surface: "#FFFFFF", surfaceRaised: "#F4F4F0", border: "#E0DDD8",
        primary: "#1A1A18", primaryMuted: "#E8E6E1", accent: "#B8860B",
        text: "#1A1A18", textSecondary: "#6B6960", textDim: "#A09E96",
      },
      typography: { display: "'Playfair Display', Georgia, serif", body: "'Source Sans 3', system-ui, sans-serif", mono: "'IBM Plex Mono', monospace" },
      style: "Light parchment, black+gold, old-world authority",
    },
    consumer: {
      name: "Narvo",
      role: "Consumer App (B2C)",
      tagline: "The Local Pulse, Refined.",
      description: "Vibrant, energetic, unmistakably African. News that feels alive.",
      tone: ["Vibrant", "Bold", "Alive"],
      palette: {
        bg: "#FFF8F0", surface: "#FFFFFF", surfaceRaised: "#FFF1E6", border: "#F0D9C4",
        primary: "#C2410C", primaryMuted: "#FFF7ED", accent: "#0D6A51",
        text: "#1C1210", textSecondary: "#78594A", textDim: "#B09484",
      },
      typography: { display: "'Bricolage Grotesque', system-ui, sans-serif", body: "'Outfit', system-ui, sans-serif", mono: "'JetBrains Mono', monospace" },
      style: "Warm peach, burnt orange + deep green, humanist sans",
    },
    business: {
      name: "Narvo Platform",
      role: "Business Platform (B2B)",
      tagline: "News infrastructure, built for scale.",
      description: "Minimal, sharp, developer-native. The infrastructure you trust.",
      tone: ["Minimal", "Sharp", "Developer-first"],
      palette: {
        bg: "#0C111D", surface: "#141B2D", surfaceRaised: "#1C2640", border: "#293552",
        primary: "#38BDF8", primaryMuted: "#0C2D4D", accent: "#4ADE80",
        text: "#E2E8F0", textSecondary: "#8896AB", textDim: "#5A6A80",
      },
      typography: { display: "'Inter Tight', system-ui, sans-serif", body: "'Inter', system-ui, sans-serif", mono: "'Fira Code', monospace" },
      style: "Deep navy, sky blue + green, tight geometric",
    },
  },
  C: {
    label: "Variation C",
    subtitle: "Refined, premium",
    parent: {
      name: "Narvo Intelligence",
      role: "Parent Company",
      tagline: "The intelligence layer powering African media",
      description: "Corporate entity. Contracts, investor materials, legal docs. Not consumer-facing.",
      tone: ["Refined", "Global", "Future-facing"],
      palette: {
        bg: "#111116", surface: "#1A1A20", surfaceRaised: "#24242C", border: "#33333E",
        primary: "#C9A84C", primaryMuted: "#2A2418", accent: "#8B9DC3",
        text: "#EEEEE8", textSecondary: "#9999A0", textDim: "#66666E",
      },
      typography: { display: "'Cormorant Garamond', Georgia, serif", body: "'Raleway', system-ui, sans-serif", mono: "'JetBrains Mono', monospace" },
      style: "Charcoal + gold, refined serif, luxury institutional",
    },
    consumer: {
      name: "Narvo",
      role: "Consumer App (B2C)",
      tagline: "The Local Pulse, Refined.",
      description: "Clean, calm, trustworthy. News clarity without visual noise.",
      tone: ["Clean", "Calm", "Trustworthy"],
      palette: {
        bg: "#F7F7F5", surface: "#FFFFFF", surfaceRaised: "#EEEEE8", border: "#DDDDD5",
        primary: "#1B5E3B", primaryMuted: "#E6F4EC", accent: "#C06820",
        text: "#1A1A1A", textSecondary: "#525250", textDim: "#8A8A85",
      },
      typography: { display: "'General Sans', system-ui, sans-serif", body: "'Satoshi', system-ui, sans-serif", mono: "'JetBrains Mono', monospace" },
      style: "Neutral white, forest green + copper, modern geometric sans",
    },
    business: {
      name: "Narvo Platform",
      role: "Business Platform (B2B)",
      tagline: "News infrastructure, built for scale.",
      description: "Sophisticated dark, data-rich, enterprise-confident.",
      tone: ["Sophisticated", "Data-rich", "Confident"],
      palette: {
        bg: "#0A0A0F", surface: "#12121A", surfaceRaised: "#1C1C28", border: "#2A2A3A",
        primary: "#818CF8", primaryMuted: "#1E1B4B", accent: "#F59E0B",
        text: "#F0F0F5", textSecondary: "#9494A8", textDim: "#5C5C70",
      },
      typography: { display: "'Sora', system-ui, sans-serif", body: "'DM Sans', system-ui, sans-serif", mono: "'IBM Plex Mono', monospace" },
      style: "Near-black, indigo + amber, rounded geometric",
    },
  },
};

function ColorStrip({ palette, textColor }) {
  const swatches = [
    { color: palette.bg, label: "BG" },
    { color: palette.surface, label: "Surface" },
    { color: palette.primary, label: "Primary" },
    { color: palette.accent, label: "Accent" },
    { color: palette.text, label: "Text" },
    { color: palette.border, label: "Border" },
  ];
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
      {swatches.map((s) => (
        <div key={s.label} style={{ flex: 1, textAlign: "center" }}>
          <div style={{ height: 28, borderRadius: 6, backgroundColor: s.color, border: "1px solid rgba(128,128,128,0.2)", marginBottom: 3 }} />
          <div style={{ fontSize: 8, fontWeight: 600, color: textColor, opacity: 0.5, letterSpacing: "0.05em" }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function MiniMockConsumer({ brand }) {
  const p = brand.palette;
  const t = brand.typography;
  return (
    <div style={{ backgroundColor: p.bg, borderRadius: 10, padding: 14, border: `1px solid ${p.border}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, paddingBottom: 8, borderBottom: `1px solid ${p.border}` }}>
        <span style={{ fontFamily: t.display, fontSize: 16, fontWeight: 700, color: p.primary }}>narvo</span>
        <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: p.primaryMuted, border: `1.5px solid ${p.primary}` }} />
      </div>
      <div style={{ fontFamily: t.display, fontSize: 15, fontWeight: 600, color: p.text, marginBottom: 3 }}>Good morning, Oga</div>
      <div style={{ fontFamily: t.body, fontSize: 11, color: p.textSecondary, marginBottom: 12 }}>Your briefing is ready</div>
      <div style={{ backgroundColor: p.surface, borderRadius: 10, padding: 10, border: `1px solid ${p.border}`, marginBottom: 6 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: p.primaryMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: p.primary }}>&#9654;</div>
          <div>
            <div style={{ fontFamily: t.body, fontSize: 11, fontWeight: 600, color: p.text }}>CBN Holds Rates at 27.5%</div>
            <div style={{ fontFamily: t.body, fontSize: 9, color: p.textDim }}>Channels TV &middot; 3 min</div>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: p.surface, borderRadius: 10, padding: 10, border: `1px solid ${p.border}` }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: p.surfaceRaised, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: p.accent }}>&#9654;</div>
          <div>
            <div style={{ fontFamily: t.body, fontSize: 11, fontWeight: 600, color: p.text }}>Lagos-Calabar Phase 2</div>
            <div style={{ fontFamily: t.body, fontSize: 9, color: p.textDim }}>Punch NG &middot; 4 min</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniMockBusiness({ brand }) {
  const p = brand.palette;
  const t = brand.typography;
  return (
    <div style={{ backgroundColor: p.bg, borderRadius: 10, padding: 14, border: `1px solid ${p.border}` }}>
      <div style={{ marginBottom: 10, paddingBottom: 8, borderBottom: `1px solid ${p.border}` }}>
        <span style={{ fontFamily: t.display, fontSize: 14, fontWeight: 600, color: p.text }}>narvo</span>
        <span style={{ fontFamily: t.display, fontSize: 14, fontWeight: 400, color: p.textDim, marginLeft: 4 }}>platform</span>
      </div>
      <div style={{ fontFamily: t.display, fontSize: 16, fontWeight: 700, color: p.text, lineHeight: 1.2, marginBottom: 6 }}>News infrastructure,<br />built for scale.</div>
      <p style={{ fontFamily: t.body, fontSize: 10, color: p.textSecondary, lineHeight: 1.5, marginBottom: 10, margin: "0 0 10px" }}>AI narrative, translation, and TTS APIs.</p>
      <div style={{ backgroundColor: p.surfaceRaised, borderRadius: 6, padding: 8, fontFamily: t.mono, fontSize: 9, color: p.accent, border: `1px solid ${p.border}`, lineHeight: 1.7, marginBottom: 10 }}>
        <span style={{ color: p.textDim }}>$</span> curl /api/v1/narrative \<br />
        &nbsp;&nbsp;<span style={{ color: p.primary }}>-H</span> "Auth: Bearer sk_..."
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
        {[["98.2%", "Acc."], ["14ms", "Lat."], ["5", "Langs"]].map(([v, l]) => (
          <div key={l} style={{ backgroundColor: p.surface, borderRadius: 6, padding: 6, border: `1px solid ${p.border}`, textAlign: "center" }}>
            <div style={{ fontFamily: t.mono, fontSize: 12, fontWeight: 700, color: p.primary }}>{v}</div>
            <div style={{ fontSize: 8, color: p.textDim }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniMockParent({ brand }) {
  const p = brand.palette;
  const t = brand.typography;
  return (
    <div style={{ backgroundColor: p.bg, borderRadius: 10, padding: 14, border: `1px solid ${p.border}` }}>
      <div style={{ fontFamily: t.display, fontSize: 20, fontWeight: 400, fontStyle: "italic", color: p.text, lineHeight: 1.3, marginBottom: 8 }}>Narvo Intelligence</div>
      <div style={{ width: 32, height: 2.5, backgroundColor: p.primary, borderRadius: 2, marginBottom: 12 }} />
      <p style={{ fontFamily: t.body, fontSize: 10, color: p.textSecondary, lineHeight: 1.6, marginBottom: 14, margin: "0 0 14px" }}>The intelligence layer powering the next generation of African digital media.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ backgroundColor: p.primaryMuted || p.surfaceRaised, borderRadius: 6, padding: 8, border: `1px solid ${p.border}`, textAlign: "center" }}>
          <div style={{ fontFamily: t.display, fontSize: 11, fontWeight: 600, color: p.primary, fontStyle: "normal" }}>Narvo Intelligence</div>
          <div style={{ fontSize: 8, color: p.textDim }}>Parent Entity</div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}><div style={{ width: 1, height: 10, backgroundColor: p.border }} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          <div style={{ backgroundColor: p.surface, borderRadius: 6, padding: 6, border: `1px solid ${p.border}`, textAlign: "center" }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: p.accent || p.primary }}>Narvo</div>
            <div style={{ fontSize: 8, color: p.textDim }}>B2C</div>
          </div>
          <div style={{ backgroundColor: p.surface, borderRadius: 6, padding: 6, border: `1px solid ${p.border}`, textAlign: "center" }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: p.primary }}>Platform</div>
            <div style={{ fontSize: 8, color: p.textDim }}>B2B</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrandColumn({ brand, brandKey, variation }) {
  const p = brand.palette;
  const t = brand.typography;
  const isLight = p.bg.startsWith("#F") || p.bg.startsWith("#E") || p.bg === "#FCFCFA";
  const cardText = isLight ? "#1A1A18" : "#FAFAFA";
  const cardTextSec = isLight ? "#6B6960" : "#A1A1AA";
  const cardTextDim = isLight ? "#A09E96" : "#71717A";

  return (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Brand header card */}
      <div style={{ backgroundColor: p.bg, borderRadius: 14, padding: 20, border: `1.5px solid ${p.border}`, transition: "all 0.3s ease" }}>
        <div style={{ display: "inline-block", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: p.primary, backgroundColor: p.primaryMuted, padding: "3px 8px", borderRadius: 5, marginBottom: 10 }}>
          {brand.role}
        </div>
        <h3 style={{ fontFamily: t.display, fontSize: 24, fontWeight: 700, color: p.text, margin: "0 0 4px", lineHeight: 1.2 }}>{brand.name}</h3>
        <p style={{ fontFamily: t.body, fontSize: 12, color: p.accent, margin: "0 0 12px", fontStyle: "italic", fontWeight: 500 }}>{brand.tagline}</p>
        <p style={{ fontFamily: t.body, fontSize: 11, color: cardTextSec, lineHeight: 1.5, margin: "0 0 14px" }}>{brand.description}</p>

        {/* Tone */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
          {brand.tone.map((t2) => (
            <span key={t2} style={{ fontSize: 9, fontWeight: 600, color: cardTextSec, backgroundColor: p.surfaceRaised, border: `1px solid ${p.border}`, padding: "2px 8px", borderRadius: 16 }}>{t2}</span>
          ))}
        </div>

        {/* Palette strip */}
        <ColorStrip palette={p} textColor={cardText} />

        {/* Typography preview */}
        <div style={{ backgroundColor: p.surfaceRaised, borderRadius: 8, padding: 10, border: `1px solid ${p.border}`, marginBottom: 10 }}>
          <div style={{ fontFamily: t.display, fontSize: 18, fontWeight: 700, color: p.text, marginBottom: 3 }}>Display Heading</div>
          <div style={{ fontFamily: t.body, fontSize: 12, color: cardTextSec, marginBottom: 4 }}>Body text for readability and clarity across devices.</div>
          <div style={{ fontFamily: t.mono, fontSize: 10, color: cardTextDim }}>const code = "monospace";</div>
        </div>

        {/* Style tag */}
        <div style={{ fontSize: 10, color: cardTextDim, fontStyle: "italic", fontFamily: t.body }}>{brand.style}</div>
      </div>

      {/* Mock preview */}
      {brandKey === "consumer" && <MiniMockConsumer brand={brand} />}
      {brandKey === "business" && <MiniMockBusiness brand={brand} />}
      {brandKey === "parent" && <MiniMockParent brand={brand} />}
    </div>
  );
}

export default function NarvoBrandVariations() {
  const [activeVar, setActiveVar] = useState("A");
  const [compareMode, setCompareMode] = useState(false);
  const [compareVar, setCompareVar] = useState("B");
  const [mixSelections, setMixSelections] = useState({ parent: "A", consumer: "A", business: "A" });
  const [mode, setMode] = useState("explore");

  const v = VARIATIONS[activeVar];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#050507", color: "#FAFAFA", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Fraunces:ital,wght@0,400;0,600;0,700;1,400&family=Instrument+Serif:ital@0;1&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@400;600&family=IBM+Plex+Mono:wght@400;500&family=Bricolage+Grotesque:wght@400;600;700&family=Outfit:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Raleway:wght@400;500;600&family=Inter+Tight:wght@400;600;700&family=Inter:wght@400;500;600&family=Fira+Code:wght@400;500&family=Sora:wght@400;600;700&family=Satoshi:wght@400;500;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ padding: "32px 32px 0", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#A78BFA" }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#71717A" }}>Narvo Intelligence</span>
        </div>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 34, fontWeight: 700, color: "#FAFAFA", margin: "0 0 8px", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
          Brand Styling Variations
        </h1>
        <p style={{ fontSize: 14, color: "#71717A", margin: "0 0 24px", maxWidth: 620, lineHeight: 1.5 }}>
          Three complete styling directions. Explore each variation, or use Mix &amp; Match to combine your favourite parent, consumer, and business styles.
        </p>

        {/* Mode tabs */}
        <div style={{ display: "flex", gap: 4, borderBottom: "1px solid #27272A", marginBottom: 0 }}>
          {[["explore", "Explore Variations"], ["mix", "Mix & Match"]].map(([key, label]) => (
            <button key={key} onClick={() => setMode(key)} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
              color: mode === key ? "#FAFAFA" : "#71717A", backgroundColor: "transparent",
              border: "none", borderBottom: mode === key ? "2px solid #A78BFA" : "2px solid transparent",
              padding: "10px 20px", cursor: "pointer", transition: "all 0.2s ease",
            }}>{label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "24px 32px 48px", maxWidth: 1200, margin: "0 auto" }}>

        {mode === "explore" && (
          <>
            {/* Variation selector */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {Object.entries(VARIATIONS).map(([key, val]) => (
                <button key={key} onClick={() => setActiveVar(key)} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
                  color: activeVar === key ? "#FAFAFA" : "#71717A",
                  backgroundColor: activeVar === key ? "#27272A" : "#18181B",
                  border: `1.5px solid ${activeVar === key ? "#A78BFA" : "#27272A"}`,
                  borderRadius: 10, padding: "8px 18px", cursor: "pointer", transition: "all 0.2s ease",
                  display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2,
                }}>
                  <span>{val.label}</span>
                  <span style={{ fontSize: 10, color: "#52525B", fontWeight: 400 }}>{val.subtitle}</span>
                </button>
              ))}
            </div>

            {/* Three columns */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, alignItems: "start" }}>
              <BrandColumn brand={v.parent} brandKey="parent" variation={activeVar} />
              <BrandColumn brand={v.consumer} brandKey="consumer" variation={activeVar} />
              <BrandColumn brand={v.business} brandKey="business" variation={activeVar} />
            </div>

            {/* Variation notes */}
            <div style={{ marginTop: 24, backgroundColor: "#18181B", borderRadius: 14, padding: 22, border: "1px solid #27272A" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#71717A", marginBottom: 10 }}>Design Notes \u2014 {v.label}</div>
              {activeVar === "A" && (
                <p style={{ fontSize: 13, color: "#A1A1AA", lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ color: "#FAFAFA" }}>The original direction.</strong> Parent uses <em>Instrument Serif</em> italic for quiet institutional presence. Consumer goes warm with <em>Fraunces</em> serif \u2014 editorial and distinctly African-internet. Platform uses <em>Space Grotesk</em> carried from the current codebase. Strong brand separation through contrasting palettes: corporate navy, consumer warmth, developer dark.
                </p>
              )}
              {activeVar === "B" && (
                <p style={{ fontSize: 13, color: "#A1A1AA", lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ color: "#FAFAFA" }}>Bolder, higher contrast.</strong> Parent flips to <em>light mode</em> with <em>Playfair Display</em> \u2014 parchment + black + gold gives old-world authority, ideal for investor materials that print well. Consumer uses <em>Bricolage Grotesque</em> with a burnt orange + deep green palette \u2014 more energetic and vibrant, like African print fabric. Platform goes deep navy with <em>Inter Tight</em> + sky blue \u2014 a more technical, Linear-like aesthetic.
                </p>
              )}
              {activeVar === "C" && (
                <p style={{ fontSize: 13, color: "#A1A1AA", lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ color: "#FAFAFA" }}>Refined and premium.</strong> Parent uses <em>Cormorant Garamond</em> with charcoal + gold \u2014 luxury institutional, signals established credibility. Consumer goes neutral with <em>General Sans</em> / <em>Satoshi</em> \u2014 clean, calm, modern; less personality than A or B but higher perceived quality. Platform uses <em>Sora</em> with indigo + amber \u2014 a more sophisticated take than pure purple, giving it a data-rich enterprise feel.
                </p>
              )}
            </div>
          </>
        )}

        {mode === "mix" && (
          <>
            <p style={{ fontSize: 13, color: "#71717A", margin: "0 0 20px", lineHeight: 1.5 }}>
              Pick your preferred styling for each brand independently. This lets you combine the best of each variation.
            </p>

            {["parent", "consumer", "business"].map((brandKey) => {
              const label = brandKey === "parent" ? "Narvo Intelligence" : brandKey === "consumer" ? "Narvo (Consumer)" : "Narvo Platform (B2B)";
              return (
                <div key={brandKey} style={{ marginBottom: 28 }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, color: "#FAFAFA", margin: "0 0 12px" }}>{label}</h3>
                  <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                    {Object.keys(VARIATIONS).map((vKey) => (
                      <button key={vKey} onClick={() => setMixSelections((s) => ({ ...s, [brandKey]: vKey }))} style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600,
                        color: mixSelections[brandKey] === vKey ? "#FAFAFA" : "#71717A",
                        backgroundColor: mixSelections[brandKey] === vKey ? "#27272A" : "#0A0A0F",
                        border: `1.5px solid ${mixSelections[brandKey] === vKey ? "#A78BFA" : "#27272A"}`,
                        borderRadius: 8, padding: "6px 14px", cursor: "pointer", transition: "all 0.2s ease",
                      }}>{VARIATIONS[vKey].label}</button>
                    ))}
                  </div>
                  <div style={{ maxWidth: 400 }}>
                    <BrandColumn brand={VARIATIONS[mixSelections[brandKey]][brandKey]} brandKey={brandKey} variation={mixSelections[brandKey]} />
                  </div>
                </div>
              );
            })}

            {/* Summary */}
            <div style={{ marginTop: 8, backgroundColor: "#18181B", borderRadius: 14, padding: 22, border: "1px solid #27272A" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#71717A", marginBottom: 10 }}>Your Mix</div>
              <p style={{ fontSize: 13, color: "#A1A1AA", lineHeight: 1.65, margin: 0 }}>
                <strong style={{ color: "#FAFAFA" }}>Narvo Intelligence:</strong> {VARIATIONS[mixSelections.parent].label} \u2014 <em>{VARIATIONS[mixSelections.parent].parent.style}</em>
                {" \u00B7 "}
                <strong style={{ color: "#FAFAFA" }}>Narvo:</strong> {VARIATIONS[mixSelections.consumer].label} \u2014 <em>{VARIATIONS[mixSelections.consumer].consumer.style}</em>
                {" \u00B7 "}
                <strong style={{ color: "#FAFAFA" }}>Narvo Platform:</strong> {VARIATIONS[mixSelections.business].label} \u2014 <em>{VARIATIONS[mixSelections.business].business.style}</em>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
