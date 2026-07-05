// src/components/auth/OperatorLoginGate.jsx
//
// Wraps OperatorView so it can't be reached without logging in first.
// Commuter view is completely untouched — this only gates the operator side.
//
// HOW TO WIRE IT UP (in App.jsx, wherever you currently render OperatorView):
//
//   import OperatorLoginGate from "./components/auth/OperatorLoginGate";
//   ...
//   {activeView === "operator" && (
//     <OperatorLoginGate onLogout={() => setActiveView("landing")}>
//       <OperatorView />
//     </OperatorLoginGate>
//   )}
//
// AUTH IS CURRENTLY A STUB — see `verifyLogin` below. Swap that one function
// for a real Supabase/Express call later; nothing else needs to change.

import { useState } from "react";
import { Bus, Lock, Mail, Eye, EyeOff, ArrowRight, LogOut } from "lucide-react";

// ── Stub verification — replace with real auth later ───────────────────────
async function verifyLogin(email, password) {
  await new Promise((r) => setTimeout(r, 600)); // fake network delay
  // TEMP: accept anything non-empty so the flow is demoable.
  // Swap this block for: const { data, error } = await supabase.auth.signInWithPassword(...)
  if (!email || !password) {
    return { ok: false, message: "Enter both email and password." };
  }
  return { ok: true };
}

export default function OperatorLoginGate({ children, onLogout }) {
  const [authed, setAuthed] = useState(false);

  if (!authed) {
    return <OperatorLoginModal onSuccess={() => setAuthed(true)} />;
  }

  return (
    <div className="operator-gate-reveal">
      <OperatorSessionBar
        onLogout={() => {
          setAuthed(false);
          onLogout && onLogout();
        }}
      />
      {children}
      <style>{`
        .operator-gate-reveal {
          animation: busina-gate-fade 0.35s ease-out;
        }
        @keyframes busina-gate-fade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ── Login Modal ──────────────────────────────────────────────────────────── */
function OperatorLoginModal({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await verifyLogin(email, password);
    setLoading(false);
    if (result.ok) {
      onSuccess();
    } else {
      setError(result.message || "Invalid email or password.");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(17,17,17,.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        padding: 20,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#FFFFFF",
          borderRadius: 24,
          padding: "40px 36px",
          boxShadow: "0 30px 80px rgba(17,17,17,.35)",
          border: "1px solid #D9D9D9",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: "linear-gradient(135deg,#3BEA4C,#6EE87C)",
              color: "#111111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 24px rgba(59,234,76,.35)",
              flexShrink: 0,
            }}
          >
            <Bus size={24} />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#111111" }}>
              Operator Login
            </div>
            <div style={{ fontSize: 13, color: "#64748B" }}>
              Restricted access — fleet staff only
            </div>
          </div>
        </div>

        <div
          style={{
            height: 1,
            background: "#D9D9D9",
            margin: "24px 0",
          }}
        />

        {/* Email */}
        <label style={fieldLabel}>Email</label>
        <div style={inputWrap}>
          <Mail size={17} color="#64748B" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@operator.com"
            autoFocus
            style={inputStyle}
          />
        </div>

        {/* Password */}
        <label style={{ ...fieldLabel, marginTop: 18 }}>Password</label>
        <div style={inputWrap}>
          <Lock size={17} color="#64748B" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={inputStyle}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#64748B",
              display: "flex",
              alignItems: "center",
              padding: 0,
            }}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              marginTop: 14,
              padding: "10px 14px",
              borderRadius: 10,
              background: "#FFECEA",
              color: "#FF4A3D",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            marginTop: 24,
            padding: 15,
            borderRadius: 14,
            border: "none",
            background: loading ? "#9CA3AF" : "#2E9E3D",
            color: "#fff",
            fontWeight: 700,
            fontSize: 15,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            cursor: loading ? "not-allowed" : "pointer",
            transition: ".2s",
          }}
        >
          {loading ? "Verifying..." : "Log In"}
          {!loading && <ArrowRight size={17} />}
        </button>

        <div
          style={{
            marginTop: 18,
            textAlign: "center",
            fontSize: 12.5,
            color: "#9CA3AF",
          }}
        >
          Demo build — authentication wiring in progress.
        </div>
      </form>
    </div>
  );
}

/* ── Session bar shown once logged in (adds a way to log out) ──────────────── */
function OperatorSessionBar({ onLogout }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        background: "#E9FBEA",
        borderBottom: "1px solid #D9D9D9",
        fontSize: 13,
        fontWeight: 600,
        color: "#1FA82E",
      }}
    >
      <span>🔒 Operator session active</span>
      <button
        onClick={onLogout}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "none",
          border: "none",
          color: "#1FA82E",
          fontWeight: 700,
          fontSize: 13,
          cursor: "pointer",
        }}
      >
        <LogOut size={15} />
        Log out
      </button>
    </div>
  );
}

/* ── shared field styles ─────────────────────────────────────────────────── */
const fieldLabel = {
  display: "block",
  fontSize: 13,
  fontWeight: 700,
  color: "#111111",
  marginBottom: 8,
};

const inputWrap = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  border: "1px solid #D9D9D9",
  borderRadius: 12,
  padding: "12px 14px",
  background: "#F6F7F9",
};

const inputStyle = {
  flex: 1,
  border: "none",
  outline: "none",
  background: "transparent",
  fontSize: 14,
  color: "#111111",
};
