// src/components/landing/Validation.jsx
import { CheckCircle2 } from "lucide-react";

const POINTS = [
  "Built by daily jeepney commuters",
  "Routes based on real Metro Manila streets",
  "Simulated using real GPS datasets",
  "Ready for a Phase 2 pilot with cooperatives",
];

export default function Validation() {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 28,
        padding: "clamp(28px, 6vw, 64px) clamp(20px, 5vw, 48px)",
        border: "1px solid #D9D9D9",
        boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "inline-block",
          background: "#E7ECFB",
          color: "#052675",
          padding: "6px 18px",
          borderRadius: 999,
          fontSize: 13,
          fontWeight: 600,
          marginBottom: 20,
        }}
      >
        VALIDATION
      </div>
      <h2
        style={{
          fontSize: "clamp(28px, 6vw, 48px)",
          fontWeight: 800,
          color: "#111111",
          margin: "0 0 28px",
        }}
      >
        We didn't guess. We observed.
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 18,
        }}
      >
        {POINTS.map((p) => (
          <div
            key={p}
            style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
          >
            <CheckCircle2
              size={22}
              color="#052675"
              style={{ flexShrink: 0, marginTop: 2 }}
            />
            <span style={{ fontSize: 18, color: "#374151", lineHeight: 1.5 }}>
              {p}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
