// src/components/landing/Features.jsx
import { Bus, MapPinned, Clock3, Brain, Route, BarChart3 } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <MapPinned size={30} />,
      title: "See every jeepney, live",
      description:
        "Watch vehicles move on an interactive map instead of standing at a stop hoping one shows up.",
      tag: "Live tracking",
      color: "#052675",
    },
    {
      icon: <Clock3 size={30} />,
      title: "Know before you wait",
      description:
        "Traffic-aware ETAs mean you decide whether to wait, walk, or grab a different route — before committing.",
      tag: "Accurate ETA",
      color: "#FCA307",
    },
    {
      icon: <Brain size={30} />,
      title: "Vehicles sent where they're needed",
      description:
        "When commuter demand spikes on a route, dispatch recommendations flag it before a bottleneck forms.",
      tag: "AI dispatch",
      color: "#052675",
    },
    {
      icon: <Bus size={30} />,
      title: "Fleets that don't fly blind",
      description:
        "Operators see every active vehicle, passenger load, and delay — instead of finding out after commuters complain.",
      tag: "Full visibility",
      color: "#FD4847",
    },
    {
      icon: <Route size={30} />,
      title: "Send more jeeps where it's busy",
      description:
        "Spot high-demand pickup areas as they happen and reallocate vehicles instantly, not after the fact.",
      tag: "Smart routing",
      color: "#FCA307",
    },
    {
      icon: <BarChart3 size={30} />,
      title: "Understand delays before they escalate",
      description:
        "Travel trends and fleet KPIs surface the pattern behind a bad commute day, not just the symptom.",
      tag: "Analytics",
      color: "#052675",
    },
  ];

  return (
    <section
      style={{
        padding: "40px 8% 60px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: 40,
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
            marginBottom: 14,
          }}
        >
          MGA TAMPOK
        </div>
        <h2
          style={{
            fontSize: "clamp(30px, 3.5vw, 44px)",
            fontWeight: 800,
            color: "#111111",
            marginBottom: 12,
          }}
        >
          Lahat ng kailangan mo
        </h2>

        <p
          style={{
            maxWidth: 700,
            margin: "0 auto",
            fontSize: "clamp(15px, 1.1vw, 18px)",
            lineHeight: 1.7,
            color: "#64748B",
          }}
        >
          Binuo para sa mga jeepney commuter at TODA sa Metro Manila — hindi
          generic na fleet‑management jargon.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: 24,
        }}
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            style={{
              background: "rgba(255,255,255,.85)",
              backdropFilter: "blur(18px)",
              borderRadius: 22,
              padding: 28,
              border: "1px solid rgba(255,255,255,.45)",
              boxShadow: "0 16px 40px rgba(17,17,17,.06)",
              transition: ".25s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0 24px 52px rgba(5,38,117,0.14)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 16px 40px rgba(17,17,17,.06)";
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 18,
                background: `${feature.color}18`,
                color: feature.color,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 18,
              }}
            >
              {feature.icon}
            </div>

            <h3
              style={{
                fontSize: 20,
                marginBottom: 8,
                color: "#111111",
                fontWeight: 700,
              }}
            >
              {feature.title}
            </h3>

            <p
              style={{
                color: "#64748B",
                lineHeight: 1.7,
                fontSize: 15,
                marginBottom: 12,
              }}
            >
              {feature.description}
            </p>

            <div
              style={{
                display: "inline-block",
                background: `${feature.color}12`,
                color: feature.color,
                padding: "2px 14px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {feature.tag}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
