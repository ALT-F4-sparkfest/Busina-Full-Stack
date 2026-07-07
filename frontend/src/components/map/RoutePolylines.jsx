// src/components/map/RoutePolylines.jsx
import { useEffect, useRef } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import useRouteGeometry from "../../hooks/useRouteGeometry";

const ROUTE_ALIASES = {
  "CUBAO-DIVISORIA-V1": "CUBAO-DIVISORIA",
  "CUBAO-DIVISORIA-V2": "CUBAO-DIVISORIA",
  "CUBAO-MAKATI-V1": "CUBAO-MAKATI",
  "CUBAO-MAKATI-V2": "CUBAO-MAKATI",
  "CUBAO-MARIKINA-V1": "CUBAO-MARIKINA",
  "CUBAO-MARIKINA-V2": "CUBAO-MARIKINA",
  "CUBAO-PASIG-V1": "CUBAO-PASIG",
  "CUBAO-PASIG-V2": "CUBAO-PASIG",
  "CUBAO-SANJUAN-V1": "CUBAO-SANJUAN",
  "CUBAO-SANJUAN-V2": "CUBAO-SANJUAN",
};

const ROUTE_STYLES = {
  "CUBAO-DIVISORIA": { strokeColor: "#2563eb" },
  "CUBAO-MAKATI": { strokeColor: "#16a34a" },
  "CUBAO-MARIKINA": { strokeColor: "#d97706" },
  "CUBAO-PASIG": { strokeColor: "#9333ea" },
  "CUBAO-SANJUAN": { strokeColor: "#dc2626" },
};

export default function RoutePolylines({ activeRoute = null }) {
  const map = useMap();
  const polylinesRef = useRef([]);

  const baseRoute =
    activeRoute && activeRoute !== "all"
      ? ROUTE_ALIASES[activeRoute] || activeRoute
      : null;

  const { coordinates } = useRouteGeometry(baseRoute);

  useEffect(() => {
    // Clear existing polylines on every change
    polylinesRef.current.forEach((p) => p.setMap(null));
    polylinesRef.current = [];

    if (!baseRoute || !map || !window.google?.maps?.Polyline) return;
    if (!coordinates || coordinates.length === 0) return;

    const color = ROUTE_STYLES[baseRoute]?.strokeColor ?? "#64748b";

    const lineSymbol = {
      path: "M 0,-1 0,1",
      strokeOpacity: 1,
      scale: 3,
    };

    const glow = new window.google.maps.Polyline({
      path: coordinates,
      strokeColor: color,
      strokeOpacity: 0.15,
      strokeWeight: 14,
      geodesic: true,
      map,
    });

    const line = new window.google.maps.Polyline({
      path: coordinates,
      strokeColor: color,
      strokeOpacity: 0, // hide solid stroke — dashes drawn via icons below
      strokeWeight: 5,
      geodesic: true,
      map,
      icons: [
        {
          icon: lineSymbol,
          offset: "0",
          repeat: "12px",
        },
      ],
    });

    polylinesRef.current.push(glow, line);

    return () => {
      polylinesRef.current.forEach((p) => p.setMap(null));
      polylinesRef.current = [];
    };
  }, [map, baseRoute, coordinates]);

  return null;
}
