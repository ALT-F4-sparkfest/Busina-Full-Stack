// src/hooks/useBackendAlert.js
import { useState, useEffect } from "react";
import { fetchAlerts } from "../api/alertApi";

export default function useBackendAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchAlerts()
      .then((data) => {
        if (!cancelled) setAlerts(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setAlerts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { alerts, loading };
}
