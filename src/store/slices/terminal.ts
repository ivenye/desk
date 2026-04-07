import type { StateCreator } from 'zustand';
import type { TerminalSlice, TerminalSession } from '@/types/store';

/**
 * 终端状态切片
 */
export const createTerminalSlice: StateCreator<TerminalSlice> = (set, get) => ({
  // State
  sessions: [],
  activeSession: null,

  // Actions
  createSession: (name?: string) => {
    const id = `session-${Date.now()}`;
    const sessionName = name || `Terminal ${get().sessions.length + 1}`;

    console.log(`[TerminalSlice] Creating session: ${sessionName}`);

    const newSession: TerminalSession = {
      id,
      name: sessionName,
      cwd: '~',
      active: true,
      createdAt: new Date(),
    };

    set((state) => ({
      sessions: [...state.sessions, newSession],
      activeSession: id,
    }));
  },

  closeSession: (id: string) => {
    console.log(`[TerminalSlice] Closing session: ${id}`);

    set((state) => {
      const newSessions = state.sessions.filter(s => s.id !== id);

      // 如果关闭的是当前会话，切换到下一个
      let newActiveSession = state.activeSession;
      if (state.activeSession === id) {
        newActiveSession = newSessions.length > 0 ? newSessions[0].id : null;
      }

      return {
        sessions: newSessions,
        activeSession: newActiveSession,
      };
    });
  },

  setActiveSession: (id: string) => {
    console.log(`[TerminalSlice] Setting active session: ${id}`);
    set({ activeSession: id });
  },
});
