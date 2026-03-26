// ── Colour palette for sites ────────────────────────────────────────
export const PAL = [
  { stroke: "#2563eb", fill: "#eff6ff", text: "#1e40af" },
  { stroke: "#dc2626", fill: "#fef2f2", text: "#991b1b" },
  { stroke: "#16a34a", fill: "#f0fdf4", text: "#15803d" },
  { stroke: "#9333ea", fill: "#faf5ff", text: "#7e22ce" },
  { stroke: "#ea580c", fill: "#fff7ed", text: "#9a3412" },
  { stroke: "#0891b2", fill: "#ecfeff", text: "#0e7490" },
];

// ── Number formatter ────────────────────────────────────────────────
export const fmt = (n) => {
  if (!n && n !== 0) return "—";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(0) + "K";
  return String(n);
};

export const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v || 0));

// ── Score colours ───────────────────────────────────────────────────
export const scoreColor = (v) => {
  if (v >= 70) return { bg: "#dcfce7", fg: "#15803d" };
  if (v >= 45) return { bg: "#fef3c7", fg: "#d97706" };
  return { bg: "#fee2e2", fg: "#dc2626" };
};

// ── Position badge colours ──────────────────────────────────────────
export const posBadge = (p) => {
  if (p === 1)  return { bg: "#dcfce7", fg: "#15803d" };
  if (p <= 3)   return { bg: "#dbeafe", fg: "#1d4ed8" };
  if (p <= 10)  return { bg: "#fef3c7", fg: "#d97706" };
  return         { bg: "#fee2e2", fg: "#dc2626" };
};

// ── Badge component ─────────────────────────────────────────────────
export function Badge({ v }) {
  const c = scoreColor(v);
  return (
    <span style={{
      background: c.bg, color: c.fg,
      fontFamily: "JetBrains Mono, monospace",
      fontSize: 11, fontWeight: 700,
      padding: "2px 7px", borderRadius: 5,
      display: "inline-block",
    }}>{v}</span>
  );
}

// ── Section header ──────────────────────────────────────────────────
export function SecHead({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0 14px" }}>
      <span style={{
        fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
        textTransform: "uppercase", color: "var(--ink3)", whiteSpace: "nowrap",
        fontFamily: "JetBrains Mono, monospace",
      }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
    </div>
  );
}

// ── Card ────────────────────────────────────────────────────────────
export function Card({ children, style = {} }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid var(--line)",
      borderRadius: 12, overflow: "hidden", ...style,
    }}>
      {children}
    </div>
  );
}

// ── Trend arrow ─────────────────────────────────────────────────────
export function Trend({ t }) {
  if (t === "up")   return <span style={{ color: "#16a34a", fontSize: 11 }}>↑</span>;
  if (t === "down") return <span style={{ color: "#dc2626", fontSize: 11 }}>↓</span>;
  return <span style={{ color: "#94a3b8", fontSize: 11 }}>—</span>;
}
