// src/components/landing/WhyOthersFail.jsx
import { X, Check } from "lucide-react";

const COMPETITORS = [
  {
    name: "Google Maps",
    points: ["No jeepney GPS", "No ETA", "No operator tools"],
  },
  {
    name: "Sakay.ph",
    points: ["Static routes", "No live tracking", "No fleet visibility"],
  },
  {
    name: "Traditional Dispatch",
    points: ["Radio communication", "No analytics", "No visibility"],
  },
];

const BUSINA_POINTS = ["Live GPS", "Real ETA", "AI Dispatch", "Analytics"];

export default function WhyOthersFail() {
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
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
          WHY EXISTING SOLUTIONS FAIL
        </div>
        <h2
          style={{
            fontSize: "clamp(28px, 6vw, 48px)",
            fontWeight: 800,
            color: "#111111",
            margin: "0 0 12px",
          }}
        >
          Nobody has actually solved this yet.
        </h2>
        <p
          style={{
            maxWidth: 640,
            margin: "0 auto",
            fontSize: 18,
            lineHeight: 1.7,
            color: "#64748B",
          }}
        >
          Commuters and cooperatives have tried working around the gap for
          years. None of the existing tools were built for jeepneys.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
        }}
      >
        {COMPETITORS.map((c) => (
          <div
            key={c.name}
            className="hover-lift"
            style={{
              background: "white",
              border: "1px solid #D9D9D9",
              borderRadius: 24,
              padding: 24,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 18,
                color: "#111111",
                marginBottom: 16,
              }}
            >
              {c.name}
            </div>
            {c.points.map((p) => (
              <div
                key={p}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 14,
                  color: "#64748B",
                  marginBottom: 10,
                }}
              >
                <X size={16} color="#FD4847" />
                {p}
              </div>
            ))}
          </div>
        ))}

        {/* BUSINA — highlighted */}
        <div
          className="hover-lift"
          style={{
            background: "linear-gradient(135deg,#052675,#03164A)",
            borderRadius: 24,
            padding: 24,
            boxShadow: "0 20px 48px rgba(5,38,117,.3)",
          }}
        >
          <div
            style={{
              fontWeight: 800,
              fontSize: 18,
              color: "#FFFFFF",
              marginBottom: 16,
            }}
          >
            BUSINA
          </div>
          {BUSINA_POINTS.map((p) => (
            <div
              key={p}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
                color: "rgba(255,255,255,.9)",
                marginBottom: 10,
                fontWeight: 600,
              }}
            >
              <Check size={16} color="#FCA307" />
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
