// src/components/landing/AudienceStrip.jsx
import { Users, Bus, Building2, Landmark } from "lucide-react";

const AUDIENCES = [
  {
    icon: <Users size={20} />,
    label: "Commuters",
    tag: "Never wait blindly again",
    color: "#052675",
  },
  {
    icon: <Bus size={20} />,
    label: "Drivers",
    tag: "No more guessing routes",
    color: "#FCA307",
  },
  {
    icon: <Building2 size={20} />,
    label: "Cooperatives",
    tag: "See your entire fleet live",
    color: "#052675",
  },
  {
    icon: <Landmark size={20} />,
    label: "LGUs",
    tag: "Decide from real data",
    color: "#FCA307",
  },
];

export default function AudienceStrip() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: 10,
        marginTop: 4,
      }}
    >
      {AUDIENCES.map((a) => (
        <div
          key={a.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(255,255,255,.6)",
            border: "1px solid #D9D9D9",
            borderRadius: 14,
            padding: "10px 12px",
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: `${a.color}18`,
              color: a.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {a.icon}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#111111" }}>
              {a.label}
            </div>
            <div style={{ fontSize: 11, color: "#64748B", lineHeight: 1.3 }}>
              {a.tag}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
