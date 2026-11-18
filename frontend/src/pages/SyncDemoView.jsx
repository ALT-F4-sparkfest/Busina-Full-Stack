// src/pages/SyncDemoView.jsx
import { useState } from "react";
import { Radio, ArrowLeftRight } from "lucide-react";
import LiveMap from "../components/map/LiveMap";
import useLiveVehicles from "../hooks/useLiveVehicles";
import LiveSyncBadge from "../components/LiveSyncBadge";

export default function SyncDemoView({ onBack }) {
  const live = useLiveVehicles();
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const vehicleList = Array.isArray(live.vehicles)
    ? live.vehicles.filter(
        (v) =>
          v &&
          typeof v.lat === "number" &&
          typeof v.lng === "number" &&
          isFinite(v.lat) &&
          isFinite(v.lng),
      )
    : [];

  const selectedVehicle = vehicleList.find((v) => v.id === selectedVehicleId);

  return (
    <div
      style={{
        height: "100dvh",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#111111",
      }}
    >
      {/* Header */}
      <header
        style={{
          minHeight: 60,
          background: "#111111",
          borderBottom: "1px solid #2A2A2A",
          display: "flex",
          alignItems: "center",
          padding: "10px 16px",
          gap: 12,
          flexShrink: 0,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={onBack}
          aria-label="Back to landing page"
          style={{
            border: "none",
            background: "#2A2A2A",
            color: "white",
            width: 38,
            height: 38,
            borderRadius: 10,
            cursor: "pointer",
            fontSize: 16,
            flexShrink: 0,
          }}
        >
          ←
        </button>
        <div
          style={{
            color: "white",
            fontWeight: 800,
            fontSize: "clamp(15px, 2vw, 18px)",
          }}
        >
          🚌 BUSINA — Live Sync Demo
        </div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <LiveSyncBadge vehicles={vehicleList} connected={live.connected} />
        </div>
      </header>

      {/* Explainer strip */}
      <div
        style={{
          background: "#1A1A1A",
          color: "#9CA3AF",
          fontSize: 12.5,
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <ArrowLeftRight size={14} color="#FCA307" style={{ flexShrink: 0 }} />
        <span>
          Same live feed, two views — click any vehicle to highlight it on both
          sides at once.
        </span>
      </div>

      {/* Split panes */}
      <div
        style={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
        }}
        className="sync-demo-panes"
      >
        <Pane
          label="Commuter View"
          color="#60A5FA"
          vehicles={vehicleList}
          selectedVehicleId={selectedVehicleId}
          onVehicleSelect={setSelectedVehicleId}
          mapId="sync-demo-commuter"
        />
        <div className="sync-demo-divider" />
        <Pane
          label="Operator View"
          color="#FCA307"
          vehicles={vehicleList}
          selectedVehicleId={selectedVehicleId}
          onVehicleSelect={setSelectedVehicleId}
          mapId="sync-demo-operator"
        />
      </div>

      {/* Selected vehicle proof strip */}
      {selectedVehicle && (
        <div
          style={{
            background: "#1A1A1A",
            borderTop: "1px solid #2A2A2A",
            padding: "12px 16px",
            display: "flex",
            gap: "12px 24px",
            flexWrap: "wrap",
            flexShrink: 0,
          }}
        >
          <ProofStat label="Vehicle" value={selectedVehicle.id} />
          <ProofStat label="Route" value={selectedVehicle.route_id || "—"} />
          <ProofStat
            label="Speed"
            value={`${Math.round(selectedVehicle.speed ?? 0)} km/h`}
          />
          <ProofStat
            label="Last Updated"
            value={
              selectedVehicle.last_updated
                ? new Date(selectedVehicle.last_updated).toLocaleTimeString()
                : "—"
            }
          />
          <div
            style={{
              marginLeft: "auto",
              color: "#FCA307",
              fontSize: 12,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Radio size={13} />
            Identical on both panes — one data source, not two
          </div>
        </div>
      )}

      <style>{`
        .sync-demo-divider {
          width: 1px;
          background: #2A2A2A;
          flex-shrink: 0;
        }
        @media (max-width: 900px) {
          .sync-demo-panes { flex-direction: column; }
          .sync-demo-divider {
            width: 100%;
            height: 1px;
          }
        }
      `}</style>
    </div>
  );
}

function Pane({
  label,
  color,
  vehicles,
  selectedVehicleId,
  onVehicleSelect,
  mapId,
}) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        minHeight: 0,
      }}
    >
      <div
        style={{
          padding: "8px 16px",
          color,
          fontWeight: 700,
          fontSize: 12.5,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          background: "#161616",
          flexShrink: 0,
        }}
      >
        {label}
      </div>
      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <LiveMap
          vehicles={vehicles}
          userLocation={null}
          mapId={mapId}
          selectedVehicleId={selectedVehicleId}
          onVehicleSelect={onVehicleSelect}
        />
      </div>
    </div>
  );
}

function ProofStat({ label, value }) {
  return (
    <div>
      <div
        style={{
          fontSize: 10.5,
          color: "#6B7280",
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        {label}
      </div>
      <div
        className="font-numeric"
        style={{ fontSize: 15, color: "white", marginTop: 2 }}
      >
        {value}
      </div>
    </div>
  );
}
