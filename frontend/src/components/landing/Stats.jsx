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
      color: "#3BEA4C",
    },
    {
      icon: <Users size={28} />,
      value: "245",
      label: "Passengers Tracked",
      color: "#FFD93B",
    },
    {
      icon: <Clock3 size={28} />,
      value: "5 min",
      label: "Average ETA",
      color: "#FFD93B",
    },
    {
      icon: <Brain size={28} />,
      value: "97%",
      label: "AI Confidence",
      color: "#FF8A1D",
    },
    {
      icon: <TrendingUp size={28} />,
      value: "99.4%",
      label: "Fleet Uptime",
      color: "#00C2FF",
    },
    {
      icon: <ShieldCheck size={28} />,
      value: "Live",
      label: "System Status",
      color: "#3BEA4C",
    },
  ];

  return (
    <section
      style={{
        padding: "20px 8% 80px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#9CA3AF",
            letterSpacing: 0.5,
            textTransform: "uppercase",
            background: "#F6F7F9",
            padding: "5px 14px",
            borderRadius: 999,
          }}
        >
          Demo build — figures below are illustrative
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 24,
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
        borderRadius: 24,
        padding: 28,
        border: "1px solid rgba(255,255,255,.45)",
        boxShadow: "0 18px 40px rgba(17,17,17,.08)",
        transition: "all .25s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 28px 55px rgba(59,234,76,.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 18px 40px rgba(17,17,17,.08)";
      }}
    >
      <div
        style={{
          width: 58,
          height: 58,
          borderRadius: 18,
          background: `${stat.color}20`,
          color: stat.color,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 22,
        }}
      >
        {stat.icon}
      </div>

      <div
        className="font-numeric"
        style={{
          fontSize: 38,
          color: "#111111",
        }}
      >
        {display}
      </div>

      <div
        style={{
          marginTop: 8,
          color: "#64748B",
          fontWeight: 500,
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}
