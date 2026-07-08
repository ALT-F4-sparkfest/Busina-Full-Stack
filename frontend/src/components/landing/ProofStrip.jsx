// src/components/landing/ProofStrip.jsx
import { Bus, Users, Target, Wifi, Cpu } from "lucide-react";
import useCountUp from "../../hooks/useCountUp";

const PROOF = [
  { icon: <Bus size={16} />, value: "10", label: "Vehicles" },
  { icon: <Users size={16} />, value: "X", label: "Riders" },
  { icon: <Target size={16} />, value: "97%", label: "ETA Accuracy" },
  { icon: <Wifi size={16} />, value: "MQTT", label: "Streaming" },
  { icon: <Cpu size={16} />, value: "ESP32", label: "Hardware Ready" },
];

function ProofItem({ item }) {
  const { ref, display } = useCountUp(item.value);
  return (
    <div ref={ref} style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ color: "#052675" }}>{item.icon}</div>
      <div>
        <div
          className="font-numeric"
          style={{ fontSize: 15, fontWeight: 800, color: "#111111" }}
        >
          {display}
        </div>
        <div style={{ fontSize: 11, color: "#64748B" }}>{item.label}</div>
      </div>
    </div>
  );
}

export default function ProofStrip() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 20,
        padding: "14px 18px",
        background: "rgba(255,255,255,.7)",
        border: "1px solid #D9D9D9",
        borderRadius: 16,
        marginTop: 8,
      }}
    >
      {PROOF.map((item) => (
        <ProofItem key={item.label} item={item} />
      ))}
    </div>
  );
}
