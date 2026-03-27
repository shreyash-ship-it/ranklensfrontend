import { useState } from "react";

const LOCATIONS = [
  "India", "United States", "United Kingdom", "Australia",
  "Canada", "Germany", "Singapore", "UAE", "Global"
];

export default function InputScreen({ onSubmit, initialError = "" }) {
  const [primary, setPrimary] = useState("");
  const [comps, setComps] = useState(["", "", "", "", ""]);
  const [loc, setLoc] = useState("India");
  const [err, setErr] = useState(initialError);
  

  const updateComp = (i, v) =>
    setComps((c) => { const n = [...c]; n[i] = v; return n; });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!primary.trim()) { setErr("Please enter your website URL."); return; }
    setErr("");
    
    onSubmit(primary.trim(), comps.filter(Boolean), loc);
    
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1.1fr" }}>

      {/* ── Left dark panel ── */}
      <div style={{
        background: "linear-gradient(160deg, #0f172a 0%, #1e293b 1h00%)",
        padding: "52px 48px", display: "flex", flexDirection: "column",
        justifyContent: "space-between", position: "relative", overflow: "hidden",
      }}>
        {/* Glow */}
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
          top: -150, left: -150, pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
          bottom: -80, right: -80, pointerEvents: "none" }} />

        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative", zIndex: 1 }}>
          <div style={{ width: 38, height: 38, background: "#2563eb", borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "JetBrains Mono, monospace", fontWeight: 700, fontSize: 14, color: "#fff" }}>
            RL
          </div>
          <span style={{ fontSize: 20, color: "#f1f5f9", fontWeight: 600, letterSpacing: "-0.02em" }}>
            RankLens
          </span>
        </div>

        {/* Hero text */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10,
            letterSpacing: "0.15em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)", marginBottom: 20 }}>
            Real-Time SEO Intelligence
          </div>
          <h1 style={{ fontSize: "clamp(32px, 3.5vw, 50px)", lineHeight: 1.08,
            color: "#f1f5f9", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 18 }}>
            See exactly why<br />
            <span style={{ color: "rgba(255,255,255,0.25)", fontStyle: "italic", fontWeight: 300 }}>
              they
            </span>{" "}outrank you
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: 380 }}>
            Enter any website and up to 5 competitors. Get instant side-by-side SEO analysis —
            keywords, domain authority, traffic, and the exact strategies your rivals use that you don't.
          </p>
        </div>

        {/* Feature list */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 11 }}>
          {[
            "Top 10 keyword rankings with search volume",
            "Domain authority & backlink comparison",
            "Competitor gap — what they do that you don't",
            "Auto-detects rivals if you leave competitors blank",
            "Content, mobile & technical SEO health scores",
            "Prioritised action plan to outrank competitors",
          ].map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 10,
              fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%",
                background: "#2563eb", flexShrink: 0 }} />
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* ── Right form ── */}
      <div style={{ background: "#fafafa", padding: "52px 48px",
        display: "flex", flexDirection: "column", justifyContent: "center",
        overflowY: "auto" }}>

        <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 4 }}>
          Analyze your SEO position
        </h2>
        <p style={{ fontSize: 13, color: "var(--ink3)", marginBottom: 28 }}>
          Your site + up to 5 competitors. Leave competitors blank to auto-detect.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Primary URL */}
          <label style={labelStyle}>Your Website</label>
          <div style={{ ...inputWrap, border: "2px solid var(--ink)", marginBottom: 22 }}>
            <span style={{ fontSize: 18, color: "var(--ink3)", lineHeight: 1 }}>⊙</span>
            <input
              type="text" value={primary}
              onChange={(e) => setPrimary(e.target.value)}
              placeholder="yourwebsite.com"
              style={{ ...inputBase, height: 50, fontSize: 15,
                fontFamily: "JetBrains Mono, monospace" }}
              autoComplete="off" autoFocus
            />
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "0 0 14px" }}>
            <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10,
              color: "var(--ink4)", whiteSpace: "nowrap" }}>
              competitors — optional
            </span>
            <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
          </div>

          {/* Competitor inputs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            {comps.map((c, i) => (
              <div key={i} style={{ ...inputWrap }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace",
                  fontSize: 10, color: "var(--ink4)", width: 20, flexShrink: 0 }}>
                  0{i + 1}
                </span>
                <input
                  type="text" value={c}
                  onChange={(e) => updateComp(i, e.target.value)}
                  placeholder={`competitor${i + 1}.com`}
                  style={{ ...inputBase }}
                />
              </div>
            ))}
          </div>

          {/* Location */}
          <label style={labelStyle}>Target Location</label>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <select
              value={loc} onChange={(e) => setLoc(e.target.value)}
              style={{ width: "100%", height: 42, border: "1px solid var(--line2)",
                borderRadius: 8, background: "#fff", padding: "0 36px 0 14px",
                fontSize: 13, color: "var(--ink)", outline: "none",
                appearance: "none", cursor: "pointer" }}
            >
              {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            <span style={{ position: "absolute", right: 12, top: "50%",
              transform: "translateY(-50%)", pointerEvents: "none",
              color: "var(--ink3)", fontSize: 11 }}>▾</span>
          </div>

          {/* Hint */}
          <div style={{ fontSize: 12, color: "var(--ink2)", background: "var(--accent-light)",
            borderLeft: "3px solid var(--accent)", padding: "10px 14px",
            borderRadius: "0 8px 8px 0", lineHeight: 1.6, marginBottom: 6 }}>
            💡 <strong>Leave competitors blank</strong> — RankLens will automatically identify
            your top rivals based on your industry and keywords.
          </div>

          {/* Error */}
          {err && (
            <div style={{ background: "var(--red-bg)", border: "1px solid #fca5a5",
              borderRadius: 8, color: "var(--red)", fontSize: 12,
              padding: "10px 14px", marginTop: 8 }}>
              ⚠ {err}
            </div>
          )}

          {/* Submit */}
          <button
            <button type="submit" style={{width:"100%",marginTop:20,height:52,background:"#0f172a",color:"#fff",border:"none",borderRadius:10,fontSize:15,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,transition:"background 0.2s"}} onMouseEnter={e=>e.currentTarget.style.background="#2563eb"} onMouseLeave={e=>e.currentTarget.style.background="#0f172a"}>
  Run SEO Analysis →
</button>"
            )}
          </button>
        </form>

        <p style={{ marginTop: 20, fontSize: 11, color: "var(--ink4)", textAlign: "center" }}>
          Analysis takes 15–30 seconds · Powered by Claude AI
        </p>
      </div>
    </div>
  );
}

// ── Shared styles ──
const labelStyle = {
  display: "block", fontFamily: "JetBrains Mono, monospace",
  fontSize: 10, fontWeight: 600, letterSpacing: "0.12em",
  textTransform: "uppercase", color: "var(--ink3)", marginBottom: 7,
};
const inputWrap = {
  display: "flex", alignItems: "center",
  border: "1px solid var(--line2)", borderRadius: 8,
  background: "#fff", padding: "0 12px", gap: 10,
  transition: "border-color 0.15s",
};
const inputBase = {
  flex: 1, height: 42, border: "none", outline: "none",
  background: "transparent", fontSize: 13, color: "var(--ink)",
  fontFamily: "Inter, system-ui, sans-serif",
};
