// src/pages/LandingPage.jsx
import { useEffect, useState } from "react";
import { Radio, Cpu, Smartphone, BarChart3, Wrench } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/layout/Hero";
import Stats from "../components/landing/Stats";
import ProblemSpace from "../components/landing/ProblemSpace";
import Features from "../components/landing/Features";
import WhyNow from "../components/landing/WhyNow";
import WhyOthersFail from "../components/landing/WhyOthersFail";
import ExperienceTeaser from "../components/landing/ExperienceTeaser";
import Impact from "../components/landing/Impact";
import BusinessModel from "../components/landing/BusinessModel";
import Validation from "../components/landing/Validation";
import FinalCTA from "../components/landing/FinalCTA";
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
            "radial-gradient(circle,rgba(5,38,117,.18),transparent 70%)",
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
            "radial-gradient(circle,rgba(5,38,117,.10),transparent 70%)",
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
        <Navbar setActiveView={setActiveView} currentView="landing" />
      </div>

      <main style={{ position: "relative", zIndex: 2, width: "100%" }}>
        {/* NOTE: GlassBanner (LIVE / Real-Time / AI Enabled / Online chips)
            has been intentionally removed per Phase 1 audit — those chips
            communicated nothing concrete to judges. Hero now carries a
            proof strip with real numbers instead (see ProofStrip inside
            Hero.jsx). */}

        {/* Hero — includes the live map, proof strip, and audience strip */}
        <section
          style={{
            maxWidth: 1550,
            margin: "0 auto",
            padding: "28px 6% 20px",
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

        {/* Live Overview stats */}
        <section
          id="live-overview"
          style={{
            maxWidth: 1500,
            margin: "48px auto",
            padding: "0 8%",
            scrollMarginTop: 110,
          }}
        >
          <Reveal>
            <Stats />
          </Reveal>
        </section>

        {/* The Problem */}
        <section
          id="the-problem"
          style={{
            maxWidth: 1500,
            margin: "48px auto",
            padding: "0 8%",
            scrollMarginTop: 110,
          }}
        >
          <Reveal>
            <ProblemSpace />
          </Reveal>
        </section>

        {/* Why Now — timeline, right after the problem per Phase 5 */}
        <section
          id="why-now"
          style={{
            maxWidth: 1300,
            margin: "48px auto",
            padding: "0 8%",
            scrollMarginTop: 110,
          }}
        >
          <Reveal delay={50}>
            <WhyNow />
          </Reveal>
        </section>

        {/* Why Existing Solutions Fail */}
        <section
          id="why-others-fail"
          style={{
            maxWidth: 1400,
            margin: "48px auto",
            padding: "0 8%",
            scrollMarginTop: 110,
          }}
        >
          <Reveal delay={50}>
            <WhyOthersFail />
          </Reveal>
        </section>

        {/* How BUSINA Solves It */}
        <section
          id="how-it-works"
          style={{
            maxWidth: 1100,
            margin: "48px auto",
            padding: "0 8%",
            scrollMarginTop: 110,
          }}
        >
          <Reveal delay={100}>
            <HowItWorks />
          </Reveal>
        </section>

        {/* Experience BUSINA — teaser panels routing into the real Commuter/Operator pages */}
        <section
          id="experience"
          style={{
            maxWidth: 1300,
            margin: "48px auto",
            padding: "0 8%",
            scrollMarginTop: 110,
          }}
        >
          <Reveal delay={100}>
            <ExperienceTeaser setActiveView={setActiveView} />
          </Reveal>
        </section>

        {/* Impact — outcomes, dark blue chapter */}
        <section
          id="impact"
          style={{
            maxWidth: 1400,
            margin: "48px auto",
            padding: "0 8%",
            scrollMarginTop: 110,
          }}
        >
          <Reveal delay={100}>
            <Impact />
          </Reveal>
        </section>

        {/* Business Model */}
        <section
          id="business-model"
          style={{
            maxWidth: 1100,
            margin: "48px auto",
            padding: "0 8%",
            scrollMarginTop: 110,
          }}
        >
          <Reveal delay={100}>
            <BusinessModel />
          </Reveal>
        </section>

        {/* Validation */}
        <section
          id="validation"
          style={{
            maxWidth: 1100,
            margin: "48px auto",
            padding: "0 8%",
            scrollMarginTop: 110,
          }}
        >
          <Reveal delay={100}>
            <Validation />
          </Reveal>
        </section>

        {/* Features */}
        <section
          id="everything-you-need"
          style={{
            maxWidth: 1500,
            margin: "0 auto 48px",
            padding: "0 8%",
            scrollMarginTop: 110,
          }}
        >
          <Reveal delay={100}>
            <Features />
          </Reveal>
        </section>

        {/* About the Team */}
        <section
          id="about-us"
          style={{
            maxWidth: 1100,
            margin: "0 auto 48px",
            padding: "0 8%",
            scrollMarginTop: 110,
          }}
        >
          <Reveal delay={100}>
            <AboutUs />
          </Reveal>
        </section>

        {/* Final CTA — three equal buttons */}
        <section
          id="final-cta"
          style={{
            maxWidth: 1100,
            margin: "0 auto 70px",
            padding: "0 8%",
          }}
        >
          <Reveal delay={100}>
            <FinalCTA setActiveView={setActiveView} />
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
                The future of Philippine public transport starts with one
                visible jeepney.
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
    icon: <Radio size={30} color="#03164A" />,
    title: "Vehicle sends its location",
    body: "Every jeepney shares where it is, every few seconds — no driver action needed.",
  },
  {
    icon: <Cpu size={30} color="#03164A" />,
    title: "BUSINA predicts arrival",
    body: "Live position plus traffic conditions turn into an ETA you can actually trust.",
  },
  {
    icon: <Smartphone size={30} color="#03164A" />,
    title: "Passengers see the ETA",
    body: "Riders check the app and know whether to wait, walk, or pick another route.",
  },
  {
    icon: <BarChart3 size={30} color="#03164A" />,
    title: "Operators get the alert",
    body: "Delays, bunching, and demand spikes surface on the dashboard before commuters complain.",
  },
];

function HowItWorks() {
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div
          style={{
            display: "inline-block",
            background: "#E7ECFB",
            color: "#03164A",
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
          style={{
            fontSize: "clamp(28px, 6vw, 48px)",
            fontWeight: 800,
            color: "#111111",
            margin: 0,
          }}
        >
          From GPS ping to your screen in seconds
        </h2>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 24,
        }}
        className="how-it-works-grid"
      >
        {HOW_STEPS.map((step, i) => (
          <div
            key={i}
            className="hover-lift"
            style={{
              background: "white",
              borderRadius: 24,
              padding: 32,
              border: "1px solid #D9D9D9",
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
              position: "relative",
              cursor: "default",
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
                background: "#E7ECFB",
                color: "#03164A",
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
                fontSize: 26,
                color: "#111111",
                marginBottom: 8,
              }}
            >
              {step.title}
            </div>
            <div style={{ fontSize: 18, color: "#64748B", lineHeight: 1.6 }}>
              {step.body}
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

/* ── About Us ─────────────────────────────────────────────────────────────── */
function AboutUs() {
  return (
    <div
      className="about-us-card"
      style={{
        background: "white",
        borderRadius: 28,
        padding: "clamp(28px, 6vw, 64px) clamp(20px, 5vw, 48px)",
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
            color: "#03164A",
            padding: "6px 18px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 20,
          }}
        >
          BUILT BY COMMUTERS
        </div>
        <h2
          style={{
            fontSize: "clamp(28px, 6vw, 48px)",
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
            fontSize: 18,
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
            fontSize: 18,
          }}
        >
          We believe public infrastructure data should be public.
        </p>

        {/* Team links — replace the href placeholders below with each
            member's real GitHub/LinkedIn URLs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {[
            {
              name: "AI and Data",
              github: "https://github.com/christopher-cresencio",
              linkedin:
                "https://www.linkedin.com/in/christopher-cresencio-b10395418",
            },
            {
              name: "Backend",
              github: "https://github.com/rainieljerez",
              linkedin:
                "https://www.linkedin.com/in/joaqui-rainiel-jerez-605490420",
            },
            {
              name: "Frontend",
              github: "https://github.com/jhonristh",
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
                background: "#FBF4C6",
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
                rel="noopener noreferrer"
                aria-label={`${member.name} GitHub`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "white",
                  color: "#111111",
                }}
              >
                <GithubIcon size={13} />
              </a>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} LinkedIn`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "white",
                  color: "#0A66C2",
                }}
              >
                <LinkedinIcon size={13} />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Quick facts panel */}
      <div
        style={{
          flex: "1 1 260px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 14,
        }}
      >
        {[
          { value: "4", label: "Team Members" },
          { value: "5", label: "Routes Tracked" },
          { value: "8", label: "Vehicles Live" },
          { value: "200hrs", label: "Built In" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "#FBF4C6",
              borderRadius: 18,
              padding: "18px 14px",
              textAlign: "center",
            }}
          >
            <div
              className="font-numeric"
              style={{ fontSize: 26, fontWeight: 800, color: "#052675" }}
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

function FloatingCircle({ size, top, left, right, bottom, delay, opacity }) {
  return (
    <>
      <div
        style={{
          position: "fixed",
          width: size,
          height: size,
          borderRadius: "50%",
          background: "#03164A",
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

/* ── Inline brand icons ───────────────────────────────────────────────────
   lucide-react deprecated logo/brand icons (GitHub, LinkedIn, etc.) since
   they're trademarked marks, not generic icons — so these are plain inline
   SVGs instead of a lucide import, immune to future package version churn. */
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
