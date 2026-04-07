import type { StateCreator } from 'zustand';
import type { AppSlice, AppSettings, View, Theme } from '@/types/store';

const defaultSettings: AppSettings = {
  fontSize: 14,
  fontFamily: 'Monaco, Consolas, monospace',
  lineHeight: 1.5,
  tabSize: 2,
  autoSave: true,
  autoSaveDelay: 1000,
};

/**
 * 应用状态切片
 */
export const createAppSlice: StateCreator<AppSlice> = (set) => ({
  // State
  currentView: 'editor',
  sidebarVisible: true,
  theme: 'dark',
  settings: defaultSettings,

  // Actions
  setCurrentView: (view: View) => {
    console.log(`[AppSlice] Setting view to: ${view}`);
    set({ currentView: view });
  },

  toggleSidebar: () => {
    set((state) => {
      const newVisible = !state.sidebarVisible;
      console.log(`[AppSlice] Toggling sidebar: ${newVisible}`);
      return { sidebarVisible: newVisible };
    });
  },

  setTheme: (theme: Theme) => {
    console.log(`[AppSlice] Setting theme to: ${theme}`);
    set({ theme });

    // 应用主题到 document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  updateSettings: (newSettings: Partial<AppSettings>) => {
    console.log('[AppSlice] Updating settings:', newSettings);
    set((state) => ({
      settings: {
        ...state.settings,
        ...newSettings,
      },
    }));
  },
});
