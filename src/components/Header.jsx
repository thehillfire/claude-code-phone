export default function Header({ currentTier }) {
  return (
    <header style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "18px 24px",
      borderBottom: "1px solid #2c1810",
      background: "#0f0a0880",
      backdropFilter: "blur(12px)",
      position: "sticky", top: 0, zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: "linear-gradient(135deg, #3d2215, #2c1810)",
          border: "1px solid #8b5e3c",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16,
        }}>
          ☕
        </div>
        <div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 16, fontWeight: 700, color: "#f5e6d3",
            letterSpacing: "0.02em",
            lineHeight: 1,
          }}>
            Elevated Espresso
          </div>
          <div style={{ fontSize: 10, color: "#5a3a25", letterSpacing: "0.1em" }}>
            HABIT ELEVATION SYSTEM
          </div>
        </div>
      </div>

      {/* Current tier badge */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "#2c1810", border: "1px solid #3d2215",
        borderRadius: 100, padding: "6px 14px",
      }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          background: currentTier.color,
          boxShadow: `0 0 6px ${currentTier.color}80`,
        }} />
        <span style={{ fontSize: 12, color: "#f5e6d3", fontWeight: 500 }}>
          {currentTier.name}
        </span>
      </div>
    </header>
  );
}
