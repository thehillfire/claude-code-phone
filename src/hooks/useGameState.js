import { useState, useEffect, useCallback, useRef } from "react";
import { ALL_HABITS, DEFAULT_DAILY_HABITS, XP_PER_LEVEL, LEVELS_PER_TIER } from "../data/habits";
import { TIERS, TOTAL_TIERS } from "../data/tiers";
import { supabase, supabaseConfigured } from "../lib/supabase";

const STORAGE_KEY = "elevated_espresso_v1";
const today = () => new Date().toISOString().slice(0, 10);

const defaultState = () => ({
  tierId: 1,
  level: 0,
  totalXp: 0,
  streak: 0,
  lastCheckinDate: null,
  completedToday: [],
  checkinDate: today(),
  activeHabitIds: DEFAULT_DAILY_HABITS,
  unlockedTiers: [1],
});

function loadLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const saved = JSON.parse(raw);
    if (saved.checkinDate !== today()) {
      return { ...saved, completedToday: [], checkinDate: today() };
    }
    return saved;
  } catch {
    return defaultState();
  }
}

function saveLocal(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

function xpToTierLevel(totalXp) {
  const xpPerTier = LEVELS_PER_TIER * XP_PER_LEVEL;
  let tierIdx = Math.floor(totalXp / xpPerTier);
  let levelInTier = Math.floor((totalXp % xpPerTier) / XP_PER_LEVEL);
  if (tierIdx >= TOTAL_TIERS) { tierIdx = TOTAL_TIERS - 1; levelInTier = 99; }
  return { tierIdx, levelInTier, tierId: TIERS[tierIdx].id };
}

export function useGameState(userId) {
  const [state, setState] = useState(loadLocal);
  const [levelUpEvent, setLevelUpEvent] = useState(null);
  const [synced, setSynced] = useState(false);
  const saveTimer = useRef(null);

  // Load from Supabase when user logs in
  useEffect(() => {
    if (!supabaseConfigured || !userId) {
      setSynced(true);
      return;
    }
    supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          const remote = {
            tierId: data.tier_id,
            level: data.level,
            totalXp: data.total_xp,
            streak: data.streak,
            lastCheckinDate: data.last_checkin_date,
            completedToday: data.checkin_date === today() ? (data.completed_today || []) : [],
            checkinDate: today(),
            activeHabitIds: data.active_habit_ids?.length ? data.active_habit_ids : DEFAULT_DAILY_HABITS,
            unlockedTiers: data.unlocked_tiers || [1],
          };
          setState(remote);
          saveLocal(remote);
        }
        setSynced(true);
      });
  }, [userId]);

  // Debounced Supabase save
  const saveRemote = useCallback((s) => {
    if (!supabaseConfigured || !userId) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      supabase.from('progress').upsert({
        user_id: userId,
        tier_id: s.tierId,
        level: s.level,
        total_xp: s.totalXp,
        streak: s.streak,
        last_checkin_date: s.lastCheckinDate,
        checkin_date: s.checkinDate,
        completed_today: s.completedToday,
        active_habit_ids: s.activeHabitIds,
        unlocked_tiers: s.unlockedTiers,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });
    }, 800);
  }, [userId]);

  useEffect(() => {
    saveLocal(state);
    if (synced) saveRemote(state);
  }, [state, synced, saveRemote]);

  const completeHabit = useCallback((habitId) => {
    setState(prev => {
      if (prev.completedToday.includes(habitId)) return prev;
      const habit = ALL_HABITS.find(h => h.id === habitId);
      if (!habit) return prev;

      const newTotalXp = prev.totalXp + habit.xp;
      const { tierIdx, levelInTier, tierId: newTierId } = xpToTierLevel(newTotalXp);

      let streak = prev.streak;
      if (prev.lastCheckinDate !== today()) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        streak = prev.lastCheckinDate === yesterday.toISOString().slice(0, 10) ? streak + 1 : 1;
      }

      if (levelInTier !== prev.level || newTierId !== prev.tierId) {
        setLevelUpEvent({
          from: prev.level, to: levelInTier,
          tierAdvance: newTierId !== prev.tierId,
          newTier: newTierId !== prev.tierId ? TIERS[tierIdx] : null,
        });
      }

      return {
        ...prev,
        tierId: newTierId, level: levelInTier, totalXp: newTotalXp, streak,
        lastCheckinDate: today(),
        completedToday: [...prev.completedToday, habitId],
        unlockedTiers: prev.unlockedTiers.includes(newTierId)
          ? prev.unlockedTiers : [...prev.unlockedTiers, newTierId],
      };
    });
  }, []);

  const uncompleteHabit = useCallback((habitId) => {
    setState(prev => {
      if (!prev.completedToday.includes(habitId)) return prev;
      const habit = ALL_HABITS.find(h => h.id === habitId);
      if (!habit) return prev;
      const newTotalXp = Math.max(0, prev.totalXp - habit.xp);
      const { tierId, levelInTier } = xpToTierLevel(newTotalXp);
      return {
        ...prev,
        tierId, level: levelInTier, totalXp: newTotalXp,
        completedToday: prev.completedToday.filter(id => id !== habitId),
      };
    });
  }, []);

  const toggleActiveHabit = useCallback((habitId) => {
    setState(prev => {
      const next = prev.activeHabitIds.includes(habitId)
        ? prev.activeHabitIds.filter(id => id !== habitId)
        : [...prev.activeHabitIds, habitId];
      return { ...prev, activeHabitIds: next };
    });
  }, []);

  const resetProgress = useCallback(() => {
    const fresh = defaultState();
    setState(fresh);
    if (supabaseConfigured && userId) {
      supabase.from('progress').delete().eq('user_id', userId);
    }
  }, [userId]);

  const dismissLevelUp = useCallback(() => setLevelUpEvent(null), []);

  const currentTier = TIERS.find(t => t.id === state.tierId) || TIERS[0];
  const tierProgress = state.level / LEVELS_PER_TIER;
  const dailyXp = state.completedToday.reduce((sum, id) => {
    const h = ALL_HABITS.find(h => h.id === id);
    return sum + (h ? h.xp : 0);
  }, 0);
  const activeHabits = ALL_HABITS.filter(h => state.activeHabitIds.includes(h.id));
  const maxDailyXp = activeHabits.reduce((s, h) => s + h.xp, 0);

  return {
    state, currentTier, tierProgress, dailyXp, maxDailyXp,
    activeHabits, levelUpEvent,
    completeHabit, uncompleteHabit, dismissLevelUp, toggleActiveHabit, resetProgress,
  };
}
