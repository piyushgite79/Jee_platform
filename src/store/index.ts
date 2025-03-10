import { create } from 'zustand';
import type { User, Test, UserStats, Achievement } from '../types';

interface AppState {
  user: User | null;
  tests: Test[];
  stats: UserStats;
  achievements: Achievement[];
  setUser: (user: User | null) => void;
  addTest: (test: Test) => void;
  updateStats: (stats: Partial<UserStats>) => void;
  unlockAchievement: (achievement: Achievement) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  tests: [],
  stats: {
    totalTests: 0,
    averageScore: 0,
    subjectsCompleted: [],
    currentStreak: 0,
    bestStreak: 0,
    totalPoints: 0,
    level: 1,
  },
  achievements: [],
  setUser: (user) => set({ user }),
  addTest: (test) => set((state) => ({ tests: [...state.tests, test] })),
  updateStats: (stats) => set((state) => ({ stats: { ...state.stats, ...stats } })),
  unlockAchievement: (achievement) =>
    set((state) => ({
      achievements: [...state.achievements, achievement],
    })),
}));