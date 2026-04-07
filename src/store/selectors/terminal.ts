import type { RootState } from '@/types/store';

/**
 * 终端状态选择器
 */

export const selectTerminalSessions = (state: RootState) => state.sessions;

export const selectActiveTerminalSession = (state: RootState) => {
  if (!state.activeSession) return null;
  return state.sessions.find(s => s.id === state.activeSession) || null;
};

export const selectTerminalSessionById = (id: string) => (state: RootState) => {
  return state.sessions.find(s => s.id === id) || null;
};

export const selectHasTerminalSessions = (state: RootState) => {
  return state.sessions.length > 0;
};
