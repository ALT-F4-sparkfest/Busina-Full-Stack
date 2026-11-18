// src/components/auth/OperatorLoginGate.jsx
import { useState } from "react";
import {
  Bus,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  LogOut,
  ArrowLeft,
} from "lucide-react";

async function verifyLogin(email, password) {
  await new Promise((r) => setTimeout(r, 600));
  if (!email || !password) {
    return { ok: false, message: "Enter both email and password." };
  }
  return { ok: true };
}

export default function OperatorLoginGate({ children, onLogout }) {
  const [authed, setAuthed] = useState(false);

  if (!authed) {
    return (
      <OperatorLoginModal
        onSuccess={() => setAuthed(true)}
        onCancel={onLogout}
      />
    );
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
          animation: busina-gate-fade 0.3s ease-out;
        }
        @keyframes busina-gate-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ── Login Modal ──────────────────────────────────────────────────────────── */
function OperatorLoginModal({ onSuccess, onCancel }) {
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
        padding: 16,
        overflowY: "auto",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#FFFFFF",
          borderRadius: 24,
          padding: "clamp(24px, 5vw, 40px) clamp(20px, 5vw, 36px)",
          boxShadow: "0 30px 80px rgba(17,17,17,.35)",
          border: "1px solid #D9D9D9",
        }}
      >
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "none",
              color: "#64748B",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              marginBottom: 16,
              padding: 0,
            }}
          >
            <ArrowLeft size={15} /> Back to Home
          </button>
        )}

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
              background: "linear-gradient(135deg,#052675,#1B3E8F)",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 24px rgba(5,38,117,.35)",
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
            margin: "20px 0",
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
        <label style={{ ...fieldLabel, marginTop: 16 }}>Password</label>
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
              padding: 4,
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
              color: "#FD4847",
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
            marginTop: 22,
            padding: 15,
            minHeight: 48,
            borderRadius: 14,
            border: "none",
            background: loading ? "#9CA3AF" : "#03164A",
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
          Forgot your password? Contact your TODA administrator.
        </div>
      </form>
    </div>
  );
}

/* ── Session bar shown once logged in ─────────────────────────────────────── */
function OperatorSessionBar({ onLogout }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#E7ECFB",
        borderBottom: "1px solid #D9D9D9",
        fontSize: 13,
        fontWeight: 600,
        color: "#052675",
        flexWrap: "wrap",
        gap: 8,
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
          color: "#052675",
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
  background: "#FBF4C6",
};

const inputStyle = {
  flex: 1,
  minWidth: 0,
  border: "none",
  outline: "none",
  background: "transparent",
  fontSize: 14,
  color: "#111111",
};
