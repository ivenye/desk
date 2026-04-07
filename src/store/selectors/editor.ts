import type { RootState } from '@/types/store';

/**
 * 编辑器状态选择器
 */

export const selectOpenFiles = (state: RootState) => state.openFiles;

export const selectActiveFile = (state: RootState) => {
  if (!state.activeFile) return null;
  return state.openFiles.find(f => f.path === state.activeFile) || null;
};

export const selectUnsavedFiles = (state: RootState) => {
  return state.openFiles.filter(f => state.unsavedChanges.has(f.path));
};

export const selectHasUnsavedChanges = (state: RootState) => {
  return state.unsavedChanges.size > 0;
};

export const selectFileByPath = (path: string) => (state: RootState) => {
  return state.openFiles.find(f => f.path === path) || null;
};

export const selectIsFileModified = (path: string) => (state: RootState) => {
  return state.unsavedChanges.has(path);
};
