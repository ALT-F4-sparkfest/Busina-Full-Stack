import { Cloud, Bus, Clock3 } from "lucide-react";
import { useWeather } from "../../hooks/useWeather";
import { useLiveClock } from "../../hooks/useLiveClock";

const TONE_COLORS = {
  good: "#03164A",
  warn: "#FCA307",
  bad: "#FD4847",
};

// activeVehicleCount / avgWaitMinutes are passed in from wherever you already
// track live fleet data (e.g. useLiveVehicles). Falls back to demo numbers
// so this still renders standalone.
export default function TodaysCommute({
  activeVehicleCount = 127,
  avgWaitMinutes = 6,
}) {
  const weather = useWeather();
  const { time, date } = useLiveClock();

  const weatherValue = weather.loading
    ? "Loading..."
    : weather.error
      ? "Unavailable"
      : `${weather.label} · ${Math.round(weather.temperatureC)}°C`;

  const weatherTone = weather.error ? "warn" : weather.tone;

  return (
    <div
      style={{
        background: "rgba(255,255,255,.9)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderRadius: 26,
        padding: 32,
        border: "1px solid rgba(255,255,255,.5)",
        boxShadow: "0 20px 50px rgba(17,17,17,.08)",
        maxWidth: 620,
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#03164A",
          marginBottom: 6,
        }}
      >
        TODAY'S COMMUTE
      </div>
      <h3
        style={{
          margin: 0,
          fontSize: 22,
          fontWeight: 800,
          color: "#111111",
          marginBottom: 20,
        }}
      >
        Metro Manila Overview
      </h3>

      {/* Top rectangle: huge live time + date */}
      <div
        style={{
          background: "#FBF4C6",
          borderRadius: 20,
          padding: "24px 28px",
          border: "1px solid #E5E7EB",
          marginBottom: 14,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            className="font-numeric"
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: "#111111",
              lineHeight: 1,
            }}
          >
            {time}
          </div>
          <div style={{ fontSize: 14, color: "#64748B", marginTop: 8 }}>
            {date}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "#E7ECFB",
            color: "#03164A",
            padding: "6px 12px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            height: "fit-content",
          }}
        >
          <span
            className="busina-live-dot"
            style={{
              width: 7,
              height: 7,
              background: "#052675",
              boxShadow: "0 0 8px #052675",
            }}
          />
          LIVE
        </div>
      </div>

      {/* Bottom row: two squares — weather (left), PUV count (right) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            background: "#FBF4C6",
            borderRadius: 16,
            padding: "20px 18px",
            border: "1px solid #E5E7EB",
            aspectRatio: "1 / 1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ color: TONE_COLORS[weatherTone], marginBottom: 10 }}>
            <Cloud size={24} />
          </div>
          <div style={{ fontSize: 13, color: "#64748B", marginBottom: 6 }}>
            Weather
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#111111" }}>
            {weatherValue}
          </div>
        </div>

        <div
          style={{
            background: "#FBF4C6",
            borderRadius: 16,
            padding: "20px 18px",
            border: "1px solid #E5E7EB",
            aspectRatio: "1 / 1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ color: TONE_COLORS.good, marginBottom: 10 }}>
            <Bus size={24} />
          </div>
          <div style={{ fontSize: 13, color: "#64748B", marginBottom: 6 }}>
            Jeepneys
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#111111" }}>
            {activeVehicleCount} Active
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 18,
          borderTop: "1px solid #E5E7EB",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Clock3 size={16} color="#64748B" />
          <span style={{ fontSize: 14, color: "#64748B" }}>Average Wait</span>
        </div>
        <strong
          className="font-numeric"
          style={{ fontSize: 18, color: "#111111" }}
        >
          {avgWaitMinutes} min
        </strong>
      </div>

      <div
        style={{
          marginTop: 16,
          fontSize: 12,
          color: "#94A3B8",
          textAlign: "center",
        }}
      >
        Weather is live · vehicle counts reflect current fleet data.
      </div>
    </div>
  );
}
