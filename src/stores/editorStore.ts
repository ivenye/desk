import { create } from 'zustand'

interface EditorState {
  openFiles: string[]
  activeFile: string | null
  fileContents: Record<string, string>
  openFile: (path: string) => void
  closeFile: (path: string) => void
  setActiveFile: (path: string) => void
  updateFileContent: (path: string, content: string) => void
}

export const useEditorStore = create<EditorState>((set) => ({
  openFiles: [],
  activeFile: null,
  fileContents: {},
  
  openFile: (path) => set((state) => ({
    openFiles: state.openFiles.includes(path) 
      ? state.openFiles 
      : [...state.openFiles, path],
    activeFile: path,
  })),
  
  closeFile: (path) => set((state) => ({
    openFiles: state.openFiles.filter(f => f !== path),
    activeFile: state.activeFile === path 
      ? state.openFiles[0] || null 
      : state.activeFile,
  })),
  
  setActiveFile: (path) => set({ activeFile: path }),
  
  updateFileContent: (path, content) => set((state) => {
    if (state.fileContents[path] === content) return state
    return {
      fileContents: { ...state.fileContents, [path]: content },
    }
  }),
}))
