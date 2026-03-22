import { useState } from "react";

const P = {
  bg: "#FFFCF5", surface: "#FFFFFF", raised: "#FFF3E0", border: "#F0DCC8",
  primary: "#D4520A", primaryMuted: "#FFF1E8", accent: "#0A6847", accentMuted: "#E6F9F0",
  text: "#1A1207", textSec: "#6B5A40", textDim: "#A69880",
  shadow: "0 2px 12px rgba(180,130,80,0.08)",
  shadowMd: "0 4px 20px rgba(180,130,80,0.1)",
};

const font = {
  display: "'Clash Display', 'Space Grotesk', system-ui, sans-serif",
  body: "'Satoshi', 'DM Sans', system-ui, sans-serif",
  mono: "'Geist Mono', 'JetBrains Mono', monospace",
};

const categories = [
  { label: "Business", color: "#D4520A", bg: "#FFF1E8" },
  { label: "Tech", color: "#7C3AED", bg: "#F3E8FF" },
  { label: "Politics", color: "#C2410C", bg: "#FFF7ED" },
  { label: "Health", color: "#0A6847", bg: "#E6F9F0" },
];

function Section({ title, children, dark }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h3 style={{ fontFamily: font.display, fontSize: 18, fontWeight: 600, color: dark ? "#F0F2F5" : P.text, margin: "0 0 16px", letterSpacing: "-0.02em" }}>{title}</h3>
      {children}
    </div>
  );
}

function StoryCard({ title, source, time, category, featured }) {
  const cat = categories.find(c => c.label === category) || categories[0];
  return (
    <div style={{
      backgroundColor: P.surface, borderRadius: featured ? 20 : 16, border: `1px solid ${P.border}`,
      boxShadow: featured ? P.shadowMd : P.shadow, overflow: "hidden", transition: "all 0.2s ease",
    }}>
      {featured && <div style={{ height: 4, backgroundColor: P.primary }} />}
      <div style={{ padding: featured ? 20 : 16 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{
            width: featured ? 56 : 44, height: featured ? 56 : 44, borderRadius: featured ? 16 : 12,
            backgroundColor: P.primaryMuted, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <span style={{ fontSize: featured ? 24 : 18, color: P.primary }}>&#9654;</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: font.display, fontSize: featured ? 17 : 14, fontWeight: 600, color: P.text, lineHeight: 1.25, marginBottom: 4, letterSpacing: "-0.01em" }}>{title}</div>
            <div style={{ fontFamily: font.body, fontSize: 11, color: P.textDim }}>{source} &middot; {time}</div>
          </div>
        </div>
        {featured && (
          <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
            <span style={{ fontSize: 10, fontWeight: 600, backgroundColor: cat.bg, color: cat.color, padding: "3px 10px", borderRadius: 8 }}>{cat.label}</span>
            <span style={{ fontSize: 10, fontWeight: 600, backgroundColor: P.accentMuted, color: P.accent, padding: "3px 10px", borderRadius: 8 }}>Verified</span>
          </div>
        )}
      </div>
    </div>
  );
}

function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  return (
    <div style={{
      backgroundColor: P.surface, borderRadius: 20, padding: 20, border: `1px solid ${P.border}`,
      boxShadow: P.shadowMd,
    }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <button onClick={() => setPlaying(!playing)} style={{
          width: 56, height: 56, borderRadius: 16, backgroundColor: P.primary, border: "none",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          boxShadow: "0 4px 16px rgba(212,82,10,0.25)", transition: "all 0.2s ease",
        }}>
          <span style={{ color: "#fff", fontSize: 22, marginLeft: playing ? 0 : 2 }}>{playing ? "⏸" : "▶"}</span>
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: font.display, fontSize: 15, fontWeight: 600, color: P.text, letterSpacing: "-0.01em" }}>CBN Holds Interest Rates at 27.5%</div>
          <div style={{ fontFamily: font.body, fontSize: 11, color: P.textDim, marginTop: 2 }}>Channels TV &middot; Yoruba &middot; 3:24</div>
          {/* Progress bar */}
          <div style={{ marginTop: 8, height: 4, backgroundColor: P.raised, borderRadius: 4, overflow: "hidden" }}>
            <div style={{ width: playing ? "45%" : "0%", height: "100%", backgroundColor: P.primary, borderRadius: 4, transition: "width 0.5s ease" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonShowcase() {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
      <button style={{ fontFamily: font.display, fontSize: 14, fontWeight: 600, color: "#fff", backgroundColor: P.primary, border: "none", padding: "12px 24px", borderRadius: 12, cursor: "pointer", boxShadow: "0 2px 8px rgba(212,82,10,0.2)", letterSpacing: "-0.01em" }}>Oya, Play</button>
      <button style={{ fontFamily: font.display, fontSize: 14, fontWeight: 600, color: P.primary, backgroundColor: P.primaryMuted, border: `1.5px solid ${P.primary}`, padding: "11px 24px", borderRadius: 12, cursor: "pointer", letterSpacing: "-0.01em" }}>Save Story</button>
      <button style={{ fontFamily: font.body, fontSize: 13, fontWeight: 500, color: P.textSec, backgroundColor: "transparent", border: `1px solid ${P.border}`, padding: "10px 20px", borderRadius: 10, cursor: "pointer" }}>Filter</button>
      <button style={{ fontFamily: font.body, fontSize: 13, fontWeight: 500, color: P.textDim, backgroundColor: P.raised, border: "none", padding: "10px 16px", borderRadius: 10, cursor: "pointer" }}>&#9825;</button>
    </div>
  );
}

function TagShowcase() {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {categories.map(c => (
        <span key={c.label} style={{ fontSize: 11, fontWeight: 600, color: c.color, backgroundColor: c.bg, padding: "4px 12px", borderRadius: 8 }}>{c.label}</span>
      ))}
      <span style={{ fontSize: 11, fontWeight: 600, color: P.accent, backgroundColor: P.accentMuted, padding: "4px 12px", borderRadius: 8 }}>Verified</span>
      <span style={{ fontSize: 11, fontWeight: 500, color: P.textDim, backgroundColor: P.raised, padding: "4px 12px", borderRadius: 8, fontFamily: font.mono }}>3 min</span>
    </div>
  );
}

function TypographyScale() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ fontFamily: font.display, fontSize: 32, fontWeight: 600, color: P.text, letterSpacing: "-0.03em", lineHeight: 1.15 }}>Good morning, Oga</div>
      <div style={{ fontFamily: font.display, fontSize: 20, fontWeight: 600, color: P.text, letterSpacing: "-0.02em" }}>Your briefing is ready</div>
      <div style={{ fontFamily: font.display, fontSize: 16, fontWeight: 600, color: P.text, letterSpacing: "-0.01em" }}>CBN Holds Interest Rates Steady</div>
      <div style={{ fontFamily: font.body, fontSize: 14, color: P.textSec, lineHeight: 1.6 }}>Body text in Satoshi — modern, geometric, highly legible across all sizes and screens.</div>
      <div style={{ fontFamily: font.body, fontSize: 12, color: P.textDim }}>Caption / metadata — labels, timestamps, source attribution</div>
      <div style={{ fontFamily: font.mono, fontSize: 11, color: P.textDim }}>mono: truth-tag-v2 · src:channels-tv · conf:0.98</div>
    </div>
  );
}

function ColorPalette() {
  const swatches = [
    { color: P.bg, label: "Background", hex: "#FFFCF5" },
    { color: P.surface, label: "Surface", hex: "#FFFFFF" },
    { color: P.raised, label: "Raised", hex: "#FFF3E0" },
    { color: P.border, label: "Border", hex: "#F0DCC8" },
    { color: P.primary, label: "Primary", hex: "#D4520A" },
    { color: P.accent, label: "Accent", hex: "#0A6847" },
    { color: P.text, label: "Text", hex: "#1A1207" },
    { color: P.textSec, label: "Secondary", hex: "#6B5A40" },
    { color: P.textDim, label: "Dim", hex: "#A69880" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: 8 }}>
      {swatches.map(s => (
        <div key={s.label} style={{ textAlign: "center" }}>
          <div style={{ height: 48, borderRadius: 12, backgroundColor: s.color, border: "1px solid rgba(0,0,0,0.06)", marginBottom: 6 }} />
          <div style={{ fontSize: 10, fontWeight: 600, color: P.textSec }}>{s.label}</div>
          <div style={{ fontSize: 9, fontFamily: font.mono, color: P.textDim }}>{s.hex}</div>
        </div>
      ))}
    </div>
  );
}

function SpacingScale() {
  const sizes = [4, 8, 16, 24, 32, 48, 64];
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
      {sizes.map(s => (
        <div key={s} style={{ textAlign: "center" }}>
          <div style={{ width: 32, height: s, backgroundColor: P.primaryMuted, border: `1px solid ${P.primary}40`, borderRadius: 4, marginBottom: 4 }} />
          <div style={{ fontSize: 9, fontFamily: font.mono, color: P.textDim }}>{s}px</div>
        </div>
      ))}
    </div>
  );
}

function RadiusScale() {
  const radii = [
    { r: 8, label: "Input" }, { r: 10, label: "Button sm" }, { r: 12, label: "Button" },
    { r: 14, label: "Card sm" }, { r: 16, label: "Card" }, { r: 20, label: "Card lg" }, { r: 9999, label: "Pill" },
  ];
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      {radii.map(r => (
        <div key={r.label} style={{ textAlign: "center" }}>
          <div style={{ width: 48, height: 48, borderRadius: r.r, border: `2px solid ${P.primary}`, backgroundColor: P.primaryMuted, marginBottom: 4 }} />
          <div style={{ fontSize: 9, fontWeight: 600, color: P.textSec }}>{r.r === 9999 ? "pill" : r.r + "px"}</div>
          <div style={{ fontSize: 8, color: P.textDim }}>{r.label}</div>
        </div>
      ))}
    </div>
  );
}

function MobileFrame({ children }) {
  return (
    <div style={{
      width: 320, backgroundColor: P.bg, borderRadius: 28, border: `2px solid ${P.border}`,
      boxShadow: "0 12px 48px rgba(0,0,0,0.1)", overflow: "hidden", flexShrink: 0,
    }}>
      {/* Status bar */}
      <div style={{ height: 36, backgroundColor: P.bg, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: P.text, fontFamily: font.body }}>9:41</span>
        <div style={{ display: "flex", gap: 4 }}>
          <div style={{ width: 16, height: 10, borderRadius: 2, backgroundColor: P.textDim, opacity: 0.4 }} />
          <div style={{ width: 16, height: 10, borderRadius: 2, backgroundColor: P.textDim, opacity: 0.4 }} />
        </div>
      </div>
      <div style={{ padding: "0 16px 16px" }}>{children}</div>
      {/* Bottom nav */}
      <div style={{ height: 56, borderTop: `1px solid ${P.border}`, display: "flex", alignItems: "center", justifyContent: "space-around", backgroundColor: P.surface }}>
        {["Home", "Discover", "Library", "Settings"].map((tab, i) => (
          <div key={tab} style={{ textAlign: "center", cursor: "pointer" }}>
            <div style={{ width: 20, height: 20, borderRadius: 6, backgroundColor: i === 0 ? P.primaryMuted : P.raised, margin: "0 auto 2px" }} />
            <span style={{ fontSize: 9, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? P.primary : P.textDim, fontFamily: font.body }}>{tab}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DesignSystemSpec() {
  const [tab, setTab] = useState("components");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#050508", color: "#F0F2F5", fontFamily: font.body }}>
      <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
      <style>{`@font-face { font-family: 'Geist Mono'; src: url('https://cdn.jsdelivr.net/npm/geist@1.2.0/dist/fonts/geist-mono/GeistMono-Regular.woff2') format('woff2'); font-weight: 400; }`}</style>

      {/* Header */}
      <div style={{ padding: "36px 36px 0", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: P.primary }} />
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A6478" }}>Narvo Consumer</span>
        </div>
        <h1 style={{ fontFamily: font.display, fontSize: 36, fontWeight: 600, color: "#F0F2F5", margin: "0 0 8px", letterSpacing: "-0.03em" }}>UX/Design Pivot Spec</h1>
        <p style={{ fontSize: 14, color: "#5A6478", margin: "0 0 24px", maxWidth: 640, lineHeight: 1.6 }}>
          Component system, token values, typography scale, and screen compositions for the enhanced consumer brand.
        </p>

        <div style={{ display: "flex", gap: 4, borderBottom: "1px solid #1A1E2A" }}>
          {[["components", "Component System"], ["tokens", "Design Tokens"], ["screens", "Screen Preview"]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{
              fontFamily: font.body, fontSize: 13, fontWeight: 600,
              color: tab === k ? "#F0F2F5" : "#5A6478", backgroundColor: "transparent",
              border: "none", borderBottom: tab === k ? `2px solid ${P.primary}` : "2px solid transparent",
              padding: "10px 20px", cursor: "pointer",
            }}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "28px 36px 56px", maxWidth: 1280, margin: "0 auto" }}>
        {tab === "components" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Story Cards */}
              <div style={{ backgroundColor: P.bg, borderRadius: 20, padding: 24, border: `1px solid ${P.border}` }}>
                <Section title="Story Cards">
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <StoryCard title="CBN Holds Interest Rates Steady at 27.5%" source="Channels TV" time="3 min listen" category="Business" featured />
                    <StoryCard title="Lagos-Calabar Highway Phase 2 Begins" source="Punch NG" time="4 min" category="Politics" />
                    <StoryCard title="AI Startup Raises $2M Seed in Lagos" source="TechCabal" time="2 min" category="Tech" />
                  </div>
                </Section>
              </div>

              {/* Audio Player */}
              <div style={{ backgroundColor: P.bg, borderRadius: 20, padding: 24, border: `1px solid ${P.border}` }}>
                <Section title="Audio Player">
                  <AudioPlayer />
                </Section>
              </div>

              {/* Buttons */}
              <div style={{ backgroundColor: P.bg, borderRadius: 20, padding: 24, border: `1px solid ${P.border}` }}>
                <Section title="Buttons">
                  <ButtonShowcase />
                </Section>
              </div>

              {/* Tags */}
              <div style={{ backgroundColor: P.bg, borderRadius: 20, padding: 24, border: `1px solid ${P.border}` }}>
                <Section title="Tags & Badges">
                  <TagShowcase />
                </Section>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Typography */}
              <div style={{ backgroundColor: P.bg, borderRadius: 20, padding: 24, border: `1px solid ${P.border}` }}>
                <Section title="Typography Scale">
                  <TypographyScale />
                </Section>
              </div>

              {/* Colour Palette */}
              <div style={{ backgroundColor: P.bg, borderRadius: 20, padding: 24, border: `1px solid ${P.border}` }}>
                <Section title="Colour Palette">
                  <ColorPalette />
                </Section>
              </div>

              {/* Spacing */}
              <div style={{ backgroundColor: P.bg, borderRadius: 20, padding: 24, border: `1px solid ${P.border}` }}>
                <Section title="Spacing Scale (8px grid)">
                  <SpacingScale />
                </Section>
              </div>

              {/* Radii */}
              <div style={{ backgroundColor: P.bg, borderRadius: 20, padding: 24, border: `1px solid ${P.border}` }}>
                <Section title="Border Radius Scale">
                  <RadiusScale />
                </Section>
              </div>

              {/* Shadows */}
              <div style={{ backgroundColor: P.bg, borderRadius: 20, padding: 24, border: `1px solid ${P.border}` }}>
                <Section title="Elevation / Shadows">
                  <div style={{ display: "flex", gap: 16 }}>
                    {[
                      { label: "sm", shadow: "0 1px 4px rgba(180,130,80,0.06)" },
                      { label: "md", shadow: P.shadow },
                      { label: "lg", shadow: P.shadowMd },
                    ].map(s => (
                      <div key={s.label} style={{ textAlign: "center" }}>
                        <div style={{ width: 72, height: 48, borderRadius: 14, backgroundColor: P.surface, boxShadow: s.shadow, border: `1px solid ${P.border}`, marginBottom: 6 }} />
                        <div style={{ fontSize: 10, fontWeight: 600, color: P.textSec }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </Section>
              </div>
            </div>
          </div>
        )}

        {tab === "tokens" && (
          <div style={{ maxWidth: 800 }}>
            <Section title="CSS Token Migration" dark>
              <p style={{ fontSize: 13, color: "#8B95A8", lineHeight: 1.65, marginBottom: 20 }}>
                Drop-in replacement for <code style={{ fontFamily: font.mono, color: P.primary }}>:root</code> in <code style={{ fontFamily: font.mono, color: P.primary }}>frontend/src/index.css</code>. 
                Same RGB triplet format for Tailwind compatibility. Theme system changes from 4 themes to 2 (Light default + Dark mode).
              </p>
            </Section>
            <div style={{ backgroundColor: "#0A0C10", borderRadius: 16, padding: 24, border: "1px solid #1A1E2A", fontFamily: font.mono, fontSize: 12, lineHeight: 2, color: "#8B95A8", overflowX: "auto" }}>
              <div style={{ color: "#5A6478" }}>/* Enhanced Narvo Consumer — Light (default) */</div>
              <div style={{ color: "#5A6478" }}>/* Font imports: Clash Display + Satoshi from fontshare.com */</div>
              <div style={{ color: "#5A6478" }}>/* Geist Mono from cdn.jsdelivr.net/npm/geist */</div>
              <br />
              <div><span style={{ color: "#818CF8" }}>:root</span> {"{"}</div>
              <div style={{ color: "#5A6478" }}>&nbsp;&nbsp;/* --- Core palette (Enhanced Light) --- */</div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--color-primary</span>: <span style={{ color: P.primary }}>212 82 10</span>;       <span style={{ color: "#5A6478" }}>/* Burnt Orange */</span></div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--color-bg</span>: <span style={{ color: "#F0F2F5" }}>255 252 245</span>;          <span style={{ color: "#5A6478" }}>/* Warm Cream */</span></div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--color-surface</span>: <span style={{ color: "#F0F2F5" }}>255 255 255</span>;      <span style={{ color: "#5A6478" }}>/* White */</span></div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--color-surface-raised</span>: <span style={{ color: "#F0F2F5" }}>255 243 224</span>;</div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--color-border</span>: <span style={{ color: "#F0F2F5" }}>240 220 200</span>;</div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--color-border-subtle</span>: <span style={{ color: "#F0F2F5" }}>245 232 216</span>;</div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--color-text-primary</span>: <span style={{ color: "#F0F2F5" }}>26 18 7</span>;      <span style={{ color: "#5A6478" }}>/* Near-black warm */</span></div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--color-text-secondary</span>: <span style={{ color: "#F0F2F5" }}>107 90 64</span>;</div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--color-text-dim</span>: <span style={{ color: "#F0F2F5" }}>166 152 128</span>;</div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--color-accent</span>: <span style={{ color: "#F0F2F5" }}>10 104 71</span>;         <span style={{ color: "#5A6478" }}>/* Deep Green */</span></div>
              <br />
              <div style={{ color: "#5A6478" }}>&nbsp;&nbsp;/* --- NEW: Radius tokens (replacing 0px) --- */</div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--radius-sm</span>: 8px;</div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--radius-md</span>: 12px;</div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--radius-lg</span>: 16px;</div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--radius-xl</span>: 20px;</div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--radius-pill</span>: 9999px;</div>
              <br />
              <div style={{ color: "#5A6478" }}>&nbsp;&nbsp;/* --- NEW: Shadow tokens --- */</div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--shadow-sm</span>: 0 1px 4px rgba(180,130,80,0.06);</div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--shadow-md</span>: 0 2px 12px rgba(180,130,80,0.08);</div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--shadow-lg</span>: 0 4px 20px rgba(180,130,80,0.1);</div>
              <br />
              <div style={{ color: "#5A6478" }}>&nbsp;&nbsp;/* --- Typography (CHANGED) --- */</div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--font-display</span>: 'Clash Display', sans-serif;</div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--font-body</span>: 'Satoshi', sans-serif;</div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--font-mono</span>: 'Geist Mono', monospace;</div>
              <br />
              <div style={{ color: "#5A6478" }}>&nbsp;&nbsp;/* --- Layout (KEPT, values adjusted) --- */</div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--header-h</span>: 56px;             <span style={{ color: "#5A6478" }}>/* was 48px */</span></div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--header-h-desktop</span>: 72px;     <span style={{ color: "#5A6478" }}>/* was 64px */</span></div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--mobile-nav-h</span>: 60px;         <span style={{ color: "#5A6478" }}>/* was 56px */</span></div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--audio-bar-h</span>: 68px;          <span style={{ color: "#5A6478" }}>/* was 60px — larger for bold UI */</span></div>
              <div>&nbsp;&nbsp;<span style={{ color: "#34D399" }}>--touch-target-min</span>: 52px;     <span style={{ color: "#5A6478" }}>/* was 48px */</span></div>
              <br />
              <div style={{ color: "#5A6478" }}>&nbsp;&nbsp;/* --- Kept unchanged --- */</div>
              <div>&nbsp;&nbsp;/* spacing, semantic categories, focus, line-heights, content-max-w */</div>
              <div>{"}"}</div>
            </div>

            <div style={{ marginTop: 24, backgroundColor: "#11141C", borderRadius: 16, padding: 20, border: "1px solid #1A1E2A" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5A6478", marginBottom: 10 }}>Tailwind Config Changes</div>
              <div style={{ fontFamily: font.mono, fontSize: 12, color: "#8B95A8", lineHeight: 1.8 }}>
                <div><span style={{ color: "#818CF8" }}>fontFamily</span>: {"{"}</div>
                <div>&nbsp;&nbsp;display: ["Clash Display", "sans-serif"],</div>
                <div>&nbsp;&nbsp;body: ["Satoshi", "sans-serif"],</div>
                <div>&nbsp;&nbsp;mono: ["Geist Mono", "monospace"],</div>
                <div>{"}"}</div>
                <div><span style={{ color: "#818CF8" }}>borderRadius</span>: {"{"}</div>
                <div>&nbsp;&nbsp;sm: "var(--radius-sm)",   <span style={{ color: "#5A6478" }}>// 8px</span></div>
                <div>&nbsp;&nbsp;DEFAULT: "var(--radius-md)", <span style={{ color: "#5A6478" }}>// 12px</span></div>
                <div>&nbsp;&nbsp;lg: "var(--radius-lg)",   <span style={{ color: "#5A6478" }}>// 16px</span></div>
                <div>&nbsp;&nbsp;xl: "var(--radius-xl)",   <span style={{ color: "#5A6478" }}>// 20px</span></div>
                <div>&nbsp;&nbsp;pill: "9999px",</div>
                <div>{"}"}</div>
              </div>
            </div>
          </div>
        )}

        {tab === "screens" && (
          <div style={{ display: "flex", gap: 32, alignItems: "start" }}>
            <MobileFrame>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <span style={{ fontFamily: font.display, fontSize: 22, fontWeight: 600, color: P.primary, letterSpacing: "-0.02em" }}>narvo</span>
                <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: P.primaryMuted, border: `2px solid ${P.primary}` }} />
              </div>
              {/* Greeting */}
              <div style={{ fontFamily: font.display, fontSize: 28, fontWeight: 600, color: P.text, lineHeight: 1.15, marginBottom: 4, letterSpacing: "-0.03em" }}>Good morning,<br />Oga</div>
              <div style={{ fontFamily: font.body, fontSize: 13, color: P.textSec, marginBottom: 20 }}>Your briefing is ready</div>
              {/* Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <StoryCard title="CBN Holds Rates at 27.5%" source="Channels TV" time="3 min" category="Business" featured />
                <StoryCard title="Lagos-Calabar Phase 2" source="Punch NG" time="4 min" category="Politics" />
              </div>
            </MobileFrame>

            <div style={{ flex: 1, maxWidth: 600 }}>
              <Section title="Screen Composition Notes" dark>
                <div style={{ fontSize: 13, color: "#8B95A8", lineHeight: 1.7 }}>
                  <p style={{ margin: "0 0 16px" }}><strong style={{ color: "#F0F2F5" }}>Header:</strong> 56px mobile, 72px desktop. Logo in Clash Display 22px burnt orange. Avatar circle with primary border. Clean, spacious.</p>
                  <p style={{ margin: "0 0 16px" }}><strong style={{ color: "#F0F2F5" }}>Greeting:</strong> 28px Clash Display, bold, tight letter-spacing (-0.03em). Two lines, warm. This is the emotional anchor of the home screen.</p>
                  <p style={{ margin: "0 0 16px" }}><strong style={{ color: "#F0F2F5" }}>Featured Card:</strong> 20px radius, warm shadow, 4px top colour bar. 56px play button in primary muted circle. 17px Clash Display title. Category + Verified badges below.</p>
                  <p style={{ margin: "0 0 16px" }}><strong style={{ color: "#F0F2F5" }}>Standard Card:</strong> 16px radius, lighter shadow. 44px play button. 14px title. No badges — compact for feed scrolling.</p>
                  <p style={{ margin: "0 0 16px" }}><strong style={{ color: "#F0F2F5" }}>Bottom Nav:</strong> 60px height. Icon circles with primary muted fill for active tab. 9px labels. Clean separation from content.</p>
                  <p style={{ margin: "0 0 16px" }}><strong style={{ color: "#F0F2F5" }}>Audio Bar:</strong> 68px height (was 60px). 56px play button with orange shadow. Progress bar with warm orange fill. Floats above bottom nav on mobile.</p>
                  <p style={{ margin: 0 }}><strong style={{ color: "#F0F2F5" }}>Motion:</strong> Cards enter with <code style={{ fontFamily: font.mono, color: P.primary }}>spring(stiffness: 260, damping: 20)</code>. Play button scales on press <code style={{ fontFamily: font.mono, color: P.primary }}>scale(0.92)</code>. Smooth scroll via Lenis. Page transitions fade+slide up 12px over 0.25s.</p>
                </div>
              </Section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
