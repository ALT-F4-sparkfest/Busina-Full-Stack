// src/components/operator/VehicleDetailsPanel.jsx
import {
  Bus,
  Gauge,
  Users,
  Route,
  Clock3,
  MapPinned,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function VehicleDetailsPanel({ vehicle }) {
  if (!vehicle) {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          padding: "clamp(20px, 4vw, 30px)",
          border: "1px solid #E2E8F0",
          boxShadow: "0 16px 40px rgba(15,23,42,.08)",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: 24,
            color: "#0F172A",
            fontSize: 20,
          }}
        >
          Vehicle Details
        </h2>

        <div
          style={{
            height: 240,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#94A3B8",
            textAlign: "center",
          }}
        >
          <Bus size={56} />

          <h3
            style={{
              marginTop: 18,
              marginBottom: 6,
            }}
          >
            No Vehicle Selected
          </h3>

          <p>Select a vehicle from the live map.</p>
        </div>
      </div>
    );
  }

  let occupancy = 60;
  let passengersText = "18 / 32";

  if (typeof vehicle.occupancyPercent === "number") {
    occupancy = Math.min(Math.round(vehicle.occupancyPercent), 100);
    passengersText = String(vehicle.passengers || "18 / 32");
  } else if (typeof vehicle.passengers === "string" && vehicle.passengers.includes("/")) {
    const [cur, cap] = vehicle.passengers
      .split("/")
      .map((s) => parseInt(s.trim(), 10));
    if (!isNaN(cur) && !isNaN(cap) && cap > 0) {
      occupancy = Math.min(Math.round((cur / cap) * 100), 100);
      passengersText = `${cur}/${cap}`;
    }
  } else {
    const passengers = Number(vehicle.passengers ?? 18);
    const capacity = Number(vehicle.capacity ?? 30);
    occupancy = Math.min(Math.round((passengers / capacity) * 100), 100);
    passengersText = `${passengers}/${capacity}`;
  }

  const delayed = (vehicle.delay ?? 0) > 5 || vehicle.status === "Delayed";

  const route =
    vehicle.route || vehicle.route_id || vehicle.routeId || "Unknown Route";

  const destination = vehicle.destination || vehicle.nearest_stop || "Terminal";

  const eta = vehicle.eta ?? vehicle.eta_minutes ?? "--";

  const speed = Number(vehicle.speed ?? 0).toFixed(1);

  const driver = vehicle.driver || "BUSINA Vehicle";

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 24,
        padding: "clamp(18px, 3.5vw, 28px)",
        border: "1px solid #E2E8F0",
        boxShadow: "0 16px 40px rgba(15,23,42,.08)",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 14,
            alignItems: "center",
            minWidth: 0,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#2563EB,#60A5FA)",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 700,
              fontSize: 20,
              flexShrink: 0,
            }}
          >
            {driver.charAt(0)}
          </div>

          <div style={{ minWidth: 0 }}>
            <h2
              style={{
                margin: 0,
                color: "#0F172A",
                fontSize: "clamp(17px, 2.2vw, 22px)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {vehicle.id}
            </h2>

            <div
              style={{
                marginTop: 4,
                color: "#64748B",
                fontSize: 13.5,
              }}
            >
              {driver}
            </div>
          </div>
        </div>

        <div
          style={{
            background: delayed ? "#FEF2F2" : "#DCFCE7",
            color: delayed ? "#DC2626" : "#15803D",
            padding: "8px 14px",
            borderRadius: 999,
            display: "flex",
            gap: 6,
            alignItems: "center",
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          {delayed ? (
            <>
              <AlertTriangle size={15} />
              Delayed
            </>
          ) : (
            <>
              <CheckCircle2 size={15} />
              Online
            </>
          )}
        </div>
      </div>

      {/* OCCUPANCY */}
      <div style={{ marginTop: 22 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
            fontSize: 14,
          }}
        >
          <strong>Occupancy</strong>
          <span>{occupancy}%</span>
        </div>

        <div
          style={{
            height: 10,
            borderRadius: 999,
            background: "#E2E8F0",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${occupancy}%`,
              height: "100%",
              background:
                occupancy > 80
                  ? "#EF4444"
                  : occupancy > 60
                    ? "#F59E0B"
                    : "#22C55E",
            }}
          />
        </div>
      </div>

      {/* INFO */}
      <div style={{ marginTop: 20 }}>
        <Info icon={<Route size={17} />} label="Route" value={route} />
        <Info
          icon={<Gauge size={17} />}
          label="Speed"
          value={`${speed} km/h`}
        />
        <Info
          icon={<Users size={17} />}
          label="Passengers"
          value={passengersText}
        />
        <Info icon={<Clock3 size={17} />} label="ETA" value={`${eta} min`} />
        <Info
          icon={<MapPinned size={17} />}
          label="Nearest Stop"
          value={destination}
        />
        <Info
          icon={<MapPinned size={17} />}
          label="GPS"
          value={`${Number(vehicle.lat).toFixed(5)}, ${Number(vehicle.lng).toFixed(5)}`}
        />
      </div>

      {/* METRICS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 10,
          marginTop: 22,
        }}
      >
        <MiniCard title="Speed" value={speed} color="#DBEAFE" />
        <MiniCard
          title="Heading"
          value={`${Math.round(vehicle.heading ?? 0)}°`}
          color="#FEF3C7"
        />
        <MiniCard
          title="On Route"
          value={vehicle.on_route === false ? "NO" : "YES"}
          color="#DCFCE7"
        />
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        padding: "12px 0",
        borderBottom: "1px solid #F1F5F9",
        fontSize: 14,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          color: "#475569",
          fontWeight: 600,
          flexShrink: 0,
        }}
      >
        {icon}
        {label}
      </div>

      <strong
        style={{
          textAlign: "right",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </strong>
    </div>
  );
}

function MiniCard({ title, value, color }) {
  return (
    <div
      style={{
        background: color,
        borderRadius: 14,
        padding: "14px 10px",
        textAlign: "center",
      }}
    >
      <div
        className="font-numeric"
        style={{
          fontSize: "clamp(18px, 2.5vw, 24px)",
          fontWeight: 700,
          color: "#0F172A",
        }}
      >
        {value}
      </div>

      <div
        style={{
          marginTop: 4,
          fontSize: 12,
          color: "#475569",
        }}
      >
        {title}
      </div>
    </div>
  );
}
