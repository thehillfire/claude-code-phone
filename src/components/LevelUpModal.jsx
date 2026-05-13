import { useEffect, useRef } from "react";

export default function LevelUpModal({ event, onDismiss }) {
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(onDismiss, 4200);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!event) return null;

  return (
    <div
      onClick={onDismiss}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(15, 10, 8, 0.85)",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(8px)",
        animation: "fadeIn 0.3s ease",
      }}
    >
      <div
        ref={ref}
        onClick={e => e.stopPropagation()}
        style={{
          background: "linear-gradient(145deg, #2c1810 0%, #1a0f0a 100%)",
          border: "1px solid #8b5e3c",
          borderRadius: 28, padding: "48px 40px",
          textAlign: "center", maxWidth: 340,
          boxShadow: "0 0 60px rgba(196, 149, 106, 0.2), 0 0 120px rgba(196, 149, 106, 0.05)",
          animation: "levelUp 0.5s ease",
        }}
      >
        {event.tierAdvance ? (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✨</div>
            <div style={{
              fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase",
              color: "#a07850", marginBottom: 8,
            }}>
              Tier Advanced
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 32, fontWeight: 700, color: "#f5e6d3",
              margin: "0 0 8px",
            }}>
              {event.newTier?.name}
            </h2>
            <p style={{ color: "#8b5e3c", fontSize: 14, fontStyle: "italic", margin: "0 0 24px" }}>
              {event.newTier?.description}
            </p>
            <div style={{
              background: "#3d2215", borderRadius: 100, padding: "8px 20px",
              display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ fontSize: 12, color: "#a07850" }}>Stage:</span>
              <span style={{ fontSize: 12, color: "#c4956a", fontWeight: 600 }}>
                {event.newTier?.stage}
              </span>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 40, marginBottom: 16 }}>☕</div>
            <div style={{
              fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase",
              color: "#a07850", marginBottom: 8,
            }}>
              Level Up
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 56, fontWeight: 700, color: "#c4956a",
              margin: "0 0 4px", lineHeight: 1,
            }}>
              {event.to}
            </h2>
            <p style={{ color: "#8b5e3c", fontSize: 14, margin: 0 }}>
              Keep the ritual alive
            </p>
          </>
        )}

        <div style={{
          marginTop: 28, fontSize: 11, color: "#5a3a25",
        }}>
          Tap anywhere to continue
        </div>
      </div>
    </div>
  );
}
