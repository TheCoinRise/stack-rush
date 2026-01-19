import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UserProgress } from '../game/types';

interface UserStore extends UserProgress {
  // Actions
  setHighScore: (score: number) => void;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  unlockTheme: (themeId: string) => void;
  selectTheme: (themeId: string) => void;
  incrementGamesPlayed: () => void;
  setPremium: (isPremium: boolean) => void;
  toggleSound: () => void;
  toggleHaptic: () => void;
  setLastDailyChallenge: (date: string) => void;
  reset: () => void;
}

const initialState: UserProgress = {
  highScore: 0,
  totalCoins: 0,
  unlockedThemes: ['default', 'neon', 'sunset'],
  selectedTheme: 'default',
  gamesPlayed: 0,
  isPremium: false,
  soundEnabled: true,
  hapticEnabled: true,
  lastDailyChallenge: null,
};

// Web localStorage wrapper
const webStorage: StateStorage = {
  getItem: (name) => {
    const value = localStorage.getItem(name);
    return value ?? null;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, value);
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

// Use localStorage on web, AsyncStorage on native
const storage = Platform.OS === 'web'
  ? webStorage
  : {
      getItem: async (name: string) => {
        const value = await AsyncStorage.getItem(name);
        return value ?? null;
      },
      setItem: async (name: string, value: string) => {
        await AsyncStorage.setItem(name, value);
      },
      removeItem: async (name: string) => {
        await AsyncStorage.removeItem(name);
      },
    };

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setHighScore: (score) => {
        const current = get().highScore;
        if (score > current) {
          set({ highScore: score });
        }
      },

      addCoins: (amount) => {
        const multiplier = get().isPremium ? 2 : 1;
        set((state) => ({ totalCoins: state.totalCoins + amount * multiplier }));
      },

      spendCoins: (amount) => {
        const current = get().totalCoins;
        if (current >= amount) {
          set({ totalCoins: current - amount });
          return true;
        }
        return false;
      },

      unlockTheme: (themeId) => {
        set((state) => ({
          unlockedThemes: [...new Set([...state.unlockedThemes, themeId])],
        }));
      },

      selectTheme: (themeId) => {
        set({ selectedTheme: themeId });
      },

      incrementGamesPlayed: () => {
        set((state) => ({ gamesPlayed: state.gamesPlayed + 1 }));
      },

      setPremium: (isPremium) => {
        set({ isPremium });
        if (isPremium) {
          set((state) => ({
            unlockedThemes: [
              ...state.unlockedThemes,
              'ocean', 'forest', 'candy', 'midnight',
              'cherry-blossom', 'arctic', 'volcanic',
              'galaxy', 'minimalist', 'premium-gold'
            ],
          }));
        }
      },

      toggleSound: () => {
        set((state) => ({ soundEnabled: !state.soundEnabled }));
      },

      toggleHaptic: () => {
        set((state) => ({ hapticEnabled: !state.hapticEnabled }));
      },

      setLastDailyChallenge: (date) => {
        set({ lastDailyChallenge: date });
      },

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'stack-rush-user',
      storage: createJSONStorage(() => storage),
    }
  )
);
