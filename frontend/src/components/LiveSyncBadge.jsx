// src/components/LiveSyncBadge.jsx
//
// Drop this in both CommuterView and OperatorView headers. It renders the
// exact same numbers from the exact same data source (useLiveVehicles), so
// a judge looking at both screens side-by-side sees them tick in unison —
// that's the visible proof of sync, not just an architecture claim.

import { useEffect, useState } from "react";
import { Radio } from "lucide-react";

export default function LiveSyncBadge({ vehicles = [], connected }) {
  const [, forceTick] = useState(0);

  // Re-render every second so "updated Xs ago" stays live without
  // needing its own socket subscription.
  useEffect(() => {
    const id = setInterval(() => forceTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const lastUpdate = vehicles.reduce((latest, v) => {
    const t = v.last_updated ? new Date(v.last_updated).getTime() : 0;
    return t > latest ? t : latest;
  }, 0);

  const secondsAgo = lastUpdate
    ? Math.max(0, Math.round((Date.now() - lastUpdate) / 1000))
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
        background: connected ? "#E9FBEA" : "#FFECEA",
        border: `1px solid ${connected ? "#3BEA4C" : "#FF4A3D"}`,
        fontSize: 12.5,
        fontWeight: 700,
        color: connected ? "#1FA82E" : "#B3261E",
        whiteSpace: "nowrap",
      }}
    >
      <Radio
        size={13}
        style={{
          animation: connected
            ? "busina-pulse-ring 1.6s ease-in-out infinite"
            : "none",
        }}
      />
      {vehicles.length} vehicles synced · {freshnessLabel}
      <style>{`
        @keyframes busina-pulse-ring {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
