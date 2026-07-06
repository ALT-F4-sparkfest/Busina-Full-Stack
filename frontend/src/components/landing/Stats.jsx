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
      value: "18",
      label: "Active Vehicles",
      color: "#052675",
    },
    {
      icon: <Users size={28} />,
      value: "245",
      label: "Passengers Tracked",
      color: "#FCA307",
    },
    {
      icon: <Clock3 size={28} />,
      value: "5 min",
      label: "Average ETA",
      color: "#FCA307",
    },
    {
      icon: <Brain size={28} />,
      value: "97%",
      label: "AI Confidence",
      color: "#FD4847",
    },
    {
      icon: <TrendingUp size={28} />,
      value: "99.4%",
      label: "Fleet Uptime",
      color: "#052675",
    },
    {
      icon: <ShieldCheck size={28} />,
      value: "Live",
      label: "System Status",
      color: "#FD4847",
    },
  ];

  return (
    <section
      style={{
        padding: "20px 8% 80px",
      }}
    >
      {/* ── NEW: Section Heading & Description ── */}
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
          LIVE OVERVIEW
        </div>
        <h2
          style={{
            fontSize: 34,
            fontWeight: 800,
            color: "#111111",
            margin: "0 0 12px",
          }}
        >
          Real‑time fleet at a glance
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
          See the current status of jeepneys operating across Metro Manila —
          live vehicle counts, passenger demand, ETA accuracy, and system
          health.
        </p>
      </div>

      {/* ── Existing stats grid ── */}
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
      style={{
        background: "rgba(255,255,255,.82)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderRadius: 20,
        padding: 24,
        border: "1px solid rgba(255,255,255,.45)",
        boxShadow: "0 12px 32px rgba(17,17,17,.06)",
        transition: "all .25s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 20px 48px rgba(5,38,117,0.14)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(17,17,17,.06)";
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
