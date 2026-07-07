import { Cloud, Bus } from "lucide-react";
import { useWeather } from "../../hooks/useWeather";
import { useLiveClock } from "../../hooks/useLiveClock";

export default function TodaysCommuteStrip({ activeVehicleCount = 0 }) {
  const weather = useWeather();
  const { time, date } = useLiveClock();

  const weatherValue = weather.loading
    ? "Loading..."
    : weather.error
      ? "Unavailable"
      : `${weather.label} · ${Math.round(weather.temperatureC)}°C`;

  return (
    <div
      className="todays-commute-strip"
      style={{
        background: "#FBF4C6",
        border: "1px solid #E5E7EB",
        borderRadius: 14,
        padding: "10px 18px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          className="busina-live-dot"
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#052675",
            boxShadow: "0 0 8px #052675",
            flexShrink: 0,
          }}
        />
        <span
          className="font-numeric"
          style={{ fontSize: 16, fontWeight: 800, color: "#111111" }}
        >
          {time}
        </span>
        <span style={{ fontSize: 12, color: "#64748B" }}>{date}</span>
      </div>

      <div className="tcs-divider" />

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Cloud size={16} color="#03164A" />
        <span style={{ fontSize: 12, color: "#64748B" }}>Weather</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#111111" }}>
          {weatherValue}
        </span>
      </div>

      <div className="tcs-divider" />

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Bus size={16} color="#03164A" />
        <span style={{ fontSize: 12, color: "#64748B" }}>Jeepneys</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#111111" }}>
          {activeVehicleCount} Active
        </span>
      </div>
    </div>
  );
}
