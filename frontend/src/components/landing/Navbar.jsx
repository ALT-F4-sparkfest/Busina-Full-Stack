import { GitBranch, Sparkles } from "lucide-react";
import businaIcon from "../../assets/busina-icon-transparent.png";

export default function Navbar() {
  return (
    <nav
      className="navbar-shell"
      style={{
        position: "sticky",
        top: 20,
        zIndex: 1000,
        width: "92%",
        maxWidth: 1450,
        margin: "20px auto",
        padding: "18px 30px",
        borderRadius: 24,
        background: "rgba(255,255,255,.82)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,.45)",
        boxShadow: "0 20px 45px rgba(17,17,17,.12)",
      }}
    >
      {/* LEFT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 18,
            background: "linear-gradient(135deg,#2E9E3D,#6EE87C)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 10px 30px rgba(59,234,76,.35)",
            overflow: "hidden",
          }}
        >
          <img
            src={businaIcon}
            alt="BUSINA logo"
            style={{
              width: "78%",
              height: "78%",
              objectFit: "contain",
              filter: "brightness(0) invert(1)", // renders the black linework as white on the green badge
            }}
          />
        </div>
        <div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#111111",
            }}
          >
            BUSINA
          </div>
          <div
            style={{
              fontSize: 14,
              color: "#64748B",
            }}
          >
            Smarter commutes. Better journeys.
          </div>
        </div>
      </div>

      {/* CENTER — hidden under 768px via .navbar-badges media query */}
      <div className="navbar-badges">
        <Badge text="Real-Time Tracking" color="#2E9E3D" />
        <Badge text="AI Dispatch" color="#00C2FF" />
        <Badge text="Real-Time ETA" color="#FFD93B" />
      </div>

      {/* RIGHT – now links to GitHub */}
      <a
        href="https://github.com/ALT-F4-sparkfest"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          border: "none",
          background: "#2E9E3D",
          color: "white",
          padding: "13px 22px",
          borderRadius: 14,
          cursor: "pointer",
          fontWeight: 700,
          fontSize: 15,
          boxShadow: "0 10px 24px rgba(59,234,76,.25)",
          textDecoration: "none",
        }}
      >
        <GitBranch size={18} />
        Source Code
      </a>
    </nav>
  );
}

function Badge({ text, color }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: `${color}15`,
        color,
        padding: "10px 16px",
        borderRadius: 999,
        fontWeight: 700,
        fontSize: 14,
      }}
    >
      <Sparkles size={15} />
      {text}
    </div>
  );
}
