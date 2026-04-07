import type { StateCreator } from 'zustand';
import type { CommandSlice } from '@/types/store';

/**
 * 命令状态切片
 */
export const createCommandSlice: StateCreator<CommandSlice> = (set) => ({
  // State
  isPaletteOpen: false,
  paletteQuery: '',
  executingCommand: null,
  recentCommands: [],

  // Actions
  openPalette: () => {
    console.log('[CommandSlice] Opening command palette');
    set({ isPaletteOpen: true, paletteQuery: '' });
  },

  closePalette: () => {
    console.log('[CommandSlice] Closing command palette');
    set({ isPaletteOpen: false, paletteQuery: '' });
  },

  setPaletteQuery: (query: string) => {
    set({ paletteQuery: query });
  },

  setExecutingCommand: (commandId: string | null) => {
    if (commandId) {
      console.log(`[CommandSlice] Executing command: ${commandId}`);
    }
    set({ executingCommand: commandId });
  },

  addRecentCommand: (entry: any) => {
    set((state) => ({
      recentCommands: [entry, ...state.recentCommands].slice(0, 20),
    }));
  },
});
