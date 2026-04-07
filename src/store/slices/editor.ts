import type { StateCreator } from 'zustand';
import type { EditorSlice, FileInfo } from '@/types/store';

/**
 * 编辑器状态切片
 */
export const createEditorSlice: StateCreator<EditorSlice> = (set) => ({
  // State
  openFiles: [],
  activeFile: null,
  unsavedChanges: new Set(),

  // Actions
  openFile: (file: FileInfo) => {
    console.log(`[EditorSlice] Opening file: ${file.path}`);

    set((state) => {
      // 检查文件是否已打开
      const exists = state.openFiles.some(f => f.path === file.path);

      if (exists) {
        return { activeFile: file.path };
      }

      return {
        openFiles: [...state.openFiles, file],
        activeFile: file.path,
      };
    });
  },

  closeFile: (path: string) => {
    console.log(`[EditorSlice] Closing file: ${path}`);

    set((state) => {
      const newOpenFiles = state.openFiles.filter(f => f.path !== path);
      const newUnsavedChanges = new Set(state.unsavedChanges);
      newUnsavedChanges.delete(path);

      // 如果关闭的是当前文件，切换到下一个文件
      let newActiveFile = state.activeFile;
      if (state.activeFile === path) {
        newActiveFile = newOpenFiles.length > 0 ? newOpenFiles[0].path : null;
      }

      return {
        openFiles: newOpenFiles,
        activeFile: newActiveFile,
        unsavedChanges: newUnsavedChanges,
      };
    });
  },

  setActiveFile: (path: string) => {
    console.log(`[EditorSlice] Setting active file: ${path}`);
    set({ activeFile: path });
  },

  updateFileContent: (path: string, content: string) => {
    set((state) => {
      const newOpenFiles = state.openFiles.map(file => {
        if (file.path === path) {
          return { ...file, content, modified: true };
        }
        return file;
      });

      const newUnsavedChanges = new Set(state.unsavedChanges);
      newUnsavedChanges.add(path);

      return {
        openFiles: newOpenFiles,
        unsavedChanges: newUnsavedChanges,
      };
    });
  },

  saveFile: (path: string) => {
    console.log(`[EditorSlice] Saving file: ${path}`);

    set((state) => {
      const newOpenFiles = state.openFiles.map(file => {
        if (file.path === path) {
          return { ...file, modified: false, lastSaved: new Date() };
        }
        return file;
      });

      const newUnsavedChanges = new Set(state.unsavedChanges);
      newUnsavedChanges.delete(path);

      return {
        openFiles: newOpenFiles,
        unsavedChanges: newUnsavedChanges,
      };
    });
  },

  saveAllFiles: () => {
    console.log('[EditorSlice] Saving all files');

    set((state) => {
      const newOpenFiles = state.openFiles.map(file => ({
        ...file,
        modified: false,
        lastSaved: new Date(),
      }));

      return {
        openFiles: newOpenFiles,
        unsavedChanges: new Set(),
      };
    });
  },
});
