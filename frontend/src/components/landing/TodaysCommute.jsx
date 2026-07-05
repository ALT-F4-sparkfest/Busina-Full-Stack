import { Cloud, TrafficCone, Waves, Bus, Clock3 } from "lucide-react";

const COMMUTE_ITEMS = [
  {
    icon: <Cloud size={20} />,
    label: "Weather",
    value: "Moderate Rain",
    tone: "warn",
  },
  {
    icon: <TrafficCone size={20} />,
    label: "Traffic",
    value: "Heavy",
    tone: "bad",
  },
  {
    icon: <Waves size={20} />,
    label: "Flood Risk",
    value: "Medium",
    tone: "warn",
  },
  {
    icon: <Bus size={20} />,
    label: "Jeepneys",
    value: "127 Active",
    tone: "good",
  },
];

const TONE_COLORS = {
  good: "#2E9E3D",
  warn: "#B8860B",
  bad: "#DC2626",
};

export default function TodaysCommute() {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.9)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderRadius: 26,
        padding: 32,
        border: "1px solid rgba(255,255,255,.5)",
        boxShadow: "0 20px 50px rgba(17,17,17,.08)",
        maxWidth: 620,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#2E9E3D",
              marginBottom: 6,
            }}
          >
            TODAY'S COMMUTE
          </div>
          <h3
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 800,
              color: "#111111",
            }}
          >
            Metro Manila Overview
          </h3>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "#E9FBEA",
            color: "#2E9E3D",
            padding: "6px 12px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          <span
            className="busina-live-dot"
            style={{
              width: 7,
              height: 7,
              background: "#3BEA4C",
              boxShadow: "0 0 8px #3BEA4C",
            }}
          />
          LIVE-ISH
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {COMMUTE_ITEMS.map((item) => (
          <div
            key={item.label}
            style={{
              background: "#F6F7F9",
              borderRadius: 16,
              padding: "16px 14px",
              border: "1px solid #E5E7EB",
            }}
          >
            <div
              style={{
                color: TONE_COLORS[item.tone],
                marginBottom: 10,
              }}
            >
              {item.icon}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#64748B",
                marginBottom: 4,
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#111111",
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 18,
          borderTop: "1px solid #E5E7EB",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Clock3 size={16} color="#64748B" />
          <span style={{ fontSize: 14, color: "#64748B" }}>Average Wait</span>
        </div>
        <strong
          className="font-numeric"
          style={{ fontSize: 18, color: "#111111" }}
        >
          6 min
        </strong>
      </div>

      <div
        style={{
          marginTop: 16,
          fontSize: 12,
          color: "#94A3B8",
          textAlign: "center",
        }}
      >
        Some figures are illustrative for this demo build.
      </div>
    </div>
  );
}
