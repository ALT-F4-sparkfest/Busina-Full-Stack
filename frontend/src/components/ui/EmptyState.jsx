// src/components/ui/EmptyState.jsx
//
// Two ways to use this component:
//
// 1. Original API — pass your own copy directly:
//    <EmptyState title="No results" description="Try a different search." />
//
// 2. Variant shorthand — pass a preset name for common cases (adds an icon):
//    <EmptyState variant="noVehicles" />
//    <EmptyState variant="offline" compact />
//
// If both `variant` and `title`/`description` are given, the explicit
// title/description win — variant only supplies defaults.

import { MapPin, WifiOff, AlertCircle } from "lucide-react";

const VARIANTS = {
  noVehicles: {
    icon: <MapPin size={32} color="#64748B" />,
    title: "No active jeepneys nearby",
    description: "Try another route, or check again in a few minutes.",
  },
  offline: {
    icon: <WifiOff size={32} color="#64748B" />,
    title: "Can't reach the live fleet",
    description: "Check your connection — we'll reconnect automatically.",
  },
  error: {
    icon: <AlertCircle size={32} color="#FD4847" />,
    title: "Something went wrong on our end",
    description: "This isn't your fault. Try refreshing in a moment.",
  },
};

export default function EmptyState({
  title,
  description,
  variant,
  compact = false,
}) {
  const preset = variant ? VARIANTS[variant] : null;

  const resolvedTitle = title ?? preset?.title ?? "Nothing here yet";
  const resolvedDescription = description ?? preset?.description ?? "";
  const resolvedIcon = preset?.icon ?? null;

  return (
    <div
      className="empty-state"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 12,
        padding: compact ? "32px 20px" : "56px 20px",
      }}
    >
      {resolvedIcon && (
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "#F1F5F9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {resolvedIcon}
        </div>
      )}
      <h3
        style={{ fontWeight: 700, fontSize: 16, color: "#111111", margin: 0 }}
      >
        {resolvedTitle}
      </h3>
      {resolvedDescription && (
        <p
          style={{
            fontSize: 14,
            color: "#64748B",
            maxWidth: 260,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {resolvedDescription}
        </p>
      )}
    </div>
  );
}
