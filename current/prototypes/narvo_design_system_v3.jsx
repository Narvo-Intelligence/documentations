import { useState } from "react";

const brands = {
  consumer: {
    name: "Narvo",
    sub: "Consumer App (B2C)",
    tagline: "The Local Pulse, Refined.",
    mode: "light",
    fontDisplay: "'General Sans', system-ui, sans-serif",
    fontBody: "'General Sans', system-ui, sans-serif",
    typeRatio: 1.25,
    typeBase: 16,
    radiusCard: 16,
    radiusBtn: 12,
    radiusInput: 8,
    bg: "#FDF8F0",
    surface: "#FFFFFF",
    surfaceRaised: "#FBF0E0",
    primary: "#D4850A",
    primaryHover: "#BE7508",
    accent: "#5B5BD6",
    secondary: "#18967E",
    textPrimary: "#2A2420",
    textSecondary: "#6B5A40",
    border: "#E8D8C4",
    shadowTint: "139, 90, 43",
    greeting: "Good morning, Oga",
    cta: "Oya, Play",
  },
  platform: {
    name: "Narvo Platform",
    sub: "Developer API (B2B)",
    tagline: "News infrastructure, built for scale.",
    mode: "dark",
    fontDisplay: "'Geist', system-ui, sans-serif",
    fontBody: "'Geist', system-ui, sans-serif",
    typeRatio: 1.2,
    typeBase: 15,
    radiusCard: 8,
    radiusBtn: 6,
    radiusInput: 4,
    bg: "#0D0F1A",
    surface: "#131526",
    surfaceRaised: "#1A1C32",
    primary: "#22AAD0",
    primaryHover: "#1A98BE",
    accent: "#34D399",
    secondary: "#818CF8",
    textPrimary: "#ECEEF5",
    textSecondary: "#8890A8",
    border: "#2A2D48",
    shadowTint: "0, 0, 0",
    greeting: "Welcome back",
    cta: "Get API Key",
  },
  intelligence: {
    name: "Narvo Intelligence",
    sub: "Corporate Parent",
    tagline: "The intelligence behind the brands.",
    mode: "light",
    fontDisplay: "'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    typeRatio: 1.333,
    typeBase: 16,
    radiusCard: 6,
    radiusBtn: 4,
    radiusInput: 3,
    bg: "#FDFDFD",
    surface: "#F7F8FA",
    surfaceRaised: "#ECEEF5",
    primary: "#5B52EF",
    primaryHover: "#4B42DF",
    accent: "#06D6A0",
    secondary: "#818CF8",
    textPrimary: "#1A1C30",
    textSecondary: "#6B6E88",
    border: "#D8DAE4",
    shadowTint: "0, 0, 0",
    greeting: "Q1 2026 Overview",
    cta: "View Report",
  },
};

function genScale(base, ratio, steps) {
  return steps.map((n) => ({
    step: n,
    size: Math.round(base * Math.pow(ratio, n)),
  }));
}

const spacingScale = [0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64];

function Card({ brand, b }) {
  const shadow = `0 2px 4px rgba(${b.shadowTint}, 0.08), 0 1px 2px rgba(${b.shadowTint}, 0.04)`;
  return (
    <div
      style={{
        background: b.surface,
        borderRadius: b.radiusCard,
        border: `1px solid ${b.border}`,
        boxShadow: b.mode === "light" ? shadow : "none",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: b.radiusBtn,
            background: b.mode === "light" ? `${b.primary}18` : `${b.primary}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill={b.primary}>
            <path d="M4 2.5v13l11-6.5L4 2.5z" />
          </svg>
        </div>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: b.fontDisplay,
              fontSize: 14,
              fontWeight: 600,
              color: b.textPrimary,
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
            }}
          >
            Breaking: Tech Giants Announce African AI Research Hub
          </div>
          <div
            style={{
              fontFamily: b.fontBody,
              fontSize: 12,
              color: b.textSecondary,
              marginTop: 4,
            }}
          >
            TechCrunch Africa · 3 min
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <span
          style={{
            padding: "3px 10px",
            borderRadius: b.radiusCard,
            fontSize: 10,
            fontWeight: 600,
            fontFamily: b.fontBody,
            background: "#B080E020",
            color: "#9060C0",
          }}
        >
          Tech
        </span>
        <span
          style={{
            padding: "3px 10px",
            borderRadius: b.radiusCard,
            fontSize: 10,
            fontWeight: 600,
            fontFamily: b.fontBody,
            background: `${b.secondary}18`,
            color: b.secondary,
          }}
        >
          Verified
        </span>
      </div>
    </div>
  );
}

function BrandPreview({ brandKey }) {
  const b = brands[brandKey];
  const scale = genScale(b.typeBase, b.typeRatio, [-2, -1, 0, 1, 2, 3, 4]);
  
  return (
    <div
      style={{
        background: b.bg,
        borderRadius: 12,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        minWidth: 0,
        flex: "1 1 300px",
        border: `1px solid ${b.border}`,
      }}
    >
      {/* Header */}
      <div>
        <div
          style={{
            fontFamily: b.fontDisplay,
            fontSize: Math.round(b.typeBase * Math.pow(b.typeRatio, 2)),
            fontWeight: 700,
            color: b.textPrimary,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          {b.name}
        </div>
        <div
          style={{
            fontFamily: b.fontBody,
            fontSize: 13,
            color: b.textSecondary,
            marginTop: 4,
          }}
        >
          {b.sub} — {b.tagline}
        </div>
      </div>

      {/* Colour Swatches */}
      <div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: b.textSecondary,
            fontFamily: b.fontBody,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 8,
          }}
        >
          Palette
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {[
            { color: b.primary, label: "Primary" },
            { color: b.accent, label: "Accent" },
            { color: b.secondary, label: "Secondary" },
            { color: b.bg, label: "Bg" },
            { color: b.surface, label: "Surface" },
            { color: b.textPrimary, label: "Text" },
          ].map(({ color, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: b.radiusBtn,
                  background: color,
                  border: `1px solid ${b.border}`,
                }}
              />
              <div
                style={{
                  fontSize: 8,
                  color: b.textSecondary,
                  marginTop: 3,
                  fontFamily: "'Geist Mono', monospace",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Type Scale */}
      <div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: b.textSecondary,
            fontFamily: b.fontBody,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 8,
          }}
        >
          Type Scale ({b.typeBase}px × {b.typeRatio})
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {scale
            .filter((s) => s.step >= 0)
            .reverse()
            .map(({ step, size }) => (
              <div key={step} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span
                  style={{
                    fontSize: 9,
                    color: b.textSecondary,
                    fontFamily: "'Geist Mono', monospace",
                    width: 32,
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  {size}px
                </span>
                <span
                  style={{
                    fontFamily: step >= 2 ? b.fontDisplay : b.fontBody,
                    fontSize: Math.min(size, 32),
                    fontWeight: step >= 1 ? 600 : 400,
                    color: b.textPrimary,
                    letterSpacing: step >= 2 ? "-0.02em" : "0",
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {step === 0 ? "Body text" : step === 1 ? "Card Title" : step === 2 ? "Section" : step === 3 ? "Page Header" : "Display"}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Radius Demo */}
      <div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: b.textSecondary,
            fontFamily: b.fontBody,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 8,
          }}
        >
          Radius
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {[b.radiusInput, b.radiusBtn, b.radiusCard, b.radiusCard + 4].map((r, i) => (
            <div
              key={i}
              style={{
                width: 32 + i * 8,
                height: 24,
                borderRadius: r,
                border: `2px solid ${b.primary}`,
                background: `${b.primary}10`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 8,
                color: b.textSecondary,
                fontFamily: "'Geist Mono', monospace",
              }}
            >
              {r}px
            </div>
          ))}
        </div>
      </div>

      {/* Sample Card */}
      <Card brand={brandKey} b={b} />

      {/* Button */}
      <button
        style={{
          background: b.primary,
          color: b.mode === "dark" ? "#0D0F1A" : "#FFFFFF",
          border: "none",
          borderRadius: b.radiusBtn,
          padding: "12px 24px",
          fontFamily: b.fontDisplay,
          fontWeight: 600,
          fontSize: 14,
          cursor: "pointer",
          boxShadow: b.mode === "light" ? `0 2px 8px rgba(${b.shadowTint}, 0.15)` : "none",
          letterSpacing: "-0.01em",
          minHeight: 48,
        }}
      >
        {b.cta}
      </button>
    </div>
  );
}

function MathSection() {
  return (
    <div
      style={{
        background: "#0D0F1A",
        borderRadius: 12,
        padding: 24,
        marginBottom: 24,
        border: "1px solid #2A2D48",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "#8890A8",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: 16,
          fontFamily: "'Geist Mono', monospace",
        }}
      >
        Mathematical Foundations
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
        }}
      >
        {[
          { formula: "f(n) = base × rⁿ", name: "Modular Type Scale", desc: "Ratio-based hierarchy" },
          { formula: "φ = 1.618...", name: "Golden Ratio", desc: "Layout proportions" },
          { formula: "8 × n", name: "Spacing Grid", desc: "8px base unit" },
          { formula: "F = -kx - dv", name: "Spring Physics", desc: "Natural motion" },
          { formula: "oklch(L C H)", name: "OKLCH Colour", desc: "Perceptual uniformity" },
          { formula: "MT = a+b·log₂(2D/W)", name: "Fitts's Law", desc: "Touch targets" },
        ].map(({ formula, name, desc }) => (
          <div
            key={name}
            style={{
              background: "#131526",
              borderRadius: 8,
              padding: 14,
              border: "1px solid #2A2D48",
            }}
          >
            <div
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 14,
                color: "#22AAD0",
                marginBottom: 6,
                fontWeight: 500,
              }}
            >
              {formula}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#ECEEF5" }}>{name}</div>
            <div style={{ fontSize: 10, color: "#8890A8", marginTop: 2 }}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpacingVisual() {
  const subset = [4, 8, 12, 16, 24, 32, 48, 64];
  return (
    <div
      style={{
        background: "#FDFDFD",
        borderRadius: 12,
        padding: 24,
        marginBottom: 24,
        border: "1px solid #D8DAE4",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "#6B6E88",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: 16,
          fontFamily: "'Geist Mono', monospace",
        }}
      >
        8px Spacing Grid (Shared)
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {subset.map((px) => (
          <div key={px} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 10,
                color: "#6B6E88",
                width: 36,
                textAlign: "right",
              }}
            >
              {px}px
            </span>
            <div
              style={{
                width: px * 3,
                height: 12,
                borderRadius: 3,
                background: `linear-gradient(90deg, #D4850A, #5B52EF, #22AAD0)`,
                opacity: 0.7,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NarvoDesignSystem() {
  const [tab, setTab] = useState("all");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F0F0F5",
        fontFamily: "system-ui, sans-serif",
        padding: 24,
      }}
    >
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&f[]=instrument-sans@400,500,600,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; }
      `}</style>

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#1A1C30",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            fontFamily: "'Instrument Sans', system-ui",
          }}
        >
          Narvo Design System v3
        </h1>
        <p style={{ fontSize: 14, color: "#6B6E88", marginTop: 8, fontFamily: "'Inter', system-ui" }}>
          Mathematical foundations · OKLCH colour · Modular type scales · Three brands, one system
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          marginBottom: 24,
          flexWrap: "wrap",
        }}
      >
        {[
          { key: "all", label: "All Brands" },
          { key: "consumer", label: "Narvo (B2C)" },
          { key: "platform", label: "Platform (B2B)" },
          { key: "intelligence", label: "Intelligence" },
          { key: "math", label: "Math Foundations" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              border: tab === key ? "2px solid #5B52EF" : "1px solid #D8DAE4",
              background: tab === key ? "#5B52EF" : "#FFFFFF",
              color: tab === key ? "#FFFFFF" : "#1A1C30",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Inter', system-ui",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Math Foundations */}
      {(tab === "math" || tab === "all") && (
        <>
          <MathSection />
          {tab === "math" && <SpacingVisual />}
        </>
      )}

      {/* Brand Previews */}
      {tab === "all" && (
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <BrandPreview brandKey="consumer" />
          <BrandPreview brandKey="platform" />
          <BrandPreview brandKey="intelligence" />
        </div>
      )}

      {tab === "consumer" && (
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <BrandPreview brandKey="consumer" />
        </div>
      )}
      {tab === "platform" && (
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <BrandPreview brandKey="platform" />
        </div>
      )}
      {tab === "intelligence" && (
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <BrandPreview brandKey="intelligence" />
        </div>
      )}

      {/* Shared Infrastructure */}
      {tab === "all" && (
        <div style={{ marginTop: 24 }}>
          <SpacingVisual />
        </div>
      )}
    </div>
  );
}
