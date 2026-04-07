import { create } from 'zustand'

interface TerminalState {
  history: string[]
  isExecuting: boolean
  addToHistory: (line: string) => void
  setExecuting: (executing: boolean) => void
  clearHistory: () => void
}

const MAX_HISTORY = 1000
const TRIM_TO = 900

export const useTerminalStore = create<TerminalState>((set) => ({
  history: [],
  isExecuting: false,

  addToHistory: (line) => set((state) => {
    // More efficient history management
    if (state.history.length >= MAX_HISTORY) {
      return {
        history: [...state.history.slice(-TRIM_TO), line],
      }
    }
    return {
      history: [...state.history, line],
    }
  }),

  setExecuting: (executing) => set({ isExecuting: executing }),

  clearHistory: () => set({ history: [] }),
}))
