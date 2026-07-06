// src/pages/LandingPage.jsx
import { useEffect, useState } from "react";
import { Radio, Cpu, Smartphone, BarChart3, Wrench } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/layout/Hero";
import Stats from "../components/landing/Stats";
import ProblemSpace from "../components/landing/ProblemSpace";
import Features from "../components/landing/Features";
import businaIcon from "../assets/busina-icon-transparent.png";
import Reveal from "../components/ui/Reveal";

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
          "linear-gradient(180deg,#FAFAFA 0%,#FBF4C6 40%,#FFFFFF 100%)",
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

      {/* Background glows – navy + coral */}
      <div
        style={{
          position: "fixed",
          top: -220,
          right: -180,
          width: 620,
          height: 620,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(5,38,117,0.15),transparent 70%)",
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
            "radial-gradient(circle,rgba(253,72,71,0.10),transparent 70%)",
          filter: "blur(100px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <FloatingCircle
        size={120}
        top="18%"
        left="6%"
        delay={0}
        opacity={0.08}
        color="#052675"
      />
      <FloatingCircle
        size={70}
        top="58%"
        right="12%"
        delay={2}
        opacity={0.12}
        color="#FCA307"
      />
      <FloatingCircle
        size={48}
        bottom="18%"
        left="28%"
        delay={4}
        opacity={0.1}
        color="#FD4847"
      />

      {/* Navbar – now passes setActiveView for the toggle */}
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
        <Navbar setActiveView={setActiveView} currentView="commuter" />
      </div>

      <main style={{ position: "relative", zIndex: 2, width: "100%" }}>
        {/* Glass Banner – moved ABOVE the Hero */}
        <section
          style={{ maxWidth: 1450, margin: "0 auto", padding: "20px 8% 0" }}
        >
          <GlassBanner />
        </section>

        {/* Hero */}
        <section
          style={{
            maxWidth: 1550,
            margin: "0 auto",
            padding: "20px 6% 20px",
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

        {/* Stats */}
        <section
          style={{ maxWidth: 1500, margin: "36px auto", padding: "0 8%" }}
        >
          <Reveal>
            <Stats />
          </Reveal>
        </section>

        {/* The Problem */}
        <section
          style={{ maxWidth: 1500, margin: "50px auto", padding: "0 8%" }}
        >
          <Reveal>
            <ProblemSpace />
          </Reveal>
        </section>

        {/* How BUSINA Solves It – localized inside this file */}
        <section
          style={{ maxWidth: 1100, margin: "50px auto 56px", padding: "0 8%" }}
        >
          <Reveal delay={100}>
            <HowItWorks />
          </Reveal>
        </section>

        {/* Features */}
        <section
          style={{ maxWidth: 1500, margin: "0 auto 56px", padding: "0 8%" }}
        >
          <Reveal delay={100}>
            <Features />
          </Reveal>
        </section>

        {/* About the Team */}
        <section
          style={{ maxWidth: 1100, margin: "0 auto 70px", padding: "0 8%" }}
        >
          <Reveal delay={100}>
            <AboutUs />
          </Reveal>
        </section>

        {/* Footer */}
        <footer
          style={{
            marginTop: 60,
            padding: "60px 8%",
            borderTop: "1px solid #D9D9D9",
            background: "linear-gradient(180deg,#FFFFFF,#FBF4C6)",
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

/* ── How It Works (localized) ────────────────────────────────────────── */
const HOW_STEPS = [
  {
    icon: <Radio size={28} color="#052675" />,
    title: "Nagpadala ng location ang sasakyan",
    body: "Bawat jeepney ay nagbabahagi ng kanyang lokasyon bawat ilang segundo — walang kailangang gawin ang driver.",
    tag: "GPS",
  },
  {
    icon: <Cpu size={28} color="#052675" />,
    title: "Pinaplano ng BUSINA ang pagdating",
    body: "Ang live na posisyon plus trapiko ay nagiging ETA na maaari mong pagkatiwalaan.",
    tag: "AI",
  },
  {
    icon: <Smartphone size={28} color="#052675" />,
    title: "Nakikita ng pasahero ang ETA",
    body: "Tingnan ng mga sakay ang app at alamin kung maghihintay, lalakad, o ibang ruta ang pipiliin.",
    tag: "Mobile",
  },
  {
    icon: <BarChart3 size={28} color="#052675" />,
    title: "Nag-aalert ang operator",
    body: "Ang mga pagkaantala, pagsisikip, at demand spikes ay lumalabas sa dashboard bago pa magreklamo ang mga pasahero.",
    tag: "Alert",
  },
];

function HowItWorks() {
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div
          style={{
            display: "inline-block",
            background: "#E7ECFB",
            color: "#052675",
            padding: "6px 18px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 14,
          }}
        >
          PAANO ITO GUMAGANA
        </div>
        <h2
          style={{
            fontSize: "clamp(28px, 3vw, 36px)",
            fontWeight: 800,
            color: "#111111",
            margin: 0,
          }}
        >
          Mula GPS ping hanggang sa screen mo sa loob ng ilang segundo
        </h2>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
        }}
        className="how-it-works-grid"
      >
        {HOW_STEPS.map((step, i) => (
          <div
            key={i}
            style={{
              background: "white",
              borderRadius: 18,
              padding: 24,
              border: "1px solid #D9D9D9",
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
              position: "relative",
              transition:
                "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 18px 36px rgba(5,38,117,0.12)";
              e.currentTarget.style.borderColor = "#052675";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.04)";
              e.currentTarget.style.borderColor = "#D9D9D9";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "#E7ECFB",
                color: "#052675",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 12,
              }}
            >
              {i + 1}
            </div>
            <div style={{ marginBottom: 12 }}>{step.icon}</div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 15,
                color: "#111111",
                marginBottom: 6,
              }}
            >
              {step.title}
            </div>
            <div
              style={{
                fontSize: 14,
                color: "#64748B",
                lineHeight: 1.6,
                marginBottom: 10,
              }}
            >
              {step.body}
            </div>
            <div
              style={{
                display: "inline-block",
                background: "#E7ECFB",
                color: "#052675",
                padding: "2px 12px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              {step.tag}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 640px) {
          .how-it-works-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ── About Us ──────────────────────────────────────────────────────────── */
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
            background: "#E7ECFB",
            color: "#052675",
            padding: "6px 18px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 20,
          }}
        >
          TUNGKOL SA AMIN
        </div>
        <h2
          style={{
            fontSize: 30,
            fontWeight: 800,
            color: "#111111",
            margin: "0 0 18px",
          }}
        >
          Binuo para sa mga Pilipinong commuter, ng mga Pilipinong estudyante
        </h2>
        <p
          style={{
            color: "#64748B",
            lineHeight: 1.8,
            margin: "0 0 16px",
            fontSize: 15,
          }}
        >
          Nagsimula ang BUSINA bilang isang hackathon project na may iisang
          layunin: gawing predictable ang mga ruta ng jeepney. Pinagsama namin
          ang real‑time GPS tracking, Socket.IO live updates, at AI‑assisted
          dispatch upang bigyan ang parehong commuter at operator ng visibility
          na hindi pa nila naranasan.
        </p>
        <p
          style={{
            color: "#64748B",
            lineHeight: 1.8,
            margin: "0 0 28px",
            fontSize: 15,
          }}
        >
          Naniniwala kami na ang data ng pampublikong imprastraktura ay dapat
          maging publiko.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {[
            {
              name: "AI & Data",
              github: "https://github.com/christopher-cresencio",
              linkedin:
                "https://www.linkedin.com/in/christopher-cresencio-b10395418/",
            },
            {
              name: "Backend",
              github: "https://github.com/rainieljerez",
              linkedin: "https://linkedin.com/",
            },
            {
              name: "Frontend",
              github: "https://github.com/",
              linkedin:
                "https://www.linkedin.com/in/jhon-rey-oquendo-105504370/",
            },
            {
              name: "Hardware",
              github: "https://github.com/Mrutotman",
              linkedin:
                "https://www.linkedin.com/in/red-colby-dumdum-9579a4395",
            },
          ].map((member) => (
            <div
              key={member.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#F6F7F9",
                border: "1px solid #D9D9D9",
                borderRadius: 999,
                padding: "6px 8px 6px 14px",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111111" }}>
                {member.name}
              </span>
              <a
                href={member.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${member.name} GitHub`}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "white",
                  border: "1px solid #D9D9D9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#111111",
                }}
              >
                <GithubIcon size={13} />
              </a>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={`${member.name} LinkedIn`}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "white",
                  border: "1px solid #D9D9D9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#052675",
                }}
              >
                <LinkedinIcon size={13} />
              </a>
            </div>
          ))}
        </div>
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
          { label: "Built in", value: "7 days" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "#F6F7F9",
              borderRadius: 16,
              padding: 20,
              textAlign: "center",
              border: "1px solid #D9D9D9",
              transition:
                "transform .25s ease, box-shadow .25s ease, background .25s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 14px 28px rgba(5,38,117,0.15)";
              e.currentTarget.style.background = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.background = "#F6F7F9";
            }}
          >
            <div
              className="font-numeric"
              style={{ fontSize: 28, color: "#052675" }}
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

/* ── Glass Banner ──────────────────────────────────────────────────────── */
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
      <Metric title="Fleet Status" value="LIVE" color="#FD4847" />
      <Metric title="GPS Updates" value="Real-Time" color="#052675" />
      <Metric title="Analytics" value="AI Enabled" color="#FCA307" />
      <Metric title="Platform" value="Online" color="#052675" />
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
          className="busina-live-dot"
          style={{
            width: 12,
            height: 12,
            background: color,
            boxShadow: `0 0 18px ${color}`,
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

/* ── Floating Circles ──────────────────────────────────────────────────── */
function FloatingCircle({
  size,
  top,
  left,
  right,
  bottom,
  delay,
  opacity,
  color,
}) {
  return (
    <>
      <div
        style={{
          position: "fixed",
          width: size,
          height: size,
          borderRadius: "50%",
          background: color || "#052675",
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
      `}</style>
    </>
  );
}

/* ── Inline brand icons ────────────────────────────────────────────────── */
function GithubIcon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55A10.51 10.51 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5z" />
    </svg>
  );
}

function LinkedinIcon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}
