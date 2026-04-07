import type { RootState } from '@/types/store';

/**
 * 应用状态选择器
 */

export const selectCurrentView = (state: RootState) => state.currentView;

export const selectSidebarVisible = (state: RootState) => state.sidebarVisible;

export const selectTheme = (state: RootState) => state.theme;

export const selectSettings = (state: RootState) => state.settings;

export const selectFontSize = (state: RootState) => state.settings.fontSize;

export const selectAutoSave = (state: RootState) => state.settings.autoSave;
