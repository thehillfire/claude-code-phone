import { TIERS } from "../data/tiers";

export default function StatsBar({ totalXp, streak, tierId, level }) {
  const tiersUnlocked = tierId;
  const percentComplete = ((tierId - 1) * 100 + level) / (110 * 100) * 100;

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
      gap: 12,
    }}>
      {[
        { label: "Total XP",        value: totalXp.toLocaleString(), icon: "⚡" },
        { label: "Day Streak",       value: `${streak} days`,         icon: "🔥" },
        { label: "Tiers Reached",    value: `${tiersUnlocked}/110`,   icon: "🏆" },
        { label: "Journey Complete", value: `${percentComplete.toFixed(2)}%`, icon: "🗺️" },
      ].map(s => (
        <div key={s.label} style={{
          background: "#1a0f0a",
          border: "1px solid #2c1810",
          borderRadius: 16, padding: "14px 16px",
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
            <span style={{ fontSize: 14 }}>{s.icon}</span>
            <span style={{ fontSize: 10, color: "#5a3a25", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {s.label}
            </span>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#c4956a", lineHeight: 1 }}>
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}
