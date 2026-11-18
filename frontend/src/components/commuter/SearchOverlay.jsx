import { Search, MapPin } from "lucide-react";

const QUICK_ROUTES = [
  "Cubao",
  "Makati",
  "Marikina",
  "Pasig",
  "San Juan",
  "Divisoria",
];

export default function SearchOverlay({
  destination,
  setDestination,
  onSearch,
  loading,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch?.(destination);
    }
  };

  return (
    <div
      className="commuter-search-overlay"
      style={{
        position: "absolute",
        top: "calc(14px + env(safe-area-inset-top, 0px))",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(92%, 660px)",
        zIndex: 50,
      }}
    >
      {/* Search bar */}
      <div
        className="commuter-search-box"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 14px",
          background: "rgba(255,255,255,.94)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: 20,
          boxShadow: "0 18px 44px rgba(17,17,17,.16)",
          border: "1px solid rgba(255,255,255,.6)",
        }}
      >
        <Search size={18} color="#64748B" style={{ flexShrink: 0 }} />

        <input
          type="text"
          placeholder="Where are you going today?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            minWidth: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: 15,
            color: "#111111",
          }}
        />

        <button
          type="button"
          onClick={() => onSearch?.(destination)}
          aria-label="Search destination"
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            border: "none",
            background: "#03164A",
            color: "white",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
            boxShadow: "0 8px 20px rgba(5,38,117,.26)",
          }}
        >
          {loading ? "..." : <MapPin size={18} />}
        </button>
      </div>

      {/* Quick Route Chips */}
      <div
        className="commuter-route-chips"
        style={{
          display: "flex",
          gap: 8,
          marginTop: 10,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        {QUICK_ROUTES.map((route) => (
          <button
            type="button"
            key={route}
            onClick={() => {
              setDestination(route);
              onSearch?.(route);
            }}
            style={{
              border: "none",
              padding: "8px 14px",
              borderRadius: 999,
              background:
                destination.toLowerCase() === route.toLowerCase()
                  ? "#052675"
                  : "rgba(255,255,255,.92)",
              backdropFilter: "blur(18px)",
              color:
                destination.toLowerCase() === route.toLowerCase()
                  ? "#FFFFFF"
                  : "#03164A",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              whiteSpace: "nowrap",
              boxShadow: "0 6px 16px rgba(17,17,17,.10)",
            }}
          >
            {route}
          </button>
        ))}
      </div>
    </div>
  );
}
