// src/components/landing/ProblemSpace.jsx
import { AlertTriangle, Clock, EyeOff, HelpCircle } from "lucide-react";

const PROBLEMS = [
  {
    icon: <EyeOff size={26} />,
    title: "Commuters Wait Blind",
    body: "Walang ETA. Nakatayo lang at umaasa na may darating na jeep.",
    tag: "Walang visibility",
  },
  {
    icon: <AlertTriangle size={26} />,
    title: "Operators Fly Blind Too",
    body: "Walang fleet visibility. Hindi nakikita ng TODA ang mga agwat o pagsisikip sa ruta.",
    tag: "Walang real‑time data",
  },
  {
    icon: <Clock size={26} />,
    title: "Delays Go Unnoticed",
    body: "Walang live alerts. Na-stranded ang mga pasahero bago pa malaman ng kahit sino.",
    tag: "Late ang response",
  },
  {
    icon: <HelpCircle size={26} />,
    title: "Modernization Without Management",
    body: "Bagong sasakyan, pero pareho pa rin ang haka‑haka — walang nagbago sa pamamahala ng ruta.",
    tag: "Walang sistema",
  },
];

export default function ProblemSpace() {
  return (
    <section
      style={{
        borderRadius: 32,
        padding: "64px 48px",
        background:
          "linear-gradient(135deg,#0B0F0D 0%,#111815 55%,#0B0F0D 100%)",
        border: "1px solid rgba(255,255,255,.06)",
        boxShadow: "0 30px 80px rgba(0,0,0,.35)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow accent — Orange */}
      <div
        style={{
          position: "absolute",
          top: -140,
          right: -100,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(252,163,7,0.18),transparent 70%)",
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
            background: "rgba(252,163,7,0.15)",
            color: "#FCA307",
            padding: "6px 18px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          🇵🇭 ANG PROBLEMA
        </div>
        <h2
          style={{
            fontSize: "clamp(28px, 3.5vw, 40px)",
            fontWeight: 800,
            color: "#FFFFFF",
            margin: "0 0 14px",
          }}
        >
          Ang public transit ay nakasalalay sa hula
        </h2>
        <p
          style={{
            maxWidth: 640,
            margin: "0 auto",
            fontSize: "clamp(15px, 1.2vw, 18px)",
            lineHeight: 1.8,
            color: "rgba(255,255,255,.6)",
          }}
        >
          Parehong pasahero at operator ang nag-navigate sa parehong ruta na
          walang visibility sa kung ano talaga ang nangyayari sa kalsada.
        </p>
      </div>

      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
        }}
      >
        {PROBLEMS.map((p) => (
          <div
            key={p.title}
            style={{
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 20,
              padding: 24,
              transition: ".25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(252,163,7,0.08)";
              e.currentTarget.style.borderColor = "rgba(252,163,7,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,.04)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,.08)";
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                background: "rgba(252,163,7,0.14)",
                color: "#FCA307",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              {p.icon}
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 16,
                color: "#FFFFFF",
                marginBottom: 6,
              }}
            >
              {p.title}
            </div>
            <div
              style={{
                fontSize: 13,
                lineHeight: 1.6,
                color: "rgba(255,255,255,.55)",
                marginBottom: 10,
              }}
            >
              {p.body}
            </div>
            <div
              style={{
                display: "inline-block",
                background: "rgba(252,163,7,0.12)",
                color: "#FCA307",
                padding: "2px 12px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              {p.tag}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
