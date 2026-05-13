import { TIERS } from "../data/tiers";

const STAGE_COLORS = {
  "Awakening":    "#8b7355",
  "Brewing":      "#9a6b4b",
  "Steaming":     "#a87c5c",
  "Pouring":      "#b68a6a",
  "Tasting":      "#c4956a",
  "Cultivating":  "#cd9e72",
  "Mastering":    "#d5a77a",
  "Refining":     "#dcb082",
  "Transcending": "#e3b98a",
  "Elevated":     "#eac292",
  "Prestige":     "#ffd700",
};

export default function TierMap({ currentTierId }) {
  const groupedByStage = TIERS.reduce((acc, tier) => {
    if (!acc[tier.stage]) acc[tier.stage] = [];
    acc[tier.stage].push(tier);
    return acc;
  }, {});

  const stages = Object.keys(groupedByStage);

  return (
    <div style={{
      background: "linear-gradient(145deg, #1a0f0a 0%, #1e1008 100%)",
      border: "1px solid #2c1810",
      borderRadius: 24, padding: "24px 22px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 18, fontWeight: 600, color: "#f5e6d3", margin: 0,
        }}>
          Tier Journey
        </h2>
        <span style={{ fontSize: 12, color: "#8b5e3c" }}>110 Tiers</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {stages.map(stageName => {
          const tiers = groupedByStage[stageName];
          const stageColor = STAGE_COLORS[stageName] || "#c4956a";
          const hasCurrentTier = tiers.some(t => t.id === currentTierId);
          const allPast = tiers.every(t => t.id < currentTierId);

          return (
            <div key={stageName} style={{
              background: hasCurrentTier ? "#2c1810" : "transparent",
              border: `1px solid ${hasCurrentTier ? "#3d2215" : "#1e1008"}`,
              borderRadius: 14, padding: "14px 16px",
              transition: "all 0.3s ease",
            }}>
              {/* Stage header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: allPast || hasCurrentTier ? stageColor : "#3d2215",
                  }} />
                  <span style={{
                    fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
                    fontWeight: 700,
                    color: allPast || hasCurrentTier ? stageColor : "#5a3a25",
                  }}>
                    {stageName}
                  </span>
                </div>
                <span style={{ fontSize: 10, color: "#5a3a25" }}>
                  Tier {tiers[0].id}–{tiers[tiers.length - 1].id}
                </span>
              </div>

              {/* Tier dots */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {tiers.map(tier => {
                  const isCurrent = tier.id === currentTierId;
                  const isPast = tier.id < currentTierId;

                  return (
                    <div
                      key={tier.id}
                      title={`${tier.id}. ${tier.name}`}
                      style={{
                        position: "relative",
                        width: isCurrent ? "auto" : 28, height: 28,
                        borderRadius: isCurrent ? 100 : 8,
                        background: isCurrent
                          ? `linear-gradient(135deg, ${stageColor}40, ${stageColor}20)`
                          : isPast ? "#2c1810" : "#1a0f0a",
                        border: `1px solid ${isCurrent ? stageColor : isPast ? "#3d2215" : "#2c1810"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        padding: isCurrent ? "0 10px" : 0,
                        boxShadow: isCurrent ? `0 0 10px ${stageColor}30` : "none",
                        cursor: "default",
                        flexShrink: 0,
                      }}
                    >
                      {isCurrent ? (
                        <span style={{ fontSize: 11, color: stageColor, fontWeight: 700, whiteSpace: "nowrap" }}>
                          {tier.name}
                        </span>
                      ) : (
                        <span style={{ fontSize: 9, color: isPast ? "#a07850" : "#3d2215", fontWeight: 600 }}>
                          {tier.id}
                        </span>
                      )}
                      {isPast && (
                        <div style={{
                          position: "absolute", inset: 0,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          borderRadius: 8,
                        }}>
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 4l2 2 3-3" stroke="#a07850" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
