import { useState, useCallback } from "react";
import InputScreen from "./components/InputScreen.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import Dashboard from "./components/Dashboard.jsx";

const API_BASE = import.meta.env.VITE_API_URL || "";

export default function App() {
  const [screen, setScreen] = useState("input"); // input | loading | dashboard
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState({});
  const [error, setError] = useState("");
  const [loadStep, setLoadStep] = useState(0);

  const handleAnalyze = useCallback(async (primaryUrl, competitors, location) => {
    setError("");
    setMeta({ primaryUrl, competitors, location });
    setScreen("loading");
    setLoadStep(0);

    // Animate loading steps
    const steps = [0, 1, 2, 3, 4, 5];
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setLoadStep(Math.min(i, steps.length - 1));
    }, 2500);

    try {
      const res = await fetch(`${API_BASE}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ primaryUrl, competitors, location }),
      });

      clearInterval(timer);

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Analysis failed. Please try again.");
      }

      setLoadStep(6);
      await new Promise((r) => setTimeout(r, 600));
      setData(json.data);
      setScreen("dashboard");
    } catch (err) {
      clearInterval(timer);
      setScreen("input");
      setError(err.message);
    }
  }, []);

  const handleBack = () => {
    setScreen("input");
    setData(null);
    setError("");
  };

  if (screen === "loading") return <LoadingScreen step={loadStep} primaryUrl={meta.primaryUrl} />;
  if (screen === "dashboard" && data)
    return <Dashboard data={data} meta={meta} onBack={handleBack} />;
  return <InputScreen onSubmit={handleAnalyze} initialError={error} />;
}
