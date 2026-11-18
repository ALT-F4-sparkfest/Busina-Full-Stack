import { useEffect, useState } from "react";
import { fetchVehicleETAs } from "../api/vehicleApi";

export default function useBackendETA(vehicleId) {
  const [state, setState] = useState({
    vehicleId: null,
    etas: [],
    loading: false,
  });

  useEffect(() => {
    if (!vehicleId) return;

    let cancelled = false;

    async function loadETA() {
      try {
        const data = await fetchVehicleETAs(vehicleId);
        if (!cancelled) {
          setState({ vehicleId, etas: data || [], loading: false });
        }
      } catch {
        if (!cancelled) {
          setState({ vehicleId, etas: [], loading: false });
        }
      }
    }

    loadETA();

    return () => {
      cancelled = true;
    };
  }, [vehicleId]);

  const isCurrent = Boolean(vehicleId) && state.vehicleId === vehicleId;
  return {
    etas: isCurrent ? state.etas : [],
    loading: Boolean(vehicleId) && !isCurrent,
  };
}
