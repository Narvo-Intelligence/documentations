import { useState } from "react";

const BRANDS = {
  parent: {
    name: "Narvo Intelligence",
    role: "Parent Company",
    tagline: "The intelligence layer powering African media",
    description: "Corporate entity. Appears on contracts, investor materials, legal docs. Not consumer-facing.",
    tone: ["Institutional", "Data-driven", "Authoritative", "Forward-thinking"],
    palette: {
      bg: "#0F1419",
      surface: "#1A2332",
      surfaceRaised: "#243042",
      border: "#2D3F54",
      primary: "#3B82F6",
      primaryMuted: "#1E3A5F",
      accent: "#10B981",
      text: "#F1F5F9",
      textSecondary: "#94A3B8",
      textDim: "#64748B",
    },
    typography: {
      display: "'Instrument Serif', Georgia, serif",
      body: "'DM Sans', system-ui, sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
    keywords: ["Infrastructure", "Pipeline", "Intelligence", "Enterprise", "Scale"],
  },
  consumer: {
    name: "Narvo",
    role: "Consumer App (B2C)",
    tagline: "The Local Pulse, Refined.",
    description: "The brand people use daily. Warm, approachable, culturally resonant. Your morning news companion.",
    tone: ["Warm", "Personal", "Culturally-rooted", "Effortless"],
    palette: {
      bg: "#FAFAF7",
      surface: "#FFFFFF",
      surfaceRaised: "#F5F0EB",
      border: "#E8E0D8",
      primary: "#2D6A4F",
      primaryMuted: "#D8F3DC",
      accent: "#E07A2F",
      text: "#1A1A18",
      textSecondary: "#5C6356",
      textDim: "#9CA393",
    },
    typography: {
      display: "'Fraunces', Georgia, serif",
      body: "'DM Sans', system-ui, sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
    keywords: ["Listen", "Discover", "Morning", "Your language", "Stories"],
  },
  business: {
    name: "Narvo [B2B]",
    role: "Business Platform (B2B)",
    tagline: "News infrastructure, built for scale.",
    description: "The brand for enterprises and developers. Professional, confident, technically deep.",
    tone: ["Professional", "Technical", "Reliable", "Scalable"],
    palette: {
      bg: "#09090B",
      surface: "#18181B",
      surfaceRaised: "#27272A",
      border: "#3F3F46",
      primary: "#A78BFA",
      primaryMuted: "#2E1065",
      accent: "#22D3EE",
      text: "#FAFAFA",
      textSecondary: "#A1A1AA",
      textDim: "#71717A",
    },
    typography: {
      display: "'Space Grotesk', system-ui, sans-serif",
      body: "'DM Sans', system-ui, sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
    keywords: ["API", "Pipeline", "Integrate", "Deploy", "Monitor"],
  },
};

const B2B_NAMES = [
  {
    name: "Narvo for Business",
    pros: "Clear, familiar pattern (Slack, Notion, ChatGPT all use this). Instantly communicates it\u2019s the business version of something people already know.",
    cons: "Safe. Doesn\u2019t hint at the API/infrastructure nature of the product.",
    vibe: "Corporate-friendly",
    fit: 82,
  },
  {
    name: "Narvo Platform",
    pros: "Emphasises infrastructure and extensibility. Signals that this is something you build on, not just use. Works for both API consumers and enterprise dashboards.",
    cons: "Slightly generic \u2014 many companies use \u2018Platform.\u2019",
    vibe: "Developer-first",
    fit: 88,
  },
  {
    name: "Narvo Studio",
    pros: "Creative, suggests a workspace where content is produced. Fits the broadcast/media narrative. Memorable and distinctive.",
    cons: "May confuse developers expecting pure API docs. Sounds more like a content tool than infrastructure.",
    vibe: "Media-forward",
    fit: 72,
  },
  {
    name: "Narvo Engine",
    pros: "Powerful metaphor \u2014 the engine that powers everything. Directly communicates the AI pipeline and processing capability. Technical credibility.",
    cons: "Slightly aggressive. May not land with non-technical enterprise buyers (PR teams, newsroom editors).",
    vibe: "Technical authority",
    fit: 78,
  },
];

function ColorSwatch({ color, label, textColor = "#fff" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          backgroundColor: color,
          border: "1px solid rgba(128,128,128,0.2)",
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: textColor, opacity: 0.9 }}>{label}</div>
        <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: textColor, opacity: 0.5 }}>
          {color}
        </div>
      </div>
    </div>
  );
}

function BrandCard({ brandKey, brand, isActive, onClick }) {
  const isConsumer = brandKey === "consumer";
  const cardBg = brand.palette.surface;
  const cardBorder = brand.palette.border;
  const textColor = brand.palette.text;
  const textSec = brand.palette.textSecondary;

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: brand.palette.bg,
        border: `2px solid ${isActive ? brand.palette.primary : cardBorder}`,
        borderRadius: 16,
        padding: 28,
        cursor: "pointer",
        transition: "all 0.3s ease",
        transform: isActive ? "scale(1.01)" : "scale(1)",
        boxShadow: isActive
          ? `0 8px 32px ${brand.palette.primary}22`
          : "0 2px 8px rgba(0,0,0,0.08)",
        flex: 1,
        minWidth: 0,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            display: "inline-block",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: brand.palette.primary,
            backgroundColor: brand.palette.primaryMuted,
            padding: "4px 10px",
            borderRadius: 6,
            marginBottom: 12,
          }}
        >
          {brand.role}
        </div>
        <h2
          style={{
            fontFamily: brand.typography.display,
            fontSize: 28,
            fontWeight: 700,
            color: textColor,
            margin: "0 0 6px",
            lineHeight: 1.2,
          }}
        >
          {brand.name}
        </h2>
        <p
          style={{
            fontFamily: brand.typography.body,
            fontSize: 15,
            color: brand.palette.accent,
            margin: 0,
            fontWeight: 500,
            fontStyle: "italic",
          }}
        >
          {brand.tagline}
        </p>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: brand.typography.body,
          fontSize: 13,
          color: textSec,
          lineHeight: 1.6,
          margin: "0 0 20px",
        }}
      >
        {brand.description}
      </p>

      {/* Tone Tags */}
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: brand.palette.textDim,
            marginBottom: 8,
          }}
        >
          Tone
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {brand.tone.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: textSec,
                backgroundColor: brand.palette.surfaceRaised,
                border: `1px solid ${cardBorder}`,
                padding: "3px 10px",
                borderRadius: 20,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Palette */}
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: brand.palette.textDim,
            marginBottom: 10,
          }}
        >
          Palette
        </div>
        <div
          style={{
            backgroundColor: brand.palette.surfaceRaised,
            borderRadius: 10,
            padding: 14,
            border: `1px solid ${cardBorder}`,
          }}
        >
          <ColorSwatch color={brand.palette.bg} label="Background" textColor={textColor} />
          <ColorSwatch color={brand.palette.primary} label="Primary" textColor={textColor} />
          <ColorSwatch color={brand.palette.accent} label="Accent" textColor={textColor} />
          <ColorSwatch color={brand.palette.text} label="Text" textColor={textColor} />
          <ColorSwatch color={brand.palette.border} label="Border" textColor={textColor} />
        </div>
      </div>

      {/* Typography */}
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: brand.palette.textDim,
            marginBottom: 10,
          }}
        >
          Typography
        </div>
        <div
          style={{
            backgroundColor: brand.palette.surfaceRaised,
            borderRadius: 10,
            padding: 14,
            border: `1px solid ${cardBorder}`,
          }}
        >
          <div style={{ fontFamily: brand.typography.display, fontSize: 22, fontWeight: 700, color: textColor, marginBottom: 4 }}>
            Display Font
          </div>
          <div style={{ fontFamily: brand.typography.body, fontSize: 14, color: textSec, marginBottom: 8 }}>
            Body text in the secondary font for readability.
          </div>
          <div style={{ fontFamily: brand.typography.mono, fontSize: 12, color: brand.palette.textDim }}>
            const mono = "technical metadata";
          </div>
        </div>
      </div>

      {/* Keywords */}
      <div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: brand.palette.textDim,
            marginBottom: 8,
          }}
        >
          Brand Vocabulary
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {brand.keywords.map((k) => (
            <span
              key={k}
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: brand.palette.primary,
                fontFamily: brand.typography.mono,
              }}
            >
              {k}
              {brand.keywords.indexOf(k) < brand.keywords.length - 1 ? " \u00B7" : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function NamingOption({ option, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: isSelected ? "#18181B" : "#09090B",
        border: `2px solid ${isSelected ? "#A78BFA" : "#27272A"}`,
        borderRadius: 14,
        padding: 22,
        cursor: "pointer",
        transition: "all 0.25s ease",
        boxShadow: isSelected ? "0 4px 24px rgba(167,139,250,0.15)" : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 22,
            fontWeight: 700,
            color: "#FAFAFA",
            margin: 0,
          }}
        >
          {option.name}
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            backgroundColor: "#27272A",
            padding: "4px 12px",
            borderRadius: 20,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: option.fit >= 85 ? "#22C55E" : option.fit >= 75 ? "#EAB308" : "#F97316",
            }}
          />
          <span style={{ fontSize: 12, fontWeight: 600, color: "#A1A1AA", fontFamily: "'JetBrains Mono', monospace" }}>
            {option.fit}% fit
          </span>
        </div>
      </div>

      <div
        style={{
          display: "inline-block",
          fontSize: 11,
          fontWeight: 600,
          color: "#A78BFA",
          backgroundColor: "#2E1065",
          padding: "3px 10px",
          borderRadius: 6,
          marginBottom: 14,
        }}
      >
        {option.vibe}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#22C55E", marginBottom: 4 }}>
            Strengths
          </div>
          <p style={{ fontSize: 12, color: "#A1A1AA", lineHeight: 1.5, margin: 0 }}>{option.pros}</p>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#F97316", marginBottom: 4 }}>
            Trade-offs
          </div>
          <p style={{ fontSize: 12, color: "#A1A1AA", lineHeight: 1.5, margin: 0 }}>{option.cons}</p>
        </div>
      </div>
    </div>
  );
}

function MockPreview({ brand, brandKey }) {
  const p = brand.palette;
  const t = brand.typography;
  const isConsumer = brandKey === "consumer";
  const isBiz = brandKey === "business";
  const isParent = brandKey === "parent";

  if (isConsumer) {
    return (
      <div style={{ backgroundColor: p.bg, borderRadius: 12, padding: 20, border: `1px solid ${p.border}` }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: p.textDim, marginBottom: 14 }}>
          App Preview
        </div>
        {/* Mock app header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, paddingBottom: 12, borderBottom: `1px solid ${p.border}` }}>
          <span style={{ fontFamily: t.display, fontSize: 20, fontWeight: 700, color: p.primary }}>narvo</span>
          <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: p.primaryMuted, border: `2px solid ${p.primary}` }} />
        </div>
        {/* Mock greeting */}
        <div style={{ fontFamily: t.display, fontSize: 18, fontWeight: 600, color: p.text, marginBottom: 4 }}>Good morning, Oga</div>
        <div style={{ fontFamily: t.body, fontSize: 13, color: p.textSecondary, marginBottom: 16 }}>Your briefing is ready</div>
        {/* Mock story card */}
        <div style={{ backgroundColor: p.surface, borderRadius: 12, padding: 14, border: `1px solid ${p.border}`, marginBottom: 10 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: p.primaryMuted, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 18 }}>&#9654;</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: t.body, fontSize: 13, fontWeight: 600, color: p.text, lineHeight: 1.3 }}>CBN Holds Rates Steady at 27.5%</div>
              <div style={{ fontFamily: t.body, fontSize: 11, color: p.textDim }}>Channels TV &middot; 3 min listen</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ fontSize: 10, backgroundColor: p.surfaceRaised, color: p.textSecondary, padding: "2px 8px", borderRadius: 12 }}>Business</span>
            <span style={{ fontSize: 10, backgroundColor: "#D8F3DC", color: "#2D6A4F", padding: "2px 8px", borderRadius: 12 }}>Verified</span>
          </div>
        </div>
        <div style={{ backgroundColor: p.surface, borderRadius: 12, padding: 14, border: `1px solid ${p.border}` }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "#FFF3E0", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 18 }}>&#9654;</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: t.body, fontSize: 13, fontWeight: 600, color: p.text, lineHeight: 1.3 }}>Lagos-Calabar Highway Phase 2 Begins</div>
              <div style={{ fontFamily: t.body, fontSize: 11, color: p.textDim }}>Punch NG &middot; 4 min listen</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isBiz) {
    return (
      <div style={{ backgroundColor: p.bg, borderRadius: 12, padding: 20, border: `1px solid ${p.border}` }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: p.textDim, marginBottom: 14 }}>
          Website Preview
        </div>
        <div style={{ marginBottom: 16, paddingBottom: 12, borderBottom: `1px solid ${p.border}` }}>
          <span style={{ fontFamily: t.display, fontSize: 18, fontWeight: 600, color: p.text, letterSpacing: "-0.02em" }}>narvo</span>
          <span style={{ fontFamily: t.display, fontSize: 18, fontWeight: 400, color: p.textDim, marginLeft: 4 }}>platform</span>
        </div>
        <div style={{ fontFamily: t.display, fontSize: 22, fontWeight: 700, color: p.text, lineHeight: 1.2, marginBottom: 8 }}>
          News infrastructure,<br />built for scale.
        </div>
        <p style={{ fontFamily: t.body, fontSize: 13, color: p.textSecondary, lineHeight: 1.5, marginBottom: 16 }}>
          Narrative synthesis, translation, and TTS APIs for African media.
        </p>
        {/* Mock code block */}
        <div style={{ backgroundColor: p.surfaceRaised, borderRadius: 8, padding: 12, fontFamily: t.mono, fontSize: 11, color: p.accent, border: `1px solid ${p.border}`, lineHeight: 1.7 }}>
          <span style={{ color: p.textDim }}>$</span> curl narvo.news/api/v1/narrative \<br />
          &nbsp;&nbsp;<span style={{ color: p.primary }}>-H</span> "Authorization: Bearer sk_..." \<br />
          &nbsp;&nbsp;<span style={{ color: p.primary }}>-d</span> '{"{"}source_url: "..."{"}"}'
        </div>
        {/* Mock metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 14 }}>
          {[["98.2%", "Accuracy"], ["14ms", "Latency"], ["5", "Languages"]].map(([val, label]) => (
            <div key={label} style={{ backgroundColor: p.surface, borderRadius: 8, padding: 10, border: `1px solid ${p.border}`, textAlign: "center" }}>
              <div style={{ fontFamily: t.mono, fontSize: 16, fontWeight: 700, color: p.primary }}>{val}</div>
              <div style={{ fontSize: 10, color: p.textDim }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Parent
  return (
    <div style={{ backgroundColor: p.bg, borderRadius: 12, padding: 20, border: `1px solid ${p.border}` }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: p.textDim, marginBottom: 14 }}>
        Investor Materials Preview
      </div>
      <div style={{ fontFamily: t.display, fontSize: 26, fontWeight: 400, fontStyle: "italic", color: p.text, lineHeight: 1.3, marginBottom: 10 }}>
        Narvo Intelligence
      </div>
      <div style={{ width: 40, height: 3, backgroundColor: p.primary, borderRadius: 2, marginBottom: 16 }} />
      <p style={{ fontFamily: t.body, fontSize: 13, color: p.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
        The intelligence layer powering the next generation of African digital media. From Nigeria to the world.
      </p>
      {/* Mock structure diagram */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ backgroundColor: p.primaryMuted, borderRadius: 8, padding: 12, border: `1px solid ${p.border}`, textAlign: "center" }}>
          <div style={{ fontFamily: t.display, fontSize: 14, fontWeight: 600, color: p.primary }}>Narvo Intelligence</div>
          <div style={{ fontSize: 11, color: p.textDim }}>Parent Entity</div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: 1, height: 16, backgroundColor: p.border }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div style={{ backgroundColor: p.surface, borderRadius: 8, padding: 10, border: `1px solid ${p.border}`, textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#2D6A4F" }}>Narvo</div>
            <div style={{ fontSize: 10, color: p.textDim }}>Consumer App</div>
          </div>
          <div style={{ backgroundColor: p.surface, borderRadius: 8, padding: 10, border: `1px solid ${p.border}`, textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#A78BFA" }}>Narvo Platform</div>
            <div style={{ fontSize: 10, color: p.textDim }}>B2B / NaaS</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NarvoBrandBoard() {
  const [activeBrand, setActiveBrand] = useState("consumer");
  const [selectedName, setSelectedName] = useState(1);
  const [section, setSection] = useState("brands");

  const brand = BRANDS[activeBrand];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#050507",
        color: "#FAFAFA",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Fraunces:ital,wght@0,400;0,600;0,700;1,400&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ padding: "32px 32px 0", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#A78BFA" }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#71717A" }}>
            Narvo Intelligence
          </span>
        </div>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 36,
            fontWeight: 700,
            color: "#FAFAFA",
            margin: "0 0 8px",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          Brand Separation Board
        </h1>
        <p style={{ fontSize: 15, color: "#71717A", margin: "0 0 28px", maxWidth: 600, lineHeight: 1.5 }}>
          Three distinct identities under one intelligence layer. Each brand has its own palette, typography, tone, and visual direction.
        </p>

        {/* Section tabs */}
        <div style={{ display: "flex", gap: 4, borderBottom: "1px solid #27272A", paddingBottom: 0 }}>
          {[
            ["brands", "Brand Identities"],
            ["naming", "B2B Naming"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSection(key)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: section === key ? "#FAFAFA" : "#71717A",
                backgroundColor: "transparent",
                border: "none",
                borderBottom: section === key ? "2px solid #A78BFA" : "2px solid transparent",
                padding: "10px 20px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "28px 32px 48px", maxWidth: 1200, margin: "0 auto" }}>
        {section === "brands" && (
          <>
            {/* Brand selector */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {Object.entries(BRANDS).map(([key, b]) => (
                <button
                  key={key}
                  onClick={() => setActiveBrand(key)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: activeBrand === key ? "#FAFAFA" : "#71717A",
                    backgroundColor: activeBrand === key ? b.palette.primary + "22" : "#18181B",
                    border: `1.5px solid ${activeBrand === key ? b.palette.primary : "#27272A"}`,
                    borderRadius: 10,
                    padding: "8px 18px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {b.name}
                </button>
              ))}
            </div>

            {/* Main content: Card + Preview */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
              <BrandCard
                brandKey={activeBrand}
                brand={brand}
                isActive={true}
                onClick={() => {}}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <MockPreview brand={brand} brandKey={activeBrand} />

                {/* Comparison insight */}
                <div style={{ backgroundColor: "#18181B", borderRadius: 14, padding: 20, border: "1px solid #27272A" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#71717A", marginBottom: 10 }}>
                    Design Direction
                  </div>
                  {activeBrand === "consumer" && (
                    <p style={{ fontSize: 13, color: "#A1A1AA", lineHeight: 1.6, margin: 0 }}>
                      <strong style={{ color: "#FAFAFA" }}>Inspired by Jasper.ai, Spotify, Apple News.</strong> Warm backgrounds, generous whitespace, rounded cards with subtle shadows. The audio player is prominent and beautiful. Motion is organic and spring-based. The app feels like a personal companion, not a technical tool. <em style={{ color: "#2D6A4F" }}>Fraunces</em> as the display serif gives it editorial warmth distinct from any competitor.
                    </p>
                  )}
                  {activeBrand === "business" && (
                    <p style={{ fontSize: 13, color: "#A1A1AA", lineHeight: 1.6, margin: 0 }}>
                      <strong style={{ color: "#FAFAFA" }}>Inspired by Augment Code, Linear, Stripe.</strong> Dark mode primary. Data-forward hero with code samples and live metrics. Clean grids, monospace accents, and a developer-first personality. Trust signals like uptime badges and customer logos. <em style={{ color: "#A78BFA" }}>Space Grotesk</em> carries authority from the current design system into the B2B identity.
                    </p>
                  )}
                  {activeBrand === "parent" && (
                    <p style={{ fontSize: 13, color: "#A1A1AA", lineHeight: 1.6, margin: 0 }}>
                      <strong style={{ color: "#FAFAFA" }}>Institutional and understated.</strong> Appears only on investor decks, legal docs, and the corporate website. Deep navy palette signals stability. <em style={{ color: "#3B82F6" }}>Instrument Serif</em> italic gives it quiet distinction. The visual identity is deliberately subdued so the product brands can shine.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {section === "naming" && (
          <>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: "#FAFAFA", margin: "0 0 8px" }}>
                B2B Brand Name Options
              </h2>
              <p style={{ fontSize: 14, color: "#71717A", margin: 0, maxWidth: 560, lineHeight: 1.5 }}>
                The B2B product needs a name that works for developers, publishers, and enterprise buyers. Click each option to explore it.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {B2B_NAMES.map((option, i) => (
                <NamingOption
                  key={option.name}
                  option={option}
                  isSelected={selectedName === i}
                  onClick={() => setSelectedName(i)}
                />
              ))}
            </div>

            {/* Recommendation */}
            <div
              style={{
                marginTop: 24,
                backgroundColor: "#18181B",
                borderRadius: 14,
                padding: 24,
                border: "1px solid #27272A",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#A78BFA" }} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#71717A" }}>
                  Recommendation
                </span>
              </div>
              <p style={{ fontSize: 14, color: "#D4D4D8", lineHeight: 1.65, margin: 0 }}>
                <strong style={{ color: "#FAFAFA" }}>Narvo Platform</strong> scores highest because it works across all three buyer types: developers see an API platform, publishers see a content platform, and enterprise sees a media intelligence platform. It also creates a clean brand pair: <strong style={{ color: "#2D6A4F" }}>Narvo</strong> (the app you use) and <strong style={{ color: "#A78BFA" }}>Narvo Platform</strong> (the infrastructure you build on). However, <strong style={{ color: "#FAFAFA" }}>Narvo for Business</strong> is the safest option if simplicity is the priority, and <strong style={{ color: "#FAFAFA" }}>Narvo Engine</strong> is the most technically distinctive if you want to lean into the AI pipeline narrative.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
