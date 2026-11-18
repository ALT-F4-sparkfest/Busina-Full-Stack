// src/components/map/VehicleMarker.jsx
import { Marker } from "@react-google-maps/api";
import useAnimatedPosition from "../../hooks/useAnimatedPosition";

const busIcon = (isSelected) => ({
  path: window.google?.maps?.SymbolPath?.FORWARD_CLOSED_ARROW ?? 1,
  fillColor: isSelected ? "#EF4444" : "#2563EB",
  fillOpacity: 1,
  strokeColor: "#FFFFFF",
  strokeWeight: 2,
  scale: isSelected ? 7 : 6,
  rotation: 0,
});

export default function VehicleMarker({ vehicle, isSelected, onClick }) {
  const isValid =
    Boolean(vehicle) &&
    typeof vehicle.lat === "number" &&
    typeof vehicle.lng === "number";

  const animatedPos = useAnimatedPosition(
    isValid ? { lat: vehicle.lat, lng: vehicle.lng } : null,
  );

  if (!isValid) {
    return null;
  }

  const position = animatedPos || { lat: vehicle.lat, lng: vehicle.lng };

  const handleClick = () => {
    if (onClick) onClick(vehicle.id);
  };

  return (
    <Marker
      position={position}
      icon={busIcon(isSelected)}
      onClick={handleClick}
      rotation={vehicle.heading || 0}
    />
  );
}
