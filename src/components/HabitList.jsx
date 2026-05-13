import { ALL_HABITS, HABIT_CATEGORIES } from "../data/habits";

const CATEGORY_COLORS = {
  [HABIT_CATEGORIES.DIET]:     { bg: "#1a2b1a", border: "#2d4a2d", accent: "#6aaa6a", icon: "#4a8a4a" },
  [HABIT_CATEGORIES.FITNESS]:  { bg: "#1a1a2b", border: "#2d2d4a", accent: "#6a6aaa", icon: "#4a4a8a" },
  [HABIT_CATEGORIES.MINDSET]:  { bg: "#2b1a2a", border: "#4a2d49", accent: "#aa6aaa", icon: "#8a4a8a" },
  [HABIT_CATEGORIES.RECOVERY]: { bg: "#2b241a", border: "#4a3d2d", accent: "#c4956a", icon: "#8a6a4a" },
};

function HabitItem({ habit, completed, onToggle }) {
  const colors = CATEGORY_COLORS[habit.category];
  const xpDots = Array.from({ length: habit.xp }, (_, i) => i);

  return (
    <button
      onClick={() => onToggle(habit.id)}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        background: completed
          ? `linear-gradient(135deg, ${colors.bg} 0%, #2c1810 100%)`
          : "#1a0f0a",
        border: `1px solid ${completed ? colors.border : "#2c1810"}`,
        borderRadius: 14, padding: "12px 14px",
        cursor: "pointer", textAlign: "left",
        transition: "all 0.2s ease",
        width: "100%",
        opacity: completed ? 1 : 0.85,
        transform: completed ? "none" : "none",
        boxShadow: completed ? `0 0 12px ${colors.accent}18` : "none",
      }}
      className="habit-card"
    >
      {/* Checkbox */}
      <div style={{
        width: 22, height: 22, borderRadius: 6, flexShrink: 0,
        border: `2px solid ${completed ? colors.accent : "#3d2215"}`,
        background: completed ? `${colors.accent}20` : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s ease",
      }}>
        {completed && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>

      {/* Icon */}
      <span style={{ fontSize: 18, lineHeight: 1 }}>{habit.icon}</span>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13, fontWeight: 500,
          color: completed ? "#f5e6d3" : "#a07850",
          textDecoration: completed ? "none" : "none",
          transition: "color 0.2s",
          lineHeight: 1.3,
        }}>
          {habit.label}
        </div>
        <div style={{ fontSize: 11, color: "#5a3a25", marginTop: 2 }}>
          {habit.category}
        </div>
      </div>

      {/* XP dots */}
      <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
        {xpDots.map(i => (
          <div key={i} style={{
            width: 5, height: 5, borderRadius: "50%",
            background: completed ? colors.accent : "#3d2215",
            transition: "background 0.2s",
          }} />
        ))}
        <span style={{
          fontSize: 10, color: completed ? colors.accent : "#5a3a25",
          marginLeft: 4, fontWeight: 600, alignSelf: "center",
        }}>
          +{habit.xp}
        </span>
      </div>
    </button>
  );
}

export default function HabitList({ activeHabits, completedToday, onToggle }) {
  const categories = Object.values(HABIT_CATEGORIES);

  const completedCount = completedToday.length;
  const totalCount = activeHabits.length;
  const dailyProgress = totalCount > 0 ? completedCount / totalCount : 0;

  return (
    <div style={{
      background: "linear-gradient(145deg, #1a0f0a 0%, #1e1008 100%)",
      border: "1px solid #2c1810",
      borderRadius: 24, padding: "24px 22px",
      animationDelay: "0.1s",
    }} className="fade-in">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 18, fontWeight: 600, color: "#f5e6d3", margin: 0,
        }}>
          Today's Habits
        </h2>
        <span style={{
          fontSize: 12, color: completedCount === totalCount ? "#c4956a" : "#8b5e3c",
          fontWeight: 600,
        }}>
          {completedCount}/{totalCount} done
        </span>
      </div>

      {/* Daily bar */}
      <div style={{ background: "#2c1810", borderRadius: 100, height: 4, marginBottom: 22, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 100,
          background: "linear-gradient(90deg, #8b5e3c, #c4956a)",
          width: `${dailyProgress * 100}%`,
          transition: "width 0.6s ease",
        }} />
      </div>

      {/* Habits by category */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {categories.map(cat => {
          const habits = activeHabits.filter(h => h.category === cat);
          if (habits.length === 0) return null;
          const colors = CATEGORY_COLORS[cat];
          const catCompleted = habits.filter(h => completedToday.includes(h.id)).length;

          return (
            <div key={cat}>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                marginBottom: 8,
              }}>
                <span style={{
                  fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
                  color: colors.icon, fontWeight: 700,
                }}>
                  {cat}
                </span>
                <span style={{ fontSize: 10, color: "#5a3a25" }}>
                  {catCompleted}/{habits.length}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {habits.map(h => (
                  <HabitItem
                    key={h.id}
                    habit={h}
                    completed={completedToday.includes(h.id)}
                    onToggle={onToggle}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
