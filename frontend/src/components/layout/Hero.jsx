// src/components/layout/Hero.jsx
import { useState, lazy, Suspense } from "react";
import {
  Bus,
  Building2,
  ArrowRight,
  Sparkles,
  Radio,
  Cpu,
  Timer,
  Maximize2,
} from "lucide-react";
import Button from "../ui/Button";
import useLiveVehicles from "../../hooks/useLiveVehicles";
import LiveSyncBadge from "../LiveSyncBadge";
import AudienceStrip from "../landing/AudienceStrip";
import ProofStrip from "../landing/ProofStrip";
import Skeleton from "../ui/Skeleton";

const LiveMap = lazy(() => import("../map/LiveMap"));

export default function Hero({ setActiveView }) {
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
    <div
      style={{
        padding: "clamp(20px, 4vw, 36px) clamp(16px, 4%, 40px)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 32,
        minHeight: "76vh",
        borderRadius: 28,
        background:
          "linear-gradient(135deg,#FAFAFA 0%,#FFFFFF 45%,#FBF4C6 100%)",
        alignItems: "stretch",
      }}
      className="hero-grid-responsive"
    >
      {/* LEFT */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          justifyContent: "center",
          minWidth: 0,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: 999,
            background: "#E7ECFB",
            color: "#052675",
            fontWeight: 700,
            fontSize: 12,
            width: "fit-content",
          }}
        >
          <Sparkles size={14} />
          Para sa mga Pilipinong Komyuter
        </div>

        {/* Main headline */}
        <h1
          style={{
            color: "#052675",
            fontSize: "var(--text-hero, clamp(2.1rem, 5.5vw, 4.2rem))",
            lineHeight: 1.06,
            margin: "2px 0",
            fontWeight: 800,
          }}
        >
          Saan ang para mo?
        </h1>

        {/* Sub-tagline */}
        <p
          style={{
            fontSize: "clamp(13px, 1vw, 15px)",
            fontWeight: 600,
            color: "#64748B",
            letterSpacing: 0.2,
            margin: 0,
          }}
        >
          Smarter commutes, better journeys.
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: "clamp(14px, 1.05vw, 16px)",
            color: "#374151",
            lineHeight: 1.55,
            maxWidth: 540,
            margin: "0 0 6px",
          }}
        >
          Your jeepney. Your route. Your arrival time — finally visible. Built
          by Filipino commuters. Designed for Philippine transportation. Powered
          by real-time GPS and AI.
        </p>

        {/* Four-audience strip */}
        <AudienceStrip />

        {/* CTA Buttons */}
        <div
          className="hero-cta-row"
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginTop: 6,
          }}
        >
          <div className="hero-cta-item">
            <Button
              onClick={() => setActiveView("commuter")}
              size="small"
              fullWidth
            >
              <Bus size={16} />
              Explore Commuter Portal
            </Button>
            <div
              style={{
                fontSize: 11,
                color: "#64748B",
                marginTop: 4,
                marginLeft: 4,
              }}
            >
              Hanapin ang iyong byahe →
            </div>
          </div>

          <div className="hero-cta-item">
            <Button
              variant="secondary"
              onClick={() => setActiveView("operator")}
              size="small"
              fullWidth
            >
              <Building2 size={16} />
              View Operator Dashboard
            </Button>
            <div
              style={{
                fontSize: 11,
                color: "#64748B",
                marginTop: 4,
                marginLeft: 4,
              }}
            >
              Buksan ang dashboard →
            </div>
          </div>
        </div>

        {/* Proof strip — "LIVE TODAY" */}
        <ProofStrip />

        {/* Feature chips */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 4,
            color: "#64748B",
            fontWeight: 500,
            flexWrap: "wrap",
            fontSize: "clamp(12px, 0.9vw, 13px)",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Radio size={12} color="#052675" /> Live Tracking
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Cpu size={12} color="#052675" /> AI Dispatch
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Timer size={12} color="#052675" /> ETA
          </span>
        </div>

        {/* Jeepney Road Strip */}
        <div className="hero-road">
          <div className="hero-road-line" />
          <button
            type="button"
            className={`hero-road-jeepney${paraPo ? " is-stopped" : ""}`}
            onClick={handleJeepneyClick}
            aria-label="Honk the jeepney"
            style={{
              animation: "drive 6s linear infinite",
              animationPlayState: paraPo ? "paused" : "running",
            }}
          >
            {paraPo && (
              <span
                style={{
                  position: "absolute",
                  top: -30,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#052675",
                  color: "#fff",
                  padding: "2px 10px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  animation: "bounce 0.3s ease",
                }}
              >
                Para po! 🚦
              </span>
            )}
            <Bus size={24} color="#052675" />
          </button>
        </div>
      </div>

      {/* RIGHT – Live Map */}
      <div
        className="hero-map-panel"
        style={{
          background: "rgba(255,255,255,.92)",
          backdropFilter: "blur(18px)",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 16px 48px rgba(5,38,117,0.12)",
          border: "1px solid #D9D9D9",
          display: "flex",
          flexDirection: "column",
          minHeight: 380,
          minWidth: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(14px, 1.05vw, 16px)",
              color: "#111111",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Bus size={16} color="#052675" /> Live Fleet Map
          </h2>
          <LiveSyncBadge vehicles={vehicles} connected={live.connected} />
        </div>

        <div style={{ position: "relative", flex: 1, minHeight: 240 }}>
          <Suspense fallback={<Skeleton height="100%" radius={0} />}>
            <LiveMap
              vehicles={vehicles}
              userLocation={null}
              mapId="hero-live-map"
              selectedVehicleId={selectedVehicleId}
              onVehicleSelect={setSelectedVehicleId}
            />
          </Suspense>

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
              <span style={{ color: "#64748B", fontSize: 13 }}>
                Kumokonekta sa live fleet…
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => setActiveView("commuter")}
          style={{
            margin: "10px 16px 14px",
            padding: "12px 16px",
            minHeight: 44,
            borderRadius: 16,
            border: "none",
            background: "#052675",
            color: "#fff",
            fontWeight: 600,
            fontSize: "clamp(13px, 0.9vw, 15px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
          }}
        >
          <Maximize2 size={14} />
          Buksan ang Full Map
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Responsive + Animation Styles */}
      <style>{`
        @keyframes drive {
          0% { left: -10%; }
          100% { left: 105%; }
        }
        @keyframes bounce {
          0% { transform: translateX(-50%) scale(0.8); opacity: 0; }
          50% { transform: translateX(-50%) scale(1.1); }
          100% { transform: translateX(-50%) scale(1); opacity: 1; }
        }

        @media (max-width: 960px) {
          .hero-grid-responsive {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
            gap: 24px !important;
          }
          .hero-map-panel {
            min-height: 360px !important;
          }
        }
        @media (max-width: 540px) {
          .hero-cta-row {
            flex-direction: column;
          }
          .hero-cta-item {
            width: 100%;
          }
          .hero-map-panel {
            min-height: 320px !important;
          }
        }
      `}</style>
    </div>
  );
}
