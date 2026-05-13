import ProgressRing from "./ProgressRing";
import { TIERS } from "../data/tiers";

export default function TierCard({ currentTier, level, levelProgress, tierProgress, streak, dailyXp, maxDailyXp }) {
  const nextTier = TIERS.find(t => t.id === currentTier.id + 1);
  const isPrestige = currentTier.stage === "Prestige";

  return (
    <div style={{
      background: "linear-gradient(145deg, #1e1008 0%, #2c1810 100%)",
      border: "1px solid #3d2215",
      borderRadius: 24,
      padding: "32px 28px",
      position: "relative",
      overflow: "hidden",
    }} className="glow-sm fade-in">
      {/* Background glow blob */}
      <div style={{
        position: "absolute", top: -60, right: -60,
        width: 200, height: 200,
        background: `radial-gradient(circle, ${currentTier.color}20 0%, transparent 70%)`,
        borderRadius: "50%",
        pointerEvents: "none",
      }} />

      {/* Stage badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        background: "#3d221580", border: "1px solid #5c3320",
        borderRadius: 100, padding: "4px 12px",
        marginBottom: 20,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: currentTier.color, display: "inline-block" }} />
        <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a07850", fontWeight: 600 }}>
          Stage: {currentTier.stage}
        </span>
      </div>

      {/* Main content */}
      <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
        {/* Ring */}
        <ProgressRing progress={level / 100} size={160} strokeWidth={8} color={currentTier.color}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 42, fontWeight: 700,
            color: currentTier.color,
            lineHeight: 1,
          }}>
            {level}
          </span>
          <span style={{ fontSize: 11, color: "#a07850", letterSpacing: "0.08em", marginTop: 2 }}>
            LEVEL
          </span>
        </ProgressRing>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 11, color: "#a07850", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
            Tier {currentTier.id} of 110
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 28, fontWeight: 600,
            color: "#f5e6d3", margin: "0 0 6px",
            lineHeight: 1.2,
          }}>
            {currentTier.name}
          </h1>
          <p style={{ fontSize: 13, color: "#8b5e3c", margin: "0 0 20px", fontStyle: "italic" }}>
            {currentTier.description}
          </p>

          {/* Tier progress bar */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: "#a07850" }}>Tier progress</span>
              <span style={{ fontSize: 11, color: currentTier.color }}>{level} / 100</span>
            </div>
            <div style={{ background: "#3d2215", borderRadius: 100, height: 6, overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 100,
                background: `linear-gradient(90deg, ${currentTier.color}90, ${currentTier.color})`,
                width: `${level}%`,
                transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
              }} />
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Stat label="Streak" value={`${streak}d`} color="#c4956a" />
            <Stat label="Today's XP" value={`${dailyXp}/${maxDailyXp}`} color="#c4956a" />
            {nextTier && (
              <Stat label="Next Tier" value={nextTier.name} color="#8b5e3c" small />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color, small }) {
  return (
    <div style={{
      background: "#2c1810", border: "1px solid #3d2215",
      borderRadius: 10, padding: "8px 12px",
      minWidth: small ? "auto" : 72,
    }}>
      <div style={{ fontSize: 10, color: "#a07850", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: small ? 12 : 18, fontWeight: 600, color, lineHeight: 1 }}>{value}</div>
    </div>
  );
}
