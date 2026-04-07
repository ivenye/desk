import type { RootState } from '@/types/store';

/**
 * 命令状态选择器
 */

export const selectIsPaletteOpen = (state: RootState) => state.isPaletteOpen;

export const selectPaletteQuery = (state: RootState) => state.paletteQuery;

export const selectExecutingCommand = (state: RootState) => state.executingCommand;

export const selectRecentCommands = (state: RootState) => state.recentCommands;

export const selectIsExecutingCommand = (state: RootState) => {
  return state.executingCommand !== null;
};

export const selectRecentCommandsCount = (state: RootState) => {
  return state.recentCommands.length;
};
