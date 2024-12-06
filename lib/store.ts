'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserSettings, PomodoroSession } from './types';

interface Store {
  settings: UserSettings;
  sessions: PomodoroSession[];
  updateSettings: (settings: Partial<UserSettings>) => void;
  addSession: (session: PomodoroSession) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      settings: {
        theme: 'system',
        pomodoroLength: 25,
        shortBreakLength: 5,
        longBreakLength: 15,
      },
      sessions: [],
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      addSession: (session) =>
        set((state) => ({
          sessions: [...state.sessions, session],
        })),
    }),
    {
      name: 'dot-calendar-store',
    }
  )
);