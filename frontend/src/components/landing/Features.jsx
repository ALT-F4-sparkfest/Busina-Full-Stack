import { Bus, MapPinned, Clock3, Brain, Route, BarChart3 } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <MapPinned size={34} />,
      title: "See every jeepney, live",
      description:
        "Watch vehicles move on an interactive map instead of standing at a stop hoping one shows up.",
      color: "#2E9E3D",
    },
    {
      icon: <Clock3 size={34} />,
      title: "Know before you wait",
      description:
        "Traffic-aware ETAs mean you decide whether to wait, walk, or grab a different route — before committing.",
      color: "#FFD93B",
    },
    {
      icon: <Brain size={34} />,
      title: "Vehicles sent where they're needed",
      description:
        "When commuter demand spikes on a route, dispatch recommendations flag it before a bottleneck forms.",
      color: "#00C2FF",
    },
    {
      icon: <Bus size={34} />,
      title: "Fleets that don't fly blind",
      description:
        "Operators see every active vehicle, passenger load, and delay — instead of finding out after commuters complain.",
      color: "#3BEA4C",
    },
    {
      icon: <Route size={34} />,
      title: "Send more jeeps where it's busy",
      description:
        "Spot high-demand pickup areas as they happen and reallocate vehicles instantly, not after the fact.",
      color: "#FF8A1D",
    },
    {
      icon: <BarChart3 size={34} />,
      title: "Understand delays before they escalate",
      description:
        "Travel trends and fleet KPIs surface the pattern behind a bad commute day, not just the symptom.",
      color: "#8B5CF6",
    },
  ];

  return (
    <section
      style={{
        padding: "56px 8% 70px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: 44,
        }}
      >
        <h2
          style={{
            fontSize: 46,
            fontWeight: 800,
            color: "#111111",
            marginBottom: 16,
          }}
        >
          Everything You Need
        </h2>

        <p
          style={{
            maxWidth: 760,
            margin: "0 auto",
            fontSize: 18,
            lineHeight: 1.8,
            color: "#64748B",
          }}
        >
          Built around what jeepney commuters and Metro Manila TODAs actually
          need — not generic fleet-management jargon.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 28,
        }}
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            style={{
              background: "rgba(255,255,255,.85)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              borderRadius: 26,
              padding: 34,
              border: "1px solid rgba(255,255,255,.45)",
              boxShadow: "0 20px 45px rgba(17,17,17,.08)",
              transition: ".25s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow =
                "0 30px 60px rgba(59,234,76,.16)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 20px 45px rgba(17,17,17,.08)";
            }}
          >
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: 22,
                background: `${feature.color}20`,
                color: feature.color,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              {feature.icon}
            </div>

            <h3
              style={{
                fontSize: 24,
                marginBottom: 14,
                color: "#111111",
              }}
            >
              {feature.title}
            </h3>

            <p
              style={{
                color: "#64748B",
                lineHeight: 1.8,
                fontSize: 16,
              }}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
