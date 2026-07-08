// src/components/landing/ProblemSpace.jsx
import { AlertTriangle, Clock, EyeOff, HelpCircle } from "lucide-react";

const PROBLEMS = [
  {
    icon: <EyeOff size={26} />,
    title: "Commuters Wait Blind",
    body: "Walang ETA—naghihintay lang kung kailan darating ang susunod na jeep.",
  },
  {
    icon: <AlertTriangle size={26} />,
    title: "Operators Fly Blind Too",
    body: "Walang real-time na pananaw sa kanilang mga sasakyan at operasyon.",
  },
  {
    icon: <Clock size={26} />,
    title: "Delays Go Unnoticed",
    body: "Walang agarang abiso tungkol sa mga delay at aberya.",
  },
  {
    icon: <HelpCircle size={26} />,
    title: "Modernization Without Management",
    body: "Bagong sasakyan, ngunit pareho pa rin ang paraan ng pagpapatakbo.",
  },
];

export default function ProblemSpace() {
  return (
    <section
      style={{
        borderRadius: 32,
        padding: "clamp(28px, 6vw, 64px) clamp(20px, 5vw, 48px)",
        background:
          "linear-gradient(135deg,#0B0F0D 0%,#111815 55%,#0B0F0D 100%)",
        border: "1px solid rgba(255,255,255,.06)",
        boxShadow: "0 30px 80px rgba(0,0,0,.35)",
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
            "radial-gradient(circle,rgba(252,163,7,.16),transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{ position: "relative", textAlign: "center", marginBottom: 56 }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(252,163,7,.12)",
            color: "#FCA307",
            padding: "6px 18px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 18,
          }}
        >
          THE PROBLEM
        </div>
        <h2
          style={{
            fontSize: "clamp(28px, 6vw, 48px)",
            fontWeight: 800,
            color: "#FFFFFF",
            margin: "0 0 16px",
          }}
        >
          Eight million Filipinos start their commute without knowing when they
          will get home.
        </h2>
        <p
          style={{
            maxWidth: 640,
            margin: "0 auto",
            fontSize: 18,
            lineHeight: 1.8,
            color: "rgba(255,255,255,.6)",
          }}
        >
          Commuters and operators are both navigating the same routes with zero
          visibility into what's actually happening on the road.
        </p>
      </div>

      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: 24,
        }}
      >
        {PROBLEMS.map((p) => (
          <div
            key={p.title}
            style={{
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 24,
              padding: 28,
              transition: "150ms",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(252,163,7,.08)";
              e.currentTarget.style.borderColor = "rgba(252,163,7,.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,.04)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,.08)";
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: "rgba(252,163,7,.14)",
                color: "#FCA307",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              {p.icon}
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 26,
                color: "#FFFFFF",
                marginBottom: 10,
              }}
            >
              {p.title}
            </div>
            <div
              style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: "rgba(255,255,255,.55)",
              }}
            >
              {p.body}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
