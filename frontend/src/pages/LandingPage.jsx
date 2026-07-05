// src/pages/LandingPage.jsx
import { useEffect, useState } from "react";
import { Radio, Cpu, Smartphone, BarChart3, Wrench } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/layout/Hero";
import Stats from "../components/landing/Stats";
import Features from "../components/landing/Features";
import businaIcon from "../assets/busina-icon-transparent.png";

export default function LandingPage({ setActiveView }) {
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        overflowX: "hidden",
        background:
          "linear-gradient(180deg,#FAFAFA 0%,#F6F7F9 40%,#FFFFFF 100%)",
        position: "relative",
      }}
    >
      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: 24,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            background: "#111111",
            color: "white",
            padding: "12px 24px",
            borderRadius: 14,
            fontSize: 14,
            fontWeight: 500,
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            animation: "fadeInDown 0.3s ease",
          }}
        >
          <Wrench
            size={15}
            style={{ display: "inline", marginRight: 6, verticalAlign: -2 }}
          />
          {toast}
          <style>{`@keyframes fadeInDown{from{opacity:0;transform:translateX(-50%) translateY(-10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
        </div>
      )}

      {/* Background glows */}
      <div
        style={{
          position: "fixed",
          top: -220,
          right: -180,
          width: 620,
          height: 620,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(59,234,76,.18),transparent 70%)",
          filter: "blur(80px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: -260,
          left: -220,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(59,234,76,.10),transparent 70%)",
          filter: "blur(100px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <FloatingCircle size={120} top="18%" left="6%" delay={0} opacity={0.1} />
      <FloatingCircle
        size={70}
        top="58%"
        right="12%"
        delay={2}
        opacity={0.14}
      />
      <FloatingCircle
        size={48}
        bottom="18%"
        left="28%"
        delay={4}
        opacity={0.12}
      />

      {/* Navbar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          background: "rgba(255,255,255,.72)",
          borderBottom: "1px solid rgba(226,232,240,.55)",
        }}
      >
        <Navbar />
      </div>

      <main style={{ position: "relative", zIndex: 2, width: "100%" }}>
        {/* Hero */}
        <section
          style={{
            maxWidth: 1550,
            margin: "0 auto",
            padding: "40px 6% 30px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition: "1s",
          }}
        >
          <Hero
            setActiveView={setActiveView}
            onDemoClick={() => showToast("Feature coming in a future update")}
          />
        </section>

        {/* Glass Banner */}
        <section style={{ maxWidth: 1450, margin: "0 auto", padding: "0 8%" }}>
          <GlassBanner />
        </section>

        {/* Stats */}
        <section
          style={{ maxWidth: 1500, margin: "50px auto", padding: "0 8%" }}
        >
          <Stats />
        </section>

        {/* Features */}
        <section
          style={{ maxWidth: 1500, margin: "70px auto", padding: "0 8%" }}
        >
          <Features />
        </section>

        {/* How It Works */}
        <section
          style={{ maxWidth: 1100, margin: "0 auto 80px", padding: "0 8%" }}
        >
          <HowItWorks />
        </section>

        {/* About Us */}
        <section
          style={{ maxWidth: 1100, margin: "0 auto 100px", padding: "0 8%" }}
        >
          <AboutUs />
        </section>

        {/* Footer */}
        <footer
          style={{
            marginTop: 60,
            padding: "60px 8%",
            borderTop: "1px solid #D9D9D9",
            background: "linear-gradient(180deg,#FFFFFF,#F6F7F9)",
          }}
        >
          <div
            style={{
              maxWidth: 1450,
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 30,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontWeight: 800,
                  fontSize: 28,
                  color: "#111111",
                }}
              >
                <img
                  src={businaIcon}
                  alt="BUSINA logo"
                  style={{ width: 34, height: 34, objectFit: "contain" }}
                />
                BUSINA
              </div>
              <div
                style={{
                  marginTop: 12,
                  color: "#64748B",
                  lineHeight: 1.7,
                  maxWidth: 420,
                }}
              >
                Intelligent Public Transportation Monitoring &amp; Passenger
                Assistance System powered by real-time GPS, AI analytics and
                live fleet management.
              </div>
            </div>
            <div style={{ textAlign: "right", color: "#64748B" }}>
              <div
                style={{ fontWeight: 700, color: "#111111", marginBottom: 10 }}
              >
                BUSINA Platform
              </div>
              <div>Real-time Fleet Monitoring</div>
              <div>AI Decision Support</div>
              <div>Passenger ETA Prediction</div>
              <div style={{ marginTop: 22, fontSize: 13, opacity: 0.7 }}>
                © 2026 BUSINA by ALT-F4. All rights reserved.
              </div>
              <div style={{ fontSize: 13, opacity: 0.7 }}></div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

/* ── How It Works ─────────────────────────────────────────────────────────── */
const HOW_STEPS = [
  {
    icon: <Radio size={30} color="#2E9E3D" />,
    title: "GPS Data Captured",
    body: "Each jeepney broadcasts its real-time GPS position via MQTT every few seconds.",
  },
  {
    icon: <Cpu size={30} color="#2E9E3D" />,
    title: "AI Processes the Feed",
    body: "Our backend normalises position data, detects bunching & delays, and calculates ETAs.",
  },
  {
    icon: <Smartphone size={30} color="#2E9E3D" />,
    title: "Commuters Get Updates",
    body: "Riders see live vehicle positions and accurate arrival times on their phone.",
  },
  {
    icon: <BarChart3 size={30} color="#2E9E3D" />,
    title: "Operators Stay in Control",
    body: "Fleet managers get a live dashboard with alerts, demand hotspots, and dispatch recommendations.",
  },
];

function HowItWorks() {
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div
          style={{
            display: "inline-block",
            background: "#E9FBEA",
            color: "#2E9E3D",
            padding: "6px 18px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          HOW IT WORKS
        </div>
        <h2
          style={{ fontSize: 32, fontWeight: 800, color: "#111111", margin: 0 }}
        >
          From GPS ping to your screen in seconds
        </h2>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 24,
        }}
      >
        {HOW_STEPS.map((step, i) => (
          <div
            key={i}
            style={{
              background: "white",
              borderRadius: 20,
              padding: 28,
              border: "1px solid #D9D9D9",
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#E9FBEA",
                color: "#2E9E3D",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 13,
              }}
            >
              {i + 1}
            </div>
            <div style={{ marginBottom: 14 }}>{step.icon}</div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 16,
                color: "#111111",
                marginBottom: 8,
              }}
            >
              {step.title}
            </div>
            <div style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6 }}>
              {step.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── About Us ─────────────────────────────────────────────────────────────── */
function AboutUs() {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 28,
        padding: "52px 48px",
        border: "1px solid #D9D9D9",
        boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
        display: "flex",
        gap: 48,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <div style={{ flex: "1 1 320px" }}>
        <div
          style={{
            display: "inline-block",
            background: "#E9FBEA",
            color: "#2E9E3D",
            padding: "6px 18px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 20,
          }}
        >
          ABOUT US
        </div>
        <h2
          style={{
            fontSize: 30,
            fontWeight: 800,
            color: "#111111",
            margin: "0 0 18px",
          }}
        >
          Built for Filipino commuters, by Filipino students
        </h2>
        <p
          style={{
            color: "#64748B",
            lineHeight: 1.8,
            margin: "0 0 16px",
            fontSize: 15,
          }}
        >
          BUSINA started as a hackathon project with one goal: make jeepney
          routes predictable. We combined real-time GPS tracking, Socket.IO live
          updates, and AI-assisted dispatch to give both commuters and operators
          the visibility they've never had.
        </p>
        <p
          style={{
            color: "#64748B",
            lineHeight: 1.8,
            margin: "0 0 28px",
            fontSize: 15,
          }}
        >
          We believe public infrastructure data should be public.
        </p>
      </div>
      <div
        style={{
          flex: "1 1 240px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        {[
          { label: "Team Members", value: "4" },
          { label: "Routes Tracked", value: "5" },
          { label: "Vehicles Live", value: "8" },
          { label: "Built in", value: "200hrs" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "#F6F7F9",
              borderRadius: 16,
              padding: 20,
              textAlign: "center",
              border: "1px solid #D9D9D9",
            }}
          >
            <div
              className="font-numeric"
              style={{ fontSize: 28, color: "#2E9E3D" }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Glass Banner ─────────────────────────────────────────────────────────── */
function GlassBanner() {
  return (
    <div
      style={{
        borderRadius: 32,
        padding: "26px 36px",
        background: "rgba(255,255,255,.72)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,.5)",
        boxShadow: "0 24px 70px rgba(17,17,17,.08)",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 30,
      }}
    >
      <Metric title="Fleet Status" value="LIVE" color="#3BEA4C" />
      <Metric title="GPS Updates" value="Real-Time" color="#2E9E3D" />
      <Metric title="Analytics" value="AI Enabled" color="#FFD93B" />
      <Metric title="Platform" value="Online" color="#FF8A1D" />
    </div>
  );
}

function Metric({ title, value, color }) {
  return (
    <div>
      <div style={{ color: "#64748B", fontSize: 13, marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 18px ${color}`,
            animation: "pulse 2s infinite",
          }}
        />
        <div
          className="font-numeric"
          style={{ fontSize: 20, color: "#111111" }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function FloatingCircle({ size, top, left, right, bottom, delay, opacity }) {
  return (
    <>
      <div
        style={{
          position: "fixed",
          width: size,
          height: size,
          borderRadius: "50%",
          background: "#2E9E3D",
          opacity,
          top,
          left,
          right,
          bottom,
          filter: "blur(2px)",
          animation: `float 8s ease-in-out infinite`,
          animationDelay: `${delay}s`,
          pointerEvents: "none",
        }}
      />
      <style>{`
        @keyframes float{0%{transform:translateY(0)}50%{transform:translateY(-20px)}100%{transform:translateY(0)}}
        @keyframes pulse{0%{transform:scale(1);opacity:.7}50%{transform:scale(1.35);opacity:1}100%{transform:scale(1);opacity:.7}}
      `}</style>
    </>
  );
}
