import { useState } from "react";
import { useGameState } from "./hooks/useGameState";
import Header from "./components/Header";
import TierCard from "./components/TierCard";
import HabitList from "./components/HabitList";
import TierMap from "./components/TierMap";
import StatsBar from "./components/StatsBar";
import LevelUpModal from "./components/LevelUpModal";
import "./index.css";

export default function App() {
  const {
    state,
    currentTier,
    tierProgress,
    dailyXp,
    maxDailyXp,
    activeHabits,
    levelUpEvent,
    completeHabit,
    uncompleteHabit,
    dismissLevelUp,
    resetProgress,
  } = useGameState();

  const [showReset, setShowReset] = useState(false);

  function handleToggle(habitId) {
    if (state.completedToday.includes(habitId)) {
      uncompleteHabit(habitId);
    } else {
      completeHabit(habitId);
    }
  }

  return (
    <div style={{ minHeight: "100svh", background: "#0f0a08" }}>
      <Header currentTier={currentTier} />

      <main style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "24px 16px 60px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}>
        <TierCard
          currentTier={currentTier}
          level={state.level}
          tierProgress={tierProgress}
          streak={state.streak}
          dailyXp={dailyXp}
          maxDailyXp={maxDailyXp}
        />

        <StatsBar
          totalXp={state.totalXp}
          streak={state.streak}
          tierId={state.tierId}
          level={state.level}
        />

        <HabitList
          activeHabits={activeHabits}
          completedToday={state.completedToday}
          onToggle={handleToggle}
        />

        <TierMap currentTierId={state.tierId} />

        <div style={{ textAlign: "center", paddingTop: 8 }}>
          {!showReset ? (
            <button
              onClick={() => setShowReset(true)}
              style={{
                background: "none", border: "none",
                color: "#3d2215", fontSize: 11,
                cursor: "pointer", letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Reset Progress
            </button>
          ) : (
            <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "#8b5e3c" }}>Are you sure?</span>
              <button
                onClick={() => { resetProgress(); setShowReset(false); }}
                style={{
                  background: "#3d1515", border: "1px solid #6b2222",
                  color: "#ff6b6b", borderRadius: 8, padding: "4px 12px",
                  fontSize: 12, cursor: "pointer",
                }}
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setShowReset(false)}
                style={{
                  background: "#2c1810", border: "1px solid #3d2215",
                  color: "#a07850", borderRadius: 8, padding: "4px 12px",
                  fontSize: 12, cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </main>

      <LevelUpModal event={levelUpEvent} onDismiss={dismissLevelUp} />
    </div>
  );
}
