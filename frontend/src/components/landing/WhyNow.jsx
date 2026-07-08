// src/components/landing/WhyNow.jsx
const TIMELINE = [
  { year: "2017", label: "PUV Modernization launched" },
  { year: "2020s", label: "Cooperatives formed" },
  { year: "Today", label: "Fleet visibility still missing" },
  { year: "Now", label: "BUSINA" },
];

export default function WhyNow() {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "inline-block",
          background: "#E7ECFB",
          color: "#052675",
          padding: "6px 18px",
          borderRadius: 999,
          fontSize: 13,
          fontWeight: 600,
          marginBottom: 16,
        }}
      >
        WHY NOW
      </div>
      <h2
        style={{
          fontSize: "clamp(28px, 6vw, 48px)",
          fontWeight: 800,
          color: "#111111",
          margin: "0 0 16px",
        }}
      >
        Modern vehicles arrived. The data never did.
      </h2>
      <p
        style={{
          maxWidth: 620,
          margin: "0 auto 40px",
          fontSize: 18,
          lineHeight: 1.7,
          color: "#64748B",
        }}
      >
        The PUV Modernization Program upgraded the fleet — but the digital
        infrastructure to manage it never followed.
      </p>

      <div
        className="why-now-row"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 0,
          flexWrap: "wrap",
        }}
      >
        {TIMELINE.map((t, i) => (
          <div
            key={t.year}
            className="why-now-item-wrap"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div
              className="why-now-item"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: 140,
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: i === TIMELINE.length - 1 ? "#FCA307" : "#052675",
                  marginBottom: 12,
                  boxShadow:
                    i === TIMELINE.length - 1
                      ? "0 0 0 6px rgba(252,163,7,.2)"
                      : "none",
                }}
              />
              <div style={{ fontWeight: 800, fontSize: 16, color: "#052675" }}>
                {t.year}
              </div>
              <div style={{ fontSize: 14, color: "#64748B", marginTop: 4 }}>
                {t.label}
              </div>
            </div>
            {i < TIMELINE.length - 1 && (
              <div
                className="why-now-connector"
                style={{
                  width: 60,
                  height: 2,
                  background: "#D9D9D9",
                  marginBottom: 40,
                }}
              />
            )}
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .why-now-row {
            flex-direction: column;
            align-items: center;
          }
          .why-now-item-wrap {
            flex-direction: column;
          }
          .why-now-item {
            min-width: 0 !important;
            margin-bottom: 4px;
          }
          .why-now-connector {
            width: 2px !important;
            height: 28px !important;
            margin-bottom: 4px !important;
          }
        }
      `}</style>
    </div>
  );
}
