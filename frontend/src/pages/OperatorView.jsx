// src/pages/OperatorView.jsx
import { useState } from "react";
import { AlertCircle, Bus, MapPin, Clock, BarChart3 } from "lucide-react";
import useLiveVehicles from "../hooks/useLiveVehicles";
import LiveMap from "../components/map/LiveMap";
import ConnectionStatusPill from "../components/ConnectionStatusPill";
import LiveSyncBadge from "../components/LiveSyncBadge";
import TodaysCommuteStrip from "../components/landing/TodaysCommuteStrip";

import KPICards from "../components/KPICards";
import VehicleDetailsPanel from "../components/operator/VehicleDetailsPanel";
import Skeleton, {
  SkeletonVehicleRow,
  SkeletonStatLine,
  SkeletonStyles,
} from "../components/ui/Skeleton";

const sectionSubtitleStyle = {
  margin: "-4px 0 14px",
  fontSize: 13,
  color: "#64748B",
  lineHeight: 1.4,
};

export default function OperatorView({ onBack }) {
  const live = useLiveVehicles();
  const alerts = live.alerts ?? [];
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [filterRoute, setFilterRoute] = useState("all");

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

  const routes = [
    ...new Set(vehicleList.map((v) => v.route_id).filter(Boolean)),
  ];

  const isLoading = !live.connected && vehicleList.length === 0;

  const filteredVehicles =
    filterRoute === "all"
      ? vehicleList
      : vehicleList.filter((v) => v.route_id === filterRoute);

  const effectiveSelectedId =
    selectedVehicleId && filteredVehicles.some((v) => v.id === selectedVehicleId)
      ? selectedVehicleId
      : (filteredVehicles[0]?.id ?? null);

  const selectedVehicle = filteredVehicles.find(
    (v) => v.id === effectiveSelectedId,
  );

  const getStatus = (speed) => {
    if (typeof speed !== "number" || speed < 1)
      return { label: "Stopped", color: "#FD4847", icon: "●" };
    if (speed < 10) return { label: "Slow", color: "#FCA307", icon: "●" };
    return { label: "Moving", color: "#052675", icon: "●" };
  };

  return (
    <div className="operator-shell">
      <SkeletonStyles />
      {/* Header */}
      <header className="operator-header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={onBack}
            aria-label="Back to landing page"
            style={{
              border: "none",
              background: "#FBF4C6",
              width: 38,
              height: 38,
              borderRadius: 10,
              fontSize: 18,
              cursor: "pointer",
              color: "#03164A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ←
          </button>
          <span
            style={{
              fontWeight: 700,
              fontSize: "clamp(17px, 2vw, 22px)",
              letterSpacing: "-0.5px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <BarChart3 size={20} color="#03164A" /> Operator Dashboard
          </span>
        </div>

        <div className="operator-header-controls">
          <LiveSyncBadge
            vehicles={filteredVehicles}
            connected={live.connected}
          />
          <ConnectionStatusPill status={live.connected ? "live" : "offline"} />
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <MapPin size={16} color="#64748B" />
            <select
              value={filterRoute}
              onChange={(e) => setFilterRoute(e.target.value)}
              aria-label="Filter by route"
              style={{
                padding: "7px 14px",
                borderRadius: 20,
                border: "1px solid #D9D9D9",
                background: "white",
                fontSize: 13.5,
                fontWeight: 500,
                color: "#111111",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="all">All Routes</option>
              {routes.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Today's Commute strip */}
      <div className="operator-section-pad">
        <TodaysCommuteStrip activeVehicleCount={vehicleList.length} />
      </div>

      {/* KPI Cards */}
      <div className="operator-kpi-pad">
        <KPICards vehicles={filteredVehicles} alerts={alerts} />
      </div>

      <div className="operator-body">
        <div className="operator-main">
          <div
            className="live-map-wrap"
            style={{
              position: "relative",
              background: "#D9D9D9",
              borderRadius: 22,
              overflow: "hidden",
            }}
          >
            <LiveMap
              vehicles={filteredVehicles}
              userLocation={null}
              mapId="operator-map"
              center={
                selectedVehicle
                  ? { lat: selectedVehicle.lat, lng: selectedVehicle.lng }
                  : null
              }
              routeId={selectedVehicle?.route_id}
              selectedVehicleId={effectiveSelectedId}
              onVehicleSelect={setSelectedVehicleId}
            />
            {isLoading && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#FBF4C6",
                  gap: 8,
                  flexDirection: "column",
                }}
              >
                <Skeleton width="70%" height={14} />
                <Skeleton width="45%" height={12} />
                <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 6 }}>
                  Connecting to live fleet…
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="operator-side">
          <p
            style={{
              margin: "0 0 -6px",
              fontSize: 13,
              color: "#64748B",
              lineHeight: 1.4,
            }}
          >
            Full detail on whichever vehicle is selected — click one on the map
            or in the list below.
          </p>
          <VehicleDetailsPanel
            vehicle={selectedVehicle}
            status={selectedVehicle ? getStatus(selectedVehicle.speed) : null}
          />

          {/* Vehicle selection tab */}
          <section
            style={{
              background: "white",
              borderRadius: 22,
              padding: "clamp(16px, 3vw, 22px)",
              border: "1px solid #D9D9D9",
              boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 8,
              }}
            >
              <Bus size={20} color="#03164A" />
              <h3
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#111111",
                }}
              >
                Vehicles{" "}
                <span
                  style={{ fontWeight: 400, color: "#94A3B8", fontSize: 15 }}
                >
                  ({filteredVehicles.length})
                </span>
              </h3>
            </div>
            <p style={sectionSubtitleStyle}>
              Every vehicle currently online for the selected route. Tap one to
              center the map and view its details above.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                maxHeight: 300,
                overflowY: "auto",
              }}
            >
              {isLoading &&
                Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonVehicleRow key={`veh-skel-${i}`} />
                ))}
              {!isLoading && filteredVehicles.length === 0 && (
                <div
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#94A3B8",
                    background: "#FBF4C6",
                    borderRadius: 12,
                  }}
                >
                  No vehicles on this route
                </div>
              )}
              {!isLoading &&
                filteredVehicles.map((v) => {
                  const status = getStatus(v.speed);
                  const isSelected = v.id === effectiveSelectedId;
                  return (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVehicleId(v.id)}
                      style={{
                        padding: "12px 14px",
                        borderRadius: 12,
                        background: isSelected ? "#E7ECFB" : "#FBF4C6",
                        border: isSelected
                          ? "2px solid #03164A"
                          : "1px solid #D9D9D9",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 10,
                        transition: "all 0.2s",
                        boxShadow: isSelected
                          ? "0 4px 12px rgba(5,38,117,0.15)"
                          : "none",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: 15,
                            color: "#111111",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {v.id}
                        </div>
                        <div style={{ fontSize: 12.5, color: "#64748B" }}>
                          {v.route_id}
                        </div>
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          gap: 3,
                          flexShrink: 0,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#111111",
                          }}
                        >
                          {v.speed?.toFixed(0) || 0} km/h
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "#64748B",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <span style={{ color: status.color }}>
                            {status.icon}
                          </span>
                          {status.label}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "#94A3B8",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <Clock size={12} />
                          {v.last_updated
                            ? new Date(v.last_updated).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "N/A"}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>

          {/* Alerts tab */}
          <section
            style={{
              background: "white",
              borderRadius: 22,
              padding: "clamp(16px, 3vw, 22px)",
              border: "1px solid #D9D9D9",
              boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 8,
              }}
            >
              <AlertCircle size={20} color="#FD4847" />
              <h3
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#111111",
                }}
              >
                Alerts{" "}
                <span
                  style={{ fontWeight: 400, color: "#94A3B8", fontSize: 15 }}
                >
                  ({alerts.length})
                </span>
              </h3>
            </div>
            <p style={sectionSubtitleStyle}>
              Automatic flags for delays, bunching, or vehicles going off-route.
              Critical alerts appear first.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                maxHeight: 200,
                overflowY: "auto",
              }}
            >
              {isLoading &&
                Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonStatLine key={`alert-skel-${i}`} />
                ))}
              {!isLoading && alerts.length === 0 && (
                <div
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#94A3B8",
                    background: "#FBF4C6",
                    borderRadius: 12,
                  }}
                >
                  All clear – no active alerts
                </div>
              )}
              {!isLoading &&
                alerts.slice(0, 10).map((alert, idx) => {
                  const isCritical = alert.severity === "critical";
                  return (
                    <div
                      key={alert.alert_id || idx}
                      style={{
                        padding: "12px 16px",
                        borderRadius: 12,
                        background: isCritical ? "#FFECEA" : "#FFF7DA",
                        border: `1px solid ${isCritical ? "#FFC9C4" : "#FFE59A"}`,
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            color: isCritical ? "#B3261E" : "#8A6100",
                            background: isCritical ? "#FFC9C4" : "#FFE59A",
                            padding: "2px 10px",
                            borderRadius: 999,
                          }}
                        >
                          {alert.severity || alert.status || "info"}
                        </span>
                        <span
                          style={{
                            fontWeight: 600,
                            fontSize: 14,
                            color: "#111111",
                          }}
                        >
                          {alert.vehicle_id || alert.route_id || "System"}
                        </span>
                      </div>
                      <div style={{ fontSize: 14, color: "#475569" }}>
                        {alert.message}
                      </div>
                      {(alert.timestamp || alert.detected_at) && (
                        <div style={{ fontSize: 12, color: "#94A3B8" }}>
                          {new Date(
                            alert.timestamp || alert.detected_at,
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
