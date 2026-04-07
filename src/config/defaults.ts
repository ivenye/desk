import type { DeskConfig } from './schema';

/**
 * 默认配置
 */
export const defaultConfig: DeskConfig = {
  app: {
    theme: 'dark',
    language: 'en',
    autoUpdate: true,
  },

  editor: {
    fontSize: 14,
    fontFamily: 'Monaco, Consolas, monospace',
    lineHeight: 1.5,
    tabSize: 2,
    autoSave: true,
    autoSaveDelay: 1000,
    wordWrap: true,
    minimap: true,
  },

  terminal: {
    shell: 'bash',
    fontSize: 14,
    fontFamily: 'Monaco, Consolas, monospace',
    cursorStyle: 'block',
    scrollback: 1000,
  },

  plugins: {
    autoLoad: false,
    loadOnStartup: [],
    pluginPaths: ['./plugins'],
  },

  keybindings: {
    'file.new': 'Ctrl+N',
    'file.open': 'Ctrl+O',
    'file.save': 'Ctrl+S',
    'file.saveAs': 'Ctrl+Shift+S',
    'file.close': 'Ctrl+W',
    'editor.format': 'Ctrl+Shift+F',
    'editor.undo': 'Ctrl+Z',
    'editor.redo': 'Ctrl+Y',
    'editor.find': 'Ctrl+F',
    'editor.replace': 'Ctrl+H',
    'view.editor': 'Ctrl+1',
    'view.terminal': 'Ctrl+2',
    'view.agents': 'Ctrl+3',
    'view.plugins': 'Ctrl+4',
    'view.toggleSidebar': 'Ctrl+B',
    'view.toggleFullscreen': 'F11',
    'palette.open': 'Ctrl+Shift+P',
  },
};
