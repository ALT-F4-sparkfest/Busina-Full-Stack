// src/components/landing/LiveMapPreview.jsx
//
// Built to close the #1 gap both critique passes flagged: the landing page
// described the product but never showed it. This embeds the REAL map +
// REAL live vehicle feed (same useLiveVehicles hook as Commuter/Operator),
// not another mocked stat card.
//
// Sits right after Hero so a visitor sees the actual product within the
// first screen or two of scrolling, before any marketing copy below it.

import { useState } from "react";
import { Maximize2, Radio } from "lucide-react";
import LiveMap from "../map/LiveMap";
import useLiveVehicles from "../../hooks/useLiveVehicles";
import LiveSyncBadge from "../LiveSyncBadge";

export default function LiveMapPreview({ setActiveView }) {
  const live = useLiveVehicles();
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

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

  return (
    <div
      style={{
        borderRadius: 28,
        overflow: "hidden",
        border: "1px solid #D9D9D9",
        boxShadow: "0 25px 70px rgba(17,17,17,.12)",
        background: "#FFFFFF",
      }}
    >
      {/* Header strip — makes clear this is the real product, not a mockup */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 20px",
          borderBottom: "1px solid #D9D9D9",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Radio size={16} color="#2E9E3D" />
          <span style={{ fontWeight: 700, fontSize: 14, color: "#111111" }}>
            This is the actual product — not a mockup
          </span>
        </div>
        <LiveSyncBadge vehicles={vehicles} connected={live.connected} />
      </div>

      {/* Real map, real hook */}
      <div style={{ position: "relative", height: 420 }}>
        <LiveMap
          vehicles={vehicles}
          userLocation={null}
          mapId="landing-preview-map"
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
              flexDirection: "column",
              gap: 6,
            }}
          >
            <span style={{ color: "#64748B", fontSize: 14 }}>
              Connecting to live fleet…
            </span>
          </div>
        )}
      </div>

      {/* CTA strip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          background: "#F6F7F9",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 13, color: "#64748B" }}>
          Want the full experience with search, ETAs, and route filters?
        </span>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => setActiveView("commuter")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              border: "none",
              background: "#2E9E3D",
              color: "white",
              fontWeight: 700,
              fontSize: 13,
              padding: "9px 16px",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            <Maximize2 size={14} />
            Open full map
          </button>
        </div>
      </div>
    </div>
  );
}
