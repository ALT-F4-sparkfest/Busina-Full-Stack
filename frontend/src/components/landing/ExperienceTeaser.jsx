// src/components/landing/ExperienceTeaser.jsx
import {
  Bus,
  Building2,
  ArrowRight,
  MapPin,
  LayoutDashboard,
} from "lucide-react";

const PANELS = [
  {
    id: "commuter",
    icon: <Bus size={28} />,
    title: "Commuter Portal",
    body: "Live map, nearby jeepneys, real ETAs — search your terminal and see it work.",
    cta: "Open Commuter Portal",
    preview: <MapPin size={40} />,
    color: "#052675",
  },
  {
    id: "operator",
    icon: <Building2 size={28} />,
    title: "Operator Dashboard",
    body: "Fleet health, active alerts, and every vehicle on your routes in real time.",
    cta: "Open Operator Dashboard",
    preview: <LayoutDashboard size={40} />,
    color: "#FCA307",
  },
];

export default function ExperienceTeaser({ setActiveView }) {
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
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
          EXPERIENCE BUSINA
        </div>
        <h2
          style={{
            fontSize: "clamp(28px, 6vw, 48px)",
            fontWeight: 800,
            color: "#111111",
            margin: "0 0 12px",
          }}
        >
          Don't take our word for it. Subukan mo.
        </h2>
        <p
          style={{
            maxWidth: 620,
            margin: "0 auto",
            fontSize: 18,
            lineHeight: 1.7,
            color: "#64748B",
          }}
        >
          This is the real product, live — not a screenshot.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
        {PANELS.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveView(p.id)}
            className="hover-lift"
            style={{
              textAlign: "left",
              background: "white",
              border: "1px solid #D9D9D9",
              borderRadius: 24,
              padding: 32,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                background: `${p.color}14`,
                color: p.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {p.preview}
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontWeight: 700,
                  fontSize: 26,
                  color: "#111111",
                  marginBottom: 8,
                }}
              >
                {p.icon}
                {p.title}
              </div>
              <div style={{ fontSize: 18, color: "#64748B", lineHeight: 1.6 }}>
                {p.body}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: p.color,
                fontWeight: 700,
                fontSize: 14,
                marginTop: "auto",
              }}
            >
              {p.cta}
              <ArrowRight size={16} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
