// src/components/KPICards.jsx
import {
  Bus,
  Users,
  Gauge,
  Clock3,
  Activity,
  AlertTriangle,
} from "lucide-react";

export default function KPICards({ vehicles = [], alerts = [] }) {
  const activeCount = vehicles.length;

  const avgSpeed = vehicles.length
    ? Math.round(
        vehicles.reduce((sum, v) => sum + (v.speed || 0), 0) / vehicles.length,
      )
    : 0;

  const stoppedCount = vehicles.filter((v) => v.status === "Stopped").length;
  const delayedCount = vehicles.filter((v) => v.status === "Delayed").length;
  const onTimeCount = vehicles.length - stoppedCount - delayedCount;
  const onTimePct = vehicles.length
    ? Math.round((onTimeCount / vehicles.length) * 100)
    : 100;

  const criticalAlerts = alerts.filter((a) => a.severity === "critical").length;
  const fleetHealthPct = criticalAlerts > 0 ? 88 : 98;

  const cards = [
    {
      title: "Active Vehicles",
      value: activeCount,
      icon: <Bus size={20} />,
      gradient: "linear-gradient(135deg,#2563EB,#60A5FA)",
    },
    {
      title: "Average Speed",
      value: `${avgSpeed} km/h`,
      icon: <Gauge size={20} />,
      gradient: "linear-gradient(135deg,#10B981,#34D399)",
    },
    {
      title: "On-Time Rate",
      value: `${onTimePct}%`,
      icon: <Clock3 size={20} />,
      gradient: "linear-gradient(135deg,#F59E0B,#FBBF24)",
    },
    {
      title: "Active Alerts",
      value: alerts.length,
      subtitle: criticalAlerts > 0 ? `${criticalAlerts} critical` : "All clear",
      icon: <AlertTriangle size={20} />,
      gradient: "linear-gradient(135deg,#EF4444,#FB7185)",
    },
    {
      title: "Fleet Health",
      value: `${fleetHealthPct}%`,
      subtitle: fleetHealthPct >= 95 ? "Excellent" : "Needs attention",
      icon: <Activity size={20} />,
      gradient: "linear-gradient(135deg,#22C55E,#4ADE80)",
    },
    {
      title: "Waiting Riders",
      value: "—",
      subtitle: "Not tracked live yet",
      icon: <Users size={20} />,
      gradient: "linear-gradient(135deg,#7C3AED,#A855F7)",
    },
  ];

  return (
    <div>
      <p
        style={{
          margin: "0 0 12px",
          fontSize: 13,
          color: "#64748B",
          lineHeight: 1.4,
        }}
      >
        Live snapshot of your fleet right now — vehicles online, how fast
        they're moving, and whether anything needs your attention.
      </p>
      <div className="operator-kpi-grid">
        {cards.map((card) => (
          <div
            key={card.title}
            className="operator-kpi-card"
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 20,
              padding: "18px 20px",
              color: "white",
              background: card.gradient,
              boxShadow: "0 12px 32px rgba(0,0,0,.12)",
              transition: "all .25s ease",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -28,
                right: -28,
                width: 96,
                height: 96,
                borderRadius: "50%",
                background: "rgba(255,255,255,.12)",
              }}
            />

            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: "rgba(255,255,255,.18)",
                backdropFilter: "blur(10px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              {card.icon}
            </div>

            <div
              className="font-numeric"
              style={{
                fontSize: "clamp(22px, 2.5vw, 30px)",
                fontWeight: 800,
                lineHeight: 1.05,
              }}
            >
              {card.value}
            </div>

            <div
              style={{
                marginTop: 6,
                fontSize: 13.5,
                fontWeight: 600,
                opacity: 0.95,
              }}
            >
              {card.title}
            </div>

            {card.subtitle && (
              <div
                style={{
                  marginTop: 4,
                  fontSize: 12,
                  opacity: 0.82,
                }}
              >
                {card.subtitle}
              </div>
            )}
          </div>
        ))}
      </div>
      <style>{`
        .operator-kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
          gap: 16px;
        }
        @media (max-width: 640px) {
          .operator-kpi-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .operator-kpi-card {
            padding: 14px !important;
            border-radius: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
