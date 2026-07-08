// src/components/landing/BusinessModel.jsx
import { Cpu, Wrench, RefreshCcw, Globe2, ArrowRight } from "lucide-react";

const STEPS = [
  { icon: <Cpu size={26} />, label: "ESP32 Hardware" },
  { icon: <Wrench size={26} />, label: "₱500 Install" },
  { icon: <RefreshCcw size={26} />, label: "₱200/month SaaS" },
  { icon: <Globe2 size={26} />, label: "Scale Nationwide" },
];

export default function BusinessModel() {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "inline-block",
          background: "#E7ECFB",
          color: "#052675",
          padding: "6px 18px",
          borderRadius: 999,
          fontSize: 13,
          fontWeight: 600,
          marginBottom: 16,
        }}
      >
        BUSINESS MODEL
      </div>
      <h2
        style={{
          fontSize: "clamp(28px, 6vw, 48px)",
          fontWeight: 800,
          color: "#111111",
          margin: "0 0 40px",
        }}
      >
        Simple to install. Simple to scale.
      </h2>

      <div
        className="business-model-row"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        {STEPS.map((s, i) => (
          <div
            key={s.label}
            className="business-model-item-wrap"
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <div
              className="hover-lift business-model-card"
              style={{
                background: "white",
                border: "1px solid #D9D9D9",
                borderRadius: 24,
                padding: "24px 28px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                minWidth: 160,
              }}
            >
              <div style={{ color: "#052675" }}>{s.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#111111" }}>
                {s.label}
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <ArrowRight
                size={20}
                color="#FCA307"
                className="business-model-arrow"
              />
            )}
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 700px) {
          .business-model-row {
            flex-direction: column;
            align-items: stretch;
          }
          .business-model-item-wrap {
            flex-direction: column;
            width: 100%;
          }
          .business-model-card {
            min-width: 0 !important;
            width: 100%;
          }
          .business-model-arrow {
            transform: rotate(90deg);
            margin: 4px 0;
          }
        }
      `}</style>
    </div>
  );
}
