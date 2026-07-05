// src/pages/SyncDemoView.jsx
//
// Built specifically for the judging moment. Instead of switching between
// tabs/devices and asking judges to trust that commuter + operator are in
// sync, this renders both live maps side-by-side from the SAME useLiveVehicles
// hook call. When a vehicle moves, both panes move at the same instant —
// because they're not two data sources, they're one.
//
// Clicking a vehicle on either side highlights it on both — that click-to-highlight
// is the concrete, undeniable "yes this is really connected" moment.
//
// Wire up: add a case in App.jsx, e.g.
//   case "sync-demo": return <SyncDemoView onBack={goLanding} />;
// and a button somewhere reachable (Landing page footer, or ?mode=sync-demo)

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
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#111111",
      }}
    >
      {/* Header */}
      <header
        style={{
          height: 64,
          background: "#111111",
          borderBottom: "1px solid #2A2A2A",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          gap: 16,
          flexShrink: 0,
        }}
      >
        <button
          onClick={onBack}
          style={{
            border: "none",
            background: "#2A2A2A",
            color: "white",
            width: 38,
            height: 38,
            borderRadius: 10,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          ←
        </button>
        <div style={{ color: "white", fontWeight: 800, fontSize: 18 }}>
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
          fontSize: 13,
          padding: "10px 24px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <ArrowLeftRight size={14} color="#3BEA4C" />
        Same live feed, two views — click any vehicle to highlight it on both
        sides at once.
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
          color="#3BEA4C"
          vehicles={vehicleList}
          selectedVehicleId={selectedVehicleId}
          onVehicleSelect={setSelectedVehicleId}
          mapId="sync-demo-commuter"
        />
        <div style={{ width: 1, background: "#2A2A2A", flexShrink: 0 }} />
        <Pane
          label="Operator View"
          color="#FFD93B"
          vehicles={vehicleList}
          selectedVehicleId={selectedVehicleId}
          onVehicleSelect={setSelectedVehicleId}
          mapId="sync-demo-operator"
        />
      </div>

      {/* Selected vehicle proof strip — shows identical data reflected from one shared source */}
      {selectedVehicle && (
        <div
          style={{
            background: "#1A1A1A",
            borderTop: "1px solid #2A2A2A",
            padding: "14px 24px",
            display: "flex",
            gap: 32,
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
              color: "#3BEA4C",
              fontSize: 12.5,
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
        @media (max-width: 900px) {
          .sync-demo-panes { flex-direction: column; }
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
      style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}
    >
      <div
        style={{
          padding: "10px 20px",
          color,
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          background: "#161616",
        }}
      >
        {label}
      </div>
      <div style={{ flex: 1, position: "relative" }}>
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
          fontSize: 11,
          color: "#6B7280",
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        {label}
      </div>
      <div
        className="font-numeric"
        style={{ fontSize: 16, color: "white", marginTop: 2 }}
      >
        {value}
      </div>
    </div>
  );
}
