// src/components/landing/FinalCTA.jsx
import { Bus, Building2, GitBranch, ArrowRight } from "lucide-react";

export default function FinalCTA({ setActiveView }) {
  const items = [
    {
      label: "Commuter Portal",
      icon: <Bus size={20} />,
      onClick: () => setActiveView("commuter"),
    },
    {
      label: "Operator Dashboard",
      icon: <Building2 size={20} />,
      onClick: () => setActiveView("operator"),
    },
    {
      label: "GitHub",
      icon: <GitBranch size={20} />,
      onClick: () =>
        window.open("https://github.com/ALT-F4-sparkfest", "_blank"),
    },
  ];

  return (
    <div
      style={{
        background: "linear-gradient(135deg,#03164A,#052675)",
        borderRadius: 32,
        padding: "56px 40px",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: 40,
          fontWeight: 800,
          color: "#FFFFFF",
          margin: "0 0 8px",
        }}
      >
        Experience BUSINA
      </h2>
      <p
        style={{
          color: "rgba(255,255,255,.7)",
          fontSize: 18,
          margin: "0 0 32px",
        }}
      >
        Every jeepney visible. Every commuter informed.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        {items.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(255,255,255,.1)",
              border: "1px solid rgba(255,255,255,.2)",
              color: "#FFFFFF",
              padding: "16px 28px",
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              transition: "200ms",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FCA307";
              e.currentTarget.style.color = "#03164A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,.1)";
              e.currentTarget.style.color = "#FFFFFF";
            }}
          >
            {item.icon}
            {item.label}
            <ArrowRight size={16} />
          </button>
        ))}
      </div>
    </div>
  );
}
