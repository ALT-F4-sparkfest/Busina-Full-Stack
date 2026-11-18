// src/hooks/useLiveVehicles.js
import { useEffect, useState, useRef, useCallback } from "react";
import io from "socket.io-client";

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function normaliseVehicle(v) {
  const speed = typeof v.speed === "number" ? v.speed : 0;

  let status = "On Route";
  if (v.stationary_since) {
    const stoppedMs = Date.now() - new Date(v.stationary_since).getTime();
    status = stoppedMs > 3 * 60 * 1000 ? "Delayed" : "Stopped";
  } else if (v.on_route === false) {
    status = "Off Route";
  }

  const seed = (v.id || "").charCodeAt(v.id?.length - 1) || 5;
  const occupancyCount = ((seed * 3) % 28) + 4;
  const capacity = 32;
  const passengersDisplay = `${occupancyCount} / ${capacity}`;
  const occupancyPercent = (occupancyCount / capacity) * 100;

  const eta =
    v.eta ?? (speed > 2 ? Math.round((30 / Math.max(speed, 5)) * 10) : "--");

  return {
    ...v,
    id: v.id ?? v.vehicle_id,
    vehicle_id: v.vehicle_id ?? v.id,
    route: v.route ?? v.route_id,
    route_id: v.route_id ?? v.route,
    speed,
    status,
    passengers: passengersDisplay,
    occupancyPercent,
    eta,
    driver: v.driver ?? "Driver",
    plate: v.plate ?? (v.id ?? "").toUpperCase(),
    destination: v.destination ?? v.route_id ?? "Terminal",
  };
}

export default function useLiveVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [connected, setConnected] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    fetch(`${API}/vehicles`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setVehicles(data.map(normaliseVehicle));
      })
      .catch(console.error);

    fetch(`${API}/alerts`)
      .then((r) => (r.ok ? r.json() : []))
      .then(setAlerts)
      .catch(() => setAlerts([]));

    const sock = io(API, {
      transports: ["websocket"],
      reconnectionDelay: 2000,
      reconnectionAttempts: 10,
    });
    socketRef.current = sock;

    sock.on("connect", () => {
      console.log("🟢 Connected", sock.id);
      setConnected(true);
      setSocket(sock);
    });

    sock.on("disconnect", () => {
      console.log("🔴 Disconnected");
      setConnected(false);
      setSocket(null);
    });

    sock.on("vehicle_snapshot", (snapshot) => {
      if (Array.isArray(snapshot)) {
        setVehicles(snapshot.map(normaliseVehicle));
      }
    });

    sock.on("vehicle_update", (vehicle) => {
      const norm = normaliseVehicle(vehicle);
      setVehicles((prev) => {
        const idx = prev.findIndex((v) => v.id === norm.id);
        if (idx === -1) return [...prev, norm];
        const next = [...prev];
        next[idx] = norm;
        return next;
      });
    });

    sock.on("alert", (alert) => {
      setAlerts((prev) => [alert, ...prev].slice(0, 20));
    });

    return () => {
      sock.disconnect();
      socketRef.current = null;
    };
  }, []);

  const emit = useCallback((event, payload) => {
    socketRef.current?.emit?.(event, payload);
  }, []);

  return {
    vehicles,
    alerts,
    connected,
    socket,
    emit,
  };
}
