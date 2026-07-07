import { useState } from "react";
import { GitBranch, Bus, Building2, Menu, X } from "lucide-react";
import businaIcon from "../../assets/busina-icon-transparent.png";

const NAV_LINKS = [
  { label: "Live Overview", href: "#live-overview" },
  { label: "The Problem", href: "#the-problem" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Everything You Need", href: "#everything-you-need" },
  { label: "About Us", href: "#about-us" },
];

export default function Navbar({ setActiveView, currentView = "landing" }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className="navbar-shell"
        style={{
          position: "sticky",
          top: 20,
          zIndex: 1000,
          width: "92%",
          maxWidth: 1450,
          margin: "20px auto",
          padding: "14px 20px",
          borderRadius: 999,
          background: "rgba(255,255,255,.82)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,.45)",
          boxShadow: "0 20px 45px rgba(17,17,17,.12)",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* LEFT — logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 13,
              background: "linear-gradient(135deg,#03164A,#1B3E8F)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 8px 22px rgba(5,38,117,.35)",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src={businaIcon}
              alt="BUSINA logo"
              style={{
                width: "78%",
                height: "78%",
                objectFit: "contain",
                filter: "brightness(0) invert(1)",
              }}
            />
          </div>
          <div
            className="navbar-wordmark"
            style={{ fontSize: 22, fontWeight: 800, color: "#111111" }}
          >
            BUSINA
          </div>
        </div>

        {/* CENTER — in-page navigation, hidden under 1024px (replaced by hamburger) */}
        <div
          className="navbar-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            flex: 1,
            justifyContent: "center",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                padding: "9px 14px",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
                color: "#374151",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "background .2s ease, color .2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#E7ECFB";
                e.currentTarget.style.color = "#052675";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#374151";
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* RIGHT — commuter/operator toggle + source code (desktop), hamburger (mobile) */}
        <div
          className="navbar-right-desktop"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              background: "#FBF4C6",
              borderRadius: 999,
              padding: 4,
              border: "1px solid #D9D9D9",
            }}
          >
            <ToggleButton
              active={false}
              icon={<Bus size={14} />}
              label="Commuter"
              onClick={() => setActiveView && setActiveView("commuter")}
            />
            <ToggleButton
              active={false}
              icon={<Building2 size={14} />}
              label="Operator"
              onClick={() => setActiveView && setActiveView("operator")}
            />
          </div>

          <a
            href="https://github.com/ALT-F4-sparkfest"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: "none",
              background: "#03164A",
              color: "white",
              padding: "11px 18px",
              borderRadius: 999,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14,
              boxShadow: "0 10px 24px rgba(5,38,117,.25)",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            <GitBranch size={16} />
            Source Code
          </a>
        </div>

        {/* Hamburger — only shown under 1024px */}
        <button
          className="navbar-hamburger"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          style={{
            display: "none",
            border: "1px solid #D9D9D9",
            background: "white",
            width: 42,
            height: 42,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <Menu size={20} color="#052675" />
        </button>
      </nav>

      {/* Mobile slide-down menu */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1100,
            background: "rgba(17,17,17,.45)",
          }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#FFFFFF",
              margin: "12px",
              borderRadius: 24,
              padding: 22,
              boxShadow: "0 25px 60px rgba(17,17,17,.25)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 18,
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 800, color: "#111111" }}>
                BUSINA
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                style={{
                  border: "none",
                  background: "#FBF4C6",
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={17} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    padding: "13px 14px",
                    borderRadius: 12,
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#374151",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 16,
                paddingTop: 16,
                borderTop: "1px solid #D9D9D9",
              }}
            >
              <button
                onClick={() => {
                  setActiveView && setActiveView("commuter");
                  setMobileOpen(false);
                }}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  border: "none",
                  background: "#052675",
                  color: "white",
                  padding: "13px",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                <Bus size={16} /> Commuter
              </button>
              <button
                onClick={() => {
                  setActiveView && setActiveView("operator");
                  setMobileOpen(false);
                }}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  border: "1px solid #D9D9D9",
                  background: "#FBF4C6",
                  color: "#052675",
                  padding: "13px",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                <Building2 size={16} /> Operator
              </button>
            </div>

            <a
              href="https://github.com/ALT-F4-sparkfest"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginTop: 10,
                border: "none",
                background: "#FBF4C6",
                color: "#111111",
                padding: "13px",
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              <GitBranch size={16} />
              Source Code
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .navbar-links { display: none !important; }
          .navbar-right-desktop { display: none !important; }
          .navbar-hamburger { display: flex !important; }
        }
        @media (max-width: 400px) {
          .navbar-wordmark { display: none; }
        }
      `}</style>
    </>
  );
}

function ToggleButton({ active, icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        border: "none",
        background: active ? "#052675" : "transparent",
        color: active ? "#FFFFFF" : "#374151",
        padding: "8px 14px",
        borderRadius: 999,
        cursor: "pointer",
        fontWeight: 700,
        fontSize: 13,
        transition: ".2s",
      }}
    >
      {icon}
      {label}
    </button>
  );
}
