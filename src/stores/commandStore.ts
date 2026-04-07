import { create } from 'zustand';
import type { CommandHistoryEntry, CommandResult } from '@/commands/types';

interface CommandState {
  // 命令面板状态
  isPaletteOpen: boolean;
  paletteQuery: string;

  // 当前执行的命令
  executingCommand: string | null;

  // 最近执行的命令
  recentCommands: CommandHistoryEntry[];

  // 命令执行结果
  lastResult: CommandResult | null;

  // Actions
  openPalette: () => void;
  closePalette: () => void;
  setPaletteQuery: (query: string) => void;
  setExecutingCommand: (commandId: string | null) => void;
  addRecentCommand: (entry: CommandHistoryEntry) => void;
  setLastResult: (result: CommandResult) => void;
  clearRecentCommands: () => void;
}

export const useCommandStore = create<CommandState>((set) => ({
  // Initial state
  isPaletteOpen: false,
  paletteQuery: '',
  executingCommand: null,
  recentCommands: [],
  lastResult: null,

  // Actions
  openPalette: () => set({ isPaletteOpen: true, paletteQuery: '' }),

  closePalette: () => set({ isPaletteOpen: false, paletteQuery: '' }),

  setPaletteQuery: (query: string) => set({ paletteQuery: query }),

  setExecutingCommand: (commandId: string | null) =>
    set({ executingCommand: commandId }),

  addRecentCommand: (entry: CommandHistoryEntry) =>
    set((state) => ({
      recentCommands: [entry, ...state.recentCommands].slice(0, 20),
    })),

  setLastResult: (result: CommandResult) => set({ lastResult: result }),

  clearRecentCommands: () => set({ recentCommands: [] }),
}));
