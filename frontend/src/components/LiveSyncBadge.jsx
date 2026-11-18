// src/components/LiveSyncBadge.jsx
import { useEffect, useState } from "react";
import { Radio } from "lucide-react";

export default function LiveSyncBadge({ vehicles = [], connected }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const lastUpdate = vehicles.reduce((latest, v) => {
    const t = v.last_updated ? new Date(v.last_updated).getTime() : 0;
    return t > latest ? t : latest;
  }, 0);

  const secondsAgo = lastUpdate
    ? Math.max(0, Math.round((now - lastUpdate) / 1000))
    : null;

  const freshnessLabel = !connected
    ? "offline"
    : secondsAgo === null
      ? "waiting…"
      : secondsAgo < 1
        ? "just now"
        : `${secondsAgo}s ago`;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 14px",
        borderRadius: 999,
        background: connected ? "#E7ECFB" : "#FFECEA",
        border: `1px solid ${connected ? "#052675" : "#FD4847"}`,
        fontSize: 12.5,
        fontWeight: 700,
        color: connected ? "#052675" : "#B3261E",
        whiteSpace: "nowrap",
      }}
    >
      <Radio size={13} className={connected ? "busina-live-breathe" : ""} />
      {vehicles.length} vehicles synced · {freshnessLabel}
    </div>
  );
}
