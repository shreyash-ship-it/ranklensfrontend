const STEPS = [
  "Identifying website & industry niche…",
  "Detecting real competitors from SERP data…",
  "Fetching top 10 keyword rankings per site…",
  "Calculating domain authority & backlinks…",
  "Scoring content, mobile & technical SEO…",
  "Extracting best practices & growth opportunities…",
  "Building your dashboard…",
];

export default function LoadingScreen({ step, primaryUrl }) {
  return (
    <div style={{
      minHeight: "100vh", background: "#fafafa",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 28, padding: 40,
      fontFamily: "Inter, system-ui, sans-serif",
    }}>
      {/* Spinner */}
      <div style={{ position: "relative", width: 64, height: 64 }}>
        <div style={{
          width: 64, height: 64,
          border: "3px solid #e2e8f0",
          borderTopColor: "#2563eb",
          borderRightColor: "#93c5fd",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }} />
        <div style={{
          position: "absolute", inset: 12,
          border: "2px solid #e2e8f0",
          borderBottomColor: "#2563eb",
          borderRadius: "50%",
          animation: "spin 1.5s linear infinite reverse",
        }} />
      </div>

      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em",
          color: "var(--ink)", marginBottom: 6 }}>
          Analyzing SEO landscape…
        </div>
        {primaryUrl && (
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12,
            color: "var(--ink3)", background: "var(--paper3)",
            padding: "4px 12px", borderRadius: 6, display: "inline-block" }}>
            {primaryUrl}
          </div>
        )}
      </div>

      {/* Step log */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8,
        alignItems: "flex-start", minWidth: 320 }}>
        {STEPS.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              fontFamily: "JetBrains Mono, monospace", fontSize: 12,
              color: done ? "#16a34a" : active ? "#0f172a" : "#cbd5e1",
              transition: "color 0.4s ease",
            }}>
              <span style={{ width: 16, textAlign: "center" }}>
                {done ? "✓" : active ? "›" : "·"}
              </span>
              {s}
            </div>
          );
        })}
      </div>

      <p style={{ fontSize: 12, color: "var(--ink4)", marginTop: 8 }}>
        Usually takes 15–30 seconds
      </p>
    </div>
  );
}
