// src/components/landing/Navbar.jsx
import { useState } from "react";
import { GitBranch, Sparkles, Users, Briefcase } from "lucide-react";
import businaIcon from "../../assets/busina-icon-transparent.png";

export default function Navbar({ setActiveView, currentView }) {
  const [view, setView] = useState(currentView || "commuter");

  const handleToggle = (mode) => {
    setView(mode);
    if (setActiveView) setActiveView(mode);
  };

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
        padding: "14px 28px",
        borderRadius: 24,
        background: "rgba(255,255,255,.82)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,.45)",
        boxShadow: "0 20px 45px rgba(17,17,17,.12)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      {/* LEFT – Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            background: "linear-gradient(135deg,#052675,#03164A)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 8px 24px rgba(5,38,117,0.30)",
            overflow: "hidden",
          }}
        >
          <img
            src={businaIcon}
            alt="BUSINA logo"
            style={{
              width: "76%",
              height: "76%",
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
        </div>
        <div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#111111",
              lineHeight: 1.1,
            }}
          >
            BUSINA
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#64748B",
            }}
          >
            Smarter commutes. Better journeys.
          </div>
        </div>
      </div>

      {/* CENTER – User Mode Toggle (NEW) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          background: "#F1F5F9",
          borderRadius: 999,
          padding: 4,
          border: "1px solid #E2E8F0",
        }}
      >
        <button
          onClick={() => handleToggle("commuter")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 18px",
            borderRadius: 999,
            border: "none",
            background: view === "commuter" ? "#052675" : "transparent",
            color: view === "commuter" ? "#fff" : "#64748B",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            transition: "all .2s",
          }}
        >
          <Users size={15} />
          Commuter
        </button>
        <button
          onClick={() => handleToggle("operator")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 18px",
            borderRadius: 999,
            border: "none",
            background: view === "operator" ? "#052675" : "transparent",
            color: view === "operator" ? "#fff" : "#64748B",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            transition: "all .2s",
          }}
        >
          <Briefcase size={15} />
          Operator
        </button>
      </div>

      {/* RIGHT – GitHub Link */}
      <a
        href="https://github.com/ALT-F4-sparkfest"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          border: "none",
          background: "#052675",
          color: "white",
          padding: "10px 20px",
          borderRadius: 12,
          cursor: "pointer",
          fontWeight: 700,
          fontSize: 14,
          boxShadow: "0 8px 20px rgba(5,38,117,0.22)",
          textDecoration: "none",
        }}
      >
        <GitBranch size={16} />
        Source Code
      </a>

      {/* ─── Mobile responsive styles ─── */}
      <style>{`
        @media (max-width: 700px) {
          .navbar-shell {
            flex-direction: column;
            align-items: stretch !important;
            padding: 12px 16px !important;
            margin: 12px auto !important;
            width: 96% !important;
          }
          .navbar-shell > div:first-child {
            justify-content: center;
          }
          .navbar-shell .navbar-badges {
            display: none !important;
          }
          .navbar-shell > a {
            justify-content: center;
          }
        }
        @media (max-width: 480px) {
          .navbar-shell > div:first-child {
            gap: 10px !important;
          }
          .navbar-shell > div:first-child > div:first-child {
            width: 38px !important;
            height: 38px !important;
          }
          .navbar-shell > div:first-child > div:last-child > div:first-child {
            font-size: 20px !important;
          }
          .navbar-shell > div:first-child > div:last-child > div:last-child {
            font-size: 11px !important;
          }
          .navbar-shell .user-toggle {
            justify-content: center;
          }
          .navbar-shell .user-toggle button {
            padding: 6px 14px !important;
            font-size: 12px !important;
          }
          .navbar-shell > a {
            padding: 8px 16px !important;
            font-size: 13px !important;
          }
        }
      `}</style>
    </nav>
  );
}
