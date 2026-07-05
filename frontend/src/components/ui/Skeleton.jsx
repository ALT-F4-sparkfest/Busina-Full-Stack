// src/components/ui/Skeleton.jsx
//
// Generic shimmering placeholder block. Use anywhere content is still loading:
//   <Skeleton width="100%" height={20} />
//   <Skeleton width={80} height={80} radius="50%" />
//
// Ships with a few pre-built shapes for common cases (KPI card, vehicle row,
// stat line) so you don't have to hand-roll the same 3 divs everywhere.

export default function Skeleton({
  width = "100%",
  height = 16,
  radius = 10,
  style = {},
}) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        background:
          "linear-gradient(90deg,#E9E9EC 25%,#F3F3F5 37%,#E9E9EC 63%)",
        backgroundSize: "400% 100%",
        animation: "busina-shimmer 1.4s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

/* ── Pre-built shapes ─────────────────────────────────────────────────────── */

export function SkeletonKPICard() {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 22,
        padding: 24,
        border: "1px solid #D9D9D9",
      }}
    >
      <Skeleton
        width={44}
        height={44}
        radius={12}
        style={{ marginBottom: 18 }}
      />
      <Skeleton width="60%" height={26} style={{ marginBottom: 10 }} />
      <Skeleton width="40%" height={14} />
    </div>
  );
}

export function SkeletonVehicleRow() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 0",
        borderBottom: "1px solid #F0F0F0",
      }}
    >
      <Skeleton width={36} height={36} radius="50%" />
      <div style={{ flex: 1 }}>
        <Skeleton width="50%" height={14} style={{ marginBottom: 8 }} />
        <Skeleton width="30%" height={11} />
      </div>
      <Skeleton width={60} height={20} radius={999} />
    </div>
  );
}

export function SkeletonStatLine() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "18px 0",
      }}
    >
      <Skeleton width="40%" height={14} />
      <Skeleton width={50} height={14} />
    </div>
  );
}

/* Shimmer keyframes — injected once, safe to include in every mount */
export function SkeletonStyles() {
  return (
    <style>{`
      @keyframes busina-shimmer {
        0% { background-position: 100% 0; }
        100% { background-position: 0 0; }
      }
    `}</style>
  );
}
