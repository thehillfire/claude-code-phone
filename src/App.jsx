import { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useGameState } from "./hooks/useGameState";
import { supabaseConfigured } from "./lib/supabase";
import Header from "./components/Header";
import TierCard from "./components/TierCard";
import HabitList from "./components/HabitList";
import TierMap from "./components/TierMap";
import StatsBar from "./components/StatsBar";
import LevelUpModal from "./components/LevelUpModal";
import BottomNav from "./components/BottomNav";
import LoginPage from "./pages/LoginPage";
import JournalPage from "./pages/JournalPage";
import "./index.css";

function AppInner() {
  const { user } = useAuth();
  const [page, setPage] = useState("home");
  const [showReset, setShowReset] = useState(false);

  const {
    state, currentTier, tierProgress, dailyXp, maxDailyXp,
    activeHabits, levelUpEvent,
    completeHabit, uncompleteHabit, dismissLevelUp, resetProgress,
  } = useGameState(user?.id);

  // Loading state — user is undefined while auth is being determined
  if (user === undefined) {
    return (
      <div style={{ minHeight: "100svh", background: "#0f0a08",
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 32 }}>☕</span>
      </div>
    );
  }

  // Show login if Supabase is configured and user is not authenticated
  if (supabaseConfigured && !user) {
    return <LoginPage />;
  }

  function handleToggle(habitId) {
    if (state.completedToday.includes(habitId)) uncompleteHabit(habitId);
    else completeHabit(habitId);
  }

  return (
    <div style={{ minHeight: "100svh", background: "#0f0a08" }}>
      <Header currentTier={currentTier} />

      <main style={{
        maxWidth: 760, margin: "0 auto",
        padding: "20px 16px 100px",
        display: "flex", flexDirection: "column", gap: 20,
      }}>
        {/* Home */}
        {page === "home" && (
          <>
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

            {/* Reset */}
            <div style={{ textAlign: "center", paddingTop: 4 }}>
              {!showReset ? (
                <button onClick={() => setShowReset(true)}
                  style={{ background: "none", border: "none", color: "#2c1810",
                    fontSize: 11, cursor: "pointer", letterSpacing: "0.08em",
                    textTransform: "uppercase" }}>
                  Reset Progress
                </button>
              ) : (
                <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#8b5e3c" }}>Are you sure?</span>
                  <button onClick={() => { resetProgress(); setShowReset(false); }}
                    style={{ background: "#3d1515", border: "1px solid #6b2222",
                      color: "#ff6b6b", borderRadius: 8, padding: "4px 12px",
                      fontSize: 12, cursor: "pointer" }}>
                    Yes, Reset
                  </button>
                  <button onClick={() => setShowReset(false)}
                    style={{ background: "#2c1810", border: "1px solid #3d2215",
                      color: "#a07850", borderRadius: 8, padding: "4px 12px",
                      fontSize: 12, cursor: "pointer" }}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Journal */}
        {page === "journal" && (
          <JournalPage
            currentTier={currentTier}
            level={state.level}
            streak={state.streak}
          />
        )}

        {/* Journey / Tier Map */}
        {page === "journey" && (
          <>
            <StatsBar
              totalXp={state.totalXp}
              streak={state.streak}
              tierId={state.tierId}
              level={state.level}
            />
            <TierMap currentTierId={state.tierId} />
          </>
        )}
      </main>

      <BottomNav currentPage={page} onChange={setPage} />
      <LevelUpModal event={levelUpEvent} onDismiss={dismissLevelUp} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
