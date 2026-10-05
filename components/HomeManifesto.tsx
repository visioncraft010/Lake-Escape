"use client";

import Image from "next/image";

export function HomeManifesto() {
  return (
    <section className="section-pad" style={{ background: "#faf6f0", color: "#1a0f0a" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.1fr",
          gap: "clamp(3rem, 6vw, 6rem)", alignItems: "center",
        }}>
          {/* Left: Editorial copy */}
          <div className="reveal">
            <p className="eyebrow-cinematic">The Lake</p>
            <h2 style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
              fontWeight: 400, fontStyle: "italic",
              letterSpacing: "-0.02em", lineHeight: 0.95,
              margin: "0 0 2rem",
            }}>
              Tehri is not a<br />
              destination. It is a<br />
              disappearance.
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px", fontWeight: 400,
              color: "rgba(26, 15, 10, 0.55)",
              lineHeight: 1.75, maxWidth: "360px",
              marginLeft: "20%",
            }}>
              800 metres above sea level, surrounded by the Garhwal Himalayas, the reservoir stretches 42 square kilometres of stillness.
            </p>
          </div>

          {/* Right: Full image */}
          <div className="reveal" style={{
            position: "relative",
            height: "clamp(360px, 50vw, 680px)",
            overflow: "hidden",
          }}>
            <Image
              src="/images/views/lake-view.JPG"
              alt="Tehri Lake panoramic view"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
