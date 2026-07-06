import { useState } from "react";
import {
  Bus,
  Building2,
  MapPinned,
  ArrowRight,
  Sparkles,
  Radio,
  Cpu,
  Timer,
  Maximize2,
} from "lucide-react";
import Button from "../ui/Button";
import LiveMap from "../map/LiveMap";
import useLiveVehicles from "../../hooks/useLiveVehicles";
import LiveSyncBadge from "../LiveSyncBadge";

export default function Hero({ setActiveView, onDemoClick }) {
  const [paraPo, setParaPo] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const live = useLiveVehicles();

  const vehicles = Array.isArray(live.vehicles)
    ? live.vehicles.filter(
        (v) =>
          v &&
          typeof v.lat === "number" &&
          typeof v.lng === "number" &&
          isFinite(v.lat) &&
          isFinite(v.lng),
      )
    : [];

  const handleJeepneyClick = () => {
    setParaPo(true);
    setTimeout(() => setParaPo(false), 1500);
  };

  return (
    <section
      className="hero-grid"
      style={{
        minHeight: "90vh",
        padding: "70px 8%",
        background:
          "linear-gradient(135deg,#FAFAFA 0%,#FFFFFF 45%,#E9FBEA 100%)",
      }}
    >
      {/* LEFT */}

      <div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 18px",
            borderRadius: 999,
            background: "#E9FBEA",
            color: "#2E9E3D",
            fontWeight: 700,
            marginBottom: 26,
          }}
        >
          <Sparkles size={18} />
          Smart Public Transport Intelligence
        </div>

        <h1 className="hero-h1">BUSINA</h1>

        {/* Concrete, specific value — answers "what does this do" instantly,
            instead of making people infer it from the tagline alone */}
        <h2 className="hero-h2" style={{ color: "#2E9E3D" }}>
          Never guess when your jeep arrives again.
        </h2>

        <p
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "#64748B",
            letterSpacing: 0.3,
            marginTop: -6,
            marginBottom: 22,
          }}
        >
          Smarter commutes. Better journeys.
        </p>

        <p
          style={{
            fontSize: 18,
            color: "#374151",
            lineHeight: 1.7,
            maxWidth: 600,
            marginBottom: 36,
          }}
        >
          Real-time jeepney tracking and AI dispatch for Metro Manila —
          commuters see accurate ETAs, operators see their whole fleet, live.
        </p>

        <div
          style={{
            display: "flex",
            gap: 18,
            flexWrap: "wrap",
          }}
        >
          <div>
            <Button onClick={() => setActiveView("commuter")}>
              <Bus size={18} />
              I'm a Commuter
            </Button>
            <div
              style={{
                fontSize: 12,
                color: "#9CA3AF",
                marginTop: 6,
                marginLeft: 4,
              }}
            >
              Find your ride →
            </div>
          </div>

          <div>
            <Button
              variant="secondary"
              onClick={() => setActiveView("operator")}
            >
              <Building2 size={18} />
              I'm an Operator
            </Button>
            <div
              style={{
                fontSize: 12,
                color: "#9CA3AF",
                marginTop: 6,
                marginLeft: 4,
              }}
            >
              Open dashboard →
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 30,
            marginTop: 42,
            color: "#64748B",
            fontWeight: 600,
            flexWrap: "wrap",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Radio size={15} color="#2E9E3D" /> Live Fleet Tracking
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Cpu size={15} color="#2E9E3D" /> AI Dispatch
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Timer size={15} color="#2E9E3D" /> Real-Time ETA
          </span>
        </div>

        {/* Animated jeepney road strip */}
        <div className="hero-road">
          <div className="hero-road-line" />
          <button
            type="button"
            className={`hero-road-jeepney${paraPo ? " is-stopped" : ""}`}
            onClick={handleJeepneyClick}
            aria-label="Honk the jeepney"
          >
            {paraPo && <span className="hero-para-po">Para po!</span>}
            <Bus size={26} color="#2E9E3D" />
          </button>
        </div>
      </div>

      {/* RIGHT — the real live map, not a mocked stats card */}

      <div
        style={{
          background: "rgba(255,255,255,.92)",
          backdropFilter: "blur(18px)",
          borderRadius: 28,
          overflow: "hidden",
          boxShadow: "0 25px 70px rgba(59,234,76,.18)",
          border: "1px solid #D9D9D9",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 22px",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 18,
              color: "#111111",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Bus size={20} color="#2E9E3D" /> Live Fleet Map
          </h2>

          <LiveSyncBadge vehicles={vehicles} connected={live.connected} />
        </div>

        <div style={{ position: "relative", height: 480 }}>
          <LiveMap
            vehicles={vehicles}
            userLocation={null}
            mapId="hero-live-map"
            selectedVehicleId={selectedVehicleId}
            onVehicleSelect={setSelectedVehicleId}
          />

          {!live.connected && vehicles.length === 0 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(246,247,249,.9)",
              }}
            >
              <span style={{ color: "#64748B", fontSize: 14 }}>
                Connecting to live fleet…
              </span>
            </div>
          )}
        </div>

        {/* Links straight into the real Commuter view — not a toast */}
        <button
          onClick={() => setActiveView("commuter")}
          style={{
            width: "calc(100% - 44px)",
            margin: 22,
            padding: 16,
            borderRadius: 16,
            border: "none",
            background: "#2E9E3D",
            color: "#fff",
            fontWeight: 700,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
          }}
        >
          <Maximize2 size={17} />
          Open Full Map
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
