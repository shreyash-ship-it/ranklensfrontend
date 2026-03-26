import { useState } from "react";
import { PAL, fmt, clamp, scoreColor, posBadge, Badge, SecHead, Card, Trend } from "./ui.jsx";

const TABS = [
  { id: "overview",      label: "Overview" },
  { id: "keywords",      label: "Keywords" },
  { id: "analysis",      label: "Deep Analysis" },
  { id: "opportunities", label: "Opportunities" },
];

export default function Dashboard({ data, meta, onBack }) {
  const [tab, setTab] = useState("overview");

  const p = data.primarySite;
  const comps = data.competitors || [];
  const all = [p, ...comps];
  const maxT = Math.max(...all.map((s) => s.traffic || 0), 1);
  const avgDA = comps.length
    ? Math.round(comps.reduce((a, c) => a + c.da, 0) / comps.length)
    : 0;

  const cell = { padding: "12px 14px", verticalAlign: "middle" };
  const th = {
    padding: "10px 14px", textAlign: "left",
    fontFamily: "JetBrains Mono, monospace", fontSize: 10,
    fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
    color: "var(--ink3)", borderBottom: "1px solid var(--line)",
    background: "var(--paper3)", whiteSpace: "nowrap",
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper3)" }}>

      {/* ── Top nav ── */}
      <div style={{
        background: "#fff", borderBottom: "1px solid var(--line)",
        padding: "0 20px", height: 56,
        display: "flex", alignItems: "center", gap: 12,
        position: "sticky", top: 0, zIndex: 200, flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, background: "#16a34a", borderRadius: "50%",
            animation: "blink 2s ease-in-out infinite" }} />
          <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em" }}>RankLens</span>
        </div>
        <Chip>{p.domain}</Chip>
        <Chip style={{ background: "var(--accent-light)", color: "var(--accent)",
          borderColor: "var(--accent-border)" }}>{data.industry}</Chip>
        <Chip style={{ background: "#dcfce7", color: "#15803d", borderColor: "#bbf7d0" }}>✓ Analysis Complete</Chip>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12, color: "var(--ink4)" }}>📍 {meta.location}</span>
          <button onClick={onBack} style={navBtnStyle}>← New Analysis</button>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid var(--line)",
        padding: "0 20px", display: "flex", gap: 2 }}>
        {TABS.map(({ id, label }) => (
          <button key={id} onClick={() => setTab(id)} style={{
            height: 44, padding: "0 16px", border: "none",
            background: "transparent", fontSize: 13,
            fontWeight: tab === id ? 600 : 400,
            color: tab === id ? "var(--accent)" : "var(--ink3)",
            borderBottom: tab === id ? "2px solid var(--accent)" : "2px solid transparent",
            cursor: "pointer", transition: "all 0.15s",
          }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ padding: "20px 20px 60px", maxWidth: 1440, margin: "0 auto" }}>

        {/* Summary banner */}
        <Card style={{ padding: "14px 18px", marginBottom: 20,
          display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}
          className="fade-up">
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "var(--ink4)", paddingTop: 2, whiteSpace: "nowrap" }}>Overview</span>
          <span style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.7, flex: 1 }}>
            {data.summary}
          </span>
        </Card>

        {/* ════ OVERVIEW TAB ════════════════════════════════════════ */}
        {tab === "overview" && (
          <>
            {/* Score strip */}
            <div style={{ display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 10, marginBottom: 24 }}>
              {[
                { label: "Domain Authority", val: p.da, unit: "/100",
                  sub: `Avg competitor: ${avgDA}`,
                  color: p.da < avgDA ? "var(--red)" : "var(--green)" },
                { label: "Organic Traffic", val: fmt(p.traffic), unit: "/mo",
                  sub: `${fmt(p.keywords)} keywords ranked` },
                { label: "Backlinks", val: fmt(p.backlinks),
                  sub: `Avg competitor: ${fmt(Math.round(comps.reduce((a, c) => a + c.backlinks, 0) / Math.max(comps.length, 1)))}` },
                { label: "Page Speed", val: p.pageSpeed, unit: "/100",
                  sub: "Core Web Vitals", color: scoreColor(p.pageSpeed).fg },
                { label: "Content Score", val: p.contentScore, unit: "/100",
                  sub: "Quality & relevance", color: scoreColor(p.contentScore).fg },
                { label: "Mobile Score", val: p.mobileScore, unit: "/100",
                  sub: "Mobile UX", color: scoreColor(p.mobileScore).fg },
              ].map((s, i) => (
                <div key={i} className={`fade-up-${i}`} style={{
                  background: "#fff", border: "1px solid var(--line)",
                  borderRadius: 10, padding: "14px 16px",
                }}>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "var(--ink4)", marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em",
                    lineHeight: 1, color: s.color || "var(--ink)" }}>
                    {s.val}
                    <span style={{ fontSize: 12, fontWeight: 400, color: "var(--ink4)" }}>{s.unit}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "var(--ink4)", marginTop: 3 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Comparison table */}
            <SecHead label="Side-by-Side Comparison" />
            <Card style={{ marginBottom: 20, overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
                <thead>
                  <tr>
                    {["Website", "Domain Authority", "Traffic/mo", "Keywords",
                      "Backlinks", "Speed", "Content", "Mobile", "Technical"].map((h) => (
                      <th key={h} style={th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {all.map((s, i) => {
                    const pal = PAL[i] || PAL[0];
                    return (
                      <tr key={i} style={{
                        borderBottom: "1px solid var(--paper3)",
                        background: i === 0 ? "rgba(37,99,235,0.025)" : "#fff",
                      }}>
                        <td style={cell}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 8,
                              background: pal.fill, color: pal.stroke,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                              {(s.name || s.domain || "?")[0].toUpperCase()}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: 13 }}>
                                {s.name || s.domain}
                                {i === 0 && (
                                  <span style={{ marginLeft: 6, fontFamily: "JetBrains Mono, monospace",
                                    fontSize: 9, background: "var(--accent-light)",
                                    color: "var(--accent)", borderRadius: 4, padding: "2px 6px" }}>
                                    YOU
                                  </span>
                                )}
                              </div>
                              <div style={{ fontFamily: "JetBrains Mono, monospace",
                                fontSize: 10, color: "var(--ink4)" }}>{s.domain}</div>
                            </div>
                          </div>
                        </td>
                        <td style={cell}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 60, height: 4, background: "var(--paper3)",
                              borderRadius: 2, overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${clamp(s.da, 0, 100)}%`,
                                background: pal.stroke, borderRadius: 2 }} />
                            </div>
                            <span style={{ fontFamily: "JetBrains Mono, monospace",
                              fontSize: 13, fontWeight: 700, color: pal.stroke }}>{s.da}</span>
                          </div>
                        </td>
                        <td style={cell}><span style={{ fontFamily: "JetBrains Mono, monospace",
                          fontSize: 12, color: pal.stroke, fontWeight: 600 }}>{fmt(s.traffic)}</span></td>
                        <td style={cell}><span style={{ fontFamily: "JetBrains Mono, monospace",
                          fontSize: 12 }}>{fmt(s.keywords)}</span></td>
                        <td style={cell}><span style={{ fontFamily: "JetBrains Mono, monospace",
                          fontSize: 12 }}>{fmt(s.backlinks)}</span></td>
                        <td style={cell}><Badge v={s.pageSpeed} /></td>
                        <td style={cell}><Badge v={s.contentScore} /></td>
                        <td style={cell}><Badge v={s.mobileScore} /></td>
                        <td style={cell}><Badge v={s.technicalScore} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>

            {/* Traffic + DA bars */}
            <SecHead label="Traffic & Authority Breakdown" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <Card style={{ padding: 20 }}>
                <div style={blockTitle}>Organic Traffic (Monthly)</div>
                {all.map((s, i) => {
                  const pal = PAL[i] || PAL[0];
                  const pct = Math.round((s.traffic / maxT) * 100);
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <div style={{ fontSize: 12, minWidth: 120, overflow: "hidden",
                        textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {s.name || s.domain}{i === 0 ? " (You)" : ""}
                      </div>
                      <div style={{ flex: 1, height: 24, background: "var(--paper3)",
                        borderRadius: 5, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: pal.stroke,
                          minWidth: 40, borderRadius: 5,
                          display: "flex", alignItems: "center", padding: "0 10px" }}>
                          <span style={{ fontFamily: "JetBrains Mono, monospace",
                            fontSize: 10, color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
                            {fmt(s.traffic)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Card>
              <Card style={{ padding: 20 }}>
                <div style={blockTitle}>Domain Authority</div>
                {all.map((s, i) => {
                  const pal = PAL[i] || PAL[0];
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <div style={{ fontSize: 12, minWidth: 120, overflow: "hidden",
                        textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {s.name || s.domain}{i === 0 ? " (You)" : ""}
                      </div>
                      <div style={{ flex: 1, height: 10, background: "var(--paper3)",
                        borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${clamp(s.da, 0, 100)}%`,
                          background: pal.stroke, borderRadius: 3 }} />
                      </div>
                      <span style={{ fontFamily: "JetBrains Mono, monospace",
                        fontSize: 13, fontWeight: 700, color: pal.stroke, minWidth: 26 }}>
                        {s.da}
                      </span>
                    </div>
                  );
                })}
              </Card>
            </div>

            {/* Health scores */}
            <SecHead label="SEO Health Scores" />
            <div style={{ display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 12 }}>
              {all.map((s, i) => {
                const pal = PAL[i] || PAL[0];
                return (
                  <Card key={i} style={{ padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7,
                      marginBottom: 12, fontSize: 12, fontWeight: 600 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%",
                        background: pal.stroke, flexShrink: 0 }} />
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis",
                        whiteSpace: "nowrap" }}>{s.name || s.domain}</span>
                      {i === 0 && <YouPill />}
                    </div>
                    {[["Content", s.contentScore], ["Mobile", s.mobileScore],
                      ["Technical", s.technicalScore], ["Speed", s.pageSpeed]].map(([lbl, val]) => {
                      const c = scoreColor(val);
                      return (
                        <div key={lbl} style={{ marginBottom: 9 }}>
                          <div style={{ display: "flex", justifyContent: "space-between",
                            fontSize: 11, color: "var(--ink3)", marginBottom: 4 }}>
                            <span>{lbl}</span>
                            <span style={{ color: c.fg, fontWeight: 700 }}>{val}</span>
                          </div>
                          <div style={{ height: 4, background: "var(--paper3)",
                            borderRadius: 2, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${clamp(val, 0, 100)}%`,
                              background: pal.stroke, opacity: 0.75, borderRadius: 2 }} />
                          </div>
                        </div>
                      );
                    })}
                  </Card>
                );
              })}
            </div>
          </>
        )}

        {/* ════ KEYWORDS TAB ════════════════════════════════════════ */}
        {tab === "keywords" && (
          <>
            <SecHead label="Top 10 Keyword Rankings Per Site" />
            <div style={{ display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(255px, 1fr))",
              gap: 14 }}>
              {all.map((s, i) => {
                const pal = PAL[i] || PAL[0];
                return (
                  <Card key={i}>
                    <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--paper3)",
                      display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: pal.stroke }} />
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{s.name || s.domain}</span>
                      {i === 0 && <YouPill />}
                    </div>
                    {(s.topKw || []).map((k, j) => {
                      const pb = posBadge(k.pos);
                      return (
                        <div key={j} style={{
                          display: "flex", alignItems: "center", gap: 6,
                          padding: "7px 14px",
                          borderBottom: j < (s.topKw.length - 1) ? "1px solid #f8fafc" : "none",
                        }}>
                          <span style={{ flex: 1, fontSize: 11, color: "var(--ink2)",
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                            fontFamily: "JetBrains Mono, monospace" }}>{k.kw}</span>
                          <span style={{ fontFamily: "JetBrains Mono, monospace",
                            fontSize: 10, fontWeight: 700,
                            background: pb.bg, color: pb.fg,
                            padding: "2px 5px", borderRadius: 4,
                            minWidth: 28, textAlign: "center" }}>#{k.pos}</span>
                          <span style={{ fontFamily: "JetBrains Mono, monospace",
                            fontSize: 10, color: "var(--ink4)",
                            minWidth: 40, textAlign: "right" }}>{fmt(k.vol)}</span>
                          <Trend t={k.trend} />
                        </div>
                      );
                    })}
                  </Card>
                );
              })}
            </div>
          </>
        )}

        {/* ════ ANALYSIS TAB ════════════════════════════════════════ */}
        {tab === "analysis" && (
          <>
            <SecHead label="Detailed SEO Analysis — All Sites" />
            <div style={{ display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 14 }}>
              {/* Primary site card */}
              <Card style={{ border: "1px solid var(--accent-border)" }}>
                <SiteCardHeader site={p} pal={PAL[0]} isYou />
                <SiteMetrics site={p} pal={PAL[0]} />
                <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--paper3)" }}>
                  <SectionTitle color="var(--green)">● What you're doing right</SectionTitle>
                  {(p.bestPractices || []).map((b, j) => (
                    <ListItem key={j} color="var(--green)">{b}</ListItem>
                  ))}
                </div>
                <div style={{ padding: "12px 16px" }}>
                  <SectionTitle color="var(--red)">● Priority improvements</SectionTitle>
                  {(p.improvements || []).map((b, j) => (
                    <ListItem key={j} color="var(--red)">{b}</ListItem>
                  ))}
                </div>
              </Card>

              {/* Competitor cards */}
              {comps.map((c, i) => {
                const pal = PAL[i + 1] || PAL[1];
                return (
                  <Card key={i}>
                    <SiteCardHeader site={c} pal={pal} />
                    <SiteMetrics site={c} pal={pal} />
                    <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--paper3)" }}>
                      <SectionTitle color="var(--amber)">★ Why they outrank you</SectionTitle>
                      {(c.edgeOver || []).map((b, j) => (
                        <ListItem key={j} color="var(--amber)">{b}</ListItem>
                      ))}
                    </div>
                    <div style={{ padding: "12px 16px" }}>
                      <SectionTitle color="var(--green)">● Their top SEO strengths</SectionTitle>
                      {(c.bestPractices || []).slice(0, 3).map((b, j) => (
                        <ListItem key={j} color="var(--green)">{b}</ListItem>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        )}

        {/* ════ OPPORTUNITIES TAB ════════════════════════════════════ */}
        {tab === "opportunities" && (
          <>
            <SecHead label="Growth Opportunities — Prioritised Action Plan" />
            <div style={{ display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 14 }}>
              {(data.opportunities || []).map((o, i) => {
                const ps = o.priority === "high"
                  ? { bg: "var(--red-bg)", fg: "var(--red)", label: "🔴 High Priority" }
                  : o.priority === "medium"
                  ? { bg: "var(--amber-bg)", fg: "var(--amber)", label: "🟡 Medium Priority" }
                  : { bg: "var(--green-bg)", fg: "var(--green)", label: "🟢 Quick Win" };
                return (
                  <Card key={i} style={{ padding: 18 }}>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9,
                      textTransform: "uppercase", letterSpacing: "0.08em",
                      background: ps.bg, color: ps.fg,
                      padding: "3px 8px", borderRadius: 4,
                      display: "inline-block", marginBottom: 10 }}>{ps.label}</span>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{o.title}</div>
                    <div style={{ fontSize: 12, color: "var(--ink3)",
                      lineHeight: 1.65, marginBottom: 10 }}>{o.desc}</div>
                    <div style={{ fontSize: 11, color: "var(--teal)",
                      fontFamily: "JetBrains Mono, monospace",
                      background: "var(--teal-bg)", padding: "6px 10px", borderRadius: 6 }}>
                      📈 {o.impact}
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        )}

        {/* Footer */}
        <div style={{ marginTop: 36, paddingTop: 16,
          borderTop: "1px solid var(--line)",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontFamily: "JetBrains Mono, monospace",
            fontSize: 11, color: "var(--ink4)" }}>
            RankLens · Powered by Claude AI · {new Date().toLocaleDateString("en-GB",
              { day: "numeric", month: "short", year: "numeric" })}
          </span>
          <button onClick={onBack} style={navBtnStyle}>← Analyze Another Site</button>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────────

function Chip({ children, style = {} }) {
  return (
    <span style={{
      fontFamily: "JetBrains Mono, monospace", fontSize: 11,
      color: "var(--ink3)", background: "var(--paper3)",
      border: "1px solid var(--line)", borderRadius: 5, padding: "3px 10px",
      ...style,
    }}>{children}</span>
  );
}

function YouPill() {
  return (
    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9,
      background: "var(--accent-light)", color: "var(--accent)",
      borderRadius: 4, padding: "2px 6px", textTransform: "uppercase" }}>
      YOU
    </span>
  );
}

function SiteCardHeader({ site, pal, isYou = false }) {
  return (
    <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--paper3)",
      display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 36, height: 36, borderRadius: 9, background: pal.fill,
        color: pal.stroke, display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 15, fontWeight: 800, flexShrink: 0 }}>
        {(site.name || site.domain || "?")[0].toUpperCase()}
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 13 }}>
          {site.name || site.domain}{" "}
          {isYou && <YouPill />}
        </div>
        <div style={{ fontFamily: "JetBrains Mono, monospace",
          fontSize: 10, color: "var(--ink4)" }}>{site.domain}</div>
      </div>
    </div>
  );
}

function SiteMetrics({ site, pal }) {
  return (
    <div style={{ display: "flex", borderBottom: "1px solid var(--paper3)" }}>
      {[["DA", site.da], ["Traffic", fmt(site.traffic)], ["KW", fmt(site.keywords)]].map(([l, v]) => (
        <div key={l} style={{ flex: 1, textAlign: "center", padding: "10px 8px",
          borderRight: "1px solid var(--paper3)" }}>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9,
            textTransform: "uppercase", color: "var(--ink4)", marginBottom: 3 }}>{l}</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: pal.stroke }}>{v}</div>
        </div>
      ))}
    </div>
  );
}

function SectionTitle({ children, color }) {
  return (
    <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9,
      fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
      color, marginBottom: 8 }}>{children}</div>
  );
}

function ListItem({ children, color }) {
  return (
    <div style={{ display: "flex", gap: 8, fontSize: 12,
      color: "var(--ink2)", marginBottom: 6, lineHeight: 1.55 }}>
      <div style={{ width: 4, height: 4, borderRadius: "50%",
        background: color, flexShrink: 0, marginTop: 5 }} />
      {children}
    </div>
  );
}

// ── Shared styles ────────────────────────────────────────────────────
const navBtnStyle = {
  height: 32, padding: "0 14px", border: "1px solid var(--line2)",
  borderRadius: 7, background: "#fff", fontSize: 12,
  cursor: "pointer", color: "var(--ink2)", fontFamily: "Inter, system-ui, sans-serif",
  transition: "all 0.15s",
};

const blockTitle = {
  fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 600,
  letterSpacing: "0.1em", textTransform: "uppercase",
  color: "var(--ink3)", marginBottom: 16,
};
