import { useState, useEffect, useCallback } from "react";
import { ALL_HABITS, DEFAULT_DAILY_HABITS, XP_PER_LEVEL, LEVELS_PER_TIER } from "../data/habits";
import { TIERS, TOTAL_TIERS } from "../data/tiers";

const STORAGE_KEY = "elevated_espresso_v1";
const today = () => new Date().toISOString().slice(0, 10);

const defaultState = () => ({
  tierId: 1,
  level: 0,          // 0–99 within the tier
  totalXp: 0,
  streak: 0,
  lastCheckinDate: null,
  completedToday: [],  // habit ids completed today
  checkinDate: today(),
  history: [],        // { date, completedIds, xpEarned }
  activeHabitIds: DEFAULT_DAILY_HABITS,
  unlockedTiers: [1],
});

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const saved = JSON.parse(raw);
    // Reset daily completions if it's a new day
    if (saved.checkinDate !== today()) {
      return {
        ...saved,
        completedToday: [],
        checkinDate: today(),
      };
    }
    return saved;
  } catch {
    return defaultState();
  }
}

function save(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export function useGameState() {
  const [state, setState] = useState(load);
  const [levelUpEvent, setLevelUpEvent] = useState(null); // { from, to, tierAdvance }

  useEffect(() => {
    save(state);
  }, [state]);

  const completeHabit = useCallback((habitId) => {
    setState(prev => {
      if (prev.completedToday.includes(habitId)) return prev;

      const habit = ALL_HABITS.find(h => h.id === habitId);
      if (!habit) return prev;

      const earnedXp = habit.xp;
      const newTotalXp = prev.totalXp + earnedXp;

      // Calculate new level/tier from total XP
      const xpPerTier = LEVELS_PER_TIER * XP_PER_LEVEL;
      let tierIdx = Math.floor(newTotalXp / xpPerTier);
      let levelInTier = Math.floor((newTotalXp % xpPerTier) / XP_PER_LEVEL);

      // Cap at max tier
      if (tierIdx >= TOTAL_TIERS) {
        tierIdx = TOTAL_TIERS - 1;
        levelInTier = 99;
      }

      const newTierId = TIERS[tierIdx].id;
      const prevTierId = prev.tierId;
      const prevLevel = prev.level;

      const newCompletedToday = [...prev.completedToday, habitId];

      // Streak logic
      let streak = prev.streak;
      if (prev.lastCheckinDate !== today()) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yStr = yesterday.toISOString().slice(0, 10);
        streak = prev.lastCheckinDate === yStr ? streak + 1 : 1;
      }

      // Check level up event
      if (levelInTier !== prevLevel || newTierId !== prevTierId) {
        setLevelUpEvent({
          from: prevLevel,
          to: levelInTier,
          tierAdvance: newTierId !== prevTierId,
          newTier: newTierId !== prevTierId ? TIERS[tierIdx] : null,
        });
      }

      const newUnlocked = prev.unlockedTiers.includes(newTierId)
        ? prev.unlockedTiers
        : [...prev.unlockedTiers, newTierId];

      return {
        ...prev,
        tierId: newTierId,
        level: levelInTier,
        totalXp: newTotalXp,
        streak,
        lastCheckinDate: today(),
        completedToday: newCompletedToday,
        unlockedTiers: newUnlocked,
      };
    });
  }, []);

  const uncompleteHabit = useCallback((habitId) => {
    setState(prev => {
      if (!prev.completedToday.includes(habitId)) return prev;

      const habit = ALL_HABITS.find(h => h.id === habitId);
      if (!habit) return prev;

      const newTotalXp = Math.max(0, prev.totalXp - habit.xp);
      const xpPerTier = LEVELS_PER_TIER * XP_PER_LEVEL;
      let tierIdx = Math.floor(newTotalXp / xpPerTier);
      let levelInTier = Math.floor((newTotalXp % xpPerTier) / XP_PER_LEVEL);

      if (tierIdx >= TOTAL_TIERS) {
        tierIdx = TOTAL_TIERS - 1;
        levelInTier = 99;
      }

      return {
        ...prev,
        tierId: TIERS[tierIdx].id,
        level: levelInTier,
        totalXp: newTotalXp,
        completedToday: prev.completedToday.filter(id => id !== habitId),
      };
    });
  }, []);

  const dismissLevelUp = useCallback(() => setLevelUpEvent(null), []);

  const toggleActiveHabit = useCallback((habitId) => {
    setState(prev => {
      const active = prev.activeHabitIds;
      const next = active.includes(habitId)
        ? active.filter(id => id !== habitId)
        : [...active, habitId];
      return { ...prev, activeHabitIds: next };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setState(defaultState());
  }, []);

  // Derived
  const currentTier = TIERS.find(t => t.id === state.tierId) || TIERS[0];
  const xpPerTier = LEVELS_PER_TIER * XP_PER_LEVEL;
  const xpInCurrentTier = state.totalXp % xpPerTier;
  const xpForCurrentLevel = xpInCurrentTier % XP_PER_LEVEL;
  const levelProgress = xpForCurrentLevel / XP_PER_LEVEL; // 0–1
  const tierProgress = state.level / LEVELS_PER_TIER;      // 0–1
  const dailyXp = state.completedToday.reduce((sum, id) => {
    const h = ALL_HABITS.find(h => h.id === id);
    return sum + (h ? h.xp : 0);
  }, 0);

  const activeHabits = ALL_HABITS.filter(h => state.activeHabitIds.includes(h.id));
  const maxDailyXp = activeHabits.reduce((s, h) => s + h.xp, 0);

  return {
    state,
    currentTier,
    levelProgress,
    tierProgress,
    dailyXp,
    maxDailyXp,
    activeHabits,
    levelUpEvent,
    completeHabit,
    uncompleteHabit,
    dismissLevelUp,
    toggleActiveHabit,
    resetProgress,
  };
}
