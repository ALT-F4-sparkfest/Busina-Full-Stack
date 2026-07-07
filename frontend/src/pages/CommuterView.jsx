import React, { useState, useEffect, useCallback } from "react";
import { Bus, Clock3, MapPin, RefreshCw, LocateFixed } from "lucide-react";
import LiveMap from "../components/map/LiveMap";
import BottomSheet from "../components/commuter/BottomSheet";
import SearchOverlay from "../components/commuter/SearchOverlay";
import ConnectionStatusPill from "../components/ConnectionStatusPill";
import LiveSyncBadge from "../components/LiveSyncBadge";
import useLiveVehicles from "../hooks/useLiveVehicles";
import businaIcon from "../assets/busina-icon-transparent.png";
import TodaysCommuteStrip from "../components/landing/TodaysCommuteStrip";
import "../styles/commuter.css";
const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function distance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const DEFAULT_LOCATION = { lat: 14.625, lng: 121.048 };

const SERVICE_POINTS = [
  "Cubao",
  "Divisoria",
  "Marikina",
  "Pasig",
  "San Juan",
  "Makati",
];

const VALID_ROUTES = [
  ["Cubao", "Divisoria"],
  ["Cubao", "Marikina"],
  ["Cubao", "Pasig"],
  ["Cubao", "San Juan"],
  ["Cubao", "Makati"],
];

function isDestinationInScope(text) {
  if (!text) return false;
  const norm = text.trim().toLowerCase();
  return SERVICE_POINTS.some((p) => norm.includes(p.toLowerCase()));
}

export default function CommuterView({ onBack }) {
  const live = useLiveVehicles();

  const [destination, setDestination] = useState("");
  const [eta, setEta] = useState(null);
  const [loadingEta, setLoadingEta] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [waitingToast, setWaitingToast] = useState(false);
  const [routeError, setRouteError] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [routeFilter, setRouteFilter] = useState("all");
  const [userLocation, setUserLocation] = useState(DEFAULT_LOCATION);
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => {},
    );
  }, []);

  const vehicleList = Array.isArray(live.vehicles)
    ? live.vehicles.filter(
        (v) =>
          typeof v.lat === "number" &&
          typeof v.lng === "number" &&
          isFinite(v.lat) &&
          isFinite(v.lng),
      )
    : [];

  const routes = [
    ...new Set(vehicleList.map((v) => v.route_id).filter(Boolean)),
  ];

  const filteredVehicles =
    routeFilter === "all"
      ? vehicleList
      : vehicleList.filter((v) => v.route_id === routeFilter);

  const nearest = filteredVehicles
    .map((v) => ({
      ...v,
      dist: distance(userLocation.lat, userLocation.lng, v.lat, v.lng),
    }))
    .sort((a, b) => a.dist - b.dist);

  const selectedVehicle = nearest.find((v) => v.id === selectedVehicleId);

  const handleDestinationSubmit = async (dest) => {
    const target = (dest || destination).trim();
    if (!target) return;

    setRouteError(null);

    if (!isDestinationInScope(target)) {
      setRouteError(
        `"${target}" is outside our current coverage. BUSINA currently serves Cubao ↔ Divisoria, Marikina, Pasig, San Juan, and Makati.`,
      );
      setTimeout(() => setRouteError(null), 4000);
      return;
    }

    setLoadingEta(true);
    try {
      if (!selectedVehicle) {
        throw new Error("no-vehicle-selected");
      }
      const res = await fetch(
        `${API}/vehicles/${selectedVehicle.id}/eta/stop1`,
      );
      const data = await res.json();
      setEta({
        eta_minutes: data.eta_minutes,
        destination: target,
        route: selectedVehicle.route_id,
        status: data.status,
        display_text: data.display_text,
      });
    } catch {
      const mockEta = selectedVehicle?.eta ?? Math.round(Math.random() * 8 + 3);
      setEta({
        eta_minutes: mockEta,
        destination: target,
        route: selectedVehicle?.route_id ?? "Nearest route",
        status: "on_route",
        display_text: `~${mockEta} min estimated (offline estimate)`,
      });
    } finally {
      setLoadingEta(false);
    }
  };

  const toggleWaiting = () => {
    setIsWaiting((prev) => {
      const next = !prev;
      if (next) {
        live.socket?.emit?.("commuter-waiting", {
          lat: userLocation.lat,
          lng: userLocation.lng,
          route: selectedVehicle?.route_id,
        });
        setWaitingToast(true);
        setTimeout(() => setWaitingToast(false), 3000);
      }
      return next;
    });
  };

  const recenter = useCallback(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => setUserLocation(DEFAULT_LOCATION),
    );
  }, []);

  const refresh = () => setMapKey((k) => k + 1);

  return (
    <div
      style={{
        height: "100vh",
        background: "#FBF4C6",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          minHeight: 64,
          background: "white",
          borderBottom: "1px solid #D9D9D9",
          display: "flex",
          alignItems: "center",
          padding: "10px 16px",
          gap: 10,
          zIndex: 100,
          flexShrink: 0,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={onBack}
          style={{
            border: "none",
            background: "#FBF4C6",
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
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontWeight: 800,
              fontSize: 18,
              color: "#111111",
            }}
          >
            <img
              src={businaIcon}
              alt="BUSINA"
              style={{ width: 22, height: 22, objectFit: "contain" }}
            />
            BUSINA
          </div>
          <div style={{ fontSize: 11, color: "#64748B" }}>Commuter View</div>
        </div>
        <div
          className="commuter-header-right"
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <span className="commuter-sync-badge">
            <LiveSyncBadge vehicles={vehicleList} connected={live.connected} />
          </span>
          <ConnectionStatusPill status={live.connected ? "live" : "offline"} />
        </div>
      </header>

      {/* Today's Commute strip — always visible now, no toggle */}
      <div style={{ padding: "10px 16px 0", flexShrink: 0 }}>
        <TodaysCommuteStrip activeVehicleCount={vehicleList.length} />
      </div>

      <style>{`
        @media (max-width: 480px) {
          .commuter-sync-badge { display: none; }
        }
      `}</style>

      {/* Map area */}
      <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
        <LiveMap
          key={mapKey}
          vehicles={nearest}
          userLocation={userLocation}
          mapId="commuter-map"
          selectedVehicleId={selectedVehicleId}
          onVehicleSelect={setSelectedVehicleId}
          routeId={routeFilter === "all" ? null : routeFilter}
        />

        <SearchOverlay
          destination={destination}
          setDestination={setDestination}
          onSearch={() => handleDestinationSubmit()}
          loading={loadingEta}
          connected={live.connected}
        />

        <div className="commuter-route-filter">
          <select
            value={routeFilter}
            onChange={(e) => setRouteFilter(e.target.value)}
            style={{
              border: "1px solid #D9D9D9",
              outline: "none",
              padding: "10px 16px",
              borderRadius: 14,
              background: "white",
              boxShadow: "0 4px 16px rgba(0,0,0,.10)",
              fontWeight: 600,
              fontSize: 13,
              color: "#111111",
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

        <div className="commuter-floating-controls">
          <button
            onClick={recenter}
            title="Recenter map"
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "white",
              border: "1px solid #D9D9D9",
              boxShadow: "0 4px 12px rgba(0,0,0,.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <LocateFixed size={18} color="#03164A" />
          </button>
          <button
            onClick={refresh}
            title="Refresh vehicles"
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "white",
              border: "1px solid #D9D9D9",
              boxShadow: "0 4px 12px rgba(0,0,0,.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <RefreshCw size={18} color="#64748B" />
          </button>
        </div>

        {selectedVehicle && (
          <div className="commuter-selected-vehicle-card">
            <div
              style={{
                background: "rgba(255,255,255,.95)",
                backdropFilter: "blur(18px)",
                borderRadius: 20,
                padding: 16,
                boxShadow: "0 12px 32px rgba(0,0,0,.12)",
                border: "1px solid rgba(255,255,255,.4)",
              }}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "#E7ECFB",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Bus size={22} color="#03164A" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>
                    {selectedVehicle.id}
                  </div>
                  <div style={{ color: "#64748B", fontSize: 12 }}>
                    {selectedVehicle.route_id}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedVehicleId(null)}
                  style={{
                    marginLeft: "auto",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#94A3B8",
                    fontSize: 18,
                  }}
                >
                  ×
                </button>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 8,
                  marginTop: 12,
                }}
              >
                <MiniInfo
                  label="Speed"
                  value={`${Math.round(selectedVehicle.speed ?? 0)} km/h`}
                />
                <MiniInfo
                  label="ETA"
                  value={`${selectedVehicle.eta ?? "--"} min`}
                />
                <MiniInfo
                  label="Occupancy"
                  value={selectedVehicle.passengers ?? "--"}
                />
              </div>
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background:
                      selectedVehicle.status === "On Route"
                        ? "#052675"
                        : selectedVehicle.status === "Delayed"
                          ? "#FCA307"
                          : "#FD4847",
                    display: "inline-block",
                  }}
                />
                <span style={{ fontSize: 12, color: "#64748B" }}>
                  {selectedVehicle.status ?? "Unknown"}
                </span>
              </div>
            </div>
          </div>
        )}

        {eta && (
          <div className="commuter-eta-card">
            <div
              style={{
                background: "rgba(255,255,255,.95)",
                backdropFilter: "blur(18px)",
                borderRadius: 20,
                padding: 16,
                boxShadow: "0 12px 32px rgba(0,0,0,.12)",
                border: "1px solid rgba(255,255,255,.4)",
                minWidth: 160,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#64748B",
                  fontSize: 12,
                }}
              >
                <Clock3 size={14} /> ETA to {eta.destination}
              </div>
              <div
                className="font-numeric"
                style={{
                  fontSize: 38,
                  color: "#111111",
                  lineHeight: 1.1,
                  marginTop: 4,
                }}
              >
                {eta.eta_minutes}
              </div>
              <div style={{ color: "#64748B", fontSize: 12 }}>minutes</div>
              {eta.display_text && (
                <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 4 }}>
                  {eta.display_text}
                </div>
              )}
              <button
                onClick={() => setEta(null)}
                style={{
                  marginTop: 8,
                  background: "none",
                  border: "none",
                  color: "#94A3B8",
                  fontSize: 11,
                  cursor: "pointer",
                }}
              >
                ✕ dismiss
              </button>
            </div>
          </div>
        )}

        {waitingToast && (
          <div
            style={{
              position: "absolute",
              top: 16,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 200,
              background: "#03164A",
              color: "white",
              padding: "10px 20px",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 13,
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}
          >
            <MapPin
              size={14}
              style={{ display: "inline", marginRight: 6, verticalAlign: -2 }}
            />
            Waiting registered!
          </div>
        )}

        {routeError && (
          <div
            style={{
              position: "absolute",
              top: 16,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 200,
              background: "#FD4847",
              color: "white",
              padding: "10px 20px",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 13,
              maxWidth: "88%",
              textAlign: "center",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}
          >
            Route unmapped — {routeError}
          </div>
        )}

        <BottomSheet
          nearest={nearest}
          eta={eta}
          waiting={isWaiting}
          onWait={toggleWaiting}
          onSelectVehicle={setSelectedVehicleId}
          selectedVehicleId={selectedVehicleId}
        />
      </div>
    </div>
  );
}

function MiniInfo({ label, value }) {
  return (
    <div
      style={{
        background: "#FBF4C6",
        borderRadius: 10,
        padding: "8px 10px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 600, color: "#111111" }}>
        {value}
      </div>
      <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 2 }}>
        {label}
      </div>
    </div>
  );
}
