// src/components/landing/Impact.jsx
import {
  Clock3,
  TrendingDown,
  Landmark,
  Accessibility,
  Bus,
} from "lucide-react";

const IMPACTS = [
  {
    icon: <Clock3 size={26} />,
    title: "Save commuters hours every week",
    body: "No more standing at a stop hoping — know before you leave.",
  },
  {
    icon: <Bus size={26} />,
    title: "Help cooperatives optimize fleets",
    body: "See bunching and gaps before passengers complain.",
  },
  {
    icon: <TrendingDown size={26} />,
    title: "Reduce fuel waste",
    body: "Fewer idle jeeps circling for passengers that aren't there.",
  },
  {
    icon: <Landmark size={26} />,
    title: "Support evidence-based transport planning",
    body: "LGUs get real operational data instead of guesswork.",
  },
  {
    icon: <Accessibility size={26} />,
    title: "Accessible from any browser",
    body: "No installation. Works on any phone commuters already carry.",
  },
];

export default function Impact() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg,#052675,#03164A)",
        borderRadius: 32,
        padding: "clamp(28px, 6vw, 64px) clamp(20px, 5vw, 48px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* subtle glow accent */}
      <div
        style={{
          position: "absolute",
          top: -140,
          right: -100,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(252,163,7,.14),transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{ position: "relative", textAlign: "center", marginBottom: 48 }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(252,163,7,.14)",
            color: "#FCA307",
            padding: "6px 18px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          COMMUNITY IMPACT
        </div>
        <h2
          style={{
            fontSize: "clamp(28px, 6vw, 48px)",
            fontWeight: 800,
            color: "#FFFFFF",
            margin: "0 0 12px",
          }}
        >
          What changes after BUSINA?
        </h2>
        <p
          style={{
            maxWidth: 640,
            margin: "0 auto",
            fontSize: 18,
            lineHeight: 1.7,
            color: "rgba(255,255,255,.65)",
          }}
        >
          Not features. Outcomes — for the people who ride, drive, and manage
          the fleet every day.
        </p>
      </div>

      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20,
        }}
      >
        {IMPACTS.map((i) => (
          <div
            key={i.title}
            className="hover-lift"
            style={{
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.12)",
              borderRadius: 22,
              padding: 24,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: "rgba(252,163,7,.16)",
                color: "#FCA307",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 18,
              }}
            >
              {i.icon}
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 26,
                color: "#FFFFFF",
                marginBottom: 8,
                lineHeight: 1.25,
              }}
            >
              {i.title}
            </div>
            <div
              style={{
                fontSize: 18,
                color: "rgba(255,255,255,.6)",
                lineHeight: 1.6,
              }}
            >
              {i.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
