// src/pages/OperatorView.jsx
import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  Bus,
  MapPin,
  Clock,
  BarChart3,
  TrafficCone,
  ShieldAlert,
  Radio,
  CheckCircle2,
  Bot,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import useLiveVehicles from "../hooks/useLiveVehicles";
import LiveMap from "../components/map/LiveMap";
import ConnectionStatusPill from "../components/ConnectionStatusPill";
import LiveSyncBadge from "../components/LiveSyncBadge";

import KPICards from "../components/KPICards";
import TravelTimeChart from "../components/TravelTimeChart";
import AIRecommendationPanel from "../components/operator/AIRecommendationPanel";
import VehicleDetailsPanel from "../components/operator/VehicleDetailsPanel";
import hotspots from "../data/demandHotspots.json";
import Skeleton, {
  SkeletonVehicleRow,
  SkeletonStatLine,
  SkeletonStyles,
} from "../components/ui/Skeleton";

export default function OperatorView({ onBack }) {
  const live = useLiveVehicles();
  const alerts = live.alerts ?? [];
  const [waitingList, setWaitingList] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [filterRoute, setFilterRoute] = useState("all");
  const [showAnalytics, setShowAnalytics] = useState(false); // 👈 NEW: progressive disclosure toggle

  useEffect(() => {
    if (!live.socket) return;

    const handleWaitingUpdate = (data) => {
      setWaitingList((prev) => {
        const newEntry = {
          ...data,
          id: Date.now() + Math.random(),
          timestamp: new Date().toISOString(),
        };
        return [newEntry, ...prev].slice(0, 20);
      });
    };

    live.socket.on("waiting-update", handleWaitingUpdate);
    return () => {
      live.socket.off("waiting-update", handleWaitingUpdate);
    };
  }, [live.socket]);

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

  useEffect(() => {
    if (filteredVehicles.length > 0 && !selectedVehicleId) {
      setSelectedVehicleId(filteredVehicles[0].id);
    }
  }, [filteredVehicles, selectedVehicleId]);

  const selectedVehicle = filteredVehicles.find(
    (v) => v.id === selectedVehicleId,
  );

  const getStatus = (speed) => {
    if (typeof speed !== "number" || speed < 1)
      return { label: "Stopped", color: "#FF4A3D", icon: "●" };
    if (speed < 10) return { label: "Slow", color: "#FF8A1D", icon: "●" };
    return { label: "Moving", color: "#3BEA4C", icon: "●" };
  };

  const topHotspots = [...hotspots]
    .sort((a, b) => b.demand_score - a.demand_score)
    .slice(0, 5);

  return (
    <div className="operator-shell">
      <SkeletonStyles />
      {/* Header */}
      <header className="operator-header">
        <button
          onClick={onBack}
          style={{
            border: "none",
            background: "none",
            fontSize: 20,
            cursor: "pointer",
            color: "#64748B",
          }}
        >
          ←
        </button>
        <span
          style={{
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: "-0.5px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <BarChart3 size={20} color="#2E9E3D" /> Operator Dashboard
        </span>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <LiveSyncBadge
            vehicles={filteredVehicles}
            connected={live.connected}
          />
          <ConnectionStatusPill status={live.connected ? "live" : "offline"} />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <MapPin size={16} color="#64748B" />
            <select
              value={filterRoute}
              onChange={(e) => setFilterRoute(e.target.value)}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                border: "1px solid #D9D9D9",
                background: "white",
                fontSize: 14,
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

      {/* KPICards – kept intact */}
      <div style={{ padding: "16px 32px", flexShrink: 0 }}>
        <KPICards vehicles={filteredVehicles} />
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
              selectedVehicleId={selectedVehicleId}
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
                  background: "#F6F7F9",
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

          {/* ─── Progressive Disclosure Toggle ─── */}
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            style={{
              marginTop: 16,
              padding: "12px 20px",
              width: "100%",
              border: "1px solid #D9D9D9",
              borderRadius: 14,
              background: "white",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 15,
              fontWeight: 600,
              color: "#111111",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#2E9E3D";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(46,158,61,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#D9D9D9";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span>📊 {showAnalytics ? "Hide" : "Show"} Advanced Analytics</span>
            {showAnalytics ? (
              <ChevronDown size={18} color="#64748B" />
            ) : (
              <ChevronRight size={18} color="#64748B" />
            )}
          </button>

          {/* ─── Analytics Section – conditionally rendered ─── */}
          {showAnalytics && (
            <div className="operator-charts-row" style={{ marginTop: 16 }}>
              <div style={{ flex: 1 }}>
                <TravelTimeChart />
              </div>
              <div style={{ flex: 1 }}>
                <AIRecommendationPanel
                  vehicles={filteredVehicles}
                  waitingCommuters={waitingList}
                />
              </div>
            </div>
          )}
        </div>

        <div className="operator-side">
          {/* VehicleDetailsPanel – kept intact */}
          <VehicleDetailsPanel
            vehicle={selectedVehicle}
            status={selectedVehicle ? getStatus(selectedVehicle.speed) : null}
          />

          {/* Vehicle list – kept intact */}
          <section
            style={{
              background: "white",
              borderRadius: 22,
              padding: "20px 24px",
              border: "1px solid #D9D9D9",
              boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <Bus size={20} color="#2E9E3D" />
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
                    background: "#F6F7F9",
                    borderRadius: 12,
                  }}
                >
                  No vehicles on this route
                </div>
              )}
              {!isLoading &&
                filteredVehicles.map((v) => {
                  const status = getStatus(v.speed);
                  return (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVehicleId(v.id)}
                      style={{
                        padding: "12px 16px",
                        borderRadius: 12,
                        background:
                          v.id === selectedVehicleId ? "#E9FBEA" : "#F6F7F9",
                        border:
                          v.id === selectedVehicleId
                            ? "2px solid #2E9E3D"
                            : "1px solid #D9D9D9",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        transition: "all 0.2s",
                        boxShadow:
                          v.id === selectedVehicleId
                            ? "0 4px 12px rgba(46,158,61,0.15)"
                            : "none",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: 16,
                            color: "#111111",
                          }}
                        >
                          {v.id}
                        </div>
                        <div style={{ fontSize: 13, color: "#64748B" }}>
                          {v.route_id}
                        </div>
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          gap: 4,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: "#111111",
                          }}
                        >
                          {v.speed?.toFixed(0) || 0} km/h
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "#94A3B8",
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

          {/* Alerts feed – kept intact */}
          <section
            style={{
              background: "white",
              borderRadius: 22,
              padding: "20px 24px",
              border: "1px solid #D9D9D9",
              boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <AlertCircle size={20} color="#FF4A3D" />
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
                    background: "#F6F7F9",
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
                      key={idx}
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
                          {alert.severity || "info"}
                        </span>
                        <span
                          style={{
                            fontWeight: 600,
                            fontSize: 14,
                            color: "#111111",
                          }}
                        >
                          {alert.vehicle_id || "System"}
                        </span>
                      </div>
                      <div style={{ fontSize: 14, color: "#475569" }}>
                        {alert.message}
                      </div>
                      <div style={{ fontSize: 12, color: "#94A3B8" }}>
                        {new Date(alert.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>

          {/* OperationsPanel – kept intact */}
          <OperationsPanel
            alerts={alerts}
            hotspots={topHotspots}
            vehicles={filteredVehicles}
            waiting={waitingList}
          />
        </div>
      </div>
    </div>
  );
}

function OperationsPanel({
  alerts = [],
  hotspots = [],
  vehicles = [],
  waiting = [],
}) {
  const criticalCount = alerts.filter((a) => a.severity === "critical").length;

  const getDynamicAISummary = () => {
    if (criticalCount > 0) {
      return {
        icon: <ShieldAlert size={16} color="#FF4A3D" />,
        text: `Attention required: There are ${criticalCount} critical operational alerts active. Fleet adjustments or driver contact recommended immediately.`,
      };
    }
    if (waiting.length > 20) {
      return {
        icon: <TrafficCone size={16} color="#FF8A1D" />,
        text: `High Commuter Congestion: ${waiting.length} passengers waiting across popular stops. Consider injecting unassigned vehicles into active standby loops.`,
      };
    }
    if (vehicles.length === 0) {
      return {
        icon: <Radio size={16} color="#9CA3AF" />,
        text: `No vehicles currently active. Please check the backend connection or replay simulator.`,
      };
    }
    return {
      icon: <CheckCircle2 size={16} color="#3BEA4C" />,
      text: `Fleet is operating efficiently across all ${vehicles.length} active units tracked. Transit pacing matches demand thresholds near the highest-ranked hotspots.`,
    };
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 22,
        padding: 24,
        border: "1px solid #D9D9D9",
        boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: 20,
          fontSize: 18,
          fontWeight: 600,
          color: "#111111",
        }}
      >
        🚦 Live Operations Center
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 14,
          marginBottom: 24,
        }}
      >
        <MiniStat title="Fleet" value={vehicles.length} color="#2E9E3D" />
        <MiniStat title="Waiting" value={waiting.length} color="#FF4A3D" />
        <MiniStat
          title="Health"
          value={criticalCount > 0 ? "88%" : "98%"}
          color="#3BEA4C"
        />
      </div>

      <h3
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "#111111",
          marginBottom: 12,
        }}
      >
        🚨 Live Alerts Summary
      </h3>
      {alerts.length ? (
        alerts
          .slice(0, 3)
          .map((alert, index) => (
            <AlertRow
              key={index}
              color={alert.severity === "critical" ? "#FF4A3D" : "#FF8A1D"}
              text={`${alert.vehicle_id || "System"}: ${alert.message}`}
            />
          ))
      ) : (
        <AlertRow color="#3BEA4C" text="No operational alerts." />
      )}

      <hr
        style={{ margin: "24px 0", border: 0, borderTop: "1px solid #D9D9D9" }}
      />

      <h3
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "#111111",
          marginBottom: 12,
        }}
      >
        📍 Demand Ranking
      </h3>
      {hotspots.map((spot, index) => (
        <HotspotRow key={index} rank={index + 1} spot={spot} />
      ))}

      <div
        style={{
          marginTop: 24,
          background: "#E9FBEA",
          padding: 18,
          borderRadius: 14,
        }}
      >
        <strong
          style={{
            color: "#2E9E3D",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Bot size={16} /> Dynamic AI Summary
        </strong>
        <p
          style={{
            marginTop: 10,
            color: "#475569",
            lineHeight: 1.6,
            marginBottom: 0,
            display: "flex",
            gap: 8,
          }}
        >
          <span style={{ flexShrink: 0, marginTop: 2 }}>
            {getDynamicAISummary().icon}
          </span>
          <span>{getDynamicAISummary().text}</span>
        </p>
      </div>
    </div>
  );
}

function MiniStat({ title, value, color }) {
  return (
    <div
      style={{
        background: `${color}15`,
        borderRadius: 14,
        padding: 18,
        textAlign: "center",
      }}
    >
      <div className="font-numeric" style={{ color, fontSize: 28 }}>
        {value}
      </div>
      <div style={{ marginTop: 6, color: "#64748B" }}>{title}</div>
    </div>
  );
}

function AlertRow({ color, text }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        marginBottom: 14,
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: color,
          marginTop: 5,
          flexShrink: 0,
        }}
      />
      <div style={{ color: "#334155", lineHeight: 1.5, fontSize: 14 }}>
        {text}
      </div>
    </div>
  );
}

function HotspotRow({ rank, spot }) {
  const colors = ["#FF4A3D", "#FF8A1D", "#FF8A1D", "#3BEA4C", "#2E9E3D"];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 0",
        borderBottom: "1px solid #F6F7F9",
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: colors[rank - 1] || "#64748B",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: 700,
          }}
        >
          {rank}
        </div>
        <div>
          <strong style={{ fontSize: 14, color: "#111111" }}>
            {spot.stop_name}
          </strong>
          <div style={{ color: "#64748B", fontSize: 13 }}>{spot.route_id}</div>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <strong style={{ fontSize: 14, color: "#111111" }}>
          {spot.avg_wait_minutes} min
        </strong>
        <div style={{ color: "#64748B", fontSize: 13 }}>Avg Wait</div>
      </div>
    </div>
  );
}
