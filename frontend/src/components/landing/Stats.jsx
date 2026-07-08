// src/components/landing/Stats.jsx
import {
  Bus,
  Users,
  Clock3,
  Brain,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import useCountUp from "../../hooks/useCountUp";

export default function Stats() {
  const stats = [
    {
      icon: <Bus size={28} />,
      value: "10",
      label: "Simulated Vehicles",
      color: "#052675",
    },
    {
      icon: <TrendingUp size={28} />,
      value: "5",
      label: "Metro Manila Routes",
      color: "#FCA307",
    },
    {
      icon: <Clock3 size={28} />,
      value: "<5 min",
      label: "Target ETA accuracy",
      color: "#FCA307",
    },
    {
      icon: <ShieldCheck size={28} />,
      value: "Realtime",
      label: "GPS Streaming",
      color: "#FD4847",
    },
  ];

  return (
    <section
      style={{
        padding: "20px 8% 80px",
      }}
    >
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
          LIVE PROTOTYPE FLEET
        </div>
        <h2
          style={{
            fontSize: "clamp(28px, 6vw, 48px)",
            fontWeight: 800,
            color: "#111111",
            margin: "0 0 12px",
          }}
        >
          Know the roads. Understand the commute.
        </h2>
        <p
          style={{
            maxWidth: 640,
            margin: "0 auto",
            fontSize: 17,
            lineHeight: 1.7,
            color: "#64748B",
          }}
        >
          BUSINA transforms everyday jeepney operations into real-time insights
          — helping commuters find rides, operators manage fleets, and
          communities move better.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 20,
        }}
      >
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
}

function StatCard({ stat }) {
  const { ref, display } = useCountUp(stat.value);

  return (
    <div
      ref={ref}
      className="hover-lift"
      style={{
        background: "rgba(255,255,255,.82)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderRadius: 24,
        padding: 24,
        border: "1px solid rgba(255,255,255,.45)",
        boxShadow: "0 12px 32px rgba(17,17,17,.06)",
        cursor: "default",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: `${stat.color}18`,
          color: stat.color,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        {stat.icon}
      </div>

      <div
        className="font-numeric"
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: "#111111",
        }}
      >
        {display}
      </div>

      <div
        style={{
          marginTop: 4,
          color: "#64748B",
          fontWeight: 500,
          fontSize: 14,
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}
