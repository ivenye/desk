/**
 * Store 类型定义
 */

export type View = 'editor' | 'terminal' | 'agents' | 'sessions' | 'memory' | 'workflow' | 'plugins';

export type Theme = 'light' | 'dark' | 'system';

/**
 * 应用设置
 */
export interface AppSettings {
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  tabSize: number;
  autoSave: boolean;
  autoSaveDelay: number;
}

/**
 * 文件信息
 */
export interface FileInfo {
  path: string;
  name: string;
  content: string;
  language: string;
  modified: boolean;
  lastSaved?: Date;
}

/**
 * 终端会话
 */
export interface TerminalSession {
  id: string;
  name: string;
  cwd: string;
  active: boolean;
  createdAt: Date;
}

/**
 * 应用状态切片
 */
export interface AppSlice {
  currentView: View;
  sidebarVisible: boolean;
  theme: Theme;
  settings: AppSettings;

  // Actions
  setCurrentView: (view: View) => void;
  toggleSidebar: () => void;
  setTheme: (theme: Theme) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

/**
 * 编辑器状态切片
 */
export interface EditorSlice {
  openFiles: FileInfo[];
  activeFile: string | null;
  unsavedChanges: Set<string>;

  // Actions
  openFile: (file: FileInfo) => void;
  closeFile: (path: string) => void;
  setActiveFile: (path: string) => void;
  updateFileContent: (path: string, content: string) => void;
  saveFile: (path: string) => void;
  saveAllFiles: () => void;
}

/**
 * 终端状态切片
 */
export interface TerminalSlice {
  sessions: TerminalSession[];
  activeSession: string | null;

  // Actions
  createSession: (name?: string) => void;
  closeSession: (id: string) => void;
  setActiveSession: (id: string) => void;
}

/**
 * 插件状态切片
 */
export interface PluginSlice {
  loaded: Map<string, unknown>;
  loading: Set<string>;
  errors: Map<string, Error>;

  // Actions
  setPluginLoading: (pluginId: string, loading: boolean) => void;
  setPluginLoaded: (pluginId: string, plugin: unknown) => void;
  setPluginError: (pluginId: string, error: Error) => void;
  removePlugin: (pluginId: string) => void;
}

/**
 * 命令历史条目
 */
export interface CommandHistoryEntry {
  commandId: string;
  timestamp: Date;
  success: boolean;
  error?: string;
}

/**
 * 命令状态切片
 */
export interface CommandSlice {
  isPaletteOpen: boolean;
  paletteQuery: string;
  executingCommand: string | null;
  recentCommands: CommandHistoryEntry[];

  // Actions
  openPalette: () => void;
  closePalette: () => void;
  setPaletteQuery: (query: string) => void;
  setExecutingCommand: (commandId: string | null) => void;
  addRecentCommand: (entry: CommandHistoryEntry) => void;
}

/**
 * 根状态
 */
export interface RootState extends
  AppSlice,
  EditorSlice,
  TerminalSlice,
  PluginSlice,
  CommandSlice {}
