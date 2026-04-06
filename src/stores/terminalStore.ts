import { create } from 'zustand'

interface TerminalState {
  history: string[]
  currentCommand: string
  isExecuting: boolean
  addToHistory: (line: string) => void
  setCurrentCommand: (cmd: string) => void
  setExecuting: (executing: boolean) => void
  clearHistory: () => void
}

export const useTerminalStore = create<TerminalState>((set) => ({
  history: [],
  currentCommand: '',
  isExecuting: false,
  
  addToHistory: (line) => set((state) => ({
    history: state.history.length > 1000
      ? [...state.history.slice(-900), line]
      : [...state.history, line],
  })),
  
  setCurrentCommand: (cmd) => set({ currentCommand: cmd }),
  
  setExecuting: (executing) => set({ isExecuting: executing }),
  
  clearHistory: () => set({ history: [] }),
}))
