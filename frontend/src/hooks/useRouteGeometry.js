import { useState, useEffect } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export default function useRouteGeometry(routeId) {
  const [state, setState] = useState({
    routeId: null,
    coordinates: [],
    loading: false,
  });

  useEffect(() => {
    if (!routeId) return;

    let cancelled = false;
    fetch(`${API}/routes/${routeId}/geofence`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setState({
            routeId,
            coordinates: data.coordinates || [],
            loading: false,
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState({ routeId, coordinates: [], loading: false });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [routeId]);

  const isCurrent = Boolean(routeId) && state.routeId === routeId;
  return {
    coordinates: isCurrent ? state.coordinates : [],
    loading: Boolean(routeId) && !isCurrent,
  };
}
