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
      style={{
        padding: "30px 5% 40px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 32,
        minHeight: "80vh",
        background:
          "linear-gradient(135deg,#FAFAFA 0%,#FFFFFF 45%,#FBF4C6 100%)",
        alignItems: "start",
      }}
      className="hero-grid-responsive"
    >
      {/* LEFT */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          justifyContent: "center",
          height: "100%",
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

        {/* Main headline — Hero scale (72px desktop, clamps down on mobile) */}
        <h1
          style={{
            color: "#052675",
            fontSize: "var(--text-hero, clamp(2.4rem, 6vw, 4.5rem))",
            lineHeight: 1.05,
            margin: "4px 0 4px",
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
            fontSize: "clamp(14px, 1vw, 16px)",
            color: "#374151",
            lineHeight: 1.5,
            maxWidth: 540,
            margin: "2px 0 10px",
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
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginTop: 4,
          }}
        >
          <div>
            <Button onClick={() => setActiveView("commuter")} size="small">
              <Bus size={16} />
              Explore Commuter Portal
            </Button>
            <div
              style={{
                fontSize: 10,
                color: "#9CA3AF",
                marginTop: 3,
                marginLeft: 4,
              }}
            >
              Hanapin ang iyong byahe →
            </div>
          </div>

          <div>
            <Button
              variant="secondary"
              onClick={() => setActiveView("operator")}
              size="small"
            >
              <Building2 size={16} />
              View Operator Dashboard
            </Button>
            <div
              style={{
                fontSize: 10,
                color: "#9CA3AF",
                marginTop: 3,
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
            fontSize: "clamp(11px, 0.8vw, 13px)",
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
        <div
          className="hero-road"
          style={{
            marginTop: 6,
            position: "relative",
            width: "100%",
            height: 48,
            overflow: "visible",
          }}
        >
          <div
            className="hero-road-line"
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: 3,
              background:
                "repeating-linear-gradient(90deg, #052675 0px, #052675 8px, transparent 8px, transparent 16px)",
              transform: "translateY(-50%)",
              borderRadius: 2,
              opacity: 0.4,
            }}
          />
          <button
            type="button"
            className={`hero-road-jeepney${paraPo ? " is-stopped" : ""}`}
            onClick={handleJeepneyClick}
            aria-label="Honk the jeepney"
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 4,
              animation: "drive 6s linear infinite",
              animationPlayState: paraPo ? "paused" : "running",
            }}
          >
            {paraPo && (
              <span
                style={{
                  position: "absolute",
                  top: -32,
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
        style={{
          background: "rgba(255,255,255,.92)",
          backdropFilter: "blur(18px)",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 16px 48px rgba(5,38,117,0.12)",
          border: "1px solid #D9D9D9",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          minHeight: 340,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 16px",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(13px, 1vw, 16px)",
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

        <div style={{ position: "relative", flex: 1, minHeight: 200 }}>
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
            padding: "10px 16px",
            borderRadius: 18,
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
        .hero-road-jeepney.is-stopped {
          animation-play-state: paused !important;
        }

        @media (max-width: 820px) {
          .hero-grid-responsive {
            grid-template-columns: 1fr !important;
            padding: 16px 4% 30px !important;
            min-height: auto !important;
            max-height: none !important;
            gap: 20px !important;
          }
          .hide-mobile {
            display: none;
          }
          .hero-road {
            height: 40px !important;
          }
          .hero-grid-responsive > div:last-child {
            min-height: 280px !important;
          }
        }
        @media (max-width: 480px) {
          .hero-grid-responsive {
            padding: 12px 4% 24px !important;
            gap: 16px !important;
          }
          .hero-grid-responsive h1 {
            font-size: 1.6rem !important;
          }
          .hero-grid-responsive > div:last-child {
            min-height: 220px !important;
          }
          .hero-road {
            height: 36px !important;
          }
        }
      `}</style>
    </section>
  );
}
